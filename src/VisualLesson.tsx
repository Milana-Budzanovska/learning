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
        ? 'Нейровідмінність — це термін, який описує людей...'
        : 'Neurodiversity is a term that describes people whose brains function differently...',
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
