import { combineReducers } from 'redux';

import author from './author';
import error from './error';
import load from './load';

export default combineReducers({
    error,
    load,
    author
});