/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global before, after, describe, it */
import {expect} from 'chai';
import sinon from 'sinon';
import {items} from './index';
//import {patchDefaultValues} from '../../../../utils/item';
import ItemActionTypes from '../../actions/action-types';

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('items reducer', () => {
    const currentState = [{_id: 1, foo: 'bar'}];
    const newState = {_id: 2, baz: 'foo'};

    describe('CRUD operations', () => {

        describe('CREATE_ITEM', () => {
            let isCreateItem = {type: ItemActionTypes.CREATE_ITEM, payload: newState};

            it('should append new Item to current state if type is CREATE_ITEM', () => {
                expect(items(currentState, isCreateItem)).to.deep.equal([...currentState, newState]);
            });
        });

        describe('UPDATE_ITEM', () => {
            let updatedState = Object.assign(newState, {baz: 'bar'});
            let isUpdateItem = {type: ItemActionTypes.UPDATE_ITEM, payload: updatedState};

            it('should update an existing item if ids are equal and type is CREATE_ITEM', () => {
                expect(items([newState], isUpdateItem)).to.deep.equal([updatedState]);
            });

            it('should simply return the existing item if ids are not equal and type is CREATE_ITEM', () => {
                expect(items(currentState, isUpdateItem)).to.deep.equal(currentState);
            });
        });

        describe('DELETE_ITEM', () => {
            let isDeleteItem = {type: ItemActionTypes.DELETE_ITEM, payload: newState};

            it('should append new Item to current state if type is CREATE_ITEM', () => {
                expect(items([newState], isDeleteItem)).to.deep.equal([]);
            });
        });

        describe('LOAD_ITEMS', () => {
            let isLoadItems = {type: ItemActionTypes.LOAD_ITEMS, payload: [newState]};

            it('should set/replace current state if type is LOAD_ITEMS', function() {
                expect(items(currentState, isLoadItems)).to.deep.equal([newState]);
            });
        });
    });

    describe('ITEM_ERROR', () => {
        let isItemError = {type: ItemActionTypes.ITEM_ERROR, payload: newState};

        /* eslint-disable no-console */
        before(() => {
            console.error.restore();
            sinon.stub(console, 'error');
        });

        after(() => {
            console.error.restore();
            sinon.stub(console, 'error', (warning) => { throw new Error(warning); });
        });

        it('should trigger an error notification if type is ITEM_ERROR', (done) => {
            expect(items(currentState, isItemError)).to.deep.equal(currentState);
            expect(console.error.called).to.equal(true);
            done();
        });
        /* eslint-enable no-console */
    });

    describe('switch statement default', () => {
        let isDefaultItems = {type: 'default', payload: []};

        it('should update an existing item if ids are equal and type is CREATE_ITEM', () => {
            expect(items([], isDefaultItems)).to.deep.equal([]);
        });
    });

    describe('no state passed in', () => {
        it('should use initial state if none is supplied', () => {
            expect(items(undefined, {})).to.deep.equal([]);
        });
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
