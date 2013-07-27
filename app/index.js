'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
_.str = require('underscore.string');

// Mix in non-conflicting functions to Underscore namespace and
// Generators.
//
// Examples
//
//    this._.humanize('stuff-dash')
//    this._.classify('hello-model');
//
_.mixin(_.str.exports());

var DrupalthemeGenerator = module.exports = function DrupalthemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // determine theme name from cwd and form a theme name according to Drupal standards
  this.dirName = path.basename(process.cwd());
  this.themeName = _(_.slugify(this.dirName)).underscored();

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DrupalthemeGenerator, yeoman.generators.Base);

DrupalthemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'themeDesc',
      message: 'Describe your theme:'
    },
    {
      name: 'themeStyles',
      message: 'Add Sass (S), or Compass (C) or NO (n) css preprocessor support',
      default: 's/C/n'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Twitter Bootstrap for Sass/Compass',
        value: 'compassBootstrap',
        checked: true
      }, {
        name: 'Frondly - the (Drupal-)friendly front-end framework',
        value: 'frondly',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'modernizr',
        checked: true
      }]
    }
  ];

  this.prompt(prompts, function (props) {

    var features = props.features;

    this.themeDesc = props.themeDesc;
    this.styleSASS = (/s/i).test(props.themeStyles) ? true : false;
    this.styleCOMPASS = (/c/i).test(props.themeStyles) ? true : false;
    if ((/n/i).test(props.themeStyles)) {
      this.styleSASS = false;
      this.styleCOMPASS = false;
    }

    this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
    this.frondly = features.indexOf('frondly') !== -1;
    this.modernizr = features.indexOf('modernizr') !== -1;

    cb();
  }.bind(this));
};

DrupalthemeGenerator.prototype.app = function app() {
  var tn = this.themeName;
  this.mkdir('js');
  this.mkdir('css');
  this.mkdir('images');
  this.mkdir('templates');
  if (this.styleSASS || this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.mkdir('sass');
  }
};

DrupalthemeGenerator.prototype.themeStyles = function themeStyles() {
  var tn = this.themeName;
  this.template('_style.css', 'css/style.css');
  this.template('_editor.css', 'css/editor.css');
  if (this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.template('_config.rb', 'config.rb');
    this.template('_Gemfile', 'Gemfile');
  }
  if (this.styleSASS || this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.template('__base.scss', 'sass/_base.scss');
    this.template('_editor.scss', 'sass/editor.scss');
    this.template('_style.scss', 'sass/style.scss');
  }
};

DrupalthemeGenerator.prototype.themeScripts = function themeScripts() {
  var tn = this.themeName;
  this.template('_javascript.js', 'js/' + tn + '.js');
};

DrupalthemeGenerator.prototype.themeInfo = function themeInfo() {
  var tn = this.themeName;
  this.template('_theme.info', tn + '.info');
};

DrupalthemeGenerator.prototype.packageFiles = function packageFiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

DrupalthemeGenerator.prototype.projectFiles = function projectFiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
