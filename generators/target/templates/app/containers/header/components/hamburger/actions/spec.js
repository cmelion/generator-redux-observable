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
import Actions from './index';
import ActionTypes from './action-types';

describe('hamburgerMenuToggled', () => {
    const isActive = true;
    const target = 'foo';
    it('should return an action of type TOGGLE_HAMBURGER', () => {
        expect(Actions.hamburgerMenuToggled(isActive, target).type).to.equal(ActionTypes.TOGGLE_HAMBURGER);
    });

    it('should return an action with the expected payload', () => {
        expect(Actions.hamburgerMenuToggled(isActive, target).payload).to.deep.equal({
            isActive: isActive,
            target: target
        });
    });
});

