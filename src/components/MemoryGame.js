import React, { Component } from 'react';
import StartButton from './StartButton';
import GameBoard from './GameBoard';

export default class MemoryGame extends Component {
  constructor(){
    super();
    this.state = {
      startingCards: ['red', 'green', 'blue', 'pink', 'purple', 'yellow', 'orange'],
      playingCards: [],
      selectedCards: [],
      matchedCards: [],
      playing: false,
      canPickCard: false
    };
  }

  startGame = () => {
    this.setState(function(prevState){
      function Shuffle(o) {
      	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      	return o;
      };
      prevState.playing = true;
      prevState.canPickCard = true;
      prevState.playingCards = [...prevState.startingCards, ...prevState.startingCards];
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
        return prevState;
      }, () => {
        setTimeout(this.testSelectedCards, 1000);
      })
    }
  }

  testSelectedCards = () => {
    if (this.state.selectedCards.length === 2) {
      let cardsMatch = this.state.selectedCards[0].color === this.state.selectedCards[1].color;
      if (cardsMatch) {
        this.setState((prevState) => {
          prevState.matchedCards.push(prevState.selectedCards[0].color);
          prevState.selectedCards = [];
          prevState.canPickCard = true;
          return prevState;
        }, function () {
            console.log(this.state);
        });
      } else {
        this.setState((prevState) => {
          prevState.selectedCards = [];
          prevState.canPickCard = true;
          return prevState;
        });
      }
    }
  };

  render(){
    if (!this.state.playing) {
      return (
        <StartButton handleClick={this.startGame}/>
      );
    } else {
      return (
        <GameBoard
          playingCards={this.state.playingCards}
          selectedCards={this.state.selectedCards}
          matchedCards={this.state.matchedCards}
          goToStartScreen={this.goToStartScreen}
          handleCardClick={this.onCardClick}
        />
      )
    }
  }
}
