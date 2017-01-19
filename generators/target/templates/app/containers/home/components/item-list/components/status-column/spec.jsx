/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {StatusColumn} from './index';

const statuses = require('../../../../../../config/demo-common/src/config/statuses.json');

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('StatusColumn', () => {

    it('should the respective label of a status id', ()=>{
        const props = {
            data: statuses[1].value
        };
        const wrapper = shallow(<StatusColumn {...props} />);
        expect(wrapper.text()).to.equal(statuses[1].label);
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
