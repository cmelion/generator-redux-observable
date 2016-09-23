'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var utils = {};
require('./mixinFile').extend(utils);

/**
 * Returns this generator full name so we can change it in package.json without altering the code
 * @returns {String} The generator full name
 */
var getGeneratorFullname = function() {
    var pkg = require('../package.json');
    return pkg.name;
};

/**
 * Returns this generator short name (without generator) so we can change it in package.json without altering the code
 * @returns {String} The generator short name
 */
var getGeneratorShortname = function() {
    var pkg = require('../package.json');
    return pkg.name.replace('generator-', '');
};

/**
 * Return the list of client targets
 * @param {String} clientFolder - The client folder
 * @returns {String[]} - An array of client targets
 */
var getClientTargets = function(clientFolder) {
    if (!clientFolder) {
        return [];
    }
    var pathdir = this.destinationPath(path.join(clientFolder, 'app'));
    if (!fs.existsSync(pathdir)) {
        return [];
    }
    //var re = /^(index-.*\.html|index\.html)$/;

    var result = fs.readdirSync(pathdir)
        .filter(function(file) {
            return fs.statSync(path.join(pathdir, file)).isDirectory() === true && utils.mixins.fileExistsSync(path.join(pathdir, file, 'index.html'));
        })
        .map(function(name) {
            var appname = path.basename(name, '.html');
            appname = appname === 'index' ? 'app' : _(appname.split('-')).last();
            return appname;
        });
    return result;
};

/**
 * Return the list of client modules
 * @param {String} clientFolder - The client folder
 * @param {String} moduleName - the module folder
 * @returns {String[]} - An array of client modules
 */
var getClientModules = function(clientFolder, moduleName) {
    var results = [];
    var charCountToIgnore = 'src/app/components/'.length;

    moduleName = moduleName || 'app';

    if (!clientFolder) {
        return [];
    }
    var pathString = path.join(clientFolder, moduleName, 'components');
    var pathdir = this.destinationPath(pathString);

    if (!fs.existsSync(pathdir)) {
        return [];
    }

    var result = fs.readdirSync(pathdir)
        .filter(function(file) {
            return fs.statSync(path.join(pathString, file)).isDirectory() === true;
        });

    result.forEach(function(module) {
        var includeSeparator = pathString.slice(charCountToIgnore).length > 0;
        results.push(path.join(pathString.slice(charCountToIgnore), includeSeparator ? '/' : '' , module));
        results = results.concat(getClientModules.apply(this, [pathString, module]));
    }, this);

    if (moduleName === 'app') {
        results.push('app');
    }

    return results;
};

/**
 * Converts the target name application to suffix
 * @param {String} targetname - The name of the target application
 *
 * @returns {String} - The suffix name of the target application
 */
var targetnameToSuffix = function(targetname) {
    return targetname === 'app' ? '' : 'app/components/' + targetname;
};

/**
 * The exported object
 * To apply the mixin execute: this.mixins.extend(generator);
 * @type {Object}
 */
module.exports = {
    extend: function(generator) {
        var mixins = generator.mixins = generator.mixins || {};
        mixins.getGeneratorFullname = getGeneratorFullname.bind(generator);
        mixins.getGeneratorShortname = getGeneratorShortname.bind(generator);
        mixins.getClientTargets = getClientTargets.bind(generator);
        mixins.targetnameToSuffix = targetnameToSuffix.bind(generator);
        mixins.getClientModules = getClientModules.bind(generator);
    }
};
