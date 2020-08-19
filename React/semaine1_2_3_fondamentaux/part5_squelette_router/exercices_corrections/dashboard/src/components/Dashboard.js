import React, { Component } from 'react';

import POSTS from '../data_posts';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      posts: POSTS
    });
  
  }

  handleDelete(id){
    const posts = this.state.posts.filter( p => p.id != id );

    this.setState(
      {
        posts : posts
      }
    )

    this.props.updatePosts(posts);
  }

  render() {

    const { posts } = this.state;

    return (
      <>
        <h1>Dashboard</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
              {posts && posts.map((post, i) =>
                <tr>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td><button class="btn btn-danger" onClick={ () => this.handleDelete(post.id)}>Delete</button></td>
                </tr>
              )}
          </tbody>
        </table >
      </>
    )
  }

}


export default Dashboard;
