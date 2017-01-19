
import { jsdom } from 'jsdom'
import sinon from 'sinon';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.__WEBPACK__ = false; // eslint-disable-line no-underscore-dangle
global.XMLHttpRequest = {
    setBearerToken: sinon.spy(),
    clearBearerToken: sinon.spy()
};
global.componentHandler = { upgradeDom  : sinon.spy() };

export default global;
