'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CommonGenerator = module.exports = function CommonGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(CommonGenerator, yeoman.generators.Base);

CommonGenerator.prototype.app = function app() {
  // common templates
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
