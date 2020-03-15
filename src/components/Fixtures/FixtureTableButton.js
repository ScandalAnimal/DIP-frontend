import React from 'react';

function FixtureTableButton({ onClick, text, primary }) {
  const className = primary
    ? 'fixture-button fixture-button--primary'
    : 'fixture-button fixture-button--secondary';

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}

export default FixtureTableButton;
