import React from 'react';
import {Notify} from 'react-redux-notify';
import Header from './containers/header';

export const Root = ({children}) =>
    <div>
        <main className="page-content">
            {children}
        </main>
        <Header />
        <Notify />
    </div>;
