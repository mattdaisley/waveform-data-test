import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import AudioVisualiser from './AudioVisualiser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      audioLog: [],
      currentAudioLogIndex: 0
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.handleNewAudioData = this.handleNewAudioData.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    let { audio, currentAudioLogIndex } = this.state;

    audio.getTracks().forEach(track => track.stop());

    this.setState({ audio: null, currentAudioLogIndex: currentAudioLogIndex + 1 });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  handleNewAudioData(newAudioData) {
    let { audioLog, currentAudioLogIndex } = this.state;

    audioLog[currentAudioLogIndex] = newAudioData;

    this.setState({ audioLog });
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} onNewAudioData={this.handleNewAudioData} /> : ''}

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.audioLog.map((logItem, i) => <AudioVisualiser key={i} audioData={logItem} canvasWidth={300} />)}
        </div>
      </div>
    );
  }
}

export default App;
