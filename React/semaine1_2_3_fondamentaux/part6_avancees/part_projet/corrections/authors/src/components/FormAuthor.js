import React, { useContext, useState } from 'react';

import { AuthorContext } from '../reducer/author';
import Message from './Message';

const Form = ({ label, name }) => {
    const [state, dispatch] = useContext(AuthorContext);
    const { author, message } = state;
    const [note, setNote] = useState('');

    const handleSet = e => {
        const { value } = e.target;

        setNote(value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: "ADD_NOTE", name: name, note: note });
        setNote('');
    }

    const showMessage = message != '' && author === name;

    return (
        <>
            {showMessage != '' && <Message message={message} />}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input size="5" type="text" name="note" value={note} onChange={handleSet} className="form-control" placeholder="Note" />
                </div>
                <div><button className="btn btn-warning">{label}</button></div>
            </form>
        </>
    );
}

export default Form;