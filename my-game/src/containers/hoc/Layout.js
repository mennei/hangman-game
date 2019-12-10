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
    words: [
      'חנוכה',
      'סביבון',
      'נר',
      'סופגניה',
      'מכבים',
      'חשמונאים',
      'חנוכיה',
      'יוונים',
      'פח השמן',
      'בית המקדש',
      'מנורה',
      'לביבה',
      'לפיד',
      'אבוקה',
      'נס',
      'גדול',
      'היה',
      'פה',
      'כד קטן',
      'כד',
      'חג האורים',
      'שמן',
      'כד שמן',
    ],
    word: '',
    gameStatus: '',
    charStatus: [],
    msg: '',
    counter: 0,
  };

  handleChoose = max => {
    const choosenWord = this.state.words[
      Math.floor (Math.random () * Math.floor (max))
    ];
    // const choosenWord = 'אנציקלופדיה';
    [...this.state.charStatus] = choosenWord.split ('').map (ch => 0);
    this.setState ({
      word: choosenWord,
      gameStatus: 'init',
      msg: '',
      counter: 0,
    });
  };

  handleInputClick = ch => {
    const charStatusInput = [...this.state.charStatus];
    if (this.state.word && charStatusInput.includes (0)) {
      let spaceIndex = this.state.word.indexOf (' ');
      if (spaceIndex !== -1) {
        charStatusInput[spaceIndex] = 1;
      }

      let position = this.state.word.indexOf (ch);
      let chIndex = position;

      while (position !== -1) {
        charStatusInput[position] = 1;
        position = this.state.word.indexOf (ch, position + 1);
      }
      if (chIndex > -1) {
        this.setState ({
          charStatus: charStatusInput,
          msg: '',
          gameStatus: 'input',
        });
      } else {
        const hangmanCounter = this.state.counter;
        if (charStatusInput.includes (0) && hangmanCounter <= 6) {
          this.setState ({counter: hangmanCounter + 1, show: true});
        } else {
          this.setState ({
            counter: 0,
            msg: 'אויי חבל... :( אפשר לנסות שוב. בהצלחה!',
            show: false,
          });
        }
      }
    }
    if (!charStatusInput.includes (0) && charStatusInput.length > 0) {
      this.setState ({msg: 'כל הכבוד!!! :)', show: false});
    }
    if (charStatusInput.length === 0) {
      this.setState ({msg: 'אנא בחר מילה'});
    }
    // console.log (this.state);
  };

  render () {
    return (
      <div className="Container">
        <div className="Btn">
          <button onClick={() => this.handleChoose (this.state.words.length)}>
            בחר מילה
          </button>
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
        <div className="Hangman">
          <Hangman show={this.state.show} counter={this.state.counter} />
        </div>
      </div>
    );
  }
}

export default Layout;
