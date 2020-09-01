import React from 'react';

import {
    useSelector
} from 'react-redux';

const Header = () => {
    const { count } = useSelector(state => state);

    return (
        <div className="Header-main">
            <p> Dragon list number of dragon(s) {count}</p>
        </div>
    );
}

export default Header;
