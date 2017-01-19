// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! TODO: import new epics into a parent epic !
// ! TODO: add endpoint to db.json             !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/* beautify ignore:start */
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {newNotification, NOTIFICATION_TYPE_ERROR} from 'minimal-react-redux-notify';
import {indirect} from 'redux-observable-test-helpers';

// Import actions
import ActionTypes from '../actions/action-types';
import Actions from '../actions';

// Configure AJAX
const {ajax} = Observable;
// TODO: calculate depth
const config = require('../../../../../../../package.json').config;
const BASE_URL = config.baseURL + 'my-base-url';
const HEADER = {'Content-Type': 'application/json'};
/* beautify ignore:end */

/* istanbul ignore next */
export const api = {
    <%=epicname%>Pending: (action) => ajax.post(BASE_URL, JSON.stringify(action.payload), HEADER)
};

// Epics start here
/* eslint-disable max-params */
const <%=epicname%>Epic = (action$,
                           store, /* istanbul ignore next */
                           call = /* istanbul ignore next */
                               indirect.call) =>
    action$.ofType(ActionTypes.<%=actiontypeprefix%>_PENDING)
        .mergeMap((action) =>
            call(api.<%=epicname%>Pending, action)
                .map(Actions.<%=epicname%>Fulfilled)
                .catch(error => Observable.of(
                        Actions.<%=epicname%>Error(error)
                ))
        );
/* eslint-enable max-params */

const <%=epicname%>ErrorEpic = action$ =>
    action$.ofType(ActionTypes.<%=actiontypeprefix%>_ERROR)
        .map((error) => newNotification(
            NOTIFICATION_TYPE_ERROR,
            'myDemo failed: ' + JSON.stringify(error.payload)
        ));

export default combineEpics(
    <%=epicname%>Epic,
    <%=epicname%>ErrorEpic
);
