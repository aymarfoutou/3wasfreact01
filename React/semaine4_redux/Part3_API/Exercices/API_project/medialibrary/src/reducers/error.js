import {
    SET_ERROR
} from "../constants/actions";

const stateInit = {
    errors : []
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case SET_ERROR:

            return {
                ...state,
                errors : state.errors.concat(action.payload)
            }

        default:
            return state;
    }
}

export default reducer;