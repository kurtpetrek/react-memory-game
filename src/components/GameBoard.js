import React from 'react';
import Card from './Card';
import Button from './Button';

export default function GameBoard(props) {
  let {
    playingCards,
    selectedCards,
    matchedCards,
    handleCardClick,
    bestGame,
    perfectGame,
    restartGame,
    handleNumberOfCardsChange,
    numberOfCards,
    maxCards
  } = props;

  let bestGameText = null;
  if (bestGame !== null) {
    bestGameText = `Best Game: ${bestGame}` ;
  }

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

  function changeCardNumber(e) {
    handleNumberOfCardsChange(e.target.value);
  }

  return (
    <div className="game-board">
      <h1>Color Memory</h1>
      <div className="header-info">
        <div className="header-info__scores">
          <h2>Clicks: {props.clicks}</h2>
          <h2>{bestGameText}</h2>
        </div>
        <div className="header-info__options">
          <div className="header-info__text">
            Number of Cards:
            <select onChange={changeCardNumber} value={numberOfCards}>
            <option value={maxCards}>{(maxCards) * 2}</option>
              <option value={maxCards / 4 * 3}>{(maxCards / 4 * 3) * 2}</option>
              <option value={maxCards / 2}>{(maxCards / 2) * 2}</option>
              <option value={maxCards / 4}>{(maxCards / 4) * 2}</option>
            </select>
          </div>
          <Button
            handleClick={restartGame}
            text="Restart Game"
            classNames="button"
          />
        </div>
      </div>
      <div className="game-card-container">
        {cards}
      </div>
      <h3 className="center-text">Perfect Game: {perfectGame}</h3>
    </div>
  );
}
