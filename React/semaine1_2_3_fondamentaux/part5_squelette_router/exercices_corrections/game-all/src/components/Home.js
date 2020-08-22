import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";

class Home extends Component {

  render() {

    return (
      <div>
        <p>Présentation du jeu</p>
        <p>Table de multiplication aller directement aux tables : <Link to="/multiplications">Tables</Link></p>
      </div>
    )
  }
}
export default Home;
