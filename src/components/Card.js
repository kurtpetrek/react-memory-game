import React from 'react';

export default function Card(props) {
  let shownColor = props.flipped ? props.color : 'white';
  let cardColor = props.color;
  let index = props.index;

  const cardStyle = {
    background: shownColor,
    border: '3px solid black',
    width: '100px',
    height: '150px',
    margin: '1rem',
    borderRadius: '10px'
  };

  function testCard(){
    props.clickHandler(cardColor, index);
  }

  return (
    <div style={cardStyle} onClick={testCard}></div>
  )
}
