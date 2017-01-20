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

    it('handles <%=actiontypeprefix%>_FULFILLED', () => {
        const response = [];

        expectEpic(<%=epicname%>Epics, {
            expected: ['a', {
                a: {
                    type: ActionTypes.<%=actiontypeprefix%>_FULFILLED,
                    payload: {type: ActionTypes.<%=actiontypeprefix%>}
                }
            }],
            action: ['a', {
                a: {type: ActionTypes.<%=actiontypeprefix%>}
            }],
            response: ['-a', {
                a: response
            }]
        });
    });


    });
