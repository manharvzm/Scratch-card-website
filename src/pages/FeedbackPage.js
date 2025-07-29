import React, { useState } from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [hovered, setHovered] = useState(null);

  const handleProceed = () => {
    window.location.href = 'https://www.google.com/maps/place/Manhar+Shopping+Mall/@18.1151287,83.409783,16z/data=!4m18!1m9!3m8!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!2sManhar+Shopping+Mall!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v!3m7!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D';
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
          <button className="proceed-btn mobile-btn" onClick={handleProceed}>Proceed</button>
        </div>

        <div className="feedback-right">
          <iframe
            title="Manhar Shopping Mall"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7584.115303690269!2d83.409783!3d18.1151287!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3be55a8568beed%3A0xdf49dfe85fa3dfc!2sManhar%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1753697543815!5m2!1sen!2sin"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <button className="proceed-btn desktop-btn" onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default FeedbackPage;
