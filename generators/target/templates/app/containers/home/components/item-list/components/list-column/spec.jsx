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
import {ListColumn} from './index';
const clients = require('../../../../../../config/demo-common/src/config/clients.json');
const products = require('../../../../../../config/demo-common/src/config/products.json');

/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('ListColumn', () => {

    it('should render a list of product labels when metadata.columnName is products', ()=>{
        const props = {
            data: [products[0].value, products[1].value],
            metadata: { columnName : 'products'}
        };
        const wrapper = shallow(<ListColumn {...props} />);
        const items = wrapper.find('li');
        expect(items.length).to.equal(2);
        expect(shallow(items.nodes[0]).text()).to.equal(products[0].label);
        expect(shallow(items.nodes[1]).text()).to.equal(products[1].label);
    });

    it('should render a list of client labels metadata.columnName is clients', ()=>{
        const props = {
            data: [clients[0].value, clients[1].value],
            metadata: { columnName : 'clients'}
        };
        const wrapper = shallow(<ListColumn {...props} />);
        const items = wrapper.find('li');
        expect(items.length).to.equal(2);
        expect(shallow(items.nodes[0]).text()).to.equal(clients[0].label);
        expect(shallow(items.nodes[1]).text()).to.equal(clients[1].label);
    });

    it('should render a list of values if columnName is unsupported', ()=>{
        const props = {
            data: ['one', 'two'],
            metadata: { columnName : 'something else'}
        };
        const wrapper = shallow(<ListColumn {...props} />);
        const items = wrapper.find('li');
        expect(items.length).to.equal(2);
        expect(shallow(items.nodes[0]).text()).to.equal(props.data[0]);
        expect(shallow(items.nodes[1]).text()).to.equal(props.data[1]);
    });

});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
