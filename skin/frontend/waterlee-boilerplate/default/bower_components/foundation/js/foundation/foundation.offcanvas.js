;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

<<<<<<< HEAD
    version : '5.0.0',
=======
    version : '5.2.0',
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
<<<<<<< HEAD
      $(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          $(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          $(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          $(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          $(".off-canvas-wrap").removeClass("move-left");
=======
      var S = this.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-left");
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
        });
    },

    reflow : function () {}
  };
<<<<<<< HEAD
}(jQuery, this, this.document));
=======
}(jQuery, this, this.document));
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
