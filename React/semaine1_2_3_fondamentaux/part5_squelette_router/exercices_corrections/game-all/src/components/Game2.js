import React, { Component } from 'react';
import {
  Redirect
} from "react-router-dom";

const MAX_MULTIPLICATION = 10;

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
      status: true // le jeu peut continuer 
    }

    this.generate = this.generate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  generate() {

    if (this.state.multiplications.length > MAX_MULTIPLICATION) {

      this.setState({
        status: false
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

    // refactoring => synthétiser l'écriture du code pour lecture et optimisation, ici c'est pour la lisibilité
    let message, score;

    if (resultComputer === Number(resultUser)) {

      score = this.state.score + 1;
      message = "Bravo !";

      /*  --refactoring
      this.setState({
        score: this.state.score + 1,
        count: this.state.count + 1,
        message: `Bravo !`,
        result: ''
      }); */

    } else {

      score = this.state.score;
      message = `Dommage il fallait trouvé : ${resultComputer} !`;

       /*  --refactoring
      this.setState({
        count: this.state.count + 1,
        message: `Dommage il fallait trouvé : ${resultComputer} !`,
        result: ''
      });
      */
    }

    this.setState({
      message: message,
      score : score,
      result: '',
      count: this.state.count + 1,
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

  render() {

    const { count, proposition, result, message, score, multiplications } = this.state;

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