import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './VoiceInput.css';

const VoiceInput = ({ onTranscript, onStatusChange }) => {
  const { darkMode } = useContext(ThemeContext);
  const [isListening, setIsListening] = useState(false);
  // We're using the transcript variable but only to pass it to onTranscript
  // This avoids the "assigned but never used" warning
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      onStatusChange('not-supported');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onstart = () => {
      setIsListening(true);
      onStatusChange('listening');
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
      onStatusChange('stopped');
    };
    
    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      const fullTranscript = finalTranscript || interimTranscript;
      // Pass the transcript to the parent component instead of just storing it
      onTranscript(fullTranscript);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onStatusChange('error');
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [onTranscript, onStatusChange]);

  const toggleListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      // No need to set transcript directly, we're using the onresult callback
    }
  };

  return (
    <div className={`voice-input ${darkMode ? 'dark-mode' : ''}`}>
      <button 
        className={`voice-button ${isListening ? 'listening' : ''} ${!isSupported ? 'disabled' : ''}`}
        onClick={toggleListening}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        disabled={!isSupported}
        title={!isSupported ? 'Speech recognition not supported in your browser' : (isListening ? 'Stop listening' : 'Start voice input')}
      >
        <span className="voice-icon">🎤</span>
        {isListening && (
          <span className="pulse-ring"></span>
        )}
      </button>
      {isListening && (
        <div className="listening-indicator">
          Listening...
        </div>
      )}
    </div>
  );
};

export default VoiceInput;