import React, { Component } from 'react';
import { withRouter } from "react-router";

import {
    Link
} from "react-router-dom";

class NavLocation extends Component {


    render() {

        const { match, location, history } = this.props;

        const auth = location.state && location.state.auth || localStorage.getItem('auth') === 'true';

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

const NavWithRouter = withRouter(NavLocation);

export default NavWithRouter;