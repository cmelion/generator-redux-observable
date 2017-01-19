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
import {error, BAD_THINGS_HAPPENED, LOGGING_IN_MESSAGE, LOGIN_ERROR_MSG} from './index';
import LoginActionTypes from '../../containers/login/actions/action-types';
import HomeActionTypes from '../../containers/home/actions/action-types';

describe('error reducer', () => {
    const payload = {foo: 'bar'}, state = {};

    describe('LOGIN_ERROR', ()=> {
        it('should should inform the user if BAD_THINGS_HAPPENED', ()=> {
            expect(error(state, {type: LoginActionTypes.LOGIN_ERROR, payload: payload})).to.eql(
                {message: BAD_THINGS_HAPPENED}
            );
        });

        it('should should inform the user if BAD_THINGS_HAPPENED even if no payload/status was returned', ()=> {
            expect(error(state, {type: LoginActionTypes.LOGIN_ERROR, payload: undefined})).to.eql(
                {message: BAD_THINGS_HAPPENED}
            );
        });

        it('should should inform the user if LOGIN_ERROR_MSG was returned', ()=> {
            let unathorizedPayload = {
                status: 401
            };

            expect(error(state, {type: LoginActionTypes.LOGIN_ERROR, payload: unathorizedPayload})).to.eql(
                {message: LOGIN_ERROR_MSG}
            );
        });
    });

    describe('LOGIN_PENDING', ()=> {
        it('should should let the user know login is in progress', ()=> {
            expect(error(state, {type: LoginActionTypes.LOGIN_PENDING, payload: payload})).to.eql(
                {message: LOGGING_IN_MESSAGE}
            );
        });

    });

    describe('ITEM_ERROR', ()=> {
        it('should set payload as state', ()=> {
            expect(error(state, {type: HomeActionTypes.ITEM_ERROR, payload: payload})).to.eql(payload);
        });
    });

    describe('default', ()=> {
        it('should set state to null', ()=> {
            expect(error(state, {type: 'some action type', payload: payload})).to.eql(null);
        });
    });
});
