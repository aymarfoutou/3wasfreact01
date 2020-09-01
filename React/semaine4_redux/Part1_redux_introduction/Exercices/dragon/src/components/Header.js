import React from 'react';

import {
    useSelector, 
    useDispatch
} from 'react-redux';
import { reverse_dragon_list } from '../actions/actions-types';

const Header = () => {
    const { count } = useSelector(state => state.dragonReducer );
    const dispatch = useDispatch();

    return (
        <div className="Header-main">
            <p> Dragon list number of dragon(s) {count}</p>
            <p><button onClick={() => dispatch(reverse_dragon_list())}>Reverse dragon list</button></p>
        </div>
    );
}

export default Header;
