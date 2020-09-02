import React from 'react';
import {
    useSelector
} from 'react-redux';

import Knight from './Knight';

import './Knight.scss';

const Knights = () => {
    const { knights } = useSelector(state => state.knightReducer );

    if (knights.length > 0)
        return (
            <div className="Knight-principal">
                <h2>Knight(s)</h2>
                {knights.map((knight, i) => (
                    <Knight
                        key={i}
                        knight={knight}
                    />
                ))}
            </div>
        );

    return (
        <p>Désolé aucun Knight dans la base</p>
    )
}

export default Knights;