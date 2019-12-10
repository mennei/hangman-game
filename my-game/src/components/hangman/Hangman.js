import React from 'react';
import './Hangman.css';

const Hangman = props => {
  //   console.log (props);
  const {show, counter} = props;
  let cssCode = {visibility: 'hidden'};
  if (show) {
    cssCode = {visibility: 'visible'};
  }
  let display = null;
  if (counter === 1) {
    display = <div className="Ground" style={cssCode} />;
  }
  if (counter === 2) {
    display = (
      <div>
        <div className="Tree" style={cssCode} />
        {' '}
        <div className="Ground" style={cssCode} />
      </div>
    );
  }
  if (counter === 3) {
    display = (
      <div>
        <div className="Tree" style={cssCode}>
          <div className="Rig" style={cssCode} />
        </div>

        {' '}
        <div className="Ground" style={cssCode} />
      </div>
    );
  }
  if (counter === 4) {
    display = (
      <div>
        <div className="Tree" style={cssCode}>
          <div className="Rig" style={cssCode} />
          <div className="Face" style={cssCode} />
        </div>
        <div className="Ground" style={cssCode} />
      </div>
    );
  }
  if (counter === 5) {
    display = (
      <div>
        <div className="Tree" style={cssCode}>
          <div className="Rig" style={cssCode} />
          <div className="Face" style={cssCode} />
          <div className="Hands" style={cssCode} />
        </div>
        <div className="Ground" style={cssCode} />
      </div>
    );
  }
  if (counter === 6) {
    display = (
      <div>
        <div className="Tree" style={cssCode}>
          <div className="Rig" style={cssCode} />
          <div className="Face" style={cssCode} />
          <div className="Hands" style={cssCode} />
          <div className="Body" style={cssCode} />
        </div>
        <div className="Ground" style={cssCode} />
      </div>
    );
  }
  if (counter === 7) {
    display = (
      <div>
        <div className="Tree" style={cssCode}>
          <div className="Rig" style={cssCode} />
          <div className="Face" style={cssCode} />
          <div className="Hands" style={cssCode} />
          <div className="Body" style={cssCode} />
          <div className="Legs" style={cssCode} />
        </div>
        <div className="Ground" style={cssCode} />
      </div>
    );
  }

  return <div>{display}</div>;
};

export default Hangman;
