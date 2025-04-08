// src/KinestheticLesson.tsx
import React, { useState } from 'react';

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
      playAudio('/assets/молодець завдання виконано.mp3');
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

        <section className="mb-12">
          <h2
            className="text-2xl font-bold text-purple-600 mb-4 cursor-pointer"
            onClick={() => language === 'uk' ? playAudio('/assets/проведи пальцем лабіринтом.mp3') : speak('Trace the maze')}
          >
            🌀 {language === 'uk' ? 'Проведи пальцем лабіринтом' : 'Trace the maze'}
          </h2>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p
              className="mb-4 text-lg cursor-pointer"
              onClick={() => language === 'uk' ? playAudio('/assets/уяви що твій палець..mp3') : speak('Imagine your finger is a pencil...')}
            >
              {language === 'uk'
                ? 'Уяви, що твій палець – це олівець. Повільно проведи його по уявному лабіринту (на екрані), не поспішаючи.'
                : 'Imagine your finger is a pencil. Slowly trace the invisible maze on the screen.'}
            </p>
            <img
              src="/assets/pngtree-black-rectangular-labyrinth-vector-background-png-image_5070257.png"
              alt="Maze"
              className="mx-auto rounded-xl w-full md:w-1/2 cursor-pointer"
              onClick={() => setMazeCompleted(true)}
            />
            {mazeCompleted && (
              <p className="mt-3 text-green-600 font-bold">
                {language === 'uk' ? '✅ Молодець! Завдання виконано!' : '✅ Well done! Task complete!'}
              </p>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold text-pink-600 mb-4 cursor-pointer"
            onClick={() => language === 'uk' ? playAudio('/assets/вибери фігуру.mp3') : speak('Pick the shapes')}
          >
            🔺 {language === 'uk' ? 'Вибери фігури' : 'Pick the shapes'}
          </h2>
          <p className="text-center mb-3">
            {language === 'uk'
              ? 'Обери ті фігури, які мають закруглені краї. Натисни на них.'
              : 'Choose the shapes with rounded edges. Click on them.'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {shapeOptions.map((shape, idx) => (
              <div
                key={idx}
                onClick={() => toggleShape(shape)}
                className={`cursor-pointer w-32 h-32 flex items-center justify-center rounded-2xl border-4 text-lg font-bold shadow-md transition ${
                  shapesSelected.includes(shape)
                    ? 'bg-green-200 border-green-600'
                    : incorrectShapes.includes(shape)
                    ? 'bg-red-100 border-red-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                {shape}
              </div>
            ))}
          </div>
        </section>

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
