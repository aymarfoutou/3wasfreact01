import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import Multiplications from './components/Multiplications';
import TableMultiplication from './components/TableMultiplication';
import Game from './components/Game';
import Game2 from './components/Game2';
import Game3 from './components/Game3';

import Score from './components/Score';

const numberTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class App extends Component {

  render() {

    return (
      <Router >
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/multiplications" component={({ location }) => <Multiplications location={location} numberTable={numberTable} />} />
          <Route path="/multiplications/:id" component={TableMultiplication} />
          <Route path="/game" component={Game} />
          <Route path="/game2" component={Game2} />
          <Route path="/game3" component={Game3} />
          <Route path="/score" component={Score} />
          <Route component={({ location }) => (<p>404 Page Not Found </p>)} />
        </Switch>
      </Router>
    )
  }
}
export default App;