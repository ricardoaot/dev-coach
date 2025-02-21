import { useState } from "react";

const useSpeechSynthesis = (lang: string = "es-ES", rate: number = 1) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speakText = (text: string) => {
    if (isSpeaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    synth.cancel();
    setIsSpeaking(false);
  };

  return { speakText, stopSpeaking, isSpeaking };
};

export default useSpeechSynthesis;
