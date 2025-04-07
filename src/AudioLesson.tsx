import React, { useEffect, useState } from 'react';

const AudioLessonPage: React.FC = () => {
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const correctAnswer = 'B';

  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  useEffect(() => {
    const greeting = language === 'uk' 
      ? '/assets/А зараз послухаємо запис.mp3' 
      : '/assets/подкаст.mp3';
    playAudio(greeting);
  }, [language]);

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setFeedback('');
    if (language === 'uk') {
      const fileMap: Record<string, string> = {
        A: '/assets/а_дитина_що_володіє_багатьма_мовами.mp3',
        B: '/assets/б_мозок_який_працює_не_так_як_у_всіх.mp3',
        C: '/assets/с) дитина яка швидко засинає.mp3',
      };
      playAudio(fileMap[answer]);
    } else {
      const utterance = new SpeechSynthesisUtterance(`You selected option ${answer}`);
      utterance.lang = 'en-US';
      utterance.pitch = 1.2;
      utterance.rate = 0.95;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === correctAnswer) {
      language === 'uk'
        ? playAudio('/assets/Молодець, правильна відповідь .mp3')
        : speak("Great job! That’s the correct answer.");
      setFeedback(language === 'uk' ? '✅ Правильно!' : "✅ Correct! That’s the right answer.");
    } else {
      language === 'uk'
        ? playAudio('/assets/ойой,_помилка,_не_засмучуйся,_спробуй_іще.mp3')
        : speak("That’s okay! Mistakes help us learn. Let’s try again.");
      setFeedback(language === 'uk' ? '❌ Неправильно. Спробуй ще раз.' : "❌ Incorrect. Try again.");
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.includes('en') && v.name.toLowerCase().includes('google'));
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6 font-sans">
      <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
        <img src="/assets/flik.png" alt="Flik Assistant" className="w-20 h-20 rounded-full shadow-md" />
        <button
          onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
          className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold py-2 px-4 rounded-full shadow"
        >
          {language === 'uk' ? '🌐 English version' : '🌐 Українська версія'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {language === 'uk' ? 'Аудіоурок' : 'Audio Lesson'}
        </h1>

        <div className="flex flex-col items-center mb-6">
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
            <source src="/assets/podcast.mp3" type="audio/mpeg" />
            Your browser does not support audio.
          </audio>
          {language === 'uk' && (
            <button
              onClick={() => playAudio('/assets/А зараз послухаємо запис.mp3')}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            >
              🔊 Пояснення
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
            {['A', 'B', 'C'].map(option => (
              <li key={option}>
                <button
                  onClick={() => handleAnswer(option)}
                  disabled={submitted}
                  className={`w-full p-3 rounded-lg shadow hover:bg-purple-50 ${selected === option ? 'bg-purple-200' : 'bg-white'}`}
                >
                  {option}) {language === 'uk'
                    ? option === 'A'
                      ? 'Дитина, що володіє багатьма мовами'
                      : option === 'B'
                      ? 'Мозок, який працює не так, як у всіх'
                      : 'Дитина, яка швидко засинає'
                    : option === 'A'
                    ? 'A child who speaks many languages'
                    : option === 'B'
                    ? 'A brain that works differently from most'
                    : 'A child who falls asleep quickly'}
                </button>
              </li>
            ))}
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
            onClick={() =>
              language === 'uk'
                ? playAudio('/assets/Підказка до завдання .mp3')
                : speak("In this task, choose the correct answer. Don’t worry if you’re not sure. I’m here to help!")
            }
            className="mt-4 ml-4 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
          >
            🔊 {language === 'uk' ? 'Підказка' : 'Hint'}
          </button>
        </div>

        <div
          className="bg-white p-6 rounded-xl shadow-inner border-2 border-purple-200"
          onMouseEnter={() => language === 'uk' && playAudio('/assets/про екстра.mp3')}
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            🔗 {language === 'uk' ? 'Додаткові матеріали' : 'Extra Materials'}
          </h2>
          <div className="space-y-3">
            <a
              href="https://learningapps.org/display?v=pk6hxv9oa24"
              target="_blank"
              rel="noreferrer"
              onClick={() => language === 'uk' && playAudio('/assets/Якщо_ти_хочеш_дізнатися_більше_пограй_в.mp3')}
              className="block text-purple-600 underline hover:text-purple-800"
            >
              ▶️ {language === 'uk' ? 'Гра "Вгадай емоцію"' : 'Game "Guess the emotion"'}
            </a>
            <a
              href="https://www.youtube.com/watch?v=jh7wLjqI5PY"
              target="_blank"
              rel="noreferrer"
              onClick={() => language === 'uk' && playAudio('/assets/Якщо_ти_хочеш_дізнатися_більше_пограй_в.mp3')}
              className="block text-purple-600 underline hover:text-purple-800"
            >
              📺 {language === 'uk' ? 'Відео про нейровідмінність' : 'Video about neurodiversity'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioLessonPage;
