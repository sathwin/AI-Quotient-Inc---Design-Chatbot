// components/Avatar.js

import React from 'react';
import './Avatar.css';

const Avatar = ({ imageUrl, online }) => {
  return (
    <div className="avatar">
      <img src={imageUrl} alt="Chatbot Avatar" />
      <span className={`status ${online ? 'online' : 'offline'}`}></span>
    </div>
  );
};

export default Avatar;
