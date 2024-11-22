// components/ChatInput.js

import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatInput.css';

const ChatInput = ({
  onSend,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick,
}) => {
  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="chat-input">
      <button
        className="emoji-button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        😊
      </button>
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleEnterKey}
        placeholder="Type your message..."
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default ChatInput;
