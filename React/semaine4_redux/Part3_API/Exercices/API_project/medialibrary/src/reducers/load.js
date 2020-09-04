import {
    LOADING
} from "../constants/actions";

const stateInit = {
    isLoading : true
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case LOADING:

            return {
                ...state,
                isLoading : action.payload
            }

        default:
            return state;
    }
}

export default reducer;