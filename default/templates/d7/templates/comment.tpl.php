<?php
/**
 * @file
 * implementation for comments.
 *
 * Available variables:
 * for info on available variables
 * see modules/comment/comment.tpl.php
 *
 * @see template_preprocess()
 * @see template_preprocess_comment()
 * @see this_theme_preprocess_comment()
 * @see template_process()
 * @see theme_comment()
 */
?>
<article class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <header>
    <p class="submitted">
      <?php print $picture; ?>
      <?php print $submitted; ?>
      <?php print $permalink; ?>
    </p>

    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <h3<?php print $title_attributes; ?>>
        <?php print $title; ?>
        <?php if ($new): ?>
          <mark class="new"><?php print $new; ?></mark>
        <?php endif; ?>
      </h3>
    <?php elseif ($new): ?>
      <mark class="new"><?php print $new; ?></mark>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <?php if ($status == 'comment-unpublished'): ?>
      <p class="unpublished"><?php print t('Unpublished'); ?></p>
    <?php endif; ?>
  </header>

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['links']);
    print render($content);
  ?>

  <?php if ($signature): ?>
    <footer class="user-signature">
      <?php print $signature; ?>
    </footer>
  <?php endif; ?>

  <?php print render($content['links']) ?>
</article><!-- /.comment -->
