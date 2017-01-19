import {combineEpics} from 'redux-observable';
import LeftSlideoutEpics from '../components/left-slideout/epics';

export default combineEpics(
    LeftSlideoutEpics
);
