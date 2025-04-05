import React, { useState } from 'react';

const AudioLessonPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const correctAnswer = 'B';

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">Аудіо-урок</h1>
        <p className="text-center text-gray-600 text-lg">
          Прослухай аудіозапис і спробуй відповісти на запитання нижче 👇
        </p>

        <div className="bg-purple-100 p-4 rounded-xl shadow-md">
          <h3 className="font-semibold text-purple-600 mb-2">🎧 Слухай уважно</h3>
          <audio controls className="w-full">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            Ваш браузер не підтримує аудіо.
          </audio>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-purple-200">
          <h3 className="text-lg font-bold mb-3 text-purple-700">📝 Запитання:</h3>
          <p className="mb-4 text-gray-700">Що означає термін "нейровідмінність"?</p>

          <div className="space-y-2">
            {['A', 'B', 'C'].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name="answer"
                  value={opt}
                  disabled={isSubmitted}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mr-2"
                />
                {opt === 'A' && 'Порушення концентрації'}
                {opt === 'B' && 'Інший спосіб роботи мозку'}
                {opt === 'C' && 'Недостаток уваги з боку вчителя'}
              </label>
            ))}
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition"
            >
              Перевірити
            </button>
          ) : (
            <div className="mt-4 text-lg font-semibold">
              {selectedAnswer === correctAnswer ? (
                <span className="text-green-600">✅ Правильно! Молодець!</span>
              ) : (
                <span className="text-red-600">❌ Невірно. Правильна відповідь — {correctAnswer}.</span>
              )}
            </div>
          )}
        </div>

        {isSubmitted && (
          <div className="text-center text-purple-600 text-xl mt-6">
            🐬 Флік каже: "Ти чудово впорався! Продовжуй навчання!"
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLessonPage;
