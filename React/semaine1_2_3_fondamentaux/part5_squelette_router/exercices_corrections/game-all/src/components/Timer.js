import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer: 5
    }


    this.interval = null;
  }


  componentDidMount() {
    this.interval = setInterval(() => {
      console.log(this.state);
      if (this.state.timer === 0) {

        this.props.stopTimer( false );

        return
      }
      this.setState({ timer: this.state.timer - 1 });

    }, 1000)
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  render() {

    const { timer } = this.state;

    return (
      <p>Timer : {timer}</p>
    )
  }
}
export default Timer;
