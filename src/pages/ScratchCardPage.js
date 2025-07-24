import React, { useState } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import ClaimFormPopup from './ClaimFormPopup';
import './ScratchCardPage.css';

const ScratchCardPage = () => {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);

  const prizes = Array(70).fill(50).concat([75, 100, 125, 150, 175, 200]);

  const handleScratchComplete = () => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
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
    <div className="scratch-container">
      <div className="header-section-1">
        <img src="/images/sample-logo.jpg" alt="Logo" className="logo" />
        <h1 className="heading">Manhar Enterprises</h1>
      </div>

      <div className="scratch-section-section-2">
        <div className="scratch-card-center-section-2">
          <div className="scratch-card-wrapper-section-2">
            <ScratchCard
              width={300}
              height={300}
              image="/images/qr3.jpg"
              finishPercent={40}
              onComplete={handleScratchComplete}
              brushSize={20}
            >
              <div className="scratch-content-layer-section-2">
                {revealed && showPrizePopup && (
                  <div className="reveal-amount-section-2">
                    <h2>🎉 You won ₹{prize}</h2>
                  </div>
                )}
              </div>
            </ScratchCard>
          </div>
        </div>
      </div>

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
