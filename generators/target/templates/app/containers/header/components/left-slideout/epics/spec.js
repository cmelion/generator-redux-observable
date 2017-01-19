/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach */

import Chai from 'chai'; // You can use any testing library
import {expectEpic} from 'redux-observable-test-helpers';
import LeftSlideoutEpics from '../epics';
import ActionTypes from '../actions/action-types';
import HamburgerActionTypes from '../../hamburger/actions/action-types';
import {api} from '../epics';

import {LEFT_NAV} from '../../../index';

// no-unused-vars fix for should
Chai.should();

/* eslint-disable camelcase, max-len, max-statements */
describe('Items Epics', () => {
    let call;

    beforeEach(() => {
        if (call && call.reset) {
            call.reset();
        }
    });

    describe('loadInfoEpic', () => {

        it('calls the correct API', () => {
            const response = [];

            expectEpic(LeftSlideoutEpics, {
                expected: ['-a', {
                    a: {type: ActionTypes.LOAD_INFO_FULFILLED, payload: response}
                }],
                action: ['a', {
                    a: {type: ActionTypes.LOAD_INFO_PENDING}
                }],
                response: ['-a', {
                    a: response
                }],
                call: call,
                callArgs: [api.loadInfo]
            });
        });

        it('handles LOAD_INFO_ERROR', () => {
            const FOO_ERROR = 'Foo Error';
            const response = {message: FOO_ERROR};

            expectEpic(LeftSlideoutEpics, {
                expected: ['-(a|)', {
                    a: {type: ActionTypes.LOAD_INFO_ERROR, payload: response}
                }],
                action: ['(a|)', {
                    a: {type: ActionTypes.LOAD_INFO_PENDING}
                }],
                response: ['-#', null, {xhr: {response}}],
                call: call,
                callArgs: [api.loadInfo]
            });
        });

        it('visibly notifies the user upon LOAD_INFO_ERROR', () => {
            const FOO_ERROR = 'Foo Error';
            const response = FOO_ERROR;
            /* eslint-disable quotes */
            const notification = {
                type: "ERROR",
                message: 'Loading Application Info failed: "' + response + '"'
            };
            /* eslint-enable quotes */

            expectEpic(LeftSlideoutEpics, {
                expected: ['a', {
                    a: {type: 'NEW_NOTIFICATION', payload: notification}
                }],
                action: ['a', {
                    a: {type: ActionTypes.LOAD_INFO_ERROR, payload: response}
                }],
                response: ['-a', {
                    a: response
                }],
                replace: {key: 'id', value:'any'}
            });
        });

    });

    describe('slideOutOpenEpic', () => {

        it('does trigger loadInfo if the target is LEFT_NAV', () => {
            expectEpic(LeftSlideoutEpics, {
                expected: ['a', {
                    a: {type: ActionTypes.LOAD_INFO_PENDING}
                }],
                action: ['a', {
                    a: {type: HamburgerActionTypes.TOGGLE_HAMBURGER, payload: {target: LEFT_NAV}}
                }],
                response: ['-']
            });
        });

        it('does not trigger loadInfo if the target is not LEFT_NAV', () => {
            expectEpic(LeftSlideoutEpics, {
                expected: ['-'],
                action: ['a|', {
                    a: {type: HamburgerActionTypes.TOGGLE_HAMBURGER, payload: {target: null}}
                }],
                response: ['-']
            });
        });

    });

});

