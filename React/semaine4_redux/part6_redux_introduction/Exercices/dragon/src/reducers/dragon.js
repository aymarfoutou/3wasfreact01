import {
    SET_DRAGON,
    ADD_DRAGON,
    DELETE_DRAGON
} from "../constants/actions";

import {
    checkDragonExist
} from "../actions/actions-types";

const stateInit = {
    dragons: [
        "Apalala",
        "Balaur",
        "Bolla"
    ],
    dragon: '',
    count: 3,
    message: ''
}

const reducer = (state = stateInit, action = {}) => {

    let dragon, dragons;

    switch (action.type) {

        case SET_DRAGON:
            dragon = action.payload;

            return {
                ...state,
                dragon,
                message: ''
            }

        case ADD_DRAGON:
            dragon = state.dragon;
            dragons = state.dragons;

            if (dragon.trim() === '')
                return {
                    ...state,
                    message: `Attention votre champ de saisi est vide`,
                    dragon: ''
                }

            if (checkDragonExist(dragon, dragons) === true)
                return {
                    ...state,
                    message: `Attention le dragon ${dragon} existe déjà dans la liste `,
                    dragon: ''
                }

            // On l'ajoute sinon dans un nouveau tableau
            dragons = dragons.concat(state.dragon);

            return {
                ...state,
                dragons,
                count: state.count + 1,
                dragon: ''
            }

        case DELETE_DRAGON:
            dragon = action.payload;
            dragons = state.dragons.filter(d => d !== dragon);

            // si on travaille avec des données sur un serveur (...)
            if (checkDragonExist(dragon, dragons) === false)
                return {
                    ...state,
                    message: `Le dragon ${dragon} que vous essayez de supprimer n'existe pas `,
                    dragon: ''
                }

            return {
                ...state,
                dragons,
                message: `votre dragon ${dragon} a bien été supprimé`,
                count: state.count - 1
            }

        default:
            return state;
    }
}

export default reducer;