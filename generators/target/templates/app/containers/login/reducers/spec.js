/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it*/
import {expect} from 'chai';
import {loggedIn} from './index';
import ActionTypes from '../actions/action-types';

describe('loggedIn Reducer', () => {

    describe('LOGIN', ()=> {
        const action = {type: ActionTypes.LOGIN_FULFILLED, payload: {token: 'foo'}};

        it('should set loggedIn to true', ()=> {
            expect(loggedIn(false, action)).to.equal(true);
        });

    });

    describe('LOGIN_ERROR', ()=> {

        it('should set loggedIn to false', ()=> {
            const action = {type: ActionTypes.LOGIN_ERROR};
            expect(loggedIn(false, action)).to.equal(false);
        });
    });

    describe('LOGIN_PENDING', () => {
        let expectedState = false,
            action = {type: ActionTypes.LOGIN_PENDING};

        it('should set current state to TRUE if the ActionType is LOGGING_PENDING', ()=> {
            expect(loggedIn(undefined, action)).to.equal(expectedState);
        });
    });

    describe('LOGOUT', ()=> {

        it('should set loggedIn to false', ()=> {
            const action = {type: ActionTypes.LOGOUT_FULFILLED};
            expect(loggedIn(false, action)).to.equal(false);
        });
    });

    describe('default', () => {

        it('should not change the current state', () => {
            let action = {type: ''};
            expect(loggedIn(false, action)).to.equal(false);
            expect(loggedIn(true, action)).to.equal(true);
        });

        it('should set the state to false if payload.status is 401', () => {
            const action = {type: '', payload: {status: 401}};
            expect(loggedIn(true, action)).to.equal(false);
        });

        it('should set the state to false if payload.status is403', () => {
            const action = {type: '', payload: {status: 403}};
            expect(loggedIn(true, action)).to.equal(false);
        });
    });
});
