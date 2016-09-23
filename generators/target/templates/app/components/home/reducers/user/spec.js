/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it */
import {expect} from 'chai';
import {user} from './index';
import {LOGIN, LOGIN_ERROR} from '../../components/login/actions';

describe('user Reducer', () => {
    const payload = {foo: 'bar'};
    const state = {};

    describe('LOGIN', ()=> {
        it('should set loggedIn to true', ()=> {
            expect(user(state, {type: LOGIN, payload: payload})).to.equal(payload);
        });
    });

    describe('LOGIN_ERROR', ()=> {
        it('should set loggedIn to true', ()=> {
            expect(user(state, {type: LOGIN_ERROR, payload: payload})).to.eql({});
        });
    });

    describe('default', () => {
        it('should set the default loggedIn value to false', () => {
            expect(user(state, {type: '', payload: payload})).to.equal(state);
        });
    });
});
