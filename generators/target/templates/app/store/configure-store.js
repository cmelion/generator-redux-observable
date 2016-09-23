import { createStore, compose, applyMiddleware } from 'redux';
import { reduxObservable } from 'redux-observable';
import { autoRehydrate } from 'redux-persist';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
    let finalCreateStore = compose(
        applyMiddleware(reduxObservable()),
        autoRehydrate(),
        global.devToolsExtension ?
            /* istanbul ignore next  */
            global.devToolsExtension() :
            f => f
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    /* istanbul ignore next */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
