import React from 'react';

import './Col.scss';

const Col = ({children}) => {
    return (
       <div className="Col-main">
           {children}
       </div>
    );
}

export default Col;
