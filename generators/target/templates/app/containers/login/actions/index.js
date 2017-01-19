import ActionTypes from './action-types';

export const login = credentials => ({type: ActionTypes.LOGIN_PENDING, payload: credentials});
export const loginError = error =>
    ({type: ActionTypes.LOGIN_ERROR, payload: error.xhr.response ? error.xhr.response : {message: error.message}});
export const logout = () => ({type: ActionTypes.LOGOUT_PENDING});
export const userAuthenticated = payload => ({type: ActionTypes.LOGIN_FULFILLED, payload: payload.response});
export const userLoggedOut = () => ({type: ActionTypes.LOGOUT_FULFILLED});
export const showLogin = () => ({type:'@@router/CALL_HISTORY_METHOD', payload: {method: 'push', args: ['/login']} });

const LoginActions = {login, loginError, logout, userAuthenticated, showLogin, userLoggedOut};

export default LoginActions;
