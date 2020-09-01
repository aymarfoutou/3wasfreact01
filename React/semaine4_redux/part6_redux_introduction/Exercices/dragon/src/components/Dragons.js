import React from 'react';
import {
    useSelector
} from 'react-redux';

import Dragon from './Dragon';

const Dragons = () => {
    const { dragons } = useSelector(state => state);

    if (dragons.length > 0)
        return (
            <div className="Dragons-principal">
                {dragons.map((dragon, i) => (
                    <Dragon
                        key={i}
                        dragon={dragon}
                    />
                ))}
            </div>
        );

    return (
        <p>Désolé aucun dragon dans la base</p>
    )
}

export default Dragons;
