// Chatbot.js

import React, { useState } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import VoiceVideoButtons from './components/VoiceVideoButtons';
import PredefinedOptions from './components/PredefinedOptions';
import Settings from './components/Settings';
import './Chatbot.css'; // Import CSS for Chatbot

const avatarImages = [
  '/avatar-user.png',
  'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=BlazerSweater&clotheColor=Pink&eyeType=Side&eyebrowType=SadConcerned&mouthType=Serious&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Red&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Platinum&clotheType=BlazerSweater&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor=Tanned',
];

function Chatbot() {
  // Chatbot state and functions
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false); // Show predefined options when needed
  const [showSettings, setShowSettings] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAvatarSelectionOpen, setIsAvatarSelectionOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const predefinedOptions = [
    'I need someone to talk to',
    'I feel anxious',
    'I am stressed about work',
    'I have trouble sleeping',
    // Add more options as desired
  ];

  const handleSend = (msg) => {
    const userMessage = {
      text: msg,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Check for greetings to show predefined options
    if (['hi', 'hey', 'hello'].includes(msg.toLowerCase())) {
      setShowOptions(true);
      const botMessage = {
        text: 'Hello! How can I assist you today?',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      return;
    } else {
      setShowOptions(false);
    }

    // Simulate bot responses for a mental health bot
    setTimeout(() => {
      let botResponse = '';

      if (msg.toLowerCase().includes('anxious')) {
        botResponse =
          "I'm sorry to hear that you're feeling anxious. Would you like some breathing exercises or to talk about what's making you feel this way?";
      } else if (msg.toLowerCase().includes('stressed')) {
        botResponse =
          "Work stress can be tough to handle. Let's find some ways to manage it together.";
      } else if (msg.toLowerCase().includes('sleep')) {
        botResponse =
          'Sleep is essential for well-being. Would you like some tips for better sleep?';
      } else {
        botResponse = 'Thank you for sharing. How can I best support you right now?';
      }

      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleOptionSelect = (option) => {
    handleSend(option);
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
    if (!selectedAvatar) {
      setIsAvatarSelectionOpen(true);
    } else {
      setIsChatOpen(true);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setIsAvatarSelectionOpen(false);
    setIsChatOpen(true);
  };

  const handleBackToAvatarSelection = () => {
    setIsChatOpen(false);
    setIsAvatarSelectionOpen(true);
  };

  // Emoji picker handlers
  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Icon and Chat window */}
      {!isChatOpen && !isAvatarSelectionOpen && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          <img src="robo chat icon for home screen.webp" alt="Chatbot Icon" />
        </div>
      )}

      {isAvatarSelectionOpen && (
        <div className="avatar-selection">
          <h3>Select Your Avatar</h3>
          <div className="avatar-grid">
            {avatarImages.map((avatarUrl, index) => (
              <img
                key={index}
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                onClick={() => handleAvatarSelect(avatarUrl)}
                className="avatar-option"
              />
            ))}
          </div>
        </div>
      )}

      {isChatOpen && (
        <div className="chat-app">
          <Header
            onSettingsClick={handleSettingsClick}
            onMinimizeClick={handleMinimizeClick}
            avatarUrl={selectedAvatar}
          />
          <button className="change-avatar-button" onClick={handleBackToAvatarSelection}>
            Change Avatar
          </button>
          <VoiceVideoButtons />
          <MessageList messages={messages} />
          {showOptions && (
            <PredefinedOptions
              options={predefinedOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}
          <ChatInput
            onSend={handleSend}
            message={message}
            setMessage={setMessage}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            onEmojiClick={onEmojiClick}
          />
          {showSettings && <Settings onClose={handleSettingsClose} />}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
