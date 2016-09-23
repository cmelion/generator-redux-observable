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

describe('App suite', () => {

    describe('Bootstrap the application', () => {
        // This is a container and is not typically covered
        // as seen on canonical TO_DO App:
        // https://github.com/reactjs/redux/tree/master/examples/todomvc
        it('TODO: consider moving main into its own component');
    });

    // stores
    require('./store/spec');

    // components
    describe('Components', () => {
        require('./components/home/spec');
    });
});
