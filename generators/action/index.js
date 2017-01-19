'use strict';
var path = require('path');
var ComponentGenerator = require('../componentGenerator');
var Generator = module.exports = ComponentGenerator.extend({

    constructor: function() {
        this.basetype = 'epic'; // this will create a property this.componentname
        this.basefolder = 'epics'; // this is the folder for the components
        this.hasOwnFolder = true; // to specify if the component files should be in a subfolder
        this.isDasherize = true; // to specify that the file name should be dasherized
        ComponentGenerator.apply(this, arguments);

        this.option('targettype', {
            desc: 'The type of target',
            type: String,
            hide: false
        });
    },

    initializing: function() {
        Generator.__super__.initializing.apply(this, arguments);
        this.mixins.beautifyJs();
        this.mixins.beautifyTs();
    },

    prompting: function() {
        var done = this.async();
        var self = this;
        var extraPrompts = [{
            type: 'list',
            name: 'targettype',
            default: 'react',
            when: function() {
                return !self.options.targettype || self.options.targettype.length <= 0;
            },
            message: 'What type of epic do you want to create?',
            choices: ['simple', 'ajax']
        }];
        Generator.__super__.prompting.call(this, done, extraPrompts);

    },

    configuring: function() {
        Generator.__super__.configuring.apply(this, arguments);
        this[this.basetype + 'name'] = this.mixins.camelize(this[this.basetype + 'name'] || this.answers[this.basetype + 'name']);
        this.targettype = this.answers.targettype || this.options.targettype;
    },

    writing: function() {
        var destinationPath = Generator.__super__.writing.apply(this, arguments);
        //var componentnameFile = this.componentname; //this.mixins.dasherize(this.componentname); // could be componentname
        switch (this.targettype) {
            case 'ajax':

                // Epic
                this.fs.copyTpl(
                    this.templatePath('ajax/_epic.js'),
                    this.destinationPath(path.join(destinationPath, '../','index.js')), {
                        epicname: this.epicname,
                        actiontypeprefix: this.mixins.actionify(this.epicname)
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('ajax/_epic.spec.js'),
                    this.destinationPath(path.join(destinationPath, '../', 'spec.js')), {
                        epicname: this.epicname,
                        actiontypeprefix: this.mixins.actionify(this.epicname)
                    }
                );

                // Actions
                this.fs.copyTpl(
                    this.templatePath('ajax/actions/_action-types.js'),
                    this.destinationPath(path.join(destinationPath, '../../actions/', 'action-types.js')), {
                        epicname: this.epicname,
                        actiontypeprefix: this.mixins.actionify(this.epicname)
                    }
                );

                this.fs.copyTpl(
                    this.templatePath('ajax/actions/_action.js'),
                    this.destinationPath(path.join(destinationPath, '../../actions/', 'index.js')), {
                        epicname: this.epicname,
                        actiontypeprefix: this.mixins.actionify(this.epicname)
                    }
                );


                this.fs.copyTpl(
                    this.templatePath('ajax/actions/_action.spec.js'),
                    this.destinationPath(path.join(destinationPath, '../../actions/', 'spec.js')), {
                        epicname: this.epicname,
                        actiontypeprefix: this.mixins.actionify(this.epicname)
                    }
                );

                break;
        }
    }

});
