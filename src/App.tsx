import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LearningMenu from './LearningMenu';
import VisualLesson from './VisualLesson';
import AudioLesson from './AudioLesson';
import KinestheticLesson from './KinestheticLesson';
import NeuroReport from './NeuroReport';

const DyslexiaToggle = () => {
  useEffect(() => {
    const isEnabled = localStorage.getItem('dyslexia') === 'true';
    if (isEnabled) {
      document.body.classList.add('dyslexia-mode');
    }
  }, []);

  const toggle = () => {
    const enabled = document.body.classList.toggle('dyslexia-mode');
    localStorage.setItem('dyslexia', enabled.toString());
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggle}
        className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold py-2 px-4 rounded-full shadow"
      >
        🧠 Дислексія
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DyslexiaToggle />
      <Routes>
        <Route path="/" element={<LearningMenu />} />
        <Route path="/visual" element={<VisualLesson />} />
        <Route path="/audio" element={<AudioLesson />} />
        <Route path="/kinesthetic" element={<KinestheticLesson />} />
        <Route path="/neuro-report" element={<NeuroReport />} />
      </Routes>
    </Router>
  );
}

export default App;
