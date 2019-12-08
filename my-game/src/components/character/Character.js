import React from 'react';
import './Character.css';

const Character = props => {
  const {charStatus, gameStatus, clicked} = props;
  let displayCharStatus = null;

  if (charStatus === 0 || gameStatus === 'init') {
    displayCharStatus = <div className="EmptyLetter">{props.letter}</div>;
  }
  if (gameStatus === 'input') {
    displayCharStatus = (
      <div className="Letter" onClick={clicked}>{props.letter}</div>
    );
  }

  return displayCharStatus;
};

export default Character;
