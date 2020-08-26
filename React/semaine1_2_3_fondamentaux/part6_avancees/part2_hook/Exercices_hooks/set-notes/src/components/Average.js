import React, { useContext } from 'react';

import { NotesContext } from '../reducer/notes';

const Average = (props) => {
    const [state, dispatch] = useContext(NotesContext);

    const { average } = state;

    const handleAverage = () => {
        dispatch({ type: "AVERAGE" });
    }

    return (
        <div className="average">
           <p>{average}</p>
           <p><button onClick={handleAverage} >Average</button></p>
        </div>
    );
}

export default Average;
