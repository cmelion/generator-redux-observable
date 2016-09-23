//TODO:  Should this be moved to the login component?

import {LOGIN, LOGIN_ERROR} from '../../components/login/actions';

//-------------------------------------------------------------------
// User ITEM STORE
//-------------------------------------------------------------------
export const user = (state = {}, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN:
            return payload;
        case LOGIN_ERROR:
            return {};
        default:
            return state;
    }
};
