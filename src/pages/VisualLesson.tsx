
import React from "react";
import VoiceAssistant from "../assistant/VoiceAssistant";
import flik from "../assets/flik.png";

const VisualLesson = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Урок для візуалів</h1>
      <p>Цей матеріал адаптований для учнів, які краще сприймають інформацію через зображення.</p>
      <VoiceAssistant message="Привіт! Давай вивчимо цю тему разом!" avatar={flik} />
    </div>
  );
};

export default VisualLesson;
