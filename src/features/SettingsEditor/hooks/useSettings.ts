import type { SoundEffect } from "@/features/Stopwatch/useSoundEffect";
import { useEffect, useState } from "react";
export default function useSettings() {
  const [breakTimeDivisor, setBreakTimeDivisor] = useState<number>(5);
  const [draftBreakTimeDivisor, setDraftBreakTimeDivisor] =
    useState(breakTimeDivisor);

  const [soundEffect, setSoundEffect] = useState<SoundEffect>("simple_chime");
  const [draftSoundEffect, setDraftSoundEffect] =
    useState<SoundEffect>("simple_chime");

  useEffect(() => {
    const storedSettings = localStorage.getItem("flowtime_settings");
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      const parsedBreakTimeDivisor = parsedSettings["breakTimeDivisor"];
      setBreakTimeDivisor(parsedBreakTimeDivisor);
      setDraftBreakTimeDivisor(parsedBreakTimeDivisor);

      const parsedSoundEffect = parsedSettings["soundEffect"];
      setSoundEffect(parsedSoundEffect);
      setDraftSoundEffect(parsedSoundEffect);
    }
  }, []);

  return {
    breakTimeDivisor,
    setBreakTimeDivisor,
    draftBreakTimeDivisor,
    setDraftBreakTimeDivisor,
    soundEffect,
    setSoundEffect,
    draftSoundEffect,
    setDraftSoundEffect,
  };
}
