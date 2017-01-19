import {clients, products, statuses} from './demo-common';
import find from 'lodash/find';
import memoize from 'lodash/memoize';
import deepFreeze from 'deep-freeze';

const getObject = (list, value) =>{
    let obj = find(list, {value: value});
    return obj ? deepFreeze(obj) : undefined;
};

export const getStatusById = memoize((value)=> getObject(statuses, value));
export const getProductById = memoize((value)=> getObject(products, value));
export const getClientById = memoize((value)=> getObject(clients, value));
