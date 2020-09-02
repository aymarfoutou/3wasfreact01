import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; // contextualiser le store
import reducer from './reducers/index'; // on récupère dragon & log

import { ADD_DRAGON, DELETE_DRAGON } from './constants/actions';
import { set_log, getDateNow } from './actions/actions-types';

const middlewareLog = store => next => action => {
  
  console.log("avant l'action", store.getState().dragonReducer);

  const returnAction = next(action); // SET_DRAGON, ...

  console.log("après l'action", store.getState().dragonReducer);
  console.log(store.getState().dragonReducer)

  //boucle infini
  // store.dispatch({ type : ADD_DRAGON , dragon : "dragon" })

  return returnAction;
}

const store = createStore(reducer, applyMiddleware(middlewareLog));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
