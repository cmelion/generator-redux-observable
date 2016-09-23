'use strict';

require('babel-core/register');
var npmConfig = require('./package.json').config;

exports.config = {
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:' + npmConfig.clientPort,
    // set to "custom" instead of cucumber.
    framework: 'custom',
    specs: [
        'test/features/**/*.feature'
    ],
    // path relative to the current config file
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: 'test/features/**/steps/*_steps.js',
        format: 'pretty'
    },
    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },
    plugins : [{
        path: 'node_modules/protractor-istanbul-plugin'
    }]
};