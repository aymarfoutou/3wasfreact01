import React from 'react';
import Container from './components/Container';
import AuthorInfo from './components/AuthorInfo';
import Nav from './components/Nav';
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

const App = () => {


  return (
    <Router>
      <Container left={<AuthorInfo />} nav={<Nav />} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add/author" component={() =><p>Form</p>} />
          <Route component={({ location }) => (<p>404 Page Not Found </p>)} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
