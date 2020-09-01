import { 
    SET_CURRENCY, 
    INIT_RATES 
} from '../constants/actions';

import axios from 'axios';

const API_KEY_FIXER = process.env.REACT_APP_API_FIXER || null;
const DEFAULT_DATE ='latest';

export const set_currency = payload => {
    return {
        type: SET_CURRENCY, payload
    };
}

export const initRates = payload => {
    return {
        type: INIT_RATES, payload
    };
}

export const getApiFixer = (amount, historical = DEFAULT_DATE) => {

    return dispatch => {

        const getAxiosApi = async () => {
            const { data } = await axios.get(`http://data.fixer.io/api/${historical}?access_key=${API_KEY_FIXER}`);
            const { base, date, rates } = data; 
        }

        getAxiosApi();
    };
}

export const getApiFixerRates = (historical = DEFAULT_DATE) => {
    return dispatch => {

        const getAxiosApi = async () => {
            const { data } = await axios.get(`http://data.fixer.io/api/${historical}?access_key=${API_KEY_FIXER}`);
            const { rates } = data; 

            console.log(rates)
            dispatch( initRates(rates) );
        }

        getAxiosApi();
    };
}

/*
service payant

http://data.fixer.io/api/convert

    ? access_key = YOUR_ACCESS_KEY
    & from = USD
    & to = EUR
    & amount = 25

*/