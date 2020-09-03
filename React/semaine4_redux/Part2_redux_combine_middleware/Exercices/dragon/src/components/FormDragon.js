import React from 'react';

import {
    useSelector, useDispatch
} from 'react-redux';

import { set_dragon, add_dragon } from '../actions/actions-types';

import './Form.scss';

const FormDragon = () => {
    const { dragon, message } = useSelector(state => state.dragonReducer );
    const dispatch = useDispatch();

    const handleChange = e => {
        const { value: dragon } = e.target;

        dispatch(set_dragon(dragon));
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(add_dragon());
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
                        value={dragon}
                    />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </>
    );
}

export default FormDragon;
