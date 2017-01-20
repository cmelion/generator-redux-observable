// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! TODO: import new epics into a parent epic !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! TODO: import new epics into a parent epic !
// ! TODO: add endpoint to db.json             !
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/* beautify ignore:start */
import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';

// Import actions
import ActionTypes from '../actions/action-types';
import Actions from '../actions';
/* beautify ignore:end */

// Epics start here
const <%=epicname%>Epic = action$ =>
action$.ofType(ActionTypes.<%=actiontypeprefix%>)
.map(Actions.<%=epicname%>Fulfilled)

export default combineEpics(
<%=epicname%>Epic
);
