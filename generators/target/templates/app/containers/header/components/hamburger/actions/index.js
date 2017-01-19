/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */
import ActionTypes from './action-types';

export const hamburgerMenuToggled = (isActive, target) => ({
    type: ActionTypes.TOGGLE_HAMBURGER,
    payload: {isActive: isActive, target: target}
});

const HamburgerMenuActions = {hamburgerMenuToggled};

export default HamburgerMenuActions;
