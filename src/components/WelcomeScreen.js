import React, { useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div className={`welcome-screen ${darkMode ? 'dark-mode' : ''}`}>
      <div className="welcome-header">
        <div className="welcome-logo">
          <img src="robo chat icon for home screen.webp" alt="Mental Health Assistant" />
        </div>
        <h1>Mental Health Assistant</h1>
      </div>
      
      <div className="welcome-body">
        <p>I'm here to support your mental well-being. How can I help you today?</p>
        
        <div className="suggestion-grid">
          <button onClick={() => onStart("I need to schedule an appointment")}>
            <span className="suggestion-icon">📅</span>
            Schedule Appointment
          </button>
          <button onClick={() => onStart("I'm feeling anxious")}>
            <span className="suggestion-icon">😰</span>
            Feeling Anxious
          </button>
          <button onClick={() => onStart("Show me stress relief exercises")}>
            <span className="suggestion-icon">🧘</span>
            Stress Relief
          </button>
          <button onClick={() => onStart("I'm having trouble sleeping")}>
            <span className="suggestion-icon">😴</span>
            Sleep Help
          </button>
        </div>
      </div>
      
      <div className="emergency-notice">
        <p>
          <strong>In case of emergency:</strong> If you're experiencing a mental health crisis, 
          please call 988 for the National Suicide Prevention Lifeline or text HOME to 741741.
        </p>
      </div>
      
      <button className="start-chat-button" onClick={() => onStart()}>
        Start Chatting
      </button>
    </div>
  );
};

export default WelcomeScreen;