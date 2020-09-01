import React from 'react';
import PropTypes from 'prop-types';

import './Grid.scss';

const Container = ({ children, styles }) => {
    const classes = (styles || []).concat(['container', '']).join(' ') ;
    
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

Container.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.string),
};

export default Container;
