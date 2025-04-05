import React, { useState } from 'react';
import flick from '../assets/flick.png'; // заміни на свій шлях або імпорт

const AudioLessonPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct] = useState('b');

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Аудіо урок</h1>

        {/* Асистент + Аудіо */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
            <img src={flick} alt="Помічник" className="w-32 h-32 object-contain" />
          </div>
          <div className="flex-1 bg-purple-50 rounded-xl p-4 shadow-md">
            <h2 className="font-semibold text-purple-600 mb-2">🎧 Прослухай аудіозапис</h2>
            <audio controls className="w-full">
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
              Ваш браузер не підтримує аудіо.
            </audio>
          </div>
        </div>

        {/* Тест */}
        <div className="bg-white border-2 border-purple-300 p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-bold text-purple-700 mb-4">📝 Перевір себе</h2>
          <p className="mb-4 text-gray-700">Що означає термін “нейровідмінність”?</p>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label className="block mb-2">
              <input
                type="radio"
                name="question"
                value="a"
                checked={selectedAnswer === 'a'}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              /> Люди з однаковим стилем навчання
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                name="question"
                value="b"
                checked={selectedAnswer === 'b'}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              /> Люди, чий мозок працює інакше, ніж у більшості
            </label>
            <label className="block mb-4">
              <input
                type="radio"
                name="question"
                value="c"
                checked={selectedAnswer === 'c'}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              /> Стиль спілкування з учителем
            </label>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-6 rounded-full font-bold"
            >
              Перевірити
            </button>
            {submitted && (
              <div className="mt-4 text-lg font-semibold">
                {selectedAnswer === correct
                  ? <span className="text-green-600">✅ Правильно!</span>
                  : <span className="text-red-600">❌ Неправильно, спробуй ще!</span>}
              </div>
            )}
          </form>
        </div>

        {/* Додатковий контент */}
        <div className="bg-pink-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">🎮 Бонус: Спробуй інтерактив або переглянь відео</h3>
          <a
            href="https://youtu.be/jh7wLjqI5PY?si=EkVXjOG73-aHxnmN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-700 font-bold py-2 px-4 rounded-full shadow hover:bg-purple-50 transition"
          >
            📺 Переглянути відео про нейровідмінність
          </a>
        </div>
      </div>
    </div>
  );
};

export default AudioLessonPage;
