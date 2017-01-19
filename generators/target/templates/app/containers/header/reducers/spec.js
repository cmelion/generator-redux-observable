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
import {loggingIn} from './index';

import ActionTypes from '../../login/actions/action-types';

describe('loggingIn state reducer', () => {
    describe('Navigation', () => {
        let expectedState,
            route,
            action,
            type = '@@router/LOCATION_CHANGE';

        it('should set state to TRUE if the ActionType is @@router/LOCATION_CHANGE and pathname is /login', () => {
            expectedState = true;
            route = '/login';
            action = {type: type, payload: {pathname: route}};
            expect(loggingIn(undefined, action)).to.equal(expectedState);
        });

        it('should set state to FALSE if the ActionType is @@router/LOCATION_CHANGE and pathname is not /login', () => {
            expectedState = false;
            route = '/foo';
            action = {type: type, payload: {pathname: route}};
            expect(loggingIn(undefined, action)).to.equal(expectedState);
        });
    });

    describe('LOGIN', () => {
        let expectedState = false,
            action = {type: ActionTypes.LOGIN};

        it('should set current state to FALSE if the ActionType is LOGGING_IN', () => {
            expect(loggingIn(undefined, action)).to.equal(expectedState);
        });
    });

    describe('LOGIN_PENDING', () => {
        let expectedState = true,
            action = {type: ActionTypes.LOGIN_PENDING};

        it('should set current state to TRUE if the ActionType is LOGIN_PENDING', () => {
            expect(loggingIn(undefined, action)).to.equal(expectedState);
        });
    });

    describe('DEFAULT', () => {
        let expectedState = false,
            action = {type: 'foo'};

        it('should set current state to FALSE if the default branch was followed', () => {
            expect(loggingIn(undefined, action)).to.equal(expectedState);
            expect(loggingIn(expectedState, action)).to.equal(expectedState);
        });
    });
});
