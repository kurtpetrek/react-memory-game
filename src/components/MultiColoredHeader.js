import React from 'react';

export default class MultiColoredHeader extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.getContent(props);
  }

  getContent = (props) => {
    function getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    let text = props.text.split('');
    let newText = [];

    text.forEach(function(x, index){
      if (x === ' ') {
        newText.push(' ');
      } else {
        let color = props.colors[index] ? props.colors[index] : `rgb(${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)})`;
        let style = {
          color: color,
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

    function testArrayForSpaces(arr) {
      let containsSpaces = false;
      let spaceIndexes = [];

      arr.forEach((item, index) => {
        if (item === ' ') {
          spaceIndexes.push(index);
          containsSpaces = true;
        }
      });

      if (containsSpaces) {
        return spaceIndexes;
      } else {
        return false;
      }
    }

    let containsSpaces = testArrayForSpaces(newText);

    if (!containsSpaces) {
      return (
        <h1>{newText}</h1>
      )
    } else {
      let finalContent = containsSpaces.map((item, index, arr) => {
        var startingPoint = 0;
        if (index > 0) {
          startingPoint = arr[index - 1];
        }

        if (index === arr.length - 1) {
          return (
            <span key={'color-header-span' + index}>
              <span style={{display: 'inline-block'}}>
                {newText.slice(startingPoint, item)}
              </span>
              <span> </span>
              <span style={{display: 'inline-block'}}>
                {newText.slice(item, newText.length)}
              </span>
            </span>
          )
        } else {
          return (
            <span>
              <span>
                <span style={{display: 'inline-block', marginLeft: '1rem'}} key={'color-header-span' + index}>
                  {newText.slice(startingPoint, item)}
                </span>
              </span>
              <span> </span>
            </span>
            )
        }
      });
      return (
        <h1>{finalContent}</h1>
      )
    }
  }

  render() {
    return this.content;
  }
}
