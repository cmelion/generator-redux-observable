import {Observable} from 'rxjs';
import {newNotification, NOTIFICATION_TYPE_SUCCESS} from 'minimal-react-redux-notify';
import {combineEpics} from 'redux-observable';
// Import epics

import {indirect} from '../../../utils';

// Import actions
import LoginActionTypes from '../../../actions/action-types';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';

// Configure AJAX
const {ajax} = Observable;
const config = require('../../../../../package.json').config;
const BASE_URL = config.baseURL + 'items';
const HEADER = {'Content-Type': 'application/json'};

/* istanbul ignore next */
export const api = {
    createItem: (item) =>
        ajax.post(BASE_URL, JSON.stringify(item), HEADER),
    loadItems: () => ajax.getJSON(BASE_URL),
    deleteItem: (item) => ajax.delete(`${BASE_URL}/${item._id}`),
    updateItem: (item) => ajax.put(`${BASE_URL}/${item._id}`, JSON.stringify(item), HEADER)
};

// Epics start here
const initializeItemsEpic = action$ =>
    action$.ofType(LoginActionTypes.LOGIN)
        .mapTo(Actions.pendingAction('', ActionTypes.LOAD_ITEMS));

/* eslint-disable max-params */
const loadItemsEpic = (action$,
                       store, /* istanbul ignore next */
                       call = /* istanbul ignore next */
                           indirect.call) =>
    action$.ofType(ActionTypes.LOAD_ITEMS_PENDING)
        .mergeMap(() =>
            call(api.loadItems)
                .map(Actions.itemsLoaded)
                .catch(Observable.of(Actions.itemError))
        );

// CRUD opererations
const createItemEpic = (action$,
                       store, /* istanbul ignore next */
                       call = /* istanbul ignore next */
                           indirect.call) =>
    action$.ofType(ActionTypes.CREATE_ITEM_PENDING)
        .mergeMap((action) =>
            call(api.createItem, action.payload)
                .concatMap((xhr)=>([
                    Actions.itemCreated(xhr.response),
                    newNotification(NOTIFICATION_TYPE_SUCCESS, `${action.payload.name} was created`)
                ]))
                .catch(Observable.of(Actions.itemError))
                .startWith(Actions.selectItem(null))
        );

const deleteItemEpic = (action$,
                        store, /* istanbul ignore next */
                        call = /* istanbul ignore next */
                            indirect.call) =>
    action$.ofType(ActionTypes.DELETE_ITEM_PENDING)
        .mergeMap((action) =>
            call(api.deleteItem, action.payload)
                .concatMap(()=>([
                    Actions.itemDeleted(action.payload),
                    newNotification(NOTIFICATION_TYPE_SUCCESS, `${action.payload.name} was deleted`)
                ]))
                .catch(Actions.itemError)
                .startWith(Actions.selectItem(null))
        );

const updateItemEpic = (action$,
                        store, /* istanbul ignore next */
                        call = /* istanbul ignore next */
                            indirect.call) =>
    action$.ofType(ActionTypes.UPDATE_ITEM_PENDING)
        .mergeMap((action) =>
            call(api.updateItem, action.payload)
                .concatMap((xhr)=>([
                    Actions.itemUpdated(xhr.response),
                    newNotification(NOTIFICATION_TYPE_SUCCESS, `${action.payload.name} was updated`)
                ]))
                .catch(error => Observable.of({type: ActionTypes.ITEM_ERROR, payload: error}))
        );
/* eslint-enable max-params */

export default combineEpics(
    initializeItemsEpic,
    loadItemsEpic,
    createItemEpic,
    deleteItemEpic,
    updateItemEpic
);
