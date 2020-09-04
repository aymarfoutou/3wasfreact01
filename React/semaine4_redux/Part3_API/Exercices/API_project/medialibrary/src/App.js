import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Home from './components/Home';
import Navigation from './components/Navigation';

import GlobalStyle from './Styles/Globalstyle';
import Container from './Styles/Container';
import Header from './Styles/Header';

const App = () => {

  return (
    <Router>
      <GlobalStyle />
      <Container plain >
        <Header>
          <Navigation />
        </Header>
      </Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={() => <p>Add author</p>} />
        <Route component={({ location }) => (<p>404 Page Not Found </p>)} />
      </Switch>
    </Router>
  )
}

export default App;