import React from 'react';
import get from 'lodash/get';
import {getClientById, getProductById} from '../../../../../../config';

/* eslint-disable no-shadow, max-len*/
export const ListColumn = ({data, metadata}) => {
    let column = metadata.columnName;
    let list;
    /* eslint-disable indent */
    switch (column) {
        case 'products' :
            list = data.map((value) => get(getProductById(value), 'label'));
            break;
        case 'clients' :
            list = data.map((value) => get(getClientById(value), 'label'));
            break;
        default :
            list = data;
    }
    /* eslint-enable indent */

    return (
        <ul className="list">
            {
                list.map(
                    (item, index) => (
                        <li key={item + '-' + index}>{item}</li>
                    )
                )
            }
        </ul>
    );
};
