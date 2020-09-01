import {
    SET_LOG
} from "../constants/actions";

const stateInit = {
    logs: [] // [ { date : "2020-09-01 00:00:00", count : 1} ]
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case SET_LOG:
            const { count, date } = action.payload;

            // copie profonde (nested) d'objet
            const logs = state.logs.map( log => {

                return { ...log }
            } ) ;

            logs.push({ count : count, date : date });

            return {
                ...state,
                logs
            }

        default:
            return state;
    }
}

export default reducer;