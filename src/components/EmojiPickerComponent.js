//EmojiPickerComponent.js
import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData, event) => {
    if (emojiData && emojiData.emoji) {
      onEmojiSelect(emojiData.emoji); // Correctly pass the emoji to parent
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
