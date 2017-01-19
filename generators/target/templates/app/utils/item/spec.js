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
import {getId, hasSameId} from './index';
import {expect} from 'chai';

describe('Utils Item:', ()=> {
    let item;

    beforeEach(()=> {
        item = {_id: 'lg'};
    });

    describe('getId', ()=> {
        it('should return the given item\'s itemId ', ()=> {
            expect(getId(item)).to.equal('lg');
        });
    });

    describe('hasSameId', ()=> {
        it('should return true if the given items have the same ids', ()=> {
            expect(hasSameId(item, {...item})).to.equal(true);
        });

        it('should return false if the given items do not have the same ids', ()=> {
            expect(hasSameId(item, {...item, _id: 'foo'})).to.equal(false);
        });
    });

});
