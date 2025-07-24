import React, { useState } from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="feedback-wrapper">
      {!submitted ? (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2>Thanks for claiming your reward 🎁</h2>
          <p>We’d love to hear from you. Please leave us a review on Google:</p>
          <button type="submit">Proceed</button>
        </form>
      ) : (
        <div className="feedback-thankyou">
          <h2>Thank you 💬</h2>
          <p>Tap below to leave a Google Review:</p>
          <a
            href="https://maps.app.goo.gl/bpyhYaTdrXhRxLJP6?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
            className="google-review-link"
          >
            Leave a Google Review
          </a>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
