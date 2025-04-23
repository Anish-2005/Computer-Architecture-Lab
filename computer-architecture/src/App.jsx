import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArchitectureLanding from './pages/Landing';
import RTLGenerator from './pages/RTLGenerator';
import WaveformGenerator from './pages/WaveformGenerator';
import Labs from './pages/Labs';
import LearnPage from './pages/LearnPage';
import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArchitectureLanding />} />
        <Route path="/vhdl-rtl" element={<RTLGenerator />} />
        <Route path="/vhdl-test" element={<WaveformGenerator />} />
        <Route path="/vhdl-labs" element={<Labs />} />
        <Route path="/learn" element={<LearnPage />} />
        {/* Add additional routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;