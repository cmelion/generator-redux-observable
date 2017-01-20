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

    describe('<%=epicname%>', () => {

        it('should return an action of type <%=epicname%>', () => {
            expect(Actions.<%=epicname%>().type).to.equal(ActionTypes.<%=actiontypeprefix%>);
        });

    });

});

