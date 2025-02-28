import React, { useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../Chatbot';
import './ChatInput.css';

// Note: If you're using EmojiPicker, make sure it's installed
// npm install emoji-picker-react
// If not using it, remove the import and related code
try {
  // Try to import EmojiPicker
  var EmojiPicker = require('emoji-picker-react').default;
} catch (e) {
  // If import fails, create a placeholder component
  var EmojiPicker = () => <div>Emoji Picker not available</div>;
}

const ChatInput = ({
  onSend,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  replyingTo,
  cancelReply,
  id = 'chat-input'
}) => {
  // Get theme context
  const { darkMode, theme } = useContext(ThemeContext);
  
  // Ref for input element
  const inputRef = useRef(null);
  
  // Focus input when component mounts or when replying
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyingTo]);
  
  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
      
      // Add visual feedback on send
      const sendButton = document.querySelector('.send-button');
      if (sendButton) {
        sendButton.classList.add('button-flash');
        setTimeout(() => {
          sendButton.classList.remove('button-flash');
        }, 300);
      }
    }
  };

  const handleKeyPress = (e) => {
    // Send on Enter, but allow Shift+Enter for newlines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  // Emoji picker handling
  const onEmojiClick = (emojiObject) => {
    // Insert emoji at cursor position
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      const textBeforeCursor = message.substring(0, cursorPosition);
      const textAfterCursor = message.substring(cursorPosition);
      
      setMessage(textBeforeCursor + emojiObject.emoji + textAfterCursor);
      
      // Set cursor position after emoji
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition + emojiObject.emoji.length;
          inputRef.current.selectionEnd = cursorPosition + emojiObject.emoji.length;
          inputRef.current.focus();
        }
      }, 0);
    } else {
      setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    }
  };

  return (
    <div className={`chat-input-container ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
      {/* Reply indicator */}
      {replyingTo && (
        <div className="reply-indicator">
          <div className="reply-text">
            <span>Replying to message</span>
            <button 
              className="cancel-reply" 
              onClick={cancelReply}
              aria-label="Cancel reply"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      <div className="chat-input">
        {/* Emoji button */}
        <button 
          className="emoji-button" 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          aria-label="Open emoji picker"
        >
          😊
        </button>

        {/* Emoji Picker (Only shows when active) */}
        {showEmojiPicker && (
          <div className={`emoji-picker-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="emoji-picker-header">
              <span>Pick an emoji</span>
              <button 
                onClick={() => setShowEmojiPicker(false)}
                aria-label="Close emoji picker"
              >
                ✕
              </button>
            </div>
            <EmojiPicker 
              onEmojiClick={onEmojiClick} 
              theme={darkMode ? 'dark' : 'light'}
              searchPlaceholder="Search emojis..."
              width="300px"
              height="350px"
            />
          </div>
        )}

        {/* Expanding Text Input */}
        <textarea
          id={id}
          ref={inputRef}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`${message.trim() !== '' ? 'has-content' : ''}`}
          rows={message.split('\n').length > 2 ? Math.min(5, message.split('\n').length) : 1}
        />

        {/* Send Button */}
        <button 
          className="send-button" 
          onClick={handleSendClick}
          disabled={message.trim() === ''}
          aria-label="Send message"
        >
          <span className="send-icon">↑</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;