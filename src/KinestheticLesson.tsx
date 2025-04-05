import React, { useState } from 'react';

const KinestheticLesson: React.FC = () => {
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [shapesSelected, setShapesSelected] = useState<string[]>([]);
  const [patternComplete, setPatternComplete] = useState(false);

  const toggleShape = (shape: string) => {
    setShapesSelected(prev =>
      prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]
    );
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
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Maze_1.svg/800px-Maze_1.svg.png"
              alt="Maze"
              className="mx-auto rounded-xl w-full md:w-1/2"
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
                onClick={() => setPatternComplete(true)}
                className="text-4xl w-20 h-20 bg-white rounded-full shadow border hover:bg-gray-100"
              >
                {color}
              </button>
            ))}
          </div>
          {patternComplete && (
            <p className="text-center text-green-600 font-semibold">✅ Чудово! Візерунок повторено!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default KinestheticLesson;
