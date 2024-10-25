import React, { useState } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import VoiceVideoButtons from './components/VoiceVideoButtons';  // Import the new component
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (message) => {
    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage = {
        text: 'This is a chatbot response.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="chat-app">
      <Header />
      <VoiceVideoButtons />  {/* Add the buttons below the header or where you want them to appear */}
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default App;
