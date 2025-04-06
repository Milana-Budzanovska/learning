import React, { useState } from 'react';

const KinestheticLesson: React.FC = () => {
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [shapesSelected, setShapesSelected] = useState<string[]>([]);
  const [pattern, setPattern] = useState<string[]>([]);
  const [patternComplete, setPatternComplete] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(2);

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
        alert('🚫 Щось пішло не так. Спробуй ще раз. Залишилось спроб: ' + (attemptsLeft));
        setPattern([]);
      } else {
        alert('😢 Немає більше спроб. Наступного разу вийде краще!');
      }
      return;
    }

    if (newPattern.length === correct.length) {
      setPatternComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">Кінестетичний урок</h1>

        {/* Вправа 1: Пальцевий лабіринт */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">🌀 Проведи пальцем лабіринтом</h2>
          <div className="bg-purple-100 p-6 rounded-xl shadow-md text-center">
            <p className="mb-4 text-lg">Уяви, що твій палець – це олівець. Повільно проведи його по уявному лабіринту (на екрані), не поспішаючи.</p>
            <img
              src="/assets/pngtree-black-rectangular-labyrinth-vector-background-png-image_5070257.png"
              alt="Maze"
              className="mx-auto rounded-xl w-full md:w-1/2 cursor-pointer"
              onClick={() => setMazeCompleted(true)}
            />
            {mazeCompleted && <p className="mt-3 text-green-600 font-bold">✅ Молодець! Завдання виконано!</p>}
          </div>
        </section>

        {/* Вправа 2: Вибір форми на дотик */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🔺 Вибери фігури</h2>
          <p className="text-center mb-3">Обери ті фігури, які мають закруглені краї. Натисни на них.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Коло', 'Квадрат', 'Овал', 'Трикутник', 'Прямокутник', 'Хмара'].map((shape, idx) => (
              <div
                key={idx}
                onClick={() => toggleShape(shape)}
                className={`cursor-pointer w-32 h-32 flex items-center justify-center rounded-2xl border-4 text-lg font-bold shadow-md transition ${
                  shapesSelected.includes(shape) ? 'bg-green-200 border-green-600' : 'bg-white border-gray-300'
                }`}
              >
                {shape}
              </div>
            ))}
          </div>
        </section>

        {/* Вправа 3: Побудуй візерунок */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">🎨 Відтвори шаблон</h2>
          <p className="text-center mb-3">Повторюй послідовність: 🔵🔴🟡🔵...</p>
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
            <p className="text-center text-green-600 font-semibold">✅ Чудово! Візерунок повторено правильно!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default KinestheticLesson;
