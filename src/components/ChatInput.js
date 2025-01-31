import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatInput.css';

const ChatInput = ({
  onSend,
  message,
  setMessage,
  showEmojiPicker,
  setShowEmojiPicker,
}) => {
  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  // Emoji picker handling
  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="chat-input">
      {/* Emoji button */}
      <button className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        😊
      </button>

      {/* Emoji Picker (Only shows when active) */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Expanding Text Input */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      {/* Send Button */}
      <button className="send-button" onClick={handleSendClick}>
        Send
      </button>

    </div>
  );
};

export default ChatInput;
