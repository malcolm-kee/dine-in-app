import * as React from 'react';

const synth = window.speechSynthesis;

export const useVoice = () => {
  const [voices, setVoices] = React.useState(() => synth.getVoices());

  React.useEffect(() => {
    if (synth && typeof synth.onvoiceschanged !== 'undefined') {
      setVoices(synth.getVoices());

      const onVoiceChange = () => setVoices(synth.getVoices());

      synth.addEventListener('voiceschanged', onVoiceChange);

      return () => synth.removeEventListener('voiceschanged', onVoiceChange);
    }
  }, []);

  const speakFn = (voiceUri: string, word: string) => {
    const matchedVoice =
      voices.find((v) => v.voiceURI === voiceUri) ||
      voices.find((v) => v.lang.indexOf(voiceUri) > -1);

    if (matchedVoice) {
      const utter = new SpeechSynthesisUtterance(word);
      utter.voice = matchedVoice;
      utter.rate = 0.7;
      synth.speak(utter);
    }
  };

  const speakRef = React.useRef(speakFn);
  speakRef.current = speakFn;

  const speak = React.useCallback(
    (lang: string, word: string) => speakRef.current(lang, word),
    []
  );

  return {
    speak,
    voices,
  };
};
