import React, { Component } from 'react';

const denomination = [1, 5, 10, 20, 50, 100, 200]

class Denomination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        // 1. D'abord je le fais sur papier
        // 2. après je le code directement ici
        // 3. après je refactore dans une methode de classe
    }

    render() {
        const { amount } = this.state;

        return (
            <div >
                <ul>
                    <h2>Liste de token disponibles</h2>
                    {denomination.map((token, i) =>
                        <li key={i} >{token}</li>
                    )}
                </ul>
                <form onSubmit={ this.handleSubmit }>
                    <p>
                        <input
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p><input type="submit" /></p>
                </form>

                TODO calcul des tokens rendu de la monnaie {amount}
            </div>
        )
    }
}

// export du composant
export default Denomination;
