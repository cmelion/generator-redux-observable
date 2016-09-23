// When action complexity increases create an 'actions' directory
// Use actions/index.js to import individual actions
// See reducers for an example
import {Observable} from 'rxjs';
export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const SELECT_ITEM = 'SELECT_ITEM';

const BASE_URL = '/login';
const HEADER = {'Content-Type': 'application/json'};

export const login = (credentials) => (
    () => Observable.ajax.post(BASE_URL, JSON.stringify(credentials), HEADER)
    // When our request comes back, we transform it into an action
    // which the redux-observable middleware will then dispatch
        .map(
            payload => ({type: LOGIN, payload: payload.response})
        )
        .catch(error => Observable.of({type: LOGIN_ERROR, payload: error}))
        .startWith({type: LOGIN_PENDING})
);
