import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: 1,
        borderRadius: '1rem',
        background: 'tomato',
        color: 'white',
        fontSize: '1rem',
        padding: '1rem 1.5rem',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
