import {LOGIN, LOGIN_ERROR} from '../actions';

//-------------------------------------------------------------------
// LOGIN STORE
//-------------------------------------------------------------------
export const loggedIn = (state = false, {type, payload}) => {
    /* eslint-disable indent */
    switch (type) {
        case LOGIN:
            //TODO: Investigate side-effects middleware
            // note: setting the bearer token here makes this reducer impure
            //       this is a quick and dirty fix to enable authentication
            XMLHttpRequest.setBearerToken(payload.token);
            return true;
        case LOGIN_ERROR:
            return false;
        default:
            return payload && /(401|403)/.test(payload.status) ? false : state;
    }
};
