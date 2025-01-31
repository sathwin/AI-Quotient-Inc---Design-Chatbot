//EmojiPickerComponent.js
import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './EmojiPickerComponent.css';

const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    if (emojiData && emojiData.emoji) {
      onEmojiSelect(emojiData.emoji);
    }
  };

  return (
    <div className="emoji-picker">
      <button onClick={() => setShowPicker(!showPicker)}>😊</button>
      {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
    </div>
  );
};

export default EmojiPickerComponent;
