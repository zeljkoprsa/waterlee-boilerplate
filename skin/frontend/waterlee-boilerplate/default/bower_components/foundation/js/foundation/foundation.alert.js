;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

<<<<<<< HEAD
    version : '5.0.0',
=======
    version : '5.2.0',
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
<<<<<<< HEAD
      $(this.scope).off('.alert').on('click.fndtn.alert', '[data-alert] a.close', function (e) {
          var alertBox = $(this).closest("[data-alert]"),
              settings = alertBox.data('alert-init');

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          $(this).trigger('closed').remove();
=======
      var self = this,
          S = this.S;

      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] a.close', function (e) {
          var alertBox = S(this).closest('[' + self.attr_name() + ']'),
              settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          S(this).trigger('closed').remove();
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
          settings.callback();
        });
      });
    },

    reflow : function () {}
  };
<<<<<<< HEAD
}(jQuery, this, this.document));
=======
}(jQuery, this, this.document));
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
