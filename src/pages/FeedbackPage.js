import React, { useState } from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [hovered, setHovered] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-container">
        <div className="feedback-left">
          <h2>Thanks for claiming your reward 🎁</h2>
          <p>We’d love to hear from you. Please leave us a review:</p>
          <div className="star-row">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star-icon ${hovered !== null && i <= hovered ? 'filled' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="feedback-right">
          <iframe
            title="Google Maps Review Page"
            src="https://maps.app.goo.gl/bpyhYaTdrXhRxLJP6?g_st=com.google.maps.preview.copy"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <p>✅ Review submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
