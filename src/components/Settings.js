// components/Settings.js

import React from 'react';
import './Settings.css';

const Settings = ({ onClose }) => {
  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h3>Settings</h3>
        <ul>
          <li>End Chat</li>
          <li>Change Color Theme</li>
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;
