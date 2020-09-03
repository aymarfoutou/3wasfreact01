import React from 'react';

import {
    useSelector, useDispatch
} from 'react-redux';

import { set_knight, add_knight } from '../actions/actions-types';

import './Form.scss';

const FormKnight = () => {
    const { knight, message } = useSelector(state => state.knightReducer );
    const dispatch = useDispatch();

    const handleChange = e => {
        const { value: knight } = e.target;

        dispatch(set_knight(knight));
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(add_knight());
    }

    return (
        <>
        {/** Attention utilisez des parenthèses pour rendre du contenu multiple */}
            {message !== '' && (
                <div className="Form-error">
                    <p>{message}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        onChange={handleChange}
                        value={knight}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    );
}

export default FormKnight;