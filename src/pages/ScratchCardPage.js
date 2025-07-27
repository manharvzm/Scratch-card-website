import React, { useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import ClaimFormPopup from './ClaimFormPopup';
import Popup from './Popup';
import './ScratchCardPage.css';

const ScratchCardPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [showIntroPopup, setShowIntroPopup] = useState(true);

  const prizePool = [
    ...Array(40).fill(5),
    ...Array(30).fill(10),
    ...Array(20).fill(15),
    ...Array(10).fill(20),
    ...Array(5).fill(25),
    ...Array(3).fill(30),
    ...Array(2).fill(40),
    50
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroPopup(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleScratchComplete = () => {
    const randomPrize = prizePool[Math.floor(Math.random() * prizePool.length)];
    setPrize(randomPrize);
    setRevealed(true);
    setShowPrizePopup(true);
    setTimeout(() => {
      setShowPrizePopup(false);
      setShowFormPopup(true);
    }, 2000);
  };

  const handleFormClose = () => {
    setShowFormPopup(false);
  };

  return (
    <div className="scratch-page-container">
      {showIntroPopup && <Popup onClose={() => setShowIntroPopup(false)} />}

      {!showIntroPopup && (
        <div className="content-wrapper">
          <div className="header-section">
            <img src="/images/sample-logo.jpg" alt="Logo" className="logo" />
            <h1 className="heading">
              <span className="heading-text">Manhar Shopping Mall</span>
              <span className="heading-underline" />
            </h1>
          </div>

          <div className={`scratch-card-glow ${revealed ? 'glow-disabled' : ''}`}>
            <ScratchCard
              width={300}
              height={300}
              image="/images/qr6.jpg"
              finishPercent={40}
              onComplete={handleScratchComplete}
              brushSize={20}
            >
              <div className="scratch-content-layer">
                {revealed && showPrizePopup && (
                  <div className="reveal-amount">
                    <h2>🎉 You won ₹{prize}</h2>
                  </div>
                )}
              </div>
            </ScratchCard>
          </div>
        </div>
      )}

      {showFormPopup && (
        <ClaimFormPopup
          prize={prize}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default ScratchCardPage;
