import React from "react";
import Card from "./Card";
import Button from "./Button";

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
    maxCards,
    hasWonGame,
    newHighScore
  } = props;

  let bestGameText = null;
  if (bestGame !== null) {
    bestGameText = `Best Game: ${bestGame}`;
  }

  let hasWonGameText = hasWonGame ? (
    <h2 className="center-text won-game-text">You Win!</h2>
  ) : null;
  let newHighScoreText = newHighScore ? (
    <h2 className="center-text new-high-score-text">New High Score!</h2>
  ) : null;

  let cards = playingCards.map((color, index) => {
    let flipped = false;
    if (matchedCards.includes(color)) {
      flipped = true;
    }
    selectedCards.forEach(item => {
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
    );
  });

  function changeCardNumber(e) {
    handleNumberOfCardsChange(e.target.value);
  }

  return (
    <div className="game-board">
      {hasWonGameText}
      {newHighScoreText}
      <div className="header-info">
        <div className="header-info__scores">
          <p>Flips: {props.clicks}</p>
          <p>{bestGameText}</p>
        </div>
        <div className="header-info__options">
          <div className="header-info__text">
            Number of Cards:
            <span className="select-container">
              <select onChange={changeCardNumber} value={numberOfCards}>
                <option value={maxCards}>{maxCards * 2}</option>
                <option value={maxCards / 4 * 3}>{maxCards / 4 * 3 * 2}</option>
                <option value={maxCards / 2}>{maxCards / 2 * 2}</option>
                <option value={maxCards / 4}>{maxCards / 4 * 2}</option>
              </select>
            </span>
          </div>
          <Button
            handleClick={restartGame}
            text="Restart Game"
            classNames="button"
          />
        </div>
      </div>
      <div className="game-card-container">{cards}</div>
      <h3 className="center-text">Perfect Game: {perfectGame}</h3>
    </div>
  );
}
