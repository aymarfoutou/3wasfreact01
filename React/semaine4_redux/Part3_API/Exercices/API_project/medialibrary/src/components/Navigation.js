import React, { Component } from 'react';

// context API ou redux (on voir plus tard ...)
import { withRouter } from "react-router";

import {
    NavLink
} from "react-router-dom";

import Nav from '../Styles/Nav';

class NavLocation extends Component {

    render() {
        const { match, location, history } = this.props; // router
        const auth = location.state && location.state.auth || localStorage.getItem('auth') === 'true';
        console.log(this.props)
        return (
            <Nav role="navigation" >
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' >Add author</NavLink>
                    </li>
                </ul>
            </Nav>
        )
    }
}

// withRouter c'est une fonction qui permet de passer les props du router au composant NavLocation React
// en l'occurence lorsque le state du router change le composant NavLocation récupère ces changements
// automatiquement
const NavWithRouter = withRouter(NavLocation); // contextualisé notre composant avec les props du Router

export default NavWithRouter;