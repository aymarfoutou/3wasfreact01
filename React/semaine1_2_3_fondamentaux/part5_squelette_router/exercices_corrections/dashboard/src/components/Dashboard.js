import React, { Component } from 'react';

import {
  Link
} from "react-router-dom";

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      title: '',
      content: '',
      message : ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    // récupération des posts injectés par le parent (centraliser la gestion des données dans App.js le composant racine)
    this.setState({ posts: this.props.posts })
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, content } = this.state;

    if(title.trim() === '') {

      this.setState({
        message : "Attention vous devez mettre au moins un titre à votre post"
      })

      return;
    }

    const post = {
      id: Math.random().toString(36).slice(2),
      title: title,
      content: content
    }
    this.state.posts.push(post);
    this.setState({ posts: this.state.posts, title : '', content : '' });

    // mise à jour pour la page d'accueil
    this.props.updatePosts(this.state.posts);
  }


  handleDelete(id) {
    // on lit les posts dans le state puis on applique filter 
    const posts = this.state.posts.filter(p => p.id != id);

    this.setState(
      {
        posts: posts,

      }

    )

    // lift state up : faire remonter l'état des posts au parent => une ré-hydratation des composants React de l'application
    this.props.updatePosts(posts);
  }

  render() {

    const { posts, title, content, message } = this.state;

    return (
      <>
        <h1>Dashboard</h1>
        {message != '' && <p>{message}</p>}
        <form onSubmit={this.handleSubmit}>
                <p>
                    <label>
                        Title :
                    
                    <input
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                    </label>
                </p>
                <label>
                    Content :
                    <textarea name="content" value={content} onChange={this.handleChange} />
                </label>
                <p><input className="btn btn-dark" type="submit" value="add" /></p>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 && posts.map((post, i) =>
              <tr key={i}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td><button className="btn btn-danger" onClick={() => this.handleDelete(post.id)}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table >
      </>
    )
  }

}


export default Dashboard;
