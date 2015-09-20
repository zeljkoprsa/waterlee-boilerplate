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

  var noop = function () {};

  var Orbit = function (el, settings) {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class)) {
      return this;
    }

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        timer,
        locked = false,
        adjust_height_after = false;

    self.slides = function () {
      return slides_container.children(settings.slide_selector);
    };

    self.slides().first().addClass(settings.active_slide_class);

    self.update_slide_number = function (index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index) + 1);
        number_container.find('span:last').text(self.slides().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function (index) {
      var link = $('[data-orbit-link="' + self.slides().eq(index).attr('data-orbit-slide') + '"]');
      link.siblings().removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function () {
      slides_container.wrap('<div class="' + settings.container_class + '"></div>');
      container = slides_container.parent();
      slides_container.addClass(settings.slides_container_class);

      if (settings.stack_on_small) {
        container.addClass(settings.stack_on_small_class);
      }

      if (settings.navigation_arrows) {
        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
      }

      if (settings.timer) {
        timer_container = $('<div>').addClass(settings.timer_container_class);
        timer_container.append('<span>');
        timer_container.append($('<div>').addClass(settings.timer_progress_class));
        timer_container.addClass(settings.timer_paused_class);
        container.append(timer_container);
      }

      if (settings.slide_number) {
        number_container = $('<div>').addClass(settings.slide_number_class);
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
        container.append(number_container);
      }

      if (settings.bullets) {
        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
        container.append(bullets_container);
        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
        self.slides().each(function (idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx).on('click', self.link_bullet);;
          bullets_container.append(bullet);
        });
      }

    };

    self._goto = function (next_idx, start_timer) {
      // if (locked) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof timer === 'object') {timer.restart();}
      var slides = self.slides();

      var dir = 'next';
      locked = true;
      if (next_idx < idx) {dir = 'prev';}
      if (next_idx >= slides.length) {
        if (!settings.circular) {
          return false;
        }
        next_idx = 0;
      } else if (next_idx < 0) {
        if (!settings.circular) {
          return false;
        }
        next_idx = slides.length - 1;
      }

      var current = $(slides.get(idx));
      var next = $(slides.get(next_idx));

      current.css('zIndex', 2);
      current.removeClass(settings.active_slide_class);
      next.css('zIndex', 4).addClass(settings.active_slide_class);

      slides_container.trigger('before-slide-change.fndtn.orbit');
      settings.before_slide_change();
      self.update_active_link(next_idx);

      var callback = function () {
        var unlock = function () {
          idx = next_idx;
          locked = false;
          if (start_timer === true) {timer = self.create_timer(); timer.start();}
          self.update_slide_number(idx);
          slides_container.trigger('after-slide-change.fndtn.orbit', [{slide_number : idx, total_slides : slides.length}]);
          settings.after_slide_change(idx, slides.length);
        };
        if (slides_container.outerHeight() != next.outerHeight() && settings.variable_height) {
          slides_container.animate({'height': next.outerHeight()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function () {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}
      };

      if (next.outerHeight() > slides_container.outerHeight() && settings.variable_height) {
        slides_container.animate({'height': next.outerHeight()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };

    self.next = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx + 1);
    };

    self.prev = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx - 1);
    };

    self.link_custom = function (e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != '') {
        var slide = container.find('[data-orbit-slide=' + link + ']');
        if (slide.index() != -1) {self._goto(slide.index());}
      }
    };

    self.link_bullet = function (e) {
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != '') {
        if (isNaN(parseInt(index))) {
          var slide = container.find('[data-orbit-slide=' + index + ']');
          if (slide.index() != -1) {self._goto(slide.index() + 1);}
        } else {
          self._goto(parseInt(index));
        }
      }

    }

    self.timer_callback = function () {
      self._goto(idx + 1, true);
    }

    self.compute_dimensions = function () {
      var current = $(self.slides().get(idx));
      var h = current.outerHeight();
      if (!settings.variable_height) {
        self.slides().each(function(){
          if ($(this).outerHeight() > h) { h = $(this).outerHeight(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function () {
      var t = new Timer(
        container.find('.' + settings.timer_container_class),
        settings,
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function () {
      if (typeof timer === 'object') {
        timer.stop();
      }
    };

    self.toggle_timer = function () {
      var t = container.find('.' + settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof timer === 'undefined') {timer = self.create_timer();}
        timer.start();
      } else {
        if (typeof timer === 'object') {timer.stop();}
      }
    };

    self.init = function () {
      self.build_markup();
      if (settings.timer) {
        timer = self.create_timer();
        Foundation.utils.image_loaded(this.slides().children('img'), timer.start);
      }
      animate = new FadeAnimation(settings, slides_container);
      if (settings.animation === 'slide') {
        animate = new SlideAnimation(settings, slides_container);
      }

      container.on('click', '.' + settings.next_class, self.next);
      container.on('click', '.' + settings.prev_class, self.prev);

      if (settings.next_on_click) {
        container.on('click', '.' + settings.slides_container_class + ' [data-orbit-slide]', self.link_bullet);
      }

      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        container.on('touchstart.fndtn.orbit', function (e) {
          if (!e.touches) {e = e.originalEvent;}
          var data = {
            start_page_x : e.touches[0].pageX,
            start_page_y : e.touches[0].pageY,
            start_time : (new Date()).getTime(),
            delta_x : 0,
            is_scrolling : undefined
          };
          container.data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.orbit', function (e) {
          if (!e.touches) {
            e = e.originalEvent;
          }
          // Ignore pinch/zoom events
          if (e.touches.length > 1 || e.scale && e.scale !== 1) {
            return;
          }

          var data = container.data('swipe-transition');
          if (typeof data === 'undefined') {data = {};}

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? (idx + 1) : (idx - 1);
            data.active = true;
            self._goto(direction);
          }
        })
        .on('touchend.fndtn.orbit', function (e) {
          container.data('swipe-transition', {});
          e.stopPropagation();
        })
      }
      container.on('mouseenter.fndtn.orbit', function (e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function (e) {
        if (settings.timer && settings.resume_on_mouseout) {
          timer.start();
        }
      });

      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('load resize', self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), function () {
        container.prev('.' + settings.preloader_class).css('display', 'none');
        self.update_slide_number(0);
        self.update_active_link(0);
        slides_container.trigger('ready.fndtn.orbit');
      });
    };

    self.init();
  };

  var Timer = function (el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.' + settings.timer_progress_class),
        start,
        timeout,
        left = -1;

    this.update_progress = function (w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w + '%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function () {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
    };

    this.start = function () {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width' : '100%'}, left, 'linear');
      timeout = setTimeout(function () {
        self.restart();
        callback();
      }, left);
      el.trigger('timer-started.fndtn.orbit')
    };

    this.stop = function () {
      if (el.hasClass(settings.timer_paused_class)) {return true;}
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      var end = new Date().getTime();
      left = left - (end - start);
      var w = 100 - ((left / duration) * 100);
      self.update_progress(w);
      el.trigger('timer-stopped.fndtn.orbit');
    };
  };

  var SlideAnimation = function (settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';
    var animMargin = {};
    animMargin[margin] = '0%';

    this.next = function (current, next, callback) {
      current.animate({marginLeft : '-100%'}, duration);
      next.animate(animMargin, duration, function () {
        current.css(margin, '100%');
        callback();
      });
    };

    this.prev = function (current, prev, callback) {
      current.animate({marginLeft : '100%'}, duration);
      prev.css(margin, '-100%');
      prev.animate(animMargin, duration, function () {
        current.css(margin, '100%');
        callback();
      });
    };
  };

  var FadeAnimation = function (settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';

    this.next = function (current, next, callback) {
      next.css({'margin' : '0%', 'opacity' : '0.01'});
      next.animate({'opacity' :'1'}, duration, 'linear', function () {
        current.css('margin', '100%');
        callback();
      });
    };

    this.prev = function (current, prev, callback) {
      prev.css({'margin' : '0%', 'opacity' : '0.01'});
      prev.animate({'opacity' : '1'}, duration, 'linear', function () {
        current.css('margin', '100%');
        callback();
      });
    };
  };

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name : 'orbit',

    version : '5.5.2',

    settings : {
      animation : 'slide',
      timer_speed : 10000,
      pause_on_hover : true,
      resume_on_mouseout : false,
      next_on_click : true,
      animation_speed : 500,
      stack_on_small : false,
      navigation_arrows : true,
      slide_number : true,
      slide_number_text : 'of',
      container_class : 'orbit-container',
      stack_on_small_class : 'orbit-stack-on-small',
      next_class : 'orbit-next',
      prev_class : 'orbit-prev',
      timer_container_class : 'orbit-timer',
      timer_paused_class : 'paused',
      timer_progress_class : 'orbit-progress',
      slides_container_class : 'orbit-slides-container',
      preloader_class : 'preloader',
      slide_selector : '*',
      bullets_container_class : 'orbit-bullets',
      bullets_active_class : 'active',
      slide_number_class : 'orbit-slide-number',
      caption_class : 'orbit-caption',
      active_slide_class : 'active',
      orbit_transition_class : 'orbit-transitioning',
      bullets : true,
      circular : true,
      timer : true,
      variable_height : false,
      swipe : true,
      before_slide_change : noop,
      after_slide_change : noop
    },

    init : function (scope, method, options) {
      var self = this;
      this.bindings(method, options);
    },

    events : function (instance) {
      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
      this.S(instance).data(this.name + '-instance', orbit_instance);
    },

    reflow : function () {
      var self = this;

      if (self.S(self.scope).is('[data-orbit]')) {
        var $el = self.S(self.scope);
        var instance = $el.data(self.name + '-instance');
        instance.compute_dimensions();
      } else {
        self.S('[data-orbit]', self.scope).each(function (idx, el) {
          var $el = self.S(el);
          var opts = self.data_options($el);
          var instance = $el.data(self.name + '-instance');
          instance.compute_dimensions();
        });
      }
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci5qcyIsImZvdW5kYXRpb24uanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiZm91bmRhdGlvbi5lcXVhbGl6ZXIuanMiLCJmb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsImZvdW5kYXRpb24ub3JiaXQuanMiLCJmb3VuZGF0aW9uLnRvcGJhci5qcyIsImpxdWVyeS5lbGV2YXRlem9vbS5qcyIsImpxdWVyeS5ieHNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcnRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2p2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIE1vZGVybml6ciB2Mi44LjNcbiAqIHd3dy5tb2Rlcm5penIuY29tXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYXJ1ayBBdGVzLCBQYXVsIElyaXNoLCBBbGV4IFNleHRvblxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgYW5kIE1JVCBsaWNlbnNlczogd3d3Lm1vZGVybml6ci5jb20vbGljZW5zZS9cbiAqL1xud2luZG93Lk1vZGVybml6cj1mdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXt0LmNzc1RleHQ9YX1mdW5jdGlvbiBlKGEsYil7cmV0dXJuIGQoeC5qb2luKGErXCI7XCIpKyhifHxcIlwiKSl9ZnVuY3Rpb24gZihhLGIpe3JldHVybiB0eXBlb2YgYT09PWJ9ZnVuY3Rpb24gZyhhLGIpe3JldHVybiEhfihcIlwiK2EpLmluZGV4T2YoYil9ZnVuY3Rpb24gaChhLGIpe2Zvcih2YXIgZCBpbiBhKXt2YXIgZT1hW2RdO2lmKCFnKGUsXCItXCIpJiZ0W2VdIT09YylyZXR1cm5cInBmeFwiPT1iP2U6ITB9cmV0dXJuITF9ZnVuY3Rpb24gaShhLGIsZCl7Zm9yKHZhciBlIGluIGEpe3ZhciBnPWJbYVtlXV07aWYoZyE9PWMpcmV0dXJuIGQ9PT0hMT9hW2VdOmYoZyxcImZ1bmN0aW9uXCIpP2cuYmluZChkfHxiKTpnfXJldHVybiExfWZ1bmN0aW9uIGooYSxiLGMpe3ZhciBkPWEuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrYS5zbGljZSgxKSxlPShhK1wiIFwiK3ouam9pbihkK1wiIFwiKStkKS5zcGxpdChcIiBcIik7cmV0dXJuIGYoYixcInN0cmluZ1wiKXx8ZihiLFwidW5kZWZpbmVkXCIpP2goZSxiKTooZT0oYStcIiBcIitBLmpvaW4oZCtcIiBcIikrZCkuc3BsaXQoXCIgXCIpLGkoZSxiLGMpKX1mdW5jdGlvbiBrKCl7by5pbnB1dD1mdW5jdGlvbihjKXtmb3IodmFyIGQ9MCxlPWMubGVuZ3RoO2U+ZDtkKyspRVtjW2RdXT0hIShjW2RdaW4gdSk7cmV0dXJuIEUubGlzdCYmKEUubGlzdD0hKCFiLmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKXx8IWEuSFRNTERhdGFMaXN0RWxlbWVudCkpLEV9KFwiYXV0b2NvbXBsZXRlIGF1dG9mb2N1cyBsaXN0IHBsYWNlaG9sZGVyIG1heCBtaW4gbXVsdGlwbGUgcGF0dGVybiByZXF1aXJlZCBzdGVwXCIuc3BsaXQoXCIgXCIpKSxvLmlucHV0dHlwZXM9ZnVuY3Rpb24oYSl7Zm9yKHZhciBkLGUsZixnPTAsaD1hLmxlbmd0aDtoPmc7ZysrKXUuc2V0QXR0cmlidXRlKFwidHlwZVwiLGU9YVtnXSksZD1cInRleHRcIiE9PXUudHlwZSxkJiYodS52YWx1ZT12LHUuc3R5bGUuY3NzVGV4dD1cInBvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuO1wiLC9ecmFuZ2UkLy50ZXN0KGUpJiZ1LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UhPT1jPyhxLmFwcGVuZENoaWxkKHUpLGY9Yi5kZWZhdWx0VmlldyxkPWYuZ2V0Q29tcHV0ZWRTdHlsZSYmXCJ0ZXh0ZmllbGRcIiE9PWYuZ2V0Q29tcHV0ZWRTdHlsZSh1LG51bGwpLldlYmtpdEFwcGVhcmFuY2UmJjAhPT11Lm9mZnNldEhlaWdodCxxLnJlbW92ZUNoaWxkKHUpKTovXihzZWFyY2h8dGVsKSQvLnRlc3QoZSl8fChkPS9eKHVybHxlbWFpbCkkLy50ZXN0KGUpP3UuY2hlY2tWYWxpZGl0eSYmdS5jaGVja1ZhbGlkaXR5KCk9PT0hMTp1LnZhbHVlIT12KSksRFthW2ddXT0hIWQ7cmV0dXJuIER9KFwic2VhcmNoIHRlbCB1cmwgZW1haWwgZGF0ZXRpbWUgZGF0ZSBtb250aCB3ZWVrIHRpbWUgZGF0ZXRpbWUtbG9jYWwgbnVtYmVyIHJhbmdlIGNvbG9yXCIuc3BsaXQoXCIgXCIpKX12YXIgbCxtLG49XCIyLjguM1wiLG89e30scD0hMCxxPWIuZG9jdW1lbnRFbGVtZW50LHI9XCJtb2Rlcm5penJcIixzPWIuY3JlYXRlRWxlbWVudChyKSx0PXMuc3R5bGUsdT1iLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSx2PVwiOilcIix3PXt9LnRvU3RyaW5nLHg9XCIgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gXCIuc3BsaXQoXCIgXCIpLHk9XCJXZWJraXQgTW96IE8gbXNcIix6PXkuc3BsaXQoXCIgXCIpLEE9eS50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKSxCPXtzdmc6XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wifSxDPXt9LEQ9e30sRT17fSxGPVtdLEc9Ri5zbGljZSxIPWZ1bmN0aW9uKGEsYyxkLGUpe3ZhciBmLGcsaCxpLGo9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGs9Yi5ib2R5LGw9a3x8Yi5jcmVhdGVFbGVtZW50KFwiYm9keVwiKTtpZihwYXJzZUludChkLDEwKSlmb3IoO2QtLTspaD1iLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5pZD1lP2VbZF06cisoZCsxKSxqLmFwcGVuZENoaWxkKGgpO3JldHVybiBmPVtcIiYjMTczO1wiLCc8c3R5bGUgaWQ9XCJzJyxyLCdcIj4nLGEsXCI8L3N0eWxlPlwiXS5qb2luKFwiXCIpLGouaWQ9ciwoaz9qOmwpLmlubmVySFRNTCs9ZixsLmFwcGVuZENoaWxkKGopLGt8fChsLnN0eWxlLmJhY2tncm91bmQ9XCJcIixsLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsaT1xLnN0eWxlLm92ZXJmbG93LHEuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixxLmFwcGVuZENoaWxkKGwpKSxnPWMoaixhKSxrP2oucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChqKToobC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGwpLHEuc3R5bGUub3ZlcmZsb3c9aSksISFnfSxJPWZ1bmN0aW9uKGIpe3ZhciBjPWEubWF0Y2hNZWRpYXx8YS5tc01hdGNoTWVkaWE7aWYoYylyZXR1cm4gYyhiKSYmYyhiKS5tYXRjaGVzfHwhMTt2YXIgZDtyZXR1cm4gSChcIkBtZWRpYSBcIitiK1wiIHsgI1wiK3IrXCIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfVwiLGZ1bmN0aW9uKGIpe2Q9XCJhYnNvbHV0ZVwiPT0oYS5nZXRDb21wdXRlZFN0eWxlP2dldENvbXB1dGVkU3R5bGUoYixudWxsKTpiLmN1cnJlbnRTdHlsZSkucG9zaXRpb259KSxkfSxKPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhLGUpe2U9ZXx8Yi5jcmVhdGVFbGVtZW50KGRbYV18fFwiZGl2XCIpLGE9XCJvblwiK2E7dmFyIGc9YSBpbiBlO3JldHVybiBnfHwoZS5zZXRBdHRyaWJ1dGV8fChlPWIuY3JlYXRlRWxlbWVudChcImRpdlwiKSksZS5zZXRBdHRyaWJ1dGUmJmUucmVtb3ZlQXR0cmlidXRlJiYoZS5zZXRBdHRyaWJ1dGUoYSxcIlwiKSxnPWYoZVthXSxcImZ1bmN0aW9uXCIpLGYoZVthXSxcInVuZGVmaW5lZFwiKXx8KGVbYV09YyksZS5yZW1vdmVBdHRyaWJ1dGUoYSkpKSxlPW51bGwsZ312YXIgZD17c2VsZWN0OlwiaW5wdXRcIixjaGFuZ2U6XCJpbnB1dFwiLHN1Ym1pdDpcImZvcm1cIixyZXNldDpcImZvcm1cIixlcnJvcjpcImltZ1wiLGxvYWQ6XCJpbWdcIixhYm9ydDpcImltZ1wifTtyZXR1cm4gYX0oKSxLPXt9Lmhhc093blByb3BlcnR5O209ZihLLFwidW5kZWZpbmVkXCIpfHxmKEsuY2FsbCxcInVuZGVmaW5lZFwiKT9mdW5jdGlvbihhLGIpe3JldHVybiBiIGluIGEmJmYoYS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVbYl0sXCJ1bmRlZmluZWRcIil9OmZ1bmN0aW9uKGEsYil7cmV0dXJuIEsuY2FsbChhLGIpfSxGdW5jdGlvbi5wcm90b3R5cGUuYmluZHx8KEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgYil0aHJvdyBuZXcgVHlwZUVycm9yO3ZhciBjPUcuY2FsbChhcmd1bWVudHMsMSksZD1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBkKXt2YXIgZT1mdW5jdGlvbigpe307ZS5wcm90b3R5cGU9Yi5wcm90b3R5cGU7dmFyIGY9bmV3IGUsZz1iLmFwcGx5KGYsYy5jb25jYXQoRy5jYWxsKGFyZ3VtZW50cykpKTtyZXR1cm4gT2JqZWN0KGcpPT09Zz9nOmZ9cmV0dXJuIGIuYXBwbHkoYSxjLmNvbmNhdChHLmNhbGwoYXJndW1lbnRzKSkpfTtyZXR1cm4gZH0pLEMuZmxleGJveD1mdW5jdGlvbigpe3JldHVybiBqKFwiZmxleFdyYXBcIil9LEMuZmxleGJveGxlZ2FjeT1mdW5jdGlvbigpe3JldHVybiBqKFwiYm94RGlyZWN0aW9uXCIpfSxDLmNhbnZhcz1mdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtyZXR1cm4hKCFhLmdldENvbnRleHR8fCFhLmdldENvbnRleHQoXCIyZFwiKSl9LEMuY2FudmFzdGV4dD1mdW5jdGlvbigpe3JldHVybiEoIW8uY2FudmFzfHwhZihiLmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpLmZpbGxUZXh0LFwiZnVuY3Rpb25cIikpfSxDLndlYmdsPWZ1bmN0aW9uKCl7cmV0dXJuISFhLldlYkdMUmVuZGVyaW5nQ29udGV4dH0sQy50b3VjaD1mdW5jdGlvbigpe3ZhciBjO3JldHVyblwib250b3VjaHN0YXJ0XCJpbiBhfHxhLkRvY3VtZW50VG91Y2gmJmIgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoP2M9ITA6SChbXCJAbWVkaWEgKFwiLHguam9pbihcInRvdWNoLWVuYWJsZWQpLChcIikscixcIilcIixcInsjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fVwiXS5qb2luKFwiXCIpLGZ1bmN0aW9uKGEpe2M9OT09PWEub2Zmc2V0VG9wfSksY30sQy5nZW9sb2NhdGlvbj1mdW5jdGlvbigpe3JldHVyblwiZ2VvbG9jYXRpb25cImluIG5hdmlnYXRvcn0sQy5wb3N0bWVzc2FnZT1mdW5jdGlvbigpe3JldHVybiEhYS5wb3N0TWVzc2FnZX0sQy53ZWJzcWxkYXRhYmFzZT1mdW5jdGlvbigpe3JldHVybiEhYS5vcGVuRGF0YWJhc2V9LEMuaW5kZXhlZERCPWZ1bmN0aW9uKCl7cmV0dXJuISFqKFwiaW5kZXhlZERCXCIsYSl9LEMuaGFzaGNoYW5nZT1mdW5jdGlvbigpe3JldHVybiBKKFwiaGFzaGNoYW5nZVwiLGEpJiYoYi5kb2N1bWVudE1vZGU9PT1jfHxiLmRvY3VtZW50TW9kZT43KX0sQy5oaXN0b3J5PWZ1bmN0aW9uKCl7cmV0dXJuISghYS5oaXN0b3J5fHwhaGlzdG9yeS5wdXNoU3RhdGUpfSxDLmRyYWdhbmRkcm9wPWZ1bmN0aW9uKCl7dmFyIGE9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVyblwiZHJhZ2dhYmxlXCJpbiBhfHxcIm9uZHJhZ3N0YXJ0XCJpbiBhJiZcIm9uZHJvcFwiaW4gYX0sQy53ZWJzb2NrZXRzPWZ1bmN0aW9uKCl7cmV0dXJuXCJXZWJTb2NrZXRcImluIGF8fFwiTW96V2ViU29ja2V0XCJpbiBhfSxDLnJnYmE9ZnVuY3Rpb24oKXtyZXR1cm4gZChcImJhY2tncm91bmQtY29sb3I6cmdiYSgxNTAsMjU1LDE1MCwuNSlcIiksZyh0LmJhY2tncm91bmRDb2xvcixcInJnYmFcIil9LEMuaHNsYT1mdW5jdGlvbigpe3JldHVybiBkKFwiYmFja2dyb3VuZC1jb2xvcjpoc2xhKDEyMCw0MCUsMTAwJSwuNSlcIiksZyh0LmJhY2tncm91bmRDb2xvcixcInJnYmFcIil8fGcodC5iYWNrZ3JvdW5kQ29sb3IsXCJoc2xhXCIpfSxDLm11bHRpcGxlYmdzPWZ1bmN0aW9uKCl7cmV0dXJuIGQoXCJiYWNrZ3JvdW5kOnVybChodHRwczovLyksdXJsKGh0dHBzOi8vKSxyZWQgdXJsKGh0dHBzOi8vKVwiKSwvKHVybFxccypcXCguKj8pezN9Ly50ZXN0KHQuYmFja2dyb3VuZCl9LEMuYmFja2dyb3VuZHNpemU9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImJhY2tncm91bmRTaXplXCIpfSxDLmJvcmRlcmltYWdlPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJib3JkZXJJbWFnZVwiKX0sQy5ib3JkZXJyYWRpdXM9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImJvcmRlclJhZGl1c1wiKX0sQy5ib3hzaGFkb3c9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImJveFNoYWRvd1wiKX0sQy50ZXh0c2hhZG93PWZ1bmN0aW9uKCl7cmV0dXJuXCJcIj09PWIuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZS50ZXh0U2hhZG93fSxDLm9wYWNpdHk9ZnVuY3Rpb24oKXtyZXR1cm4gZShcIm9wYWNpdHk6LjU1XCIpLC9eMC41NSQvLnRlc3QodC5vcGFjaXR5KX0sQy5jc3NhbmltYXRpb25zPWZ1bmN0aW9uKCl7cmV0dXJuIGooXCJhbmltYXRpb25OYW1lXCIpfSxDLmNzc2NvbHVtbnM9ZnVuY3Rpb24oKXtyZXR1cm4gaihcImNvbHVtbkNvdW50XCIpfSxDLmNzc2dyYWRpZW50cz1mdW5jdGlvbigpe3ZhciBhPVwiYmFja2dyb3VuZC1pbWFnZTpcIixiPVwiZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IGJvdHRvbSxmcm9tKCM5ZjkpLHRvKHdoaXRlKSk7XCIsYz1cImxpbmVhci1ncmFkaWVudChsZWZ0IHRvcCwjOWY5LCB3aGl0ZSk7XCI7cmV0dXJuIGQoKGErXCItd2Via2l0LSBcIi5zcGxpdChcIiBcIikuam9pbihiK2EpK3guam9pbihjK2EpKS5zbGljZSgwLC1hLmxlbmd0aCkpLGcodC5iYWNrZ3JvdW5kSW1hZ2UsXCJncmFkaWVudFwiKX0sQy5jc3NyZWZsZWN0aW9ucz1mdW5jdGlvbigpe3JldHVybiBqKFwiYm94UmVmbGVjdFwiKX0sQy5jc3N0cmFuc2Zvcm1zPWZ1bmN0aW9uKCl7cmV0dXJuISFqKFwidHJhbnNmb3JtXCIpfSxDLmNzc3RyYW5zZm9ybXMzZD1mdW5jdGlvbigpe3ZhciBhPSEhaihcInBlcnNwZWN0aXZlXCIpO3JldHVybiBhJiZcIndlYmtpdFBlcnNwZWN0aXZlXCJpbiBxLnN0eWxlJiZIKFwiQG1lZGlhICh0cmFuc2Zvcm0tM2QpLCgtd2Via2l0LXRyYW5zZm9ybS0zZCl7I21vZGVybml6cntsZWZ0OjlweDtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M3B4O319XCIsZnVuY3Rpb24oYixjKXthPTk9PT1iLm9mZnNldExlZnQmJjM9PT1iLm9mZnNldEhlaWdodH0pLGF9LEMuY3NzdHJhbnNpdGlvbnM9ZnVuY3Rpb24oKXtyZXR1cm4gaihcInRyYW5zaXRpb25cIil9LEMuZm9udGZhY2U9ZnVuY3Rpb24oKXt2YXIgYTtyZXR1cm4gSCgnQGZvbnQtZmFjZSB7Zm9udC1mYW1pbHk6XCJmb250XCI7c3JjOnVybChcImh0dHBzOi8vXCIpfScsZnVuY3Rpb24oYyxkKXt2YXIgZT1iLmdldEVsZW1lbnRCeUlkKFwic21vZGVybml6clwiKSxmPWUuc2hlZXR8fGUuc3R5bGVTaGVldCxnPWY/Zi5jc3NSdWxlcyYmZi5jc3NSdWxlc1swXT9mLmNzc1J1bGVzWzBdLmNzc1RleHQ6Zi5jc3NUZXh0fHxcIlwiOlwiXCI7YT0vc3JjL2kudGVzdChnKSYmMD09PWcuaW5kZXhPZihkLnNwbGl0KFwiIFwiKVswXSl9KSxhfSxDLmdlbmVyYXRlZGNvbnRlbnQ9ZnVuY3Rpb24oKXt2YXIgYTtyZXR1cm4gSChbXCIjXCIscixcIntmb250OjAvMCBhfSNcIixyLCc6YWZ0ZXJ7Y29udGVudDpcIicsdiwnXCI7dmlzaWJpbGl0eTpoaWRkZW47Zm9udDozcHgvMSBhfSddLmpvaW4oXCJcIiksZnVuY3Rpb24oYil7YT1iLm9mZnNldEhlaWdodD49M30pLGF9LEMudmlkZW89ZnVuY3Rpb24oKXt2YXIgYT1iLmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKSxjPSExO3RyeXsoYz0hIWEuY2FuUGxheVR5cGUpJiYoYz1uZXcgQm9vbGVhbihjKSxjLm9nZz1hLmNhblBsYXlUeXBlKCd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYVwiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYy5oMjY0PWEuY2FuUGxheVR5cGUoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUVcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGMud2VibT1hLmNhblBsYXlUeXBlKCd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIikpfWNhdGNoKGQpe31yZXR1cm4gY30sQy5hdWRpbz1mdW5jdGlvbigpe3ZhciBhPWIuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpLGM9ITE7dHJ5eyhjPSEhYS5jYW5QbGF5VHlwZSkmJihjPW5ldyBCb29sZWFuKGMpLGMub2dnPWEuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxjLm1wMz1hLmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksYy53YXY9YS5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxjLm00YT0oYS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbTRhO1wiKXx8YS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpKX1jYXRjaChkKXt9cmV0dXJuIGN9LEMubG9jYWxzdG9yYWdlPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShyLHIpLGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHIpLCEwfWNhdGNoKGEpe3JldHVybiExfX0sQy5zZXNzaW9uc3RvcmFnZT1mdW5jdGlvbigpe3RyeXtyZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShyLHIpLHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0ociksITB9Y2F0Y2goYSl7cmV0dXJuITF9fSxDLndlYndvcmtlcnM9ZnVuY3Rpb24oKXtyZXR1cm4hIWEuV29ya2VyfSxDLmFwcGxpY2F0aW9uY2FjaGU9ZnVuY3Rpb24oKXtyZXR1cm4hIWEuYXBwbGljYXRpb25DYWNoZX0sQy5zdmc9ZnVuY3Rpb24oKXtyZXR1cm4hIWIuY3JlYXRlRWxlbWVudE5TJiYhIWIuY3JlYXRlRWxlbWVudE5TKEIuc3ZnLFwic3ZnXCIpLmNyZWF0ZVNWR1JlY3R9LEMuaW5saW5lc3ZnPWZ1bmN0aW9uKCl7dmFyIGE9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBhLmlubmVySFRNTD1cIjxzdmcvPlwiLChhLmZpcnN0Q2hpbGQmJmEuZmlyc3RDaGlsZC5uYW1lc3BhY2VVUkkpPT1CLnN2Z30sQy5zbWlsPWZ1bmN0aW9uKCl7cmV0dXJuISFiLmNyZWF0ZUVsZW1lbnROUyYmL1NWR0FuaW1hdGUvLnRlc3Qody5jYWxsKGIuY3JlYXRlRWxlbWVudE5TKEIuc3ZnLFwiYW5pbWF0ZVwiKSkpfSxDLnN2Z2NsaXBwYXRocz1mdW5jdGlvbigpe3JldHVybiEhYi5jcmVhdGVFbGVtZW50TlMmJi9TVkdDbGlwUGF0aC8udGVzdCh3LmNhbGwoYi5jcmVhdGVFbGVtZW50TlMoQi5zdmcsXCJjbGlwUGF0aFwiKSkpfTtmb3IodmFyIEwgaW4gQyltKEMsTCkmJihsPUwudG9Mb3dlckNhc2UoKSxvW2xdPUNbTF0oKSxGLnB1c2goKG9bbF0/XCJcIjpcIm5vLVwiKStsKSk7cmV0dXJuIG8uaW5wdXR8fGsoKSxvLmFkZFRlc3Q9ZnVuY3Rpb24oYSxiKXtpZihcIm9iamVjdFwiPT10eXBlb2YgYSlmb3IodmFyIGQgaW4gYSltKGEsZCkmJm8uYWRkVGVzdChkLGFbZF0pO2Vsc2V7aWYoYT1hLnRvTG93ZXJDYXNlKCksb1thXSE9PWMpcmV0dXJuIG87Yj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBiP2IoKTpiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBwJiZwJiYocS5jbGFzc05hbWUrPVwiIFwiKyhiP1wiXCI6XCJuby1cIikrYSksb1thXT1ifXJldHVybiBvfSxkKFwiXCIpLHM9dT1udWxsLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhLGIpe3ZhciBjPWEuY3JlYXRlRWxlbWVudChcInBcIiksZD1hLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXXx8YS5kb2N1bWVudEVsZW1lbnQ7cmV0dXJuIGMuaW5uZXJIVE1MPVwieDxzdHlsZT5cIitiK1wiPC9zdHlsZT5cIixkLmluc2VydEJlZm9yZShjLmxhc3RDaGlsZCxkLmZpcnN0Q2hpbGQpfWZ1bmN0aW9uIGQoKXt2YXIgYT1zLmVsZW1lbnRzO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBhP2Euc3BsaXQoXCIgXCIpOmF9ZnVuY3Rpb24gZShhKXt2YXIgYj1yW2FbcF1dO3JldHVybiBifHwoYj17fSxxKyssYVtwXT1xLHJbcV09YiksYn1mdW5jdGlvbiBmKGEsYyxkKXtpZihjfHwoYz1iKSxrKXJldHVybiBjLmNyZWF0ZUVsZW1lbnQoYSk7ZHx8KGQ9ZShjKSk7dmFyIGY7cmV0dXJuIGY9ZC5jYWNoZVthXT9kLmNhY2hlW2FdLmNsb25lTm9kZSgpOm8udGVzdChhKT8oZC5jYWNoZVthXT1kLmNyZWF0ZUVsZW0oYSkpLmNsb25lTm9kZSgpOmQuY3JlYXRlRWxlbShhKSwhZi5jYW5IYXZlQ2hpbGRyZW58fG4udGVzdChhKXx8Zi50YWdVcm4/ZjpkLmZyYWcuYXBwZW5kQ2hpbGQoZil9ZnVuY3Rpb24gZyhhLGMpe2lmKGF8fChhPWIpLGspcmV0dXJuIGEuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2M9Y3x8ZShhKTtmb3IodmFyIGY9Yy5mcmFnLmNsb25lTm9kZSgpLGc9MCxoPWQoKSxpPWgubGVuZ3RoO2k+ZztnKyspZi5jcmVhdGVFbGVtZW50KGhbZ10pO3JldHVybiBmfWZ1bmN0aW9uIGgoYSxiKXtiLmNhY2hlfHwoYi5jYWNoZT17fSxiLmNyZWF0ZUVsZW09YS5jcmVhdGVFbGVtZW50LGIuY3JlYXRlRnJhZz1hLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQsYi5mcmFnPWIuY3JlYXRlRnJhZygpKSxhLmNyZWF0ZUVsZW1lbnQ9ZnVuY3Rpb24oYyl7cmV0dXJuIHMuc2hpdk1ldGhvZHM/ZihjLGEsYik6Yi5jcmVhdGVFbGVtKGMpfSxhLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQ9RnVuY3Rpb24oXCJoLGZcIixcInJldHVybiBmdW5jdGlvbigpe3ZhciBuPWYuY2xvbmVOb2RlKCksYz1uLmNyZWF0ZUVsZW1lbnQ7aC5zaGl2TWV0aG9kcyYmKFwiK2QoKS5qb2luKCkucmVwbGFjZSgvW1xcd1xcLV0rL2csZnVuY3Rpb24oYSl7cmV0dXJuIGIuY3JlYXRlRWxlbShhKSxiLmZyYWcuY3JlYXRlRWxlbWVudChhKSwnYyhcIicrYSsnXCIpJ30pK1wiKTtyZXR1cm4gbn1cIikocyxiLmZyYWcpfWZ1bmN0aW9uIGkoYSl7YXx8KGE9Yik7dmFyIGQ9ZShhKTtyZXR1cm4hcy5zaGl2Q1NTfHxqfHxkLmhhc0NTU3x8KGQuaGFzQ1NTPSEhYyhhLFwiYXJ0aWNsZSxhc2lkZSxkaWFsb2csZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGhlYWRlcixoZ3JvdXAsbWFpbixuYXYsc2VjdGlvbntkaXNwbGF5OmJsb2NrfW1hcmt7YmFja2dyb3VuZDojRkYwO2NvbG9yOiMwMDB9dGVtcGxhdGV7ZGlzcGxheTpub25lfVwiKSksa3x8aChhLGQpLGF9dmFyIGosayxsPVwiMy43LjBcIixtPWEuaHRtbDV8fHt9LG49L148fF4oPzpidXR0b258bWFwfHNlbGVjdHx0ZXh0YXJlYXxvYmplY3R8aWZyYW1lfG9wdGlvbnxvcHRncm91cCkkL2ksbz0vXig/OmF8Ynxjb2RlfGRpdnxmaWVsZHNldHxoMXxoMnxoM3xoNHxoNXxoNnxpfGxhYmVsfGxpfG9sfHB8cXxzcGFufHN0cm9uZ3xzdHlsZXx0YWJsZXx0Ym9keXx0ZHx0aHx0cnx1bCkkL2kscD1cIl9odG1sNXNoaXZcIixxPTAscj17fTshZnVuY3Rpb24oKXt0cnl7dmFyIGE9Yi5jcmVhdGVFbGVtZW50KFwiYVwiKTthLmlubmVySFRNTD1cIjx4eXo+PC94eXo+XCIsaj1cImhpZGRlblwiaW4gYSxrPTE9PWEuY2hpbGROb2Rlcy5sZW5ndGh8fGZ1bmN0aW9uKCl7Yi5jcmVhdGVFbGVtZW50KFwiYVwiKTt2YXIgYT1iLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYS5jbG9uZU5vZGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBhLmNyZWF0ZURvY3VtZW50RnJhZ21lbnR8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBhLmNyZWF0ZUVsZW1lbnR9KCl9Y2F0Y2goYyl7aj0hMCxrPSEwfX0oKTt2YXIgcz17ZWxlbWVudHM6bS5lbGVtZW50c3x8XCJhYmJyIGFydGljbGUgYXNpZGUgYXVkaW8gYmRpIGNhbnZhcyBkYXRhIGRhdGFsaXN0IGRldGFpbHMgZGlhbG9nIGZpZ2NhcHRpb24gZmlndXJlIGZvb3RlciBoZWFkZXIgaGdyb3VwIG1haW4gbWFyayBtZXRlciBuYXYgb3V0cHV0IHByb2dyZXNzIHNlY3Rpb24gc3VtbWFyeSB0ZW1wbGF0ZSB0aW1lIHZpZGVvXCIsdmVyc2lvbjpsLHNoaXZDU1M6bS5zaGl2Q1NTIT09ITEsc3VwcG9ydHNVbmtub3duRWxlbWVudHM6ayxzaGl2TWV0aG9kczptLnNoaXZNZXRob2RzIT09ITEsdHlwZTpcImRlZmF1bHRcIixzaGl2RG9jdW1lbnQ6aSxjcmVhdGVFbGVtZW50OmYsY3JlYXRlRG9jdW1lbnRGcmFnbWVudDpnfTthLmh0bWw1PXMsaShiKX0odGhpcyxiKSxvLl92ZXJzaW9uPW4sby5fcHJlZml4ZXM9eCxvLl9kb21QcmVmaXhlcz1BLG8uX2Nzc29tUHJlZml4ZXM9eixvLm1xPUksby5oYXNFdmVudD1KLG8udGVzdFByb3A9ZnVuY3Rpb24oYSl7cmV0dXJuIGgoW2FdKX0sby50ZXN0QWxsUHJvcHM9aixvLnRlc3RTdHlsZXM9SCxvLnByZWZpeGVkPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYj9qKGEsYixjKTpqKGEsXCJwZnhcIil9LHEuY2xhc3NOYW1lPXEuY2xhc3NOYW1lLnJlcGxhY2UoLyhefFxccyluby1qcyhcXHN8JCkvLFwiJDEkMlwiKSsocD9cIiBqcyBcIitGLmpvaW4oXCIgXCIpOlwiXCIpLG99KHRoaXMsdGhpcy5kb2N1bWVudCk7IiwiLypcbiAqIEZvdW5kYXRpb24gUmVzcG9uc2l2ZSBMaWJyYXJ5XG4gKiBodHRwOi8vZm91bmRhdGlvbi56dXJiLmNvbVxuICogQ29weXJpZ2h0IDIwMTQsIFpVUkJcbiAqIEZyZWUgdG8gdXNlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qL1xuXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGhlYWRlcl9oZWxwZXJzID0gZnVuY3Rpb24gKGNsYXNzX2FycmF5KSB7XG4gICAgdmFyIGkgPSBjbGFzc19hcnJheS5sZW5ndGg7XG4gICAgdmFyIGhlYWQgPSAkKCdoZWFkJyk7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoaGVhZC5oYXMoJy4nICsgY2xhc3NfYXJyYXlbaV0pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBoZWFkLmFwcGVuZCgnPG1ldGEgY2xhc3M9XCInICsgY2xhc3NfYXJyYXlbaV0gKyAnXCIgLz4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGVhZGVyX2hlbHBlcnMoW1xuICAgICdmb3VuZGF0aW9uLW1xLXNtYWxsJyxcbiAgICAnZm91bmRhdGlvbi1tcS1zbWFsbC1vbmx5JyxcbiAgICAnZm91bmRhdGlvbi1tcS1tZWRpdW0nLFxuICAgICdmb3VuZGF0aW9uLW1xLW1lZGl1bS1vbmx5JyxcbiAgICAnZm91bmRhdGlvbi1tcS1sYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbGFyZ2Utb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteGxhcmdlJyxcbiAgICAnZm91bmRhdGlvbi1tcS14bGFyZ2Utb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteHhsYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tZGF0YS1hdHRyaWJ1dGUtbmFtZXNwYWNlJ10pO1xuXG4gIC8vIEVuYWJsZSBGYXN0Q2xpY2sgaWYgcHJlc2VudFxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgRmFzdENsaWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gRG9uJ3QgYXR0YWNoIHRvIGJvZHkgaWYgdW5kZWZpbmVkXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBwcml2YXRlIEZhc3QgU2VsZWN0b3Igd3JhcHBlcixcbiAgLy8gcmV0dXJucyBqUXVlcnkgb2JqZWN0LiBPbmx5IHVzZSB3aGVyZVxuICAvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgYXZhaWxhYmxlLlxuICB2YXIgUyA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICB2YXIgY29udDtcbiAgICAgICAgaWYgKGNvbnRleHQuanF1ZXJ5KSB7XG4gICAgICAgICAgY29udCA9IGNvbnRleHRbMF07XG4gICAgICAgICAgaWYgKCFjb250KSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udCA9IGNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQoY29udC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJChzZWxlY3RvciwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gTmFtZXNwYWNlIGZ1bmN0aW9ucy5cblxuICB2YXIgYXR0cl9uYW1lID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgaWYgKCFpbml0KSB7XG4gICAgICBhcnIucHVzaCgnZGF0YScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uYW1lc3BhY2UubGVuZ3RoID4gMCkge1xuICAgICAgYXJyLnB1c2godGhpcy5uYW1lc3BhY2UpO1xuICAgIH1cbiAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuXG4gICAgcmV0dXJuIGFyci5qb2luKCctJyk7XG4gIH07XG5cbiAgdmFyIGFkZF9uYW1lc3BhY2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCctJyksXG4gICAgICAgIGkgPSBwYXJ0cy5sZW5ndGgsXG4gICAgICAgIGFyciA9IFtdO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgYXJyLnB1c2gocGFydHNbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMubmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLm5hbWVzcGFjZSwgcGFydHNbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyci5wdXNoKHBhcnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpLmpvaW4oJy0nKTtcbiAgfTtcblxuICAvLyBFdmVudCBiaW5kaW5nIGFuZCBkYXRhLW9wdGlvbnMgdXBkYXRpbmcuXG5cbiAgdmFyIGJpbmRpbmdzID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYmluZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgc2hvdWxkX2JpbmRfZXZlbnRzID0gISR0aGlzLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcbiAgICAgICAgICAkdGhpcy5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JywgJC5leHRlbmQoe30sIHNlbGYuc2V0dGluZ3MsIChvcHRpb25zIHx8IG1ldGhvZCksIHNlbGYuZGF0YV9vcHRpb25zKCR0aGlzKSkpO1xuXG4gICAgICAgICAgaWYgKHNob3VsZF9iaW5kX2V2ZW50cykge1xuICAgICAgICAgICAgc2VsZi5ldmVudHModGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgaWYgKFModGhpcy5zY29wZSkuaXMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArJ10nKSkge1xuICAgICAgYmluZC5jYWxsKHRoaXMuc2NvcGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBTKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyddJywgdGhpcy5zY29wZSkuZWFjaChiaW5kKTtcbiAgICB9XG4gICAgLy8gIyBQYXRjaCB0byBmaXggIzUwNDMgdG8gbW92ZSB0aGlzICphZnRlciogdGhlIGlmL2Vsc2UgY2xhdXNlIGluIG9yZGVyIGZvciBCYWNrYm9uZSBhbmQgc2ltaWxhciBmcmFtZXdvcmtzIHRvIGhhdmUgaW1wcm92ZWQgY29udHJvbCBvdmVyIGV2ZW50IGJpbmRpbmcgYW5kIGRhdGEtb3B0aW9ucyB1cGRhdGluZy5cbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzW21ldGhvZF0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgfTtcblxuICB2YXIgc2luZ2xlX2ltYWdlX2xvYWRlZCA9IGZ1bmN0aW9uIChpbWFnZSwgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiBsb2FkZWQgKCkge1xuICAgICAgY2FsbGJhY2soaW1hZ2VbMF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRMb2FkICgpIHtcbiAgICAgIHRoaXMub25lKCdsb2FkJywgbG9hZGVkKTtcblxuICAgICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIHZhciBzcmMgPSB0aGlzLmF0dHIoICdzcmMnICksXG4gICAgICAgICAgICBwYXJhbSA9IHNyYy5tYXRjaCggL1xcPy8gKSA/ICcmJyA6ICc/JztcblxuICAgICAgICBwYXJhbSArPSAncmFuZG9tPScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmF0dHIoJ3NyYycsIHNyYyArIHBhcmFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWltYWdlLmF0dHIoJ3NyYycpKSB7XG4gICAgICBsb2FkZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW1hZ2VbMF0uY29tcGxldGUgfHwgaW1hZ2VbMF0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgbG9hZGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJpbmRMb2FkLmNhbGwoaW1hZ2UpO1xuICAgIH1cbiAgfTtcblxuICAvKiEgbWF0Y2hNZWRpYSgpIHBvbHlmaWxsIC0gVGVzdCBhIENTUyBtZWRpYSB0eXBlL3F1ZXJ5IGluIEpTLiBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZSAqL1xuXG4gIHdpbmRvdy5tYXRjaE1lZGlhIHx8ICh3aW5kb3cubWF0Y2hNZWRpYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgbWF0Y2hNZWRpdW0gYXBpIHN1Y2ggYXMgSUUgOSBhbmQgd2Via2l0XG4gICAgICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gICAgICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gICAgICBpZiAoIXN0eWxlTWVkaWEpIHtcbiAgICAgICAgICB2YXIgc3R5bGUgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICAgICAgICBzY3JpcHQgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICAgICAgICAgICAgaW5mbyAgICAgICAgPSBudWxsO1xuXG4gICAgICAgICAgc3R5bGUudHlwZSAgPSAndGV4dC9jc3MnO1xuICAgICAgICAgIHN0eWxlLmlkICAgID0gJ21hdGNobWVkaWFqcy10ZXN0JztcblxuICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcblxuICAgICAgICAgIC8vICdzdHlsZS5jdXJyZW50U3R5bGUnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlJyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgICAgaW5mbyA9ICgnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93KSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHlsZSwgbnVsbCkgfHwgc3R5bGUuY3VycmVudFN0eWxlO1xuXG4gICAgICAgICAgc3R5bGVNZWRpYSA9IHtcbiAgICAgICAgICAgICAgbWF0Y2hNZWRpdW06IGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICdAbWVkaWEgJyArIG1lZGlhICsgJ3sgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9JztcblxuICAgICAgICAgICAgICAgICAgLy8gJ3N0eWxlLnN0eWxlU2hlZXQnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3N0eWxlLnRleHRDb250ZW50JyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgICAgICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgICAgICAgfTtcbiAgICAgIH07XG4gIH0oKSk7XG5cbiAgLypcbiAgICoganF1ZXJ5LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZ25hcmYzNy9qcXVlcnktcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIFJlcXVpcmVzIGpRdWVyeSAxLjgrXG4gICAqXG4gICAqIENvcHlyaWdodCAoYykgMjAxMiBDb3JleSBGcmFuZ1xuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gICAqL1xuXG4gIChmdW5jdGlvbihqUXVlcnkpIHtcblxuXG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBhZGFwdGVkIGZyb20gRXJpayBNw7ZsbGVyXG4gIC8vIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgLy8gaHR0cDovL215Lm9wZXJhLmNvbS9lbW9sbGVyL2Jsb2cvMjAxMS8xMi8yMC9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWVyLWFuaW1hdGluZ1xuXG4gIHZhciBhbmltYXRpbmcsXG4gICAgICBsYXN0VGltZSA9IDAsXG4gICAgICB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J10sXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUsXG4gICAgICBqcXVlcnlGeEF2YWlsYWJsZSA9ICd1bmRlZmluZWQnICE9PSB0eXBlb2YgalF1ZXJ5LmZ4O1xuXG4gIGZvciAoOyBsYXN0VGltZSA8IHZlbmRvcnMubGVuZ3RoICYmICFyZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IGxhc3RUaW1lKyspIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJyBdIHx8XG4gICAgICB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhZigpIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcblxuICAgICAgaWYgKGpxdWVyeUZ4QXZhaWxhYmxlKSB7XG4gICAgICAgIGpRdWVyeS5meC50aWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgIC8vIHVzZSByQUZcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgaWYgKGpxdWVyeUZ4QXZhaWxhYmxlKSB7XG4gICAgICBqUXVlcnkuZngudGltZXIgPSBmdW5jdGlvbiAodGltZXIpIHtcbiAgICAgICAgaWYgKHRpbWVyKCkgJiYgalF1ZXJ5LnRpbWVycy5wdXNoKHRpbWVyKSAmJiAhYW5pbWF0aW5nKSB7XG4gICAgICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICByYWYoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgalF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcG9seWZpbGxcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKSxcbiAgICAgICAgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG5cbiAgfVxuXG4gIH0oICQgKSk7XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUXVvdGVzIChzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgfHwgc3RyaW5nIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXlsnXFxcXC9cIl0rfCg7XFxzP30pK3xbJ1xcXFwvXCJdKyQvZywgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICB3aW5kb3cuRm91bmRhdGlvbiA9IHtcbiAgICBuYW1lIDogJ0ZvdW5kYXRpb24nLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBtZWRpYV9xdWVyaWVzIDoge1xuICAgICAgJ3NtYWxsJyAgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLXNtYWxsJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnc21hbGwtb25seScgIDogUygnLmZvdW5kYXRpb24tbXEtc21hbGwtb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ21lZGl1bScgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLW1lZGl1bScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ21lZGl1bS1vbmx5JyA6IFMoJy5mb3VuZGF0aW9uLW1xLW1lZGl1bS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnbGFyZ2UnICAgICAgIDogUygnLmZvdW5kYXRpb24tbXEtbGFyZ2UnKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdsYXJnZS1vbmx5JyAgOiBTKCcuZm91bmRhdGlvbi1tcS1sYXJnZS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneGxhcmdlJyAgICAgIDogUygnLmZvdW5kYXRpb24tbXEteGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneGxhcmdlLW9ubHknIDogUygnLmZvdW5kYXRpb24tbXEteGxhcmdlLW9ubHknKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICd4eGxhcmdlJyAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS14eGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJylcbiAgICB9LFxuXG4gICAgc3R5bGVzaGVldCA6ICQoJzxzdHlsZT48L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJylbMF0uc2hlZXQsXG5cbiAgICBnbG9iYWwgOiB7XG4gICAgICBuYW1lc3BhY2UgOiB1bmRlZmluZWRcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzY29wZSwgbGlicmFyaWVzLCBtZXRob2QsIG9wdGlvbnMsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtzY29wZSwgbWV0aG9kLCBvcHRpb25zLCByZXNwb25zZV0sXG4gICAgICAgICAgcmVzcG9uc2VzID0gW107XG5cbiAgICAgIC8vIGNoZWNrIFJUTFxuICAgICAgdGhpcy5ydGwgPSAvcnRsL2kudGVzdChTKCdodG1sJykuYXR0cignZGlyJykpO1xuXG4gICAgICAvLyBzZXQgZm91bmRhdGlvbiBnbG9iYWwgc2NvcGVcbiAgICAgIHRoaXMuc2NvcGUgPSBzY29wZSB8fCB0aGlzLnNjb3BlO1xuXG4gICAgICB0aGlzLnNldF9uYW1lc3BhY2UoKTtcblxuICAgICAgaWYgKGxpYnJhcmllcyAmJiB0eXBlb2YgbGlicmFyaWVzID09PSAnc3RyaW5nJyAmJiAhL3JlZmxvdy9pLnRlc3QobGlicmFyaWVzKSkge1xuICAgICAgICBpZiAodGhpcy5saWJzLmhhc093blByb3BlcnR5KGxpYnJhcmllcykpIHtcbiAgICAgICAgICByZXNwb25zZXMucHVzaCh0aGlzLmluaXRfbGliKGxpYnJhcmllcywgYXJncykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBsaWIgaW4gdGhpcy5saWJzKSB7XG4gICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5pbml0X2xpYihsaWIsIGxpYnJhcmllcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFMod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUyh3aW5kb3cpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5jbGVhcmluZycpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5kcm9wZG93bicpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5lcXVhbGl6ZXInKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uaW50ZXJjaGFuZ2UnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uam95cmlkZScpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5tYWdlbGxhbicpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uc2xpZGVyJyk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHNjb3BlO1xuICAgIH0sXG5cbiAgICBpbml0X2xpYiA6IGZ1bmN0aW9uIChsaWIsIGFyZ3MpIHtcbiAgICAgIGlmICh0aGlzLmxpYnMuaGFzT3duUHJvcGVydHkobGliKSkge1xuICAgICAgICB0aGlzLnBhdGNoKHRoaXMubGlic1tsaWJdKTtcblxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmhhc093blByb3BlcnR5KGxpYikpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5saWJzW2xpYl0uc2V0dGluZ3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoaXMubGlic1tsaWJdLnNldHRpbmdzLCBhcmdzW2xpYl0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5saWJzW2xpYl0uZGVmYXVsdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoaXMubGlic1tsaWJdLmRlZmF1bHRzLCBhcmdzW2xpYl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmxpYnNbbGliXS5pbml0LmFwcGx5KHRoaXMubGlic1tsaWJdLCBbdGhpcy5zY29wZSwgYXJnc1tsaWJdXSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzID0gYXJncyBpbnN0YW5jZW9mIEFycmF5ID8gYXJncyA6IG5ldyBBcnJheShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlic1tsaWJdLmluaXQuYXBwbHkodGhpcy5saWJzW2xpYl0sIGFyZ3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgfSxcblxuICAgIHBhdGNoIDogZnVuY3Rpb24gKGxpYikge1xuICAgICAgbGliLnNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgIGxpYi5uYW1lc3BhY2UgPSB0aGlzLmdsb2JhbC5uYW1lc3BhY2U7XG4gICAgICBsaWIucnRsID0gdGhpcy5ydGw7XG4gICAgICBsaWJbJ2RhdGFfb3B0aW9ucyddID0gdGhpcy51dGlscy5kYXRhX29wdGlvbnM7XG4gICAgICBsaWJbJ2F0dHJfbmFtZSddID0gYXR0cl9uYW1lO1xuICAgICAgbGliWydhZGRfbmFtZXNwYWNlJ10gPSBhZGRfbmFtZXNwYWNlO1xuICAgICAgbGliWydiaW5kaW5ncyddID0gYmluZGluZ3M7XG4gICAgICBsaWJbJ1MnXSA9IHRoaXMudXRpbHMuUztcbiAgICB9LFxuXG4gICAgaW5oZXJpdCA6IGZ1bmN0aW9uIChzY29wZSwgbWV0aG9kcykge1xuICAgICAgdmFyIG1ldGhvZHNfYXJyID0gbWV0aG9kcy5zcGxpdCgnICcpLFxuICAgICAgICAgIGkgPSBtZXRob2RzX2Fyci5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbHMuaGFzT3duUHJvcGVydHkobWV0aG9kc19hcnJbaV0pKSB7XG4gICAgICAgICAgc2NvcGVbbWV0aG9kc19hcnJbaV1dID0gdGhpcy51dGlsc1ttZXRob2RzX2FycltpXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0X25hbWVzcGFjZSA6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBEb24ndCBib3RoZXIgcmVhZGluZyB0aGUgbmFtZXNwYWNlIG91dCBvZiB0aGUgbWV0YSB0YWdcbiAgICAgIC8vICAgIGlmIHRoZSBuYW1lc3BhY2UgaGFzIGJlZW4gc2V0IGdsb2JhbGx5IGluIGphdmFzY3JpcHRcbiAgICAgIC8vXG4gICAgICAvLyBFeGFtcGxlOlxuICAgICAgLy8gICAgRm91bmRhdGlvbi5nbG9iYWwubmFtZXNwYWNlID0gJ215LW5hbWVzcGFjZSc7XG4gICAgICAvLyBvciBtYWtlIGl0IGFuIGVtcHR5IHN0cmluZzpcbiAgICAgIC8vICAgIEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZSA9ICcnO1xuICAgICAgLy9cbiAgICAgIC8vXG5cbiAgICAgIC8vIElmIHRoZSBuYW1lc3BhY2UgaGFzIG5vdCBiZWVuIHNldCAoaXMgdW5kZWZpbmVkKSwgdHJ5IHRvIHJlYWQgaXQgb3V0IG9mIHRoZSBtZXRhIGVsZW1lbnQuXG4gICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBnbG9iYWxseSBkZWZpbmVkIG5hbWVzcGFjZSwgZXZlbiBpZiBpdCdzIGVtcHR5ICgnJylcbiAgICAgIHZhciBuYW1lc3BhY2UgPSAoIHRoaXMuZ2xvYmFsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkICkgPyAkKCcuZm91bmRhdGlvbi1kYXRhLWF0dHJpYnV0ZS1uYW1lc3BhY2UnKS5jc3MoJ2ZvbnQtZmFtaWx5JykgOiB0aGlzLmdsb2JhbC5uYW1lc3BhY2U7XG5cbiAgICAgIC8vIEZpbmFsbHksIGlmIHRoZSBuYW1zZXBhY2UgaXMgZWl0aGVyIHVuZGVmaW5lZCBvciBmYWxzZSwgc2V0IGl0IHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIG5hbWVzcGFjZSB2YWx1ZS5cbiAgICAgIHRoaXMuZ2xvYmFsLm5hbWVzcGFjZSA9ICggbmFtZXNwYWNlID09PSB1bmRlZmluZWQgfHwgL2ZhbHNlL2kudGVzdChuYW1lc3BhY2UpICkgPyAnJyA6IG5hbWVzcGFjZTtcbiAgICB9LFxuXG4gICAgbGlicyA6IHt9LFxuXG4gICAgLy8gbWV0aG9kcyB0aGF0IGNhbiBiZSBpbmhlcml0ZWQgaW4gbGlicmFyaWVzXG4gICAgdXRpbHMgOiB7XG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRmFzdCBTZWxlY3RvciB3cmFwcGVyIHJldHVybnMgalF1ZXJ5IG9iamVjdC4gT25seSB1c2Ugd2hlcmUgZ2V0RWxlbWVudEJ5SWRcbiAgICAgIC8vICAgIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgU2VsZWN0b3IgKFN0cmluZyk6IENTUyBzZWxlY3RvciBkZXNjcmliaW5nIHRoZSBlbGVtZW50KHMpIHRvIGJlXG4gICAgICAvLyAgICByZXR1cm5lZCBhcyBhIGpRdWVyeSBvYmplY3QuXG4gICAgICAvL1xuICAgICAgLy8gICAgU2NvcGUgKFN0cmluZyk6IENTUyBzZWxlY3RvciBkZXNjcmliaW5nIHRoZSBhcmVhIHRvIGJlIHNlYXJjaGVkLiBEZWZhdWx0XG4gICAgICAvLyAgICBpcyBkb2N1bWVudC5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgRWxlbWVudCAoalF1ZXJ5IE9iamVjdCk6IGpRdWVyeSBvYmplY3QgY29udGFpbmluZyBlbGVtZW50cyBtYXRjaGluZyB0aGVcbiAgICAgIC8vICAgIHNlbGVjdG9yIHdpdGhpbiB0aGUgc2NvcGUuXG4gICAgICBTIDogUyxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBFeGVjdXRlcyBhIGZ1bmN0aW9uIGEgbWF4IG9mIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBGdW5jIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBEZWxheSAoSW50ZWdlcik6IEZ1bmN0aW9uIGV4ZWN1dGlvbiB0aHJlc2hvbGQgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBMYXp5X2Z1bmN0aW9uIChGdW5jdGlvbik6IEZ1bmN0aW9uIHdpdGggdGhyb3R0bGluZyBhcHBsaWVkLlxuICAgICAgdGhyb3R0bGUgOiBmdW5jdGlvbiAoZnVuYywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgIGlmICh0aW1lciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBFeGVjdXRlcyBhIGZ1bmN0aW9uIHdoZW4gaXQgc3RvcHMgYmVpbmcgaW52b2tlZCBmb3IgbiBzZWNvbmRzXG4gICAgICAvLyAgICBNb2RpZmllZCB2ZXJzaW9uIG9mIF8uZGVib3VuY2UoKSBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEZ1bmMgKEZ1bmN0aW9uKTogRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkLlxuICAgICAgLy9cbiAgICAgIC8vICAgIERlbGF5IChJbnRlZ2VyKTogRnVuY3Rpb24gZXhlY3V0aW9uIHRocmVzaG9sZCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAvL1xuICAgICAgLy8gICAgSW1tZWRpYXRlIChCb29sKTogV2hldGhlciB0aGUgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICAvLyAgICBvZiB0aGUgZGVsYXkgaW5zdGVhZCBvZiB0aGUgZW5kLiBEZWZhdWx0IGlzIGZhbHNlLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBMYXp5X2Z1bmN0aW9uIChGdW5jdGlvbik6IEZ1bmN0aW9uIHdpdGggZGVib3VuY2luZyBhcHBsaWVkLlxuICAgICAgZGVib3VuY2UgOiBmdW5jdGlvbiAoZnVuYywgZGVsYXksIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIGRlbGF5KTtcbiAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUGFyc2VzIGRhdGEtb3B0aW9ucyBhdHRyaWJ1dGVcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBFbCAoalF1ZXJ5IE9iamVjdCk6IEVsZW1lbnQgdG8gYmUgcGFyc2VkLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBPcHRpb25zIChKYXZhc2NyaXB0IE9iamVjdCk6IENvbnRlbnRzIG9mIHRoZSBlbGVtZW50J3MgZGF0YS1vcHRpb25zXG4gICAgICAvLyAgICBhdHRyaWJ1dGUuXG4gICAgICBkYXRhX29wdGlvbnMgOiBmdW5jdGlvbiAoZWwsIGRhdGFfYXR0cl9uYW1lKSB7XG4gICAgICAgIGRhdGFfYXR0cl9uYW1lID0gZGF0YV9hdHRyX25hbWUgfHwgJ29wdGlvbnMnO1xuICAgICAgICB2YXIgb3B0cyA9IHt9LCBpaSwgcCwgb3B0c19hcnIsXG4gICAgICAgICAgICBkYXRhX29wdGlvbnMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZTtcblxuICAgICAgICAgICAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuZGF0YShuYW1lc3BhY2UgKyAnLScgKyBkYXRhX2F0dHJfbmFtZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZWwuZGF0YShkYXRhX2F0dHJfbmFtZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjYWNoZWRfb3B0aW9ucyA9IGRhdGFfb3B0aW9ucyhlbCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWNoZWRfb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVkX29wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzX2FyciA9IChjYWNoZWRfb3B0aW9ucyB8fCAnOicpLnNwbGl0KCc7Jyk7XG4gICAgICAgIGlpID0gb3B0c19hcnIubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzTnVtYmVyIChvKSB7XG4gICAgICAgICAgcmV0dXJuICFpc05hTiAobyAtIDApICYmIG8gIT09IG51bGwgJiYgbyAhPT0gJycgJiYgbyAhPT0gZmFsc2UgJiYgbyAhPT0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyaW0gKHN0cikge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuICQudHJpbShzdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGlpLS0pIHtcbiAgICAgICAgICBwID0gb3B0c19hcnJbaWldLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgcCA9IFtwWzBdLCBwLnNsaWNlKDEpLmpvaW4oJzonKV07XG5cbiAgICAgICAgICBpZiAoL3RydWUvaS50ZXN0KHBbMV0pKSB7XG4gICAgICAgICAgICBwWzFdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKC9mYWxzZS9pLnRlc3QocFsxXSkpIHtcbiAgICAgICAgICAgIHBbMV0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzTnVtYmVyKHBbMV0pKSB7XG4gICAgICAgICAgICBpZiAocFsxXS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHBbMV0gPSBwYXJzZUludChwWzFdLCAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwWzFdID0gcGFyc2VGbG9hdChwWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocC5sZW5ndGggPT09IDIgJiYgcFswXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcHRzW3RyaW0ocFswXSldID0gdHJpbShwWzFdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgQWRkcyBKUy1yZWNvZ25pemFibGUgbWVkaWEgcXVlcmllc1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIE1lZGlhIChTdHJpbmcpOiBLZXkgc3RyaW5nIGZvciB0aGUgbWVkaWEgcXVlcnkgdG8gYmUgc3RvcmVkIGFzIGluXG4gICAgICAvLyAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNcbiAgICAgIC8vXG4gICAgICAvLyAgICBDbGFzcyAoU3RyaW5nKTogQ2xhc3MgbmFtZSBmb3IgdGhlIGdlbmVyYXRlZCA8bWV0YT4gdGFnXG4gICAgICByZWdpc3Rlcl9tZWRpYSA6IGZ1bmN0aW9uIChtZWRpYSwgbWVkaWFfY2xhc3MpIHtcbiAgICAgICAgaWYgKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxtZXRhIGNsYXNzPVwiJyArIG1lZGlhX2NsYXNzICsgJ1wiLz4nKTtcbiAgICAgICAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdID0gcmVtb3ZlUXVvdGVzKCQoJy4nICsgbWVkaWFfY2xhc3MpLmNzcygnZm9udC1mYW1pbHknKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgQWRkIGN1c3RvbSBDU1Mgd2l0aGluIGEgSlMtZGVmaW5lZCBtZWRpYSBxdWVyeVxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIFJ1bGUgKFN0cmluZyk6IENTUyBydWxlIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBkb2N1bWVudC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBNZWRpYSAoU3RyaW5nKTogT3B0aW9uYWwgbWVkaWEgcXVlcnkgc3RyaW5nIGZvciB0aGUgQ1NTIHJ1bGUgdG8gYmVcbiAgICAgIC8vICAgIG5lc3RlZCB1bmRlci5cbiAgICAgIGFkZF9jdXN0b21fcnVsZSA6IGZ1bmN0aW9uIChydWxlLCBtZWRpYSkge1xuICAgICAgICBpZiAobWVkaWEgPT09IHVuZGVmaW5lZCAmJiBGb3VuZGF0aW9uLnN0eWxlc2hlZXQpIHtcbiAgICAgICAgICBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuaW5zZXJ0UnVsZShydWxlLCBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcXVlcnkgPSBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdO1xuXG4gICAgICAgICAgaWYgKHF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIEZvdW5kYXRpb24uc3R5bGVzaGVldC5pbnNlcnRSdWxlKCdAbWVkaWEgJyArXG4gICAgICAgICAgICAgIEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV0gKyAneyAnICsgcnVsZSArICcgfScsIEZvdW5kYXRpb24uc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBQZXJmb3JtcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYW4gaW1hZ2UgaXMgZnVsbHkgbG9hZGVkXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgSW1hZ2UgKGpRdWVyeSBPYmplY3QpOiBJbWFnZShzKSB0byBjaGVjayBpZiBsb2FkZWQuXG4gICAgICAvL1xuICAgICAgLy8gICAgQ2FsbGJhY2sgKEZ1bmN0aW9uKTogRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZC5cbiAgICAgIGltYWdlX2xvYWRlZCA6IGZ1bmN0aW9uIChpbWFnZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHVubG9hZGVkID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiBwaWN0dXJlc19oYXNfaGVpZ2h0KGltYWdlcykge1xuICAgICAgICAgIHZhciBwaWN0dXJlc19udW1iZXIgPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHBpY3R1cmVzX251bWJlciAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZihpbWFnZXMuYXR0cignaGVpZ2h0JykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bmxvYWRlZCA9PT0gMCB8fCBwaWN0dXJlc19oYXNfaGVpZ2h0KGltYWdlcykpIHtcbiAgICAgICAgICBjYWxsYmFjayhpbWFnZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1hZ2VzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNpbmdsZV9pbWFnZV9sb2FkZWQoc2VsZi5TKHRoaXMpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bmxvYWRlZCAtPSAxO1xuICAgICAgICAgICAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBSZXR1cm5zIGEgcmFuZG9tLCBhbHBoYW51bWVyaWMgc3RyaW5nXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgTGVuZ3RoIChJbnRlZ2VyKTogTGVuZ3RoIG9mIHN0cmluZyB0byBiZSBnZW5lcmF0ZWQuIERlZmF1bHRzIHRvIHJhbmRvbVxuICAgICAgLy8gICAgaW50ZWdlci5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgUmFuZCAoU3RyaW5nKTogUHNldWRvLXJhbmRvbSwgYWxwaGFudW1lcmljIHN0cmluZy5cbiAgICAgIHJhbmRvbV9zdHIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5maWR4KSB7XG4gICAgICAgICAgdGhpcy5maWR4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZWZpeCA9IHRoaXMucHJlZml4IHx8IFsodGhpcy5uYW1lIHx8ICdGJyksICgrbmV3IERhdGUpLnRvU3RyaW5nKDM2KV0uam9pbignLScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArICh0aGlzLmZpZHgrKykudG9TdHJpbmcoMzYpO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBIZWxwZXIgZm9yIHdpbmRvdy5tYXRjaE1lZGlhXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgbXEgKFN0cmluZyk6IE1lZGlhIHF1ZXJ5XG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIChCb29sZWFuKTogV2hldGhlciB0aGUgbWVkaWEgcXVlcnkgcGFzc2VzIG9yIG5vdFxuICAgICAgbWF0Y2ggOiBmdW5jdGlvbiAobXEpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKG1xKS5tYXRjaGVzO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBIZWxwZXJzIGZvciBjaGVja2luZyBGb3VuZGF0aW9uIGRlZmF1bHQgbWVkaWEgcXVlcmllcyB3aXRoIEpTXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIChCb29sZWFuKTogV2hldGhlciB0aGUgbWVkaWEgcXVlcnkgcGFzc2VzIG9yIG5vdFxuXG4gICAgICBpc19zbWFsbF91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX21lZGl1bV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSk7XG4gICAgICB9LFxuXG4gICAgICBpc19sYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLmxhcmdlKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3hsYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnhsYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc194eGxhcmdlX3VwIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMueHhsYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc19zbWFsbF9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgIXRoaXMuaXNfbGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc19tZWRpdW1fb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgIXRoaXMuaXNfbGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc19sYXJnZV9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc19tZWRpdW1fdXAoKSAmJiB0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfeGxhcmdlX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmIHRoaXMuaXNfbGFyZ2VfdXAoKSAmJiB0aGlzLmlzX3hsYXJnZV91cCgpICYmICF0aGlzLmlzX3h4bGFyZ2VfdXAoKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3h4bGFyZ2Vfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgdGhpcy5pc19sYXJnZV91cCgpICYmIHRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICQuZm4uZm91bmRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5pdC5hcHBseShGb3VuZGF0aW9uLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9O1xuXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duID0ge1xuICAgIG5hbWUgOiAnZHJvcGRvd24nLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIGFjdGl2ZV9jbGFzcyA6ICdvcGVuJyxcbiAgICAgIGRpc2FibGVkX2NsYXNzIDogJ2Rpc2FibGVkJyxcbiAgICAgIG1lZ2FfY2xhc3MgOiAnbWVnYScsXG4gICAgICBhbGlnbiA6ICdib3R0b20nLFxuICAgICAgaXNfaG92ZXIgOiBmYWxzZSxcbiAgICAgIGhvdmVyX3RpbWVvdXQgOiAxNTAsXG4gICAgICBvcGVuZWQgOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGNsb3NlZCA6IGZ1bmN0aW9uICgpIHt9XG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICd0aHJvdHRsZScpO1xuXG4gICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLnNldHRpbmdzLCBtZXRob2QsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gc2VsZi5TO1xuXG4gICAgICBTKHRoaXMuc2NvcGUpXG4gICAgICAgIC5vZmYoJy5kcm9wZG93bicpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4uZHJvcGRvd24nLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBzZXR0aW5ncyA9IFModGhpcykuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5pc19ob3ZlciB8fCBNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChTKHRoaXMpLnBhcmVudCgnW2RhdGEtcmV2ZWFsLWlkXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50b2dnbGUoJCh0aGlzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZW50ZXIuZm5kdG4uZHJvcGRvd24nLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10sIFsnICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICAgIGRyb3Bkb3duLFxuICAgICAgICAgICAgICB0YXJnZXQ7XG5cbiAgICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KTtcblxuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICBkcm9wZG93biA9IFMoJyMnICsgJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSk7XG4gICAgICAgICAgICB0YXJnZXQgPSAkdGhpcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJvcGRvd24gPSAkdGhpcztcbiAgICAgICAgICAgIHRhcmdldCA9IFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9XCInICsgZHJvcGRvd24uYXR0cignaWQnKSArICdcIl0nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG5cbiAgICAgICAgICBpZiAoUyhlLmN1cnJlbnRUYXJnZXQpLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkgJiYgc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgIHNlbGYuY2xvc2VhbGwuY2FsbChzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgIHNlbGYub3Blbi5hcHBseShzZWxmLCBbZHJvcGRvd24sIHRhcmdldF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddLCBbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpO1xuICAgICAgICAgIHZhciBzZXR0aW5ncztcblxuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICAgIHNldHRpbmdzID0gJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cih0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCAgID0gUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJz1cIicgKyBTKHRoaXMpLmF0dHIoJ2lkJykgKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRhcmdldC5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JykgfHwgc2VsZi5zZXR0aW5ncztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsICR0aGlzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0uYmluZCh0aGlzKSwgc2V0dGluZ3MuaG92ZXJfdGltZW91dCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4uZHJvcGRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBTKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJyk7XG4gICAgICAgICAgdmFyIGxpbmtzICA9IHBhcmVudC5maW5kKCdhJyk7XG5cbiAgICAgICAgICBpZiAobGlua3MubGVuZ3RoID4gMCAmJiBwYXJlbnQuYXR0cignYXJpYS1hdXRvY2xvc2UnKSAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGRvY3VtZW50ICYmICEkLmNvbnRhaW5zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFMoZS50YXJnZXQpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKFMoZS50YXJnZXQpLmRhdGEoJ3JldmVhbElkJykpICYmXG4gICAgICAgICAgICAocGFyZW50Lmxlbmd0aCA+IDAgJiYgKFMoZS50YXJnZXQpLmlzKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykgfHxcbiAgICAgICAgICAgICAgJC5jb250YWlucyhwYXJlbnQuZmlyc3QoKVswXSwgZS50YXJnZXQpKSkpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignb3BlbmVkLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5vcGVuZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbG9zZWQuZm5kdG4uZHJvcGRvd24nLCAnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmNsb3NlZC5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcblxuICAgICAgUyh3aW5kb3cpXG4gICAgICAgIC5vZmYoJy5kcm9wZG93bicpXG4gICAgICAgIC5vbigncmVzaXplLmZuZHRuLmRyb3Bkb3duJywgc2VsZi50aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5yZXNpemUuY2FsbChzZWxmKTtcbiAgICAgICAgfSwgNTApKTtcblxuICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9LFxuXG4gICAgY2xvc2UgOiBmdW5jdGlvbiAoZHJvcGRvd24pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGRyb3Bkb3duLmVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxfdGFyZ2V0ID0gJCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJz0nICsgZHJvcGRvd25baWR4XS5pZCArICddJykgfHwgJCgnYXJpYS1jb250cm9scz0nICsgZHJvcGRvd25baWR4XS5pZCArICddJyk7XG4gICAgICAgIG9yaWdpbmFsX3RhcmdldC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIGlmIChzZWxmLlModGhpcykuaGFzQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpKSB7XG4gICAgICAgICAgc2VsZi5TKHRoaXMpXG4gICAgICAgICAgICAuY3NzKEZvdW5kYXRpb24ucnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JywgJy05OTk5OXB4JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhzZWxmLnNldHRpbmdzLmFjdGl2ZV9jbGFzcylcbiAgICAgICAgICAgIC5wcmV2KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpXG4gICAgICAgICAgICAucmVtb3ZlRGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgICBzZWxmLlModGhpcykudHJpZ2dlcignY2xvc2VkLmZuZHRuLmRyb3Bkb3duJywgW2Ryb3Bkb3duXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2Ytb3Blbi0nICsgdGhpcy5hdHRyX25hbWUodHJ1ZSkpO1xuICAgIH0sXG5cbiAgICBjbG9zZWFsbCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICQuZWFjaChzZWxmLlMoJy5mLW9wZW4tJyArIHRoaXMuYXR0cl9uYW1lKHRydWUpKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgc2VsZi5TKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvcGVuIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQpIHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmNzcyhkcm9wZG93blxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpLCB0YXJnZXQpO1xuICAgICAgZHJvcGRvd24ucHJldignWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdGl2ZV9jbGFzcyk7XG4gICAgICBkcm9wZG93bi5kYXRhKCd0YXJnZXQnLCB0YXJnZXQuZ2V0KDApKS50cmlnZ2VyKCdvcGVuZWQuZm5kdG4uZHJvcGRvd24nLCBbZHJvcGRvd24sIHRhcmdldF0pO1xuICAgICAgZHJvcGRvd24uYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIHRhcmdldC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgIGRyb3Bkb3duLmZvY3VzKCk7XG4gICAgICBkcm9wZG93bi5hZGRDbGFzcygnZi1vcGVuLScgKyB0aGlzLmF0dHJfbmFtZSh0cnVlKSk7XG4gICAgfSxcblxuICAgIGRhdGFfYXR0ciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZSArICctJyArIHRoaXMubmFtZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldC5oYXNDbGFzcyh0aGlzLnNldHRpbmdzLmRpc2FibGVkX2NsYXNzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZHJvcGRvd24gPSB0aGlzLlMoJyMnICsgdGFyZ2V0LmRhdGEodGhpcy5kYXRhX2F0dHIoKSkpO1xuICAgICAgaWYgKGRyb3Bkb3duLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBObyBkcm9wZG93biBmb3VuZCwgbm90IGNvbnRpbnVpbmdcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsb3NlLmNhbGwodGhpcywgdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykubm90KGRyb3Bkb3duKSk7XG5cbiAgICAgIGlmIChkcm9wZG93bi5oYXNDbGFzcyh0aGlzLnNldHRpbmdzLmFjdGl2ZV9jbGFzcykpIHtcbiAgICAgICAgdGhpcy5jbG9zZS5jYWxsKHRoaXMsIGRyb3Bkb3duKTtcbiAgICAgICAgaWYgKGRyb3Bkb3duLmRhdGEoJ3RhcmdldCcpICE9PSB0YXJnZXQuZ2V0KDApKSB7XG4gICAgICAgICAgdGhpcy5vcGVuLmNhbGwodGhpcywgZHJvcGRvd24sIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3Blbi5jYWxsKHRoaXMsIGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNpemUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZHJvcGRvd24gPSB0aGlzLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0ub3BlbicpO1xuICAgICAgdmFyIHRhcmdldCA9ICQoZHJvcGRvd24uZGF0YShcInRhcmdldFwiKSk7XG5cbiAgICAgIGlmIChkcm9wZG93bi5sZW5ndGggJiYgdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNzcyhkcm9wZG93biwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY3NzIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQpIHtcbiAgICAgIHZhciBsZWZ0X29mZnNldCA9IE1hdGgubWF4KCh0YXJnZXQud2lkdGgoKSAtIGRyb3Bkb3duLndpZHRoKCkpIC8gMiwgOCksXG4gICAgICAgICAgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgcGFyZW50T3ZlcmZsb3cgPSBkcm9wZG93bi5wYXJlbnQoKS5jc3MoJ292ZXJmbG93LXknKSB8fCBkcm9wZG93bi5wYXJlbnQoKS5jc3MoJ292ZXJmbG93Jyk7XG5cbiAgICAgIHRoaXMuY2xlYXJfaWR4KCk7XG5cblxuXG4gICAgICBpZiAodGhpcy5zbWFsbCgpKSB7XG4gICAgICAgIHZhciBwID0gdGhpcy5kaXJzLmJvdHRvbS5jYWxsKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKTtcblxuICAgICAgICBkcm9wZG93bi5hdHRyKCdzdHlsZScsICcnKS5yZW1vdmVDbGFzcygnZHJvcC1sZWZ0IGRyb3AtcmlnaHQgZHJvcC10b3AnKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICB3aWR0aCA6ICc5NSUnLFxuICAgICAgICAgICdtYXgtd2lkdGgnIDogJ25vbmUnLFxuICAgICAgICAgIHRvcCA6IHAudG9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRyb3Bkb3duLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCcgOiAnbGVmdCcsIGxlZnRfb2Zmc2V0KTtcbiAgICAgIH1cbiAgICAgIC8vIGRldGVjdCBpZiBkcm9wZG93biBpcyBpbiBhbiBvdmVyZmxvdyBjb250YWluZXJcbiAgICAgIGVsc2UgaWYgKHBhcmVudE92ZXJmbG93ICE9PSAndmlzaWJsZScpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRhcmdldFswXS5vZmZzZXRUb3AgKyB0YXJnZXRbMF0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGRyb3Bkb3duLmF0dHIoJ3N0eWxlJywgJycpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb24gOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcCA6IG9mZnNldFxuICAgICAgICB9KTtcblxuICAgICAgICBkcm9wZG93bi5jc3MoRm91bmRhdGlvbi5ydGwgPyAncmlnaHQnIDogJ2xlZnQnLCBsZWZ0X29mZnNldCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcblxuICAgICAgICB0aGlzLnN0eWxlKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3Bkb3duO1xuICAgIH0sXG5cbiAgICBzdHlsZSA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGNzcyA9ICQuZXh0ZW5kKHtwb3NpdGlvbiA6ICdhYnNvbHV0ZSd9LFxuICAgICAgICB0aGlzLmRpcnNbc2V0dGluZ3MuYWxpZ25dLmNhbGwoZHJvcGRvd24sIHRhcmdldCwgc2V0dGluZ3MpKTtcblxuICAgICAgZHJvcGRvd24uYXR0cignc3R5bGUnLCAnJykuY3NzKGNzcyk7XG4gICAgfSxcblxuICAgIC8vIHJldHVybiBDU1MgcHJvcGVydHkgb2JqZWN0XG4gICAgLy8gYHRoaXNgIGlzIHRoZSBkcm9wZG93blxuICAgIGRpcnMgOiB7XG4gICAgICAvLyBDYWxjdWxhdGUgdGFyZ2V0IG9mZnNldFxuICAgICAgX2Jhc2UgOiBmdW5jdGlvbiAodCkge1xuICAgICAgICB2YXIgb19wID0gdGhpcy5vZmZzZXRQYXJlbnQoKSxcbiAgICAgICAgICAgIG8gPSBvX3Aub2Zmc2V0KCksXG4gICAgICAgICAgICBwID0gdC5vZmZzZXQoKTtcblxuICAgICAgICBwLnRvcCAtPSBvLnRvcDtcbiAgICAgICAgcC5sZWZ0IC09IG8ubGVmdDtcblxuICAgICAgICAvL3NldCBzb21lIGZsYWdzIG9uIHRoZSBwIG9iamVjdCB0byBwYXNzIGFsb25nXG4gICAgICAgIHAubWlzc1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHAubWlzc1RvcCA9IGZhbHNlO1xuICAgICAgICBwLm1pc3NMZWZ0ID0gZmFsc2U7XG4gICAgICAgIHAubGVmdFJpZ2h0RmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vbGV0cyBzZWUgaWYgdGhlIHBhbmVsIHdpbGwgYmUgb2ZmIHRoZSBzY3JlZW5cbiAgICAgICAgLy9nZXQgdGhlIGFjdHVhbCB3aWR0aCBvZiB0aGUgcGFnZSBhbmQgc3RvcmUgaXRcbiAgICAgICAgdmFyIGFjdHVhbEJvZHlXaWR0aDtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JvdycpWzBdKSB7XG4gICAgICAgICAgYWN0dWFsQm9keVdpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncm93JylbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0dWFsQm9keVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0dWFsTWFyZ2luV2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSBhY3R1YWxCb2R5V2lkdGgpIC8gMjtcbiAgICAgICAgdmFyIGFjdHVhbEJvdW5kYXJ5ID0gYWN0dWFsQm9keVdpZHRoO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNDbGFzcygnbWVnYScpKSB7XG4gICAgICAgICAgLy9taXNzIHRvcFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLnRvcCA8PSB0aGlzLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIHAubWlzc1RvcCA9IHRydWU7XG4gICAgICAgICAgICBhY3R1YWxCb3VuZGFyeSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gYWN0dWFsTWFyZ2luV2lkdGg7XG4gICAgICAgICAgICBwLmxlZnRSaWdodEZsYWcgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vbWlzcyByaWdodFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLmxlZnQgKyB0aGlzLm91dGVyV2lkdGgoKSA+IHQub2Zmc2V0KCkubGVmdCArIGFjdHVhbE1hcmdpbldpZHRoICYmIHQub2Zmc2V0KCkubGVmdCAtIGFjdHVhbE1hcmdpbldpZHRoID4gdGhpcy5vdXRlcldpZHRoKCkpIHtcbiAgICAgICAgICAgIHAubWlzc1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHAubWlzc0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL21pc3MgbGVmdFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSA8PSAwKSB7XG4gICAgICAgICAgICBwLm1pc3NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHAubWlzc1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9LFxuXG4gICAgICB0b3AgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bixcbiAgICAgICAgICAgIHAgPSBzZWxmLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICB0aGlzLmFkZENsYXNzKCdkcm9wLXRvcCcpO1xuXG4gICAgICAgIGlmIChwLm1pc3NUb3AgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCkgKyB0aGlzLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC10b3AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Lm91dGVyV2lkdGgoKSA8IHRoaXMub3V0ZXJXaWR0aCgpIHx8IHNlbGYuc21hbGwoKSB8fCB0aGlzLmhhc0NsYXNzKHMubWVnYV9tZW51KSkge1xuICAgICAgICAgIHNlbGYuYWRqdXN0X3BpcCh0aGlzLCB0LCBzLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChGb3VuZGF0aW9uLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCksXG4gICAgICAgICAgICB0b3AgOiBwLnRvcCAtIHRoaXMub3V0ZXJIZWlnaHQoKX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQsIHRvcCA6IHAudG9wIC0gdGhpcy5vdXRlckhlaWdodCgpfTtcbiAgICAgIH0sXG5cbiAgICAgIGJvdHRvbSA6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIHZhciBzZWxmID0gRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duLFxuICAgICAgICAgICAgcCA9IHNlbGYuZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpO1xuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Lm91dGVyV2lkdGgoKSA8IHRoaXMub3V0ZXJXaWR0aCgpIHx8IHNlbGYuc21hbGwoKSB8fCB0aGlzLmhhc0NsYXNzKHMubWVnYV9tZW51KSkge1xuICAgICAgICAgIHNlbGYuYWRqdXN0X3BpcCh0aGlzLCB0LCBzLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wICsgdC5vdXRlckhlaWdodCgpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCwgdG9wIDogcC50b3AgKyB0Lm91dGVySGVpZ2h0KCl9O1xuICAgICAgfSxcblxuICAgICAgbGVmdCA6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIHZhciBwID0gRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICB0aGlzLmFkZENsYXNzKCdkcm9wLWxlZnQnKTtcblxuICAgICAgICBpZiAocC5taXNzTGVmdCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gIHAubGVmdCArIHRoaXMub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC1sZWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSwgdG9wIDogcC50b3B9O1xuICAgICAgfSxcblxuICAgICAgcmlnaHQgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgcCA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC1yaWdodCcpO1xuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgcC50b3AgPSBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcm9wLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC50cmlnZ2VyZWRSaWdodCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bjtcblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgKyB0Lm91dGVyV2lkdGgoKSwgdG9wIDogcC50b3B9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJbnNlcnQgcnVsZSB0byBzdHlsZSBwc3VlZG8gZWxlbWVudHNcbiAgICBhZGp1c3RfcGlwIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzLCBwb3NpdGlvbikge1xuICAgICAgdmFyIHNoZWV0ID0gRm91bmRhdGlvbi5zdHlsZXNoZWV0LFxuICAgICAgICAgIHBpcF9vZmZzZXRfYmFzZSA9IDg7XG5cbiAgICAgIGlmIChkcm9wZG93bi5oYXNDbGFzcyhzZXR0aW5ncy5tZWdhX2NsYXNzKSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSBwb3NpdGlvbi5sZWZ0ICsgKHRhcmdldC5vdXRlcldpZHRoKCkgLyAyKSAtIDg7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc21hbGwoKSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgKz0gcG9zaXRpb24ubGVmdCAtIDg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucnVsZV9pZHggPSBzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG5cbiAgICAgIC8vZGVmYXVsdFxuICAgICAgdmFyIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgICAgY3NzX2JlZm9yZSA9ICdsZWZ0OiAnICsgcGlwX29mZnNldF9iYXNlICsgJ3B4OycsXG4gICAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0OiAnICsgKHBpcF9vZmZzZXRfYmFzZSAtIDEpICsgJ3B4Oyc7XG5cbiAgICAgIGlmIChwb3NpdGlvbi5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSBkcm9wZG93bi5vdXRlcldpZHRoKCkgLSAyMztcbiAgICAgICAgc2VsX2JlZm9yZSA9ICcuZi1kcm9wZG93bi5vcGVuOmJlZm9yZScsXG4gICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDogJyArIHBpcF9vZmZzZXRfYmFzZSArICdweDsnLFxuICAgICAgICBjc3NfYWZ0ZXIgID0gJ2xlZnQ6ICcgKyAocGlwX29mZnNldF9iYXNlIC0gMSkgKyAncHg7JztcbiAgICAgIH1cblxuICAgICAgLy9qdXN0IGEgY2FzZSB3aGVyZSByaWdodCBpcyBmaXJlZCwgYnV0IGl0cyBub3QgbWlzc2luZyByaWdodFxuICAgICAgaWYgKHBvc2l0aW9uLnRyaWdnZXJlZFJpZ2h0ID09IHRydWUpIHtcbiAgICAgICAgc2VsX2JlZm9yZSA9ICcuZi1kcm9wZG93bi5vcGVuOmJlZm9yZScsXG4gICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDotMTJweDsnLFxuICAgICAgICBjc3NfYWZ0ZXIgID0gJ2xlZnQ6LTE0cHg7JztcbiAgICAgIH1cblxuICAgICAgaWYgKHNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShbc2VsX2JlZm9yZSwgJ3snLCBjc3NfYmVmb3JlLCAnfSddLmpvaW4oJyAnKSwgdGhpcy5ydWxlX2lkeCk7XG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoW3NlbF9hZnRlciwgJ3snLCBjc3NfYWZ0ZXIsICd9J10uam9pbignICcpLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9iZWZvcmUsIGNzc19iZWZvcmUsIHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9hZnRlciwgY3NzX2FmdGVyLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBvbGQgZHJvcGRvd24gcnVsZSBpbmRleFxuICAgIGNsZWFyX2lkeCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaGVldCA9IEZvdW5kYXRpb24uc3R5bGVzaGVldDtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJ1bGVfaWR4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzaGVldC5kZWxldGVSdWxlKHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5kZWxldGVSdWxlKHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBkZWxldGUgdGhpcy5ydWxlX2lkeDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc21hbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMuc21hbGwpLm1hdGNoZXMgJiZcbiAgICAgICAgIW1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgb2ZmIDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5TKHRoaXMuc2NvcGUpLm9mZignLmZuZHRuLmRyb3Bkb3duJyk7XG4gICAgICB0aGlzLlMoJ2h0bWwsIGJvZHknKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgICAgdGhpcy5TKHdpbmRvdykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuUygnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5lcXVhbGl6ZXIgPSB7XG4gICAgbmFtZSA6ICdlcXVhbGl6ZXInLFxuXG4gICAgdmVyc2lvbiA6ICc1LjMuMScsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIHVzZV90YWxsZXN0OiB0cnVlLFxuICAgICAgYmVmb3JlX2hlaWdodF9jaGFuZ2U6ICQubm9vcCxcbiAgICAgIGFmdGVyX2hlaWdodF9jaGFuZ2U6ICQubm9vcCxcbiAgICAgIGVxdWFsaXplX29uX3N0YWNrOiB0cnVlXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICdpbWFnZV9sb2FkZWQnKTtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICAgIHRoaXMucmVmbG93KCk7XG4gICAgfSxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9mZignLmVxdWFsaXplcicpLm9uKCdyZXNpemUuZm5kdG4uZXF1YWxpemVyJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMucmVmbG93KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBlcXVhbGl6ZTogZnVuY3Rpb24oZXF1YWxpemVyKSB7XG4gICAgICB2YXIgaXNTdGFja2VkID0gZmFsc2UsXG4gICAgICAgICAgdmFscyA9IGVxdWFsaXplci5maW5kKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLXdhdGNoXTp2aXNpYmxlJyksXG4gICAgICAgICAgc2V0dGluZ3MgPSBlcXVhbGl6ZXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSsnLWluaXQnKTtcblxuICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICB2YXIgZmlyc3RUb3BPZmZzZXQgPSB2YWxzLmZpcnN0KCkub2Zmc2V0KCkudG9wO1xuICAgICAgc2V0dGluZ3MuYmVmb3JlX2hlaWdodF9jaGFuZ2UoKTtcbiAgICAgIGVxdWFsaXplci50cmlnZ2VyKCdiZWZvcmUtaGVpZ2h0LWNoYW5nZScpLnRyaWdnZXIoJ2JlZm9yZS1oZWlnaHQtY2hhbmdlLmZuZHRoLmVxdWFsaXplcicpO1xuICAgICAgdmFscy5oZWlnaHQoJ2luaGVyaXQnKTtcblxuICAgICAgdmFyIGhlaWdodHMgPSB2YWxzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gJCh0aGlzKS5vdXRlckhlaWdodChmYWxzZSkgfSkuZ2V0KCk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy51c2VfdGFsbGVzdCkge1xuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gICAgICAgIHZhbHMuY3NzKCdoZWlnaHQnLCBtYXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgICB2YWxzLmNzcygnaGVpZ2h0JywgbWluKTtcbiAgICAgIH1cbiAgICAgIHNldHRpbmdzLmFmdGVyX2hlaWdodF9jaGFuZ2UoKTtcbiAgICAgIGVxdWFsaXplci50cmlnZ2VyKCdhZnRlci1oZWlnaHQtY2hhbmdlJykudHJpZ2dlcignYWZ0ZXItaGVpZ2h0LWNoYW5nZS5mbmR0bi5lcXVhbGl6ZXInKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJywgdGhpcy5zY29wZSkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJGVxX3RhcmdldCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYuaW1hZ2VfbG9hZGVkKHNlbGYuUygnaW1nJywgdGhpcyksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2VsZi5lcXVhbGl6ZSgkZXFfdGFyZ2V0KVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5vZmZjYW52YXMgPSB7XG4gICAgbmFtZSA6ICdvZmZjYW52YXMnLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIG9wZW5fbWV0aG9kIDogJ21vdmUnLFxuICAgICAgY2xvc2Vfb25fY2xpY2sgOiBmYWxzZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIFMgPSBzZWxmLlMsXG4gICAgICAgICAgbW92ZV9jbGFzcyA9ICcnLFxuICAgICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAnJyxcbiAgICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnJztcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdtb3ZlJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ21vdmUtJztcbiAgICAgICAgcmlnaHRfcG9zdGZpeCA9ICdyaWdodCc7XG4gICAgICAgIGxlZnRfcG9zdGZpeCA9ICdsZWZ0JztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5vcGVuX21ldGhvZCA9PT0gJ292ZXJsYXBfc2luZ2xlJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ29mZmNhbnZhcy1vdmVybGFwLSc7XG4gICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAncmlnaHQnO1xuICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnbGVmdCc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdvdmVybGFwJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ29mZmNhbnZhcy1vdmVybGFwJztcbiAgICAgIH1cblxuICAgICAgUyh0aGlzLnNjb3BlKS5vZmYoJy5vZmZjYW52YXMnKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5jbGlja190b2dnbGVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLm9wZW5fbWV0aG9kICE9PSAnb3ZlcmxhcCcpIHtcbiAgICAgICAgICAgIFMoJy5sZWZ0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5sZWZ0LW9mZi1jYW52YXMtbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZWxmLmdldF9zZXR0aW5ncyhlKTtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyh0aGlzKS5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jbG9zZV9vbl9jbGljayAmJiAhcGFyZW50Lmhhc0NsYXNzKCdoYXMtc3VibWVudScpICYmICFwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgc2VsZi5oaWRlLmNhbGwoc2VsZiwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgsIHNlbGYuZ2V0X3dyYXBwZXIoZSkpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFModGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2hhcy1zdWJtZW51JykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFModGhpcykuc2libGluZ3MoJy5sZWZ0LXN1Ym1lbnUnKS50b2dnbGVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmxlZnQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3RvZ2dsZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vcGVuX21ldGhvZCAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICAgICAgICBTKCcucmlnaHQtc3VibWVudScpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcucmlnaHQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLnJpZ2h0LW9mZi1jYW52YXMtbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZWxmLmdldF9zZXR0aW5ncyhlKTtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyh0aGlzKS5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jbG9zZV9vbl9jbGljayAmJiAhcGFyZW50Lmhhc0NsYXNzKCdoYXMtc3VibWVudScpICYmICFwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgc2VsZi5oaWRlLmNhbGwoc2VsZiwgbW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCwgc2VsZi5nZXRfd3JhcHBlcihlKSk7XG4gICAgICAgICAgICBwYXJlbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChTKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBTKHRoaXMpLnNpYmxpbmdzKCcucmlnaHQtc3VibWVudScpLnRvZ2dsZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5leGl0LW9mZi1jYW52YXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIFMoJy5yaWdodC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgaWYgKHJpZ2h0X3Bvc3RmaXgpIHtcbiAgICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICAgIFMoJy5sZWZ0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5leGl0LW9mZi1jYW52YXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgIGlmIChyaWdodF9wb3N0Zml4KSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgICAkKCcucmlnaHQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKSB7XG4gICAgICAkb2ZmX2NhbnZhcyA9ICRvZmZfY2FudmFzIHx8IHRoaXMuZ2V0X3dyYXBwZXIoKTtcbiAgICAgIGlmICgkb2ZmX2NhbnZhcy5pcygnLicgKyBjbGFzc19uYW1lKSkge1xuICAgICAgICB0aGlzLmhpZGUoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdyA6IGZ1bmN0aW9uIChjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICAkb2ZmX2NhbnZhcy50cmlnZ2VyKCdvcGVuLmZuZHRuLm9mZmNhbnZhcycpO1xuICAgICAgJG9mZl9jYW52YXMuYWRkQ2xhc3MoY2xhc3NfbmFtZSk7XG4gICAgfSxcblxuICAgIGhpZGUgOiBmdW5jdGlvbiAoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpIHtcbiAgICAgICRvZmZfY2FudmFzID0gJG9mZl9jYW52YXMgfHwgdGhpcy5nZXRfd3JhcHBlcigpO1xuICAgICAgJG9mZl9jYW52YXMudHJpZ2dlcignY2xvc2UuZm5kdG4ub2ZmY2FudmFzJyk7XG4gICAgICAkb2ZmX2NhbnZhcy5yZW1vdmVDbGFzcyhjbGFzc19uYW1lKTtcbiAgICB9LFxuXG4gICAgY2xpY2tfdG9nZ2xlX2NsYXNzIDogZnVuY3Rpb24gKGUsIGNsYXNzX25hbWUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkb2ZmX2NhbnZhcyA9IHRoaXMuZ2V0X3dyYXBwZXIoZSk7XG4gICAgICB0aGlzLnRvZ2dsZShjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgfSxcblxuICAgIGNsaWNrX3JlbW92ZV9jbGFzcyA6IGZ1bmN0aW9uIChlLCBjbGFzc19uYW1lKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLmdldF93cmFwcGVyKGUpO1xuICAgICAgdGhpcy5oaWRlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICB9LFxuXG4gICAgZ2V0X3NldHRpbmdzIDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBvZmZjYW52YXMgID0gdGhpcy5TKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgcmV0dXJuIG9mZmNhbnZhcy5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JykgfHwgdGhpcy5zZXR0aW5ncztcbiAgICB9LFxuXG4gICAgZ2V0X3dyYXBwZXIgOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRvZmZfY2FudmFzID0gdGhpcy5TKGUgPyBlLnRhcmdldCA6IHRoaXMuc2NvcGUpLmNsb3Nlc3QoJy5vZmYtY2FudmFzLXdyYXAnKTtcblxuICAgICAgaWYgKCRvZmZfY2FudmFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkb2ZmX2NhbnZhcyA9IHRoaXMuUygnLm9mZi1jYW52YXMtd3JhcCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICRvZmZfY2FudmFzO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBub29wID0gZnVuY3Rpb24gKCkge307XG5cbiAgdmFyIE9yYml0ID0gZnVuY3Rpb24gKGVsLCBzZXR0aW5ncykge1xuICAgIC8vIERvbid0IHJlaW5pdGlhbGl6ZSBwbHVnaW5cbiAgICBpZiAoZWwuaGFzQ2xhc3Moc2V0dGluZ3Muc2xpZGVzX2NvbnRhaW5lcl9jbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzbGlkZXNfY29udGFpbmVyID0gZWwsXG4gICAgICAgIG51bWJlcl9jb250YWluZXIsXG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLFxuICAgICAgICB0aW1lcl9jb250YWluZXIsXG4gICAgICAgIGlkeCA9IDAsXG4gICAgICAgIGFuaW1hdGUsXG4gICAgICAgIHRpbWVyLFxuICAgICAgICBsb2NrZWQgPSBmYWxzZSxcbiAgICAgICAgYWRqdXN0X2hlaWdodF9hZnRlciA9IGZhbHNlO1xuXG4gICAgc2VsZi5zbGlkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2xpZGVzX2NvbnRhaW5lci5jaGlsZHJlbihzZXR0aW5ncy5zbGlkZV9zZWxlY3Rvcik7XG4gICAgfTtcblxuICAgIHNlbGYuc2xpZGVzKCkuZmlyc3QoKS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVfc2xpZGVfY2xhc3MpO1xuXG4gICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBpZiAoc2V0dGluZ3Muc2xpZGVfbnVtYmVyKSB7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuZmluZCgnc3BhbjpmaXJzdCcpLnRleHQocGFyc2VJbnQoaW5kZXgpICsgMSk7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuZmluZCgnc3BhbjpsYXN0JykudGV4dChzZWxmLnNsaWRlcygpLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MuYnVsbGV0cykge1xuICAgICAgICBidWxsZXRzX2NvbnRhaW5lci5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICAgICAgJChidWxsZXRzX2NvbnRhaW5lci5jaGlsZHJlbigpLmdldChpbmRleCkpLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi51cGRhdGVfYWN0aXZlX2xpbmsgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHZhciBsaW5rID0gJCgnW2RhdGEtb3JiaXQtbGluaz1cIicgKyBzZWxmLnNsaWRlcygpLmVxKGluZGV4KS5hdHRyKCdkYXRhLW9yYml0LXNsaWRlJykgKyAnXCJdJyk7XG4gICAgICBsaW5rLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYnVsbGV0c19hY3RpdmVfY2xhc3MpO1xuICAgICAgbGluay5hZGRDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgfTtcblxuICAgIHNlbGYuYnVpbGRfbWFya3VwID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2xpZGVzX2NvbnRhaW5lci53cmFwKCc8ZGl2IGNsYXNzPVwiJyArIHNldHRpbmdzLmNvbnRhaW5lcl9jbGFzcyArICdcIj48L2Rpdj4nKTtcbiAgICAgIGNvbnRhaW5lciA9IHNsaWRlc19jb250YWluZXIucGFyZW50KCk7XG4gICAgICBzbGlkZXNfY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MpO1xuXG4gICAgICBpZiAoc2V0dGluZ3Muc3RhY2tfb25fc21hbGwpIHtcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnN0YWNrX29uX3NtYWxsX2NsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLm5hdmlnYXRpb25fYXJyb3dzKSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJCgnPGEgaHJlZj1cIiNcIj48c3Bhbj48L3NwYW4+PC9hPicpLmFkZENsYXNzKHNldHRpbmdzLnByZXZfY2xhc3MpKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCgkKCc8YSBocmVmPVwiI1wiPjxzcGFuPjwvc3Bhbj48L2E+JykuYWRkQ2xhc3Moc2V0dGluZ3MubmV4dF9jbGFzcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MudGltZXIpIHtcbiAgICAgICAgdGltZXJfY29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpO1xuICAgICAgICB0aW1lcl9jb250YWluZXIuYXBwZW5kKCc8c3Bhbj4nKTtcbiAgICAgICAgdGltZXJfY29udGFpbmVyLmFwcGVuZCgkKCc8ZGl2PicpLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3Byb2dyZXNzX2NsYXNzKSk7XG4gICAgICAgIHRpbWVyX2NvbnRhaW5lci5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKHRpbWVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zbGlkZV9udW1iZXIpIHtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3Moc2V0dGluZ3Muc2xpZGVfbnVtYmVyX2NsYXNzKTtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lci5hcHBlbmQoJzxzcGFuPjwvc3Bhbj4gJyArIHNldHRpbmdzLnNsaWRlX251bWJlcl90ZXh0ICsgJyA8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQobnVtYmVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5idWxsZXRzKSB7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyID0gJCgnPG9sPicpLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfY29udGFpbmVyX2NsYXNzKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChidWxsZXRzX2NvbnRhaW5lcik7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLndyYXAoJzxkaXYgY2xhc3M9XCJvcmJpdC1idWxsZXRzLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24gKGlkeCwgZWwpIHtcbiAgICAgICAgICB2YXIgYnVsbGV0ID0gJCgnPGxpPicpLmF0dHIoJ2RhdGEtb3JiaXQtc2xpZGUnLCBpZHgpLm9uKCdjbGljaycsIHNlbGYubGlua19idWxsZXQpOztcbiAgICAgICAgICBidWxsZXRzX2NvbnRhaW5lci5hcHBlbmQoYnVsbGV0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgc2VsZi5fZ290byA9IGZ1bmN0aW9uIChuZXh0X2lkeCwgc3RhcnRfdGltZXIpIHtcbiAgICAgIC8vIGlmIChsb2NrZWQpIHtyZXR1cm4gZmFsc2U7fVxuICAgICAgaWYgKG5leHRfaWR4ID09PSBpZHgpIHtyZXR1cm4gZmFsc2U7fVxuICAgICAgaWYgKHR5cGVvZiB0aW1lciA9PT0gJ29iamVjdCcpIHt0aW1lci5yZXN0YXJ0KCk7fVxuICAgICAgdmFyIHNsaWRlcyA9IHNlbGYuc2xpZGVzKCk7XG5cbiAgICAgIHZhciBkaXIgPSAnbmV4dCc7XG4gICAgICBsb2NrZWQgPSB0cnVlO1xuICAgICAgaWYgKG5leHRfaWR4IDwgaWR4KSB7ZGlyID0gJ3ByZXYnO31cbiAgICAgIGlmIChuZXh0X2lkeCA+PSBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MuY2lyY3VsYXIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dF9pZHggPSAwO1xuICAgICAgfSBlbHNlIGlmIChuZXh0X2lkeCA8IDApIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5jaXJjdWxhcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0X2lkeCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudCA9ICQoc2xpZGVzLmdldChpZHgpKTtcbiAgICAgIHZhciBuZXh0ID0gJChzbGlkZXMuZ2V0KG5leHRfaWR4KSk7XG5cbiAgICAgIGN1cnJlbnQuY3NzKCd6SW5kZXgnLCAyKTtcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcbiAgICAgIG5leHQuY3NzKCd6SW5kZXgnLCA0KS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVfc2xpZGVfY2xhc3MpO1xuXG4gICAgICBzbGlkZXNfY29udGFpbmVyLnRyaWdnZXIoJ2JlZm9yZS1zbGlkZS1jaGFuZ2UuZm5kdG4ub3JiaXQnKTtcbiAgICAgIHNldHRpbmdzLmJlZm9yZV9zbGlkZV9jaGFuZ2UoKTtcbiAgICAgIHNlbGYudXBkYXRlX2FjdGl2ZV9saW5rKG5leHRfaWR4KTtcblxuICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlkeCA9IG5leHRfaWR4O1xuICAgICAgICAgIGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzdGFydF90aW1lciA9PT0gdHJ1ZSkge3RpbWVyID0gc2VsZi5jcmVhdGVfdGltZXIoKTsgdGltZXIuc3RhcnQoKTt9XG4gICAgICAgICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyKGlkeCk7XG4gICAgICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdhZnRlci1zbGlkZS1jaGFuZ2UuZm5kdG4ub3JiaXQnLCBbe3NsaWRlX251bWJlciA6IGlkeCwgdG90YWxfc2xpZGVzIDogc2xpZGVzLmxlbmd0aH1dKTtcbiAgICAgICAgICBzZXR0aW5ncy5hZnRlcl9zbGlkZV9jaGFuZ2UoaWR4LCBzbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHNsaWRlc19jb250YWluZXIub3V0ZXJIZWlnaHQoKSAhPSBuZXh0Lm91dGVySGVpZ2h0KCkgJiYgc2V0dGluZ3MudmFyaWFibGVfaGVpZ2h0KSB7XG4gICAgICAgICAgc2xpZGVzX2NvbnRhaW5lci5hbmltYXRlKHsnaGVpZ2h0JzogbmV4dC5vdXRlckhlaWdodCgpfSwgMjUwLCAnbGluZWFyJywgdW5sb2NrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKHNsaWRlcy5sZW5ndGggPT09IDEpIHtjYWxsYmFjaygpOyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICB2YXIgc3RhcnRfYW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZGlyID09PSAnbmV4dCcpIHthbmltYXRlLm5leHQoY3VycmVudCwgbmV4dCwgY2FsbGJhY2spO31cbiAgICAgICAgaWYgKGRpciA9PT0gJ3ByZXYnKSB7YW5pbWF0ZS5wcmV2KGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKTt9XG4gICAgICB9O1xuXG4gICAgICBpZiAobmV4dC5vdXRlckhlaWdodCgpID4gc2xpZGVzX2NvbnRhaW5lci5vdXRlckhlaWdodCgpICYmIHNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICBzbGlkZXNfY29udGFpbmVyLmFuaW1hdGUoeydoZWlnaHQnOiBuZXh0Lm91dGVySGVpZ2h0KCl9LCAyNTAsICdsaW5lYXInLCBzdGFydF9hbmltYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRfYW5pbWF0aW9uKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYubmV4dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5fZ290byhpZHggKyAxKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wcmV2ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZWxmLl9nb3RvKGlkeCAtIDEpO1xuICAgIH07XG5cbiAgICBzZWxmLmxpbmtfY3VzdG9tID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5hdHRyKCdkYXRhLW9yYml0LWxpbmsnKTtcbiAgICAgIGlmICgodHlwZW9mIGxpbmsgPT09ICdzdHJpbmcnKSAmJiAobGluayA9ICQudHJpbShsaW5rKSkgIT0gJycpIHtcbiAgICAgICAgdmFyIHNsaWRlID0gY29udGFpbmVyLmZpbmQoJ1tkYXRhLW9yYml0LXNsaWRlPScgKyBsaW5rICsgJ10nKTtcbiAgICAgICAgaWYgKHNsaWRlLmluZGV4KCkgIT0gLTEpIHtzZWxmLl9nb3RvKHNsaWRlLmluZGV4KCkpO31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5saW5rX2J1bGxldCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtb3JiaXQtc2xpZGUnKTtcbiAgICAgIGlmICgodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykgJiYgKGluZGV4ID0gJC50cmltKGluZGV4KSkgIT0gJycpIHtcbiAgICAgICAgaWYgKGlzTmFOKHBhcnNlSW50KGluZGV4KSkpIHtcbiAgICAgICAgICB2YXIgc2xpZGUgPSBjb250YWluZXIuZmluZCgnW2RhdGEtb3JiaXQtc2xpZGU9JyArIGluZGV4ICsgJ10nKTtcbiAgICAgICAgICBpZiAoc2xpZGUuaW5kZXgoKSAhPSAtMSkge3NlbGYuX2dvdG8oc2xpZGUuaW5kZXgoKSArIDEpO31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLl9nb3RvKHBhcnNlSW50KGluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGYudGltZXJfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9nb3RvKGlkeCArIDEsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSAkKHNlbGYuc2xpZGVzKCkuZ2V0KGlkeCkpO1xuICAgICAgdmFyIGggPSBjdXJyZW50Lm91dGVySGVpZ2h0KCk7XG4gICAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5vdXRlckhlaWdodCgpID4gaCkgeyBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpOyB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2xpZGVzX2NvbnRhaW5lci5oZWlnaHQoaCk7XG4gICAgfTtcblxuICAgIHNlbGYuY3JlYXRlX3RpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHQgPSBuZXcgVGltZXIoXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcuJyArIHNldHRpbmdzLnRpbWVyX2NvbnRhaW5lcl9jbGFzcyksXG4gICAgICAgIHNldHRpbmdzLFxuICAgICAgICBzZWxmLnRpbWVyX2NhbGxiYWNrXG4gICAgICApO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcblxuICAgIHNlbGYuc3RvcF90aW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRpbWVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi50b2dnbGVfdGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdCA9IGNvbnRhaW5lci5maW5kKCcuJyArIHNldHRpbmdzLnRpbWVyX2NvbnRhaW5lcl9jbGFzcyk7XG4gICAgICBpZiAodC5oYXNDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICd1bmRlZmluZWQnKSB7dGltZXIgPSBzZWxmLmNyZWF0ZV90aW1lcigpO31cbiAgICAgICAgdGltZXIuc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7dGltZXIuc3RvcCgpO31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5idWlsZF9tYXJrdXAoKTtcbiAgICAgIGlmIChzZXR0aW5ncy50aW1lcikge1xuICAgICAgICB0aW1lciA9IHNlbGYuY3JlYXRlX3RpbWVyKCk7XG4gICAgICAgIEZvdW5kYXRpb24udXRpbHMuaW1hZ2VfbG9hZGVkKHRoaXMuc2xpZGVzKCkuY2hpbGRyZW4oJ2ltZycpLCB0aW1lci5zdGFydCk7XG4gICAgICB9XG4gICAgICBhbmltYXRlID0gbmV3IEZhZGVBbmltYXRpb24oc2V0dGluZ3MsIHNsaWRlc19jb250YWluZXIpO1xuICAgICAgaWYgKHNldHRpbmdzLmFuaW1hdGlvbiA9PT0gJ3NsaWRlJykge1xuICAgICAgICBhbmltYXRlID0gbmV3IFNsaWRlQW5pbWF0aW9uKHNldHRpbmdzLCBzbGlkZXNfY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLm5leHRfY2xhc3MsIHNlbGYubmV4dCk7XG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy4nICsgc2V0dGluZ3MucHJldl9jbGFzcywgc2VsZi5wcmV2KTtcblxuICAgICAgaWYgKHNldHRpbmdzLm5leHRfb25fY2xpY2spIHtcbiAgICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MgKyAnIFtkYXRhLW9yYml0LXNsaWRlXScsIHNlbGYubGlua19idWxsZXQpO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgc2VsZi50b2dnbGVfdGltZXIpO1xuICAgICAgaWYgKHNldHRpbmdzLnN3aXBlKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbigndG91Y2hzdGFydC5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKCFlLnRvdWNoZXMpIHtlID0gZS5vcmlnaW5hbEV2ZW50O31cbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHN0YXJ0X3BhZ2VfeCA6IGUudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgIHN0YXJ0X3BhZ2VfeSA6IGUudG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWUgOiAobmV3IERhdGUoKSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgZGVsdGFfeCA6IDAsXG4gICAgICAgICAgICBpc19zY3JvbGxpbmcgOiB1bmRlZmluZWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzd2lwZS10cmFuc2l0aW9uJywgZGF0YSk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCd0b3VjaG1vdmUuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmICghZS50b3VjaGVzKSB7XG4gICAgICAgICAgICBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZ25vcmUgcGluY2gvem9vbSBldmVudHNcbiAgICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZS5zY2FsZSAmJiBlLnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRhdGEgPSBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtkYXRhID0ge307fVxuXG4gICAgICAgICAgZGF0YS5kZWx0YV94ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gZGF0YS5zdGFydF9wYWdlX3g7XG5cbiAgICAgICAgICBpZiAoIHR5cGVvZiBkYXRhLmlzX3Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGRhdGEuaXNfc2Nyb2xsaW5nID0gISEoIGRhdGEuaXNfc2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRhdGEuZGVsdGFfeCkgPCBNYXRoLmFicyhlLnRvdWNoZXNbMF0ucGFnZVkgLSBkYXRhLnN0YXJ0X3BhZ2VfeSkgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEuaXNfc2Nyb2xsaW5nICYmICFkYXRhLmFjdGl2ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IChkYXRhLmRlbHRhX3ggPCAwKSA/IChpZHggKyAxKSA6IChpZHggLSAxKTtcbiAgICAgICAgICAgIGRhdGEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuX2dvdG8oZGlyZWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbigndG91Y2hlbmQuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzd2lwZS10cmFuc2l0aW9uJywge30pO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBjb250YWluZXIub24oJ21vdXNlZW50ZXIuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MudGltZXIgJiYgc2V0dGluZ3MucGF1c2Vfb25faG92ZXIpIHtcbiAgICAgICAgICBzZWxmLnN0b3BfdGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy50aW1lciAmJiBzZXR0aW5ncy5yZXN1bWVfb25fbW91c2VvdXQpIHtcbiAgICAgICAgICB0aW1lci5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLW9yYml0LWxpbmtdJywgc2VsZi5saW5rX2N1c3RvbSk7XG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQgcmVzaXplJywgc2VsZi5jb21wdXRlX2RpbWVuc2lvbnMpO1xuICAgICAgRm91bmRhdGlvbi51dGlscy5pbWFnZV9sb2FkZWQodGhpcy5zbGlkZXMoKS5jaGlsZHJlbignaW1nJyksIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zKTtcbiAgICAgIEZvdW5kYXRpb24udXRpbHMuaW1hZ2VfbG9hZGVkKHRoaXMuc2xpZGVzKCkuY2hpbGRyZW4oJ2ltZycpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5wcmV2KCcuJyArIHNldHRpbmdzLnByZWxvYWRlcl9jbGFzcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyKDApO1xuICAgICAgICBzZWxmLnVwZGF0ZV9hY3RpdmVfbGluaygwKTtcbiAgICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdyZWFkeS5mbmR0bi5vcmJpdCcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdCgpO1xuICB9O1xuXG4gIHZhciBUaW1lciA9IGZ1bmN0aW9uIChlbCwgc2V0dGluZ3MsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkdXJhdGlvbiA9IHNldHRpbmdzLnRpbWVyX3NwZWVkLFxuICAgICAgICBwcm9ncmVzcyA9IGVsLmZpbmQoJy4nICsgc2V0dGluZ3MudGltZXJfcHJvZ3Jlc3NfY2xhc3MpLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgbGVmdCA9IC0xO1xuXG4gICAgdGhpcy51cGRhdGVfcHJvZ3Jlc3MgPSBmdW5jdGlvbiAodykge1xuICAgICAgdmFyIG5ld19wcm9ncmVzcyA9IHByb2dyZXNzLmNsb25lKCk7XG4gICAgICBuZXdfcHJvZ3Jlc3MuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICBuZXdfcHJvZ3Jlc3MuY3NzKCd3aWR0aCcsIHcgKyAnJScpO1xuICAgICAgcHJvZ3Jlc3MucmVwbGFjZVdpdGgobmV3X3Byb2dyZXNzKTtcbiAgICAgIHByb2dyZXNzID0gbmV3X3Byb2dyZXNzO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBlbC5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgbGVmdCA9IC0xO1xuICAgICAgc2VsZi51cGRhdGVfcHJvZ3Jlc3MoMCk7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWVsLmhhc0NsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcykpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgICBsZWZ0ID0gKGxlZnQgPT09IC0xKSA/IGR1cmF0aW9uIDogbGVmdDtcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcyk7XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcHJvZ3Jlc3MuYW5pbWF0ZSh7J3dpZHRoJyA6ICcxMDAlJ30sIGxlZnQsICdsaW5lYXInKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5yZXN0YXJ0KCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCBsZWZ0KTtcbiAgICAgIGVsLnRyaWdnZXIoJ3RpbWVyLXN0YXJ0ZWQuZm5kdG4ub3JiaXQnKVxuICAgIH07XG5cbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZWwuaGFzQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKSkge3JldHVybiB0cnVlO31cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGVsLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcyk7XG4gICAgICB2YXIgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBsZWZ0ID0gbGVmdCAtIChlbmQgLSBzdGFydCk7XG4gICAgICB2YXIgdyA9IDEwMCAtICgobGVmdCAvIGR1cmF0aW9uKSAqIDEwMCk7XG4gICAgICBzZWxmLnVwZGF0ZV9wcm9ncmVzcyh3KTtcbiAgICAgIGVsLnRyaWdnZXIoJ3RpbWVyLXN0b3BwZWQuZm5kdG4ub3JiaXQnKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBTbGlkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChzZXR0aW5ncywgY29udGFpbmVyKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkO1xuICAgIHZhciBpc19ydGwgPSAoJCgnaHRtbFtkaXI9cnRsXScpLmxlbmd0aCA9PT0gMSk7XG4gICAgdmFyIG1hcmdpbiA9IGlzX3J0bCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gICAgdmFyIGFuaW1NYXJnaW4gPSB7fTtcbiAgICBhbmltTWFyZ2luW21hcmdpbl0gPSAnMCUnO1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKSB7XG4gICAgICBjdXJyZW50LmFuaW1hdGUoe21hcmdpbkxlZnQgOiAnLTEwMCUnfSwgZHVyYXRpb24pO1xuICAgICAgbmV4dC5hbmltYXRlKGFuaW1NYXJnaW4sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJlbnQuY3NzKG1hcmdpbiwgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSBmdW5jdGlvbiAoY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIGN1cnJlbnQuYW5pbWF0ZSh7bWFyZ2luTGVmdCA6ICcxMDAlJ30sIGR1cmF0aW9uKTtcbiAgICAgIHByZXYuY3NzKG1hcmdpbiwgJy0xMDAlJyk7XG4gICAgICBwcmV2LmFuaW1hdGUoYW5pbU1hcmdpbiwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudC5jc3MobWFyZ2luLCAnMTAwJScpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgRmFkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChzZXR0aW5ncywgY29udGFpbmVyKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkO1xuICAgIHZhciBpc19ydGwgPSAoJCgnaHRtbFtkaXI9cnRsXScpLmxlbmd0aCA9PT0gMSk7XG4gICAgdmFyIG1hcmdpbiA9IGlzX3J0bCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG5cbiAgICB0aGlzLm5leHQgPSBmdW5jdGlvbiAoY3VycmVudCwgbmV4dCwgY2FsbGJhY2spIHtcbiAgICAgIG5leHQuY3NzKHsnbWFyZ2luJyA6ICcwJScsICdvcGFjaXR5JyA6ICcwLjAxJ30pO1xuICAgICAgbmV4dC5hbmltYXRlKHsnb3BhY2l0eScgOicxJ30sIGR1cmF0aW9uLCAnbGluZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjdXJyZW50LmNzcygnbWFyZ2luJywgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSBmdW5jdGlvbiAoY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIHByZXYuY3NzKHsnbWFyZ2luJyA6ICcwJScsICdvcGFjaXR5JyA6ICcwLjAxJ30pO1xuICAgICAgcHJldi5hbmltYXRlKHsnb3BhY2l0eScgOiAnMSd9LCBkdXJhdGlvbiwgJ2xpbmVhcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudC5jc3MoJ21hcmdpbicsICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIEZvdW5kYXRpb24ubGlicyA9IEZvdW5kYXRpb24ubGlicyB8fCB7fTtcblxuICBGb3VuZGF0aW9uLmxpYnMub3JiaXQgPSB7XG4gICAgbmFtZSA6ICdvcmJpdCcsXG5cbiAgICB2ZXJzaW9uIDogJzUuNS4yJyxcblxuICAgIHNldHRpbmdzIDoge1xuICAgICAgYW5pbWF0aW9uIDogJ3NsaWRlJyxcbiAgICAgIHRpbWVyX3NwZWVkIDogMTAwMDAsXG4gICAgICBwYXVzZV9vbl9ob3ZlciA6IHRydWUsXG4gICAgICByZXN1bWVfb25fbW91c2VvdXQgOiBmYWxzZSxcbiAgICAgIG5leHRfb25fY2xpY2sgOiB0cnVlLFxuICAgICAgYW5pbWF0aW9uX3NwZWVkIDogNTAwLFxuICAgICAgc3RhY2tfb25fc21hbGwgOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb25fYXJyb3dzIDogdHJ1ZSxcbiAgICAgIHNsaWRlX251bWJlciA6IHRydWUsXG4gICAgICBzbGlkZV9udW1iZXJfdGV4dCA6ICdvZicsXG4gICAgICBjb250YWluZXJfY2xhc3MgOiAnb3JiaXQtY29udGFpbmVyJyxcbiAgICAgIHN0YWNrX29uX3NtYWxsX2NsYXNzIDogJ29yYml0LXN0YWNrLW9uLXNtYWxsJyxcbiAgICAgIG5leHRfY2xhc3MgOiAnb3JiaXQtbmV4dCcsXG4gICAgICBwcmV2X2NsYXNzIDogJ29yYml0LXByZXYnLFxuICAgICAgdGltZXJfY29udGFpbmVyX2NsYXNzIDogJ29yYml0LXRpbWVyJyxcbiAgICAgIHRpbWVyX3BhdXNlZF9jbGFzcyA6ICdwYXVzZWQnLFxuICAgICAgdGltZXJfcHJvZ3Jlc3NfY2xhc3MgOiAnb3JiaXQtcHJvZ3Jlc3MnLFxuICAgICAgc2xpZGVzX2NvbnRhaW5lcl9jbGFzcyA6ICdvcmJpdC1zbGlkZXMtY29udGFpbmVyJyxcbiAgICAgIHByZWxvYWRlcl9jbGFzcyA6ICdwcmVsb2FkZXInLFxuICAgICAgc2xpZGVfc2VsZWN0b3IgOiAnKicsXG4gICAgICBidWxsZXRzX2NvbnRhaW5lcl9jbGFzcyA6ICdvcmJpdC1idWxsZXRzJyxcbiAgICAgIGJ1bGxldHNfYWN0aXZlX2NsYXNzIDogJ2FjdGl2ZScsXG4gICAgICBzbGlkZV9udW1iZXJfY2xhc3MgOiAnb3JiaXQtc2xpZGUtbnVtYmVyJyxcbiAgICAgIGNhcHRpb25fY2xhc3MgOiAnb3JiaXQtY2FwdGlvbicsXG4gICAgICBhY3RpdmVfc2xpZGVfY2xhc3MgOiAnYWN0aXZlJyxcbiAgICAgIG9yYml0X3RyYW5zaXRpb25fY2xhc3MgOiAnb3JiaXQtdHJhbnNpdGlvbmluZycsXG4gICAgICBidWxsZXRzIDogdHJ1ZSxcbiAgICAgIGNpcmN1bGFyIDogdHJ1ZSxcbiAgICAgIHRpbWVyIDogdHJ1ZSxcbiAgICAgIHZhcmlhYmxlX2hlaWdodCA6IGZhbHNlLFxuICAgICAgc3dpcGUgOiB0cnVlLFxuICAgICAgYmVmb3JlX3NsaWRlX2NoYW5nZSA6IG5vb3AsXG4gICAgICBhZnRlcl9zbGlkZV9jaGFuZ2UgOiBub29wXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIHZhciBvcmJpdF9pbnN0YW5jZSA9IG5ldyBPcmJpdCh0aGlzLlMoaW5zdGFuY2UpLCB0aGlzLlMoaW5zdGFuY2UpLmRhdGEoJ29yYml0LWluaXQnKSk7XG4gICAgICB0aGlzLlMoaW5zdGFuY2UpLmRhdGEodGhpcy5uYW1lICsgJy1pbnN0YW5jZScsIG9yYml0X2luc3RhbmNlKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoc2VsZi5TKHNlbGYuc2NvcGUpLmlzKCdbZGF0YS1vcmJpdF0nKSkge1xuICAgICAgICB2YXIgJGVsID0gc2VsZi5TKHNlbGYuc2NvcGUpO1xuICAgICAgICB2YXIgaW5zdGFuY2UgPSAkZWwuZGF0YShzZWxmLm5hbWUgKyAnLWluc3RhbmNlJyk7XG4gICAgICAgIGluc3RhbmNlLmNvbXB1dGVfZGltZW5zaW9ucygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5TKCdbZGF0YS1vcmJpdF0nLCBzZWxmLnNjb3BlKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsKSB7XG4gICAgICAgICAgdmFyICRlbCA9IHNlbGYuUyhlbCk7XG4gICAgICAgICAgdmFyIG9wdHMgPSBzZWxmLmRhdGFfb3B0aW9ucygkZWwpO1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRlbC5kYXRhKHNlbGYubmFtZSArICctaW5zdGFuY2UnKTtcbiAgICAgICAgICBpbnN0YW5jZS5jb21wdXRlX2RpbWVuc2lvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLnRvcGJhciA9IHtcbiAgICBuYW1lIDogJ3RvcGJhcicsXG5cbiAgICB2ZXJzaW9uIDogJzUuNS4yJyxcblxuICAgIHNldHRpbmdzIDoge1xuICAgICAgaW5kZXggOiAwLFxuICAgICAgc3RhcnRfb2Zmc2V0IDogMCxcbiAgICAgIHN0aWNreV9jbGFzcyA6ICdzdGlja3knLFxuICAgICAgY3VzdG9tX2JhY2tfdGV4dCA6IHRydWUsXG4gICAgICBiYWNrX3RleHQgOiAnQmFjaycsXG4gICAgICBtb2JpbGVfc2hvd19wYXJlbnRfbGluayA6IHRydWUsXG4gICAgICBpc19ob3ZlciA6IHRydWUsXG4gICAgICBzY3JvbGx0b3AgOiB0cnVlLCAvLyBqdW1wIHRvIHRvcCB3aGVuIHN0aWNreSBuYXYgbWVudSB0b2dnbGUgaXMgY2xpY2tlZFxuICAgICAgc3RpY2t5X29uIDogJ2FsbCcsXG4gICAgICBkcm9wZG93bl9hdXRvY2xvc2U6IHRydWVcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzZWN0aW9uLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAnYWRkX2N1c3RvbV9ydWxlIHJlZ2lzdGVyX21lZGlhIHRocm90dGxlJyk7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHNlbGYucmVnaXN0ZXJfbWVkaWEoJ3RvcGJhcicsICdmb3VuZGF0aW9uLW1xLXRvcGJhcicpO1xuXG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nLCB0aGlzLnNjb3BlKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvcGJhciA9ICQodGhpcyksXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JyksXG4gICAgICAgICAgICBzZWN0aW9uID0gc2VsZi5TKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJywgdGhpcyk7XG4gICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIDApO1xuICAgICAgICB2YXIgdG9wYmFyQ29udGFpbmVyID0gdG9wYmFyLnBhcmVudCgpO1xuICAgICAgICBpZiAodG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpIHx8IHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgdG9wYmFyQ29udGFpbmVyLCBzZXR0aW5ncykgKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5zdGlja3lfY2xhc3MgPSBzZXR0aW5ncy5zdGlja3lfY2xhc3M7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5zdGlja3lfdG9wYmFyID0gdG9wYmFyO1xuICAgICAgICAgIHRvcGJhci5kYXRhKCdoZWlnaHQnLCB0b3BiYXJDb250YWluZXIub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHRvcGJhckNvbnRhaW5lci5vZmZzZXQoKS50b3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcGJhci5kYXRhKCdoZWlnaHQnLCB0b3BiYXIub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNldHRpbmdzLmFzc2VtYmxlZCkge1xuICAgICAgICAgIHNlbGYuYXNzZW1ibGUodG9wYmFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgIHNlbGYuUygnLmhhcy1kcm9wZG93bicsIHRvcGJhcikuYWRkQ2xhc3MoJ25vdC1jbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuUygnLmhhcy1kcm9wZG93bicsIHRvcGJhcikucmVtb3ZlQ2xhc3MoJ25vdC1jbGljaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFkIGJvZHkgd2hlbiBzdGlja3kgKHNjcm9sbGVkKSBvciBmaXhlZC5cbiAgICAgICAgc2VsZi5hZGRfY3VzdG9tX3J1bGUoJy5mLXRvcGJhci1maXhlZCB7IHBhZGRpbmctdG9wOiAnICsgdG9wYmFyLmRhdGEoJ2hlaWdodCcpICsgJ3B4IH0nKTtcblxuICAgICAgICBpZiAodG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGlzX3N0aWNreSA6IGZ1bmN0aW9uICh0b3BiYXIsIHRvcGJhckNvbnRhaW5lciwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBzdGlja3kgICAgID0gdG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKHNldHRpbmdzLnN0aWNreV9jbGFzcyk7XG4gICAgICB2YXIgc21hbGxNYXRjaCA9IG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzO1xuICAgICAgdmFyIG1lZE1hdGNoICAgPSBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pLm1hdGNoZXM7XG4gICAgICB2YXIgbHJnTWF0Y2ggICA9IG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLmxhcmdlKS5tYXRjaGVzO1xuXG4gICAgICBpZiAoc3RpY2t5ICYmIHNldHRpbmdzLnN0aWNreV9vbiA9PT0gJ2FsbCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5ICYmIHRoaXMuc21hbGwoKSAmJiBzZXR0aW5ncy5zdGlja3lfb24uaW5kZXhPZignc21hbGwnKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgIW1lZE1hdGNoICYmICFscmdNYXRjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgaWYgKHN0aWNreSAmJiB0aGlzLm1lZGl1bSgpICYmIHNldHRpbmdzLnN0aWNreV9vbi5pbmRleE9mKCdtZWRpdW0nKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgbWVkTWF0Y2ggJiYgIWxyZ01hdGNoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5ICYmIHRoaXMubGFyZ2UoKSAmJiBzZXR0aW5ncy5zdGlja3lfb24uaW5kZXhPZignbGFyZ2UnKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgbWVkTWF0Y2ggJiYgbHJnTWF0Y2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cblxuICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKHRvZ2dsZUVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgdG9wYmFyO1xuXG4gICAgICBpZiAodG9nZ2xlRWwpIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKHRvZ2dsZUVsKS5jbG9zZXN0KCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICB2YXIgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicsIHRvcGJhcik7XG5cbiAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSkge1xuICAgICAgICBpZiAoIXNlbGYucnRsKSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe2xlZnQgOiAnMCUnfSk7XG4gICAgICAgICAgJCgnPi5uYW1lJywgc2VjdGlvbikuY3NzKHtsZWZ0IDogJzEwMCUnfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogJzAlJ30pO1xuICAgICAgICAgICQoJz4ubmFtZScsIHNlY3Rpb24pLmNzcyh7cmlnaHQgOiAnMTAwJSd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuUygnbGkubW92ZWQnLCBzZWN0aW9uKS5yZW1vdmVDbGFzcygnbW92ZWQnKTtcbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgMCk7XG5cbiAgICAgICAgdG9wYmFyXG4gICAgICAgICAgLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3Muc2Nyb2xsdG9wKSB7XG4gICAgICAgIGlmICghdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRvcGJhci5wYXJlbnQoKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zY3JvbGx0b3ApIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHNlbGYuUygnYm9keScpLnJlbW92ZUNsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZWxmLmlzX3N0aWNreSh0b3BiYXIsIHRvcGJhci5wYXJlbnQoKSwgc2V0dGluZ3MpKSB7XG4gICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcGJhci5wYXJlbnQoKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIGlmICghdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICB0b3BiYXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZV9zdGlja3lfcG9zaXRpb25pbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9wYmFyLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRpbWVyIDogbnVsbCxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uIChiYXIpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gdGhpcy5TO1xuXG4gICAgICBTKHRoaXMuc2NvcGUpXG4gICAgICAgIC5vZmYoJy50b3BiYXInKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAudG9nZ2xlLXRvcGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlbGYudG9nZ2xlKHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhciBjb250ZXh0bWVudS5mbmR0bi50b3BiYXInLCAnLnRvcC1iYXIgLnRvcC1iYXItc2VjdGlvbiBsaSBhW2hyZWZePVwiI1wiXSxbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAudG9wLWJhci1zZWN0aW9uIGxpIGFbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBsaSA9ICQodGhpcykuY2xvc2VzdCgnbGknKSxcbiAgICAgICAgICAgICAgICB0b3BiYXIgPSBsaS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmRyb3Bkb3duX2F1dG9jbG9zZSAmJiBzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICB2YXIgaG92ZXJMaSA9ICQodGhpcykuY2xvc2VzdCgnLmhvdmVyJyk7XG4gICAgICAgICAgICAgIGhvdmVyTGkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkgJiYgIWxpLmhhc0NsYXNzKCdiYWNrJykgJiYgIWxpLmhhc0NsYXNzKCdoYXMtZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgICBzZWxmLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIGxpLmhhcy1kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIGxpID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gUyhlLnRhcmdldCksXG4gICAgICAgICAgICAgIHRvcGJhciA9IGxpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICAgIGlmICh0YXJnZXQuZGF0YSgncmV2ZWFsSWQnKSkge1xuICAgICAgICAgICAgc2VsZi50b2dnbGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIgJiYgIU1vZGVybml6ci50b3VjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBpZiAobGkuaGFzQ2xhc3MoJ2hvdmVyJykpIHtcbiAgICAgICAgICAgIGxpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKVxuICAgICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGxpLnBhcmVudHMoJ2xpLmhvdmVyJylcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaS5hZGRDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgJChsaSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldFswXS5ub2RlTmFtZSA9PT0gJ0EnICYmIHRhcmdldC5wYXJlbnQoKS5oYXNDbGFzcygnaGFzLWRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLmhhcy1kcm9wZG93bj5hJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICAgIHRvcGJhciA9ICR0aGlzLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IHRvcGJhci5maW5kKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgZHJvcGRvd25IZWlnaHQgPSAkdGhpcy5uZXh0KCcuZHJvcGRvd24nKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgICRzZWxlY3RlZExpID0gJHRoaXMuY2xvc2VzdCgnbGknKTtcblxuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAxKTtcbiAgICAgICAgICAgICRzZWxlY3RlZExpLmFkZENsYXNzKCdtb3ZlZCcpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYucnRsKSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe2xlZnQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe3JpZ2h0IDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJHRoaXMuc2libGluZ3MoJ3VsJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIFMod2luZG93KS5vZmYoJy50b3BiYXInKS5vbigncmVzaXplLmZuZHRuLnRvcGJhcicsIHNlbGYudGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucmVzaXplLmNhbGwoc2VsZik7XG4gICAgICB9LCA1MCkpLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgb2Zmc2V0IGlzIGNhbGN1bGF0ZWQgYWZ0ZXIgYWxsIG9mIHRoZSBwYWdlcyByZXNvdXJjZXMgaGF2ZSBsb2FkZWRcbiAgICAgICAgICBTKHRoaXMpLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBTKCdib2R5Jykub2ZmKCcudG9wYmFyJykub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBTKGUudGFyZ2V0KS5jbG9zZXN0KCdsaScpLmNsb3Nlc3QoJ2xpLmhvdmVyJyk7XG5cbiAgICAgICAgaWYgKHBhcmVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10gbGkuaG92ZXInKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHbyB1cCBhIGxldmVsIG9uIENsaWNrXG4gICAgICBTKHRoaXMuc2NvcGUpLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLmhhcy1kcm9wZG93biAuYmFjaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgdG9wYmFyID0gJHRoaXMuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgIHNlY3Rpb24gPSB0b3BiYXIuZmluZCgnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpLFxuICAgICAgICAgICAgJG1vdmVkTGkgPSAkdGhpcy5jbG9zZXN0KCdsaS5tb3ZlZCcpLFxuICAgICAgICAgICAgJHByZXZpb3VzTGV2ZWxVbCA9ICRtb3ZlZExpLnBhcmVudCgpO1xuXG4gICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIHRvcGJhci5kYXRhKCdpbmRleCcpIC0gMSk7XG5cbiAgICAgICAgaWYgKCFzZWxmLnJ0bCkge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7bGVmdCA6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7cmlnaHQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcGJhci5kYXRhKCdpbmRleCcpID09PSAwKSB7XG4gICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICRwcmV2aW91c0xldmVsVWwub3V0ZXJIZWlnaHQodHJ1ZSkgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJG1vdmVkTGkucmVtb3ZlQ2xhc3MoJ21vdmVkJyk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2hvdyBkcm9wZG93biBtZW51cyB3aGVuIHRoZWlyIGl0ZW1zIGFyZSBmb2N1c2VkXG4gICAgICBTKHRoaXMuc2NvcGUpLmZpbmQoJy5kcm9wZG93biBhJylcbiAgICAgICAgLmZvY3VzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5oYXMtZHJvcGRvd24nKS5hZGRDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmJsdXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykucGFyZW50cygnLmhhcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVzaXplIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9wYmFyID0gc2VsZi5TKHRoaXMpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICAgIHZhciBzdGlja3lDb250YWluZXIgPSB0b3BiYXIucGFyZW50KCcuJyArIHNlbGYuc2V0dGluZ3Muc3RpY2t5X2NsYXNzKTtcbiAgICAgICAgdmFyIHN0aWNreU9mZnNldDtcblxuICAgICAgICBpZiAoIXNlbGYuYnJlYWtwb2ludCgpKSB7XG4gICAgICAgICAgdmFyIGRvVG9nZ2xlID0gdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIHRvcGJhclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGlmIChkb1RvZ2dsZSkge1xuICAgICAgICAgICAgICBzZWxmLnRvZ2dsZSh0b3BiYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgc3RpY2t5Q29udGFpbmVyLCBzZXR0aW5ncykpIHtcbiAgICAgICAgICBpZiAoc3RpY2t5Q29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpeGVkIHRvIGFsbG93IGZvciBjb3JyZWN0IGNhbGN1bGF0aW9uIG9mIHRoZSBvZmZzZXQuXG4gICAgICAgICAgICBzdGlja3lDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG5cbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICBpZiAoc2VsZi5TKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdmLXRvcGJhci1maXhlZCcpKSB7XG4gICAgICAgICAgICAgIHN0aWNreU9mZnNldCAtPSB0b3BiYXIuZGF0YSgnaGVpZ2h0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnLCBzdGlja3lPZmZzZXQpO1xuICAgICAgICAgICAgc3RpY2t5Q29udGFpbmVyLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lDb250YWluZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHN0aWNreU9mZnNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBicmVha3BvaW50IDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1sndG9wYmFyJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIHNtYWxsIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWydzbWFsbCddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBtZWRpdW0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ21lZGl1bSddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBsYXJnZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1snbGFyZ2UnXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgYXNzZW1ibGUgOiBmdW5jdGlvbiAodG9wYmFyKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpLFxuICAgICAgICAgIHNlY3Rpb24gPSBzZWxmLlMoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nLCB0b3BiYXIpO1xuXG4gICAgICAvLyBQdWxsIGVsZW1lbnQgb3V0IG9mIHRoZSBET00gZm9yIG1hbmlwdWxhdGlvblxuICAgICAgc2VjdGlvbi5kZXRhY2goKTtcblxuICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duPmEnLCBzZWN0aW9uKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRsaW5rID0gc2VsZi5TKHRoaXMpLFxuICAgICAgICAgICAgJGRyb3Bkb3duID0gJGxpbmsuc2libGluZ3MoJy5kcm9wZG93bicpLFxuICAgICAgICAgICAgdXJsID0gJGxpbmsuYXR0cignaHJlZicpLFxuICAgICAgICAgICAgJHRpdGxlTGk7XG5cbiAgICAgICAgaWYgKCEkZHJvcGRvd24uZmluZCgnLnRpdGxlLmJhY2snKS5sZW5ndGgpIHtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2JpbGVfc2hvd19wYXJlbnRfbGluayA9PSB0cnVlICYmIHVybCkge1xuICAgICAgICAgICAgJHRpdGxlTGkgPSAkKCc8bGkgY2xhc3M9XCJ0aXRsZSBiYWNrIGpzLWdlbmVyYXRlZFwiPjxoNT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PC9hPjwvaDU+PC9saT48bGkgY2xhc3M9XCJwYXJlbnQtbGluayBoaWRlLWZvci1tZWRpdW0tdXBcIj48YSBjbGFzcz1cInBhcmVudC1saW5rIGpzLWdlbmVyYXRlZFwiIGhyZWY9XCInICsgdXJsICsgJ1wiPicgKyAkbGluay5odG1sKCkgKyc8L2E+PC9saT4nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRpdGxlTGkgPSAkKCc8bGkgY2xhc3M9XCJ0aXRsZSBiYWNrIGpzLWdlbmVyYXRlZFwiPjxoNT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PC9hPjwvaDU+Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29weSBsaW5rIHRvIHN1Ym5hdlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jdXN0b21fYmFja190ZXh0ID09IHRydWUpIHtcbiAgICAgICAgICAgICQoJ2g1PmEnLCAkdGl0bGVMaSkuaHRtbChzZXR0aW5ncy5iYWNrX3RleHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCdoNT5hJywgJHRpdGxlTGkpLmh0bWwoJyZsYXF1bzsgJyArICRsaW5rLmh0bWwoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRkcm9wZG93bi5wcmVwZW5kKCR0aXRsZUxpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFB1dCBlbGVtZW50IGJhY2sgaW4gdGhlIERPTVxuICAgICAgc2VjdGlvbi5hcHBlbmRUbyh0b3BiYXIpO1xuXG4gICAgICAvLyBjaGVjayBmb3Igc3RpY2t5XG4gICAgICB0aGlzLnN0aWNreSgpO1xuXG4gICAgICB0aGlzLmFzc2VtYmxlZCh0b3BiYXIpO1xuICAgIH0sXG5cbiAgICBhc3NlbWJsZWQgOiBmdW5jdGlvbiAodG9wYmFyKSB7XG4gICAgICB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSwgJC5leHRlbmQoe30sIHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpKSwge2Fzc2VtYmxlZCA6IHRydWV9KSk7XG4gICAgfSxcblxuICAgIGhlaWdodCA6IGZ1bmN0aW9uICh1bCkge1xuICAgICAgdmFyIHRvdGFsID0gMCxcbiAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgJCgnPiBsaScsIHVsKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG90YWwgKz0gc2VsZi5TKHRoaXMpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9LFxuXG4gICAgc3RpY2t5IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLlMod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnVwZGF0ZV9zdGlja3lfcG9zaXRpb25pbmcoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVfc3RpY2t5X3Bvc2l0aW9uaW5nIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtsYXNzID0gJy4nICsgdGhpcy5zZXR0aW5ncy5zdGlja3lfY2xhc3MsXG4gICAgICAgICAgJHdpbmRvdyA9IHRoaXMuUyh3aW5kb3cpLFxuICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoc2VsZi5zZXR0aW5ncy5zdGlja3lfdG9wYmFyICYmIHNlbGYuaXNfc3RpY2t5KHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhcix0aGlzLnNldHRpbmdzLnN0aWNreV90b3BiYXIucGFyZW50KCksIHRoaXMuc2V0dGluZ3MpKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnKSArIHRoaXMuc2V0dGluZ3Muc3RhcnRfb2Zmc2V0O1xuICAgICAgICBpZiAoIXNlbGYuUyhrbGFzcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICBpZiAoJHdpbmRvdy5zY3JvbGxUb3AoKSA+IChkaXN0YW5jZSkpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5TKGtsYXNzKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgICBzZWxmLlMoa2xhc3MpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCR3aW5kb3cuc2Nyb2xsVG9wKCkgPD0gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLlMoa2xhc3MpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAgIHNlbGYuUyhrbGFzcykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICAgIHNlbGYuUygnYm9keScpLnJlbW92ZUNsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBvZmYgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLlModGhpcy5zY29wZSkub2ZmKCcuZm5kdG4udG9wYmFyJyk7XG4gICAgICB0aGlzLlMod2luZG93KS5vZmYoJy5mbmR0bi50b3BiYXInKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiLypcbiAqXHRqUXVlcnkgZWxldmF0ZVpvb20gMy4wLjhcbiAqXHREZW1vJ3MgYW5kIGRvY3VtZW50YXRpb246XG4gKlx0d3d3LmVsZXZhdGV3ZWIuY28udWsvaW1hZ2Utem9vbVxuICpcbiAqXHRDb3B5cmlnaHQgKGMpIDIwMTIgQW5kcmV3IEVhZGVzXG4gKlx0d3d3LmVsZXZhdGV3ZWIuY28udWtcbiAqXG4gKlx0RHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgR1BMIGFuZCBNSVQgbGljZW5zZXMuXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZVxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvR05VX0dlbmVyYWxfUHVibGljX0xpY2Vuc2VcbiAqXG5cbi8qXG4gKlx0alF1ZXJ5IGVsZXZhdGVab29tIDMuMC4zXG4gKlx0RGVtbydzIGFuZCBkb2N1bWVudGF0aW9uOlxuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrL2ltYWdlLXpvb21cbiAqXG4gKlx0Q29weXJpZ2h0IChjKSAyMDEyIEFuZHJldyBFYWRlc1xuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrXG4gKlxuICpcdER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIEdQTCBhbmQgTUlUIGxpY2Vuc2VzLlxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2VcbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dOVV9HZW5lcmFsX1B1YmxpY19MaWNlbnNlXG4gKi9cblxuXG5pZiAoIHR5cGVvZiBPYmplY3QuY3JlYXRlICE9PSAnZnVuY3Rpb24nICkge1xuICAgIE9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbiggb2JqICkge1xuICAgICAgICBmdW5jdGlvbiBGKCkge307XG4gICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuICAgICAgICByZXR1cm4gbmV3IEYoKTtcbiAgICB9O1xufVxuXG4oZnVuY3Rpb24oICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcbiAgICB2YXIgRWxldmF0ZVpvb20gPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiggb3B0aW9ucywgZWxlbSApIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmVsZW0gPSBlbGVtO1xuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0gPSAkKCBlbGVtICk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmltYWdlU3JjID0gc2VsZi4kZWxlbS5kYXRhKFwiem9vbS1pbWFnZVwiKSA/IHNlbGYuJGVsZW0uZGF0YShcInpvb20taW1hZ2VcIikgOiBzZWxmLiRlbGVtLmF0dHIoXCJzcmNcIik7XG5cbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sICQuZm4uZWxldmF0ZVpvb20ub3B0aW9ucywgb3B0aW9ucyApO1xuXG4gICAgICAgICAgICAgICAgLy9USU5UIE9WRVJSSURFIFNFVFRJTkdTXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmxlbnNDb2xvdXIgPSBcIm5vbmVcIiwgLy9jb2xvdXIgb2YgdGhlIGxlbnMgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubGVuc09wYWNpdHkgPSAgXCIxXCIgLy9vcGFjaXR5IG9mIHRoZSBsZW5zXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vSU5ORVIgT1ZFUlJJREUgU0VUVElOR1NcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7c2VsZi5vcHRpb25zLnNob3dMZW5zID0gZmFsc2U7fVxuXG5cbiAgICAgICAgICAgICAgICAvL1JlbW92ZSBhbHQgb24gaG92ZXJcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ucGFyZW50KCkucmVtb3ZlQXR0cigndGl0bGUnKS5yZW1vdmVBdHRyKCdhbHQnKTtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUltYWdlID0gc2VsZi5pbWFnZVNyYztcblxuICAgICAgICAgICAgICAgIHNlbGYucmVmcmVzaCggMSApO1xuXG5cblxuICAgICAgICAgICAgICAgIC8vQ3JlYXRlIHRoZSBpbWFnZSBzd2FwIGZyb20gdGhlIGdhbGxlcnlcbiAgICAgICAgICAgICAgICAkKCcjJytzZWxmLm9wdGlvbnMuZ2FsbGVyeSArICcgYScpLmNsaWNrKCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgYSBjbGFzcyBvbiB0aGUgY3VycmVudGx5IGFjdGl2ZSBnYWxsZXJ5IGltYWdlXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5nYWxsZXJ5QWN0aXZlQ2xhc3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycrc2VsZi5vcHRpb25zLmdhbGxlcnkgKyAnIGEnKS5yZW1vdmVDbGFzcyhzZWxmLm9wdGlvbnMuZ2FsbGVyeUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3Moc2VsZi5vcHRpb25zLmdhbGxlcnlBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9zdG9wIGFueSBsaW5rIG9uIHRoZSBhIHRhZyBmcm9tIHdvcmtpbmdcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY2FsbCB0aGUgc3dhcCBpbWFnZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpKXtzZWxmLnpvb21JbWFnZVByZSA9ICQodGhpcykuZGF0YShcInpvb20taW1hZ2VcIil9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tSW1hZ2VQcmUgPSAkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dhcHRoZWltYWdlKCQodGhpcykuZGF0YShcImltYWdlXCIpLCBzZWxmLnpvb21JbWFnZVByZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oIGxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmZldGNoKHNlbGYuaW1hZ2VTcmMpO1xuXG4gICAgICAgICAgICAgICAgfSwgbGVuZ3RoIHx8IHNlbGYub3B0aW9ucy5yZWZyZXNoICk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oaW1nc3JjKSB7XG4gICAgICAgICAgICAgICAgLy9nZXQgdGhlIGltYWdlXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBuZXdJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBsYXJnZSBpbWFnZSBkaW1lbnNpb25zIC0gdXNlZCB0byBjYWxjdWx0ZSByYXRpbydzXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VXaWR0aCA9IG5ld0ltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXJnZUhlaWdodCA9IG5ld0ltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIC8vb25jZSBpbWFnZSBpcyBsb2FkZWQgc3RhcnQgdGhlIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRab29tKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEltYWdlID0gc2VsZi5pbWFnZVNyYztcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgY2FsbGVyIGtub3cgaW1hZ2UgaGFzIGJlZW4gbG9hZGVkXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5vblpvb21lZEltYWdlTG9hZGVkKHNlbGYuJGVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gaW1nc3JjOyAvLyB0aGlzIG11c3QgYmUgZG9uZSBBRlRFUiBzZXR0aW5nIG9ubG9hZFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGFydFpvb206IGZ1bmN0aW9uKCApIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLy9nZXQgZGltZW5zaW9ucyBvZiB0aGUgbm9uIHpvb21lZCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIC8vYWN0aXZhdGVkIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgc2VsZi5pc1dpbmRvd0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNMZW5zQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5pc1RpbnRBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLm92ZXJXaW5kb3cgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vQ3Jvc3NGYWRlIFdyYXBwZVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAgPSBzZWxmLiRlbGVtLndyYXAoJzxkaXYgc3R5bGU9XCJoZWlnaHQ6JytzZWxmLm56SGVpZ2h0KydweDt3aWR0aDonK3NlbGYubnpXaWR0aCsncHg7XCIgY2xhc3M9XCJ6b29tV3JhcHBlclwiIC8+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUxvY2sgPSAxO1xuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsaW5nTG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnpvb21MZXZlbDtcblxuXG4gICAgICAgICAgICAgICAgLy9nZXQgb2Zmc2V0IG9mIHRoZSBub24gem9vbWVkIGltYWdlXG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIHdpZHRoIHJhdGlvIG9mIHRoZSBsYXJnZS9zbWFsbCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5jdXJyZW50Wm9vbUxldmVsKSAvIHNlbGYubnpIZWlnaHQ7XG5cblxuICAgICAgICAgICAgICAgIC8vaWYgd2luZG93IHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3dTdHlsZSA9IFwib3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0JnQ29sb3VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjt3aWR0aDogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweDtmbG9hdDogbGVmdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtc2l6ZTogXCIrIHNlbGYubGFyZ2VXaWR0aC9zZWxmLmN1cnJlbnRab29tTGV2ZWwrIFwicHggXCIgK3NlbGYubGFyZ2VIZWlnaHQvc2VsZi5jdXJyZW50Wm9vbUxldmVsICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImRpc3BsYXk6IG5vbmU7ei1pbmRleDoxMDA7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXI6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4IHNvbGlkIFwiICsgc2VsZi5vcHRpb25zLmJvcmRlckNvbG91clxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy9pZiBpbm5lciAgem9vbVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9oYXMgYSBib3JkZXIgYmVlbiBwdXQgb24gdGhlIGltYWdlPyBMZXRzIGNhdGVyIGZvciB0aGlzXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvcmRlcldpZHRoID0gc2VsZi4kZWxlbS5jc3MoXCJib3JkZXItbGVmdC13aWR0aFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3dTdHlsZSA9IFwib3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIm1hcmdpbi1sZWZ0OiBcIiArIFN0cmluZyhib3JkZXJXaWR0aCkgKyBcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIm1hcmdpbi10b3A6IFwiICsgU3RyaW5nKGJvcmRlcldpZHRoKSArIFwiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOiBcIiArIFN0cmluZyhzZWxmLm56V2lkdGgpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBTdHJpbmcoc2VsZi5uekhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweDtmbG9hdDogbGVmdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImRpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJjdXJzb3I6XCIrKHNlbGYub3B0aW9ucy5jdXJzb3IpK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHggc29saWQgXCIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyQ29sb3VyXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiO2JhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIC8vbGVucyBzdHlsZSBmb3Igd2luZG93IHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRqdXN0IGltYWdlcyBsZXNzIHRoYW4gdGhlIHdpbmRvdyBoZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0L3NlbGYuaGVpZ2h0UmF0aW8pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VXaWR0aCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSAgKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zU3R5bGUgPSBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7d2lkdGg6IFwiICsgU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKS9zZWxmLndpZHRoUmF0aW8pICsgXCJweDtoZWlnaHQ6IFwiICsgU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCkvc2VsZi5oZWlnaHRSYXRpbylcbiAgICAgICAgICAgICAgICAgICAgKyBcInB4O2Zsb2F0OiByaWdodDtkaXNwbGF5OiBub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJvdmVyZmxvdzogaGlkZGVuO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJ6LWluZGV4OiA5OTk7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIi13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJvcGFjaXR5OlwiKyhzZWxmLm9wdGlvbnMubGVuc09wYWNpdHkpK1wiO2ZpbHRlcjogYWxwaGEob3BhY2l0eSA9IFwiKyhzZWxmLm9wdGlvbnMubGVuc09wYWNpdHkqMTAwKStcIik7IHpvb206MTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6XCIrbGVuc1dpZHRoK1wicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDpcIitsZW5zSGVpZ2h0K1wicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtY29sb3I6XCIrKHNlbGYub3B0aW9ucy5sZW5zQ29sb3VyKStcIjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiY3Vyc29yOlwiKyhzZWxmLm9wdGlvbnMuY3Vyc29yKStcIjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyOiBcIisoc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKStcInB4XCIgK1xuICAgICAgICAgICAgICAgICAgICBcIiBzb2xpZCBcIisoc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJDb2xvdXIpK1wiO2JhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7cG9zaXRpb246IGFic29sdXRlO1wiO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy90aW50IHN0eWxlXG4gICAgICAgICAgICAgICAgc2VsZi50aW50U3R5bGUgPSBcImRpc3BsYXk6IGJsb2NrO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJwb3NpdGlvbjogYWJzb2x1dGU7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtY29sb3I6IFwiK3NlbGYub3B0aW9ucy50aW50Q29sb3VyK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJmaWx0ZXI6YWxwaGEob3BhY2l0eT0wKTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3BhY2l0eTogMDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6IFwiICsgc2VsZi5ueldpZHRoICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OiBcIiArIHNlbGYubnpIZWlnaHQgKyBcInB4O1wiXG5cbiAgICAgICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgLy9sZW5zIHN0eWxlIGZvciBsZW5zIHpvb20gd2l0aCBvcHRpb25hbCByb3VuZCBmb3IgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgc2VsZi5sZW5zUm91bmQgPSAnJztcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1N0eWxlID0gXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiZmxvYXQ6IGxlZnQ7ZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlcjogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweCBzb2xpZCBcIiArIHNlbGYub3B0aW9ucy5ib3JkZXJDb2xvdXIrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDpcIisgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSkgK1wicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6XCIrIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpK1wicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O3Bvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAvL2RvZXMgbm90IHJvdW5kIGluIGFsbCBicm93c2Vyc1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sZW5zU2hhcGUgPT0gXCJyb3VuZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1JvdW5kID0gXCJib3JkZXItdG9wLWxlZnQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSAvIDIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSkgKyBcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSAvIDIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSkgKyBcInB4O1wiO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgdGhlIGRpdidzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIlwiXG4gICAgICAgICAgICAgICAgLy9zZWxmLnpvb21Db250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnem9vbUNvbnRhaW5lcicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJoZWlnaHRcIjpzZWxmLm56SGVpZ2h0LCBcIndpZHRoXCI6c2VsZi5ueldpZHRofSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiem9vbUNvbnRhaW5lclwiIHN0eWxlPVwiLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7cG9zaXRpb246YWJzb2x1dGU7bGVmdDonK3NlbGYubnpPZmZzZXQubGVmdCsncHg7dG9wOicrc2VsZi5uek9mZnNldC50b3ArJ3B4O2hlaWdodDonK3NlbGYubnpIZWlnaHQrJ3B4O3dpZHRoOicrc2VsZi5ueldpZHRoKydweDtcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYXBwZW5kKHNlbGYuem9vbUNvbnRhaW5lcik7XG5cblxuICAgICAgICAgICAgICAgIC8vdGhpcyB3aWxsIGFkZCBvdmVyZmxvdyBoaWRkZW4gYW5kIGNvbnRyYWluIHRoZSBsZW5zIG9uIGxlbnMgbW9kZVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb250YWluTGVuc1pvb20gJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMgPSAkKFwiPGRpdiBjbGFzcz0nem9vbUxlbnMnIHN0eWxlPSdcIiArIHNlbGYubGVuc1N0eWxlICsgc2VsZi5sZW5zUm91bmQgK1wiJz4mbmJzcDs8L2Rpdj5cIilcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHNlbGYuem9vbUNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50Q29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3RpbnRDb250YWluZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQgPSAkKFwiPGRpdiBjbGFzcz0nem9vbVRpbnQnIHN0eWxlPSdcIitzZWxmLnRpbnRTdHlsZStcIic+PC9kaXY+XCIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMud3JhcChzZWxmLnRpbnRDb250YWluZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRjc3MgPSBzZWxmLnpvb21MZW5zLmFmdGVyKHNlbGYuem9vbVRpbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIHRpbnQgZW5hYmxlZCAtIHNldCBhbiBpbWFnZSB0byBzaG93IG92ZXIgdGhlIHRpbnRcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlID0gJCgnPGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogMHB4OyB0b3A6IDBweDsgbWF4LXdpZHRoOiBub25lOyB3aWR0aDogJytzZWxmLm56V2lkdGgrJ3B4OyBoZWlnaHQ6ICcrc2VsZi5uekhlaWdodCsncHg7XCIgc3JjPVwiJytzZWxmLmltYWdlU3JjKydcIj4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHNlbGYuem9vbUxlbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cblxuXG5cblxuXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgem9vbSB3aW5kb3dcbiAgICAgICAgICAgICAgICBpZihpc05hTihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1Bvc2l0aW9uKSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdyA9ICQoXCI8ZGl2IHN0eWxlPSd6LWluZGV4Ojk5OTtsZWZ0OlwiKyhzZWxmLndpbmRvd09mZnNldExlZnQpK1wicHg7dG9wOlwiKyhzZWxmLndpbmRvd09mZnNldFRvcCkrXCJweDtcIiArIHNlbGYuem9vbVdpbmRvd1N0eWxlICsgXCInIGNsYXNzPSd6b29tV2luZG93Jz4mbmJzcDs8L2Rpdj5cIilcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCdib2R5JylcbiAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdyA9ICQoXCI8ZGl2IHN0eWxlPSd6LWluZGV4Ojk5OTtsZWZ0OlwiKyhzZWxmLndpbmRvd09mZnNldExlZnQpK1wicHg7dG9wOlwiKyhzZWxmLndpbmRvd09mZnNldFRvcCkrXCJweDtcIiArIHNlbGYuem9vbVdpbmRvd1N0eWxlICsgXCInIGNsYXNzPSd6b29tV2luZG93Jz4mbmJzcDs8L2Rpdj5cIilcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHNlbGYuem9vbUNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvd0NvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd6b29tV2luZG93Q29udGFpbmVyJykuY3NzKFwid2lkdGhcIixzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cud3JhcChzZWxmLnpvb21XaW5kb3dDb250YWluZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyAgc2VsZi5jYXB0aW9uU3R5bGUgPSBcInRleHQtYWxpZ246IGxlZnQ7YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7Y29sb3I6IHdoaXRlO2ZvbnQtd2VpZ2h0OiBib2xkO3BhZGRpbmc6IDEwcHg7Zm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7Zm9udC1zaXplOiAxMXB4XCI7XG4gICAgICAgICAgICAgICAgLy8gc2VsZi56b29tQ2FwdGlvbiA9ICQoJzxkaXYgY2xhc3M9XCJlbGV2YXRlem9vbS1jYXB0aW9uXCIgc3R5bGU9XCInK3NlbGYuY2FwdGlvblN0eWxlKydkaXNwbGF5OiBibG9jazsgd2lkdGg6IDI4MHB4O1wiPklOU0VSVCBBTFQgVEFHPC9kaXY+JykuYXBwZW5kVG8oc2VsZi56b29tV2luZG93LnBhcmVudCgpKTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgc2VsZi5pbWFnZVNyYyArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgc2VsZi5pbWFnZVNyYyArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBzZWxmLmltYWdlU3JjICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS1FTkQgVEhFIFpPT00gV0lORE9XIEFORCBMRU5TLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4gICAgICAgICAgICAgICAgLy90b3VjaCBldmVudHNcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmJpbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbih0b3VjaCk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYmluZCgndG91Y2htb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJzaG93XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24odG91Y2gpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYmluZCgndG91Y2hlbmQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge3NlbGYuc2hvd0hpZGVMZW5zKFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtzZWxmLnNob3dIaWRlVGludChcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmJpbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRvdWNoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge3NlbGYuc2hvd0hpZGVMZW5zKFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vTmVlZGVkIHRvIHdvcmsgaW4gSUVcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm92ZXJXaW5kb3cgPT0gZmFsc2Upe3NlbGYuc2V0RWxlbWVudHMoXCJzaG93XCIpO31cbiAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgb24gb3JpZW50YXRpb24gY2hhbmdlIHRoZSBzZXRwb3NpdGlvbiBpcyBub3QgZmlyZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9jID0gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RZID0gZS5jbGllbnRZO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vdmVyV2luZG93ID09IGZhbHNlKXtzZWxmLnNldEVsZW1lbnRzKFwic2hvd1wiKTt9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgb24gb3JpZW50YXRpb24gY2hhbmdlIHRoZSBzZXRwb3NpdGlvbiBpcyBub3QgZmlyZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9jID0gZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLm92ZXJXaW5kb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgb24gb3JpZW50YXRpb24gY2hhbmdlIHRoZSBzZXRwb3NpdGlvbiBpcyBub3QgZmlyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9jID0gZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RZID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy8gIGxlbnNGYWRlT3V0OiA1MDAsICB6b29tVGludEZhZGVJblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5hZGQoc2VsZi4kZWxlbSkubW91c2VlbnRlcihmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3ZlcldpbmRvdyA9PSBmYWxzZSl7c2VsZi5zZXRFbGVtZW50cyhcInNob3dcIik7fVxuXG5cbiAgICAgICAgICAgICAgICB9KS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLnNjcm9sbExvY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFbGVtZW50cyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL2VuZCBvdmUgaW1hZ2VcblxuXG5cblxuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cubW91c2VlbnRlcihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vdmVyV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub3ZlcldpbmRvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9lbmQgb3ZlIGltYWdlXG5cblxuXG4vL1x0XHRcdFx0dmFyIGRlbHRhID0gcGFyc2VJbnQoZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgfHwgLWUub3JpZ2luYWxFdmVudC5kZXRhaWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gICAgICAkKHRoaXMpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy9maXggZm9yIGluaXRpYWwgem9vbSBzZXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy56b29tTGV2ZWwgIT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIC8vXHRzZWxmLmNoYW5nZVpvb21MZXZlbChzZWxmLmN1cnJlbnRab29tTGV2ZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3NldCB0aGUgbWluIHpvb21sZXZlbFxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5taW5ab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pblpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy5taW5ab29tTGV2ZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubWluWm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQgKiAyO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNjcm9sbFpvb20pe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmFkZChzZWxmLiRlbGVtKS5iaW5kKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsIE1vek1vdXNlUGl4ZWxTY3JvbGwnLCBmdW5jdGlvbihlKXtcblxuXG4vL1x0XHRcdFx0XHRcdGluIElFIHRoZXJlIGlzIGlzc3VlIHdpdGggZmlyaW5nIG9mIG1vdXNlbGVhdmUgLSBTbyBjaGVjayB3aGV0aGVyIHN0aWxsIHNjcm9sbGluZ1xuLy9cdFx0XHRcdFx0XHRhbmQgb24gbW91c2VsZWF2ZSBjaGVjayBpZiBzY3JvbGxsb2NrXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbExvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KCQuZGF0YSh0aGlzLCAndGltZXInKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgJ3RpbWVyJywgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbExvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjUwKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVFdmVudCA9IGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IGUub3JpZ2luYWxFdmVudC5kZXRhaWwqLTFcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2Nyb2xsVG9wICs9ICggZGVsdGEgPCAwID8gMSA6IC0xICkgKiAzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoZUV2ZW50IC8xMjAgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxpbmcgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmN1cnJlbnRab29tTGV2ZWwgPj0gc2VsZi5taW5ab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb21MZXZlbChzZWxmLmN1cnJlbnRab29tTGV2ZWwtc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbGluZyBkb3duXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5tYXhab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmN1cnJlbnRab29tTGV2ZWwgPD0gc2VsZi5vcHRpb25zLm1heFpvb21MZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb21MZXZlbChwYXJzZUZsb2F0KHNlbGYuY3VycmVudFpvb21MZXZlbCkrc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYW5keVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbUxldmVsKHBhcnNlRmxvYXQoc2VsZi5jdXJyZW50Wm9vbUxldmVsKStzZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbUluY3JlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0RWxlbWVudHM6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmKCFzZWxmLm9wdGlvbnMuem9vbUVuYWJsZWQpe3JldHVybiBmYWxzZTt9XG4gICAgICAgICAgICAgICAgaWYodHlwZT09XCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzV2luZG93U2V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJzaG93XCIpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge3NlbGYuc2hvd0hpZGVMZW5zKFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHlwZT09XCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYub3B0aW9ucy50aW50KSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1x0c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UG9zaXRpb246IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZighc2VsZi5vcHRpb25zLnpvb21FbmFibGVkKXtyZXR1cm4gZmFsc2U7fVxuXG4gICAgICAgICAgICAgICAgLy9yZWNhY2xjIG9mZnNldCBlYWNoIHRpbWUgaW4gY2FzZSB0aGUgaW1hZ2UgbW92ZXNcbiAgICAgICAgICAgICAgICAvL3RoaXMgY2FuIGJlIGNhdXNlZCBieSBvdGhlciBvbiBwYWdlIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IHRvcDogMH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IGxlZnQ6IDB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgcmVzcG9uc2l2ZVxuICAgICAgICAgICAgICAgIC8vd2lsbCBjaGVja2luZyBpZiB0aGUgaW1hZ2UgbmVlZHMgY2hhbmdpbmcgYmVmb3JlIHJ1bm5pbmcgdGhpcyBjb2RlIHdvcmsgZmFzdGVyP1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5yZXNwb25zaXZlICYmICFzZWxmLm9wdGlvbnMuc2Nyb2xsWm9vbSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VXaWR0aCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSBzZWxmLmxhcmdlV2lkdGggLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gc2VsZi5sYXJnZUhlaWdodCAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wb3NzaWJseSBkb250IG5lZWQgdG8ga2VlcCByZWNhbGNhbGN1bGF0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGUgbGVucyBpcyBoZWlnaGVyIHRoYW4gdGhlIGltYWdlLCB0aGVuIHNldCBsZW5zIHNpemUgdG8gaW1hZ2Ugc2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBTdHJpbmcoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0L3NlbGYuaGVpZ2h0UmF0aW8pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSAgKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnd2lkdGgnLCBsZW5zV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCdoZWlnaHQnLCBsZW5zSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcygnd2lkdGgnLCBzZWxmLm56V2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKCdoZWlnaHQnLCBzZWxmLm56SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyB3aWR0aDogU3RyaW5nKHNlbGYub3B0aW9ucy5sZW5zU2l6ZSkgKyAncHgnLCBoZWlnaHQ6IFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICsgJ3B4JyB9KVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZW5kIHJlc3BvbnNpdmUgaW1hZ2UgY2hhbmdlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2NvbnRhaW5lciBmaXhcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKHsgdG9wOiBzZWxmLm56T2Zmc2V0LnRvcH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoeyBsZWZ0OiBzZWxmLm56T2Zmc2V0LmxlZnR9KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlTGVmdCA9IHBhcnNlSW50KGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpO1xuICAgICAgICAgICAgICAgIHNlbGYubW91c2VUb3AgPSBwYXJzZUludChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApO1xuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBMb2NhdGlvbiBvZiB0aGUgTGVuc1xuXG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIGJvdW5kIHJlZ2lvbnMgLSBidXQgb25seSBpZiB6b29tIHdpbmRvd1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXRvcHBvcyA9IChzZWxmLm1vdXNlVG9wIDwgKHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkvMikpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVib3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA+IHNlbGYubnpIZWlnaHQgLSAoc2VsZi56b29tTGVucy5oZWlnaHQoKS8yKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FbG9wcG9zID0gKHNlbGYubW91c2VMZWZ0IDwgMCsoKHNlbGYuem9vbUxlbnMud2lkdGgoKS8yKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVyb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPiAoc2VsZi5ueldpZHRoIC0gKHNlbGYuem9vbUxlbnMud2lkdGgoKS8yKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBib3VuZCByZWdpb25zIC0gYnV0IG9ubHkgZm9yIGlubmVyIHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FdG9wcG9zID0gKHNlbGYubW91c2VUb3AgPCAoKHNlbGYubnpIZWlnaHQvMikvc2VsZi5oZWlnaHRSYXRpbykgKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FYm9wcG9zID0gKHNlbGYubW91c2VUb3AgPiAoc2VsZi5uekhlaWdodCAtICgoc2VsZi5uekhlaWdodC8yKS9zZWxmLmhlaWdodFJhdGlvKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVsb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPCAwKygoKHNlbGYubnpXaWR0aC8yKS9zZWxmLndpZHRoUmF0aW8pKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXJvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA+IChzZWxmLm56V2lkdGggLSAoc2VsZi5ueldpZHRoLzIpL3NlbGYud2lkdGhSYXRpby0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIG1vdXNlIHBvc2l0aW9uIG9mIHRoZSBzbGlkZXIgaXMgb25lIG9mIHRoZSBvdXRlcmJvdW5kcywgdGhlbiBoaWRlICB3aW5kb3cgYW5kIGxlbnNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5tb3VzZUxlZnQgPD0gMCB8fCBzZWxmLm1vdXNlVG9wIDwgMCB8fCBzZWxmLm1vdXNlTGVmdCA+IHNlbGYubnpXaWR0aCB8fCBzZWxmLm1vdXNlVG9wID4gc2VsZi5uekhlaWdodCApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRFbGVtZW50cyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9lbHNlIGNvbnRpbnVlIHdpdGggb3BlcmF0aW9uc1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgLy9sZW5zIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1x0XHRzZWxmLnNob3dIaWRlTGVucyhcInNob3dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBiYWNrZ3JvdW5kIHBvc2l0aW9uIG9mIGxlbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc0xlZnRQb3MgPSBTdHJpbmcoc2VsZi5tb3VzZUxlZnQgLSBzZWxmLnpvb21MZW5zLndpZHRoKCkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1RvcFBvcyA9IFN0cmluZyhzZWxmLm1vdXNlVG9wIC0gc2VsZi56b29tTGVucy5oZWlnaHQoKSAvIDIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2FkanVzdCB0aGUgYmFja2dyb3VuZCBwb3NpdGlvbiBpZiB0aGUgbW91c2UgaXMgaW4gb25lIG9mIHRoZSBvdXRlciByZWdpb25zXG5cbiAgICAgICAgICAgICAgICAgICAgLy9Ub3AgcmVnaW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRXRvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vTGVmdCBSZWdpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FbG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcz0wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGJvdHRvbSBhbmQgcmlnaHQgcmVnaW9uIGZvciB3aW5kb3cgbW9kZVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBNYXRoLm1heCggKHNlbGYubnpIZWlnaHQpLXNlbGYuem9vbUxlbnMuaGVpZ2h0KCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSwgMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gKHNlbGYubnpXaWR0aC0oc2VsZi56b29tTGVucy53aWR0aCgpKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1NldCBib3R0b20gYW5kIHJpZ2h0IHJlZ2lvbiBmb3IgaW5uZXIgbW9kZVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1RvcFBvcyA9IE1hdGgubWF4KCAoKHNlbGYubnpIZWlnaHQpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpLCAwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc0xlZnRQb3MgPSAoc2VsZi5ueldpZHRoLShzZWxmLm56V2lkdGgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9pZiBsZW5zIHpvb21cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSBTdHJpbmcoKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KSAqIHNlbGYud2lkdGhSYXRpbyAtIHNlbGYuem9vbUxlbnMud2lkdGgoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd1RvcFBvcyA9IFN0cmluZygoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgKiBzZWxmLmhlaWdodFJhdGlvIC0gc2VsZi56b29tTGVucy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgYmFja2dyb3VuZFBvc2l0aW9uOiBzZWxmLndpbmRvd0xlZnRQb3MgKyAncHggJyArIHNlbGYud2luZG93VG9wUG9zICsgJ3B4JyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0V2luZG93UG9zdGl0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgdGludCB6b29tXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0VGludFBvc2l0aW9uKGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIGNzcyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFdpbmRvd1Bvc3RpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFdpbmRvd1Bvc3RpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5mdWxsd2lkdGggJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBsZWZ0OiBzZWxmLmxlbnNMZWZ0UG9zICsgJ3B4JywgdG9wOiBzZWxmLmxlbnNUb3BQb3MgKyAncHgnIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gLy9lbmQgZWxzZVxuXG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dIaWRlV2luZG93OiBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuaXNXaW5kb3dBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5zdG9wKHRydWUsIHRydWUsIGZhbHNlKS5mYWRlSW4oc2VsZi5vcHRpb25zLnpvb21XaW5kb3dGYWRlSW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21XaW5kb3cuc2hvdygpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNXaW5kb3dBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dGYWRlT3V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuc3RvcCh0cnVlLCB0cnVlKS5mYWRlT3V0KHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZU91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbVdpbmRvdy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1dpbmRvd0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dIaWRlTGVuczogZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmlzTGVuc0FjdGl2ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubGVuc0ZhZGVJbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5zdG9wKHRydWUsIHRydWUsIGZhbHNlKS5mYWRlSW4oc2VsZi5vcHRpb25zLmxlbnNGYWRlSW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21MZW5zLnNob3coKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzTGVuc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc0xlbnNBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxlbnNGYWRlT3V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMubGVuc0ZhZGVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21MZW5zLmhpZGUoKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzTGVuc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dIaWRlVGludDogZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmlzVGludEFjdGl2ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVGludEZhZGVJbil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3Moe29wYWNpdHk6c2VsZi5vcHRpb25zLnRpbnRPcGFjaXR5fSkuYW5pbWF0ZSgpLnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZUluKFwic2xvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3Moe29wYWNpdHk6c2VsZi5vcHRpb25zLnRpbnRPcGFjaXR5fSkuYW5pbWF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuc2hvdygpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNUaW50QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzVGludEFjdGl2ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVGludEZhZGVPdXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuc3RvcCh0cnVlLCB0cnVlKS5mYWRlT3V0KHNlbGYub3B0aW9ucy56b29tVGludEZhZGVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21UaW50LmhpZGUoKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzVGludEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExlbnNQb3N0aXRpb246IGZ1bmN0aW9uKCBlICkge1xuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRXaW5kb3dQb3N0aXRpb246IGZ1bmN0aW9uKCBlICkge1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIG9iai5zbGljZSggMCwgY291bnQgKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBpZighaXNOYU4oc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbikpe1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dPZmZldHkpOy8vRE9ORSAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KCtzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0LzIpLShzZWxmLm56SGVpZ2h0LzIpKSooLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXsgLy9uZWdhdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0IC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC0gKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIDMsOVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAvL0RPTkUgLSA0LDUsNiw3LDhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgtc2VsZi56b29tV2luZG93LndpZHRoKCktKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIC0gNSwxNVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7ICAvL0RPTkUgLSA0LDUsNiw3LDhcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoLzIpLShzZWxmLm56V2lkdGgvMikrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXsgLy9uZWdhdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7ICAvL0RPTkUgLSA0LDUsNiw3LDhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9IDA7IC8vRE9ORSA3LCAxM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6ICAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQgLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLSAoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpOyAvL0RPTkUgMyw5XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC8yKS0oc2VsZi5uekhlaWdodC8yKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dPZmZldHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpOyAvL0RPTkUgMTIsMTMsMTQsMTUsMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgwKTsgLy9ET05FIDcsIDEzXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC8yKS0oc2VsZi5ueldpZHRoLzIpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6Ly9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKSooLTEpOyAvL0RPTkUgMTIsMTMsMTQsMTUsMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aC1zZWxmLnpvb21XaW5kb3cud2lkdGgoKS0oc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpOyAvL0RPTkUgLSA1LDE1XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNjogIC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTsvL0RPTkUgLSAxXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAvL2VuZCBpc05BTlxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vV0UgQ0FOIFBPU0lUSU9OIElOIEEgQ0xBU1MgLSBBU1NVTUUgVEhBVCBBTlkgU1RSSU5HIFBBU1NFRCBJU1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyID0gJCgnIycrc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXJXaWR0aCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXIud2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lckhlaWdodCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXJPZmZzZXQgPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLm9mZnNldCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gc2VsZi5leHRlcm5hbENvbnRhaW5lck9mZnNldC50b3A7Ly9ET05FIC0gMVxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPXNlbGYuZXh0ZXJuYWxDb250YWluZXJPZmZzZXQubGVmdDsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5pc1dpbmRvd1NldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSBzZWxmLndpbmRvd09mZnNldFRvcCArIHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5O1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9IHNlbGYud2luZG93T2Zmc2V0TGVmdCArIHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR4O1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IHRvcDogc2VsZi53aW5kb3dPZmZzZXRUb3B9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgbGVmdDogc2VsZi53aW5kb3dPZmZzZXRMZWZ0fSk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyB0b3A6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGxlZnQ6IDB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCkgKiBzZWxmLndpZHRoUmF0aW8gLSBzZWxmLnpvb21XaW5kb3cud2lkdGgoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApICogc2VsZi5oZWlnaHRSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FdG9wcG9zKXtzZWxmLndpbmRvd1RvcFBvcyA9IDA7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7c2VsZi53aW5kb3dMZWZ0UG9zID0gMDt9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtzZWxmLndpbmRvd1RvcFBvcyA9IChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbC1zZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkpKigtMSk7ICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtzZWxmLndpbmRvd0xlZnRQb3MgPSAoKHNlbGYubGFyZ2VXaWR0aC9zZWxmLmN1cnJlbnRab29tTGV2ZWwtc2VsZi56b29tV2luZG93LndpZHRoKCkpKigtMSkpO31cblxuICAgICAgICAgICAgICAgIC8vc3RvcHMgbWljcm8gbW92ZW1lbnRzXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5mdWxsaGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSAwO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gMDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3NldCB0aGUgY3NzIGJhY2tncm91bmQgcG9zaXRpb25cblxuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIgfHwgc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbUxvY2sgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL292ZXJyaWRlcyBmb3IgaW1hZ2VzIG5vdCB6b29tYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi53aWR0aFJhdGlvIDw9IDEpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaGVpZ2h0UmF0aW8gPD0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXJnZUhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VXaWR0aCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSB6b29td2luZG93IGJhY2tncm91bmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5lYXNpbmcpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoc2VsZi5jaGFuZ2Vab29tKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYubG9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgc2VsZi5sb29wID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHBvcyB0byAwIGlmIG5vdCBzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLnhwKXtzZWxmLnhwID0gMDt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi55cCl7c2VsZi55cCA9IDA7fVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBsb29wIG5vdCBhbHJlYWR5IHN0YXJ0ZWQsIHRoZW4gcnVuIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGYubG9vcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2luZyB6ZW5vJ3MgcGFyYWRveFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueHAgKz0gKHNlbGYud2luZG93TGVmdFBvcyAgLSBzZWxmLnhwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueXAgKz0gKHNlbGYud2luZG93VG9wUG9zICAtIHNlbGYueXApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zY3JvbGxpbmdMb2NrKXtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYubG9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwID0gc2VsZi53aW5kb3dMZWZ0UG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi55cCA9IHNlbGYud2luZG93VG9wUG9zXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueHAgPSAoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpICogc2VsZi53aWR0aFJhdGlvIC0gc2VsZi56b29tV2luZG93LndpZHRoKCkgLyAyKSAqICgtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnlwID0gKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAqIHNlbGYuaGVpZ2h0UmF0aW8gLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgaWYoIXNlbGYuYmd4cCl7c2VsZi5iZ3hwID0gc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWU7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuYmd5cCl7c2VsZi5iZ3lwID0gc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlIDt9XG4gICAgICAgICAgICAgICAgIGlmICghc2VsZi5iZ2xvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgc2VsZi5iZ2xvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgIHNlbGYuYmd4cCArPSAoc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWUgIC0gc2VsZi5iZ3hwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmd5cCArPSAoc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlICAtIHNlbGYuYmd5cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuXG4gICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmJneHAgKyAncHggJyArIHNlbGYuYmd5cCArICdweCcgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgfSwgMTYpO1xuXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZFBvc2l0aW9uOiBzZWxmLndpbmRvd0xlZnRQb3MgKyAncHggJyArIHNlbGYud2luZG93VG9wUG9zICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsaW5nTG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb29wID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi54cCArICdweCAnICsgc2VsZi55cCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoKSA8IHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0KXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZFBvc2l0aW9uOiBzZWxmLndpbmRvd0xlZnRQb3MgKyAncHggJyArIHNlbGYud2luZG93VG9wUG9zICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUaW50UG9zaXRpb246IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3MgPSBTdHJpbmcoKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KS0oc2VsZi56b29tTGVucy53aWR0aCgpIC8gMikpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IFN0cmluZygoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgLSBzZWxmLnpvb21MZW5zLmhlaWdodCgpIC8gMikgKiAoLTEpKTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLkV0b3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FbG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zPTA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSAoc2VsZi5uekhlaWdodC1zZWxmLnpvb21MZW5zLmhlaWdodCgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMikpKigtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcyA9ICgoc2VsZi5ueldpZHRoLXNlbGYuem9vbUxlbnMud2lkdGgoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSooLTEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9wcyBtaWNybyBtb3ZlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5mdWxsaGVpZ2h0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5mdWxsd2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zID0gMDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoeydsZWZ0Jzogc2VsZi50aW50cG9zKydweCd9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyh7J3RvcCc6IHNlbGYudGludHBvc3krJ3B4J30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN3YXB0aGVpbWFnZTogZnVuY3Rpb24oc21hbGxpbWFnZSwgbGFyZ2VpbWFnZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sb2FkaW5nSWNvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3Bpbm5lciA9ICQoJzxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiB1cmwoXFwnJytzZWxmLm9wdGlvbnMubG9hZGluZ0ljb24rJ1xcJykgbm8tcmVwZWF0IGNlbnRlcjtoZWlnaHQ6JytzZWxmLm56SGVpZ2h0KydweDt3aWR0aDonK3NlbGYubnpXaWR0aCsncHg7ei1pbmRleDogMjAwMDtwb3NpdGlvbjogYWJzb2x1dGU7IGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYWZ0ZXIoc2VsZi5zcGlubmVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMub25JbWFnZVN3YXAoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICBuZXdJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VXaWR0aCA9IG5ld0ltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXJnZUhlaWdodCA9IG5ld0ltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUltYWdlID0gbGFyZ2VpbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQgKyAncHgnIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zd2FwQWN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBsYXJnZWltYWdlOyAvLyB0aGlzIG11c3QgYmUgZG9uZSBBRlRFUiBzZXR0aW5nIG9ubG9hZFxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3dhcEFjdGlvbjogZnVuY3Rpb24oc21hbGxpbWFnZSwgbGFyZ2VpbWFnZSl7XG5cblxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciBuZXdJbWcyID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nMi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9yZS1jYWxjdWxhdGUgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBuZXdJbWcyLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gbmV3SW1nMi53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9uSW1hZ2VTd2FwQ29tcGxldGUoc2VsZi4kZWxlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kb25lQ2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbWcyLnNyYyA9IHNtYWxsaW1hZ2U7XG5cbiAgICAgICAgICAgICAgICAvL3Jlc2V0IHRoZSB6b29tbGV2ZWwgdG8gdGhhdCBpbml0aWFsbHkgc2V0IGluIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuem9vbUxldmVsO1xuICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5tYXhab29tTGV2ZWwgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vc3dhcHMgdGhlIG1haW4gaW1hZ2VcbiAgICAgICAgICAgICAgICAvL3NlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpO1xuICAgICAgICAgICAgICAgIC8vc3dhcHMgdGhlIHpvb20gaW1hZ2VcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIGxhcmdlaW1hZ2UgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIGxhcmdlaW1hZ2UgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgbGFyZ2VpbWFnZSArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50SW1hZ2UgPSBsYXJnZWltYWdlO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZEltZyA9IHNlbGYuJGVsZW07XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdJbWcgPSBvbGRJbWcuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIsc21hbGxpbWFnZSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5hZnRlcihuZXdJbWcpO1xuICAgICAgICAgICAgICAgICAgICBuZXdJbWcuc3RvcCh0cnVlKS5mYWRlT3V0KHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBcdFx0XHRcdGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSBhbnkgYXR0cmlidXRlcyBvbiB0aGUgY2xvbmVkIGltYWdlIHNvIHdlIGNhbiByZXNpemUgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS53aWR0aChcImF1dG9cIikucmVtb3ZlQXR0cihcIndpZHRoXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmhlaWdodChcImF1dG9cIikucmVtb3ZlQXR0cihcImhlaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICB9XG5cbiAgICAgICAgICAgICAgICAgICAgb2xkSW1nLmZhZGVJbihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9sZEltZ1RpbnQgPSBzZWxmLnpvb21UaW50SW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW1nVGludCA9IG9sZEltZ1RpbnQuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwic3JjXCIsbGFyZ2VpbWFnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hZnRlcihuZXdJbWdUaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0ltZ1RpbnQuc3RvcCh0cnVlKS5mYWRlT3V0KHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkSW1nVGludC5mYWRlSW4oc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwid2lkdGhcIixlbGVtLmRhdGEoXCJpbWFnZVwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzaXplIHRoZSB0aW50IHdpbmRvd1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBoZWlnaHQ6IHNlbGYuJGVsZW0uaGVpZ2h0KCl9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgd2lkdGg6IHNlbGYuJGVsZW0ud2lkdGgoKX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIsc21hbGxpbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcInNyY1wiLGxhcmdlaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcIndpZHRoXCIsZWxlbS5kYXRhKFwiaW1hZ2VcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJoZWlnaHRcIixzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b29tVGludEltYWdlLmF0dHIoJ3NyYycpID0gZWxlbS5kYXRhKFwiaW1hZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKHsgaGVpZ2h0OiBzZWxmLiRlbGVtLmhlaWdodCgpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IGhlaWdodDogc2VsZi4kZWxlbS5oZWlnaHQoKX0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlKXtcblxuICAgICAgICAgICAgICAgICAgICAvL1RoaXMgd2lsbCBjb250cmFpbiB0aGUgaW1hZ2UgcHJvcG9ydGlvbnNcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUgPT0gXCJoZWlnaHRcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIFwiYXV0b1wiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdHdpZHRoID0gc2VsZi56b29tV3JhcC53aWR0aCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwid2lkdGhcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3R3aWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcIndpZHRoXCIsIHNlbGYuY29uc3R3aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcIndpZHRoXCIsIHNlbGYuY29uc3R3aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSA9PSBcIndpZHRoXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0aGVpZ2h0ID0gc2VsZi56b29tV3JhcC5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3RoZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50Q29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb25lQ2FsbGJhY2s6IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxvYWRpbmdJY29uKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zcGlubmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyByZXNldCB0aGUgem9vbWxldmVsIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy56b29tTGV2ZWw7XG5cbiAgICAgICAgICAgICAgICAvL3JhdGlvIG9mIHRoZSBsYXJnZSB0byBzbWFsbCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IHNlbGYubGFyZ2VXaWR0aCAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gc2VsZi5sYXJnZUhlaWdodCAvIHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAvL05FRUQgVE8gQUREIFRIRSBMRU5TIFNJWkUgRk9SIFJPVU5EXG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IGltYWdlcyBsZXNzIHRoYW4gdGhlIHdpbmRvdyBoZWlnaHRcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbUxlbnMpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnd2lkdGgnLCBsZW5zV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ2hlaWdodCcsIGxlbnNIZWlnaHQpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDdXJyZW50SW1hZ2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnpvb21JbWFnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRHYWxsZXJ5TGlzdDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLy9sb29wIHRocm91Z2ggdGhlIGdhbGxlcnkgb3B0aW9ucyBhbmQgc2V0IHRoZW0gaW4gbGlzdCBmb3IgZmFuY3lib3hcbiAgICAgICAgICAgICAgICBzZWxmLmdhbGxlcnlsaXN0ID0gW107XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5nYWxsZXJ5KXtcblxuXG4gICAgICAgICAgICAgICAgICAgICQoJyMnK3NlbGYub3B0aW9ucy5nYWxsZXJ5ICsgJyBhJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZ19zcmMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykuZGF0YShcInpvb20taW1hZ2VcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ19zcmMgPSAkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZigkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nX3NyYyA9ICQodGhpcykuZGF0YShcImltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wdXQgdGhlIGN1cnJlbnQgaW1hZ2UgYXQgdGhlIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbWdfc3JjID09IHNlbGYuem9vbUltYWdlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbGxlcnlsaXN0LnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAnJytpbWdfc3JjKycnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKFwidGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycraW1nX3NyYysnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9pZiBubyBnYWxsZXJ5IC0gcmV0dXJuIGN1cnJlbnQgaW1hZ2VcbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbGxlcnlsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycrc2VsZi56b29tSW1hZ2UrJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJCh0aGlzKS5maW5kKCdpbWcnKS5hdHRyKFwidGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmdhbGxlcnlsaXN0O1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlWm9vbUxldmVsOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgLy9mbGFnIGEgem9vbSwgc28gY2FuIGFkanVzdCB0aGUgZWFzaW5nIGR1cmluZyBzZXRQb3NpdGlvblxuICAgICAgICAgICAgICAgIHNlbGYuc2Nyb2xsaW5nTG9jayA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvL3JvdW5kIHRvIHR3byBkZWNpbWFsIHBsYWNlc1xuICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgIG5ld3ZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcblxuXG5cblxuICAgICAgICAgICAgICAgIC8vbWF4d2lkdGggJiBNYXhoZWlnaHQgb2YgdGhlIGltYWdlXG4gICAgICAgICAgICAgICAgbWF4aGVpZ2h0bmV3dmFsdWUgPSBzZWxmLmxhcmdlSGVpZ2h0Lygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgLyBzZWxmLm56SGVpZ2h0KSAqIHNlbGYubnpIZWlnaHQpO1xuICAgICAgICAgICAgICAgIG1heHdpZHRodG5ld3ZhbHVlID0gc2VsZi5sYXJnZVdpZHRoLygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCAvIHNlbGYubnpXaWR0aCkgKiBzZWxmLm56V2lkdGgpO1xuXG5cblxuXG4gICAgICAgICAgICAgICAgLy9jYWxjdWxhdGUgbmV3IGhlaWdodHJhdGlvXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1heGhlaWdodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9tYXhoZWlnaHRuZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4vL1x0XHRcdFx0XHRjYWxjdWxhdGUgbmV3IHdpZHRoIHJhdGlvXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4d2lkdGh0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9tYXh3aWR0aHRuZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBtYXh3aWR0aHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtYXhoZWlnaHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbmV3dmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1heGhlaWdodG5ld3ZhbHVlID0gcGFyc2VGbG9hdChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubnpIZWlnaHQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgICAgIG1heHdpZHRodG5ld3ZhbHVlID0gcGFyc2VGbG9hdChzZWxmLmxhcmdlV2lkdGgvc2VsZi5ueldpZHRoKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heGhlaWdodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3ZhbHVlID0gbWF4aGVpZ2h0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXh3aWR0aHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IG1heHdpZHRodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZihtYXhoZWlnaHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L25ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heGhlaWdodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbWF4aGVpZ2h0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L25ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4aGVpZ2h0bmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICAgICAgICAgICAgICBpZihtYXh3aWR0aHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXh3aWR0aHRuZXd2YWx1ZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBtYXh3aWR0aHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0gLy9lbmQgaW5uZXJcbiAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5ueldpZHRoID4gc2VsZi5uekhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5uZXd2YWx1ZXdpZHRoIDw9IG1heHdpZHRodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0ID4gc2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBzZWxmLm5ld3ZhbHVld2lkdGggPD0gbWF4d2lkdGh0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzY3Jjb250aW51ZSl7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxvY2sgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb20gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVucyBoZWlnaHQgaXMgbGVzcyB0aGFuIGltYWdlIGhlaWdodFxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCkvc2VsZi5oZWlnaHRSYXRpbykgPD0gc2VsZi5uekhlaWdodCl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5uZXd2YWx1ZWhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIiAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3Moe2hlaWdodDogU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCkvc2VsZi5oZWlnaHRSYXRpbykgKyAncHgnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIgfHwgc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICAgICAgICAgICAgICBpZigoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pIDw9IHNlbGYubnpXaWR0aCl7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm5ld3ZhbHVld2lkdGggPiBzZWxmLm5ld3ZhbHVlaGVpZ2h0KSAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5uZXd2YWx1ZXdpZHRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHt3aWR0aDogU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKS9zZWxmLndpZHRoUmF0aW8pICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5ueldpZHRoID4gc2VsZi5uekhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5uZXd2YWx1ZXdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA+IHNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5uZXd2YWx1ZXdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9ICAgICAgLy91bmRlclxuXG4gICAgICAgICAgICAgICAgLy9zZXRzIHRoZSBib3VuZHJ5IGNoYW5nZSwgY2FsbGVkIGluIHNldFdpbmRvd1Bvc1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24oc2VsZi5jdXJyZW50TG9jKTtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbVdpbmRvdyl7c2VsZi56b29tV2luZG93LmhpZGUoKTt9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi56b29tTGVucyl7c2VsZi56b29tTGVucy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbVRpbnQpe3NlbGYuem9vbVRpbnQuaGlkZSgpO31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PSAnZW5hYmxlJyl7c2VsZi5vcHRpb25zLnpvb21FbmFibGVkID0gdHJ1ZTt9XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ2Rpc2FibGUnKXtzZWxmLm9wdGlvbnMuem9vbUVuYWJsZWQgPSBmYWxzZTt9XG5cbiAgICAgICAgICAgIH1cblxuICAgIH07XG5cblxuXG5cbiAgICAkLmZuLmVsZXZhdGVab29tID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxldmF0ZSA9IE9iamVjdC5jcmVhdGUoIEVsZXZhdGVab29tICk7XG5cbiAgICAgICAgICAgIGVsZXZhdGUuaW5pdCggb3B0aW9ucywgdGhpcyApO1xuXG4gICAgICAgICAgICAkLmRhdGEoIHRoaXMsICdlbGV2YXRlWm9vbScsIGVsZXZhdGUgKTtcblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJC5mbi5lbGV2YXRlWm9vbS5vcHRpb25zID0ge1xuICAgICAgICAgICAgem9vbUFjdGl2YXRpb246IFwiaG92ZXJcIiwgLy8gQ2FuIGFsc28gYmUgY2xpY2sgKFBMQUNFSE9MREVSIEZPUiBORVhUIFZFUlNJT04pXG4gICAgICB6b29tRW5hYmxlZDogdHJ1ZSwgLy9mYWxzZSBkaXNhYmxlcyB6b29td2luZG93IGZyb20gc2hvd2luZ1xuICAgICAgICAgICAgcHJlbG9hZGluZzogMSwgLy9ieSBkZWZhdWx0LCBsb2FkIGFsbCB0aGUgaW1hZ2VzLCBpZiAwLCB0aGVuIG9ubHkgbG9hZCBpbWFnZXMgYWZ0ZXIgYWN0aXZhdGVkIChQTEFDRUhPTERFUiBGT1IgTkVYVCBWRVJTSU9OKVxuICAgICAgICAgICAgem9vbUxldmVsOiAxLCAvL2RlZmF1bHQgem9vbSBsZXZlbCBvZiBpbWFnZVxuICAgICAgICAgICAgc2Nyb2xsWm9vbTogZmFsc2UsIC8vYWxsb3cgem9vbSBvbiBtb3VzZXdoZWVsLCB0cnVlIHRvIGFjdGl2YXRlXG4gICAgICAgICAgICBzY3JvbGxab29tSW5jcmVtZW50OiAwLjEsICAvL3N0ZXBzIG9mIHRoZSBzY3JvbGx6b29tXG4gICAgICAgICAgICBtaW5ab29tTGV2ZWw6IGZhbHNlLFxuICAgICAgICAgICAgbWF4Wm9vbUxldmVsOiBmYWxzZSxcbiAgICAgICAgICAgIGVhc2luZzogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmdBbW91bnQ6IDEyLFxuICAgICAgICAgICAgbGVuc1NpemU6IDIwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dXaWR0aDogNDAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd0hlaWdodDogNDAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd09mZmV0eDogMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dPZmZldHk6IDAsXG4gICAgICAgICAgICB6b29tV2luZG93UG9zaXRpb246IDEsXG4gICAgICAgICAgICB6b29tV2luZG93QmdDb2xvdXI6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgbGVuc0ZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICBsZW5zRmFkZU91dDogZmFsc2UsXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93RmFkZUluOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21XaW5kb3dGYWRlT3V0OiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21XaW5kb3dBbHdheXNTaG93OiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21UaW50RmFkZUluOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21UaW50RmFkZU91dDogZmFsc2UsXG4gICAgICAgICAgICBib3JkZXJTaXplOiA0LFxuICAgICAgICAgICAgc2hvd0xlbnM6IHRydWUsXG4gICAgICAgICAgICBib3JkZXJDb2xvdXI6IFwiIzg4OFwiLFxuICAgICAgICAgICAgbGVuc0JvcmRlclNpemU6IDEsXG4gICAgICAgICAgICBsZW5zQm9yZGVyQ29sb3VyOiBcIiMwMDBcIixcbiAgICAgICAgICAgIGxlbnNTaGFwZTogXCJzcXVhcmVcIiwgLy9jYW4gYmUgXCJyb3VuZFwiXG4gICAgICAgICAgICB6b29tVHlwZTogXCJ3aW5kb3dcIiwgLy93aW5kb3cgaXMgZGVmYXVsdCwgIGFsc28gXCJsZW5zXCIgYXZhaWxhYmxlIC1cbiAgICAgICAgICAgIGNvbnRhaW5MZW5zWm9vbTogZmFsc2UsXG4gICAgICAgICAgICBsZW5zQ29sb3VyOiBcIndoaXRlXCIsIC8vY29sb3VyIG9mIHRoZSBsZW5zIGJhY2tncm91bmRcbiAgICAgICAgICAgIGxlbnNPcGFjaXR5OiAwLjQsIC8vb3BhY2l0eSBvZiB0aGUgbGVuc1xuICAgICAgICAgICAgbGVuc3pvb206IGZhbHNlLFxuICAgICAgICAgICAgdGludDogZmFsc2UsIC8vZW5hYmxlIHRoZSB0aW50aW5nXG4gICAgICAgICAgICB0aW50Q29sb3VyOiBcIiMzMzNcIiwgLy9kZWZhdWx0IHRpbnQgY29sb3IsIGNhbiBiZSBhbnl0aGluZywgcmVkLCAjY2NjLCByZ2IoMCwwLDApXG4gICAgICAgICAgICB0aW50T3BhY2l0eTogMC40LCAvL29wYWNpdHkgb2YgdGhlIHRpbnRcbiAgICAgICAgICAgIGdhbGxlcnk6IGZhbHNlLFxuICAgICAgICAgICAgZ2FsbGVyeUFjdGl2ZUNsYXNzOiBcInpvb21HYWxsZXJ5QWN0aXZlXCIsXG4gICAgICAgICAgICBpbWFnZUNyb3NzZmFkZTogZmFsc2UsXG4gICAgICAgICAgICBjb25zdHJhaW5UeXBlOiBmYWxzZSwgIC8vd2lkdGggb3IgaGVpZ2h0XG4gICAgICAgICAgICBjb25zdHJhaW5TaXplOiBmYWxzZSwgIC8vaW4gcGl4ZWxzIHRoZSBkaW1lbnNpb25zIHlvdSB3YW50IHRvIGNvbnN0cmFpbiBvblxuICAgICAgICAgICAgbG9hZGluZ0ljb246IGZhbHNlLCAvL2h0dHA6Ly93d3cuZXhhbXBsZS5jb20vc3Bpbm5lci5naWZcbiAgICAgICAgICAgIGN1cnNvcjpcImRlZmF1bHRcIiwgLy8gdXNlciBzaG91bGQgc2V0IHRvIHdoYXQgdGhleSB3YW50IHRoZSBjdXJzb3IgYXMsIGlmIHRoZXkgaGF2ZSBzZXQgYSBjbGljayBmdW5jdGlvblxuICAgICAgICAgICAgcmVzcG9uc2l2ZTp0cnVlLFxuICAgICAgICAgICAgb25Db21wbGV0ZTogJC5ub29wLFxuICAgICAgICAgICAgb25ab29tZWRJbWFnZUxvYWRlZDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgIG9uSW1hZ2VTd2FwOiAkLm5vb3AsXG4gICAgICAgICAgICBvbkltYWdlU3dhcENvbXBsZXRlOiAkLm5vb3BcbiAgICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7XG4iLCI7KGZ1bmN0aW9uKCQpIHtcblxuICB2YXIgZGVmYXVsdHMgPSB7XG5cbiAgICAvLyBHRU5FUkFMXG4gICAgbW9kZTogJ2hvcml6b250YWwnLFxuICAgIHNsaWRlU2VsZWN0b3I6ICcnLFxuICAgIGluZmluaXRlTG9vcDogdHJ1ZSxcbiAgICBoaWRlQ29udHJvbE9uRW5kOiBmYWxzZSxcbiAgICBzcGVlZDogNTAwLFxuICAgIGVhc2luZzogbnVsbCxcbiAgICBzbGlkZU1hcmdpbjogMCxcbiAgICBzdGFydFNsaWRlOiAwLFxuICAgIHJhbmRvbVN0YXJ0OiBmYWxzZSxcbiAgICBjYXB0aW9uczogZmFsc2UsXG4gICAgdGlja2VyOiBmYWxzZSxcbiAgICB0aWNrZXJIb3ZlcjogZmFsc2UsXG4gICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgIGFkYXB0aXZlSGVpZ2h0U3BlZWQ6IDUwMCxcbiAgICB2aWRlbzogZmFsc2UsXG4gICAgdXNlQ1NTOiB0cnVlLFxuICAgIHByZWxvYWRJbWFnZXM6ICd2aXNpYmxlJyxcbiAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgIHNsaWRlWkluZGV4OiA1MCxcbiAgICB3cmFwcGVyQ2xhc3M6ICdieC13cmFwcGVyJyxcblxuICAgIC8vIFRPVUNIXG4gICAgdG91Y2hFbmFibGVkOiB0cnVlLFxuICAgIHN3aXBlVGhyZXNob2xkOiA1MCxcbiAgICBvbmVUb09uZVRvdWNoOiB0cnVlLFxuICAgIHByZXZlbnREZWZhdWx0U3dpcGVYOiB0cnVlLFxuICAgIHByZXZlbnREZWZhdWx0U3dpcGVZOiBmYWxzZSxcblxuICAgIC8vIEFDQ0VTU0lCSUxJVFlcbiAgICBhcmlhTGl2ZTogdHJ1ZSxcbiAgICBhcmlhSGlkZGVuOiB0cnVlLFxuXG4gICAgLy8gS0VZQk9BUkRcbiAgICBrZXlib2FyZEVuYWJsZWQ6IGZhbHNlLFxuXG4gICAgLy8gUEFHRVJcbiAgICBwYWdlcjogdHJ1ZSxcbiAgICBwYWdlclR5cGU6ICdmdWxsJyxcbiAgICBwYWdlclNob3J0U2VwYXJhdG9yOiAnIC8gJyxcbiAgICBwYWdlclNlbGVjdG9yOiBudWxsLFxuICAgIGJ1aWxkUGFnZXI6IG51bGwsXG4gICAgcGFnZXJDdXN0b206IG51bGwsXG5cbiAgICAvLyBDT05UUk9MU1xuICAgIGNvbnRyb2xzOiB0cnVlLFxuICAgIG5leHRUZXh0OiAnTmV4dCcsXG4gICAgcHJldlRleHQ6ICdQcmV2JyxcbiAgICBuZXh0U2VsZWN0b3I6IG51bGwsXG4gICAgcHJldlNlbGVjdG9yOiBudWxsLFxuICAgIGF1dG9Db250cm9sczogZmFsc2UsXG4gICAgc3RhcnRUZXh0OiAnU3RhcnQnLFxuICAgIHN0b3BUZXh0OiAnU3RvcCcsXG4gICAgYXV0b0NvbnRyb2xzQ29tYmluZTogZmFsc2UsXG4gICAgYXV0b0NvbnRyb2xzU2VsZWN0b3I6IG51bGwsXG5cbiAgICAvLyBBVVRPXG4gICAgYXV0bzogZmFsc2UsXG4gICAgcGF1c2U6IDQwMDAsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGF1dG9EaXJlY3Rpb246ICduZXh0JyxcbiAgICBzdG9wQXV0b09uQ2xpY2s6IGZhbHNlLFxuICAgIGF1dG9Ib3ZlcjogZmFsc2UsXG4gICAgYXV0b0RlbGF5OiAwLFxuICAgIGF1dG9TbGlkZUZvck9uZVBhZ2U6IGZhbHNlLFxuXG4gICAgLy8gQ0FST1VTRUxcbiAgICBtaW5TbGlkZXM6IDEsXG4gICAgbWF4U2xpZGVzOiAxLFxuICAgIG1vdmVTbGlkZXM6IDAsXG4gICAgc2xpZGVXaWR0aDogMCxcbiAgICBzaHJpbmtJdGVtczogZmFsc2UsXG5cbiAgICAvLyBDQUxMQkFDS1NcbiAgICBvblNsaWRlckxvYWQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICBvblNsaWRlQmVmb3JlOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgb25TbGlkZUFmdGVyOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgb25TbGlkZU5leHQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICBvblNsaWRlUHJldjogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9LFxuICAgIG9uU2xpZGVyUmVzaXplOiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH1cbiAgfTtcblxuICAkLmZuLmJ4U2xpZGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IG11bHRpcGxlIGVsZW1lbnRzXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmJ4U2xpZGVyKG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgYSBuYW1lc3BhY2UgdG8gYmUgdXNlZCB0aHJvdWdob3V0IHRoZSBwbHVnaW5cbiAgICB2YXIgc2xpZGVyID0ge30sXG4gICAgLy8gc2V0IGEgcmVmZXJlbmNlIHRvIG91ciBzbGlkZXIgZWxlbWVudFxuICAgIGVsID0gdGhpcyxcbiAgICAvLyBnZXQgdGhlIG9yaWdpbmFsIHdpbmRvdyBkaW1lbnMgKHRoYW5rcyBhIGxvdCBJRSlcbiAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxuICAgIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuICAgIC8vIFJldHVybiBpZiBzbGlkZXIgaXMgYWxyZWFkeSBpbml0aWFsaXplZFxuICAgIGlmICgkKGVsKS5kYXRhKCdieFNsaWRlcicpKSB7IHJldHVybjsgfVxuXG4gICAgLyoqXG4gICAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgKiA9IFBSSVZBVEUgRlVOQ1RJT05TXG4gICAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIG5hbWVzcGFjZSBzZXR0aW5ncyB0byBiZSB1c2VkIHRocm91Z2hvdXQgcGx1Z2luXG4gICAgICovXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIFJldHVybiBpZiBzbGlkZXIgaXMgYWxyZWFkeSBpbml0aWFsaXplZFxuICAgICAgaWYgKCQoZWwpLmRhdGEoJ2J4U2xpZGVyJykpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBtZXJnZSB1c2VyLXN1cHBsaWVkIG9wdGlvbnMgd2l0aCB0aGUgZGVmYXVsdHNcbiAgICAgIHNsaWRlci5zZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAvLyBwYXJzZSBzbGlkZVdpZHRoIHNldHRpbmdcbiAgICAgIHNsaWRlci5zZXR0aW5ncy5zbGlkZVdpZHRoID0gcGFyc2VJbnQoc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGgpO1xuICAgICAgLy8gc3RvcmUgdGhlIG9yaWdpbmFsIGNoaWxkcmVuXG4gICAgICBzbGlkZXIuY2hpbGRyZW4gPSBlbC5jaGlsZHJlbihzbGlkZXIuc2V0dGluZ3Muc2xpZGVTZWxlY3Rvcik7XG4gICAgICAvLyBjaGVjayBpZiBhY3R1YWwgbnVtYmVyIG9mIHNsaWRlcyBpcyBsZXNzIHRoYW4gbWluU2xpZGVzIC8gbWF4U2xpZGVzXG4gICAgICBpZiAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCA8IHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMpIHsgc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcyA9IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IH1cbiAgICAgIGlmIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIDwgc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcykgeyBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgfVxuICAgICAgLy8gaWYgcmFuZG9tIHN0YXJ0LCBzZXQgdGhlIHN0YXJ0U2xpZGUgc2V0dGluZyB0byByYW5kb20gbnVtYmVyXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnJhbmRvbVN0YXJ0KSB7IHNsaWRlci5zZXR0aW5ncy5zdGFydFNsaWRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCk7IH1cbiAgICAgIC8vIHN0b3JlIGFjdGl2ZSBzbGlkZSBpbmZvcm1hdGlvblxuICAgICAgc2xpZGVyLmFjdGl2ZSA9IHsgaW5kZXg6IHNsaWRlci5zZXR0aW5ncy5zdGFydFNsaWRlIH07XG4gICAgICAvLyBzdG9yZSBpZiB0aGUgc2xpZGVyIGlzIGluIGNhcm91c2VsIG1vZGUgKGRpc3BsYXlpbmcgLyBtb3ZpbmcgbXVsdGlwbGUgc2xpZGVzKVxuICAgICAgc2xpZGVyLmNhcm91c2VsID0gc2xpZGVyLnNldHRpbmdzLm1pblNsaWRlcyA+IDEgfHwgc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyA+IDEgPyB0cnVlIDogZmFsc2U7XG4gICAgICAvLyBpZiBjYXJvdXNlbCwgZm9yY2UgcHJlbG9hZEltYWdlcyA9ICdhbGwnXG4gICAgICBpZiAoc2xpZGVyLmNhcm91c2VsKSB7IHNsaWRlci5zZXR0aW5ncy5wcmVsb2FkSW1hZ2VzID0gJ2FsbCc7IH1cbiAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbWluIC8gbWF4IHdpZHRoIHRocmVzaG9sZHMgYmFzZWQgb24gbWluIC8gbWF4IG51bWJlciBvZiBzbGlkZXNcbiAgICAgIC8vIHVzZWQgdG8gc2V0dXAgYW5kIHVwZGF0ZSBjYXJvdXNlbCBzbGlkZXMgZGltZW5zaW9uc1xuICAgICAgc2xpZGVyLm1pblRocmVzaG9sZCA9IChzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzICogc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGgpICsgKChzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzIC0gMSkgKiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgc2xpZGVyLm1heFRocmVzaG9sZCA9IChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzICogc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGgpICsgKChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzIC0gMSkgKiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgLy8gc3RvcmUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNsaWRlciAoaWYgY3VycmVudGx5IGFuaW1hdGluZywgd29ya2luZyBpcyB0cnVlKVxuICAgICAgc2xpZGVyLndvcmtpbmcgPSBmYWxzZTtcbiAgICAgIC8vIGluaXRpYWxpemUgdGhlIGNvbnRyb2xzIG9iamVjdFxuICAgICAgc2xpZGVyLmNvbnRyb2xzID0ge307XG4gICAgICAvLyBpbml0aWFsaXplIGFuIGF1dG8gaW50ZXJ2YWxcbiAgICAgIHNsaWRlci5pbnRlcnZhbCA9IG51bGw7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggcHJvcGVydHkgdG8gdXNlIGZvciB0cmFuc2l0aW9uc1xuICAgICAgc2xpZGVyLmFuaW1Qcm9wID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcgPyAndG9wJyA6ICdsZWZ0JztcbiAgICAgIC8vIGRldGVybWluZSBpZiBoYXJkd2FyZSBhY2NlbGVyYXRpb24gY2FuIGJlIHVzZWRcbiAgICAgIHNsaWRlci51c2luZ0NTUyA9IHNsaWRlci5zZXR0aW5ncy51c2VDU1MgJiYgc2xpZGVyLnNldHRpbmdzLm1vZGUgIT09ICdmYWRlJyAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgdGVzdCBkaXYgZWxlbWVudFxuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIC8vIGNzcyB0cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAgICAgICAgcHJvcHMgPSBbJ1dlYmtpdFBlcnNwZWN0aXZlJywgJ01velBlcnNwZWN0aXZlJywgJ09QZXJzcGVjdGl2ZScsICdtc1BlcnNwZWN0aXZlJ107XG4gICAgICAgIC8vIHRlc3QgZm9yIGVhY2ggcHJvcGVydHlcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChkaXYuc3R5bGVbcHJvcHNbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNsaWRlci5jc3NQcmVmaXggPSBwcm9wc1tpXS5yZXBsYWNlKCdQZXJzcGVjdGl2ZScsICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgc2xpZGVyLmFuaW1Qcm9wID0gJy0nICsgc2xpZGVyLmNzc1ByZWZpeCArICctdHJhbnNmb3JtJztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KCkpO1xuICAgICAgLy8gaWYgdmVydGljYWwgbW9kZSBhbHdheXMgbWFrZSBtYXhTbGlkZXMgYW5kIG1pblNsaWRlcyBlcXVhbFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7IHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMgPSBzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzOyB9XG4gICAgICAvLyBzYXZlIG9yaWdpbmFsIHN0eWxlIGRhdGFcbiAgICAgIGVsLmRhdGEoJ29yaWdTdHlsZScsIGVsLmF0dHIoJ3N0eWxlJykpO1xuICAgICAgZWwuY2hpbGRyZW4oc2xpZGVyLnNldHRpbmdzLnNsaWRlU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZGF0YSgnb3JpZ1N0eWxlJywgJCh0aGlzKS5hdHRyKCdzdHlsZScpKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBwZXJmb3JtIGFsbCBET00gLyBDU1MgbW9kaWZpY2F0aW9uc1xuICAgICAgc2V0dXAoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYWxsIERPTSBhbmQgQ1NTIG1vZGlmaWNhdGlvbnNcbiAgICAgKi9cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwcmVsb2FkU2VsZWN0b3IgPSBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUpOyAvLyBzZXQgdGhlIGRlZmF1bHQgcHJlbG9hZCBzZWxlY3RvciAodmlzaWJsZSlcblxuICAgICAgLy8gd3JhcCBlbCBpbiBhIHdyYXBwZXJcbiAgICAgIGVsLndyYXAoJzxkaXYgY2xhc3M9XCInICsgc2xpZGVyLnNldHRpbmdzLndyYXBwZXJDbGFzcyArICdcIj48ZGl2IGNsYXNzPVwiYngtdmlld3BvcnRcIj48L2Rpdj48L2Rpdj4nKTtcbiAgICAgIC8vIHN0b3JlIGEgbmFtZXNwYWNlIHJlZmVyZW5jZSB0byAuYngtdmlld3BvcnRcbiAgICAgIHNsaWRlci52aWV3cG9ydCA9IGVsLnBhcmVudCgpO1xuXG4gICAgICAvLyBhZGQgYXJpYS1saXZlIGlmIHRoZSBzZXR0aW5nIGlzIGVuYWJsZWQgYW5kIHRpY2tlciBtb2RlIGlzIGRpc2FibGVkXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFyaWFMaXZlICYmICFzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7XG4gICAgICAgIHNsaWRlci52aWV3cG9ydC5hdHRyKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG4gICAgICB9XG4gICAgICAvLyBhZGQgYSBsb2FkaW5nIGRpdiB0byBkaXNwbGF5IHdoaWxlIGltYWdlcyBhcmUgbG9hZGluZ1xuICAgICAgc2xpZGVyLmxvYWRlciA9ICQoJzxkaXYgY2xhc3M9XCJieC1sb2FkaW5nXCIgLz4nKTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC5wcmVwZW5kKHNsaWRlci5sb2FkZXIpO1xuICAgICAgLy8gc2V0IGVsIHRvIGEgbWFzc2l2ZSB3aWR0aCwgdG8gaG9sZCBhbnkgbmVlZGVkIHNsaWRlc1xuICAgICAgLy8gYWxzbyBzdHJpcCBhbnkgbWFyZ2luIGFuZCBwYWRkaW5nIGZyb20gZWxcbiAgICAgIGVsLmNzcyh7XG4gICAgICAgIHdpZHRoOiBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggKiAxMDAwICsgMjE1KSArICclJyA6ICdhdXRvJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgIH0pO1xuICAgICAgLy8gaWYgdXNpbmcgQ1NTLCBhZGQgdGhlIGVhc2luZyBwcm9wZXJ0eVxuICAgICAgaWYgKHNsaWRlci51c2luZ0NTUyAmJiBzbGlkZXIuc2V0dGluZ3MuZWFzaW5nKSB7XG4gICAgICAgIGVsLmNzcygnLScgKyBzbGlkZXIuY3NzUHJlZml4ICsgJy10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbicsIHNsaWRlci5zZXR0aW5ncy5lYXNpbmcpO1xuICAgICAgLy8gaWYgbm90IHVzaW5nIENTUyBhbmQgbm8gZWFzaW5nIHZhbHVlIHdhcyBzdXBwbGllZCwgdXNlIHRoZSBkZWZhdWx0IEpTIGFuaW1hdGlvbiBlYXNpbmcgKHN3aW5nKVxuICAgICAgfSBlbHNlIGlmICghc2xpZGVyLnNldHRpbmdzLmVhc2luZykge1xuICAgICAgICBzbGlkZXIuc2V0dGluZ3MuZWFzaW5nID0gJ3N3aW5nJztcbiAgICAgIH1cbiAgICAgIC8vIG1ha2UgbW9kaWZpY2F0aW9ucyB0byB0aGUgdmlld3BvcnQgKC5ieC12aWV3cG9ydClcbiAgICAgIHNsaWRlci52aWV3cG9ydC5jc3Moe1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICB9KTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC5wYXJlbnQoKS5jc3Moe1xuICAgICAgICBtYXhXaWR0aDogZ2V0Vmlld3BvcnRNYXhXaWR0aCgpXG4gICAgICB9KTtcbiAgICAgIC8vIG1ha2UgbW9kaWZpY2F0aW9uIHRvIHRoZSB3cmFwcGVyICguYngtd3JhcHBlcilcbiAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLnBhZ2VyICYmICFzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMpIHtcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LnBhcmVudCgpLmNzcyh7XG4gICAgICAgICAgbWFyZ2luOiAnMCBhdXRvIDBweCdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBhcHBseSBjc3MgdG8gYWxsIHNsaWRlciBjaGlsZHJlblxuICAgICAgc2xpZGVyLmNoaWxkcmVuLmNzcyh7XG4gICAgICAgIGZsb2F0OiBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gJ2xlZnQnIDogJ25vbmUnLFxuICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgIH0pO1xuICAgICAgLy8gYXBwbHkgdGhlIGNhbGN1bGF0ZWQgd2lkdGggYWZ0ZXIgdGhlIGZsb2F0IGlzIGFwcGxpZWQgdG8gcHJldmVudCBzY3JvbGxiYXIgaW50ZXJmZXJlbmNlXG4gICAgICBzbGlkZXIuY2hpbGRyZW4uY3NzKCd3aWR0aCcsIGdldFNsaWRlV2lkdGgoKSk7XG4gICAgICAvLyBpZiBzbGlkZU1hcmdpbiBpcyBzdXBwbGllZCwgYWRkIHRoZSBjc3NcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnICYmIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbiA+IDApIHsgc2xpZGVyLmNoaWxkcmVuLmNzcygnbWFyZ2luUmlnaHQnLCBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pOyB9XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcgJiYgc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luID4gMCkgeyBzbGlkZXIuY2hpbGRyZW4uY3NzKCdtYXJnaW5Cb3R0b20nLCBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pOyB9XG4gICAgICAvLyBpZiBcImZhZGVcIiBtb2RlLCBhZGQgcG9zaXRpb25pbmcgYW5kIHotaW5kZXggQ1NTXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICBzbGlkZXIuY2hpbGRyZW4uY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB6SW5kZXg6IDAsXG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBwcmVwYXJlIHRoZSB6LWluZGV4IG9uIHRoZSBzaG93aW5nIGVsZW1lbnRcbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuLmVxKHNsaWRlci5zZXR0aW5ncy5zdGFydFNsaWRlKS5jc3Moe3pJbmRleDogc2xpZGVyLnNldHRpbmdzLnNsaWRlWkluZGV4LCBkaXNwbGF5OiAnYmxvY2snfSk7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGUgYW4gZWxlbWVudCB0byBjb250YWluIGFsbCBzbGlkZXIgY29udHJvbHMgKHBhZ2VyLCBzdGFydCAvIHN0b3AsIGV0YylcbiAgICAgIHNsaWRlci5jb250cm9scy5lbCA9ICQoJzxkaXYgY2xhc3M9XCJieC1jb250cm9sc1wiIC8+Jyk7XG4gICAgICAvLyBpZiBjYXB0aW9ucyBhcmUgcmVxdWVzdGVkLCBhZGQgdGhlbVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5jYXB0aW9ucykgeyBhcHBlbmRDYXB0aW9ucygpOyB9XG4gICAgICAvLyBjaGVjayBpZiBzdGFydFNsaWRlIGlzIGxhc3Qgc2xpZGVcbiAgICAgIHNsaWRlci5hY3RpdmUubGFzdCA9IHNsaWRlci5zZXR0aW5ncy5zdGFydFNsaWRlID09PSBnZXRQYWdlclF0eSgpIC0gMTtcbiAgICAgIC8vIGlmIHZpZGVvIGlzIHRydWUsIHNldCB1cCB0aGUgZml0VmlkcyBwbHVnaW5cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MudmlkZW8pIHsgZWwuZml0VmlkcygpOyB9XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnByZWxvYWRJbWFnZXMgPT09ICdhbGwnIHx8IHNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHsgcHJlbG9hZFNlbGVjdG9yID0gc2xpZGVyLmNoaWxkcmVuOyB9XG4gICAgICAvLyBvbmx5IGNoZWNrIGZvciBjb250cm9sIGFkZGl0aW9uIGlmIG5vdCBpbiBcInRpY2tlclwiIG1vZGVcbiAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLnRpY2tlcikge1xuICAgICAgICAvLyBpZiBjb250cm9scyBhcmUgcmVxdWVzdGVkLCBhZGQgdGhlbVxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmNvbnRyb2xzKSB7IGFwcGVuZENvbnRyb2xzKCk7IH1cbiAgICAgICAgLy8gaWYgYXV0byBpcyB0cnVlLCBhbmQgYXV0byBjb250cm9scyBhcmUgcmVxdWVzdGVkLCBhZGQgdGhlbVxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG8gJiYgc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9scykgeyBhcHBlbmRDb250cm9sc0F1dG8oKTsgfVxuICAgICAgICAvLyBpZiBwYWdlciBpcyByZXF1ZXN0ZWQsIGFkZCBpdFxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnBhZ2VyKSB7IGFwcGVuZFBhZ2VyKCk7IH1cbiAgICAgICAgLy8gaWYgYW55IGNvbnRyb2wgb3B0aW9uIGlzIHJlcXVlc3RlZCwgYWRkIHRoZSBjb250cm9scyB3cmFwcGVyXG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMgfHwgc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9scyB8fCBzbGlkZXIuc2V0dGluZ3MucGFnZXIpIHsgc2xpZGVyLnZpZXdwb3J0LmFmdGVyKHNsaWRlci5jb250cm9scy5lbCk7IH1cbiAgICAgIC8vIGlmIHRpY2tlciBtb2RlLCBkbyBub3QgYWxsb3cgYSBwYWdlclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyLnNldHRpbmdzLnBhZ2VyID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBsb2FkRWxlbWVudHMocHJlbG9hZFNlbGVjdG9yLCBzdGFydCk7XG4gICAgfTtcblxuICAgIHZhciBsb2FkRWxlbWVudHMgPSBmdW5jdGlvbihzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgIHZhciB0b3RhbCA9IHNlbGVjdG9yLmZpbmQoJ2ltZzpub3QoW3NyYz1cIlwiXSksIGlmcmFtZScpLmxlbmd0aCxcbiAgICAgIGNvdW50ID0gMDtcbiAgICAgIGlmICh0b3RhbCA9PT0gMCkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWxlY3Rvci5maW5kKCdpbWc6bm90KFtzcmM9XCJcIl0pLCBpZnJhbWUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm9uZSgnbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgrK2NvdW50ID09PSB0b3RhbCkgeyBjYWxsYmFjaygpOyB9XG4gICAgICAgIH0pLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29tcGxldGUpIHsgJCh0aGlzKS5sb2FkKCk7IH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIHNsaWRlclxuICAgICAqL1xuICAgIHZhciBzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgaW5maW5pdGUgbG9vcCwgcHJlcGFyZSBhZGRpdGlvbmFsIHNsaWRlc1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3AgJiYgc2xpZGVyLnNldHRpbmdzLm1vZGUgIT09ICdmYWRlJyAmJiAhc2xpZGVyLnNldHRpbmdzLnRpY2tlcikge1xuICAgICAgICB2YXIgc2xpY2UgICAgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJyA/IHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMgOiBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzLFxuICAgICAgICBzbGljZUFwcGVuZCAgPSBzbGlkZXIuY2hpbGRyZW4uc2xpY2UoMCwgc2xpY2UpLmNsb25lKHRydWUpLmFkZENsYXNzKCdieC1jbG9uZScpLFxuICAgICAgICBzbGljZVByZXBlbmQgPSBzbGlkZXIuY2hpbGRyZW4uc2xpY2UoLXNsaWNlKS5jbG9uZSh0cnVlKS5hZGRDbGFzcygnYngtY2xvbmUnKTtcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hcmlhSGlkZGVuKSB7XG4gICAgICAgICAgc2xpY2VBcHBlbmQuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICBzbGljZVByZXBlbmQuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5hcHBlbmQoc2xpY2VBcHBlbmQpLnByZXBlbmQoc2xpY2VQcmVwZW5kKTtcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSB0aGUgbG9hZGluZyBET00gZWxlbWVudFxuICAgICAgc2xpZGVyLmxvYWRlci5yZW1vdmUoKTtcbiAgICAgIC8vIHNldCB0aGUgbGVmdCAvIHRvcCBwb3NpdGlvbiBvZiBcImVsXCJcbiAgICAgIHNldFNsaWRlUG9zaXRpb24oKTtcbiAgICAgIC8vIGlmIFwidmVydGljYWxcIiBtb2RlLCBhbHdheXMgdXNlIGFkYXB0aXZlSGVpZ2h0IHRvIHByZXZlbnQgb2RkIGJlaGF2aW9yXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHsgc2xpZGVyLnNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ID0gdHJ1ZTsgfVxuICAgICAgLy8gc2V0IHRoZSB2aWV3cG9ydCBoZWlnaHRcbiAgICAgIHNsaWRlci52aWV3cG9ydC5oZWlnaHQoZ2V0Vmlld3BvcnRIZWlnaHQoKSk7XG4gICAgICAvLyBtYWtlIHN1cmUgZXZlcnl0aGluZyBpcyBwb3NpdGlvbmVkIGp1c3QgcmlnaHQgKHNhbWUgYXMgYSB3aW5kb3cgcmVzaXplKVxuICAgICAgZWwucmVkcmF3U2xpZGVyKCk7XG4gICAgICAvLyBvblNsaWRlckxvYWQgY2FsbGJhY2tcbiAgICAgIHNsaWRlci5zZXR0aW5ncy5vblNsaWRlckxvYWQuY2FsbChlbCwgc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG4gICAgICAvLyBzbGlkZXIgaGFzIGJlZW4gZnVsbHkgaW5pdGlhbGl6ZWRcbiAgICAgIHNsaWRlci5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAvLyBiaW5kIHRoZSByZXNpemUgY2FsbCB0byB0aGUgd2luZG93XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnJlc3BvbnNpdmUpIHsgJCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIHJlc2l6ZVdpbmRvdyk7IH1cbiAgICAgIC8vIGlmIGF1dG8gaXMgdHJ1ZSBhbmQgaGFzIG1vcmUgdGhhbiAxIHBhZ2UsIHN0YXJ0IHRoZSBzaG93XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG8gJiYgc2xpZGVyLnNldHRpbmdzLmF1dG9TdGFydCAmJiAoZ2V0UGFnZXJRdHkoKSA+IDEgfHwgc2xpZGVyLnNldHRpbmdzLmF1dG9TbGlkZUZvck9uZVBhZ2UpKSB7IGluaXRBdXRvKCk7IH1cbiAgICAgIC8vIGlmIHRpY2tlciBpcyB0cnVlLCBzdGFydCB0aGUgdGlja2VyXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnRpY2tlcikgeyBpbml0VGlja2VyKCk7IH1cbiAgICAgIC8vIGlmIHBhZ2VyIGlzIHJlcXVlc3RlZCwgbWFrZSB0aGUgYXBwcm9wcmlhdGUgcGFnZXIgbGluayBhY3RpdmVcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucGFnZXIpIHsgdXBkYXRlUGFnZXJBY3RpdmUoc2xpZGVyLnNldHRpbmdzLnN0YXJ0U2xpZGUpOyB9XG4gICAgICAvLyBjaGVjayBmb3IgYW55IHVwZGF0ZXMgdG8gdGhlIGNvbnRyb2xzIChsaWtlIGhpZGVDb250cm9sT25FbmQgdXBkYXRlcylcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMpIHsgdXBkYXRlRGlyZWN0aW9uQ29udHJvbHMoKTsgfVxuICAgICAgLy8gaWYgdG91Y2hFbmFibGVkIGlzIHRydWUsIHNldHVwIHRoZSB0b3VjaCBldmVudHNcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MudG91Y2hFbmFibGVkICYmICFzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7IGluaXRUb3VjaCgpOyB9XG4gICAgICAvLyBpZiBrZXlib2FyZEVuYWJsZWQgaXMgdHJ1ZSwgc2V0dXAgdGhlIGtleWJvYXJkIGV2ZW50c1xuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5rZXlib2FyZEVuYWJsZWQgJiYgIXNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHtcbiAgICAgICAgJChkb2N1bWVudCkua2V5ZG93bihrZXlQcmVzcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbGN1bGF0ZWQgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCwgdXNlZCB0byBkZXRlcm1pbmUgZWl0aGVyIGFkYXB0aXZlSGVpZ2h0IG9yIHRoZSBtYXhIZWlnaHQgdmFsdWVcbiAgICAgKi9cbiAgICB2YXIgZ2V0Vmlld3BvcnRIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWlnaHQgPSAwO1xuICAgICAgLy8gZmlyc3QgZGV0ZXJtaW5lIHdoaWNoIGNoaWxkcmVuIChzbGlkZXMpIHNob3VsZCBiZSB1c2VkIGluIG91ciBoZWlnaHQgY2FsY3VsYXRpb25cbiAgICAgIHZhciBjaGlsZHJlbiA9ICQoKTtcbiAgICAgIC8vIGlmIG1vZGUgaXMgbm90IFwidmVydGljYWxcIiBhbmQgYWRhcHRpdmVIZWlnaHQgaXMgZmFsc2UsIGluY2x1ZGUgYWxsIGNoaWxkcmVuXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgIT09ICd2ZXJ0aWNhbCcgJiYgIXNsaWRlci5zZXR0aW5ncy5hZGFwdGl2ZUhlaWdodCkge1xuICAgICAgICBjaGlsZHJlbiA9IHNsaWRlci5jaGlsZHJlbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIG5vdCBjYXJvdXNlbCwgcmV0dXJuIHRoZSBzaW5nbGUgYWN0aXZlIGNoaWxkXG4gICAgICAgIGlmICghc2xpZGVyLmNhcm91c2VsKSB7XG4gICAgICAgICAgY2hpbGRyZW4gPSBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG4gICAgICAgIC8vIGlmIGNhcm91c2VsLCByZXR1cm4gYSBzbGljZSBvZiBjaGlsZHJlblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGdldCB0aGUgaW5kaXZpZHVhbCBzbGlkZSBpbmRleFxuICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBzbGlkZXIuc2V0dGluZ3MubW92ZVNsaWRlcyA9PT0gMSA/IHNsaWRlci5hY3RpdmUuaW5kZXggOiBzbGlkZXIuYWN0aXZlLmluZGV4ICogZ2V0TW92ZUJ5KCk7XG4gICAgICAgICAgLy8gYWRkIHRoZSBjdXJyZW50IHNsaWRlIHRvIHRoZSBjaGlsZHJlblxuICAgICAgICAgIGNoaWxkcmVuID0gc2xpZGVyLmNoaWxkcmVuLmVxKGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCB0aGUgcmVtYWluaW5nIFwic2hvd2luZ1wiIHNsaWRlc1xuICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyAtIDE7IGkrKykge1xuICAgICAgICAgICAgLy8gaWYgbG9vcGVkIGJhY2sgdG8gdGhlIHN0YXJ0XG4gICAgICAgICAgICBpZiAoY3VycmVudEluZGV4ICsgaSA+PSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4uYWRkKHNsaWRlci5jaGlsZHJlbi5lcShpIC0gMSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5hZGQoc2xpZGVyLmNoaWxkcmVuLmVxKGN1cnJlbnRJbmRleCArIGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIFwidmVydGljYWxcIiBtb2RlLCBjYWxjdWxhdGUgdGhlIHN1bSBvZiB0aGUgaGVpZ2h0cyBvZiB0aGUgY2hpbGRyZW5cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBjaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgaGVpZ2h0ICs9ICQodGhpcykub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGFkZCB1c2VyLXN1cHBsaWVkIG1hcmdpbnNcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbiA+IDApIHtcbiAgICAgICAgICBoZWlnaHQgKz0gc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luICogKHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXMgLSAxKTtcbiAgICAgICAgfVxuICAgICAgLy8gaWYgbm90IFwidmVydGljYWxcIiBtb2RlLCBjYWxjdWxhdGUgdGhlIG1heCBoZWlnaHQgb2YgdGhlIGNoaWxkcmVuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWlnaHQgPSBNYXRoLm1heC5hcHBseShNYXRoLCBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICQodGhpcykub3V0ZXJIZWlnaHQoZmFsc2UpO1xuICAgICAgICB9KS5nZXQoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzbGlkZXIudmlld3BvcnQuY3NzKCdib3gtc2l6aW5nJykgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICBoZWlnaHQgKz0gcGFyc2VGbG9hdChzbGlkZXIudmlld3BvcnQuY3NzKCdwYWRkaW5nLXRvcCcpKSArIHBhcnNlRmxvYXQoc2xpZGVyLnZpZXdwb3J0LmNzcygncGFkZGluZy1ib3R0b20nKSkgK1xuICAgICAgICAgICAgICBwYXJzZUZsb2F0KHNsaWRlci52aWV3cG9ydC5jc3MoJ2JvcmRlci10b3Atd2lkdGgnKSkgKyBwYXJzZUZsb2F0KHNsaWRlci52aWV3cG9ydC5jc3MoJ2JvcmRlci1ib3R0b20td2lkdGgnKSk7XG4gICAgICB9IGVsc2UgaWYgKHNsaWRlci52aWV3cG9ydC5jc3MoJ2JveC1zaXppbmcnKSA9PT0gJ3BhZGRpbmctYm94Jykge1xuICAgICAgICBoZWlnaHQgKz0gcGFyc2VGbG9hdChzbGlkZXIudmlld3BvcnQuY3NzKCdwYWRkaW5nLXRvcCcpKSArIHBhcnNlRmxvYXQoc2xpZGVyLnZpZXdwb3J0LmNzcygncGFkZGluZy1ib3R0b20nKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbGN1bGF0ZWQgd2lkdGggdG8gYmUgdXNlZCBmb3IgdGhlIG91dGVyIHdyYXBwZXIgLyB2aWV3cG9ydFxuICAgICAqL1xuICAgIHZhciBnZXRWaWV3cG9ydE1heFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgd2lkdGggPSAnMTAwJSc7XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGggPiAwKSB7XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgd2lkdGggPSAoc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyAqIHNsaWRlci5zZXR0aW5ncy5zbGlkZVdpZHRoKSArICgoc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyAtIDEpICogc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWR0aCA9IHNsaWRlci5zZXR0aW5ncy5zbGlkZVdpZHRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkdGg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbGN1bGF0ZWQgd2lkdGggdG8gYmUgYXBwbGllZCB0byBlYWNoIHNsaWRlXG4gICAgICovXG4gICAgdmFyIGdldFNsaWRlV2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuZXdFbFdpZHRoID0gc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGgsIC8vIHN0YXJ0IHdpdGggYW55IHVzZXItc3VwcGxpZWQgc2xpZGUgd2lkdGhcbiAgICAgIHdyYXBXaWR0aCAgICAgID0gc2xpZGVyLnZpZXdwb3J0LndpZHRoKCk7ICAgIC8vIGdldCB0aGUgY3VycmVudCB2aWV3cG9ydCB3aWR0aFxuICAgICAgLy8gaWYgc2xpZGUgd2lkdGggd2FzIG5vdCBzdXBwbGllZCwgb3IgaXMgbGFyZ2VyIHRoYW4gdGhlIHZpZXdwb3J0IHVzZSB0aGUgdmlld3BvcnQgd2lkdGhcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCA9PT0gMCB8fFxuICAgICAgICAoc2xpZGVyLnNldHRpbmdzLnNsaWRlV2lkdGggPiB3cmFwV2lkdGggJiYgIXNsaWRlci5jYXJvdXNlbCkgfHxcbiAgICAgICAgc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgbmV3RWxXaWR0aCA9IHdyYXBXaWR0aDtcbiAgICAgIC8vIGlmIGNhcm91c2VsLCB1c2UgdGhlIHRocmVzaG9sZHMgdG8gZGV0ZXJtaW5lIHRoZSB3aWR0aFxuICAgICAgfSBlbHNlIGlmIChzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzID4gMSAmJiBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGlmICh3cmFwV2lkdGggPiBzbGlkZXIubWF4VGhyZXNob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ld0VsV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAod3JhcFdpZHRoIDwgc2xpZGVyLm1pblRocmVzaG9sZCkge1xuICAgICAgICAgIG5ld0VsV2lkdGggPSAod3JhcFdpZHRoIC0gKHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbiAqIChzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzIC0gMSkpKSAvIHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnNldHRpbmdzLnNocmlua0l0ZW1zKSB7XG4gICAgICAgICAgbmV3RWxXaWR0aCA9IE1hdGguZmxvb3IoKHdyYXBXaWR0aCArIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbikgLyAoTWF0aC5jZWlsKCh3cmFwV2lkdGggKyBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pIC8gKG5ld0VsV2lkdGggKyBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pKSkgLSBzbGlkZXIuc2V0dGluZ3Muc2xpZGVNYXJnaW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3RWxXaWR0aDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHNsaWRlcyBjdXJyZW50bHkgdmlzaWJsZSBpbiB0aGUgdmlld3BvcnQgKGluY2x1ZGVzIHBhcnRpYWxseSB2aXNpYmxlIHNsaWRlcylcbiAgICAgKi9cbiAgICB2YXIgZ2V0TnVtYmVyU2xpZGVzU2hvd2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNsaWRlc1Nob3dpbmcgPSAxLFxuICAgICAgY2hpbGRXaWR0aCA9IG51bGw7XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyAmJiBzbGlkZXIuc2V0dGluZ3Muc2xpZGVXaWR0aCA+IDApIHtcbiAgICAgICAgLy8gaWYgdmlld3BvcnQgaXMgc21hbGxlciB0aGFuIG1pblRocmVzaG9sZCwgcmV0dXJuIG1pblNsaWRlc1xuICAgICAgICBpZiAoc2xpZGVyLnZpZXdwb3J0LndpZHRoKCkgPCBzbGlkZXIubWluVGhyZXNob2xkKSB7XG4gICAgICAgICAgc2xpZGVzU2hvd2luZyA9IHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7XG4gICAgICAgIC8vIGlmIHZpZXdwb3J0IGlzIGxhcmdlciB0aGFuIG1heFRocmVzaG9sZCwgcmV0dXJuIG1heFNsaWRlc1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci52aWV3cG9ydC53aWR0aCgpID4gc2xpZGVyLm1heFRocmVzaG9sZCkge1xuICAgICAgICAgIHNsaWRlc1Nob3dpbmcgPSBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzO1xuICAgICAgICAvLyBpZiB2aWV3cG9ydCBpcyBiZXR3ZWVuIG1pbiAvIG1heCB0aHJlc2hvbGRzLCBkaXZpZGUgdmlld3BvcnQgd2lkdGggYnkgZmlyc3QgY2hpbGQgd2lkdGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGlsZFdpZHRoID0gc2xpZGVyLmNoaWxkcmVuLmZpcnN0KCkud2lkdGgoKSArIHNsaWRlci5zZXR0aW5ncy5zbGlkZU1hcmdpbjtcbiAgICAgICAgICBzbGlkZXNTaG93aW5nID0gTWF0aC5mbG9vcigoc2xpZGVyLnZpZXdwb3J0LndpZHRoKCkgK1xuICAgICAgICAgICAgc2xpZGVyLnNldHRpbmdzLnNsaWRlTWFyZ2luKSAvIGNoaWxkV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAvLyBpZiBcInZlcnRpY2FsXCIgbW9kZSwgc2xpZGVzIHNob3dpbmcgd2lsbCBhbHdheXMgYmUgbWluU2xpZGVzXG4gICAgICB9IGVsc2UgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHNsaWRlc1Nob3dpbmcgPSBzbGlkZXIuc2V0dGluZ3MubWluU2xpZGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNsaWRlc1Nob3dpbmc7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBwYWdlcyAob25lIGZ1bGwgdmlld3BvcnQgb2Ygc2xpZGVzIGlzIG9uZSBcInBhZ2VcIilcbiAgICAgKi9cbiAgICB2YXIgZ2V0UGFnZXJRdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYWdlclF0eSA9IDAsXG4gICAgICBicmVha1BvaW50ID0gMCxcbiAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgLy8gaWYgbW92ZVNsaWRlcyBpcyBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW92ZVNsaWRlcyA+IDApIHtcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3ApIHtcbiAgICAgICAgICBwYWdlclF0eSA9IE1hdGguY2VpbChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gZ2V0TW92ZUJ5KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdoZW4gYnJlYWtwb2ludCBnb2VzIGFib3ZlIGNoaWxkcmVuIGxlbmd0aCwgY291bnRlciBpcyB0aGUgbnVtYmVyIG9mIHBhZ2VzXG4gICAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBnZXROdW1iZXJTbGlkZXNTaG93aW5nKCk7XG4gICAgICAgICAgICBjb3VudGVyICs9IHNsaWRlci5zZXR0aW5ncy5tb3ZlU2xpZGVzIDw9IGdldE51bWJlclNsaWRlc1Nob3dpbmcoKSA/IHNsaWRlci5zZXR0aW5ncy5tb3ZlU2xpZGVzIDogZ2V0TnVtYmVyU2xpZGVzU2hvd2luZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgLy8gaWYgbW92ZVNsaWRlcyBpcyAwIChhdXRvKSBkaXZpZGUgY2hpbGRyZW4gbGVuZ3RoIGJ5IHNpZGVzIHNob3dpbmcsIHRoZW4gcm91bmQgdXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2VyUXR5ID0gTWF0aC5jZWlsKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLyBnZXROdW1iZXJTbGlkZXNTaG93aW5nKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhZ2VyUXR5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgaW5kaXZpZHVhbCBzbGlkZXMgYnkgd2hpY2ggdG8gc2hpZnQgdGhlIHNsaWRlclxuICAgICAqL1xuICAgIHZhciBnZXRNb3ZlQnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGlmIG1vdmVTbGlkZXMgd2FzIHNldCBieSB0aGUgdXNlciBhbmQgbW92ZVNsaWRlcyBpcyBsZXNzIHRoYW4gbnVtYmVyIG9mIHNsaWRlcyBzaG93aW5nXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXMgPiAwICYmIHNsaWRlci5zZXR0aW5ncy5tb3ZlU2xpZGVzIDw9IGdldE51bWJlclNsaWRlc1Nob3dpbmcoKSkge1xuICAgICAgICByZXR1cm4gc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXM7XG4gICAgICB9XG4gICAgICAvLyBpZiBtb3ZlU2xpZGVzIGlzIDAgKGF1dG8pXG4gICAgICByZXR1cm4gZ2V0TnVtYmVyU2xpZGVzU2hvd2luZygpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzbGlkZXIncyAoZWwpIGxlZnQgb3IgdG9wIHBvc2l0aW9uXG4gICAgICovXG4gICAgdmFyIHNldFNsaWRlUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwb3NpdGlvbiwgbGFzdENoaWxkLCBsYXN0U2hvd2luZ0luZGV4O1xuICAgICAgLy8gaWYgbGFzdCBzbGlkZSwgbm90IGluZmluaXRlIGxvb3AsIGFuZCBudW1iZXIgb2YgY2hpbGRyZW4gaXMgbGFyZ2VyIHRoYW4gc3BlY2lmaWVkIG1heFNsaWRlc1xuICAgICAgaWYgKHNsaWRlci5jaGlsZHJlbi5sZW5ndGggPiBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzICYmIHNsaWRlci5hY3RpdmUubGFzdCAmJiAhc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCkge1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIC8vIGdldCB0aGUgbGFzdCBjaGlsZCdzIHBvc2l0aW9uXG4gICAgICAgICAgbGFzdENoaWxkID0gc2xpZGVyLmNoaWxkcmVuLmxhc3QoKTtcbiAgICAgICAgICBwb3NpdGlvbiA9IGxhc3RDaGlsZC5wb3NpdGlvbigpO1xuICAgICAgICAgIC8vIHNldCB0aGUgbGVmdCBwb3NpdGlvblxuICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkoLShwb3NpdGlvbi5sZWZ0IC0gKHNsaWRlci52aWV3cG9ydC53aWR0aCgpIC0gbGFzdENoaWxkLm91dGVyV2lkdGgoKSkpLCAncmVzZXQnLCAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgIC8vIGdldCB0aGUgbGFzdCBzaG93aW5nIGluZGV4J3MgcG9zaXRpb25cbiAgICAgICAgICBsYXN0U2hvd2luZ0luZGV4ID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtIHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7XG4gICAgICAgICAgcG9zaXRpb24gPSBzbGlkZXIuY2hpbGRyZW4uZXEobGFzdFNob3dpbmdJbmRleCkucG9zaXRpb24oKTtcbiAgICAgICAgICAvLyBzZXQgdGhlIHRvcCBwb3NpdGlvblxuICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkoLXBvc2l0aW9uLnRvcCwgJ3Jlc2V0JywgMCk7XG4gICAgICAgIH1cbiAgICAgIC8vIGlmIG5vdCBsYXN0IHNsaWRlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBzaG93aW5nIHNsaWRlXG4gICAgICAgIHBvc2l0aW9uID0gc2xpZGVyLmNoaWxkcmVuLmVxKHNsaWRlci5hY3RpdmUuaW5kZXggKiBnZXRNb3ZlQnkoKSkucG9zaXRpb24oKTtcbiAgICAgICAgLy8gY2hlY2sgZm9yIGxhc3Qgc2xpZGVcbiAgICAgICAgaWYgKHNsaWRlci5hY3RpdmUuaW5kZXggPT09IGdldFBhZ2VyUXR5KCkgLSAxKSB7IHNsaWRlci5hY3RpdmUubGFzdCA9IHRydWU7IH1cbiAgICAgICAgLy8gc2V0IHRoZSByZXNwZWN0aXZlIHBvc2l0aW9uXG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcpIHsgc2V0UG9zaXRpb25Qcm9wZXJ0eSgtcG9zaXRpb24ubGVmdCwgJ3Jlc2V0JywgMCk7IH1cbiAgICAgICAgICBlbHNlIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ3ZlcnRpY2FsJykgeyBzZXRQb3NpdGlvblByb3BlcnR5KC1wb3NpdGlvbi50b3AsICdyZXNldCcsIDApOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZWwncyBhbmltYXRpbmcgcHJvcGVydHkgcG9zaXRpb24gKHdoaWNoIGluIHR1cm4gd2lsbCBzb21ldGltZXMgYW5pbWF0ZSBlbCkuXG4gICAgICogSWYgdXNpbmcgQ1NTLCBzZXRzIHRoZSB0cmFuc2Zvcm0gcHJvcGVydHkuIElmIG5vdCB1c2luZyBDU1MsIHNldHMgdGhlIHRvcCAvIGxlZnQgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgKGludClcbiAgICAgKiAgLSB0aGUgYW5pbWF0aW5nIHByb3BlcnR5J3MgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0eXBlIChzdHJpbmcpICdzbGlkZScsICdyZXNldCcsICd0aWNrZXInXG4gICAgICogIC0gdGhlIHR5cGUgb2YgaW5zdGFuY2UgZm9yIHdoaWNoIHRoZSBmdW5jdGlvbiBpcyBiZWluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIChpbnQpXG4gICAgICogIC0gdGhlIGFtb3VudCBvZiB0aW1lIChpbiBtcykgdGhlIHRyYW5zaXRpb24gc2hvdWxkIG9jY3VweVxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcmFtcyAoYXJyYXkpIG9wdGlvbmFsXG4gICAgICogIC0gYW4gb3B0aW9uYWwgcGFyYW1ldGVyIGNvbnRhaW5pbmcgYW55IHZhcmlhYmxlcyB0aGF0IG5lZWQgdG8gYmUgcGFzc2VkIGluXG4gICAgICovXG4gICAgdmFyIHNldFBvc2l0aW9uUHJvcGVydHkgPSBmdW5jdGlvbih2YWx1ZSwgdHlwZSwgZHVyYXRpb24sIHBhcmFtcykge1xuICAgICAgdmFyIGFuaW1hdGVPYmosIHByb3BWYWx1ZTtcbiAgICAgIC8vIHVzZSBDU1MgdHJhbnNmb3JtXG4gICAgICBpZiAoc2xpZGVyLnVzaW5nQ1NTKSB7XG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgdHJhbnNsYXRlM2QgdmFsdWVcbiAgICAgICAgcHJvcFZhbHVlID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICd2ZXJ0aWNhbCcgPyAndHJhbnNsYXRlM2QoMCwgJyArIHZhbHVlICsgJ3B4LCAwKScgOiAndHJhbnNsYXRlM2QoJyArIHZhbHVlICsgJ3B4LCAwLCAwKSc7XG4gICAgICAgIC8vIGFkZCB0aGUgQ1NTIHRyYW5zaXRpb24tZHVyYXRpb25cbiAgICAgICAgZWwuY3NzKCctJyArIHNsaWRlci5jc3NQcmVmaXggKyAnLXRyYW5zaXRpb24tZHVyYXRpb24nLCBkdXJhdGlvbiAvIDEwMDAgKyAncycpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgIC8vIHNldCB0aGUgcHJvcGVydHkgdmFsdWVcbiAgICAgICAgICBlbC5jc3Moc2xpZGVyLmFuaW1Qcm9wLCBwcm9wVmFsdWUpO1xuICAgICAgICAgIGlmIChkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgLy8gYmluZCBhIGNhbGxiYWNrIG1ldGhvZCAtIGV4ZWN1dGVzIHdoZW4gQ1NTIHRyYW5zaXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICBlbC5iaW5kKCd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCdzIHRoZSBjb3JyZWN0IG9uZVxuICAgICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmlzKGVsKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgLy8gdW5iaW5kIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgICBlbC51bmJpbmQoJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBNU1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgdXBkYXRlQWZ0ZXJTbGlkZVRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7IC8vZHVyYXRpb24gPSAwXG4gICAgICAgICAgICB1cGRhdGVBZnRlclNsaWRlVHJhbnNpdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgZWwuY3NzKHNsaWRlci5hbmltUHJvcCwgcHJvcFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndGlja2VyJykge1xuICAgICAgICAgIC8vIG1ha2UgdGhlIHRyYW5zaXRpb24gdXNlICdsaW5lYXInXG4gICAgICAgICAgZWwuY3NzKCctJyArIHNsaWRlci5jc3NQcmVmaXggKyAnLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uJywgJ2xpbmVhcicpO1xuICAgICAgICAgIGVsLmNzcyhzbGlkZXIuYW5pbVByb3AsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgaWYgKGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICBlbC5iaW5kKCd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCdzIHRoZSBjb3JyZWN0IG9uZVxuICAgICAgICAgICAgICBpZiAoISQoZS50YXJnZXQpLmlzKGVsKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgLy8gdW5iaW5kIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgICBlbC51bmJpbmQoJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBNU1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHBvc2l0aW9uXG4gICAgICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkocGFyYW1zLnJlc2V0VmFsdWUsICdyZXNldCcsIDApO1xuICAgICAgICAgICAgICAvLyBzdGFydCB0aGUgbG9vcCBhZ2FpblxuICAgICAgICAgICAgICB0aWNrZXJMb29wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgeyAvL2R1cmF0aW9uID0gMFxuICAgICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShwYXJhbXMucmVzZXRWYWx1ZSwgJ3Jlc2V0JywgMCk7XG4gICAgICAgICAgICB0aWNrZXJMb29wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAvLyB1c2UgSlMgYW5pbWF0ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5pbWF0ZU9iaiA9IHt9O1xuICAgICAgICBhbmltYXRlT2JqW3NsaWRlci5hbmltUHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICBlbC5hbmltYXRlKGFuaW1hdGVPYmosIGR1cmF0aW9uLCBzbGlkZXIuc2V0dGluZ3MuZWFzaW5nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHVwZGF0ZUFmdGVyU2xpZGVUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICAgIGVsLmNzcyhzbGlkZXIuYW5pbVByb3AsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndGlja2VyJykge1xuICAgICAgICAgIGVsLmFuaW1hdGUoYW5pbWF0ZU9iaiwgZHVyYXRpb24sICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFBvc2l0aW9uUHJvcGVydHkocGFyYW1zLnJlc2V0VmFsdWUsICdyZXNldCcsIDApO1xuICAgICAgICAgICAgLy8gcnVuIHRoZSByZWN1cnNpdmUgbG9vcCBhZnRlciBhbmltYXRpb25cbiAgICAgICAgICAgIHRpY2tlckxvb3AoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZXMgdGhlIHBhZ2VyIHdpdGggcHJvcGVyIGFtb3VudCBvZiBwYWdlc1xuICAgICAqL1xuICAgIHZhciBwb3B1bGF0ZVBhZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGFnZXJIdG1sID0gJycsXG4gICAgICBsaW5rQ29udGVudCA9ICcnLFxuICAgICAgcGFnZXJRdHkgPSBnZXRQYWdlclF0eSgpO1xuICAgICAgLy8gbG9vcCB0aHJvdWdoIGVhY2ggcGFnZXIgaXRlbVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlclF0eTsgaSsrKSB7XG4gICAgICAgIGxpbmtDb250ZW50ID0gJyc7XG4gICAgICAgIC8vIGlmIGEgYnVpbGRQYWdlciBmdW5jdGlvbiBpcyBzdXBwbGllZCwgdXNlIGl0IHRvIGdldCBwYWdlciBsaW5rIHZhbHVlLCBlbHNlIHVzZSBpbmRleCArIDFcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyICYmICQuaXNGdW5jdGlvbihzbGlkZXIuc2V0dGluZ3MuYnVpbGRQYWdlcikgfHwgc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKSB7XG4gICAgICAgICAgbGlua0NvbnRlbnQgPSBzbGlkZXIuc2V0dGluZ3MuYnVpbGRQYWdlcihpKTtcbiAgICAgICAgICBzbGlkZXIucGFnZXJFbC5hZGRDbGFzcygnYngtY3VzdG9tLXBhZ2VyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlua0NvbnRlbnQgPSBpICsgMTtcbiAgICAgICAgICBzbGlkZXIucGFnZXJFbC5hZGRDbGFzcygnYngtZGVmYXVsdC1wYWdlcicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZhciBsaW5rQ29udGVudCA9IHNsaWRlci5zZXR0aW5ncy5idWlsZFBhZ2VyICYmICQuaXNGdW5jdGlvbihzbGlkZXIuc2V0dGluZ3MuYnVpbGRQYWdlcikgPyBzbGlkZXIuc2V0dGluZ3MuYnVpbGRQYWdlcihpKSA6IGkgKyAxO1xuICAgICAgICAvLyBhZGQgdGhlIG1hcmt1cCB0byB0aGUgc3RyaW5nXG4gICAgICAgIHBhZ2VySHRtbCArPSAnPGRpdiBjbGFzcz1cImJ4LXBhZ2VyLWl0ZW1cIj48YSBocmVmPVwiXCIgZGF0YS1zbGlkZS1pbmRleD1cIicgKyBpICsgJ1wiIGNsYXNzPVwiYngtcGFnZXItbGlua1wiPicgKyBsaW5rQ29udGVudCArICc8L2E+PC9kaXY+JztcbiAgICAgIH1cbiAgICAgIC8vIHBvcHVsYXRlIHRoZSBwYWdlciBlbGVtZW50IHdpdGggcGFnZXIgbGlua3NcbiAgICAgIHNsaWRlci5wYWdlckVsLmh0bWwocGFnZXJIdG1sKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyB0aGUgcGFnZXIgdG8gdGhlIGNvbnRyb2xzIGVsZW1lbnRcbiAgICAgKi9cbiAgICB2YXIgYXBwZW5kUGFnZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKSB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgcGFnZXIgRE9NIGVsZW1lbnRcbiAgICAgICAgc2xpZGVyLnBhZ2VyRWwgPSAkKCc8ZGl2IGNsYXNzPVwiYngtcGFnZXJcIiAvPicpO1xuICAgICAgICAvLyBpZiBhIHBhZ2VyIHNlbGVjdG9yIHdhcyBzdXBwbGllZCwgcG9wdWxhdGUgaXQgd2l0aCB0aGUgcGFnZXJcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5wYWdlclNlbGVjdG9yKSB7XG4gICAgICAgICAgJChzbGlkZXIuc2V0dGluZ3MucGFnZXJTZWxlY3RvcikuaHRtbChzbGlkZXIucGFnZXJFbCk7XG4gICAgICAgIC8vIGlmIG5vIHBhZ2VyIHNlbGVjdG9yIHdhcyBzdXBwbGllZCwgYWRkIGl0IGFmdGVyIHRoZSB3cmFwcGVyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmVsLmFkZENsYXNzKCdieC1oYXMtcGFnZXInKS5hcHBlbmQoc2xpZGVyLnBhZ2VyRWwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHBvcHVsYXRlIHRoZSBwYWdlclxuICAgICAgICBwb3B1bGF0ZVBhZ2VyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIucGFnZXJFbCA9ICQoc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKTtcbiAgICAgIH1cbiAgICAgIC8vIGFzc2lnbiB0aGUgcGFnZXIgY2xpY2sgYmluZGluZ1xuICAgICAgc2xpZGVyLnBhZ2VyRWwub24oJ2NsaWNrIHRvdWNoZW5kJywgJ2EnLCBjbGlja1BhZ2VyQmluZCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgcHJldiAvIG5leHQgY29udHJvbHMgdG8gdGhlIGNvbnRyb2xzIGVsZW1lbnRcbiAgICAgKi9cbiAgICB2YXIgYXBwZW5kQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNsaWRlci5jb250cm9scy5uZXh0ID0gJCgnPGEgY2xhc3M9XCJieC1uZXh0XCIgaHJlZj1cIlwiPicgKyBzbGlkZXIuc2V0dGluZ3MubmV4dFRleHQgKyAnPC9hPicpO1xuICAgICAgc2xpZGVyLmNvbnRyb2xzLnByZXYgPSAkKCc8YSBjbGFzcz1cImJ4LXByZXZcIiBocmVmPVwiXCI+JyArIHNsaWRlci5zZXR0aW5ncy5wcmV2VGV4dCArICc8L2E+Jyk7XG4gICAgICAvLyBiaW5kIGNsaWNrIGFjdGlvbnMgdG8gdGhlIGNvbnRyb2xzXG4gICAgICBzbGlkZXIuY29udHJvbHMubmV4dC5iaW5kKCdjbGljayB0b3VjaGVuZCcsIGNsaWNrTmV4dEJpbmQpO1xuICAgICAgc2xpZGVyLmNvbnRyb2xzLnByZXYuYmluZCgnY2xpY2sgdG91Y2hlbmQnLCBjbGlja1ByZXZCaW5kKTtcbiAgICAgIC8vIGlmIG5leHRTZWxlY3RvciB3YXMgc3VwcGxpZWQsIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm5leHRTZWxlY3Rvcikge1xuICAgICAgICAkKHNsaWRlci5zZXR0aW5ncy5uZXh0U2VsZWN0b3IpLmFwcGVuZChzbGlkZXIuY29udHJvbHMubmV4dCk7XG4gICAgICB9XG4gICAgICAvLyBpZiBwcmV2U2VsZWN0b3Igd2FzIHN1cHBsaWVkLCBwb3B1bGF0ZSBpdFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5wcmV2U2VsZWN0b3IpIHtcbiAgICAgICAgJChzbGlkZXIuc2V0dGluZ3MucHJldlNlbGVjdG9yKS5hcHBlbmQoc2xpZGVyLmNvbnRyb2xzLnByZXYpO1xuICAgICAgfVxuICAgICAgLy8gaWYgbm8gY3VzdG9tIHNlbGVjdG9ycyB3ZXJlIHN1cHBsaWVkXG4gICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5uZXh0U2VsZWN0b3IgJiYgIXNsaWRlci5zZXR0aW5ncy5wcmV2U2VsZWN0b3IpIHtcbiAgICAgICAgLy8gYWRkIHRoZSBjb250cm9scyB0byB0aGUgRE9NXG4gICAgICAgIHNsaWRlci5jb250cm9scy5kaXJlY3Rpb25FbCA9ICQoJzxkaXYgY2xhc3M9XCJieC1jb250cm9scy1kaXJlY3Rpb25cIiAvPicpO1xuICAgICAgICAvLyBhZGQgdGhlIGNvbnRyb2wgZWxlbWVudHMgdG8gdGhlIGRpcmVjdGlvbkVsXG4gICAgICAgIHNsaWRlci5jb250cm9scy5kaXJlY3Rpb25FbC5hcHBlbmQoc2xpZGVyLmNvbnRyb2xzLnByZXYpLmFwcGVuZChzbGlkZXIuY29udHJvbHMubmV4dCk7XG4gICAgICAgIC8vIHNsaWRlci52aWV3cG9ydC5hcHBlbmQoc2xpZGVyLmNvbnRyb2xzLmRpcmVjdGlvbkVsKTtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmVsLmFkZENsYXNzKCdieC1oYXMtY29udHJvbHMtZGlyZWN0aW9uJykuYXBwZW5kKHNsaWRlci5jb250cm9scy5kaXJlY3Rpb25FbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgc3RhcnQgLyBzdG9wIGF1dG8gY29udHJvbHMgdG8gdGhlIGNvbnRyb2xzIGVsZW1lbnRcbiAgICAgKi9cbiAgICB2YXIgYXBwZW5kQ29udHJvbHNBdXRvID0gZnVuY3Rpb24oKSB7XG4gICAgICBzbGlkZXIuY29udHJvbHMuc3RhcnQgPSAkKCc8ZGl2IGNsYXNzPVwiYngtY29udHJvbHMtYXV0by1pdGVtXCI+PGEgY2xhc3M9XCJieC1zdGFydFwiIGhyZWY9XCJcIj4nICsgc2xpZGVyLnNldHRpbmdzLnN0YXJ0VGV4dCArICc8L2E+PC9kaXY+Jyk7XG4gICAgICBzbGlkZXIuY29udHJvbHMuc3RvcCA9ICQoJzxkaXYgY2xhc3M9XCJieC1jb250cm9scy1hdXRvLWl0ZW1cIj48YSBjbGFzcz1cImJ4LXN0b3BcIiBocmVmPVwiXCI+JyArIHNsaWRlci5zZXR0aW5ncy5zdG9wVGV4dCArICc8L2E+PC9kaXY+Jyk7XG4gICAgICAvLyBhZGQgdGhlIGNvbnRyb2xzIHRvIHRoZSBET01cbiAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwgPSAkKCc8ZGl2IGNsYXNzPVwiYngtY29udHJvbHMtYXV0b1wiIC8+Jyk7XG4gICAgICAvLyBiaW5kIGNsaWNrIGFjdGlvbnMgdG8gdGhlIGNvbnRyb2xzXG4gICAgICBzbGlkZXIuY29udHJvbHMuYXV0b0VsLm9uKCdjbGljaycsICcuYngtc3RhcnQnLCBjbGlja1N0YXJ0QmluZCk7XG4gICAgICBzbGlkZXIuY29udHJvbHMuYXV0b0VsLm9uKCdjbGljaycsICcuYngtc3RvcCcsIGNsaWNrU3RvcEJpbmQpO1xuICAgICAgLy8gaWYgYXV0b0NvbnRyb2xzQ29tYmluZSwgaW5zZXJ0IG9ubHkgdGhlIFwic3RhcnRcIiBjb250cm9sXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9Db250cm9sc0NvbWJpbmUpIHtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmF1dG9FbC5hcHBlbmQoc2xpZGVyLmNvbnRyb2xzLnN0YXJ0KTtcbiAgICAgIC8vIGlmIGF1dG9Db250cm9sc0NvbWJpbmUgaXMgZmFsc2UsIGluc2VydCBib3RoIGNvbnRyb2xzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIuY29udHJvbHMuYXV0b0VsLmFwcGVuZChzbGlkZXIuY29udHJvbHMuc3RhcnQpLmFwcGVuZChzbGlkZXIuY29udHJvbHMuc3RvcCk7XG4gICAgICB9XG4gICAgICAvLyBpZiBhdXRvIGNvbnRyb2xzIHNlbGVjdG9yIHdhcyBzdXBwbGllZCwgcG9wdWxhdGUgaXQgd2l0aCB0aGUgY29udHJvbHNcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0b0NvbnRyb2xzU2VsZWN0b3IpIHtcbiAgICAgICAgJChzbGlkZXIuc2V0dGluZ3MuYXV0b0NvbnRyb2xzU2VsZWN0b3IpLmh0bWwoc2xpZGVyLmNvbnRyb2xzLmF1dG9FbCk7XG4gICAgICAvLyBpZiBhdXRvIGNvbnRyb2xzIHNlbGVjdG9yIHdhcyBub3Qgc3VwcGxpZWQsIGFkZCBpdCBhZnRlciB0aGUgd3JhcHBlclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyLmNvbnRyb2xzLmVsLmFkZENsYXNzKCdieC1oYXMtY29udHJvbHMtYXV0bycpLmFwcGVuZChzbGlkZXIuY29udHJvbHMuYXV0b0VsKTtcbiAgICAgIH1cbiAgICAgIC8vIHVwZGF0ZSB0aGUgYXV0byBjb250cm9sc1xuICAgICAgdXBkYXRlQXV0b0NvbnRyb2xzKHNsaWRlci5zZXR0aW5ncy5hdXRvU3RhcnQgPyAnc3RvcCcgOiAnc3RhcnQnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwZW5kcyBpbWFnZSBjYXB0aW9ucyB0byB0aGUgRE9NXG4gICAgICovXG4gICAgdmFyIGFwcGVuZENhcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjeWNsZSB0aHJvdWdoIGVhY2ggY2hpbGRcbiAgICAgIHNsaWRlci5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIC8vIGdldCB0aGUgaW1hZ2UgdGl0bGUgYXR0cmlidXRlXG4gICAgICAgIHZhciB0aXRsZSA9ICQodGhpcykuZmluZCgnaW1nOmZpcnN0JykuYXR0cigndGl0bGUnKTtcbiAgICAgICAgLy8gYXBwZW5kIHRoZSBjYXB0aW9uXG4gICAgICAgIGlmICh0aXRsZSAhPT0gdW5kZWZpbmVkICYmICgnJyArIHRpdGxlKS5sZW5ndGgpIHtcbiAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJ4LWNhcHRpb25cIj48c3Bhbj4nICsgdGl0bGUgKyAnPC9zcGFuPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xpY2sgbmV4dCBiaW5kaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBjbGlja05leHRCaW5kID0gZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHNsaWRlci5jb250cm9scy5lbC5oYXNDbGFzcygnZGlzYWJsZWQnKSkgeyByZXR1cm47IH1cbiAgICAgIC8vIGlmIGF1dG8gc2hvdyBpcyBydW5uaW5nLCBzdG9wIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG8gJiYgc2xpZGVyLnNldHRpbmdzLnN0b3BBdXRvT25DbGljaykgeyBlbC5zdG9wQXV0bygpOyB9XG4gICAgICBlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENsaWNrIHByZXYgYmluZGluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIGUgKGV2ZW50KVxuICAgICAqICAtIERPTSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgY2xpY2tQcmV2QmluZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChzbGlkZXIuY29udHJvbHMuZWwuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHsgcmV0dXJuOyB9XG4gICAgICAvLyBpZiBhdXRvIHNob3cgaXMgcnVubmluZywgc3RvcCBpdFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvICYmIHNsaWRlci5zZXR0aW5ncy5zdG9wQXV0b09uQ2xpY2spIHsgZWwuc3RvcEF1dG8oKTsgfVxuICAgICAgZWwuZ29Ub1ByZXZTbGlkZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBzdGFydCBiaW5kaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBjbGlja1N0YXJ0QmluZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVsLnN0YXJ0QXV0bygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBzdG9wIGJpbmRpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIGNsaWNrU3RvcEJpbmQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlbC5zdG9wQXV0bygpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGljayBwYWdlciBiaW5kaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBjbGlja1BhZ2VyQmluZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBwYWdlckxpbmssIHBhZ2VySW5kZXg7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzLmVsLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGlmIGF1dG8gc2hvdyBpcyBydW5uaW5nLCBzdG9wIGl0XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG8gICYmIHNsaWRlci5zZXR0aW5ncy5zdG9wQXV0b09uQ2xpY2spIHsgZWwuc3RvcEF1dG8oKTsgfVxuICAgICAgcGFnZXJMaW5rID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgaWYgKHBhZ2VyTGluay5hdHRyKCdkYXRhLXNsaWRlLWluZGV4JykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYWdlckluZGV4ID0gcGFyc2VJbnQocGFnZXJMaW5rLmF0dHIoJ2RhdGEtc2xpZGUtaW5kZXgnKSk7XG4gICAgICAgIC8vIGlmIGNsaWNrZWQgcGFnZXIgbGluayBpcyBub3QgYWN0aXZlLCBjb250aW51ZSB3aXRoIHRoZSBnb1RvU2xpZGUgY2FsbFxuICAgICAgICBpZiAocGFnZXJJbmRleCAhPT0gc2xpZGVyLmFjdGl2ZS5pbmRleCkgeyBlbC5nb1RvU2xpZGUocGFnZXJJbmRleCk7IH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcGFnZXIgbGlua3Mgd2l0aCBhbiBhY3RpdmUgY2xhc3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzbGlkZUluZGV4IChpbnQpXG4gICAgICogIC0gaW5kZXggb2Ygc2xpZGUgdG8gbWFrZSBhY3RpdmVcbiAgICAgKi9cbiAgICB2YXIgdXBkYXRlUGFnZXJBY3RpdmUgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG4gICAgICAvLyBpZiBcInNob3J0XCIgcGFnZXIgdHlwZVxuICAgICAgdmFyIGxlbiA9IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IC8vIG5iIG9mIGNoaWxkcmVuXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnBhZ2VyVHlwZSA9PT0gJ3Nob3J0Jykge1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyA+IDEpIHtcbiAgICAgICAgICBsZW4gPSBNYXRoLmNlaWwoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIHNsaWRlci5zZXR0aW5ncy5tYXhTbGlkZXMpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5wYWdlckVsLmh0bWwoKHNsaWRlSW5kZXggKyAxKSArIHNsaWRlci5zZXR0aW5ncy5wYWdlclNob3J0U2VwYXJhdG9yICsgbGVuKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGFsbCBwYWdlciBhY3RpdmUgY2xhc3Nlc1xuICAgICAgc2xpZGVyLnBhZ2VyRWwuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIC8vIGFwcGx5IHRoZSBhY3RpdmUgY2xhc3MgZm9yIGFsbCBwYWdlcnNcbiAgICAgIHNsaWRlci5wYWdlckVsLmVhY2goZnVuY3Rpb24oaSwgZWwpIHsgJChlbCkuZmluZCgnYScpLmVxKHNsaWRlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTsgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIG5lZWRlZCBhY3Rpb25zIGFmdGVyIGEgc2xpZGUgdHJhbnNpdGlvblxuICAgICAqL1xuICAgIHZhciB1cGRhdGVBZnRlclNsaWRlVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgaW5maW5pdGUgbG9vcCBpcyB0cnVlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCkge1xuICAgICAgICB2YXIgcG9zaXRpb24gPSAnJztcbiAgICAgICAgLy8gZmlyc3Qgc2xpZGVcbiAgICAgICAgaWYgKHNsaWRlci5hY3RpdmUuaW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyBzZXQgdGhlIG5ldyBwb3NpdGlvblxuICAgICAgICAgIHBvc2l0aW9uID0gc2xpZGVyLmNoaWxkcmVuLmVxKDApLnBvc2l0aW9uKCk7XG4gICAgICAgIC8vIGNhcm91c2VsLCBsYXN0IHNsaWRlXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gZ2V0UGFnZXJRdHkoKSAtIDEgJiYgc2xpZGVyLmNhcm91c2VsKSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBzbGlkZXIuY2hpbGRyZW4uZXEoKGdldFBhZ2VyUXR5KCkgLSAxKSAqIGdldE1vdmVCeSgpKS5wb3NpdGlvbigpO1xuICAgICAgICAvLyBsYXN0IHNsaWRlXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMSkucG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJykgeyBzZXRQb3NpdGlvblByb3BlcnR5KC1wb3NpdGlvbi5sZWZ0LCAncmVzZXQnLCAwKTsgfVxuICAgICAgICAgIGVsc2UgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAndmVydGljYWwnKSB7IHNldFBvc2l0aW9uUHJvcGVydHkoLXBvc2l0aW9uLnRvcCwgJ3Jlc2V0JywgMCk7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gZGVjbGFyZSB0aGF0IHRoZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlXG4gICAgICBzbGlkZXIud29ya2luZyA9IGZhbHNlO1xuICAgICAgLy8gb25TbGlkZUFmdGVyIGNhbGxiYWNrXG4gICAgICBzbGlkZXIuc2V0dGluZ3Mub25TbGlkZUFmdGVyLmNhbGwoZWwsIHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuYWN0aXZlLmluZGV4KSwgc2xpZGVyLm9sZEluZGV4LCBzbGlkZXIuYWN0aXZlLmluZGV4KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgYXV0byBjb250cm9scyBzdGF0ZSAoZWl0aGVyIGFjdGl2ZSwgb3IgY29tYmluZWQgc3dpdGNoKVxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXRlIChzdHJpbmcpIFwic3RhcnRcIiwgXCJzdG9wXCJcbiAgICAgKiAgLSB0aGUgbmV3IHN0YXRlIG9mIHRoZSBhdXRvIHNob3dcbiAgICAgKi9cbiAgICB2YXIgdXBkYXRlQXV0b0NvbnRyb2xzID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIC8vIGlmIGF1dG9Db250cm9sc0NvbWJpbmUgaXMgdHJ1ZSwgcmVwbGFjZSB0aGUgY3VycmVudCBjb250cm9sIHdpdGggdGhlIG5ldyBzdGF0ZVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHNDb21iaW5lKSB7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwuaHRtbChzbGlkZXIuY29udHJvbHNbc3RhdGVdKTtcbiAgICAgIC8vIGlmIGF1dG9Db250cm9sc0NvbWJpbmUgaXMgZmFsc2UsIGFwcGx5IHRoZSBcImFjdGl2ZVwiIGNsYXNzIHRvIHRoZSBhcHByb3ByaWF0ZSBjb250cm9sXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXIuY29udHJvbHMuYXV0b0VsLmZpbmQoJ2EnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5hdXRvRWwuZmluZCgnYTpub3QoLmJ4LScgKyBzdGF0ZSArICcpJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkaXJlY3Rpb24gY29udHJvbHMgKGNoZWNrcyBpZiBlaXRoZXIgc2hvdWxkIGJlIGhpZGRlbilcbiAgICAgKi9cbiAgICB2YXIgdXBkYXRlRGlyZWN0aW9uQ29udHJvbHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChnZXRQYWdlclF0eSgpID09PSAxKSB7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5wcmV2LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBzbGlkZXIuY29udHJvbHMubmV4dC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIH0gZWxzZSBpZiAoIXNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3AgJiYgc2xpZGVyLnNldHRpbmdzLmhpZGVDb250cm9sT25FbmQpIHtcbiAgICAgICAgLy8gaWYgZmlyc3Qgc2xpZGVcbiAgICAgICAgaWYgKHNsaWRlci5hY3RpdmUuaW5kZXggPT09IDApIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMucHJldi5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbHMubmV4dC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgLy8gaWYgbGFzdCBzbGlkZVxuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5hY3RpdmUuaW5kZXggPT09IGdldFBhZ2VyUXR5KCkgLSAxKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xzLm5leHQuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xzLnByZXYucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIC8vIGlmIGFueSBzbGlkZSBpbiB0aGUgbWlkZGxlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xzLnByZXYucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xzLm5leHQucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGF1dG8gcHJvY2Vzc1xuICAgICAqL1xuICAgIHZhciBpbml0QXV0byA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgYXV0b0RlbGF5IHdhcyBzdXBwbGllZCwgbGF1bmNoIHRoZSBhdXRvIHNob3cgdXNpbmcgYSBzZXRUaW1lb3V0KCkgY2FsbFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvRGVsYXkgPiAwKSB7XG4gICAgICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChlbC5zdGFydEF1dG8sIHNsaWRlci5zZXR0aW5ncy5hdXRvRGVsYXkpO1xuICAgICAgLy8gaWYgYXV0b0RlbGF5IHdhcyBub3Qgc3VwcGxpZWQsIHN0YXJ0IHRoZSBhdXRvIHNob3cgbm9ybWFsbHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnN0YXJ0QXV0bygpO1xuXG4gICAgICAgIC8vYWRkIGZvY3VzIGFuZCBibHVyIGV2ZW50cyB0byBlbnN1cmUgaXRzIHJ1bm5pbmcgaWYgdGltZW91dCBnZXRzIHBhdXNlZFxuICAgICAgICAkKHdpbmRvdykuZm9jdXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWwuc3RhcnRBdXRvKCk7XG4gICAgICAgIH0pLmJsdXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWwuc3RvcEF1dG8oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLyBpZiBhdXRvSG92ZXIgaXMgcmVxdWVzdGVkXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmF1dG9Ib3Zlcikge1xuICAgICAgICAvLyBvbiBlbCBob3ZlclxuICAgICAgICBlbC5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgYXV0byBzaG93IGlzIGN1cnJlbnRseSBwbGF5aW5nIChoYXMgYW4gYWN0aXZlIGludGVydmFsKVxuICAgICAgICAgIGlmIChzbGlkZXIuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIHN0b3AgdGhlIGF1dG8gc2hvdyBhbmQgcGFzcyB0cnVlIGFyZ3VtZW50IHdoaWNoIHdpbGwgcHJldmVudCBjb250cm9sIHVwZGF0ZVxuICAgICAgICAgICAgZWwuc3RvcEF1dG8odHJ1ZSk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgYXV0b1BhdXNlZCB2YWx1ZSB3aGljaCB3aWxsIGJlIHVzZWQgYnkgdGhlIHJlbGF0aXZlIFwibW91c2VvdXRcIiBldmVudFxuICAgICAgICAgICAgc2xpZGVyLmF1dG9QYXVzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIGF1dG9QYXVzZWQgdmFsdWUgd2FzIGNyZWF0ZWQgYmUgdGhlIHByaW9yIFwibW91c2VvdmVyXCIgZXZlbnRcbiAgICAgICAgICBpZiAoc2xpZGVyLmF1dG9QYXVzZWQpIHtcbiAgICAgICAgICAgIC8vIHN0YXJ0IHRoZSBhdXRvIHNob3cgYW5kIHBhc3MgdHJ1ZSBhcmd1bWVudCB3aGljaCB3aWxsIHByZXZlbnQgY29udHJvbCB1cGRhdGVcbiAgICAgICAgICAgIGVsLnN0YXJ0QXV0byh0cnVlKTtcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBhdXRvUGF1c2VkIHZhbHVlXG4gICAgICAgICAgICBzbGlkZXIuYXV0b1BhdXNlZCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHRpY2tlciBwcm9jZXNzXG4gICAgICovXG4gICAgdmFyIGluaXRUaWNrZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGFydFBvc2l0aW9uID0gMCxcbiAgICAgIHBvc2l0aW9uLCB0cmFuc2Zvcm0sIHZhbHVlLCBpZHgsIHJhdGlvLCBwcm9wZXJ0eSwgbmV3U3BlZWQsIHRvdGFsRGltZW5zO1xuICAgICAgLy8gaWYgYXV0b0RpcmVjdGlvbiBpcyBcIm5leHRcIiwgYXBwZW5kIGEgY2xvbmUgb2YgdGhlIGVudGlyZSBzbGlkZXJcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXV0b0RpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgIGVsLmFwcGVuZChzbGlkZXIuY2hpbGRyZW4uY2xvbmUoKS5hZGRDbGFzcygnYngtY2xvbmUnKSk7XG4gICAgICAvLyBpZiBhdXRvRGlyZWN0aW9uIGlzIFwicHJldlwiLCBwcmVwZW5kIGEgY2xvbmUgb2YgdGhlIGVudGlyZSBzbGlkZXIsIGFuZCBzZXQgdGhlIGxlZnQgcG9zaXRpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnByZXBlbmQoc2xpZGVyLmNoaWxkcmVuLmNsb25lKCkuYWRkQ2xhc3MoJ2J4LWNsb25lJykpO1xuICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5maXJzdCgpLnBvc2l0aW9uKCk7XG4gICAgICAgIHN0YXJ0UG9zaXRpb24gPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gLXBvc2l0aW9uLmxlZnQgOiAtcG9zaXRpb24udG9wO1xuICAgICAgfVxuICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShzdGFydFBvc2l0aW9uLCAncmVzZXQnLCAwKTtcbiAgICAgIC8vIGRvIG5vdCBhbGxvdyBjb250cm9scyBpbiB0aWNrZXIgbW9kZVxuICAgICAgc2xpZGVyLnNldHRpbmdzLnBhZ2VyID0gZmFsc2U7XG4gICAgICBzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgIC8vIGlmIGF1dG9Ib3ZlciBpcyByZXF1ZXN0ZWRcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MudGlja2VySG92ZXIpIHtcbiAgICAgICAgaWYgKHNsaWRlci51c2luZ0NTUykge1xuICAgICAgICAgIGlkeCA9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyA0IDogNTtcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBlbC5jc3MoJy0nICsgc2xpZGVyLmNzc1ByZWZpeCArICctdHJhbnNmb3JtJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodHJhbnNmb3JtLnNwbGl0KCcsJylbaWR4XSk7XG4gICAgICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHZhbHVlLCAncmVzZXQnLCAwKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRvdGFsRGltZW5zID0gMDtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgIHRvdGFsRGltZW5zICs9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSkgOiAkKHRoaXMpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHNwZWVkIHJhdGlvICh1c2VkIHRvIGRldGVybWluZSB0aGUgbmV3IHNwZWVkIHRvIGZpbmlzaCB0aGUgcGF1c2VkIGFuaW1hdGlvbilcbiAgICAgICAgICAgIHJhdGlvID0gc2xpZGVyLnNldHRpbmdzLnNwZWVkIC8gdG90YWxEaW1lbnM7XG4gICAgICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggcHJvcGVydHkgdG8gdXNlXG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnaG9yaXpvbnRhbCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbmV3IHNwZWVkXG4gICAgICAgICAgICBuZXdTcGVlZCA9IHJhdGlvICogKHRvdGFsRGltZW5zIC0gKE1hdGguYWJzKHBhcnNlSW50KHZhbHVlKSkpKTtcbiAgICAgICAgICAgIHRpY2tlckxvb3AobmV3U3BlZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG9uIGVsIGhvdmVyXG4gICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwuc3RvcCgpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB0b3RhbCB3aWR0aCBvZiBjaGlsZHJlbiAodXNlZCB0byBjYWxjdWxhdGUgdGhlIHNwZWVkIHJhdGlvKVxuICAgICAgICAgICAgdG90YWxEaW1lbnMgPSAwO1xuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgdG90YWxEaW1lbnMgKz0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/ICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKSA6ICQodGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgc3BlZWQgcmF0aW8gKHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBuZXcgc3BlZWQgdG8gZmluaXNoIHRoZSBwYXVzZWQgYW5pbWF0aW9uKVxuICAgICAgICAgICAgcmF0aW8gPSBzbGlkZXIuc2V0dGluZ3Muc3BlZWQgLyB0b3RhbERpbWVucztcbiAgICAgICAgICAgIC8vIGRldGVybWluZSB3aGljaCBwcm9wZXJ0eSB0byB1c2VcbiAgICAgICAgICAgIHByb3BlcnR5ID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/ICdsZWZ0JyA6ICd0b3AnO1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBuZXcgc3BlZWRcbiAgICAgICAgICAgIG5ld1NwZWVkID0gcmF0aW8gKiAodG90YWxEaW1lbnMgLSAoTWF0aC5hYnMocGFyc2VJbnQoZWwuY3NzKHByb3BlcnR5KSkpKSk7XG4gICAgICAgICAgICB0aWNrZXJMb29wKG5ld1NwZWVkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gc3RhcnQgdGhlIHRpY2tlciBsb29wXG4gICAgICB0aWNrZXJMb29wKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJ1bnMgYSBjb250aW51b3VzIGxvb3AsIG5ld3MgdGlja2VyLXN0eWxlXG4gICAgICovXG4gICAgdmFyIHRpY2tlckxvb3AgPSBmdW5jdGlvbihyZXN1bWVTcGVlZCkge1xuICAgICAgdmFyIHNwZWVkID0gcmVzdW1lU3BlZWQgPyByZXN1bWVTcGVlZCA6IHNsaWRlci5zZXR0aW5ncy5zcGVlZCxcbiAgICAgIHBvc2l0aW9uID0ge2xlZnQ6IDAsIHRvcDogMH0sXG4gICAgICByZXNldCA9IHtsZWZ0OiAwLCB0b3A6IDB9LFxuICAgICAgYW5pbWF0ZVByb3BlcnR5LCByZXNldFZhbHVlLCBwYXJhbXM7XG5cbiAgICAgIC8vIGlmIFwibmV4dFwiIGFuaW1hdGUgbGVmdCBwb3NpdGlvbiB0byBsYXN0IGNoaWxkLCB0aGVuIHJlc2V0IGxlZnQgdG8gMFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgcG9zaXRpb24gPSBlbC5maW5kKCcuYngtY2xvbmUnKS5maXJzdCgpLnBvc2l0aW9uKCk7XG4gICAgICAvLyBpZiBcInByZXZcIiBhbmltYXRlIGxlZnQgcG9zaXRpb24gdG8gMCwgdGhlbiByZXNldCBsZWZ0IHRvIGZpcnN0IG5vbi1jbG9uZSBjaGlsZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzZXQgPSBzbGlkZXIuY2hpbGRyZW4uZmlyc3QoKS5wb3NpdGlvbigpO1xuICAgICAgfVxuICAgICAgYW5pbWF0ZVByb3BlcnR5ID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/IC1wb3NpdGlvbi5sZWZ0IDogLXBvc2l0aW9uLnRvcDtcbiAgICAgIHJlc2V0VmFsdWUgPSBzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnID8gLXJlc2V0LmxlZnQgOiAtcmVzZXQudG9wO1xuICAgICAgcGFyYW1zID0ge3Jlc2V0VmFsdWU6IHJlc2V0VmFsdWV9O1xuICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShhbmltYXRlUHJvcGVydHksICd0aWNrZXInLCBzcGVlZCwgcGFyYW1zKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZWwgaXMgb24gc2NyZWVuXG4gICAgICovXG4gICAgdmFyIGlzT25TY3JlZW4gPSBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIHdpbiA9ICQod2luZG93KSxcbiAgICAgIHZpZXdwb3J0ID0ge1xuICAgICAgICB0b3A6IHdpbi5zY3JvbGxUb3AoKSxcbiAgICAgICAgbGVmdDogd2luLnNjcm9sbExlZnQoKVxuICAgICAgfSxcbiAgICAgIGJvdW5kcyA9IGVsLm9mZnNldCgpO1xuXG4gICAgICB2aWV3cG9ydC5yaWdodCA9IHZpZXdwb3J0LmxlZnQgKyB3aW4ud2lkdGgoKTtcbiAgICAgIHZpZXdwb3J0LmJvdHRvbSA9IHZpZXdwb3J0LnRvcCArIHdpbi5oZWlnaHQoKTtcbiAgICAgIGJvdW5kcy5yaWdodCA9IGJvdW5kcy5sZWZ0ICsgZWwub3V0ZXJXaWR0aCgpO1xuICAgICAgYm91bmRzLmJvdHRvbSA9IGJvdW5kcy50b3AgKyBlbC5vdXRlckhlaWdodCgpO1xuXG4gICAgICByZXR1cm4gKCEodmlld3BvcnQucmlnaHQgPCBib3VuZHMubGVmdCB8fCB2aWV3cG9ydC5sZWZ0ID4gYm91bmRzLnJpZ2h0IHx8IHZpZXdwb3J0LmJvdHRvbSA8IGJvdW5kcy50b3AgfHwgdmlld3BvcnQudG9wID4gYm91bmRzLmJvdHRvbSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBrZXlib2FyZCBldmVudHNcbiAgICAgKi9cbiAgICB2YXIga2V5UHJlc3MgPSBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgYWN0aXZlRWxlbWVudFRhZyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgdGFnRmlsdGVycyA9ICdpbnB1dHx0ZXh0YXJlYScsXG4gICAgICBwID0gbmV3IFJlZ0V4cChhY3RpdmVFbGVtZW50VGFnLFsnaSddKSxcbiAgICAgIHJlc3VsdCA9IHAuZXhlYyh0YWdGaWx0ZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGlzT25TY3JlZW4oZWwpKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgICAgY2xpY2tOZXh0QmluZChlKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuICAgICAgICAgIGNsaWNrUHJldkJpbmQoZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRvdWNoIGV2ZW50c1xuICAgICAqL1xuICAgIHZhciBpbml0VG91Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGluaXRpYWxpemUgb2JqZWN0IHRvIGNvbnRhaW4gYWxsIHRvdWNoIHZhbHVlc1xuICAgICAgc2xpZGVyLnRvdWNoID0ge1xuICAgICAgICBzdGFydDoge3g6IDAsIHk6IDB9LFxuICAgICAgICBlbmQ6IHt4OiAwLCB5OiAwfVxuICAgICAgfTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC5iaW5kKCd0b3VjaHN0YXJ0IE1TUG9pbnRlckRvd24gcG9pbnRlcmRvd24nLCBvblRvdWNoU3RhcnQpO1xuXG4gICAgICAvL2ZvciBicm93c2VycyB0aGF0IGhhdmUgaW1wbGVtZW50ZWQgcG9pbnRlciBldmVudHMgYW5kIGZpcmUgYSBjbGljayBhZnRlclxuICAgICAgLy9ldmVyeSBwb2ludGVydXAgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHBvaW50ZXJ1cCBpcyBvbiBzYW1lIHNjcmVlbiBsb2NhdGlvbiBhcyBwb2ludGVyZG93biBvciBub3RcbiAgICAgIHNsaWRlci52aWV3cG9ydC5vbignY2xpY2snLCAnLmJ4c2xpZGVyIGEnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChzbGlkZXIudmlld3BvcnQuaGFzQ2xhc3MoJ2NsaWNrLWRpc2FibGVkJykpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LnJlbW92ZUNsYXNzKCdjbGljay1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlciBmb3IgXCJ0b3VjaHN0YXJ0XCJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIG9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vZGlzYWJsZSBzbGlkZXIgY29udHJvbHMgd2hpbGUgdXNlciBpcyBpbnRlcmFjdGluZyB3aXRoIHNsaWRlcyB0byBhdm9pZCBzbGlkZXIgZnJlZXplIHRoYXQgaGFwcGVucyBvbiB0b3VjaCBkZXZpY2VzIHdoZW4gYSBzbGlkZSBzd2lwZSBoYXBwZW5zIGltbWVkaWF0ZWx5IGFmdGVyIGludGVyYWN0aW5nIHdpdGggc2xpZGVyIGNvbnRyb2xzXG4gICAgICBzbGlkZXIuY29udHJvbHMuZWwuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cbiAgICAgIGlmIChzbGlkZXIud29ya2luZykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNsaWRlci5jb250cm9scy5lbC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlY29yZCB0aGUgb3JpZ2luYWwgcG9zaXRpb24gd2hlbiB0b3VjaCBzdGFydHNcbiAgICAgICAgc2xpZGVyLnRvdWNoLm9yaWdpbmFsUG9zID0gZWwucG9zaXRpb24oKTtcbiAgICAgICAgdmFyIG9yaWcgPSBlLm9yaWdpbmFsRXZlbnQsXG4gICAgICAgIHRvdWNoUG9pbnRzID0gKHR5cGVvZiBvcmlnLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJykgPyBvcmlnLmNoYW5nZWRUb3VjaGVzIDogW29yaWddO1xuICAgICAgICAvLyByZWNvcmQgdGhlIHN0YXJ0aW5nIHRvdWNoIHgsIHkgY29vcmRpbmF0ZXNcbiAgICAgICAgc2xpZGVyLnRvdWNoLnN0YXJ0LnggPSB0b3VjaFBvaW50c1swXS5wYWdlWDtcbiAgICAgICAgc2xpZGVyLnRvdWNoLnN0YXJ0LnkgPSB0b3VjaFBvaW50c1swXS5wYWdlWTtcblxuICAgICAgICBpZiAoc2xpZGVyLnZpZXdwb3J0LmdldCgwKS5zZXRQb2ludGVyQ2FwdHVyZSkge1xuICAgICAgICAgIHNsaWRlci5wb2ludGVySWQgPSBvcmlnLnBvaW50ZXJJZDtcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQuZ2V0KDApLnNldFBvaW50ZXJDYXB0dXJlKHNsaWRlci5wb2ludGVySWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJpbmQgYSBcInRvdWNobW92ZVwiIGV2ZW50IHRvIHRoZSB2aWV3cG9ydFxuICAgICAgICBzbGlkZXIudmlld3BvcnQuYmluZCgndG91Y2htb3ZlIE1TUG9pbnRlck1vdmUgcG9pbnRlcm1vdmUnLCBvblRvdWNoTW92ZSk7XG4gICAgICAgIC8vIGJpbmQgYSBcInRvdWNoZW5kXCIgZXZlbnQgdG8gdGhlIHZpZXdwb3J0XG4gICAgICAgIHNsaWRlci52aWV3cG9ydC5iaW5kKCd0b3VjaGVuZCBNU1BvaW50ZXJVcCBwb2ludGVydXAnLCBvblRvdWNoRW5kKTtcbiAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmJpbmQoJ01TUG9pbnRlckNhbmNlbCBwb2ludGVyY2FuY2VsJywgb25Qb2ludGVyQ2FuY2VsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FuY2VsIFBvaW50ZXIgZm9yIFdpbmRvd3MgUGhvbmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlIChldmVudClcbiAgICAgKiAgLSBET00gZXZlbnQgb2JqZWN0XG4gICAgICovXG4gICAgdmFyIG9uUG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8qIG9uUG9pbnRlckNhbmNlbCBoYW5kbGVyIGlzIG5lZWRlZCB0byBkZWFsIHdpdGggc2l0dWF0aW9ucyB3aGVuIGEgdG91Y2hlbmRcbiAgICAgIGRvZXNuJ3QgZmlyZSBhZnRlciBhIHRvdWNoc3RhcnQgKHRoaXMgaGFwcGVucyBvbiB3aW5kb3dzIHBob25lcyBvbmx5KSAqL1xuICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eShzbGlkZXIudG91Y2gub3JpZ2luYWxQb3MubGVmdCwgJ3Jlc2V0JywgMCk7XG5cbiAgICAgIC8vcmVtb3ZlIGhhbmRsZXJzXG4gICAgICBzbGlkZXIuY29udHJvbHMuZWwucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICBzbGlkZXIudmlld3BvcnQudW5iaW5kKCdNU1BvaW50ZXJDYW5jZWwgcG9pbnRlcmNhbmNlbCcsIG9uUG9pbnRlckNhbmNlbCk7XG4gICAgICBzbGlkZXIudmlld3BvcnQudW5iaW5kKCd0b3VjaG1vdmUgTVNQb2ludGVyTW92ZSBwb2ludGVybW92ZScsIG9uVG91Y2hNb3ZlKTtcbiAgICAgIHNsaWRlci52aWV3cG9ydC51bmJpbmQoJ3RvdWNoZW5kIE1TUG9pbnRlclVwIHBvaW50ZXJ1cCcsIG9uVG91Y2hFbmQpO1xuICAgICAgaWYgKHNsaWRlci52aWV3cG9ydC5nZXQoMCkucmVsZWFzZVBvaW50ZXJDYXB0dXJlKSB7XG4gICAgICAgIHNsaWRlci52aWV3cG9ydC5nZXQoMCkucmVsZWFzZVBvaW50ZXJDYXB0dXJlKHNsaWRlci5wb2ludGVySWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyIGZvciBcInRvdWNobW92ZVwiXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZSAoZXZlbnQpXG4gICAgICogIC0gRE9NIGV2ZW50IG9iamVjdFxuICAgICAqL1xuICAgIHZhciBvblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBvcmlnID0gZS5vcmlnaW5hbEV2ZW50LFxuICAgICAgdG91Y2hQb2ludHMgPSAodHlwZW9mIG9yaWcuY2hhbmdlZFRvdWNoZXMgIT09ICd1bmRlZmluZWQnKSA/IG9yaWcuY2hhbmdlZFRvdWNoZXMgOiBbb3JpZ10sXG4gICAgICAvLyBpZiBzY3JvbGxpbmcgb24geSBheGlzLCBkbyBub3QgcHJldmVudCBkZWZhdWx0XG4gICAgICB4TW92ZW1lbnQgPSBNYXRoLmFicyh0b3VjaFBvaW50c1swXS5wYWdlWCAtIHNsaWRlci50b3VjaC5zdGFydC54KSxcbiAgICAgIHlNb3ZlbWVudCA9IE1hdGguYWJzKHRvdWNoUG9pbnRzWzBdLnBhZ2VZIC0gc2xpZGVyLnRvdWNoLnN0YXJ0LnkpLFxuICAgICAgdmFsdWUgPSAwLFxuICAgICAgY2hhbmdlID0gMDtcblxuICAgICAgLy8geCBheGlzIHN3aXBlXG4gICAgICBpZiAoKHhNb3ZlbWVudCAqIDMpID4geU1vdmVtZW50ICYmIHNsaWRlci5zZXR0aW5ncy5wcmV2ZW50RGVmYXVsdFN3aXBlWCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyB5IGF4aXMgc3dpcGVcbiAgICAgIH0gZWxzZSBpZiAoKHlNb3ZlbWVudCAqIDMpID4geE1vdmVtZW50ICYmIHNsaWRlci5zZXR0aW5ncy5wcmV2ZW50RGVmYXVsdFN3aXBlWSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgIT09ICdmYWRlJyAmJiBzbGlkZXIuc2V0dGluZ3Mub25lVG9PbmVUb3VjaCkge1xuICAgICAgICAvLyBpZiBob3Jpem9udGFsLCBkcmFnIGFsb25nIHggYXhpc1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIGNoYW5nZSA9IHRvdWNoUG9pbnRzWzBdLnBhZ2VYIC0gc2xpZGVyLnRvdWNoLnN0YXJ0Lng7XG4gICAgICAgICAgdmFsdWUgPSBzbGlkZXIudG91Y2gub3JpZ2luYWxQb3MubGVmdCArIGNoYW5nZTtcbiAgICAgICAgLy8gaWYgdmVydGljYWwsIGRyYWcgYWxvbmcgeSBheGlzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hhbmdlID0gdG91Y2hQb2ludHNbMF0ucGFnZVkgLSBzbGlkZXIudG91Y2guc3RhcnQueTtcbiAgICAgICAgICB2YWx1ZSA9IHNsaWRlci50b3VjaC5vcmlnaW5hbFBvcy50b3AgKyBjaGFuZ2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eSh2YWx1ZSwgJ3Jlc2V0JywgMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIgZm9yIFwidG91Y2hlbmRcIlxuICAgICAqXG4gICAgICogQHBhcmFtIGUgKGV2ZW50KVxuICAgICAqICAtIERPTSBldmVudCBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgb25Ub3VjaEVuZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNsaWRlci52aWV3cG9ydC51bmJpbmQoJ3RvdWNobW92ZSBNU1BvaW50ZXJNb3ZlIHBvaW50ZXJtb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgLy9lbmFibGUgc2xpZGVyIGNvbnRyb2xzIGFzIHNvb24gYXMgdXNlciBzdG9wcyBpbnRlcmFjaW5nIHdpdGggc2xpZGVzXG4gICAgICBzbGlkZXIuY29udHJvbHMuZWwucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICB2YXIgb3JpZyAgICA9IGUub3JpZ2luYWxFdmVudCxcbiAgICAgIHRvdWNoUG9pbnRzID0gKHR5cGVvZiBvcmlnLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJykgPyBvcmlnLmNoYW5nZWRUb3VjaGVzIDogW29yaWddLFxuICAgICAgdmFsdWUgICAgICAgPSAwLFxuICAgICAgZGlzdGFuY2UgICAgPSAwO1xuICAgICAgLy8gcmVjb3JkIGVuZCB4LCB5IHBvc2l0aW9uc1xuICAgICAgc2xpZGVyLnRvdWNoLmVuZC54ID0gdG91Y2hQb2ludHNbMF0ucGFnZVg7XG4gICAgICBzbGlkZXIudG91Y2guZW5kLnkgPSB0b3VjaFBvaW50c1swXS5wYWdlWTtcbiAgICAgIC8vIGlmIGZhZGUgbW9kZSwgY2hlY2sgaWYgYWJzb2x1dGUgeCBkaXN0YW5jZSBjbGVhcnMgdGhlIHRocmVzaG9sZFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5tb2RlID09PSAnZmFkZScpIHtcbiAgICAgICAgZGlzdGFuY2UgPSBNYXRoLmFicyhzbGlkZXIudG91Y2guc3RhcnQueCAtIHNsaWRlci50b3VjaC5lbmQueCk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+PSBzbGlkZXIuc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnRvdWNoLnN0YXJ0LnggPiBzbGlkZXIudG91Y2guZW5kLngpIHtcbiAgICAgICAgICAgIGVsLmdvVG9OZXh0U2xpZGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbC5zdG9wQXV0bygpO1xuICAgICAgICB9XG4gICAgICAvLyBub3QgZmFkZSBtb2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjYWxjdWxhdGUgZGlzdGFuY2UgYW5kIGVsJ3MgYW5pbWF0ZSBwcm9wZXJ0eVxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIGRpc3RhbmNlID0gc2xpZGVyLnRvdWNoLmVuZC54IC0gc2xpZGVyLnRvdWNoLnN0YXJ0Lng7XG4gICAgICAgICAgdmFsdWUgPSBzbGlkZXIudG91Y2gub3JpZ2luYWxQb3MubGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXN0YW5jZSA9IHNsaWRlci50b3VjaC5lbmQueSAtIHNsaWRlci50b3VjaC5zdGFydC55O1xuICAgICAgICAgIHZhbHVlID0gc2xpZGVyLnRvdWNoLm9yaWdpbmFsUG9zLnRvcDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBub3QgaW5maW5pdGUgbG9vcCBhbmQgZmlyc3QgLyBsYXN0IHNsaWRlLCBkbyBub3QgYXR0ZW1wdCBhIHNsaWRlIHRyYW5zaXRpb25cbiAgICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wICYmICgoc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gMCAmJiBkaXN0YW5jZSA+IDApIHx8IChzbGlkZXIuYWN0aXZlLmxhc3QgJiYgZGlzdGFuY2UgPCAwKSkpIHtcbiAgICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHZhbHVlLCAncmVzZXQnLCAyMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNoZWNrIGlmIGRpc3RhbmNlIGNsZWFycyB0aHJlc2hvbGRcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpID49IHNsaWRlci5zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCkge1xuICAgICAgICAgICAgICBlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5nb1RvUHJldlNsaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC5zdG9wQXV0bygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbC5hbmltYXRlKHByb3BlcnR5LCAyMDApO1xuICAgICAgICAgICAgc2V0UG9zaXRpb25Qcm9wZXJ0eSh2YWx1ZSwgJ3Jlc2V0JywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlci52aWV3cG9ydC51bmJpbmQoJ3RvdWNoZW5kIE1TUG9pbnRlclVwIHBvaW50ZXJ1cCcsIG9uVG91Y2hFbmQpO1xuICAgICAgaWYgKHNsaWRlci52aWV3cG9ydC5nZXQoMCkucmVsZWFzZVBvaW50ZXJDYXB0dXJlKSB7XG4gICAgICAgIHNsaWRlci52aWV3cG9ydC5nZXQoMCkucmVsZWFzZVBvaW50ZXJDYXB0dXJlKHNsaWRlci5wb2ludGVySWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXaW5kb3cgcmVzaXplIGV2ZW50IGNhbGxiYWNrXG4gICAgICovXG4gICAgdmFyIHJlc2l6ZVdpbmRvdyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIGRvbid0IGRvIGFueXRoaW5nIGlmIHNsaWRlciBpc24ndCBpbml0aWFsaXplZC5cbiAgICAgIGlmICghc2xpZGVyLmluaXRpYWxpemVkKSB7IHJldHVybjsgfVxuICAgICAgLy8gRGVsYXkgaWYgc2xpZGVyIHdvcmtpbmcuXG4gICAgICBpZiAoc2xpZGVyLndvcmtpbmcpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQocmVzaXplV2luZG93LCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnZXQgdGhlIG5ldyB3aW5kb3cgZGltZW5zIChhZ2FpbiwgdGhhbmsgeW91IElFKVxuICAgICAgICB2YXIgd2luZG93V2lkdGhOZXcgPSAkKHdpbmRvdykud2lkdGgoKSxcbiAgICAgICAgd2luZG93SGVpZ2h0TmV3ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCBpdCBpcyBhIHRydWUgd2luZG93IHJlc2l6ZVxuICAgICAgICAvLyAqd2UgbXVzdCBjaGVjayB0aGlzIGJlY2F1c2Ugb3VyIGRpbm9zYXVyIGZyaWVuZCBJRSBmaXJlcyBhIHdpbmRvdyByZXNpemUgZXZlbnQgd2hlbiBjZXJ0YWluIERPTSBlbGVtZW50c1xuICAgICAgICAvLyBhcmUgcmVzaXplZC4gQ2FuIHlvdSBqdXN0IGRpZSBhbHJlYWR5PypcbiAgICAgICAgaWYgKHdpbmRvd1dpZHRoICE9PSB3aW5kb3dXaWR0aE5ldyB8fCB3aW5kb3dIZWlnaHQgIT09IHdpbmRvd0hlaWdodE5ldykge1xuICAgICAgICAgIC8vIHNldCB0aGUgbmV3IHdpbmRvdyBkaW1lbnNcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9IHdpbmRvd1dpZHRoTmV3O1xuICAgICAgICAgIHdpbmRvd0hlaWdodCA9IHdpbmRvd0hlaWdodE5ldztcbiAgICAgICAgICAvLyB1cGRhdGUgYWxsIGR5bmFtaWMgZWxlbWVudHNcbiAgICAgICAgICBlbC5yZWRyYXdTbGlkZXIoKTtcbiAgICAgICAgICAvLyBDYWxsIHVzZXIgcmVzaXplIGhhbmRsZXJcbiAgICAgICAgICBzbGlkZXIuc2V0dGluZ3Mub25TbGlkZXJSZXNpemUuY2FsbChlbCwgc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBhcmlhLWhpZGRlbj10cnVlIGF0dHJpYnV0ZSB0byBlYWNoIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGFydFZpc2libGVJbmRleCAoaW50KVxuICAgICAqICAtIHRoZSBmaXJzdCB2aXNpYmxlIGVsZW1lbnQncyBpbmRleFxuICAgICAqL1xuICAgIHZhciBhcHBseUFyaWFIaWRkZW5BdHRyaWJ1dGVzID0gZnVuY3Rpb24oc3RhcnRWaXNpYmxlSW5kZXgpIHtcbiAgICAgIHZhciBudW1iZXJPZlNsaWRlc1Nob3dpbmcgPSBnZXROdW1iZXJTbGlkZXNTaG93aW5nKCk7XG4gICAgICAvLyBvbmx5IGFwcGx5IGF0dHJpYnV0ZXMgaWYgdGhlIHNldHRpbmcgaXMgZW5hYmxlZCBhbmQgbm90IGluIHRpY2tlciBtb2RlXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFyaWFIaWRkZW4gJiYgIXNsaWRlci5zZXR0aW5ncy50aWNrZXIpIHtcbiAgICAgICAgLy8gYWRkIGFyaWEtaGlkZGVuPXRydWUgdG8gYWxsIGVsZW1lbnRzXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbi5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIC8vIGdldCB0aGUgdmlzaWJsZSBlbGVtZW50cyBhbmQgY2hhbmdlIHRvIGFyaWEtaGlkZGVuPWZhbHNlXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbi5zbGljZShzdGFydFZpc2libGVJbmRleCwgc3RhcnRWaXNpYmxlSW5kZXggKyBudW1iZXJPZlNsaWRlc1Nob3dpbmcpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgaW5kZXggYWNjb3JkaW5nIHRvIHByZXNlbnQgcGFnZSByYW5nZVxuICAgICAqXG4gICAgICogQHBhcmFtIHNsaWRlT25kZXggKGludClcbiAgICAgKiAgLSB0aGUgZGVzaXJlZCBzbGlkZSBpbmRleFxuICAgICAqL1xuICAgIHZhciBzZXRTbGlkZUluZGV4ID0gZnVuY3Rpb24oc2xpZGVJbmRleCkge1xuICAgICAgaWYgKHNsaWRlSW5kZXggPCAwKSB7XG4gICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wKSB7XG4gICAgICAgICAgcmV0dXJuIGdldFBhZ2VyUXR5KCkgLSAxO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgLy93ZSBkb24ndCBnbyB0byB1bmRlZmluZWQgc2xpZGVzXG4gICAgICAgICAgcmV0dXJuIHNsaWRlci5hY3RpdmUuaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIC8vIGlmIHNsaWRlSW5kZXggaXMgZ3JlYXRlciB0aGFuIGNoaWxkcmVuIGxlbmd0aCwgc2V0IGFjdGl2ZSBpbmRleCB0byAwICh0aGlzIGhhcHBlbnMgZHVyaW5nIGluZmluaXRlIGxvb3ApXG4gICAgICB9IGVsc2UgaWYgKHNsaWRlSW5kZXggPj0gZ2V0UGFnZXJRdHkoKSkge1xuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCkge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vd2UgZG9uJ3QgbW92ZSB0byB1bmRlZmluZWQgcGFnZXNcbiAgICAgICAgICByZXR1cm4gc2xpZGVyLmFjdGl2ZS5pbmRleDtcbiAgICAgICAgfVxuICAgICAgLy8gc2V0IGFjdGl2ZSBpbmRleCB0byByZXF1ZXN0ZWQgc2xpZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzbGlkZUluZGV4O1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAqID0gUFVCTElDIEZVTkNUSU9OU1xuICAgICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBzbGlkZSB0cmFuc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgc2xpZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzbGlkZUluZGV4IChpbnQpXG4gICAgICogIC0gdGhlIGRlc3RpbmF0aW9uIHNsaWRlJ3MgaW5kZXggKHplcm8tYmFzZWQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGlyZWN0aW9uIChzdHJpbmcpXG4gICAgICogIC0gSU5URVJOQUwgVVNFIE9OTFkgLSB0aGUgZGlyZWN0aW9uIG9mIHRyYXZlbCAoXCJwcmV2XCIgLyBcIm5leHRcIilcbiAgICAgKi9cbiAgICBlbC5nb1RvU2xpZGUgPSBmdW5jdGlvbihzbGlkZUluZGV4LCBkaXJlY3Rpb24pIHtcbiAgICAgIC8vIG9uU2xpZGVCZWZvcmUsIG9uU2xpZGVOZXh0LCBvblNsaWRlUHJldiBjYWxsYmFja3NcbiAgICAgIC8vIEFsbG93IHRyYW5zaXRpb24gY2FuY2VsaW5nIGJhc2VkIG9uIHJldHVybmVkIHZhbHVlXG4gICAgICB2YXIgcGVyZm9ybVRyYW5zaXRpb24gPSB0cnVlLFxuICAgICAgbW92ZUJ5ID0gMCxcbiAgICAgIHBvc2l0aW9uID0ge2xlZnQ6IDAsIHRvcDogMH0sXG4gICAgICBsYXN0Q2hpbGQgPSBudWxsLFxuICAgICAgbGFzdFNob3dpbmdJbmRleCwgZXEsIHZhbHVlLCByZXF1ZXN0RWw7XG4gICAgICAvLyBzdG9yZSB0aGUgb2xkIGluZGV4XG4gICAgICBzbGlkZXIub2xkSW5kZXggPSBzbGlkZXIuYWN0aXZlLmluZGV4O1xuICAgICAgLy9zZXQgbmV3IGluZGV4XG4gICAgICBzbGlkZXIuYWN0aXZlLmluZGV4ID0gc2V0U2xpZGVJbmRleChzbGlkZUluZGV4KTtcblxuICAgICAgLy8gaWYgcGx1Z2luIGlzIGN1cnJlbnRseSBpbiBtb3Rpb24sIGlnbm9yZSByZXF1ZXN0XG4gICAgICBpZiAoc2xpZGVyLndvcmtpbmcgfHwgc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gc2xpZGVyLm9sZEluZGV4KSB7IHJldHVybjsgfVxuICAgICAgLy8gZGVjbGFyZSB0aGF0IHBsdWdpbiBpcyBpbiBtb3Rpb25cbiAgICAgIHNsaWRlci53b3JraW5nID0gdHJ1ZTtcblxuICAgICAgcGVyZm9ybVRyYW5zaXRpb24gPSBzbGlkZXIuc2V0dGluZ3Mub25TbGlkZUJlZm9yZS5jYWxsKGVsLCBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCksIHNsaWRlci5vbGRJbmRleCwgc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG5cbiAgICAgIC8vIElmIHRyYW5zaXRpb25zIGNhbmNlbGVkLCByZXNldCBhbmQgcmV0dXJuXG4gICAgICBpZiAodHlwZW9mIChwZXJmb3JtVHJhbnNpdGlvbikgIT09ICd1bmRlZmluZWQnICYmICFwZXJmb3JtVHJhbnNpdGlvbikge1xuICAgICAgICBzbGlkZXIuYWN0aXZlLmluZGV4ID0gc2xpZGVyLm9sZEluZGV4OyAvLyByZXN0b3JlIG9sZCBpbmRleFxuICAgICAgICBzbGlkZXIud29ya2luZyA9IGZhbHNlOyAvLyBpcyBub3QgaW4gbW90aW9uXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgIC8vIFByZXZlbnQgY2FuY2VsaW5nIGluIGZ1dHVyZSBmdW5jdGlvbnMgb3IgbGFjayB0aGVyZS1vZiBmcm9tIG5lZ2F0aW5nIHByZXZpb3VzIGNvbW1hbmRzIHRvIGNhbmNlbFxuICAgICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5vblNsaWRlTmV4dC5jYWxsKGVsLCBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCksIHNsaWRlci5vbGRJbmRleCwgc2xpZGVyLmFjdGl2ZS5pbmRleCkpIHtcbiAgICAgICAgICBwZXJmb3JtVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgIC8vIFByZXZlbnQgY2FuY2VsaW5nIGluIGZ1dHVyZSBmdW5jdGlvbnMgb3IgbGFjayB0aGVyZS1vZiBmcm9tIG5lZ2F0aW5nIHByZXZpb3VzIGNvbW1hbmRzIHRvIGNhbmNlbFxuICAgICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5vblNsaWRlUHJldi5jYWxsKGVsLCBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCksIHNsaWRlci5vbGRJbmRleCwgc2xpZGVyLmFjdGl2ZS5pbmRleCkpIHtcbiAgICAgICAgICBwZXJmb3JtVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIGxhc3Qgc2xpZGVcbiAgICAgIHNsaWRlci5hY3RpdmUubGFzdCA9IHNsaWRlci5hY3RpdmUuaW5kZXggPj0gZ2V0UGFnZXJRdHkoKSAtIDE7XG4gICAgICAvLyB1cGRhdGUgdGhlIHBhZ2VyIHdpdGggYWN0aXZlIGNsYXNzXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLnBhZ2VyIHx8IHNsaWRlci5zZXR0aW5ncy5wYWdlckN1c3RvbSkgeyB1cGRhdGVQYWdlckFjdGl2ZShzbGlkZXIuYWN0aXZlLmluZGV4KTsgfVxuICAgICAgLy8gLy8gY2hlY2sgZm9yIGRpcmVjdGlvbiBjb250cm9sIHVwZGF0ZVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5jb250cm9scykgeyB1cGRhdGVEaXJlY3Rpb25Db250cm9scygpOyB9XG4gICAgICAvLyBpZiBzbGlkZXIgaXMgc2V0IHRvIG1vZGU6IFwiZmFkZVwiXG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdmYWRlJykge1xuICAgICAgICAvLyBpZiBhZGFwdGl2ZUhlaWdodCBpcyB0cnVlIGFuZCBuZXh0IGhlaWdodCBpcyBkaWZmZXJlbnQgZnJvbSBjdXJyZW50IGhlaWdodCwgYW5pbWF0ZSB0byB0aGUgbmV3IGhlaWdodFxuICAgICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0ICYmIHNsaWRlci52aWV3cG9ydC5oZWlnaHQoKSAhPT0gZ2V0Vmlld3BvcnRIZWlnaHQoKSkge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydC5hbmltYXRlKHtoZWlnaHQ6IGdldFZpZXdwb3J0SGVpZ2h0KCl9LCBzbGlkZXIuc2V0dGluZ3MuYWRhcHRpdmVIZWlnaHRTcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZmFkZSBvdXQgdGhlIHZpc2libGUgY2hpbGQgYW5kIHJlc2V0IGl0cyB6LWluZGV4IHZhbHVlXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbi5maWx0ZXIoJzp2aXNpYmxlJykuZmFkZU91dChzbGlkZXIuc2V0dGluZ3Muc3BlZWQpLmNzcyh7ekluZGV4OiAwfSk7XG4gICAgICAgIC8vIGZhZGUgaW4gdGhlIG5ld2x5IHJlcXVlc3RlZCBzbGlkZVxuICAgICAgICBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCkuY3NzKCd6SW5kZXgnLCBzbGlkZXIuc2V0dGluZ3Muc2xpZGVaSW5kZXggKyAxKS5mYWRlSW4oc2xpZGVyLnNldHRpbmdzLnNwZWVkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLmNzcygnekluZGV4Jywgc2xpZGVyLnNldHRpbmdzLnNsaWRlWkluZGV4KTtcbiAgICAgICAgICB1cGRhdGVBZnRlclNsaWRlVHJhbnNpdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIHNsaWRlciBtb2RlIGlzIG5vdCBcImZhZGVcIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgYWRhcHRpdmVIZWlnaHQgaXMgdHJ1ZSBhbmQgbmV4dCBoZWlnaHQgaXMgZGlmZmVyZW50IGZyb20gY3VycmVudCBoZWlnaHQsIGFuaW1hdGUgdG8gdGhlIG5ldyBoZWlnaHRcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hZGFwdGl2ZUhlaWdodCAmJiBzbGlkZXIudmlld3BvcnQuaGVpZ2h0KCkgIT09IGdldFZpZXdwb3J0SGVpZ2h0KCkpIHtcbiAgICAgICAgICBzbGlkZXIudmlld3BvcnQuYW5pbWF0ZSh7aGVpZ2h0OiBnZXRWaWV3cG9ydEhlaWdodCgpfSwgc2xpZGVyLnNldHRpbmdzLmFkYXB0aXZlSGVpZ2h0U3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGNhcm91c2VsIGFuZCBub3QgaW5maW5pdGUgbG9vcFxuICAgICAgICBpZiAoIXNsaWRlci5zZXR0aW5ncy5pbmZpbml0ZUxvb3AgJiYgc2xpZGVyLmNhcm91c2VsICYmIHNsaWRlci5hY3RpdmUubGFzdCkge1xuICAgICAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MubW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGxhc3QgY2hpbGQgcG9zaXRpb25cbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IHNsaWRlci5jaGlsZHJlbi5lcShzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGxhc3RDaGlsZC5wb3NpdGlvbigpO1xuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBzbGlkZVxuICAgICAgICAgICAgbW92ZUJ5ID0gc2xpZGVyLnZpZXdwb3J0LndpZHRoKCkgLSBsYXN0Q2hpbGQub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBnZXQgbGFzdCBzaG93aW5nIGluZGV4IHBvc2l0aW9uXG4gICAgICAgICAgICBsYXN0U2hvd2luZ0luZGV4ID0gc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAtIHNsaWRlci5zZXR0aW5ncy5taW5TbGlkZXM7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IHNsaWRlci5jaGlsZHJlbi5lcShsYXN0U2hvd2luZ0luZGV4KS5wb3NpdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBob3Jpem9udGFsIGNhcm91c2VsLCBnb2luZyBwcmV2aW91cyB3aGlsZSBvbiBmaXJzdCBzbGlkZSAoaW5maW5pdGVMb29wIG1vZGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLmNhcm91c2VsICYmIHNsaWRlci5hY3RpdmUubGFzdCAmJiBkaXJlY3Rpb24gPT09ICdwcmV2Jykge1xuICAgICAgICAgIC8vIGdldCB0aGUgbGFzdCBjaGlsZCBwb3NpdGlvblxuICAgICAgICAgIGVxID0gc2xpZGVyLnNldHRpbmdzLm1vdmVTbGlkZXMgPT09IDEgPyBzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzIC0gZ2V0TW92ZUJ5KCkgOiAoKGdldFBhZ2VyUXR5KCkgLSAxKSAqIGdldE1vdmVCeSgpKSAtIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gc2xpZGVyLnNldHRpbmdzLm1heFNsaWRlcyk7XG4gICAgICAgICAgbGFzdENoaWxkID0gZWwuY2hpbGRyZW4oJy5ieC1jbG9uZScpLmVxKGVxKTtcbiAgICAgICAgICBwb3NpdGlvbiA9IGxhc3RDaGlsZC5wb3NpdGlvbigpO1xuICAgICAgICAvLyBpZiBpbmZpbml0ZSBsb29wIGFuZCBcIk5leHRcIiBpcyBjbGlja2VkIG9uIHRoZSBsYXN0IHNsaWRlXG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnbmV4dCcgJiYgc2xpZGVyLmFjdGl2ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vIGdldCB0aGUgbGFzdCBjbG9uZSBwb3NpdGlvblxuICAgICAgICAgIHBvc2l0aW9uID0gZWwuZmluZCgnPiAuYngtY2xvbmUnKS5lcShzbGlkZXIuc2V0dGluZ3MubWF4U2xpZGVzKS5wb3NpdGlvbigpO1xuICAgICAgICAgIHNsaWRlci5hY3RpdmUubGFzdCA9IGZhbHNlO1xuICAgICAgICAvLyBub3JtYWwgbm9uLXplcm8gcmVxdWVzdHNcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZUluZGV4ID49IDApIHtcbiAgICAgICAgICAvL3BhcnNlSW50IGlzIGFwcGxpZWQgdG8gYWxsb3cgZmxvYXRzIGZvciBzbGlkZXMvcGFnZVxuICAgICAgICAgIHJlcXVlc3RFbCA9IHNsaWRlSW5kZXggKiBwYXJzZUludChnZXRNb3ZlQnkoKSk7XG4gICAgICAgICAgcG9zaXRpb24gPSBzbGlkZXIuY2hpbGRyZW4uZXEocmVxdWVzdEVsKS5wb3NpdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSWYgdGhlIHBvc2l0aW9uIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgICogKGUuZy4gaWYgeW91IGRlc3Ryb3kgdGhlIHNsaWRlciBvbiBhIG5leHQgY2xpY2spLFxuICAgICAgICAgKiBpdCBkb2Vzbid0IHRocm93IGFuIGVycm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiAocG9zaXRpb24pICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gc2xpZGVyLnNldHRpbmdzLm1vZGUgPT09ICdob3Jpem9udGFsJyA/IC0ocG9zaXRpb24ubGVmdCAtIG1vdmVCeSkgOiAtcG9zaXRpb24udG9wO1xuICAgICAgICAgIC8vIHBsdWdpbiB2YWx1ZXMgdG8gYmUgYW5pbWF0ZWRcbiAgICAgICAgICBzZXRQb3NpdGlvblByb3BlcnR5KHZhbHVlLCAnc2xpZGUnLCBzbGlkZXIuc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlci53b3JraW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MuYXJpYUhpZGRlbikgeyBhcHBseUFyaWFIaWRkZW5BdHRyaWJ1dGVzKHNsaWRlci5hY3RpdmUuaW5kZXggKiBnZXRNb3ZlQnkoKSk7IH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbnMgdG8gdGhlIG5leHQgc2xpZGUgaW4gdGhlIHNob3dcbiAgICAgKi9cbiAgICBlbC5nb1RvTmV4dFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBpbmZpbml0ZUxvb3AgaXMgZmFsc2UgYW5kIGxhc3QgcGFnZSBpcyBzaG93aW5nLCBkaXNyZWdhcmQgY2FsbFxuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MuaW5maW5pdGVMb29wICYmIHNsaWRlci5hY3RpdmUubGFzdCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBwYWdlckluZGV4ID0gcGFyc2VJbnQoc2xpZGVyLmFjdGl2ZS5pbmRleCkgKyAxO1xuICAgICAgZWwuZ29Ub1NsaWRlKHBhZ2VySW5kZXgsICduZXh0Jyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb25zIHRvIHRoZSBwcmV2IHNsaWRlIGluIHRoZSBzaG93XG4gICAgICovXG4gICAgZWwuZ29Ub1ByZXZTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgaW5maW5pdGVMb29wIGlzIGZhbHNlIGFuZCBsYXN0IHBhZ2UgaXMgc2hvd2luZywgZGlzcmVnYXJkIGNhbGxcbiAgICAgIGlmICghc2xpZGVyLnNldHRpbmdzLmluZmluaXRlTG9vcCAmJiBzbGlkZXIuYWN0aXZlLmluZGV4ID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHBhZ2VySW5kZXggPSBwYXJzZUludChzbGlkZXIuYWN0aXZlLmluZGV4KSAtIDE7XG4gICAgICBlbC5nb1RvU2xpZGUocGFnZXJJbmRleCwgJ3ByZXYnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSBhdXRvIHNob3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcmV2ZW50Q29udHJvbFVwZGF0ZSAoYm9vbGVhbilcbiAgICAgKiAgLSBpZiB0cnVlLCBhdXRvIGNvbnRyb2xzIHN0YXRlIHdpbGwgbm90IGJlIHVwZGF0ZWRcbiAgICAgKi9cbiAgICBlbC5zdGFydEF1dG8gPSBmdW5jdGlvbihwcmV2ZW50Q29udHJvbFVwZGF0ZSkge1xuICAgICAgLy8gaWYgYW4gaW50ZXJ2YWwgYWxyZWFkeSBleGlzdHMsIGRpc3JlZ2FyZCBjYWxsXG4gICAgICBpZiAoc2xpZGVyLmludGVydmFsKSB7IHJldHVybjsgfVxuICAgICAgLy8gY3JlYXRlIGFuIGludGVydmFsXG4gICAgICBzbGlkZXIuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICBlbC5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9LCBzbGlkZXIuc2V0dGluZ3MucGF1c2UpO1xuICAgICAgLy8gaWYgYXV0byBjb250cm9scyBhcmUgZGlzcGxheWVkIGFuZCBwcmV2ZW50Q29udHJvbFVwZGF0ZSBpcyBub3QgdHJ1ZVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHMgJiYgcHJldmVudENvbnRyb2xVcGRhdGUgIT09IHRydWUpIHsgdXBkYXRlQXV0b0NvbnRyb2xzKCdzdG9wJyk7IH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU3RvcHMgdGhlIGF1dG8gc2hvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHByZXZlbnRDb250cm9sVXBkYXRlIChib29sZWFuKVxuICAgICAqICAtIGlmIHRydWUsIGF1dG8gY29udHJvbHMgc3RhdGUgd2lsbCBub3QgYmUgdXBkYXRlZFxuICAgICAqL1xuICAgIGVsLnN0b3BBdXRvID0gZnVuY3Rpb24ocHJldmVudENvbnRyb2xVcGRhdGUpIHtcbiAgICAgIC8vIGlmIG5vIGludGVydmFsIGV4aXN0cywgZGlzcmVnYXJkIGNhbGxcbiAgICAgIGlmICghc2xpZGVyLmludGVydmFsKSB7IHJldHVybjsgfVxuICAgICAgLy8gY2xlYXIgdGhlIGludGVydmFsXG4gICAgICBjbGVhckludGVydmFsKHNsaWRlci5pbnRlcnZhbCk7XG4gICAgICBzbGlkZXIuaW50ZXJ2YWwgPSBudWxsO1xuICAgICAgLy8gaWYgYXV0byBjb250cm9scyBhcmUgZGlzcGxheWVkIGFuZCBwcmV2ZW50Q29udHJvbFVwZGF0ZSBpcyBub3QgdHJ1ZVxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5hdXRvQ29udHJvbHMgJiYgcHJldmVudENvbnRyb2xVcGRhdGUgIT09IHRydWUpIHsgdXBkYXRlQXV0b0NvbnRyb2xzKCdzdGFydCcpOyB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY3VycmVudCBzbGlkZSBpbmRleCAoemVyby1iYXNlZClcbiAgICAgKi9cbiAgICBlbC5nZXRDdXJyZW50U2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzbGlkZXIuYWN0aXZlLmluZGV4O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgc2xpZGUgZWxlbWVudFxuICAgICAqL1xuICAgIGVsLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzbGlkZXIuY2hpbGRyZW4uZXEoc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzbGlkZSBlbGVtZW50XG4gICAgICogQHBhcmFtIGluZGV4IChpbnQpXG4gICAgICogIC0gVGhlIGluZGV4ICh6ZXJvLWJhc2VkKSBvZiB0aGUgZWxlbWVudCB5b3Ugd2FudCByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBlbC5nZXRTbGlkZUVsZW1lbnQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbi5lcShpbmRleCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbnVtYmVyIG9mIHNsaWRlcyBpbiBzaG93XG4gICAgICovXG4gICAgZWwuZ2V0U2xpZGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybiBzbGlkZXIud29ya2luZyB2YXJpYWJsZVxuICAgICAqL1xuICAgIGVsLmlzV29ya2luZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWRlci53b3JraW5nO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYWxsIGR5bmFtaWMgc2xpZGVyIGVsZW1lbnRzXG4gICAgICovXG4gICAgZWwucmVkcmF3U2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZXNpemUgYWxsIGNoaWxkcmVuIGluIHJhdGlvIHRvIG5ldyBzY3JlZW4gc2l6ZVxuICAgICAgc2xpZGVyLmNoaWxkcmVuLmFkZChlbC5maW5kKCcuYngtY2xvbmUnKSkub3V0ZXJXaWR0aChnZXRTbGlkZVdpZHRoKCkpO1xuICAgICAgLy8gYWRqdXN0IHRoZSBoZWlnaHRcbiAgICAgIHNsaWRlci52aWV3cG9ydC5jc3MoJ2hlaWdodCcsIGdldFZpZXdwb3J0SGVpZ2h0KCkpO1xuICAgICAgLy8gdXBkYXRlIHRoZSBzbGlkZSBwb3NpdGlvblxuICAgICAgaWYgKCFzbGlkZXIuc2V0dGluZ3MudGlja2VyKSB7IHNldFNsaWRlUG9zaXRpb24oKTsgfVxuICAgICAgLy8gaWYgYWN0aXZlLmxhc3Qgd2FzIHRydWUgYmVmb3JlIHRoZSBzY3JlZW4gcmVzaXplLCB3ZSB3YW50XG4gICAgICAvLyB0byBrZWVwIGl0IGxhc3Qgbm8gbWF0dGVyIHdoYXQgc2NyZWVuIHNpemUgd2UgZW5kIG9uXG4gICAgICBpZiAoc2xpZGVyLmFjdGl2ZS5sYXN0KSB7IHNsaWRlci5hY3RpdmUuaW5kZXggPSBnZXRQYWdlclF0eSgpIC0gMTsgfVxuICAgICAgLy8gaWYgdGhlIGFjdGl2ZSBpbmRleCAocGFnZSkgbm8gbG9uZ2VyIGV4aXN0cyBkdWUgdG8gdGhlIHJlc2l6ZSwgc2ltcGx5IHNldCB0aGUgaW5kZXggYXMgbGFzdFxuICAgICAgaWYgKHNsaWRlci5hY3RpdmUuaW5kZXggPj0gZ2V0UGFnZXJRdHkoKSkgeyBzbGlkZXIuYWN0aXZlLmxhc3QgPSB0cnVlOyB9XG4gICAgICAvLyBpZiBhIHBhZ2VyIGlzIGJlaW5nIGRpc3BsYXllZCBhbmQgYSBjdXN0b20gcGFnZXIgaXMgbm90IGJlaW5nIHVzZWQsIHVwZGF0ZSBpdFxuICAgICAgaWYgKHNsaWRlci5zZXR0aW5ncy5wYWdlciAmJiAhc2xpZGVyLnNldHRpbmdzLnBhZ2VyQ3VzdG9tKSB7XG4gICAgICAgIHBvcHVsYXRlUGFnZXIoKTtcbiAgICAgICAgdXBkYXRlUGFnZXJBY3RpdmUoc2xpZGVyLmFjdGl2ZS5pbmRleCk7XG4gICAgICB9XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmFyaWFIaWRkZW4pIHsgYXBwbHlBcmlhSGlkZGVuQXR0cmlidXRlcyhzbGlkZXIuYWN0aXZlLmluZGV4ICogZ2V0TW92ZUJ5KCkpOyB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIHNsaWRlciAocmV2ZXJ0IGV2ZXJ5dGhpbmcgYmFjayB0byBvcmlnaW5hbCBzdGF0ZSlcbiAgICAgKi9cbiAgICBlbC5kZXN0cm95U2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBkb24ndCBkbyBhbnl0aGluZyBpZiBzbGlkZXIgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcbiAgICAgIGlmICghc2xpZGVyLmluaXRpYWxpemVkKSB7IHJldHVybjsgfVxuICAgICAgc2xpZGVyLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAkKCcuYngtY2xvbmUnLCB0aGlzKS5yZW1vdmUoKTtcbiAgICAgIHNsaWRlci5jaGlsZHJlbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCdvcmlnU3R5bGUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCdzdHlsZScsICQodGhpcykuZGF0YSgnb3JpZ1N0eWxlJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoJCh0aGlzKS5kYXRhKCdvcmlnU3R5bGUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29yaWdTdHlsZScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgIH1cbiAgICAgICQodGhpcykudW53cmFwKCkudW53cmFwKCk7XG4gICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzLmVsKSB7IHNsaWRlci5jb250cm9scy5lbC5yZW1vdmUoKTsgfVxuICAgICAgaWYgKHNsaWRlci5jb250cm9scy5uZXh0KSB7IHNsaWRlci5jb250cm9scy5uZXh0LnJlbW92ZSgpOyB9XG4gICAgICBpZiAoc2xpZGVyLmNvbnRyb2xzLnByZXYpIHsgc2xpZGVyLmNvbnRyb2xzLnByZXYucmVtb3ZlKCk7IH1cbiAgICAgIGlmIChzbGlkZXIucGFnZXJFbCAmJiBzbGlkZXIuc2V0dGluZ3MuY29udHJvbHMgJiYgIXNsaWRlci5zZXR0aW5ncy5wYWdlckN1c3RvbSkgeyBzbGlkZXIucGFnZXJFbC5yZW1vdmUoKTsgfVxuICAgICAgJCgnLmJ4LWNhcHRpb24nLCB0aGlzKS5yZW1vdmUoKTtcbiAgICAgIGlmIChzbGlkZXIuY29udHJvbHMuYXV0b0VsKSB7IHNsaWRlci5jb250cm9scy5hdXRvRWwucmVtb3ZlKCk7IH1cbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmludGVydmFsKTtcbiAgICAgIGlmIChzbGlkZXIuc2V0dGluZ3MucmVzcG9uc2l2ZSkgeyAkKHdpbmRvdykudW5iaW5kKCdyZXNpemUnLCByZXNpemVXaW5kb3cpOyB9XG4gICAgICBpZiAoc2xpZGVyLnNldHRpbmdzLmtleWJvYXJkRW5hYmxlZCkgeyAkKGRvY3VtZW50KS51bmJpbmQoJ2tleWRvd24nLCBrZXlQcmVzcyk7IH1cbiAgICAgIC8vcmVtb3ZlIHNlbGYgcmVmZXJlbmNlIGluIGRhdGFcbiAgICAgICQodGhpcykucmVtb3ZlRGF0YSgnYnhTbGlkZXInKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVsb2FkIHRoZSBzbGlkZXIgKHJldmVydCBhbGwgRE9NIGNoYW5nZXMsIGFuZCByZS1pbml0aWFsaXplKVxuICAgICAqL1xuICAgIGVsLnJlbG9hZFNsaWRlciA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgICBpZiAoc2V0dGluZ3MgIT09IHVuZGVmaW5lZCkgeyBvcHRpb25zID0gc2V0dGluZ3M7IH1cbiAgICAgIGVsLmRlc3Ryb3lTbGlkZXIoKTtcbiAgICAgIGluaXQoKTtcbiAgICAgIC8vc3RvcmUgcmVmZXJlbmNlIHRvIHNlbGYgaW4gb3JkZXIgdG8gYWNjZXNzIHB1YmxpYyBmdW5jdGlvbnMgbGF0ZXJcbiAgICAgICQoZWwpLmRhdGEoJ2J4U2xpZGVyJywgdGhpcyk7XG4gICAgfTtcblxuICAgIGluaXQoKTtcblxuICAgICQoZWwpLmRhdGEoJ2J4U2xpZGVyJywgdGhpcyk7XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjdXJyZW50IGpRdWVyeSBvYmplY3RcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxufSkoalF1ZXJ5KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==