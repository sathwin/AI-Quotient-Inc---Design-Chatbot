import React, { useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './Settings.css';

const Settings = ({ 
  onClose, 
  onExport, 
  onClearHistory, 
  onLogout, 
  isAuthenticated 
}) => {
  const { 
    darkMode, 
    theme, 
    fontSize, 
    highContrast, 
    toggleDarkMode, 
    changeTheme, 
    changeFontSize, 
    toggleHighContrast 
  } = useContext(ThemeContext);

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h3>Settings</h3>
        
        <div className="settings-section">
          <h4>Theme</h4>
          <div className="settings-option">
            <label htmlFor="dark-mode">Dark Mode</label>
            <input 
              type="checkbox" 
              id="dark-mode" 
              checked={darkMode} 
              onChange={toggleDarkMode} 
            />
          </div>
          
          <div className="settings-option">
            <label htmlFor="theme-select">Theme Color</label>
            <select 
              id="theme-select" 
              value={theme} 
              onChange={(e) => changeTheme(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="blue-theme">Blue</option>
              <option value="green-theme">Green</option>
              <option value="purple-theme">Purple</option>
            </select>
          </div>
        </div>
        
        <div className="settings-section">
          <h4>Accessibility</h4>
          <div className="settings-option">
            <label htmlFor="font-size">Font Size</label>
            <select 
              id="font-size" 
              value={fontSize} 
              onChange={(e) => changeFontSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="x-large">Extra Large</option>
            </select>
          </div>
          
          <div className="settings-option">
            <label htmlFor="high-contrast">High Contrast</label>
            <input 
              type="checkbox" 
              id="high-contrast" 
              checked={highContrast} 
              onChange={toggleHighContrast} 
            />
          </div>
        </div>
        
        <div className="settings-section">
          <h4>Data</h4>
          <button 
            className="settings-button"
            onClick={() => onExport('text')}
          >
            Export Chat History
          </button>
          
          <button 
            className="settings-button warning"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all chat history?')) {
                onClearHistory();
              }
            }}
          >
            Clear Chat History
          </button>
          
          {isAuthenticated && (
            <button 
              className="settings-button warning"
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  onLogout();
                  onClose();
                }
              }}
            >
              Log Out
            </button>
          )}
        </div>
        
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;