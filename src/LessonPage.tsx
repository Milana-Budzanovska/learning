import React, { useEffect, useState } from "react";

const LessonPage: React.FC = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const RECOMMENDED_TIME = 300;
  const BUFFER = 90;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeSpent > RECOMMENDED_TIME + BUFFER) {
      setShowAlternatives(true);
    }
  }, [timeSpent]);

  const handleFinish = () => {
    setShowAlternatives(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-6 text-gray-800 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-xl p-6 sm:p-10 space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Що таке нейродивергентність?
        </h1>

        <p className="whitespace-pre-wrap leading-relaxed text-lg">
          {"Нейродивергентність — це термін, який описує людей, чий мозок функціонує інакше, ніж у більшості. ".repeat(25)}
        </p>

        <p className="text-sm text-center text-gray-500">
          ⏱️ Час читання: {timeSpent} сек.
        </p>

        {!showAlternatives && (
          <div className="flex justify-center">
            <button onClick={handleFinish} className="main-button">
              Не цікаво. Змінити формат
            </button>
          </div>
        )}

        {showAlternatives && (
          <div className="bg-yellow-50 border-l-4 border-yellow-300 p-6 rounded-3xl shadow-md">
            <p className="text-yellow-800 font-semibold mb-4 text-lg text-center">
              Обери зручний формат для повторення:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://youtu.be/jh7wLjqI5PY?si=yKKStPyg4rvCeC1J"
                target="_blank"
                rel="noreferrer"
                className="card-icon"
              >
                <img
                  src="https://img.icons8.com/fluency/96/youtube-play.png"
                  alt="Відеоурок"
                  className="w-14 h-14"
                />
                <p>🎥 Відеоурок</p>
              </a>
              <a
                href="https://youtu.be/DNUDM19VTzU?si=PJWJb8dcjuZ31NuA"
                target="_blank"
                rel="noreferrer"
                className="card-icon"
              >
                <img
                  src="https://img.icons8.com/fluency/96/microphone.png"
                  alt="Подкаст"
                  className="w-14 h-14"
                />
                <p>🎧 Подкаст</p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
