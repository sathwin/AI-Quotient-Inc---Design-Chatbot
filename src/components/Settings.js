import React, { useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import ThemeSwitch from './ThemeSwitch';
import './Settings.css';

const Settings = ({ onClose, onExport, onClearHistory }) => {
  // Get theme context and settings functions
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

  // Handle theme selection
  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
  };

  // Handle export
  const handleExportClick = (format) => {
    onExport(format);
    onClose();
  };

  // Handle clear history
  const handleClearHistoryClick = () => {
    if (window.confirm('Are you sure you want to clear your chat history? This action cannot be undone.')) {
      onClearHistory();
      onClose();
    }
  };

  return (
    <div className={`settings-modal ${darkMode ? 'dark-mode' : ''}`} onClick={(e) => e.target.className === 'settings-modal' ? onClose() : null}>
      <div className={`settings-content ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
        <div className="settings-header">
          <h3>Settings</h3>
          <button className="close-x-button" onClick={onClose}>×</button>
        </div>
        
        {/* Theme Settings Section */}
        <div className="settings-section">
          <h4>Appearance</h4>
          
          {/* Dark Mode Toggle using ThemeSwitch component */}
          <div className="setting-item">
            <label htmlFor="dark-mode-switch">Dark Mode</label>
            <ThemeSwitch 
              isOn={darkMode}
              handleToggle={toggleDarkMode}
              id="dark-mode-switch"
            />
          </div>
          
          {/* Theme Selection */}
          <div className="setting-item">
            <label>Theme</label>
            <div className="theme-options">
              <button 
                className={`theme-option default ${theme === 'default' ? 'selected' : ''}`}
                onClick={() => handleThemeChange('default')}
                aria-label="Default theme"
              ></button>
              <button 
                className={`theme-option purple ${theme === 'purple-theme' ? 'selected' : ''}`}
                onClick={() => handleThemeChange('purple-theme')}
                aria-label="Purple theme"
              ></button>
              <button 
                className={`theme-option blue ${theme === 'blue-theme' ? 'selected' : ''}`}
                onClick={() => handleThemeChange('blue-theme')}
                aria-label="Blue theme"
              ></button>
              <button 
                className={`theme-option green ${theme === 'green-theme' ? 'selected' : ''}`}
                onClick={() => handleThemeChange('green-theme')}
                aria-label="Green theme"
              ></button>
            </div>
          </div>
        </div>
        
        {/* Accessibility Section */}
        <div className="settings-section">
          <h4>Accessibility</h4>
          
          {/* Font Size */}
          <div className="setting-item">
            <label>Font Size</label>
            <div className="font-size-options">
              <button 
                className={fontSize === 'small' ? 'selected' : ''}
                onClick={() => changeFontSize('small')}
              >
                Small
              </button>
              <button 
                className={fontSize === 'medium' ? 'selected' : ''}
                onClick={() => changeFontSize('medium')}
              >
                Medium
              </button>
              <button 
                className={fontSize === 'large' ? 'selected' : ''}
                onClick={() => changeFontSize('large')}
              >
                Large
              </button>
            </div>
          </div>
          
          {/* High Contrast Toggle using ThemeSwitch component */}
          <div className="setting-item">
            <label htmlFor="high-contrast-switch">High Contrast</label>
            <ThemeSwitch 
              isOn={highContrast}
              handleToggle={toggleHighContrast}
              id="high-contrast-switch"
            />
          </div>
        </div>
        
        {/* Chat Settings */}
        <div className="settings-section">
          <h4>Chat Settings</h4>
          <ul className="settings-list">
            <li>
              <button className="settings-button" onClick={handleClearHistoryClick}>
                <span className="settings-icon">🗑️</span>
                Clear Chat History
              </button>
            </li>
            <li>
              <button className="settings-button" onClick={() => handleExportClick('text')}>
                <span className="settings-icon">📄</span>
                Export Chat as Text
              </button>
            </li>
            <li>
              <div className="settings-dropdown">
                <button className="settings-button">
                  <span className="settings-icon">🔔</span>
                  Notifications
                </button>
                <div className="dropdown-content">
                  <div className="setting-item">
                    <label htmlFor="notification-switch">Enable Notifications</label>
                    <ThemeSwitch 
                      isOn={true}
                      handleToggle={() => {}}
                      id="notification-switch"
                    />
                  </div>
                  <div className="setting-item">
                    <label htmlFor="sound-switch">Sound</label>
                    <ThemeSwitch 
                      isOn={true}
                      handleToggle={() => {}}
                      id="sound-switch"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div className="settings-section">
          <h4>About</h4>
          <div className="about-content">
            <p>AI Quotient Chatbot v1.0</p>
            <p className="copyright">© 2024 AI Quotient, Inc.</p>
            <p>Empowering organizations through ethical, human-centric AI solutions.</p>
          </div>
        </div>
        
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;