import React from 'react';
import Character from '../character/Character';

const Word = props => {
  //   console.log (props);
  let word = props.word.split ('').map ((ch, index) => {
    let display = null;
    if (props.charStatus[index] === 0) {
      display = (
        <Character
          key={index}
          letter="?"
          gameStatus={props.gameStatus}
          charStatus={props.charStatus}
        />
      );
    }
    if (props.charStatus[index] === 1) {
      display = (
        <Character
          key={index}
          letter={ch}
          isCurrect={props.isCurrect}
          gameStatus={props.gameStatus}
          charStatus={props.charStatus}
        />
      );
    }
    if (ch === ' ') {
      display = (
        <Character
          key={index}
          letter="-"
          gameStatus={props.gameStatus}
          charStatus={props.charStatus}
        />
      );
    }
    return display;
  });

  return <div>{word}</div>;
};

export default Word;
