/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach, afterEach */
import React from 'react';
import {Login} from './';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
//import global from '../../../../test/helpers/globals';

/* eslint-disable no-unused-expressions, max-statements, no-console, camelcase, max-nested-callbacks, no-undef */
describe('Login container', () => {
    let wrapper,
        props = {};

    beforeEach(() => {
        props = {
            login: sinon.spy(),
            loginAndRegister: sinon.spy(),
            loggingIn: sinon.spy(),
            items: []
        };
    });
    afterEach(() => {
        props.login.reset();
    });

    describe('Component Lifecycle methods', () => {
        describe('componentWillMount', ()=> {

            it('should call componentHandler.upgradeDom', ()=> {
                componentHandler.upgradeDom = sinon.spy();
                wrapper = mount(<Login {...props} />);
                expect(componentHandler.upgradeDom.called).to.be.false;
            });

        });

        describe('componentDidUpdate', ()=> {

            it('should call componentHandler.upgradeDom', ()=> {
                wrapper = mount(<Login {...props} />);
                componentHandler.upgradeDom = sinon.spy();
                wrapper.update();
                expect(componentHandler.upgradeDom.called).to.be.false;
            });

            it('should set focus to the email field', ()=> {
                var el = {};
                el.focus = sinon.spy();
                sinon.stub(document, 'querySelector').returns(el);

                wrapper = mount(<Login {...props} />);

                expect(el.focus.called).to.be.false;

                document.querySelector.restore();
            });
        });
    });

    describe('render form', () => {

        beforeEach(()=> {
            wrapper = shallow(<Login {...props} />);
        });

        it('should render the email field', () => {
            const input = wrapper.find('input[type="email"]');
            expect(input).to.have.length(1);
        });

        it('should render the password field', () => {
            const input = wrapper.find('input[type="password"]');
            expect(input).to.have.length(1);
        });

        it('should render a submit button', () => {
            const button = wrapper.find('button[type="submit"]');
            expect(button).to.have.length(1);
        });

    });

    describe('buttons', () => {
        let button;

        it('should call props.login when enter key is pressed within password field in the normal case', () => {
            wrapper = mount(<Login {...props} />);
            const passwordField = wrapper.find('#password');
            wrapper.node.isValid = sinon.stub().returns(true);
            passwordField.simulate('keyDown', {keyCode: 13});
            expect(props.login.called).to.equal(true);
        });

        it('should not call props.login when key other than enter is pressed within password field in the normal case',
            () => {
                wrapper = mount(<Login {...props} />);
                const passwordField = wrapper.find('#password');
                wrapper.node.isValid = sinon.stub().returns(true);
                passwordField.simulate('keyDown', {charCode: 40});
                expect(props.login.called).to.equal(false);
            });

        it('should call props.login when submit is clicked in the normal case', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.login.called).to.equal(true);
        });

        it('should not call props.login when submit is clicked if the form is invalid', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(false);
            button.simulate('click');
            expect(props.login.called).to.equal(false);
        });

        it('should display an error message if an error is defined', ()=> {
            props.error = {message: 'oops something broke'};
            wrapper = mount(<Login {...props} />);
            wrapper.find('button[type="submit"]');
            expect(wrapper.text()).to.contain(props.error.message);
        });

        it('should call props.loginAndRegister when submit is clicked with selected items', () => {
            props.items.push({ selected: true, name: 'github'});
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.loginAndRegister.called).to.equal(true);
            wrapper.find('button[type="submit"]');
            expect(wrapper.text()).to.contain('Login and Register');
        });

    });

    describe('isValid', () => {

        it('should return true if result of querySelectorAll has no items', ()=> {
            const el = {
                querySelectorAll: ()=>[]
            };
            wrapper = mount(<Login {...props} />);

            expect(wrapper.node.isValid(el)).to.be.true;
        });

        it('should return false if result of querySelectorAll has items', ()=> {
            const el = {
                querySelectorAll: ()=>[1, 2]
            };
            wrapper = mount(<Login {...props} />);
            expect(wrapper.node.isValid(el)).to.be.false;
        });

        it('should query for invalid element with element.querySelectorAll', ()=> {
            const el = {
                querySelectorAll: sinon.stub().returns([])
            };
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid(el);
            expect(el.querySelectorAll.args[0][0]).to.equal('*:invalid');
        });

    });

    describe('onSubmit', () => {
        let form;

        beforeEach(()=> {
            form = {
                classList: {
                    add: sinon.spy(),
                    remove: sinon.spy()
                }
            };
        });

        it('should call login function with correct form field input values if isValid returns true', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(true);
            expect(props.loginAndRegister.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(false);
            expect(props.login.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                password: 'password'
            });
        });

        it('should call loginAndSubmit with correct values if isValid and items are selected', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs, [{ name: 'github' }]);
            expect(props.loginAndRegister.called).to.equal(true);
            expect(props.login.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(false);
            expect(props.loginAndRegister.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                password: 'password'
            });
        });

        it('should not call login function if isValid returns false', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(true);
        });

    });

    // Actions
    require('./actions/spec');

    // Epics
    require('./epics/spec');

    // Reducers
    require('./reducers/spec');
});
