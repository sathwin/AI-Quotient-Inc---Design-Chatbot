// src/components/Header.js

import React from 'react';
import Avatar from './Avatar';
import './Header.css';

const Header = () => {
  return (
    <div className="chat-header">
      <Avatar imageUrl="/avatar-user.png" online={true} />
      <h2>AI Quotient Chatbot</h2>
      {/* Add additional icons or buttons if needed */}
    </div>
  );
};

export default Header;
