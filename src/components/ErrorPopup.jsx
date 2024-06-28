import React from 'react';

const ErrorPopup = ({ errors, onClose }) => {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <div className="error-popup-header">
          <h3>Errors</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="error-popup-content">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
