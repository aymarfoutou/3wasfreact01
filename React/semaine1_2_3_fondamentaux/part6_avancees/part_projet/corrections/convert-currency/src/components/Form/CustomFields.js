import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const useInput = ({ initialValue }) => {

    const [value, setValue] = useState(initialValue);

    return {
        value,
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

useInput.propTypes = {
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

const useSelect = ({ initialValue }) => {
    const [value, setValue] = useState(initialValue);
    
    return {
        value,
        bind: {
            value,
            onChange: e => {
                const { value } = e.target;
                setValue(value);
            }
        }
    }
};

useSelect.propTypes = {
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    // options: PropTypes.shape({
    //     name: PropTypes.string,
    //     value: PropTypes.oneOfType([
    //         PropTypes.string,
    //         PropTypes.number,
    //     ]),
    //     selected: PropsTypes.string
    // })
};

export { useInput, useSelect };