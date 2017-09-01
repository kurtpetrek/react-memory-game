import React from 'react';
import Card from './Card';

export default function GameBoard(props) {
  let {
    playingCards,
    selectedCards,
    matchedCards,
    handleCardClick
  } = props;

  let cards = playingCards.map((color, index) => {
    let flipped = false;
    if (matchedCards.includes(color)){
      flipped = true;
    }
    selectedCards.forEach((item) => {
      if (item.index === index) {
        flipped = true;
      }
    });
    
    return (
      <Card
        flipped={flipped}
        clickHandler={handleCardClick}
        color={color}
        key={color + index}
        index={index}
      />
    )
  });

  return (
    <div>
      {cards}
    </div>
  );
}
