import LoginActionTypes from '../../containers/login/actions/action-types';

//-------------------------------------------------------------------
// USER STORE
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
export const user = (state = {}, {type, payload}) => {
    switch (type) {
        case LoginActionTypes.LOGIN_ERROR:
            return {};
        case LoginActionTypes.LOGIN_PENDING:
            return {email: payload.email};
        case LoginActionTypes.LOGOUT_FULFILLED:
            return {};
        case LoginActionTypes.LOGIN_FULFILLED:
            return payload;
        default:
            return state;
    }
};
