import React, { Component } from 'react';

class Post extends Component {

  render() {

    const { post } = this.props.location.state;

    if(post)
      return (
        <>
          <h1>Première solution</h1>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )

    return (
      <p>Désolé il n'y pas de post ...</p>
    )
  }
}


export default Post;
