/*
 redux-observable does not automatically add every RxJS operator to
 the Observable prototype. Because there are many ways to add them,
 our examples will not include any imports. If you want to add every
 operator, put import 'rxjs'; in your entry index.js.

 More info: https://github.com/ReactiveX/rxjs#installation-and-usage
 */
//import 'rxjs';
//import 'rxjs/add/operator/delay';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {persistStore} from 'redux-persist';

import configureStore from './store';

// Containers
import Home from './containers/home';
import Login from './containers/login';

// Components
import {Root} from './root';

// Actions
import ActionTypes from './containers/home/actions/action-types';
import Actions from './containers/home/actions';

// Import local styles
require('./style.scss');
require('react-redux-notify/dist/ReactReduxNotify.css');

const store = configureStore();
persistStore(store, {blacklist: ['error', 'routing', 'loggingIn', 'notifications']}, () => {
    //re-hydration complete
    // Perform any pre-login initialization here
    // If we are already 'logged in' then loadItems
    if (store.getState().loggedIn) {
        store.dispatch(Actions.pendingAction('', ActionTypes.LOAD_ITEMS));
    }
});

const history = syncHistoryWithStore(
    browserHistory,
    store
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Root}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('.app')
)
;
