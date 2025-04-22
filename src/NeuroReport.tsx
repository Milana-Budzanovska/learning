import React, { useEffect, useState } from "react";

const NeuroReport: React.FC = () => {
  const [report, setReport] = useState("");
  const [language, setLanguage] = useState<"uk" | "en">("uk");

  useEffect(() => {
    const reportKey = localStorage.getItem("report_result");

    const variants = {
      uk: {
        visual: {
          title: "🌈 Твій слід: Допитливий дослідник",
          description:
            "Ти уважно дослідив(-ла) всі формати навчання. Це означає, що ти шукаєш найзручніший спосіб сприймати матеріал. Це як випробовувати різні інструменти, щоб знайти найкращий!",
          analysis: [
            "🧩 Маєш гнучке мислення",
            "⏱️ Час перегляду форматів — збалансований",
            "🎨 Часто обираєш зображення та схеми",
            "🔄 Активно перемикаєш стилі навчання"
          ],
          tip: "Тобі підійдуть задачі з малюнками, відео або схемами.",
          chart: `
            <div class='my-6'>
              <p class='mb-2 text-purple-700 font-semibold'>📊 Як ти використовував формати:</p>
              <div class='flex justify-center gap-4'>
                <div class='w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold'>В</div>
                <div class='w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold'>А</div>
                <div class='w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold'>К</div>
              </div>
              <p class='mt-2 text-sm text-gray-500'>В — Візуальний | А — Аудіальний | К — Кінестетичний</p>
            </div>`
        },
        audio: {
          title: "🎧 Твій слід: Слухач-детектив",
          description:
            "Ти обрав(-ла) один формат і був(-ла) зосереджений(-а) на ньому. Це говорить про вміння концентруватися та дослуховуватись до важливого. Твій мозок схожий на детектива, що слухає всі підказки!",
          analysis: [
            "🎧 Твій улюблений формат — аудіо",
            "🧠 Концентрація — висока",
            "🔂 Не перемикав(-ла) формати часто",
            "📌 Точно вловлюєш ключові моменти"
          ],
          tip: "Тобі допоможуть аудіоісторії, подкасти або уроки з диктором.",
          chart: `
            <div class='my-6'>
              <p class='mb-2 text-purple-700 font-semibold'>🔉 Слуховий фокус:</p>
              <div class='flex justify-center gap-2'>
                <div class='h-24 w-10 bg-pink-400 rounded-md'></div>
                <div class='h-8 w-10 bg-blue-200 rounded-md'></div>
                <div class='h-6 w-10 bg-yellow-200 rounded-md'></div>
              </div>
              <p class='mt-2 text-sm text-gray-500'>Аудіо — основний канал сприйняття</p>
            </div>`
        },
        kinesthetic: {
          title: "👐 Твій слід: Рухливий дослідник",
          description:
            "Ти активно рухав(-ла) мишкою, обирав(-ла) варіанти, взаємодіяв(-ла) з уроками. Це означає, що тобі важливо діяти, а не просто дивитись чи слухати. Твоє навчання — це пригода!",
          analysis: [
            "🤹 Любиш експериментувати та пробувати",
            "🖱️ Часто клікав(-ла), переключав(-ла) формати",
            "🌀 Високий рівень залучення",
            "📍 Маєш цікавість до дій та завдань"
          ],
          tip: "Обирай вправи, де можна щось натискати, будувати, рухати чи обирати.",
          chart: `
            <div class='my-6'>
              <p class='mb-2 text-purple-700 font-semibold'>🤲 Як ти діяв(-ла) під час навчання:</p>
              <div class='relative w-64 h-64 mx-auto'>
                <svg viewBox='0 0 200 200' class='w-full h-full'>
                  <circle cx='100' cy='100' r='80' fill='#fcd34d' />
                  <path d='M100,100 L180,100 A80,80 0 0,1 100,180 Z' fill='#f9a8d4' />
                  <path d='M100,100 L100,20 A80,80 0 0,1 180,100 Z' fill='#93c5fd' />
                </svg>
                <div class='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>Активно</div>
              </div>
              <p class='mt-2 text-sm text-gray-500'>Багато кліків і виборів = активна участь</p>
            </div>`
        }
      },
      en: {
        visual: {
          title: "🌈 Your Profile: Curious Explorer",
          description:
            "You explored all learning formats carefully. That means you're trying to find the most comfortable way to learn. Like a scientist testing tools before building something big!",
          analysis: [
            "🧩 Flexible learning mindset",
            "⏱️ Balanced time across styles",
            "🎨 Often chose diagrams or visuals",
            "🔄 Switched formats actively"
          ],
          tip: "Visual content with images, maps or animations works best for you.",
          chart: `<div class='my-6'><p class='mb-2 text-purple-700 font-semibold'>📊 Format usage:</p><div class='flex justify-center gap-4'><div class='w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold'>V</div><div class='w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center text-white font-bold'>A</div><div class='w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold'>K</div></div><p class='mt-2 text-sm text-gray-500'>V = Visual | A = Auditory | K = Kinesthetic</p></div>`
        },
        audio: {
          title: "🎧 Profile: Focused Listener",
          description:
            "You chose one format and stayed with it. That shows you're great at focusing on one thing — just like detectives listen closely to clues!",
          analysis: [
            "🎧 Preferred format: audio",
            "🧠 High focus ability",
            "🔂 Rarely switched formats",
            "📌 Very attentive to sound cues"
          ],
          tip: "Audio stories or spoken explanations work really well for you.",
          chart: `<div class='my-6'><p class='mb-2 text-purple-700 font-semibold'>🔉 Auditory focus:</p><div class='flex justify-center gap-2'><div class='h-24 w-10 bg-pink-400 rounded-md'></div><div class='h-8 w-10 bg-blue-200 rounded-md'></div><div class='h-6 w-10 bg-yellow-200 rounded-md'></div></div><p class='mt-2 text-sm text-gray-500'>Most of your time was spent listening</p></div>`
        },
        kinesthetic: {
          title: "👐 Profile: Active Explorer",
          description:
            "You clicked, moved, and explored during learning. That shows you like to do, not just watch or listen. For you, learning is a journey full of actions!",
          analysis: [
            "🤹 You like trying things out",
            "🖱️ High interaction with the lesson",
            "🌀 Very involved in choices",
            "📍 Curious and hands-on learner"
          ],
          tip: "Try tasks where you can click, drag, build or choose things.",
          chart: `<div class='my-6'><p class='mb-2 text-purple-700 font-semibold'>🤲 Activity during learning:</p><div class='relative w-64 h-64 mx-auto'><svg viewBox='0 0 200 200' class='w-full h-full'><circle cx='100' cy='100' r='80' fill='#fcd34d' /><path d='M100,100 L180,100 A80,80 0 0,1 100,180 Z' fill='#f9a8d4' /><path d='M100,100 L100,20 A80,80 0 0,1 180,100 Z' fill='#93c5fd' /></svg><div class='absolute inset-0 flex items-center justify-center text-white font-bold text-xl'>Active</div></div><p class='mt-2 text-sm text-gray-500'>Lots of clicks, choices and motion</p></div>`
        }
      }
    };

    const langSet = variants[language];
    const reportKey = localStorage.getItem("report_result") || "visual";
    const selected = langSet[reportKey as keyof typeof langSet];

    const html = `
      <div class='flex justify-end mb-4'>
        <button onclick='document.dispatchEvent(new CustomEvent("toggleLang"))' class='bg-purple-100 px-4 py-2 rounded-full shadow'>${language === "uk" ? "ENG" : "УКР"}</button>
      </div>
      <h1 class="text-3xl font-bold text-purple-700 mb-4">${selected.title}</h1>
      <p class="text-gray-700 mb-4">${selected.description}</p>
      <ul class="list-disc pl-5 mb-4 text-left text-purple-600">
        ${selected.analysis.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      ${selected.chart}
      <div class="bg-yellow-100 p-4 rounded-xl shadow-md mt-6 text-left">
        <strong>🔎 ${language === "uk" ? "Порада" : "Tip"}:</strong> ${selected.tip}
      </div>
    `;
    setReport(html);
  }, [language]);

  useEffect(() => {
    const listener = () => {
      setLanguage((prev) => (prev === "uk" ? "en" : "uk"));
    };
    document.addEventListener("toggleLang", listener);
    return () => document.removeEventListener("toggleLang", listener);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white max-w-3xl w-full rounded-3xl shadow-xl p-8 text-center">
        <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: report }} />
      </div>
    </div>
  );
};

export default NeuroReport;
