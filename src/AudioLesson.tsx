import React from 'react';

const AudioLessonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Аудіо-урок</h1>

        {/* Асистент */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/flik.png"
            alt="Асистент"
            className="w-36 h-36 rounded-full shadow-md"
          />
        </div>

        {/* Аудіо */}
        <div className="bg-purple-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🎧 Прослухай запис</h2>
          <audio controls className="w-full">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            Ваш браузер не підтримує аудіо.
          </audio>
        </div>

        {/* Тест */}
        <div className="bg-pink-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">📝 Перевір себе</h2>
          <p className="mb-3">Що означає "нейровідмінність"?</p>
          <ul className="space-y-2">
            <li><button className="w-full bg-white p-3 rounded-lg shadow hover:bg-purple-50">А) Це коли дитина вивчає багато мов</button></li>
            <li><button className="w-full bg-white p-3 rounded-lg shadow hover:bg-purple-50">Б) Це стан, коли мозок працює не так, як у більшості</button></li>
            <li><button className="w-full bg-white p-3 rounded-lg shadow hover:bg-purple-50">В) Це коли дитина швидко засинає</button></li>
          </ul>
        </div>

        {/* Рекомендований контент */}
        <div className="bg-white p-6 rounded-xl shadow-inner border-2 border-purple-200">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">🔗 Додаткові матеріали</h2>
          <div className="space-y-3">
            <a
              href="https://learningapps.org/display?v=pk6hxv9oa24"
              target="_blank"
              rel="noreferrer"
              className="block text-purple-600 underline hover:text-purple-800"
            >
              ▶️ Інтерактивна гра «Вгадай емоцію»
            </a>
            <a
              href="https://www.youtube.com/watch?v=jh7wLjqI5PY"
              target="_blank"
              rel="noreferrer"
              className="block text-purple-600 underline hover:text-purple-800"
            >
              📺 Подивись відео на тему нейровідмінностей
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLessonPage;
