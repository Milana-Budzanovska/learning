import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  uk: {
    title: "Обери зручний формат навчання",
    visual: "Для візуала (очі бачать)",
    audio: "Для аудіала (вуха чують)",
    kinesthetic: "Для кінестетика (ручки роблять)",
    reportButton: "🧠 Переглянути нейрозвіт",
    langSwitch: "ENG",
    loadingText: "Проводиться аналіз активності: рухи миші, час фокусу, натискання..."
  },
  en: {
    title: "Choose your preferred learning format",
    visual: "For Visual (Eyes see)",
    audio: "For Аudials (Ears hear)",
    kinesthetic: "For Kinesthetic (Hands do)",
    reportButton: "🧠 View Neuro Report",
    langSwitch: "УКР",
    loadingText: "Analyzing your activity: mouse movements, focus time, clicks..."
  }
};

const LearningMenu = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId") || "123";

  const [language, setLanguage] = useState<"uk" | "en">("uk");
  const [visitedLessons, setVisitedLessons] = useState({
    visual: false,
    audio: false,
    kinesthetic: false,
  });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const visual = localStorage.getItem("visited_visual") === "true";
    const audio = localStorage.getItem("visited_audio") === "true";
    const kinesthetic = localStorage.getItem("visited_kinesthetic") === "true";
    setVisitedLessons({ visual, audio, kinesthetic });
  }, []);

  const handleSelect = (type: string) => {
    localStorage.setItem(`visited_${type}`, "true");
    localStorage.setItem(`time_${type}_start`, String(Date.now()));
    navigate(`/${type}?studentId=${studentId}`);
  };

  const handleReport = () => {
    setShowLoader(true);
    setTimeout(() => {
      const end = Date.now();
      const times = ["visual", "audio", "kinesthetic"].map(type => {
        const start = Number(localStorage.getItem(`time_${type}_start`) || "0");
        const duration = end - start;
        return { type, duration: isNaN(duration) ? 0 : duration };
      });
      const max = times.reduce((prev, curr) => curr.duration > prev.duration ? curr : prev, times[0]);
      localStorage.setItem("report_result", max.type);
      navigate("/neuro-report");
    }, 4000);
  };

  const allVisited = Object.values(visitedLessons).every(Boolean);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="self-end mr-6 mb-4">
        <button
          onClick={() => setLanguage(language === "uk" ? "en" : "uk")}
          className="bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100"
        >
          {t.langSwitch}
        </button>
      </div>

      {!showLoader ? (
        <>
          <h1 className="text-3xl font-bold text-purple-800 mb-6">{t.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            <LessonButton
              type="visual"
              title={t.visual}
              color="text-purple-600"
              image="/assets/1000043625-removebg-preview.png"
              onClick={handleSelect}
            />
            <LessonButton
              type="audio"
              title={t.audio}
              color="text-pink-600"
              image="/assets/IMG_20250307_010159_215.png"
              onClick={handleSelect}
            />
            <LessonButton
              type="kinesthetic"
              title={t.kinesthetic}
              color="text-yellow-600"
              image="/assets/1000043681-fotor-bg-remover-20250312224319.png"
              onClick={handleSelect}
            />
          </div>

          {allVisited && (
            <button
              onClick={handleReport}
              className="mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg px-8 py-3 rounded-full shadow-lg animate-pulse hover:scale-105 transition"
            >
              {t.reportButton}
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <div className="text-xl text-purple-700 mb-6 animate-pulse">{t.loadingText}</div>
          <div className="w-20 h-20 border-8 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
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
