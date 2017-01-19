// import {Observable} from 'rxjs';
// import {ActionsObservable} from 'redux-observable';
import get from 'lodash/get';

export const storeAuthToken = token => {
    // Save JWT authentication Token so we send it on all future requests
    XMLHttpRequest.setBearerToken(token);
};

const TOKEN_EXPIRED = 'Invalid Token';
export const isTokenExpired = error => {
    return get(error, 'xhr.response.message') === TOKEN_EXPIRED;
};

/* istanbul ignore next */
export const indirect = {
    call:  (fn, ...args) => fn(...args)
};

//
// Hopefully this will become part of the redux-observables public API by
// the time redux-observables 1.0 is released (shortly)
// in the meantime, spawnEpic could be added to some common utils lib
//
// export const spawnEpic = (epicFactory, ...actions) => {
//     const input$ = Observable.of(...actions);
//     const actions$ = new ActionsObservable(input$);
//     return epicFactory(actions$);
// };

