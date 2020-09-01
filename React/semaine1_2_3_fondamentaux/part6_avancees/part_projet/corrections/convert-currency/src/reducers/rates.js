import { INIT_RATES } from "../constants/actions";

const stateInit = {
   rates : new Map(),
   isLoading : true,
   default : 'EUR'
}

const reducer = (state = stateInit, action = {}) => {

    switch (action.type) {

        case INIT_RATES :
            const ratesApi = action.payload;
            const rates = new Map(state.rates);

            for(const r in ratesApi){
                rates.set(r, ratesApi[r]);
            }

            return {
                ...state,
                rates,
                isLoading : false
            }
        
        default:
            return state;
    }
}

export default reducer;