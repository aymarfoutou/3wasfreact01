import React, { Component  } from 'react';
import {
  Link
} from "react-router-dom";

class Posts extends Component {

  render() {
    const { location, posts } = this.props; // voir le router dans App.js  context du Router on récupère les props

    // gestion des messages dans cette partie
    const message = location.state && location.state.message ? location.state.message : null;

    return (
      <>
      { message && <p>{message}</p> }
      <ul>
        <h2>Une première version un peu geek ...</h2>
        {posts.length > 0 ? posts.map((post, i) =>
          <li key={i}><Link
            // ceci est passé en props dans le composant Link
            to={{
              pathname: `/post/${post.id}`, // paramètre de react-router-dom
              state : { post : post }  // nous ajoutons une clé à l'objet pour passer notre post
            }}>{post.title}</Link></li>
        ): 
            <li>Désolé il n'y pas de posts</li>
        }
      </ul>
      </>
    )
  }
}

export default Posts;

/*
pour rechercher un élément dans le tableau on utilise la méthode find sur un tableau

const POSTS = [
  { id: 16, title: "React JS", content: "Libraire ou Framework ?" },
  { id: 11, title: "React Native", content: "Mobile React" },
  { id: 100, title: "Angular", content: "Super ..." },
  { id: 7, title: "Symfony", content: "Framework expressif ..." },
  { id: 27, title: "MongoDB", content: "Base de données NoSQL" },
];

POSTS.find(p => p.id === 11) 
//  { id: 11, title: "React Native", content: "Mobile React" },

*/
