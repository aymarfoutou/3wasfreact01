import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { show_details } from '../actions/actions-types';

const Author = ({ name, bio, shop_name, books }) => {
    const dispatch = useDispatch();

    const handeClick = () => {
        dispatch(show_details(books))
    }

    return (
        <>
            <h1>{name}</h1>
            <p>Bio: {bio}</p>
            <p>Shop: {shop_name}</p>
            { books.length > 0 && (
                <p><button onClick={handeClick}>Show details</button></p>
            )}
        </>
    );
}

Author.propTypes = {
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    shop_name: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string),
};

export default Author;