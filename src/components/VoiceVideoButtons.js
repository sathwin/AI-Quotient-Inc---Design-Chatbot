import React from 'react';
import './VoiceVideoButtons.css';

const VoiceVideoButtons = () => {
  return (
    <div className="chat-buttons">
      <button onClick={() => alert('Voice call initiated')}>🎤</button>
      <button onClick={() => alert('Video call initiated')}>📷</button>
    </div>
  );
};

export default VoiceVideoButtons;
