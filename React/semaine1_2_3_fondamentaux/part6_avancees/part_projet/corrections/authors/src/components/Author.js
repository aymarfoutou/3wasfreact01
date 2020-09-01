import React, { useState, useEffect, useContext } from 'react';

import { AuthorContext, calculAverage } from '../reducer/author';
import Form from './Form';

import './Author.css';

const Author = ({ name, passion, notes }) => {
    const [state, dispatch] = useContext(AuthorContext);
    const [average, setAverage] = useState(0);

    const { active } = state;

    const showPassions = () => {

        if (passion.length > 0)
            return (
                <ul>
                    {passion.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            )

        return null;
    }

    useEffect(() => {
        setAverage(calculAverage(notes))
    }, [notes]);

    return (
        <div className="Author">
            <div>Name : {name}</div>
            <div>Notes : {average}</div>
            <div><button className="btn btn-dark" onClick={() => dispatch({ type: "ACTIVE" })}>passions</button></div>
            {active && showPassions()}
            <Form label="add note" name={name} />
        </div>
    );
}

export default Author;
