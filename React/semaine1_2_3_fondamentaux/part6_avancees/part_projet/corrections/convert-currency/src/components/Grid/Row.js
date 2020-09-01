import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, styles }) => {
    const classes = (styles || []).concat(['row']).join(' ') ;
    
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

Row.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.string),
};

export default Row;
