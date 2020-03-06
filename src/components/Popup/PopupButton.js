import React from 'react';

function PopupButton({ onClick, text, primary }) {
  const className = primary ? 'button button--primary' : 'button button--secondary';

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default PopupButton;
