'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
_.str = require('underscore.string');
var drupalLogo = require('../common/drupal-logo');

_.mixin(_.str.exports());


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // determine theme name from cwd and form a theme name according to Drupal standards
  this.dirName = path.basename(process.cwd());
  this.themeName = _(_.slugify(this.dirName)).underscored();

  // argument definition for drush and fallback use
  this.argument('sourcepath', {
    desc: 'starterkit path',
    required: false,
    optional: true,
    type: String,
    defaults: 'default'
  });

  this.argument('destpath', {
    desc: 'destination path',
    required: false,
    optional: true,
    type: String,
    defaults: this.dirName
  });


  this.starterkitConfig = (this.sourcepath != 'default') ? JSON.parse(this.readFileAsString(path.join(this.sourcepath,  'package.json'))) : null;

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  console.log(drupalLogo.logo);

  this.hookFor('drupaltheme:common', {
    args: args
  });

  // set sourceRoot for starterkit templates
  if (this.sourcepath == 'default') {
    this.sourceRoot(path.join(__dirname, '../default/templates/'));
    this.env.register(path.join(__dirname, '../default/index.js'), 'drupaltheme:starterkit');
  }
  else {
    this.sourceRoot(this.sourcepath);
    this.env.register(path.join(this.sourcepath, 'index.js'), 'drupaltheme:starterkit');
  }
  this.hookFor('drupaltheme:starterkit', {
    args: args
  });



};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
      name: 'themeName',
      message: 'Name your theme:',
      default: this.themeName

    },
    {
      name: 'themeDesc',
      message: 'Describe your theme:'
    }
  ];

  this.prompt(prompts, function (props) {
    this.themeName = this.env.themeName = props.themeName;
    this.themeMachineName = this.env.themeMachineName = _.underscored((_.slugify(this.themeName)));
    this.themeDesc = this.env.themeDesc = props.themeDesc;
    // set destination path according to destination path + theme name
    if (this.destpath != this.dirName) {
      this.dirName = path.join(this.destpath, this.themeMachineName);
      this.destinationRoot(this.dirName);
    }
    cb();
  }.bind(this));
};
