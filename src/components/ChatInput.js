import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa'; // Add this line
import EmojiPickerComponent from './EmojiPickerComponent';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleAttachmentClick = () => {
    // Implement attachment functionality
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage(''); // Clear the input after sending
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji); // Append emoji to the message input
  };

  return (
    <div className="chat-input">
      <button onClick={handleAttachmentClick} className="attachment-button">
        <FaPaperclip />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleEnterKey}
        placeholder="Type your message..."
      />
      <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} /> {/* Pass emoji handler */}
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default ChatInput;
