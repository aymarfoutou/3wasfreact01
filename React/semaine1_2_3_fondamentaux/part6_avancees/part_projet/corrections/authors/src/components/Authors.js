import React, { useEffect } from 'react';
import Author from './Author';

const Authors = ({authors}) => {

    return (
        <>
        {authors.length > 0 && authors.map((author,i) => 
            <Author key={i} { ...author } />
        )}
        </>
    );
}

export default Authors;