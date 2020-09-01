import React, { useEffect } from 'react';
import Message from '../Message';

import { useDispatch, useSelector } from 'react-redux'


import { useInput, useSelect } from './CustomFields';
import FormGroup from '../Grid/FormGroup';

import { getApiFixer, fetch_authors_async, set_currency } from '../../actions/actions-types';

const Form = ({ label, name }) => {
    const { value: amount, bind: bindInput } = useInput({ initialValue: '' });
    const { curr, rates, defaultCurrency } = useSelector(state => {
        return {
            curr: state.currency,
            rates: [...state.rates.rates.keys()],
            defaultCurrency: state.rates.default
        }
    }
    );

    const { value: currency, bind: bindSelect } = useSelect({ initialValue: 'EUR' })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getApiFixer(amount));
    }, [amount])

    return (
        <>
            <h2>Convert currency default : {currency} </h2>
            <FormGroup label="amount">
                <input type="text" {...bindInput} />
            </FormGroup>
            <FormGroup label="amount">
                <select {...bindSelect}  >
                    {rates.map((rate,i) => <option key={i} value={rate}>{rate}</option>)}
                </select>
            </FormGroup>
        </>
    );
}

export default Form;