import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import cx from 'classnames';
import {logout, showLogin} from '../login/actions';
import {hamburgerMenuToggled} from './components/hamburger/actions';
import {Hamburger} from './components/hamburger';
import {LeftSlideout} from './components/left-slideout';

// Import local styles
require('./style.scss');

export const LEFT_NAV = 'left-nav';

/* eslint-disable no-shadow */
export const Header = ({loggedIn, loggingIn, logout, user, ...rest}) => {

    const logoutBtnClasses = cx({
        'header-btn mdl-button mdl-js-button mdl-button--raised': true,
        invisible: loggingIn
    });

    /* eslint-disable quotes */
    return (
        <span>
        <LeftSlideout info={rest.info} target={LEFT_NAV} hamburgerMenu={rest.hamburgerMenu}/>
        <header className="header-component">
            <div className="header-content main-content">
                <Hamburger target={LEFT_NAV} {...rest}/>
                <Link to="/home">
                    <div className="logo"/>
                    <h1 className="title">Tools</h1>
                </Link>
                <div className="header-btns">
                    {
                        (loggedIn) ?
                            <span className="greeting">{`Hello ${user.firstName}`}</span>
                            : null
                    }
                    {
                        (loggedIn) ?
                            <button className={logoutBtnClasses} onClick={logout}>Logout</button>
                            :
                            <Link className={logoutBtnClasses} to="/login" >Login</Link>
                    }
                    <a className="help" href="https://github.com/HBOCodeLabs/generator-tools-seed" title="Questions?">
                        <i className="material-icons">help_outline</i>
                    </a>
                </div>
            </div>
        </header>
        </span>
    );
    /* eslint-enable quotes */
};

Header.propTypes = {
    logout: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object.isRequired,
    items: React.PropTypes.array.isRequired
};

export default connect(
    // Map State to Props (Reducers)
    /* istanbul ignore next */
    (state) => state,
    //Map DispatchToProps (Actions)
    {hamburgerMenuToggled, logout, showLogin}
)(Header);
