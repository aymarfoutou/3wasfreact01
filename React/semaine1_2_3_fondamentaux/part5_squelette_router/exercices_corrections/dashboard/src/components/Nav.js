import React, { Component } from 'react';

// context API ou redux (on voir plus tard ...)
import { withRouter } from "react-router";

import {
    Link
} from "react-router-dom";

class NavLocation extends Component {

    render() {
        const { match, location, history } = this.props; // router
        const auth = location.state && location.state.auth || localStorage.getItem('auth') === 'true';
        console.log(this.props)
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {auth ? <Link to='/logout' >logout</Link> :
                        <Link to='/login' >login</Link>
                    }
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        )
    }
}

// withRouter c'est une fonction qui permet de passer les props du router au composant NavLocation React
// en l'occurence lorsque le state du router change le composant NavLocation récupère ces changements
// automatiquement
const NavWithRouter = withRouter(NavLocation); // contextualisé notre composant avec les props du Router

export default NavWithRouter;