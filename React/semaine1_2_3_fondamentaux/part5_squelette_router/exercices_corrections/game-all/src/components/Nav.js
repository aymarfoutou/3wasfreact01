import React, { Component } from 'react';
import {
  NavLink
} from "react-router-dom";

import './Nav.scss';

class Nav extends Component {

  render() {

    return (
      <ul>
        <li>
          <NavLink exact activeClassName="selected" to="/">Home</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/multiplications">Multiplications</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/game">Game</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/game2">Game 2</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/game3">Game 3</NavLink>
        </li>
      </ul>
    )
  }
}
export default Nav;