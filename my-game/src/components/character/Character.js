import React from 'react';
import './Character.css';

const Character = props => {
  const {charStatus, gameStatus, clicked, show} = props;
  const cssClasses = ['TrashLetter', show ? 'TrashOpen' : 'TrashClosed'];
  let displayCharStatus = null;

  if (charStatus === 0 || gameStatus === 'init') {
    displayCharStatus = <div className="EmptyLetter">{props.letter}</div>;
  }
  if (gameStatus === 'input') {
    displayCharStatus = (
      <div className="Letter" onClick={clicked}>{props.letter}</div>
    );
  }
  if (show) {
    displayCharStatus = (
      <div className={cssClasses.join (' ')}>{props.letter}</div>
    );
  }
  return displayCharStatus;
};

export default Character;
