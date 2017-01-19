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
import {expect} from 'chai';
import Actions from './index';
import ActionTypes from './action-types';

describe('createAndSelectItem', () => {
    it('should return an action of type CREATE_AND_SELECT_ITEM', () => {
        const itemToCreate = {foo: 'foo'}, itemToSelect = {bar: 'bar'};
        const action = (Actions.createAndSelectItem(itemToCreate, itemToSelect));
        expect(action.type).to.equal(ActionTypes.CREATE_AND_SELECT_ITEM);
        expect(action.payload.itemToCreate).to.equal(itemToCreate);
        expect(action.payload.itemToSelect).to.equal(itemToSelect);
    });
});

describe('itemCreated', () => {
    it('should return an action of type CREATE_ITEM', () => {
        const payload = {foo: 'foo'};
        const action = (Actions.itemCreated(payload));
        expect(action.type).to.equal(ActionTypes.CREATE_ITEM);
        expect(action.payload).to.equal(payload);
    });
});

describe('itemDeleted', () => {
    it('should return an action of type DELETE_ITEM', () => {
        const payload = {foo: 'foo'};
        const action = (Actions.itemDeleted(payload));
        expect(action.type).to.equal(ActionTypes.DELETE_ITEM);
        expect(action.payload).to.equal(payload);
    });
});

describe('itemUpdated', () => {
    it('should return an action of type UPDATE_ITEM', () => {
        const payload = {foo: 'foo'};
        const action = (Actions.itemUpdated(payload));
        expect(action.type).to.equal(ActionTypes.UPDATE_ITEM);
        expect(action.payload).to.equal(payload);
    });
});

describe('itemsLoaded', () => {
    it('should return an action of type LOGIN_PENDING', () => {
        expect(Actions.itemsLoaded().type).to.equal(ActionTypes.LOAD_ITEMS);
    });
});

describe('resetItem', () => {
    it('should return an action of type SELECT_ITEM', () => {
        expect(Actions.resetItem().type).to.equal(ActionTypes.SELECT_ITEM);
    });
});

describe('selectItem', () => {
    it('should return an action of type SELECT_ITEM', () => {
        const item = {foo: 'foo'};
        const action = (Actions.selectItem(item));
        expect(action.type).to.equal(ActionTypes.SELECT_ITEM);
        expect(action.payload).to.equal(item);
    });
});

describe('itemError', () => {

    it('should return an action of type ITEM_ERROR, defaulting to the xhr response in the payload', () => {
        const error = {xhr: {response: {foo: 'foo'}, statusText: 'bar'}};
        const action = (Actions.itemError(error));
        expect(action.type).to.equal(ActionTypes.ITEM_ERROR);
        expect(action.payload).to.equal(error.xhr.response);
    });

    it('should return the statusText if response is missing', () => {
        const error = {xhr: {statusText: 'bar'}};
        const action = (Actions.itemError(error));
        expect(action.type).to.equal(ActionTypes.ITEM_ERROR);
        expect(action.payload).to.deep.equal({message: error.xhr.statusText});
    });

});

describe('deleteItem', () => {
    it('should return an action of type DELETE_ITEM_PENDING', () => {
        const item = {foo: 'foo'};
        const action = (Actions.deleteItem(item));
        expect(action.type).to.equal(ActionTypes.DELETE_ITEM_PENDING);
        expect(action.payload).to.equal(item);
    });
});

describe('pendingAction', () => {
    it('should return an action of type UPDATE_ITEM_PENDING', () => {
        const item = {foo: 'foo'}, type = ActionTypes.UPDATE_ITEM_PENDING;
        const action = (Actions.pendingAction(item, type));
        expect(action.type).to.equal(ActionTypes[type + '_PENDING']);
        expect(action.payload).to.equal(item);
    });

    it('should return an action of type LOAD_ITEMS_PENDING', () => {
        const item = {foo: 'foo'}, type = ActionTypes.LOAD_ITEMS_PENDING;
        const action = (Actions.pendingAction(item, type));
        expect(action.type).to.equal(ActionTypes[type + '_PENDING']);
        expect(action.payload).to.equal(item);
    });
});
