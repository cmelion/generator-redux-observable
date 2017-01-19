/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import LoginActionTypes from '../../containers/login/actions/action-types';
import HomeActionTypes from '../../containers/home/actions/action-types';

export const LOGGING_IN_MESSAGE = 'Logging in ...';
export const LOGIN_ERROR_MSG = 'Email and/or password not recognized. Please try again';
export const BAD_THINGS_HAPPENED =
    'The server is experiencing technical difficulties, please contact your administrator';
//-------------------------------------------------------------------
// Error STORE
//-------------------------------------------------------------------
/* eslint-disable indent, max-depth, complexity */
export const error = (state = null, {type, payload}) => {
    switch (type) {
        case LoginActionTypes.LOGIN_ERROR:
            if (payload) {
                switch (payload.status) {
                    case 401:
                        return {message: LOGIN_ERROR_MSG};

                    default:
                        return {message: BAD_THINGS_HAPPENED};
                }
            } else {
                return {message: BAD_THINGS_HAPPENED};
            }
        case LoginActionTypes.LOGIN_PENDING:
            return {message: LOGGING_IN_MESSAGE};

        case HomeActionTypes.ITEM_ERROR:
            return payload;

        default:
            return null;
    }
};
