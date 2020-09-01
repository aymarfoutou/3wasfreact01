import React, { useEffect } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from './components/Home';
import Nav from './components/Nav';
import Convert from './components/Convert';

import { Container } from './components/Grid';
import { getApiFixerRates } from './actions/actions-types';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const { isLoading, rates } = useSelector(state => state.rates);
  const disptach = useDispatch();

  useEffect(() => {
    disptach( getApiFixerRates() );
  }, []);

  if (isLoading)

    return (
      <Container>
        <p>Waiting ...</p>
      </Container>
    )

  return (
    <Router>
      <Container styles={["foo"]}>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/convert" component={Convert} />
          <Route path="/presentation" render={() => <p>Hello </p>
          } />
          <Route component={({ location }) => (<p>404 Page Not Found </p>)} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
