import React, { useEffect } from 'react';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import Dragons from './components/Dragons';
import Knights from './components/Knights';
import Container from './components/Container';
import Col from './components/Col';
import FormDragon from './components/FormDragon';
import FormKnight from './components/FormKnight';

import Header from './components/Header';

const App = () => {
  const { logs } = useSelector(state => {

    return {
      logs: state.logReducer.logs
    }
  });

  return (
    <Container>
      <Header />
      <Col>
        <FormDragon />
        <FormKnight />
        <ul>
          <li>Log(s) :</li>
          {logs.map((log, i) => <li key={i} >Date : {log.date} nb dragon(s) : {log.count}</li>)}
        </ul>
      </Col>
      <Col>
        <Dragons />
        <Knights />
      </Col>
    </Container>
  );
}

export default App;
