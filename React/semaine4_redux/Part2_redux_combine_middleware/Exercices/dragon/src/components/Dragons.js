import React from 'react';
import {
    useSelector
} from 'react-redux';

import Dragon from './Dragon';

const Dragons = () => {
    // vous devez récupérer spécifiquement la clés dragon correspondante à ce reducer
    const { dragons } = useSelector(state => state.dragonReducer );

    console.log(dragons)

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
