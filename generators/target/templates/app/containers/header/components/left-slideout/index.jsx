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

const clientVersion = require('../../../../../../package.json').version;

// Assumes target state is in sync (no shared state)
export const LeftSlideout = ({hamburgerMenu, info, target}) => {
    return (
        <div className={
            cx({
                'hamburger-left-slide-out': true,
                'is-active': hamburgerMenu.target === target && hamburgerMenu.isActive
            })
        }>
            <div className="version-info">Client Version: {clientVersion}</div>
            <div className="version-info">Server Version: {info.version}</div>
        </div>
    );
};

LeftSlideout.propTypes = {
    hamburgerMenu: React.PropTypes.object,
    target: React.PropTypes.string
};
