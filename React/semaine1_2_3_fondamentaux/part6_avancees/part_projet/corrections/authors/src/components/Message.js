import React from 'react';

const Message = ({ message }) => {

    return (
        <div className="alert alert-primary">
            <p>{message}</p>
        </div>
    );
}

export default Message;