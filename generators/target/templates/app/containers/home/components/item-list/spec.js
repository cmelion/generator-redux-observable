/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach */
import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import {ItemList} from './index';
import sinon from 'sinon';
//import find from 'lodash/find';

const clients = require('../../../../config/demo-common/src/config/clients.json');
const products = require('../../../../config/demo-common/src/config/products.json');
const statuses = require('../../../../config/demo-common/src/config/statuses.json');

//import global from '../../../../../../test/helpers/globals';
/* eslint-disable max-nested-callbacks, no-unused-expressions */
describe('Item List', () => {
    const item = {
        _id: 'foo',
        itemId: 'foo2',
        name: 'item title',
        description: 'item description',
        products: [products[0].value, products[1].value],
        clients: [clients[0].value, clients[1].value],
        status: statuses[0].value
    };
    const props = {
        deleteItem: sinon.spy(),
        items: [item],
        loadItems: sinon.spy(),
        pendingAction: sinon.spy(),
        selectItem: sinon.spy()
    };

    const wrapper = mount(<ItemList {...props} />);

    describe('Table', ()=> {
        let table;
        beforeEach(()=> {
            table = wrapper.find('Griddle');
        });

        it('should render a table listing the items', ()=> {
            expect(table.length).to.equal(1);
            expect(table.props().results).to.equal(props.items);
        });

        it('should have itemId, status, name, products, clients, modifiedDate, and _id as columns', ()=> {
            expect(table.props().columns).to.deep.equal([
                'itemId',
                'status',
                'name',
                'products',
                'clients',
                'lastModifiedDate',
                '_id']
            );
        });

        it('should set prop onRowClick to call selectItem with row data', ()=> {
            table.props().onRowClick({props: {data: item}});
            expect(props.selectItem.called).to.equal(true);
            expect(props.selectItem.args[0][0]).to.equal(item);
        });

        describe('with selected item', ()=>{
            it('should set a selected class on the row of the selected item', ()=>{
                const tableWrapper = mount(<ItemList {...props} selectedItem={item} />);
                expect(tableWrapper.find('tr.selected').length).to.equal(1);
            });
        });
    });

    describe('Empty Table', () => {
        const localProps = {
            deleteItem: sinon.spy(),
            items: [],
            loadItems: sinon.spy(),
            pendingAction: sinon.spy(),
            selectItem: sinon.spy()
        };

        const component = shallow(<ItemList {...localProps} />);

        it('should not render a table', ()=> {
            let emptyTable = component.find('Griddle');
            expect(emptyTable.length).to.equal(0);
        });

    });

    describe('Subcomponents', () => {
        require('./components/date-column/spec');
        require('./components/delete-column/spec');
        require('./components/html-column/spec');
        require('./components/list-column/spec');
        require('./components/status-column/spec');
    });
});
/* eslint-enable max-nested-callbacks, no-unused-expressions */
