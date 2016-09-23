'use strict';

require('babel-core/register');
var npmConfig = require('./package.json').config;

exports.config = {
    specs: ['test/e2e/index.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:' + npmConfig.clientPort,
    framework:'mocha',
    mochaOpts:{
        reporter:'spec',
        slow:3000,
        enableTimeouts: false
    },
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },
    plugins : [{
        path: 'node_modules/protractor-istanbul-plugin'
    }]

};