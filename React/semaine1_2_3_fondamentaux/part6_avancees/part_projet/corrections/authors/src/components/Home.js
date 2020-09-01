import React, { useContext } from 'react';

import { AuthorContext } from '../reducer/author';
import Authors from './Authors';

const Home = ({location}) => {
    const [state, dispatch] = useContext(AuthorContext);

    return (
        <Authors {...state} />
    );
}

export default Home;
