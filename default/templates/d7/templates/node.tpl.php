<?php

/**
 * @file
 * theme implementation to display a node.
 *
 * Available variables:
 * for info on available variables see modules/node/node.tpl.php
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see this_theme_preprocess_node()
 * @see template_process()
 */
?>
<article class="<?php print $classes; ?>"<?php print $attributes; ?> role="article">

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>" rel="bookmark"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($unpublished): ?>
    <p class="unpublished"><?php print t('Unpublished'); ?></p>
  <?php endif; ?>
  
  <?php if ($display_submitted): ?>
    <footer>
      <?php print $user_picture; ?>
      <p class="submitted"><?php print $submitted; ?></p>
    </footer>
  <?php endif; ?>

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    print render($content);
  ?>
  <?php print render($content['links']); ?>
  <?php print render($content['comments']); ?>
</article><!-- /.node -->
