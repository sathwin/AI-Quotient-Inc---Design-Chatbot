import React, { useState, useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import Avatar from './Avatar';
import './Header.css';

const Header = ({ 
  onSettingsClick, 
  onMinimizeClick, 
  avatarUrl,
  onExport,
  onClearHistory
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  
  // Handle header actions
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  
  const handleExportClick = () => {
    onExport('text');
    setShowMenu(false);
  };
  
  const handleClearHistoryClick = () => {
    if (window.confirm('Are you sure you want to clear your chat history? This action cannot be undone.')) {
      onClearHistory();
      setShowMenu(false);
    }
  };
  
  // Handle emergency helpline
  const handleEmergencyHelp = () => {
    alert('In case of a mental health emergency, please call 988 for the National Suicide Prevention Lifeline or text HOME to 741741 for the Crisis Text Line.');
    setShowMenu(false);
  };
  
  return (
    <div className={`chat-header ${darkMode ? 'dark-mode' : ''}`}>
      {/* Bot's avatar or user-chosen avatar */}
      <div className="header-left">
        <Avatar imageUrl={avatarUrl || "robo chat icon for home screen.webp"} online={true} />
        <div className="header-title">
          <h2>Mental Health Assistant</h2>
          <span className="online-status">Online</span>
        </div>
      </div>
      
      <div className="header-icons">
        <button 
          className="emergency-button"
          onClick={handleEmergencyHelp}
          aria-label="Emergency Help"
          title="Get emergency mental health resources"
        >
          🆘
        </button>
        
        <button 
          className="icon-button header-menu-button" 
          onClick={handleMenuToggle}
          aria-label="Menu"
          aria-expanded={showMenu}
        >
          ⋮
        </button>
        
        {showMenu && (
          <div className="header-menu">
            <button onClick={handleExportClick}>
              <span className="menu-icon">📄</span>
              Export Chat
            </button>
            <button onClick={handleClearHistoryClick}>
              <span className="menu-icon">🗑️</span>
              Clear History
            </button>
            <button onClick={() => {
              onSettingsClick();
              setShowMenu(false);
            }}>
              <span className="menu-icon">⚙️</span>
              Settings
            </button>
            <button onClick={handleEmergencyHelp}>
              <span className="menu-icon">🆘</span>
              Emergency Resources
            </button>
          </div>
        )}
        
        <button 
          className="icon-button" 
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          ⚙️
        </button>
        <button 
          className="icon-button minimize-button" 
          onClick={onMinimizeClick}
          aria-label="Minimize"
        >
          —
        </button>
      </div>
    </div>
  );
};

export default Header;