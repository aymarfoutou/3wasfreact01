import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../Styles/Container';
import Author from './Author';
import Col from '../Styles/Col';
import Footer from '../Styles/Footer';

const Home = () => {

  const { authors, isLoading, books } = useSelector(
    state => ({ 
      authors: state.author.authors, 
      isLoading: state.load.isLoading,
      books : state.author.books
    })
  );

  if (isLoading === false)
    return (
      <Container>
        <Col ch="n" bg="#ff9ce6" >
          {authors.map((author, i) => <Author key={i} {...author} />)}
        </Col>
        <Col ch="c" bg="#c93384" >
          {books.length >0  &&
            <ul>
              <h3>Liste de livres</h3>
              {books.map((book, i) => (
                <li>{book}</li>
              ))}
            </ul>
          }
        </Col>
        <Footer>
          <p>Footer</p>
        </Footer>
      </Container>
    )

  return (
    <Container>
      <p>Is loading ....</p>
    </Container>
  )
}

export default Home;