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
          className="hue-rotation-animation">
          {x}
        </span>);
    }
  });
  let splitPoint = newText.indexOf(' ');
  let partOne = newText.slice(0, splitPoint);
  let partTwo = newText.slice(splitPoint, newText.length);
  return (
    <h1>
      <span style={{display: 'inline-block'}}>
        {partOne}
      </span>
      <span style={{display: 'inline-block', marginLeft: '1rem'}}>
        {partTwo}
      </span>
    </h1>
  )
}
