import React, {Component} from 'react';
import './Layout.css';
import Character from '../../components/character/Character';
import Word from '../../components/word/Word';
import Hangman from '../../components/hangman/Hangman';

class Layout extends Component {
  state = {
    letters: [
      'א',
      'ב',
      'ג',
      'ד',
      'ה',
      'ו',
      'ז',
      'ח',
      'ט',
      'י',
      'כ',
      'ך',
      'ל',
      'מ',
      'ם',
      'נ',
      'ן',
      'ס',
      'ע',
      'פ',
      'ף',
      'צ',
      'ץ',
      'ק',
      'ר',
      'ש',
      'ת',
    ],
    words: ['משפחה', 'עבודה', 'לימודים'],
    word: '',
    gameStatus: '',
    charStatus: [],
    msg: '',
    hangmanCounter: 0,
  };

  handleChoose = max => {
    const choosenWord = this.state.words[
      Math.floor (Math.random () * Math.floor (max))
    ];
    [...this.state.charStatus] = choosenWord.split ('').map (ch => 0);
    console.log (this.state.charStatus, choosenWord);
    this.setState ({word: choosenWord, gameStatus: 'init', msg: ''});
  };

  handleInputClick = ch => {
    const charStatusInput = [...this.state.charStatus];
    if (this.state.word || charStatusInput.includes (0)) {
      const chIndex = this.state.word
        .split ('')
        .findIndex (
          (item, index) => item === ch && charStatusInput[index] === 0
        );
      if (chIndex > -1) {
        charStatusInput[chIndex] = 1;
        this.setState ({
          charStatus: charStatusInput,
          msg: '',
          gameStatus: 'input',
        });
      } else {
        const counter = this.state.hangmanCounter;
        if (charStatusInput.includes (0)) {
          this.setState ({hangmanCounter: counter + 1});
        } else {
          this.setState ({msg: 'אנא בחר מילה'});
        }
      }
    } else {
      this.setState ({msg: 'אנא בחר מילה'});
    }
  };

  render () {
    return (
      <div className="Container">
        <div>
          <button onClick={() => this.handleChoose (this.state.words.length)}>
            בחר מילה
          </button>
        </div>
        <div className="Hangman">
          {this.state.hangmanCounter}
          <Hangman />
        </div>
        <div className="Word">
          <Word
            word={this.state.word}
            gameStatus={this.state.gameStatus}
            charStatus={this.state.charStatus}
          />
        </div>
        <div className="Msg">{this.state.msg}</div>
        <div className="Char">
          {this.state.letters.map ((ch, index) => (
            <Character
              key={index}
              letter={ch}
              gameStatus="input"
              clicked={() => this.handleInputClick (ch)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Layout;
