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
import {DeleteColumn} from './index';
import sinon from 'sinon';

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('DeleteColumn', () => {

    it('should prevent event propagation and call metadata.onDelete onClick with rowData', ()=>{
        const props = {
            rowData: { id: 1 },
            metadata: { onDelete : sinon.spy()}
        };
        const event = {
            stopPropagation : sinon.spy()
        };

        const button = shallow(<DeleteColumn {...props} />).find('button');
        button.simulate('click', event);
        expect(event.stopPropagation.called).to.equal(true);
        expect(props.metadata.onDelete.called).to.equal(true);
        expect(props.metadata.onDelete.args[0][0]).to.equal(props.rowData);
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
