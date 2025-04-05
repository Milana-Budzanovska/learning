// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LearningMenu from './LearningMenu';
import VisualLesson from './VisualLesson';
import AudioLesson from './AudioLesson';
import KinestheticLesson from './KinestheticLesson';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearningMenu />} />
        <Route path="/visual" element={<VisualLesson />} />
        <Route path="/audio" element={<AudioLesson />} />
        <Route path="/kinesthetic" element={<KinestheticLesson />} />
      </Routes>
    </Router>
  );
}

export default App;
