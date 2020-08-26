import React from 'react';

const Notes = ({ notes }) => {

    return (
        <ul>
            {notes.map((note, i) => <li key={i}>{note}</li>)}
        </ul>
    );
}

export default Notes;
