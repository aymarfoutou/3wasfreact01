import {
    SET_KNIGHT,
    ADD_KNIGHT,
    DELETE_KNIGHT,
} from "../constants/actions";

import {
    checkElemExist
} from "../actions/actions-types";

const stateInit = {
    knights: [],
    knight: '',
    count: 0,
    message: ''
}

const reducer = (state = stateInit, action = {}) => {

    let knight, knights;

    switch (action.type) {

        case SET_KNIGHT:
            knight = action.payload;

            return {
                ...state,
                knight,
                message: ''
            }

        case ADD_KNIGHT:
            knight = state.knight;
            knights = state.knights;

            if (knight.trim() === '')
                return {
                    ...state,
                    message: `Attention votre champ de saisi est vide`,
                    knight: ''
                }

            if (checkElemExist(knight, knights) === true)
                return {
                    ...state,
                    message: `Attention le knight ${knight} existe déjà dans la liste `,
                    knight: ''
                }

            // On l'ajoute sinon dans un nouveau tableau
            knights = knights.concat(state.knight);

            return {
                ...state,
                knights,
                count: state.count + 1,
                knight: ''
            }

        case DELETE_KNIGHT:
            knight = action.payload;
            knights = [...state.knights];

            if (checkElemExist(knight, knights) === false)
                return {
                    ...state,
                    message: `Le knight ${knight} que vous essayez de supprimer n'existe pas `,
                    knight: ''
                }

            knights = knights.filter(d => d !== knight);

            return {
                ...state,
                knights,
                message: `votre knight ${knight} a bien été supprimé`,
                count: state.count - 1
            }

        default:
            return state;
    }
}

export default reducer;