import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";

class TableMultiplication extends Component {

  render() {
    // on renomme la variable id en number pour plus de clarté dans le code
    const { id: tableNumber } = this.props.match.params;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <table>
        <thead>
          <tr>
            <td> <h1>Table : {tableNumber} </h1></td>
          </tr>
        </thead>
        <tbody>
          {numbers.map((num, i) => <tr key={i}><td >{tableNumber * num}</td></tr>)}
        </tbody>
      </table>
    )
  }
}
export default TableMultiplication;
