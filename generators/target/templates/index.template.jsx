import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configure-store';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import Home from './components/home';

const store = configureStore();

persistStore(store, { blacklist : ['error']});

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

render(
    <Provider store={store}>
        <main className="mdl-layout page-content">
            <h1 className="title"><%=appname%></h1>
            <Home />
        </main>
    </Provider>,
    document.getElementById('app')
);

