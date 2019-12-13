import React from 'react';
import './Character.css';

const Character = props => {
  console.log (props);
  const {gameStatus, clicked, show, isCurrect} = props;
  const cssClasses = ['Letter', isCurrect ? 'CurrectLetter' : 'QuestionMark'];
  const trashCssClasses = [
    'TrashLetter',
    show ? 'TrashOpen WorngLetter' : 'TrashClosed',
  ];
  let displayCharStatus = null;

  if (gameStatus === 'init') {
    displayCharStatus = <div className="EmptyLetter">{props.letter}</div>;
  }
  if (gameStatus === 'input') {
    displayCharStatus = (
      <div className={cssClasses.join (' ')} onClick={clicked}>
        {props.letter}
      </div>
    );
  }
  if (show) {
    displayCharStatus = (
      <div className={trashCssClasses.join (' ')}>{props.letter}</div>
    );
  }
  return displayCharStatus;
};

export default Character;
