import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeStarted, setTimeStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [result, setResult] = useState(null);

  const timer = useRef();
  const startTimeRef = useRef();
  const dialog = useRef(); // ✅ Ref for dialog element

  function handleStart() {
    setTimeStarted(true);
    setTimerExpired(false);
    setResult(null);
    startTimeRef.current = Date.now();

    timer.current = setTimeout(() => {
      setTimerExpired(true);
      setResult("lost");
      setTimeStarted(false);
      setRemainingTime(0);
      dialog.current?.showModal(); // ✅ Safely open the dialog
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const timeLeft = Math.max(0, targetTime - elapsedTime);
    
    setTimeStarted(false);
    setTimerExpired(true);
    setResult("won");
    setRemainingTime(timeLeft.toFixed(1));
    dialog.current?.showModal(); // ✅ Open the dialog when stopped
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result={result}
        remainingTime={remainingTime}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeStarted ? handleStop : handleStart}>
            {timeStarted ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timeStarted ? "active" : undefined}>
          {timeStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
