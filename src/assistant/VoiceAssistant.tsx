import React, { useEffect } from 'react';

const Assistant: React.FC = () => {
  useEffect(() => {
    const message = 'Привіт! Я Флік — твій дельфін-помічник. Обери урок, і ми розпочнемо захопливу пригоду разом!';
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'uk-UA';

    // Вибираємо найприємніший голос
    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      const ukrainianVoices = voices.filter(v => v.lang.includes('uk') || v.name.toLowerCase().includes('ukrainian'));

      if (ukrainianVoices.length > 0) {
        utterance.voice = ukrainianVoices[0]; // бере перший український
      } else {
        // fallback — голос, схожий на дитячий або м'який
        const softVoice = voices.find(v => v.name.toLowerCase().includes('google') && v.lang.includes('en'));
        if (softVoice) utterance.voice = softVoice;
      }

      utterance.pitch = 1.5; // вища інтонація — дитяча
      utterance.rate = 0.9; // трохи повільніше — лагідно
      utterance.volume = 1;

      speechSynthesis.speak(utterance);
    };

    // Деякі браузери завантажують голоси з затримкою
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', setVoice);
    } else {
      setVoice();
    }

    return () => {
      speechSynthesis.cancel(); // очищення
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <img
        src="/assets/flick.png"
        alt="Флік - помічник"
        className="w-24 h-24 rounded-full shadow-lg hover:scale-105 transition-transform"
      />
    </div>
  );
};

export default Assistant;
