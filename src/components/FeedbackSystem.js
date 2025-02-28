import React, { useState, useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './FeedbackSystem.css';

const FeedbackSystem = ({ messageId, onSubmitFeedback }) => {
  const { darkMode, theme } = useContext(ThemeContext);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleRatingClick = (value) => {
    setRating(value);
  };
  
  const handleSubmit = () => {
    onSubmitFeedback(messageId, {
      rating,
      comment,
      timestamp: new Date().toISOString()
    });
    setSubmitted(true);
  };
  
  const handleCancel = () => {
    setShowFeedback(false);
    setRating(null);
    setComment('');
  };
  
  if (submitted) {
    return (
      <div className={`feedback-submitted ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
        Thanks for your feedback!
      </div>
    );
  }
  
  return (
    <div className={`feedback-system ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
      {!showFeedback ? (
        <button 
          className="feedback-toggle"
          onClick={() => setShowFeedback(true)}
          aria-label="Rate this response"
        >
          Rate this response
        </button>
      ) : (
        <div className="feedback-form">
          <div className="rating-buttons">
            <button 
              className={`rating-button ${rating === 1 ? 'selected' : ''}`}
              onClick={() => handleRatingClick(1)}
              title="Not helpful"
              aria-label="Not helpful"
            >
              👎
            </button>
            <button 
              className={`rating-button ${rating === 2 ? 'selected' : ''}`}
              onClick={() => handleRatingClick(2)}
              title="Somewhat helpful"
              aria-label="Somewhat helpful"
            >
              😐
            </button>
            <button 
              className={`rating-button ${rating === 3 ? 'selected' : ''}`}
              onClick={() => handleRatingClick(3)}
              title="Very helpful"
              aria-label="Very helpful"
            >
              👍
            </button>
          </div>
          
          {rating !== null && (
            <>
              <textarea
                placeholder="Any additional comments? (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
                aria-label="Feedback comment"
              />
              
              <div className="feedback-actions">
                <button 
                  onClick={handleCancel}
                  aria-label="Cancel feedback"
                >
                  Cancel
                </button>
                <button 
                  className="submit-feedback" 
                  onClick={handleSubmit}
                  aria-label="Submit feedback"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackSystem;