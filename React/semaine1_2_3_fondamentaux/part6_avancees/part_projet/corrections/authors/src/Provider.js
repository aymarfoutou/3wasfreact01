
import React, { useReducer, useEffect } from 'react';

import authors from './authors';

import { initialState, reducer, AuthorContext } from './reducer/author';

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "FETCH_AUTHORS", authors: authors })
    }, [])

    return (
        <AuthorContext.Provider value={[state, dispatch]}>
            {children}
        </AuthorContext.Provider>
    );
}

export default Provider;