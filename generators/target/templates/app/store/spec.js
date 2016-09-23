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
import configureStore from './configure-store';

describe('Store', function() {

    it('some dev env configuration, really nothing interesting to test here', function() {
        const store = configureStore();
        /* eslint-disable no-unused-expressions */
        expect(store.dispatch).to.exist;
        /* eslint-enable no-unused-expressions */
    });
});
