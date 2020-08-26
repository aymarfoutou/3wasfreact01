
import React, { useReducer } from 'react';

import { initialState, reducer, NotesContext } from './reducer/notes';

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NotesContext.Provider value={[state, dispatch]}>
            {children}
        </NotesContext.Provider>
    );
}

export default Provider;