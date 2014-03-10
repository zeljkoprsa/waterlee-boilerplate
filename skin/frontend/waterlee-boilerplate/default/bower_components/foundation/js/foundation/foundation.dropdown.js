;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

<<<<<<< HEAD
    version : '5.0.0',

    settings : {
      active_class: 'open',
=======
    version : '5.2.0',

    settings : {
      active_class: 'open',
      align: 'bottom',
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
      is_hover: false,
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      this.bindings(method, options);
    },

    events : function (scope) {
<<<<<<< HEAD
      var self = this;

      $(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[data-dropdown]', function (e) {
          var settings = $(this).data('dropdown-init');
          e.preventDefault();

          if (!settings.is_hover || Modernizr.touch) self.toggle($(this));
        })
        .on('mouseenter.fndtn.dropdown', '[data-dropdown], [data-dropdown-content]', function (e) {
          var $this = $(this);
          clearTimeout(self.timeout);

          if ($this.data('dropdown')) {
            var dropdown = $('#' + $this.data('dropdown')),
                target = $this;
          } else {
            var dropdown = $this;
                target = $("[data-dropdown='" + dropdown.attr('id') + "']");
          }

          var settings = target.data('dropdown-init');
          if (settings.is_hover) self.open.apply(self, [dropdown, target]);
        })
        .on('mouseleave.fndtn.dropdown', '[data-dropdown], [data-dropdown-content]', function (e) {
          var $this = $(this);
          self.timeout = setTimeout(function () {
            if ($this.data('dropdown')) {
              var settings = $this.data('dropdown-init');
              if (settings.is_hover) self.close.call(self, $('#' + $this.data('dropdown')));
            } else {
              var target = $('[data-dropdown="' + $(this).attr('id') + '"]'),
                  settings = target.data('dropdown-init');
=======
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
          e.preventDefault();
          if (!settings.is_hover || Modernizr.touch) self.toggle(S(this));
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          clearTimeout(self.timeout);

          if ($this.data(self.data_attr())) {
            var dropdown = S('#' + $this.data(self.data_attr())),
                target = $this;
          } else {
            var dropdown = $this;
                target = S("[" + self.attr_name() + "='" + dropdown.attr('id') + "']");
          }

          var settings = target.data(self.attr_name(true) + '-init') || self.settings;
          
          if(S(e.target).data(self.data_attr()) && settings.is_hover) {
            self.closeall.call(self);
          }
          
          if (settings.is_hover) self.open.apply(self, [dropdown, target]);
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          self.timeout = setTimeout(function () {
            if ($this.data(self.data_attr())) {
              var settings = $this.data(self.data_attr(true) + '-init') || self.settings;
              if (settings.is_hover) self.close.call(self, S('#' + $this.data(self.data_attr())));
            } else {
              var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
              if (settings.is_hover) self.close.call(self, $this);
            }
          }.bind(this), 150);
        })
        .on('click.fndtn.dropdown', function (e) {
<<<<<<< HEAD
          var parent = $(e.target).closest('[data-dropdown-content]');

          if ($(e.target).data('dropdown') || $(e.target).parent().data('dropdown')) {
            return;
          }
          if (!($(e.target).data('revealId')) && 
            (parent.length > 0 && ($(e.target).is('[data-dropdown-content]') || 
=======
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');

          if (S(e.target).data(self.data_attr()) || S(e.target).parent().data(self.data_attr())) {
            return;
          }
          if (!(S(e.target).data('revealId')) && 
            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') || 
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

<<<<<<< HEAD
          self.close.call(self, $('[data-dropdown-content]'));
        })
        .on('opened.fndtn.dropdown', '[data-dropdown-content]', this.settings.opened)
        .on('closed.fndtn.dropdown', '[data-dropdown-content]', this.settings.closed);

      $(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50)).trigger('resize');
=======
          self.close.call(self, S('[' + self.attr_name() + '-content]'));
        })
        .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.opened.call(this);
        })
        .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.closed.call(this);
        });

      S(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50));

      this.resize();
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
    },

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
<<<<<<< HEAD
        if ($(this).hasClass(self.settings.active_class)) {
          $(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class);
          $(this).trigger('closed');
=======
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class);

          self.S(this).trigger('closed', [dropdown]);
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
        }
      });
    },

<<<<<<< HEAD
=======
    closeall: function() {
      var self = this;
      $.each(self.S('[' + this.attr_name() + '-content]'), function() {
        self.close.call(self, self.S(this))
      });
    },

>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.active_class), target);
<<<<<<< HEAD
        dropdown.trigger('opened');
    },

    toggle : function (target) {
      var dropdown = $('#' + target.data('dropdown'));
=======
        dropdown.trigger('opened', [dropdown, target]);
    },

    data_attr: function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      var dropdown = this.S('#' + target.data(this.data_attr()));
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

<<<<<<< HEAD
      this.close.call(this, $('[data-dropdown-content]').not(dropdown));
=======
      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
      } else {
<<<<<<< HEAD
        this.close.call(this, $('[data-dropdown-content]'))
=======
        this.close.call(this, this.S('[' + this.attr_name() + '-content]'))
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
<<<<<<< HEAD
      var dropdown = $('[data-dropdown-content].open'),
          target = $("[data-dropdown='" + dropdown.attr('id') + "']");
=======
      var dropdown = this.S('[' + this.attr_name() + '-content].open'),
          target = this.S("[" + this.attr_name() + "='" + dropdown.attr('id') + "']");
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
<<<<<<< HEAD
      var offset_parent = dropdown.offsetParent(),
          position = target.offset();

      position.top -= offset_parent.offset().top;
      position.left -= offset_parent.offset().left;

      if (this.small()) {
        dropdown.css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: position.top + target.outerHeight()
        });
        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%');
      } else {
        if (!Foundation.rtl && $(window).width() > dropdown.outerWidth() + target.offset().left) {
          var left = position.left;
          if (dropdown.hasClass('right')) {
            dropdown.removeClass('right');
          }
        } else {
          if (!dropdown.hasClass('right')) {
            dropdown.addClass('right');
          }
          var left = position.left - (dropdown.outerWidth() - target.outerWidth());
        }

        dropdown.attr('style', '').css({
          position : 'absolute',
          top: position.top + target.outerHeight(),
          left: left
        });
=======
      this.clear_idx();

      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: p.top
        });

        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%');
      } else {
        var settings = target.data(this.attr_name(true) + '-init') || this.settings;

        this.style(dropdown, target, settings);
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
      }

      return dropdown;
    },

<<<<<<< HEAD
=======
    style : function (dropdown, target, settings) {
      var css = $.extend({position: 'absolute'}, 
        this.dirs[settings.align].call(dropdown, target, settings));

      dropdown.attr('style', '').css(css);
    },

    // return CSS property object
    // `this` is the dropdown
    dirs : {
      // Calculate target offset
      _base : function (t) {
        var o_p = this.offsetParent(),
            o = o_p.offset(),
            p = t.offset();

        p.top -= o.top;
        p.left -= o.left;

        return p;
      },
      top: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        this.addClass('drop-top');

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (Foundation.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), 
            top: p.top - this.outerHeight()};
        }

        return {left: p.left, top: p.top - this.outerHeight()};
      },
      bottom: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (self.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), top: p.top + t.outerHeight()};
        }

        return {left: p.left, top: p.top + t.outerHeight()};
      },
      left: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-left');

        return {left: p.left - this.outerWidth(), top: p.top};
      },
      right: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-right');

        return {left: p.left + t.outerWidth(), top: p.top};
      }
    },

    // Insert rule to style psuedo elements
    adjust_pip : function (pip_offset_base, p) {
      var sheet = Foundation.stylesheet;

      if (this.small()) {
        pip_offset_base += p.left - 8;
      }

      this.rule_idx = sheet.cssRules.length;

      var sel_before = '.f-dropdown.open:before',
          sel_after  = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (sheet.insertRule) {
        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },

    // Remove old dropdown rule index
    clear_idx : function () {
      var sheet = Foundation.stylesheet;

      if (this.rule_idx) {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },

>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off: function () {
<<<<<<< HEAD
      $(this.scope).off('.fndtn.dropdown');
      $('html, body').off('.fndtn.dropdown');
      $(window).off('.fndtn.dropdown');
      $('[data-dropdown-content]').off('.fndtn.dropdown');
      this.settings.init = false;
=======
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
>>>>>>> f21deea668bf64db73b5475062723accee28dfbb
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
