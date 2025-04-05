import React, { useEffect, useState } from 'react';

const AudioLessonPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correctAnswer = 'B';

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

  useEffect(() => {
    const intro = "Hello! I'm Flick, your dolphin assistant. Today we'll learn something really interesting.";
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener('voiceschanged', () => speak(intro));
    } else {
      speak(intro);
    }
    return () => speechSynthesis.cancel();
  }, []);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    speak(`You selected option ${answer}`);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === correctAnswer) {
      speak("Great job! That’s the correct answer.");
    } else {
      speak("That’s okay! Mistakes help us learn. Let’s try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Audio Lesson</h1>

        {/* Assistant */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/flik.png"
            alt="Assistant"
            className="w-36 h-36 rounded-full shadow-md"
          />
          <button
            onClick={stopSpeaking}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            🛑 Stop Voice
          </button>
        </div>

        {/* Audio */}
        <div className="bg-purple-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🎧 Listen to the recording</h2>
          <audio controls className="w-full">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            Your browser does not support audio.
          </audio>
          <button
            onClick={() => speak("Now we’ll listen to the learning audio. Please listen carefully.")}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            🔊 Explain
          </button>
        </div>

        {/* Quiz */}
        <div className="bg-pink-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">📝 Check Yourself</h2>
          <p className="mb-3">What does neurodiversity mean?</p>
          <ul className="space-y-2">
            <li><button onClick={() => handleAnswer('A')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'A' ? 'bg-purple-200' : 'bg-white'}`}>A) A child who speaks many languages</button></li>
            <li><button onClick={() => handleAnswer('B')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'B' ? 'bg-purple-200' : 'bg-white'}`}>B) A brain that works differently from most</button></li>
            <li><button onClick={() => handleAnswer('C')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'C' ? 'bg-purple-200' : 'bg-white'}`}>C) A child who falls asleep quickly</button></li>
          </ul>
          {!submitted && selected && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700"
            >
              ✅ Check
            </button>
          )}
          <button
            onClick={() => speak("In this task, choose the correct answer. Don’t worry if you’re not sure. I’m here to help!")}
            className="mt-4 ml-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            🔊 Task Hint
          </button>
        </div>

        {/* Extra materials */}
        <div className="bg-white p-6 rounded-xl shadow-inner border-2 border-purple-200">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🔗 Extra Materials</h2>
          <div className="space-y-3">
            <a href="https://learningapps.org/display?v=pk6hxv9oa24" target="_blank" rel="noreferrer" className="block text-purple-600 underline hover:text-purple-800">
              ▶️ Interactive game “Guess the emotion”
            </a>
            <a href="https://www.youtube.com/watch?v=jh7wLjqI5PY" target="_blank" rel="noreferrer" className="block text-purple-600 underline hover:text-purple-800">
              📺 Watch video on neurodiversity
            </a>
            <button
              onClick={() => speak("If you want to learn more, try the game or watch the video below.")}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              🔊 About Extra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLessonPage;
