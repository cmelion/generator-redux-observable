import ItemActionTypes from '../../actions/action-types';
import {hasSameId, patchDefaultValues} from '../../../../utils/item';

//-------------------------------------------------------------------
// ITEMS STORE
//-------------------------------------------------------------------
/* eslint-disable complexity */
export const items = (state = [], {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case ItemActionTypes.CREATE_ITEM:
            return [...state, payload];
        case ItemActionTypes.DELETE_ITEM:
            return state.filter(item => {
                return !hasSameId(item, payload);
            });
        case ItemActionTypes.ITEM_ERROR:
            /* eslint-disable no-console */
            console.error('error', payload);
            /* eslint-enable no-console */
            return state;
        case ItemActionTypes.LOAD_ITEMS:
            //Columns do not render for undefined fields
            return payload.map(patchDefaultValues);
        case ItemActionTypes.UPDATE_ITEM:
        case ItemActionTypes.PATCH_ITEM:
            return state.map(item => {
                return hasSameId(item, payload) ? patchDefaultValues(payload) : item;
            });
        default:
            return state;
    }
    /* eslint-enable indent */
};
/* eslint-enable complexity */
