import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';
import { load_authors } from '../actions/actions-types';

const  configureStore = ( preloadedState = {} ) => {
    const middlewares = [ thunkMiddleware ];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

    store.dispatch( load_authors() );

    return store;
}

export default configureStore;