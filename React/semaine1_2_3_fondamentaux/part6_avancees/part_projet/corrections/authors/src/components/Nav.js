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
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add/author">Add author</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;