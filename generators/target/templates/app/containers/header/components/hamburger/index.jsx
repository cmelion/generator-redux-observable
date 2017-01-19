/*
 Copyright (c) 2016 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

import React from 'react';
import cx from 'classnames';

require('./style.scss');

// Assumes target state is in sync (no shared state)
export const Hamburger = ({hamburgerMenu, hamburgerMenuToggled, menuType, target}) => {
    const handleClick = () => {
        hamburgerMenuToggled(!hamburgerMenu.isActive, target);
    };
    return (
        <button onClick={handleClick}
                className={
                    cx({
                        hamburger: true,
                        'hamburger--rot': menuType === 'rot',
                        'hamburger--htx': menuType === 'htx',
                        'hamburger--htla': menuType === 'htla' || !menuType, // default
                        'hamburger--htra': menuType === 'htra',
                        'is-active': hamburgerMenu.target === target && hamburgerMenu.isActive
                    })
                }>
            <span>toggle menu</span>
        </button>
    );
};

Hamburger.propTypes = {
    hamburgerMenu: React.PropTypes.object.isRequired,
    hamburgerMenuToggled: React.PropTypes.func.isRequired,
    menuType: React.PropTypes.string,
    target: React.PropTypes.string.isRequired
};
