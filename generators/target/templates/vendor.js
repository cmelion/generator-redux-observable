/* eslint-disable  no-unused-vars */
import componentHandler from 'material-design-lite/src/mdlComponentHandler.js';
/* eslint-enable  no-unused-vars */
import 'material-design-lite/src/button/button';
import 'material-design-lite/src/mdlComponentHandler.js';
import 'material-design-lite/src/layout/layout';
import 'material-design-lite/src/ripple/ripple';
import 'material-design-lite/src/textfield/textfield';

import 'rxjs';

require('./style.scss');

// IIFE used to assign bearer token for all ajax requests at the application's top level
(function(open) {
    var bearerToken;

    /* istanbul ignore else  */
    if (!XMLHttpRequest.hasOwnProperty('setBearerToken')) {
        /* istanbul ignore next  */
        XMLHttpRequest.prototype.open = function() {
            open.apply(this, arguments);
            if (bearerToken) {
                this.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
            }
        };

        XMLHttpRequest.setBearerToken = function(token) {
            bearerToken = token;
        };

        XMLHttpRequest.clearBearerToken = function() {
            bearerToken = '';
        };
    }
})(XMLHttpRequest.prototype.open);

// If we have a bearer token in local storage use it to set http header
var user = localStorage.getItem('reduxPersist:user');
if (user) {
    let token = JSON.parse(user).token;
    XMLHttpRequest.setBearerToken(token);
}
