import React, { useState, useEffect } from 'react';
import './ClaimFormPopup.css';
import FeedbackPage from './FeedbackPage';

const ClaimFormPopup = ({ prize, onClose }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', prize: '' });
  const [error, setError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

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

    try {
      const checkRes = await fetch('https://admin-backend-orcin-six.vercel.app/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setError('You are already a customer');
        return;
      }

      await fetch('https://admin-backend-orcin-six.vercel.app/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setShowFeedback(true);
    } catch (err) {
      setError('Server error');
    }
  };

  if (showFeedback) {
    return <FeedbackPage />;
  }

  return (
    <div className="form-popup-overlay">
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
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Submit</button>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default ClaimFormPopup;
