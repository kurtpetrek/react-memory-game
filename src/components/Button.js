import React from "react";

export default function Button(props) {
  let { classNames, handleClick, text } = props;

  if (Array.isArray(classNames)) {
    classNames = classNames.join(" ");
  }

  return (
    <button className={classNames} onClick={handleClick}>
      {text}
    </button>
  );
}
