import React, { Component } from 'react';

export default class Clock extends Component {
  state = { time: new Date() };

  componentDidMount() {
    this.timer = setInterval(() => this.setState({ time: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <span>🕒 {this.state.time.toLocaleTimeString('vi-VN')}</span>;
  }
}