import React from 'react';

function PopupButton({ onClick, text, primary }) {
  const className = primary
    ? 'popup-button popup-button--primary'
    : 'popup-button popup-button--secondary';

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default PopupButton;
