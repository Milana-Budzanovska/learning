import React, { useEffect, useState } from "react";

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");

  useEffect(() => {
    const variants = [
      {
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
      },
      {
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
      },
      {
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
      },
    ];

    const randomReport = variants[Math.floor(Math.random() * variants.length)];
    const html = `
      <h1 class="text-3xl font-bold text-purple-700 mb-4">${randomReport.title}</h1>
      <p class="text-gray-700 mb-4">${randomReport.description}</p>
      <ul class="list-disc pl-5 mb-4 text-left text-purple-600">
        ${randomReport.analysis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md">
        <strong>🔎 Порада:</strong> ${randomReport.tip}
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
