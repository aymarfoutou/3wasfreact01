import React from 'react';

import {
    NavLink
} from "react-router-dom";

const Nav = ({ navigation, location }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Authors</a>
            <div className="" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">HOME</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/convert">Convert</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/presentation">Presentation</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;