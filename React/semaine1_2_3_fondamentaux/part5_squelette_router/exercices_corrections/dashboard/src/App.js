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
import Nav from './components/Nav'; // export default NavWithRouter on peut choisir le nom qu'on veut
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
      <Router>
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
                  ({location}) => {
                    localStorage.removeItem('auth'); // on supprime la clé dans le localstorage (persistence)

                    return (
                      <Redirect to={{ pathname: "/", state: { message: "vous êtes déconnecté", auth : false } }} />
                    )
                  }
                } />
                <Route path="/login" component={Login} />
                {/** location se trouve dans les props du router on les destructures (décomposition) puis on les passe au composant
                 * Post en proprs
                 */}
                <Route exact path="/" component={({ location }) => <Posts location={location} posts={posts} />} />
                <Route
                  exact path="/dashboard"
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
                {/** Page 404 */}
                <Route component={({ location }) => (<p>404 Page Not Found </p>)} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
