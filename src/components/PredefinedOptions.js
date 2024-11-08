// src/components/PredefinedOptions.js

import React from 'react';
import './PredefinedOptions.css';

const PredefinedOptions = ({ options, onOptionSelect }) => {
  return (
    <div className="predefined-options">
      {options.map((option, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;
