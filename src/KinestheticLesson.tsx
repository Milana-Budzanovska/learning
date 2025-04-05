import React, { useState } from 'react';

const audioMap: Record<string, string> = {
  "Грім": "https://www.soundjay.com/nature/thunder-1.mp3",
  "Сміх": "https://www.soundjay.com/human/laugh-1.mp3",
  "Дзвінок": "https://www.soundjay.com/phone/telephone-ring-1.mp3",
};

const oddOneOutOptions = [
  { image: "🌧️", label: "Дощ", sound: "Грім" },
  { image: "📞", label: "Телефон", sound: "Дзвінок" },
  { image: "🎨", label: "Фарба", sound: "Тиша" }, // зайвий
];

const KinestheticLesson: React.FC = () => {
  const [matchedSounds, setMatchedSounds] = useState<string[]>([]);
  const [selectedOdd, setSelectedOdd] = useState<string | null>(null);

  const playSound = (label: string) => {
    const audio = new Audio(audioMap[label]);
    audio.play();
  };

  const handleOddOneOut = (label: string) => {
    setSelectedOdd(label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">Кінестетичний урок</h1>

        {/* Вправа 1: Асоціація звук-слово */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">🎧 Знайди пару: звук та слово</h2>
          <div className="grid grid-cols-3 gap-6">
            {Object.keys(audioMap).map((label, idx) => (
              <button
                key={idx}
                onClick={() => playSound(label)}
                className="bg-purple-100 hover:bg-purple-200 p-4 rounded-xl shadow text-lg"
              >
                🔊 {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Натисни на кнопки, щоб прослухати звуки, і подумай, що до чого пасує.</p>
        </section>

        {/* Вправа 2: Хаотичні пари */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">🧠 З'єднай пари (змішані асоціації)</h2>
          <div className="flex flex-wrap justify-between gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-300 w-40 text-center shadow hover:bg-green-50 cursor-pointer">Грім – Небо</div>
            <div className="bg-white p-4 rounded-xl border border-gray-300 w-40 text-center shadow hover:bg-green-50 cursor-pointer">Сміх – Радість</div>
            <div className="bg-white p-4 rounded-xl border border-gray-300 w-40 text-center shadow hover:bg-green-50 cursor-pointer">Дзвінок – Телефон</div>
            <div className="bg-white p-4 rounded-xl border border-gray-300 w-40 text-center shadow hover:bg-green-50 cursor-pointer">Небо – Грім</div>
            <div className="bg-white p-4 rounded-xl border border-gray-300 w-40 text-center shadow hover:bg-green-50 cursor-pointer">Телефон – Дзвінок</div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Знайди правильні зв’язки – але будь уважним, елементи перемішані!</p>
        </section>

        {/* Вправа 3: Що зайве? */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">🔎 Що зайве?</h2>
          <div className="grid grid-cols-3 gap-6">
            {oddOneOutOptions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleOddOneOut(item.label)}
                className={`p-6 border rounded-xl shadow text-center text-lg hover:bg-blue-100 ${selectedOdd === item.label ? 'bg-blue-200' : 'bg-white'}`}
              >
                {item.image} <br /> {item.label}
              </button>
            ))}
          </div>
          {selectedOdd && (
            <p className="mt-4 text-lg font-semibold text-center">
              {selectedOdd === 'Фарба' ? '✅ Правильно! Фарба не має звуку.' : '❌ Спробуй ще раз!'}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default KinestheticLesson;
