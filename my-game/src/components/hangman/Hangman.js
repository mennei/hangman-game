import React from 'react';
import './Hangman.css';
const Hangman = props => {
  return (
    <div className="HangmanContainer">
      <div className="Tree">
        <div className="Rig" />
        <div className="Face" />
        <div className="Hands" />
        <div className="Body" />
        <div className="Legs" />
      </div>
      <div className="Ground" />
    </div>
  );
};

export default Hangman;
