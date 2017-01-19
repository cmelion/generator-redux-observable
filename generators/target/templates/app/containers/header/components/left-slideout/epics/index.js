import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';
import {newNotification, NOTIFICATION_TYPE_ERROR} from 'minimal-react-redux-notify';
import {indirect} from '../../../../../utils';

// Import actions
import HamburgerActionTypes from '../../hamburger/actions/action-types';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';

import {LEFT_NAV} from '../../../index';

// Configure AJAX
const {ajax} = Observable;
const BASE_URL = '/info';

/* istanbul ignore next */
export const api = {
    loadInfo: () => ajax.getJSON(BASE_URL)
};

/* eslint-disable max-params */
const loadInfoEpic = (action$, store, /* istanbul ignore next */
                             call = /* istanbul ignore next */
                                 indirect.call) =>
    action$.ofType(ActionTypes.LOAD_INFO_PENDING)
        .mergeMap(() =>
            call(api.loadInfo)
                .map(Actions.infoLoaded)
                // We can abort the action before the response returns if we choose to
                //.takeUntil(actions.ofType(LOAD_ITEMS_ABORTED))
                .catch(error => Observable.of(Actions.loadInfoError(error)))
        );
/* eslint-enable max-params */

const loadInfoErrorEpic = action$ =>
    action$.ofType(ActionTypes.LOAD_INFO_ERROR)
        .map((error) => newNotification(
            NOTIFICATION_TYPE_ERROR,
            'Loading Application Info failed: ' + JSON.stringify(error.payload)
        ));

const slideOutOpenEpic = action$ =>
    action$.ofType(HamburgerActionTypes.TOGGLE_HAMBURGER)
        .switchMap(action => action.payload.target === LEFT_NAV ?
            // Load Info
            Observable.of(Actions.loadInfo()) :
            // Support for multiple Hamburger menus
            Observable.never()
        );

export default combineEpics(
    loadInfoEpic,
    loadInfoErrorEpic,
    slideOutOpenEpic
);
