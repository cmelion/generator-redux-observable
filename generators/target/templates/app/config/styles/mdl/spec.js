/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, afterEach */

import Chai from 'chai'; // You can use any testing library
import sinon from 'sinon';
import {expectEpic} from 'redux-observable-test-helpers';
import {upgradeDomEpic} from './index';

Chai.should();

/* eslint-disable camelcase, max-len, max-statements */
describe('Material Design Lite Epics', () => {

    afterEach(() => {
        global.componentHandler = { upgradeDom  : sinon.spy() };
    });

    it('should upgrade the DOM on route change', (done) => {
        global.componentHandler = { upgradeDom  : sinon.spy() };
        expectEpic(upgradeDomEpic, {
            expected: ['a', {
                a: {type: 'DOM_UPGRADED'}
            }],
            action: ['a', {
                a: {type: 'UPGRADE_DOM'}
            }],
            response: ['-'],
            done: done
        });

    });

    it('should upgrade the DOM on route change', (done) => {
        global.componentHandler = { upgradeDom  : sinon.spy() };
        expectEpic(upgradeDomEpic, {
            expected: ['a', {
                a: {type: 'DOM_UPGRADED'}
            }],
            action: ['a', {
                a: {type: '@@router/LOCATION_CHANGE'}
            }],
            response: ['-'],
            done: done
        });

    });

    it('should not upgrade the DOM when no upgradeDom method exists', (done) => {
        global.componentHandler.upgradeDom = undefined;
        expectEpic(upgradeDomEpic, {
            expected: ['a', {
                a: {type: 'DOM_UPGRADED'}
            }],
            action: ['a', {
                a: {type: '@@router/LOCATION_CHANGE'}
            }],
            response: ['-'],
            done: done
        });

    });
});
