import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";

const MAX_MULTIPLICATION = 2;

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      multiplications: [],
      proposition: '',
      result: '',
      message: '',
      score: 0
    }

    this.generate = this.generate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generate() {
    const numb1 = Math.floor(Math.random() * 10 + 1);
    const numb2 = Math.floor(Math.random() * 10 + 1);
    const result = numb1 * numb2;

    this.state.multiplications.push({
      numb1: numb1,
      numb2: numb2,
      result: result
    });

    this.setState({
      multiplications: this.state.multiplications,
      proposition: `Combien font : ${numb1} par ${numb2}`
    })
  }

  componentDidMount() {
    this.generate();
  }

  handleSubmit(event) {
    event.preventDefault();

    const { result: resultUser, count, multiplications } = this.state;
    const { result: resultComputer } = multiplications[count];

    if (resultComputer === Number(resultUser)) {
      this.setState({
        score: this.state.score + 1,
        count: this.state.count + 1,
        message: `Bravo !`,
        result: ''
      });

    } else {
      this.setState({
        count: this.state.count + 1,
        message: `Dommage il fallait trouvé : ${resultComputer} !`,
        result: ''
      });
    }

    this.generate();
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      message: ''
    });
  }

  render() {

    const { count, proposition, result, message, score } = this.state;

    if (count >= MAX_MULTIPLICATION)
      return (
        <Redirect
          to={{
            pathname: "/score",
            state: { from: "/game", score: score }
          }}
        />
      )

    return (
      <div>
        {message !== '' && <p>{message}</p>}
        <p>Vous avez : {MAX_MULTIPLICATION - count} multiplication(s) à deviner ...</p>
        <p>{proposition}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              name="result"
              value={result}
              onChange={this.handleChange}
            />
          </p>
          <p><input type="submit" /></p>
        </form>
      </div>
    )
  }
}

export default Game;