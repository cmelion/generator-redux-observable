/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import ActionTypes from '../actions/action-types';

//-------------------------------------------------------------------
// CSS HAMBURGER MENU REDUCER
//-------------------------------------------------------------------
/* eslint-disable indent */
export const hamburgerMenu = (state = {isActive: false, target: undefined}, {type, payload}) => {

    switch (type) {
        case ActionTypes.TOGGLE_HAMBURGER:
            return {isActive: payload.isActive, target: payload.target};

        default:
            return state;
    }
};
