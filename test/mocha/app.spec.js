'use strict';
var assert = require('yeoman-assert');
var testHelper = require('./testHelper');

var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-redux-observable
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // redux-observable

describe(generatorShortname + ':app', function() {

    var appname = 'Name x';
    var clientFolder = 'myclientfolder';

    describe('scaffolding', function() {
        before(function(done) {
            testHelper.runGenerator('app', null, [generatorShortname + ':target'])
                .withArguments([appname])
                .withPrompts({
                    clientFolder: clientFolder
                })
                .on('ready', function(generator) {
                    // mock notifyUpdate
                    generator.mixins.notifyUpdate = function(pckg, cb) {
                        cb();
                    };
                })
                .on('end', done);
        });

        it('creates expected files', function() {
            var expectedFiles = [
                '.eslintignore',
                '.eslintrc.json',
                '.gitignore',
                '.npmrc',
                'package.json',
                'README.md',
                'webpack.config.js',
                'protractor.conf.js',
                'protractor.acceptance.conf.js',
                clientFolder
            ];
            assert.file(expectedFiles);
            assert.JSONFileContent('package.json', {
                name: 'app'
            });

        });

    });

    describe('clientFolder', function() {
        before(function(done) {
            testHelper.runGenerator('app', null, [generatorShortname + ':target'])
                .withArguments([appname])
                .withPrompts({
                    clientFolder: 'Dummy Folder'
                })
                .on('ready', function(generator) {
                    // mock notifyUpdate
                    generator.mixins.notifyUpdate = function(pckg, cb) {
                        cb();
                    };
                })
                .on('end', done);
        });

        it('should be transformed to snake case', function() {
            var content = {};
            content[generatorFullname] = {
                appname: 'name-x',
                clientFolder: 'dummy-folder'
            };
            assert.JSONFileContent('.yo-rc.json', content);
        });
    });

});
