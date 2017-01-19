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
import {HTMLColumn} from './index';

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('HTMLColumn', () => {

    it('should render data as html', ()=>{
        const props = {
            data: '<div>some html</div>'
        };
        const wrapper = shallow(<HTMLColumn {...props} />);
        const htmlElement = wrapper.find('[dangerouslySetInnerHTML]');
        expect(htmlElement.props().dangerouslySetInnerHTML).to.eql({
            __html : props.data
        });

    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
