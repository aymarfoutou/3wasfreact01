import {
    SET_DRAGON,
    ADD_DRAGON,
    DELETE_DRAGON
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

// Fonctions utiles
export const checkDragonExist = (dragon, dragons) => {
  
    if(dragons.lenght === 0 ) return false;

    if( dragons.find( d => d === dragon ) ) return true;

    return false;
}