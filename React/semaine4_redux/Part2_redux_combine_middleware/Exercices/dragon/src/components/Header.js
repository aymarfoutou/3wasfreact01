import React, { useEffect } from 'react';

import {
    useSelector, 
    useDispatch
} from 'react-redux';
import { reverse_dragon_list, startCounter } from '../actions/actions-types';

const Header = () => {
    const { count, chronoCounter } = useSelector(state => { 

        return { 
            count : state.dragonReducer.count,
            chronoCounter : state.chrono.counter
        } 
    } );
    const dispatch = useDispatch();

    // Au montage du composant on déclenche le counter
    useEffect(()=>{
        dispatch(startCounter());
    }, []);

    return (
        <div className="Header-main">
            <p>Chrono : {chronoCounter}</p>
            <p> Dragon list number of dragon(s) {count}</p>
            <p><button onClick={() => dispatch(reverse_dragon_list())}>Reverse dragon list</button></p>
        </div>
    );
}

export default Header;
