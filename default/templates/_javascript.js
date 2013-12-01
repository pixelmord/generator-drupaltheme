(function ($) {

  Drupal.behaviors.<%= themeMachineName %> = {
    attach: function (context, settings) {
      $('body', context).click(function () {
        console.log('Hello world!')
      });
    }
  };

})(jQuery);
