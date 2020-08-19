import React, { Component } from 'react';

import {
    Route,
    Redirect
} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('auth') === 'true' ||
                    (location.state && location.state.auth) ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;