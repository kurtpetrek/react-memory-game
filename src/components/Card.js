import React from "react";

export default function Card(props) {
  let cardFlipped = props.flipped ? 'game-card--flipped' : '';
  let cardColor = props.color;
  let index = props.index;

  function testCard() {
    props.clickHandler(cardColor, index);
  }

  return (
    <div className={"game-card " + cardFlipped} onClick={testCard}>
      <div
        className="game-card__back"
        style={{
          background: 'white'
        }}
      />
      <div
        className="game-card__front"
        style={{
          background: cardColor
        }}
      />
    </div>

  );
}
