import React from "react";

const KinestheticLesson = () => {
  return (
    <div className="min-h-screen bg-yellow-100 p-8 text-center">
      <h1 className="text-2xl font-bold text-yellow-700 mb-4">Інтерактивний урок</h1>
      <p className="mb-6 text-yellow-600">Адаптовано для кінестетичного сприйняття</p>
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-xl mx-auto">
        <button className="bg-yellow-300 px-6 py-3 rounded-full shadow font-bold hover:bg-yellow-400 transition">Торкнись, щоб активувати</button>
        <p className="mt-4">Кінестетики навчаються через дії – тут можуть бути інтерактиви, симуляції, завдання з переміщенням елементів тощо.</p>
      </div>
    </div>
  );
};

export default KinestheticLesson;