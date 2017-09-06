import React from 'react';

export default function Card(props) {
  let shownColor = props.flipped ? props.color : 'white';
  let cardColor = props.color;
  let index = props.index;

  const cardStyle = {
    background: shownColor
  };

  function testCard(){
    props.clickHandler(cardColor, index);
  }

  return (
    <div
      style={cardStyle}
      onClick={testCard}
      className="game-card"
    ></div>
  )
}
