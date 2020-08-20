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

import POSTS, { authors } from './data_posts';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

  }

  componentDidMount() {
    this.setState(
      { posts: POSTS }
    )
  }

  render() {

    const { posts } = this.state;

    return (
      <Router >
        <div className="container">
          <div className="row">
            <div className="col-md">
              <Nav />
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <Switch>
                <Route path="/logout" render={
                  () => {
                    localStorage.removeItem('auth');

                    return (
                      <Redirect to={{ pathname: "/", state: { message: "vous êtes déconnecté" } }} />
                    )
                  }
                } />
                <Route path="/login" component={Login} />
                <Route exact path="/"  component={({children, ...rest }) => <Posts { ...rest } posts={posts} />} />
                <Route
                  path="/dashboard"
                  render={({ location }) =>
                    localStorage.getItem('auth') === 'true' ||
                      (location.state && location.state.auth) ? (
                        <Dashboard 
                          posts={posts} 
                          updatePosts={(posts) => this.setState({ posts: posts })} // lift state up faire remonter l'état au parent des posts
                        />
                      ) : (
                        <Redirect
                          to={{
                            pathname: "/login",
                            state: { from: location }
                          }}
                        />
                      )
                  }
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
