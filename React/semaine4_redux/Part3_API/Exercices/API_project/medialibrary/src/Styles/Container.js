import React from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

const Wrapper = styled.section`
    display: grid;
    grid-template-areas: "h h"
                         "n c"
                         "f f";
    @media screen and (max-width: 600px ){
        grid-template-areas: "h"
        "n"
        "c"
        "f";
    }
`;

const WrapperPlain = styled.section`
    grid-template-areas: "h";
`;

const Container = ({ children, plain }) => {

    if(plain)
        return(
            <WrapperPlain>
                {children}
            </WrapperPlain>
        )

    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    plain : PropTypes.string
};

export default Container;