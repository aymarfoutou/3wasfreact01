import {
    SET_DRAGON,
    ADD_DRAGON,
    DELETE_DRAGON,
    REVERSE_DRAGON_LIST,
    SET_LOG,
    SET_KNIGHT,
    ADD_KNIGHT,
    DELETE_KNIGHT,
    SET_COUNTER,
    TIME
} from '../constants/actions';

import moment from 'moment';

// reducer dragon
export const set_dragon = payload => {
    return {
        type: SET_DRAGON, payload
    };
}

export const add_dragon = () => {
    return {
        type: ADD_DRAGON
    };
}

export const delete_dragon = payload => {

    console.log(payload, "DELETE");

    return {
        type: DELETE_DRAGON, payload
    };
}

export const reverse_dragon_list = () => {
    return {
        type: REVERSE_DRAGON_LIST
    };
}

// reducer log
export const set_log = payload => {
    return {
        type: SET_LOG, payload
    };
}

// reducer knight
export const set_knight = payload => {
    return {
        type: SET_KNIGHT, payload
    };
}

export const add_knight = () => {
    return {
        type: ADD_KNIGHT
    };
}

export const delete_knight = payload => {

    return {
        type: DELETE_KNIGHT, payload
    };
}

// reducer chrono
export const  set_counter = payload => {
  return {
    type: SET_COUNTER, payload
  };
}

let interval;


export const startCounter = () => {

   return dispatch => {
        interval= setInterval(() => {
            dispatch(set_counter(1)); // Se fait toutes les TIME (1s) de manière asynchrone
        }, TIME);
  };
};

// Fonctions utiles
export const checkElemExist = (elem, elems) => {

    if( elems.lenght === 0 ) return false;

    if( elems.find( d => d === elem ) ) return true;

    return false;
}

export const getDateNow = () => {

    return moment().format('DD MM YYYY hh:mm:ss');
}