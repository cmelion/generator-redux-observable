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
import <%=epicname%>Epics from '../epics';
import ActionTypes from '../actions/action-types';
import {api} from '../epics';


// no-unused-vars fix for should
Chai.should();

/* eslint-disable camelcase, max-len, max-statements */
describe('<%=epicname%>Epic', () => {

    let call;

    beforeEach(() => {
        if (call && call.reset) {
            call.reset();
        }
    });

    it('calls the correct API', () => {
        const response = [];

        expectEpic(<%=epicname%>Epics, {
            expected: ['-a', {
                a: {type: ActionTypes.<%=actiontypeprefix%>_FULFILLED, payload: response}
            }],
            action: ['a', {
                a: {type: ActionTypes.<%=actiontypeprefix%>_PENDING}
            }],
            response: ['-a', {
                a: response
            }],
            call: call,
            callArgs: [api.<%=epicname%>Pending]
        });
    });

    it('handles <%=actiontypeprefix%>_ERROR', () => {
        const FOO_ERROR = 'Foo Error';
        const response = {message: FOO_ERROR};

        expectEpic(<%=epicname%>Epics, {
            expected: ['-(a|)', {
                a: {type: ActionTypes.<%=actiontypeprefix%>_ERROR, payload: response}
            }],
            action: ['(a|)', {
                a: {type: ActionTypes.<%=actiontypeprefix%>_PENDING}
            }],
            response: ['-#', null, {xhr: {response}}],
            call: call,
            callArgs: [api.<%=epicname%>Pending]
        });
    });

    it('visibly notifies the user upon <%=actiontypeprefix%>_ERROR', () => {
        const FOO_ERROR = 'Foo Error';
        const response = FOO_ERROR;
        /* eslint-disable quotes */
        const notification = {
            type: "ERROR",
            message: '<%=epicname%> failed: "' + response + '"'
        };
        /* eslint-enable quotes */

        expectEpic(<%=epicname%>Epics, {
            expected: ['a', {
                a: {type: 'NEW_NOTIFICATION', payload: notification}
            }],
            action: ['a', {
                a: {type: ActionTypes.<%=actiontypeprefix%>_ERROR, payload: response}
            }],
            response: ['-a', {
                a: response
            }],
            replace: {key: 'id', value:'any'}
        });
    });

    });
