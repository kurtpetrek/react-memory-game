import React from 'react';

export default function StartButton(props) {
  const containerStyle = {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const buttonStyle = {
    padding: '.5rem',
    borderRadius : '10px',
    background: '#047DBF',
    color: 'white',
    fontSize: '1.4rem'
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={props.handleClick}>Start Game</button>
    </div>
  );
}
