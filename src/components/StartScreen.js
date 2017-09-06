import React from 'react';
import Button from './Button';

export default function StartScreen(props) {
  const containerStyle = {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <Button
        handleClick={props.startGame}
        text="Start Game"
      />
    </div>
  );
}
