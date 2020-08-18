import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

const POSTS = [
  { id: 16, title: "React JS", content: "Libraire ou Framework ?" },
  { id: 11, title: "React Native", content: "Mobile React" },
  { id: 100, title: "Angular", content: "Super ..." },
  { id: 7, title: "Symfony", content: "Framework expressif ..." },
  { id: 27, title: "MongoDB", content: "Base de données NoSQL" },
];

class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState(
      { posts: POSTS }
    )
  }

  render() {

    const { posts } = this.state;

    return (
      <ul>
        {posts.map((post, i) =>
          <li key={i}><Link to={`/post/${post.id}`}>{post.title}</Link> </li>
        )}
      </ul>
    )
  }
}


export default Posts;
