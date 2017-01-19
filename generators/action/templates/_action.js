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

const <%=epicname%>Fulfilled = info => ({
    type: ActionTypes.<%=actiontypeprefix%>_FULFILLED,
    payload: info
});

const <%=epicname%>Pending = () => ({
    type: ActionTypes.<%=actiontypeprefix%>_PENDING
});

const <%=epicname%>Error = error => ({
    type: ActionTypes.<%=actiontypeprefix%>_ERROR,
    payload: error.xhr.response ? error.xhr.response : error.message
});

const <%=epicname%>Actions = {<%=epicname%>Fulfilled, <%=epicname%>Pending, <%=epicname%>Error};

export default <%=epicname%>Actions;
