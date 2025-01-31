import React from 'react';
import './PredefinedOptions.css';

const PredefinedOptions = ({ options, onOptionSelect }) => {
  return (
    <div className="predefined-options">
      {options.map((opt, idx) => (
        <button
          key={idx}
          className="option-button"
          onClick={() => onOptionSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;
