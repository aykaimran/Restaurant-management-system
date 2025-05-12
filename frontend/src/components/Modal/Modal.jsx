import React from 'react';
import './Modal.css';

const Modal = ({
  title = '',
  message,
  onClose,
  buttons = [],
  icon = null
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {icon && <div className="modal-icon">{icon}</div>}
        {title && <h3 className="modal-title">{title}</h3>}
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {buttons.length > 0 ? (
            buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  button.onClick?.();
                  if (button.closeOnClick !== false) onClose();
                }}
                className={`modal-button ${button.variant || (index === 0 ? 'primary' : 'secondary')}`}
                disabled={button.disabled}
              >
                {button.text}
              </button>
            ))
          ) : (
            <button onClick={onClose} className="modal-button primary" autoFocus>
              Got it!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
