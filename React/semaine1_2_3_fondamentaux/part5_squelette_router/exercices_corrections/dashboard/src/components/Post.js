import React, { Component } from 'react';

import POSTS from '../data_posts';

class Post extends Component {

  render() {

    // première solution vous passez par le state de location
    const { post } = this.props.location.state;

    // deuxième solution
    const { id }  = this.props.match.params; 
    const post2 = POSTS.find( post => post.id == id );

    // console.log(post2, id, POSTS );

    if(post)
      return (
        <>
          <h1>Première solution</h1>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )

    if(post2)
    return (
      <>
        <h1>Deuxième solution solution</h1>
        <h2>{post2.title}</h2>
        <p>{post2.content}</p>
      </>
    )

    return (
      <p>Désolé il n'y pas de post ...</p>
    )
  }
}


export default Post;
