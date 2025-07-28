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
            title="Google Maps Review"
            src="https://www.google.com/maps/place/Manhar+Shopping+Mall/@18.1156761,83.4104265,17z/data=!4m8!3m7!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
