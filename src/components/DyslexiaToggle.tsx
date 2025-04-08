// src/components/DyslexiaToggle.tsx
import React, { useEffect, useState } from 'react';

const DyslexiaToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dyslexiaMode');
    if (stored === 'true') {
      document.body.classList.add('dyslexia-mode');
      setEnabled(true);
    }
  }, []);

  const toggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem('dyslexiaMode', newValue.toString());
    document.body.classList.toggle('dyslexia-mode');
  };

  return (
    <button
      onClick={toggle}
      className="bg-yellow-100 hover:bg-yellow-200 text-purple-700 font-semibold px-4 py-2 rounded-full shadow transition"
    >
      {enabled ? '🔓 Звичайний шрифт' : '👁 Шрифт для дислексії'}
    </button>
  );
};

export default DyslexiaToggle;
