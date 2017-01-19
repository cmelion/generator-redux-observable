import React from 'react';

export const HTMLColumn = ({data}) => {

    return (
        <div dangerouslySetInnerHTML={{ __html: data} }/>
    );
};
