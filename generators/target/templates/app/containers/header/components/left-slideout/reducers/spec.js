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
import {info} from './index';

import ActionTypes from '../actions/action-types';

describe('Left Nav reducer', () => {
    describe('info', () => {
        const type = ActionTypes.LOAD_INFO_FULFILLED;
        const payload = {foo: 'bar'};

        it('should set current state to expectedState if the ActionType is LOAD_INFO_FULFILLED', function() {
            expect(info(undefined, {type, payload})).to.deep.equal(payload);
        });

        it('should provide a default state', function() {
            expect(info(undefined, {type:'foo', payload})).to.deep.equal({version: 'loading...'});
        });

        it('should handle null state', function() {
            expect(info(null, {type:'foo', payload})).to.equal(null);
        });
    });
});
