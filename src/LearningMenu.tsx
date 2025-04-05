import React from "react";
import { useNavigate } from "react-router-dom";

const LearningMenu: React.FC = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId") || "123";

  const handleSelect = (type: string) => {
    navigate(`/${type}?studentId=${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-10 text-center drop-shadow">
        Обери зручний формат навчання
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        <button
          className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("visual")}
        >
          <img src="/1000043625-removebg-preview.png" alt="Візуал" className="mx-auto w-24 mb-4" />
          <p className="font-bold text-purple-600 text-lg">Для візуала</p>
        </button>

        <button
          className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("audio")}
        >
          <img src="/IMG_20250307_010159_215.png" alt="Аудіал" className="mx-auto w-24 mb-4" />
          <p className="font-bold text-pink-600 text-lg">Для аудіала</p>
        </button>

        <button
          className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition transform text-center"
          onClick={() => handleSelect("kinesthetic")}
        >
          <img src="/1000043681-fotor-bg-remover-20250312224319.png" alt="Кінестетик" className="mx-auto w-24 mb-4" />
          <p className="font-bold text-yellow-600 text-lg">Для кінестетика</p>
        </button>
      </div>
    </div>
  );
};

export default LearningMenu;
