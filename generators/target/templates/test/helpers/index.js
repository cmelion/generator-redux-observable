/* global before, beforeEach, afterEach */
import createMockRaf from 'mock-raf';
import {jsdom} from 'jsdom';
import should from 'should';
import sinon from 'sinon';
import Blob from 'blob';
import FakeXMLHttpRequest from 'fake-xml-http-request';

// say we're not in webpack environment
// this is required to skip including styles
global.__WEBPACK__ = false; // eslint-disable-line no-underscore-dangle

// init jsdom
global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.module = {};

// blob polyfill
global.window.Blob = Blob;
global.Blob = Blob;

// RAF polyfill
const mockRaf = createMockRaf();
global.window.requestAnimationFrame = global.requestAnimationFrame = mockRaf.raf;
global.XMLHttpRequest = global.window.XMLHttpRequest = FakeXMLHttpRequest;

// import react after dom
//const React = require('react-addons');

var stubContext, TestHandler, Router, dndSetup, dndTeardown, getSourceId;

getSourceId = function(root) {
    const handlers = root.getManager().registry.handlers;
    for (var property in handlers) {
        if (handlers.hasOwnProperty(property)) {
            if (property[0] === 'S') {
                return [property];
            }
        }
    }
};

before(function() {
    // expose react and testutils
    this.sinon = sinon;
    this.spyOn = sinon.spy;
    this.getSourceId = getSourceId;

    //Mock Router
    this.Router = function () {};
    this.Router.makeHref = function() {
            return '';
    };
    this.Router.isActive = function() {
        return false;
    };



});

beforeEach(function() {
    // create container
    this.container = global.window.document.createElement('div');
});

afterEach(function(done) {
    // clean jsdom
    //this.React.unmountComponentAtNode(this.container);
    // timeout
    setTimeout(done);
});

export default should;
