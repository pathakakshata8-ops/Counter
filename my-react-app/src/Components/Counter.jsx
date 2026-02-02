import { useEffect, useState, useCallback } from "react";
import "./Counter.css";

const MIN = 0;
const MAX = 1000;

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(20);
  const [history, setHistory] = useState([0]);
  const [index, setIndex] = useState(0);

  /* ---------- CORE UPDATE LOGIC ---------- */
  const updateCount = useCallback(
    (newValue) => {
      if (newValue < MIN || newValue > MAX) return;

      const newHistory = history.slice(0, index + 1);
      setHistory([...newHistory, newValue]);
      setIndex((prev) => prev + 1);
      setCount(newValue);
    },
    [history, index]
  );

  /* ---------- ACTION HANDLERS ---------- */
  const handleIncrement = () => updateCount(count + step);
  const handleDecrement = () => updateCount(count - step);
  const handleReset = () => updateCount(0);

  const handleUndo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setCount(history[index - 1]);
    }
  };

  const handleRedo = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setCount(history[index + 1]);
    }
  };

  /* ---------- KEYBOARD SUPPORT ---------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp") handleIncrement();
      if (e.key === "ArrowDown") handleDecrement();
      if (e.key === "r") handleReset();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleIncrement, handleDecrement]);

  /* ---------- STEP VALIDATION ---------- */
  const handleStepChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= 100) setStep(value);
  };

  /* ---------- DERIVED STATE ---------- */
  const progress = Math.round((count / MAX) * 100);

  return (
    <div className="page">
      <div className="counter-card">
        <h1>Advanced useState Counter</h1>

        <p className="count-text">
          Count: <span>{count}</span>
        </p>

        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="step-box">
          <label>Step:</label>
          <input
            type="number"
            value={step}
            onChange={handleStepChange}
          />
        </div>

        <div className="button-group">
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement} disabled={count <= MIN}>-</button>
          <button onClick={handleReset} className="reset">Reset</button>
        </div>

        <div className="button-group secondary">
          <button onClick={handleUndo} disabled={index === 0}>Undo</button>
          <button onClick={handleRedo} disabled={index === history.length - 1}>
            Redo
          </button>
        </div>

        <p className="hint">
          ⬆ Increment | ⬇ Decrement | r Reset
        </p>
      </div>
    </div>
  );
};
