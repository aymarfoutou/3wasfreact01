import React from 'react';

import { Container, Row, Col } from './Grid';

const Home = ({location}) => {

    return (
        <Container>
            <Row>
                <Col>
                    <p >Hello React</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;