/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it */
import {expect} from 'chai';
import {hamburgerMenu} from './index';

import ActionTypes from '../actions/action-types';

describe('hamburgerMenu reducer', () => {
    describe('Toggle Hamburger Menu', () => {
        const type = ActionTypes.TOGGLE_HAMBURGER;
        const payload = {
            isActive: true,
            target: 'foo'
        };

        it('should set current state to expectedState if the ActionType is TOGGLE_HAMBURGER', function() {
            expect(hamburgerMenu(undefined, {type, payload})).to.deep.equal(payload);
        });

        it('should provide a default state', function() {
            expect(hamburgerMenu(null, {type:'foo', payload})).to.deep.equal(null);
        });
    });
});
