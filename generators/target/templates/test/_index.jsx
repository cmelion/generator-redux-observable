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

import { jsdom } from 'jsdom'
import sinon from 'sinon';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.__WEBPACK__ = false; // eslint-disable-line no-underscore-dangle
global.XMLHttpRequest = {
    setBearerToken: sinon.spy()
};


describe('App Test Suite', function() {

    // helpers
    //require('./helpers/test-existence-tests.js');

    // components
    require('../src/app/spec');
});
