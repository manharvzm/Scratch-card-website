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
            title="Manhar Shopping Mall"
            src="https://www.google.com/maps/place/Manhar+Shopping+Mall/@18.1151287,83.409783,16.32z/data=!4m16!1m9!3m8!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!2sManhar+Shopping+Mall!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v!3m5!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!8m2!3d18.1156761!4d83.4104265!16s%2Fg%2F11h1gm43v?entry=ttu"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
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
