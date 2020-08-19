import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Posts from './components/Posts';
import Post from './components/Post';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  render() {

    console.log(this.props);

    return (
      <Router >
        <div className="container">
          <div className="row">
            <div className="col-md">
              <Nav  />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <Switch>
              <Route path="/logout" render={
                ({children, ...rest}) => { 

                  localStorage.removeItem('auth');

                  return(
                    <Redirect to={ { pathname : "/" , state : { message : "vous êtes déconnecté"}}} />
                  )
                }
              } />

                <Route path="/login" component={Login} />
                <Route exact path="/" component={Posts} />
                <PrivateRoute path="/dashboard">
                  <Dashboard />
                </PrivateRoute>
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
