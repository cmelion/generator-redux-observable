
/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

const CREATE_AND_SELECT_ITEM = 'CREATE_AND_SELECT_ITEM';
const CREATE_ITEM = 'CREATE_ITEM';
const CREATE_ITEM_PENDING = 'CREATE_ITEM_PENDING';
const DELETE_CONFIRMED = 'DELETE_CONFIRMED';
const DELETE_ITEM = 'DELETE_ITEM';
const DELETE_ITEM_PENDING = 'DELETE_ITEM_PENDING';
const DELETE_REJECTED = 'DELETE_REJECTED';
const ITEM_ERROR = 'ITEM_ERROR';
const LOAD_ITEMS = 'LOAD_ITEMS';
const LOAD_ITEMS_FULFILLED = 'LOAD_ITEMS_FULFILLED';
const LOAD_ITEMS_PENDING = 'LOAD_ITEMS_PENDING';
const SELECT_ITEM = 'SELECT_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const UPDATE_ITEM_PENDING = 'UPDATE_ITEM_PENDING';

const HomeActionTypes = {
    CREATE_AND_SELECT_ITEM, CREATE_ITEM, CREATE_ITEM_PENDING,
    DELETE_CONFIRMED, DELETE_ITEM, DELETE_ITEM_PENDING, DELETE_REJECTED,
    ITEM_ERROR, LOAD_ITEMS, LOAD_ITEMS_FULFILLED, LOAD_ITEMS_PENDING,
    SELECT_ITEM, UPDATE_ITEM, UPDATE_ITEM_PENDING
};

export default HomeActionTypes;
