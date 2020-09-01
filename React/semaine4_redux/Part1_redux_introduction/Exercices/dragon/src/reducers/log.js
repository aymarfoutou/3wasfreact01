import {
    SET_LOG
} from "../constants/actions";

const stateInit = {
    logs: new Map() // comme un dictionnaire clé/valeur
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case SET_LOG:
            const {count, date } = action.payload;
            const logs = new Map(state.logs);
            logs.set(date, count); // clé date et count la valeur associée à la clé

            return {
                ...state,
                logs
            }

        default:
            return state;
    }
}

export default reducer;