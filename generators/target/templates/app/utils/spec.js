import * as Util from './';
import {expect} from 'chai';
import sinon from 'sinon';
import root from 'rxjs/util/root';
import {MockXMLHttpRequest} from 'redux-observable-test-helpers';

let gXHR, rXHR;

/* global describe, it, beforeEach, afterEach */
describe('XHR Util:', () => {
    describe('storeAuthToken', () => {
        beforeEach(() => {
            gXHR = global.XMLHttpRequest;
            rXHR = root.XMLHttpRequest;
            global.XMLHttpRequest = MockXMLHttpRequest;
            root.XMLHttpRequest = MockXMLHttpRequest;
        });

        afterEach(() => {
            global.XMLHttpRequest = gXHR;
            root.XMLHttpRequest = rXHR;
        });

        it('should call setBearerToken with token', () => {
            sinon.spy(MockXMLHttpRequest, 'setBearerToken');
            Util.storeAuthToken('token');
            expect(MockXMLHttpRequest.setBearerToken.called).to.equal(true);
            expect(MockXMLHttpRequest.setBearerToken.args[0][0]).to.equal('token');
        });
    });

    describe('isTokenExpired', () => {
        /* eslint-disable  no-unused-expressions */
        it('should return true if token is expired', () => {
            let result = Util.isTokenExpired({xhr: {response: {message: 'Invalid Token'}}});
            expect(result).to.be.true;
        });

        it('should return false if token is not expired', () => {
            let result = Util.isTokenExpired({xhr: {response: {message: 'Valid Token'}}});
            expect(result).to.be.false;
        });
    });

    // form utils
    //require('./form/spec');

    // item utils
    require('./item/spec');
});

