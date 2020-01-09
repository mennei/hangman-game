import React, {Component} from 'react';
import tryAgainSound from '../../static/sounds/try_again.mp3';

class Music extends Component {
  constructor (props) {
    super (props);
    this.state = {
      play: false,
      audio: new Audio (),
    };
    this.setAudio (props);
  }

  setAudio = props => {
    console.log (props);
    if (props.trackName === 'tryAgainSound') {
      this.setState ({audio: new Audio (tryAgainSound)});
    }
  };

  componentDidMount () {
    const audio = this.state.audio;
    audio.addEventListener ('ended', () => this.setState ({play: false}));
  }

  componentDidUpdate () {
    const audio = this.state.audio;
    audio.addEventListener ('ended', () => this.setState ({play: false}));
  }

  componentWillUnmount () {
    const audio = this.state.audio;
    audio.removeEventListener ('ended', () => this.setState ({play: false}));
  }

  togglePlay = () => {
    const audio = this.state.audio;
    this.setState ({play: !this.state.play}, () => {
      this.state.play ? audio.play () : audio.pause ();
    });
  };

  render () {
    return (
      <div>
        <button onClick={this.togglePlay}>
          {this.state.play ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  }
}

export default Music;
