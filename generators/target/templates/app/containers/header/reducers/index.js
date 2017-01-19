/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import {hamburgerMenu} from '../components/hamburger/reducers';
import {info} from '../components/left-slideout/reducers';
import ActionTypes from '../../login/actions/action-types';

//-------------------------------------------------------------------
// LOGGING-IN REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent, complexity */
const loggingIn = (state = false, {type, payload}) => {

    switch (type) {
        case '@@router/LOCATION_CHANGE':
            return payload.pathname === '/login';  // should this path come from the router object instead of string?
        case ActionTypes.LOGIN:
            return false;
        case ActionTypes.LOGIN_PENDING:
            return true;
        default:
            return state;
    }
};

export {
    hamburgerMenu,
    info,
    loggingIn
};
