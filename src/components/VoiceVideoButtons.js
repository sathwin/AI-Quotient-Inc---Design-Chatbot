// src/components/VoiceVideoButtons.js
import React from 'react';
import './VoiceVideoButtons.css';  // This line should be at the top of VoiceVideoButtons.js

const VoiceVideoButtons = () => {
  return (
    <div className="chat-buttons">
      <button onClick={() => alert('Voice call initiated')}>🎤</button>
      <button onClick={() => alert('Video call initiated')}>📷</button>
    </div>
  );
};

export default VoiceVideoButtons;
