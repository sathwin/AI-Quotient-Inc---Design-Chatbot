import React, { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import VoiceVideoButtons from './components/VoiceVideoButtons';
import PredefinedOptions from './components/PredefinedOptions';
import Settings from './components/Settings';
import TypingIndicator from './components/TypingIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import FileAttachmentUI from './components/FileAttachmentUI';
import VoiceInput from './components/VoiceInput';
import AuthScreen from './components/AuthScreen';
import './Chatbot.css';
// Import OpenAI service
import { getAIResponse } from './services/openaiService';
// Import user verification functions
import { verifyUser } from './data/mockUserData';

// Create Theme Context to share theme state across components
export const ThemeContext = createContext();

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
  const [replyToMessageId, setReplyToMessageId] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceInputStatus, setVoiceInputStatus] = useState('idle');
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authError, setAuthError] = useState('');

  // Load user preferences from localStorage
  useEffect(() => {
    // Load chat history if exists
    const savedMessages = localStorage.getItem('chatbot_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
        setShowWelcomeScreen(false); // Skip welcome screen if there's history
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
    
    // Load authentication state
    const savedUser = localStorage.getItem('authenticatedUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthenticatedUser(user);
        setIsAuthenticated(true);
        // If we have a saved user, skip auth screen
        setShowAuthScreen(false);
      } catch (e) {
        console.error('Error loading authenticated user:', e);
      }
    }
    
    // Load theme preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedTheme = localStorage.getItem('theme') || 'default';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setDarkMode(savedDarkMode);
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);
    // Apply dark mode to document body if it's enabled
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save authenticated user to localStorage when it changes
  useEffect(() => {
    if (authenticatedUser) {
      localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
    }
  }, [authenticatedUser]);

  // Save preferences and apply body class when they change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('highContrast', highContrast);
    // Apply dark mode to document body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Apply theme to document body
    document.body.className = document.body.className
      .replace(/\b\w+-theme\b/g, '')
      .trim();
    if (theme !== 'default') {
      document.body.classList.add(theme);
    }
  }, [darkMode, theme, fontSize, highContrast]);

  // Update input with voice transcript
  useEffect(() => {
    if (voiceTranscript) {
      setMessage(voiceTranscript);
    }
  }, [voiceTranscript]);

  // Mental health focused predefined quick replies
  const predefinedOptions = [
    'I need to schedule an appointment',
    'I\'m feeling anxious',
    'I need someone to talk to',
    'Show me stress relief exercises',
    'I\'m having trouble sleeping'
  ];

  // Handle authentication
  const handleAuthenticate = (name, phone) => {
    const user = verifyUser(name, phone);
    
    if (user) {
      setAuthenticatedUser(user);
      setIsAuthenticated(true);
      setShowAuthScreen(false);
      setAuthError('');
      
      // Add a welcome message
      const welcomeMessage = {
        id: Date.now(),
        text: `Welcome back, ${user.name.split(' ')[0]}! I'm here to support you. How are you feeling today?`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        avatarUrl: null,
        status: 'success',
        isNew: true
      };
      
      setMessages(prev => [...prev, welcomeMessage]);
      
      // Remove isNew flag after animation
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === welcomeMessage.id ? {...m, isNew: false} : m)
        );
      }, 500);
    } else {
      setAuthError('Invalid credentials. Please try again.');
    }
  };

  // Start a new chat with options
  const handleStartChat = (initialMessage = '') => {
    setShowWelcomeScreen(false);
    
    // If not authenticated, show auth screen
    if (!isAuthenticated) {
      setShowAuthScreen(true);
    } else if (initialMessage) {
      handleSend(initialMessage);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthenticatedUser(null);
    setMessages([]);
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('chatbot_messages');
    setShowWelcomeScreen(true);
  };

  // Clear chat history
  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatbot_messages');
    setShowWelcomeScreen(true);
  };

  // Handle file attachments
  const handleFileAttach = (files) => {
    setAttachedFiles([...attachedFiles, ...files]);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...attachedFiles];
    newFiles.splice(index, 1);
    setAttachedFiles(newFiles);
  };

  // Handle message reactions
  const handleReact = (messageId, reaction) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, reaction: reaction }
          : msg
      )
    );
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  // Handle editing a message
  const handleEditMessage = (messageId, newText) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: newText, isEdited: true }
          : msg
      )
    );
  };

  // Copy message text to clipboard
  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show a toast notification or some feedback
        console.log('Message copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Simulate scheduling an appointment
  const handleScheduleAppointment = () => {
    // In a real implementation, this would open a date picker or appointment form
    const appointmentMessage = {
      id: Date.now(),
      text: "I'd like to schedule an appointment with a therapist.",
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      avatarUrl: selectedAvatar,
      isNew: true
    };
    
    setMessages(prev => [...prev, appointmentMessage]);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === appointmentMessage.id ? {...m, isNew: false} : m)
      );
      
      setBotIsTyping(true);
      
      // Simulate bot response delay
      setTimeout(() => {
        setBotIsTyping(false);
        
        const botResponse = {
          id: Date.now() + 1,
          text: "I'd be happy to help you schedule an appointment. We have availability with Dr. Johnson on Monday at 2:00 PM or Wednesday at 10:00 AM. Which would work better for you?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
          isNew: true,
          status: 'success',
          appointmentOptions: [
            { day: 'Monday', time: '2:00 PM', doctor: 'Dr. Johnson' },
            { day: 'Wednesday', time: '10:00 AM', doctor: 'Dr. Johnson' }
          ]
        };
        
        setMessages(prev => [...prev, botResponse]);
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(m => m.id === botResponse.id ? {...m, isNew: false} : m)
          );
        }, 500);
      }, 1500);
    }, 500);
  };

  // Send a message - UPDATED to include authenticated user data
  const handleSend = async (msg, status = 'normal') => {
    if (!msg.trim() || botIsTyping) return;
    
    // Handle appointment scheduling request
    if (msg.toLowerCase().includes('schedule') && msg.toLowerCase().includes('appointment')) {
      handleScheduleAppointment();
      return;
    }
    
    // Create user's message object
    const userMessage = {
      id: Date.now(),
      text: msg,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      avatarUrl: selectedAvatar,
      parentId: replyToMessageId || null,
      status, // Added status for color-coded messages
      isNew: true, // For animation
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : null
    };
    
    setMessages(prev => [...prev, userMessage]);
    setReplyToMessageId(null); // reset
    setAttachedFiles([]); // clear attachments after sending
    setMessage(''); // clear input
    
    // After a brief delay, remove the "new" flag to stop animation
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === userMessage.id ? {...m, isNew: false} : m)
      );
    }, 500);
    
    // Show quick replies if greeting
    if (['hi', 'hello', 'hey'].includes(msg.toLowerCase())) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
    
    // Start typing simulation
    setBotIsTyping(true);
    
    try {
      // Get the AI response - pass authenticated user if available
      const aiResponse = await getAIResponse(msg, messages, authenticatedUser);
      
      setBotIsTyping(false);
      
      // Create bot message with the AI response
      const botMessage = {
        id: Date.now() + 2,
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        avatarUrl: null,
        parentId: null,
        status: aiResponse.status,
        isNew: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Check if we should show suggested options based on keywords
      let shouldShowOptions = false;
      const keywords = ['anxious', 'anxiety', 'stress', 'sleep', 'sad', 'depressed', 'depression', 'appointment'];
      keywords.forEach(keyword => {
        if (aiResponse.text.toLowerCase().includes(keyword)) {
          shouldShowOptions = true;
        }
      });
      
      if (shouldShowOptions) {
        setShowOptions(true);
      }
      
      // Remove isNew flag after animation
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === botMessage.id ? {...m, isNew: false} : m)
        );
      }, 500);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setBotIsTyping(false);
      
      // Handle the error by showing an error message
      const errorMessage = {
        id: Date.now() + 2,
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        avatarUrl: null,
        parentId: null,
        status: 'error',
        isNew: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Remove isNew flag after animation
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === errorMessage.id ? {...m, isNew: false} : m)
        );
      }, 500);
    }
  };

  // Quick reply button clicked
  const handleOptionSelect = (option) => {
    handleSend(option);
  };

  // When user picks "Reply" on a message
  const handleReply = (messageId) => {
    setReplyToMessageId(messageId);
    
    // Find the message being replied to and add a visual cue
    const replyToMessage = messages.find(msg => msg.id === messageId);
    if (replyToMessage) {
      document.getElementById('chat-input').focus();
      setMessage(`Replying to: "${replyToMessage.text.substring(0, 30)}${replyToMessage.text.length > 30 ? '...' : ''}" \n`);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (messageId, feedback) => {
    console.log('Feedback received for message:', messageId, feedback);
    // In a real implementation, you would send this to your backend
    
    // Add a confirmation message
    const confirmationMessage = {
      id: Date.now(),
      text: `Thank you for your feedback! We're always working to improve our mental health support.`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      isSystem: true,
      status: 'success',
      isNew: true
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === confirmationMessage.id ? {...m, isNew: false} : m)
      );
    }, 500);
  };

  // Settings popup handlers
  const handleSettingsClick = () => {
    setShowSettings(true);
  };
  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  // Theme handling functions
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  const changeFontSize = (newSize) => {
    setFontSize(newSize);
  };
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
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

  // Export chat history
  const handleExportChat = (format = 'text') => {
    if (format === 'text') {
      let text = "Mental Health Chat Export - " + new Date().toLocaleString() + "\n\n";
      
      messages.forEach(msg => {
        text += `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text}\n\n`;
      });
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `mental-health-chat-export-${new Date().toISOString().slice(0, 10)}.txt`;
      a.click();
      
      URL.revokeObjectURL(url);
    }
  };

  // Determine the main class based on theme settings
  const chatAppClasses = `chat-app ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''} font-${fontSize} ${highContrast ? 'high-contrast' : ''}`;

  return (
    <ThemeContext.Provider 
      value={{ 
        darkMode, 
        theme, 
        fontSize, 
        highContrast, 
        toggleDarkMode, 
        changeTheme, 
        changeFontSize, 
        toggleHighContrast 
      }}
    >
      <div className={`chatbot-container ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
        {/* The floating icon if chat is minimized and avatar not picked */}
        {!isChatOpen && !isAvatarSelectionOpen && (
          <div className="chatbot-icon" onClick={handleChatIconClick}>
            <img src="robo chat icon for home screen.webp" alt="Mental Health Assistant" />
          </div>
        )}

        {/* Avatar selection popup */}
        {isAvatarSelectionOpen && (
          <div className={`avatar-selection ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
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
          <div className={chatAppClasses}>
            <Header
              onSettingsClick={handleSettingsClick}
              onMinimizeClick={handleMinimizeClick}
              avatarUrl={selectedAvatar}
              onExport={handleExportChat}
              onClearHistory={handleClearHistory}
              isAuthenticated={isAuthenticated}
              userName={authenticatedUser ? authenticatedUser.name : ''}
              onLogout={handleLogout}
            />
            <button className="change-avatar-button" onClick={handleBackToAvatarSelection}>
              Change Avatar
            </button>

            {/* Authentication Screen */}
            {showAuthScreen ? (
              <AuthScreen onAuthenticate={handleAuthenticate} />
            ) : showWelcomeScreen ? (
              <WelcomeScreen onStart={handleStartChat} />
            ) : (
              <>
                {/* Voice & Video Buttons */}
                <VoiceVideoButtons />

                {/* Messages (with threading) */}
                <MessageList 
                  messages={messages} 
                  onReply={handleReply}
                  onDelete={handleDeleteMessage}
                  onEdit={handleEditMessage}
                  onCopy={handleCopyMessage}
                  onReact={handleReact}
                  onFeedbackSubmit={handleFeedbackSubmit}
                />

                {/* Show bot typing animation */}
                {botIsTyping && <TypingIndicator />}

                {/* Quick replies */}
                {showOptions && (
                  <PredefinedOptions
                    options={messages.length > 0 && messages[messages.length - 1].suggestedOptions 
                      ? messages[messages.length - 1].suggestedOptions 
                      : predefinedOptions}
                    onOptionSelect={handleOptionSelect}
                  />
                )}

                {/* Input container with file attachments and voice input */}
                <div className="input-container">
                  {/* File attachments UI */}
                  <FileAttachmentUI
                    files={attachedFiles}
                    onAttach={handleFileAttach}
                    onRemove={handleFileRemove}
                  />
                  
                  {/* Voice input */}
                  <VoiceInput
                    onTranscript={setVoiceTranscript}
                    onStatusChange={setVoiceInputStatus}
                  />
                  
                  {/* Main text input */}
                  <ChatInput
                    onSend={handleSend}
                    message={message}
                    setMessage={setMessage}
                    showEmojiPicker={showEmojiPicker}
                    setShowEmojiPicker={setShowEmojiPicker}
                    replyingTo={replyToMessageId}
                    cancelReply={() => setReplyToMessageId(null)}
                    id="chat-input"
                  />
                </div>
              </>
            )}

            {/* Settings modal */}
            {showSettings && 
              <Settings 
                onClose={handleSettingsClose}
                onExport={handleExportChat}
                onClearHistory={handleClearHistory}
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
              />
            }
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default Chatbot;