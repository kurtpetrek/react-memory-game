import React, { Component } from "react";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import MultiColoredHeader from './components/MultiColoredHeader';
import "./App.css";

export default class MemoryGame extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [
        "#DE3C4B",
        "#87F5FB",
        "#C09BD8",
        "#EBC3DB",
        "#C7DFC5",
        "#F6FEAA",
        "#EE964B",
        "#718F94",
        "#545775",
        "#72B01D",
        "#283845",
        "#ABA361",
        "#F84AA7",
        "#B0CA87",
        "#27FB6B",
        "#51291E"
      ],
      startingCards: [],
      numberOfCards: 12,
      playingCards: [],
      selectedCards: [],
      matchedCards: [],
      playing: false,
      canPickCard: false,
      clicks: 0,
      bestGame: null,
      perfectGame: null,
      hasWonGame: false,
      newHighScore: false
    };
  }

  startGame = () => {
    this.setState(function(prevState) {
      function Shuffle(o) {
        for (
          var j, x, i = o.length;
          i;
          j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x
        );
        return o;
      }
      Shuffle(prevState.allCards);
      prevState.startingCards = [
        ...prevState.allCards,
        ...prevState.allCards
      ].slice(0, prevState.numberOfCards);
      prevState.numberOfCards = prevState.startingCards.length;
      prevState.playing = true;
      prevState.canPickCard = true;
      prevState.numberOfCards = prevState.startingCards.length;
      prevState.playingCards = [
        ...prevState.startingCards,
        ...prevState.startingCards
      ];
      prevState.matchedCards = [];
      prevState.selectedCards = [];
      prevState.clicks = 0;
      prevState.perfectGame = prevState.playingCards.length;
      prevState.hasWonGame = false;
      prevState.newHighScore = false;
      Shuffle(prevState.playingCards);
      return prevState;
    });
  };

  goToStartScreen = () => {
    this.setState(function(prevState) {
      prevState.playing = false;
      prevState.canPickCard = false;
      return prevState;
    });
  };

  onCardClick = (color, index) => {
    let cardHasAlreadyBeenMatched = this.state.matchedCards.includes(color);
    let cardHasAlreadyBeenClicked = false;
    if (this.state.selectedCards.length === 1 && this.state.selectedCards[0].index === index) {
      cardHasAlreadyBeenClicked = true;
    }
    if (!cardHasAlreadyBeenMatched && this.state.canPickCard && !cardHasAlreadyBeenClicked) {
      this.setState(
        function(prevState) {
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
        },
        () => {
          if (this.state.selectedCards.length === 2) {
            setTimeout(()=>{
              if (this.state.selectedCards.length === 2) {
                this.testSelectedCards()
              }
            }, 1000);
          }
        }
      );
    }
  };

  testSelectedCards = () => {
    let cardsMatch = false;
    if (
      this.state.selectedCards[0].color === this.state.selectedCards[1].color &&
      this.state.selectedCards[0].index !== this.state.selectedCards[1].index
    ) {
      cardsMatch = true;
    }
    if (cardsMatch) {
      this.setState(prevState => {
        prevState.matchedCards.push(prevState.selectedCards[0].color);
        prevState.selectedCards = [];
        prevState.canPickCard = true;
        if (
          prevState.matchedCards.length >=
          prevState.playingCards.length / 2
        ) {
          if (prevState.bestGame === null) {
            prevState.bestGame = prevState.clicks;
            prevState.newHighScore = true;
          } else if (prevState.bestGame > prevState.clicks) {
            prevState.bestGame = prevState.clicks;
            prevState.newHighScore = true;
          }
          window.scrollTo(0, 0);
          prevState.hasWonGame = true;
        }
        return prevState;
      });
    } else {
      this.setState(prevState => {
        prevState.selectedCards = [];
        prevState.canPickCard = true;
        return prevState;
      });
    }
  };

  changeNumberOfCards = newNumberofCards => {
    if (newNumberofCards !== this.state.numberOfCards) {
      this.setState(function(prevState) {
        prevState.numberOfCards = newNumberofCards;
        prevState.bestGame = null;
        return prevState;
      }, this.startGame);
    }
  };

  render() {
    if (!this.state.playing) {
      return <StartScreen startGame={this.startGame} />;
    } else {
      return (
        <div>
          <MultiColoredHeader text="Color Memory" colors={this.state.allCards}/>
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
            hasWonGame={this.state.hasWonGame}
            newHighScore={this.state.newHighScore}
          />
        </div>
      );
    }
  }
}
