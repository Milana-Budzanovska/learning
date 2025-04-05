import React from "react";

const VisualLesson = () => {
  return (
    <div className="min-h-screen bg-purple-100 p-8 text-center">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Візуалізація контенту</h1>
      <p className="mb-6 text-purple-600">Адаптовано для візуального сприймання</p>
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-xl mx-auto">
        <img src="/visual-lesson.png" alt="Візуальний урок" className="rounded-xl mb-4 mx-auto" />
        <p>Це приклад адаптованого відеоуроку для візуального сприйняття. Тут можуть бути картинки, схеми, відео тощо.</p>
      </div>
    </div>
  );
};

export default VisualLesson;