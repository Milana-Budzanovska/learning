import React, { useState, useEffect } from 'react';

const KinestheticLesson: React.FC = () => {
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [shapesSelected, setShapesSelected] = useState<string[]>([]);
  const [pattern, setPattern] = useState<string[]>([]);
  const [patternComplete, setPatternComplete] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');

  const texts = {
    title: language === 'uk' ? 'Кінестетичний урок' : 'Kinesthetic Lesson',
    mazeTitle: language === 'uk' ? 'Проведи пальцем лабіринтом' : 'Trace the maze',
    mazeText: language === 'uk'
      ? 'Уяви, що твій палець – це олівець. Повільно проведи його по уявному лабіринту (на екрані), не поспішаючи.'
      : 'Imagine your finger is a pencil. Slowly trace the invisible maze on the screen.',
    mazeDone: language === 'uk' ? '✅ Молодець! Завдання виконано!' : '✅ Well done! Task complete!',

    shapeTitle: language === 'uk' ? 'Вибери фігури' : 'Pick the shapes',
    shapeHint: language === 'uk'
      ? 'Обери ті фігури, які мають закруглені краї. Натисни на них.'
      : 'Choose the shapes with rounded edges. Click on them.',

    patternTitle: language === 'uk' ? 'Відтвори шаблон' : 'Repeat the pattern',
    patternHint: language === 'uk'
      ? 'Повторюй послідовність: 🔵🔴🟡🔵...'
      : 'Repeat the sequence: 🔵🔴🟡🔵...',

    patternCorrect: language === 'uk'
      ? '✅ Чудово! Візерунок повторено правильно!'
      : '✅ Great! Pattern repeated correctly!',

    attemptsLeftMsg: (a: number) =>
      language === 'uk'
        ? `🚫 Щось пішло не так. Спробуй ще раз. Залишилось спроб: ${a}`
        : `🚫 Something went wrong. Try again. Attempts left: ${a}`,

    noAttempts: language === 'uk'
      ? '😢 Немає більше спроб. Наступного разу вийде краще!'
      : '😢 No more attempts. You’ll do better next time!',

    stop: language === 'uk' ? '🛑 Зупинити мовлення' : '🛑 Stop voice',
    langSwitch: language === 'uk' ? '🌐 English version' : '🌐 Українська версія',
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'uk' ? 'uk-UA' : 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v =>
      language === 'uk'
        ? v.lang === 'uk-UA' || v.name.toLowerCase().includes('google')
        : v.lang === 'en-US' && v.name.toLowerCase().includes('google')
    );
    if (voice) utterance.voice = voice;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => speechSynthesis.cancel();

  const toggleShape = (shape: string) => {
    setShapesSelected(prev =>
      prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]
    );
  };

  const handlePatternClick = (color: string) => {
    const newPattern = [...pattern, color];
    setPattern(newPattern);

    const correct = ['🔵', '🔴', '🟡', '🔵'];
    const isCorrectSoFar = correct.slice(0, newPattern.length).every((v, i) => v === newPattern[i]);

    if (!isCorrectSoFar) {
      if (attemptsLeft > 0) {
        setAttemptsLeft(prev => prev - 1);
        alert(texts.attemptsLeftMsg(attemptsLeft));
        setPattern([]);
      } else {
        alert(texts.noAttempts);
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
        {/* Language Button */}
        <div className="flex justify-between mb-4">
          <img src="/assets/flik.png" alt="Flik" className="w-20 h-20 rounded-full" />
          <button
            onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
            className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-full shadow"
          >
            {texts.langSwitch}
          </button>
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-bold text-purple-700 text-center mb-8"
          onMouseEnter={() => speak(texts.title)}
        >
          {texts.title}
        </h1>

        {/* Maze */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">🌀 {texts.mazeTitle}</h2>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p
              className="mb-4 text-lg"
              onMouseEnter={() => speak(texts.mazeText)}
            >
              {texts.mazeText}
            </p>
            <img
              src="/assets/pngtree-black-rectangular-labyrinth-vector-background-png-image_5070257.png"
              alt="Maze"
              className="mx-auto rounded-xl w-full md:w-1/2 cursor-pointer"
              onClick={() => setMazeCompleted(true)}
            />
            {mazeCompleted && (
              <p className="mt-3 text-green-600 font-bold">{texts.mazeDone}</p>
            )}
          </div>
        </section>

        {/* Shapes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🔺 {texts.shapeTitle}</h2>
          <p
            className="text-center mb-3"
            onMouseEnter={() => speak(texts.shapeHint)}
          >
            {texts.shapeHint}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {shapeOptions.map((shape, idx) => (
              <div
                key={idx}
                onClick={() => toggleShape(shape)}
                onMouseEnter={() => speak(shape)}
                className={`cursor-pointer w-32 h-32 flex items-center justify-center rounded-2xl border-4 text-lg font-bold shadow-md transition ${
                  shapesSelected.includes(shape) ? 'bg-green-200 border-green-600' : 'bg-white border-gray-300'
                }`}
              >
                {shape}
              </div>
            ))}
          </div>
        </section>

        {/* Pattern Game */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">🎨 {texts.patternTitle}</h2>
          <p
            className="text-center mb-3"
            onMouseEnter={() => speak(texts.patternHint)}
          >
            {texts.patternHint}
          </p>
          <div className="flex justify-center gap-4 mb-4">
            {['🔵', '🔴', '🟡'].map((color, idx) => (
              <button
                key={idx}
                onClick={() => handlePatternClick(color)}
                onMouseEnter={() => speak(color)}
                className="text-4xl w-20 h-20 bg-white rounded-full shadow border hover:bg-gray-100"
              >
                {color}
              </button>
            ))}
          </div>
          {patternComplete && (
            <p className="text-center text-green-600 font-semibold">
              {texts.patternCorrect}
            </p>
          )}
        </section>

        {/* Stop Voice */}
        <div className="flex justify-center mt-6">
          <button
            onClick={stopSpeaking}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            {texts.stop}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KinestheticLesson;
