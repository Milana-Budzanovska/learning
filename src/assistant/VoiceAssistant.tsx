
import React, { useEffect } from "react";

interface AssistantProps {
  message: string;
  avatar: string;
}

const VoiceAssistant: React.FC<AssistantProps> = ({ message, avatar }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "uk-UA";
    synth.speak(utterance);
  }, [message]);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 999 }}>
      <img src={avatar} alt="Асистент" style={{ width: "100px", borderRadius: "50%" }} />
    </div>
  );
};

export default VoiceAssistant;
