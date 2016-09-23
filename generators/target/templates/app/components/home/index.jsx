import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import * as LoginActions from './components/login/actions';
import {Login} from './components/login';

/* istanbul ignore next */
if (__WEBPACK__) {
    require('!style!css!sass!./style.scss');
}

export const Home = ({login, loggedIn, user, error}) => (
            loggedIn ?
                    <div className="home-component">
                        {
                            (error) ?
                                <div className="error-message">
                                    <p>An error has occurred:<br />{error.message}</p>
                                </div>
                                : null
                        }
                </div>: <Login submit={login} error={error} />
);

Home.propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.object,
};

/* istanbul ignore next  */
const mapStateToProps = ({loggedIn, user, error}) => ({loggedIn, user, error});

/* istanbul ignore next  */
const mapDispatchToProps = (dispatch) => (
    bindActionCreators({...Actions,...LoginActions}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
