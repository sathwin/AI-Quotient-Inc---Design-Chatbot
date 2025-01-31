import React from 'react';
import './MessageList.css';

const MessageList = ({ messages, onReply }) => {
  // Recursively build threaded messages
  const buildThreadedMessages = (allMsgs, parentId = null, level = 0) => {
    return allMsgs
      .filter((m) => m.parentId === parentId)
      .map((m) => {
        // Determine row alignment: user => right, bot => left
        const rowClass = m.sender === 'user' ? 'message-row user' : 'message-row bot';

        return (
          <div key={m.id} style={{ marginLeft: `${level * 20}px` }}>
            <div className={rowClass}>
              <div className="message-bubble">
                {/* If it's a GIF, show an <img> */}
                {m.isGif ? (
                  <img
                    src={m.text}
                    alt="GIF"
                    style={{ maxWidth: '200px', borderRadius: '8px' }}
                  />
                ) : (
                  <span>{m.text}</span>
                )}
                <span className="timestamp">{m.timestamp}</span>

                {/* "Reply" button if you want threading */}
                <button
                  className="reply-button"
                  onClick={() => onReply(m.id)}
                >
                  Reply
                </button>
              </div>
            </div>
            {/* Render any children (threads) */}
            {buildThreadedMessages(allMsgs, m.id, level + 1)}
          </div>
        );
      });
  };

  return <div className="message-list">{buildThreadedMessages(messages)}</div>;
};

export default MessageList;
