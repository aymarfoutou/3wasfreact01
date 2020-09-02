import { combineReducers } from 'redux';

import dragon from './dragon';
import log from './log';
import knight from './knight';

export default combineReducers({
    dragonReducer : dragon,
    logReducer : log,
    knightReducer : knight
});