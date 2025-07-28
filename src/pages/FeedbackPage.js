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
            src="https://www.google.com/maps/embed?pb=!4v1696851969213!6m8!1m7!1sCAoSLEFGMVFpcE1wRXNoVWZqd1dQVjlJTHRZUzVKMlBfNUJwb0Y5UHZQTk4zUjVm!2m2!1d17.385044!2d78.486671!3f0!4f0!5f0.7820865974627469"
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
