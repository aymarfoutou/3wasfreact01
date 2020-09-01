import React from 'react';

const Container = ({ children, nav, left }) => {

    return (
        <div className="container">
            {nav}
            <div className="row">
                <div className="col-md-8 author">
                    {children}
                </div>
                <div className="col-md-4 info">
                    {left}
                </div>
            </div>
        </div>
    );
}

export default Container;
