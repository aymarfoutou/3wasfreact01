
import React, { createContext } from 'react';

export const AuthorContext = createContext({});

export const initialState = {
    authors: [],
    average: 0,
    active: false,
    message: '',
    author: ''
};

export const calculAverage = notes => {
    if (notes.length > 0) {
        const averageAuthor = notes.reduce((acc, curr) => acc + curr) / notes.length;

        return Math.floor(averageAuthor * 100) / 100;
    }

    return "aucune note pour l'instant";
}

export const reducer = (state, action) => {

    switch (action.type) {

        case "FETCH_AUTHORS":

            return {
                ...state,
                authors: state.authors.concat(action.authors)
            }

        case "ACTIVE":

            return {
                ...state,
                active: !state.active
            }

        case "ADD_NOTE":

            const { name, note } = action;

            if (note.trim() === '' || isNaN(note)) {

                return {
                    ...state,
                    message: "Attention ce n'est pas un nombre",
                    author: name
                }
            }

            // travailler sur une copie des authors
            const updateAuthors = state.authors.map(author => {
                if (author.name === name)
                    return {
                        ...author,
                        notes: author.notes.concat(Number(note)),
                    }

                return author;
            })

            return {
                ...state,
                authors: updateAuthors,
                note: '',
                message : ''
            }

        default:

            return state;
    }
}