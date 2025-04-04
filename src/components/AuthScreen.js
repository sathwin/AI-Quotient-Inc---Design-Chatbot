import React, { useState } from 'react';
import './AuthScreen.css';

const AuthScreen = ({ onAuthenticate }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !phone.trim()) {
      setError('Please enter both name and phone number');
      return;
    }
    
    // Phone format validation (simple check)
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter phone number in format: 555-123-4567');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticate(name, phone);
    }, 1000);
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <h2>Welcome to Mental Health Assistant</h2>
        <p>Please sign in to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="555-123-4567"
              disabled={isLoading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Sign In'}
          </button>
          
          <div className="test-credentials">
            {/* <p>For testing, you can use:</p>
            <p>Name: Test User</p>
            <p>Phone: 123-456-7890</p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;