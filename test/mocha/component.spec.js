'use strict';
var assert = require('yeoman-assert');
//var helpers = require('yeoman-test');
var testHelper = require('./testHelper');
//var generatorFullname = testHelper.mixins.getGeneratorFullname(); // generator-tools-seed
var generatorShortname = testHelper.mixins.getGeneratorShortname(); // tools-seed

describe(generatorShortname + ':component', function() {
    var targetname = 'app';
    var clientFolder = 'client';
    var componentname = 'my-dummy';

    var config = testHelper.getYoRc({
        clientFolder: clientFolder
    });

    describe('with target type web', function() {
        before(function(done) {
            var self = this;
            testHelper.runGenerator('component')
                .withArguments([targetname, componentname])
                .withOptions({
                    targettype: 'web'
                })
                .inTmpDir(function(dir) {
                    // setting up expected files
                    testHelper.createFolderStructure(config, dir, clientFolder, targetname);
                })
                .on('ready', function(generator) {
                    self.generator = generator;
                })
                .on('end', done);
        });

        it('creates expected files', function() {
            var pathdir = clientFolder + '/app/components/my-dummy/';

            var expectedFiles = [
                pathdir + 'index.ts',
                pathdir + 'template.html',
                pathdir + 'style.scss',
                pathdir + 'spec.ts'
            ];

            assert.file(expectedFiles);

            var expectedContents = [
                [pathdir + 'index.ts', /export class MyDummyComponent/],
                [pathdir + 'index.ts', /selector: 'my-dummy'/],
                [pathdir + 'spec.ts', /import {MyDummyComponent} from '\.\/index';/],
                [pathdir + 'template.html', /<div>myDummy<\/div>/]

            ];
            assert.fileContent(expectedContents);

        });
    });
});
