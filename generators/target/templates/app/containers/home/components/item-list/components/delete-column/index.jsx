import React from 'react';
import ActionTypes from '../../../../actions/action-types';

export const DeleteColumn = ({rowData, metadata}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        metadata.onDelete(rowData, ActionTypes.DELETE_ITEM);
    };

    return (
        <button className="delete-column-button"
                onClick={handleClick}>
            <i>close</i>
        </button>
    );
};
