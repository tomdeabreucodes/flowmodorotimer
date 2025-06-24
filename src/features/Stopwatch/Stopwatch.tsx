import { useEffect, useRef, useState } from "react";
import Break from "../Break/Break.tsx";
import { Button } from "../../components/ui/button";
import { FaPlay, FaRotateLeft } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { RiSkipForwardFill } from "react-icons/ri";
import { Badge } from "../../components/ui/badge";
import { TbFocus2 } from "react-icons/tb";
import timerSound from "../../assets/timer_expired.mp3";
import buttonSound from "../../assets/button_click.mp3";

type Interval = NodeJS.Timeout | null;
// type TimerMode = "idle" | "focus" | "break";

const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(true);
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

    if (running && paused === false) {
      interval = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTimestampRef.current;
        lastTimestampRef.current = now;
        setTime((time) => time + delta);
      }, 50);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running, paused]);

  useEffect(() => {
    let interval: Interval = null;
    lastTimestampRef.current = Date.now();

    if (paused === true && running === true) {
      if (breakTime >= 10) {
        interval = setInterval(() => {
          const now = Date.now();
          const delta = now - lastTimestampRef.current;
          lastTimestampRef.current = now;

          setBreakTime((prevTime) => {
            const updated = prevTime - delta;
            if (updated <= 0) {
              timerAudioRef.current?.play();
              setRunning(false);
              return 0;
            }
            return updated;
          });
        }, 50);
      } else {
        timerAudioRef.current?.play();

        setRunning(false);
        setBreakTime(0);
      }
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running, paused, breakTime]);

  const startStopwatch = () => {
    buttonAudioRef.current?.play();
    setRunning(true);
    setPaused(false);
  };

  const resumeStopwatch = () => {
    buttonAudioRef.current?.play();
    setPaused(true);
    setBreakTime(time / 5);
    setTime(0);
    if (paused) {
      setRunning(false);
    }
  };

  const restartStopwatch = () => {
    buttonAudioRef.current?.play();
    setRunning(false);
    setPaused(true);
    setTime(0);
  };

  const formatted = formatStopwatchTime(time);
  const formattedBreak = formatStopwatchTime(breakTime);
  const { minutes } = formatStopwatchTime(time / 5);

  return (
    <>
      <div>
        <div>
          {paused && running === true ? (
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
              {formatted.hours !== "00" ? (
                <span className="hours">{formatted.hours}:</span>
              ) : (
                <span></span>
              )}
              <span className="minutes">{formatted.minutes}:</span>
              <span className="seconds">{formatted.seconds}</span>
            </div>
          )}
          {running ? (
            <Button onClick={resumeStopwatch}>
              {paused ? <RiSkipForwardFill /> : <FaCoffee />}
            </Button>
          ) : (
            <Button onClick={startStopwatch}>
              <FaPlay />
            </Button>
          )}
          {running && paused === false && (
            <Button onClick={restartStopwatch}>
              <FaRotateLeft />
            </Button>
          )}
        </div>
        {paused === false && running === true && (
          <Badge>
            Focus <TbFocus2 />
          </Badge>
        )}
        {paused === true && running === true && (
          <Badge variant="secondary">
            Break <FaCoffee />
          </Badge>
        )}
        {paused === false && (
          <div>
            <Break breakTime={minutes} />
          </div>
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

  return {
    hours: hoursStr,
    minutes: minutesString,
    seconds: secondsStr,
  };
}
