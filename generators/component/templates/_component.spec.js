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

/* beautify ignore:start */
import React from 'react';
import {componentnameClass} from './';
//import sinon from 'sinon';
import {shallow /*, mount */} from 'enzyme';
import {expect} from 'chai';
/* beautify ignore:end */

describe('Component: <%=componentnameClass%>', () => {

    it('should render', ()=>{
        const props = {

        };
        const wrapper = shallow(<<%=componentnameClass%> {...props} />);
        expect(wrapper.find('<%=componentnameClass%>')).to.have.length(1);
    });

});