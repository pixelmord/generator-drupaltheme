#
# This file is only needed for Compass/Sass integration. If you are not using
# Compass, you may safely ignore or delete this file.
#
# If you'd like to learn more about Sass and Compass, see the sass/README.txt
# file for more information.
#


# Change this to :production when ready to deploy the CSS to the live server.
environment = :development
#environment = :production

# In development, we can turn on the FireSass-compatible debug_info.
firesass = false
#firesass = true


# Location of the theme's resources.
css_dir         = "css"
sass_dir        = "sass"
images_dir      = "images"
javascripts_dir = "js"


# Require any additional compass plugins here.
#require 'plugin'
<% if (frondly) { %>
# frondly would use susy plugin if you include one of the layout partials
require 'susy'
<% } %>
# State additional import paths here.
<% if (frondly) { %>
# Add import path to frondly sass partials
add_import_path "libraries/frondly/sass"
<% } %>
<% if (compassBootstrap) { %>
# Add bootstrap-sass as import path to use components and mixins from there
add_import_path "libraries/bootstrap-sass/lib"
<% } %>
##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions.
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# Pass options to sass. For development, we turn on the FireSass-compatible
# debug_info if the firesass config variable above is true.
sass_options = (environment == :development && firesass == true) ? {:debug_info => true} : {}
