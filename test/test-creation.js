/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('drupaltheme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('drupaltheme:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      '.jshintrc',
      '.editorconfig',
      'temp.info',
      'css/editor.css',
      'css/style.css',
      'js/temp.js'
    ];

    helpers.mockPrompt(this.app, {
      'themeDesc': 'mock theme decription',
      'drupalVersion': 'd7',
      'themeStyles': 'n',
      'features': []
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for SASS support', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sass/_config.scss',
      'sass/editor.scss',
      'sass/style.scss'
    ];

    helpers.mockPrompt(this.app, {
      'themeDesc': 'mock theme decription',
      'drupalVersion': 'd7',
      'themeStyles': 's',
      'features': []
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for COMPASS support', function (done) {
    var expected = [
      // add files you expect to exist here.
      'config.rb'
    ];

    helpers.mockPrompt(this.app, {
      'themeDesc': 'mock theme decription',
      'drupalVersion': 'd7',
      'themeStyles': 'c',
      'features': []
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
