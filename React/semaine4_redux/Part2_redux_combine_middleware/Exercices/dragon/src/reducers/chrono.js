import {
   SET_COUNTER
} from "../constants/actions";

const stateInit = {
   counter : 0
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case SET_COUNTER:

            return {
                ...state,
               counter : state.counter + action.payload
            }

        default:
            return state;
    }
}

export default reducer;