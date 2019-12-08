import React from 'react';
import './Character.css';

const WriteCharacter = props => {
  console.log (props);
  let letter = '___';
  if (props.letter) {
    letter = props.letter;
  }
  return <div className="Letter">{letter}</div>;
};

export default WriteCharacter;
