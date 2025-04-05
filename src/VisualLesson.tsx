import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisualLessonPage = () => {
  const navigate = useNavigate();
  const [lessonStarted, setLessonStarted] = useState(false);

  const startLesson = () => {
    setLessonStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Візуальний урок</h1>

        {!lessonStarted ? (
          <div className="text-center">
            <button
              onClick={startLesson}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition"
            >
              ▶️ Пройти урок
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-purple-700">Текстовий матеріал</h2>
              <p className="text-gray-800">
                Нейровідмінність — це термін, який описує людей, чий мозок функціонує інакше, ніж у більшості. Це може стосуватись аутизму,
                СДУГ, дислексії, тривожних розладів, синдромів сенсорної обробки та інших станів. Традиційна система освіти часто не враховує
                ці відмінності. Дитина, яка постійно рухається або не здатна концентруватись 45 хвилин поспіль, часто сприймається як
                «проблемна». Але в дійсності її мозок просто працює інакше. FocusEd Baby — це платформа, створена саме з цією метою: дати кожній
                дитині шанс вчитись у своєму ритмі, у своєму стилі, з урахуванням її справжніх потреб.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-100 p-4 rounded-xl shadow-md">
                <h3 className="font-semibold text-purple-600 mb-2">🎥 Подивись відео</h3>
                <iframe
                  width="100%"
                  height="250"
                  src="https://youtu.be/jh7wLjqI5PY?si=EkVXjOG73-aHxnmN"
                  title="Відео уроку"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl shadow-md">
                <h3 className="font-semibold text-purple-600 mb-2">🎧 Послухай аудіо</h3>
                <audio controls className="w-full">
                  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                  Ваш браузер не підтримує аудіо.
                </audio>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default VisualLessonPage;
