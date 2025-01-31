import React from 'react';
import './Avatar.css';

const Avatar = ({ imageUrl, online }) => {
  return (
    <div className="avatar">
      <img src={imageUrl || 'https://via.placeholder.com/50'} alt="avatar" />
      <span className={`status ${online ? 'online' : 'offline'}`} />
    </div>
  );
};

export default Avatar;
