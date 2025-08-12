import React, { useState, useEffect } from 'react';
import './ClaimFormPopup.css';

const ClaimFormPopup = ({ prize, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', prize: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prize !== null && prize !== undefined) {
      setFormData(prev => ({ ...prev, prize }));
    }
  }, [prize]);

  const handleChange = (e) => {
    if (!e?.target?.name) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobile(formData.mobile)) {
      setError('Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const checkRes = await fetch('https://admin-backend-orcin-six.vercel.app/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setLoading(false);
        setError('You are already a customer');
        return;
      }
      await fetch('https://admin-backend-orcin-six.vercel.app/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onSubmit();
    } catch (err) {
      setLoading(false);
      setError('Server error');
    }
  };

  return (
    <div className="form-popup-overlay">
      <div className="bg-ornaments" aria-hidden="true">
        <span className="ring r1"></span>
        <span className="ring r2"></span>
        <span className="ring r3"></span>
        <span className="bubble b1"></span>
        <span className="bubble b2"></span>
        <span className="bubble b3"></span>
        <span className="bubble b4"></span>
        <span className="orb o1"></span>
        <span className="orb o2"></span>
      </div>

      <div className="form-popup-box">
        <h3 className="form-title">Claim Your Prize 🎁</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            maxLength="10"
            pattern="[6-9][0-9]{9}"
            disabled={loading}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>

      {loading && (
        <div className="loader-overlay">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">
            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
          </svg>
          <p className="loader-text">Processing your claim…</p>
        </div>
      )}
    </div>
  );
};

export default ClaimFormPopup;
