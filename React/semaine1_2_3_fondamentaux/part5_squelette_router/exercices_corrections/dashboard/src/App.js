import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
} from "react-router-dom";

import Posts from './components/Posts';

class App extends Component {

  render() {

    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-md">
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
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <Switch>
                <Route exact path="/">
                  <Posts />
                </Route>
                <Route exact path="/login">
                  <p>Login</p>
                </Route>
                <Route path="/dashboard">
                  <p>Dashboard</p>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
