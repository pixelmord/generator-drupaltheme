<?php

/**
 * @file
 * theme implementation to display a navigation block.
 * - a theme hook suggestion is added in preprocessing
 *   for all known system navigation blocks
 *
 * Available variables:
 * for info on available variables see modules/block/block.tpl.php
 *
 * @see template_preprocess()
 * @see template_preprocess_block()
 * @see template_process()
 */
?>
<nav id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <h4<?php print $title_attributes; ?>><?php print $title; ?></h4>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php print $content ?>

</nav>
