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
import {error} from './index';
import {LOGIN_ERROR} from '../../components/login/actions';
import {ITEM_ERROR} from '../../actions';

describe('Error Reducer', () => {
    const payload = {foo: 'bar'};
    const state = {};

    describe('LOGIN_ERROR', ()=> {
        it('should set payload as state', ()=> {
            expect(error(state, {type: LOGIN_ERROR, payload: payload})).to.eql(payload);
        });
    });

    describe('ITEM_ERROR', ()=> {
        it('should set payload as state', ()=> {
            expect(error(state, {type: ITEM_ERROR, payload: payload})).to.eql(payload);
        });
    });

    describe('default', ()=> {
        it('should set state to null', ()=> {
            expect(error(state, {type: 'some action type', payload: payload})).to.eql(null);
        });
    });
});
