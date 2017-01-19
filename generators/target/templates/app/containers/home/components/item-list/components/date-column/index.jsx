import React from 'react';
import moment from 'moment';

/* eslint-disable no-shadow, max-len*/
export const DateColumn = ({data}) => {
    return (
        <span className="date">{new moment(data).fromNow()}</span>
    );
};
