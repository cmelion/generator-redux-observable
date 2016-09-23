import { combineReducers } from 'redux';

import * as homeReducers from './components/home/reducers';

const allReducers = Object.assign({}, homeReducers);

export default combineReducers(allReducers);
