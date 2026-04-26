import React from "react";

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="steps">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isDone   = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div
            key={index}
            className={`step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
          >
            <div className="step-circle">
              {isDone ? "✓" : stepNum}
            </div>
            <div className="step-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;