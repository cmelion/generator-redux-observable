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
import {shallow} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {ItemDetail} from './index';
import {statuses} from '../../../../config/demo-common';
import {EMPTY_ITEM} from '../../reducers/selected-item';

let expect = chai.expect;
chai.use(sinonChai);

/* eslint-disable no-unused-expressions, max-statements, no-console */
describe('Item Detail', () => {
    let props;
    beforeEach(()=> {
        props = {
            cancel: () => {
            },
            submit: () => {
            },
            selectItem: ()=>{},
            item: EMPTY_ITEM,
            user: {
                userName: 'foo',
                firstName: 'bar',
                lastName: 'baz'
            }
        };
    });

    describe('component heading', ()=> {
        it('should treat an item with a falsy id as new', () => {
            const wrapper = shallow(<ItemDetail {...props} />);
            expect(wrapper.find('.tools-title-text').text()).to.include('Create');
        });

        it('should treat an item with an id as editable', () => {
            props.submit = sinon.spy();
            props.item._id = 'someId';
            const wrapper = shallow(<ItemDetail {...props} />);
            expect(wrapper.find('h2').text()).to.include('Edit');
        });
    });

    describe('Affected products change handler', ()=> {
        it('should replace copied array contents with updated data', () => {

            props.item._id = 'foo';
            props.item.products = ['p1', 'p2'];

            sinon.stub(props.item.products, 'slice', ()=>props.item.products);

            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: props.item.products});

            expect(inputs).to.have.length(1);

            inputs.simulate('change', 'one,two');
            expect(props.item.products).to.eql(['one', 'two']);
        });

        it('should not alter the existing array', () => {
            props.item._id = 'foo';
            props.item.products = ['p1', 'p2'];

            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: props.item.products});

            expect(inputs).to.have.length(1);
            inputs.simulate('change', 'one,two');
            expect(props.item.products).to.eql(['p1', 'p2']);
        });

        it('should ignore newValues that are undefined', () => {
            props.item._id = 'foo';
            props.item.products = ['p1', 'p2'];

            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: props.item.products});

            expect(inputs).to.have.length(1);
            inputs.simulate('change', undefined);
            expect(props.item.products).to.eql(['p1', 'p2']);
        });
    });

    describe('Affected clients change handler', ()=> {
        it('should replace copied array contents with updated data', () => {
            props.item._id = 'foo';
            props.item.clients = ['c1', 'c2'];

            sinon.stub(props.item.clients, 'slice', ()=>props.item.clients);

            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: props.item.clients});
            inputs.simulate('change', 'one,two');
            expect(props.item.clients).to.eql(['one', 'two']);
        });

        it('should not alter the existing array', () => {
            props.item._id = 'foo';
            props.item.clients = ['c1', 'c2'];
            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: props.item.clients});
            inputs.simulate('change', 'one,two');
            expect(props.item.clients).to.eql(['c1', 'c2']);
        });
    });

    describe('status change handler', ()=> {
        it('should return a new object containing the selected status', () => {

            props.item._id = 'foo';
            props.item.status = statuses[0].value;

            const wrapper = shallow(<ItemDetail {...props} />);
            const inputs = wrapper.find({value: statuses[0]});
            const status = inputs.prop('onChange')(statuses[1]);
            expect(status).to.eql(statuses[1]);
        });
    });

    describe('cancel', () => {
        it('should call the cancel method on props', ()=> {
            props.item._id = 'foo';
            props.cancel = sinon.spy();
            props.item.status = statuses[0].value;

            const wrapper = shallow(<ItemDetail {...props} />);
            const button = wrapper.find('button[type="reset"]');
            button.simulate('click');
            expect(props.cancel.called).to.equal(true);
        });
    });

    describe('submit', () => {
        it.skip('should call props.submit', ()=> {
            props.submit = sinon.spy();
            props.item = {...EMPTY_ITEM};

            const wrapper = shallow(<ItemDetail {...props} />);
            const button = wrapper.find('button[type="submit"]');
            button.prop('onClick')();
            expect(props.submit.called).to.equal(true);
        });

    });

    describe('read only selected items', ()=> {

        it('should put all fields in a disabled/read-only state', ()=> {
            const mockData = {
                _id: 'foo',
                name: 'name',
                current: {
                    name: 'real name'
                },
                desecription: 'description',
                lastModifiedDate: new Date().toISOString(),
                readOnly: true,
                clients: ['c1'],
                products: ['p1'],
                status: statuses[0].value,
                history: []
            };

            props.item = {...EMPTY_ITEM, ...mockData};

            const wrapper = shallow(<ItemDetail {...props} />);

            const clients = wrapper.find({value: props.item.clients});
            const description = wrapper.find({defaultValue: props.item.description});
            const products = wrapper.find({value: props.item.products});
            const status = wrapper.find({value: statuses[0]});
            const title = wrapper.find({defaultValue: props.item.name});

            expect(clients.prop('disabled')).to.equal(true);
            expect(description.prop('readOnly')).to.equal(true);
            expect(products.prop('disabled')).to.equal(true);
            expect(status.prop('disabled')).to.equal(true);
            expect(title.prop('disabled')).to.equal(true);

        });
    });

    // describe('Subcomponents', () => {
    //
    // });
});
/* eslint-enable no-unused-expressions */

