'use strict';
var generators = require('yeoman-generator');
var optionOrPrompt = require('yeoman-option-or-prompt');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mixinLodash = require('../../libs/mixinLodash');
var mixinBeautify = require('../../libs/mixinBeautify');
var mixinFile = require('../../libs/mixinFile');
var mixinNotifier = require('../../libs/mixinNotifier');
var mixinInspector = require('../../libs/mixinInspector');

module.exports = generators.Base.extend({

    _optionOrPrompt: optionOrPrompt,

    constructor: function() {
        generators.Base.apply(this, arguments);

        // applying mixins
        mixinLodash.extend(this);
        mixinBeautify.extend(this);
        mixinFile.extend(this);
        mixinNotifier.extend(this);
        mixinInspector.extend(this);

        // Registering file transforms
        this.mixins.beautifyJson();

        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this.mixins.dasherize(this.appname);

        //******* arguments ***********
        // To access arguments later use this.argumentName
        this.argument('appname', {
            desc: 'The application name',
            type: String,
            optional: true,
            required: false,
            defaults: this.appname
        });

        this.appname = this.mixins.dasherize(this.appname);
        this.serverhostname = this.mixins.hostify(this.appname);
        // ***** arguments ********

        // ****** options *********
        // To access options later use this.options.optionName
        this.option('skip-install', {
            desc: 'Skip the bower and node installations',
            type: Boolean,
            defaults: false
        });

    },

    initializing: function() {
        var done = this.async();
        var self = this;
        this.pkg = this.mixins.readJsonFile('../../package.json', __dirname);
        this.mixins.notifyUpdate(this.pkg, function(message) {
            if (message) {
                self.log(message);
            }
            done();
        });

    },

    prompting: function() {

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the tools team\'s ' + chalk.yellow(this.mixins.getGeneratorShortname()) + ' generator!'));
        this.log('Out of the box I create a React-Redux application .\n');
        var done = this.async();
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?',
                default: this.mixins.dasherize(this.appname)
            },
            {
                type: 'input',
                name: 'serverhostname',
                message: 'What is the server host name for your project?',
                default: this.mixins.hostify(this.appname)
            },
            {
                type: 'input',
                name: 'clientFolder',
                message: 'In which folder would you like your scripts?',
                default: 'src'
            }];
        this._optionOrPrompt(prompts, function(answers) {
            this.answers = answers;

            this.appname = this.answers.appname ? this.mixins.dasherize(this.answers.appname) : this.mixins.dasherize(this.appname);
            this.appTitle = this.mixins.upperCasify(this.appname);
            this.appShortName = this.appname.split('-')[0];
            this.serverhostname = this.answers.serverhostname ? this.answers.serverhostname : this.mixins.hostify(this.appname);
            // To access answers later use this.answers.someAnswer;
            this.answers.clientFolder = this.mixins.dasherize(this.answers.clientFolder);
            this.answers.targetname = this.mixins.dasherize(this.answers.targetname);
            done();
        }.bind(this));
    },

    configuring: function() {
        this.config.set('appname', this.appname);
        this.config.set('appShortName', this.appname.split('-')[0]);
        this.config.set('appTitle', this.appTitle);
        this.config.set('clientFolder', this.answers.clientFolder);
        this.config.set('currentYear', new Date().getFullYear());
        this.config.set('deployFolder', 'deployment');
        this.config.set('filenameCase', this.filenameCase);
        this.config.set('filenameSuffix', this.filenameSuffix);
        this.config.set('serverhostname', this.answers.serverhostname);
        this.config.set('testFolder', 'test');
        this.composeWith(this.mixins.getGeneratorShortname() + ':target', {
            //args: this.options.target ? [this.options.target] : null,
            options: {
                clientFolder: this.config.get('clientFolder') // passing the client folder for first run
            }
        });
    },

    writing: function() {

        this.configOptions = this.config.getAll();

        this.mixins.createDirSync(this.destinationPath(this.answers.clientFolder));
        //this.mixins.createDirSync('test');
        //this.fs.write(this.destinationPath('test/.gitignore'), '');

        this.fs.copy(
            this.templatePath('.idea'),
            this.destinationPath('.idea')
        );

        this.fs.copy(
            this.templatePath('json-server'),
            this.destinationPath('json-server')
        );

        this.fs.copyTpl(
            this.templatePath('_babelrc'),
            this.destinationPath('.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('_eslintrc'),
            this.destinationPath('.eslintrc')
        );

        this.fs.copyTpl(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('_istanbul.yml'),
            this.destinationPath('.istanbul.yml')
        );

        this.fs.copyTpl(
            this.templatePath('_npmrc'),
            this.destinationPath('.npmrc')
        );

        this.fs.copyTpl(
            this.templatePath('_nvmrc'),
            this.destinationPath('.nvmrc')
        );

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                appname: this.appname,
                clientFolder: this.answers.clientFolder
            }
        );

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'), {
                appname: this.appname
            }
        );

        this.fs.copyTpl(
            this.templatePath('cucumber.yml'),
            this.destinationPath('cucumber.yml')
        );

        this.fs.copyTpl(
            this.templatePath('docker-compose.yml'),
            this.destinationPath('docker-compose.yml')
        );

        this.fs.copyTpl(
            this.templatePath('protractor.acceptance.conf.js'),
            this.destinationPath('protractor.acceptance.conf.js')
        );

        this.fs.copyTpl(
            this.templatePath('protractor.conf.js'),
            this.destinationPath('protractor.conf.js')
        );

        this.fs.copyTpl(
            this.templatePath('routes.json'),
            this.destinationPath('routes.json')
        );

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

    },

    conflicts: function() {

    },

    install: function() {
        this.npmInstall(null, {
            skipInstall: this.options['skip-install']
        });
    }
});
