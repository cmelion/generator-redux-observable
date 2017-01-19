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
import Chai from 'chai'; // You can use any testing library
import {getStatusById, getProductById, getClientById} from './index';

let should = Chai.should();

describe('Config', () => {
    describe('getStatusById', () => {
        it('should return a status object when a valid status id is passed', () => {
            const status = getStatusById('investigating');
            status.value.should.equal('investigating');
        });
        it('should return undefined when an invalid status id is passed', () => {
            const status = getStatusById('idontfeellikeworking');
            should.equal(status, undefined);
        });

        it('should return an immutable object', () => {
            const status = getStatusById('investigating');
            const fn = () => {
                status.value = 'new value';
            };
            fn.should.throw(/read only/);
        });
    });

    describe('getProductById', () => {
        it('should return a product object when a valid product id is passed', () => {
            const product = getProductById('hbogo');
            product.value.should.equal('hbogo');
        });
        it('should return undefined when an invalid product id is passed', () => {
            const product = getProductById('hboNO');
            should.equal(product, undefined);
        });
        it('should return an immutable object', () => {
            const product = getProductById('hbogo');
            const fn = () => {
                product.value = 'new value';
            };
            fn.should.throw(/read only/);
        });
    });

    describe('getClientById', () => {
        it('should return a status object when a valid client id is passed', () => {
            const client = getClientById('xbox');
            client.value.should.equal('xbox');
        });
        it('should return undefined when an invalid client id is passed', () => {
            const client = getClientById('blackberry');
            should.equal(client, undefined);
        });
        it('should return an immutable object', () => {
            const client = getClientById('xbox');
            const fn = () => {
                client.value = 'new value';
            };
            fn.should.throw(/read only/);
        });
    });

    describe('CSS Frameworks', () => {
        require('./styles/mdl/spec');
    });
});
