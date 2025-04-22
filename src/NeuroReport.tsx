import React, { useEffect, useState } from "react";

const translations = {
  uk: {
    visual: {
      title: "🌈 Твій нейроповедінковий слід: Дослідник формату",
      description: "Ти дуже уважно досліджував(-ла) всі три формати. Часто переключав(-ла) стилі, що означає: ти прагнеш знайти найбільш зручний шлях для навчання. Це як науковець, що тестує різні інструменти перед запуском ракети! 🚀",
      analysis: [
        "🧩 Ти швидко адаптуєшся",
        "⏱️ Навчався(-лася) в оптимальному темпі",
        "👁️ Найбільше обирав(-ла) візуальний формат",
        "🔄 Часто змінював(-ла) стиль — понад 5 разів",
      ],
      tip: "Тобі можуть сподобатися уроки з картинками, схемами або інтерактивною навігацією!",
      chart: `<div class='w-full flex flex-col items-center my-6'><p class='mb-2 text-purple-700 font-semibold'>🔵 Використання форматів:</p><div class='flex gap-4 w-full justify-center'><div class='w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center shadow-lg text-white font-bold'>В</div><div class='w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center shadow-md text-white font-bold'>А</div><div class='w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center shadow text-white font-bold'>К</div></div><p class='mt-2 text-sm text-gray-500'>Візуальний формат — основний</p></div>`
    },
    audio: {
      title: "⚡️ Твій слід: Швидкий розум із фокусом",
      description: "Ти обрав(-ла) один формат і залишався(-лася) з ним. Це свідчить про здатність глибоко зосереджуватися — це суперздібність!",
      analysis: [
        "🎧 Найбільше часу — на аудіоформат",
        "⏳ Час на уроки — швидший за середній",
        "🎯 Зосередженість на одному стилі",
        "🔁 Мінімальні перемикання форматів",
      ],
      tip: "Іноді пробуй інші формати — це тренує увагу!",
      chart: `<div class='w-full my-6'><p class='mb-2 text-purple-700 font-semibold'>📊 Використання форматів:</p><div class='flex w-full justify-center gap-3'><div class='h-24 w-10 bg-pink-400 rounded-md shadow-md'></div><div class='h-10 w-10 bg-blue-200 rounded-md shadow-sm'></div><div class='h-8 w-10 bg-yellow-200 rounded-md shadow-sm'></div></div><p class='mt-2 text-sm text-gray-500'>Аудіо — 80% часу</p></div>`
    },
    kinesthetic: {
      title: "🌟 Твій слід: Сенсорний мандрівник",
      description: "Твої дії — кліки, перемикання, рух — показують, що ти любиш дізнаватись через досвід. Можливо, ти кінестетик!",
      analysis: [
        "✋ Багато кліків та взаємодії",
        "🖱️ Висока активність миші",
        "🔄 Часто змінював(-ла) формати",
        "🎵 Інтерес до аудіо — середній",
      ],
      tip: "Тобі сподобаються ігрові вправи та інтерактиви!",
      chart: `<div class='my-6 text-center'><p class='mb-2 text-purple-700 font-semibold'>🧭 Сенсорна активність:</p><div class='relative w-64 h-64 mx-auto'><svg viewBox='0 0 200 200' class='w-full h-full'><circle cx='100' cy='100' r='80' fill='#fcd34d' /><path d='M100,100 L180,100 A80,80 0 0,1 100,180 Z' fill='#f9a8d4' /><path d='M100,100 L100,20 A80,80 0 0,1 180,100 Z' fill='#93c5fd' /></svg><div class='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>Висока</div></div><p class='mt-2 text-sm text-gray-500'>Багато кліків, перемикань, рухів</p></div>`
    }
  },
  en: {
    visual: {
      title: "🌈 Your Neuro-Behavioral Trace: The Format Explorer",
      description: "You explored all three formats carefully and switched often. This shows you're looking for the most comfortable way to learn — like a scientist trying different tools before launching a rocket! 🚀",
      analysis: [
        "🧩 High adaptability",
        "⏱️ Optimal learning time",
        "👁️ Preferred visual style",
        "🔄 Switched formats over 5 times",
      ],
      tip: "You might love tasks with visuals, maps, or interactive flows!",
      chart: `<div class='w-full flex flex-col items-center my-6'><p class='mb-2 text-purple-700 font-semibold'>🔵 Format usage:</p><div class='flex gap-4 w-full justify-center'><div class='w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center shadow-lg text-white font-bold'>V</div><div class='w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center shadow-md text-white font-bold'>A</div><div class='w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center shadow text-white font-bold'>K</div></div><p class='mt-2 text-sm text-gray-500'>Visual — most used</p></div>`
    },
    audio: {
      title: "⚡️ Your Trace: Focused and Fast-Minded",
      description: "You picked one format and stuck to it. That shows your ability to stay deeply focused — a real superpower!",
      analysis: [
        "🎧 Main usage: Audio",
        "⏳ Faster-than-average focus time",
        "🎯 Strong single-track attention",
        "🔁 Rare format switching",
      ],
      tip: "Try switching styles sometimes — your brain enjoys variety!",
      chart: `<div class='w-full my-6'><p class='mb-2 text-purple-700 font-semibold'>📊 Format usage:</p><div class='flex w-full justify-center gap-3'><div class='h-24 w-10 bg-pink-400 rounded-md shadow-md'></div><div class='h-10 w-10 bg-blue-200 rounded-md shadow-sm'></div><div class='h-8 w-10 bg-yellow-200 rounded-md shadow-sm'></div></div><p class='mt-2 text-sm text-gray-500'>Audio — 80% of time</p></div>`
    },
    kinesthetic: {
      title: "🌟 Your Trace: The Sensory Explorer",
      description: "Your clicks, movements, and format switches show you're curious and hands-on. Maybe you're a kinesthetic learner!",
      analysis: [
        "✋ Lots of clicks and interaction",
        "🖱️ High mouse movement",
        "🔄 Frequent format changes",
        "🎵 Moderate interest in audio",
      ],
      tip: "You'll love games and tasks where you can move, choose, or combine!",
      chart: `<div class='my-6 text-center'><p class='mb-2 text-purple-700 font-semibold'>🧭 Sensory activity:</p><div class='relative w-64 h-64 mx-auto'><svg viewBox='0 0 200 200' class='w-full h-full'><circle cx='100' cy='100' r='80' fill='#fcd34d' /><path d='M100,100 L180,100 A80,80 0 0,1 100,180 Z' fill='#f9a8d4' /><path d='M100,100 L100,20 A80,80 0 0,1 180,100 Z' fill='#93c5fd' /></svg><div class='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>High</div></div><p class='mt-2 text-sm text-gray-500'>Clicking + switching + exploring</p></div>`
    }
  }
};

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");
  const [lang, setLang] = useState<"uk" | "en">("uk");

  useEffect(() => {
    const reportKey = localStorage.getItem("report_result");
    const content = translations[lang];
    const selected = reportKey && content[reportKey] ? content[reportKey] : content.visual;

    const html = `
      <h1 class='text-3xl font-bold text-purple-700 mb-4'>${selected.title}</h1>
      <p class='text-gray-700 mb-4'>${selected.description}</p>
      <ul class='list-disc pl-5 mb-4 text-left text-purple-600'>
        ${selected.analysis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${selected.chart}
      <div class='bg-yellow-100 p-4 rounded-xl shadow-md mt-6 text-left'>
        <strong>${lang === "uk" ? "🔎 Порада:" : "🔎 Tip:"}</strong> ${selected.tip}
      </div>
    `;
    setReport(html);
  }, [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-xl p-8 text-center">
        <div className="mb-4 text-right flex flex-col gap-2 items-end">
          <button
            onClick={() => setLang(lang === "uk" ? "en" : "uk")}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full shadow hover:bg-purple-200"
          >
            {lang === "uk" ? "ENG" : "УКР"}
          </button>
        </div>
        <div
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: report }}
        />
      </div>
    </div>
  );
};

export default NeuroReport;
