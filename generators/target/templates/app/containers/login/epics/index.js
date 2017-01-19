
import {Observable} from 'rxjs';
import {combineEpics/*, ActionsObservable*/} from 'redux-observable';
import get from 'lodash/get';
import {push} from 'react-router-redux';
import {
    newNotification, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS, REMOVE_ALL_NOTIFICATIONS
} from 'minimal-react-redux-notify';

import {indirect, storeAuthToken} from '../../../utils';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';

/*global componentHandler*/

// Configure AJAX
const {ajax} = Observable;
const BASE_URL = '/api/login';
const HEADER = {'Content-Type': 'application/json'};

/* istanbul ignore next */
export const api = {
    login: (action) =>
        ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
};

// Epics
/* storeAuthToken will be called from signup also, in future */
const loggedInEpic = action$ =>
    action$.ofType(ActionTypes.LOGIN_FULFILLED)
        .mergeMap(() => Observable.merge(
            Observable.of(push('/home')),
            Observable.of({type: REMOVE_ALL_NOTIFICATIONS}),
            Observable.of(newNotification(NOTIFICATION_TYPE_SUCCESS, 'Login successful!'))
        ));

/* eslint-disable max-params */
export const loginEpic = (action$, store, /* istanbul ignore next */
                          call = /* istanbul ignore next */
                              indirect.call) =>
    action$.ofType(ActionTypes.LOGIN_PENDING)
        .mergeMap(action =>
            call(api.login, action)
                .do(payload => storeAuthToken(get(payload, 'response.token')))
                .map(Actions.userAuthenticated)
                .catch(error =>
                    Observable.of(
                        Actions.loginError(error)))
        );
/* eslint-enable max-params */

const loginErrorEpic = action$ =>
    action$.ofType(ActionTypes.LOGIN_ERROR)
        .map((error) =>
            newNotification(
                NOTIFICATION_TYPE_ERROR,
                'Login failed! ' + error.payload.message
            )
        );

const logoutEpic = action$ =>
    action$.ofType(ActionTypes.LOGOUT_PENDING)
        .map(Actions.userLoggedOut)
        .do(() => {
            // remove JWT token so user is unauthorized
            XMLHttpRequest.clearBearerToken();
            componentHandler.upgradeDom();
        });

export default combineEpics(
    loggedInEpic,
    loginEpic,
    loginErrorEpic,
    logoutEpic
);
