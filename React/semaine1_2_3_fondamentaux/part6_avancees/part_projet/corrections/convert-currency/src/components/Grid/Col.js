import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ children, styles }) => {
    const classes = (styles || []).concat(['row']).join(' ') ;

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

Col.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.string),
};

export default Col;