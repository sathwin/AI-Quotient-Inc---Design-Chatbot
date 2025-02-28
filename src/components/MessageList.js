import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../Chatbot';
import FeedbackSystem from './FeedbackSystem';
import './MessageList.css';

const MessageList = ({ 
  messages, 
  onReply, 
  onDelete, 
  onEdit, 
  onCopy, 
  onReact,
  onFeedbackSubmit
}) => {
  // Get theme context
  const { darkMode, theme } = useContext(ThemeContext);
  
  // Ref for scrolling to bottom
  const messagesEndRef = useRef(null);
  
  // State for showing message actions
  const [activeActions, setActiveActions] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Toggle message actions
  const toggleActions = (messageId) => {
    setActiveActions(activeActions === messageId ? null : messageId);
  };
  
  // Start editing a message
  const startEditing = (message) => {
    setEditingMessage(message.id);
    setEditText(message.text);
    setActiveActions(null);
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingMessage(null);
    setEditText('');
  };
  
  // Save edited message
  const saveEdit = (messageId) => {
    if (editText.trim() !== '') {
      onEdit(messageId, editText);
      setEditingMessage(null);
      setEditText('');
    }
  };
  
  // Handle key press in edit input
  const handleEditKeyPress = (e, messageId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit(messageId);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };
  
  // Group consecutive messages from the same sender
  const groupMessages = (allMsgs) => {
    let grouped = [];
    let currentGroup = null;
    
    allMsgs.forEach((message, index) => {
      // Start a new group if this is the first message, different sender, or a system message
      const shouldStartNewGroup = 
        !currentGroup || 
        message.sender !== currentGroup.sender || 
        message.isSystem ||
        message.parentId !== null; // Threaded messages always start a new group
      
      if (shouldStartNewGroup) {
        if (currentGroup) {
          grouped.push(currentGroup);
        }
        
        currentGroup = {
          id: message.id,
          sender: message.sender,
          messages: [message],
          timestamp: message.timestamp
        };
      } else {
        currentGroup.messages.push(message);
        currentGroup.timestamp = message.timestamp; // Update timestamp to the latest
      }
    });
    
    // Add the last group
    if (currentGroup) {
      grouped.push(currentGroup);
    }
    
    return grouped;
  };
  
  // Recursively build threaded messages
  const buildThreadedMessages = (allMsgs, parentId = null, level = 0) => {
    return allMsgs
      .filter((m) => m.parentId === parentId)
      .map((m) => {
        // Determine row alignment: user => right, bot => left
        const rowClass = m.sender === 'user' ? 'message-row user' : 'message-row bot';
        
        // Add animation class if message is new (Sprint 7)
        const animationClass = m.isNew ? 'message-new' : '';
        
        // Add status class for color-coding (Sprint 7)
        const statusClass = m.status ? `status-${m.status}` : '';
        
        // Check if message is being edited
        const isEditing = editingMessage === m.id;

        return (
          <div key={m.id} style={{ marginLeft: `${level * 20}px` }}>
            <div className={`${rowClass} ${animationClass}`}>
              <div className={`message-bubble ${statusClass}`}>
                {isEditing ? (
                  // Editing mode
                  <div className="message-edit">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyPress(e, m.id)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button onClick={cancelEditing}>Cancel</button>
                      <button onClick={() => saveEdit(m.id)}>Save</button>
                    </div>
                  </div>
                ) : (
                  // Display mode
                  <>
                    {/* If it's a GIF, show an <img> */}
                    {m.isGif ? (
                      <img
                        src={m.text}
                        alt="GIF"
                        className="message-gif"
                      />
                    ) : (
                      <span className="message-text">{m.text}</span>
                    )}
                    
                    {/* Show edited indicator */}
                    {m.isEdited && <span className="edited-indicator">(edited)</span>}
                    
                    {/* Show timestamp and actions */}
                    <div className="message-footer">
                      <span className="timestamp">{m.timestamp}</span>
                      
                      {/* Message actions button */}
                      <button
                        className="action-toggle"
                        onClick={() => toggleActions(m.id)}
                        aria-label="Message actions"
                      >
                        ⋯
                      </button>
                    </div>
                    
                    {/* Message actions menu */}
                    {activeActions === m.id && (
                      <div className="actions-menu">
                        <button onClick={() => {
                          onReply(m.id);
                          setActiveActions(null);
                        }}>
                          Reply
                        </button>
                        
                        {m.sender === 'user' && (
                          <button onClick={() => startEditing(m)}>
                            Edit
                          </button>
                        )}
                        
                        <button onClick={() => {
                          onCopy(m.text);
                          setActiveActions(null);
                        }}>
                          Copy
                        </button>
                        
                        <button onClick={() => {
                          onDelete(m.id);
                          setActiveActions(null);
                        }}>
                          Delete
                        </button>
                        
                        <div className="reaction-row">
                          <button onClick={() => {
                            onReact(m.id, '👍');
                            setActiveActions(null);
                          }}>👍</button>
                          <button onClick={() => {
                            onReact(m.id, '❤️');
                            setActiveActions(null);
                          }}>❤️</button>
                          <button onClick={() => {
                            onReact(m.id, '😂');
                            setActiveActions(null);
                          }}>😂</button>
                          <button onClick={() => {
                            onReact(m.id, '😮');
                            setActiveActions(null);
                          }}>😮</button>
                        </div>
                      </div>
                    )}
                    
                    {/* Display reaction if any */}
                    {m.reaction && (
                      <div className="message-reaction">
                        {m.reaction}
                      </div>
                    )}
                    
                    {/* Show attachments if any */}
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="message-attachments">
                        {m.attachments.map((file, index) => (
                          <div key={index} className="message-attachment">
                            {file.type.startsWith('image/') ? (
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={file.name}
                                className="attachment-image" 
                              />
                            ) : (
                              <div className="attachment-file">
                                <span className="attachment-icon">📎</span>
                                <span className="attachment-name">{file.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Show feedback system for bot messages */}
            {m.sender === 'bot' && !m.isSystem && (
              <FeedbackSystem 
                messageId={m.id} 
                onSubmitFeedback={onFeedbackSubmit} 
              />
            )}
            
            {/* Render any children (threads) */}
            {buildThreadedMessages(allMsgs, m.id, level + 1)}
          </div>
        );
      });
  };

  // We don't need to use messageGroups in the render, so we can remove this line
  // const messageGroups = groupMessages(messages);

  return (
    <div className={`message-list ${darkMode ? 'dark-mode' : ''} ${theme !== 'default' ? theme : ''}`}>
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        buildThreadedMessages(messages)
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;