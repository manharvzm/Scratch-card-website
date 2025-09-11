import React from 'react';
import './Popup.css';

export default function Popup() {
  return (
    <div className="popup-overlay">
      <div className="popup-ambient">
        {Array.from({ length: 36 }).map((_, i) => (
          <i key={i} style={{ '--i': i + 1 }} />
        ))}
      </div>
      <div className="popup-card">
        <div className="popup-glow" />
        <div className="popup-badge">🎁</div>
        <h2 className="popup-title">Win up to 30%</h2>
        <p className="popup-text">
          Manhar Shopping Mall brings you a shopping lottery. Scratch and win guaranteed prizes from 10% off to 30% off.
        </p>
        <p className="popup-subtext">Your reward awaits… start scratching!</p>
        <div className="popup-shine" />
      </div>
    </div>
  );
}
