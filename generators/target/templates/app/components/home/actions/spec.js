/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global beforeEach, afterEach, describe, it,  */

import { createStore, applyMiddleware } from 'redux';
import {reduxObservable} from 'redux-observable';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'ajax-helper';
import {should} from 'chai'; // You can use any testing library
//import {} from '../actions';

// no-unused-vars fix for should
should(should);

describe('Actions', function() {
    const reducer = (state = [], action) => state.concat(action), middleware = reduxObservable();

    let gXHR, rXHR;

    beforeEach(() => {
        gXHR = global.XMLHttpRequest;
        rXHR = root.XMLHttpRequest;
        global.XMLHttpRequest = MockXMLHttpRequest;
        root.XMLHttpRequest = MockXMLHttpRequest;
    });

    afterEach(() => {
        MockXMLHttpRequest.clearRequest();

        global.XMLHttpRequest = gXHR;
        root.XMLHttpRequest = rXHR;
    });

    describe('CRUD operations', () => {
        /* eslint-disable no-unused-vars */
        let store;

        beforeEach(() => {
            store = createStore(reducer, applyMiddleware(middleware));
        });
        /* eslint-enable no-unused-vars */

        it('should test crud operations');

    });
});
