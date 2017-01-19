
/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global beforeEach, afterEach, describe, it,  */

import Chai from 'chai'; // You can use any testing library
import {expectEpic, MockXMLHttpRequest} from 'redux-observable-test-helpers';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';
import LoginEpics from './index';
import {api} from '../epics';
import {push} from 'react-router-redux';
import {
    newNotification, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS, REMOVE_ALL_NOTIFICATIONS
} from 'minimal-react-redux-notify';
//import global from '../../../../../test/helpers/globals';

// no-unused-vars fix for should
Chai.should();

/* eslint-disable max-statements, camelcase, max-len */

describe('Epics', ()=> {
    let call, gXHR;

    beforeEach(() => {
        gXHR = global.XMLHttpRequest;

        global.XMLHttpRequest = MockXMLHttpRequest;

        global.XMLHttpRequest.setBearerToken = function setBearerToken(token) {
            return token;
        };

        global.XMLHttpRequest.clearBearerToken = function clearBearerToken(token) {
            return token;
        };

        if (call && call.reset) {
            call.reset();
        }
    });

    afterEach(() => {
        MockXMLHttpRequest.clearRequest();
        global.XMLHttpRequest = gXHR;
    });

    describe('loggedInEpic', () => {
        it('triggers the userLoggedOut action when logout action creator is called', () => {
            const payload = {response: {foo: 'bar'}};

            expectEpic(LoginEpics, {
                expected: ['(abc)', {
                    a: push('/home'),
                    b: {type: REMOVE_ALL_NOTIFICATIONS},
                    c: newNotification(NOTIFICATION_TYPE_SUCCESS, 'Login successful!')
                }],
                action: ['a', {a: Actions.userAuthenticated(payload)}],  // LOGIN_FULFILLED
                response: ['-a']
            });
        });
    });

    describe('loginEpic', () => {
        it('triggers the LOGIN_FULFILLED action when login action creator is called', () => {
            const user = {email: 'a@b.com', password: 'password'};
            const response = {email: 'a@b.com', token: 'ABC123'};

            expectEpic(LoginEpics, {
                expected: ['-a', {a: {type: ActionTypes.LOGIN_FULFILLED, payload: response}}],
                action: ['(a)', {a: Actions.login(user)}], // LOGIN_PENDING
                response: ['-a', {a: {response: response}}],
                call: call,
                callArgs: [
                    api.login,
                    {type: ActionTypes.LOGIN_PENDING, payload: user}
                ]
            });
        });

        it('triggers the LOGIN_ERROR action when LOGIN action creator/loginEpic call fails', () => {
            const user = [{email: 'a@b.com', password: 'password'}];
            const response = { message : 'error'};

            expectEpic(LoginEpics, {
                expected: ['-a', {a: {type: ActionTypes.LOGIN_ERROR, payload: response}}],
                action: ['(a)', {a: Actions.login(user)}], // LOGIN_PENDING
                response: ['-#', null, {xhr: {response}}],
                call: call,
                callArgs: [
                    api.login,
                    {type: ActionTypes.LOGIN_PENDING, payload: user}
                ]
            });
        });

    });

    describe('loginErrorEpic', () => {
        it('displays a visible notification that an error occured', () => {
            const error = {
                xhr: {},
                message: 'response-message'
            };

            expectEpic(LoginEpics, {
                expected: ['a', {a: newNotification(NOTIFICATION_TYPE_ERROR, 'Login failed! ' + error.message)}],
                action: ['a', {a: Actions.loginError(error)}],  // LOGIN_ERROR
                response: ['-a']
            });
        });
    });

    describe('logoutEpic', () => {
        it('triggers the userLoggedOut action when logout action creator is called', () => {

            expectEpic(LoginEpics, {
                expected: ['a|', {a: {type: ActionTypes.LOGOUT_FULFILLED}}],
                action: ['a|', {a: Actions.logout()}],  // LOGOUT_PENDING
                response: ['-a']
            });
        });
    });
});
