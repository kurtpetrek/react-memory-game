import React from 'react';

export default function Button(props) {
  const buttonStyle = {
    padding: '.5rem',
    borderRadius : '10px',
    background: '#047DBF',
    color: 'white',
    fontSize: '1.4rem'
  };

  return (
    <button style={buttonStyle} onClick={props.handleClick}>{props.text}</button>
  )
}
