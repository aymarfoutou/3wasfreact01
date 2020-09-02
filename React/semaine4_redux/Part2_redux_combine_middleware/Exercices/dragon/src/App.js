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

    // mise à jour des logs dans le reducer log
    dispatch(set_log({
      count: count,
      date: getDateNow()
    }));

  }, [dispatch, count]); // useEffect regarde si le state count à changer par rapport à sa valeur précédente

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
