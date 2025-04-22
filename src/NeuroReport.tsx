import React, { useEffect, useState } from "react";

const translations = {
  uk: {
    tip: "🔎 Порада:",
    switchLang: "ENG"
  },
  en: {
    tip: "🔎 Tip:",
    switchLang: "УКР"
  }
};

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");
  const [lang, setLang] = useState<"uk" | "en">("uk");

  useEffect(() => {
    const reportKey = localStorage.getItem("report_result");

    const variants: Record<string, any> = {
      visual: {
        title: {
          uk: "🌈 Твій нейроповедінковий слід: Дослідник формату",
          en: "🌈 Your Neurobehavioral Trace: Format Explorer"
        },
        description: {
          uk: "Ти дуже уважно досліджував(-ла) всі три формати...",
          en: "You thoroughly explored all three formats..."
        },
        analysis: {
          uk: [
            "🧩 Високий рівень адаптивності",
            "⏱️ Час навчання: оптимальний",
            "🎨 Ти надаєш перевагу візуальним кольорам",
            "🎯 Частота переходів між форматами: 5+"
          ],
          en: [
            "🧩 High adaptability",
            "⏱️ Optimal learning time",
            "🎨 Preference for visual elements",
            "🎯 Format switching frequency: 5+"
          ]
        },
        tip: {
          uk: "Тобі можуть сподобатись завдання з візуалізацією...",
          en: "You might enjoy visualized and exploratory tasks!"
        },
        chart: `...` // Keep chart as is for simplicity
      },
      audio: {
        title: {
          uk: "⚡️ Твій слід: Швидкий розум із гіперфокусом",
          en: "⚡️ Your Trace: Fast Mind with Hyperfocus"
        },
        description: {
          uk: "Ти обрав(-ла) один формат...",
          en: "You picked one format and stayed with it..."
        },
        analysis: {
          uk: [
            "🎧 Твій вибір — аудіоформат",
            "⏳ Час на перегляд — менший за середній",
            "🧠 Схильність до лінійної концентрації",
            "🔁 Частота змін формату: низька"
          ],
          en: [
            "🎧 Your choice — audio format",
            "⏳ Viewing time — below average",
            "🧠 Inclination to linear concentration",
            "🔁 Format switching: low"
          ]
        },
        tip: {
          uk: "Спробуй іноді чергувати формати...",
          en: "Try alternating formats — your brain likes it!"
        },
        chart: `...`
      },
      kinesthetic: {
        title: {
          uk: "🌟 Нейроповедінковий слід: Сенсорний мандрівник",
          en: "🌟 Neurobehavioral Trace: Sensory Explorer"
        },
        description: {
          uk: "Твої рухи, переміщення мишки...",
          en: "Your movements, mouse actions..."
        },
        analysis: {
          uk: [
            "✋ Ти взаємодіяв(-ла) з вправами активно",
            "🖱️ Рух мишки: високий",
            "🌀 Частота змін формату — висока",
            "🔊 Інтерес до звуків: помірний"
          ],
          en: [
            "✋ You interacted with tasks actively",
            "🖱️ Mouse activity: high",
            "🌀 Format switching: high",
            "🔊 Interest in sound: moderate"
          ]
        },
        tip: {
          uk: "Для тебе добре підійдуть ігрові завдання...",
          en: "Game-based and interactive tasks work great for you."
        },
        chart: `...`
      }
    };

    const selectedKey = reportKey && variants[reportKey] ? reportKey : "visual";
    const selected = variants[selectedKey];

    const html = `
      <h1 class="text-3xl font-bold text-purple-700 mb-4">${selected.title[lang]}</h1>
      <p class="text-gray-700 mb-4">${selected.description[lang]}</p>
      <ul class="list-disc pl-5 mb-4 text-left text-purple-600">
        ${selected.analysis[lang].map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${selected.chart}
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md mt-6 text-left">
        <strong>${translations[lang].tip}</strong> ${selected.tip[lang]}
      </div>
    `;
    setReport(html);
  }, [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <div className="self-end mb-4">
        <button
          onClick={() => setLang(lang === "uk" ? "en" : "uk")}
          className="bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100"
        >
          {translations[lang].switchLang}
        </button>
      </div>
      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-xl p-8 text-center">
        <div
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: report }}
        />
      </div>
    </div>
  );
};

export default NeuroReport;
