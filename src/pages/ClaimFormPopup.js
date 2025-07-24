import React, { useState, useEffect } from 'react';
import './ClaimFormPopup.css';
import FeedbackPage from './FeedbackPage';

const ClaimFormPopup = ({ prize, onClose }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', prize: '' });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkRes = await fetch('http://manhar-backend.vercel.app/api/scratch/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setError('You are already a customer');
        return;
      }

      await fetch('http://manhar-backend.vercel.app/api/scratch/claim', {
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
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
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
