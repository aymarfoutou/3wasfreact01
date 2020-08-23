import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";

import Timer from './Timer'

const MAX_MULTIPLICATION = 5;
const TIMER = 10;

class Game2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      multiplications: [],
      proposition: '',
      result: '',
      message: '',
      score: 0,
      isSubmit: false,
      timer: 0,
    }

    this.generate = this.generate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generate(start = false) {

    if (this.state.multiplications.length > MAX_MULTIPLICATION) {

      this.setState({
        message: "Toutes les combinaisons de calcul ont été proposé"
      })

      return;
    };

    let numb1 = Math.floor(Math.random() * 10 + 1); // 3  7
    let numb2 = Math.floor(Math.random() * 10 + 1); // 7  3

    while (true) {
      let flag = true;
      // on parcourt les choix déjà proposés
      for (const m of this.state.multiplications) {
        // si on trouve un choix déjà présent dans le tableau on passe le flag à true et on break
        if ((m.numb1 === numb1 && m.numb2 === numb2) || (m.numb2 === numb1 && m.numb1 === numb2)) { flag = false; break };
      }

      // si le flag est resté à false on break car ce choix n'a pas été fait
      if (flag === true) break;

      // sinon on recalcule
      numb1 = Math.floor(Math.random() * 10 + 1);
      numb2 = Math.floor(Math.random() * 10 + 1);
    }

    let result = numb1 * numb2;

    this.state.multiplications.push({
      numb1: numb1,
      numb2: numb2,
      result: result
    });

    // on relance le jeu en attendant un peu
    this.setState({
      multiplications: this.state.multiplications,
      proposition: `Combien font : ${numb1} par ${numb2}`,
      count: start === true ? 0 : this.state.count + 1
    })
  }

  componentDidMount() {
    this.generate(true);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { result: resultUser, count, multiplications } = this.state;
    const { result: resultComputer } = multiplications[count];

    let score, message;

    if (resultComputer === Number(resultUser)) {
      score = this.state.score + 1;
      message = "Bravo !"
    } else {
      score = this.state.score;
      message = `Dommage il fallait trouvé : ${resultComputer}`;
    }

    this.setState({
      score: score,
      count: this.state.count + 1,
      message: message,
      result: '',
      timer: TIMER,
      isSubmit : true
    });

    this.generate();
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      message: ''
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timer === TIMER) {
      
      // waiting ...
      setTimeout(() => {
        this.setState({ timer: 0, });
        if(this.state.isSubmit === false) this.generate()
      }, 1000);
    }

  }

  render() {

    const { timer, count, proposition, result, message, score, multiplications } = this.state;

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
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {message !== '' && <p>{message}</p>}
            <p>Vous avez : {MAX_MULTIPLICATION - count} multiplication(s) à deviner ...</p>
            <p>{proposition}</p>
            <p>{timer === TIMER ? "waiting ..." : <Timer getTimer={(timer) => this.setState({ timer: timer, isSubmit : false })} />}</p>
            <form onSubmit={this.handleSubmit}>
              <p>
                <input
                  name="result"
                  value={result}
                  onChange={this.handleChange}
                  disabled={ timer === 0 || timer === TIMER}
                />
              </p>
              <p><input type="submit" /></p>
            </form>
          </div>
          <div className="col-md-4">
            {multiplications.map((p, i) => (
              <p key={i}>Number 1 : {p.numb1} Number 2 : {p.numb2}, score : {score} </p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Game2;