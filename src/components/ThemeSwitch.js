import React, { useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './ThemeSwitch.css';

const ThemeSwitch = ({ isOn, handleToggle, id }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`theme-switch-container ${theme !== 'default' ? theme : ''}`}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="theme-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        className={`theme-switch-label ${isOn ? 'active' : ''}`}
        htmlFor={id}
        aria-label={isOn ? 'Turn off' : 'Turn on'}
      >
        <span className="theme-switch-button" />
      </label>
    </div>
  );
};

export default ThemeSwitch;