
/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach */
import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {Header} from './index';

let expect = chai.expect;
chai.use(sinonChai);

/* eslint-disable no-unused-expressions, max-statements, no-console */
describe('Header container', () => {
    let props;

    beforeEach(()=> {
        global.__WEBPACK__ = false; // eslint-disable-line no-underscore-dangle
        props = {
            logout: sinon.spy(),
            loggedIn: true,
            registerForServices: sinon.spy(),
            user: {},
            items: [],
            showLogin: sinon.spy(),
            hamburgerMenu: {},
            hamburgerMenuToggled: sinon.spy()
        };
    });

    describe('render form', ()=> {
        it('should render a visible button to logout', ()=> {
            props.loggedIn = false;
            props.loggingIn = true;
            let wrapper = shallow(<Header {...props} />);
            let button = wrapper.find('.header-btn');
            expect(button.hasClass('invisible')).to.be.true;
        });

        it('should not render a visible button to logout', ()=> {
            let wrapper = shallow(<Header {...props} />);
            let button = wrapper.find('.header-btn');
            expect(button.hasClass('invisible')).to.not.be.true;
        });

        it('should greet the user by their first name if logged in', ()=> {
            props.user.firstName = 'John';
            let wrapper = shallow(<Header {...props} />);
            expect(wrapper.text()).to.match(/Hello John/);
        });
    });

    describe('logout', () => {
        it('should call the logout method on props', ()=> {
            const wrapper = shallow(<Header {...props} />);
            const button = wrapper.find('.header-btn');
            button.simulate('click');
            expect(props.logout.called).to.equal(true);
        });
    });

    // reducers
    describe('Reducers', () => {
        require('./reducers/spec');
    });

    describe('SubComponents', () => {
        require('./components/hamburger/spec');
        require('./components/left-slideout/spec');
    });

});
