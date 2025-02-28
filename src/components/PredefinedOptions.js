import React, { useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './PredefinedOptions.css';

const PredefinedOptions = ({ options, onOptionSelect }) => {
  const { darkMode } = useContext(ThemeContext);

  // Function to get appropriate icon based on text content
  const getOptionIcon = (option) => {
    const text = option.toLowerCase();
    
    if (text.includes('appointment') || text.includes('schedule') || text.includes('doctor'))
      return '📅';
    if (text.includes('anxiety') || text.includes('anxious') || text.includes('worry'))
      return '😰';
    if (text.includes('stress') || text.includes('calm') || text.includes('relief'))
      return '🧘‍♀️';
    if (text.includes('sleep') || text.includes('rest') || text.includes('tired'))
      return '😴';
    if (text.includes('depression') || text.includes('sad') || text.includes('down'))
      return '😔';
    if (text.includes('exercise') || text.includes('breathing') || text.includes('activity'))
      return '🏃‍♂️';
    if (text.includes('talk') || text.includes('listen'))
      return '💬';
    if (text.includes('professional') || text.includes('therapist') || text.includes('psychiatrist'))
      return '👨‍⚕️';
    if (text.includes('emergency') || text.includes('crisis') || text.includes('help'))
      return '🆘';
    
    // Default icon if no match
    return '💭';
  };

  return (
    <div className={`predefined-options ${darkMode ? 'dark-mode' : ''}`}>
      {options.map((opt, idx) => (
        <button
          key={idx}
          className="option-button"
          onClick={() => onOptionSelect(opt)}
        >
          <span className="option-icon">{getOptionIcon(opt)}</span>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default PredefinedOptions;