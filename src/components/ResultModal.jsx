import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal({ result, targetTime, remainingTime }, ref) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>Your {result}</h2>
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{remainingTime} seconds left</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
