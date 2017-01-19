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

describe('<%=epicname%> Actions', () => {

    describe('<%=epicname%>Fulfilled', () => {
        const info = {foo: 'bar'};

        it('should return an action of type <%=epicname%>Fulfilled', () => {
            expect(Actions.<%=epicname%>Fulfilled(info).type).to.equal(ActionTypes.<%=actiontypeprefix%>_FULFILLED);
        });

        it('should return the <%=epicname%> payload', () => {
            expect(Actions.<%=epicname%>Fulfilled(info).payload).to.equal(info);
        });

    });

    describe('<%=epicname%>Pending', () => {

        it('should return an action of type <%=epicname%>Pending', () => {
            expect(Actions.<%=epicname%>Pending().type).to.equal(ActionTypes.<%=actiontypeprefix%>_PENDING);
        });

    });

    describe('<%=epicname%>Error', () => {

        it('should return an action of type <%=actiontypeprefix%>Error', () => {
            const error = {
                message: 'message',
                xhr: {

                    response: 'response-message'
                }
            };
            expect(Actions.<%=epicname%>Error(error).type).to.equal(ActionTypes.<%=actiontypeprefix%>_ERROR);
        });

        it('should favor the xhr.response object over the error message', () => {
            const error = {
                message: 'message',
                xhr: {

                    response: 'response-message'
                }
            };
            expect(Actions.<%=epicname%>Error(error).payload).to.equal(error.xhr.response);
        });

        it('should return the error message', () => {
            const error = {
                message: 'message',
                xhr: {}
            };
            expect(Actions.<%=epicname%>Error(error).payload).to.equal(error.message);
        });

        it('should return the xhr response object', () => {
            const error = {
                xhr: {
                    response: 'response-message'
                }
            };
            expect(Actions.<%=epicname%>Error(error).payload).to.equal(error.xhr.response);
        });

    });

});

