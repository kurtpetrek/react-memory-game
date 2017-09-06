import React, { Component } from 'react';
import StartScreen from './StartScreen';
import GameBoard from './GameBoard';

export default class MemoryGame extends Component {
  constructor(){
    super();
    this.state = {
      allCards: [
        'red', 'green', 'blue', 'purple', 'pink', 'yellow', 'orange', 'teal', '#00D8FF', '#12252F', '#417797', '#5D6771'
      ],
      startingCards: [],
      numberOfCards: 10,
      playingCards: [],
      selectedCards: [],
      matchedCards: [],
      playing: false,
      canPickCard: false,
      clicks: 0,
      bestGame: null,
      perfectGame: null,
      hasWonGame: false
    };
  }

  startGame = () => {
    this.setState(function(prevState){
      function Shuffle(o) {
      	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      	return o;
      };
      prevState.startingCards = [...prevState.allCards, ...prevState.allCards].slice(0, prevState.numberOfCards);
      prevState.numberOfCards = prevState.startingCards.length;
      prevState.playing = true;
      prevState.canPickCard = true;
      prevState.numberOfCards = prevState.startingCards.length;
      prevState.playingCards = [...prevState.startingCards, ...prevState.startingCards];
      prevState.matchedCards = [];
      prevState.clicks = 0;
      prevState.perfectGame = prevState.playingCards.length;
      Shuffle(prevState.playingCards);
      return prevState;
    });
  };

  goToStartScreen = () => {
    this.setState(function(prevState){
      prevState.playing = false;
      prevState.canPickCard = false;
      return prevState;
    });
  };

  onCardClick = (color, index) => {
    let cardHasAlreadyBeenMatched = this.state.matchedCards.includes(color);
    if (!cardHasAlreadyBeenMatched && this.state.canPickCard) {
      this.setState(function(prevState){
        const selectedCard = {
          color: color,
          index: index
        };
        prevState.selectedCards.push(selectedCard);
        if (prevState.selectedCards.length === 2) {
          prevState.canPickCard = false;
        }
        prevState.clicks++;
        return prevState;
      }, () => {
        if (this.state.selectedCards.length === 2) {
          setTimeout(this.testSelectedCards, 1000);
        }
      })
    }
  }

  testSelectedCards = () => {
    let cardsMatch = false;
    if (this.state.selectedCards[0].color === this.state.selectedCards[1].color && this.state.selectedCards[0].index !== this.state.selectedCards[1].index) {
      cardsMatch = true;
    }
    if (cardsMatch) {
      this.setState((prevState) => {
        prevState.matchedCards.push(prevState.selectedCards[0].color);
        prevState.selectedCards = [];
        prevState.canPickCard = true;
        if (prevState.matchedCards.length >= prevState.playingCards.length / 2 ) {
          if (prevState.bestGame === null) {
            prevState.bestGame = prevState.clicks;
            console.log('High Score!');
          } else if (prevState.bestGame > prevState.clicks) {
            prevState.bestGame = prevState.clicks;
            console.log('High Score!');
          }
          console.log("Win!");
          prevState.hasWonGame = true;
        }
        return prevState;
      });
    } else {
      this.setState((prevState) => {
        prevState.selectedCards = [];
        prevState.canPickCard = true;
        return prevState;
      });
    }
  };

  changeNumberOfCards = (newNumberofCards) => {
    if (newNumberofCards !== this.state.numberOfCards) {
      this.setState(function(prevState){
        prevState.numberOfCards = newNumberofCards;
        prevState.bestGame = null;
        return prevState;
      }, this.startGame)
    }
  };

  render(){
    if (!this.state.playing) {
      return (
        <StartScreen startGame={this.startGame}/>
      );
    } else {
      return (
        <GameBoard
          playingCards={this.state.playingCards}
          selectedCards={this.state.selectedCards}
          matchedCards={this.state.matchedCards}
          goToStartScreen={this.goToStartScreen}
          handleCardClick={this.onCardClick}
          restartGame={this.startGame}
          clicks={this.state.clicks}
          bestGame={this.state.bestGame}
          perfectGame={this.state.perfectGame}
          handleNumberOfCardsChange={this.changeNumberOfCards}
          numberOfCards={this.state.numberOfCards}
          maxCards={this.state.allCards.length}
        />
      )
    }
  }
}
