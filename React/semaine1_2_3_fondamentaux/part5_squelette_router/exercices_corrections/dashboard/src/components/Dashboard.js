import React, { Component } from 'react';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts : []
    }
   
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){

    // récupération des posts injectés par le parent (centraliser la gestion des données dans App.js le composant racine)
    this.setState({ posts : this.props.posts })
  }


  handleDelete(id){
    // on lit les posts dans le state puis on applique filter 
    const posts = this.state.posts.filter( p => p.id != id );

    this.setState(
      {
        posts : posts
      }
    )

    // lift state up : faire remonter l'état des posts au parent => une ré-hydratation des composants React de l'application
    this.props.updatePosts(posts);
  }

  render() {

    const { posts } = this.state;

    return (
      <>
        <h1>Dashboard</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
              {posts && posts.map((post, i) =>
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
