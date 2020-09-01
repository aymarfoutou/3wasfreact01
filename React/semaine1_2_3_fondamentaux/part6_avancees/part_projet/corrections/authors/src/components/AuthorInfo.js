import React, { useEffect, useContext } from 'react';
import { AuthorContext } from '../reducer/author';

const AuthorInfo = () => {
    const [state, dispatch] = useContext(AuthorContext);

    useEffect(() => {
        dispatch({ type : "GET_INFO_AUTHORS"})
    }, []);

    return (
        <>
            
        </>
    );
}

export default AuthorInfo;
