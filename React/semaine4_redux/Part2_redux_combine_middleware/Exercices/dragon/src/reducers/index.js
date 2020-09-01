import { combineReducers } from 'redux';

import dragon from './dragon';
import log from './log';

export default combineReducers({
    dragonReducer : dragon,
    logReducer : log
});