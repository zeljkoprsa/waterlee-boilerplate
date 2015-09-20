/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */
window.Modernizr=function(a,b,c){function d(a){t.cssText=a}function e(a,b){return d(x.join(a+";")+(b||""))}function f(a,b){return typeof a===b}function g(a,b){return!!~(""+a).indexOf(b)}function h(a,b){for(var d in a){var e=a[d];if(!g(e,"-")&&t[e]!==c)return"pfx"==b?e:!0}return!1}function i(a,b,d){for(var e in a){var g=b[a[e]];if(g!==c)return d===!1?a[e]:f(g,"function")?g.bind(d||b):g}return!1}function j(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+z.join(d+" ")+d).split(" ");return f(b,"string")||f(b,"undefined")?h(e,b):(e=(a+" "+A.join(d+" ")+d).split(" "),i(e,b,c))}function k(){o.input=function(c){for(var d=0,e=c.length;e>d;d++)E[c[d]]=!!(c[d]in u);return E.list&&(E.list=!(!b.createElement("datalist")||!a.HTMLDataListElement)),E}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),o.inputtypes=function(a){for(var d,e,f,g=0,h=a.length;h>g;g++)u.setAttribute("type",e=a[g]),d="text"!==u.type,d&&(u.value=v,u.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&u.style.WebkitAppearance!==c?(q.appendChild(u),f=b.defaultView,d=f.getComputedStyle&&"textfield"!==f.getComputedStyle(u,null).WebkitAppearance&&0!==u.offsetHeight,q.removeChild(u)):/^(search|tel)$/.test(e)||(d=/^(url|email)$/.test(e)?u.checkValidity&&u.checkValidity()===!1:u.value!=v)),D[a[g]]=!!d;return D}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var l,m,n="2.8.3",o={},p=!0,q=b.documentElement,r="modernizr",s=b.createElement(r),t=s.style,u=b.createElement("input"),v=":)",w={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),y="Webkit Moz O ms",z=y.split(" "),A=y.toLowerCase().split(" "),B={svg:"http://www.w3.org/2000/svg"},C={},D={},E={},F=[],G=F.slice,H=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:r+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',r,'">',a,"</style>"].join(""),j.id=r,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=q.style.overflow,q.style.overflow="hidden",q.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),q.style.overflow=i),!!g},I=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return H("@media "+b+" { #"+r+" { position: absolute; } }",function(b){d="absolute"==(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position}),d},J=function(){function a(a,e){e=e||b.createElement(d[a]||"div"),a="on"+a;var g=a in e;return g||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(a,""),g=f(e[a],"function"),f(e[a],"undefined")||(e[a]=c),e.removeAttribute(a))),e=null,g}var d={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return a}(),K={}.hasOwnProperty;m=f(K,"undefined")||f(K.call,"undefined")?function(a,b){return b in a&&f(a.constructor.prototype[b],"undefined")}:function(a,b){return K.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=G.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(G.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(G.call(arguments)))};return d}),C.flexbox=function(){return j("flexWrap")},C.flexboxlegacy=function(){return j("boxDirection")},C.canvas=function(){var a=b.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},C.canvastext=function(){return!(!o.canvas||!f(b.createElement("canvas").getContext("2d").fillText,"function"))},C.webgl=function(){return!!a.WebGLRenderingContext},C.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:H(["@media (",x.join("touch-enabled),("),r,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},C.geolocation=function(){return"geolocation"in navigator},C.postmessage=function(){return!!a.postMessage},C.websqldatabase=function(){return!!a.openDatabase},C.indexedDB=function(){return!!j("indexedDB",a)},C.hashchange=function(){return J("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},C.history=function(){return!(!a.history||!history.pushState)},C.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},C.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},C.rgba=function(){return d("background-color:rgba(150,255,150,.5)"),g(t.backgroundColor,"rgba")},C.hsla=function(){return d("background-color:hsla(120,40%,100%,.5)"),g(t.backgroundColor,"rgba")||g(t.backgroundColor,"hsla")},C.multiplebgs=function(){return d("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(t.background)},C.backgroundsize=function(){return j("backgroundSize")},C.borderimage=function(){return j("borderImage")},C.borderradius=function(){return j("borderRadius")},C.boxshadow=function(){return j("boxShadow")},C.textshadow=function(){return""===b.createElement("div").style.textShadow},C.opacity=function(){return e("opacity:.55"),/^0.55$/.test(t.opacity)},C.cssanimations=function(){return j("animationName")},C.csscolumns=function(){return j("columnCount")},C.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return d((a+"-webkit- ".split(" ").join(b+a)+x.join(c+a)).slice(0,-a.length)),g(t.backgroundImage,"gradient")},C.cssreflections=function(){return j("boxReflect")},C.csstransforms=function(){return!!j("transform")},C.csstransforms3d=function(){var a=!!j("perspective");return a&&"webkitPerspective"in q.style&&H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=9===b.offsetLeft&&3===b.offsetHeight}),a},C.csstransitions=function(){return j("transition")},C.fontface=function(){var a;return H('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&0===g.indexOf(d.split(" ")[0])}),a},C.generatedcontent=function(){var a;return H(["#",r,"{font:0/0 a}#",r,':after{content:"',v,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},C.video=function(){var a=b.createElement("video"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(d){}return c},C.audio=function(){var a=b.createElement("audio"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(d){}return c},C.localstorage=function(){try{return localStorage.setItem(r,r),localStorage.removeItem(r),!0}catch(a){return!1}},C.sessionstorage=function(){try{return sessionStorage.setItem(r,r),sessionStorage.removeItem(r),!0}catch(a){return!1}},C.webworkers=function(){return!!a.Worker},C.applicationcache=function(){return!!a.applicationCache},C.svg=function(){return!!b.createElementNS&&!!b.createElementNS(B.svg,"svg").createSVGRect},C.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==B.svg},C.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(w.call(b.createElementNS(B.svg,"animate")))},C.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(w.call(b.createElementNS(B.svg,"clipPath")))};for(var L in C)m(C,L)&&(l=L.toLowerCase(),o[l]=C[L](),F.push((o[l]?"":"no-")+l));return o.input||k(),o.addTest=function(a,b){if("object"==typeof a)for(var d in a)m(a,d)&&o.addTest(d,a[d]);else{if(a=a.toLowerCase(),o[a]!==c)return o;b="function"==typeof b?b():b,"undefined"!=typeof p&&p&&(q.className+=" "+(b?"":"no-")+a),o[a]=b}return o},d(""),s=u=null,function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=s.elements;return"string"==typeof a?a.split(" "):a}function e(a){var b=r[a[p]];return b||(b={},q++,a[p]=q,r[q]=b),b}function f(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=e(c));var f;return f=d.cache[a]?d.cache[a].cloneNode():o.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!f.canHaveChildren||n.test(a)||f.tagUrn?f:d.frag.appendChild(f)}function g(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||e(a);for(var f=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function i(a){a||(a=b);var d=e(a);return!s.shivCSS||j||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||h(a,d),a}var j,k,l="3.7.0",m=a.html5||{},n=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,o=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p="_html5shiv",q=0,r={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",j="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){j=!0,k=!0}}();var s={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:l,shivCSS:m.shivCSS!==!1,supportsUnknownElements:k,shivMethods:m.shivMethods!==!1,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g};a.html5=s,i(b)}(this,b),o._version=n,o._prefixes=x,o._domPrefixes=A,o._cssomPrefixes=z,o.mq=I,o.hasEvent=J,o.testProp=function(a){return h([a])},o.testAllProps=j,o.testStyles=H,o.prefixed=function(a,b,c){return b?j(a,b,c):j(a,"pfx")},q.className=q.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(p?" js "+F.join(" "):""),o}(this,this.document);
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var i = class_array.length;
    var head = $('head');

    while (i--) {
      if (head.has('.' + class_array[i]).length === 0) {
        head.append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-small-only',
    'foundation-mq-medium',
    'foundation-mq-medium-only',
    'foundation-mq-large',
    'foundation-mq-large-only',
    'foundation-mq-xlarge',
    'foundation-mq-xlarge-only',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function () {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) {
            return context;
          }
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) {
      arr.push('data');
    }
    if (this.namespace.length > 0) {
      arr.push(this.namespace);
    }
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        bind = function(){
          var $this = S(this),
              should_bind_events = !$this.data(self.attr_name(true) + '-init');
          $this.data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options($this)));

          if (should_bind_events) {
            self.events(this);
          }
        };

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      bind.call(this.scope);
    } else {
      S('[' + this.attr_name() +']', this.scope).each(bind);
    }
    // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

  window.matchMedia || (window.matchMedia = function() {
      "use strict";

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
          var style       = document.createElement('style'),
              script      = document.getElementsByTagName('script')[0],
              info        = null;

          style.type  = 'text/css';
          style.id    = 'matchmediajs-test';

          script.parentNode.insertBefore(style, script);

          // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
          info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

          styleMedia = {
              matchMedium: function(media) {
                  var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                  // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                  if (style.styleSheet) {
                      style.styleSheet.cssText = text;
                  } else {
                      style.textContent = text;
                  }

                  // Test if media query is true or false
                  return info.width === '1px';
              }
          };
      }

      return function(media) {
          return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
          };
      };
  }());

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function(jQuery) {


  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + 'RequestAnimationFrame' ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + 'CancelAnimationFrame' ] ||
      window[ vendors[lastTime] + 'CancelRequestAnimationFrame' ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);

      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( $ ));

  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.5.2',

    media_queries : {
      'small'       : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'small-only'  : S('.foundation-mq-small-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'medium'      : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'medium-only' : S('.foundation-mq-medium-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'large'       : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'large-only'  : S('.foundation-mq-large-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xlarge'      : S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xlarge-only' : S('.foundation-mq-xlarge-only').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      'xxlarge'     : S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global : {
      namespace : undefined
    },

    init : function (scope, libraries, method, options, response) {
      var args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      S(window).load(function () {
        S(window)
          .trigger('resize.fndtn.clearing')
          .trigger('resize.fndtn.dropdown')
          .trigger('resize.fndtn.equalizer')
          .trigger('resize.fndtn.interchange')
          .trigger('resize.fndtn.joyride')
          .trigger('resize.fndtn.magellan')
          .trigger('resize.fndtn.topbar')
          .trigger('resize.fndtn.slider');
      });

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
              $.extend(true, this.libs[lib].settings, args[lib]);
            } else if (typeof this.libs[lib].defaults !== 'undefined') {
              $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace : function () {

      // Description:
      //    Don't bother reading the namespace out of the meta tag
      //    if the namespace has been set globally in javascript
      //
      // Example:
      //    Foundation.global.namespace = 'my-namespace';
      // or make it an empty string:
      //    Foundation.global.namespace = '';
      //
      //

      // If the namespace has not been set (is undefined), try to read it out of the meta element.
      // Otherwise use the globally defined namespace, even if it's empty ('')
      var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

      // Finally, if the namsepace is either undefined or false, set it to an empty string.
      // Otherwise use the namespace value.
      this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          if (timer == null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      //    Immediate (Bool): Whether the function should be called at the beginning
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) {
            result = func.apply(context, args);
          }
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options
      //    attribute.
      data_options : function (el, data_attr_name) {
        data_attr_name = data_attr_name || 'options';
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-' + data_attr_name);
              }

              return el.data(data_attr_name);
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';');
        ii = opts_arr.length;

        function isNumber (o) {
          return !isNaN (o - 0) && o !== null && o !== '' && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') {
            return $.trim(str);
          }
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) {
            p[1] = true;
          }
          if (/false/i.test(p[1])) {
            p[1] = false;
          }
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1]);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if (Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '"/>');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined && Foundation.stylesheet) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' +
              Foundation.media_queries[media] + '{ ' + rule + ' }', Foundation.stylesheet.cssRules.length);
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Function to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        function pictures_has_height(images) {
          var pictures_number = images.length;

          for (var i = pictures_number - 1; i >= 0; i--) {
            if(images.attr('height') === undefined) {
              return false;
            };
          };

          return true;
        }

        if (unloaded === 0 || pictures_has_height(images)) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) {
          this.fidx = 0;
        }
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      },

      // Description:
      //    Helper for window.matchMedia
      //
      // Arguments:
      //    mq (String): Media query
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not
      match : function (mq) {
        return window.matchMedia(mq).matches;
      },

      // Description:
      //    Helpers for checking Foundation default media queries with JS
      //
      // Returns:
      //    (Boolean): Whether the media query passes or not

      is_small_up : function () {
        return this.match(Foundation.media_queries.small);
      },

      is_medium_up : function () {
        return this.match(Foundation.media_queries.medium);
      },

      is_large_up : function () {
        return this.match(Foundation.media_queries.large);
      },

      is_xlarge_up : function () {
        return this.match(Foundation.media_queries.xlarge);
      },

      is_xxlarge_up : function () {
        return this.match(Foundation.media_queries.xxlarge);
      },

      is_small_only : function () {
        return !this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_medium_only : function () {
        return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_large_only : function () {
        return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up();
      },

      is_xxlarge_only : function () {
        return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up();
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, window, window.document));

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.5.2',

    settings : {
      active_class : 'open',
      disabled_class : 'disabled',
      mega_class : 'mega',
      align : 'bottom',
      is_hover : false,
      hover_timeout : 150,
      opened : function () {},
      closed : function () {}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
          if (!settings.is_hover || Modernizr.touch) {
            e.preventDefault();
            if (S(this).parent('[data-reveal-id]').length) {
              e.stopPropagation();
            }
            self.toggle($(this));
          }
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this),
              dropdown,
              target;

          clearTimeout(self.timeout);

          if ($this.data(self.data_attr())) {
            dropdown = S('#' + $this.data(self.data_attr()));
            target = $this;
          } else {
            dropdown = $this;
            target = S('[' + self.attr_name() + '="' + dropdown.attr('id') + '"]');
          }

          var settings = target.data(self.attr_name(true) + '-init') || self.settings;

          if (S(e.currentTarget).data(self.data_attr()) && settings.is_hover) {
            self.closeall.call(self);
          }

          if (settings.is_hover) {
            self.open.apply(self, [dropdown, target]);
          }
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          var settings;

          if ($this.data(self.data_attr())) {
              settings = $this.data(self.data_attr(true) + '-init') || self.settings;
          } else {
              var target   = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
          }

          self.timeout = setTimeout(function () {
            if ($this.data(self.data_attr())) {
              if (settings.is_hover) {
                self.close.call(self, S('#' + $this.data(self.data_attr())));
              }
            } else {
              if (settings.is_hover) {
                self.close.call(self, $this);
              }
            }
          }.bind(this), settings.hover_timeout);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');
          var links  = parent.find('a');

          if (links.length > 0 && parent.attr('aria-autoclose') !== 'false') {
              self.close.call(self, S('[' + self.attr_name() + '-content]'));
          }

          if (e.target !== document && !$.contains(document.documentElement, e.target)) {
            return;
          }

          if (S(e.target).closest('[' + self.attr_name() + ']').length > 0) {
            return;
          }

          if (!(S(e.target).data('revealId')) &&
            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') ||
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

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
    },

    close : function (dropdown) {
      var self = this;
      dropdown.each(function (idx) {
        var original_target = $('[' + self.attr_name() + '=' + dropdown[idx].id + ']') || $('aria-controls=' + dropdown[idx].id + ']');
        original_target.attr('aria-expanded', 'false');
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right' : 'left', '-99999px')
            .attr('aria-hidden', 'true')
            .removeClass(self.settings.active_class)
            .prev('[' + self.attr_name() + ']')
            .removeClass(self.settings.active_class)
            .removeData('target');

          self.S(this).trigger('closed.fndtn.dropdown', [dropdown]);
        }
      });
      dropdown.removeClass('f-open-' + this.attr_name(true));
    },

    closeall : function () {
      var self = this;
      $.each(self.S('.f-open-' + this.attr_name(true)), function () {
        self.close.call(self, self.S(this));
      });
    },

    open : function (dropdown, target) {
      this
        .css(dropdown
        .addClass(this.settings.active_class), target);
      dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
      dropdown.data('target', target.get(0)).trigger('opened.fndtn.dropdown', [dropdown, target]);
      dropdown.attr('aria-hidden', 'false');
      target.attr('aria-expanded', 'true');
      dropdown.focus();
      dropdown.addClass('f-open-' + this.attr_name(true));
    },

    data_attr : function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      if (target.hasClass(this.settings.disabled_class)) {
        return;
      }
      var dropdown = this.S('#' + target.data(this.data_attr()));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
        if (dropdown.data('target') !== target.get(0)) {
          this.open.call(this, dropdown, target);
        }
      } else {
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[' + this.attr_name() + '-content].open');
      var target = $(dropdown.data("target"));

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8),
          settings = target.data(this.attr_name(true) + '-init') || this.settings,
          parentOverflow = dropdown.parent().css('overflow-y') || dropdown.parent().css('overflow');

      this.clear_idx();



      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target, settings);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width : '95%',
          'max-width' : 'none',
          top : p.top
        });

        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
      }
      // detect if dropdown is in an overflow container
      else if (parentOverflow !== 'visible') {
        var offset = target[0].offsetTop + target[0].offsetHeight;

        dropdown.attr('style', '').css({
          position : 'absolute',
          top : offset
        });

        dropdown.css(Foundation.rtl ? 'right' : 'left', left_offset);
      }
      else {

        this.style(dropdown, target, settings);
      }

      return dropdown;
    },

    style : function (dropdown, target, settings) {
      var css = $.extend({position : 'absolute'},
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

        //set some flags on the p object to pass along
        p.missRight = false;
        p.missTop = false;
        p.missLeft = false;
        p.leftRightFlag = false;

        //lets see if the panel will be off the screen
        //get the actual width of the page and store it
        var actualBodyWidth;
        if (document.getElementsByClassName('row')[0]) {
          actualBodyWidth = document.getElementsByClassName('row')[0].clientWidth;
        } else {
          actualBodyWidth = window.innerWidth;
        }

        var actualMarginWidth = (window.innerWidth - actualBodyWidth) / 2;
        var actualBoundary = actualBodyWidth;

        if (!this.hasClass('mega')) {
          //miss top
          if (t.offset().top <= this.outerHeight()) {
            p.missTop = true;
            actualBoundary = window.innerWidth - actualMarginWidth;
            p.leftRightFlag = true;
          }

          //miss right
          if (t.offset().left + this.outerWidth() > t.offset().left + actualMarginWidth && t.offset().left - actualMarginWidth > this.outerWidth()) {
            p.missRight = true;
            p.missLeft = false;
          }

          //miss left
          if (t.offset().left - this.outerWidth() <= 0) {
            p.missLeft = true;
            p.missRight = false;
          }
        }

        return p;
      },

      top : function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t);

        this.addClass('drop-top');

        if (p.missTop == true) {
          p.top = p.top + t.outerHeight() + this.outerHeight();
          this.removeClass('drop-top');
        }

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (Foundation.rtl) {
          return {left : p.left - this.outerWidth() + t.outerWidth(),
            top : p.top - this.outerHeight()};
        }

        return {left : p.left, top : p.top - this.outerHeight()};
      },

      bottom : function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t);

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth() + t.outerWidth();
        }

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        if (self.rtl) {
          return {left : p.left - this.outerWidth() + t.outerWidth(), top : p.top + t.outerHeight()};
        }

        return {left : p.left, top : p.top + t.outerHeight()};
      },

      left : function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-left');

        if (p.missLeft == true) {
          p.left =  p.left + this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-left');
        }

        return {left : p.left - this.outerWidth(), top : p.top};
      },

      right : function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-right');

        if (p.missRight == true) {
          p.left = p.left - this.outerWidth();
          p.top = p.top + t.outerHeight();
          this.removeClass('drop-right');
        } else {
          p.triggeredRight = true;
        }

        var self = Foundation.libs.dropdown;

        if (t.outerWidth() < this.outerWidth() || self.small() || this.hasClass(s.mega_menu)) {
          self.adjust_pip(this, t, s, p);
        }

        return {left : p.left + t.outerWidth(), top : p.top};
      }
    },

    // Insert rule to style psuedo elements
    adjust_pip : function (dropdown, target, settings, position) {
      var sheet = Foundation.stylesheet,
          pip_offset_base = 8;

      if (dropdown.hasClass(settings.mega_class)) {
        pip_offset_base = position.left + (target.outerWidth() / 2) - 8;
      } else if (this.small()) {
        pip_offset_base += position.left - 8;
      }

      this.rule_idx = sheet.cssRules.length;

      //default
      var sel_before = '.f-dropdown.open:before',
          sel_after  = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (position.missRight == true) {
        pip_offset_base = dropdown.outerWidth() - 23;
        sel_before = '.f-dropdown.open:before',
        sel_after  = '.f-dropdown.open:after',
        css_before = 'left: ' + pip_offset_base + 'px;',
        css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';
      }

      //just a case where right is fired, but its not missing right
      if (position.triggeredRight == true) {
        sel_before = '.f-dropdown.open:before',
        sel_after  = '.f-dropdown.open:after',
        css_before = 'left:-12px;',
        css_after  = 'left:-14px;';
      }

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

      if (typeof this.rule_idx !== 'undefined') {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off : function () {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.3.1',

    settings : {
      use_tallest: true,
      before_height_change: $.noop,
      after_height_change: $.noop,
      equalize_on_stack: true
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'image_loaded');
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        this.reflow();
      }.bind(this));
    },

    equalize: function(equalizer) {
      var isStacked = false,
          vals = equalizer.find('[' + this.attr_name() + '-watch]:visible'),
          settings = equalizer.data(this.attr_name(true)+'-init');

      if (vals.length === 0) return;
      var firstTopOffset = vals.first().offset().top;
      settings.before_height_change();
      equalizer.trigger('before-height-change').trigger('before-height-change.fndth.equalizer');
      vals.height('inherit');

      var heights = vals.map(function(){ return $(this).outerHeight(false) }).get();

      if (settings.use_tallest) {
        var max = Math.max.apply(null, heights);
        vals.css('height', max);
      } else {
        var min = Math.min.apply(null, heights);
        vals.css('height', min);
      }
      settings.after_height_change();
      equalizer.trigger('after-height-change').trigger('after-height-change.fndtn.equalizer');
    },

    reflow : function () {
      var self = this;

      this.S('[' + this.attr_name() + ']', this.scope).each(function(){
        var $eq_target = $(this);
        self.image_loaded(self.S('img', this), function(){
          self.equalize($eq_target)
        });
      });
    }
  };
})(jQuery, window, window.document);


;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.5.2',

    settings : {
      open_method : 'move',
      close_on_click : false
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          move_class = '',
          right_postfix = '',
          left_postfix = '';

      if (this.settings.open_method === 'move') {
        move_class = 'move-';
        right_postfix = 'right';
        left_postfix = 'left';
      } else if (this.settings.open_method === 'overlap_single') {
        move_class = 'offcanvas-overlap-';
        right_postfix = 'right';
        left_postfix = 'left';
      } else if (this.settings.open_method === 'overlap') {
        move_class = 'offcanvas-overlap';
      }

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + right_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.left-submenu').removeClass(move_class + right_postfix);
          }
          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + right_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.left-submenu').toggleClass(move_class + right_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + right_postfix);
          }
          $('.left-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + left_postfix);
          if (self.settings.open_method !== 'overlap') {
            S('.right-submenu').removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          var parent = S(this).parent();

          if (settings.close_on_click && !parent.hasClass('has-submenu') && !parent.hasClass('back')) {
            self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
            parent.parent().removeClass(move_class + left_postfix);
          } else if (S(this).parent().hasClass('has-submenu')) {
            e.preventDefault();
            S(this).siblings('.right-submenu').toggleClass(move_class + left_postfix);
          } else if (parent.hasClass('back')) {
            e.preventDefault();
            parent.parent().removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + left_postfix);
          S('.right-submenu').removeClass(move_class + left_postfix);
          if (right_postfix) {
            self.click_remove_class(e, move_class + right_postfix);
            S('.left-submenu').removeClass(move_class + left_postfix);
          }
          $('.right-off-canvas-toggle').attr('aria-expanded', 'true');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + left_postfix);
          $('.left-off-canvas-toggle').attr('aria-expanded', 'false');
          if (right_postfix) {
            self.click_remove_class(e, move_class + right_postfix);
            $('.right-off-canvas-toggle').attr('aria-expanded', 'false');
          }
        });
    },

    toggle : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      if ($off_canvas.is('.' + class_name)) {
        this.hide(class_name, $off_canvas);
      } else {
        this.show(class_name, $off_canvas);
      }
    },

    show : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('open.fndtn.offcanvas');
      $off_canvas.addClass(class_name);
    },

    hide : function (class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('close.fndtn.offcanvas');
      $off_canvas.removeClass(class_name);
    },

    click_toggle_class : function (e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(class_name, $off_canvas);
    },

    click_remove_class : function (e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(class_name, $off_canvas);
    },

    get_settings : function (e) {
      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']');
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },

    get_wrapper : function (e) {
      var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');

      if ($off_canvas.length === 0) {
        $off_canvas = this.S('.off-canvas-wrap');
      }
      return $off_canvas;
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version : '5.5.2',

    settings : {
      index : 0,
      start_offset : 0,
      sticky_class : 'sticky',
      custom_back_text : true,
      back_text : 'Back',
      mobile_show_parent_link : true,
      is_hover : true,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all',
      dropdown_autoclose: true
    },

    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section, .top-bar-section', this);
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();
        if (topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) {
          self.assemble(topbar);
        }

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        }

        // Pad body when sticky (scrolled) or fixed.
        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });

    },

    is_sticky : function (topbar, topbarContainer, settings) {
      var sticky     = topbarContainer.hasClass(settings.sticky_class);
      var smallMatch = matchMedia(Foundation.media_queries.small).matches;
      var medMatch   = matchMedia(Foundation.media_queries.medium).matches;
      var lrgMatch   = matchMedia(Foundation.media_queries.large).matches;

      if (sticky && settings.sticky_on === 'all') {
        return true;
      }
      if (sticky && this.small() && settings.sticky_on.indexOf('small') !== -1) {
        if (smallMatch && !medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.medium() && settings.sticky_on.indexOf('medium') !== -1) {
        if (smallMatch && medMatch && !lrgMatch) { return true; }
      }
      if (sticky && this.large() && settings.sticky_on.indexOf('large') !== -1) {
        if (smallMatch && medMatch && lrgMatch) { return true; }
      }

       return false;
    },

    toggle : function (toggleEl) {
      var self = this,
          topbar;

      if (toggleEl) {
        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .top-bar-section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left : '0%'});
          $('>.name', section).css({left : '100%'});
        } else {
          section.css({right : '0%'});
          $('>.name', section).css({right : '100%'});
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);

        topbar
          .toggleClass('expanded')
          .css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');

            window.scrollTo(0, 0);
          } else {
            topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if (self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if (topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },

    timer : null,

    events : function (bar) {
      var self = this,
          S = this.S;

      S(this.scope)
        .off('.topbar')
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
          e.preventDefault();
          self.toggle(this);
        })
        .on('click.fndtn.topbar contextmenu.fndtn.topbar', '.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]', function (e) {
            var li = $(this).closest('li'),
                topbar = li.closest('[' + self.attr_name() + ']'),
                settings = topbar.data(self.attr_name(true) + '-init');

            if (settings.dropdown_autoclose && settings.is_hover) {
              var hoverLi = $(this).closest('.hover');
              hoverLi.removeClass('hover');
            }
            if (self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown')) {
              self.toggle();
            }

        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if (target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) {
            return;
          }

          if (settings.is_hover && !Modernizr.touch) {
            return;
          }

          e.stopImmediatePropagation();

          if (li.hasClass('hover')) {
            li
              .removeClass('hover')
              .find('li')
              .removeClass('hover');

            li.parents('li.hover')
              .removeClass('hover');
          } else {
            li.addClass('hover');

            $(li).siblings().removeClass('hover');

            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
              e.preventDefault();
            }
          }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
          if (self.breakpoint()) {

            e.preventDefault();

            var $this = S(this),
                topbar = $this.closest('[' + self.attr_name() + ']'),
                section = topbar.find('section, .top-bar-section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
            } else {
              section.css({right : -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });

      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
          self.resize.call(self);
      }, 50)).trigger('resize.fndtn.topbar').load(function () {
          // Ensure that the offset is calculated after all of the pages resources have loaded
          S(this).trigger('resize.fndtn.topbar');
      });

      S('body').off('.topbar').on('click.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li.hover').removeClass('hover');
      });

      // Go up a level on Click
      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .top-bar-section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left : 100 * topbar.data('index') + '%'});
        } else {
          section.css({right : -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right : 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });

      // Show dropdown menus when their items are focused
      S(this.scope).find('.dropdown a')
        .focus(function () {
          $(this).parents('.has-dropdown').addClass('hover');
        })
        .blur(function () {
          $(this).parents('.has-dropdown').removeClass('hover');
        });
    },

    resize : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar
            .css('height', '')
            .removeClass('expanded')
            .find('li')
            .removeClass('hover');

            if (doToggle) {
              self.toggle(topbar);
            }
        }

        if (self.is_sticky(topbar, stickyContainer, settings)) {
          if (stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if (self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }

      });
    },

    breakpoint : function () {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },

    small : function () {
      return matchMedia(Foundation.media_queries['small']).matches;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    assemble : function (topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section, .top-bar-section', topbar);

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href'),
            $titleLi;

        if (!$dropdown.find('.title.back').length) {

          if (settings.mobile_show_parent_link == true && url) {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="' + url + '">' + $link.html() +'</a></li>');
          } else {
            $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');
          }

          // Copy link to subnav
          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
          }
          $dropdown.prepend($titleLi);
        }
      });

      // Put element back in the DOM
      section.appendTo(topbar);

      // check for sticky
      this.sticky();

      this.assembled(topbar);
    },

    assembled : function (topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled : true}));
    },

    height : function (ul) {
      var total = 0,
          self = this;

      $('> li', ul).each(function () {
        total += self.S(this).outerHeight(true);
      });

      return total;
    },

    sticky : function () {
      var self = this;

      this.S(window).on('scroll', function () {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning : function () {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window),
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset') + this.settings.start_offset;
        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > (distance)) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },

    off : function () {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));

/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {
    var ElevateZoom = {
            init: function( options, elem ) {
                var self = this;

                self.elem = elem;
                self.$elem = $( elem );

                self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

                self.options = $.extend( {}, $.fn.elevateZoom.options, options );

                //TINT OVERRIDE SETTINGS
                if(self.options.tint) {
                    self.options.lensColour = "none", //colour of the lens background
                    self.options.lensOpacity =  "1" //opacity of the lens
                }
                //INNER OVERRIDE SETTINGS
                if(self.options.zoomType == "inner") {self.options.showLens = false;}


                //Remove alt on hover

                self.$elem.parent().removeAttr('title').removeAttr('alt');

                self.zoomImage = self.imageSrc;

                self.refresh( 1 );



                //Create the image swap from the gallery
                $('#'+self.options.gallery + ' a').click( function(e) {

                    //Set a class on the currently active gallery image
                    if(self.options.galleryActiveClass){
                        $('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
                        $(this).addClass(self.options.galleryActiveClass);
                    }
                    //stop any link on the a tag from working
                    e.preventDefault();

                    //call the swap image function
                    if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
                    else{self.zoomImagePre = $(this).data("image");}
                    self.swaptheimage($(this).data("image"), self.zoomImagePre);
                    return false;
                });

            },

            refresh: function( length ) {
                var self = this;

                setTimeout(function() {
                    self.fetch(self.imageSrc);

                }, length || self.options.refresh );
            },

            fetch: function(imgsrc) {
                //get the image
                var self = this;
                var newImg = new Image();
                newImg.onload = function() {
                    //set the large image dimensions - used to calculte ratio's
                    self.largeWidth = newImg.width;
                    self.largeHeight = newImg.height;
                    //once image is loaded start the calls
                    self.startZoom();
                    self.currentImage = self.imageSrc;
                    //let caller know image has been loaded
                    self.options.onZoomedImageLoaded(self.$elem);
                }
                newImg.src = imgsrc; // this must be done AFTER setting onload

                return;

            },

            startZoom: function( ) {
                var self = this;
                //get dimensions of the non zoomed image
                self.nzWidth = self.$elem.width();
                self.nzHeight = self.$elem.height();

                //activated elements
                self.isWindowActive = false;
                self.isLensActive = false;
                self.isTintActive = false;
                self.overWindow = false;

                //CrossFade Wrappe
                if(self.options.imageCrossfade){
                    self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');
                    self.$elem.css('position', 'absolute');
                }

                self.zoomLock = 1;
                self.scrollingLock = false;
                self.changeBgSize = false;
                self.currentZoomLevel = self.options.zoomLevel;


                //get offset of the non zoomed image
                self.nzOffset = self.$elem.offset();
                //calculate the width ratio of the large/small image
                self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
                self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight;


                //if window zoom
                if(self.options.zoomType == "window") {
                    self.zoomWindowStyle = "overflow: hidden;"
                        + "background-position: 0px 0px;text-align:center;"
                        + "background-color: " + String(self.options.zoomWindowBgColour)
                        + ";width: " + String(self.options.zoomWindowWidth) + "px;"
                        + "height: " + String(self.options.zoomWindowHeight)
                        + "px;float: left;"
                        + "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
                        + "display: none;z-index:100;"
                        + "border: " + String(self.options.borderSize)
                        + "px solid " + self.options.borderColour
                        + ";background-repeat: no-repeat;"
                        + "position: absolute;";
                }


                //if inner  zoom
                if(self.options.zoomType == "inner") {
                    //has a border been put on the image? Lets cater for this

                    var borderWidth = self.$elem.css("border-left-width");

                    self.zoomWindowStyle = "overflow: hidden;"
                        + "margin-left: " + String(borderWidth) + ";"
                        + "margin-top: " + String(borderWidth) + ";"
                        + "background-position: 0px 0px;"
                        + "width: " + String(self.nzWidth) + "px;"
                        + "height: " + String(self.nzHeight)
                        + "px;float: left;"
                        + "display: none;"
                        + "cursor:"+(self.options.cursor)+";"
                        + "px solid " + self.options.borderColour
                        + ";background-repeat: no-repeat;"
                        + "position: absolute;";
                }



                //lens style for window zoom
                if(self.options.zoomType == "window") {


                    // adjust images less than the window height

                    if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
                        lensHeight = self.nzHeight;
                    }
                    else{
                        lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
                    }
                    if(self.largeWidth < self.options.zoomWindowWidth){
                        lensWidth = self.nzWidth;
                    }
                    else{
                        lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
                    }


                    self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
                    + "px;float: right;display: none;"
                    + "overflow: hidden;"
                    + "z-index: 999;"
                    + "-webkit-transform: translateZ(0);"
                    + "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
                    + "width:"+lensWidth+"px;"
                    + "height:"+lensHeight+"px;"
                    + "background-color:"+(self.options.lensColour)+";"
                    + "cursor:"+(self.options.cursor)+";"
                    + "border: "+(self.options.lensBorderSize)+"px" +
                    " solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
                }


                //tint style
                self.tintStyle = "display: block;"
                    + "position: absolute;"
                    + "background-color: "+self.options.tintColour+";"
                    + "filter:alpha(opacity=0);"
                    + "opacity: 0;"
                    + "width: " + self.nzWidth + "px;"
                    + "height: " + self.nzHeight + "px;"

                    ;

                //lens style for lens zoom with optional round for modern browsers
                self.lensRound = '';

                if(self.options.zoomType == "lens") {

                    self.lensStyle = "background-position: 0px 0px;"
                        + "float: left;display: none;"
                        + "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
                        + "width:"+ String(self.options.lensSize) +"px;"
                        + "height:"+ String(self.options.lensSize)+"px;"
                        + "background-repeat: no-repeat;position: absolute;";


                }


                //does not round in all browsers
                if(self.options.lensShape == "round") {
                    self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
                    + "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
                    + "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
                    + "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

                }

                //create the div's                                                + ""
                //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

                self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
                $('body').append(self.zoomContainer);


                //this will add overflow hidden and contrain the lens on lens mode
                if(self.options.containLensZoom && self.options.zoomType == "lens"){
                    self.zoomContainer.css("overflow", "hidden");
                }
                if(self.options.zoomType != "inner") {
                    self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
                    .appendTo(self.zoomContainer)
                    .click(function () {
                        self.$elem.trigger('click');
                    });


                    if(self.options.tint) {
                        self.tintContainer = $('<div/>').addClass('tintContainer');
                        self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


                        self.zoomLens.wrap(self.tintContainer);


                        self.zoomTintcss = self.zoomLens.after(self.zoomTint);

                        //if tint enabled - set an image to show over the tint

                        self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
                        .appendTo(self.zoomLens)
                        .click(function () {

                            self.$elem.trigger('click');
                        });

                    }

                }







                //create zoom window
                if(isNaN(self.options.zoomWindowPosition)){
                    self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
                    .appendTo('body')
                    .click(function () {
                        self.$elem.trigger('click');
                    });
                }else{
                    self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
                    .appendTo(self.zoomContainer)
                    .click(function () {
                        self.$elem.trigger('click');
                    });
                }
                self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
                self.zoomWindow.wrap(self.zoomWindowContainer);


                //  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";
                // self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

                if(self.options.zoomType == "lens") {
                    self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" });
                }
                if(self.options.zoomType == "window") {
                    self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" });
                }
                if(self.options.zoomType == "inner") {
                    self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" });
                }
                /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
                //touch events
                self.$elem.bind('touchmove', function(e){
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchmove', function(e){
                    if(self.options.zoomType == "inner") {
                        self.showHideWindow("show");

                    }
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchend', function(e){
                    self.showHideWindow("hide");
                    if(self.options.showLens) {self.showHideLens("hide");}
                    if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
                });

                self.$elem.bind('touchend', function(e){
                    self.showHideWindow("hide");
                    if(self.options.showLens) {self.showHideLens("hide");}
                    if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
                });
                if(self.options.showLens) {
                    self.zoomLens.bind('touchmove', function(e){

                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch);
                    });


                    self.zoomLens.bind('touchend', function(e){
                        self.showHideWindow("hide");
                        if(self.options.showLens) {self.showHideLens("hide");}
                        if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
                    });
                }
                //Needed to work in IE
                self.$elem.bind('mousemove', function(e){
                    if(self.overWindow == false){self.setElements("show");}
                    //make sure on orientation change the setposition is not fired
                    if(self.lastX !== e.clientX || self.lastY !== e.clientY){
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;

                });

                self.zoomContainer.bind('mousemove', function(e){

                    if(self.overWindow == false){self.setElements("show");}

                    //make sure on orientation change the setposition is not fired
                    if(self.lastX !== e.clientX || self.lastY !== e.clientY){
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                });
                if(self.options.zoomType != "inner") {
                    self.zoomLens.bind('mousemove', function(e){
                        //make sure on orientation change the setposition is not fired
                        if(self.lastX !== e.clientX || self.lastY !== e.clientY){
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });
                }
                if(self.options.tint && self.options.zoomType != "inner") {
                    self.zoomTint.bind('mousemove', function(e){
                        //make sure on orientation change the setposition is not fired
                        if(self.lastX !== e.clientX || self.lastY !== e.clientY){
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });

                }
                if(self.options.zoomType == "inner") {
                    self.zoomWindow.bind('mousemove', function(e) {
                        //self.overWindow = true;
                        //make sure on orientation change the setposition is not fired
                        if(self.lastX !== e.clientX || self.lastY !== e.clientY){
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });

                }


                //  lensFadeOut: 500,  zoomTintFadeIn
                self.zoomContainer.add(self.$elem).mouseenter(function(){

                    if(self.overWindow == false){self.setElements("show");}


                }).mouseleave(function(){
                    if(!self.scrollLock){
                        self.setElements("hide");
                    }
                });
                //end ove image





                if(self.options.zoomType != "inner") {
                    self.zoomWindow.mouseenter(function(){
                        self.overWindow = true;
                        self.setElements("hide");
                    }).mouseleave(function(){

                        self.overWindow = false;
                    });
                }
                //end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

                //      $(this).empty();
                //    return false;

                //fix for initial zoom setting
                if (self.options.zoomLevel != 1){
                    //	self.changeZoomLevel(self.currentZoomLevel);
                }
                //set the min zoomlevel
                if(self.options.minZoomLevel){
                    self.minZoomLevel = self.options.minZoomLevel;
                }
                else{
                    self.minZoomLevel = self.options.scrollZoomIncrement * 2;
                }


                if(self.options.scrollZoom){


                    self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock
                        self.scrollLock = true;
                        clearTimeout($.data(this, 'timer'));
                        $.data(this, 'timer', setTimeout(function() {
                            self.scrollLock = false;
                            //do something
                        }, 250));

                        var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


                        //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        //   e.preventDefault();


                        e.stopImmediatePropagation();
                        e.stopPropagation();
                        e.preventDefault();


                        if(theEvent /120 > 0) {
                            //scrolling up
                            if(self.currentZoomLevel >= self.minZoomLevel){
                                self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);
                            }

                        }
                        else{
                            //scrolling down


                            if(self.options.maxZoomLevel){
                                if(self.currentZoomLevel <= self.options.maxZoomLevel){
                                    self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
                                }
                            }
                            else{
                                //andy

                                self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
                            }

                        }
                        return false;
                    });
                }


            },
            setElements: function(type) {
                var self = this;
        if(!self.options.zoomEnabled){return false;}
                if(type=="show"){
                    if(self.isWindowSet){
                        if(self.options.zoomType == "inner") {self.showHideWindow("show");}
                        if(self.options.zoomType == "window") {self.showHideWindow("show");}
                        if(self.options.showLens) {self.showHideLens("show");}
                        if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
                        }
                    }
                }

                if(type=="hide"){
                    if(self.options.zoomType == "window") {self.showHideWindow("hide");}
                    if(!self.options.tint) {self.showHideWindow("hide");}
                    if(self.options.showLens) {self.showHideLens("hide");}
                    if(self.options.tint) {	self.showHideTint("hide");}
                }
            },
            setPosition: function(e) {

                var self = this;

        if(!self.options.zoomEnabled){return false;}

                //recaclc offset each time in case the image moves
                //this can be caused by other on page elements
                self.nzHeight = self.$elem.height();
                self.nzWidth = self.$elem.width();
                self.nzOffset = self.$elem.offset();

                if(self.options.tint && self.options.zoomType != "inner") {
                    self.zoomTint.css({ top: 0});
                    self.zoomTint.css({ left: 0});
                }
                //set responsive
                //will checking if the image needs changing before running this code work faster?
                if(self.options.responsive && !self.options.scrollZoom){
                    if(self.options.showLens){
                        if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
                            lensHeight = self.nzHeight;
                        }
                        else{
                            lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
                        }
                        if(self.largeWidth < self.options.zoomWindowWidth){
                            lensWidth = self.nzWidth;
                        }
                        else{
                            lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
                        }
                        self.widthRatio = self.largeWidth / self.nzWidth;
                        self.heightRatio = self.largeHeight / self.nzHeight;
                        if(self.options.zoomType != "lens") {


                            //possibly dont need to keep recalcalculating
                            //if the lens is heigher than the image, then set lens size to image size
                            if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
                                lensHeight = self.nzHeight;

                            }
                            else{
                                lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
                            }

                            if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
                                lensWidth = self.nzWidth;
                            }
                            else{
                                lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
                            }

                            self.zoomLens.css('width', lensWidth);
                            self.zoomLens.css('height', lensHeight);

                            if(self.options.tint){
                                self.zoomTintImage.css('width', self.nzWidth);
                                self.zoomTintImage.css('height', self.nzHeight);
                            }

                        }
                        if(self.options.zoomType == "lens") {

                            self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })


                        }
                        //end responsive image change
                    }
                }

                //container fix
                self.zoomContainer.css({ top: self.nzOffset.top});
                self.zoomContainer.css({ left: self.nzOffset.left});
                self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
                self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
                //calculate the Location of the Lens

                //calculate the bound regions - but only if zoom window
                if(self.options.zoomType == "window") {
                    self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
                    self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
                    self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2)));
                    self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));
                }
                //calculate the bound regions - but only for inner zoom
                if(self.options.zoomType == "inner"){
                    self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
                    self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
                    self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
                    self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));
                }

                // if the mouse position of the slider is one of the outerbounds, then hide  window and lens
                if (self.mouseLeft <= 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {
                    self.setElements("hide");
                    return;
                }
                //else continue with operations
                else {


                    //lens options
                    if(self.options.showLens) {
                        //		self.showHideLens("show");
                        //set background position of lens
                        self.lensLeftPos = String(self.mouseLeft - self.zoomLens.width() / 2);
                        self.lensTopPos = String(self.mouseTop - self.zoomLens.height() / 2);


                    }
                    //adjust the background position if the mouse is in one of the outer regions

                    //Top region
                    if(self.Etoppos){
                        self.lensTopPos = 0;
                    }
                    //Left Region
                    if(self.Eloppos){
                        self.windowLeftPos = 0;
                        self.lensLeftPos = 0;
                        self.tintpos=0;
                    }
                    //Set bottom and right region for window mode
                    if(self.options.zoomType == "window") {
                        if(self.Eboppos){
                            self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
                        }
                        if(self.Eroppos){
                            self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
                        }
                    }
                    //Set bottom and right region for inner mode
                    if(self.options.zoomType == "inner") {
                        if(self.Eboppos){
                            self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
                        }
                        if(self.Eroppos){
                            self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
                        }

                    }
                    //if lens zoom
                    if(self.options.zoomType == "lens") {
                        self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));
                        self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

                        self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

                        if(self.changeBgSize){

                            if(self.nzHeight>self.nzWidth){
                                if(self.options.zoomType == "lens"){
                                    self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                }

                                self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                            }
                            else{
                                if(self.options.zoomType == "lens"){
                                    self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                                }
                                self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                            }
                            self.changeBgSize = false;
                        }

                        self.setWindowPostition(e);
                    }
                    //if tint zoom
                    if(self.options.tint && self.options.zoomType != "inner") {
                        self.setTintPosition(e);

                    }
                    //set the css background position
                    if(self.options.zoomType == "window") {
                        self.setWindowPostition(e);
                    }
                    if(self.options.zoomType == "inner") {
                        self.setWindowPostition(e);
                    }
                    if(self.options.showLens) {

                        if(self.fullwidth && self.options.zoomType != "lens"){
                            self.lensLeftPos = 0;

                        }
                        self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })
                    }

                } //end else



            },
            showHideWindow: function(change) {
                var self = this;
                if(change == "show"){
                    if(!self.isWindowActive){
                        if(self.options.zoomWindowFadeIn){
                            self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
                        }
                        else{self.zoomWindow.show();}
                        self.isWindowActive = true;
                    }
                }
                if(change == "hide"){
                    if(self.isWindowActive){
                        if(self.options.zoomWindowFadeOut){
                            self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut);
                        }
                        else{self.zoomWindow.hide();}
                        self.isWindowActive = false;
                    }
                }
            },
            showHideLens: function(change) {
                var self = this;
                if(change == "show"){
                    if(!self.isLensActive){
                        if(self.options.lensFadeIn){
                            self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
                        }
                        else{self.zoomLens.show();}
                        self.isLensActive = true;
                    }
                }
                if(change == "hide"){
                    if(self.isLensActive){
                        if(self.options.lensFadeOut){
                            self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
                        }
                        else{self.zoomLens.hide();}
                        self.isLensActive = false;
                    }
                }
            },
            showHideTint: function(change) {
                var self = this;
                if(change == "show"){
                    if(!self.isTintActive){

                        if(self.options.zoomTintFadeIn){
                            self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
                        }
                        else{
                            self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
                            self.zoomTint.show();


                        }
                        self.isTintActive = true;
                    }
                }
                if(change == "hide"){
                    if(self.isTintActive){

                        if(self.options.zoomTintFadeOut){
                            self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
                        }
                        else{self.zoomTint.hide();}
                        self.isTintActive = false;
                    }
                }
            },
            setLensPostition: function( e ) {


            },
            setWindowPostition: function( e ) {
                //return obj.slice( 0, count );
                var self = this;

                if(!isNaN(self.options.zoomWindowPosition)){

                    switch (self.options.zoomWindowPosition) {
                    case 1: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
                        self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 2:
                        if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
                            self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
                        }
                        else{ //negative margin

                        }
                        break;
                    case 3: //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
                        self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 4: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    case 5: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
                        break;
                    case 6:
                        if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
                            self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

                            self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);
                        }
                        else{ //negative margin

                        }


                        break;
                    case 7: //done
                        self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
                        self.windowOffsetLeft = 0; //DONE 7, 13
                        break;
                    case 8: //done
                        self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                        self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
                        break;
                    case 9:  //done
                        self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
                        self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
                        break;
                    case 10:
                        if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

                            self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
                            self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
                        }
                        else{ //negative margin

                        }
                        break;
                    case 11:
                        self.windowOffsetTop = (self.options.zoomWindowOffety);
                        self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
                        break;
                    case 12: //done
                        self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
                        break;
                    case 13: //done
                        self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft =(0); //DONE 7, 13
                        break;
                    case 14:
                        if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
                            self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

                            self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);
                        }
                        else{ //negative margin

                        }

                        break;
                    case 15://done
                        self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
                        break;
                    case 16:  //done
                        self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
                        self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
                        break;
                    default: //done
                        self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
                    self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
                    }
                } //end isNAN
                else{
                    //WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
                    self.externalContainer = $('#'+self.options.zoomWindowPosition);
                    self.externalContainerWidth = self.externalContainer.width();
                    self.externalContainerHeight = self.externalContainer.height();
                    self.externalContainerOffset = self.externalContainer.offset();

                    self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
                    self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

                }
                self.isWindowSet = true;
                self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
                self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

                self.zoomWindow.css({ top: self.windowOffsetTop});
                self.zoomWindow.css({ left: self.windowOffsetLeft});

                if(self.options.zoomType == "inner") {
                    self.zoomWindow.css({ top: 0});
                    self.zoomWindow.css({ left: 0});

                }


                self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));
                self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
                if(self.Etoppos){self.windowTopPos = 0;}
                if(self.Eloppos){self.windowLeftPos = 0;}
                if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  }
                if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}

                //stops micro movements
                if(self.fullheight){
                    self.windowTopPos = 0;

                }
                if(self.fullwidth){
                    self.windowLeftPos = 0;

                }
                //set the css background position


                if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

                    if(self.zoomLock == 1){
                        //overrides for images not zoomable
                        if(self.widthRatio <= 1){

                            self.windowLeftPos = 0;
                        }
                        if(self.heightRatio <= 1){
                            self.windowTopPos = 0;
                        }
                    }
                    // adjust images less than the window height

                    if(self.largeHeight < self.options.zoomWindowHeight){

                        self.windowTopPos = 0;
                    }
                    if(self.largeWidth < self.options.zoomWindowWidth){
                        self.windowLeftPos = 0;
                    }

                    //set the zoomwindow background position
                    if (self.options.easing){

                        //     if(self.changeZoom){
                        //           clearInterval(self.loop);
                        //           self.changeZoom = false;
                        //           self.loop = false;

                        //            }
                        //set the pos to 0 if not set
                        if(!self.xp){self.xp = 0;}
                        if(!self.yp){self.yp = 0;}
                        //if loop not already started, then run it
                        if (!self.loop){
                            self.loop = setInterval(function(){
                                //using zeno's paradox

                                self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount;
                                self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
                                if(self.scrollingLock){


                                    clearInterval(self.loop);
                                    self.xp = self.windowLeftPos;
                                    self.yp = self.windowTopPos

                                    self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                                    self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

                                    if(self.changeBgSize){
                                        if(self.nzHeight>self.nzWidth){
                                            if(self.options.zoomType == "lens"){
                                                self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                            }
                                            self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                        }
                                        else{
                                            if(self.options.zoomType != "lens"){
                                                self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                            }
                                            self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });

                                        }

                                        /*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
                        if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}
                 if (!self.bgloop){
                     self.bgloop = setInterval(function(){

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount;
                                self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
                                         */
                                        self.changeBgSize = false;
                                    }

                                    self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
                                    self.scrollingLock = false;
                                    self.loop = false;

                                }
                                else{
                                    if(self.changeBgSize){
                                        if(self.nzHeight>self.nzWidth){
                                            if(self.options.zoomType == "lens"){
                                                self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                            }
                                            self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                        }
                                        else{
                                            if(self.options.zoomType != "lens"){
                                                self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                                            }
                                            self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                                        }
                                        self.changeBgSize = false;
                                    }

                                    self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
                                }
                            }, 16);
                        }
                    }
                    else{
                        if(self.changeBgSize){
                            if(self.nzHeight>self.nzWidth){
                                if(self.options.zoomType == "lens"){
                                    self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                }

                                self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                            }
                            else{
                                if(self.options.zoomType == "lens"){
                                    self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                                }
                                if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){

                                    self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
                                }
                                else{

                                    self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
                                }

                            }
                            self.changeBgSize = false;
                        }

                        self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
                    }
                }
            },
            setTintPosition: function(e){
                var self = this;
                self.nzOffset = self.$elem.offset();
                self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1));
                self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));
                if(self.Etoppos){
                    self.tintposy = 0;
                }
                if(self.Eloppos){
                    self.tintpos=0;
                }
                if(self.Eboppos){
                    self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
                }
                if(self.Eroppos){
                    self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
                }
                if(self.options.tint) {
                    //stops micro movements
                    if(self.fullheight){
                        self.tintposy = 0;

                    }
                    if(self.fullwidth){
                        self.tintpos = 0;

                    }
                    self.zoomTintImage.css({'left': self.tintpos+'px'});
                    self.zoomTintImage.css({'top': self.tintposy+'px'});
                }
            },

            swaptheimage: function(smallimage, largeimage){
                var self = this;
                var newImg = new Image();

                if(self.options.loadingIcon){
                    self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
                    self.$elem.after(self.spinner);
                }

                self.options.onImageSwap(self.$elem);

                newImg.onload = function() {
                    self.largeWidth = newImg.width;
                    self.largeHeight = newImg.height;
                    self.zoomImage = largeimage;
                    self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
                    self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });


                    self.swapAction(smallimage, largeimage);
                    return;
                }
                newImg.src = largeimage; // this must be done AFTER setting onload

            },
            swapAction: function(smallimage, largeimage){


                var self = this;

                var newImg2 = new Image();
                newImg2.onload = function() {
                    //re-calculate values
                    self.nzHeight = newImg2.height;
                    self.nzWidth = newImg2.width;
                    self.options.onImageSwapComplete(self.$elem);

                    self.doneCallback();
                    return;
                }
                newImg2.src = smallimage;

                //reset the zoomlevel to that initially set in options
                self.currentZoomLevel = self.options.zoomLevel;
                self.options.maxZoomLevel = false;

                //swaps the main image
                //self.$elem.attr("src",smallimage);
                //swaps the zoom image
                if(self.options.zoomType == "lens") {
                    self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" });
                }
                if(self.options.zoomType == "window") {
                    self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" });
                }
                if(self.options.zoomType == "inner") {
                    self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" });
                }



                self.currentImage = largeimage;

                if(self.options.imageCrossfade){
                    var oldImg = self.$elem;
                    var newImg = oldImg.clone();
                    self.$elem.attr("src",smallimage)
                    self.$elem.after(newImg);
                    newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
                        $(this).remove();
                    });

                    //       				if(self.options.zoomType == "inner"){
                    //remove any attributes on the cloned image so we can resize later
                    self.$elem.width("auto").removeAttr("width");
                    self.$elem.height("auto").removeAttr("height");
                    //   }

                    oldImg.fadeIn(self.options.imageCrossfade);

                    if(self.options.tint && self.options.zoomType != "inner") {

                        var oldImgTint = self.zoomTintImage;
                        var newImgTint = oldImgTint.clone();
                        self.zoomTintImage.attr("src",largeimage)
                        self.zoomTintImage.after(newImgTint);
                        newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
                            $(this).remove();
                        });



                        oldImgTint.fadeIn(self.options.imageCrossfade);


                        //self.zoomTintImage.attr("width",elem.data("image"));

                        //resize the tint window
                        self.zoomTint.css({ height: self.$elem.height()});
                        self.zoomTint.css({ width: self.$elem.width()});
                    }

                    self.zoomContainer.css("height", self.$elem.height());
                    self.zoomContainer.css("width", self.$elem.width());

                    if(self.options.zoomType == "inner"){
                        if(!self.options.constrainType){
                            self.zoomWrap.parent().css("height", self.$elem.height());
                            self.zoomWrap.parent().css("width", self.$elem.width());

                            self.zoomWindow.css("height", self.$elem.height());
                            self.zoomWindow.css("width", self.$elem.width());
                        }
                    }

                    if(self.options.imageCrossfade){
                        self.zoomWrap.css("height", self.$elem.height());
                        self.zoomWrap.css("width", self.$elem.width());
                    }
                }
                else{
                    self.$elem.attr("src",smallimage);
                    if(self.options.tint) {
                        self.zoomTintImage.attr("src",largeimage);
                        //self.zoomTintImage.attr("width",elem.data("image"));
                        self.zoomTintImage.attr("height",self.$elem.height());
                        //self.zoomTintImage.attr('src') = elem.data("image");
                        self.zoomTintImage.css({ height: self.$elem.height()});
                        self.zoomTint.css({ height: self.$elem.height()});

                    }
                    self.zoomContainer.css("height", self.$elem.height());
                    self.zoomContainer.css("width", self.$elem.width());

                    if(self.options.imageCrossfade){
                        self.zoomWrap.css("height", self.$elem.height());
                        self.zoomWrap.css("width", self.$elem.width());
                    }
                }
                if(self.options.constrainType){

                    //This will contrain the image proportions
                    if(self.options.constrainType == "height"){

                        self.zoomContainer.css("height", self.options.constrainSize);
                        self.zoomContainer.css("width", "auto");

                        if(self.options.imageCrossfade){
                            self.zoomWrap.css("height", self.options.constrainSize);
                            self.zoomWrap.css("width", "auto");
                            self.constwidth = self.zoomWrap.width();


                        }
                        else{
                            self.$elem.css("height", self.options.constrainSize);
                            self.$elem.css("width", "auto");
                            self.constwidth = self.$elem.width();
                        }

                        if(self.options.zoomType == "inner"){

                            self.zoomWrap.parent().css("height", self.options.constrainSize);
                            self.zoomWrap.parent().css("width", self.constwidth);
                            self.zoomWindow.css("height", self.options.constrainSize);
                            self.zoomWindow.css("width", self.constwidth);
                        }
                        if(self.options.tint){
                            self.tintContainer.css("height", self.options.constrainSize);
                            self.tintContainer.css("width", self.constwidth);
                            self.zoomTint.css("height", self.options.constrainSize);
                            self.zoomTint.css("width", self.constwidth);
                            self.zoomTintImage.css("height", self.options.constrainSize);
                            self.zoomTintImage.css("width", self.constwidth);
                        }

                    }
                    if(self.options.constrainType == "width"){
                        self.zoomContainer.css("height", "auto");
                        self.zoomContainer.css("width", self.options.constrainSize);

                        if(self.options.imageCrossfade){
                            self.zoomWrap.css("height", "auto");
                            self.zoomWrap.css("width", self.options.constrainSize);
                            self.constheight = self.zoomWrap.height();
                        }
                        else{
                            self.$elem.css("height", "auto");
                            self.$elem.css("width", self.options.constrainSize);
                            self.constheight = self.$elem.height();
                        }
                        if(self.options.zoomType == "inner"){
                            self.zoomWrap.parent().css("height", self.constheight);
                            self.zoomWrap.parent().css("width", self.options.constrainSize);
                            self.zoomWindow.css("height", self.constheight);
                            self.zoomWindow.css("width", self.options.constrainSize);
                        }
                        if(self.options.tint){
                            self.tintContainer.css("height", self.constheight);
                            self.tintContainer.css("width", self.options.constrainSize);
                            self.zoomTint.css("height", self.constheight);
                            self.zoomTint.css("width", self.options.constrainSize);
                            self.zoomTintImage.css("height", self.constheight);
                            self.zoomTintImage.css("width", self.options.constrainSize);
                        }

                    }


                }

            },
            doneCallback: function(){

                var self = this;
                if(self.options.loadingIcon){
                    self.spinner.hide();
                }

                self.nzOffset = self.$elem.offset();
                self.nzWidth = self.$elem.width();
                self.nzHeight = self.$elem.height();

                // reset the zoomlevel back to default
                self.currentZoomLevel = self.options.zoomLevel;

                //ratio of the large to small image
                self.widthRatio = self.largeWidth / self.nzWidth;
                self.heightRatio = self.largeHeight / self.nzHeight;

                //NEED TO ADD THE LENS SIZE FOR ROUND
                // adjust images less than the window height
                if(self.options.zoomType == "window") {

                    if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
                        lensHeight = self.nzHeight;

                    }
                    else{
                        lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
                    }

                    if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
                        lensWidth = self.nzWidth;
                    }
                    else{
                        lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
                    }


                    if(self.zoomLens){

                        self.zoomLens.css('width', lensWidth);
                        self.zoomLens.css('height', lensHeight);


                    }
                }
            },
            getCurrentImage: function(){
                var self = this;
                return self.zoomImage;
            },
            getGalleryList: function(){
                var self = this;
                //loop through the gallery options and set them in list for fancybox
                self.gallerylist = [];
                if (self.options.gallery){


                    $('#'+self.options.gallery + ' a').each(function() {

                        var img_src = '';
                        if($(this).data("zoom-image")){
                            img_src = $(this).data("zoom-image");
                        }
                        else if($(this).data("image")){
                            img_src = $(this).data("image");
                        }
                        //put the current image at the start
                        if(img_src == self.zoomImage){
                            self.gallerylist.unshift({
                                href: ''+img_src+'',
                                title: $(this).find('img').attr("title")
                            });
                        }
                        else{
                            self.gallerylist.push({
                                href: ''+img_src+'',
                                title: $(this).find('img').attr("title")
                            });
                        }


                    });
                }
                //if no gallery - return current image
                else{
                    self.gallerylist.push({
                        href: ''+self.zoomImage+'',
                        title: $(this).find('img').attr("title")
                    });
                }
                return self.gallerylist;

            },
            changeZoomLevel: function(value){
                var self = this;

                //flag a zoom, so can adjust the easing during setPosition
                self.scrollingLock = true;

                //round to two decimal places
                self.newvalue = parseFloat(value).toFixed(2);
                newvalue = parseFloat(value).toFixed(2);




                //maxwidth & Maxheight of the image
                maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
                maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);




                //calculate new heightratio
                if(self.options.zoomType != "inner")
                {
                    if(maxheightnewvalue <= newvalue){
                        self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
                        self.newvalueheight = maxheightnewvalue;
                        self.fullheight = true;

                    }
                    else{
                        self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight;
                        self.newvalueheight = newvalue;
                        self.fullheight = false;

                    }


//					calculate new width ratio

                    if(maxwidthtnewvalue <= newvalue){
                        self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
                        self.newvaluewidth = maxwidthtnewvalue;
                        self.fullwidth = true;

                    }
                    else{
                        self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;
                        self.fullwidth = false;

                    }
                    if(self.options.zoomType == "lens"){
                        if(maxheightnewvalue <= newvalue){
                            self.fullwidth = true;
                            self.newvaluewidth = maxheightnewvalue;

                        } else{
                            self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth;
                            self.newvaluewidth = newvalue;

                            self.fullwidth = false;
                        }}
                }



                if(self.options.zoomType == "inner")
                {
                    maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);
                    maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);
                    if(newvalue > maxheightnewvalue){
                        newvalue = maxheightnewvalue;
                    }
                    if(newvalue > maxwidthtnewvalue){
                        newvalue = maxwidthtnewvalue;
                    }


                    if(maxheightnewvalue <= newvalue){


                        self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight;
                        if(newvalue > maxheightnewvalue){
                            self.newvalueheight = maxheightnewvalue;
                        }else{
                            self.newvalueheight = newvalue;
                        }
                        self.fullheight = true;


                    }
                    else{



                        self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight;

                        if(newvalue > maxheightnewvalue){

                            self.newvalueheight = maxheightnewvalue;
                        }else{
                            self.newvalueheight = newvalue;
                        }
                        self.fullheight = false;
                    }




                    if(maxwidthtnewvalue <= newvalue){

                        self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth;
                        if(newvalue > maxwidthtnewvalue){

                            self.newvaluewidth = maxwidthtnewvalue;
                        }else{
                            self.newvaluewidth = newvalue;
                        }

                        self.fullwidth = true;


                    }
                    else{

                        self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;
                        self.fullwidth = false;
                    }


                } //end inner
                scrcontinue = false;

                if(self.options.zoomType == "inner"){

                    if(self.nzWidth > self.nzHeight){
                        if( self.newvaluewidth <= maxwidthtnewvalue){
                            scrcontinue = true;
                        }
                        else{

                            scrcontinue = false;
                            self.fullheight = true;
                            self.fullwidth = true;
                        }
                    }
                    if(self.nzHeight > self.nzWidth){
                        if( self.newvaluewidth <= maxwidthtnewvalue){
                            scrcontinue = true;
                        }
                        else{
                            scrcontinue = false;

                            self.fullheight = true;
                            self.fullwidth = true;
                        }
                    }
                }

                if(self.options.zoomType != "inner"){
                    scrcontinue = true;
                }

                if(scrcontinue){



                    self.zoomLock = 0;
                    self.changeZoom = true;

                    //if lens height is less than image height


                    if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


                        self.currentZoomLevel = self.newvalueheight;
                        if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                            self.changeBgSize = true;

                            self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' })
                        }
                        if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                            self.changeBgSize = true;
                        }


                    }




                    if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



                        if(self.options.zoomType != "inner"){
                            if(self.newvaluewidth > self.newvalueheight)   {
                                self.currentZoomLevel = self.newvaluewidth;

                            }
                        }

                        if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                            self.changeBgSize = true;

                            self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
                        }
                        if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                            self.changeBgSize = true;
                        }

                    }
                    if(self.options.zoomType == "inner"){
                        self.changeBgSize = true;

                        if(self.nzWidth > self.nzHeight){
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                        if(self.nzHeight > self.nzWidth){
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                    }

                }      //under

                //sets the boundry change, called in setWindowPos
                self.setPosition(self.currentLoc);
                //
            },
            closeAll: function(){
                if(self.zoomWindow){self.zoomWindow.hide();}
                if(self.zoomLens){self.zoomLens.hide();}
                if(self.zoomTint){self.zoomTint.hide();}
            },
            changeState: function(value){
          var self = this;
                if(value == 'enable'){self.options.zoomEnabled = true;}
                if(value == 'disable'){self.options.zoomEnabled = false;}

            }

    };




    $.fn.elevateZoom = function( options ) {
        return this.each(function() {
            var elevate = Object.create( ElevateZoom );

            elevate.init( options, this );

            $.data( this, 'elevateZoom', elevate );

        });
    };

    $.fn.elevateZoom.options = {
            zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
            preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
            zoomLevel: 1, //default zoom level of image
            scrollZoom: false, //allow zoom on mousewheel, true to activate
            scrollZoomIncrement: 0.1,  //steps of the scrollzoom
            minZoomLevel: false,
            maxZoomLevel: false,
            easing: false,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: false,
            lensFadeOut: false,
            debug: false,
            zoomWindowFadeIn: false,
            zoomWindowFadeOut: false,
            zoomWindowAlwaysShow: false,
            zoomTintFadeIn: false,
            zoomTintFadeOut: false,
            borderSize: 4,
            showLens: true,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square", //can be "round"
            zoomType: "window", //window is default,  also "lens" available -
            containLensZoom: false,
            lensColour: "white", //colour of the lens background
            lensOpacity: 0.4, //opacity of the lens
            lenszoom: false,
            tint: false, //enable the tinting
            tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
            tintOpacity: 0.4, //opacity of the tint
            gallery: false,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: false,
            constrainType: false,  //width or height
            constrainSize: false,  //in pixels the dimensions you want to constrain on
            loadingIcon: false, //http://www.example.com/spinner.gif
            cursor:"default", // user should set to what they want the cursor as, if they have set a click function
            responsive:true,
            onComplete: $.noop,
            onZoomedImageLoaded: function() {},
            onImageSwap: $.noop,
            onImageSwapComplete: $.noop
    };

})( jQuery, window, document );

;(function($) {

  var defaults = {

    // GENERAL
    mode: 'horizontal',
    slideSelector: '',
    infiniteLoop: true,
    hideControlOnEnd: false,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: false,
    captions: false,
    ticker: false,
    tickerHover: false,
    adaptiveHeight: false,
    adaptiveHeightSpeed: 500,
    video: false,
    useCSS: true,
    preloadImages: 'visible',
    responsive: true,
    slideZIndex: 50,
    wrapperClass: 'bx-wrapper',

    // TOUCH
    touchEnabled: true,
    swipeThreshold: 50,
    oneToOneTouch: true,
    preventDefaultSwipeX: true,
    preventDefaultSwipeY: false,

    // ACCESSIBILITY
    ariaLive: true,
    ariaHidden: true,

    // KEYBOARD
    keyboardEnabled: false,

    // PAGER
    pager: true,
    pagerType: 'full',
    pagerShortSeparator: ' / ',
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,

    // CONTROLS
    controls: true,
    nextText: 'Next',
    prevText: 'Prev',
    nextSelector: null,
    prevSelector: null,
    autoControls: false,
    startText: 'Start',
    stopText: 'Stop',
    autoControlsCombine: false,
    autoControlsSelector: null,

    // AUTO
    auto: false,
    pause: 4000,
    autoStart: true,
    autoDirection: 'next',
    stopAutoOnClick: false,
    autoHover: false,
    autoDelay: 0,
    autoSlideForOnePage: false,

    // CAROUSEL
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,
    shrinkItems: false,

    // CALLBACKS
    onSliderLoad: function() { return true; },
    onSlideBefore: function() { return true; },
    onSlideAfter: function() { return true; },
    onSlideNext: function() { return true; },
    onSlidePrev: function() { return true; },
    onSliderResize: function() { return true; }
  };

  $.fn.bxSlider = function(options) {

    if (this.length === 0) {
      return this;
    }

    // support multiple elements
    if (this.length > 1) {
      this.each(function() {
        $(this).bxSlider(options);
      });
      return this;
    }

    // create a namespace to be used throughout the plugin
    var slider = {},
    // set a reference to our slider element
    el = this,
    // get the original window dimens (thanks a lot IE)
    windowWidth = $(window).width(),
    windowHeight = $(window).height();

    // Return if slider is already initialized
    if ($(el).data('bxSlider')) { return; }

    /**
     * ===================================================================================
     * = PRIVATE FUNCTIONS
     * ===================================================================================
     */

    /**
     * Initializes namespace settings to be used throughout plugin
     */
    var init = function() {
      // Return if slider is already initialized
      if ($(el).data('bxSlider')) { return; }
      // merge user-supplied options with the defaults
      slider.settings = $.extend({}, defaults, options);
      // parse slideWidth setting
      slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
      // store the original children
      slider.children = el.children(slider.settings.slideSelector);
      // check if actual number of slides is less than minSlides / maxSlides
      if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
      if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
      // if random start, set the startSlide setting to random number
      if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
      // store active slide information
      slider.active = { index: slider.settings.startSlide };
      // store if the slider is in carousel mode (displaying / moving multiple slides)
      slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
      // if carousel, force preloadImages = 'all'
      if (slider.carousel) { slider.settings.preloadImages = 'all'; }
      // calculate the min / max width thresholds based on min / max number of slides
      // used to setup and update carousel slides dimensions
      slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
      slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
      // store the current state of the slider (if currently animating, working is true)
      slider.working = false;
      // initialize the controls object
      slider.controls = {};
      // initialize an auto interval
      slider.interval = null;
      // determine which property to use for transitions
      slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
      // determine if hardware acceleration can be used
      slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function() {
        // create our test div element
        var div = document.createElement('div'),
        // css transition properties
        props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        // test for each property
        for (var i = 0; i < props.length; i++) {
          if (div.style[props[i]] !== undefined) {
            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
            slider.animProp = '-' + slider.cssPrefix + '-transform';
            return true;
          }
        }
        return false;
      }());
      // if vertical mode always make maxSlides and minSlides equal
      if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
      // save original style data
      el.data('origStyle', el.attr('style'));
      el.children(slider.settings.slideSelector).each(function() {
        $(this).data('origStyle', $(this).attr('style'));
      });

      // perform all DOM / CSS modifications
      setup();
    };

    /**
     * Performs all DOM and CSS modifications
     */
    var setup = function() {
      var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)

      // wrap el in a wrapper
      el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
      // store a namespace reference to .bx-viewport
      slider.viewport = el.parent();

      // add aria-live if the setting is enabled and ticker mode is disabled
      if (slider.settings.ariaLive && !slider.settings.ticker) {
        slider.viewport.attr('aria-live', 'polite');
      }
      // add a loading div to display while images are loading
      slider.loader = $('<div class="bx-loading" />');
      slider.viewport.prepend(slider.loader);
      // set el to a massive width, to hold any needed slides
      // also strip any margin and padding from el
      el.css({
        width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
        position: 'relative'
      });
      // if using CSS, add the easing property
      if (slider.usingCSS && slider.settings.easing) {
        el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
      // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
      } else if (!slider.settings.easing) {
        slider.settings.easing = 'swing';
      }
      // make modifications to the viewport (.bx-viewport)
      slider.viewport.css({
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      });
      slider.viewport.parent().css({
        maxWidth: getViewportMaxWidth()
      });
      // make modification to the wrapper (.bx-wrapper)
      if (!slider.settings.pager && !slider.settings.controls) {
        slider.viewport.parent().css({
          margin: '0 auto 0px'
        });
      }
      // apply css to all slider children
      slider.children.css({
        float: slider.settings.mode === 'horizontal' ? 'left' : 'none',
        listStyle: 'none',
        position: 'relative'
      });
      // apply the calculated width after the float is applied to prevent scrollbar interference
      slider.children.css('width', getSlideWidth());
      // if slideMargin is supplied, add the css
      if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
      if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
      // if "fade" mode, add positioning and z-index CSS
      if (slider.settings.mode === 'fade') {
        slider.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        });
        // prepare the z-index on the showing element
        slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
      }
      // create an element to contain all slider controls (pager, start / stop, etc)
      slider.controls.el = $('<div class="bx-controls" />');
      // if captions are requested, add them
      if (slider.settings.captions) { appendCaptions(); }
      // check if startSlide is last slide
      slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
      // if video is true, set up the fitVids plugin
      if (slider.settings.video) { el.fitVids(); }
      if (slider.settings.preloadImages === 'all' || slider.settings.ticker) { preloadSelector = slider.children; }
      // only check for control addition if not in "ticker" mode
      if (!slider.settings.ticker) {
        // if controls are requested, add them
        if (slider.settings.controls) { appendControls(); }
        // if auto is true, and auto controls are requested, add them
        if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
        // if pager is requested, add it
        if (slider.settings.pager) { appendPager(); }
        // if any control option is requested, add the controls wrapper
        if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
      // if ticker mode, do not allow a pager
      } else {
        slider.settings.pager = false;
      }
      loadElements(preloadSelector, start);
    };

    var loadElements = function(selector, callback) {
      var total = selector.find('img:not([src=""]), iframe').length,
      count = 0;
      if (total === 0) {
        callback();
        return;
      }
      selector.find('img:not([src=""]), iframe').each(function() {
        $(this).one('load error', function() {
          if (++count === total) { callback(); }
        }).each(function() {
          if (this.complete) { $(this).load(); }
        });
      });
    };

    /**
     * Start the slider
     */
    var start = function() {
      // if infinite loop, prepare additional slides
      if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
        var slice    = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
        sliceAppend  = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
        slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
        if (slider.settings.ariaHidden) {
          sliceAppend.attr('aria-hidden', true);
          slicePrepend.attr('aria-hidden', true);
        }
        el.append(sliceAppend).prepend(slicePrepend);
      }
      // remove the loading DOM element
      slider.loader.remove();
      // set the left / top position of "el"
      setSlidePosition();
      // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
      if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
      // set the viewport height
      slider.viewport.height(getViewportHeight());
      // make sure everything is positioned just right (same as a window resize)
      el.redrawSlider();
      // onSliderLoad callback
      slider.settings.onSliderLoad.call(el, slider.active.index);
      // slider has been fully initialized
      slider.initialized = true;
      // bind the resize call to the window
      if (slider.settings.responsive) { $(window).bind('resize', resizeWindow); }
      // if auto is true and has more than 1 page, start the show
      if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
      // if ticker is true, start the ticker
      if (slider.settings.ticker) { initTicker(); }
      // if pager is requested, make the appropriate pager link active
      if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
      // check for any updates to the controls (like hideControlOnEnd updates)
      if (slider.settings.controls) { updateDirectionControls(); }
      // if touchEnabled is true, setup the touch events
      if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
      // if keyboardEnabled is true, setup the keyboard events
      if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
        $(document).keydown(keyPress);
      }
    };

    /**
     * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
     */
    var getViewportHeight = function() {
      var height = 0;
      // first determine which children (slides) should be used in our height calculation
      var children = $();
      // if mode is not "vertical" and adaptiveHeight is false, include all children
      if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
        children = slider.children;
      } else {
        // if not carousel, return the single active child
        if (!slider.carousel) {
          children = slider.children.eq(slider.active.index);
        // if carousel, return a slice of children
        } else {
          // get the individual slide index
          var currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
          // add the current slide to the children
          children = slider.children.eq(currentIndex);
          // cycle through the remaining "showing" slides
          for (i = 1; i <= slider.settings.maxSlides - 1; i++) {
            // if looped back to the start
            if (currentIndex + i >= slider.children.length) {
              children = children.add(slider.children.eq(i - 1));
            } else {
              children = children.add(slider.children.eq(currentIndex + i));
            }
          }
        }
      }
      // if "vertical" mode, calculate the sum of the heights of the children
      if (slider.settings.mode === 'vertical') {
        children.each(function(index) {
          height += $(this).outerHeight();
        });
        // add user-supplied margins
        if (slider.settings.slideMargin > 0) {
          height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
        }
      // if not "vertical" mode, calculate the max height of the children
      } else {
        height = Math.max.apply(Math, children.map(function() {
          return $(this).outerHeight(false);
        }).get());
      }

      if (slider.viewport.css('box-sizing') === 'border-box') {
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
              parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
      } else if (slider.viewport.css('box-sizing') === 'padding-box') {
        height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
      }

      return height;
    };

    /**
     * Returns the calculated width to be used for the outer wrapper / viewport
     */
    var getViewportMaxWidth = function() {
      var width = '100%';
      if (slider.settings.slideWidth > 0) {
        if (slider.settings.mode === 'horizontal') {
          width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
        } else {
          width = slider.settings.slideWidth;
        }
      }
      return width;
    };

    /**
     * Returns the calculated width to be applied to each slide
     */
    var getSlideWidth = function() {
      var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
      wrapWidth      = slider.viewport.width();    // get the current viewport width
      // if slide width was not supplied, or is larger than the viewport use the viewport width
      if (slider.settings.slideWidth === 0 ||
        (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
        slider.settings.mode === 'vertical') {
        newElWidth = wrapWidth;
      // if carousel, use the thresholds to determine the width
      } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
        if (wrapWidth > slider.maxThreshold) {
          return newElWidth;
        } else if (wrapWidth < slider.minThreshold) {
          newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
        } else if (slider.settings.shrinkItems) {
          newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
        }
      }
      return newElWidth;
    };

    /**
     * Returns the number of slides currently visible in the viewport (includes partially visible slides)
     */
    var getNumberSlidesShowing = function() {
      var slidesShowing = 1,
      childWidth = null;
      if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
        // if viewport is smaller than minThreshold, return minSlides
        if (slider.viewport.width() < slider.minThreshold) {
          slidesShowing = slider.settings.minSlides;
        // if viewport is larger than maxThreshold, return maxSlides
        } else if (slider.viewport.width() > slider.maxThreshold) {
          slidesShowing = slider.settings.maxSlides;
        // if viewport is between min / max thresholds, divide viewport width by first child width
        } else {
          childWidth = slider.children.first().width() + slider.settings.slideMargin;
          slidesShowing = Math.floor((slider.viewport.width() +
            slider.settings.slideMargin) / childWidth);
        }
      // if "vertical" mode, slides showing will always be minSlides
      } else if (slider.settings.mode === 'vertical') {
        slidesShowing = slider.settings.minSlides;
      }
      return slidesShowing;
    };

    /**
     * Returns the number of pages (one full viewport of slides is one "page")
     */
    var getPagerQty = function() {
      var pagerQty = 0,
      breakPoint = 0,
      counter = 0;
      // if moveSlides is specified by the user
      if (slider.settings.moveSlides > 0) {
        if (slider.settings.infiniteLoop) {
          pagerQty = Math.ceil(slider.children.length / getMoveBy());
        } else {
          // when breakpoint goes above children length, counter is the number of pages
          while (breakPoint < slider.children.length) {
            ++pagerQty;
            breakPoint = counter + getNumberSlidesShowing();
            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
          }
        }
      // if moveSlides is 0 (auto) divide children length by sides showing, then round up
      } else {
        pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
      }
      return pagerQty;
    };

    /**
     * Returns the number of individual slides by which to shift the slider
     */
    var getMoveBy = function() {
      // if moveSlides was set by the user and moveSlides is less than number of slides showing
      if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
        return slider.settings.moveSlides;
      }
      // if moveSlides is 0 (auto)
      return getNumberSlidesShowing();
    };

    /**
     * Sets the slider's (el) left or top position
     */
    var setSlidePosition = function() {
      var position, lastChild, lastShowingIndex;
      // if last slide, not infinite loop, and number of children is larger than specified maxSlides
      if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
        if (slider.settings.mode === 'horizontal') {
          // get the last child's position
          lastChild = slider.children.last();
          position = lastChild.position();
          // set the left position
          setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
        } else if (slider.settings.mode === 'vertical') {
          // get the last showing index's position
          lastShowingIndex = slider.children.length - slider.settings.minSlides;
          position = slider.children.eq(lastShowingIndex).position();
          // set the top position
          setPositionProperty(-position.top, 'reset', 0);
        }
      // if not last slide
      } else {
        // get the position of the first showing slide
        position = slider.children.eq(slider.active.index * getMoveBy()).position();
        // check for last slide
        if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
        // set the respective position
        if (position !== undefined) {
          if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
    };

    /**
     * Sets the el's animating property position (which in turn will sometimes animate el).
     * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
     *
     * @param value (int)
     *  - the animating property's value
     *
     * @param type (string) 'slide', 'reset', 'ticker'
     *  - the type of instance for which the function is being
     *
     * @param duration (int)
     *  - the amount of time (in ms) the transition should occupy
     *
     * @param params (array) optional
     *  - an optional parameter containing any variables that need to be passed in
     */
    var setPositionProperty = function(value, type, duration, params) {
      var animateObj, propValue;
      // use CSS transform
      if (slider.usingCSS) {
        // determine the translate3d value
        propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
        // add the CSS transition-duration
        el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
        if (type === 'slide') {
          // set the property value
          el.css(slider.animProp, propValue);
          if (duration !== 0) {
            // bind a callback method - executes when CSS transition completes
            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
              //make sure it's the correct one
              if (!$(e.target).is(el)) { return; }
              // unbind the callback
              el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
              updateAfterSlideTransition();
            });
          } else { //duration = 0
            updateAfterSlideTransition();
          }
        } else if (type === 'reset') {
          el.css(slider.animProp, propValue);
        } else if (type === 'ticker') {
          // make the transition use 'linear'
          el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
          el.css(slider.animProp, propValue);
          if (duration !== 0) {
            el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
              //make sure it's the correct one
              if (!$(e.target).is(el)) { return; }
              // unbind the callback
              el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
              // reset the position
              setPositionProperty(params.resetValue, 'reset', 0);
              // start the loop again
              tickerLoop();
            });
          } else { //duration = 0
            setPositionProperty(params.resetValue, 'reset', 0);
            tickerLoop();
          }
        }
      // use JS animate
      } else {
        animateObj = {};
        animateObj[slider.animProp] = value;
        if (type === 'slide') {
          el.animate(animateObj, duration, slider.settings.easing, function() {
            updateAfterSlideTransition();
          });
        } else if (type === 'reset') {
          el.css(slider.animProp, value);
        } else if (type === 'ticker') {
          el.animate(animateObj, duration, 'linear', function() {
            setPositionProperty(params.resetValue, 'reset', 0);
            // run the recursive loop after animation
            tickerLoop();
          });
        }
      }
    };

    /**
     * Populates the pager with proper amount of pages
     */
    var populatePager = function() {
      var pagerHtml = '',
      linkContent = '',
      pagerQty = getPagerQty();
      // loop through each pager item
      for (var i = 0; i < pagerQty; i++) {
        linkContent = '';
        // if a buildPager function is supplied, use it to get pager link value, else use index + 1
        if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
          linkContent = slider.settings.buildPager(i);
          slider.pagerEl.addClass('bx-custom-pager');
        } else {
          linkContent = i + 1;
          slider.pagerEl.addClass('bx-default-pager');
        }
        // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
        // add the markup to the string
        pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
      }
      // populate the pager element with pager links
      slider.pagerEl.html(pagerHtml);
    };

    /**
     * Appends the pager to the controls element
     */
    var appendPager = function() {
      if (!slider.settings.pagerCustom) {
        // create the pager DOM element
        slider.pagerEl = $('<div class="bx-pager" />');
        // if a pager selector was supplied, populate it with the pager
        if (slider.settings.pagerSelector) {
          $(slider.settings.pagerSelector).html(slider.pagerEl);
        // if no pager selector was supplied, add it after the wrapper
        } else {
          slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
        }
        // populate the pager
        populatePager();
      } else {
        slider.pagerEl = $(slider.settings.pagerCustom);
      }
      // assign the pager click binding
      slider.pagerEl.on('click touchend', 'a', clickPagerBind);
    };

    /**
     * Appends prev / next controls to the controls element
     */
    var appendControls = function() {
      slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
      slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
      // bind click actions to the controls
      slider.controls.next.bind('click touchend', clickNextBind);
      slider.controls.prev.bind('click touchend', clickPrevBind);
      // if nextSelector was supplied, populate it
      if (slider.settings.nextSelector) {
        $(slider.settings.nextSelector).append(slider.controls.next);
      }
      // if prevSelector was supplied, populate it
      if (slider.settings.prevSelector) {
        $(slider.settings.prevSelector).append(slider.controls.prev);
      }
      // if no custom selectors were supplied
      if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
        // add the controls to the DOM
        slider.controls.directionEl = $('<div class="bx-controls-direction" />');
        // add the control elements to the directionEl
        slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
        // slider.viewport.append(slider.controls.directionEl);
        slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
      }
    };

    /**
     * Appends start / stop auto controls to the controls element
     */
    var appendControlsAuto = function() {
      slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
      slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
      // add the controls to the DOM
      slider.controls.autoEl = $('<div class="bx-controls-auto" />');
      // bind click actions to the controls
      slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
      slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
      // if autoControlsCombine, insert only the "start" control
      if (slider.settings.autoControlsCombine) {
        slider.controls.autoEl.append(slider.controls.start);
      // if autoControlsCombine is false, insert both controls
      } else {
        slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
      }
      // if auto controls selector was supplied, populate it with the controls
      if (slider.settings.autoControlsSelector) {
        $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
      // if auto controls selector was not supplied, add it after the wrapper
      } else {
        slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
      }
      // update the auto controls
      updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
    };

    /**
     * Appends image captions to the DOM
     */
    var appendCaptions = function() {
      // cycle through each child
      slider.children.each(function(index) {
        // get the image title attribute
        var title = $(this).find('img:first').attr('title');
        // append the caption
        if (title !== undefined && ('' + title).length) {
          $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
        }
      });
    };

    /**
     * Click next binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickNextBind = function(e) {
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) { return; }
      // if auto show is running, stop it
      if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      el.goToNextSlide();
    };

    /**
     * Click prev binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPrevBind = function(e) {
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) { return; }
      // if auto show is running, stop it
      if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      el.goToPrevSlide();
    };

    /**
     * Click start binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStartBind = function(e) {
      el.startAuto();
      e.preventDefault();
    };

    /**
     * Click stop binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickStopBind = function(e) {
      el.stopAuto();
      e.preventDefault();
    };

    /**
     * Click pager binding
     *
     * @param e (event)
     *  - DOM event object
     */
    var clickPagerBind = function(e) {
      var pagerLink, pagerIndex;
      e.preventDefault();
      if (slider.controls.el.hasClass('disabled')) {
        return;
      }
      // if auto show is running, stop it
      if (slider.settings.auto  && slider.settings.stopAutoOnClick) { el.stopAuto(); }
      pagerLink = $(e.currentTarget);
      if (pagerLink.attr('data-slide-index') !== undefined) {
        pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
        // if clicked pager link is not active, continue with the goToSlide call
        if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
      }
    };

    /**
     * Updates the pager links with an active class
     *
     * @param slideIndex (int)
     *  - index of slide to make active
     */
    var updatePagerActive = function(slideIndex) {
      // if "short" pager type
      var len = slider.children.length; // nb of children
      if (slider.settings.pagerType === 'short') {
        if (slider.settings.maxSlides > 1) {
          len = Math.ceil(slider.children.length / slider.settings.maxSlides);
        }
        slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
        return;
      }
      // remove all pager active classes
      slider.pagerEl.find('a').removeClass('active');
      // apply the active class for all pagers
      slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
    };

    /**
     * Performs needed actions after a slide transition
     */
    var updateAfterSlideTransition = function() {
      // if infinite loop is true
      if (slider.settings.infiniteLoop) {
        var position = '';
        // first slide
        if (slider.active.index === 0) {
          // set the new position
          position = slider.children.eq(0).position();
        // carousel, last slide
        } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
          position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
        // last slide
        } else if (slider.active.index === slider.children.length - 1) {
          position = slider.children.eq(slider.children.length - 1).position();
        }
        if (position) {
          if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
      // declare that the transition is complete
      slider.working = false;
      // onSlideAfter callback
      slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
    };

    /**
     * Updates the auto controls state (either active, or combined switch)
     *
     * @param state (string) "start", "stop"
     *  - the new state of the auto show
     */
    var updateAutoControls = function(state) {
      // if autoControlsCombine is true, replace the current control with the new state
      if (slider.settings.autoControlsCombine) {
        slider.controls.autoEl.html(slider.controls[state]);
      // if autoControlsCombine is false, apply the "active" class to the appropriate control
      } else {
        slider.controls.autoEl.find('a').removeClass('active');
        slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
      }
    };

    /**
     * Updates the direction controls (checks if either should be hidden)
     */
    var updateDirectionControls = function() {
      if (getPagerQty() === 1) {
        slider.controls.prev.addClass('disabled');
        slider.controls.next.addClass('disabled');
      } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
        // if first slide
        if (slider.active.index === 0) {
          slider.controls.prev.addClass('disabled');
          slider.controls.next.removeClass('disabled');
        // if last slide
        } else if (slider.active.index === getPagerQty() - 1) {
          slider.controls.next.addClass('disabled');
          slider.controls.prev.removeClass('disabled');
        // if any slide in the middle
        } else {
          slider.controls.prev.removeClass('disabled');
          slider.controls.next.removeClass('disabled');
        }
      }
    };

    /**
     * Initializes the auto process
     */
    var initAuto = function() {
      // if autoDelay was supplied, launch the auto show using a setTimeout() call
      if (slider.settings.autoDelay > 0) {
        var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
      // if autoDelay was not supplied, start the auto show normally
      } else {
        el.startAuto();

        //add focus and blur events to ensure its running if timeout gets paused
        $(window).focus(function() {
          el.startAuto();
        }).blur(function() {
          el.stopAuto();
        });
      }
      // if autoHover is requested
      if (slider.settings.autoHover) {
        // on el hover
        el.hover(function() {
          // if the auto show is currently playing (has an active interval)
          if (slider.interval) {
            // stop the auto show and pass true argument which will prevent control update
            el.stopAuto(true);
            // create a new autoPaused value which will be used by the relative "mouseout" event
            slider.autoPaused = true;
          }
        }, function() {
          // if the autoPaused value was created be the prior "mouseover" event
          if (slider.autoPaused) {
            // start the auto show and pass true argument which will prevent control update
            el.startAuto(true);
            // reset the autoPaused value
            slider.autoPaused = null;
          }
        });
      }
    };

    /**
     * Initializes the ticker process
     */
    var initTicker = function() {
      var startPosition = 0,
      position, transform, value, idx, ratio, property, newSpeed, totalDimens;
      // if autoDirection is "next", append a clone of the entire slider
      if (slider.settings.autoDirection === 'next') {
        el.append(slider.children.clone().addClass('bx-clone'));
      // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
      } else {
        el.prepend(slider.children.clone().addClass('bx-clone'));
        position = slider.children.first().position();
        startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
      }
      setPositionProperty(startPosition, 'reset', 0);
      // do not allow controls in ticker mode
      slider.settings.pager = false;
      slider.settings.controls = false;
      slider.settings.autoControls = false;
      // if autoHover is requested
      if (slider.settings.tickerHover) {
        if (slider.usingCSS) {
          idx = slider.settings.mode === 'horizontal' ? 4 : 5;
          slider.viewport.hover(function() {
            transform = el.css('-' + slider.cssPrefix + '-transform');
            value = parseFloat(transform.split(',')[idx]);
            setPositionProperty(value, 'reset', 0);
          }, function() {
            totalDimens = 0;
            slider.children.each(function(index) {
              totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
            });
            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
            ratio = slider.settings.speed / totalDimens;
            // determine which property to use
            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
            // calculate the new speed
            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
            tickerLoop(newSpeed);
          });
        } else {
          // on el hover
          slider.viewport.hover(function() {
            el.stop();
          }, function() {
            // calculate the total width of children (used to calculate the speed ratio)
            totalDimens = 0;
            slider.children.each(function(index) {
              totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
            });
            // calculate the speed ratio (used to determine the new speed to finish the paused animation)
            ratio = slider.settings.speed / totalDimens;
            // determine which property to use
            property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
            // calculate the new speed
            newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
            tickerLoop(newSpeed);
          });
        }
      }
      // start the ticker loop
      tickerLoop();
    };

    /**
     * Runs a continuous loop, news ticker-style
     */
    var tickerLoop = function(resumeSpeed) {
      var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
      position = {left: 0, top: 0},
      reset = {left: 0, top: 0},
      animateProperty, resetValue, params;

      // if "next" animate left position to last child, then reset left to 0
      if (slider.settings.autoDirection === 'next') {
        position = el.find('.bx-clone').first().position();
      // if "prev" animate left position to 0, then reset left to first non-clone child
      } else {
        reset = slider.children.first().position();
      }
      animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
      resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
      params = {resetValue: resetValue};
      setPositionProperty(animateProperty, 'ticker', speed, params);
    };

    /**
     * Check if el is on screen
     */
    var isOnScreen = function(el) {
      var win = $(window),
      viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
      },
      bounds = el.offset();

      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
      bounds.right = bounds.left + el.outerWidth();
      bounds.bottom = bounds.top + el.outerHeight();

      return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    /**
     * Initializes keyboard events
     */
    var keyPress = function(e) {
      var activeElementTag = document.activeElement.tagName.toLowerCase(),
      tagFilters = 'input|textarea',
      p = new RegExp(activeElementTag,['i']),
      result = p.exec(tagFilters);

      if (result == null && isOnScreen(el)) {
        if (e.keyCode === 39) {
          clickNextBind(e);
          return false;
        } else if (e.keyCode === 37) {
          clickPrevBind(e);
          return false;
        }
      }
    };

    /**
     * Initializes touch events
     */
    var initTouch = function() {
      // initialize object to contain all touch values
      slider.touch = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      };
      slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);

      //for browsers that have implemented pointer events and fire a click after
      //every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
      slider.viewport.on('click', '.bxslider a', function(e) {
        if (slider.viewport.hasClass('click-disabled')) {
          e.preventDefault();
          slider.viewport.removeClass('click-disabled');
        }
      });
    };

    /**
     * Event handler for "touchstart"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchStart = function(e) {
      //disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
      slider.controls.el.addClass('disabled');

      if (slider.working) {
        e.preventDefault();
        slider.controls.el.removeClass('disabled');
      } else {
        // record the original position when touch starts
        slider.touch.originalPos = el.position();
        var orig = e.originalEvent,
        touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
        // record the starting touch x, y coordinates
        slider.touch.start.x = touchPoints[0].pageX;
        slider.touch.start.y = touchPoints[0].pageY;

        if (slider.viewport.get(0).setPointerCapture) {
          slider.pointerId = orig.pointerId;
          slider.viewport.get(0).setPointerCapture(slider.pointerId);
        }
        // bind a "touchmove" event to the viewport
        slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
        // bind a "touchend" event to the viewport
        slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
        slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
      }
    };

    /**
     * Cancel Pointer for Windows Phone
     *
     * @param e (event)
     *  - DOM event object
     */
    var onPointerCancel = function(e) {
      /* onPointerCancel handler is needed to deal with situations when a touchend
      doesn't fire after a touchstart (this happens on windows phones only) */
      setPositionProperty(slider.touch.originalPos.left, 'reset', 0);

      //remove handlers
      slider.controls.el.removeClass('disabled');
      slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
      slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
      slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
      if (slider.viewport.get(0).releasePointerCapture) {
        slider.viewport.get(0).releasePointerCapture(slider.pointerId);
      }
    };

    /**
     * Event handler for "touchmove"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchMove = function(e) {
      var orig = e.originalEvent,
      touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
      // if scrolling on y axis, do not prevent default
      xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
      yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
      value = 0,
      change = 0;

      // x axis swipe
      if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
        e.preventDefault();
      // y axis swipe
      } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
        e.preventDefault();
      }
      if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
        // if horizontal, drag along x axis
        if (slider.settings.mode === 'horizontal') {
          change = touchPoints[0].pageX - slider.touch.start.x;
          value = slider.touch.originalPos.left + change;
        // if vertical, drag along y axis
        } else {
          change = touchPoints[0].pageY - slider.touch.start.y;
          value = slider.touch.originalPos.top + change;
        }
        setPositionProperty(value, 'reset', 0);
      }
    };

    /**
     * Event handler for "touchend"
     *
     * @param e (event)
     *  - DOM event object
     */
    var onTouchEnd = function(e) {
      slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
      //enable slider controls as soon as user stops interacing with slides
      slider.controls.el.removeClass('disabled');
      var orig    = e.originalEvent,
      touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
      value       = 0,
      distance    = 0;
      // record end x, y positions
      slider.touch.end.x = touchPoints[0].pageX;
      slider.touch.end.y = touchPoints[0].pageY;
      // if fade mode, check if absolute x distance clears the threshold
      if (slider.settings.mode === 'fade') {
        distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
        if (distance >= slider.settings.swipeThreshold) {
          if (slider.touch.start.x > slider.touch.end.x) {
            el.goToNextSlide();
          } else {
            el.goToPrevSlide();
          }
          el.stopAuto();
        }
      // not fade mode
      } else {
        // calculate distance and el's animate property
        if (slider.settings.mode === 'horizontal') {
          distance = slider.touch.end.x - slider.touch.start.x;
          value = slider.touch.originalPos.left;
        } else {
          distance = slider.touch.end.y - slider.touch.start.y;
          value = slider.touch.originalPos.top;
        }
        // if not infinite loop and first / last slide, do not attempt a slide transition
        if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
          setPositionProperty(value, 'reset', 200);
        } else {
          // check if distance clears threshold
          if (Math.abs(distance) >= slider.settings.swipeThreshold) {
            if (distance < 0) {
              el.goToNextSlide();
            } else {
              el.goToPrevSlide();
            }
            el.stopAuto();
          } else {
            // el.animate(property, 200);
            setPositionProperty(value, 'reset', 200);
          }
        }
      }
      slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
      if (slider.viewport.get(0).releasePointerCapture) {
        slider.viewport.get(0).releasePointerCapture(slider.pointerId);
      }
    };

    /**
     * Window resize event callback
     */
    var resizeWindow = function(e) {
      // don't do anything if slider isn't initialized.
      if (!slider.initialized) { return; }
      // Delay if slider working.
      if (slider.working) {
        window.setTimeout(resizeWindow, 10);
      } else {
        // get the new window dimens (again, thank you IE)
        var windowWidthNew = $(window).width(),
        windowHeightNew = $(window).height();
        // make sure that it is a true window resize
        // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
        // are resized. Can you just die already?*
        if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
          // set the new window dimens
          windowWidth = windowWidthNew;
          windowHeight = windowHeightNew;
          // update all dynamic elements
          el.redrawSlider();
          // Call user resize handler
          slider.settings.onSliderResize.call(el, slider.active.index);
        }
      }
    };

    /**
     * Adds an aria-hidden=true attribute to each element
     *
     * @param startVisibleIndex (int)
     *  - the first visible element's index
     */
    var applyAriaHiddenAttributes = function(startVisibleIndex) {
      var numberOfSlidesShowing = getNumberSlidesShowing();
      // only apply attributes if the setting is enabled and not in ticker mode
      if (slider.settings.ariaHidden && !slider.settings.ticker) {
        // add aria-hidden=true to all elements
        slider.children.attr('aria-hidden', 'true');
        // get the visible elements and change to aria-hidden=false
        slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
      }
    };

    /**
     * Returns index according to present page range
     *
     * @param slideOndex (int)
     *  - the desired slide index
     */
    var setSlideIndex = function(slideIndex) {
      if (slideIndex < 0) {
        if (slider.settings.infiniteLoop) {
          return getPagerQty() - 1;
        }else {
          //we don't go to undefined slides
          return slider.active.index;
        }
      // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
      } else if (slideIndex >= getPagerQty()) {
        if (slider.settings.infiniteLoop) {
          return 0;
        } else {
          //we don't move to undefined pages
          return slider.active.index;
        }
      // set active index to requested slide
      } else {
        return slideIndex;
      }
    };

    /**
     * ===================================================================================
     * = PUBLIC FUNCTIONS
     * ===================================================================================
     */

    /**
     * Performs slide transition to the specified slide
     *
     * @param slideIndex (int)
     *  - the destination slide's index (zero-based)
     *
     * @param direction (string)
     *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
     */
    el.goToSlide = function(slideIndex, direction) {
      // onSlideBefore, onSlideNext, onSlidePrev callbacks
      // Allow transition canceling based on returned value
      var performTransition = true,
      moveBy = 0,
      position = {left: 0, top: 0},
      lastChild = null,
      lastShowingIndex, eq, value, requestEl;
      // store the old index
      slider.oldIndex = slider.active.index;
      //set new index
      slider.active.index = setSlideIndex(slideIndex);

      // if plugin is currently in motion, ignore request
      if (slider.working || slider.active.index === slider.oldIndex) { return; }
      // declare that plugin is in motion
      slider.working = true;

      performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);

      // If transitions canceled, reset and return
      if (typeof (performTransition) !== 'undefined' && !performTransition) {
        slider.active.index = slider.oldIndex; // restore old index
        slider.working = false; // is not in motion
        return;
      }

      if (direction === 'next') {
        // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
        if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
          performTransition = false;
        }
      } else if (direction === 'prev') {
        // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
        if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
          performTransition = false;
        }
      }

      // check if last slide
      slider.active.last = slider.active.index >= getPagerQty() - 1;
      // update the pager with active class
      if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
      // // check for direction control update
      if (slider.settings.controls) { updateDirectionControls(); }
      // if slider is set to mode: "fade"
      if (slider.settings.mode === 'fade') {
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // fade out the visible child and reset its z-index value
        slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
        // fade in the newly requested slide
        slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function() {
          $(this).css('zIndex', slider.settings.slideZIndex);
          updateAfterSlideTransition();
        });
      // slider mode is not "fade"
      } else {
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // if carousel and not infinite loop
        if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
          if (slider.settings.mode === 'horizontal') {
            // get the last child position
            lastChild = slider.children.eq(slider.children.length - 1);
            position = lastChild.position();
            // calculate the position of the last slide
            moveBy = slider.viewport.width() - lastChild.outerWidth();
          } else {
            // get last showing index position
            lastShowingIndex = slider.children.length - slider.settings.minSlides;
            position = slider.children.eq(lastShowingIndex).position();
          }
          // horizontal carousel, going previous while on first slide (infiniteLoop mode)
        } else if (slider.carousel && slider.active.last && direction === 'prev') {
          // get the last child position
          eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
          lastChild = el.children('.bx-clone').eq(eq);
          position = lastChild.position();
        // if infinite loop and "Next" is clicked on the last slide
        } else if (direction === 'next' && slider.active.index === 0) {
          // get the last clone position
          position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
          slider.active.last = false;
        // normal non-zero requests
        } else if (slideIndex >= 0) {
          //parseInt is applied to allow floats for slides/page
          requestEl = slideIndex * parseInt(getMoveBy());
          position = slider.children.eq(requestEl).position();
        }

        /* If the position doesn't exist
         * (e.g. if you destroy the slider on a next click),
         * it doesn't throw an error.
         */
        if (typeof (position) !== 'undefined') {
          value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
          // plugin values to be animated
          setPositionProperty(value, 'slide', slider.settings.speed);
        } else {
          slider.working = false;
        }
      }
      if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
    };

    /**
     * Transitions to the next slide in the show
     */
    el.goToNextSlide = function() {
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.last) { return; }
      var pagerIndex = parseInt(slider.active.index) + 1;
      el.goToSlide(pagerIndex, 'next');
    };

    /**
     * Transitions to the prev slide in the show
     */
    el.goToPrevSlide = function() {
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
      var pagerIndex = parseInt(slider.active.index) - 1;
      el.goToSlide(pagerIndex, 'prev');
    };

    /**
     * Starts the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.startAuto = function(preventControlUpdate) {
      // if an interval already exists, disregard call
      if (slider.interval) { return; }
      // create an interval
      slider.interval = setInterval(function() {
        if (slider.settings.autoDirection === 'next') {
          el.goToNextSlide();
        } else {
          el.goToPrevSlide();
        }
      }, slider.settings.pause);
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
    };

    /**
     * Stops the auto show
     *
     * @param preventControlUpdate (boolean)
     *  - if true, auto controls state will not be updated
     */
    el.stopAuto = function(preventControlUpdate) {
      // if no interval exists, disregard call
      if (!slider.interval) { return; }
      // clear the interval
      clearInterval(slider.interval);
      slider.interval = null;
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
    };

    /**
     * Returns current slide index (zero-based)
     */
    el.getCurrentSlide = function() {
      return slider.active.index;
    };

    /**
     * Returns current slide element
     */
    el.getCurrentSlideElement = function() {
      return slider.children.eq(slider.active.index);
    };

    /**
     * Returns a slide element
     * @param index (int)
     *  - The index (zero-based) of the element you want returned.
     */
    el.getSlideElement = function(index) {
      return slider.children.eq(index);
    };

    /**
     * Returns number of slides in show
     */
    el.getSlideCount = function() {
      return slider.children.length;
    };

    /**
     * Return slider.working variable
     */
    el.isWorking = function() {
      return slider.working;
    };

    /**
     * Update all dynamic slider elements
     */
    el.redrawSlider = function() {
      // resize all children in ratio to new screen size
      slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
      // adjust the height
      slider.viewport.css('height', getViewportHeight());
      // update the slide position
      if (!slider.settings.ticker) { setSlidePosition(); }
      // if active.last was true before the screen resize, we want
      // to keep it last no matter what screen size we end on
      if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
      // if the active index (page) no longer exists due to the resize, simply set the index as last
      if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
      // if a pager is being displayed and a custom pager is not being used, update it
      if (slider.settings.pager && !slider.settings.pagerCustom) {
        populatePager();
        updatePagerActive(slider.active.index);
      }
      if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
    };

    /**
     * Destroy the current instance of the slider (revert everything back to original state)
     */
    el.destroySlider = function() {
      // don't do anything if slider has already been destroyed
      if (!slider.initialized) { return; }
      slider.initialized = false;
      $('.bx-clone', this).remove();
      slider.children.each(function() {
        if ($(this).data('origStyle') !== undefined) {
          $(this).attr('style', $(this).data('origStyle'));
        } else {
          $(this).removeAttr('style');
        }
      });
      if ($(this).data('origStyle') !== undefined) {
        this.attr('style', $(this).data('origStyle'));
      } else {
        $(this).removeAttr('style');
      }
      $(this).unwrap().unwrap();
      if (slider.controls.el) { slider.controls.el.remove(); }
      if (slider.controls.next) { slider.controls.next.remove(); }
      if (slider.controls.prev) { slider.controls.prev.remove(); }
      if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
      $('.bx-caption', this).remove();
      if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
      clearInterval(slider.interval);
      if (slider.settings.responsive) { $(window).unbind('resize', resizeWindow); }
      if (slider.settings.keyboardEnabled) { $(document).unbind('keydown', keyPress); }
      //remove self reference in data
      $(this).removeData('bxSlider');
    };

    /**
     * Reload the slider (revert all DOM changes, and re-initialize)
     */
    el.reloadSlider = function(settings) {
      if (settings !== undefined) { options = settings; }
      el.destroySlider();
      init();
      //store reference to self in order to access public functions later
      $(el).data('bxSlider', this);
    };

    init();

    $(el).data('bxSlider', this);

    // returns the current jQuery object
    return this;
  };

})(jQuery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci5qcyIsImZvdW5kYXRpb24uanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiZm91bmRhdGlvbi5lcXVhbGl6ZXIuanMiLCJmb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsImZvdW5kYXRpb24udG9wYmFyLmpzIiwianF1ZXJ5LmVsZXZhdGV6b29tLmpzIiwianF1ZXJ5LmJ4c2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNydEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBNb2Rlcm5penIgdjIuOC4zXG4gKiB3d3cubW9kZXJuaXpyLmNvbVxuICpcbiAqIENvcHlyaWdodCAoYykgRmFydWsgQXRlcywgUGF1bCBJcmlzaCwgQWxleCBTZXh0b25cbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIGFuZCBNSVQgbGljZW5zZXM6IHd3dy5tb2Rlcm5penIuY29tL2xpY2Vuc2UvXG4gKi9cbndpbmRvdy5Nb2Rlcm5penI9ZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7dC5jc3NUZXh0PWF9ZnVuY3Rpb24gZShhLGIpe3JldHVybiBkKHguam9pbihhK1wiO1wiKSsoYnx8XCJcIikpfWZ1bmN0aW9uIGYoYSxiKXtyZXR1cm4gdHlwZW9mIGE9PT1ifWZ1bmN0aW9uIGcoYSxiKXtyZXR1cm4hIX4oXCJcIithKS5pbmRleE9mKGIpfWZ1bmN0aW9uIGgoYSxiKXtmb3IodmFyIGQgaW4gYSl7dmFyIGU9YVtkXTtpZighZyhlLFwiLVwiKSYmdFtlXSE9PWMpcmV0dXJuXCJwZnhcIj09Yj9lOiEwfXJldHVybiExfWZ1bmN0aW9uIGkoYSxiLGQpe2Zvcih2YXIgZSBpbiBhKXt2YXIgZz1iW2FbZV1dO2lmKGchPT1jKXJldHVybiBkPT09ITE/YVtlXTpmKGcsXCJmdW5jdGlvblwiKT9nLmJpbmQoZHx8Yik6Z31yZXR1cm4hMX1mdW5jdGlvbiBqKGEsYixjKXt2YXIgZD1hLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Euc2xpY2UoMSksZT0oYStcIiBcIit6LmpvaW4oZCtcIiBcIikrZCkuc3BsaXQoXCIgXCIpO3JldHVybiBmKGIsXCJzdHJpbmdcIil8fGYoYixcInVuZGVmaW5lZFwiKT9oKGUsYik6KGU9KGErXCIgXCIrQS5qb2luKGQrXCIgXCIpK2QpLnNwbGl0KFwiIFwiKSxpKGUsYixjKSl9ZnVuY3Rpb24gaygpe28uaW5wdXQ9ZnVuY3Rpb24oYyl7Zm9yKHZhciBkPTAsZT1jLmxlbmd0aDtlPmQ7ZCsrKUVbY1tkXV09ISEoY1tkXWluIHUpO3JldHVybiBFLmxpc3QmJihFLmxpc3Q9ISghYi5jcmVhdGVFbGVtZW50KFwiZGF0YWxpc3RcIil8fCFhLkhUTUxEYXRhTGlzdEVsZW1lbnQpKSxFfShcImF1dG9jb21wbGV0ZSBhdXRvZm9jdXMgbGlzdCBwbGFjZWhvbGRlciBtYXggbWluIG11bHRpcGxlIHBhdHRlcm4gcmVxdWlyZWQgc3RlcFwiLnNwbGl0KFwiIFwiKSksby5pbnB1dHR5cGVzPWZ1bmN0aW9uKGEpe2Zvcih2YXIgZCxlLGYsZz0wLGg9YS5sZW5ndGg7aD5nO2crKyl1LnNldEF0dHJpYnV0ZShcInR5cGVcIixlPWFbZ10pLGQ9XCJ0ZXh0XCIhPT11LnR5cGUsZCYmKHUudmFsdWU9dix1LnN0eWxlLmNzc1RleHQ9XCJwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjtcIiwvXnJhbmdlJC8udGVzdChlKSYmdS5zdHlsZS5XZWJraXRBcHBlYXJhbmNlIT09Yz8ocS5hcHBlbmRDaGlsZCh1KSxmPWIuZGVmYXVsdFZpZXcsZD1mLmdldENvbXB1dGVkU3R5bGUmJlwidGV4dGZpZWxkXCIhPT1mLmdldENvbXB1dGVkU3R5bGUodSxudWxsKS5XZWJraXRBcHBlYXJhbmNlJiYwIT09dS5vZmZzZXRIZWlnaHQscS5yZW1vdmVDaGlsZCh1KSk6L14oc2VhcmNofHRlbCkkLy50ZXN0KGUpfHwoZD0vXih1cmx8ZW1haWwpJC8udGVzdChlKT91LmNoZWNrVmFsaWRpdHkmJnUuY2hlY2tWYWxpZGl0eSgpPT09ITE6dS52YWx1ZSE9dikpLERbYVtnXV09ISFkO3JldHVybiBEfShcInNlYXJjaCB0ZWwgdXJsIGVtYWlsIGRhdGV0aW1lIGRhdGUgbW9udGggd2VlayB0aW1lIGRhdGV0aW1lLWxvY2FsIG51bWJlciByYW5nZSBjb2xvclwiLnNwbGl0KFwiIFwiKSl9dmFyIGwsbSxuPVwiMi44LjNcIixvPXt9LHA9ITAscT1iLmRvY3VtZW50RWxlbWVudCxyPVwibW9kZXJuaXpyXCIscz1iLmNyZWF0ZUVsZW1lbnQociksdD1zLnN0eWxlLHU9Yi5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksdj1cIjopXCIsdz17fS50b1N0cmluZyx4PVwiIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtIFwiLnNwbGl0KFwiIFwiKSx5PVwiV2Via2l0IE1veiBPIG1zXCIsej15LnNwbGl0KFwiIFwiKSxBPXkudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIiksQj17c3ZnOlwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIn0sQz17fSxEPXt9LEU9e30sRj1bXSxHPUYuc2xpY2UsSD1mdW5jdGlvbihhLGMsZCxlKXt2YXIgZixnLGgsaSxqPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKSxrPWIuYm9keSxsPWt8fGIuY3JlYXRlRWxlbWVudChcImJvZHlcIik7aWYocGFyc2VJbnQoZCwxMCkpZm9yKDtkLS07KWg9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGguaWQ9ZT9lW2RdOnIrKGQrMSksai5hcHBlbmRDaGlsZChoKTtyZXR1cm4gZj1bXCImIzE3MztcIiwnPHN0eWxlIGlkPVwicycsciwnXCI+JyxhLFwiPC9zdHlsZT5cIl0uam9pbihcIlwiKSxqLmlkPXIsKGs/ajpsKS5pbm5lckhUTUwrPWYsbC5hcHBlbmRDaGlsZChqKSxrfHwobC5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIsbC5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLGk9cS5zdHlsZS5vdmVyZmxvdyxxLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIscS5hcHBlbmRDaGlsZChsKSksZz1jKGosYSksaz9qLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaik6KGwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsKSxxLnN0eWxlLm92ZXJmbG93PWkpLCEhZ30sST1mdW5jdGlvbihiKXt2YXIgYz1hLm1hdGNoTWVkaWF8fGEubXNNYXRjaE1lZGlhO2lmKGMpcmV0dXJuIGMoYikmJmMoYikubWF0Y2hlc3x8ITE7dmFyIGQ7cmV0dXJuIEgoXCJAbWVkaWEgXCIrYitcIiB7ICNcIityK1wiIHsgcG9zaXRpb246IGFic29sdXRlOyB9IH1cIixmdW5jdGlvbihiKXtkPVwiYWJzb2x1dGVcIj09KGEuZ2V0Q29tcHV0ZWRTdHlsZT9nZXRDb21wdXRlZFN0eWxlKGIsbnVsbCk6Yi5jdXJyZW50U3R5bGUpLnBvc2l0aW9ufSksZH0sSj1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSxlKXtlPWV8fGIuY3JlYXRlRWxlbWVudChkW2FdfHxcImRpdlwiKSxhPVwib25cIithO3ZhciBnPWEgaW4gZTtyZXR1cm4gZ3x8KGUuc2V0QXR0cmlidXRlfHwoZT1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGUuc2V0QXR0cmlidXRlJiZlLnJlbW92ZUF0dHJpYnV0ZSYmKGUuc2V0QXR0cmlidXRlKGEsXCJcIiksZz1mKGVbYV0sXCJmdW5jdGlvblwiKSxmKGVbYV0sXCJ1bmRlZmluZWRcIil8fChlW2FdPWMpLGUucmVtb3ZlQXR0cmlidXRlKGEpKSksZT1udWxsLGd9dmFyIGQ9e3NlbGVjdDpcImlucHV0XCIsY2hhbmdlOlwiaW5wdXRcIixzdWJtaXQ6XCJmb3JtXCIscmVzZXQ6XCJmb3JtXCIsZXJyb3I6XCJpbWdcIixsb2FkOlwiaW1nXCIsYWJvcnQ6XCJpbWdcIn07cmV0dXJuIGF9KCksSz17fS5oYXNPd25Qcm9wZXJ0eTttPWYoSyxcInVuZGVmaW5lZFwiKXx8ZihLLmNhbGwsXCJ1bmRlZmluZWRcIik/ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYiBpbiBhJiZmKGEuY29uc3RydWN0b3IucHJvdG90eXBlW2JdLFwidW5kZWZpbmVkXCIpfTpmdW5jdGlvbihhLGIpe3JldHVybiBLLmNhbGwoYSxiKX0sRnVuY3Rpb24ucHJvdG90eXBlLmJpbmR8fChGdW5jdGlvbi5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGIpdGhyb3cgbmV3IFR5cGVFcnJvcjt2YXIgYz1HLmNhbGwoYXJndW1lbnRzLDEpLGQ9ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgZCl7dmFyIGU9ZnVuY3Rpb24oKXt9O2UucHJvdG90eXBlPWIucHJvdG90eXBlO3ZhciBmPW5ldyBlLGc9Yi5hcHBseShmLGMuY29uY2F0KEcuY2FsbChhcmd1bWVudHMpKSk7cmV0dXJuIE9iamVjdChnKT09PWc/ZzpmfXJldHVybiBiLmFwcGx5KGEsYy5jb25jYXQoRy5jYWxsKGFyZ3VtZW50cykpKX07cmV0dXJuIGR9KSxDLmZsZXhib3g9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImZsZXhXcmFwXCIpfSxDLmZsZXhib3hsZWdhY3k9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImJveERpcmVjdGlvblwiKX0sQy5jYW52YXM9ZnVuY3Rpb24oKXt2YXIgYT1iLmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7cmV0dXJuISghYS5nZXRDb250ZXh0fHwhYS5nZXRDb250ZXh0KFwiMmRcIikpfSxDLmNhbnZhc3RleHQ9ZnVuY3Rpb24oKXtyZXR1cm4hKCFvLmNhbnZhc3x8IWYoYi5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKS5maWxsVGV4dCxcImZ1bmN0aW9uXCIpKX0sQy53ZWJnbD1mdW5jdGlvbigpe3JldHVybiEhYS5XZWJHTFJlbmRlcmluZ0NvbnRleHR9LEMudG91Y2g9ZnVuY3Rpb24oKXt2YXIgYztyZXR1cm5cIm9udG91Y2hzdGFydFwiaW4gYXx8YS5Eb2N1bWVudFRvdWNoJiZiIGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaD9jPSEwOkgoW1wiQG1lZGlhIChcIix4LmpvaW4oXCJ0b3VjaC1lbmFibGVkKSwoXCIpLHIsXCIpXCIsXCJ7I21vZGVybml6cnt0b3A6OXB4O3Bvc2l0aW9uOmFic29sdXRlfX1cIl0uam9pbihcIlwiKSxmdW5jdGlvbihhKXtjPTk9PT1hLm9mZnNldFRvcH0pLGN9LEMuZ2VvbG9jYXRpb249ZnVuY3Rpb24oKXtyZXR1cm5cImdlb2xvY2F0aW9uXCJpbiBuYXZpZ2F0b3J9LEMucG9zdG1lc3NhZ2U9ZnVuY3Rpb24oKXtyZXR1cm4hIWEucG9zdE1lc3NhZ2V9LEMud2Vic3FsZGF0YWJhc2U9ZnVuY3Rpb24oKXtyZXR1cm4hIWEub3BlbkRhdGFiYXNlfSxDLmluZGV4ZWREQj1mdW5jdGlvbigpe3JldHVybiEhaihcImluZGV4ZWREQlwiLGEpfSxDLmhhc2hjaGFuZ2U9ZnVuY3Rpb24oKXtyZXR1cm4gSihcImhhc2hjaGFuZ2VcIixhKSYmKGIuZG9jdW1lbnRNb2RlPT09Y3x8Yi5kb2N1bWVudE1vZGU+Nyl9LEMuaGlzdG9yeT1mdW5jdGlvbigpe3JldHVybiEoIWEuaGlzdG9yeXx8IWhpc3RvcnkucHVzaFN0YXRlKX0sQy5kcmFnYW5kZHJvcD1mdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm5cImRyYWdnYWJsZVwiaW4gYXx8XCJvbmRyYWdzdGFydFwiaW4gYSYmXCJvbmRyb3BcImluIGF9LEMud2Vic29ja2V0cz1mdW5jdGlvbigpe3JldHVyblwiV2ViU29ja2V0XCJpbiBhfHxcIk1veldlYlNvY2tldFwiaW4gYX0sQy5yZ2JhPWZ1bmN0aW9uKCl7cmV0dXJuIGQoXCJiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTUwLDI1NSwxNTAsLjUpXCIpLGcodC5iYWNrZ3JvdW5kQ29sb3IsXCJyZ2JhXCIpfSxDLmhzbGE9ZnVuY3Rpb24oKXtyZXR1cm4gZChcImJhY2tncm91bmQtY29sb3I6aHNsYSgxMjAsNDAlLDEwMCUsLjUpXCIpLGcodC5iYWNrZ3JvdW5kQ29sb3IsXCJyZ2JhXCIpfHxnKHQuYmFja2dyb3VuZENvbG9yLFwiaHNsYVwiKX0sQy5tdWx0aXBsZWJncz1mdW5jdGlvbigpe3JldHVybiBkKFwiYmFja2dyb3VuZDp1cmwoaHR0cHM6Ly8pLHVybChodHRwczovLykscmVkIHVybChodHRwczovLylcIiksLyh1cmxcXHMqXFwoLio/KXszfS8udGVzdCh0LmJhY2tncm91bmQpfSxDLmJhY2tncm91bmRzaXplPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJiYWNrZ3JvdW5kU2l6ZVwiKX0sQy5ib3JkZXJpbWFnZT1mdW5jdGlvbigpe3JldHVybiBqKFwiYm9yZGVySW1hZ2VcIil9LEMuYm9yZGVycmFkaXVzPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJib3JkZXJSYWRpdXNcIil9LEMuYm94c2hhZG93PWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJib3hTaGFkb3dcIil9LEMudGV4dHNoYWRvdz1mdW5jdGlvbigpe3JldHVyblwiXCI9PT1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikuc3R5bGUudGV4dFNoYWRvd30sQy5vcGFjaXR5PWZ1bmN0aW9uKCl7cmV0dXJuIGUoXCJvcGFjaXR5Oi41NVwiKSwvXjAuNTUkLy50ZXN0KHQub3BhY2l0eSl9LEMuY3NzYW5pbWF0aW9ucz1mdW5jdGlvbigpe3JldHVybiBqKFwiYW5pbWF0aW9uTmFtZVwiKX0sQy5jc3Njb2x1bW5zPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJjb2x1bW5Db3VudFwiKX0sQy5jc3NncmFkaWVudHM9ZnVuY3Rpb24oKXt2YXIgYT1cImJhY2tncm91bmQtaW1hZ2U6XCIsYj1cImdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCBib3R0b20sZnJvbSgjOWY5KSx0byh3aGl0ZSkpO1wiLGM9XCJsaW5lYXItZ3JhZGllbnQobGVmdCB0b3AsIzlmOSwgd2hpdGUpO1wiO3JldHVybiBkKChhK1wiLXdlYmtpdC0gXCIuc3BsaXQoXCIgXCIpLmpvaW4oYithKSt4LmpvaW4oYythKSkuc2xpY2UoMCwtYS5sZW5ndGgpKSxnKHQuYmFja2dyb3VuZEltYWdlLFwiZ3JhZGllbnRcIil9LEMuY3NzcmVmbGVjdGlvbnM9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImJveFJlZmxlY3RcIil9LEMuY3NzdHJhbnNmb3Jtcz1mdW5jdGlvbigpe3JldHVybiEhaihcInRyYW5zZm9ybVwiKX0sQy5jc3N0cmFuc2Zvcm1zM2Q9ZnVuY3Rpb24oKXt2YXIgYT0hIWooXCJwZXJzcGVjdGl2ZVwiKTtyZXR1cm4gYSYmXCJ3ZWJraXRQZXJzcGVjdGl2ZVwiaW4gcS5zdHlsZSYmSChcIkBtZWRpYSAodHJhbnNmb3JtLTNkKSwoLXdlYmtpdC10cmFuc2Zvcm0tM2QpeyNtb2Rlcm5penJ7bGVmdDo5cHg7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjNweDt9fVwiLGZ1bmN0aW9uKGIsYyl7YT05PT09Yi5vZmZzZXRMZWZ0JiYzPT09Yi5vZmZzZXRIZWlnaHR9KSxhfSxDLmNzc3RyYW5zaXRpb25zPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJ0cmFuc2l0aW9uXCIpfSxDLmZvbnRmYWNlPWZ1bmN0aW9uKCl7dmFyIGE7cmV0dXJuIEgoJ0Bmb250LWZhY2Uge2ZvbnQtZmFtaWx5OlwiZm9udFwiO3NyYzp1cmwoXCJodHRwczovL1wiKX0nLGZ1bmN0aW9uKGMsZCl7dmFyIGU9Yi5nZXRFbGVtZW50QnlJZChcInNtb2Rlcm5penJcIiksZj1lLnNoZWV0fHxlLnN0eWxlU2hlZXQsZz1mP2YuY3NzUnVsZXMmJmYuY3NzUnVsZXNbMF0/Zi5jc3NSdWxlc1swXS5jc3NUZXh0OmYuY3NzVGV4dHx8XCJcIjpcIlwiO2E9L3NyYy9pLnRlc3QoZykmJjA9PT1nLmluZGV4T2YoZC5zcGxpdChcIiBcIilbMF0pfSksYX0sQy5nZW5lcmF0ZWRjb250ZW50PWZ1bmN0aW9uKCl7dmFyIGE7cmV0dXJuIEgoW1wiI1wiLHIsXCJ7Zm9udDowLzAgYX0jXCIsciwnOmFmdGVye2NvbnRlbnQ6XCInLHYsJ1wiO3Zpc2liaWxpdHk6aGlkZGVuO2ZvbnQ6M3B4LzEgYX0nXS5qb2luKFwiXCIpLGZ1bmN0aW9uKGIpe2E9Yi5vZmZzZXRIZWlnaHQ+PTN9KSxhfSxDLnZpZGVvPWZ1bmN0aW9uKCl7dmFyIGE9Yi5jcmVhdGVFbGVtZW50KFwidmlkZW9cIiksYz0hMTt0cnl7KGM9ISFhLmNhblBsYXlUeXBlKSYmKGM9bmV3IEJvb2xlYW4oYyksYy5vZ2c9YS5jYW5QbGF5VHlwZSgndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGMuaDI2ND1hLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxjLndlYm09YS5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpKX1jYXRjaChkKXt9cmV0dXJuIGN9LEMuYXVkaW89ZnVuY3Rpb24oKXt2YXIgYT1iLmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKSxjPSExO3RyeXsoYz0hIWEuY2FuUGxheVR5cGUpJiYoYz1uZXcgQm9vbGVhbihjKSxjLm9nZz1hLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYy5tcDM9YS5jYW5QbGF5VHlwZShcImF1ZGlvL21wZWc7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGMud2F2PWEuY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYy5tNGE9KGEuY2FuUGxheVR5cGUoXCJhdWRpby94LW00YTtcIil8fGEuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSl9Y2F0Y2goZCl7fXJldHVybiBjfSxDLmxvY2Fsc3RvcmFnZT1mdW5jdGlvbigpe3RyeXtyZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0ocixyKSxsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShyKSwhMH1jYXRjaChhKXtyZXR1cm4hMX19LEMuc2Vzc2lvbnN0b3JhZ2U9ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0ocixyKSxzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHIpLCEwfWNhdGNoKGEpe3JldHVybiExfX0sQy53ZWJ3b3JrZXJzPWZ1bmN0aW9uKCl7cmV0dXJuISFhLldvcmtlcn0sQy5hcHBsaWNhdGlvbmNhY2hlPWZ1bmN0aW9uKCl7cmV0dXJuISFhLmFwcGxpY2F0aW9uQ2FjaGV9LEMuc3ZnPWZ1bmN0aW9uKCl7cmV0dXJuISFiLmNyZWF0ZUVsZW1lbnROUyYmISFiLmNyZWF0ZUVsZW1lbnROUyhCLnN2ZyxcInN2Z1wiKS5jcmVhdGVTVkdSZWN0fSxDLmlubGluZXN2Zz1mdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gYS5pbm5lckhUTUw9XCI8c3ZnLz5cIiwoYS5maXJzdENoaWxkJiZhLmZpcnN0Q2hpbGQubmFtZXNwYWNlVVJJKT09Qi5zdmd9LEMuc21pbD1mdW5jdGlvbigpe3JldHVybiEhYi5jcmVhdGVFbGVtZW50TlMmJi9TVkdBbmltYXRlLy50ZXN0KHcuY2FsbChiLmNyZWF0ZUVsZW1lbnROUyhCLnN2ZyxcImFuaW1hdGVcIikpKX0sQy5zdmdjbGlwcGF0aHM9ZnVuY3Rpb24oKXtyZXR1cm4hIWIuY3JlYXRlRWxlbWVudE5TJiYvU1ZHQ2xpcFBhdGgvLnRlc3Qody5jYWxsKGIuY3JlYXRlRWxlbWVudE5TKEIuc3ZnLFwiY2xpcFBhdGhcIikpKX07Zm9yKHZhciBMIGluIEMpbShDLEwpJiYobD1MLnRvTG93ZXJDYXNlKCksb1tsXT1DW0xdKCksRi5wdXNoKChvW2xdP1wiXCI6XCJuby1cIikrbCkpO3JldHVybiBvLmlucHV0fHxrKCksby5hZGRUZXN0PWZ1bmN0aW9uKGEsYil7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEpZm9yKHZhciBkIGluIGEpbShhLGQpJiZvLmFkZFRlc3QoZCxhW2RdKTtlbHNle2lmKGE9YS50b0xvd2VyQ2FzZSgpLG9bYV0hPT1jKXJldHVybiBvO2I9XCJmdW5jdGlvblwiPT10eXBlb2YgYj9iKCk6YixcInVuZGVmaW5lZFwiIT10eXBlb2YgcCYmcCYmKHEuY2xhc3NOYW1lKz1cIiBcIisoYj9cIlwiOlwibm8tXCIpK2EpLG9bYV09Yn1yZXR1cm4gb30sZChcIlwiKSxzPXU9bnVsbCxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYSxiKXt2YXIgYz1hLmNyZWF0ZUVsZW1lbnQoXCJwXCIpLGQ9YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF18fGEuZG9jdW1lbnRFbGVtZW50O3JldHVybiBjLmlubmVySFRNTD1cIng8c3R5bGU+XCIrYitcIjwvc3R5bGU+XCIsZC5pbnNlcnRCZWZvcmUoYy5sYXN0Q2hpbGQsZC5maXJzdENoaWxkKX1mdW5jdGlvbiBkKCl7dmFyIGE9cy5lbGVtZW50cztyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYT9hLnNwbGl0KFwiIFwiKTphfWZ1bmN0aW9uIGUoYSl7dmFyIGI9clthW3BdXTtyZXR1cm4gYnx8KGI9e30scSsrLGFbcF09cSxyW3FdPWIpLGJ9ZnVuY3Rpb24gZihhLGMsZCl7aWYoY3x8KGM9YiksaylyZXR1cm4gYy5jcmVhdGVFbGVtZW50KGEpO2R8fChkPWUoYykpO3ZhciBmO3JldHVybiBmPWQuY2FjaGVbYV0/ZC5jYWNoZVthXS5jbG9uZU5vZGUoKTpvLnRlc3QoYSk/KGQuY2FjaGVbYV09ZC5jcmVhdGVFbGVtKGEpKS5jbG9uZU5vZGUoKTpkLmNyZWF0ZUVsZW0oYSksIWYuY2FuSGF2ZUNoaWxkcmVufHxuLnRlc3QoYSl8fGYudGFnVXJuP2Y6ZC5mcmFnLmFwcGVuZENoaWxkKGYpfWZ1bmN0aW9uIGcoYSxjKXtpZihhfHwoYT1iKSxrKXJldHVybiBhLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtjPWN8fGUoYSk7Zm9yKHZhciBmPWMuZnJhZy5jbG9uZU5vZGUoKSxnPTAsaD1kKCksaT1oLmxlbmd0aDtpPmc7ZysrKWYuY3JlYXRlRWxlbWVudChoW2ddKTtyZXR1cm4gZn1mdW5jdGlvbiBoKGEsYil7Yi5jYWNoZXx8KGIuY2FjaGU9e30sYi5jcmVhdGVFbGVtPWEuY3JlYXRlRWxlbWVudCxiLmNyZWF0ZUZyYWc9YS5jcmVhdGVEb2N1bWVudEZyYWdtZW50LGIuZnJhZz1iLmNyZWF0ZUZyYWcoKSksYS5jcmVhdGVFbGVtZW50PWZ1bmN0aW9uKGMpe3JldHVybiBzLnNoaXZNZXRob2RzP2YoYyxhLGIpOmIuY3JlYXRlRWxlbShjKX0sYS5jcmVhdGVEb2N1bWVudEZyYWdtZW50PUZ1bmN0aW9uKFwiaCxmXCIsXCJyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj1mLmNsb25lTm9kZSgpLGM9bi5jcmVhdGVFbGVtZW50O2guc2hpdk1ldGhvZHMmJihcIitkKCkuam9pbigpLnJlcGxhY2UoL1tcXHdcXC1dKy9nLGZ1bmN0aW9uKGEpe3JldHVybiBiLmNyZWF0ZUVsZW0oYSksYi5mcmFnLmNyZWF0ZUVsZW1lbnQoYSksJ2MoXCInK2ErJ1wiKSd9KStcIik7cmV0dXJuIG59XCIpKHMsYi5mcmFnKX1mdW5jdGlvbiBpKGEpe2F8fChhPWIpO3ZhciBkPWUoYSk7cmV0dXJuIXMuc2hpdkNTU3x8anx8ZC5oYXNDU1N8fChkLmhhc0NTUz0hIWMoYSxcImFydGljbGUsYXNpZGUsZGlhbG9nLGZpZ2NhcHRpb24sZmlndXJlLGZvb3RlcixoZWFkZXIsaGdyb3VwLG1haW4sbmF2LHNlY3Rpb257ZGlzcGxheTpibG9ja31tYXJre2JhY2tncm91bmQ6I0ZGMDtjb2xvcjojMDAwfXRlbXBsYXRle2Rpc3BsYXk6bm9uZX1cIikpLGt8fGgoYSxkKSxhfXZhciBqLGssbD1cIjMuNy4wXCIsbT1hLmh0bWw1fHx7fSxuPS9ePHxeKD86YnV0dG9ufG1hcHxzZWxlY3R8dGV4dGFyZWF8b2JqZWN0fGlmcmFtZXxvcHRpb258b3B0Z3JvdXApJC9pLG89L14oPzphfGJ8Y29kZXxkaXZ8ZmllbGRzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aXxsYWJlbHxsaXxvbHxwfHF8c3BhbnxzdHJvbmd8c3R5bGV8dGFibGV8dGJvZHl8dGR8dGh8dHJ8dWwpJC9pLHA9XCJfaHRtbDVzaGl2XCIscT0wLHI9e307IWZ1bmN0aW9uKCl7dHJ5e3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImFcIik7YS5pbm5lckhUTUw9XCI8eHl6PjwveHl6PlwiLGo9XCJoaWRkZW5cImluIGEsaz0xPT1hLmNoaWxkTm9kZXMubGVuZ3RofHxmdW5jdGlvbigpe2IuY3JlYXRlRWxlbWVudChcImFcIik7dmFyIGE9Yi5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEuY2xvbmVOb2RlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgYS5jcmVhdGVEb2N1bWVudEZyYWdtZW50fHxcInVuZGVmaW5lZFwiPT10eXBlb2YgYS5jcmVhdGVFbGVtZW50fSgpfWNhdGNoKGMpe2o9ITAsaz0hMH19KCk7dmFyIHM9e2VsZW1lbnRzOm0uZWxlbWVudHN8fFwiYWJiciBhcnRpY2xlIGFzaWRlIGF1ZGlvIGJkaSBjYW52YXMgZGF0YSBkYXRhbGlzdCBkZXRhaWxzIGRpYWxvZyBmaWdjYXB0aW9uIGZpZ3VyZSBmb290ZXIgaGVhZGVyIGhncm91cCBtYWluIG1hcmsgbWV0ZXIgbmF2IG91dHB1dCBwcm9ncmVzcyBzZWN0aW9uIHN1bW1hcnkgdGVtcGxhdGUgdGltZSB2aWRlb1wiLHZlcnNpb246bCxzaGl2Q1NTOm0uc2hpdkNTUyE9PSExLHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzOmssc2hpdk1ldGhvZHM6bS5zaGl2TWV0aG9kcyE9PSExLHR5cGU6XCJkZWZhdWx0XCIsc2hpdkRvY3VtZW50OmksY3JlYXRlRWxlbWVudDpmLGNyZWF0ZURvY3VtZW50RnJhZ21lbnQ6Z307YS5odG1sNT1zLGkoYil9KHRoaXMsYiksby5fdmVyc2lvbj1uLG8uX3ByZWZpeGVzPXgsby5fZG9tUHJlZml4ZXM9QSxvLl9jc3NvbVByZWZpeGVzPXosby5tcT1JLG8uaGFzRXZlbnQ9SixvLnRlc3RQcm9wPWZ1bmN0aW9uKGEpe3JldHVybiBoKFthXSl9LG8udGVzdEFsbFByb3BzPWosby50ZXN0U3R5bGVzPUgsby5wcmVmaXhlZD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIGI/aihhLGIsYyk6aihhLFwicGZ4XCIpfSxxLmNsYXNzTmFtZT1xLmNsYXNzTmFtZS5yZXBsYWNlKC8oXnxcXHMpbm8tanMoXFxzfCQpLyxcIiQxJDJcIikrKHA/XCIganMgXCIrRi5qb2luKFwiIFwiKTpcIlwiKSxvfSh0aGlzLHRoaXMuZG9jdW1lbnQpOyIsIi8qXG4gKiBGb3VuZGF0aW9uIFJlc3BvbnNpdmUgTGlicmFyeVxuICogaHR0cDovL2ZvdW5kYXRpb24uenVyYi5jb21cbiAqIENvcHlyaWdodCAyMDE0LCBaVVJCXG4gKiBGcmVlIHRvIHVzZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoZWFkZXJfaGVscGVycyA9IGZ1bmN0aW9uIChjbGFzc19hcnJheSkge1xuICAgIHZhciBpID0gY2xhc3NfYXJyYXkubGVuZ3RoO1xuICAgIHZhciBoZWFkID0gJCgnaGVhZCcpO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGhlYWQuaGFzKCcuJyArIGNsYXNzX2FycmF5W2ldKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaGVhZC5hcHBlbmQoJzxtZXRhIGNsYXNzPVwiJyArIGNsYXNzX2FycmF5W2ldICsgJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhlYWRlcl9oZWxwZXJzKFtcbiAgICAnZm91bmRhdGlvbi1tcS1zbWFsbCcsXG4gICAgJ2ZvdW5kYXRpb24tbXEtc21hbGwtb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbWVkaXVtJyxcbiAgICAnZm91bmRhdGlvbi1tcS1tZWRpdW0tb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbGFyZ2UnLFxuICAgICdmb3VuZGF0aW9uLW1xLWxhcmdlLW9ubHknLFxuICAgICdmb3VuZGF0aW9uLW1xLXhsYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteGxhcmdlLW9ubHknLFxuICAgICdmb3VuZGF0aW9uLW1xLXh4bGFyZ2UnLFxuICAgICdmb3VuZGF0aW9uLWRhdGEtYXR0cmlidXRlLW5hbWVzcGFjZSddKTtcblxuICAvLyBFbmFibGUgRmFzdENsaWNrIGlmIHByZXNlbnRcblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIEZhc3RDbGljayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIERvbid0IGF0dGFjaCB0byBib2R5IGlmIHVuZGVmaW5lZFxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gcHJpdmF0ZSBGYXN0IFNlbGVjdG9yIHdyYXBwZXIsXG4gIC8vIHJldHVybnMgalF1ZXJ5IG9iamVjdC4gT25seSB1c2Ugd2hlcmVcbiAgLy8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IGF2YWlsYWJsZS5cbiAgdmFyIFMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNvbnQ7XG4gICAgICAgIGlmIChjb250ZXh0LmpxdWVyeSkge1xuICAgICAgICAgIGNvbnQgPSBjb250ZXh0WzBdO1xuICAgICAgICAgIGlmICghY29udCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnQgPSBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkKGNvbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICQoc2VsZWN0b3IsIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIE5hbWVzcGFjZSBmdW5jdGlvbnMuXG5cbiAgdmFyIGF0dHJfbmFtZSA9IGZ1bmN0aW9uIChpbml0KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGlmICghaW5pdCkge1xuICAgICAgYXJyLnB1c2goJ2RhdGEnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgIGFyci5wdXNoKHRoaXMubmFtZXNwYWNlKTtcbiAgICB9XG4gICAgYXJyLnB1c2godGhpcy5uYW1lKTtcblxuICAgIHJldHVybiBhcnIuam9pbignLScpO1xuICB9O1xuXG4gIHZhciBhZGRfbmFtZXNwYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnLScpLFxuICAgICAgICBpID0gcGFydHMubGVuZ3RoLFxuICAgICAgICBhcnIgPSBbXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIGFyci5wdXNoKHBhcnRzW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXJyLnB1c2godGhpcy5uYW1lc3BhY2UsIHBhcnRzW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnIucHVzaChwYXJ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKS5qb2luKCctJyk7XG4gIH07XG5cbiAgLy8gRXZlbnQgYmluZGluZyBhbmQgZGF0YS1vcHRpb25zIHVwZGF0aW5nLlxuXG4gIHZhciBiaW5kaW5ncyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGJpbmQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICAgIHNob3VsZF9iaW5kX2V2ZW50cyA9ICEkdGhpcy5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG4gICAgICAgICAgJHRoaXMuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcsICQuZXh0ZW5kKHt9LCBzZWxmLnNldHRpbmdzLCAob3B0aW9ucyB8fCBtZXRob2QpLCBzZWxmLmRhdGFfb3B0aW9ucygkdGhpcykpKTtcblxuICAgICAgICAgIGlmIChzaG91bGRfYmluZF9ldmVudHMpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIGlmIChTKHRoaXMuc2NvcGUpLmlzKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyddJykpIHtcbiAgICAgIGJpbmQuY2FsbCh0aGlzLnNjb3BlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsnXScsIHRoaXMuc2NvcGUpLmVhY2goYmluZCk7XG4gICAgfVxuICAgIC8vICMgUGF0Y2ggdG8gZml4ICM1MDQzIHRvIG1vdmUgdGhpcyAqYWZ0ZXIqIHRoZSBpZi9lbHNlIGNsYXVzZSBpbiBvcmRlciBmb3IgQmFja2JvbmUgYW5kIHNpbWlsYXIgZnJhbWV3b3JrcyB0byBoYXZlIGltcHJvdmVkIGNvbnRyb2wgb3ZlciBldmVudCBiaW5kaW5nIGFuZCBkYXRhLW9wdGlvbnMgdXBkYXRpbmcuXG4gICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpc1ttZXRob2RdLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gIH07XG5cbiAgdmFyIHNpbmdsZV9pbWFnZV9sb2FkZWQgPSBmdW5jdGlvbiAoaW1hZ2UsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gbG9hZGVkICgpIHtcbiAgICAgIGNhbGxiYWNrKGltYWdlWzBdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kTG9hZCAoKSB7XG4gICAgICB0aGlzLm9uZSgnbG9hZCcsIGxvYWRlZCk7XG5cbiAgICAgIGlmICgvTVNJRSAoXFxkK1xcLlxcZCspOy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5hdHRyKCAnc3JjJyApLFxuICAgICAgICAgICAgcGFyYW0gPSBzcmMubWF0Y2goIC9cXD8vICkgPyAnJicgOiAnPyc7XG5cbiAgICAgICAgcGFyYW0gKz0gJ3JhbmRvbT0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5hdHRyKCdzcmMnLCBzcmMgKyBwYXJhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbWFnZS5hdHRyKCdzcmMnKSkge1xuICAgICAgbG9hZGVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGltYWdlWzBdLmNvbXBsZXRlIHx8IGltYWdlWzBdLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIGxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiaW5kTG9hZC5jYWxsKGltYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLyohIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy4gQXV0aG9ycyAmIGNvcHlyaWdodCAoYykgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gRHVhbCBNSVQvQlNEIGxpY2Vuc2UgKi9cblxuICB3aW5kb3cubWF0Y2hNZWRpYSB8fCAod2luZG93Lm1hdGNoTWVkaWEgPSBmdW5jdGlvbigpIHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICAgICAgdmFyIHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgd2luZG93Lm1lZGlhKTtcblxuICAgICAgLy8gRm9yIHRob3NlIHRoYXQgZG9uJ3Qgc3VwcG9ydCBtYXRjaE1lZGl1bVxuICAgICAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgICAgICAgdmFyIHN0eWxlICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICAgICAgICAgICAgc2NyaXB0ICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0sXG4gICAgICAgICAgICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgICAgICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICAgICAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG5cbiAgICAgICAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgICAgICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICAgICAgICAgIG1hdGNoTWVkaXVtOiBmdW5jdGlvbihtZWRpYSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnQG1lZGlhICcgKyBtZWRpYSArICd7ICNtYXRjaG1lZGlhanMtdGVzdCB7IHdpZHRoOiAxcHg7IH0gfSc7XG5cbiAgICAgICAgICAgICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZm8ud2lkdGggPT09ICcxcHgnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICAgICAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgICAgICAgIH07XG4gICAgICB9O1xuICB9KCkpO1xuXG4gIC8qXG4gICAqIGpxdWVyeS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2duYXJmMzcvanF1ZXJ5LXJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBSZXF1aXJlcyBqUXVlcnkgMS44K1xuICAgKlxuICAgKiBDb3B5cmlnaHQgKGMpIDIwMTIgQ29yZXkgRnJhbmdcbiAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICAgKi9cblxuICAoZnVuY3Rpb24oalF1ZXJ5KSB7XG5cblxuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYWRhcHRlZCBmcm9tIEVyaWsgTcO2bGxlclxuICAvLyBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIC8vIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcblxuICB2YXIgYW5pbWF0aW5nLFxuICAgICAgbGFzdFRpbWUgPSAwLFxuICAgICAgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddLFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLFxuICAgICAganF1ZXJ5RnhBdmFpbGFibGUgPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGpRdWVyeS5meDtcblxuICBmb3IgKDsgbGFzdFRpbWUgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVxdWVzdEFuaW1hdGlvbkZyYW1lOyBsYXN0VGltZSsrKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdDYW5jZWxBbmltYXRpb25GcmFtZScgXSB8fFxuICAgICAgd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gIH1cblxuICBmdW5jdGlvbiByYWYoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG5cbiAgICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgICBqUXVlcnkuZngudGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAvLyB1c2UgckFGXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgalF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIGlmICh0aW1lcigpICYmIGpRdWVyeS50aW1lcnMucHVzaCh0aW1lcikgJiYgIWFuaW1hdGluZykge1xuICAgICAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgcmFmKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHBvbHlmaWxsXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSksXG4gICAgICAgIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuXG4gIH1cblxuICB9KCAkICkpO1xuXG4gIGZ1bmN0aW9uIHJlbW92ZVF1b3RlcyAoc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnIHx8IHN0cmluZyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL15bJ1xcXFwvXCJdK3woO1xccz99KSt8WydcXFxcL1wiXSskL2csICcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgd2luZG93LkZvdW5kYXRpb24gPSB7XG4gICAgbmFtZSA6ICdGb3VuZGF0aW9uJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgbWVkaWFfcXVlcmllcyA6IHtcbiAgICAgICdzbWFsbCcgICAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS1zbWFsbCcpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3NtYWxsLW9ubHknICA6IFMoJy5mb3VuZGF0aW9uLW1xLXNtYWxsLW9ubHknKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdtZWRpdW0nICAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS1tZWRpdW0nKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdtZWRpdW0tb25seScgOiBTKCcuZm91bmRhdGlvbi1tcS1tZWRpdW0tb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ2xhcmdlJyAgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLWxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnbGFyZ2Utb25seScgIDogUygnLmZvdW5kYXRpb24tbXEtbGFyZ2Utb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3hsYXJnZScgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLXhsYXJnZScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3hsYXJnZS1vbmx5JyA6IFMoJy5mb3VuZGF0aW9uLW1xLXhsYXJnZS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneHhsYXJnZScgICAgIDogUygnLmZvdW5kYXRpb24tbXEteHhsYXJnZScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpXG4gICAgfSxcblxuICAgIHN0eWxlc2hlZXQgOiAkKCc8c3R5bGU+PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpWzBdLnNoZWV0LFxuXG4gICAgZ2xvYmFsIDoge1xuICAgICAgbmFtZXNwYWNlIDogdW5kZWZpbmVkXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIGxpYnJhcmllcywgbWV0aG9kLCBvcHRpb25zLCByZXNwb25zZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbc2NvcGUsIG1ldGhvZCwgb3B0aW9ucywgcmVzcG9uc2VdLFxuICAgICAgICAgIHJlc3BvbnNlcyA9IFtdO1xuXG4gICAgICAvLyBjaGVjayBSVExcbiAgICAgIHRoaXMucnRsID0gL3J0bC9pLnRlc3QoUygnaHRtbCcpLmF0dHIoJ2RpcicpKTtcblxuICAgICAgLy8gc2V0IGZvdW5kYXRpb24gZ2xvYmFsIHNjb3BlXG4gICAgICB0aGlzLnNjb3BlID0gc2NvcGUgfHwgdGhpcy5zY29wZTtcblxuICAgICAgdGhpcy5zZXRfbmFtZXNwYWNlKCk7XG5cbiAgICAgIGlmIChsaWJyYXJpZXMgJiYgdHlwZW9mIGxpYnJhcmllcyA9PT0gJ3N0cmluZycgJiYgIS9yZWZsb3cvaS50ZXN0KGxpYnJhcmllcykpIHtcbiAgICAgICAgaWYgKHRoaXMubGlicy5oYXNPd25Qcm9wZXJ0eShsaWJyYXJpZXMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5pbml0X2xpYihsaWJyYXJpZXMsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgbGliIGluIHRoaXMubGlicykge1xuICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHRoaXMuaW5pdF9saWIobGliLCBsaWJyYXJpZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBTKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIFMod2luZG93KVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uY2xlYXJpbmcnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uZHJvcGRvd24nKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uZXF1YWxpemVyJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLmludGVyY2hhbmdlJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLmpveXJpZGUnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4ubWFnZWxsYW4nKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4udG9wYmFyJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLnNsaWRlcicpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzY29wZTtcbiAgICB9LFxuXG4gICAgaW5pdF9saWIgOiBmdW5jdGlvbiAobGliLCBhcmdzKSB7XG4gICAgICBpZiAodGhpcy5saWJzLmhhc093blByb3BlcnR5KGxpYikpIHtcbiAgICAgICAgdGhpcy5wYXRjaCh0aGlzLmxpYnNbbGliXSk7XG5cbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5oYXNPd25Qcm9wZXJ0eShsaWIpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGlic1tsaWJdLnNldHRpbmdzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5zZXR0aW5ncywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubGlic1tsaWJdLmRlZmF1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5kZWZhdWx0cywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5saWJzW2xpYl0uaW5pdC5hcHBseSh0aGlzLmxpYnNbbGliXSwgW3RoaXMuc2NvcGUsIGFyZ3NbbGliXV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncyA9IGFyZ3MgaW5zdGFuY2VvZiBBcnJheSA/IGFyZ3MgOiBuZXcgQXJyYXkoYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpYnNbbGliXS5pbml0LmFwcGx5KHRoaXMubGlic1tsaWJdLCBhcmdzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgIH0sXG5cbiAgICBwYXRjaCA6IGZ1bmN0aW9uIChsaWIpIHtcbiAgICAgIGxpYi5zY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICBsaWIubmFtZXNwYWNlID0gdGhpcy5nbG9iYWwubmFtZXNwYWNlO1xuICAgICAgbGliLnJ0bCA9IHRoaXMucnRsO1xuICAgICAgbGliWydkYXRhX29wdGlvbnMnXSA9IHRoaXMudXRpbHMuZGF0YV9vcHRpb25zO1xuICAgICAgbGliWydhdHRyX25hbWUnXSA9IGF0dHJfbmFtZTtcbiAgICAgIGxpYlsnYWRkX25hbWVzcGFjZSddID0gYWRkX25hbWVzcGFjZTtcbiAgICAgIGxpYlsnYmluZGluZ3MnXSA9IGJpbmRpbmdzO1xuICAgICAgbGliWydTJ10gPSB0aGlzLnV0aWxzLlM7XG4gICAgfSxcblxuICAgIGluaGVyaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZHMpIHtcbiAgICAgIHZhciBtZXRob2RzX2FyciA9IG1ldGhvZHMuc3BsaXQoJyAnKSxcbiAgICAgICAgICBpID0gbWV0aG9kc19hcnIubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLnV0aWxzLmhhc093blByb3BlcnR5KG1ldGhvZHNfYXJyW2ldKSkge1xuICAgICAgICAgIHNjb3BlW21ldGhvZHNfYXJyW2ldXSA9IHRoaXMudXRpbHNbbWV0aG9kc19hcnJbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldF9uYW1lc3BhY2UgOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRG9uJ3QgYm90aGVyIHJlYWRpbmcgdGhlIG5hbWVzcGFjZSBvdXQgb2YgdGhlIG1ldGEgdGFnXG4gICAgICAvLyAgICBpZiB0aGUgbmFtZXNwYWNlIGhhcyBiZWVuIHNldCBnbG9iYWxseSBpbiBqYXZhc2NyaXB0XG4gICAgICAvL1xuICAgICAgLy8gRXhhbXBsZTpcbiAgICAgIC8vICAgIEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZSA9ICdteS1uYW1lc3BhY2UnO1xuICAgICAgLy8gb3IgbWFrZSBpdCBhbiBlbXB0eSBzdHJpbmc6XG4gICAgICAvLyAgICBGb3VuZGF0aW9uLmdsb2JhbC5uYW1lc3BhY2UgPSAnJztcbiAgICAgIC8vXG4gICAgICAvL1xuXG4gICAgICAvLyBJZiB0aGUgbmFtZXNwYWNlIGhhcyBub3QgYmVlbiBzZXQgKGlzIHVuZGVmaW5lZCksIHRyeSB0byByZWFkIGl0IG91dCBvZiB0aGUgbWV0YSBlbGVtZW50LlxuICAgICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZ2xvYmFsbHkgZGVmaW5lZCBuYW1lc3BhY2UsIGV2ZW4gaWYgaXQncyBlbXB0eSAoJycpXG4gICAgICB2YXIgbmFtZXNwYWNlID0gKCB0aGlzLmdsb2JhbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZCApID8gJCgnLmZvdW5kYXRpb24tZGF0YS1hdHRyaWJ1dGUtbmFtZXNwYWNlJykuY3NzKCdmb250LWZhbWlseScpIDogdGhpcy5nbG9iYWwubmFtZXNwYWNlO1xuXG4gICAgICAvLyBGaW5hbGx5LCBpZiB0aGUgbmFtc2VwYWNlIGlzIGVpdGhlciB1bmRlZmluZWQgb3IgZmFsc2UsIHNldCBpdCB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBuYW1lc3BhY2UgdmFsdWUuXG4gICAgICB0aGlzLmdsb2JhbC5uYW1lc3BhY2UgPSAoIG5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkIHx8IC9mYWxzZS9pLnRlc3QobmFtZXNwYWNlKSApID8gJycgOiBuYW1lc3BhY2U7XG4gICAgfSxcblxuICAgIGxpYnMgOiB7fSxcblxuICAgIC8vIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW5oZXJpdGVkIGluIGxpYnJhcmllc1xuICAgIHV0aWxzIDoge1xuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEZhc3QgU2VsZWN0b3Igd3JhcHBlciByZXR1cm5zIGpRdWVyeSBvYmplY3QuIE9ubHkgdXNlIHdoZXJlIGdldEVsZW1lbnRCeUlkXG4gICAgICAvLyAgICBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIFNlbGVjdG9yIChTdHJpbmcpOiBDU1Mgc2VsZWN0b3IgZGVzY3JpYmluZyB0aGUgZWxlbWVudChzKSB0byBiZVxuICAgICAgLy8gICAgcmV0dXJuZWQgYXMgYSBqUXVlcnkgb2JqZWN0LlxuICAgICAgLy9cbiAgICAgIC8vICAgIFNjb3BlIChTdHJpbmcpOiBDU1Mgc2VsZWN0b3IgZGVzY3JpYmluZyB0aGUgYXJlYSB0byBiZSBzZWFyY2hlZC4gRGVmYXVsdFxuICAgICAgLy8gICAgaXMgZG9jdW1lbnQuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIEVsZW1lbnQgKGpRdWVyeSBPYmplY3QpOiBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgZWxlbWVudHMgbWF0Y2hpbmcgdGhlXG4gICAgICAvLyAgICBzZWxlY3RvciB3aXRoaW4gdGhlIHNjb3BlLlxuICAgICAgUyA6IFMsXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRXhlY3V0ZXMgYSBmdW5jdGlvbiBhIG1heCBvZiBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgRnVuYyAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWQuXG4gICAgICAvL1xuICAgICAgLy8gICAgRGVsYXkgKEludGVnZXIpOiBGdW5jdGlvbiBleGVjdXRpb24gdGhyZXNob2xkIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgTGF6eV9mdW5jdGlvbiAoRnVuY3Rpb24pOiBGdW5jdGlvbiB3aXRoIHRocm90dGxpbmcgYXBwbGllZC5cbiAgICAgIHRocm90dGxlIDogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5KSB7XG4gICAgICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICBpZiAodGltZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRXhlY3V0ZXMgYSBmdW5jdGlvbiB3aGVuIGl0IHN0b3BzIGJlaW5nIGludm9rZWQgZm9yIG4gc2Vjb25kc1xuICAgICAgLy8gICAgTW9kaWZpZWQgdmVyc2lvbiBvZiBfLmRlYm91bmNlKCkgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBGdW5jIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBEZWxheSAoSW50ZWdlcik6IEZ1bmN0aW9uIGV4ZWN1dGlvbiB0aHJlc2hvbGQgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgLy9cbiAgICAgIC8vICAgIEltbWVkaWF0ZSAoQm9vbCk6IFdoZXRoZXIgdGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgLy8gICAgb2YgdGhlIGRlbGF5IGluc3RlYWQgb2YgdGhlIGVuZC4gRGVmYXVsdCBpcyBmYWxzZS5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgTGF6eV9mdW5jdGlvbiAoRnVuY3Rpb24pOiBGdW5jdGlvbiB3aXRoIGRlYm91bmNpbmcgYXBwbGllZC5cbiAgICAgIGRlYm91bmNlIDogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCBkZWxheSk7XG4gICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIFBhcnNlcyBkYXRhLW9wdGlvbnMgYXR0cmlidXRlXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgRWwgKGpRdWVyeSBPYmplY3QpOiBFbGVtZW50IHRvIGJlIHBhcnNlZC5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgT3B0aW9ucyAoSmF2YXNjcmlwdCBPYmplY3QpOiBDb250ZW50cyBvZiB0aGUgZWxlbWVudCdzIGRhdGEtb3B0aW9uc1xuICAgICAgLy8gICAgYXR0cmlidXRlLlxuICAgICAgZGF0YV9vcHRpb25zIDogZnVuY3Rpb24gKGVsLCBkYXRhX2F0dHJfbmFtZSkge1xuICAgICAgICBkYXRhX2F0dHJfbmFtZSA9IGRhdGFfYXR0cl9uYW1lIHx8ICdvcHRpb25zJztcbiAgICAgICAgdmFyIG9wdHMgPSB7fSwgaWksIHAsIG9wdHNfYXJyLFxuICAgICAgICAgICAgZGF0YV9vcHRpb25zID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSBGb3VuZGF0aW9uLmdsb2JhbC5uYW1lc3BhY2U7XG5cbiAgICAgICAgICAgICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmRhdGEobmFtZXNwYWNlICsgJy0nICsgZGF0YV9hdHRyX25hbWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGVsLmRhdGEoZGF0YV9hdHRyX25hbWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2FjaGVkX29wdGlvbnMgPSBkYXRhX29wdGlvbnMoZWwpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FjaGVkX29wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlZF9vcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0c19hcnIgPSAoY2FjaGVkX29wdGlvbnMgfHwgJzonKS5zcGxpdCgnOycpO1xuICAgICAgICBpaSA9IG9wdHNfYXJyLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiBpc051bWJlciAobykge1xuICAgICAgICAgIHJldHVybiAhaXNOYU4gKG8gLSAwKSAmJiBvICE9PSBudWxsICYmIG8gIT09ICcnICYmIG8gIT09IGZhbHNlICYmIG8gIT09IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0cmltIChzdHIpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnRyaW0oc3RyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpaS0tKSB7XG4gICAgICAgICAgcCA9IG9wdHNfYXJyW2lpXS5zcGxpdCgnOicpO1xuICAgICAgICAgIHAgPSBbcFswXSwgcC5zbGljZSgxKS5qb2luKCc6JyldO1xuXG4gICAgICAgICAgaWYgKC90cnVlL2kudGVzdChwWzFdKSkge1xuICAgICAgICAgICAgcFsxXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KHBbMV0pKSB7XG4gICAgICAgICAgICBwWzFdID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc051bWJlcihwWzFdKSkge1xuICAgICAgICAgICAgaWYgKHBbMV0uaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgICBwWzFdID0gcGFyc2VJbnQocFsxXSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcFsxXSA9IHBhcnNlRmxvYXQocFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHAubGVuZ3RoID09PSAyICYmIHBbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3B0c1t0cmltKHBbMF0pXSA9IHRyaW0ocFsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEFkZHMgSlMtcmVjb2duaXphYmxlIG1lZGlhIHF1ZXJpZXNcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBNZWRpYSAoU3RyaW5nKTogS2V5IHN0cmluZyBmb3IgdGhlIG1lZGlhIHF1ZXJ5IHRvIGJlIHN0b3JlZCBhcyBpblxuICAgICAgLy8gICAgRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzXG4gICAgICAvL1xuICAgICAgLy8gICAgQ2xhc3MgKFN0cmluZyk6IENsYXNzIG5hbWUgZm9yIHRoZSBnZW5lcmF0ZWQgPG1ldGE+IHRhZ1xuICAgICAgcmVnaXN0ZXJfbWVkaWEgOiBmdW5jdGlvbiAobWVkaWEsIG1lZGlhX2NsYXNzKSB7XG4gICAgICAgIGlmIChGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCc8bWV0YSBjbGFzcz1cIicgKyBtZWRpYV9jbGFzcyArICdcIi8+Jyk7XG4gICAgICAgICAgRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXSA9IHJlbW92ZVF1b3RlcygkKCcuJyArIG1lZGlhX2NsYXNzKS5jc3MoJ2ZvbnQtZmFtaWx5JykpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEFkZCBjdXN0b20gQ1NTIHdpdGhpbiBhIEpTLWRlZmluZWQgbWVkaWEgcXVlcnlcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBSdWxlIChTdHJpbmcpOiBDU1MgcnVsZSB0byBiZSBhcHBlbmRlZCB0byB0aGUgZG9jdW1lbnQuXG4gICAgICAvL1xuICAgICAgLy8gICAgTWVkaWEgKFN0cmluZyk6IE9wdGlvbmFsIG1lZGlhIHF1ZXJ5IHN0cmluZyBmb3IgdGhlIENTUyBydWxlIHRvIGJlXG4gICAgICAvLyAgICBuZXN0ZWQgdW5kZXIuXG4gICAgICBhZGRfY3VzdG9tX3J1bGUgOiBmdW5jdGlvbiAocnVsZSwgbWVkaWEpIHtcbiAgICAgICAgaWYgKG1lZGlhID09PSB1bmRlZmluZWQgJiYgRm91bmRhdGlvbi5zdHlsZXNoZWV0KSB7XG4gICAgICAgICAgRm91bmRhdGlvbi5zdHlsZXNoZWV0Lmluc2VydFJ1bGUocnVsZSwgRm91bmRhdGlvbi5zdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHF1ZXJ5ID0gRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXTtcblxuICAgICAgICAgIGlmIChxdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuaW5zZXJ0UnVsZSgnQG1lZGlhICcgK1xuICAgICAgICAgICAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdICsgJ3sgJyArIHJ1bGUgKyAnIH0nLCBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUGVyZm9ybXMgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGFuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZFxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEltYWdlIChqUXVlcnkgT2JqZWN0KTogSW1hZ2UocykgdG8gY2hlY2sgaWYgbG9hZGVkLlxuICAgICAgLy9cbiAgICAgIC8vICAgIENhbGxiYWNrIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBpbWFnZSBpcyBmdWxseSBsb2FkZWQuXG4gICAgICBpbWFnZV9sb2FkZWQgOiBmdW5jdGlvbiAoaW1hZ2VzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICB1bmxvYWRlZCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcGljdHVyZXNfaGFzX2hlaWdodChpbWFnZXMpIHtcbiAgICAgICAgICB2YXIgcGljdHVyZXNfbnVtYmVyID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSBwaWN0dXJlc19udW1iZXIgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYoaW1hZ2VzLmF0dHIoJ2hlaWdodCcpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5sb2FkZWQgPT09IDAgfHwgcGljdHVyZXNfaGFzX2hlaWdodChpbWFnZXMpKSB7XG4gICAgICAgICAgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzaW5nbGVfaW1hZ2VfbG9hZGVkKHNlbGYuUyh0aGlzKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW5sb2FkZWQgLT0gMTtcbiAgICAgICAgICAgIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhpbWFnZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUmV0dXJucyBhIHJhbmRvbSwgYWxwaGFudW1lcmljIHN0cmluZ1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIExlbmd0aCAoSW50ZWdlcik6IExlbmd0aCBvZiBzdHJpbmcgdG8gYmUgZ2VuZXJhdGVkLiBEZWZhdWx0cyB0byByYW5kb21cbiAgICAgIC8vICAgIGludGVnZXIuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIFJhbmQgKFN0cmluZyk6IFBzZXVkby1yYW5kb20sIGFscGhhbnVtZXJpYyBzdHJpbmcuXG4gICAgICByYW5kb21fc3RyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuZmlkeCkge1xuICAgICAgICAgIHRoaXMuZmlkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVmaXggPSB0aGlzLnByZWZpeCB8fCBbKHRoaXMubmFtZSB8fCAnRicpLCAoK25ldyBEYXRlKS50b1N0cmluZygzNildLmpvaW4oJy0nKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyAodGhpcy5maWR4KyspLnRvU3RyaW5nKDM2KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgSGVscGVyIGZvciB3aW5kb3cubWF0Y2hNZWRpYVxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIG1xIChTdHJpbmcpOiBNZWRpYSBxdWVyeVxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICAoQm9vbGVhbik6IFdoZXRoZXIgdGhlIG1lZGlhIHF1ZXJ5IHBhc3NlcyBvciBub3RcbiAgICAgIG1hdGNoIDogZnVuY3Rpb24gKG1xKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShtcSkubWF0Y2hlcztcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgSGVscGVycyBmb3IgY2hlY2tpbmcgRm91bmRhdGlvbiBkZWZhdWx0IG1lZGlhIHF1ZXJpZXMgd2l0aCBKU1xuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICAoQm9vbGVhbik6IFdoZXRoZXIgdGhlIG1lZGlhIHF1ZXJ5IHBhc3NlcyBvciBub3RcblxuICAgICAgaXNfc21hbGxfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5zbWFsbCk7XG4gICAgICB9LFxuXG4gICAgICBpc19tZWRpdW1fdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pO1xuICAgICAgfSxcblxuICAgICAgaXNfbGFyZ2VfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5sYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc194bGFyZ2VfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy54bGFyZ2UpO1xuICAgICAgfSxcblxuICAgICAgaXNfeHhsYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnh4bGFyZ2UpO1xuICAgICAgfSxcblxuICAgICAgaXNfc21hbGxfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzX21lZGl1bV91cCgpICYmICF0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfbWVkaXVtX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmICF0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfbGFyZ2Vfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgdGhpcy5pc19sYXJnZV91cCgpICYmICF0aGlzLmlzX3hsYXJnZV91cCgpICYmICF0aGlzLmlzX3h4bGFyZ2VfdXAoKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3hsYXJnZV9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc19tZWRpdW1fdXAoKSAmJiB0aGlzLmlzX2xhcmdlX3VwKCkgJiYgdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc194eGxhcmdlX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmIHRoaXMuaXNfbGFyZ2VfdXAoKSAmJiB0aGlzLmlzX3hsYXJnZV91cCgpICYmIHRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkLmZuLmZvdW5kYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBGb3VuZGF0aW9uLmluaXQuYXBwbHkoRm91bmRhdGlvbiwgW3RoaXNdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KTtcbiAgfTtcblxufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5kcm9wZG93biA9IHtcbiAgICBuYW1lIDogJ2Ryb3Bkb3duJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBhY3RpdmVfY2xhc3MgOiAnb3BlbicsXG4gICAgICBkaXNhYmxlZF9jbGFzcyA6ICdkaXNhYmxlZCcsXG4gICAgICBtZWdhX2NsYXNzIDogJ21lZ2EnLFxuICAgICAgYWxpZ24gOiAnYm90dG9tJyxcbiAgICAgIGlzX2hvdmVyIDogZmFsc2UsXG4gICAgICBob3Zlcl90aW1lb3V0IDogMTUwLFxuICAgICAgb3BlbmVkIDogZnVuY3Rpb24gKCkge30sXG4gICAgICBjbG9zZWQgOiBmdW5jdGlvbiAoKSB7fVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAndGhyb3R0bGUnKTtcblxuICAgICAgJC5leHRlbmQodHJ1ZSwgdGhpcy5zZXR0aW5ncywgbWV0aG9kLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgUyA9IHNlbGYuUztcblxuICAgICAgUyh0aGlzLnNjb3BlKVxuICAgICAgICAub2ZmKCcuZHJvcGRvd24nKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBTKHRoaXMpLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgIGlmICghc2V0dGluZ3MuaXNfaG92ZXIgfHwgTW9kZXJuaXpyLnRvdWNoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoUyh0aGlzKS5wYXJlbnQoJ1tkYXRhLXJldmVhbC1pZF0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudG9nZ2xlKCQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWVudGVyLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddLCBbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICBkcm9wZG93bixcbiAgICAgICAgICAgICAgdGFyZ2V0O1xuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dCk7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgZHJvcGRvd24gPSBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gJHRoaXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRyb3Bkb3duID0gJHRoaXM7XG4gICAgICAgICAgICB0YXJnZXQgPSBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnPVwiJyArIGRyb3Bkb3duLmF0dHIoJ2lkJykgKyAnXCJdJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gdGFyZ2V0LmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuXG4gICAgICAgICAgaWYgKFMoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpICYmIHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICBzZWxmLmNsb3NlYWxsLmNhbGwoc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW4uYXBwbHkoc2VsZiwgW2Ryb3Bkb3duLCB0YXJnZXRdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5kcm9wZG93bicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSwgWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKTtcbiAgICAgICAgICB2YXIgc2V0dGluZ3M7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgICBzZXR0aW5ncyA9ICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciB0YXJnZXQgICA9IFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9XCInICsgUyh0aGlzKS5hdHRyKCdpZCcpICsgJ1wiXScpLFxuICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgUygnIycgKyAkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCAkdGhpcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LmJpbmQodGhpcyksIHNldHRpbmdzLmhvdmVyX3RpbWVvdXQpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpO1xuICAgICAgICAgIHZhciBsaW5rcyAgPSBwYXJlbnQuZmluZCgnYScpO1xuXG4gICAgICAgICAgaWYgKGxpbmtzLmxlbmd0aCA+IDAgJiYgcGFyZW50LmF0dHIoJ2FyaWEtYXV0b2Nsb3NlJykgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBkb2N1bWVudCAmJiAhJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChTKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIShTKGUudGFyZ2V0KS5kYXRhKCdyZXZlYWxJZCcpKSAmJlxuICAgICAgICAgICAgKHBhcmVudC5sZW5ndGggPiAwICYmIChTKGUudGFyZ2V0KS5pcygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpIHx8XG4gICAgICAgICAgICAgICQuY29udGFpbnMocGFyZW50LmZpcnN0KClbMF0sIGUudGFyZ2V0KSkpKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ29wZW5lZC5mbmR0bi5kcm9wZG93bicsICdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub3BlbmVkLmNhbGwodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xvc2VkLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5jbG9zZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIFMod2luZG93KVxuICAgICAgICAub2ZmKCcuZHJvcGRvd24nKVxuICAgICAgICAub24oJ3Jlc2l6ZS5mbmR0bi5kcm9wZG93bicsIHNlbGYudGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucmVzaXplLmNhbGwoc2VsZik7XG4gICAgICAgIH0sIDUwKSk7XG5cbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSxcblxuICAgIGNsb3NlIDogZnVuY3Rpb24gKGRyb3Bkb3duKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBkcm9wZG93bi5lYWNoKGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsX3RhcmdldCA9ICQoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9JyArIGRyb3Bkb3duW2lkeF0uaWQgKyAnXScpIHx8ICQoJ2FyaWEtY29udHJvbHM9JyArIGRyb3Bkb3duW2lkeF0uaWQgKyAnXScpO1xuICAgICAgICBvcmlnaW5hbF90YXJnZXQuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpZiAoc2VsZi5TKHRoaXMpLmhhc0NsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKSkge1xuICAgICAgICAgIHNlbGYuUyh0aGlzKVxuICAgICAgICAgICAgLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCcgOiAnbGVmdCcsICctOTk5OTlweCcpXG4gICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpXG4gICAgICAgICAgICAucHJldignWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKVxuICAgICAgICAgICAgLnJlbW92ZURhdGEoJ3RhcmdldCcpO1xuXG4gICAgICAgICAgc2VsZi5TKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC5mbmR0bi5kcm9wZG93bicsIFtkcm9wZG93bl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdmLW9wZW4tJyArIHRoaXMuYXR0cl9uYW1lKHRydWUpKTtcbiAgICB9LFxuXG4gICAgY2xvc2VhbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAkLmVhY2goc2VsZi5TKCcuZi1vcGVuLScgKyB0aGlzLmF0dHJfbmFtZSh0cnVlKSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIHNlbGYuUyh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgb3BlbiA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0KSB7XG4gICAgICB0aGlzXG4gICAgICAgIC5jc3MoZHJvcGRvd25cbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKSwgdGFyZ2V0KTtcbiAgICAgIGRyb3Bkb3duLnByZXYoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpO1xuICAgICAgZHJvcGRvd24uZGF0YSgndGFyZ2V0JywgdGFyZ2V0LmdldCgwKSkudHJpZ2dlcignb3BlbmVkLmZuZHRuLmRyb3Bkb3duJywgW2Ryb3Bkb3duLCB0YXJnZXRdKTtcbiAgICAgIGRyb3Bkb3duLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB0YXJnZXQuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICBkcm9wZG93bi5mb2N1cygpO1xuICAgICAgZHJvcGRvd24uYWRkQ2xhc3MoJ2Ytb3Blbi0nICsgdGhpcy5hdHRyX25hbWUodHJ1ZSkpO1xuICAgIH0sXG5cbiAgICBkYXRhX2F0dHIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2UubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2UgKyAnLScgKyB0aGlzLm5hbWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzQ2xhc3ModGhpcy5zZXR0aW5ncy5kaXNhYmxlZF9jbGFzcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRyb3Bkb3duID0gdGhpcy5TKCcjJyArIHRhcmdldC5kYXRhKHRoaXMuZGF0YV9hdHRyKCkpKTtcbiAgICAgIGlmIChkcm9wZG93bi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gTm8gZHJvcGRvd24gZm91bmQsIG5vdCBjb250aW51aW5nXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbG9zZS5jYWxsKHRoaXMsIHRoaXMuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpLm5vdChkcm9wZG93bikpO1xuXG4gICAgICBpZiAoZHJvcGRvd24uaGFzQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UuY2FsbCh0aGlzLCBkcm9wZG93bik7XG4gICAgICAgIGlmIChkcm9wZG93bi5kYXRhKCd0YXJnZXQnKSAhPT0gdGFyZ2V0LmdldCgwKSkge1xuICAgICAgICAgIHRoaXMub3Blbi5jYWxsKHRoaXMsIGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW4uY2FsbCh0aGlzLCBkcm9wZG93biwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzaXplIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRyb3Bkb3duID0gdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdLm9wZW4nKTtcbiAgICAgIHZhciB0YXJnZXQgPSAkKGRyb3Bkb3duLmRhdGEoXCJ0YXJnZXRcIikpO1xuXG4gICAgICBpZiAoZHJvcGRvd24ubGVuZ3RoICYmIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5jc3MoZHJvcGRvd24sIHRhcmdldCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNzcyA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0KSB7XG4gICAgICB2YXIgbGVmdF9vZmZzZXQgPSBNYXRoLm1heCgodGFyZ2V0LndpZHRoKCkgLSBkcm9wZG93bi53aWR0aCgpKSAvIDIsIDgpLFxuICAgICAgICAgIHNldHRpbmdzID0gdGFyZ2V0LmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgIHBhcmVudE92ZXJmbG93ID0gZHJvcGRvd24ucGFyZW50KCkuY3NzKCdvdmVyZmxvdy15JykgfHwgZHJvcGRvd24ucGFyZW50KCkuY3NzKCdvdmVyZmxvdycpO1xuXG4gICAgICB0aGlzLmNsZWFyX2lkeCgpO1xuXG5cblxuICAgICAgaWYgKHRoaXMuc21hbGwoKSkge1xuICAgICAgICB2YXIgcCA9IHRoaXMuZGlycy5ib3R0b20uY2FsbChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncyk7XG5cbiAgICAgICAgZHJvcGRvd24uYXR0cignc3R5bGUnLCAnJykucmVtb3ZlQ2xhc3MoJ2Ryb3AtbGVmdCBkcm9wLXJpZ2h0IGRyb3AtdG9wJykuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgd2lkdGggOiAnOTUlJyxcbiAgICAgICAgICAnbWF4LXdpZHRoJyA6ICdub25lJyxcbiAgICAgICAgICB0b3AgOiBwLnRvcFxuICAgICAgICB9KTtcblxuICAgICAgICBkcm9wZG93bi5jc3MoRm91bmRhdGlvbi5ydGwgPyAncmlnaHQnIDogJ2xlZnQnLCBsZWZ0X29mZnNldCk7XG4gICAgICB9XG4gICAgICAvLyBkZXRlY3QgaWYgZHJvcGRvd24gaXMgaW4gYW4gb3ZlcmZsb3cgY29udGFpbmVyXG4gICAgICBlbHNlIGlmIChwYXJlbnRPdmVyZmxvdyAhPT0gJ3Zpc2libGUnKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0YXJnZXRbMF0ub2Zmc2V0VG9wICsgdGFyZ2V0WzBdLm9mZnNldEhlaWdodDtcblxuICAgICAgICBkcm9wZG93bi5hdHRyKCdzdHlsZScsICcnKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3AgOiBvZmZzZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZHJvcGRvd24uY3NzKEZvdW5kYXRpb24ucnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JywgbGVmdF9vZmZzZXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG5cbiAgICAgICAgdGhpcy5zdHlsZShkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wZG93bjtcbiAgICB9LFxuXG4gICAgc3R5bGUgOiBmdW5jdGlvbiAoZHJvcGRvd24sIHRhcmdldCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBjc3MgPSAkLmV4dGVuZCh7cG9zaXRpb24gOiAnYWJzb2x1dGUnfSxcbiAgICAgICAgdGhpcy5kaXJzW3NldHRpbmdzLmFsaWduXS5jYWxsKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKSk7XG5cbiAgICAgIGRyb3Bkb3duLmF0dHIoJ3N0eWxlJywgJycpLmNzcyhjc3MpO1xuICAgIH0sXG5cbiAgICAvLyByZXR1cm4gQ1NTIHByb3BlcnR5IG9iamVjdFxuICAgIC8vIGB0aGlzYCBpcyB0aGUgZHJvcGRvd25cbiAgICBkaXJzIDoge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRhcmdldCBvZmZzZXRcbiAgICAgIF9iYXNlIDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIG9fcCA9IHRoaXMub2Zmc2V0UGFyZW50KCksXG4gICAgICAgICAgICBvID0gb19wLm9mZnNldCgpLFxuICAgICAgICAgICAgcCA9IHQub2Zmc2V0KCk7XG5cbiAgICAgICAgcC50b3AgLT0gby50b3A7XG4gICAgICAgIHAubGVmdCAtPSBvLmxlZnQ7XG5cbiAgICAgICAgLy9zZXQgc29tZSBmbGFncyBvbiB0aGUgcCBvYmplY3QgdG8gcGFzcyBhbG9uZ1xuICAgICAgICBwLm1pc3NSaWdodCA9IGZhbHNlO1xuICAgICAgICBwLm1pc3NUb3AgPSBmYWxzZTtcbiAgICAgICAgcC5taXNzTGVmdCA9IGZhbHNlO1xuICAgICAgICBwLmxlZnRSaWdodEZsYWcgPSBmYWxzZTtcblxuICAgICAgICAvL2xldHMgc2VlIGlmIHRoZSBwYW5lbCB3aWxsIGJlIG9mZiB0aGUgc2NyZWVuXG4gICAgICAgIC8vZ2V0IHRoZSBhY3R1YWwgd2lkdGggb2YgdGhlIHBhZ2UgYW5kIHN0b3JlIGl0XG4gICAgICAgIHZhciBhY3R1YWxCb2R5V2lkdGg7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyb3cnKVswXSkge1xuICAgICAgICAgIGFjdHVhbEJvZHlXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JvdycpWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdHVhbEJvZHlXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdHVhbE1hcmdpbldpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gYWN0dWFsQm9keVdpZHRoKSAvIDI7XG4gICAgICAgIHZhciBhY3R1YWxCb3VuZGFyeSA9IGFjdHVhbEJvZHlXaWR0aDtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoJ21lZ2EnKSkge1xuICAgICAgICAgIC8vbWlzcyB0b3BcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS50b3AgPD0gdGhpcy5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICBwLm1pc3NUb3AgPSB0cnVlO1xuICAgICAgICAgICAgYWN0dWFsQm91bmRhcnkgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGFjdHVhbE1hcmdpbldpZHRoO1xuICAgICAgICAgICAgcC5sZWZ0UmlnaHRGbGFnID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL21pc3MgcmlnaHRcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS5sZWZ0ICsgdGhpcy5vdXRlcldpZHRoKCkgPiB0Lm9mZnNldCgpLmxlZnQgKyBhY3R1YWxNYXJnaW5XaWR0aCAmJiB0Lm9mZnNldCgpLmxlZnQgLSBhY3R1YWxNYXJnaW5XaWR0aCA+IHRoaXMub3V0ZXJXaWR0aCgpKSB7XG4gICAgICAgICAgICBwLm1pc3NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICBwLm1pc3NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9taXNzIGxlZnRcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgPD0gMCkge1xuICAgICAgICAgICAgcC5taXNzTGVmdCA9IHRydWU7XG4gICAgICAgICAgICBwLm1pc3NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSxcblxuICAgICAgdG9wIDogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd24sXG4gICAgICAgICAgICBwID0gc2VsZi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC10b3AnKTtcblxuICAgICAgICBpZiAocC5taXNzVG9wID09IHRydWUpIHtcbiAgICAgICAgICBwLnRvcCA9IHAudG9wICsgdC5vdXRlckhlaWdodCgpICsgdGhpcy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2Ryb3AtdG9wJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoRm91bmRhdGlvbi5ydGwpIHtcbiAgICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSArIHQub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgdG9wIDogcC50b3AgLSB0aGlzLm91dGVySGVpZ2h0KCl9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0LCB0b3AgOiBwLnRvcCAtIHRoaXMub3V0ZXJIZWlnaHQoKX07XG4gICAgICB9LFxuXG4gICAgICBib3R0b20gOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bixcbiAgICAgICAgICAgIHAgPSBzZWxmLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5ydGwpIHtcbiAgICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSArIHQub3V0ZXJXaWR0aCgpLCB0b3AgOiBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQsIHRvcCA6IHAudG9wICsgdC5vdXRlckhlaWdodCgpfTtcbiAgICAgIH0sXG5cbiAgICAgIGxlZnQgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgcCA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC1sZWZ0Jyk7XG5cbiAgICAgICAgaWYgKHAubWlzc0xlZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9ICBwLmxlZnQgKyB0aGlzLm91dGVyV2lkdGgoKTtcbiAgICAgICAgICBwLnRvcCA9IHAudG9wICsgdC5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2Ryb3AtbGVmdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wfTtcbiAgICAgIH0sXG5cbiAgICAgIHJpZ2h0IDogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgdmFyIHAgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd24uZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2Ryb3AtcmlnaHQnKTtcblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC1yaWdodCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAudHJpZ2dlcmVkUmlnaHQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGYgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd247XG5cbiAgICAgICAgaWYgKHQub3V0ZXJXaWR0aCgpIDwgdGhpcy5vdXRlcldpZHRoKCkgfHwgc2VsZi5zbWFsbCgpIHx8IHRoaXMuaGFzQ2xhc3Mocy5tZWdhX21lbnUpKSB7XG4gICAgICAgICAgc2VsZi5hZGp1c3RfcGlwKHRoaXMsIHQsIHMsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0ICsgdC5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSW5zZXJ0IHJ1bGUgdG8gc3R5bGUgcHN1ZWRvIGVsZW1lbnRzXG4gICAgYWRqdXN0X3BpcCA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncywgcG9zaXRpb24pIHtcbiAgICAgIHZhciBzaGVldCA9IEZvdW5kYXRpb24uc3R5bGVzaGVldCxcbiAgICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSA4O1xuXG4gICAgICBpZiAoZHJvcGRvd24uaGFzQ2xhc3Moc2V0dGluZ3MubWVnYV9jbGFzcykpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlID0gcG9zaXRpb24ubGVmdCArICh0YXJnZXQub3V0ZXJXaWR0aCgpIC8gMikgLSA4O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNtYWxsKCkpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlICs9IHBvc2l0aW9uLmxlZnQgLSA4O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJ1bGVfaWR4ID0gc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuXG4gICAgICAvL2RlZmF1bHRcbiAgICAgIHZhciBzZWxfYmVmb3JlID0gJy5mLWRyb3Bkb3duLm9wZW46YmVmb3JlJyxcbiAgICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDogJyArIHBpcF9vZmZzZXRfYmFzZSArICdweDsnLFxuICAgICAgICAgIGNzc19hZnRlciAgPSAnbGVmdDogJyArIChwaXBfb2Zmc2V0X2Jhc2UgLSAxKSArICdweDsnO1xuXG4gICAgICBpZiAocG9zaXRpb24ubWlzc1JpZ2h0ID09IHRydWUpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlID0gZHJvcGRvd24ub3V0ZXJXaWR0aCgpIC0gMjM7XG4gICAgICAgIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICBjc3NfYmVmb3JlID0gJ2xlZnQ6ICcgKyBwaXBfb2Zmc2V0X2Jhc2UgKyAncHg7JyxcbiAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0OiAnICsgKHBpcF9vZmZzZXRfYmFzZSAtIDEpICsgJ3B4Oyc7XG4gICAgICB9XG5cbiAgICAgIC8vanVzdCBhIGNhc2Ugd2hlcmUgcmlnaHQgaXMgZmlyZWQsIGJ1dCBpdHMgbm90IG1pc3NpbmcgcmlnaHRcbiAgICAgIGlmIChwb3NpdGlvbi50cmlnZ2VyZWRSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICBjc3NfYmVmb3JlID0gJ2xlZnQ6LTEycHg7JyxcbiAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0Oi0xNHB4Oyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGVldC5pbnNlcnRSdWxlKSB7XG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoW3NlbF9iZWZvcmUsICd7JywgY3NzX2JlZm9yZSwgJ30nXS5qb2luKCcgJyksIHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5pbnNlcnRSdWxlKFtzZWxfYWZ0ZXIsICd7JywgY3NzX2FmdGVyLCAnfSddLmpvaW4oJyAnKSwgdGhpcy5ydWxlX2lkeCArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxfYmVmb3JlLCBjc3NfYmVmb3JlLCB0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxfYWZ0ZXIsIGNzc19hZnRlciwgdGhpcy5ydWxlX2lkeCArIDEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb2xkIGRyb3Bkb3duIHJ1bGUgaW5kZXhcbiAgICBjbGVhcl9pZHggOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2hlZXQgPSBGb3VuZGF0aW9uLnN0eWxlc2hlZXQ7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5ydWxlX2lkeCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZV9pZHg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNtYWxsIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzICYmXG4gICAgICAgICFtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIG9mZiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuUyh0aGlzLnNjb3BlKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgICAgdGhpcy5TKCdodG1sLCBib2R5Jykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9mZignLmZuZHRuLmRyb3Bkb3duJyk7XG4gICAgICB0aGlzLlMoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBGb3VuZGF0aW9uLmxpYnMuZXF1YWxpemVyID0ge1xuICAgIG5hbWUgOiAnZXF1YWxpemVyJyxcblxuICAgIHZlcnNpb24gOiAnNS4zLjEnLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICB1c2VfdGFsbGVzdDogdHJ1ZSxcbiAgICAgIGJlZm9yZV9oZWlnaHRfY2hhbmdlOiAkLm5vb3AsXG4gICAgICBhZnRlcl9oZWlnaHRfY2hhbmdlOiAkLm5vb3AsXG4gICAgICBlcXVhbGl6ZV9vbl9zdGFjazogdHJ1ZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAnaW1hZ2VfbG9hZGVkJyk7XG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgICB0aGlzLnJlZmxvdygpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLlMod2luZG93KS5vZmYoJy5lcXVhbGl6ZXInKS5vbigncmVzaXplLmZuZHRuLmVxdWFsaXplcicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLnJlZmxvdygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgZXF1YWxpemU6IGZ1bmN0aW9uKGVxdWFsaXplcikge1xuICAgICAgdmFyIGlzU3RhY2tlZCA9IGZhbHNlLFxuICAgICAgICAgIHZhbHMgPSBlcXVhbGl6ZXIuZmluZCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy13YXRjaF06dmlzaWJsZScpLFxuICAgICAgICAgIHNldHRpbmdzID0gZXF1YWxpemVyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkrJy1pbml0Jyk7XG5cbiAgICAgIGlmICh2YWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgdmFyIGZpcnN0VG9wT2Zmc2V0ID0gdmFscy5maXJzdCgpLm9mZnNldCgpLnRvcDtcbiAgICAgIHNldHRpbmdzLmJlZm9yZV9oZWlnaHRfY2hhbmdlKCk7XG4gICAgICBlcXVhbGl6ZXIudHJpZ2dlcignYmVmb3JlLWhlaWdodC1jaGFuZ2UnKS50cmlnZ2VyKCdiZWZvcmUtaGVpZ2h0LWNoYW5nZS5mbmR0aC5lcXVhbGl6ZXInKTtcbiAgICAgIHZhbHMuaGVpZ2h0KCdpbmhlcml0Jyk7XG5cbiAgICAgIHZhciBoZWlnaHRzID0gdmFscy5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuICQodGhpcykub3V0ZXJIZWlnaHQoZmFsc2UpIH0pLmdldCgpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MudXNlX3RhbGxlc3QpIHtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgICB2YWxzLmNzcygnaGVpZ2h0JywgbWF4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBoZWlnaHRzKTtcbiAgICAgICAgdmFscy5jc3MoJ2hlaWdodCcsIG1pbik7XG4gICAgICB9XG4gICAgICBzZXR0aW5ncy5hZnRlcl9oZWlnaHRfY2hhbmdlKCk7XG4gICAgICBlcXVhbGl6ZXIudHJpZ2dlcignYWZ0ZXItaGVpZ2h0LWNoYW5nZScpLnRyaWdnZXIoJ2FmdGVyLWhlaWdodC1jaGFuZ2UuZm5kdG4uZXF1YWxpemVyJyk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScsIHRoaXMuc2NvcGUpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRlcV90YXJnZXQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmltYWdlX2xvYWRlZChzZWxmLlMoJ2ltZycsIHRoaXMpLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuZXF1YWxpemUoJGVxX3RhcmdldClcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KTtcblxuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBGb3VuZGF0aW9uLmxpYnMub2ZmY2FudmFzID0ge1xuICAgIG5hbWUgOiAnb2ZmY2FudmFzJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBvcGVuX21ldGhvZCA6ICdtb3ZlJyxcbiAgICAgIGNsb3NlX29uX2NsaWNrIDogZmFsc2VcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzY29wZSwgbWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gc2VsZi5TLFxuICAgICAgICAgIG1vdmVfY2xhc3MgPSAnJyxcbiAgICAgICAgICByaWdodF9wb3N0Zml4ID0gJycsXG4gICAgICAgICAgbGVmdF9wb3N0Zml4ID0gJyc7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZW5fbWV0aG9kID09PSAnbW92ZScpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdtb3ZlLSc7XG4gICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAncmlnaHQnO1xuICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnbGVmdCc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdvdmVybGFwX3NpbmdsZScpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdvZmZjYW52YXMtb3ZlcmxhcC0nO1xuICAgICAgICByaWdodF9wb3N0Zml4ID0gJ3JpZ2h0JztcbiAgICAgICAgbGVmdF9wb3N0Zml4ID0gJ2xlZnQnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm9wZW5fbWV0aG9kID09PSAnb3ZlcmxhcCcpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdvZmZjYW52YXMtb3ZlcmxhcCc7XG4gICAgICB9XG5cbiAgICAgIFModGhpcy5zY29wZSkub2ZmKCcub2ZmY2FudmFzJylcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLmxlZnQtb2ZmLWNhbnZhcy10b2dnbGUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfdG9nZ2xlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vcGVuX21ldGhvZCAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICAgICAgICBTKCcubGVmdC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcubGVmdC1vZmYtY2FudmFzLW1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gc2VsZi5nZXRfc2V0dGluZ3MoZSk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IFModGhpcykucGFyZW50KCk7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY2xvc2Vfb25fY2xpY2sgJiYgIXBhcmVudC5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSAmJiAhcGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZS5jYWxsKHNlbGYsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4LCBzZWxmLmdldF93cmFwcGVyKGUpKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChTKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBTKHRoaXMpLnNpYmxpbmdzKCcubGVmdC1zdWJtZW51JykudG9nZ2xlQ2xhc3MobW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5jbGlja190b2dnbGVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3Mub3Blbl9tZXRob2QgIT09ICdvdmVybGFwJykge1xuICAgICAgICAgICAgUygnLnJpZ2h0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLW1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gc2VsZi5nZXRfc2V0dGluZ3MoZSk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IFModGhpcykucGFyZW50KCk7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY2xvc2Vfb25fY2xpY2sgJiYgIXBhcmVudC5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSAmJiAhcGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZS5jYWxsKHNlbGYsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgsIHNlbGYuZ2V0X3dyYXBwZXIoZSkpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoUyh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgUyh0aGlzKS5zaWJsaW5ncygnLnJpZ2h0LXN1Ym1lbnUnKS50b2dnbGVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5oYXNDbGFzcygnYmFjaycpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwYXJlbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcuZXhpdC1vZmYtY2FudmFzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICBTKCcucmlnaHQtc3VibWVudScpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIGlmIChyaWdodF9wb3N0Zml4KSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgICBTKCcubGVmdC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcuZXhpdC1vZmYtY2FudmFzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICAkKCcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICBpZiAocmlnaHRfcG9zdGZpeCkge1xuICAgICAgICAgICAgc2VsZi5jbGlja19yZW1vdmVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZSA6IGZ1bmN0aW9uIChjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICBpZiAoJG9mZl9jYW52YXMuaXMoJy4nICsgY2xhc3NfbmFtZSkpIHtcbiAgICAgICAgdGhpcy5oaWRlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdyhjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3cgOiBmdW5jdGlvbiAoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpIHtcbiAgICAgICRvZmZfY2FudmFzID0gJG9mZl9jYW52YXMgfHwgdGhpcy5nZXRfd3JhcHBlcigpO1xuICAgICAgJG9mZl9jYW52YXMudHJpZ2dlcignb3Blbi5mbmR0bi5vZmZjYW52YXMnKTtcbiAgICAgICRvZmZfY2FudmFzLmFkZENsYXNzKGNsYXNzX25hbWUpO1xuICAgIH0sXG5cbiAgICBoaWRlIDogZnVuY3Rpb24gKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKSB7XG4gICAgICAkb2ZmX2NhbnZhcyA9ICRvZmZfY2FudmFzIHx8IHRoaXMuZ2V0X3dyYXBwZXIoKTtcbiAgICAgICRvZmZfY2FudmFzLnRyaWdnZXIoJ2Nsb3NlLmZuZHRuLm9mZmNhbnZhcycpO1xuICAgICAgJG9mZl9jYW52YXMucmVtb3ZlQ2xhc3MoY2xhc3NfbmFtZSk7XG4gICAgfSxcblxuICAgIGNsaWNrX3RvZ2dsZV9jbGFzcyA6IGZ1bmN0aW9uIChlLCBjbGFzc19uYW1lKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLmdldF93cmFwcGVyKGUpO1xuICAgICAgdGhpcy50b2dnbGUoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpO1xuICAgIH0sXG5cbiAgICBjbGlja19yZW1vdmVfY2xhc3MgOiBmdW5jdGlvbiAoZSwgY2xhc3NfbmFtZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICRvZmZfY2FudmFzID0gdGhpcy5nZXRfd3JhcHBlcihlKTtcbiAgICAgIHRoaXMuaGlkZShjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgfSxcblxuICAgIGdldF9zZXR0aW5ncyA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgb2ZmY2FudmFzICA9IHRoaXMuUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKTtcbiAgICAgIHJldHVybiBvZmZjYW52YXMuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3M7XG4gICAgfSxcblxuICAgIGdldF93cmFwcGVyIDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkb2ZmX2NhbnZhcyA9IHRoaXMuUyhlID8gZS50YXJnZXQgOiB0aGlzLnNjb3BlKS5jbG9zZXN0KCcub2ZmLWNhbnZhcy13cmFwJyk7XG5cbiAgICAgIGlmICgkb2ZmX2NhbnZhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJG9mZl9jYW52YXMgPSB0aGlzLlMoJy5vZmYtY2FudmFzLXdyYXAnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkb2ZmX2NhbnZhcztcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBGb3VuZGF0aW9uLmxpYnMudG9wYmFyID0ge1xuICAgIG5hbWUgOiAndG9wYmFyJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBpbmRleCA6IDAsXG4gICAgICBzdGFydF9vZmZzZXQgOiAwLFxuICAgICAgc3RpY2t5X2NsYXNzIDogJ3N0aWNreScsXG4gICAgICBjdXN0b21fYmFja190ZXh0IDogdHJ1ZSxcbiAgICAgIGJhY2tfdGV4dCA6ICdCYWNrJyxcbiAgICAgIG1vYmlsZV9zaG93X3BhcmVudF9saW5rIDogdHJ1ZSxcbiAgICAgIGlzX2hvdmVyIDogdHJ1ZSxcbiAgICAgIHNjcm9sbHRvcCA6IHRydWUsIC8vIGp1bXAgdG8gdG9wIHdoZW4gc3RpY2t5IG5hdiBtZW51IHRvZ2dsZSBpcyBjbGlja2VkXG4gICAgICBzdGlja3lfb24gOiAnYWxsJyxcbiAgICAgIGRyb3Bkb3duX2F1dG9jbG9zZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNlY3Rpb24sIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICdhZGRfY3VzdG9tX3J1bGUgcmVnaXN0ZXJfbWVkaWEgdGhyb3R0bGUnKTtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgc2VsZi5yZWdpc3Rlcl9tZWRpYSgndG9wYmFyJywgJ2ZvdW5kYXRpb24tbXEtdG9wYmFyJyk7XG5cbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcblxuICAgICAgc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScsIHRoaXMuc2NvcGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9wYmFyID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSxcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWxmLlMoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nLCB0aGlzKTtcbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgMCk7XG4gICAgICAgIHZhciB0b3BiYXJDb250YWluZXIgPSB0b3BiYXIucGFyZW50KCk7XG4gICAgICAgIGlmICh0b3BiYXJDb250YWluZXIuaGFzQ2xhc3MoJ2ZpeGVkJykgfHwgc2VsZi5pc19zdGlja3kodG9wYmFyLCB0b3BiYXJDb250YWluZXIsIHNldHRpbmdzKSApIHtcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLnN0aWNreV9jbGFzcyA9IHNldHRpbmdzLnN0aWNreV9jbGFzcztcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLnN0aWNreV90b3BiYXIgPSB0b3BiYXI7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ2hlaWdodCcsIHRvcGJhckNvbnRhaW5lci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICB0b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0JywgdG9wYmFyQ29udGFpbmVyLm9mZnNldCgpLnRvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ2hlaWdodCcsIHRvcGJhci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2V0dGluZ3MuYXNzZW1ibGVkKSB7XG4gICAgICAgICAgc2VsZi5hc3NlbWJsZSh0b3BiYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duJywgdG9wYmFyKS5hZGRDbGFzcygnbm90LWNsaWNrJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duJywgdG9wYmFyKS5yZW1vdmVDbGFzcygnbm90LWNsaWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYWQgYm9keSB3aGVuIHN0aWNreSAoc2Nyb2xsZWQpIG9yIGZpeGVkLlxuICAgICAgICBzZWxmLmFkZF9jdXN0b21fcnVsZSgnLmYtdG9wYmFyLWZpeGVkIHsgcGFkZGluZy10b3A6ICcgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykgKyAncHggfScpO1xuXG4gICAgICAgIGlmICh0b3BiYXJDb250YWluZXIuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgaXNfc3RpY2t5IDogZnVuY3Rpb24gKHRvcGJhciwgdG9wYmFyQ29udGFpbmVyLCBzZXR0aW5ncykge1xuICAgICAgdmFyIHN0aWNreSAgICAgPSB0b3BiYXJDb250YWluZXIuaGFzQ2xhc3Moc2V0dGluZ3Muc3RpY2t5X2NsYXNzKTtcbiAgICAgIHZhciBzbWFsbE1hdGNoID0gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMuc21hbGwpLm1hdGNoZXM7XG4gICAgICB2YXIgbWVkTWF0Y2ggICA9IG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSkubWF0Y2hlcztcbiAgICAgIHZhciBscmdNYXRjaCAgID0gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMubGFyZ2UpLm1hdGNoZXM7XG5cbiAgICAgIGlmIChzdGlja3kgJiYgc2V0dGluZ3Muc3RpY2t5X29uID09PSAnYWxsJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGlja3kgJiYgdGhpcy5zbWFsbCgpICYmIHNldHRpbmdzLnN0aWNreV9vbi5pbmRleE9mKCdzbWFsbCcpICE9PSAtMSkge1xuICAgICAgICBpZiAoc21hbGxNYXRjaCAmJiAhbWVkTWF0Y2ggJiYgIWxyZ01hdGNoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5ICYmIHRoaXMubWVkaXVtKCkgJiYgc2V0dGluZ3Muc3RpY2t5X29uLmluZGV4T2YoJ21lZGl1bScpICE9PSAtMSkge1xuICAgICAgICBpZiAoc21hbGxNYXRjaCAmJiBtZWRNYXRjaCAmJiAhbHJnTWF0Y2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGlja3kgJiYgdGhpcy5sYXJnZSgpICYmIHNldHRpbmdzLnN0aWNreV9vbi5pbmRleE9mKCdsYXJnZScpICE9PSAtMSkge1xuICAgICAgICBpZiAoc21hbGxNYXRjaCAmJiBtZWRNYXRjaCAmJiBscmdNYXRjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuXG4gICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICB0b2dnbGUgOiBmdW5jdGlvbiAodG9nZ2xlRWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICB0b3BiYXI7XG5cbiAgICAgIGlmICh0b2dnbGVFbCkge1xuICAgICAgICB0b3BiYXIgPSBzZWxmLlModG9nZ2xlRWwpLmNsb3Nlc3QoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3BiYXIgPSBzZWxmLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG5cbiAgICAgIHZhciBzZWN0aW9uID0gc2VsZi5TKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJywgdG9wYmFyKTtcblxuICAgICAgaWYgKHNlbGYuYnJlYWtwb2ludCgpKSB7XG4gICAgICAgIGlmICghc2VsZi5ydGwpIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7bGVmdCA6ICcwJSd9KTtcbiAgICAgICAgICAkKCc+Lm5hbWUnLCBzZWN0aW9uKS5jc3Moe2xlZnQgOiAnMTAwJSd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7cmlnaHQgOiAnMCUnfSk7XG4gICAgICAgICAgJCgnPi5uYW1lJywgc2VjdGlvbikuY3NzKHtyaWdodCA6ICcxMDAlJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5TKCdsaS5tb3ZlZCcsIHNlY3Rpb24pLnJlbW92ZUNsYXNzKCdtb3ZlZCcpO1xuICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCAwKTtcblxuICAgICAgICB0b3BiYXJcbiAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zY3JvbGx0b3ApIHtcbiAgICAgICAgaWYgKCF0b3BiYXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICBpZiAodG9wYmFyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodG9wYmFyLnBhcmVudCgpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLnNjcm9sbHRvcCkge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgdG9wYmFyLnBhcmVudCgpLCBzZXR0aW5ncykpIHtcbiAgICAgICAgICB0b3BiYXIucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wYmFyLnBhcmVudCgpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgaWYgKCF0b3BiYXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgIHRvcGJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlX3N0aWNreV9wb3NpdGlvbmluZygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BiYXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGltZXIgOiBudWxsLFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKGJhcikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIFMgPSB0aGlzLlM7XG5cbiAgICAgIFModGhpcy5zY29wZSlcbiAgICAgICAgLm9mZignLnRvcGJhcicpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIC50b2dnbGUtdG9wYmFyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2VsZi50b2dnbGUodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyIGNvbnRleHRtZW51LmZuZHRuLnRvcGJhcicsICcudG9wLWJhciAudG9wLWJhci1zZWN0aW9uIGxpIGFbaHJlZl49XCIjXCJdLFsnICsgdGhpcy5hdHRyX25hbWUoKSArICddIC50b3AtYmFyLXNlY3Rpb24gbGkgYVtocmVmXj1cIiNcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGxpID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLFxuICAgICAgICAgICAgICAgIHRvcGJhciA9IGxpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuZHJvcGRvd25fYXV0b2Nsb3NlICYmIHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICAgIHZhciBob3ZlckxpID0gJCh0aGlzKS5jbG9zZXN0KCcuaG92ZXInKTtcbiAgICAgICAgICAgICAgaG92ZXJMaS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSAmJiAhbGkuaGFzQ2xhc3MoJ2JhY2snKSAmJiAhbGkuaGFzQ2xhc3MoJ2hhcy1kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgIHNlbGYudG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gbGkuaGFzLWRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgbGkgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICB0YXJnZXQgPSBTKGUudGFyZ2V0KSxcbiAgICAgICAgICAgICAgdG9wYmFyID0gbGkuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICAgICAgaWYgKHRhcmdldC5kYXRhKCdyZXZlYWxJZCcpKSB7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3ZlciAmJiAhTW9kZXJuaXpyLnRvdWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIGlmIChsaS5oYXNDbGFzcygnaG92ZXInKSkge1xuICAgICAgICAgICAgbGlcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpXG4gICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgbGkucGFyZW50cygnbGkuaG92ZXInKVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpLmFkZENsYXNzKCdob3ZlcicpO1xuXG4gICAgICAgICAgICAkKGxpKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0WzBdLm5vZGVOYW1lID09PSAnQScgJiYgdGFyZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdoYXMtZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAuaGFzLWRyb3Bkb3duPmEnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSkge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICAgICAgdG9wYmFyID0gJHRoaXMuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gdG9wYmFyLmZpbmQoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nKSxcbiAgICAgICAgICAgICAgICBkcm9wZG93bkhlaWdodCA9ICR0aGlzLm5leHQoJy5kcm9wZG93bicpLm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkTGkgPSAkdGhpcy5jbG9zZXN0KCdsaScpO1xuXG4gICAgICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCB0b3BiYXIuZGF0YSgnaW5kZXgnKSArIDEpO1xuICAgICAgICAgICAgJHNlbGVjdGVkTGkuYWRkQ2xhc3MoJ21vdmVkJyk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5ydGwpIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5jc3Moe2xlZnQgOiAtKDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpKSArICclJ30pO1xuICAgICAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7bGVmdCA6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWN0aW9uLmNzcyh7cmlnaHQgOiAtKDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpKSArICclJ30pO1xuICAgICAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7cmlnaHQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3BiYXIuY3NzKCdoZWlnaHQnLCAkdGhpcy5zaWJsaW5ncygndWwnKS5vdXRlckhlaWdodCh0cnVlKSArIHRvcGJhci5kYXRhKCdoZWlnaHQnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgUyh3aW5kb3cpLm9mZignLnRvcGJhcicpLm9uKCdyZXNpemUuZm5kdG4udG9wYmFyJywgc2VsZi50aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5yZXNpemUuY2FsbChzZWxmKTtcbiAgICAgIH0sIDUwKSkudHJpZ2dlcigncmVzaXplLmZuZHRuLnRvcGJhcicpLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBvZmZzZXQgaXMgY2FsY3VsYXRlZCBhZnRlciBhbGwgb2YgdGhlIHBhZ2VzIHJlc291cmNlcyBoYXZlIGxvYWRlZFxuICAgICAgICAgIFModGhpcykudHJpZ2dlcigncmVzaXplLmZuZHRuLnRvcGJhcicpO1xuICAgICAgfSk7XG5cbiAgICAgIFMoJ2JvZHknKS5vZmYoJy50b3BiYXInKS5vbignY2xpY2suZm5kdG4udG9wYmFyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IFMoZS50YXJnZXQpLmNsb3Nlc3QoJ2xpJykuY2xvc2VzdCgnbGkuaG92ZXInKTtcblxuICAgICAgICBpZiAocGFyZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXSBsaS5ob3ZlcicpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEdvIHVwIGEgbGV2ZWwgb24gQ2xpY2tcbiAgICAgIFModGhpcy5zY29wZSkub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAuaGFzLWRyb3Bkb3duIC5iYWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICB0b3BiYXIgPSAkdGhpcy5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgc2VjdGlvbiA9IHRvcGJhci5maW5kKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJyksXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JyksXG4gICAgICAgICAgICAkbW92ZWRMaSA9ICR0aGlzLmNsb3Nlc3QoJ2xpLm1vdmVkJyksXG4gICAgICAgICAgICAkcHJldmlvdXNMZXZlbFVsID0gJG1vdmVkTGkucGFyZW50KCk7XG5cbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgdG9wYmFyLmRhdGEoJ2luZGV4JykgLSAxKTtcblxuICAgICAgICBpZiAoIXNlbGYucnRsKSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe2xlZnQgOiAtKDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpKSArICclJ30pO1xuICAgICAgICAgIHNlY3Rpb24uZmluZCgnPi5uYW1lJykuY3NzKHtsZWZ0IDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7cmlnaHQgOiAtKDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpKSArICclJ30pO1xuICAgICAgICAgIHNlY3Rpb24uZmluZCgnPi5uYW1lJykuY3NzKHtyaWdodCA6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wYmFyLmRhdGEoJ2luZGV4JykgPT09IDApIHtcbiAgICAgICAgICB0b3BiYXIuY3NzKCdoZWlnaHQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJHByZXZpb3VzTGV2ZWxVbC5vdXRlckhlaWdodCh0cnVlKSArIHRvcGJhci5kYXRhKCdoZWlnaHQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbW92ZWRMaS5yZW1vdmVDbGFzcygnbW92ZWQnKTtcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTaG93IGRyb3Bkb3duIG1lbnVzIHdoZW4gdGhlaXIgaXRlbXMgYXJlIGZvY3VzZWRcbiAgICAgIFModGhpcy5zY29wZSkuZmluZCgnLmRyb3Bkb3duIGEnKVxuICAgICAgICAuZm9jdXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykucGFyZW50cygnLmhhcy1kcm9wZG93bicpLmFkZENsYXNzKCdob3ZlcicpO1xuICAgICAgICB9KVxuICAgICAgICAuYmx1cihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuaGFzLWRyb3Bkb3duJykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZXNpemUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBzZWxmLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b3BiYXIgPSBzZWxmLlModGhpcyksXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG5cbiAgICAgICAgdmFyIHN0aWNreUNvbnRhaW5lciA9IHRvcGJhci5wYXJlbnQoJy4nICsgc2VsZi5zZXR0aW5ncy5zdGlja3lfY2xhc3MpO1xuICAgICAgICB2YXIgc3RpY2t5T2Zmc2V0O1xuXG4gICAgICAgIGlmICghc2VsZi5icmVha3BvaW50KCkpIHtcbiAgICAgICAgICB2YXIgZG9Ub2dnbGUgPSB0b3BiYXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgdG9wYmFyXG4gICAgICAgICAgICAuY3NzKCdoZWlnaHQnLCAnJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgaWYgKGRvVG9nZ2xlKSB7XG4gICAgICAgICAgICAgIHNlbGYudG9nZ2xlKHRvcGJhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5pc19zdGlja3kodG9wYmFyLCBzdGlja3lDb250YWluZXIsIHNldHRpbmdzKSkge1xuICAgICAgICAgIGlmIChzdGlja3lDb250YWluZXIuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZml4ZWQgdG8gYWxsb3cgZm9yIGNvcnJlY3QgY2FsY3VsYXRpb24gb2YgdGhlIG9mZnNldC5cbiAgICAgICAgICAgIHN0aWNreUNvbnRhaW5lci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcblxuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gc3RpY2t5Q29udGFpbmVyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIGlmIChzZWxmLlMoZG9jdW1lbnQuYm9keSkuaGFzQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJykpIHtcbiAgICAgICAgICAgICAgc3RpY2t5T2Zmc2V0IC09IHRvcGJhci5kYXRhKCdoZWlnaHQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHN0aWNreU9mZnNldCk7XG4gICAgICAgICAgICBzdGlja3lDb250YWluZXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICB0b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0Jywgc3RpY2t5T2Zmc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJyZWFrcG9pbnQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gIW1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWyd0b3BiYXInXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgc21hbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ3NtYWxsJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIG1lZGl1bSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1snbWVkaXVtJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIGxhcmdlIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWydsYXJnZSddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBhc3NlbWJsZSA6IGZ1bmN0aW9uICh0b3BiYXIpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JyksXG4gICAgICAgICAgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicsIHRvcGJhcik7XG5cbiAgICAgIC8vIFB1bGwgZWxlbWVudCBvdXQgb2YgdGhlIERPTSBmb3IgbWFuaXB1bGF0aW9uXG4gICAgICBzZWN0aW9uLmRldGFjaCgpO1xuXG4gICAgICBzZWxmLlMoJy5oYXMtZHJvcGRvd24+YScsIHNlY3Rpb24pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGxpbmsgPSBzZWxmLlModGhpcyksXG4gICAgICAgICAgICAkZHJvcGRvd24gPSAkbGluay5zaWJsaW5ncygnLmRyb3Bkb3duJyksXG4gICAgICAgICAgICB1cmwgPSAkbGluay5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAkdGl0bGVMaTtcblxuICAgICAgICBpZiAoISRkcm9wZG93bi5maW5kKCcudGl0bGUuYmFjaycpLmxlbmd0aCkge1xuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLm1vYmlsZV9zaG93X3BhcmVudF9saW5rID09IHRydWUgJiYgdXJsKSB7XG4gICAgICAgICAgICAkdGl0bGVMaSA9ICQoJzxsaSBjbGFzcz1cInRpdGxlIGJhY2sganMtZ2VuZXJhdGVkXCI+PGg1PjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48L2E+PC9oNT48L2xpPjxsaSBjbGFzcz1cInBhcmVudC1saW5rIGhpZGUtZm9yLW1lZGl1bS11cFwiPjxhIGNsYXNzPVwicGFyZW50LWxpbmsganMtZ2VuZXJhdGVkXCIgaHJlZj1cIicgKyB1cmwgKyAnXCI+JyArICRsaW5rLmh0bWwoKSArJzwvYT48L2xpPicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGl0bGVMaSA9ICQoJzxsaSBjbGFzcz1cInRpdGxlIGJhY2sganMtZ2VuZXJhdGVkXCI+PGg1PjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48L2E+PC9oNT4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDb3B5IGxpbmsgdG8gc3VibmF2XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmN1c3RvbV9iYWNrX3RleHQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJCgnaDU+YScsICR0aXRsZUxpKS5odG1sKHNldHRpbmdzLmJhY2tfdGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2g1PmEnLCAkdGl0bGVMaSkuaHRtbCgnJmxhcXVvOyAnICsgJGxpbmsuaHRtbCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGRyb3Bkb3duLnByZXBlbmQoJHRpdGxlTGkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gUHV0IGVsZW1lbnQgYmFjayBpbiB0aGUgRE9NXG4gICAgICBzZWN0aW9uLmFwcGVuZFRvKHRvcGJhcik7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBzdGlja3lcbiAgICAgIHRoaXMuc3RpY2t5KCk7XG5cbiAgICAgIHRoaXMuYXNzZW1ibGVkKHRvcGJhcik7XG4gICAgfSxcblxuICAgIGFzc2VtYmxlZCA6IGZ1bmN0aW9uICh0b3BiYXIpIHtcbiAgICAgIHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpLCAkLmV4dGVuZCh7fSwgdG9wYmFyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkpLCB7YXNzZW1ibGVkIDogdHJ1ZX0pKTtcbiAgICB9LFxuXG4gICAgaGVpZ2h0IDogZnVuY3Rpb24gKHVsKSB7XG4gICAgICB2YXIgdG90YWwgPSAwLFxuICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAkKCc+IGxpJywgdWwpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSBzZWxmLlModGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0sXG5cbiAgICBzdGlja3kgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYudXBkYXRlX3N0aWNreV9wb3NpdGlvbmluZygpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZV9zdGlja3lfcG9zaXRpb25pbmcgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIga2xhc3MgPSAnLicgKyB0aGlzLnNldHRpbmdzLnN0aWNreV9jbGFzcyxcbiAgICAgICAgICAkd2luZG93ID0gdGhpcy5TKHdpbmRvdyksXG4gICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmIChzZWxmLnNldHRpbmdzLnN0aWNreV90b3BiYXIgJiYgc2VsZi5pc19zdGlja3kodGhpcy5zZXR0aW5ncy5zdGlja3lfdG9wYmFyLHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhci5wYXJlbnQoKSwgdGhpcy5zZXR0aW5ncykpIHtcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5zZXR0aW5ncy5zdGlja3lfdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcpICsgdGhpcy5zZXR0aW5ncy5zdGFydF9vZmZzZXQ7XG4gICAgICAgIGlmICghc2VsZi5TKGtsYXNzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgIGlmICgkd2luZG93LnNjcm9sbFRvcCgpID4gKGRpc3RhbmNlKSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLlMoa2xhc3MpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAgIHNlbGYuUyhrbGFzcykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICAgIHNlbGYuUygnYm9keScpLmFkZENsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoJHdpbmRvdy5zY3JvbGxUb3AoKSA8PSBkaXN0YW5jZSkge1xuICAgICAgICAgICAgaWYgKHNlbGYuUyhrbGFzcykuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgICAgc2VsZi5TKGtsYXNzKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgICAgc2VsZi5TKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIG9mZiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuUyh0aGlzLnNjb3BlKS5vZmYoJy5mbmR0bi50b3BiYXInKTtcbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9mZignLmZuZHRuLnRvcGJhcicpO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCIvKlxuICpcdGpRdWVyeSBlbGV2YXRlWm9vbSAzLjAuOFxuICpcdERlbW8ncyBhbmQgZG9jdW1lbnRhdGlvbjpcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51ay9pbWFnZS16b29tXG4gKlxuICpcdENvcHlyaWdodCAoYykgMjAxMiBBbmRyZXcgRWFkZXNcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51a1xuICpcbiAqXHREdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBHUEwgYW5kIE1JVCBsaWNlbnNlcy5cbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HTlVfR2VuZXJhbF9QdWJsaWNfTGljZW5zZVxuICpcblxuLypcbiAqXHRqUXVlcnkgZWxldmF0ZVpvb20gMy4wLjNcbiAqXHREZW1vJ3MgYW5kIGRvY3VtZW50YXRpb246XG4gKlx0d3d3LmVsZXZhdGV3ZWIuY28udWsvaW1hZ2Utem9vbVxuICpcbiAqXHRDb3B5cmlnaHQgKGMpIDIwMTIgQW5kcmV3IEVhZGVzXG4gKlx0d3d3LmVsZXZhdGV3ZWIuY28udWtcbiAqXG4gKlx0RHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgR1BMIGFuZCBNSVQgbGljZW5zZXMuXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZVxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvR05VX0dlbmVyYWxfUHVibGljX0xpY2Vuc2VcbiAqL1xuXG5cbmlmICggdHlwZW9mIE9iamVjdC5jcmVhdGUgIT09ICdmdW5jdGlvbicgKSB7XG4gICAgT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gICAgICAgIGZ1bmN0aW9uIEYoKSB7fTtcbiAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG4gICAgICAgIHJldHVybiBuZXcgRigpO1xuICAgIH07XG59XG5cbihmdW5jdGlvbiggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuICAgIHZhciBFbGV2YXRlWm9vbSA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCBvcHRpb25zLCBlbGVtICkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHNlbGYuZWxlbSA9IGVsZW07XG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbSA9ICQoIGVsZW0gKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VTcmMgPSBzZWxmLiRlbGVtLmRhdGEoXCJ6b29tLWltYWdlXCIpID8gc2VsZi4kZWxlbS5kYXRhKFwiem9vbS1pbWFnZVwiKSA6IHNlbGYuJGVsZW0uYXR0cihcInNyY1wiKTtcblxuICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgJC5mbi5lbGV2YXRlWm9vbS5vcHRpb25zLCBvcHRpb25zICk7XG5cbiAgICAgICAgICAgICAgICAvL1RJTlQgT1ZFUlJJREUgU0VUVElOR1NcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubGVuc0NvbG91ciA9IFwibm9uZVwiLCAvL2NvbG91ciBvZiB0aGUgbGVucyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5sZW5zT3BhY2l0eSA9ICBcIjFcIiAvL29wYWNpdHkgb2YgdGhlIGxlbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9JTk5FUiBPVkVSUklERSBTRVRUSU5HU1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtzZWxmLm9wdGlvbnMuc2hvd0xlbnMgPSBmYWxzZTt9XG5cblxuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIGFsdCBvbiBob3ZlclxuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5wYXJlbnQoKS5yZW1vdmVBdHRyKCd0aXRsZScpLnJlbW92ZUF0dHIoJ2FsdCcpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tSW1hZ2UgPSBzZWxmLmltYWdlU3JjO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoKCAxICk7XG5cblxuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgdGhlIGltYWdlIHN3YXAgZnJvbSB0aGUgZ2FsbGVyeVxuICAgICAgICAgICAgICAgICQoJyMnK3NlbGYub3B0aW9ucy5nYWxsZXJ5ICsgJyBhJykuY2xpY2soIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvL1NldCBhIGNsYXNzIG9uIHRoZSBjdXJyZW50bHkgYWN0aXZlIGdhbGxlcnkgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmdhbGxlcnlBY3RpdmVDbGFzcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjJytzZWxmLm9wdGlvbnMuZ2FsbGVyeSArICcgYScpLnJlbW92ZUNsYXNzKHNlbGYub3B0aW9ucy5nYWxsZXJ5QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhzZWxmLm9wdGlvbnMuZ2FsbGVyeUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3N0b3AgYW55IGxpbmsgb24gdGhlIGEgdGFnIGZyb20gd29ya2luZ1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jYWxsIHRoZSBzd2FwIGltYWdlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuZGF0YShcInpvb20taW1hZ2VcIikpe3NlbGYuem9vbUltYWdlUHJlID0gJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21JbWFnZVByZSA9ICQodGhpcykuZGF0YShcImltYWdlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FwdGhlaW1hZ2UoJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIiksIHNlbGYuem9vbUltYWdlUHJlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZWZyZXNoOiBmdW5jdGlvbiggbGVuZ3RoICkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmV0Y2goc2VsZi5pbWFnZVNyYyk7XG5cbiAgICAgICAgICAgICAgICB9LCBsZW5ndGggfHwgc2VsZi5vcHRpb25zLnJlZnJlc2ggKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihpbWdzcmMpIHtcbiAgICAgICAgICAgICAgICAvL2dldCB0aGUgaW1hZ2VcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIGxhcmdlIGltYWdlIGRpbWVuc2lvbnMgLSB1c2VkIHRvIGNhbGN1bHRlIHJhdGlvJ3NcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXJnZVdpZHRoID0gbmV3SW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlSGVpZ2h0ID0gbmV3SW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgLy9vbmNlIGltYWdlIGlzIGxvYWRlZCBzdGFydCB0aGUgY2FsbHNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydFpvb20oKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50SW1hZ2UgPSBzZWxmLmltYWdlU3JjO1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBjYWxsZXIga25vdyBpbWFnZSBoYXMgYmVlbiBsb2FkZWRcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9uWm9vbWVkSW1hZ2VMb2FkZWQoc2VsZi4kZWxlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBpbWdzcmM7IC8vIHRoaXMgbXVzdCBiZSBkb25lIEFGVEVSIHNldHRpbmcgb25sb2FkXG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0YXJ0Wm9vbTogZnVuY3Rpb24oICkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAvL2dldCBkaW1lbnNpb25zIG9mIHRoZSBub24gem9vbWVkIGltYWdlXG4gICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgLy9hY3RpdmF0ZWQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzVGludEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYub3ZlcldpbmRvdyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy9Dcm9zc0ZhZGUgV3JhcHBlXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcCA9IHNlbGYuJGVsZW0ud3JhcCgnPGRpdiBzdHlsZT1cImhlaWdodDonK3NlbGYubnpIZWlnaHQrJ3B4O3dpZHRoOicrc2VsZi5ueldpZHRoKydweDtcIiBjbGFzcz1cInpvb21XcmFwcGVyXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tTG9jayA9IDE7XG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxpbmdMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuem9vbUxldmVsO1xuXG5cbiAgICAgICAgICAgICAgICAvL2dldCBvZmZzZXQgb2YgdGhlIG5vbiB6b29tZWQgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgd2lkdGggcmF0aW8gb2YgdGhlIGxhcmdlL3NtYWxsIGltYWdlXG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9zZWxmLmN1cnJlbnRab29tTGV2ZWwpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9zZWxmLmN1cnJlbnRab29tTGV2ZWwpIC8gc2VsZi5uekhlaWdodDtcblxuXG4gICAgICAgICAgICAgICAgLy9pZiB3aW5kb3cgem9vbVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvd1N0eWxlID0gXCJvdmVyZmxvdzogaGlkZGVuO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDt0ZXh0LWFsaWduOmNlbnRlcjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtY29sb3I6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy56b29tV2luZG93QmdDb2xvdXIpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiO3dpZHRoOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4O2Zsb2F0OiBsZWZ0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1zaXplOiBcIisgc2VsZi5sYXJnZVdpZHRoL3NlbGYuY3VycmVudFpvb21MZXZlbCsgXCJweCBcIiArc2VsZi5sYXJnZUhlaWdodC9zZWxmLmN1cnJlbnRab29tTGV2ZWwgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiZGlzcGxheTogbm9uZTt6LWluZGV4OjEwMDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlcjogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmJvcmRlclNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHggc29saWQgXCIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyQ29sb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiO2JhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvL2lmIGlubmVyICB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAvL2hhcyBhIGJvcmRlciBiZWVuIHB1dCBvbiB0aGUgaW1hZ2U/IExldHMgY2F0ZXIgZm9yIHRoaXNcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9yZGVyV2lkdGggPSBzZWxmLiRlbGVtLmNzcyhcImJvcmRlci1sZWZ0LXdpZHRoXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvd1N0eWxlID0gXCJvdmVyZmxvdzogaGlkZGVuO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwibWFyZ2luLWxlZnQ6IFwiICsgU3RyaW5nKGJvcmRlcldpZHRoKSArIFwiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwibWFyZ2luLXRvcDogXCIgKyBTdHJpbmcoYm9yZGVyV2lkdGgpICsgXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6IFwiICsgU3RyaW5nKHNlbGYubnpXaWR0aCkgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OiBcIiArIFN0cmluZyhzZWxmLm56SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4O2Zsb2F0OiBsZWZ0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImN1cnNvcjpcIisoc2VsZi5vcHRpb25zLmN1cnNvcikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweCBzb2xpZCBcIiArIHNlbGYub3B0aW9ucy5ib3JkZXJDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgLy9sZW5zIHN0eWxlIGZvciB3aW5kb3cgem9vbVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1hZ2VzIGxlc3MgdGhhbiB0aGUgd2luZG93IGhlaWdodFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXJnZVdpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNTdHlsZSA9IFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDt3aWR0aDogXCIgKyBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpL3NlbGYud2lkdGhSYXRpbykgKyBcInB4O2hlaWdodDogXCIgKyBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KS9zZWxmLmhlaWdodFJhdGlvKVxuICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IHJpZ2h0O2Rpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcInotaW5kZXg6IDk5OTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIm9wYWNpdHk6XCIrKHNlbGYub3B0aW9ucy5sZW5zT3BhY2l0eSkrXCI7ZmlsdGVyOiBhbHBoYShvcGFjaXR5ID0gXCIrKHNlbGYub3B0aW9ucy5sZW5zT3BhY2l0eSoxMDApK1wiKTsgem9vbToxO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDpcIitsZW5zV2lkdGgrXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OlwiK2xlbnNIZWlnaHQrXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1jb2xvcjpcIisoc2VsZi5vcHRpb25zLmxlbnNDb2xvdXIpK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJjdXJzb3I6XCIrKHNlbGYub3B0aW9ucy5jdXJzb3IpK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXI6IFwiKyhzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUpK1wicHhcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiIHNvbGlkIFwiKyhzZWxmLm9wdGlvbnMubGVuc0JvcmRlckNvbG91cikrXCI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvL3RpbnQgc3R5bGVcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnRTdHlsZSA9IFwiZGlzcGxheTogYmxvY2s7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1jb2xvcjogXCIrc2VsZi5vcHRpb25zLnRpbnRDb2xvdXIrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImZpbHRlcjphbHBoYShvcGFjaXR5PTApO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJvcGFjaXR5OiAwO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDogXCIgKyBzZWxmLm56V2lkdGggKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6IFwiICsgc2VsZi5uekhlaWdodCArIFwicHg7XCJcblxuICAgICAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICAvL2xlbnMgc3R5bGUgZm9yIGxlbnMgem9vbSB3aXRoIG9wdGlvbmFsIHJvdW5kIGZvciBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgICAgICAgICBzZWxmLmxlbnNSb3VuZCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zU3R5bGUgPSBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJmbG9hdDogbGVmdDtkaXNwbGF5OiBub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSkgKyBcInB4IHNvbGlkIFwiICsgc2VsZi5vcHRpb25zLmJvcmRlckNvbG91citcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOlwiKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKSArXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDpcIisgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSkrXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7cG9zaXRpb246IGFic29sdXRlO1wiO1xuXG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vZG9lcyBub3Qgcm91bmQgaW4gYWxsIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxlbnNTaGFwZSA9PSBcInJvdW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zUm91bmQgPSBcImJvcmRlci10b3AtbGVmdC1yYWRpdXM6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSAvIDIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSkgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSAvIDIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSkgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCI7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0aGUgZGl2J3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiXCJcbiAgICAgICAgICAgICAgICAvL3NlbGYuem9vbUNvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd6b29tQ29udGFpbmVyJykuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwiLCBcImhlaWdodFwiOnNlbGYubnpIZWlnaHQsIFwid2lkdGhcIjpzZWxmLm56V2lkdGh9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJ6b29tQ29udGFpbmVyXCIgc3R5bGU9XCItd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oicrc2VsZi5uek9mZnNldC5sZWZ0KydweDt0b3A6JytzZWxmLm56T2Zmc2V0LnRvcCsncHg7aGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoc2VsZi56b29tQ29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgLy90aGlzIHdpbGwgYWRkIG92ZXJmbG93IGhpZGRlbiBhbmQgY29udHJhaW4gdGhlIGxlbnMgb24gbGVucyBtb2RlXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnRhaW5MZW5zWm9vbSAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucyA9ICQoXCI8ZGl2IGNsYXNzPSd6b29tTGVucycgc3R5bGU9J1wiICsgc2VsZi5sZW5zU3R5bGUgKyBzZWxmLmxlbnNSb3VuZCArXCInPiZuYnNwOzwvZGl2PlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oc2VsZi56b29tQ29udGFpbmVyKVxuICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygndGludENvbnRhaW5lcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludCA9ICQoXCI8ZGl2IGNsYXNzPSd6b29tVGludCcgc3R5bGU9J1wiK3NlbGYudGludFN0eWxlK1wiJz48L2Rpdj5cIik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy53cmFwKHNlbGYudGludENvbnRhaW5lcik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludGNzcyA9IHNlbGYuem9vbUxlbnMuYWZ0ZXIoc2VsZi56b29tVGludCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGludCBlbmFibGVkIC0gc2V0IGFuIGltYWdlIHRvIHNob3cgb3ZlciB0aGUgdGludFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UgPSAkKCc8aW1nIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwcHg7IHRvcDogMHB4OyBtYXgtd2lkdGg6IG5vbmU7IHdpZHRoOiAnK3NlbGYubnpXaWR0aCsncHg7IGhlaWdodDogJytzZWxmLm56SGVpZ2h0KydweDtcIiBzcmM9XCInK3NlbGYuaW1hZ2VTcmMrJ1wiPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oc2VsZi56b29tTGVucylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuXG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB6b29tIHdpbmRvd1xuICAgICAgICAgICAgICAgIGlmKGlzTmFOKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93ID0gJChcIjxkaXYgc3R5bGU9J3otaW5kZXg6OTk5O2xlZnQ6XCIrKHNlbGYud2luZG93T2Zmc2V0TGVmdCkrXCJweDt0b3A6XCIrKHNlbGYud2luZG93T2Zmc2V0VG9wKStcInB4O1wiICsgc2VsZi56b29tV2luZG93U3R5bGUgKyBcIicgY2xhc3M9J3pvb21XaW5kb3cnPiZuYnNwOzwvZGl2PlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJ2JvZHknKVxuICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93ID0gJChcIjxkaXYgc3R5bGU9J3otaW5kZXg6OTk5O2xlZnQ6XCIrKHNlbGYud2luZG93T2Zmc2V0TGVmdCkrXCJweDt0b3A6XCIrKHNlbGYud2luZG93T2Zmc2V0VG9wKStcInB4O1wiICsgc2VsZi56b29tV2luZG93U3R5bGUgKyBcIicgY2xhc3M9J3pvb21XaW5kb3cnPiZuYnNwOzwvZGl2PlwiKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oc2VsZi56b29tQ29udGFpbmVyKVxuICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93Q29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3pvb21XaW5kb3dDb250YWluZXInKS5jc3MoXCJ3aWR0aFwiLHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy53cmFwKHNlbGYuem9vbVdpbmRvd0NvbnRhaW5lcik7XG5cblxuICAgICAgICAgICAgICAgIC8vICBzZWxmLmNhcHRpb25TdHlsZSA9IFwidGV4dC1hbGlnbjogbGVmdDtiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztjb2xvcjogd2hpdGU7Zm9udC13ZWlnaHQ6IGJvbGQ7cGFkZGluZzogMTBweDtmb250LWZhbWlseTogc2Fucy1zZXJpZjtmb250LXNpemU6IDExcHhcIjtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLnpvb21DYXB0aW9uID0gJCgnPGRpdiBjbGFzcz1cImVsZXZhdGV6b29tLWNhcHRpb25cIiBzdHlsZT1cIicrc2VsZi5jYXB0aW9uU3R5bGUrJ2Rpc3BsYXk6IGJsb2NrOyB3aWR0aDogMjgwcHg7XCI+SU5TRVJUIEFMVCBUQUc8L2Rpdj4nKS5hcHBlbmRUbyhzZWxmLnpvb21XaW5kb3cucGFyZW50KCkpO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBzZWxmLmltYWdlU3JjICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBzZWxmLmltYWdlU3JjICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLUVORCBUSEUgWk9PTSBXSU5ET1cgQU5EIExFTlMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAgICAgICAgICAgICAvL3RvdWNoIGV2ZW50c1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYmluZCgndG91Y2htb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRvdWNoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcInNob3dcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbih0b3VjaCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYmluZCgndG91Y2hlbmQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge3NlbGYuc2hvd0hpZGVMZW5zKFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtzZWxmLnNob3dIaWRlVGludChcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuYmluZCgndG91Y2htb3ZlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24odG91Y2gpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuYmluZCgndG91Y2hlbmQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtzZWxmLnNob3dIaWRlVGludChcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9OZWVkZWQgdG8gd29yayBpbiBJRVxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3ZlcldpbmRvdyA9PSBmYWxzZSl7c2VsZi5zZXRFbGVtZW50cyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm92ZXJXaW5kb3cgPT0gZmFsc2Upe3NlbGYuc2V0RWxlbWVudHMoXCJzaG93XCIpO31cblxuICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgb24gb3JpZW50YXRpb24gY2hhbmdlIHRoZSBzZXRwb3NpdGlvbiBpcyBub3QgZmlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9jID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgb24gb3JpZW50YXRpb24gY2hhbmdlIHRoZSBzZXRwb3NpdGlvbiBpcyBub3QgZmlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9jID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYub3ZlcldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvLyAgbGVuc0ZhZGVPdXQ6IDUwMCwgIHpvb21UaW50RmFkZUluXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmFkZChzZWxmLiRlbGVtKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vdmVyV2luZG93ID09IGZhbHNlKXtzZWxmLnNldEVsZW1lbnRzKFwic2hvd1wiKTt9XG5cblxuICAgICAgICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuc2Nyb2xsTG9jayl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVsZW1lbnRzKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vZW5kIG92ZSBpbWFnZVxuXG5cblxuXG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJXaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFbGVtZW50cyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vdmVyV2luZG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2VuZCBvdmUgaW1hZ2VcblxuXG5cbi8vXHRcdFx0XHR2YXIgZGVsdGEgPSBwYXJzZUludChlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSB8fCAtZS5vcmlnaW5hbEV2ZW50LmRldGFpbCk7XG5cbiAgICAgICAgICAgICAgICAvLyAgICAgICQodGhpcykuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL2ZpeCBmb3IgaW5pdGlhbCB6b29tIHNldHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnpvb21MZXZlbCAhPSAxKXtcbiAgICAgICAgICAgICAgICAgICAgLy9cdHNlbGYuY2hhbmdlWm9vbUxldmVsKHNlbGYuY3VycmVudFpvb21MZXZlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBtaW4gem9vbWxldmVsXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLm1pblpvb21MZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWluWm9vbUxldmVsID0gc2VsZi5vcHRpb25zLm1pblpvb21MZXZlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5ab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbUluY3JlbWVudCAqIDI7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbSl7XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYWRkKHNlbGYuJGVsZW0pLmJpbmQoJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwgTW96TW91c2VQaXhlbFNjcm9sbCcsIGZ1bmN0aW9uKGUpe1xuXG5cbi8vXHRcdFx0XHRcdFx0aW4gSUUgdGhlcmUgaXMgaXNzdWUgd2l0aCBmaXJpbmcgb2YgbW91c2VsZWF2ZSAtIFNvIGNoZWNrIHdoZXRoZXIgc3RpbGwgc2Nyb2xsaW5nXG4vL1x0XHRcdFx0XHRcdGFuZCBvbiBtb3VzZWxlYXZlIGNoZWNrIGlmIHNjcm9sbGxvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsTG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoJC5kYXRhKHRoaXMsICd0aW1lcicpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZGF0YSh0aGlzLCAndGltZXInLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsTG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyNTApKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoZUV2ZW50ID0gZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgfHwgZS5vcmlnaW5hbEV2ZW50LmRldGFpbCotMVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zY3JvbGxUb3AgKz0gKCBkZWx0YSA8IDAgPyAxIDogLTEgKSAqIDMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhlRXZlbnQgLzEyMCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbGluZyB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY3VycmVudFpvb21MZXZlbCA+PSBzZWxmLm1pblpvb21MZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbUxldmVsKHNlbGYuY3VycmVudFpvb21MZXZlbC1zZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbUluY3JlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsaW5nIGRvd25cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLm1heFpvb21MZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY3VycmVudFpvb21MZXZlbCA8PSBzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbUxldmVsKHBhcnNlRmxvYXQoc2VsZi5jdXJyZW50Wm9vbUxldmVsKStzZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbUluY3JlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmR5XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwocGFyc2VGbG9hdChzZWxmLmN1cnJlbnRab29tTGV2ZWwpK3NlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRFbGVtZW50czogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYoIXNlbGYub3B0aW9ucy56b29tRW5hYmxlZCl7cmV0dXJuIGZhbHNlO31cbiAgICAgICAgICAgICAgICBpZih0eXBlPT1cInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNXaW5kb3dTZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJzaG93XCIpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJzaG93XCIpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtzZWxmLnNob3dIaWRlVGludChcInNob3dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlPT1cImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5vcHRpb25zLnRpbnQpIHtzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge3NlbGYuc2hvd0hpZGVMZW5zKFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XHRzZWxmLnNob3dIaWRlVGludChcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRQb3NpdGlvbjogZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKCFzZWxmLm9wdGlvbnMuem9vbUVuYWJsZWQpe3JldHVybiBmYWxzZTt9XG5cbiAgICAgICAgICAgICAgICAvL3JlY2FjbGMgb2Zmc2V0IGVhY2ggdGltZSBpbiBjYXNlIHRoZSBpbWFnZSBtb3Zlc1xuICAgICAgICAgICAgICAgIC8vdGhpcyBjYW4gYmUgY2F1c2VkIGJ5IG90aGVyIG9uIHBhZ2UgZWxlbWVudHNcbiAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgdG9wOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgbGVmdDogMH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3NldCByZXNwb25zaXZlXG4gICAgICAgICAgICAgICAgLy93aWxsIGNoZWNraW5nIGlmIHRoZSBpbWFnZSBuZWVkcyBjaGFuZ2luZyBiZWZvcmUgcnVubmluZyB0aGlzIGNvZGUgd29yayBmYXN0ZXI/XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnJlc3BvbnNpdmUgJiYgIXNlbGYub3B0aW9ucy5zY3JvbGxab29tKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0L3NlbGYuaGVpZ2h0UmF0aW8pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXJnZVdpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSAgKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IHNlbGYubGFyZ2VXaWR0aCAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSBzZWxmLmxhcmdlSGVpZ2h0IC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIikge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Bvc3NpYmx5IGRvbnQgbmVlZCB0byBrZWVwIHJlY2FsY2FsY3VsYXRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRoZSBsZW5zIGlzIGhlaWdoZXIgdGhhbiB0aGUgaW1hZ2UsIHRoZW4gc2V0IGxlbnMgc2l6ZSB0byBpbWFnZSBzaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCd3aWR0aCcsIGxlbnNXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ2hlaWdodCcsIGxlbnNIZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKCd3aWR0aCcsIHNlbGYubnpXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoJ2hlaWdodCcsIHNlbGYubnpIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IHdpZHRoOiBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKSArICdweCcsIGhlaWdodDogU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSkgKyAncHgnIH0pXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbmQgcmVzcG9uc2l2ZSBpbWFnZSBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY29udGFpbmVyIGZpeFxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoeyB0b3A6IHNlbGYubnpPZmZzZXQudG9wfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyh7IGxlZnQ6IHNlbGYubnpPZmZzZXQubGVmdH0pO1xuICAgICAgICAgICAgICAgIHNlbGYubW91c2VMZWZ0ID0gcGFyc2VJbnQoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3VzZVRvcCA9IHBhcnNlSW50KGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCk7XG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIExvY2F0aW9uIG9mIHRoZSBMZW5zXG5cbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgYm91bmQgcmVnaW9ucyAtIGJ1dCBvbmx5IGlmIHpvb20gd2luZG93XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FdG9wcG9zID0gKHNlbGYubW91c2VUb3AgPCAoc2VsZi56b29tTGVucy5oZWlnaHQoKS8yKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWJvcHBvcyA9IChzZWxmLm1vdXNlVG9wID4gc2VsZi5uekhlaWdodCAtIChzZWxmLnpvb21MZW5zLmhlaWdodCgpLzIpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVsb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPCAwKygoc2VsZi56b29tTGVucy53aWR0aCgpLzIpKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXJvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA+IChzZWxmLm56V2lkdGggLSAoc2VsZi56b29tTGVucy53aWR0aCgpLzIpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIGJvdW5kIHJlZ2lvbnMgLSBidXQgb25seSBmb3IgaW5uZXIgem9vbVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkV0b3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA8ICgoc2VsZi5uekhlaWdodC8yKS9zZWxmLmhlaWdodFJhdGlvKSApO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVib3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA+IChzZWxmLm56SGVpZ2h0IC0gKChzZWxmLm56SGVpZ2h0LzIpL3NlbGYuaGVpZ2h0UmF0aW8pKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWxvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA8IDArKCgoc2VsZi5ueldpZHRoLzIpL3NlbGYud2lkdGhSYXRpbykpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5Fcm9wcG9zID0gKHNlbGYubW91c2VMZWZ0ID4gKHNlbGYubnpXaWR0aCAtIChzZWxmLm56V2lkdGgvMikvc2VsZi53aWR0aFJhdGlvLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbW91c2UgcG9zaXRpb24gb2YgdGhlIHNsaWRlciBpcyBvbmUgb2YgdGhlIG91dGVyYm91bmRzLCB0aGVuIGhpZGUgIHdpbmRvdyBhbmQgbGVuc1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm1vdXNlTGVmdCA8PSAwIHx8IHNlbGYubW91c2VUb3AgPCAwIHx8IHNlbGYubW91c2VMZWZ0ID4gc2VsZi5ueldpZHRoIHx8IHNlbGYubW91c2VUb3AgPiBzZWxmLm56SGVpZ2h0ICkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVsZW1lbnRzKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2Vsc2UgY29udGludWUgd2l0aCBvcGVyYXRpb25zXG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAvL2xlbnMgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXHRcdHNlbGYuc2hvd0hpZGVMZW5zKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGJhY2tncm91bmQgcG9zaXRpb24gb2YgbGVuc1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IFN0cmluZyhzZWxmLm1vdXNlTGVmdCAtIHNlbGYuem9vbUxlbnMud2lkdGgoKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gU3RyaW5nKHNlbGYubW91c2VUb3AgLSBzZWxmLnpvb21MZW5zLmhlaWdodCgpIC8gMik7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vYWRqdXN0IHRoZSBiYWNrZ3JvdW5kIHBvc2l0aW9uIGlmIHRoZSBtb3VzZSBpcyBpbiBvbmUgb2YgdGhlIG91dGVyIHJlZ2lvbnNcblxuICAgICAgICAgICAgICAgICAgICAvL1RvcCByZWdpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FdG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1RvcFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9MZWZ0IFJlZ2lvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkVsb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zPTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgYm90dG9tIGFuZCByaWdodCByZWdpb24gZm9yIHdpbmRvdyBtb2RlXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1RvcFBvcyA9IE1hdGgubWF4KCAoc2VsZi5uekhlaWdodCktc2VsZi56b29tTGVucy5oZWlnaHQoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpLCAwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc0xlZnRQb3MgPSAoc2VsZi5ueldpZHRoLShzZWxmLnpvb21MZW5zLndpZHRoKCkpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGJvdHRvbSBhbmQgcmlnaHQgcmVnaW9uIGZvciBpbm5lciBtb2RlXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gTWF0aC5tYXgoICgoc2VsZi5uekhlaWdodCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSksIDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IChzZWxmLm56V2lkdGgtKHNlbGYubnpXaWR0aCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlbnMgem9vbVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IFN0cmluZygoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpICogc2VsZi53aWR0aFJhdGlvIC0gc2VsZi56b29tTGVucy53aWR0aCgpIC8gMikgKiAoLTEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gU3RyaW5nKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAqIHNlbGYuaGVpZ2h0UmF0aW8gLSBzZWxmLnpvb21MZW5zLmhlaWdodCgpIC8gMikgKiAoLTEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYud2luZG93TGVmdFBvcyArICdweCAnICsgc2VsZi53aW5kb3dUb3BQb3MgKyAncHgnIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9pZiB0aW50IHpvb21cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRUaW50UG9zaXRpb24oZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgY3NzIGJhY2tncm91bmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0V2luZG93UG9zdGl0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0V2luZG93UG9zdGl0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGx3aWR0aCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc0xlZnRQb3MgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGxlZnQ6IHNlbGYubGVuc0xlZnRQb3MgKyAncHgnLCB0b3A6IHNlbGYubGVuc1RvcFBvcyArICdweCcgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSAvL2VuZCBlbHNlXG5cblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0hpZGVXaW5kb3c6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc1dpbmRvd0FjdGl2ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVJbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LnN0b3AodHJ1ZSwgdHJ1ZSwgZmFsc2UpLmZhZGVJbihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVJbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbVdpbmRvdy5zaG93KCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1dpbmRvd0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1dpbmRvd0FjdGl2ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVPdXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tV2luZG93LmhpZGUoKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0hpZGVMZW5zOiBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuaXNMZW5zQWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sZW5zRmFkZUluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLnN0b3AodHJ1ZSwgdHJ1ZSwgZmFsc2UpLmZhZGVJbihzZWxmLm9wdGlvbnMubGVuc0ZhZGVJbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbUxlbnMuc2hvdygpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNMZW5zQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzTGVuc0FjdGl2ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubGVuc0ZhZGVPdXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuc3RvcCh0cnVlLCB0cnVlKS5mYWRlT3V0KHNlbGYub3B0aW9ucy5sZW5zRmFkZU91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbUxlbnMuaGlkZSgpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNMZW5zQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0hpZGVUaW50OiBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuaXNUaW50QWN0aXZlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UaW50RmFkZUluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7b3BhY2l0eTpzZWxmLm9wdGlvbnMudGludE9wYWNpdHl9KS5hbmltYXRlKCkuc3RvcCh0cnVlLCB0cnVlKS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7b3BhY2l0eTpzZWxmLm9wdGlvbnMudGludE9wYWNpdHl9KS5hbmltYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5zaG93KCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1RpbnRBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNUaW50QWN0aXZlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UaW50RmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLnpvb21UaW50RmFkZU91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbVRpbnQuaGlkZSgpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNUaW50QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGVuc1Bvc3RpdGlvbjogZnVuY3Rpb24oIGUgKSB7XG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFdpbmRvd1Bvc3RpdGlvbjogZnVuY3Rpb24oIGUgKSB7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gb2JqLnNsaWNlKCAwLCBjb3VudCApO1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGlmKCFpc05hTihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1Bvc2l0aW9uKSl7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eSk7Ly9ET05FIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oK3NlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9ICgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvMiktKHNlbGYubnpIZWlnaHQvMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQgLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLSAoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpOyAvL0RPTkUgMyw5XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAvL0RPTkUgLSA0LDUsNiw3LDhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aC1zZWxmLnpvb21XaW5kb3cud2lkdGgoKS0oc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpOyAvL0RPTkUgLSA1LDE1XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgIC8vRE9ORSAtIDQsNSw2LDcsOFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvMiktKHNlbGYubnpXaWR0aC8yKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgIC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0gMDsgLy9ET05FIDcsIDEzXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAvL0RPTkUgLSA0LDUsNiw3LDhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTogIC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAtIChzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAzLDlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0LzIpLShzZWxmLm56SGVpZ2h0LzIpKSooLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXsgLy9uZWdhdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpOyAvL0RPTkUgMTIsMTMsMTQsMTUsMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KDApOyAvL0RPTkUgNywgMTNcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpOyAvL0RPTkUgMTIsMTMsMTQsMTUsMTZcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoLzIpLShzZWxmLm56V2lkdGgvMikrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXsgLy9uZWdhdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTovL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpLShzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAtIDUsMTVcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OiAgLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpOyAvL0RPTkUgMTIsMTMsMTQsMTUsMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dPZmZldHkpOy8vRE9ORSAtIDFcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGlzTkFOXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy9XRSBDQU4gUE9TSVRJT04gSU4gQSBDTEFTUyAtIEFTU1VNRSBUSEFUIEFOWSBTVFJJTkcgUEFTU0VEIElTXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXIgPSAkKCcjJytzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lcldpZHRoID0gc2VsZi5leHRlcm5hbENvbnRhaW5lci53aWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVySGVpZ2h0ID0gc2VsZi5leHRlcm5hbENvbnRhaW5lci5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lck9mZnNldCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXIub2Zmc2V0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0LnRvcDsvL0RPTkUgLSAxXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9c2VsZi5leHRlcm5hbENvbnRhaW5lck9mZnNldC5sZWZ0OyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93U2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IHNlbGYud2luZG93T2Zmc2V0VG9wICsgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dPZmZldHk7XG4gICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0gc2VsZi53aW5kb3dPZmZzZXRMZWZ0ICsgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dPZmZldHg7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgdG9wOiBzZWxmLndpbmRvd09mZnNldFRvcH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBsZWZ0OiBzZWxmLndpbmRvd09mZnNldExlZnR9KTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IHRvcDogMH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgbGVmdDogMH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSBTdHJpbmcoKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KSAqIHNlbGYud2lkdGhSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy53aWR0aCgpIC8gMikgKiAoLTEpKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd1RvcFBvcyA9IFN0cmluZygoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgKiBzZWxmLmhlaWdodFJhdGlvIC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC8gMikgKiAoLTEpKTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLkV0b3Bwb3Mpe3NlbGYud2luZG93VG9wUG9zID0gMDt9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FbG9wcG9zKXtzZWxmLndpbmRvd0xlZnRQb3MgPSAwO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe3NlbGYud2luZG93VG9wUG9zID0gKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSkqKC0xKTsgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe3NlbGYud2luZG93TGVmdFBvcyA9ICgoc2VsZi5sYXJnZVdpZHRoL3NlbGYuY3VycmVudFpvb21MZXZlbC1zZWxmLnpvb21XaW5kb3cud2lkdGgoKSkqKC0xKSk7fVxuXG4gICAgICAgICAgICAgICAgLy9zdG9wcyBtaWNybyBtb3ZlbWVudHNcbiAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGxoZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd1RvcFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5mdWxsd2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBjc3MgYmFja2dyb3VuZCBwb3NpdGlvblxuXG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIiB8fCBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi56b29tTG9jayA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vb3ZlcnJpZGVzIGZvciBpbWFnZXMgbm90IHpvb21hYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLndpZHRoUmF0aW8gPD0gMSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5oZWlnaHRSYXRpbyA8PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd1RvcFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRqdXN0IGltYWdlcyBsZXNzIHRoYW4gdGhlIHdpbmRvdyBoZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlSGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd1RvcFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXJnZVdpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHpvb213aW5kb3cgYmFja2dyb3VuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVhc2luZyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZihzZWxmLmNoYW5nZVpvb20pe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5sb29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICBzZWxmLmNoYW5nZVpvb20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICBzZWxmLmxvb3AgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgcG9zIHRvIDAgaWYgbm90IHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYueHApe3NlbGYueHAgPSAwO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLnlwKXtzZWxmLnlwID0gMDt9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIGxvb3Agbm90IGFscmVhZHkgc3RhcnRlZCwgdGhlbiBydW4gaXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5sb29wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzaW5nIHplbm8ncyBwYXJhZG94XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi54cCArPSAoc2VsZi53aW5kb3dMZWZ0UG9zICAtIHNlbGYueHApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi55cCArPSAoc2VsZi53aW5kb3dUb3BQb3MgIC0gc2VsZi55cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNjcm9sbGluZ0xvY2spe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5sb29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueHAgPSBzZWxmLndpbmRvd0xlZnRQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnlwID0gc2VsZi53aW5kb3dUb3BQb3NcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi54cCA9ICgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCkgKiBzZWxmLndpZHRoUmF0aW8gLSBzZWxmLnpvb21XaW5kb3cud2lkdGgoKSAvIDIpICogKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueXAgPSAoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApICogc2VsZi5oZWlnaHRSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICBpZighc2VsZi5iZ3hwKXtzZWxmLmJneHAgPSBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5iZ3lwKXtzZWxmLmJneXAgPSBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWUgO31cbiAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmJnbG9vcCl7XG4gICAgICAgICAgICAgICAgICAgICBzZWxmLmJnbG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICAgc2VsZi5iZ3hwICs9IChzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZSAgLSBzZWxmLmJneHApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZ3lwICs9IChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWUgIC0gc2VsZi5iZ3lwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG5cbiAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYuYmd4cCArICdweCAnICsgc2VsZi5iZ3lwICsgJ3B4JyB9KTtcblxuXG4gICAgICAgICAgICAgICAgICB9LCAxNik7XG5cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYud2luZG93TGVmdFBvcyArICdweCAnICsgc2VsZi53aW5kb3dUb3BQb3MgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxpbmdMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvb3AgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZFBvc2l0aW9uOiBzZWxmLnhwICsgJ3B4ICcgKyBzZWxmLnlwICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigoc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGgpIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYud2luZG93TGVmdFBvcyArICdweCAnICsgc2VsZi53aW5kb3dUb3BQb3MgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRpbnRQb3NpdGlvbjogZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIHNlbGYudGludHBvcyA9IFN0cmluZygoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpLShzZWxmLnpvb21MZW5zLndpZHRoKCkgLyAyKSkgKiAoLTEpKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gU3RyaW5nKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXRvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVsb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3M9MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IChzZWxmLm56SGVpZ2h0LXNlbGYuem9vbUxlbnMuaGVpZ2h0KCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkqKC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zID0gKChzZWxmLm56V2lkdGgtc2VsZi56b29tTGVucy53aWR0aCgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpKigtMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICAvL3N0b3BzIG1pY3JvIG1vdmVtZW50c1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGxoZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGx3aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3MgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyh7J2xlZnQnOiBzZWxmLnRpbnRwb3MrJ3B4J30pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKHsndG9wJzogc2VsZi50aW50cG9zeSsncHgnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3dhcHRoZWltYWdlOiBmdW5jdGlvbihzbWFsbGltYWdlLCBsYXJnZWltYWdlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxvYWRpbmdJY29uKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zcGlubmVyID0gJCgnPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHVybChcXCcnK3NlbGYub3B0aW9ucy5sb2FkaW5nSWNvbisnXFwnKSBuby1yZXBlYXQgY2VudGVyO2hlaWdodDonK3NlbGYubnpIZWlnaHQrJ3B4O3dpZHRoOicrc2VsZi5ueldpZHRoKydweDt6LWluZGV4OiAyMDAwO3Bvc2l0aW9uOiBhYnNvbHV0ZTsgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5hZnRlcihzZWxmLnNwaW5uZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5vbkltYWdlU3dhcChzZWxmLiRlbGVtKTtcblxuICAgICAgICAgICAgICAgIG5ld0ltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXJnZVdpZHRoID0gbmV3SW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlSGVpZ2h0ID0gbmV3SW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tSW1hZ2UgPSBsYXJnZWltYWdlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodCArICdweCcgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXBBY3Rpb24oc21hbGxpbWFnZSwgbGFyZ2VpbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGxhcmdlaW1hZ2U7IC8vIHRoaXMgbXVzdCBiZSBkb25lIEFGVEVSIHNldHRpbmcgb25sb2FkXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzd2FwQWN0aW9uOiBmdW5jdGlvbihzbWFsbGltYWdlLCBsYXJnZWltYWdlKXtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5ld0ltZzIgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBuZXdJbWcyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3JlLWNhbGN1bGF0ZSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IG5ld0ltZzIuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBuZXdJbWcyLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMub25JbWFnZVN3YXBDb21wbGV0ZShzZWxmLiRlbGVtKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmRvbmVDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0ltZzIuc3JjID0gc21hbGxpbWFnZTtcblxuICAgICAgICAgICAgICAgIC8vcmVzZXQgdGhlIHpvb21sZXZlbCB0byB0aGF0IGluaXRpYWxseSBzZXQgaW4gb3B0aW9uc1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy56b29tTGV2ZWw7XG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm1heFpvb21MZXZlbCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy9zd2FwcyB0aGUgbWFpbiBpbWFnZVxuICAgICAgICAgICAgICAgIC8vc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIsc21hbGxpbWFnZSk7XG4gICAgICAgICAgICAgICAgLy9zd2FwcyB0aGUgem9vbSBpbWFnZVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgbGFyZ2VpbWFnZSArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgbGFyZ2VpbWFnZSArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbWFnZSA9IGxhcmdlaW1hZ2U7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSW1nID0gc2VsZi4kZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG9sZEltZy5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmF0dHIoXCJzcmNcIixzbWFsbGltYWdlKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmFmdGVyKG5ld0ltZyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zdG9wKHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIFx0XHRcdFx0aWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFueSBhdHRyaWJ1dGVzIG9uIHRoZSBjbG9uZWQgaW1hZ2Ugc28gd2UgY2FuIHJlc2l6ZSBsYXRlclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLndpZHRoKFwiYXV0b1wiKS5yZW1vdmVBdHRyKFwid2lkdGhcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uaGVpZ2h0KFwiYXV0b1wiKS5yZW1vdmVBdHRyKFwiaGVpZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvbGRJbWcuZmFkZUluKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSW1nVGludCA9IHNlbGYuem9vbVRpbnRJbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbWdUaW50ID0gb2xkSW1nVGludC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJzcmNcIixsYXJnZWltYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmFmdGVyKG5ld0ltZ1RpbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SW1nVGludC5zdG9wKHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRJbWdUaW50LmZhZGVJbihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJ3aWR0aFwiLGVsZW0uZGF0YShcImltYWdlXCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNpemUgdGhlIHRpbnQgd2luZG93XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IGhlaWdodDogc2VsZi4kZWxlbS5oZWlnaHQoKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyB3aWR0aDogc2VsZi4kZWxlbS53aWR0aCgpfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmF0dHIoXCJzcmNcIixzbWFsbGltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwic3JjXCIsbGFyZ2VpbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwid2lkdGhcIixlbGVtLmRhdGEoXCJpbWFnZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcImhlaWdodFwiLHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvb21UaW50SW1hZ2UuYXR0cignc3JjJykgPSBlbGVtLmRhdGEoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoeyBoZWlnaHQ6IHNlbGYuJGVsZW0uaGVpZ2h0KCl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgaGVpZ2h0OiBzZWxmLiRlbGVtLmhlaWdodCgpfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVGhpcyB3aWxsIGNvbnRyYWluIHRoZSBpbWFnZSBwcm9wb3J0aW9uc1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSA9PSBcImhlaWdodFwiKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwid2lkdGhcIiwgXCJhdXRvXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcIndpZHRoXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0d2lkdGggPSBzZWxmLnpvb21XcmFwLndpZHRoKCk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jc3MoXCJ3aWR0aFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdHdpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIHNlbGYuY29uc3R3aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcIndpZHRoXCIsIHNlbGYuY29uc3R3aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50Q29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50Q29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYuY29uc3R3aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlID09IFwid2lkdGhcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3RoZWlnaHQgPSBzZWxmLnpvb21XcmFwLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdGhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50Q29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvbmVDYWxsYmFjazogZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubG9hZGluZ0ljb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwaW5uZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHRoZSB6b29tbGV2ZWwgYmFjayB0byBkZWZhdWx0XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnpvb21MZXZlbDtcblxuICAgICAgICAgICAgICAgIC8vcmF0aW8gb2YgdGhlIGxhcmdlIHRvIHNtYWxsIGltYWdlXG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gc2VsZi5sYXJnZVdpZHRoIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSBzZWxmLmxhcmdlSGVpZ2h0IC8gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgIC8vTkVFRCBUTyBBREQgVEhFIExFTlMgU0laRSBGT1IgUk9VTkRcbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1hZ2VzIGxlc3MgdGhhbiB0aGUgd2luZG93IGhlaWdodFxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0L3NlbGYuaGVpZ2h0UmF0aW8pKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSAgKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi56b29tTGVucyl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCd3aWR0aCcsIGxlbnNXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnaGVpZ2h0JywgbGVuc0hlaWdodCk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEN1cnJlbnRJbWFnZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuem9vbUltYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEdhbGxlcnlMaXN0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAvL2xvb3AgdGhyb3VnaCB0aGUgZ2FsbGVyeSBvcHRpb25zIGFuZCBzZXQgdGhlbSBpbiBsaXN0IGZvciBmYW5jeWJveFxuICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmdhbGxlcnkpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgJCgnIycrc2VsZi5vcHRpb25zLmdhbGxlcnkgKyAnIGEnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nX3NyYyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nX3NyYyA9ICQodGhpcykuZGF0YShcInpvb20taW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKCQodGhpcykuZGF0YShcImltYWdlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdfc3JjID0gJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3B1dCB0aGUgY3VycmVudCBpbWFnZSBhdCB0aGUgc3RhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGltZ19zcmMgPT0gc2VsZi56b29tSW1hZ2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK2ltZ19zcmMrJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbGxlcnlsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnJytpbWdfc3JjKycnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKFwidGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2lmIG5vIGdhbGxlcnkgLSByZXR1cm4gY3VycmVudCBpbWFnZVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnJytzZWxmLnpvb21JbWFnZSsnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2FsbGVyeWxpc3Q7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2Vab29tTGV2ZWw6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAvL2ZsYWcgYSB6b29tLCBzbyBjYW4gYWRqdXN0IHRoZSBlYXNpbmcgZHVyaW5nIHNldFBvc2l0aW9uXG4gICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxpbmdMb2NrID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vcm91bmQgdG8gdHdvIGRlY2ltYWwgcGxhY2VzXG4gICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgbmV3dmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpO1xuXG5cblxuXG4gICAgICAgICAgICAgICAgLy9tYXh3aWR0aCAmIE1heGhlaWdodCBvZiB0aGUgaW1hZ2VcbiAgICAgICAgICAgICAgICBtYXhoZWlnaHRuZXd2YWx1ZSA9IHNlbGYubGFyZ2VIZWlnaHQvKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCAvIHNlbGYubnpIZWlnaHQpICogc2VsZi5uekhlaWdodCk7XG4gICAgICAgICAgICAgICAgbWF4d2lkdGh0bmV3dmFsdWUgPSBzZWxmLmxhcmdlV2lkdGgvKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIC8gc2VsZi5ueldpZHRoKSAqIHNlbGYubnpXaWR0aCk7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSBuZXcgaGVpZ2h0cmF0aW9cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L21heGhlaWdodG5ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbWF4aGVpZ2h0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbi8vXHRcdFx0XHRcdGNhbGN1bGF0ZSBuZXcgd2lkdGggcmF0aW9cblxuICAgICAgICAgICAgICAgICAgICBpZihtYXh3aWR0aHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL21heHdpZHRodG5ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG1heHdpZHRodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1heGhlaWdodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4aGVpZ2h0bmV3dmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4aGVpZ2h0bmV3dmFsdWUgPSBwYXJzZUZsb2F0KHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uekhlaWdodCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgbWF4d2lkdGh0bmV3dmFsdWUgPSBwYXJzZUZsb2F0KHNlbGYubGFyZ2VXaWR0aC9zZWxmLm56V2lkdGgpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4aGVpZ2h0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3dmFsdWUgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heHdpZHRodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3ZhbHVlID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1heGhlaWdodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4aGVpZ2h0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbWF4aGVpZ2h0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1heHdpZHRodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heHdpZHRodG5ld3ZhbHVlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG1heHdpZHRodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfSAvL2VuZCBpbm5lclxuICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56V2lkdGggPiBzZWxmLm56SGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBzZWxmLm5ld3ZhbHVld2lkdGggPD0gbWF4d2lkdGh0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPiBzZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYubmV3dmFsdWV3aWR0aCA8PSBtYXh3aWR0aHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNjcmNvbnRpbnVlKXtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTG9jayA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZW5zIGhlaWdodCBpcyBsZXNzIHRoYW4gaW1hZ2UgaGVpZ2h0XG5cblxuICAgICAgICAgICAgICAgICAgICBpZigoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KS9zZWxmLmhlaWdodFJhdGlvKSA8PSBzZWxmLm56SGVpZ2h0KXtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm5ld3ZhbHVlaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7aGVpZ2h0OiBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KS9zZWxmLmhlaWdodFJhdGlvKSArICdweCcgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIiB8fCBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbykgPD0gc2VsZi5ueldpZHRoKXtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubmV3dmFsdWV3aWR0aCA+IHNlbGYubmV3dmFsdWVoZWlnaHQpICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm5ld3ZhbHVld2lkdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIiAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3Moe3dpZHRoOiBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpL3NlbGYud2lkdGhSYXRpbykgKyAncHgnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIgfHwgc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56V2lkdGggPiBzZWxmLm56SGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm5ld3ZhbHVld2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0ID4gc2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm5ld3ZhbHVld2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gICAgICAvL3VuZGVyXG5cbiAgICAgICAgICAgICAgICAvL3NldHMgdGhlIGJvdW5kcnkgY2hhbmdlLCBjYWxsZWQgaW4gc2V0V2luZG93UG9zXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihzZWxmLmN1cnJlbnRMb2MpO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VBbGw6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi56b29tV2luZG93KXtzZWxmLnpvb21XaW5kb3cuaGlkZSgpO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21MZW5zKXtzZWxmLnpvb21MZW5zLmhpZGUoKTt9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi56b29tVGludCl7c2VsZi56b29tVGludC5oaWRlKCk7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVN0YXRlOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09ICdlbmFibGUnKXtzZWxmLm9wdGlvbnMuem9vbUVuYWJsZWQgPSB0cnVlO31cbiAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PSAnZGlzYWJsZScpe3NlbGYub3B0aW9ucy56b29tRW5hYmxlZCA9IGZhbHNlO31cblxuICAgICAgICAgICAgfVxuXG4gICAgfTtcblxuXG5cblxuICAgICQuZm4uZWxldmF0ZVpvb20gPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbGV2YXRlID0gT2JqZWN0LmNyZWF0ZSggRWxldmF0ZVpvb20gKTtcblxuICAgICAgICAgICAgZWxldmF0ZS5pbml0KCBvcHRpb25zLCB0aGlzICk7XG5cbiAgICAgICAgICAgICQuZGF0YSggdGhpcywgJ2VsZXZhdGVab29tJywgZWxldmF0ZSApO1xuXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLmVsZXZhdGVab29tLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICB6b29tQWN0aXZhdGlvbjogXCJob3ZlclwiLCAvLyBDYW4gYWxzbyBiZSBjbGljayAoUExBQ0VIT0xERVIgRk9SIE5FWFQgVkVSU0lPTilcbiAgICAgIHpvb21FbmFibGVkOiB0cnVlLCAvL2ZhbHNlIGRpc2FibGVzIHpvb213aW5kb3cgZnJvbSBzaG93aW5nXG4gICAgICAgICAgICBwcmVsb2FkaW5nOiAxLCAvL2J5IGRlZmF1bHQsIGxvYWQgYWxsIHRoZSBpbWFnZXMsIGlmIDAsIHRoZW4gb25seSBsb2FkIGltYWdlcyBhZnRlciBhY3RpdmF0ZWQgKFBMQUNFSE9MREVSIEZPUiBORVhUIFZFUlNJT04pXG4gICAgICAgICAgICB6b29tTGV2ZWw6IDEsIC8vZGVmYXVsdCB6b29tIGxldmVsIG9mIGltYWdlXG4gICAgICAgICAgICBzY3JvbGxab29tOiBmYWxzZSwgLy9hbGxvdyB6b29tIG9uIG1vdXNld2hlZWwsIHRydWUgdG8gYWN0aXZhdGVcbiAgICAgICAgICAgIHNjcm9sbFpvb21JbmNyZW1lbnQ6IDAuMSwgIC8vc3RlcHMgb2YgdGhlIHNjcm9sbHpvb21cbiAgICAgICAgICAgIG1pblpvb21MZXZlbDogZmFsc2UsXG4gICAgICAgICAgICBtYXhab29tTGV2ZWw6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGVhc2luZ0Ftb3VudDogMTIsXG4gICAgICAgICAgICBsZW5zU2l6ZTogMjAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd1dpZHRoOiA0MDAsXG4gICAgICAgICAgICB6b29tV2luZG93SGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICB6b29tV2luZG93T2ZmZXR4OiAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd09mZmV0eTogMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dQb3NpdGlvbjogMSxcbiAgICAgICAgICAgIHpvb21XaW5kb3dCZ0NvbG91cjogXCIjZmZmXCIsXG4gICAgICAgICAgICBsZW5zRmFkZUluOiBmYWxzZSxcbiAgICAgICAgICAgIGxlbnNGYWRlT3V0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21XaW5kb3dGYWRlSW46IGZhbHNlLFxuICAgICAgICAgICAgem9vbVdpbmRvd0ZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgem9vbVdpbmRvd0Fsd2F5c1Nob3c6IGZhbHNlLFxuICAgICAgICAgICAgem9vbVRpbnRGYWRlSW46IGZhbHNlLFxuICAgICAgICAgICAgem9vbVRpbnRGYWRlT3V0OiBmYWxzZSxcbiAgICAgICAgICAgIGJvcmRlclNpemU6IDQsXG4gICAgICAgICAgICBzaG93TGVuczogdHJ1ZSxcbiAgICAgICAgICAgIGJvcmRlckNvbG91cjogXCIjODg4XCIsXG4gICAgICAgICAgICBsZW5zQm9yZGVyU2l6ZTogMSxcbiAgICAgICAgICAgIGxlbnNCb3JkZXJDb2xvdXI6IFwiIzAwMFwiLFxuICAgICAgICAgICAgbGVuc1NoYXBlOiBcInNxdWFyZVwiLCAvL2NhbiBiZSBcInJvdW5kXCJcbiAgICAgICAgICAgIHpvb21UeXBlOiBcIndpbmRvd1wiLCAvL3dpbmRvdyBpcyBkZWZhdWx0LCAgYWxzbyBcImxlbnNcIiBhdmFpbGFibGUgLVxuICAgICAgICAgICAgY29udGFpbkxlbnNab29tOiBmYWxzZSxcbiAgICAgICAgICAgIGxlbnNDb2xvdXI6IFwid2hpdGVcIiwgLy9jb2xvdXIgb2YgdGhlIGxlbnMgYmFja2dyb3VuZFxuICAgICAgICAgICAgbGVuc09wYWNpdHk6IDAuNCwgLy9vcGFjaXR5IG9mIHRoZSBsZW5zXG4gICAgICAgICAgICBsZW5zem9vbTogZmFsc2UsXG4gICAgICAgICAgICB0aW50OiBmYWxzZSwgLy9lbmFibGUgdGhlIHRpbnRpbmdcbiAgICAgICAgICAgIHRpbnRDb2xvdXI6IFwiIzMzM1wiLCAvL2RlZmF1bHQgdGludCBjb2xvciwgY2FuIGJlIGFueXRoaW5nLCByZWQsICNjY2MsIHJnYigwLDAsMClcbiAgICAgICAgICAgIHRpbnRPcGFjaXR5OiAwLjQsIC8vb3BhY2l0eSBvZiB0aGUgdGludFxuICAgICAgICAgICAgZ2FsbGVyeTogZmFsc2UsXG4gICAgICAgICAgICBnYWxsZXJ5QWN0aXZlQ2xhc3M6IFwiem9vbUdhbGxlcnlBY3RpdmVcIixcbiAgICAgICAgICAgIGltYWdlQ3Jvc3NmYWRlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnN0cmFpblR5cGU6IGZhbHNlLCAgLy93aWR0aCBvciBoZWlnaHRcbiAgICAgICAgICAgIGNvbnN0cmFpblNpemU6IGZhbHNlLCAgLy9pbiBwaXhlbHMgdGhlIGRpbWVuc2lvbnMgeW91IHdhbnQgdG8gY29uc3RyYWluIG9uXG4gICAgICAgICAgICBsb2FkaW5nSWNvbjogZmFsc2UsIC8vaHR0cDovL3d3dy5leGFtcGxlLmNvbS9zcGlubmVyLmdpZlxuICAgICAgICAgICAgY3Vyc29yOlwiZGVmYXVsdFwiLCAvLyB1c2VyIHNob3VsZCBzZXQgdG8gd2hhdCB0aGV5IHdhbnQgdGhlIGN1cnNvciBhcywgaWYgdGhleSBoYXZlIHNldCBhIGNsaWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXNwb25zaXZlOnRydWUsXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiAkLm5vb3AsXG4gICAgICAgICAgICBvblpvb21lZEltYWdlTG9hZGVkOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgb25JbWFnZVN3YXA6ICQubm9vcCxcbiAgICAgICAgICAgIG9uSW1hZ2VTd2FwQ29tcGxldGU6ICQubm9vcFxuICAgIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTtcbiIsIjsoZnVuY3Rpb24oJCkge1xuXG4gIHZhciBkZWZhdWx0cyA9IHtcblxuICAgIC8vIEdFTkVSQUxcbiAgICBtb2RlOiAnaG9yaXpvbnRhbCcsXG4gICAgc2xpZGVTZWxlY3RvcjogJycsXG4gICAgaW5maW5pdGVMb29wOiB0cnVlLFxuICAgIGhpZGVDb250cm9sT25FbmQ6IGZhbHNlLFxuICAgIHNwZWVkOiA1MDAsXG4gICAgZWFzaW5nOiBudWxsLFxuICAgIHNsaWRlTWFyZ2luOiAwLFxuICAgIHN0YXJ0U2xpZGU6IDAsXG4gICAgcmFuZG9tU3RhcnQ6IGZhbHNlLFxuICAgIGNhcHRpb25zOiBmYWxzZSxcbiAgICB0aWNrZXI6IGZhbHNlLFxuICAgIHRpY2tlckhvdmVyOiBmYWxzZSxcbiAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gICAgYWRhcHRpdmVIZWlnaHRTcGVlZDogNTAwLFxuICAgIHZpZGVvOiBmYWxzZSxcbiAgICB1c2VDU1M6IHRydWUsXG4gICAgcHJlbG9hZEltYWdlczogJ3Zpc2libGUnLFxuICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgc2xpZGVaSW5kZXg6IDUwLFxuICAgIHdyYXBwZXJDbGFzczogJ2J4LXdyYXBwZXInLFxuXG4gICAgLy8gVE9VQ0hcbiAgICB0b3VjaEVuYWJsZWQ6IHRydWUsXG4gICAgc3dpcGVUaHJlc2hvbGQ6IDUwLFxuICAgIG9uZVRvT25lVG91Y2g6IHRydWUsXG4gICAgcHJldmVudERlZmF1bHRTd2lwZVg6IHRydWUsXG4gICAgcHJldmVudERlZmF1bHRTd2lwZVk6IGZhbHNlLFxuXG4gICAgLy8gQUNDRVNTSUJJTElUWVxuICAgIGFyaWFMaXZlOiB0cnVlLFxuICAgIGFyaWFIaWRkZW46IHRydWUsXG5cbiAgICAvLyBLRVlCT0FSRFxuICAgIGtleWJvYXJkRW5hYmxlZDogZmFsc2UsXG5cbiAgICAvLyBQQUdFUlxuICAgIHBhZ2VyOiB0cnVlLFxuICAgIHBhZ2VyVHlwZTogJ2Z1bGwnLFxuICAgIHBhZ2VyU2hvcnRTZXBhcmF0b3I6ICcgLyAnLFxuICAgIHBhZ2VyU2VsZWN0b3I6IG51bGwsXG4gICAgYnVpbGRQYWdlcjogbnVsbCxcbiAgICBwYWdlckN1c3RvbTogbnVsbCxcblxuICAgIC8vIENPTlRST0xTXG4gICAgY29udHJvbHM6IHRydWUsXG4gICAgbmV4dFRleHQ6ICdOZXh0JyxcbiAgICBwcmV2VGV4dDogJ1ByZXYnLFxuICAgIG5leHRTZWxlY3RvcjogbnVsbCxcbiAgICBwcmV2U2VsZWN0b3I6IG51bGwsXG4gICAgYXV0b0NvbnRyb2xzOiBmYWxzZSxcbiAgICBzdGFydFRleHQ6ICdTdGFydCcsXG4gICAgc3RvcFRleHQ6ICdTdG9wJyxcbiAgICBhdXRvQ29udHJvbHNDb21iaW5lOiBmYWxzZSxcbiAgICBhdXRvQ29udHJvbHNTZWxlY3RvcjogbnVsbCxcblxuICAgIC8vIEFVVE9cbiAgICBhdXRvOiBmYWxzZSxcbiAgICBwYXVzZTogNDAwMCxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYXV0b0RpcmVjdGlvbjogJ25leHQnLFxuICAgIHN0b3BBdXRvT25DbGljazogZmFsc2UsXG4gICAgYXV0b0hvdmVyOiBmYWxzZSxcbiAgICBhdXRvRGVsYXk6IDAsXG4gICAgYXV0b1NsaWRlRm9yT25lUGFnZTogZmFsc2UsXG5cbiAgICAvLyBDQVJPVVNFTFxuICAgIG1pblNsaWRlczogMSxcbiAgICBtYXhTbGlkZXM6IDEsXG4gICAgbW92ZVNsaWRlczogMCxcbiAgICBzbGlkZVdpZHRoOiAwLFxuICAgIHNocmlua0l0ZW1zOiBmYWxzZSxcblxuICAgIC8vIENBTExCQUNLU1xuICAgIG9uU2xpZGVyTG9hZDogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9LFxuICAgIG9uU2xpZGVCZWZvcmU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICBvblNsaWRlQWZ0ZXI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICBvblNsaWRlTmV4dDogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9LFxuICAgIG9uU2xpZGVQcmV2OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgb25TbGlkZXJSZXNpemU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfVxuICB9O1xuXG4gICQuZm4uYnhTbGlkZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgbXVsdGlwbGUgZWxlbWVudHNcbiAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuYnhTbGlkZXIob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIG5hbWVzcGFjZSB0byBiZSB1c2VkIHRocm91Z2hvdXQgdGhlIHBsdWdpblxuICAgIHZhciBzbGlkZXIgPSB7fSxcbiAgICAvLyBzZXQgYSByZWZlcmVuY2UgdG8gb3VyIHNsaWRlciBlbGVtZW50XG4gICAgZWwgPSB0aGlzLFxuICAgIC8vIGdldCB0aGUgb3JpZ2luYWwgd2luZG93IGRpbWVucyAodGhhbmtzIGEgbG90IElFKVxuICAgIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKCksXG4gICAgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgLy8gUmV0dXJuIGlmIHNsaWRlciBpcyBhbHJlYWR5IGluaXRpYWxpemVkXG4gICAgaWYgKCQoZWwpLmRhdGEoJ2J4U2xpZGVyJykpIHsgcmV0dXJuOyB9XG5cbiAgICAvKipcbiAgICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAqID0gUFJJVkFURSBGVU5DVElPTlNcbiAgICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgbmFtZXNwYWNlIHNldHRpbmdzIHRvIGJlIHVzZWQgdGhyb3VnaG91dCBwbHVnaW5cbiAgICAgKi9cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gUmV0dXJuIGlmIHNsaWRlciBpcyBhbHJlYWR5IGluaXRpYWxpemVkXG4gICAgICBpZiAoJChlbCkuZGF0YSgnYnhTbGlkZXInKSkgeyByZXR1cm47IH1cbiAgICAgIC8vIG1lcmdlIHVzZXItc3VwcGxpZWQgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgc2xpZGVyLnNldHRpbmdzID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgIC8vIHBhcnNlIHNsaWRlV2lkdGggc2V0dGluZ1xuICAgICAgc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGggPSBwYXJzZUludChzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCk7XG4gICAgICAvLyBzdG9yZSB0aGUgb3JpZ2luYWwgY2hpbGRyZW5cbiAgICAgIHNsaWRlci5jaGlsZHJlbiA9IGVsLmNoaWxkcmVuKHNsaWRlci5zZXR0aW5ncy5zbGlkZVNlbGVjdG9yKTtcbiAgICAgIC8vIGNoZWNrIGlmIGFjdHVhbCBudW1iZXIgb2Ygc2xpZGVzIGlzIGxlc3MgdGhhbiBtaW5TbGlkZXMgLyBtYXhTbGlkZXNcbiAgICAgIGlmIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIDwgc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcykgeyBzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgaWYgKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggPCBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzKSB7IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB9XG4gICAgICAvLyBpZiByYW5kb20gc3RhcnQsIHNldCB0aGUgc3RhcnRTbGlkZSBzZXR0aW5nIHRvIHJhbmRvbSBudW1iZXJcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucmFuZG9tU3RhcnQpIHsgc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoKTsgfVxuICAgICAgLy8gc3RvcmUgYWN0aXZlIHNsaWRlIGluZm9ybWF0aW9uXG4gICAgICBzbGlkZXIuYWN0aXZlID0geyBpbmRleDogc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUgfTtcbiAgICAgIC8vIHN0b3JlIGlmIHRoZSBzbGlkZXIgaXMgaW4gY2Fyb3VzZWwgbW9kZSAoZGlzcGxheWluZyAvIG1vdmluZyBtdWx0aXBsZSBzbGlkZXMpXG4gICAgICBzbGlkZXIuY2Fyb3VzZWwgPSBzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzID4gMSB8fCBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzID4gMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIC8vIGlmIGNhcm91c2VsLCBmb3JjZSBwcmVsb2FkSW1hZ2VzID0gJ2FsbCdcbiAgICAgIGlmIChzbGlkZXIuY2Fyb3VzZWwpIHsgc2xpZGVyLnNldHRpbmdzLnByZWxvYWRJbWFnZXMgPSAnYWxsJzsgfVxuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBtaW4gLyBtYXggd2lkdGggdGhyZXNob2xkcyBiYXNlZCBvbiBtaW4gLyBtYXggbnVtYmVyIG9mIHNsaWRlc1xuICAgICAgLy8gdXNlZCB0byBzZXR1cCBhbmQgdXBkYXRlIGNhcm91c2VsIHNsaWRlcyBkaW1lbnNpb25zXG4gICAgICBzbGlkZXIubWluVGhyZXNob2xkID0gKHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMgKiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCkgKyAoKHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMgLSAxKSAqIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICBzbGlkZXIubWF4VGhyZXNob2xkID0gKHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgKiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCkgKyAoKHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgLSAxKSAqIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2xpZGVyIChpZiBjdXJyZW50bHkgYW5pbWF0aW5nLCB3b3JraW5nIGlzIHRydWUpXG4gICAgICBzbGlkZXIud29ya2luZyA9IGZhbHNlO1xuICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgY29udHJvbHMgb2JqZWN0XG4gICAgICBzbGlkZXIuY29udHJvbHMgPSB7fTtcbiAgICAgIC8vIGluaXRpYWxpemUgYW4gYXV0byBpbnRlcnZhbFxuICAgICAgc2xpZGVyLmludGVydmFsID0gbnVsbDtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm9wZXJ0eSB0byB1c2UgZm9yIHRyYW5zaXRpb25zXG4gICAgICBzbGlkZXIuYW5pbVByb3AgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJyA/ICd0b3AnIDogJ2xlZnQnO1xuICAgICAgLy8gZGV0ZXJtaW5lIGlmIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiBjYW4gYmUgdXNlZFxuICAgICAgc2xpZGVyLnVzaW5nQ1NTID0gc2xpZGVyLnNldHRpbmdzLnVzZUNTUyAmJiBzbGlkZXIuc2V0dGluZ3MubW9kZSAhPT0gJ2ZhZGUnICYmIChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY3JlYXRlIG91ciB0ZXN0IGRpdiBlbGVtZW50XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgLy8gY3NzIHRyYW5zaXRpb24gcHJvcGVydGllc1xuICAgICAgICBwcm9wcyA9IFsnV2Via2l0UGVyc3BlY3RpdmUnLCAnTW96UGVyc3BlY3RpdmUnLCAnT1BlcnNwZWN0aXZlJywgJ21zUGVyc3BlY3RpdmUnXTtcbiAgICAgICAgLy8gdGVzdCBmb3IgZWFjaCBwcm9wZXJ0eVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGRpdi5zdHlsZVtwcm9wc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2xpZGVyLmNzc1ByZWZpeCA9IHByb3BzW2ldLnJlcGxhY2UoJ1BlcnNwZWN0aXZlJywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBzbGlkZXIuYW5pbVByb3AgPSAnLScgKyBzbGlkZXIuY3NzUHJlZml4ICsgJy10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0oKSk7XG4gICAgICAvLyBpZiB2ZXJ0aWNhbCBtb2RlIGFsd2F5cyBtYWtlIG1heFNsaWRlcyBhbmQgbWluU2xpZGVzIGVxdWFsXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHsgc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyA9IHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7IH1cbiAgICAgIC8vIHNhdmUgb3JpZ2luYWwgc3R5bGUgZGF0YVxuICAgICAgZWwuZGF0YSgnb3JpZ1N0eWxlJywgZWwuYXR0cignc3R5bGUnKSk7XG4gICAgICBlbC5jaGlsZHJlbihzbGlkZXIuc2V0dGluZ3Muc2xpZGVTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdvcmlnU3R5bGUnLCAkKHRoaXMpLmF0dHIoJ3N0eWxlJykpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHBlcmZvcm0gYWxsIERPTSAvIENTUyBtb2RpZmljYXRpb25zXG4gICAgICBzZXR1cCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbGwgRE9NIGFuZCBDU1MgbW9kaWZpY2F0aW9uc1xuICAgICAqL1xuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHByZWxvYWRTZWxlY3RvciA9IHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuc2V0dGluZ3Muc3RhcnRTbGlkZSk7IC8vIHNldCB0aGUgZGVmYXVsdCBwcmVsb2FkIHNlbGVjdG9yICh2aXNpYmxlKVxuXG4gICAgICAvLyB3cmFwIGVsIGluIGEgd3JhcHBlclxuICAgICAgZWwud3JhcCgnPGRpdiBjbGFzcz1cIicgKyBzbGlkZXIuc2V0dGluZ3Mud3JhcHBlckNsYXNzICsgJ1wiPjxkaXYgY2xhc3M9XCJieC12aWV3cG9ydFwiPjwvZGl2PjwvZGl2PicpO1xuICAgICAgLy8gc3RvcmUgYSBuYW1lc3BhY2UgcmVmZXJlbmNlIHRvIC5ieC12aWV3cG9ydFxuICAgICAgc2xpZGVyLnZpZXdwb3J0ID0gZWwucGFyZW50KCk7XG5cbiAgICAgIC8vIGFkZCBhcmlhLWxpdmUgaWYgdGhlIHNldHRpbmcgaXMgZW5hYmxlZCBhbmQgdGlja2VyIG1vZGUgaXMgZGlzYWJsZWRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXJpYUxpdmUgJiYgIXNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHtcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmF0dHIoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBhIGxvYWRpbmcgZGl2IHRvIGRpc3BsYXkgd2hpbGUgaW1hZ2VzIGFyZSBsb2FkaW5nXG4gICAgICBzbGlkZXIubG9hZGVyID0gJCgnPGRpdiBjbGFzcz1cImJ4LWxvYWRpbmdcIiAvPicpO1xuICAgICAgc2xpZGVyLnZpZXdwb3J0LnByZXBlbmQoc2xpZGVyLmxvYWRlcik7XG4gICAgICAvLyBzZXQgZWwgdG8gYSBtYXNzaXZlIHdpZHRoLCB0byBob2xkIGFueSBuZWVkZWQgc2xpZGVzXG4gICAgICAvLyBhbHNvIHN0cmlwIGFueSBtYXJnaW4gYW5kIHBhZGRpbmcgZnJvbSBlbFxuICAgICAgZWwuY3NzKHtcbiAgICAgICAgd2lkdGg6IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAqIDEwMDAgKyAyMTUpICsgJyUnIDogJ2F1dG8nLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgfSk7XG4gICAgICAvLyBpZiB1c2luZyBDU1MsIGFkZCB0aGUgZWFzaW5nIHByb3BlcnR5XG4gICAgICBpZiAoc2xpZGVyLnVzaW5nQ1NTICYmIHNsaWRlci5zZXR0aW5ncy5lYXNpbmcpIHtcbiAgICAgICAgZWwuY3NzKCctJyArIHNsaWRlci5jc3NQcmVmaXggKyAnLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgc2xpZGVyLnNldHRpbmdzLmVhc2luZyk7XG4gICAgICAvLyBpZiBub3QgdXNpbmcgQ1NTIGFuZCBubyBlYXNpbmcgdmFsdWUgd2FzIHN1cHBsaWVkLCB1c2UgdGhlIGRlZmF1bHQgSlMgYW5pbWF0aW9uIGVhc2luZyAoc3dpbmcpXG4gICAgICB9IGVsc2UgaWYgKCFzbGlkZXIuc2V0dGluZ3MuZWFzaW5nKSB7XG4gICAgICAgIHNsaWRlci5zZXR0aW5ncy5lYXNpbmcgPSAnc3dpbmcnO1xuICAgICAgfVxuICAgICAgLy8gbWFrZSBtb2RpZmljYXRpb25zIHRvIHRoZSB2aWV3cG9ydCAoLmJ4LXZpZXdwb3J0KVxuICAgICAgc2xpZGVyLnZpZXdwb3J0LmNzcyh7XG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgIH0pO1xuICAgICAgc2xpZGVyLnZpZXdwb3J0LnBhcmVudCgpLmNzcyh7XG4gICAgICAgIG1heFdpZHRoOiBnZXRWaWV3cG9ydE1heFdpZHRoKClcbiAgICAgIH0pO1xuICAgICAgLy8gbWFrZSBtb2RpZmljYXRpb24gdG8gdGhlIHdyYXBwZXIgKC5ieC13cmFwcGVyKVxuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MucGFnZXIgJiYgIXNsaWRlci5zZXR0aW5ncy5jb250cm9scykge1xuICAgICAgICBzbGlkZXIudmlld3BvcnQucGFyZW50KCkuY3NzKHtcbiAgICAgICAgICBtYXJnaW46ICcwIGF1dG8gMHB4J1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIGFwcGx5IGNzcyB0byBhbGwgc2xpZGVyIGNoaWxkcmVuXG4gICAgICBzbGlkZXIuY2hpbGRyZW4uY3NzKHtcbiAgICAgICAgZmxvYXQ6IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAnbGVmdCcgOiAnbm9uZScsXG4gICAgICAgIGxpc3RTdHlsZTogJ25vbmUnLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgfSk7XG4gICAgICAvLyBhcHBseSB0aGUgY2FsY3VsYXRlZCB3aWR0aCBhZnRlciB0aGUgZmxvYXQgaXMgYXBwbGllZCB0byBwcmV2ZW50IHNjcm9sbGJhciBpbnRlcmZlcmVuY2VcbiAgICAgIHNsaWRlci5jaGlsZHJlbi5jc3MoJ3dpZHRoJywgZ2V0U2xpZGVXaWR0aCgpKTtcbiAgICAgIC8vIGlmIHNsaWRlTWFyZ2luIGlzIHN1cHBsaWVkLCBhZGQgdGhlIGNzc1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgJiYgc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luID4gMCkgeyBzbGlkZXIuY2hpbGRyZW4uY3NzKCdtYXJnaW5SaWdodCcsIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbik7IH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJyAmJiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4gPiAwKSB7IHNsaWRlci5jaGlsZHJlbi5jc3MoJ21hcmdpbkJvdHRvbScsIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbik7IH1cbiAgICAgIC8vIGlmIFwiZmFkZVwiIG1vZGUsIGFkZCBwb3NpdGlvbmluZyBhbmQgei1pbmRleCBDU1NcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICAgIHNsaWRlci5jaGlsZHJlbi5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHpJbmRleDogMCxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHByZXBhcmUgdGhlIHotaW5kZXggb24gdGhlIHNob3dpbmcgZWxlbWVudFxuICAgICAgICBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUpLmNzcyh7ekluZGV4OiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVaSW5kZXgsIGRpc3BsYXk6ICdibG9jayd9KTtcbiAgICAgIH1cbiAgICAgIC8vIGNyZWF0ZSBhbiBlbGVtZW50IHRvIGNvbnRhaW4gYWxsIHNsaWRlciBjb250cm9scyAocGFnZXIsIHN0YXJ0IC8gc3RvcCwgZXRjKVxuICAgICAgc2xpZGVyLmNvbnRyb2xzLmVsID0gJCgnPGRpdiBjbGFzcz1cImJ4LWNvbnRyb2xzXCIgLz4nKTtcbiAgICAgIC8vIGlmIGNhcHRpb25zIGFyZSByZXF1ZXN0ZWQsIGFkZCB0aGVtXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmNhcHRpb25zKSB7IGFwcGVuZENhcHRpb25zKCk7IH1cbiAgICAgIC8vIGNoZWNrIGlmIHN0YXJ0U2xpZGUgaXMgbGFzdCBzbGlkZVxuICAgICAgc2xpZGVyLmFjdGl2ZS5sYXN0ID0gc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUgPT09IGdldFBhZ2VyUXR5KCkgLSAxO1xuICAgICAgLy8gaWYgdmlkZW8gaXMgdHJ1ZSwgc2V0IHVwIHRoZSBmaXRWaWRzIHBsdWdpblxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy52aWRlbykgeyBlbC5maXRWaWRzKCk7IH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucHJlbG9hZEltYWdlcyA9PT0gJ2FsbCcgfHwgc2xpZGVyLnNldHRpbmdzLnRpY2tlcikgeyBwcmVsb2FkU2VsZWN0b3IgPSBzbGlkZXIuY2hpbGRyZW47IH1cbiAgICAgIC8vIG9ubHkgY2hlY2sgZm9yIGNvbnRyb2wgYWRkaXRpb24gaWYgbm90IGluIFwidGlja2VyXCIgbW9kZVxuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7XG4gICAgICAgIC8vIGlmIGNvbnRyb2xzIGFyZSByZXF1ZXN0ZWQsIGFkZCB0aGVtXG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMpIHsgYXBwZW5kQ29udHJvbHMoKTsgfVxuICAgICAgICAvLyBpZiBhdXRvIGlzIHRydWUsIGFuZCBhdXRvIGNvbnRyb2xzIGFyZSByZXF1ZXN0ZWQsIGFkZCB0aGVtXG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0byAmJiBzbGlkZXIuc2V0dGluZ3MuYXV0b0NvbnRyb2xzKSB7IGFwcGVuZENvbnRyb2xzQXV0bygpOyB9XG4gICAgICAgIC8vIGlmIHBhZ2VyIGlzIHJlcXVlc3RlZCwgYWRkIGl0XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucGFnZXIpIHsgYXBwZW5kUGFnZXIoKTsgfVxuICAgICAgICAvLyBpZiBhbnkgY29udHJvbCBvcHRpb24gaXMgcmVxdWVzdGVkLCBhZGQgdGhlIGNvbnRyb2xzIHdyYXBwZXJcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5jb250cm9scyB8fCBzbGlkZXIuc2V0dGluZ3MuYXV0b0NvbnRyb2xzIHx8IHNsaWRlci5zZXR0aW5ncy5wYWdlcikgeyBzbGlkZXIudmlld3BvcnQuYWZ0ZXIoc2xpZGVyLmNvbnRyb2xzLmVsKTsgfVxuICAgICAgLy8gaWYgdGlja2VyIG1vZGUsIGRvIG5vdCBhbGxvdyBhIHBhZ2VyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIuc2V0dGluZ3MucGFnZXIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGxvYWRFbGVtZW50cyhwcmVsb2FkU2VsZWN0b3IsIHN0YXJ0KTtcbiAgICB9O1xuXG4gICAgdmFyIGxvYWRFbGVtZW50cyA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHRvdGFsID0gc2VsZWN0b3IuZmluZCgnaW1nOm5vdChbc3JjPVwiXCJdKSwgaWZyYW1lJykubGVuZ3RoLFxuICAgICAgY291bnQgPSAwO1xuICAgICAgaWYgKHRvdGFsID09PSAwKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlbGVjdG9yLmZpbmQoJ2ltZzpub3QoW3NyYz1cIlwiXSksIGlmcmFtZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykub25lKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCsrY291bnQgPT09IHRvdGFsKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgfSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5jb21wbGV0ZSkgeyAkKHRoaXMpLmxvYWQoKTsgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCB0aGUgc2xpZGVyXG4gICAgICovXG4gICAgdmFyIHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBpbmZpbml0ZSBsb29wLCBwcmVwYXJlIGFkZGl0aW9uYWwgc2xpZGVzXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCAmJiBzbGlkZXIuc2V0dGluZ3MubW9kZSAhPT0gJ2ZhZGUnICYmICFzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7XG4gICAgICAgIHZhciBzbGljZSAgICA9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnID8gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcyA6IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMsXG4gICAgICAgIHNsaWNlQXBwZW5kICA9IHNsaWRlci5jaGlsZHJlbi5zbGljZSgwLCBzbGljZSkuY2xvbmUodHJ1ZSkuYWRkQ2xhc3MoJ2J4LWNsb25lJyksXG4gICAgICAgIHNsaWNlUHJlcGVuZCA9IHNsaWRlci5jaGlsZHJlbi5zbGljZSgtc2xpY2UpLmNsb25lKHRydWUpLmFkZENsYXNzKCdieC1jbG9uZScpO1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFyaWFIaWRkZW4pIHtcbiAgICAgICAgICBzbGljZUFwcGVuZC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgICAgICAgIHNsaWNlUHJlcGVuZC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsLmFwcGVuZChzbGljZUFwcGVuZCkucHJlcGVuZChzbGljZVByZXBlbmQpO1xuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIHRoZSBsb2FkaW5nIERPTSBlbGVtZW50XG4gICAgICBzbGlkZXIubG9hZGVyLnJlbW92ZSgpO1xuICAgICAgLy8gc2V0IHRoZSBsZWZ0IC8gdG9wIHBvc2l0aW9uIG9mIFwiZWxcIlxuICAgICAgc2V0U2xpZGVQb3NpdGlvbigpO1xuICAgICAgLy8gaWYgXCJ2ZXJ0aWNhbFwiIG1vZGUsIGFsd2F5cyB1c2UgYWRhcHRpdmVIZWlnaHQgdG8gcHJldmVudCBvZGQgYmVoYXZpb3JcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJykgeyBzbGlkZXIuc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgPSB0cnVlOyB9XG4gICAgICAvLyBzZXQgdGhlIHZpZXdwb3J0IGhlaWdodFxuICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChnZXRWaWV3cG9ydEhlaWdodCgpKTtcbiAgICAgIC8vIG1ha2Ugc3VyZSBldmVyeXRoaW5nIGlzIHBvc2l0aW9uZWQganVzdCByaWdodCAoc2FtZSBhcyBhIHdpbmRvdyByZXNpemUpXG4gICAgICBlbC5yZWRyYXdTbGlkZXIoKTtcbiAgICAgIC8vIG9uU2xpZGVyTG9hZCBjYWxsYmFja1xuICAgICAgc2xpZGVyLnNldHRpbmdzLm9uU2xpZGVyTG9hZC5jYWxsKGVsLCBzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICAgIC8vIHNsaWRlciBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZFxuICAgICAgc2xpZGVyLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIC8vIGJpbmQgdGhlIHJlc2l6ZSBjYWxsIHRvIHRoZSB3aW5kb3dcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucmVzcG9uc2l2ZSkgeyAkKHdpbmRvdykuYmluZCgncmVzaXplJywgcmVzaXplV2luZG93KTsgfVxuICAgICAgLy8gaWYgYXV0byBpcyB0cnVlIGFuZCBoYXMgbW9yZSB0aGFuIDEgcGFnZSwgc3RhcnQgdGhlIHNob3dcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0byAmJiBzbGlkZXIuc2V0dGluZ3MuYXV0b1N0YXJ0ICYmIChnZXRQYWdlclF0eSgpID4gMSB8fCBzbGlkZXIuc2V0dGluZ3MuYXV0b1NsaWRlRm9yT25lUGFnZSkpIHsgaW5pdEF1dG8oKTsgfVxuICAgICAgLy8gaWYgdGlja2VyIGlzIHRydWUsIHN0YXJ0IHRoZSB0aWNrZXJcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7IGluaXRUaWNrZXIoKTsgfVxuICAgICAgLy8gaWYgcGFnZXIgaXMgcmVxdWVzdGVkLCBtYWtlIHRoZSBhcHByb3ByaWF0ZSBwYWdlciBsaW5rIGFjdGl2ZVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5wYWdlcikgeyB1cGRhdGVQYWdlckFjdGl2ZShzbGlkZXIuc2V0dGluZ3Muc3RhcnRTbGlkZSk7IH1cbiAgICAgIC8vIGNoZWNrIGZvciBhbnkgdXBkYXRlcyB0byB0aGUgY29udHJvbHMgKGxpa2UgaGlkZUNvbnRyb2xPbkVuZCB1cGRhdGVzKVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5jb250cm9scykgeyB1cGRhdGVEaXJlY3Rpb25Db250cm9scygpOyB9XG4gICAgICAvLyBpZiB0b3VjaEVuYWJsZWQgaXMgdHJ1ZSwgc2V0dXAgdGhlIHRvdWNoIGV2ZW50c1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy50b3VjaEVuYWJsZWQgJiYgIXNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHsgaW5pdFRvdWNoKCk7IH1cbiAgICAgIC8vIGlmIGtleWJvYXJkRW5hYmxlZCBpcyB0cnVlLCBzZXR1cCB0aGUga2V5Ym9hcmQgZXZlbnRzXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmtleWJvYXJkRW5hYmxlZCAmJiAhc2xpZGVyLnNldHRpbmdzLnRpY2tlcikge1xuICAgICAgICAkKGRvY3VtZW50KS5rZXlkb3duKGtleVByZXNzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRlZCBoZWlnaHQgb2YgdGhlIHZpZXdwb3J0LCB1c2VkIHRvIGRldGVybWluZSBlaXRoZXIgYWRhcHRpdmVIZWlnaHQgb3IgdGhlIG1heEhlaWdodCB2YWx1ZVxuICAgICAqL1xuICAgIHZhciBnZXRWaWV3cG9ydEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhlaWdodCA9IDA7XG4gICAgICAvLyBmaXJzdCBkZXRlcm1pbmUgd2hpY2ggY2hpbGRyZW4gKHNsaWRlcykgc2hvdWxkIGJlIHVzZWQgaW4gb3VyIGhlaWdodCBjYWxjdWxhdGlvblxuICAgICAgdmFyIGNoaWxkcmVuID0gJCgpO1xuICAgICAgLy8gaWYgbW9kZSBpcyBub3QgXCJ2ZXJ0aWNhbFwiIGFuZCBhZGFwdGl2ZUhlaWdodCBpcyBmYWxzZSwgaW5jbHVkZSBhbGwgY2hpbGRyZW5cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSAhPT0gJ3ZlcnRpY2FsJyAmJiAhc2xpZGVyLnNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0KSB7XG4gICAgICAgIGNoaWxkcmVuID0gc2xpZGVyLmNoaWxkcmVuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgbm90IGNhcm91c2VsLCByZXR1cm4gdGhlIHNpbmdsZSBhY3RpdmUgY2hpbGRcbiAgICAgICAgaWYgKCFzbGlkZXIuY2Fyb3VzZWwpIHtcbiAgICAgICAgICBjaGlsZHJlbiA9IHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICAgICAgLy8gaWYgY2Fyb3VzZWwsIHJldHVybiBhIHNsaWNlIG9mIGNoaWxkcmVuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBpbmRpdmlkdWFsIHNsaWRlIGluZGV4XG4gICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNsaWRlci5zZXR0aW5ncy5tb3ZlU2xpZGVzID09PSAxID8gc2xpZGVyLmFjdGl2ZS5pbmRleCA6IHNsaWRlci5hY3RpdmUuaW5kZXggKiBnZXRNb3ZlQnkoKTtcbiAgICAgICAgICAvLyBhZGQgdGhlIGN1cnJlbnQgc2xpZGUgdG8gdGhlIGNoaWxkcmVuXG4gICAgICAgICAgY2hpbGRyZW4gPSBzbGlkZXIuY2hpbGRyZW4uZXEoY3VycmVudEluZGV4KTtcbiAgICAgICAgICAvLyBjeWNsZSB0aHJvdWdoIHRoZSByZW1haW5pbmcgXCJzaG93aW5nXCIgc2xpZGVzXG4gICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAvLyBpZiBsb29wZWQgYmFjayB0byB0aGUgc3RhcnRcbiAgICAgICAgICAgIGlmIChjdXJyZW50SW5kZXggKyBpID49IHNsaWRlci5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5hZGQoc2xpZGVyLmNoaWxkcmVuLmVxKGkgLSAxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmFkZChzbGlkZXIuY2hpbGRyZW4uZXEoY3VycmVudEluZGV4ICsgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gaWYgXCJ2ZXJ0aWNhbFwiIG1vZGUsIGNhbGN1bGF0ZSB0aGUgc3VtIG9mIHRoZSBoZWlnaHRzIG9mIHRoZSBjaGlsZHJlblxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIGNoaWxkcmVuLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICBoZWlnaHQgKz0gJCh0aGlzKS5vdXRlckhlaWdodCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYWRkIHVzZXItc3VwcGxpZWQgbWFyZ2luc1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luID4gMCkge1xuICAgICAgICAgIGhlaWdodCArPSBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4gKiAoc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcyAtIDEpO1xuICAgICAgICB9XG4gICAgICAvLyBpZiBub3QgXCJ2ZXJ0aWNhbFwiIG1vZGUsIGNhbGN1bGF0ZSB0aGUgbWF4IGhlaWdodCBvZiB0aGUgY2hpbGRyZW5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlaWdodCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIGNoaWxkcmVuLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlckhlaWdodChmYWxzZSk7XG4gICAgICAgIH0pLmdldCgpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNsaWRlci52aWV3cG9ydC5jc3MoJ2JveC1zaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgIGhlaWdodCArPSBwYXJzZUZsb2F0KHNsaWRlci52aWV3cG9ydC5jc3MoJ3BhZGRpbmctdG9wJykpICsgcGFyc2VGbG9hdChzbGlkZXIudmlld3BvcnQuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSArXG4gICAgICAgICAgICAgIHBhcnNlRmxvYXQoc2xpZGVyLnZpZXdwb3J0LmNzcygnYm9yZGVyLXRvcC13aWR0aCcpKSArIHBhcnNlRmxvYXQoc2xpZGVyLnZpZXdwb3J0LmNzcygnYm9yZGVyLWJvdHRvbS13aWR0aCcpKTtcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnZpZXdwb3J0LmNzcygnYm94LXNpemluZycpID09PSAncGFkZGluZy1ib3gnKSB7XG4gICAgICAgIGhlaWdodCArPSBwYXJzZUZsb2F0KHNsaWRlci52aWV3cG9ydC5jc3MoJ3BhZGRpbmctdG9wJykpICsgcGFyc2VGbG9hdChzbGlkZXIudmlld3BvcnQuY3NzKCdwYWRkaW5nLWJvdHRvbScpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRlZCB3aWR0aCB0byBiZSB1c2VkIGZvciB0aGUgb3V0ZXIgd3JhcHBlciAvIHZpZXdwb3J0XG4gICAgICovXG4gICAgdmFyIGdldFZpZXdwb3J0TWF4V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB3aWR0aCA9ICcxMDAlJztcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCA+IDApIHtcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICB3aWR0aCA9IChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzICogc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGgpICsgKChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzIC0gMSkgKiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZHRoID0gc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRlZCB3aWR0aCB0byBiZSBhcHBsaWVkIHRvIGVhY2ggc2xpZGVcbiAgICAgKi9cbiAgICB2YXIgZ2V0U2xpZGVXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5ld0VsV2lkdGggPSBzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCwgLy8gc3RhcnQgd2l0aCBhbnkgdXNlci1zdXBwbGllZCBzbGlkZSB3aWR0aFxuICAgICAgd3JhcFdpZHRoICAgICAgPSBzbGlkZXIudmlld3BvcnQud2lkdGgoKTsgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHZpZXdwb3J0IHdpZHRoXG4gICAgICAvLyBpZiBzbGlkZSB3aWR0aCB3YXMgbm90IHN1cHBsaWVkLCBvciBpcyBsYXJnZXIgdGhhbiB0aGUgdmlld3BvcnQgdXNlIHRoZSB2aWV3cG9ydCB3aWR0aFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5zbGlkZVdpZHRoID09PSAwIHx8XG4gICAgICAgIChzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCA+IHdyYXBXaWR0aCAmJiAhc2xpZGVyLmNhcm91c2VsKSB8fFxuICAgICAgICBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBuZXdFbFdpZHRoID0gd3JhcFdpZHRoO1xuICAgICAgLy8gaWYgY2Fyb3VzZWwsIHVzZSB0aGUgdGhyZXNob2xkcyB0byBkZXRlcm1pbmUgdGhlIHdpZHRoXG4gICAgICB9IGVsc2UgaWYgKHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgPiAxICYmIHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgaWYgKHdyYXBXaWR0aCA+IHNsaWRlci5tYXhUaHJlc2hvbGQpIHtcbiAgICAgICAgICByZXR1cm4gbmV3RWxXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICh3cmFwV2lkdGggPCBzbGlkZXIubWluVGhyZXNob2xkKSB7XG4gICAgICAgICAgbmV3RWxXaWR0aCA9ICh3cmFwV2lkdGggLSAoc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luICogKHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMgLSAxKSkpIC8gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcztcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuc2V0dGluZ3Muc2hyaW5rSXRlbXMpIHtcbiAgICAgICAgICBuZXdFbFdpZHRoID0gTWF0aC5mbG9vcigod3JhcFdpZHRoICsgc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luKSAvIChNYXRoLmNlaWwoKHdyYXBXaWR0aCArIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbikgLyAobmV3RWxXaWR0aCArIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbikpKSAtIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdFbFdpZHRoO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Ygc2xpZGVzIGN1cnJlbnRseSB2aXNpYmxlIGluIHRoZSB2aWV3cG9ydCAoaW5jbHVkZXMgcGFydGlhbGx5IHZpc2libGUgc2xpZGVzKVxuICAgICAqL1xuICAgIHZhciBnZXROdW1iZXJTbGlkZXNTaG93aW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2xpZGVzU2hvd2luZyA9IDEsXG4gICAgICBjaGlsZFdpZHRoID0gbnVsbDtcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnICYmIHNsaWRlci5zZXR0aW5ncy5zbGlkZVdpZHRoID4gMCkge1xuICAgICAgICAvLyBpZiB2aWV3cG9ydCBpcyBzbWFsbGVyIHRoYW4gbWluVGhyZXNob2xkLCByZXR1cm4gbWluU2xpZGVzXG4gICAgICAgIGlmIChzbGlkZXIudmlld3BvcnQud2lkdGgoKSA8IHNsaWRlci5taW5UaHJlc2hvbGQpIHtcbiAgICAgICAgICBzbGlkZXNTaG93aW5nID0gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcztcbiAgICAgICAgLy8gaWYgdmlld3BvcnQgaXMgbGFyZ2VyIHRoYW4gbWF4VGhyZXNob2xkLCByZXR1cm4gbWF4U2xpZGVzXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnZpZXdwb3J0LndpZHRoKCkgPiBzbGlkZXIubWF4VGhyZXNob2xkKSB7XG4gICAgICAgICAgc2xpZGVzU2hvd2luZyA9IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXM7XG4gICAgICAgIC8vIGlmIHZpZXdwb3J0IGlzIGJldHdlZW4gbWluIC8gbWF4IHRocmVzaG9sZHMsIGRpdmlkZSB2aWV3cG9ydCB3aWR0aCBieSBmaXJzdCBjaGlsZCB3aWR0aFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkV2lkdGggPSBzbGlkZXIuY2hpbGRyZW4uZmlyc3QoKS53aWR0aCgpICsgc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luO1xuICAgICAgICAgIHNsaWRlc1Nob3dpbmcgPSBNYXRoLmZsb29yKChzbGlkZXIudmlld3BvcnQud2lkdGgoKSArXG4gICAgICAgICAgICBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pIC8gY2hpbGRXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIC8vIGlmIFwidmVydGljYWxcIiBtb2RlLCBzbGlkZXMgc2hvd2luZyB3aWxsIGFsd2F5cyBiZSBtaW5TbGlkZXNcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc2xpZGVzU2hvd2luZyA9IHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2xpZGVzU2hvd2luZztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHBhZ2VzIChvbmUgZnVsbCB2aWV3cG9ydCBvZiBzbGlkZXMgaXMgb25lIFwicGFnZVwiKVxuICAgICAqL1xuICAgIHZhciBnZXRQYWdlclF0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBhZ2VyUXR5ID0gMCxcbiAgICAgIGJyZWFrUG9pbnQgPSAwLFxuICAgICAgY291bnRlciA9IDA7XG4gICAgICAvLyBpZiBtb3ZlU2xpZGVzIGlzIHNwZWNpZmllZCBieSB0aGUgdXNlclxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb3ZlU2xpZGVzID4gMCkge1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCkge1xuICAgICAgICAgIHBhZ2VyUXR5ID0gTWF0aC5jZWlsKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLyBnZXRNb3ZlQnkoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd2hlbiBicmVha3BvaW50IGdvZXMgYWJvdmUgY2hpbGRyZW4gbGVuZ3RoLCBjb3VudGVyIGlzIHRoZSBudW1iZXIgb2YgcGFnZXNcbiAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIGdldE51bWJlclNsaWRlc1Nob3dpbmcoKTtcbiAgICAgICAgICAgIGNvdW50ZXIgKz0gc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXMgPD0gZ2V0TnVtYmVyU2xpZGVzU2hvd2luZygpID8gc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXMgOiBnZXROdW1iZXJTbGlkZXNTaG93aW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAvLyBpZiBtb3ZlU2xpZGVzIGlzIDAgKGF1dG8pIGRpdmlkZSBjaGlsZHJlbiBsZW5ndGggYnkgc2lkZXMgc2hvd2luZywgdGhlbiByb3VuZCB1cFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZXJRdHkgPSBNYXRoLmNlaWwoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIGdldE51bWJlclNsaWRlc1Nob3dpbmcoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFnZXJRdHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBpbmRpdmlkdWFsIHNsaWRlcyBieSB3aGljaCB0byBzaGlmdCB0aGUgc2xpZGVyXG4gICAgICovXG4gICAgdmFyIGdldE1vdmVCeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgbW92ZVNsaWRlcyB3YXMgc2V0IGJ5IHRoZSB1c2VyIGFuZCBtb3ZlU2xpZGVzIGlzIGxlc3MgdGhhbiBudW1iZXIgb2Ygc2xpZGVzIHNob3dpbmdcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW92ZVNsaWRlcyA+IDAgJiYgc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXMgPD0gZ2V0TnVtYmVyU2xpZGVzU2hvd2luZygpKSB7XG4gICAgICAgIHJldHVybiBzbGlkZXIuc2V0dGluZ3MubW92ZVNsaWRlcztcbiAgICAgIH1cbiAgICAgIC8vIGlmIG1vdmVTbGlkZXMgaXMgMCAoYXV0bylcbiAgICAgIHJldHVybiBnZXROdW1iZXJTbGlkZXNTaG93aW5nKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNsaWRlcidzIChlbCkgbGVmdCBvciB0b3AgcG9zaXRpb25cbiAgICAgKi9cbiAgICB2YXIgc2V0U2xpZGVQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uLCBsYXN0Q2hpbGQsIGxhc3RTaG93aW5nSW5kZXg7XG4gICAgICAvLyBpZiBsYXN0IHNsaWRlLCBub3QgaW5maW5pdGUgbG9vcCwgYW5kIG51bWJlciBvZiBjaGlsZHJlbiBpcyBsYXJnZXIgdGhhbiBzcGVjaWZpZWQgbWF4U2xpZGVzXG4gICAgICBpZiAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCA+IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgJiYgc2xpZGVyLmFjdGl2ZS5sYXN0ICYmICFzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wKSB7XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IGNoaWxkJ3MgcG9zaXRpb25cbiAgICAgICAgICBsYXN0Q2hpbGQgPSBzbGlkZXIuY2hpbGRyZW4ubGFzdCgpO1xuICAgICAgICAgIHBvc2l0aW9uID0gbGFzdENoaWxkLnBvc2l0aW9uKCk7XG4gICAgICAgICAgLy8gc2V0IHRoZSBsZWZ0IHBvc2l0aW9uXG4gICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eSgtKHBvc2l0aW9uLmxlZnQgLSAoc2xpZGVyLnZpZXdwb3J0LndpZHRoKCkgLSBsYXN0Q2hpbGQub3V0ZXJXaWR0aCgpKSksICdyZXNldCcsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IHNob3dpbmcgaW5kZXgncyBwb3NpdGlvblxuICAgICAgICAgIGxhc3RTaG93aW5nSW5kZXggPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcztcbiAgICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5lcShsYXN0U2hvd2luZ0luZGV4KS5wb3NpdGlvbigpO1xuICAgICAgICAgIC8vIHNldCB0aGUgdG9wIHBvc2l0aW9uXG4gICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eSgtcG9zaXRpb24udG9wLCAncmVzZXQnLCAwKTtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgbm90IGxhc3Qgc2xpZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHNob3dpbmcgc2xpZGVcbiAgICAgICAgcG9zaXRpb24gPSBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCAqIGdldE1vdmVCeSgpKS5wb3NpdGlvbigpO1xuICAgICAgICAvLyBjaGVjayBmb3IgbGFzdCBzbGlkZVxuICAgICAgICBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gZ2V0UGFnZXJRdHkoKSAtIDEpIHsgc2xpZGVyLmFjdGl2ZS5sYXN0ID0gdHJ1ZTsgfVxuICAgICAgICAvLyBzZXQgdGhlIHJlc3BlY3RpdmUgcG9zaXRpb25cbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJykgeyBzZXRQb3NpdGlvblByb3BlcnR5KC1wb3NpdGlvbi5sZWZ0LCAncmVzZXQnLCAwKTsgfVxuICAgICAgICAgIGVsc2UgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7IHNldFBvc2l0aW9uUHJvcGVydHkoLXBvc2l0aW9uLnRvcCwgJ3Jlc2V0JywgMCk7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBlbCdzIGFuaW1hdGluZyBwcm9wZXJ0eSBwb3NpdGlvbiAod2hpY2ggaW4gdHVybiB3aWxsIHNvbWV0aW1lcyBhbmltYXRlIGVsKS5cbiAgICAgKiBJZiB1c2luZyBDU1MsIHNldHMgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0eS4gSWYgbm90IHVzaW5nIENTUywgc2V0cyB0aGUgdG9wIC8gbGVmdCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAoaW50KVxuICAgICAqICAtIHRoZSBhbmltYXRpbmcgcHJvcGVydHkncyB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHR5cGUgKHN0cmluZykgJ3NsaWRlJywgJ3Jlc2V0JywgJ3RpY2tlcidcbiAgICAgKiAgLSB0aGUgdHlwZSBvZiBpbnN0YW5jZSBmb3Igd2hpY2ggdGhlIGZ1bmN0aW9uIGlzIGJlaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24gKGludClcbiAgICAgKiAgLSB0aGUgYW1vdW50IG9mIHRpbWUgKGluIG1zKSB0aGUgdHJhbnNpdGlvbiBzaG91bGQgb2NjdXB5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1zIChhcnJheSkgb3B0aW9uYWxcbiAgICAgKiAgLSBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgY29udGFpbmluZyBhbnkgdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBwYXNzZWQgaW5cbiAgICAgKi9cbiAgICB2YXIgc2V0UG9zaXRpb25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHZhbHVlLCB0eXBlLCBkdXJhdGlvbiwgcGFyYW1zKSB7XG4gICAgICB2YXIgYW5pbWF0ZU9iaiwgcHJvcFZhbHVlO1xuICAgICAgLy8gdXNlIENTUyB0cmFuc2Zvcm1cbiAgICAgIGlmIChzbGlkZXIudXNpbmdDU1MpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSB0cmFuc2xhdGUzZCB2YWx1ZVxuICAgICAgICBwcm9wVmFsdWUgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJyA/ICd0cmFuc2xhdGUzZCgwLCAnICsgdmFsdWUgKyAncHgsIDApJyA6ICd0cmFuc2xhdGUzZCgnICsgdmFsdWUgKyAncHgsIDAsIDApJztcbiAgICAgICAgLy8gYWRkIHRoZSBDU1MgdHJhbnNpdGlvbi1kdXJhdGlvblxuICAgICAgICBlbC5jc3MoJy0nICsgc2xpZGVyLmNzc1ByZWZpeCArICctdHJhbnNpdGlvbi1kdXJhdGlvbicsIGR1cmF0aW9uIC8gMTAwMCArICdzJyk7XG4gICAgICAgIGlmICh0eXBlID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgLy8gc2V0IHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAgICAgIGVsLmNzcyhzbGlkZXIuYW5pbVByb3AsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgaWYgKGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICAvLyBiaW5kIGEgY2FsbGJhY2sgbWV0aG9kIC0gZXhlY3V0ZXMgd2hlbiBDU1MgdHJhbnNpdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgIGVsLmJpbmQoJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBNU1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIC8vbWFrZSBzdXJlIGl0J3MgdGhlIGNvcnJlY3Qgb25lXG4gICAgICAgICAgICAgIGlmICghJChlLnRhcmdldCkuaXMoZWwpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICAvLyB1bmJpbmQgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAgIGVsLnVuYmluZCgndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kIE1TVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICB1cGRhdGVBZnRlclNsaWRlVHJhbnNpdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHsgLy9kdXJhdGlvbiA9IDBcbiAgICAgICAgICAgIHVwZGF0ZUFmdGVyU2xpZGVUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyZXNldCcpIHtcbiAgICAgICAgICBlbC5jc3Moc2xpZGVyLmFuaW1Qcm9wLCBwcm9wVmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0aWNrZXInKSB7XG4gICAgICAgICAgLy8gbWFrZSB0aGUgdHJhbnNpdGlvbiB1c2UgJ2xpbmVhcidcbiAgICAgICAgICBlbC5jc3MoJy0nICsgc2xpZGVyLmNzc1ByZWZpeCArICctdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCAnbGluZWFyJyk7XG4gICAgICAgICAgZWwuY3NzKHNsaWRlci5hbmltUHJvcCwgcHJvcFZhbHVlKTtcbiAgICAgICAgICBpZiAoZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGVsLmJpbmQoJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBNU1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgIC8vbWFrZSBzdXJlIGl0J3MgdGhlIGNvcnJlY3Qgb25lXG4gICAgICAgICAgICAgIGlmICghJChlLnRhcmdldCkuaXMoZWwpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICAvLyB1bmJpbmQgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAgIGVsLnVuYmluZCgndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kIE1TVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAvLyByZXNldCB0aGUgcG9zaXRpb25cbiAgICAgICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShwYXJhbXMucmVzZXRWYWx1ZSwgJ3Jlc2V0JywgMCk7XG4gICAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBsb29wIGFnYWluXG4gICAgICAgICAgICAgIHRpY2tlckxvb3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7IC8vZHVyYXRpb24gPSAwXG4gICAgICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHBhcmFtcy5yZXNldFZhbHVlLCAncmVzZXQnLCAwKTtcbiAgICAgICAgICAgIHRpY2tlckxvb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8vIHVzZSBKUyBhbmltYXRlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRlT2JqID0ge307XG4gICAgICAgIGFuaW1hdGVPYmpbc2xpZGVyLmFuaW1Qcm9wXSA9IHZhbHVlO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIGVsLmFuaW1hdGUoYW5pbWF0ZU9iaiwgZHVyYXRpb24sIHNsaWRlci5zZXR0aW5ncy5lYXNpbmcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdXBkYXRlQWZ0ZXJTbGlkZVRyYW5zaXRpb24oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgZWwuY3NzKHNsaWRlci5hbmltUHJvcCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0aWNrZXInKSB7XG4gICAgICAgICAgZWwuYW5pbWF0ZShhbmltYXRlT2JqLCBkdXJhdGlvbiwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShwYXJhbXMucmVzZXRWYWx1ZSwgJ3Jlc2V0JywgMCk7XG4gICAgICAgICAgICAvLyBydW4gdGhlIHJlY3Vyc2l2ZSBsb29wIGFmdGVyIGFuaW1hdGlvblxuICAgICAgICAgICAgdGlja2VyTG9vcCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlcyB0aGUgcGFnZXIgd2l0aCBwcm9wZXIgYW1vdW50IG9mIHBhZ2VzXG4gICAgICovXG4gICAgdmFyIHBvcHVsYXRlUGFnZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYWdlckh0bWwgPSAnJyxcbiAgICAgIGxpbmtDb250ZW50ID0gJycsXG4gICAgICBwYWdlclF0eSA9IGdldFBhZ2VyUXR5KCk7XG4gICAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBwYWdlciBpdGVtXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2VyUXR5OyBpKyspIHtcbiAgICAgICAgbGlua0NvbnRlbnQgPSAnJztcbiAgICAgICAgLy8gaWYgYSBidWlsZFBhZ2VyIGZ1bmN0aW9uIGlzIHN1cHBsaWVkLCB1c2UgaXQgdG8gZ2V0IHBhZ2VyIGxpbmsgdmFsdWUsIGVsc2UgdXNlIGluZGV4ICsgMVxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmJ1aWxkUGFnZXIgJiYgJC5pc0Z1bmN0aW9uKHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyKSB8fCBzbGlkZXIuc2V0dGluZ3MucGFnZXJDdXN0b20pIHtcbiAgICAgICAgICBsaW5rQ29udGVudCA9IHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyKGkpO1xuICAgICAgICAgIHNsaWRlci5wYWdlckVsLmFkZENsYXNzKCdieC1jdXN0b20tcGFnZXInKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaW5rQ29udGVudCA9IGkgKyAxO1xuICAgICAgICAgIHNsaWRlci5wYWdlckVsLmFkZENsYXNzKCdieC1kZWZhdWx0LXBhZ2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFyIGxpbmtDb250ZW50ID0gc2xpZGVyLnNldHRpbmdzLmJ1aWxkUGFnZXIgJiYgJC5pc0Z1bmN0aW9uKHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyKSA/IHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyKGkpIDogaSArIDE7XG4gICAgICAgIC8vIGFkZCB0aGUgbWFya3VwIHRvIHRoZSBzdHJpbmdcbiAgICAgICAgcGFnZXJIdG1sICs9ICc8ZGl2IGNsYXNzPVwiYngtcGFnZXItaXRlbVwiPjxhIGhyZWY9XCJcIiBkYXRhLXNsaWRlLWluZGV4PVwiJyArIGkgKyAnXCIgY2xhc3M9XCJieC1wYWdlci1saW5rXCI+JyArIGxpbmtDb250ZW50ICsgJzwvYT48L2Rpdj4nO1xuICAgICAgfVxuICAgICAgLy8gcG9wdWxhdGUgdGhlIHBhZ2VyIGVsZW1lbnQgd2l0aCBwYWdlciBsaW5rc1xuICAgICAgc2xpZGVyLnBhZ2VyRWwuaHRtbChwYWdlckh0bWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoZSBwYWdlciB0byB0aGUgY29udHJvbHMgZWxlbWVudFxuICAgICAqL1xuICAgIHZhciBhcHBlbmRQYWdlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MucGFnZXJDdXN0b20pIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBwYWdlciBET00gZWxlbWVudFxuICAgICAgICBzbGlkZXIucGFnZXJFbCA9ICQoJzxkaXYgY2xhc3M9XCJieC1wYWdlclwiIC8+Jyk7XG4gICAgICAgIC8vIGlmIGEgcGFnZXIgc2VsZWN0b3Igd2FzIHN1cHBsaWVkLCBwb3B1bGF0ZSBpdCB3aXRoIHRoZSBwYWdlclxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnBhZ2VyU2VsZWN0b3IpIHtcbiAgICAgICAgICAkKHNsaWRlci5zZXR0aW5ncy5wYWdlclNlbGVjdG9yKS5odG1sKHNsaWRlci5wYWdlckVsKTtcbiAgICAgICAgLy8gaWYgbm8gcGFnZXIgc2VsZWN0b3Igd2FzIHN1cHBsaWVkLCBhZGQgaXQgYWZ0ZXIgdGhlIHdyYXBwZXJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMuZWwuYWRkQ2xhc3MoJ2J4LWhhcy1wYWdlcicpLmFwcGVuZChzbGlkZXIucGFnZXJFbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIHBhZ2VyXG4gICAgICAgIHBvcHVsYXRlUGFnZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5wYWdlckVsID0gJChzbGlkZXIuc2V0dGluZ3MucGFnZXJDdXN0b20pO1xuICAgICAgfVxuICAgICAgLy8gYXNzaWduIHRoZSBwYWdlciBjbGljayBiaW5kaW5nXG4gICAgICBzbGlkZXIucGFnZXJFbC5vbignY2xpY2sgdG91Y2hlbmQnLCAnYScsIGNsaWNrUGFnZXJCaW5kKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBwcmV2IC8gbmV4dCBjb250cm9scyB0byB0aGUgY29udHJvbHMgZWxlbWVudFxuICAgICAqL1xuICAgIHZhciBhcHBlbmRDb250cm9scyA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2xpZGVyLmNvbnRyb2xzLm5leHQgPSAkKCc8YSBjbGFzcz1cImJ4LW5leHRcIiBocmVmPVwiXCI+JyArIHNsaWRlci5zZXR0aW5ncy5uZXh0VGV4dCArICc8L2E+Jyk7XG4gICAgICBzbGlkZXIuY29udHJvbHMucHJldiA9ICQoJzxhIGNsYXNzPVwiYngtcHJldlwiIGhyZWY9XCJcIj4nICsgc2xpZGVyLnNldHRpbmdzLnByZXZUZXh0ICsgJzwvYT4nKTtcbiAgICAgIC8vIGJpbmQgY2xpY2sgYWN0aW9ucyB0byB0aGUgY29udHJvbHNcbiAgICAgIHNsaWRlci5jb250cm9scy5uZXh0LmJpbmQoJ2NsaWNrIHRvdWNoZW5kJywgY2xpY2tOZXh0QmluZCk7XG4gICAgICBzbGlkZXIuY29udHJvbHMucHJldi5iaW5kKCdjbGljayB0b3VjaGVuZCcsIGNsaWNrUHJldkJpbmQpO1xuICAgICAgLy8gaWYgbmV4dFNlbGVjdG9yIHdhcyBzdXBwbGllZCwgcG9wdWxhdGUgaXRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubmV4dFNlbGVjdG9yKSB7XG4gICAgICAgICQoc2xpZGVyLnNldHRpbmdzLm5leHRTZWxlY3RvcikuYXBwZW5kKHNsaWRlci5jb250cm9scy5uZXh0KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHByZXZTZWxlY3RvciB3YXMgc3VwcGxpZWQsIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnByZXZTZWxlY3Rvcikge1xuICAgICAgICAkKHNsaWRlci5zZXR0aW5ncy5wcmV2U2VsZWN0b3IpLmFwcGVuZChzbGlkZXIuY29udHJvbHMucHJldik7XG4gICAgICB9XG4gICAgICAvLyBpZiBubyBjdXN0b20gc2VsZWN0b3JzIHdlcmUgc3VwcGxpZWRcbiAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLm5leHRTZWxlY3RvciAmJiAhc2xpZGVyLnNldHRpbmdzLnByZXZTZWxlY3Rvcikge1xuICAgICAgICAvLyBhZGQgdGhlIGNvbnRyb2xzIHRvIHRoZSBET01cbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmRpcmVjdGlvbkVsID0gJCgnPGRpdiBjbGFzcz1cImJ4LWNvbnRyb2xzLWRpcmVjdGlvblwiIC8+Jyk7XG4gICAgICAgIC8vIGFkZCB0aGUgY29udHJvbCBlbGVtZW50cyB0byB0aGUgZGlyZWN0aW9uRWxcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmRpcmVjdGlvbkVsLmFwcGVuZChzbGlkZXIuY29udHJvbHMucHJldikuYXBwZW5kKHNsaWRlci5jb250cm9scy5uZXh0KTtcbiAgICAgICAgLy8gc2xpZGVyLnZpZXdwb3J0LmFwcGVuZChzbGlkZXIuY29udHJvbHMuZGlyZWN0aW9uRWwpO1xuICAgICAgICBzbGlkZXIuY29udHJvbHMuZWwuYWRkQ2xhc3MoJ2J4LWhhcy1jb250cm9scy1kaXJlY3Rpb24nKS5hcHBlbmQoc2xpZGVyLmNvbnRyb2xzLmRpcmVjdGlvbkVsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBzdGFydCAvIHN0b3AgYXV0byBjb250cm9scyB0byB0aGUgY29udHJvbHMgZWxlbWVudFxuICAgICAqL1xuICAgIHZhciBhcHBlbmRDb250cm9sc0F1dG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIHNsaWRlci5jb250cm9scy5zdGFydCA9ICQoJzxkaXYgY2xhc3M9XCJieC1jb250cm9scy1hdXRvLWl0ZW1cIj48YSBjbGFzcz1cImJ4LXN0YXJ0XCIgaHJlZj1cIlwiPicgKyBzbGlkZXIuc2V0dGluZ3Muc3RhcnRUZXh0ICsgJzwvYT48L2Rpdj4nKTtcbiAgICAgIHNsaWRlci5jb250cm9scy5zdG9wID0gJCgnPGRpdiBjbGFzcz1cImJ4LWNvbnRyb2xzLWF1dG8taXRlbVwiPjxhIGNsYXNzPVwiYngtc3RvcFwiIGhyZWY9XCJcIj4nICsgc2xpZGVyLnNldHRpbmdzLnN0b3BUZXh0ICsgJzwvYT48L2Rpdj4nKTtcbiAgICAgIC8vIGFkZCB0aGUgY29udHJvbHMgdG8gdGhlIERPTVxuICAgICAgc2xpZGVyLmNvbnRyb2xzLmF1dG9FbCA9ICQoJzxkaXYgY2xhc3M9XCJieC1jb250cm9scy1hdXRvXCIgLz4nKTtcbiAgICAgIC8vIGJpbmQgY2xpY2sgYWN0aW9ucyB0byB0aGUgY29udHJvbHNcbiAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwub24oJ2NsaWNrJywgJy5ieC1zdGFydCcsIGNsaWNrU3RhcnRCaW5kKTtcbiAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwub24oJ2NsaWNrJywgJy5ieC1zdG9wJywgY2xpY2tTdG9wQmluZCk7XG4gICAgICAvLyBpZiBhdXRvQ29udHJvbHNDb21iaW5lLCBpbnNlcnQgb25seSB0aGUgXCJzdGFydFwiIGNvbnRyb2xcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0b0NvbnRyb2xzQ29tYmluZSkge1xuICAgICAgICBzbGlkZXIuY29udHJvbHMuYXV0b0VsLmFwcGVuZChzbGlkZXIuY29udHJvbHMuc3RhcnQpO1xuICAgICAgLy8gaWYgYXV0b0NvbnRyb2xzQ29tYmluZSBpcyBmYWxzZSwgaW5zZXJ0IGJvdGggY29udHJvbHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwuYXBwZW5kKHNsaWRlci5jb250cm9scy5zdGFydCkuYXBwZW5kKHNsaWRlci5jb250cm9scy5zdG9wKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGF1dG8gY29udHJvbHMgc2VsZWN0b3Igd2FzIHN1cHBsaWVkLCBwb3B1bGF0ZSBpdCB3aXRoIHRoZSBjb250cm9sc1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHNTZWxlY3Rvcikge1xuICAgICAgICAkKHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHNTZWxlY3RvcikuaHRtbChzbGlkZXIuY29udHJvbHMuYXV0b0VsKTtcbiAgICAgIC8vIGlmIGF1dG8gY29udHJvbHMgc2VsZWN0b3Igd2FzIG5vdCBzdXBwbGllZCwgYWRkIGl0IGFmdGVyIHRoZSB3cmFwcGVyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIuY29udHJvbHMuZWwuYWRkQ2xhc3MoJ2J4LWhhcy1jb250cm9scy1hdXRvJykuYXBwZW5kKHNsaWRlci5jb250cm9scy5hdXRvRWwpO1xuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIHRoZSBhdXRvIGNvbnRyb2xzXG4gICAgICB1cGRhdGVBdXRvQ29udHJvbHMoc2xpZGVyLnNldHRpbmdzLmF1dG9TdGFydCA/ICdzdG9wJyA6ICdzdGFydCcpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIGltYWdlIGNhcHRpb25zIHRvIHRoZSBET01cbiAgICAgKi9cbiAgICB2YXIgYXBwZW5kQ2FwdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGN5Y2xlIHRocm91Z2ggZWFjaCBjaGlsZFxuICAgICAgc2xpZGVyLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBpbWFnZSB0aXRsZSBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIHRpdGxlID0gJCh0aGlzKS5maW5kKCdpbWc6Zmlyc3QnKS5hdHRyKCd0aXRsZScpO1xuICAgICAgICAvLyBhcHBlbmQgdGhlIGNhcHRpb25cbiAgICAgICAgaWYgKHRpdGxlICE9PSB1bmRlZmluZWQgJiYgKCcnICsgdGl0bGUpLmxlbmd0aCkge1xuICAgICAgICAgICQodGhpcykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYngtY2FwdGlvblwiPjxzcGFuPicgKyB0aXRsZSArICc8L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBuZXh0IGJpbmRpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIGNsaWNrTmV4dEJpbmQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzLmVsLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7IHJldHVybjsgfVxuICAgICAgLy8gaWYgYXV0byBzaG93IGlzIHJ1bm5pbmcsIHN0b3AgaXRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0byAmJiBzbGlkZXIuc2V0dGluZ3Muc3RvcEF1dG9PbkNsaWNrKSB7IGVsLnN0b3BBdXRvKCk7IH1cbiAgICAgIGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgcHJldiBiaW5kaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBjbGlja1ByZXZCaW5kID0gZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNsaWRlci5jb250cm9scy5lbC5oYXNDbGFzcygnZGlzYWJsZWQnKSkgeyByZXR1cm47IH1cbiAgICAgIC8vIGlmIGF1dG8gc2hvdyBpcyBydW5uaW5nLCBzdG9wIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG8gJiYgc2xpZGVyLnNldHRpbmdzLnN0b3BBdXRvT25DbGljaykgeyBlbC5zdG9wQXV0bygpOyB9XG4gICAgICBlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsaWNrIHN0YXJ0IGJpbmRpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIGNsaWNrU3RhcnRCaW5kID0gZnVuY3Rpb24oZSkge1xuICAgICAgZWwuc3RhcnRBdXRvKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsaWNrIHN0b3AgYmluZGluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIGUgKGV2ZW50KVxuICAgICAqICAtIERPTSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgY2xpY2tTdG9wQmluZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsLnN0b3BBdXRvKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsaWNrIHBhZ2VyIGJpbmRpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIGNsaWNrUGFnZXJCaW5kID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHBhZ2VyTGluaywgcGFnZXJJbmRleDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzbGlkZXIuY29udHJvbHMuZWwuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaWYgYXV0byBzaG93IGlzIHJ1bm5pbmcsIHN0b3AgaXRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0byAgJiYgc2xpZGVyLnNldHRpbmdzLnN0b3BBdXRvT25DbGljaykgeyBlbC5zdG9wQXV0bygpOyB9XG4gICAgICBwYWdlckxpbmsgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICBpZiAocGFnZXJMaW5rLmF0dHIoJ2RhdGEtc2xpZGUtaW5kZXgnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhZ2VySW5kZXggPSBwYXJzZUludChwYWdlckxpbmsuYXR0cignZGF0YS1zbGlkZS1pbmRleCcpKTtcbiAgICAgICAgLy8gaWYgY2xpY2tlZCBwYWdlciBsaW5rIGlzIG5vdCBhY3RpdmUsIGNvbnRpbnVlIHdpdGggdGhlIGdvVG9TbGlkZSBjYWxsXG4gICAgICAgIGlmIChwYWdlckluZGV4ICE9PSBzbGlkZXIuYWN0aXZlLmluZGV4KSB7IGVsLmdvVG9TbGlkZShwYWdlckluZGV4KTsgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwYWdlciBsaW5rcyB3aXRoIGFuIGFjdGl2ZSBjbGFzc1xuICAgICAqXG4gICAgICogQHBhcmFtIHNsaWRlSW5kZXggKGludClcbiAgICAgKiAgLSBpbmRleCBvZiBzbGlkZSB0byBtYWtlIGFjdGl2ZVxuICAgICAqL1xuICAgIHZhciB1cGRhdGVQYWdlckFjdGl2ZSA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgpIHtcbiAgICAgIC8vIGlmIFwic2hvcnRcIiBwYWdlciB0eXBlXG4gICAgICB2YXIgbGVuID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgLy8gbmIgb2YgY2hpbGRyZW5cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucGFnZXJUeXBlID09PSAnc2hvcnQnKSB7XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzID4gMSkge1xuICAgICAgICAgIGxlbiA9IE1hdGguY2VpbChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVyLnBhZ2VyRWwuaHRtbCgoc2xpZGVJbmRleCArIDEpICsgc2xpZGVyLnNldHRpbmdzLnBhZ2VyU2hvcnRTZXBhcmF0b3IgKyBsZW4pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgYWxsIHBhZ2VyIGFjdGl2ZSBjbGFzc2VzXG4gICAgICBzbGlkZXIucGFnZXJFbC5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgLy8gYXBwbHkgdGhlIGFjdGl2ZSBjbGFzcyBmb3IgYWxsIHBhZ2Vyc1xuICAgICAgc2xpZGVyLnBhZ2VyRWwuZWFjaChmdW5jdGlvbihpLCBlbCkgeyAkKGVsKS5maW5kKCdhJykuZXEoc2xpZGVJbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpOyB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgbmVlZGVkIGFjdGlvbnMgYWZ0ZXIgYSBzbGlkZSB0cmFuc2l0aW9uXG4gICAgICovXG4gICAgdmFyIHVwZGF0ZUFmdGVyU2xpZGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBpbmZpbml0ZSBsb29wIGlzIHRydWVcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9ICcnO1xuICAgICAgICAvLyBmaXJzdCBzbGlkZVxuICAgICAgICBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vIHNldCB0aGUgbmV3IHBvc2l0aW9uXG4gICAgICAgICAgcG9zaXRpb24gPSBzbGlkZXIuY2hpbGRyZW4uZXEoMCkucG9zaXRpb24oKTtcbiAgICAgICAgLy8gY2Fyb3VzZWwsIGxhc3Qgc2xpZGVcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuYWN0aXZlLmluZGV4ID09PSBnZXRQYWdlclF0eSgpIC0gMSAmJiBzbGlkZXIuY2Fyb3VzZWwpIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5lcSgoZ2V0UGFnZXJRdHkoKSAtIDEpICogZ2V0TW92ZUJ5KCkpLnBvc2l0aW9uKCk7XG4gICAgICAgIC8vIGxhc3Qgc2xpZGVcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuYWN0aXZlLmluZGV4ID09PSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHBvc2l0aW9uID0gc2xpZGVyLmNoaWxkcmVuLmVxKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxKS5wb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7IHNldFBvc2l0aW9uUHJvcGVydHkoLXBvc2l0aW9uLmxlZnQsICdyZXNldCcsIDApOyB9XG4gICAgICAgICAgZWxzZSBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHsgc2V0UG9zaXRpb25Qcm9wZXJ0eSgtcG9zaXRpb24udG9wLCAncmVzZXQnLCAwKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBkZWNsYXJlIHRoYXQgdGhlIHRyYW5zaXRpb24gaXMgY29tcGxldGVcbiAgICAgIHNsaWRlci53b3JraW5nID0gZmFsc2U7XG4gICAgICAvLyBvblNsaWRlQWZ0ZXIgY2FsbGJhY2tcbiAgICAgIHNsaWRlci5zZXR0aW5ncy5vblNsaWRlQWZ0ZXIuY2FsbChlbCwgc2xpZGVyLmNoaWxkcmVuLmVxKHNsaWRlci5hY3RpdmUuaW5kZXgpLCBzbGlkZXIub2xkSW5kZXgsIHNsaWRlci5hY3RpdmUuaW5kZXgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBhdXRvIGNvbnRyb2xzIHN0YXRlIChlaXRoZXIgYWN0aXZlLCBvciBjb21iaW5lZCBzd2l0Y2gpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhdGUgKHN0cmluZykgXCJzdGFydFwiLCBcInN0b3BcIlxuICAgICAqICAtIHRoZSBuZXcgc3RhdGUgb2YgdGhlIGF1dG8gc2hvd1xuICAgICAqL1xuICAgIHZhciB1cGRhdGVBdXRvQ29udHJvbHMgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgLy8gaWYgYXV0b0NvbnRyb2xzQ29tYmluZSBpcyB0cnVlLCByZXBsYWNlIHRoZSBjdXJyZW50IGNvbnRyb2wgd2l0aCB0aGUgbmV3IHN0YXRlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9sc0NvbWJpbmUpIHtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmF1dG9FbC5odG1sKHNsaWRlci5jb250cm9sc1tzdGF0ZV0pO1xuICAgICAgLy8gaWYgYXV0b0NvbnRyb2xzQ29tYmluZSBpcyBmYWxzZSwgYXBwbHkgdGhlIFwiYWN0aXZlXCIgY2xhc3MgdG8gdGhlIGFwcHJvcHJpYXRlIGNvbnRyb2xcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmF1dG9FbC5maW5kKCdhOm5vdCguYngtJyArIHN0YXRlICsgJyknKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRpcmVjdGlvbiBjb250cm9scyAoY2hlY2tzIGlmIGVpdGhlciBzaG91bGQgYmUgaGlkZGVuKVxuICAgICAqL1xuICAgIHZhciB1cGRhdGVEaXJlY3Rpb25Db250cm9scyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGdldFBhZ2VyUXR5KCkgPT09IDEpIHtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLnByZXYuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5uZXh0LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIGlmICghc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCAmJiBzbGlkZXIuc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCkge1xuICAgICAgICAvLyBpZiBmaXJzdCBzbGlkZVxuICAgICAgICBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICAgIHNsaWRlci5jb250cm9scy5wcmV2LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIHNsaWRlci5jb250cm9scy5uZXh0LnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAvLyBpZiBsYXN0IHNsaWRlXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gZ2V0UGFnZXJRdHkoKSAtIDEpIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMubmV4dC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMucHJldi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgLy8gaWYgYW55IHNsaWRlIGluIHRoZSBtaWRkbGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMucHJldi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMubmV4dC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYXV0byBwcm9jZXNzXG4gICAgICovXG4gICAgdmFyIGluaXRBdXRvID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBhdXRvRGVsYXkgd2FzIHN1cHBsaWVkLCBsYXVuY2ggdGhlIGF1dG8gc2hvdyB1c2luZyBhIHNldFRpbWVvdXQoKSBjYWxsXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9EZWxheSA+IDApIHtcbiAgICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGVsLnN0YXJ0QXV0bywgc2xpZGVyLnNldHRpbmdzLmF1dG9EZWxheSk7XG4gICAgICAvLyBpZiBhdXRvRGVsYXkgd2FzIG5vdCBzdXBwbGllZCwgc3RhcnQgdGhlIGF1dG8gc2hvdyBub3JtYWxseVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3RhcnRBdXRvKCk7XG5cbiAgICAgICAgLy9hZGQgZm9jdXMgYW5kIGJsdXIgZXZlbnRzIHRvIGVuc3VyZSBpdHMgcnVubmluZyBpZiB0aW1lb3V0IGdldHMgcGF1c2VkXG4gICAgICAgICQod2luZG93KS5mb2N1cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC5zdGFydEF1dG8oKTtcbiAgICAgICAgfSkuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC5zdG9wQXV0bygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGF1dG9Ib3ZlciBpcyByZXF1ZXN0ZWRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0b0hvdmVyKSB7XG4gICAgICAgIC8vIG9uIGVsIGhvdmVyXG4gICAgICAgIGVsLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGlmIHRoZSBhdXRvIHNob3cgaXMgY3VycmVudGx5IHBsYXlpbmcgKGhhcyBhbiBhY3RpdmUgaW50ZXJ2YWwpXG4gICAgICAgICAgaWYgKHNsaWRlci5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gc3RvcCB0aGUgYXV0byBzaG93IGFuZCBwYXNzIHRydWUgYXJndW1lbnQgd2hpY2ggd2lsbCBwcmV2ZW50IGNvbnRyb2wgdXBkYXRlXG4gICAgICAgICAgICBlbC5zdG9wQXV0byh0cnVlKTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBhdXRvUGF1c2VkIHZhbHVlIHdoaWNoIHdpbGwgYmUgdXNlZCBieSB0aGUgcmVsYXRpdmUgXCJtb3VzZW91dFwiIGV2ZW50XG4gICAgICAgICAgICBzbGlkZXIuYXV0b1BhdXNlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgYXV0b1BhdXNlZCB2YWx1ZSB3YXMgY3JlYXRlZCBiZSB0aGUgcHJpb3IgXCJtb3VzZW92ZXJcIiBldmVudFxuICAgICAgICAgIGlmIChzbGlkZXIuYXV0b1BhdXNlZCkge1xuICAgICAgICAgICAgLy8gc3RhcnQgdGhlIGF1dG8gc2hvdyBhbmQgcGFzcyB0cnVlIGFyZ3VtZW50IHdoaWNoIHdpbGwgcHJldmVudCBjb250cm9sIHVwZGF0ZVxuICAgICAgICAgICAgZWwuc3RhcnRBdXRvKHRydWUpO1xuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGF1dG9QYXVzZWQgdmFsdWVcbiAgICAgICAgICAgIHNsaWRlci5hdXRvUGF1c2VkID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgdGlja2VyIHByb2Nlc3NcbiAgICAgKi9cbiAgICB2YXIgaW5pdFRpY2tlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0YXJ0UG9zaXRpb24gPSAwLFxuICAgICAgcG9zaXRpb24sIHRyYW5zZm9ybSwgdmFsdWUsIGlkeCwgcmF0aW8sIHByb3BlcnR5LCBuZXdTcGVlZCwgdG90YWxEaW1lbnM7XG4gICAgICAvLyBpZiBhdXRvRGlyZWN0aW9uIGlzIFwibmV4dFwiLCBhcHBlbmQgYSBjbG9uZSBvZiB0aGUgZW50aXJlIHNsaWRlclxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgZWwuYXBwZW5kKHNsaWRlci5jaGlsZHJlbi5jbG9uZSgpLmFkZENsYXNzKCdieC1jbG9uZScpKTtcbiAgICAgIC8vIGlmIGF1dG9EaXJlY3Rpb24gaXMgXCJwcmV2XCIsIHByZXBlbmQgYSBjbG9uZSBvZiB0aGUgZW50aXJlIHNsaWRlciwgYW5kIHNldCB0aGUgbGVmdCBwb3NpdGlvblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucHJlcGVuZChzbGlkZXIuY2hpbGRyZW4uY2xvbmUoKS5hZGRDbGFzcygnYngtY2xvbmUnKSk7XG4gICAgICAgIHBvc2l0aW9uID0gc2xpZGVyLmNoaWxkcmVuLmZpcnN0KCkucG9zaXRpb24oKTtcbiAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAtcG9zaXRpb24ubGVmdCA6IC1wb3NpdGlvbi50b3A7XG4gICAgICB9XG4gICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHN0YXJ0UG9zaXRpb24sICdyZXNldCcsIDApO1xuICAgICAgLy8gZG8gbm90IGFsbG93IGNvbnRyb2xzIGluIHRpY2tlciBtb2RlXG4gICAgICBzbGlkZXIuc2V0dGluZ3MucGFnZXIgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5zZXR0aW5ncy5jb250cm9scyA9IGZhbHNlO1xuICAgICAgc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9scyA9IGZhbHNlO1xuICAgICAgLy8gaWYgYXV0b0hvdmVyIGlzIHJlcXVlc3RlZFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy50aWNrZXJIb3Zlcikge1xuICAgICAgICBpZiAoc2xpZGVyLnVzaW5nQ1NTKSB7XG4gICAgICAgICAgaWR4ID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/IDQgOiA1O1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydC5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IGVsLmNzcygnLScgKyBzbGlkZXIuY3NzUHJlZml4ICsgJy10cmFuc2Zvcm0nKTtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh0cmFuc2Zvcm0uc3BsaXQoJywnKVtpZHhdKTtcbiAgICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkodmFsdWUsICdyZXNldCcsIDApO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG90YWxEaW1lbnMgPSAwO1xuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgdG90YWxEaW1lbnMgKz0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/ICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKSA6ICQodGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgc3BlZWQgcmF0aW8gKHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBuZXcgc3BlZWQgdG8gZmluaXNoIHRoZSBwYXVzZWQgYW5pbWF0aW9uKVxuICAgICAgICAgICAgcmF0aW8gPSBzbGlkZXIuc2V0dGluZ3Muc3BlZWQgLyB0b3RhbERpbWVucztcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm9wZXJ0eSB0byB1c2VcbiAgICAgICAgICAgIHByb3BlcnR5ID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/ICdsZWZ0JyA6ICd0b3AnO1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBuZXcgc3BlZWRcbiAgICAgICAgICAgIG5ld1NwZWVkID0gcmF0aW8gKiAodG90YWxEaW1lbnMgLSAoTWF0aC5hYnMocGFyc2VJbnQodmFsdWUpKSkpO1xuICAgICAgICAgICAgdGlja2VyTG9vcChuZXdTcGVlZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gb24gZWwgaG92ZXJcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbC5zdG9wKCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHRvdGFsIHdpZHRoIG9mIGNoaWxkcmVuICh1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgc3BlZWQgcmF0aW8pXG4gICAgICAgICAgICB0b3RhbERpbWVucyA9IDA7XG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW4uZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICB0b3RhbERpbWVucyArPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpIDogJCh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBzcGVlZCByYXRpbyAodXNlZCB0byBkZXRlcm1pbmUgdGhlIG5ldyBzcGVlZCB0byBmaW5pc2ggdGhlIHBhdXNlZCBhbmltYXRpb24pXG4gICAgICAgICAgICByYXRpbyA9IHNsaWRlci5zZXR0aW5ncy5zcGVlZCAvIHRvdGFsRGltZW5zO1xuICAgICAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHByb3BlcnR5IHRvIHVzZVxuICAgICAgICAgICAgcHJvcGVydHkgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIG5ldyBzcGVlZFxuICAgICAgICAgICAgbmV3U3BlZWQgPSByYXRpbyAqICh0b3RhbERpbWVucyAtIChNYXRoLmFicyhwYXJzZUludChlbC5jc3MocHJvcGVydHkpKSkpKTtcbiAgICAgICAgICAgIHRpY2tlckxvb3AobmV3U3BlZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBzdGFydCB0aGUgdGlja2VyIGxvb3BcbiAgICAgIHRpY2tlckxvb3AoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUnVucyBhIGNvbnRpbnVvdXMgbG9vcCwgbmV3cyB0aWNrZXItc3R5bGVcbiAgICAgKi9cbiAgICB2YXIgdGlja2VyTG9vcCA9IGZ1bmN0aW9uKHJlc3VtZVNwZWVkKSB7XG4gICAgICB2YXIgc3BlZWQgPSByZXN1bWVTcGVlZCA/IHJlc3VtZVNwZWVkIDogc2xpZGVyLnNldHRpbmdzLnNwZWVkLFxuICAgICAgcG9zaXRpb24gPSB7bGVmdDogMCwgdG9wOiAwfSxcbiAgICAgIHJlc2V0ID0ge2xlZnQ6IDAsIHRvcDogMH0sXG4gICAgICBhbmltYXRlUHJvcGVydHksIHJlc2V0VmFsdWUsIHBhcmFtcztcblxuICAgICAgLy8gaWYgXCJuZXh0XCIgYW5pbWF0ZSBsZWZ0IHBvc2l0aW9uIHRvIGxhc3QgY2hpbGQsIHRoZW4gcmVzZXQgbGVmdCB0byAwXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9EaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICBwb3NpdGlvbiA9IGVsLmZpbmQoJy5ieC1jbG9uZScpLmZpcnN0KCkucG9zaXRpb24oKTtcbiAgICAgIC8vIGlmIFwicHJldlwiIGFuaW1hdGUgbGVmdCBwb3NpdGlvbiB0byAwLCB0aGVuIHJlc2V0IGxlZnQgdG8gZmlyc3Qgbm9uLWNsb25lIGNoaWxkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNldCA9IHNsaWRlci5jaGlsZHJlbi5maXJzdCgpLnBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgICBhbmltYXRlUHJvcGVydHkgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gLXBvc2l0aW9uLmxlZnQgOiAtcG9zaXRpb24udG9wO1xuICAgICAgcmVzZXRWYWx1ZSA9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAtcmVzZXQubGVmdCA6IC1yZXNldC50b3A7XG4gICAgICBwYXJhbXMgPSB7cmVzZXRWYWx1ZTogcmVzZXRWYWx1ZX07XG4gICAgICBzZXRQb3NpdGlvblByb3BlcnR5KGFuaW1hdGVQcm9wZXJ0eSwgJ3RpY2tlcicsIHNwZWVkLCBwYXJhbXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBlbCBpcyBvbiBzY3JlZW5cbiAgICAgKi9cbiAgICB2YXIgaXNPblNjcmVlbiA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgd2luID0gJCh3aW5kb3cpLFxuICAgICAgdmlld3BvcnQgPSB7XG4gICAgICAgIHRvcDogd2luLnNjcm9sbFRvcCgpLFxuICAgICAgICBsZWZ0OiB3aW4uc2Nyb2xsTGVmdCgpXG4gICAgICB9LFxuICAgICAgYm91bmRzID0gZWwub2Zmc2V0KCk7XG5cbiAgICAgIHZpZXdwb3J0LnJpZ2h0ID0gdmlld3BvcnQubGVmdCArIHdpbi53aWR0aCgpO1xuICAgICAgdmlld3BvcnQuYm90dG9tID0gdmlld3BvcnQudG9wICsgd2luLmhlaWdodCgpO1xuICAgICAgYm91bmRzLnJpZ2h0ID0gYm91bmRzLmxlZnQgKyBlbC5vdXRlcldpZHRoKCk7XG4gICAgICBib3VuZHMuYm90dG9tID0gYm91bmRzLnRvcCArIGVsLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgIHJldHVybiAoISh2aWV3cG9ydC5yaWdodCA8IGJvdW5kcy5sZWZ0IHx8IHZpZXdwb3J0LmxlZnQgPiBib3VuZHMucmlnaHQgfHwgdmlld3BvcnQuYm90dG9tIDwgYm91bmRzLnRvcCB8fCB2aWV3cG9ydC50b3AgPiBib3VuZHMuYm90dG9tKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGtleWJvYXJkIGV2ZW50c1xuICAgICAqL1xuICAgIHZhciBrZXlQcmVzcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBhY3RpdmVFbGVtZW50VGFnID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICB0YWdGaWx0ZXJzID0gJ2lucHV0fHRleHRhcmVhJyxcbiAgICAgIHAgPSBuZXcgUmVnRXhwKGFjdGl2ZUVsZW1lbnRUYWcsWydpJ10pLFxuICAgICAgcmVzdWx0ID0gcC5leGVjKHRhZ0ZpbHRlcnMpO1xuXG4gICAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgaXNPblNjcmVlbihlbCkpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgICBjbGlja05leHRCaW5kKGUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgICAgY2xpY2tQcmV2QmluZChlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdG91Y2ggZXZlbnRzXG4gICAgICovXG4gICAgdmFyIGluaXRUb3VjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaW5pdGlhbGl6ZSBvYmplY3QgdG8gY29udGFpbiBhbGwgdG91Y2ggdmFsdWVzXG4gICAgICBzbGlkZXIudG91Y2ggPSB7XG4gICAgICAgIHN0YXJ0OiB7eDogMCwgeTogMH0sXG4gICAgICAgIGVuZDoge3g6IDAsIHk6IDB9XG4gICAgICB9O1xuICAgICAgc2xpZGVyLnZpZXdwb3J0LmJpbmQoJ3RvdWNoc3RhcnQgTVNQb2ludGVyRG93biBwb2ludGVyZG93bicsIG9uVG91Y2hTdGFydCk7XG5cbiAgICAgIC8vZm9yIGJyb3dzZXJzIHRoYXQgaGF2ZSBpbXBsZW1lbnRlZCBwb2ludGVyIGV2ZW50cyBhbmQgZmlyZSBhIGNsaWNrIGFmdGVyXG4gICAgICAvL2V2ZXJ5IHBvaW50ZXJ1cCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgcG9pbnRlcnVwIGlzIG9uIHNhbWUgc2NyZWVuIGxvY2F0aW9uIGFzIHBvaW50ZXJkb3duIG9yIG5vdFxuICAgICAgc2xpZGVyLnZpZXdwb3J0Lm9uKCdjbGljaycsICcuYnhzbGlkZXIgYScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHNsaWRlci52aWV3cG9ydC5oYXNDbGFzcygnY2xpY2stZGlzYWJsZWQnKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQucmVtb3ZlQ2xhc3MoJ2NsaWNrLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBcInRvdWNoc3RhcnRcIlxuICAgICAqXG4gICAgICogQHBhcmFtIGUgKGV2ZW50KVxuICAgICAqICAtIERPTSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgb25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy9kaXNhYmxlIHNsaWRlciBjb250cm9scyB3aGlsZSB1c2VyIGlzIGludGVyYWN0aW5nIHdpdGggc2xpZGVzIHRvIGF2b2lkIHNsaWRlciBmcmVlemUgdGhhdCBoYXBwZW5zIG9uIHRvdWNoIGRldmljZXMgd2hlbiBhIHNsaWRlIHN3aXBlIGhhcHBlbnMgaW1tZWRpYXRlbHkgYWZ0ZXIgaW50ZXJhY3Rpbmcgd2l0aCBzbGlkZXIgY29udHJvbHNcbiAgICAgIHNsaWRlci5jb250cm9scy5lbC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgICAgaWYgKHNsaWRlci53b3JraW5nKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmVsLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVjb3JkIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiB3aGVuIHRvdWNoIHN0YXJ0c1xuICAgICAgICBzbGlkZXIudG91Y2gub3JpZ2luYWxQb3MgPSBlbC5wb3NpdGlvbigpO1xuICAgICAgICB2YXIgb3JpZyA9IGUub3JpZ2luYWxFdmVudCxcbiAgICAgICAgdG91Y2hQb2ludHMgPSAodHlwZW9mIG9yaWcuY2hhbmdlZFRvdWNoZXMgIT09ICd1bmRlZmluZWQnKSA/IG9yaWcuY2hhbmdlZFRvdWNoZXMgOiBbb3JpZ107XG4gICAgICAgIC8vIHJlY29yZCB0aGUgc3RhcnRpbmcgdG91Y2ggeCwgeSBjb29yZGluYXRlc1xuICAgICAgICBzbGlkZXIudG91Y2guc3RhcnQueCA9IHRvdWNoUG9pbnRzWzBdLnBhZ2VYO1xuICAgICAgICBzbGlkZXIudG91Y2guc3RhcnQueSA9IHRvdWNoUG9pbnRzWzBdLnBhZ2VZO1xuXG4gICAgICAgIGlmIChzbGlkZXIudmlld3BvcnQuZ2V0KDApLnNldFBvaW50ZXJDYXB0dXJlKSB7XG4gICAgICAgICAgc2xpZGVyLnBvaW50ZXJJZCA9IG9yaWcucG9pbnRlcklkO1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydC5nZXQoMCkuc2V0UG9pbnRlckNhcHR1cmUoc2xpZGVyLnBvaW50ZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYmluZCBhIFwidG91Y2htb3ZlXCIgZXZlbnQgdG8gdGhlIHZpZXdwb3J0XG4gICAgICAgIHNsaWRlci52aWV3cG9ydC5iaW5kKCd0b3VjaG1vdmUgTVNQb2ludGVyTW92ZSBwb2ludGVybW92ZScsIG9uVG91Y2hNb3ZlKTtcbiAgICAgICAgLy8gYmluZCBhIFwidG91Y2hlbmRcIiBldmVudCB0byB0aGUgdmlld3BvcnRcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmJpbmQoJ3RvdWNoZW5kIE1TUG9pbnRlclVwIHBvaW50ZXJ1cCcsIG9uVG91Y2hFbmQpO1xuICAgICAgICBzbGlkZXIudmlld3BvcnQuYmluZCgnTVNQb2ludGVyQ2FuY2VsIHBvaW50ZXJjYW5jZWwnLCBvblBvaW50ZXJDYW5jZWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWwgUG9pbnRlciBmb3IgV2luZG93cyBQaG9uZVxuICAgICAqXG4gICAgICogQHBhcmFtIGUgKGV2ZW50KVxuICAgICAqICAtIERPTSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgb25Qb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oZSkge1xuICAgICAgLyogb25Qb2ludGVyQ2FuY2VsIGhhbmRsZXIgaXMgbmVlZGVkIHRvIGRlYWwgd2l0aCBzaXR1YXRpb25zIHdoZW4gYSB0b3VjaGVuZFxuICAgICAgZG9lc24ndCBmaXJlIGFmdGVyIGEgdG91Y2hzdGFydCAodGhpcyBoYXBwZW5zIG9uIHdpbmRvd3MgcGhvbmVzIG9ubHkpICovXG4gICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHNsaWRlci50b3VjaC5vcmlnaW5hbFBvcy5sZWZ0LCAncmVzZXQnLCAwKTtcblxuICAgICAgLy9yZW1vdmUgaGFuZGxlcnNcbiAgICAgIHNsaWRlci5jb250cm9scy5lbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC51bmJpbmQoJ01TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsJywgb25Qb2ludGVyQ2FuY2VsKTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC51bmJpbmQoJ3RvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgc2xpZGVyLnZpZXdwb3J0LnVuYmluZCgndG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwJywgb25Ub3VjaEVuZCk7XG4gICAgICBpZiAoc2xpZGVyLnZpZXdwb3J0LmdldCgwKS5yZWxlYXNlUG9pbnRlckNhcHR1cmUpIHtcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmdldCgwKS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoc2xpZGVyLnBvaW50ZXJJZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIFwidG91Y2htb3ZlXCJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIG9uVG91Y2hNb3ZlID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIG9yaWcgPSBlLm9yaWdpbmFsRXZlbnQsXG4gICAgICB0b3VjaFBvaW50cyA9ICh0eXBlb2Ygb3JpZy5jaGFuZ2VkVG91Y2hlcyAhPT0gJ3VuZGVmaW5lZCcpID8gb3JpZy5jaGFuZ2VkVG91Y2hlcyA6IFtvcmlnXSxcbiAgICAgIC8vIGlmIHNjcm9sbGluZyBvbiB5IGF4aXMsIGRvIG5vdCBwcmV2ZW50IGRlZmF1bHRcbiAgICAgIHhNb3ZlbWVudCA9IE1hdGguYWJzKHRvdWNoUG9pbnRzWzBdLnBhZ2VYIC0gc2xpZGVyLnRvdWNoLnN0YXJ0LngpLFxuICAgICAgeU1vdmVtZW50ID0gTWF0aC5hYnModG91Y2hQb2ludHNbMF0ucGFnZVkgLSBzbGlkZXIudG91Y2guc3RhcnQueSksXG4gICAgICB2YWx1ZSA9IDAsXG4gICAgICBjaGFuZ2UgPSAwO1xuXG4gICAgICAvLyB4IGF4aXMgc3dpcGVcbiAgICAgIGlmICgoeE1vdmVtZW50ICogMykgPiB5TW92ZW1lbnQgJiYgc2xpZGVyLnNldHRpbmdzLnByZXZlbnREZWZhdWx0U3dpcGVYKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIHkgYXhpcyBzd2lwZVxuICAgICAgfSBlbHNlIGlmICgoeU1vdmVtZW50ICogMykgPiB4TW92ZW1lbnQgJiYgc2xpZGVyLnNldHRpbmdzLnByZXZlbnREZWZhdWx0U3dpcGVZKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSAhPT0gJ2ZhZGUnICYmIHNsaWRlci5zZXR0aW5ncy5vbmVUb09uZVRvdWNoKSB7XG4gICAgICAgIC8vIGlmIGhvcml6b250YWwsIGRyYWcgYWxvbmcgeCBheGlzXG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgY2hhbmdlID0gdG91Y2hQb2ludHNbMF0ucGFnZVggLSBzbGlkZXIudG91Y2guc3RhcnQueDtcbiAgICAgICAgICB2YWx1ZSA9IHNsaWRlci50b3VjaC5vcmlnaW5hbFBvcy5sZWZ0ICsgY2hhbmdlO1xuICAgICAgICAvLyBpZiB2ZXJ0aWNhbCwgZHJhZyBhbG9uZyB5IGF4aXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGFuZ2UgPSB0b3VjaFBvaW50c1swXS5wYWdlWSAtIHNsaWRlci50b3VjaC5zdGFydC55O1xuICAgICAgICAgIHZhbHVlID0gc2xpZGVyLnRvdWNoLm9yaWdpbmFsUG9zLnRvcCArIGNoYW5nZTtcbiAgICAgICAgfVxuICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHZhbHVlLCAncmVzZXQnLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgXCJ0b3VjaGVuZFwiXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBvblRvdWNoRW5kID0gZnVuY3Rpb24oZSkge1xuICAgICAgc2xpZGVyLnZpZXdwb3J0LnVuYmluZCgndG91Y2htb3ZlIE1TUG9pbnRlck1vdmUgcG9pbnRlcm1vdmUnLCBvblRvdWNoTW92ZSk7XG4gICAgICAvL2VuYWJsZSBzbGlkZXIgY29udHJvbHMgYXMgc29vbiBhcyB1c2VyIHN0b3BzIGludGVyYWNpbmcgd2l0aCBzbGlkZXNcbiAgICAgIHNsaWRlci5jb250cm9scy5lbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIHZhciBvcmlnICAgID0gZS5vcmlnaW5hbEV2ZW50LFxuICAgICAgdG91Y2hQb2ludHMgPSAodHlwZW9mIG9yaWcuY2hhbmdlZFRvdWNoZXMgIT09ICd1bmRlZmluZWQnKSA/IG9yaWcuY2hhbmdlZFRvdWNoZXMgOiBbb3JpZ10sXG4gICAgICB2YWx1ZSAgICAgICA9IDAsXG4gICAgICBkaXN0YW5jZSAgICA9IDA7XG4gICAgICAvLyByZWNvcmQgZW5kIHgsIHkgcG9zaXRpb25zXG4gICAgICBzbGlkZXIudG91Y2guZW5kLnggPSB0b3VjaFBvaW50c1swXS5wYWdlWDtcbiAgICAgIHNsaWRlci50b3VjaC5lbmQueSA9IHRvdWNoUG9pbnRzWzBdLnBhZ2VZO1xuICAgICAgLy8gaWYgZmFkZSBtb2RlLCBjaGVjayBpZiBhYnNvbHV0ZSB4IGRpc3RhbmNlIGNsZWFycyB0aGUgdGhyZXNob2xkXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKHNsaWRlci50b3VjaC5zdGFydC54IC0gc2xpZGVyLnRvdWNoLmVuZC54KTtcbiAgICAgICAgaWYgKGRpc3RhbmNlID49IHNsaWRlci5zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgIGlmIChzbGlkZXIudG91Y2guc3RhcnQueCA+IHNsaWRlci50b3VjaC5lbmQueCkge1xuICAgICAgICAgICAgZWwuZ29Ub05leHRTbGlkZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnN0b3BBdXRvKCk7XG4gICAgICAgIH1cbiAgICAgIC8vIG5vdCBmYWRlIG1vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNhbGN1bGF0ZSBkaXN0YW5jZSBhbmQgZWwncyBhbmltYXRlIHByb3BlcnR5XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgZGlzdGFuY2UgPSBzbGlkZXIudG91Y2guZW5kLnggLSBzbGlkZXIudG91Y2guc3RhcnQueDtcbiAgICAgICAgICB2YWx1ZSA9IHNsaWRlci50b3VjaC5vcmlnaW5hbFBvcy5sZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpc3RhbmNlID0gc2xpZGVyLnRvdWNoLmVuZC55IC0gc2xpZGVyLnRvdWNoLnN0YXJ0Lnk7XG4gICAgICAgICAgdmFsdWUgPSBzbGlkZXIudG91Y2gub3JpZ2luYWxQb3MudG9wO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIG5vdCBpbmZpbml0ZSBsb29wIGFuZCBmaXJzdCAvIGxhc3Qgc2xpZGUsIGRvIG5vdCBhdHRlbXB0IGEgc2xpZGUgdHJhbnNpdGlvblxuICAgICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3AgJiYgKChzbGlkZXIuYWN0aXZlLmluZGV4ID09PSAwICYmIGRpc3RhbmNlID4gMCkgfHwgKHNsaWRlci5hY3RpdmUubGFzdCAmJiBkaXN0YW5jZSA8IDApKSkge1xuICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkodmFsdWUsICdyZXNldCcsIDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2hlY2sgaWYgZGlzdGFuY2UgY2xlYXJzIHRocmVzaG9sZFxuICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPj0gc2xpZGVyLnNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICAgICAgICAgIGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLmdvVG9QcmV2U2xpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLnN0b3BBdXRvKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVsLmFuaW1hdGUocHJvcGVydHksIDIwMCk7XG4gICAgICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHZhbHVlLCAncmVzZXQnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2xpZGVyLnZpZXdwb3J0LnVuYmluZCgndG91Y2hlbmQgTVNQb2ludGVyVXAgcG9pbnRlcnVwJywgb25Ub3VjaEVuZCk7XG4gICAgICBpZiAoc2xpZGVyLnZpZXdwb3J0LmdldCgwKS5yZWxlYXNlUG9pbnRlckNhcHR1cmUpIHtcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmdldCgwKS5yZWxlYXNlUG9pbnRlckNhcHR1cmUoc2xpZGVyLnBvaW50ZXJJZCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFdpbmRvdyByZXNpemUgZXZlbnQgY2FsbGJhY2tcbiAgICAgKi9cbiAgICB2YXIgcmVzaXplV2luZG93ID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gZG9uJ3QgZG8gYW55dGhpbmcgaWYgc2xpZGVyIGlzbid0IGluaXRpYWxpemVkLlxuICAgICAgaWYgKCFzbGlkZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBEZWxheSBpZiBzbGlkZXIgd29ya2luZy5cbiAgICAgIGlmIChzbGlkZXIud29ya2luZykge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChyZXNpemVXaW5kb3csIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdldCB0aGUgbmV3IHdpbmRvdyBkaW1lbnMgKGFnYWluLCB0aGFuayB5b3UgSUUpXG4gICAgICAgIHZhciB3aW5kb3dXaWR0aE5ldyA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICB3aW5kb3dIZWlnaHROZXcgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGl0IGlzIGEgdHJ1ZSB3aW5kb3cgcmVzaXplXG4gICAgICAgIC8vICp3ZSBtdXN0IGNoZWNrIHRoaXMgYmVjYXVzZSBvdXIgZGlub3NhdXIgZnJpZW5kIElFIGZpcmVzIGEgd2luZG93IHJlc2l6ZSBldmVudCB3aGVuIGNlcnRhaW4gRE9NIGVsZW1lbnRzXG4gICAgICAgIC8vIGFyZSByZXNpemVkLiBDYW4geW91IGp1c3QgZGllIGFscmVhZHk/KlxuICAgICAgICBpZiAod2luZG93V2lkdGggIT09IHdpbmRvd1dpZHRoTmV3IHx8IHdpbmRvd0hlaWdodCAhPT0gd2luZG93SGVpZ2h0TmV3KSB7XG4gICAgICAgICAgLy8gc2V0IHRoZSBuZXcgd2luZG93IGRpbWVuc1xuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93V2lkdGhOZXc7XG4gICAgICAgICAgd2luZG93SGVpZ2h0ID0gd2luZG93SGVpZ2h0TmV3O1xuICAgICAgICAgIC8vIHVwZGF0ZSBhbGwgZHluYW1pYyBlbGVtZW50c1xuICAgICAgICAgIGVsLnJlZHJhd1NsaWRlcigpO1xuICAgICAgICAgIC8vIENhbGwgdXNlciByZXNpemUgaGFuZGxlclxuICAgICAgICAgIHNsaWRlci5zZXR0aW5ncy5vblNsaWRlclJlc2l6ZS5jYWxsKGVsLCBzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGFyaWEtaGlkZGVuPXRydWUgYXR0cmlidXRlIHRvIGVhY2ggZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXJ0VmlzaWJsZUluZGV4IChpbnQpXG4gICAgICogIC0gdGhlIGZpcnN0IHZpc2libGUgZWxlbWVudCdzIGluZGV4XG4gICAgICovXG4gICAgdmFyIGFwcGx5QXJpYUhpZGRlbkF0dHJpYnV0ZXMgPSBmdW5jdGlvbihzdGFydFZpc2libGVJbmRleCkge1xuICAgICAgdmFyIG51bWJlck9mU2xpZGVzU2hvd2luZyA9IGdldE51bWJlclNsaWRlc1Nob3dpbmcoKTtcbiAgICAgIC8vIG9ubHkgYXBwbHkgYXR0cmlidXRlcyBpZiB0aGUgc2V0dGluZyBpcyBlbmFibGVkIGFuZCBub3QgaW4gdGlja2VyIG1vZGVcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXJpYUhpZGRlbiAmJiAhc2xpZGVyLnNldHRpbmdzLnRpY2tlcikge1xuICAgICAgICAvLyBhZGQgYXJpYS1oaWRkZW49dHJ1ZSB0byBhbGwgZWxlbWVudHNcbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgLy8gZ2V0IHRoZSB2aXNpYmxlIGVsZW1lbnRzIGFuZCBjaGFuZ2UgdG8gYXJpYS1oaWRkZW49ZmFsc2VcbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuLnNsaWNlKHN0YXJ0VmlzaWJsZUluZGV4LCBzdGFydFZpc2libGVJbmRleCArIG51bWJlck9mU2xpZGVzU2hvd2luZykuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBpbmRleCBhY2NvcmRpbmcgdG8gcHJlc2VudCBwYWdlIHJhbmdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2xpZGVPbmRleCAoaW50KVxuICAgICAqICAtIHRoZSBkZXNpcmVkIHNsaWRlIGluZGV4XG4gICAgICovXG4gICAgdmFyIHNldFNsaWRlSW5kZXggPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG4gICAgICBpZiAoc2xpZGVJbmRleCA8IDApIHtcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3ApIHtcbiAgICAgICAgICByZXR1cm4gZ2V0UGFnZXJRdHkoKSAtIDE7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAvL3dlIGRvbid0IGdvIHRvIHVuZGVmaW5lZCBzbGlkZXNcbiAgICAgICAgICByZXR1cm4gc2xpZGVyLmFjdGl2ZS5pbmRleDtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgc2xpZGVJbmRleCBpcyBncmVhdGVyIHRoYW4gY2hpbGRyZW4gbGVuZ3RoLCBzZXQgYWN0aXZlIGluZGV4IHRvIDAgKHRoaXMgaGFwcGVucyBkdXJpbmcgaW5maW5pdGUgbG9vcClcbiAgICAgIH0gZWxzZSBpZiAoc2xpZGVJbmRleCA+PSBnZXRQYWdlclF0eSgpKSB7XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wKSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy93ZSBkb24ndCBtb3ZlIHRvIHVuZGVmaW5lZCBwYWdlc1xuICAgICAgICAgIHJldHVybiBzbGlkZXIuYWN0aXZlLmluZGV4O1xuICAgICAgICB9XG4gICAgICAvLyBzZXQgYWN0aXZlIGluZGV4IHRvIHJlcXVlc3RlZCBzbGlkZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNsaWRlSW5kZXg7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICogPSBQVUJMSUMgRlVOQ1RJT05TXG4gICAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNsaWRlIHRyYW5zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBzbGlkZVxuICAgICAqXG4gICAgICogQHBhcmFtIHNsaWRlSW5kZXggKGludClcbiAgICAgKiAgLSB0aGUgZGVzdGluYXRpb24gc2xpZGUncyBpbmRleCAoemVyby1iYXNlZClcbiAgICAgKlxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gKHN0cmluZylcbiAgICAgKiAgLSBJTlRFUk5BTCBVU0UgT05MWSAtIHRoZSBkaXJlY3Rpb24gb2YgdHJhdmVsIChcInByZXZcIiAvIFwibmV4dFwiKVxuICAgICAqL1xuICAgIGVsLmdvVG9TbGlkZSA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgsIGRpcmVjdGlvbikge1xuICAgICAgLy8gb25TbGlkZUJlZm9yZSwgb25TbGlkZU5leHQsIG9uU2xpZGVQcmV2IGNhbGxiYWNrc1xuICAgICAgLy8gQWxsb3cgdHJhbnNpdGlvbiBjYW5jZWxpbmcgYmFzZWQgb24gcmV0dXJuZWQgdmFsdWVcbiAgICAgIHZhciBwZXJmb3JtVHJhbnNpdGlvbiA9IHRydWUsXG4gICAgICBtb3ZlQnkgPSAwLFxuICAgICAgcG9zaXRpb24gPSB7bGVmdDogMCwgdG9wOiAwfSxcbiAgICAgIGxhc3RDaGlsZCA9IG51bGwsXG4gICAgICBsYXN0U2hvd2luZ0luZGV4LCBlcSwgdmFsdWUsIHJlcXVlc3RFbDtcbiAgICAgIC8vIHN0b3JlIHRoZSBvbGQgaW5kZXhcbiAgICAgIHNsaWRlci5vbGRJbmRleCA9IHNsaWRlci5hY3RpdmUuaW5kZXg7XG4gICAgICAvL3NldCBuZXcgaW5kZXhcbiAgICAgIHNsaWRlci5hY3RpdmUuaW5kZXggPSBzZXRTbGlkZUluZGV4KHNsaWRlSW5kZXgpO1xuXG4gICAgICAvLyBpZiBwbHVnaW4gaXMgY3VycmVudGx5IGluIG1vdGlvbiwgaWdub3JlIHJlcXVlc3RcbiAgICAgIGlmIChzbGlkZXIud29ya2luZyB8fCBzbGlkZXIuYWN0aXZlLmluZGV4ID09PSBzbGlkZXIub2xkSW5kZXgpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBkZWNsYXJlIHRoYXQgcGx1Z2luIGlzIGluIG1vdGlvblxuICAgICAgc2xpZGVyLndvcmtpbmcgPSB0cnVlO1xuXG4gICAgICBwZXJmb3JtVHJhbnNpdGlvbiA9IHNsaWRlci5zZXR0aW5ncy5vblNsaWRlQmVmb3JlLmNhbGwoZWwsIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KSwgc2xpZGVyLm9sZEluZGV4LCBzbGlkZXIuYWN0aXZlLmluZGV4KTtcblxuICAgICAgLy8gSWYgdHJhbnNpdGlvbnMgY2FuY2VsZWQsIHJlc2V0IGFuZCByZXR1cm5cbiAgICAgIGlmICh0eXBlb2YgKHBlcmZvcm1UcmFuc2l0aW9uKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXBlcmZvcm1UcmFuc2l0aW9uKSB7XG4gICAgICAgIHNsaWRlci5hY3RpdmUuaW5kZXggPSBzbGlkZXIub2xkSW5kZXg7IC8vIHJlc3RvcmUgb2xkIGluZGV4XG4gICAgICAgIHNsaWRlci53b3JraW5nID0gZmFsc2U7IC8vIGlzIG5vdCBpbiBtb3Rpb25cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgLy8gUHJldmVudCBjYW5jZWxpbmcgaW4gZnV0dXJlIGZ1bmN0aW9ucyBvciBsYWNrIHRoZXJlLW9mIGZyb20gbmVnYXRpbmcgcHJldmlvdXMgY29tbWFuZHMgdG8gY2FuY2VsXG4gICAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLm9uU2xpZGVOZXh0LmNhbGwoZWwsIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KSwgc2xpZGVyLm9sZEluZGV4LCBzbGlkZXIuYWN0aXZlLmluZGV4KSkge1xuICAgICAgICAgIHBlcmZvcm1UcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgLy8gUHJldmVudCBjYW5jZWxpbmcgaW4gZnV0dXJlIGZ1bmN0aW9ucyBvciBsYWNrIHRoZXJlLW9mIGZyb20gbmVnYXRpbmcgcHJldmlvdXMgY29tbWFuZHMgdG8gY2FuY2VsXG4gICAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLm9uU2xpZGVQcmV2LmNhbGwoZWwsIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KSwgc2xpZGVyLm9sZEluZGV4LCBzbGlkZXIuYWN0aXZlLmluZGV4KSkge1xuICAgICAgICAgIHBlcmZvcm1UcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgbGFzdCBzbGlkZVxuICAgICAgc2xpZGVyLmFjdGl2ZS5sYXN0ID0gc2xpZGVyLmFjdGl2ZS5pbmRleCA+PSBnZXRQYWdlclF0eSgpIC0gMTtcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGFnZXIgd2l0aCBhY3RpdmUgY2xhc3NcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucGFnZXIgfHwgc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKSB7IHVwZGF0ZVBhZ2VyQWN0aXZlKHNsaWRlci5hY3RpdmUuaW5kZXgpOyB9XG4gICAgICAvLyAvLyBjaGVjayBmb3IgZGlyZWN0aW9uIGNvbnRyb2wgdXBkYXRlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmNvbnRyb2xzKSB7IHVwZGF0ZURpcmVjdGlvbkNvbnRyb2xzKCk7IH1cbiAgICAgIC8vIGlmIHNsaWRlciBpcyBzZXQgdG8gbW9kZTogXCJmYWRlXCJcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2ZhZGUnKSB7XG4gICAgICAgIC8vIGlmIGFkYXB0aXZlSGVpZ2h0IGlzIHRydWUgYW5kIG5leHQgaGVpZ2h0IGlzIGRpZmZlcmVudCBmcm9tIGN1cnJlbnQgaGVpZ2h0LCBhbmltYXRlIHRvIHRoZSBuZXcgaGVpZ2h0XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHQgJiYgc2xpZGVyLnZpZXdwb3J0LmhlaWdodCgpICE9PSBnZXRWaWV3cG9ydEhlaWdodCgpKSB7XG4gICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmFuaW1hdGUoe2hlaWdodDogZ2V0Vmlld3BvcnRIZWlnaHQoKX0sIHNsaWRlci5zZXR0aW5ncy5hZGFwdGl2ZUhlaWdodFNwZWVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmYWRlIG91dCB0aGUgdmlzaWJsZSBjaGlsZCBhbmQgcmVzZXQgaXRzIHotaW5kZXggdmFsdWVcbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuLmZpbHRlcignOnZpc2libGUnKS5mYWRlT3V0KHNsaWRlci5zZXR0aW5ncy5zcGVlZCkuY3NzKHt6SW5kZXg6IDB9KTtcbiAgICAgICAgLy8gZmFkZSBpbiB0aGUgbmV3bHkgcmVxdWVzdGVkIHNsaWRlXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KS5jc3MoJ3pJbmRleCcsIHNsaWRlci5zZXR0aW5ncy5zbGlkZVpJbmRleCArIDEpLmZhZGVJbihzbGlkZXIuc2V0dGluZ3Muc3BlZWQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhpcykuY3NzKCd6SW5kZXgnLCBzbGlkZXIuc2V0dGluZ3Muc2xpZGVaSW5kZXgpO1xuICAgICAgICAgIHVwZGF0ZUFmdGVyU2xpZGVUcmFuc2l0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgLy8gc2xpZGVyIG1vZGUgaXMgbm90IFwiZmFkZVwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBhZGFwdGl2ZUhlaWdodCBpcyB0cnVlIGFuZCBuZXh0IGhlaWdodCBpcyBkaWZmZXJlbnQgZnJvbSBjdXJyZW50IGhlaWdodCwgYW5pbWF0ZSB0byB0aGUgbmV3IGhlaWdodFxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ICYmIHNsaWRlci52aWV3cG9ydC5oZWlnaHQoKSAhPT0gZ2V0Vmlld3BvcnRIZWlnaHQoKSkge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydC5hbmltYXRlKHtoZWlnaHQ6IGdldFZpZXdwb3J0SGVpZ2h0KCl9LCBzbGlkZXIuc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHRTcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgY2Fyb3VzZWwgYW5kIG5vdCBpbmZpbml0ZSBsb29wXG4gICAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCAmJiBzbGlkZXIuY2Fyb3VzZWwgJiYgc2xpZGVyLmFjdGl2ZS5sYXN0KSB7XG4gICAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgbGFzdCBjaGlsZCBwb3NpdGlvblxuICAgICAgICAgICAgbGFzdENoaWxkID0gc2xpZGVyLmNoaWxkcmVuLmVxKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gbGFzdENoaWxkLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IHNsaWRlXG4gICAgICAgICAgICBtb3ZlQnkgPSBzbGlkZXIudmlld3BvcnQud2lkdGgoKSAtIGxhc3RDaGlsZC5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGdldCBsYXN0IHNob3dpbmcgaW5kZXggcG9zaXRpb25cbiAgICAgICAgICAgIGxhc3RTaG93aW5nSW5kZXggPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcztcbiAgICAgICAgICAgIHBvc2l0aW9uID0gc2xpZGVyLmNoaWxkcmVuLmVxKGxhc3RTaG93aW5nSW5kZXgpLnBvc2l0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGhvcml6b250YWwgY2Fyb3VzZWwsIGdvaW5nIHByZXZpb3VzIHdoaWxlIG9uIGZpcnN0IHNsaWRlIChpbmZpbml0ZUxvb3AgbW9kZSlcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY2Fyb3VzZWwgJiYgc2xpZGVyLmFjdGl2ZS5sYXN0ICYmIGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IGNoaWxkIHBvc2l0aW9uXG4gICAgICAgICAgZXEgPSBzbGlkZXIuc2V0dGluZ3MubW92ZVNsaWRlcyA9PT0gMSA/IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgLSBnZXRNb3ZlQnkoKSA6ICgoZ2V0UGFnZXJRdHkoKSAtIDEpICogZ2V0TW92ZUJ5KCkpIC0gKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLSBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzKTtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSBlbC5jaGlsZHJlbignLmJ4LWNsb25lJykuZXEoZXEpO1xuICAgICAgICAgIHBvc2l0aW9uID0gbGFzdENoaWxkLnBvc2l0aW9uKCk7XG4gICAgICAgIC8vIGlmIGluZmluaXRlIGxvb3AgYW5kIFwiTmV4dFwiIGlzIGNsaWNrZWQgb24gdGhlIGxhc3Qgc2xpZGVcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICduZXh0JyAmJiBzbGlkZXIuYWN0aXZlLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IGNsb25lIHBvc2l0aW9uXG4gICAgICAgICAgcG9zaXRpb24gPSBlbC5maW5kKCc+IC5ieC1jbG9uZScpLmVxKHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMpLnBvc2l0aW9uKCk7XG4gICAgICAgICAgc2xpZGVyLmFjdGl2ZS5sYXN0ID0gZmFsc2U7XG4gICAgICAgIC8vIG5vcm1hbCBub24temVybyByZXF1ZXN0c1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlSW5kZXggPj0gMCkge1xuICAgICAgICAgIC8vcGFyc2VJbnQgaXMgYXBwbGllZCB0byBhbGxvdyBmbG9hdHMgZm9yIHNsaWRlcy9wYWdlXG4gICAgICAgICAgcmVxdWVzdEVsID0gc2xpZGVJbmRleCAqIHBhcnNlSW50KGdldE1vdmVCeSgpKTtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5lcShyZXF1ZXN0RWwpLnBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJZiB0aGUgcG9zaXRpb24gZG9lc24ndCBleGlzdFxuICAgICAgICAgKiAoZS5nLiBpZiB5b3UgZGVzdHJveSB0aGUgc2xpZGVyIG9uIGEgbmV4dCBjbGljayksXG4gICAgICAgICAqIGl0IGRvZXNuJ3QgdGhyb3cgYW4gZXJyb3IuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIChwb3NpdGlvbikgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmFsdWUgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gLShwb3NpdGlvbi5sZWZ0IC0gbW92ZUJ5KSA6IC1wb3NpdGlvbi50b3A7XG4gICAgICAgICAgLy8gcGx1Z2luIHZhbHVlcyB0byBiZSBhbmltYXRlZFxuICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkodmFsdWUsICdzbGlkZScsIHNsaWRlci5zZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVyLndvcmtpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hcmlhSGlkZGVuKSB7IGFwcGx5QXJpYUhpZGRlbkF0dHJpYnV0ZXMoc2xpZGVyLmFjdGl2ZS5pbmRleCAqIGdldE1vdmVCeSgpKTsgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9ucyB0byB0aGUgbmV4dCBzbGlkZSBpbiB0aGUgc2hvd1xuICAgICAqL1xuICAgIGVsLmdvVG9OZXh0U2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGlmIGluZmluaXRlTG9vcCBpcyBmYWxzZSBhbmQgbGFzdCBwYWdlIGlzIHNob3dpbmcsIGRpc3JlZ2FyZCBjYWxsXG4gICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3AgJiYgc2xpZGVyLmFjdGl2ZS5sYXN0KSB7IHJldHVybjsgfVxuICAgICAgdmFyIHBhZ2VySW5kZXggPSBwYXJzZUludChzbGlkZXIuYWN0aXZlLmluZGV4KSArIDE7XG4gICAgICBlbC5nb1RvU2xpZGUocGFnZXJJbmRleCwgJ25leHQnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIHByZXYgc2xpZGUgaW4gdGhlIHNob3dcbiAgICAgKi9cbiAgICBlbC5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBpbmZpbml0ZUxvb3AgaXMgZmFsc2UgYW5kIGxhc3QgcGFnZSBpcyBzaG93aW5nLCBkaXNyZWdhcmQgY2FsbFxuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wICYmIHNsaWRlci5hY3RpdmUuaW5kZXggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgcGFnZXJJbmRleCA9IHBhcnNlSW50KHNsaWRlci5hY3RpdmUuaW5kZXgpIC0gMTtcbiAgICAgIGVsLmdvVG9TbGlkZShwYWdlckluZGV4LCAncHJldicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIGF1dG8gc2hvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHByZXZlbnRDb250cm9sVXBkYXRlIChib29sZWFuKVxuICAgICAqICAtIGlmIHRydWUsIGF1dG8gY29udHJvbHMgc3RhdGUgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAqL1xuICAgIGVsLnN0YXJ0QXV0byA9IGZ1bmN0aW9uKHByZXZlbnRDb250cm9sVXBkYXRlKSB7XG4gICAgICAvLyBpZiBhbiBpbnRlcnZhbCBhbHJlYWR5IGV4aXN0cywgZGlzcmVnYXJkIGNhbGxcbiAgICAgIGlmIChzbGlkZXIuaW50ZXJ2YWwpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBjcmVhdGUgYW4gaW50ZXJ2YWxcbiAgICAgIHNsaWRlci5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9EaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgIGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHNsaWRlci5zZXR0aW5ncy5wYXVzZSk7XG4gICAgICAvLyBpZiBhdXRvIGNvbnRyb2xzIGFyZSBkaXNwbGF5ZWQgYW5kIHByZXZlbnRDb250cm9sVXBkYXRlIGlzIG5vdCB0cnVlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9scyAmJiBwcmV2ZW50Q29udHJvbFVwZGF0ZSAhPT0gdHJ1ZSkgeyB1cGRhdGVBdXRvQ29udHJvbHMoJ3N0b3AnKTsgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyB0aGUgYXV0byBzaG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJldmVudENvbnRyb2xVcGRhdGUgKGJvb2xlYW4pXG4gICAgICogIC0gaWYgdHJ1ZSwgYXV0byBjb250cm9scyBzdGF0ZSB3aWxsIG5vdCBiZSB1cGRhdGVkXG4gICAgICovXG4gICAgZWwuc3RvcEF1dG8gPSBmdW5jdGlvbihwcmV2ZW50Q29udHJvbFVwZGF0ZSkge1xuICAgICAgLy8gaWYgbm8gaW50ZXJ2YWwgZXhpc3RzLCBkaXNyZWdhcmQgY2FsbFxuICAgICAgaWYgKCFzbGlkZXIuaW50ZXJ2YWwpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBjbGVhciB0aGUgaW50ZXJ2YWxcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmludGVydmFsKTtcbiAgICAgIHNsaWRlci5pbnRlcnZhbCA9IG51bGw7XG4gICAgICAvLyBpZiBhdXRvIGNvbnRyb2xzIGFyZSBkaXNwbGF5ZWQgYW5kIHByZXZlbnRDb250cm9sVXBkYXRlIGlzIG5vdCB0cnVlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9scyAmJiBwcmV2ZW50Q29udHJvbFVwZGF0ZSAhPT0gdHJ1ZSkgeyB1cGRhdGVBdXRvQ29udHJvbHMoJ3N0YXJ0Jyk7IH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IHNsaWRlIGluZGV4ICh6ZXJvLWJhc2VkKVxuICAgICAqL1xuICAgIGVsLmdldEN1cnJlbnRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWRlci5hY3RpdmUuaW5kZXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY3VycmVudCBzbGlkZSBlbGVtZW50XG4gICAgICovXG4gICAgZWwuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNsaWRlIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaW5kZXggKGludClcbiAgICAgKiAgLSBUaGUgaW5kZXggKHplcm8tYmFzZWQpIG9mIHRoZSBlbGVtZW50IHlvdSB3YW50IHJldHVybmVkLlxuICAgICAqL1xuICAgIGVsLmdldFNsaWRlRWxlbWVudCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gc2xpZGVyLmNoaWxkcmVuLmVxKGluZGV4KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBudW1iZXIgb2Ygc2xpZGVzIGluIHNob3dcbiAgICAgKi9cbiAgICBlbC5nZXRTbGlkZUNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHNsaWRlci53b3JraW5nIHZhcmlhYmxlXG4gICAgICovXG4gICAgZWwuaXNXb3JraW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gc2xpZGVyLndvcmtpbmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbGwgZHluYW1pYyBzbGlkZXIgZWxlbWVudHNcbiAgICAgKi9cbiAgICBlbC5yZWRyYXdTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlc2l6ZSBhbGwgY2hpbGRyZW4gaW4gcmF0aW8gdG8gbmV3IHNjcmVlbiBzaXplXG4gICAgICBzbGlkZXIuY2hpbGRyZW4uYWRkKGVsLmZpbmQoJy5ieC1jbG9uZScpKS5vdXRlcldpZHRoKGdldFNsaWRlV2lkdGgoKSk7XG4gICAgICAvLyBhZGp1c3QgdGhlIGhlaWdodFxuICAgICAgc2xpZGVyLnZpZXdwb3J0LmNzcygnaGVpZ2h0JywgZ2V0Vmlld3BvcnRIZWlnaHQoKSk7XG4gICAgICAvLyB1cGRhdGUgdGhlIHNsaWRlIHBvc2l0aW9uXG4gICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHsgc2V0U2xpZGVQb3NpdGlvbigpOyB9XG4gICAgICAvLyBpZiBhY3RpdmUubGFzdCB3YXMgdHJ1ZSBiZWZvcmUgdGhlIHNjcmVlbiByZXNpemUsIHdlIHdhbnRcbiAgICAgIC8vIHRvIGtlZXAgaXQgbGFzdCBubyBtYXR0ZXIgd2hhdCBzY3JlZW4gc2l6ZSB3ZSBlbmQgb25cbiAgICAgIGlmIChzbGlkZXIuYWN0aXZlLmxhc3QpIHsgc2xpZGVyLmFjdGl2ZS5pbmRleCA9IGdldFBhZ2VyUXR5KCkgLSAxOyB9XG4gICAgICAvLyBpZiB0aGUgYWN0aXZlIGluZGV4IChwYWdlKSBubyBsb25nZXIgZXhpc3RzIGR1ZSB0byB0aGUgcmVzaXplLCBzaW1wbHkgc2V0IHRoZSBpbmRleCBhcyBsYXN0XG4gICAgICBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA+PSBnZXRQYWdlclF0eSgpKSB7IHNsaWRlci5hY3RpdmUubGFzdCA9IHRydWU7IH1cbiAgICAgIC8vIGlmIGEgcGFnZXIgaXMgYmVpbmcgZGlzcGxheWVkIGFuZCBhIGN1c3RvbSBwYWdlciBpcyBub3QgYmVpbmcgdXNlZCwgdXBkYXRlIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnBhZ2VyICYmICFzbGlkZXIuc2V0dGluZ3MucGFnZXJDdXN0b20pIHtcbiAgICAgICAgcG9wdWxhdGVQYWdlcigpO1xuICAgICAgICB1cGRhdGVQYWdlckFjdGl2ZShzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXJpYUhpZGRlbikgeyBhcHBseUFyaWFIaWRkZW5BdHRyaWJ1dGVzKHNsaWRlci5hY3RpdmUuaW5kZXggKiBnZXRNb3ZlQnkoKSk7IH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgc2xpZGVyIChyZXZlcnQgZXZlcnl0aGluZyBiYWNrIHRvIG9yaWdpbmFsIHN0YXRlKVxuICAgICAqL1xuICAgIGVsLmRlc3Ryb3lTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHNsaWRlciBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxuICAgICAgaWYgKCFzbGlkZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG4gICAgICBzbGlkZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICQoJy5ieC1jbG9uZScsIHRoaXMpLnJlbW92ZSgpO1xuICAgICAgc2xpZGVyLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ29yaWdTdHlsZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3N0eWxlJywgJCh0aGlzKS5kYXRhKCdvcmlnU3R5bGUnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ29yaWdTdHlsZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hdHRyKCdzdHlsZScsICQodGhpcykuZGF0YSgnb3JpZ1N0eWxlJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgfVxuICAgICAgJCh0aGlzKS51bndyYXAoKS51bndyYXAoKTtcbiAgICAgIGlmIChzbGlkZXIuY29udHJvbHMuZWwpIHsgc2xpZGVyLmNvbnRyb2xzLmVsLnJlbW92ZSgpOyB9XG4gICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzLm5leHQpIHsgc2xpZGVyLmNvbnRyb2xzLm5leHQucmVtb3ZlKCk7IH1cbiAgICAgIGlmIChzbGlkZXIuY29udHJvbHMucHJldikgeyBzbGlkZXIuY29udHJvbHMucHJldi5yZW1vdmUoKTsgfVxuICAgICAgaWYgKHNsaWRlci5wYWdlckVsICYmIHNsaWRlci5zZXR0aW5ncy5jb250cm9scyAmJiAhc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKSB7IHNsaWRlci5wYWdlckVsLnJlbW92ZSgpOyB9XG4gICAgICAkKCcuYngtY2FwdGlvbicsIHRoaXMpLnJlbW92ZSgpO1xuICAgICAgaWYgKHNsaWRlci5jb250cm9scy5hdXRvRWwpIHsgc2xpZGVyLmNvbnRyb2xzLmF1dG9FbC5yZW1vdmUoKTsgfVxuICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZXIuaW50ZXJ2YWwpO1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5yZXNwb25zaXZlKSB7ICQod2luZG93KS51bmJpbmQoJ3Jlc2l6ZScsIHJlc2l6ZVdpbmRvdyk7IH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3Mua2V5Ym9hcmRFbmFibGVkKSB7ICQoZG9jdW1lbnQpLnVuYmluZCgna2V5ZG93bicsIGtleVByZXNzKTsgfVxuICAgICAgLy9yZW1vdmUgc2VsZiByZWZlcmVuY2UgaW4gZGF0YVxuICAgICAgJCh0aGlzKS5yZW1vdmVEYXRhKCdieFNsaWRlcicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWxvYWQgdGhlIHNsaWRlciAocmV2ZXJ0IGFsbCBET00gY2hhbmdlcywgYW5kIHJlLWluaXRpYWxpemUpXG4gICAgICovXG4gICAgZWwucmVsb2FkU2xpZGVyID0gZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgIGlmIChzZXR0aW5ncyAhPT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMgPSBzZXR0aW5nczsgfVxuICAgICAgZWwuZGVzdHJveVNsaWRlcigpO1xuICAgICAgaW5pdCgpO1xuICAgICAgLy9zdG9yZSByZWZlcmVuY2UgdG8gc2VsZiBpbiBvcmRlciB0byBhY2Nlc3MgcHVibGljIGZ1bmN0aW9ucyBsYXRlclxuICAgICAgJChlbCkuZGF0YSgnYnhTbGlkZXInLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgaW5pdCgpO1xuXG4gICAgJChlbCkuZGF0YSgnYnhTbGlkZXInLCB0aGlzKTtcblxuICAgIC8vIHJldHVybnMgdGhlIGN1cnJlbnQgalF1ZXJ5IG9iamVjdFxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9