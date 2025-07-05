import type { SoundEffect } from "@/features/Stopwatch/useSoundEffect";
import { useEffect, useState } from "react";

type localStorageSettings = {
  breakTimeDivisor?: number;
  soundEffect?: SoundEffect;
  taskSectionVisible?: boolean;
};

export default function useSettings() {
  const [breakTimeDivisor, setBreakTimeDivisor] = useState<number>(5);
  const [draftBreakTimeDivisor, setDraftBreakTimeDivisor] =
    useState(breakTimeDivisor);

  const [soundEffect, setSoundEffect] = useState<SoundEffect>("simple_chime");
  const [draftSoundEffect, setDraftSoundEffect] =
    useState<SoundEffect>("simple_chime");

  const [taskSectionVisible, setTaskSectionVisible] = useState(true);

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

      const parsedTaskVisibility = parsedSettings["taskSectionVisible"];
      setTaskSectionVisible(parsedTaskVisibility);
    }
  }, []);

  function updateTaskVisibility() {
    const currentSettings: localStorageSettings = {
      breakTimeDivisor: breakTimeDivisor,
      soundEffect: soundEffect,
      taskSectionVisible: !taskSectionVisible,
    };
    localStorage.setItem("flowtime_settings", JSON.stringify(currentSettings));
  }

  return {
    breakTimeDivisor,
    setBreakTimeDivisor,
    draftBreakTimeDivisor,
    setDraftBreakTimeDivisor,
    soundEffect,
    setSoundEffect,
    draftSoundEffect,
    setDraftSoundEffect,
    taskSectionVisible,
    setTaskSectionVisible,
    updateTaskVisibility,
  };
}
