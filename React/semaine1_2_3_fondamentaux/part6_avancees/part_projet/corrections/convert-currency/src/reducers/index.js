import { combineReducers } from 'redux';
import convert from './convert';
import rates from './rates';

export default combineReducers({
    convert,
    rates
});