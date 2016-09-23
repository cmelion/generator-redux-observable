// When reducer complexity is minimal it may not require a 'reducers' directory
// Use reducers.js in component root folder instead
// see actions.js for an example
import {application} from './application';
import {error} from './error';
import {user} from './user';
import {loggedIn} from '../components/login/reducers';

export {
    application as application,
    user as user,
    loggedIn as loggedIn,
    error as error
};
