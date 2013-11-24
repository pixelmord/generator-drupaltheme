# Generator-drupaltheme
[![Build Status](https://secure.travis-ci.org/pixelmord/generator-drupaltheme.png?branch=master)](https://travis-ci.org/pixelmord/generator-drupaltheme)

A generator for Yeoman.
(!Important! This is work in progress right now, so keep calm and describe your issues in the queue on github)

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-drupaltheme`
- Run: `yo drupaltheme`

## Current functionality includes:
- info file
- placeholder images for logo and screenshot
- bower, editor and jshint config
- choice of CSS, SCSS or COMPASS scaffolding
- HTML5 templates and preprocessing

## Roadmap

### Common
- directory structure documentation
- Grunt integration
  - linting
  - compiling
  - uglyfying
  - optimization
  - live reloading
- Drupal logo in generator ;)

### Drupal 7
- more preprocessing with (sane) defaults
- better template.php structure with includes
- sub generator for panels/panelizer

### Drupal 8
- a choice for Drupal 8 flavor

### individual template support
- pick up app and template configuration in user homedir
- select by base theme context

### drush integration
- drush command to
  - pass Drupal environment variables to yeoman
  - pick up template configuration from (base)themes

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
