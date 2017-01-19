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
import LoginActions from './index';
import ActionTypes from './action-types';

describe('Actions', () => {

    describe('login', () => {
        it('should return an action of type LOGIN_PENDING', () => {
            expect(LoginActions.login().type).to.equal(ActionTypes.LOGIN_PENDING);
        });
    });

    describe('userAuthenticated', () => {
        it('should return an action of type LOGIN', () => {
            expect(LoginActions.userAuthenticated({
                payload: {response: {}}
            }).type).to.equal(ActionTypes.LOGIN_FULFILLED);
        });
    });

    describe('logout', () => {
        it('should return an action of type LOGOUT_PENDING', () => {
            expect(LoginActions.logout().type).to.equal(ActionTypes.LOGOUT_PENDING);
        });
    });

    describe('userLoggedOut', () => {
        it('should return an action of type LOGOUT', () => {
            expect(LoginActions.userLoggedOut().type).to.equal(ActionTypes.LOGOUT_FULFILLED);
        });
    });

    describe('showLogin', () => {
        it('should create a router push action', () => {
            expect(LoginActions.showLogin().type).to.equal('@@router/CALL_HISTORY_METHOD');
        });
    });
});
