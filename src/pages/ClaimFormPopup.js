import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaGoogle } from 'react-icons/fa';
import ScratchCard from 'react-scratchcard-v2';
import './ClaimFormPopup.css';

const ClaimFormPopup = ({ prize, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', mobile: '', prize: '' });
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState('popup');
  const [prizeState, setPrize] = useState(null);
  const [showPrizePopup, setShowPrizePopup] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [glowDisabled, setGlowDisabled] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const randomPrize = prizePool[Math.floor(Math.random() * prizePool.length)];
      setPrize(randomPrize);
      setStep('form');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prize !== null && prize !== undefined) {
      setFormData(prev => ({ ...prev, prize }));
    }
  }, [prize]);

  const handleChange = (e) => {
    if (!e?.target?.name) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobile(formData.mobile)) {
      setError('Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const checkRes = await fetch('https://admin-backend-orcin-six.vercel.app/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setLoading(false);
        setError('You are already a customer');
        return;
      }
      await fetch('https://admin-backend-orcin-six.vercel.app/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setLoading(false);
      setShowSubmitPopup(true);
      setTimeout(() => {
        setShowSubmitPopup(false);
        setFormData({ name: '', mobile: '', prize: '' });
        setFormVisible(false);
        setShowPopup(false);
        setStep('popup');
        onSubmit();
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError('Server error');
    }
  };

  const handleScratchComplete = () => {
    setRevealed(true);
    setShowPrizePopup(true);
    setTimeout(() => {
      setShowPrizePopup(false);
      setShowSubmitPopup(true);
      setGlowDisabled(true);
    }, 3000);
  };

  const handleScratchWinClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="main">
      <div className="bg-ornaments" aria-hidden="true">
        <span className="ring r1"></span>
        <span className="ring r2"></span>
        <span className="ring r3"></span>
        <span className="bubble b1"></span>
        <span className="bubble b2"></span>
        <span className="bubble b3"></span>
        <span className="bubble b4"></span>
        <span className="orb o1"></span>
        <span className="orb o2"></span>
      </div>
      <div className="section1">
        <h1>Manahar Shopping Mall</h1>
        <hr />
      </div>
      <div className="section2">
        <a
          href="https://www.instagram.com/_attach.com_?igsh=MXhpZWI4Z2FjaHJhZQ=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com/_attach.com_?igsh=MXhpZWI4Z2FjaHJhZQ=="
          target="_blank"
          rel="noopener noreferrer"
        >
        <FaFacebook className="social-icon" />
        </a>

        <a
          href="https://www.google.com/maps/place/Manhar+Shopping+Mall"
          target="_blank"
          rel="noopener noreferrer"
        >
        <FaGoogle className="social-icon" />
        </a>
      </div>
      <div className="section3">
        <div className="sub-section1">
          <button onClick={() => setFormVisible(!formVisible)} className="form-toggle-btn">Fill the Form</button>
        </div>
        {formVisible && (
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              <div className="input-container">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-container">
                <label>Mobile:</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="form-input"
                  required
                  maxLength="10"
                  pattern="[6-9][0-9]{9}"
                  disabled={loading}
                />
              </div>
              {error && <p className="error-text">{error}</p>}
            </form>
          </div>
        )}
        <div className="sub-section2">
          <button onClick={() => window.location.href = "https://www.google.com/maps/place/Manhar+Shopping+Mall/@18.1156812,83.4078516,17z/data=!4m8!3m7!1s0x3a3be55a8568beed:0xdf49dfe85fa3dfc!8m2!3d18.1156761!4d83.4104265!9m1!1b1!16s%2Fg%2F11h1gm43v!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDgxMS4wIKXMDSoASAFQAw%3D%3D"} className="feedback-btn">Give the Feedback</button>
        </div>
        <div className="sub-section3">
          <button onClick={handleScratchWinClick} className="scratch-btn">Scratch & Win</button>
        </div>

        <div className="sub-section4">
          {showSubmitButton && !loading && (
            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          )}
          {loading && (
            <div className="loader-overlay">
              <svg className="pl" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">
                <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
              </svg>
              <p className="loader-text">Processing your claim…</p>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className={`scratch-card-glow ${glowDisabled ? 'glow-disabled' : ''}`}>
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
                    <h2>🎉 You won ₹{prizeState}</h2>
                  </div>
                )}
              </div>
            </ScratchCard>
          </div>
        </div>
      )}

      {showSubmitPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Claim Submitted Successfully</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimFormPopup;
