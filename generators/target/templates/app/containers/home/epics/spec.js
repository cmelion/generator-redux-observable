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

import Chai from 'chai'; // You can use any testing library
import {expectEpic} from 'redux-observable-test-helpers';
import ItemEpics from '../epics';
import ActionTypes from '../actions/action-types';
import {api} from '../epics';

// no-unused-vars fix for should
Chai.should();

/* eslint-disable camelcase, max-len, max-statements */
describe('Items Epics', () => {
    let call;

    beforeEach(() => {
        if (call && call.reset) {
            call.reset();
        }
    });

    describe('loadItemsEpic', () => {
        it('calls the correct API', () => {
            const response = [];

            expectEpic(ItemEpics, {
                expected: ['-a', {
                    a: {type: ActionTypes.LOAD_ITEMS, payload: response}
                }],
                action: ['a', {
                    a: {type: ActionTypes.LOAD_ITEMS_PENDING}
                }],
                response: ['-a', {
                    a: response
                }],
                call: call,
                callArgs: [api.loadItems]
            });
        });
    });

    describe('createItemEpic', () => {
        it('calls the correct API', () => {
            const payload = {name: 'foo'};
            const notification = {
                type: 'SUCCESS',
                message: payload.name + ' was created'
            };
            const response = {xhr: {}};

            expectEpic(ItemEpics, {
                // starts-with will fire in first frame followed by concatenated itemCreated and newNotification.
                expected: ['a(bc)', {
                    a: {type: ActionTypes.SELECT_ITEM, payload: null},
                    b: {type: ActionTypes.CREATE_ITEM, payload: undefined},
                    c: {type: 'NEW_NOTIFICATION', payload: notification}
                }],
                action: ['a', {
                    a: {type: ActionTypes.CREATE_ITEM_PENDING, payload: payload}
                }],
                response: ['-a', {
                    a: response
                }],
                call: call,
                callArgs: [api.createItem, payload]
            });
        });
    });

    describe('deleteItemEpic', () => {
        it('calls the correct API', () => {
            const payload = {name: 'foo'};
            const notification = {
                type: 'SUCCESS',
                message: payload.name + ' was deleted'
            };
            const response = {xhr: {}};

            expectEpic(ItemEpics, {
                // starts-with will fire in first frame followed by concatenated itemDeleted and newNotification.
                expected: ['a(bc)', {
                    a: {type: ActionTypes.SELECT_ITEM, payload: null},
                    b: {type: ActionTypes.DELETE_ITEM, payload: payload},
                    c: {type: 'NEW_NOTIFICATION', payload: notification}
                }],
                action: ['a', {
                    a: {type: ActionTypes.DELETE_ITEM_PENDING, payload: payload}
                }],
                response: ['-a', {
                    a: response
                }],
                call: call,
                callArgs: [api.deleteItem, payload]
            });
        });
    });

    describe('updateItemEpic', () => {
        it('calls the correct API', () => {
            const payload = {name: 'foo'};
            const notification = {
                type: 'SUCCESS',
                message: payload.name + ' was updated'
            };
            const response = {xhr: {}};

            expectEpic(ItemEpics, {
                // starts-with will fire in first frame followed by concatenated itemDeleted and newNotification.
                expected: ['-(ab)', {
                    a: {type: ActionTypes.UPDATE_ITEM, payload: undefined},
                    b: {type: 'NEW_NOTIFICATION', payload: notification}
                }],
                action: ['a', {
                    a: {type: ActionTypes.UPDATE_ITEM_PENDING, payload: payload}
                }],
                response: ['-a', {
                    a: response
                }],
                call: call,
                callArgs: [api.updateItem, payload]
            });
        });

        it('triggers an ITEM_ERROR event when update fails', () => {
            const payload = {name: 'foo'};
            const response = {xhr: {}};

            expectEpic(ItemEpics, {
                expected: ['-a', {
                    a: {type: ActionTypes.ITEM_ERROR, payload: response}
                }],
                action: ['a', {
                    a: {type: ActionTypes.UPDATE_ITEM_PENDING, payload: payload}
                }],
                response: ['-#', null, response],
                call: call,
                callArgs: [api.updateItem, payload]
            });
        });
    });
});

