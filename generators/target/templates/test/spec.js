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
import global from './helpers/globals';

/* eslint-disable no-unused-expressions */
describe('App Test Suite', function() {

    // https://gist.github.com/scmx/d98cc058a7c3dfef7890
    // Since react will console.error propType warnings, that which we'd rather have
    // as errors, we use sinon.js to stub it into throwing these warning as errors
    // instead.
    before(() => {
        sinon.stub(console, 'error', (warning) => { throw new Error(warning) });
    });

    // While not forgetting to restore it afterwards
    after(() => {
        console.error.restore();
    });

    // components
    require('../src/app/spec');
});