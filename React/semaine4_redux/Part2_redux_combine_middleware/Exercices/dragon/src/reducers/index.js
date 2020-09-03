import { combineReducers } from 'redux';

import dragon from './dragon';
import log from './log';
import knight from './knight';
import chrono from './chrono';

export default combineReducers({
    dragonReducer : dragon,
    logReducer : log,
    knightReducer : knight,
    chrono : chrono
});