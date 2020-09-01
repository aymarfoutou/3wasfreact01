import React from 'react';

import Dragons from './components/Dragons';
import Container from './components/Container';
import Col from './components/Col';
import Form from './components/Form';
import Header from './components/Header';

const App = () => {
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
