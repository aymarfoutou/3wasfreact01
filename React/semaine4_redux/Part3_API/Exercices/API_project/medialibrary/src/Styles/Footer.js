import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Wrapper = styled.footer`
        grid-area: f;   
`;

const Footer = ({ children}) => {
    return (
        <Wrapper >
            {children}
        </Wrapper>
    );
}

Footer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default Footer;