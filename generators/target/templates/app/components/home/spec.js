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
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Home} from './index';

describe('Home component suite', () => {
    describe('Logged out', ()=>{
        it('should render the Login Component', ()=>{
            const props = {
                login: () =>{},
                items: [],
                loggedIn: false
            };
            const wrapper = shallow(<Home {...props} />);
            expect(wrapper.find('Login')).to.have.length(1);
        });
    });

    describe('Logged in', ()=> {
        let globalProps = {
            login: () =>{},
            loggedIn: true
        };

        describe('Error handling', ()=>{
            it('should display an error message if an error is defined', ()=>{
                const props = {
                        ...globalProps,
                        error: { message : 'the db went missing'},
                        items: [],
                        selectedItem: {}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.text()).to.contain(props.error.message);
            });
        });

        describe('Login Component', ()=>{
            it('should not render', ()=>{
                const props = {
                        ...globalProps,
                        items: [{_id: 'foo'}],
                        selectedItem: {_id: 'foo'}
                    },
                    wrapper = shallow(<Home {...props} />);

                expect(wrapper.find('Login')).to.have.length(0);
            });
        });

        describe('Connects the React home component to a Redux store', () => {
            it('should not test the connect logic by convention, its not worth the effort');
        });

    });

    describe('Redux', () => {
        require('./reducers/spec');
        require('./components/login/reducers/spec');
        require('./actions/spec');
        require('./components/login/actions/spec');
    });

    describe('Subcomponents', () => {
        require('./components/login/spec');
    });
});
