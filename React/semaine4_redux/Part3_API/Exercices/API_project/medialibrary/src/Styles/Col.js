import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.aside( props => css`
        grid-area: "${props.ch}";
        background-color : ${props.bg};
`);

const Col = ({ children, ch, bg }) => {
    return (
        <Wrapper
            ch={ch}
            bg={bg}
        >
            {children}
        </Wrapper>
    );
}

Col.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    ch: PropTypes.oneOf(['n', 'c']).isRequired,
    bg: PropTypes.string.isRequired
};

export default Col;