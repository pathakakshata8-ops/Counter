import { useState } from "react";
import "./Counter.css";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(20);

  const handleIncrement = () => {
    setCount(count + step);
  };

  const handleDecrement = () => {
    setCount(count - step);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="page">
      <div className="counter-card">
        <h1>useState Challenge</h1>

        <p className="count-text">
          Count: <span>{count}</span>
        </p>

        <div className="step-box">
          <label>Step:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </div>

        <div className="button-group">
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleDecrement} disabled={count <= 0}>
            Decrement
          </button>
          <button onClick={handleReset} className="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
