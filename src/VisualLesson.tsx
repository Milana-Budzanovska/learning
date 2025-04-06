// src/VisualLessonPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VisualLessonPage = () => {
  const navigate = useNavigate();
  const [lessonStarted, setLessonStarted] = useState(false);
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    if (hoverText) {
      speak(hoverText);
    }
  }, [hoverText]);

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'uk' ? 'uk-UA' : 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;

    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      language === 'uk'
        ? v.lang === 'uk-UA' || v.name.toLowerCase().includes('google')
        : v.lang.includes('en') && v.name.toLowerCase().includes('google')
    );
    if (preferred) utterance.voice = preferred;

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => speechSynthesis.cancel();

  const startLesson = () => setLessonStarted(true);

  const texts = {
    title: language === 'uk' ? 'Візуальний урок' : 'Visual Lesson',
    start: language === 'uk' ? '▶️ Пройти урок' : '▶️ Start Lesson',
    textTitle: language === 'uk' ? 'Текстовий матеріал' : 'Text Material',
    textBody:
      language === 'uk'
        ? 'Нейродивергентність — це термін, що описує людей, чий мозок функціонує інакше, ніж у більшості. Вона охоплює такі стани, як аутизм, СДУГ, дислексія, синдром Туретта, тривожні розлади та інші. Це не «хвороби», які треба «вилікувати», а просто інший спосіб сприйняття, обробки інформації, емоцій і взаємодії з навколишнім світом. Часто такі діти стикаються з нерозумінням у традиційній школі, де система побудована за принципом «один розмір підходить усім».

Наша платформа FocusEd Baby створена саме для таких учнів. Вона адаптується до стилю навчання дитини — візуального, аудіального або кінестетичного — і дає змогу проходити уроки у власному темпі. Платформа не просто навчає, а створює так званий нейроповедінковий слід — цифрову проекцію того, як дитина сприймає, концентрується та реагує на завдання. Ми аналізуємо її взаємодії: що вона натискала, як змінювала формати, скільки часу проводила в кожному блоці. А потім генеруємо яскравий індивідуальний звіт, зрозумілий самій дитині.

Наш асистент Флік допомагає з озвученням, підтримкою і поясненнями. А головне — платформа дарує дитині відчуття, що її особливості не проблема, а суперсила. FocusEd Baby — це більше, ніж навчання. Це простір прийняття, розвитку і турботи для кожного мозку.'
        : 'Neurodivergence is a term that describes people whose brains function differently from the majority. It includes conditions like autism, ADHD, dyslexia, Tourette's syndrome, anxiety disorders, and others. These are not "illnesses" to be "cured" — they are simply different ways of perceiving, processing, feeling, and interacting with the world. Often, neurodivergent children struggle in traditional schools, where everything is built around the idea that one approach works for everyone.

Our platform, FocusEd Baby, is designed specifically for these students. It adapts to each child's learning style — visual, auditory, or kinesthetic — and allows them to go through lessons at their own pace. But more than that, the platform creates a so-called neurobehavioral trace — a digital projection of how the child perceives, focuses, and responds to learning content. We analyze interactions: what the child clicks on, how they switch formats, how long they spend in each section. Then, we generate a vivid, personalized report that's easy for the child to understand.

Our assistant, Flick, helps with voice guidance, support, and explanations. Most importantly, the platform helps each child feel that their differences are not a problem — they’re a superpower. FocusEd Baby is more than just learning. It’s a space of acceptance, development, and care for every kind of brain.',
    watchVideo: language === 'uk' ? '🎥 Подивись відео' : '🎥 Watch the video',
    listenAudio: language === 'uk' ? '🎧 Послухай аудіо' : '🎧 Listen to audio',
    stop: language === 'uk' ? '🛑 Зупинити озвучення' : '🛑 Stop Speech',
    langSwitch: language === 'uk' ? '🌐 English version' : '🌐 Українська версія',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-6 font-sans">
      <div className="flex justify-end mb-4 max-w-4xl mx-auto">
        <button
          onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
          className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-full shadow"
        >
          {texts.langSwitch}
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">{texts.title}</h1>

        {!lessonStarted ? (
          <div className="text-center">
            <button
              onClick={startLesson}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition"
            >
              {texts.start}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div
              className="bg-white p-6 rounded-xl shadow-lg"
              onMouseEnter={() => setHoverText(texts.textBody)}
              onMouseLeave={stopSpeaking}
            >
              <h2 className="text-xl font-bold mb-4 text-purple-700">{texts.textTitle}</h2>
              <p className="text-gray-800">{texts.textBody}</p>
              <button
                onClick={stopSpeaking}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                {texts.stop}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="bg-pink-100 p-4 rounded-xl shadow-md"
                onMouseEnter={() => setHoverText(texts.watchVideo)}
                onMouseLeave={stopSpeaking}
              >
                <h3 className="font-semibold text-purple-600 mb-2">{texts.watchVideo}</h3>
                <iframe
                  width="100%"
                  height="250"
                  src="https://www.youtube.com/embed/jh7wLjqI5PY"
                  title="Відео уроку"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              <div
                className="bg-purple-100 p-4 rounded-xl shadow-md"
                onMouseEnter={() => setHoverText(texts.listenAudio)}
                onMouseLeave={stopSpeaking}
              >
                <h3 className="font-semibold text-purple-600 mb-2">{texts.listenAudio}</h3>
                <audio controls className="w-full">
                  <source
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    type="audio/mpeg"
                  />
                  Your browser does not support audio.
                </audio>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualLessonPage;
