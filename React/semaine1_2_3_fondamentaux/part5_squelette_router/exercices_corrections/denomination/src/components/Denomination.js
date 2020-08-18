import React, { Component } from 'react';

const denomination = [1, 5, 10, 20, 50, 100, 200]

class Denomination extends Component {

    render() {

        return (
            <div >
                <ul>
                    <h2>Liste de token disponibles</h2>
                    {denomination.map((token, i) =>
                        <li key={i} >{token}</li>
                    )}
                </ul>
                <form>
                    TODO faire la sais utilisateur avec state
                </form>
            </div>
        )
    }
}

// export du composant
export default Denomination;
