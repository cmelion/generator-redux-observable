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
import {should, expect} from 'chai';
import {selectedItem} from './index';
import HomeActionTypes from '../../actions/action-types';
import {EMPTY_ITEM} from './index';

// no-unused-vars fix for should
should(should);
describe('selectedItem reducer', () => {

    describe('SELECT_ITEM', () => {
        let currentState = [{foo: 'bar'}];
        let newState = {baz: 'foo'};

        let isSelectItem = {type: HomeActionTypes.SELECT_ITEM, payload: newState};

        it('should return the new state if type is SELECT_ITEM', () => {
            selectedItem(currentState, isSelectItem).should.not.equal(currentState);
            selectedItem(currentState, isSelectItem).should.equal(newState);
        });

        it('should return the empty item if no selection is included', () => {
            expect(selectedItem(currentState, {type: HomeActionTypes.SELECT_ITEM})).to.equal(EMPTY_ITEM);
        });
    });

    describe('CREATE_ITEM', () => {
        let currentState = {_id: 'foo'};
        let newState = {_id: 'foo', bar: 'baz'};

        it('should set the selection state equal to the payload', () => {
            let action = {type: HomeActionTypes.CREATE_ITEM, payload: newState};
            expect(selectedItem(currentState, action)).to.deep.equal(newState);
        });
    });

    describe('UPDATE_ITEM', () => {
        let currentState = {_id: 'bar', bar: 'foo'};

        it('should update the current state if IDs match', () => {
            let newState = {_id: 'bar', bar: 'baz'};
            let isUpdateItem = {type: HomeActionTypes.UPDATE_ITEM, payload: newState};
            expect(selectedItem(currentState, isUpdateItem)).to.equal(newState);
        });

        it('should keep  the current state if IDs do not match', () => {
            let newState = {_id: 'foo', bar: 'baz'};
            let isUpdateItem = {type: HomeActionTypes.UPDATE_ITEM, payload: newState};
            expect(selectedItem(currentState, isUpdateItem)).to.equal(currentState);
        });
    });

    describe('LOAD_ITEMS', () => {
        let currentState = {_id: 1, itemId: 'foo'};
        let items = [{_id: 1, itemId: 'foo', bar: 'baz'}];

        it('should update the selected item when current state is found in payload', () => {
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS, payload: items};
            selectedItem(currentState, loadItems).should.deep.equal(items[0]);
        });

        it('should not update the selected item when current state is not found in payload', () => {
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS, payload: items};
            currentState = {itemId: 'bar'};
            selectedItem(currentState, loadItems).should.equal(currentState);
        });

        it('should return updated copy of state when state.current is exists', () => {
            currentState = {itemId: 'foo', current: {}};
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS, payload: items};
            selectedItem(currentState, loadItems).current.should.deep.equal(items[0]);
        });
    });

    describe('LOAD_ITEMS_PENDING', () => {

        it('should return state if payload equals the state.itemId', () => {
            let currentState = {itemId: 'foo'};
            let payload = 'foo';
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS_PENDING, payload: payload};

            selectedItem(currentState, loadItems).should.equal(currentState);
        });

        it('should set the itemId from payload if payload is truthy on to an empty item', () => {
            let currentState = {itemId: 'notfoo'};
            let payload = 'foo';
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS_PENDING, payload: payload};

            selectedItem(currentState, loadItems).should.deep.equal({...EMPTY_ITEM, itemId: 'foo'});
        });

        it('should return current state if payload is falsey', () => {
            let currentState = {itemId: 'foo'};
            let payload = '';
            let loadItems = {type: HomeActionTypes.LOAD_ITEMS_PENDING, payload: payload};

            selectedItem(currentState, loadItems).should.equal(currentState);
        });
    });

    describe('DEFAULT', () => {
        it('should maintain current state if the default branch was followed', () => {
            let currentState = {id: 1};
            selectedItem(currentState).should.equal(currentState);
        });
    });
});
