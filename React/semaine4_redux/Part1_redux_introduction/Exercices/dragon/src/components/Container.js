import React from 'react';

import './Container.scss';

const Container = ({children}) => {
    return (
       <div className="Container-main">
           {children}
       </div>
    );
}

export default Container;
