<?php

/**
 * Override or insert variables into the html template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered. This is usually "html", but can
 *   also be "maintenance_page" since <%= themeName %>_preprocess_maintenance_page() calls
 *   this function to have consistent variables.
 */
function <%= themeName %>_preprocess_html(&$variables, $hook) {
  // Add variables and paths needed for HTML5 and responsive support.
  $variables['base_path'] = base_path();
  $variables['theme_path'] = drupal_get_path('theme', '<%= themeName %>');

  $variables['add_responsive_meta'] = TRUE;

  // Attributes for html element.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
    'class' => array('no-js'),
  );
}

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
function <%= themeName %>_process_html(&$variables, $hook) {
  // Flatten out html_attributes.
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
}

/**
 * Override or insert variables into the page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function <%= themeName %>_preprocess_page(&$variables, $hook) {
  // add a variable for debugging,
  // like showing all region containers even if they have no content
  $variables['debug'] = FALSE;

  // remove default message from main content if there is no content created yet.
  unset($variables['page']['content']['system_main']['default_message']);
}

/**
 * Override or insert variables into the page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 */
function <%= themeName %>_process_page(&$variables) {

  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function <%= themeName %>_preprocess_node(&$variables, $hook) {
  // Add a suggestion based on view_mode.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['view_mode'];
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];

  // Add a class based on view_mode.
  $variables['classes_array'][] = 'node-' . drupal_html_class($variables['view_mode']);
  $variables['classes_array'][] = 'node-' .  drupal_html_class($variables['type']) . '-' .  drupal_html_class($variables['view_mode']);

  // Add $unpublished variable.
  $variables['unpublished'] = (!$variables['status']) ? TRUE : FALSE;

  // Add pubdate to submitted variable.
  $variables['pubdate'] = '<time pubdate datetime="' . format_date($variables['node']->created, 'custom', 'c') . '">' . $variables['date'] . '</time>';
  if ($variables['display_submitted']) {
    $variables['submitted'] = t('Submitted by !username on !datetime', array('!username' => $variables['name'], '!datetime' => $variables['pubdate']));
  }

  $variables['title_attributes_array']['class'][] = 'node-title';
}

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
function <%= themeName %>_preprocess_comment(&$variables, $hook) {
  // If comment subjects are disabled, don't display them.
  if (variable_get('comment_subject_field_' . $variables['node']->type, 1) == 0) {
    $variables['title'] = '';
  }

  // Add pubdate to submitted variable.
  $variables['pubdate'] = '<time pubdate datetime="' . format_date($variables['comment']->created, 'custom', 'c') . '">' . $variables['created'] . '</time>';
  $variables['submitted'] = t('!username commented on !datetime', array('!username' => $variables['author'], '!datetime' => $variables['pubdate']));

  // Zebra striping.
  if ($variables['id'] == 1) {
    $variables['classes_array'][] = 'first';
  }
  if ($variables['id'] == $variables['node']->comment_count) {
    $variables['classes_array'][] = 'last';
  }
  $variables['classes_array'][] = $variables['zebra'];

  $variables['title_attributes_array']['class'][] = 'comment-title';
}

/**
 * Override or insert variables into the taxonomy term templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function <%= themeName %>_preprocess_taxonomy_term(&$variables) {
  // Add a suggestion based on view_mode.
  $variables['theme_hook_suggestions'][] = 'term__' . $variables['view_mode'];
  $variables['theme_hook_suggestions'][] = 'term__' . $variables['vocabulary_machine_name'] . '__' . $variables['view_mode'];

  // Add a class based on view_mode.
  $variables['classes_array'][] = 'term-' . drupal_html_class($variables['view_mode']);
  $variables['classes_array'][] = 'term-' .  drupal_html_class($variables['vocabulary_machine_name']) . '-' .  drupal_html_class($variables['view_mode']);

  $variables['title_attributes_array']['class'][] = 'term-title';
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function <%= themeName %>_preprocess_block(&$variables, $hook) {

  $variables['classes_array'][] = $variables['block_zebra'];

  $variables['title_attributes_array']['class'][] = 'block-title';

  // Add Aria Roles via attributes.
  // Suggest a navigation block template if appropriate.
  switch ($variables['block']->module) {
    case 'admin':
      switch ($variables['block']->delta) {
        case 'menu':
          // Suggest a navigation block template and set role
          $variables['theme_hook_suggestions'][] = 'block__navigation';
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'system':
      switch ($variables['block']->delta) {
        case 'main':
          // Note: the "main" role goes in the page.tpl, not here.
          // Use a template with no wrapper for the page's main content.
          $variables['theme_hook_suggestions'][] = 'block__no_wrapper';
          break;
        case 'help':
        case 'powered-by':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        default:
          // Any other "system" block is a menu block.
          $variables['theme_hook_suggestions'][] = 'block__navigation';
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'menu':
      // add a class indicating the menu name
      $variables['classes_array'][] = drupal_html_class($variables['block']->delta);
    case 'menu_block':
    case 'blog':
    case 'book':
    case 'comment':
    case 'forum':
    case 'shortcut':
    case 'statistics':
      $variables['theme_hook_suggestions'][] = 'block__navigation';
      $variables['attributes_array']['role'] = 'navigation';
      break;
    case 'search':
      $variables['attributes_array']['role'] = 'search';
      break;
    case 'help':
    case 'aggregator':
    case 'locale':
    case 'poll':
    case 'profile':
      $variables['attributes_array']['role'] = 'complementary';
      break;
    case 'node':
      switch ($variables['block']->delta) {
        case 'syndicate':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        case 'recent':
          $variables['theme_hook_suggestions'][] = 'block__navigation';
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'user':
      switch ($variables['block']->delta) {
        case 'login':
          $variables['attributes_array']['role'] = 'form';
          break;
        case 'new':
        case 'online':
          $variables['attributes_array']['role'] = 'complementary';
          break;
      }
      break;
    case 'views':
      // Add view css classes to block
      if (isset($variables['elements']['#views_contextual_links_info']['views_ui']['view']->display['default']->display_options['css_class'])) {
        $views_css_classes = explode(' ', $variables['elements']['#views_contextual_links_info']['views_ui']['view']->display['default']->display_options['css_class']);
        $variables['classes_array'] = array_merge($variables['classes_array'], $views_css_classes);
      }
      break;
  }
  // In some regions, visually hide the title of any block, but leave it accessible.
  $region = $variables['block']->region;
  if ($region == 'header' ||
    $region == 'navigation' ||
    $region == 'highlighted') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function <%= themeName %>_process_block(&$variables, $hook) {
  // Drupal 7 should use a $title variable instead of $block->subject.
  $variables['title'] = $variables['block']->subject;
}

/**
 * Add some template suggestions
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 */
function <%= themeName %>_preprocess_panels_pane(&$variables) {
  $subtype = $variables['pane']->subtype;
  $layout = $variables['display']->layout;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $layout;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $subtype;
  $variables['theme_hook_suggestions'][] = 'panels_pane__' . $layout . '__' . $subtype;
}

/**
 * Implements hook_css_alter().
 */
function <%= themeName %>_css_alter(&$css) {

  // Remove Drupal default stylesheets
  $exclude = array(
    'modules/system/system.base.css' => FALSE,
    'modules/system/system.menus.css' => FALSE,
    'modules/system/system.messages.css' => FALSE,

    'modules/comment/comment.css' => FALSE,

    'modules/node/node.css' => FALSE,

    // jQuery UI
    'misc/ui/jquery.ui.core.css' => FALSE,
    'misc/ui/jquery.ui.theme.css' => FALSE,
    'misc/ui/jquery.ui.tabs.css' => FALSE,
  );

  $css = array_diff_key($css, $exclude);

  // remove some contrib stylesheets
  $fuzzy_exclude = array('twocol.css', 'ds_2col_stacked.css', 'panels.css');
  foreach ($css as $path => $meta) {
    foreach ($fuzzy_exclude as $css_file) {
      if (strpos($path, $css_file) !== FALSE) {
        unset($css[$path]);
      }
    }
  }
}
