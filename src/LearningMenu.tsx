import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LearningMenu = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId") || "123";

  const [visitedLessons, setVisitedLessons] = useState({
    visual: false,
    audio: false,
    kinesthetic: false,
  });

  useEffect(() => {
    const visual = localStorage.getItem("visited_visual") === "true";
    const audio = localStorage.getItem("visited_audio") === "true";
    const kinesthetic = localStorage.getItem("visited_kinesthetic") === "true";

    setVisitedLessons({ visual, audio, kinesthetic });
  }, []);

  const handleSelect = (type: string) => {
    localStorage.setItem(`visited_${type}`, "true");
    navigate(`/${type}?studentId=${studentId}`);
  };

  const allVisited = Object.values(visitedLessons).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">
        Обери зручний формат навчання
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <LessonButton
          type="visual"
          title="Для візуала(очі бачать)"
          color="text-purple-600"
          image="/assets/1000043625-removebg-preview.png"
          onClick={handleSelect}
        />
        <LessonButton
          type="audio"
          title="Для аудіала(вуха чують)"
          color="text-pink-600"
          image="/assets/IMG_20250307_010159_215.png"
          onClick={handleSelect}
        />
        <LessonButton
          type="kinesthetic"
          title="Для кінестетика(ручки роблять)"
          color="text-yellow-600"
          image="/assets/1000043681-fotor-bg-remover-20250312224319.png"
          onClick={handleSelect}
        />
      </div>

      {allVisited && (
        <button
          onClick={() => navigate("/NeuroReport")}
          className="mt-10 bg-purple-700 hover:bg-purple-900 text-white px-6 py-3 rounded-full shadow-lg transition"
        >
          🧠 Переглянути нейрозвіт
        </button>
      )}
    </div>
  );
};

const LessonButton = ({
  type,
  title,
  image,
  onClick,
  color,
}: {
  type: string;
  title: string;
  image: string;
  onClick: (type: string) => void;
  color: string;
}) => (
  <button
    className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition transform text-center"
    onClick={() => onClick(type)}
  >
    <img src={image} alt={title} className="mx-auto w-20 mb-4" />
    <p className={`font-bold ${color}`}>{title}</p>
  </button>
);

export default LearningMenu;
