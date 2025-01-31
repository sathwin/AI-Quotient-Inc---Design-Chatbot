import React from 'react';
import Avatar from './Avatar';
import './Header.css';

const Header = ({ onSettingsClick, onMinimizeClick, avatarUrl }) => {
  return (
    <div className="chat-header">
      {/* Bot's avatar or user-chosen avatar, your choice. 
          We'll show the user avatar for fun. */}
      <Avatar imageUrl={avatarUrl} online={true} />
      <h2 style={{ marginLeft: '10px' }}>Wellness Bot</h2>
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
