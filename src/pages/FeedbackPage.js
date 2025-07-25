import React from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const handleStarClick = () => {
    window.open(
      'https://maps.app.goo.gl/bpyhYaTdrXhRxLJP6?g_st=com.google.maps.preview.copy',
      '_blank'
    );
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-thankyou">
        <h2>Thanks for claiming your reward 🎁</h2>
        <p>We’d love to hear from you. Please leave us a review on Google:</p>
        <div className="star-row">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="star" onClick={handleStarClick}>
              ⭐
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
