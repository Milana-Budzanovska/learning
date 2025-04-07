import React, { useEffect, useState } from 'react';

const AudioLessonPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');

  const correctAnswer = 'B';

  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  const speak = (text: string) => {
    if (language !== 'en') return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.volume = 1;
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice =>
      voice.lang.includes('en') && voice.name.toLowerCase().includes('google')
    );
    if (englishVoice) utterance.voice = englishVoice;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  useEffect(() => {
    if (language === 'uk') {
      playAudio('/audio_for_audio_lesson/podcast.mp3');
    } else {
      speak("Hello! I'm Flick, your dolphin assistant. Today we'll learn something really interesting.");
    }
    return () => stopSpeaking();
  }, [language]);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setFeedback('');
    if (language === 'uk') {
      const fileMap: Record<string, string> = {
        A: '/audio_for_audio_lesson/answer_a.mp3',
        B: '/audio_for_audio_lesson/answer_b.mp3',
        C: '/audio_for_audio_lesson/answer_c.mp3'
      };
      playAudio(fileMap[answer]);
    } else {
      speak(`You selected option ${answer}`);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === correctAnswer) {
      if (language === 'uk') playAudio('/audio_for_audio_lesson/correct.mp3');
      else speak("Great job! That’s the correct answer.");
      setFeedback(language === 'uk' ? "✅ Молодець! Це правильна відповідь." : "✅ Correct! That’s the right answer.");
    } else {
      if (language === 'uk') playAudio('/audio_for_audio_lesson/wrong.mp3');
      else speak("That’s okay! Mistakes help us learn. Let’s try again.");
      setFeedback(language === 'uk' ? "❌ Помилка. Спробуй ще раз." : "❌ Incorrect. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-4">
          <img src="/assets/flik.png" alt="Flik" className="w-20 h-20 rounded-full shadow" />
          <button
            onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
            className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-full shadow"
          >
            {language === 'uk' ? '🌐 English version' : '🌐 Українська версія'}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {language === 'uk' ? 'Аудіо урок' : 'Audio Lesson'}
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img src="/assets/flik.png" alt="Assistant" className="w-36 h-36 rounded-full shadow-md" />
          <button
            onClick={stopSpeaking}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            🛑 {language === 'uk' ? 'Зупинити озвучення' : 'Stop Voice'}
          </button>
        </div>

        <div className="bg-purple-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            🎧 {language === 'uk' ? 'Послухай запис' : 'Listen to the recording'}
          </h2>
          <audio controls className="w-full">
            <source src="/audio_for_audio_lesson/podcast.mp3" type="audio/mpeg" />
            Your browser does not support audio.
          </audio>
          {language === 'uk' && (
            <button
              onClick={() => playAudio('/audio_for_audio_lesson/play_audio_instruction.mp3')}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              🔊 Пояснення
            </button>
          )}
          {language === 'en' && (
            <button
              onClick={() => speak("Now we’ll listen to the learning audio. Please listen carefully.")}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              🔊 Explain
            </button>
          )}
        </div>

        <div className="bg-pink-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            📝 {language === 'uk' ? 'Перевір себе' : 'Check Yourself'}
          </h2>
          <p className="mb-3">
            {language === 'uk' ? 'Що таке нейровідмінність?' : 'What does neurodiversity mean?'}
          </p>
          <ul className="space-y-2">
            <li><button onClick={() => handleAnswer('A')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'A' ? 'bg-purple-200' : 'bg-white'}`}>A) {language === 'uk' ? 'Дитина, що володіє багатьма мовами' : 'A child who speaks many languages'}</button></li>
            <li><button onClick={() => handleAnswer('B')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'B' ? 'bg-purple-200' : 'bg-white'}`}>B) {language === 'uk' ? 'Мозок, який працює інакше, ніж у більшості' : 'A brain that works differently from most'}</button></li>
            <li><button onClick={() => handleAnswer('C')} disabled={submitted} className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === 'C' ? 'bg-purple-200' : 'bg-white'}`}>C) {language === 'uk' ? 'Дитина, яка швидко засинає' : 'A child who falls asleep quickly'}</button></li>
          </ul>
          {!submitted && selected && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700"
            >
              ✅ {language === 'uk' ? 'Перевірити' : 'Check'}
            </button>
          )}
          {submitted && (
            <p className="mt-4 text-lg text-purple-700 font-semibold">{feedback}</p>
          )}
          <button
            onClick={() => {
              if (language === 'uk') playAudio('/audio_for_audio_lesson/hint.mp3');
              else speak("In this task, choose the correct answer. Don’t worry if you’re not sure. I’m here to help!");
            }}
            className="mt-4 ml-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            🔊 {language === 'uk' ? 'Підказка' : 'Task Hint'}
          </button>
        </div>

        <div
          className="bg-white p-6 rounded-xl shadow-inner border-2 border-purple-200"
          onMouseEnter={() => playAudio('/audio_for_audio_lesson/extra_hover.mp3')}
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            🔗 {language === 'uk' ? 'Додатково' : 'Extra Materials'}
          </h2>
          <div className="space-y-3">
            <a
              href="https://learningapps.org/display?v=pk6hxv9oa24"
              target="_blank"
              rel="noreferrer"
              onClick={() => playAudio('/audio_for_audio_lesson/extra_click.mp3')}
              className="block text-purple-600 underline hover:text-purple-800"
            >
              ▶️ {language === 'uk' ? 'Інтерактивна гра “Вгадай емоцію”' : 'Interactive game “Guess the emotion”'}
            </a>
            <a
              href="https://www.youtube.com/watch?v=jh7wLjqI5PY"
              target="_blank"
              rel="noreferrer"
              onClick={() => playAudio('/audio_for_audio_lesson/extra_click.mp3')}
              className="block text-purple-600 underline hover:text-purple-800"
            >
              📺 {language === 'uk' ? 'Подивись відео про нейровідмінність' : 'Watch video on neurodiversity'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLessonPage;
