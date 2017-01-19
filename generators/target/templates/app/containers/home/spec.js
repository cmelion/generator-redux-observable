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
import {expect} from 'chai';
import sinon from 'sinon';
import {Home} from './index';

describe('Home container suite', () => {
    const baseProps = {
        cancel: sinon.spy(),
        loadItems: sinon.spy(),
        login: sinon.spy(),
        logout: sinon.spy(),
        pendingAction: sinon.spy(),
        selectItem: sinon.spy(),
        updateLayout: sinon.spy(),
    };

    describe('Logged out', ()=> {
        it('should advise the user to login', ()=> {
            const props = {
                ...baseProps,
                items: [],
                loggedIn: false
            };
            const wrapper = shallow(<Home {...props} />);
            expect(wrapper.text()).to.contain('Login to see more.');
        });
    });

    describe('Logged in', ()=> {
        let globalProps = {
            login: () => {
            },
            ...baseProps,
            items : [],
            loggedIn: true
        };

        describe('Error handling', ()=> {
            const messageObj = {message: 'the db went missing'};
            it('should display an error message if an error is defined', ()=> {

                const props = {
                        ...globalProps,
                        error: messageObj,
                        items: [],
                        selectedItem: {}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.text()).to.contain(messageObj.message);
            });

            it('should not display an error message when no error is defined', ()=> {
                const props = {
                        ...globalProps,
                        items: [],
                        selectedItem: {}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.text()).to.not.contain(messageObj.message);
            });
        });

        describe('Connects the React home component to a Redux store', () => {
            it('TODO: How do we want to test connect?');
        });

    });

    describe('Actions', () => {
        require('./actions/spec');
    });

    describe('Epics', () => {
        require('./epics/spec');
    });

    describe('Reducers', () => {
        require('./reducers/spec');
    });

    describe('SubComponents', () => {
        require('./components/item-detail/spec');
        require('./components/item-list/spec');
    });
});
