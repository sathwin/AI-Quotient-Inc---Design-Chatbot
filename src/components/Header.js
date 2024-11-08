// src/components/Header.js

import React from 'react';
import Avatar from './Avatar';
import './Header.css';
import { FaCog, FaWindowMinimize } from 'react-icons/fa';

const Header = ({ onSettingsClick, onMinimizeClick }) => {
  return (
    <div className="chat-header">
      <Avatar imageUrl="/avatar-user.png" online={true} />
      <h2>AI Quotient Chatbot</h2>
      <div className="header-icons">
        <button className="icon-button" onClick={onSettingsClick}>
          <FaCog />
        </button>
        <button className="icon-button" onClick={onMinimizeClick}>
          <FaWindowMinimize />
        </button>
      </div>
    </div>
  );
};

export default Header;
