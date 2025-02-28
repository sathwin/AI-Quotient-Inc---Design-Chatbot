import React, { useRef, useContext } from 'react';
import { ThemeContext } from '../Chatbot';
import './FileAttachmentUI.css';

const FileAttachmentUI = ({ files, onAttach, onRemove }) => {
  const { darkMode } = useContext(ThemeContext);
  const fileInputRef = useRef(null);
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      onAttach(Array.from(e.target.files));
    }
  };

  const getFileIcon = (file) => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return '🖼️';
      case 'audio':
        return '🎵';
      case 'video':
        return '🎬';
      case 'application':
        if (file.name.endsWith('.pdf')) return '📄';
        if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) return '📝';
        if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) return '📊';
        if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) return '📑';
        if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) return '🗄️';
        return '📎';
      default:
        return '📄';
    }
  };
  
  return (
    <div className={`file-attachment-ui ${darkMode ? 'dark-mode' : ''}`}>
      <input 
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <button 
        className="attach-button"
        onClick={triggerFileInput}
        aria-label="Attach files"
      >
        📎
      </button>
      
      {files.length > 0 && (
        <div className="attachment-previews">
          {files.map((file, index) => (
            <div key={index} className="attachment-preview">
              {file.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={file.name}
                  className="image-preview" 
                />
              ) : (
                <div className="file-preview">
                  <span className="file-icon">{getFileIcon(file)}</span>
                  <span className="file-name">{file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name}</span>
                </div>
              )}
              
              <button 
                className="remove-attachment"
                onClick={() => onRemove(index)}
                aria-label="Remove attachment"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileAttachmentUI;