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

### NEW: drush integration

There is currently an experimental drush integration through a drush plugin.
See the sandbox project on drupal.org:
[drush themegenerator](http://drupal.org/sandbox/hydra/2143001)

It currently provides a
- drush command (drush gt) to
  - pass Drupal environment variables to yeoman
  - pick up yo generator configuration from (base)themes
  - pick up yo generator configuration from ~/.drush_themegenerator/starterkits folder

A sample yo generator configuration can be found here:
[gt_blueprints](https://github.com/wunderkraut/gt_blueprints)

```bash
    $ mkdir ~/.drush_themegenerator/
    $ cd ~/.drush_themegenerator/
    $ git clone https://github.com/wunderkraut/gt_blueprints starterkits
```


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

## License
[GPL License](http://www.gnu.org/licenses/gpl)
