import React, { Component } from 'react';

import POSTS from '../data_posts';

class Dashboard extends Component {

  render() {

    console.log(this.props)

    const { message } = this.props.location.state;

    return (
      <>
      <p>Dashboard board hello</p>
      { message ? <p>{message}</p> : null }
      </>
    )
  }

}


export default Dashboard;
