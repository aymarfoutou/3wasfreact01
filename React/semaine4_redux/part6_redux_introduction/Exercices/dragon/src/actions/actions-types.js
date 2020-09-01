import {
    SET_DRAGON,
    ADD_DRAGON,
    DELETE_DRAGON,
    REVERSE_DRAGON_LIST
} from '../constants/actions';

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
    return {
        type: DELETE_DRAGON, payload
    };
}

export const reverse_dragon_list = () => {
    return {
        type: REVERSE_DRAGON_LIST
    };
}

// Fonctions utiles
export const checkDragonExist = (dragon, dragons) => {
  
    if(dragons.lenght === 0 ) return false;

    if( dragons.find( d => d === dragon ) ) return true;

    return false;
}