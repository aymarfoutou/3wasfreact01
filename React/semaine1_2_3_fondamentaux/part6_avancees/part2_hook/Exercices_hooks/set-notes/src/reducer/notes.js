
import React, { createContext } from 'react';

export const NotesContext = createContext({});

export const initialState = {
    notes : [17, 18]
};

export const reducer = (state, action) => {

    switch (action.type) {


        default:

            return state;
    }

}