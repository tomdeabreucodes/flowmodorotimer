import { useEffect, useRef, useState } from "react";
import Break from "../Break/Break.tsx";
import { Button } from "../../components/ui/button";
import { FaPlay, FaRotateLeft } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { RiSkipForwardFill } from "react-icons/ri";
import { Badge } from "../../components/ui/badge";
import { TbFocus2 } from "react-icons/tb";
import { MdMotionPhotosPaused } from "react-icons/md";
import buttonSound from "../../assets/button_click.mp3";
import type { settingsType } from "../SettingsEditor/SettingsEditor.tsx";
import useSoundEffect from "./useSoundEffect.ts";

type Interval = NodeJS.Timeout | null;
type TimerMode = "idle" | "focus" | "break";

const Stopwatch = ({ settings }: settingsType) => {
  const [mode, setMode] = useState<TimerMode>("idle");
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const lastTimestampRef = useRef(Date.now());

  const buttonAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerAudioRef = useRef<HTMLAudioElement | null>(null);

  const timerSound = useSoundEffect(settings.soundEffect);

  useEffect(() => {
    buttonAudioRef.current = new Audio(buttonSound);
  }, []);

  useEffect(() => {
    if (!timerSound) return;
    timerAudioRef.current = timerSound;
  }, [timerSound]);

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
    const actualBreakDuration = BREAK_TIME > 1000 ? BREAK_TIME : 1500;
    setTime(0);
    setBreakTime(actualBreakDuration);
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
    <div>
      <div className="flex flex-col items-center mb-4">
        {mode === "focus" && (
          <>
            <Badge variant="outline">
              Focus <TbFocus2 />
            </Badge>
          </>
        )}
        {mode === "break" && (
          <>
            <Badge variant="outline">
              Break <FaCoffee />
            </Badge>
          </>
        )}
        {mode === "idle" && (
          <>
            <Badge variant="outline">
              Idle <MdMotionPhotosPaused />
            </Badge>
          </>
        )}
      </div>
      <div className="mb-2 flex flex-col items-center font-mono">
        {mode === "break" ? (
          <div className="time-display text-8xl mb-4">
            {formatted.hours !== "00" ? (
              <span className="hours">{formattedBreak.hours}:</span>
            ) : (
              <span></span>
            )}
            <span className="minutes">{formattedBreak.minutes}:</span>
            <span className="seconds">{formattedBreak.seconds}</span>
          </div>
        ) : (
          <div className="time-display text-8xl mb-4">
            {formatted.hours !== "00" && (
              <span className="hours">{formatted.hours}:</span>
            )}
            <span className="minutes">{formatted.minutes}:</span>
            <span className="seconds">{formatted.seconds}</span>
          </div>
        )}
        <div className="space-x-2 font-mono">
          {mode === "focus" && (
            <>
              <Button onClick={startBreak} size="lg">
                <FaCoffee />
              </Button>
            </>
          )}
          {mode === "break" && (
            <Button onClick={resetStopwatch} size="lg">
              <RiSkipForwardFill />
            </Button>
          )}
          {mode === "idle" && (
            <Button onClick={startStopwatch} size="lg">
              <FaPlay />
            </Button>
          )}
          <Button
            onClick={resetStopwatch}
            variant="outline"
            size="lg"
            disabled={mode !== "focus" && true}
            className={`${mode !== "focus" && "cursor-not-allowed"}`}
          >
            <FaRotateLeft />
          </Button>
        </div>
        <div
          className={`${
            mode !== "focus" ? "text-current/30" : "animate-pulse"
          }`}
        >
          <Break breakTime={totalMinutes} />
        </div>
      </div>
    </div>
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
