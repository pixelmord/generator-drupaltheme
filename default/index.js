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

  this.themeName = this.env.themeName || 'nameless';
  this.themeDesc = this.env.themeDesc || 'nameless theme description';
  this.themeMachineName = this.env.themeMachineName || 'nameless';

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DrupalthemeGenerator, yeoman.generators.Base);

DrupalthemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();


  var prompts = [
    {
      name: 'drupalVersion',
      message: 'Which Drupal version?',
      type: 'list',
      choices: [{
        name: 'Drupal 7',
        value: 'd7'
      }]
    },
    {
      name: 'themeStyles',
      message: 'Add Sass, or Compass or NO css preprocessor support',
      type: 'list',
      choices: [{
        name: 'SCSS',
        value: 's'
      }, {
        name: 'COMPASS',
        value: 'c'
      }, {
        name: 'NO (plain CSS)',
        value: 'n'
      }]
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Twitter Bootstrap for Sass/Compass',
        value: 'compassBootstrap',
        checked: false
      }, {
        name: 'Frondly - the (Drupal-)friendly front-end framework',
        value: 'frondly',
        checked: false
      }]
    }
  ];

  this.prompt(prompts, function (props) {

    var features = props.features;
    this.styleSASS = (props.themeStyles === 's') ? true : false;
    this.styleCOMPASS = (props.themeStyles === 'c') ? true : false;
    this.drupalVersion = props.drupalVersion;
    this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
    this.frondly = features.indexOf('frondly') !== -1;

    cb();
  }.bind(this));
};

DrupalthemeGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('css');
  this.mkdir('images');
  if (this.styleSASS || this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.mkdir('sass');
  }
};

DrupalthemeGenerator.prototype.themeStyles = function themeStyles() {
  this.template('_style.css', 'css/style.css');
  this.template('_editor.css', 'css/editor.css');
  if (this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.template('_config.rb', 'config.rb');
  }
  if (this.styleSASS || this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.template('__config.scss', 'sass/_config.scss');
    this.template('_editor.scss', 'sass/editor.scss');
    this.template('_style.scss', 'sass/style.scss');
  }
};

DrupalthemeGenerator.prototype.themeScripts = function themeScripts() {
  var tn = this.themeMachineName;
  this.template('_javascript.js', 'js/' + tn + '.js');
};

DrupalthemeGenerator.prototype.themeInfo = function themeInfo() {
  var tn = this.themeMachineName;
  // Drupal 7
  if (this.drupalVersion === 'd7') {
    this.template('d7/_theme.info', tn + '.info');
  }
  // Drupal 8

};

DrupalthemeGenerator.prototype.themeTemplates = function themeTemplates() {
  // Drupal 7
  if (this.drupalVersion === 'd7') {
    this.template('d7/_template.php', 'template.php');
    this.directory('d7/templates', 'templates');
  }
  // Drupal 8

};

DrupalthemeGenerator.prototype.themeImages = function themeImages() {
  this.copy('_screenshot.png', 'screenshot.png');
  this.copy('_logo.png', 'logo.png');
};

DrupalthemeGenerator.prototype.bowerFiles = function bowerFiles() {
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

DrupalthemeGenerator.prototype.packageFiles = function packageFiles() {
  this.packageInfo = {
    "name": this.themeMachineName,
    "version": "0.0.0"
  };
  this.template('_package.json', 'package.json');
};
