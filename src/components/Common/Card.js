import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div className='container'>
      <div className='card board-shadow'>
        <span className='card__title'>{title}</span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
