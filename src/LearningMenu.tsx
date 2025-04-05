import React from "react";
import { useNavigate } from "react-router-dom";

const LearningMenu = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId") || "123";

  const handleSelect = (type: string) => {
    navigate(`/${type}?studentId=${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Обери зручний формат навчання</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <button
          className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("visual")}
        >
          <img src="/1000043625-removebg-preview.png" alt="Візуал" className="mx-auto w-20 mb-4" />
          <p className="font-bold text-purple-600">Для візуала</p>
        </button>
        <button
          className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("audio")}
        >
          <img src="/IMG_20250307_010159_215.png" alt="Аудіал" className="mx-auto w-20 mb-4" />
          <p className="font-bold text-pink-600">Для аудіала</p>
        </button>
        <button
          className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("kinesthetic")}
        >
          <img src="/1000043681-fotor-bg-remover-20250312224319.png" alt="Кінестетик" className="mx-auto w-20 mb-4" />
          <p className="font-bold text-yellow-600">Для кінестетика</p>
        </button>
      </div>
    </div>
  );
};

export default LearningMenu;
