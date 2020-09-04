import {
    FETCH_AUTHORS, SHOW_DETAILS
} from "../constants/actions";

const stateInit = {
    authors : [],
    books : []
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case FETCH_AUTHORS:

            return {
                ...state,
                authors : state.authors.concat(action.payload)
            }

        case SHOW_DETAILS:

            return {
                ...state,
                books : action.payload
            }

        default:
            return state;
    }
}

export default reducer;