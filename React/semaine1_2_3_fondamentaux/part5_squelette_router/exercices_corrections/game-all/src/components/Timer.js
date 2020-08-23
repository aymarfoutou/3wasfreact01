import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer:0 
    }

    this.interval = null;
  }


  componentDidMount() {
    
    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
      this.props.getTimer(this.state.timer)
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const { timer } = this.state;

    console.log(timer, 'timer')

    return (
      <p>Timer : {timer}</p>
    )
  }
}
export default Timer;
