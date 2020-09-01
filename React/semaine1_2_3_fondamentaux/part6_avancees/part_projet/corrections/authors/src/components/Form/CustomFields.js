

import { useState } from "react";

const useInput = ({ value, name }) => {

    const [value, setValue] = useState(value);

    return {
        value,
        name,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: e => {
                const { value, name } = e.target;
                setValue(value);
            }
        }
    };
};

const useSelect = ({ value, options, selected }) => {
    const [value, setValue] = useState(value);

    return {
        options: options.map((option, i) => (<option selected value={option}>{option}</option>)),
        bind: {
            value,
            onChange: e => {
                const { value, name } = e.target;
                setValue(value);
            }
        }
    }
};

export { useInput, useSelect };