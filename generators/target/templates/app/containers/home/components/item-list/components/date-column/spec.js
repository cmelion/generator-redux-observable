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
import {mount} from 'enzyme';
import {DateColumn} from './index';
import moment from 'moment';

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('DateColumn', () => {

    it('should use moment.fromNow to display iso date', ()=>{
        const props = {
            data: new Date(1).toISOString()
        };

        const wrapper = mount(<DateColumn {...props} />);
        expect(wrapper.text()).to.equal(new moment(props.data).fromNow());
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
