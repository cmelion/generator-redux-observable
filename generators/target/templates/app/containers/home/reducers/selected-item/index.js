import HomeActionTypes from '../../actions/action-types';
import find from 'lodash/find';

export const EMPTY_ITEM = {
    _id: null,
    clients: [],
    createdBy: {},
    createdDate: null,
    description: '',
    history: [],
    lastModifiedBy: {},
    lastModifiedDate: null,
    name: '',
    products: [],
    recipients: [],
    status: {},
    itemId: null
};

const handleLoadItems = (state, payload)=> {
    let item = find(payload, {itemId: state.itemId});

    if (item && state.current) {
        return Object.assign({}, state, {current: item});
    }
    return item || state;
};

const handleLoadItemsPending = (state, payload)=> {
    let item;

    if (state.itemId === payload) {
        return state;
    }
    else if (payload) {
        item = Object.assign({}, EMPTY_ITEM, {itemId: payload});
    }

    return item || state;
};

//-------------------------------------------------------------------
// SELECTED ITEM STORE
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const selectedItem = (state = EMPTY_ITEM, {type, payload} = {}) => {

    switch (type) {
        case HomeActionTypes.CREATE_ITEM:
            return payload;
        case HomeActionTypes.SELECT_ITEM:
            return payload || EMPTY_ITEM;
        case HomeActionTypes.UPDATE_ITEM:
            return payload._id === state._id ? payload : state;
        case HomeActionTypes.LOAD_ITEMS:
            return handleLoadItems(state, payload);
        case HomeActionTypes.LOAD_ITEMS_PENDING:
            return handleLoadItemsPending(state, payload);
        default:
            return state;
    }
};
/* eslint-enable indent, complexity */
