import React from 'react';

import {getStatusById} from '../../../../../../config';
export const StatusColumn = ({data}) => {

    return (
        <span className="status">{getStatusById(data).label}</span>
    );
};
