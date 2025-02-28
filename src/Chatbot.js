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
import './Chatbot.css';

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

  // Sprint 8: Theme State
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('default');
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

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

  // Start a new chat with options
  const handleStartChat = (initialMessage = '') => {
    setShowWelcomeScreen(false);
    if (initialMessage) {
      handleSend(initialMessage);
    }
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

  // Send a message (text or GIF)
  const handleSend = (msg, isGif = false, status = 'normal') => {
    if ((!msg.trim() && !isGif) || botIsTyping) return;

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
      isGif,
      status, // Sprint 7: Added status for color-coded messages
      isNew: true, // Sprint 7: For animation
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

    // If it's not a GIF, let the bot respond
    if (!isGif) {
      // Show quick replies if greeting
      if (['hi', 'hello', 'hey'].includes(msg.toLowerCase())) {
        setShowOptions(true);
        // Start typing animation
        setBotIsTyping(true);
        setTimeout(() => {
          setBotIsTyping(false);
          const greetBotMessage = {
            id: Date.now() + 1,
            text: "Hello! I'm your mental health assistant. How are you feeling today? I'm here to help you schedule appointments, provide coping strategies, or just listen if you need someone to talk to.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
            avatarUrl: null,
            parentId: null,
            isGif: false,
            status: 'success', // Sprint 7: Added status
            isNew: true // Sprint 7: For animation
          };
          setMessages(prev => [...prev, greetBotMessage]);
          
          // Remove isNew flag after animation
          setTimeout(() => {
            setMessages(prev => 
              prev.map(m => m.id === greetBotMessage.id ? {...m, isNew: false} : m)
            );
          }, 500);
        }, 1000);
        return;
      } else {
        setShowOptions(false);
      }

      // Start typing simulation
      setBotIsTyping(true);
      setTimeout(() => {
        setBotIsTyping(false);

        let botResponse = '';
        let status = 'normal';
        let suggestedOptions = null;

        // Mental health focused responses
        if (msg.toLowerCase().includes('anxious') || msg.toLowerCase().includes('anxiety')) {
          botResponse = "I'm sorry to hear you're feeling anxious. Anxiety is a common experience, and there are several strategies that might help. Would you like to try a breathing exercise, schedule an appointment with a therapist, or learn about grounding techniques?";
          status = 'info';
          suggestedOptions = ['Try a breathing exercise', 'Schedule an appointment', 'Learn about grounding techniques'];
        } 
        else if (msg.toLowerCase().includes('stress') || msg.toLowerCase().includes('stressed')) {
          botResponse = "I understand that stress can be challenging. Would you like to try a quick stress relief activity, learn about stress management techniques, or schedule an appointment to discuss your stress with a professional?";
          status = 'info';
          suggestedOptions = ['Quick stress relief', 'Stress management tips', 'Schedule an appointment'];
        } 
        else if (msg.toLowerCase().includes('sleep') || msg.toLowerCase().includes('insomnia')) {
          botResponse = "Sleep difficulties can be frustrating. Would you like some tips for better sleep hygiene, a guided sleep meditation, or to schedule an appointment with a sleep specialist?";
          status = 'info';
          suggestedOptions = ['Sleep hygiene tips', 'Guided sleep meditation', 'See a sleep specialist'];
        } 
        else if (msg.toLowerCase().includes('sad') || msg.toLowerCase().includes('depressed') || msg.toLowerCase().includes('depression')) {
          botResponse = "I'm sorry you're feeling this way. It's important to take these feelings seriously. Would you like to talk more about what you're experiencing, try some mood-lifting activities, or connect with a mental health professional?";
          status = 'warning';
          suggestedOptions = ['Talk more', 'Mood-lifting activities', 'Connect with a professional'];
        } 
        else if (msg.toLowerCase().includes('appointment') || msg.toLowerCase().includes('schedule') || msg.toLowerCase().includes('doctor')) {
          botResponse = "I can help you schedule an appointment. We have several mental health professionals available. Would you prefer to see a therapist, psychiatrist, or counselor? And do you have a preference for in-person or virtual appointments?";
          status = 'success';
          suggestedOptions = ['Therapist (in-person)', 'Therapist (virtual)', 'Psychiatrist', 'Counselor'];
        } 
        else if (msg.toLowerCase().includes('emergency') || msg.toLowerCase().includes('crisis') || msg.toLowerCase().includes('suicidal')) {
          botResponse = "If you're experiencing a mental health emergency or having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line. These services are available 24/7. Would you like me to provide additional crisis resources?";
          status = 'error';
          suggestedOptions = ['Yes, provide more resources', 'No, thank you'];
        } 
        else {
          botResponse = "Thank you for sharing. How else can I support you today? I can help with scheduling appointments, provide coping strategies for stress or anxiety, or just be here to listen.";
          status = 'normal';
          suggestedOptions = ['Schedule appointment', 'Coping strategies', 'Just listen'];
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
          status, // Sprint 7: Added status
          isNew: true, // Sprint 7: For animation
          suggestedOptions // Add suggested quick replies if any
        };
        setMessages(prev => [...prev, botMessage]);
        
        // If there are suggested options, show them
        if (suggestedOptions) {
          setShowOptions(true);
        }
        
        // Remove isNew flag after animation
        setTimeout(() => {
          setMessages(prev => 
            prev.map(m => m.id === botMessage.id ? {...m, isNew: false} : m)
          );
        }, 500);
      }, 1500);
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

  // Giphy fetch for calm/relaxing GIFs
  const handleSendGif = async () => {
    try {
      setBotIsTyping(true);
      const tags = ['calm', 'relax', 'meditation', 'peaceful', 'nature'];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=cXhUvyyVPhxzTVwpGvyw3vSCVtEhCyRO&tag=${randomTag}`
      );
      const data = await res.json();
      setBotIsTyping(false);

      if (data?.data?.images?.original?.url) {
        const gifUrl = data.data.images.original.url;
        handleSend(gifUrl, true, 'success');
      } else {
        // If no GIF found
        handleSend('No calming GIF found, sorry!', false, 'error');
      }
    } catch (error) {
      setBotIsTyping(false);
      console.error('GIF fetch error:', error);
      handleSend('Error fetching GIF', false, 'error');
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
            />
            <button className="change-avatar-button" onClick={handleBackToAvatarSelection}>
              Change Avatar
            </button>

            {/* Welcome Screen */}
            {showWelcomeScreen ? (
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

                {/* Input container with file attachments, voice input, and gif button */}
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
                  
                  {/* GIF button */}
                  <button
                    className="gif-button"
                    onClick={handleSendGif}
                    aria-label="Send calming GIF"
                  >
                    GIF
                  </button>
                </div>
              </>
            )}

            {/* Settings modal */}
            {showSettings && 
              <Settings 
                onClose={handleSettingsClose}
                onExport={handleExportChat}
                onClearHistory={handleClearHistory}
              />
            }
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default Chatbot;