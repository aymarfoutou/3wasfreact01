import React, { useContext } from 'react';

import { NotesContext, MAX_NOTES } from '../reducer/notes';
import Notes from './Notes';
import Message from './Message';
import Average from './Average';

const Form = () => {
    const [state, dispatch] = useContext(NotesContext);

    const { notes, number, message, average } = state;

    const handleSet = e => {
        const { value, name } = e.target;

        dispatch({ type : "SET_NUMBER", number : value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch({ type : "ADD_NUMBER" });
    }


    return (
        <>
        {message != '' && <Message message={message} />}
        <form onSubmit={handleSubmit}>
            <div><input type="text" name="number" value={number} onChange={handleSet} /></div>
            <div><button>Add Number</button></div>
        </form>
         {notes.length >= MAX_NOTES && <Average />}
        { notes.length > 0 && <Notes notes={notes} />}
        </>

    );
}

export default Form;
