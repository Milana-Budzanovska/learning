import React, { useEffect, useState } from "react";

const translations = {
  uk: {
    title: {
      visual: "🌈 Твій нейроповедінковий слід: Дослідник формату",
      audio: "⚡️ Твій слід: Швидкий розум із гіперфокусом",
      kinesthetic: "🌟 Нейроповедінковий слід: Сенсорний мандрівник"
    },
    description: {
      visual: "Ти дуже уважно досліджував(-ла) всі три формати. Часто переключав(-ла) стилі, що означає: ти прагнеш знайти найбільш зручний шлях для навчання. Це як науковець, що тестує різні прилади, перш ніж зібрати ракету! 🚀",
      audio: "Ти обрав(-ла) один формат і залишався(-лася) з ним. Це показує, що ти здатен(на) заглиблюватися в одне завдання з усією увагою. Така здатність називається гіперфокусом — це суперсила! 💪",
      kinesthetic: "Твої рухи, переміщення мишки, натискання, вибори форматів — усе свідчить про цікавість до нових вражень. Можливо, ти кінестетик — твій мозок любить, коли руки й тіло також працюють під час навчання!"
    },
    tip: {
      visual: "Тобі можуть сподобатись завдання з візуалізацією й дослідницькими сюжетами!",
      audio: "Спробуй іноді чергувати формати — мозок це полюбляє!",
      kinesthetic: "Для тебе добре підійдуть ігрові завдання або завдання, де можна щось обирати, рухати, комбінувати."
    },
    extra: "На основі мікроповедінкових патернів, алгоритм обчислив твій тип уваги, ритм мікросесій та зональні реакції на візуальні тригери. Інтерпретація враховує 12 параметрів інтерактивної взаємодії, зокрема час навігації між блоками, швидкість мишки, ритм кліків, а також типову когнітивну криву залученості."
  },
  en: {
    title: {
      visual: "🌈 Your Neurobehavioral Trace: The Format Explorer",
      audio: "⚡️ Your Trace: Fast Mind with Hyperfocus",
      kinesthetic: "🌟 Neurobehavioral Trace: Sensory Explorer"
    },
    description: {
      visual: "You explored all three formats carefully. Frequent switching means you're seeking the most comfortable path to learning. Like a scientist testing instruments before launching a rocket! 🚀",
      audio: "You picked one format and stuck with it. That shows deep focus ability — a cognitive superpower called hyperfocus! 💪",
      kinesthetic: "Your cursor moves, clicks, and format switching show curiosity for multisensory experience. You might be kinesthetic — your brain loves movement during learning!"
    },
    tip: {
      visual: "Try visual-heavy tasks or exploratory challenges!",
      audio: "Try occasionally switching formats — your brain will love it!",
      kinesthetic: "You’d enjoy interactive and game-like tasks with tactile elements."
    },
    extra: "Based on microbehavioral patterns, our algorithm analyzed your focus type, micro-session rhythm, and visual trigger sensitivity. The output is informed by 12 interactive parameters including mouse navigation, switching frequency, click pacing, and a typical cognitive engagement curve."
  }
};

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");
  const [lang, setLang] = useState<'uk' | 'en'>('uk');

  useEffect(() => {
    const reportKey = localStorage.getItem("report_result") || "visual";
    const t = translations[lang];

    const analysisMap: Record<string, string[]> = {
      visual: [
        lang === 'uk' ? "🧩 Високий рівень адаптивності" : "🧩 High adaptability",
        lang === 'uk' ? "⏱️ Час навчання: оптимальний" : "⏱️ Optimal learning time",
        lang === 'uk' ? "🎨 Ти надаєш перевагу візуальним кольорам" : "🎨 Preference for visual content",
        lang === 'uk' ? "🎯 Частота переходів між форматами: 5+" : "🎯 Switched formats 5+ times"
      ],
      audio: [
        lang === 'uk' ? "🎧 Твій вибір — аудіоформат" : "🎧 Chose audio format",
        lang === 'uk' ? "⏳ Час на перегляд — менший за середній" : "⏳ Spent less than average time",
        lang === 'uk' ? "🧠 Схильність до лінійної концентрації" : "🧠 Focused linear attention",
        lang === 'uk' ? "🔁 Частота змін формату: низька" : "🔁 Low switching frequency"
      ],
      kinesthetic: [
        lang === 'uk' ? "✋ Ти взаємодіяв(-ла) з вправами активно" : "✋ Actively interacted with tasks",
        lang === 'uk' ? "🖱️ Рух мишки: високий" : "🖱️ High cursor movement",
        lang === 'uk' ? "🌀 Частота змін формату — висока" : "🌀 High switching rate",
        lang === 'uk' ? "🔊 Інтерес до звуків: помірний" : "🔊 Moderate audio interest"
      ]
    };

    const selectedTitle = t.title[reportKey];
    const selectedDescription = t.description[reportKey];
    const selectedAnalysis = analysisMap[reportKey];
    const selectedTip = t.tip[reportKey];
    const extraNote = t.extra;

    const html = `
      <h1 class="text-3xl font-bold text-purple-700 mb-4">${selectedTitle}</h1>
      <p class="text-gray-700 mb-4">${selectedDescription}</p>
      <ul class="list-disc pl-5 mb-4 text-left text-purple-600">
        ${selectedAnalysis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="my-6 text-center animate-pulse">
        <div class="h-4 w-64 bg-purple-300 mx-auto rounded mb-2"></div>
        <div class="h-4 w-52 bg-pink-300 mx-auto rounded mb-2"></div>
        <div class="h-4 w-48 bg-yellow-300 mx-auto rounded"></div>
        <p class="text-sm text-gray-500 mt-2">${lang === 'uk' ? 'Граф активності у форматах' : 'Format usage intensity'}</p>
      </div>
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md mt-6 text-left">
        <strong>🔎 ${lang === 'uk' ? 'Порада' : 'Tip'}:</strong> ${selectedTip}
      </div>
      <div class="bg-blue-50 p-4 rounded-xl shadow mt-4 text-gray-600 text-sm italic">
        ${extraNote}
      </div>
    `;
    setReport(html);
  }, [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex flex-col items-center justify-center p-6">
      <button
        onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
        className="self-end mb-4 px-4 py-2 rounded-full bg-white shadow hover:bg-gray-100"
      >
        {lang === 'uk' ? 'ENG' : 'УКР'}
      </button>
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
