/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */
import ActionTypes from './action-types';

const infoLoaded = info => ({
    type: ActionTypes.LOAD_INFO_FULFILLED,
    payload: info
});

const loadInfo = () => ({
    type: ActionTypes.LOAD_INFO_PENDING
});

const loadInfoError = error => ({
    type: ActionTypes.LOAD_INFO_ERROR,
    payload: error.xhr.response ? error.xhr.response : error.message
});

const LeftSlideoutActions = {infoLoaded, loadInfo, loadInfoError};

export default LeftSlideoutActions;
