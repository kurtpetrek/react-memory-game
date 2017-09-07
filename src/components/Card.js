import React from "react";

export default function Card(props) {
  let shownColor = props.flipped ? props.color : "white";
  let animated = props.flipped ? null : "tempt-user--shadow";
  let cardColor = props.color;
  let index = props.index;

  const cardStyle = {
    background: shownColor,
    animationDelay: Math.random() * -1 + "s"
  };

  function testCard() {
    props.clickHandler(cardColor, index);
  }

  return (
    <div
      style={cardStyle}
      onClick={testCard}
      className={"game-card " + animated}
    />
  );
}
