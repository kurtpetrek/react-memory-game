import React from 'react';

export default function MultiColoredHeader(props) {

  var text = props.text.split('');
  var newText = [];
  text.forEach(function(x, index){
    if (x === ' ') {
      newText.push(' ');
    } else {
      let style = {
        color: props.colors[index],
        display: 'inline-block',
      }
      newText.push(<span
          style={style}
          key={x+style.color}
          className="tempt-user hue-rotation-animation">
          {x}
        </span>);
    }
  });
  return (
    <h1>{newText}</h1>
  )
}
