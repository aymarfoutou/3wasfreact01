import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

class Score extends Component {

  render() {

    console.log(this.props.location);

    const score = ( this.props.location && this.props.location.state ) ? this.props.location.state.score : null

    return (
      <div>
        <p>Votre score est : {score}</p>
        <p><Link to="/game">Rejouer 1 ?</Link></p>
        <p><Link to="/game2">Rejouer 2 ?</Link></p>
        <p><Link to="/game3">Rejouer 3 ?</Link></p>
      </div>
    )
  }
}
export default Score;
