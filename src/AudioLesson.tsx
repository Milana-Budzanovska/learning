import React from "react";

const AudioLesson = () => {
  return (
    <div className="min-h-screen bg-pink-100 p-8 text-center">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">Аудіо урок</h1>
      <p className="mb-6 text-pink-600">Адаптовано для слухового сприйняття</p>
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-xl mx-auto">
        <audio controls className="w-full mb-4">
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p>Це приклад аудіоуроку, що підходить для аудіалів. Можна слухати пояснення теми замість читання.</p>
      </div>
    </div>
  );
};

export default AudioLesson;