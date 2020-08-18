import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <p>Home</p>
            </Route>
            <Route path="/login">
             <p>Login</p>
            </Route>
            <Route path="/dashboard">
              <p>Dashboard</p>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
