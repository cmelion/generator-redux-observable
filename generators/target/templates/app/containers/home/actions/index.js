/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import ActionTypes from './action-types';

// action creators / action factories
const createAndSelectItem = (itemToCreate, itemToSelect) => ({
    type: ActionTypes.CREATE_AND_SELECT_ITEM,
    payload: {itemToCreate, itemToSelect}
});

const itemCreated = payload => ({
    type: ActionTypes.CREATE_ITEM,
    payload: payload
});
const itemDeleted = payload => ({
    type: ActionTypes.DELETE_ITEM,
    payload: payload
});
const itemUpdated = payload => ({
    type: ActionTypes.UPDATE_ITEM,
    payload: payload
});
const itemsLoaded = payload => ({type: ActionTypes.LOAD_ITEMS, payload});

const resetItem = () => ({type: ActionTypes.SELECT_ITEM, payload: null});
const selectItem = item => ({type: ActionTypes.SELECT_ITEM, payload: item});

const itemError = error => ({
    type: ActionTypes.ITEM_ERROR,
    payload: error.xhr.response || { message: error.xhr.statusText}
});

const deleteItem = item => ({type: ActionTypes.DELETE_ITEM_PENDING, payload: item});
const pendingAction = (item, type) => ({type: ActionTypes[type + '_PENDING'], payload: item});

const HomeActions = {
    createAndSelectItem,
    deleteItem,
    itemCreated,
    itemDeleted,
    itemUpdated,
    itemError,
    itemsLoaded,
    pendingAction,
    resetItem,
    selectItem
};

export default HomeActions;
