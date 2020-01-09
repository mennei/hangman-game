import React, {Component} from 'react';
import './Layout.css';
import Character from '../../components/character/Character';
import Word from '../../components/word/Word';
import Hangman from '../../components/hangman/Hangman';
import TrashImg from '../../static/images/Trashcan.png';
import tryAgainCoolSource from '../../static/sounds/try_again_cool.mp3';
import excelland from '../../static/sounds/excelland.mp3';

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
    /* words: [
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
    ], */
    words: [
      'טו בשבט',
      'אילנות',
      'חיטה',
      'שעורה',
      'גפן',
      'תאנה',
      'רימון',
      'זית',
      'שמן',
      'תמרים',
      'שבעת המינים',
      'ערלה',
      'רבעי',
      'ביכורים',
      'אדמה',
      'פירות',
      'לקט',
      'שכחה',
      'פאה',
      'מעשרות',
      'אורן',
      'אלון',
      'דקל',
      'ברוש',
      'ארז',
      'חרוב',
      'אקליפטוס',
      'אתרוג',
      'שקדיה',
      'נטיעות',
      'שדה',
      'שתיל',
      'חורשה',
      'יער',
      'קרן קיימת לישראל',
    ],
    word: '',
    gameStatus: '',
    charStatus: [],
    msg: '',
    counter: 0,
    trashChars: [],
    isCurrect: false,
    source: null,
  };

  onTrackChange = sourceItem => {
    this.setState ({source: sourceItem}, () => {
      this.refs.audio.pause ();
      this.refs.audio.load ();
      this.refs.audio.play ();
    });
  };

  handleChoose = max => {
    const choosenWord = this.state.words[
      Math.floor (Math.random () * Math.floor (max))
    ];
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
          isCurrect: true,
        });
      } else {
        const hangmanCounter = this.state.counter;
        if (charStatusInput.includes (0) && hangmanCounter <= 6) {
          this.handleTrashChar (ch);
          this.setState ({counter: hangmanCounter + 1, show: true});
        } else {
          this.setState (
            {
              counter: 0,
              msg: 'אויי חבל... :( אפשר לנסות שוב. בהצלחה!',
              show: false,
              trashChars: [],
              isCurrect: false,
              source: tryAgainCoolSource,
            },
            () => this.onTrackChange (this.state.source)
          );
        }
      }
    }
    if (!charStatusInput.includes (0) && charStatusInput.length > 0) {
      this.setState (
        {
          msg: 'כל הכבוד!!! :)',
          show: false,
          trashChars: [],
          source: excelland,
        },
        () => this.onTrackChange (this.state.source)
      );
    }
    if (charStatusInput.length === 0) {
      this.setState ({msg: 'אנא בחר מילה'});
    }
    // console.log (this.state);
  };

  handleTrashChar = ch => {
    const displayTrashChars = [...this.state.trashChars];
    if (!displayTrashChars.includes (ch)) {
      displayTrashChars.push (ch);
    }
    this.setState ({trashChars: displayTrashChars});
  };

  render () {
    let cssCode = {display: 'none'};
    if (this.state.show) {
      cssCode = {
        display: 'block',
        height: '3%',
        width: '40%',
        margin: '0 auto',
        marginTop: '5px',
        padding: '15px',
      };
    }
    return (
      <div className="Container">
        <audio ref="audio">
          <source src={this.state.source} />
        </audio>
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
            isCurrect={this.state.isCurrect}
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
          <div className="Picture">
            <div className="Space" />
            <Hangman show={this.state.show} counter={this.state.counter} />
          </div>
          <div className="Trash">
            <div>
              <img
                src={TrashImg}
                alt="תמונת סל מיחזור"
                style={({width: '50px', height: '60px'}, cssCode)}
              />
            </div>
            <div className="TrashCharContainer">
              {this.state.trashChars.map ((ch, index) => (
                <Character
                  key={index}
                  letter={ch}
                  gameStatus="input"
                  show={this.state.show}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
