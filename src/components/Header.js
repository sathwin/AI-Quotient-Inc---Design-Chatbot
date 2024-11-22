// components/Header.js

import React from 'react';
import Avatar from './Avatar';
import './Header.css';

const Header = ({ onSettingsClick, onMinimizeClick, avatarUrl }) => {
  return (
    <div className="chat-header">
      <Avatar imageUrl={avatarUrl} online={true} />
      <h2>Wellness Bot</h2>
      <div className="header-icons">
        <button className="icon-button" onClick={onSettingsClick}>
          ⚙️
        </button>
        <button className="icon-button" onClick={onMinimizeClick}>
          ➖
        </button>
      </div>
    </div>
  );
};

export default Header;
