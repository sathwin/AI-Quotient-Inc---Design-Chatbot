import React, { useState } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import VoiceVideoButtons from './components/VoiceVideoButtons';
import PredefinedOptions from './components/PredefinedOptions';
import Settings from './components/Settings';
import TypingIndicator from './components/TypingIndicator';
import './Chatbot.css';

const avatarImages = [
  '/avatar-user.png',
  'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Sunglasses&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  // add more or use your own URLs
];

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAvatarSelectionOpen, setIsAvatarSelectionOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [botIsTyping, setBotIsTyping] = useState(false);

  // For message threading
  const [replyToMessageId, setReplyToMessageId] = useState(null);

  // Predefined quick replies
  const predefinedOptions = [
    'I need someone to talk to',
    'I feel anxious',
    'I am stressed about work',
    'I have trouble sleeping',
    'Show me a GIF!',
  ];

  // Send a message (text or GIF)
  const handleSend = (msg, isGif = false) => {
    if (!msg.trim()) return;

    // Create user's message object
    const userMessage = {
      id: Date.now(),
      text: msg,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      avatarUrl: selectedAvatar,
      parentId: replyToMessageId || null,
      isGif,
    };
    setMessages((prev) => [...prev, userMessage]);
    setReplyToMessageId(null); // reset

    // If it's not a GIF, let the bot respond
    if (!isGif) {
      // Show quick replies if greeting
      if (['hi', 'hello', 'hey'].includes(msg.toLowerCase())) {
        setShowOptions(true);
        const greetBotMessage = {
          id: Date.now() + 1,
          text: 'Hello! How can I assist you today?',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
          avatarUrl: null,
          parentId: null,
          isGif: false,
        };
        setMessages((prev) => [...prev, greetBotMessage]);
        return;
      } else {
        setShowOptions(false);
      }

      // Start typing simulation
      setBotIsTyping(true);
      setTimeout(() => {
        setBotIsTyping(false);

        let botResponse = '';
        if (msg.toLowerCase().includes('gif')) {
          botResponse = "Sure! Click the 'GIF' button to pick one or I'll fetch something random.";
        } else if (msg.toLowerCase().includes('anxious')) {
          botResponse =
            "I'm sorry to hear that you're feeling anxious. Would you like some breathing exercises or to talk it through?";
        } else if (msg.toLowerCase().includes('stressed')) {
          botResponse =
            "Work stress can be tough. Let's brainstorm ways to manage it together.";
        } else if (msg.toLowerCase().includes('sleep')) {
          botResponse = 'Quality sleep is crucial. Would you like some tips for better rest?';
        } else {
          botResponse = 'Thanks for sharing. How can I best support you right now?';
        }

        // Bot response
        const botMessage = {
          id: Date.now() + 2,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
          avatarUrl: null,
          parentId: null,
          isGif: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  // Quick reply button clicked
  const handleOptionSelect = (option) => {
    handleSend(option);
  };

  // When user picks "Reply" on a message
  const handleReply = (messageId) => {
    setReplyToMessageId(messageId);
  };

  // Giphy fetch
  const handleSendGif = async () => {
    try {
      setBotIsTyping(true);
      const res = await fetch(
        'https://api.giphy.com/v1/gifs/random?api_key=cXhUvyyVPhxzTVwpGvyw3vSCVtEhCyRO&tag=funny'
      );
      const data = await res.json();
      setBotIsTyping(false);

      if (data?.data?.images?.original?.url) {
        const gifUrl = data.data.images.original.url;
        handleSend(gifUrl, true);
      } else {
        // If no GIF found
        handleSend('No GIF found, sorry!', false);
      }
    } catch (error) {
      setBotIsTyping(false);
      console.error('GIF fetch error:', error);
    }
  };

  // Settings popup handlers
  const handleSettingsClick = () => {
    setShowSettings(true);
  };
  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  // Minimize chat
  const handleMinimizeClick = () => {
    setIsChatOpen(false);
  };

  // Show or open the chat icon
  const handleChatIconClick = () => {
    if (!selectedAvatar) {
      setIsAvatarSelectionOpen(true);
    } else {
      setIsChatOpen(true);
    }
  };

  // Select an avatar from the popup
  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setIsAvatarSelectionOpen(false);
    setIsChatOpen(true);
  };

  // Switch back to avatar selection
  const handleBackToAvatarSelection = () => {
    setIsChatOpen(false);
    setIsAvatarSelectionOpen(true);
  };

  return (
    <div className="chatbot-container">
      {/* The floating icon if chat is minimized and avatar not picked */}
      {!isChatOpen && !isAvatarSelectionOpen && (
        <div className="chatbot-icon" onClick={handleChatIconClick}>
          <img src="robo chat icon for home screen.webp" alt="Chatbot Icon" />
        </div>
      )}

      {/* Avatar selection popup */}
      {isAvatarSelectionOpen && (
        <div className="avatar-selection">
          <h3>Select Your Avatar</h3>
          <div className="avatar-grid">
            {avatarImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Avatar ${idx + 1}`}
                onClick={() => handleAvatarSelect(url)}
                className="avatar-option"
              />
            ))}
          </div>
        </div>
      )}

      {/* Main chat UI */}
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

          {/* Voice & Video Buttons */}
          <VoiceVideoButtons />

          {/* Messages (with threading) */}
          <MessageList messages={messages} onReply={handleReply} />

          {/* Show bot typing animation */}
          {botIsTyping && <TypingIndicator />}

          {/* Quick replies */}
          {showOptions && (
            <PredefinedOptions
              options={predefinedOptions}
              onOptionSelect={handleOptionSelect}
            />
          )}

          {/* Input row with optional emoji and GIF button */}
          <div style={{ display: 'flex' }}>
            <ChatInput
              onSend={handleSend}
              message={message}
              setMessage={setMessage}
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
            />
            <button
              style={{
                margin: '10px',
                backgroundColor: '#f0c14b',
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
              onClick={handleSendGif}
            >
              GIF
            </button>
          </div>

          {showSettings && <Settings onClose={handleSettingsClose} />}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
