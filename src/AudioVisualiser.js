import React, { Component } from 'react';

class AudioVisualiser extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');

    const minMax = this.drawWave({ context, width, height, audioData });
    this.drawMinMax({ context, width, height, minMax });
  }

  drawWave({ context, width, height, audioData }) {
    let x = 0;
    const sliceWidth = (width * 5.0) / audioData.length;
    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    let maxWaveItem = 0;
    let minWaveItem = height;

    for (let i = 0; i < audioData.length; i += 5) {
      const item = audioData[i];
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;

      if (item < minWaveItem) minWaveItem = item;
      if (item > maxWaveItem) maxWaveItem = item;
    }
    context.lineTo(x, height / 2);
    context.stroke();

    return { minWaveItem, maxWaveItem }
  }

  drawMinMax({ context, width, height, minMax }) {
    let { minWaveItem, maxWaveItem } = minMax;
    console.log(minMax);
    context.lineWidth = 2;

    context.strokeStyle = '#000000';
    context.beginPath();
    const minWaveItemY = (minWaveItem / 255.0) * height;
    context.moveTo(0, minWaveItemY);
    context.lineTo(width, minWaveItemY);
    context.stroke();

    context.strokeStyle = '#000000';
    context.beginPath();
    const maxWaveItemY = (maxWaveItem / 255.0) * height;
    context.moveTo(0, maxWaveItemY);
    context.lineTo(width, maxWaveItemY);
    context.stroke();
  }

  render() {
    let { canvasWidth = 1000, canvasHeight = 300 } = this.props;

    return <canvas width={canvasWidth} height={canvasHeight} ref={this.canvas} />;
  }
}

export default AudioVisualiser;
