/* global describe, it*/
import {expect} from 'chai';
import LoginActionTypes from '../../containers/login/actions/action-types';
import {user as userAction} from './';

const db = require('../../../../json-server/db.json');

describe('user Reducer', ()=> {
    let user = db.login;

    describe('LOGIN_ERROR', ()=> {
        it('should set user to empty object', ()=> {
            let expectedState = {};
            const action = {type: LoginActionTypes.LOGIN_ERROR};
            expect(userAction(expectedState, action)).to.deep.equal(expectedState);
        });
    });

    describe('LOGIN_PENDING', ()=> {
        let expectedState = {email: user.email},
            action = {type: LoginActionTypes.LOGIN_PENDING, payload: user};

        it('should set current state to an object with an email if ActionType is LOGGING_PENDING', ()=>{
            expect(userAction(expectedState, action)).to.deep.equal(expectedState);
        });
    });

    describe('LOGIN_FULFILLED', ()=> {

        it('should set current state to the payload', ()=> {
            let expectedState = {firstName: 'pay', lastName: 'load'};
            const action = {type: LoginActionTypes.LOGIN_FULFILLED, payload: expectedState};
            expect(userAction(expectedState, action)).to.deep.equal(expectedState);
        });
    });

    describe('LOGOUT_FULLFILLED', ()=> {

        it('should set state to an empty object', ()=> {
            let expectedState = {};
            const action = {type: LoginActionTypes.LOGOUT_FULFILLED};
            expect(userAction(expectedState, action)).to.deep.equal(expectedState);
        });
    });

    describe('default', ()=> {
        it('should not change the current state', () => {
            let action = {type: ''};
            expect(userAction(false, action)).to.equal(false);
            expect(userAction(true, action)).to.equal(true);
        });
    });
});
