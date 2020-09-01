import React, { useEffect } from 'react';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import Dragons from './components/Dragons';
import Container from './components/Container';
import Col from './components/Col';
import Form from './components/Form';
import Header from './components/Header';

import { set_log, getDateNow } from './actions/actions-types';

const App = () => {
  const { count, logs } = useSelector(state => {

    return {
      count: state.dragonReducer.count,
      logs: state.logReducer.logs
    }
  });
  const dispatch = useDispatch();

  // à chaque fois que l'on ajoute un dragon on dispatch la date dans les log avec le nombre de dragon(s)
  useEffect(() => {

    dispatch(set_log({
      count: count,
      date: getDateNow()
    }));

  }, [count]);

  console.log(logs);

  return (
    <Container>
      <Header />
      <Col>
        <Form />
      </Col>
      <Col>
        <Dragons />
      </Col>
    </Container>
  );
}

export default App;
