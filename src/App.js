import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScratchCardPage from './pages/ScratchCardPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScratchCardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
