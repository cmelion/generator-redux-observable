/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import {combineEpics} from 'redux-observable';

// Epics bubble up to their container
import HeaderEpics from '../containers/header/epics';
import HomeEpics from '../containers/home/epics';
import LoginEpics from '../containers/login/epics';
import {upgradeDomEpic} from '../config/styles/mdl/';  // Comment out if not using Material-Design

import {notificationEpic} from 'minimal-react-redux-notify';

// Collect, combine and expose all application epics here
export default combineEpics(
    HeaderEpics,
    HomeEpics,
    LoginEpics,
    notificationEpic,
    upgradeDomEpic
);
