// src/components/Popup.jsx
import React from 'react';
import './css/PopUp.css';

export default function PopUp({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          {children}
        </div>
      </div>
    </div>
  );
}