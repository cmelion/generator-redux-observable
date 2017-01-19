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
import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';

import {Root} from './root';
import Header from './containers/header';
import {Notify} from 'react-redux-notify';

let expect = chai.expect;

describe('ToolShed suite', () => {

    describe('Bootstrap the application', () => {
        // This is a container and is not typically covered
        // as seen on canonical TO_DO App:
        // https://github.com/reactjs/redux/tree/master/examples/todomvc
        it('TODO: what tests do we want here?');

        describe('Root', () => {
            let wrapper = shallow(<Root />);
            expect(wrapper.find(Notify)).to.have.length(1);
            expect(wrapper.find(Header)).to.have.length(1);
        });
    });

    // containers
    describe('Containers', () => {
        require('./containers/header/spec');
        require('./containers/home/spec');
        require('./containers/login/spec');
    });

    describe('Actions', () => {
        require('./actions/spec');
    });

    // epics
    describe('Epics', () => {
        require('./epics/spec');
    });

    // reducers
    describe('Reducers', () => {
        require('./reducers/spec');
    });

    // stores
    describe('Store', () => {
        require('./store/spec');
    });

    // utils
    describe('Utils', () => {
        require('./utils/spec');
    });

    // config
    describe('Config', () => {
        require('./config/spec');
    });

});
