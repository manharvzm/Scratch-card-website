import React, { useEffect } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2 className="popup-title">🎁 Win up to ₹500!</h2>
        <p className="popup-text">
          Manhar Shopping Mall brings you an exciting shopping lottery! Scratch and win guaranteed prizes ranging from ₹50 to ₹500.
        </p>
        <p className="popup-subtext">Your reward awaits… start scratching!</p>
      </div>
    </div>
  );
};

export default Popup;
