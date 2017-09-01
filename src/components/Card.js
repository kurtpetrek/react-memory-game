import React from 'react';

export default function Card(props) {
  let shownColor = props.flipped ? props.color : 'white';
  let cardColor = props.color;
  let index = props.index;

  const cardStyle = {
    background: shownColor,
    border: '3px solid black',
    width: '150px',
    height: '200px',
    float: 'left',
    margin: '1rem 2rem',
    borderRadius: '20px'
  };

  function testCard(){
    console.log(index);
    props.clickHandler(cardColor, index);
  }

  return (
    <div style={cardStyle} onClick={testCard}></div>
  )
}
