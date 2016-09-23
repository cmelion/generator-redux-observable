
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
import {application} from './index';
//import {} from '../../actions';

describe('application state reducer', () => {

    describe('DEFAULT', () => {
        let defaultState = {isLoading: false};
        let fooState = {isLoading: true};

        it('should set current state to {isLoading: false} if the default branch was followed', function() {
            expect(application(undefined, fooState)).to.deep.equal(defaultState);
        });
    });
});
