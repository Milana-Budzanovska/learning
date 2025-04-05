import React from 'react';

const Assistant: React.FC = () => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice =>
      voice.lang.includes('en') && voice.name.toLowerCase().includes('google')
    );
    if (englishVoice) utterance.voice = englishVoice;

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  const handleClick = () => {
    speak("Hello! I'm Flick, your dolphin guide. I'm always here to help you learn in a fun and friendly way.");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center">
      <img
        src="/assets/flik.png"
        alt="Flick the assistant"
        className="w-24 h-24 rounded-full shadow-lg border-2 border-purple-300 hover:scale-105 transition cursor-pointer"
        onClick={handleClick}
      />
      <button
        onClick={stopSpeaking}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
      >
        🛑 Stop
      </button>
    </div>
  );
};

export default Assistant;
