import React, { useEffect, useState } from "react";

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");

  useEffect(() => {
    const reportKey = localStorage.getItem("report_result");

    const variants: Record<string, any> = {
      visual: {
        title: "🌈 Твій нейроповедінковий слід: Дослідник формату",
        description:
          "Ти дуже уважно досліджував(-ла) всі три формати. Часто переключав(-ла) стилі, що означає: ти прагнеш знайти найбільш зручний шлях для навчання. Це як науковець, що тестує різні прилади, перш ніж зібрати ракету! 🚀",
        analysis: [
          "🧩 Високий рівень адаптивності",
          "⏱️ Час навчання: оптимальний",
          "🎨 Ти надаєш перевагу візуальним кольорам",
          "🎯 Частота переходів між форматами: 5+",
        ],
        tip: "Тобі можуть сподобатись завдання з візуалізацією й дослідницькими сюжетами!",
        chart: `
          <div class="w-full flex flex-col items-center my-6">
            <p class="mb-2 text-purple-700 font-semibold">🔵 Використання форматів:</p>
            <div class="flex gap-4 w-full justify-center">
              <div class="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center shadow-lg text-white font-bold">В</div>
              <div class="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center shadow-md text-white font-bold">А</div>
              <div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center shadow text-white font-bold">К</div>
            </div>
            <p class="mt-2 text-sm text-gray-500">Візуал — найбільше використання</p>
          </div>
        `,
      },
      audio: {
        title: "⚡️ Твій слід: Швидкий розум із гіперфокусом",
        description:
          "Ти обрав(-ла) один формат і залишався(-лася) з ним. Це показує, що ти здатен(на) заглиблюватися в одне завдання з усією увагою. Така здатність називається гіперфокусом — це суперсила! 💪",
        analysis: [
          "🎧 Твій вибір — аудіоформат",
          "⏳ Час на перегляд — менший за середній",
          "🧠 Схильність до лінійної концентрації",
          "🔁 Частота змін формату: низька",
        ],
        tip: "Спробуй іноді чергувати формати — мозок це полюбляє!",
        chart: `
          <div class="w-full my-6">
            <p class="mb-2 text-purple-700 font-semibold">📊 Концентрація по форматах:</p>
            <div class="flex w-full justify-center gap-3">
              <div class="h-24 w-10 bg-pink-400 rounded-md shadow-md"></div>
              <div class="h-10 w-10 bg-blue-200 rounded-md shadow-sm"></div>
              <div class="h-8 w-10 bg-yellow-200 rounded-md shadow-sm"></div>
            </div>
            <p class="mt-2 text-sm text-gray-500">Аудіо — 80% часу, інше — мінімально</p>
          </div>
        `,
      },
      kinesthetic: {
        title: "🌟 Нейроповедінковий слід: Сенсорний мандрівник",
        description:
          "Твої рухи, переміщення мишки, натискання, вибори форматів — усе свідчить про цікавість до нових вражень. Можливо, ти кінестетик — твій мозок любить, коли руки й тіло також працюють під час навчання!",
        analysis: [
          "✋ Ти взаємодіяв(-ла) з вправами активно",
          "🖱️ Рух мишки: високий",
          "🌀 Частота змін формату — висока",
          "🔊 Інтерес до звуків: помірний",
        ],
        tip: "Для тебе добре підійдуть ігрові завдання або завдання, де можна щось обирати, рухати, комбінувати.",
        chart: `
          <div class="my-6 text-center">
            <p class="mb-2 text-purple-700 font-semibold">🧭 Сенсорна активність:</p>
            <div class="relative w-64 h-64 mx-auto">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="#fcd34d" />
                <path d="M100,100 L180,100 A80,80 0 0,1 100,180 Z" fill="#f9a8d4" />
                <path d="M100,100 L100,20 A80,80 0 0,1 180,100 Z" fill="#93c5fd" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Висока</div>
            </div>
            <p class="mt-2 text-sm text-gray-500">Клікання + зміна форматів + реакція</p>
          </div>
        `,
      },
    };

    const selected = reportKey && variants[reportKey] ? variants[reportKey] : variants.visual;

    const html = `
      <h1 class="text-3xl font-bold text-purple-700 mb-4">${selected.title}</h1>
      <p class="text-gray-700 mb-4">${selected.description}</p>
      <ul class="list-disc pl-5 mb-4 text-left text-purple-600">
        ${selected.analysis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${selected.chart}
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md mt-6 text-left">
        <strong>🔎 Порада:</strong> ${selected.tip}
      </div>
    `;
    setReport(html);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
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
