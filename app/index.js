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
      name: 'drupalVersion',
      message: 'Which Drupal version?',
      type: 'list',
      choices: [{
        name: 'Drupal 7',
        value: 'd7'
      }, {
        name: 'Drupal 8',
        value: 'd8'
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
      }, {
        name: 'Modernizr',
        value: 'modernizr',
        checked: false
      }]
    }
  ];

  this.prompt(prompts, function (props) {

    var features = props.features;

    this.themeDesc = props.themeDesc;
    this.styleSASS = (props.themeStyles === 's') ? true : false;
    this.styleCOMPASS = (props.themeStyles === 'c') ? true : false;
    this.drupalVersion = props.drupalVersion;
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
  }
  if (this.styleSASS || this.styleCOMPASS || this.compassBootstrap || this.frondly) {
    this.template('__config.scss', 'sass/_config.scss');
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
  // Drupal 7
  if (this.drupalVersion === 'd7') {
    this.template('d7/_theme.info', tn + '.info');
  }
  // Drupal 8

};

DrupalthemeGenerator.prototype.themeImages = function themeImages() {
  this.copy('_screenshot.png', 'screenshot.png');
  this.copy('_logo.png', 'logo.png');
};

DrupalthemeGenerator.prototype.packageFiles = function packageFiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('bowerrc', '.bowerrc');
};

DrupalthemeGenerator.prototype.projectFiles = function projectFiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
