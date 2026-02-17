import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DetectorPage from './pages/DetectorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detector" element={<DetectorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
