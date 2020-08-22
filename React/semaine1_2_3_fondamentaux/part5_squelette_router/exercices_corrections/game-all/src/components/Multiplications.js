import React, { Component } from 'react';

// fichier 
import './Multiplications.scss';

import {
  NavLink
} from "react-router-dom";

class Multiplications extends Component {

  render() {
    const { numberTable } = this.props;

    console.log(numberTable);

    return (
      <nav className="Mult-nav">
        <ul>
          <li>Tables :</li>
          {numberTable.map((num, i) =>
            <li key={i}>
              <NavLink
              to={`/multiplications/${num}`} >Table {num} de multiplication </NavLink></li>)
          }
        </ul>
      </nav>
    )
  }
}
export default Multiplications;
