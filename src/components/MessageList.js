// src/components/MessageList.js

import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
        >
          <span className="message-text">{msg.text}</span>
          <span className="timestamp">{msg.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
