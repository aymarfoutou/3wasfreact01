import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

import Posts from './components/Posts';
import Post from './components/Post';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {

  render() {

    const token = false;

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
                  <Link to={{
                    pathname: '/dashboard',
                    state: { from: '/', message: '' }
                  }}>Dashboard</Link>
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
                  <Login />
                </Route>
                <Route exact path="/dashboard"

                  // rest props et le spread operateur permet de faire une copie des props
                  // la raison du spread c'est d'avoir une copie des props pour la mise à jour des
                  // valeurs
                  render={rest => token ? <Dashboard {...rest} /> :
                    <Redirect to={{
                      pathname: '/login',
                      state: { from: '/', message: 'probleme de connexion' }
                    }} />}

                />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
