// src/App.js

import React, { useState } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import VoiceVideoButtons from './components/VoiceVideoButtons';
import PredefinedOptions from './components/PredefinedOptions';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const predefinedOptions = [
    'Reach out to a therapist',
    'Understand your bill',
    'Book an appointment',
    // Add more options as desired
  ];

  const handleSend = (message) => {
    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (message.trim().toLowerCase() === 'hi') {
      setShowOptions(true);

      setTimeout(() => {
        const botMessage = {
          text: 'Hello! How can I assist you today?',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 500);
    } else {
      setShowOptions(false);

      setTimeout(() => {
        const botMessage = {
          text: 'This is a chatbot response.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleOptionSelect = (option) => {
    const userMessage = {
      text: option,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setShowOptions(false);

    setTimeout(() => {
      const botMessage = {
        text: `You selected "${option}". Here's some information about ${option.toLowerCase()}.`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleMinimizeClick = () => {
    setIsChatOpen(false);
  };

  const handleChatIconClick = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="app-container">
      {!isChatOpen && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          <img src="/chatbot-icon.png" alt="Chatbot Icon" />
        </div>
      )}

      {isChatOpen && (
        <div className="chat-app">
          <Header
            onSettingsClick={handleSettingsClick}
            onMinimizeClick={handleMinimizeClick}
          />
          <VoiceVideoButtons />
          <MessageList messages={messages} />
          {showOptions && (
            <PredefinedOptions
              options={predefinedOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
          <ChatInput onSend={handleSend} />
          {showSettings && <Settings onClose={handleSettingsClose} />}
        </div>
      )}
    </div>
  );
}

export default App;
