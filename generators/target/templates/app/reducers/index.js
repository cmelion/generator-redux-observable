import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {notifyReducer} from 'minimal-react-redux-notify';

// Reducers bubble up to their container
import * as headerReducers from '../containers/header/reducers';
import HomeReducers from '../containers/home/reducers';
import * as loginReducers from '../containers/login/reducers';

import * as applicationReducers from './application';
import * as userReducers from './user';
import * as errorReducers from './error';

// Collect, combine and expose all reducers here
export default combineReducers(
    {
        ...applicationReducers,
        ...errorReducers,
        ...headerReducers,
        ...HomeReducers,
        ...loginReducers,
        ...userReducers,
        notifications: notifyReducer,
        routing: routerReducer
    }
);
