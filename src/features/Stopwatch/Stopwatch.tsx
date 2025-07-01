import { useEffect, useRef, useState } from "react";
import Break from "../Break/Break.tsx";
import { Button } from "../../components/ui/button";
import { FaPlay, FaRotateLeft } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { RiSkipForwardFill } from "react-icons/ri";
import { Badge } from "../../components/ui/badge";
import { TbFocus2 } from "react-icons/tb";
import timerSound from "../../assets/simple_chime.mp3";
import buttonSound from "../../assets/button_click.mp3";
import type { settingsType } from "../SettingsEditor/SettingsEditor.tsx";

type Interval = NodeJS.Timeout | null;
type TimerMode = "idle" | "focus" | "break";

const Stopwatch = ({ settings }: settingsType) => {
  const [mode, setMode] = useState<TimerMode>("idle");
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

  const buttonAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerAudioRef = useRef<HTMLAudioElement | null>(null);

  const lastTimestampRef = useRef(Date.now());

  useEffect(() => {
    buttonAudioRef.current = new Audio(buttonSound);
    timerAudioRef.current = new Audio(timerSound);
  }, []);

  useEffect(() => {
    let interval: Interval = null;
    lastTimestampRef.current = Date.now();

    if (mode === "focus") {
      interval = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTimestampRef.current;
        lastTimestampRef.current = now;
        setTime((time) => time + delta);
      }, 100);
    } else if (mode === "break") {
      interval = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTimestampRef.current;
        lastTimestampRef.current = now;

        setBreakTime((time) => {
          const updated = time - delta;
          if (updated <= 0) {
            timerAudioRef.current?.play();
            setMode("idle");
            return 0;
          }
          return updated;
        });
      }, 100);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [mode]);

  const startStopwatch = () => {
    buttonAudioRef.current?.play();
    setMode("focus");
  };

  const BREAK_DIVISOR = settings.breakTimeDivisor;
  const BREAK_TIME = time / BREAK_DIVISOR;

  const startBreak = () => {
    buttonAudioRef.current?.play();
    const breakDuration = BREAK_TIME;
    setTime(0);
    setBreakTime(breakDuration > 1000 ? breakDuration : 1500); // fallback
    setMode("break");
  };

  const resetStopwatch = () => {
    buttonAudioRef.current?.play();
    setTime(0);
    setMode("idle");
  };

  const formatted = formatStopwatchTime(time);
  const formattedBreak = formatStopwatchTime(breakTime);
  const { totalMinutes } = formatStopwatchTime(BREAK_TIME);

  return (
    <>
      <div>
        <div>
          {mode === "break" ? (
            <div className="time-display text-6xl">
              {formatted.hours !== "00" ? (
                <span className="hours">{formattedBreak.hours}:</span>
              ) : (
                <span></span>
              )}
              <span className="minutes">{formattedBreak.minutes}:</span>
              <span className="seconds">{formattedBreak.seconds}</span>
            </div>
          ) : (
            <div className="time-display text-6xl">
              {formatted.hours !== "00" && (
                <span className="hours">{formatted.hours}:</span>
              )}
              <span className="minutes">{formatted.minutes}:</span>
              <span className="seconds">{formatted.seconds}</span>
            </div>
          )}
          {mode === "focus" && (
            <>
              <Button onClick={startBreak}>
                <FaCoffee />
              </Button>
              <Button onClick={resetStopwatch}>
                <FaRotateLeft />
              </Button>
            </>
          )}
          {mode === "break" && (
            <Button onClick={resetStopwatch}>
              <RiSkipForwardFill />
            </Button>
          )}
          {mode === "idle" && (
            <Button onClick={startStopwatch}>
              <FaPlay />
            </Button>
          )}
        </div>
        {mode === "focus" && (
          <>
            <Badge>
              Focus <TbFocus2 />
            </Badge>
            <div>
              <Break breakTime={totalMinutes} />
            </div>
          </>
        )}
        {mode === "break" && (
          <Badge variant="secondary">
            Break <FaCoffee />
          </Badge>
        )}
      </div>
    </>
  );
};

export default Stopwatch;

function formatStopwatchTime(ms: number) {
  let seconds: number = Math.floor(ms / 1000);
  const hours: number = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const hoursStr = ("00" + hours).slice(-2);
  const minutesString = ("00" + minutes).slice(-2);
  const secondsStr = ("00" + seconds).slice(-2);

  const totalMinutes = Math.floor(ms / 60000);

  return {
    hours: hoursStr,
    minutes: minutesString,
    seconds: secondsStr,
    totalMinutes,
  };
}
