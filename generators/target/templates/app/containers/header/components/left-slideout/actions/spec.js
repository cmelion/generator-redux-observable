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

describe('Left Slideout Actions', () => {

    describe('infoLoaded', () => {
        const info = {foo: 'bar'};

        it('should return an action of type LOAD_INFO_FULFILLED', () => {
            expect(Actions.infoLoaded(info).type).to.equal(ActionTypes.LOAD_INFO_FULFILLED);
        });

        it('should return the info payload', () => {
            expect(Actions.infoLoaded(info).payload).to.equal(info);
        });

    });

    describe('loadInfo', () => {

        it('should return an action of type LOAD_INFO_FULFILLED', () => {
            expect(Actions.loadInfo().type).to.equal(ActionTypes.LOAD_INFO_PENDING);
        });

    });

    describe('loadInfoError', () => {

        it('should return an action of type LOAD_INFO_ERROR', () => {
            const error = {
                message: 'message',
                xhr: {

                    response: 'response-message'
                }
            };
            expect(Actions.loadInfoError(error).type).to.equal(ActionTypes.LOAD_INFO_ERROR);
        });

        it('should favor the xhr.response object over the error message', () => {
            const error = {
                message: 'message',
                xhr: {

                    response: 'response-message'
                }
            };
            expect(Actions.loadInfoError(error).payload).to.equal(error.xhr.response);
        });

        it('should return the error message', () => {
            const error = {
                message: 'message',
                xhr: {}
            };
            expect(Actions.loadInfoError(error).payload).to.equal(error.message);
        });

        it('should return the xhr response object', () => {
            const error = {
                xhr: {
                    response: 'response-message'
                }
            };
            expect(Actions.loadInfoError(error).payload).to.equal(error.xhr.response);
        });

    });

});

