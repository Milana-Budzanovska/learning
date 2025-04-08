import React, { useState, useEffect } from 'react';

const KinestheticLesson: React.FC = () => {
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [shapesSelected, setShapesSelected] = useState<string[]>([]);
  const [incorrectShapes, setIncorrectShapes] = useState<string[]>([]);
  const [pattern, setPattern] = useState<string[]>([]);
  const [patternComplete, setPatternComplete] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');

  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const speak = (text: string) => {
    if (language === 'en') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 1.2;
      utterance.rate = 0.95;
      utterance.volume = 1;

      const voices = speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('google'));
      if (voice) utterance.voice = voice;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => speechSynthesis.cancel();

  const shapeAudios: Record<string, string> = {
    'Коло': '/assets/коло.mp3',
    'Квадрат': '/assets/квадрат.mp3',
    'Овал': '/assets/овал.mp3',
    'Трикутник': '/assets/трикутник.mp3',
    'Прямокутник': '/assets/прямокутник.mp3',
    'Хмара': '/assets/хмара.mp3',
    'Circle': '/assets/коло.mp3',
    'Square': '/assets/квадрат.mp3',
    'Oval': '/assets/овал.mp3',
    'Triangle': '/assets/трикутник.mp3',
    'Rectangle': '/assets/прямокутник.mp3',
    'Cloud': '/assets/хмара.mp3'
  };

  const colorAudios: Record<string, string> = {
    '🔵': '/assets/синій.mp3',
    '🔴': '/assets/червоний.mp3',
    '🟡': '/assets/жовтий .mp3'
  };

  const toggleShape = (shape: string) => {
    const audioFile = shapeAudios[shape];
    if (audioFile) playAudio(audioFile);

    setShapesSelected(prev => {
      const isSelected = prev.includes(shape);
      const updated = isSelected ? prev.filter(s => s !== shape) : [...prev, shape];

      if (!isSelected) {
        const correctShapes = language === 'uk' ? ['Коло', 'Овал', 'Хмара'] : ['Circle', 'Oval', 'Cloud'];
        if (correctShapes.includes(shape)) {
          playAudio('/assets/Молодець, правильна відповідь .mp3');
        } else {
          playAudio('/assets/ойой,_помилка,_не_засмучуйся,_спробуй_іще.mp3');
          setIncorrectShapes(prevIncorrect => [...prevIncorrect, shape]);
        }
      }

      return updated;
    });
  };

  const handlePatternClick = (color: string) => {
    const audioFile = colorAudios[color];
    if (audioFile) playAudio(audioFile);

    const newPattern = [...pattern, color];
    setPattern(newPattern);

    const correct = ['🔵', '🔴', '🟡', '🔵'];
    const isCorrectSoFar = correct.slice(0, newPattern.length).every((v, i) => v === newPattern[i]);

    if (!isCorrectSoFar) {
      if (attemptsLeft > 0) {
        setAttemptsLeft(prev => prev - 1);
        alert(language === 'uk'
          ? `🚫 Щось пішло не так. Спробуй ще раз. Залишилось спроб: ${attemptsLeft}`
          : `🚫 Something went wrong. Try again. Attempts left: ${attemptsLeft}`);
        setPattern([]);
      } else {
        alert(language === 'uk'
          ? '😢 Немає більше спроб. Наступного разу вийде краще!'
          : '😢 No more attempts. You’ll do better next time!');
      }
      return;
    }

    if (newPattern.length === correct.length) {
      setPatternComplete(true);
    }
  };

  const shapeOptions = language === 'uk'
    ? ['Коло', 'Квадрат', 'Овал', 'Трикутник', 'Прямокутник', 'Хмара']
    : ['Circle', 'Square', 'Oval', 'Triangle', 'Rectangle', 'Cloud'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-between mb-4">
          <img src="/assets/flik.png" alt="Flik" className="w-20 h-20 rounded-full" />
          <button
            onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
            className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-full shadow"
          >
            {language === 'uk' ? '🌐 English version' : '🌐 Українська версія'}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          {language === 'uk' ? 'Кінестетичний урок' : 'Kinesthetic Lesson'}
        </h1>

        <!-- Maze and Shapes section stays the same -->

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 cursor-pointer" onClick={() => language === 'uk' ? playAudio('/assets/відтвори шаблон.mp3') : speak('Repeat the pattern')}>
            🎨 {language === 'uk' ? 'Відтвори шаблон' : 'Repeat the pattern'}
          </h2>
          <p className="text-center mb-3">
            {language === 'uk'
              ? 'Повторюй послідовність: 🔵🔴🟡🔵...'
              : 'Repeat the sequence: 🔵🔴🟡🔵...'}
          </p>
          <div className="flex justify-center gap-4 mb-4">
            {['🔵', '🔴', '🟡'].map((color, idx) => (
              <button
                key={idx}
                onClick={() => handlePatternClick(color)}
                className="text-4xl w-20 h-20 bg-white rounded-full shadow border hover:bg-gray-100"
              >
                {color}
              </button>
            ))}
          </div>
          {patternComplete && (
            <p className="text-center text-green-600 font-semibold">
              {language === 'uk'
                ? '✅ Чудово! Візерунок повторено правильно!'
                : '✅ Great! Pattern repeated correctly!'}
            </p>
          )}
        </section>

        <div className="flex justify-center mt-6">
          <button
            onClick={stopSpeaking}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            {language === 'uk' ? '🛑 Зупинити мовлення' : '🛑 Stop voice'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KinestheticLesson;
