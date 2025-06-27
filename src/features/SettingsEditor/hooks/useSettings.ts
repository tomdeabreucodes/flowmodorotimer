import { useEffect, useState } from "react";
export default function useSettings() {
  const [breakTimeDivisor, setBreakTimeDivisor] = useState<number>(5);
  const [draftBreakTimeDivisor, setDraftBreakTimeDivisor] =
    useState(breakTimeDivisor);

  useEffect(() => {
    const storedBreakTimeDivisor = localStorage.getItem("flowtime_settings");
    if (storedBreakTimeDivisor) {
      const parsedBreakTimeDivisor = JSON.parse(storedBreakTimeDivisor);
      setBreakTimeDivisor(parsedBreakTimeDivisor);
      setDraftBreakTimeDivisor(parsedBreakTimeDivisor);
    }
  }, []);

  return {
    breakTimeDivisor,
    setBreakTimeDivisor,
    draftBreakTimeDivisor,
    setDraftBreakTimeDivisor,
  };
}
