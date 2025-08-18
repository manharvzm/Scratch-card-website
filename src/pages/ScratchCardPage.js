// src/pages/ScratchCardPage.js
import React, { useEffect, useState } from 'react';
import ScratchCanvas from './ScratchCanvas';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../PopupProvider';
import './ScratchCardPage.css';

export default function ScratchCardPage() {
  const [prize, setPrize] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const { triggerPopup } = usePopup();
  const navigate = useNavigate();

  useEffect(() => {
    const pool = [
      ...Array(40).fill(5),
      ...Array(30).fill(10),
      ...Array(20).fill(15),
      ...Array(10).fill(20),
      ...Array(5).fill(25),
      ...Array(3).fill(30),
      ...Array(2).fill(40),
      50
    ];
    setPrize(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  const onComplete = () => {
    setRevealed(true);
    setShowPrizePopup(true);
    setTimeout(() => setShowPrizePopup(false), 2000);
  };

  const handleClaim = async () => {
    setClaiming(true);
    await new Promise(r => setTimeout(r, 900));
    await triggerPopup();
    navigate('/');
    setClaiming(false);
  };

  return (
    <div className="scratch-page-container">
      <img src="/images/bg2.jpg" alt="background" className="bg-image" />
      <div className="overlay-gradient" />
      <div className="orbs">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>
      <div className="rings">
        <i className="ring r1" />
        <i className="ring r2" />
        <i className="ring r3" />
      </div>
      <div className="sparkles">
        {Array.from({ length: 36 }).map((_, i) => (
          <i key={i} style={{ '--i': i + 1 }} />
        ))}
      </div>

      <div className="content-wrapper">
        <div className="header-section">
          <img src="/images/sample-logo.jpg" alt="Logo" className="logo" />
          <h1 className="heading">
            <span className="heading-text">Manhar Shopping Mall</span>
            <span className="heading-underline" />
          </h1>
        </div>

        <div className={`scratch-card-glow ${revealed ? 'glow-disabled' : ''}`}>
          <div className="glow-border" />
          <ScratchCanvas
            width={300}
            height={300}
            coverImage="/images/qr6.jpg"
            brushSize={26}
            finishPercent={40}
            onComplete={onComplete}
          >
            <div className="scratch-content-layer">
              {revealed && (
                <>
                  <div className={`burst ${showPrizePopup ? 'burst-show' : ''}`}>
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} style={{ '--d': i }} />
                    ))}
                  </div>
                  {showPrizePopup && (
                    <div className="reveal-amount">
                      <h2>🎉 You won ₹{prize}</h2>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScratchCanvas>
          {!revealed && <div className="shine" />}
        </div>

        {revealed && !showPrizePopup && (
          <div className="after-reveal">
            <button className={`cta ${claiming ? 'loading' : ''}`} onClick={handleClaim} disabled={claiming}>
              {claiming ? 'Submitting...' : 'Claim Reward'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
