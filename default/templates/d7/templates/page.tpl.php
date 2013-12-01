<?php

/**
 * @file
 * theme implementation to display a single Drupal page.
 *
 * Available variables:
 * for info on available variables see modules/system/page.tpl.php
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['navigation'] : Items for Navigation
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */
?>

  <div class="page">

    <header role="banner">

      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="logo">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a>
      <?php endif; ?>

      <?php if ($page['header'] || $debug): ?>
        <div class="header">
          <?php print render($page['header']); ?>
        </div>
      <?php endif; ?>

    </header> <!-- /.header -->

    <?php if ($page['navigation'] || $debug): ?>
      <div class="navigation">
        <?php print render($page['navigation']); ?>
      </div> <!-- /.navigation-->
    <?php endif; ?>

    <?php if ($page['highlighted'] || $debug): ?>
      <noscript class="system-messages">
        <div class="messages warning">
          <?php print t('For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.');?>
        </div>
      </noscript>
      <section class="highlighted">
        <?php print render($page['highlighted']); ?>
      </section> <!-- /.highlighted-->
    <?php endif; ?>

    <div class="main">

      <?php if($messages){ ?>
        <div class="system-messages">
          <?php print $messages; ?>
        </div>
      <?php } ?>

      <div class="content">

        <div class="main-content" role="main">
          <a id="main-content"></a>
          <?php print render($title_prefix); ?>
          <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
          <?php print render($title_suffix); ?>

          <?php if (!empty($tabs['#primary']) || !empty($action_links)): ?>
            <nav id="content-author-navigation">
              <?php if (!empty($tabs['#primary'])): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
              <?php print render($page['help']); ?>
              <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
            </nav>
          <?php endif; ?>

          <?php print render($page['content']); ?>

          <?php print $feed_icons; ?>
        </div>

      </div> <!-- /.content -->

      <?php if ($page['sidebar_first'] || $debug): ?>
        <aside class="sidebar-first" role="complementary">
          <?php print render($page['sidebar_first']); ?>
        </aside> <!-- /.sidebar-first -->
      <?php endif; ?>

      <?php if ($page['sidebar_second'] || $debug): ?>
        <aside class="sidebar-second" role="complementary">
          <?php print render($page['sidebar_second']); ?>
        </aside> <!-- /.sidebar-second -->
      <?php endif; ?>

    </div> <!-- /#main -->

    <?php if ($page['footer'] || $debug): ?>
      <footer class="footer" role="contentinfo">
        <?php print render($page['footer']); ?>
      </footer> <!-- /.footer -->
    <?php endif; ?>

  </div> <!-- /.page -->
