
import React, { createContext } from 'react';

export const NotesContext = createContext({});

export const initialState = {
    notes: [17, 18],
    number: '',
    message: '',
    average : 0
};

export const MAX_NOTES = 3;

export const reducer = (state, action) => {

    switch (action.type) {

        case "SET_NUMBER":

            return {
                ...state,
                number: action.number,
                message: ''
            }

        case "AVERAGE":

            if(state.notes.length <= 1){

                return {
                    ...state,
                    message : "Attention on ne peut pas calculer la moyenne"
                }
            }

            let sum = state.notes.reduce((curr, acc) => curr + acc )/(state.notes.length);
            sum = Math.floor(sum * 100) / 100;

            return {
                ...state,
                average : sum
            }

        case "ADD_NUMBER": {

            if (state.number.trim() === '' || isNaN(state.number)) {

                return {
                    ...state,
                    message: "Attention ce n'est pas un nombre"
                }
            }

            if (state.notes.length >= MAX_NOTES) {

                return {
                    ...state,
                    message: "Attention vous ne pouvez plus ajouter de notes"
                }
            }

            return {
                ...state,
                notes: state.notes.concat(Number( state.number ) ), // concat renvoie un nouveau tableau nouvelle référence
                number: ''
            }
        }

        default:

            return state;
    }

}