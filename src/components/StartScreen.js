import React from "react";
import Button from "./Button";

export default function StartScreen(props) {
  return (
    <div className="start-screen">
      <h1 className="start-screen__heading">Color Memory</h1>
      <Button
        handleClick={props.startGame}
        text="Start Game"
        classNames={["button", "tempt-user"]}
      />
    </div>
  );
}
