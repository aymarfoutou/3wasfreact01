import { SET_CURRENCY, INIT_RATES } from "../constants/actions";

const stateInit = {
    currency: '',
    rates : []
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case SET_CURRENCY:

            return {
                ...state,
                currency: action.payload
            }

        case INIT_RATES: {

            const rates = action.payload;

            return {
                ...state,
                rates
            }
        }

        default:
            return state;
    }
}

export default reducer;