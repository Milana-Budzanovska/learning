import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NeuroReport = () => {
  const [profile, setProfile] = useState('');
  const [explanation, setExplanation] = useState('');
  const [percentages, setPercentages] = useState({
    analyst: 0,
    creator: 0,
    dynamic: 0,
    dreamer: 0,
    sensor: 0,
    tactician: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Фейкові дані поведінки учня
    const timeSpent = Math.floor(Math.random() * 600) + 100; // секунд
    const formatsChanged = Math.floor(Math.random() * 10);
    const cursorMoves = Math.floor(Math.random() * 1000);
    const mood = localStorage.getItem('mood') || 'спокійний';

    const points = {
      analyst: timeSpent > 400 && formatsChanged < 4 ? 1 : 0,
      creator: formatsChanged > 5 ? 1 : 0,
      dynamic: cursorMoves > 500 ? 1 : 0,
      dreamer: timeSpent > 500 && cursorMoves < 300 ? 1 : 0,
      sensor: formatsChanged > 5 && cursorMoves > 500 ? 1 : 0,
      tactician: formatsChanged <= 3 && cursorMoves >= 300 ? 1 : 0,
    };

    const total = Object.values(points).reduce((acc, val) => acc + val, 0) || 1;
    const percents = Object.fromEntries(
      Object.entries(points).map(([key, val]) => [key, Math.round((val / total) * 100)])
    );
    setPercentages(percents);

    const maxProfile = Object.entries(percents).sort((a, b) => b[1] - a[1])[0][0];
    setProfile(maxProfile);

    const explanations: Record<string, string> = {
      analyst: '🔬 Аналітичний дослідник — ти уважно досліджуєш деталі та помічаєш навіть дрібниці. Як справжній науковець!',
      creator: '🎨 Креативний дослідник — ти обожнюєш змінювати формат і знаходиш нестандартні рішення!',
      dynamic: '🚀 Динамічний дослідник — швидкість твій стиль. Ти багато рухаєшся і шукаєш ефективні шляхи!',
      dreamer: '🌙 Мрійливий інтроверт — ти зосереджений і любиш подумати, зануритись у свій світ.',
      sensor: '🌈 Сенсорний шукач — тобі подобаються кольори, рух і яскравість. Ти вивчаєш усе з відчуттями!',
      tactician: '🎯 Тактик-спостерігач — ти не метушишся, а стратегічно дієш у межах одного формату.',
    };
    setExplanation(explanations[maxProfile]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">🧠 Твій нейроповедінковий слід</h1>

        <div className="mb-4 text-lg text-gray-800 text-center">
          Ми проаналізували твої дії під час уроків: скільки часу ти витратив, як часто змінював формат,
          як активно рухав мишкою і навіть який був твій настрій 🧐
        </div>

        <div className="text-2xl font-bold text-center text-purple-700 mb-4">
          Твій головний тип: {explanation}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {Object.entries(percentages).map(([key, value]) => (
            <div key={key} className="bg-purple-50 p-4 rounded-xl shadow text-center">
              <div className="font-semibold capitalize text-purple-800">{key}</div>
              <div className="text-3xl text-purple-600">{value}%</div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-500 text-white px-6 py-3 rounded-full shadow hover:bg-purple-600"
          >
            🔄 Повернутись до меню
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeuroReport;

