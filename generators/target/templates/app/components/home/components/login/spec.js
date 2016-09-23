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
import {Login} from './';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

describe('Login component', () => {
    it('should render a username field', () => {
        const props = {
            submit: ()=> {}
        };
        const wrapper = shallow(<Login {...props} />);
        const input = wrapper.find('input[type="text"]');
        expect(input).to.have.length(1);
    });
    it('should render a password field', () => {
        const props = {
            submit: ()=> {}
        };
        const wrapper = shallow(<Login {...props} />);
        const input = wrapper.find('input[type="password"]');
        expect(input).to.have.length(1);
    });
    it('should render a submit button', () => {
        const props = {
            submit: ()=> {}
        };
        const wrapper = shallow(<Login {...props} />);
        const button = wrapper.find('button[type="submit"]');
        expect(button).to.have.length(1);
    });
    it('should call props.login when submit is clicked', () => {
        const props = {
            submit: sinon.spy()
        };
        const wrapper = mount(<Login {...props} />);
        const button = wrapper.find('button[type="submit"]');
        button.simulate('click');
        expect(props.submit.called).to.equal(true);
    });

    it('should display an error message if an error is defined', ()=>{
        const props = {
            submit: sinon.spy(),
            error : {message : 'oops something broke'}
        };
        const wrapper = mount(<Login {...props} />);
        wrapper.find('button[type="submit"]');
        expect(wrapper.text()).to.contain(props.error.message);
    });
});
