/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

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
      if(head.has('.' + class_array[i]).length === 0) {
        head.append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-medium',
    'foundation-mq-large',
    'foundation-mq-xlarge',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function() {
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
          if (!cont) return context;
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
    if (!init) arr.push('data');
    if (this.namespace.length > 0) arr.push(this.namespace);
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
        should_bind_events = !S(this).data(this.attr_name(true));


    if (S(this.scope).is('[' + this.attr_name() +']')) {
      S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

      if (should_bind_events) {
        this.events(this.scope);
      }

    } else {
      S('[' + this.attr_name() +']', this.scope).each(function () {
        var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
        S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

        if (should_bind_events) {
          self.events(this);
        }
      });
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

  /*
    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function (q) {

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function($) {

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
    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + "CancelAnimationFrame" ] ||
      window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
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

  }( jQuery ));


  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.3.1',

    media_queries : {
      small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global: {
      namespace: undefined
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

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
                $.extend(true, this.libs[lib].settings, args[lib]);
            }
            else if (typeof this.libs[lib].defaults !== 'undefined') {
                $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : new Array(args);    // PATCH: added this line
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

    set_namespace: function () {

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
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) result = func.apply(context, args);
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
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');
          p = [p[0], p.slice(1).join(':')];

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
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
        if(Foundation.media_queries[media] === undefined) {
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
              Foundation.media_queries[media] + '{ ' + rule + ' }');
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

        if (unloaded === 0) {
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
        if (!this.fidx) this.fidx = 0;
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
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

    version : '5.3.1',

    settings : {
      active_class: 'open',
      align: 'bottom',
      is_hover: false,
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

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
              if (settings.is_hover) self.close.call(self, $this);
            }
          }.bind(this), 150);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');

          if (S(e.target).data(self.data_attr()) || S(e.target).parent().data(self.data_attr())) {
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

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class)
            .prev('[' + self.attr_name() + ']')
            .removeClass(self.settings.active_class)
            .removeData('target');

          self.S(this).trigger('closed').trigger('closed.fndtn.dropdown', [dropdown]);
        }
      });
    },

    closeall: function() {
      var self = this;
      $.each(self.S('[' + this.attr_name() + '-content]'), function() {
        self.close.call(self, self.S(this))
      });
    },

    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.active_class), target);
        dropdown.prev('[' + this.attr_name() + ']').addClass(this.settings.active_class);
        dropdown.data('target', target.get(0)).trigger('opened').trigger('opened.fndtn.dropdown', [dropdown, target]);
    },

    data_attr: function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      var dropdown = this.S('#' + target.data(this.data_attr()));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
        if (dropdown.data('target') !== target.get(0))
          this.open.call(this, dropdown, target);
      } else {
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[' + this.attr_name() + '-content].open'),
          target = this.S("[" + this.attr_name() + "='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var left_offset = Math.max((target.width() - dropdown.width()) / 2, 8);
      
      this.clear_idx();

      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: p.top
        });

        dropdown.css(Foundation.rtl ? 'right':'left', left_offset);
      } else {
        var settings = target.data(this.attr_name(true) + '-init') || this.settings;

        this.style(dropdown, target, settings);
      }

      return dropdown;
    },

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
            pip_offset_base = 8;

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
            pip_offset_base = 8;

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

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off: function () {
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

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.3.1',

    settings : {
      open_method: 'move',
      close_on_click: true
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
      } else if (this.settings.open_method === 'overlap') {
        move_class = 'offcanvas-overlap';
      }

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + right_postfix);
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          if (settings.close_on_click) {
            self.hide.call(self, move_class + right_postfix, self.get_wrapper(e));
          }
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, move_class + left_postfix);
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          var settings = self.get_settings(e);
          if (settings.close_on_click) {
            self.hide.call(self, move_class + left_postfix, self.get_wrapper(e));
          }
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, move_class + left_postfix);
          if (right_postfix) self.click_remove_class(e, move_class + right_postfix);
        });

    },

    toggle: function(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      if ($off_canvas.is('.' + class_name)) {
        this.hide(class_name, $off_canvas);
      } else {
        this.show(class_name, $off_canvas);
      }
    },

    show: function(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('open').trigger('open.fndtn.offcanvas');
      $off_canvas.addClass(class_name);
    },

    hide: function(class_name, $off_canvas) {
      $off_canvas = $off_canvas || this.get_wrapper();
      $off_canvas.trigger('close').trigger('close.fndtn.offcanvas');
      $off_canvas.removeClass(class_name);
    },

    click_toggle_class: function(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(class_name, $off_canvas);
    },

    click_remove_class: function(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(class_name, $off_canvas);
    },

    get_settings: function(e) {
      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']');
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },

    get_wrapper: function(e) {
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

  var noop = function() {};

  var Orbit = function(el, settings) {
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


    self.slides = function() {
      return slides_container.children(settings.slide_selector);
    };

    self.slides().first().addClass(settings.active_slide_class);

    self.update_slide_number = function(index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index)+1);
        number_container.find('span:last').text(self.slides().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function(index) {
      var link = $('[data-orbit-link="'+self.slides().eq(index).attr('data-orbit-slide')+'"]');
      link.siblings().removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function() {
      slides_container.wrap('<div class="'+settings.container_class+'"></div>');
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
        self.slides().each(function(idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx).on('click', self.link_bullet);;
          bullets_container.append(bullet);
        });
      }

    };

    self._goto = function(next_idx, start_timer) {
      // if (locked) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof timer === 'object') {timer.restart();}
      var slides = self.slides();

      var dir = 'next';
      locked = true;
      if (next_idx < idx) {dir = 'prev';}
      if (next_idx >= slides.length) {
        if (!settings.circular) return false;
        next_idx = 0;
      } else if (next_idx < 0) {
        if (!settings.circular) return false;
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
      
      var callback = function() {
        var unlock = function() {
          idx = next_idx;
          locked = false;
          if (start_timer === true) {timer = self.create_timer(); timer.start();}
          self.update_slide_number(idx);
          slides_container.trigger('after-slide-change.fndtn.orbit',[{slide_number: idx, total_slides: slides.length}]);
          settings.after_slide_change(idx, slides.length);
        };
        if (slides_container.height() != next.height() && settings.variable_height) {
          slides_container.animate({'height': next.height()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function() {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}        
      };

      if (next.height() > slides_container.height() && settings.variable_height) {
        slides_container.animate({'height': next.height()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };
    
    self.next = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx + 1);
    };
    
    self.prev = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._goto(idx - 1);
    };

    self.link_custom = function(e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != "") {
        var slide = container.find('[data-orbit-slide='+link+']');
        if (slide.index() != -1) {self._goto(slide.index());}
      }
    };

    self.link_bullet = function(e) {    
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != "") {
        if(isNaN(parseInt(index)))
        {
          var slide = container.find('[data-orbit-slide='+index+']');
          if (slide.index() != -1) {self._goto(slide.index() + 1);}
        }
        else
        {
          self._goto(parseInt(index));
        }
      }

    }

    self.timer_callback = function() {
      self._goto(idx + 1, true);
    }
    
    self.compute_dimensions = function() {
      var current = $(self.slides().get(idx));
      var h = current.height();
      if (!settings.variable_height) {
        self.slides().each(function(){
          if ($(this).height() > h) { h = $(this).height(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function() {
      var t = new Timer(
        container.find('.'+settings.timer_container_class), 
        settings, 
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function() {
      if (typeof timer === 'object') timer.stop();
    };

    self.toggle_timer = function() {
      var t = container.find('.'+settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof timer === 'undefined') {timer = self.create_timer();}
        timer.start();     
      }
      else {
        if (typeof timer === 'object') {timer.stop();}
      }
    };

    self.init = function() {
      self.build_markup();
      if (settings.timer) {
        timer = self.create_timer(); 
        Foundation.utils.image_loaded(this.slides().children('img'), timer.start);
      }
      animate = new FadeAnimation(settings, slides_container);
      if (settings.animation === 'slide') 
        animate = new SlideAnimation(settings, slides_container);        

      container.on('click', '.'+settings.next_class, self.next);
      container.on('click', '.'+settings.prev_class, self.prev);

      if (settings.next_on_click) {
        container.on('click', '.'+settings.slides_container_class+' [data-orbit-slide]', self.link_bullet);
      }

      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        container.on('touchstart.fndtn.orbit', function(e) {
          if (!e.touches) {e = e.originalEvent;}
          var data = {
            start_page_x: e.touches[0].pageX,
            start_page_y: e.touches[0].pageY,
            start_time: (new Date()).getTime(),
            delta_x: 0,
            is_scrolling: undefined
          };
          container.data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.orbit', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = container.data('swipe-transition');
          if (typeof data === 'undefined') {data = {};}

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? (idx+1) : (idx-1);
            data.active = true;
            self._goto(direction);
          }
        })
        .on('touchend.fndtn.orbit', function(e) {
          container.data('swipe-transition', {});
          e.stopPropagation();
        })
      }
      container.on('mouseenter.fndtn.orbit', function(e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function(e) {
        if (settings.timer && settings.resume_on_mouseout) {
          timer.start();
        }
      });
      
      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('load resize', self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), function() {
        container.prev('.'+settings.preloader_class).css('display', 'none');
        self.update_slide_number(0);
        self.update_active_link(0);
        slides_container.trigger('ready.fndtn.orbit');
      });
    };

    self.init();
  };

  var Timer = function(el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.'+settings.timer_progress_class),
        start, 
        timeout,
        left = -1;

    this.update_progress = function(w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w+'%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function() {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
    };

    this.start = function() {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width': '100%'}, left, 'linear');
      timeout = setTimeout(function() {
        self.restart();
        callback();
      }, left);
      el.trigger('timer-started.fndtn.orbit')
    };

    this.stop = function() {
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
  
  var SlideAnimation = function(settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';
    var animMargin = {};
    animMargin[margin] = '0%';

    this.next = function(current, next, callback) {
      current.animate({marginLeft:'-100%'}, duration);
      next.animate(animMargin, duration, function() {
        current.css(margin, '100%');
        callback();
      });
    };

    this.prev = function(current, prev, callback) {
      current.animate({marginLeft:'100%'}, duration);
      prev.css(margin, '-100%');
      prev.animate(animMargin, duration, function() {
        current.css(margin, '100%');
        callback();
      });
    };
  };

  var FadeAnimation = function(settings, container) {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]').length === 1);
    var margin = is_rtl ? 'marginRight' : 'marginLeft';

    this.next = function(current, next, callback) {
      next.css({'margin':'0%', 'opacity':'0.01'});
      next.animate({'opacity':'1'}, duration, 'linear', function() {
        current.css('margin', '100%');
        callback();
      });
    };

    this.prev = function(current, prev, callback) {
      prev.css({'margin':'0%', 'opacity':'0.01'});
      prev.animate({'opacity':'1'}, duration, 'linear', function() {
        current.css('margin', '100%');
        callback();
      });
    };
  };


  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '5.3.1',

    settings: {
      animation: 'slide',
      timer_speed: 10000,
      pause_on_hover: true,
      resume_on_mouseout: false,
      next_on_click: true,
      animation_speed: 500,
      stack_on_small: false,
      navigation_arrows: true,
      slide_number: true,
      slide_number_text: 'of',
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      preloader_class: 'preloader',
      slide_selector: '*',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning',
      bullets: true,
      circular: true,
      timer: true,
      variable_height: false,
      swipe: true,
      before_slide_change: noop,
      after_slide_change: noop
    },

    init : function (scope, method, options) {
      var self = this;
      this.bindings(method, options);
    },

    events : function (instance) {
      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
      this.S(instance).data(self.name + '-instance', orbit_instance);
    },

    reflow : function () {
      var self = this;

      if (self.S(self.scope).is('[data-orbit]')) {
        var $el = self.S(self.scope);
        var instance = $el.data(self.name + '-instance');
        instance.compute_dimensions();
      } else {
        self.S('[data-orbit]', self.scope).each(function(idx, el) {
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

    version: '5.3.1',

    settings : {
      index : 0,
      sticky_class : 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      is_hover: true,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all'
    },
    
    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section', this);
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

    is_sticky: function (topbar, topbarContainer, settings) {
      var sticky = topbarContainer.hasClass(settings.sticky_class);

      if (sticky && settings.sticky_on === 'all') {
        return true;
      } else if (sticky && this.small() && settings.sticky_on === 'small') {
        return (matchMedia(Foundation.media_queries.small).matches && !matchMedia(Foundation.media_queries.medium).matches &&
            !matchMedia(Foundation.media_queries.large).matches); 
        //return true;
      } else if (sticky && this.medium() && settings.sticky_on === 'medium') {
        return (matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches &&
            !matchMedia(Foundation.media_queries.large).matches);
        //return true;
      } else if(sticky && this.large() && settings.sticky_on === 'large') {
        return (matchMedia(Foundation.media_queries.small).matches && matchMedia(Foundation.media_queries.medium).matches &&
            matchMedia(Foundation.media_queries.large).matches);
        //return true;
      }

      return false;
    },

    toggle: function (toggleEl) {
      var self = this,
          topbar;

      if (toggleEl) {
        topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left: '0%'});
          $('>.name', section).css({left: '100%'});
        } else {
          section.css({right: '0%'});
          $('>.name', section).css({right: '100%'});
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

            window.scrollTo(0,0);
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
        .on('click.fndtn.topbar','.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]',function (e) {
            var li = $(this).closest('li');
            if(self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown'))
            {
            self.toggle();
            }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if(target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) return;
          if (settings.is_hover && !Modernizr.touch) return;

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
                section = topbar.find('section, .section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
            } else {
              section.css({right: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });
      
      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize').trigger('resize.fndtn.topbar');

      S('body').off('.topbar').on('click.fndtn.topbar touchstart.fndtn.topbar', function (e) {
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
            section = topbar.find('section, .section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
        } else {
          section.css({right: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
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

            if(doToggle) {
              self.toggle(topbar);
            }
        }

        if(self.is_sticky(topbar, stickyContainer, settings)) {
          if(stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if(self.S(document.body).hasClass('f-topbar-fixed')) {
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
          section = self.S('section', topbar);

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href'),
            $titleLi;

        if (!$dropdown.find('.title.back').length) {
          $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');
  
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
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled: true}));
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

      this.S(window).on('scroll', function() {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning: function() {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window), 
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset');
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
}(jQuery, this, this.document));

// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>
(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                activate: function(){}
            }
            //Variables
            var options = $.extend(defaults, options);            
            var opt = options, jtype = opt.type, jfit = opt.fit, jwidth = opt.width, vtabs = 'vertical', accord = 'accordion';
            var hash = window.location.hash;
            var historyApi = !!(window.history && history.replaceState);
            
            //Events
            $(this).bind('tabactivate', function(e, currentTab) {
                if(typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list');
                var respTabsId = $respTabs.attr('id');
                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '100%', margin: '0px' });
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion');
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the h2 markup to accordion title
                var $tabItemh2;
                $respTabs.find('.resp-tab-content').before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");

                var itemCount = 0;
                $respTabs.find('.resp-accordion').each(function () {
                    $tabItemh2 = $(this);
                    var $tabItem = $respTabs.find('.resp-tab-item:eq(' + itemCount + ')');
                    var $accItem = $respTabs.find('.resp-accordion:eq(' + itemCount + ')');
                    $accItem.append($tabItem.html());
                    $accItem.data($tabItem.data());
                    $tabItemh2.attr('aria-controls', 'tab_item-' + (itemCount));
                    itemCount++;
                });

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });
                
                // Show correct content area
                var tabNum = 0;
                if(hash!='') {
                    var matches = hash.match(new RegExp(respTabsId+"([0-9]+)"));
                    if (matches!==null && matches.length===2) {
                        tabNum = parseInt(matches[1],10)-1;
                        if (tabNum > count) {
                            tabNum = 0;
                        }
                    }
                }

                //Active correct tab
                $($respTabs.find('.resp-tab-item')[tabNum]).addClass('resp-tab-active');

                //keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {                  
                    $($respTabs.find('.resp-accordion')[tabNum]).addClass('resp-tab-active');
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active').attr('style', 'display:block');
                }
                //assign proper classes for when tabs mode is activated before making a selection in accordion mode
                else {
                    $($respTabs.find('.resp-tab-content')[tabNum]).addClass('resp-tab-content-active resp-accordion-closed')
                }

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                   
                    var $currentTab = $(this);
                    $currentTab.click(function () {
                        
                        var $currentTab = $(this);
                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active').slideUp('', function () { $(this).addClass('resp-accordion-closed'); });
                            $currentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                        } else {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);
                        
                        //Update Browser History
                        if(historyApi) {
                            var currentHash = window.location.hash;
                            var newHash = respTabsId+(parseInt($tabAria.substring(9),10)+1).toString();
                            if (currentHash!="") {
                                var re = new RegExp(respTabsId+"[0-9]+");
                                if (currentHash.match(re)!=null) {                                    
                                    newHash = currentHash.replace(re,newHash);
                                }
                                else {
                                    newHash = currentHash+"|"+newHash;
                                }
                            }
                            else {
                                newHash = '#'+newHash;
                            }
                            
                            history.replaceState(null,null,newHash);
                        }
                    });
                    
                });
                
                //Window resize function                   
                $(window).resize(function () {
                    $respTabs.find('.resp-accordion-closed').removeAttr('style');
                });
            });
        }
    });
})(jQuery);


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

/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        //eventType = (touch) ? "touchend" : "click",
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {},
        focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") slider.vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) methods.controlNav.setup();

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.setup();

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) methods.pausePlay.setup();

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) methods.asNav.setup();

        // TOUCH
        if (touch && slider.vars.touch) methods.touch();

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture)
                          e.currentTarget._gesture.addPointer(e.pointerId);
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            el.addEventListener('touchstart', onTouchStart, false);

            function onTouchStart(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            }

            function onTouchMove(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            }

            function onTouchEnd(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            }
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var prefixes = ['webkit','moz','ms','o'];

          if ('hidden' in document) return 'hidden';
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document)
            methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
          }
          if (methods.pauseInvisible.visProp) {
            var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                else slider.pause(); //Or just pause
              }
              else {
                if(slider.started) slider.play(); //Initiated before, just play
                else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
              }
            });
          }
        },
        isHidden: function() {
          return document[methods.pauseInvisible.visProp] || false;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) slider.pause();

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");

        // CONTROLNAV
        if (slider.vars.controlNav) methods.controlNav.active();

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) methods.directionNav.update();

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) slider.pause();
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            
            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) clearInterval(slider.animatedSlides);
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) methods.directionNav.update();

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  };
})(jQuery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci5qcyIsImZvdW5kYXRpb24uanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiZm91bmRhdGlvbi5vZmZjYW52YXMuanMiLCJmb3VuZGF0aW9uLm9yYml0LmpzIiwiZm91bmRhdGlvbi50b3BiYXIuanMiLCJlYXN5UmVzcG9uc2l2ZVRhYnMuanMiLCJqcXVlcnkuZWxldmF0ZXpvb20uanMiLCJqcXVlcnkuZmxleHNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5M0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNybUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIE1vZGVybml6ciB2Mi44LjNcbiAqIHd3dy5tb2Rlcm5penIuY29tXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYXJ1ayBBdGVzLCBQYXVsIElyaXNoLCBBbGV4IFNleHRvblxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBCU0QgYW5kIE1JVCBsaWNlbnNlczogd3d3Lm1vZGVybml6ci5jb20vbGljZW5zZS9cbiAqL1xuXG4vKlxuICogTW9kZXJuaXpyIHRlc3RzIHdoaWNoIG5hdGl2ZSBDU1MzIGFuZCBIVE1MNSBmZWF0dXJlcyBhcmUgYXZhaWxhYmxlIGluXG4gKiB0aGUgY3VycmVudCBVQSBhbmQgbWFrZXMgdGhlIHJlc3VsdHMgYXZhaWxhYmxlIHRvIHlvdSBpbiB0d28gd2F5czpcbiAqIGFzIHByb3BlcnRpZXMgb24gYSBnbG9iYWwgTW9kZXJuaXpyIG9iamVjdCwgYW5kIGFzIGNsYXNzZXMgb24gdGhlXG4gKiA8aHRtbD4gZWxlbWVudC4gVGhpcyBpbmZvcm1hdGlvbiBhbGxvd3MgeW91IHRvIHByb2dyZXNzaXZlbHkgZW5oYW5jZVxuICogeW91ciBwYWdlcyB3aXRoIGEgZ3JhbnVsYXIgbGV2ZWwgb2YgY29udHJvbCBvdmVyIHRoZSBleHBlcmllbmNlLlxuICpcbiAqIE1vZGVybml6ciBoYXMgYW4gb3B0aW9uYWwgKG5vdCBpbmNsdWRlZCkgY29uZGl0aW9uYWwgcmVzb3VyY2UgbG9hZGVyXG4gKiBjYWxsZWQgTW9kZXJuaXpyLmxvYWQoKSwgYmFzZWQgb24gWWVwbm9wZS5qcyAoeWVwbm9wZWpzLmNvbSkuXG4gKiBUbyBnZXQgYSBidWlsZCB0aGF0IGluY2x1ZGVzIE1vZGVybml6ci5sb2FkKCksIGFzIHdlbGwgYXMgY2hvb3NpbmdcbiAqIHdoaWNoIHRlc3RzIHRvIGluY2x1ZGUsIGdvIHRvIHd3dy5tb2Rlcm5penIuY29tL2Rvd25sb2FkL1xuICpcbiAqIEF1dGhvcnMgICAgICAgIEZhcnVrIEF0ZXMsIFBhdWwgSXJpc2gsIEFsZXggU2V4dG9uXG4gKiBDb250cmlidXRvcnMgICBSeWFuIFNlZGRvbiwgQmVuIEFsbWFuXG4gKi9cblxud2luZG93Lk1vZGVybml6ciA9IChmdW5jdGlvbiggd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gICAgdmFyIHZlcnNpb24gPSAnMi44LjMnLFxuXG4gICAgTW9kZXJuaXpyID0ge30sXG5cbiAgICAvKj4+Y3NzY2xhc3NlcyovXG4gICAgLy8gb3B0aW9uIGZvciBlbmFibGluZyB0aGUgSFRNTCBjbGFzc2VzIHRvIGJlIGFkZGVkXG4gICAgZW5hYmxlQ2xhc3NlcyA9IHRydWUsXG4gICAgLyo+PmNzc2NsYXNzZXMqL1xuXG4gICAgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBvdXIgXCJtb2Rlcm5penJcIiBlbGVtZW50IHRoYXQgd2UgZG8gbW9zdCBmZWF0dXJlIHRlc3RzIG9uLlxuICAgICAqL1xuICAgIG1vZCA9ICdtb2Rlcm5penInLFxuICAgIG1vZEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG1vZCksXG4gICAgbVN0eWxlID0gbW9kRWxlbS5zdHlsZSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgaW5wdXQgZWxlbWVudCBmb3IgdmFyaW91cyBXZWIgRm9ybXMgZmVhdHVyZSB0ZXN0cy5cbiAgICAgKi9cbiAgICBpbnB1dEVsZW0gLyo+PmlucHV0ZWxlbSovID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSAvKj4+aW5wdXRlbGVtKi8gLFxuXG4gICAgLyo+PnNtaWxlKi9cbiAgICBzbWlsZSA9ICc6KScsXG4gICAgLyo+PnNtaWxlKi9cblxuICAgIHRvU3RyaW5nID0ge30udG9TdHJpbmcsXG5cbiAgICAvLyBUT0RPIDo6IG1ha2UgdGhlIHByZWZpeGVzIG1vcmUgZ3JhbnVsYXJcbiAgICAvKj4+cHJlZml4ZXMqL1xuICAgIC8vIExpc3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIHNldCBmb3IgY3NzIHRlc3RzLiBTZWUgdGlja2V0ICMyMVxuICAgIHByZWZpeGVzID0gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJyksXG4gICAgLyo+PnByZWZpeGVzKi9cblxuICAgIC8qPj5kb21wcmVmaXhlcyovXG4gICAgLy8gRm9sbG93aW5nIHNwZWMgaXMgdG8gZXhwb3NlIHZlbmRvci1zcGVjaWZpYyBzdHlsZSBwcm9wZXJ0aWVzIGFzOlxuICAgIC8vICAgZWxlbS5zdHlsZS5XZWJraXRCb3JkZXJSYWRpdXNcbiAgICAvLyBhbmQgdGhlIGZvbGxvd2luZyB3b3VsZCBiZSBpbmNvcnJlY3Q6XG4gICAgLy8gICBlbGVtLnN0eWxlLndlYmtpdEJvcmRlclJhZGl1c1xuXG4gICAgLy8gV2Via2l0IGdob3N0cyB0aGVpciBwcm9wZXJ0aWVzIGluIGxvd2VyY2FzZSBidXQgT3BlcmEgJiBNb3ogZG8gbm90LlxuICAgIC8vIE1pY3Jvc29mdCB1c2VzIGEgbG93ZXJjYXNlIGBtc2AgaW5zdGVhZCBvZiB0aGUgY29ycmVjdCBgTXNgIGluIElFOCtcbiAgICAvLyAgIGVyaWsuZWFlLm5ldC9hcmNoaXZlcy8yMDA4LzAzLzEwLzIxLjQ4LjEwL1xuXG4gICAgLy8gTW9yZSBoZXJlOiBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzL2lzc3VlLzIxXG4gICAgb21QcmVmaXhlcyA9ICdXZWJraXQgTW96IE8gbXMnLFxuXG4gICAgY3Nzb21QcmVmaXhlcyA9IG9tUHJlZml4ZXMuc3BsaXQoJyAnKSxcblxuICAgIGRvbVByZWZpeGVzID0gb21QcmVmaXhlcy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJyksXG4gICAgLyo+PmRvbXByZWZpeGVzKi9cblxuICAgIC8qPj5ucyovXG4gICAgbnMgPSB7J3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyd9LFxuICAgIC8qPj5ucyovXG5cbiAgICB0ZXN0cyA9IHt9LFxuICAgIGlucHV0cyA9IHt9LFxuICAgIGF0dHJzID0ge30sXG5cbiAgICBjbGFzc2VzID0gW10sXG5cbiAgICBzbGljZSA9IGNsYXNzZXMuc2xpY2UsXG5cbiAgICBmZWF0dXJlTmFtZSwgLy8gdXNlZCBpbiB0ZXN0aW5nIGxvb3BcblxuXG4gICAgLyo+PnRlc3RzdHlsZXMqL1xuICAgIC8vIEluamVjdCBlbGVtZW50IHdpdGggc3R5bGUgZWxlbWVudCBhbmQgc29tZSBDU1MgcnVsZXNcbiAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyA9IGZ1bmN0aW9uKCBydWxlLCBjYWxsYmFjaywgbm9kZXMsIHRlc3RuYW1lcyApIHtcblxuICAgICAgdmFyIHN0eWxlLCByZXQsIG5vZGUsIGRvY092ZXJmbG93LFxuICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgIC8vIEFmdGVyIHBhZ2UgbG9hZCBpbmplY3RpbmcgYSBmYWtlIGJvZHkgZG9lc24ndCB3b3JrIHNvIGNoZWNrIGlmIGJvZHkgZXhpc3RzXG4gICAgICAgICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgLy8gSUU2IGFuZCA3IHdvbid0IHJldHVybiBvZmZzZXRXaWR0aCBvciBvZmZzZXRIZWlnaHQgdW5sZXNzIGl0J3MgaW4gdGhlIGJvZHkgZWxlbWVudCwgc28gd2UgZmFrZSBpdC5cbiAgICAgICAgICBmYWtlQm9keSA9IGJvZHkgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuXG4gICAgICBpZiAoIHBhcnNlSW50KG5vZGVzLCAxMCkgKSB7XG4gICAgICAgICAgLy8gSW4gb3JkZXIgbm90IHRvIGdpdmUgZmFsc2UgcG9zaXRpdmVzIHdlIGNyZWF0ZSBhIG5vZGUgZm9yIGVhY2ggdGVzdFxuICAgICAgICAgIC8vIFRoaXMgYWxzbyBhbGxvd3MgdGhlIG1ldGhvZCB0byBzY2FsZSBmb3IgdW5zcGVjaWZpZWQgdXNlc1xuICAgICAgICAgIHdoaWxlICggbm9kZXMtLSApIHtcbiAgICAgICAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gdGVzdG5hbWVzID8gdGVzdG5hbWVzW25vZGVzXSA6IG1vZCArIChub2RlcyArIDEpO1xuICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyA8c3R5bGU+IGVsZW1lbnRzIGluIElFNi05IGFyZSBjb25zaWRlcmVkICdOb1Njb3BlJyBlbGVtZW50cyBhbmQgdGhlcmVmb3JlIHdpbGwgYmUgcmVtb3ZlZFxuICAgICAgLy8gd2hlbiBpbmplY3RlZCB3aXRoIGlubmVySFRNTC4gVG8gZ2V0IGFyb3VuZCB0aGlzIHlvdSBuZWVkIHRvIHByZXBlbmQgdGhlICdOb1Njb3BlJyBlbGVtZW50XG4gICAgICAvLyB3aXRoIGEgJ3Njb3BlZCcgZWxlbWVudCwgaW4gb3VyIGNhc2UgdGhlIHNvZnQtaHlwaGVuIGVudGl0eSBhcyBpdCB3b24ndCBtZXNzIHdpdGggb3VyIG1lYXN1cmVtZW50cy5cbiAgICAgIC8vIG1zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMzODk3JTI4VlMuODUlMjkuYXNweFxuICAgICAgLy8gRG9jdW1lbnRzIHNlcnZlZCBhcyB4bWwgd2lsbCB0aHJvdyBpZiB1c2luZyAmc2h5OyBzbyB1c2UgeG1sIGZyaWVuZGx5IGVuY29kZWQgdmVyc2lvbi4gU2VlIGlzc3VlICMyNzdcbiAgICAgIHN0eWxlID0gWycmIzE3MzsnLCc8c3R5bGUgaWQ9XCJzJywgbW9kLCAnXCI+JywgcnVsZSwgJzwvc3R5bGU+J10uam9pbignJyk7XG4gICAgICBkaXYuaWQgPSBtb2Q7XG4gICAgICAvLyBJRTYgd2lsbCBmYWxzZSBwb3NpdGl2ZSBvbiBzb21lIHRlc3RzIGR1ZSB0byB0aGUgc3R5bGUgZWxlbWVudCBpbnNpZGUgdGhlIHRlc3QgZGl2IHNvbWVob3cgaW50ZXJmZXJpbmcgb2Zmc2V0SGVpZ2h0LCBzbyBpbnNlcnQgaXQgaW50byBib2R5IG9yIGZha2Vib2R5LlxuICAgICAgLy8gT3BlcmEgd2lsbCBhY3QgYWxsIHF1aXJreSB3aGVuIGluamVjdGluZyBlbGVtZW50cyBpbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBwYWdlIGlzIHNlcnZlZCBhcyB4bWwsIG5lZWRzIGZha2Vib2R5IHRvby4gIzI3MFxuICAgICAgKGJvZHkgPyBkaXYgOiBmYWtlQm9keSkuaW5uZXJIVE1MICs9IHN0eWxlO1xuICAgICAgZmFrZUJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgIGlmICggIWJvZHkgKSB7XG4gICAgICAgICAgLy9hdm9pZCBjcmFzaGluZyBJRTgsIGlmIGJhY2tncm91bmQgaW1hZ2UgaXMgdXNlZFxuICAgICAgICAgIGZha2VCb2R5LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgICAgICAvL1NhZmFyaSA1LjEzLzUuMS40IE9TWCBzdG9wcyBsb2FkaW5nIGlmIDo6LXdlYmtpdC1zY3JvbGxiYXIgaXMgdXNlZCBhbmQgc2Nyb2xsYmFycyBhcmUgdmlzaWJsZVxuICAgICAgICAgIGZha2VCb2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgZG9jT3ZlcmZsb3cgPSBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xuICAgICAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICBkb2NFbGVtZW50LmFwcGVuZENoaWxkKGZha2VCb2R5KTtcbiAgICAgIH1cblxuICAgICAgcmV0ID0gY2FsbGJhY2soZGl2LCBydWxlKTtcbiAgICAgIC8vIElmIHRoaXMgaXMgZG9uZSBhZnRlciBwYWdlIGxvYWQgd2UgZG9uJ3Qgd2FudCB0byByZW1vdmUgdGhlIGJvZHkgc28gY2hlY2sgaWYgYm9keSBleGlzdHNcbiAgICAgIGlmICggIWJvZHkgKSB7XG4gICAgICAgICAgZmFrZUJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmYWtlQm9keSk7XG4gICAgICAgICAgZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY092ZXJmbG93O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gISFyZXQ7XG5cbiAgICB9LFxuICAgIC8qPj50ZXN0c3R5bGVzKi9cblxuICAgIC8qPj5tcSovXG4gICAgLy8gYWRhcHRlZCBmcm9tIG1hdGNoTWVkaWEgcG9seWZpbGxcbiAgICAvLyBieSBTY290dCBKZWhsIGFuZCBQYXVsIElyaXNoXG4gICAgLy8gZ2lzdC5naXRodWIuY29tLzc4Njc2OFxuICAgIHRlc3RNZWRpYVF1ZXJ5ID0gZnVuY3Rpb24oIG1xICkge1xuXG4gICAgICB2YXIgbWF0Y2hNZWRpYSA9IHdpbmRvdy5tYXRjaE1lZGlhIHx8IHdpbmRvdy5tc01hdGNoTWVkaWE7XG4gICAgICBpZiAoIG1hdGNoTWVkaWEgKSB7XG4gICAgICAgIHJldHVybiBtYXRjaE1lZGlhKG1xKSAmJiBtYXRjaE1lZGlhKG1xKS5tYXRjaGVzIHx8IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgYm9vbDtcblxuICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoJ0BtZWRpYSAnICsgbXEgKyAnIHsgIycgKyBtb2QgKyAnIHsgcG9zaXRpb246IGFic29sdXRlOyB9IH0nLCBmdW5jdGlvbiggbm9kZSApIHtcbiAgICAgICAgYm9vbCA9ICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/XG4gICAgICAgICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpIDpcbiAgICAgICAgICAgICAgICAgIG5vZGUuY3VycmVudFN0eWxlKVsncG9zaXRpb24nXSA9PSAnYWJzb2x1dGUnO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBib29sO1xuXG4gICAgIH0sXG4gICAgIC8qPj5tcSovXG5cblxuICAgIC8qPj5oYXNldmVudCovXG4gICAgLy9cbiAgICAvLyBpc0V2ZW50U3VwcG9ydGVkIGRldGVybWluZXMgaWYgYSBnaXZlbiBlbGVtZW50IHN1cHBvcnRzIHRoZSBnaXZlbiBldmVudFxuICAgIC8vIGthbmdheC5naXRodWIuY29tL2lzZXZlbnRzdXBwb3J0ZWQvXG4gICAgLy9cbiAgICAvLyBUaGUgZm9sbG93aW5nIHJlc3VsdHMgYXJlIGtub3duIGluY29ycmVjdHM6XG4gICAgLy8gICBNb2Rlcm5penIuaGFzRXZlbnQoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsIGVsZW0pIC8vIGZhbHNlIG5lZ2F0aXZlXG4gICAgLy8gICBNb2Rlcm5penIuaGFzRXZlbnQoXCJ0ZXh0SW5wdXRcIikgLy8gaW4gV2Via2l0LiBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzMzM1xuICAgIC8vICAgLi4uXG4gICAgaXNFdmVudFN1cHBvcnRlZCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIFRBR05BTUVTID0ge1xuICAgICAgICAnc2VsZWN0JzogJ2lucHV0JywgJ2NoYW5nZSc6ICdpbnB1dCcsXG4gICAgICAgICdzdWJtaXQnOiAnZm9ybScsICdyZXNldCc6ICdmb3JtJyxcbiAgICAgICAgJ2Vycm9yJzogJ2ltZycsICdsb2FkJzogJ2ltZycsICdhYm9ydCc6ICdpbWcnXG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBpc0V2ZW50U3VwcG9ydGVkKCBldmVudE5hbWUsIGVsZW1lbnQgKSB7XG5cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChUQUdOQU1FU1tldmVudE5hbWVdIHx8ICdkaXYnKTtcbiAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZTtcblxuICAgICAgICAvLyBXaGVuIHVzaW5nIGBzZXRBdHRyaWJ1dGVgLCBJRSBza2lwcyBcInVubG9hZFwiLCBXZWJLaXQgc2tpcHMgXCJ1bmxvYWRcIiBhbmQgXCJyZXNpemVcIiwgd2hlcmVhcyBgaW5gIFwiY2F0Y2hlc1wiIHRob3NlXG4gICAgICAgIHZhciBpc1N1cHBvcnRlZCA9IGV2ZW50TmFtZSBpbiBlbGVtZW50O1xuXG4gICAgICAgIGlmICggIWlzU3VwcG9ydGVkICkge1xuICAgICAgICAgIC8vIElmIGl0IGhhcyBubyBgc2V0QXR0cmlidXRlYCAoaS5lLiBkb2Vzbid0IGltcGxlbWVudCBOb2RlIGludGVyZmFjZSksIHRyeSBnZW5lcmljIGVsZW1lbnRcbiAgICAgICAgICBpZiAoICFlbGVtZW50LnNldEF0dHJpYnV0ZSApIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBlbGVtZW50LnNldEF0dHJpYnV0ZSAmJiBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSApIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJycpO1xuICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBpcyhlbGVtZW50W2V2ZW50TmFtZV0sICdmdW5jdGlvbicpO1xuXG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0eSB3YXMgY3JlYXRlZCwgXCJyZW1vdmUgaXRcIiAoYnkgc2V0dGluZyB2YWx1ZSB0byBgdW5kZWZpbmVkYClcbiAgICAgICAgICAgIGlmICggIWlzKGVsZW1lbnRbZXZlbnROYW1lXSwgJ3VuZGVmaW5lZCcpICkge1xuICAgICAgICAgICAgICBlbGVtZW50W2V2ZW50TmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQgPSBudWxsO1xuICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNFdmVudFN1cHBvcnRlZDtcbiAgICB9KSgpLFxuICAgIC8qPj5oYXNldmVudCovXG5cbiAgICAvLyBUT0RPIDo6IEFkZCBmbGFnIGZvciBoYXNvd25wcm9wID8gZGlkbid0IGxhc3QgdGltZVxuXG4gICAgLy8gaGFzT3duUHJvcGVydHkgc2hpbSBieSBrYW5nYXggbmVlZGVkIGZvciBTYWZhcmkgMi4wIHN1cHBvcnRcbiAgICBfaGFzT3duUHJvcGVydHkgPSAoe30pLmhhc093blByb3BlcnR5LCBoYXNPd25Qcm9wO1xuXG4gICAgaWYgKCAhaXMoX2hhc093blByb3BlcnR5LCAndW5kZWZpbmVkJykgJiYgIWlzKF9oYXNPd25Qcm9wZXJ0eS5jYWxsLCAndW5kZWZpbmVkJykgKSB7XG4gICAgICBoYXNPd25Qcm9wID0gZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoYXNPd25Qcm9wID0gZnVuY3Rpb24gKG9iamVjdCwgcHJvcGVydHkpIHsgLyogeWVzLCB0aGlzIGNhbiBnaXZlIGZhbHNlIHBvc2l0aXZlcy9uZWdhdGl2ZXMsIGJ1dCBtb3N0IG9mIHRoZSB0aW1lIHdlIGRvbid0IGNhcmUgYWJvdXQgdGhvc2UgKi9cbiAgICAgICAgcmV0dXJuICgocHJvcGVydHkgaW4gb2JqZWN0KSAmJiBpcyhvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlW3Byb3BlcnR5XSwgJ3VuZGVmaW5lZCcpKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQWRhcHRlZCBmcm9tIEVTNS1zaGltIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvZXM1LXNoaW0vYmxvYi9tYXN0ZXIvZXM1LXNoaW0uanNcbiAgICAvLyBlczUuZ2l0aHViLmNvbS8jeDE1LjMuNC41XG5cbiAgICBpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBib3VuZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuXG4gICAgICAgICAgICAgIHZhciBGID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAgICAgICBGLnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gbmV3IEYoKTtcblxuICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgc2VsZixcbiAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBib3VuZDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Q3NzIGFwcGxpZXMgZ2l2ZW4gc3R5bGVzIHRvIHRoZSBNb2Rlcm5penIgRE9NIG5vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0Q3NzKCBzdHIgKSB7XG4gICAgICAgIG1TdHlsZS5jc3NUZXh0ID0gc3RyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENzc0FsbCBleHRyYXBvbGF0ZXMgYWxsIHZlbmRvci1zcGVjaWZpYyBjc3Mgc3RyaW5ncy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRDc3NBbGwoIHN0cjEsIHN0cjIgKSB7XG4gICAgICAgIHJldHVybiBzZXRDc3MocHJlZml4ZXMuam9pbihzdHIxICsgJzsnKSArICggc3RyMiB8fCAnJyApKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpcyByZXR1cm5zIGEgYm9vbGVhbiBmb3IgaWYgdHlwZW9mIG9iaiBpcyBleGFjdGx5IHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXMoIG9iaiwgdHlwZSApIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IHR5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29udGFpbnMgcmV0dXJucyBhIGJvb2xlYW4gZm9yIGlmIHN1YnN0ciBpcyBmb3VuZCB3aXRoaW4gc3RyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKCBzdHIsIHN1YnN0ciApIHtcbiAgICAgICAgcmV0dXJuICEhfignJyArIHN0cikuaW5kZXhPZihzdWJzdHIpO1xuICAgIH1cblxuICAgIC8qPj50ZXN0cHJvcCovXG5cbiAgICAvLyB0ZXN0UHJvcHMgaXMgYSBnZW5lcmljIENTUyAvIERPTSBwcm9wZXJ0eSB0ZXN0LlxuXG4gICAgLy8gSW4gdGVzdGluZyBzdXBwb3J0IGZvciBhIGdpdmVuIENTUyBwcm9wZXJ0eSwgaXQncyBsZWdpdCB0byB0ZXN0OlxuICAgIC8vICAgIGBlbGVtLnN0eWxlW3N0eWxlTmFtZV0gIT09IHVuZGVmaW5lZGBcbiAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgc3VwcG9ydGVkIGl0IHdpbGwgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyxcbiAgICAvLyBpZiB1bnN1cHBvcnRlZCBpdCB3aWxsIHJldHVybiB1bmRlZmluZWQuXG5cbiAgICAvLyBXZSdsbCB0YWtlIGFkdmFudGFnZSBvZiB0aGlzIHF1aWNrIHRlc3QgYW5kIHNraXAgc2V0dGluZyBhIHN0eWxlXG4gICAgLy8gb24gb3VyIG1vZGVybml6ciBlbGVtZW50LCBidXQgaW5zdGVhZCBqdXN0IHRlc3RpbmcgdW5kZWZpbmVkIHZzXG4gICAgLy8gZW1wdHkgc3RyaW5nLlxuXG4gICAgLy8gQmVjYXVzZSB0aGUgdGVzdGluZyBvZiB0aGUgQ1NTIHByb3BlcnR5IG5hbWVzICh3aXRoIFwiLVwiLCBhc1xuICAgIC8vIG9wcG9zZWQgdG8gdGhlIGNhbWVsQ2FzZSBET00gcHJvcGVydGllcykgaXMgbm9uLXBvcnRhYmxlIGFuZFxuICAgIC8vIG5vbi1zdGFuZGFyZCBidXQgd29ya3MgaW4gV2ViS2l0IGFuZCBJRSAoYnV0IG5vdCBHZWNrbyBvciBPcGVyYSksXG4gICAgLy8gd2UgZXhwbGljaXRseSByZWplY3QgcHJvcGVydGllcyB3aXRoIGRhc2hlcyBzbyB0aGF0IGF1dGhvcnNcbiAgICAvLyBkZXZlbG9waW5nIGluIFdlYktpdCBvciBJRSBmaXJzdCBkb24ndCBlbmQgdXAgd2l0aFxuICAgIC8vIGJyb3dzZXItc3BlY2lmaWMgY29udGVudCBieSBhY2NpZGVudC5cblxuICAgIGZ1bmN0aW9uIHRlc3RQcm9wcyggcHJvcHMsIHByZWZpeGVkICkge1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwcm9wcyApIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgICAgICBpZiAoICFjb250YWlucyhwcm9wLCBcIi1cIikgJiYgbVN0eWxlW3Byb3BdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVkID09ICdwZngnID8gcHJvcCA6IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKj4+dGVzdHByb3AqL1xuXG4gICAgLy8gVE9ETyA6OiBhZGQgdGVzdERPTVByb3BzXG4gICAgLyoqXG4gICAgICogdGVzdERPTVByb3BzIGlzIGEgZ2VuZXJpYyBET00gcHJvcGVydHkgdGVzdDsgaWYgYSBicm93c2VyIHN1cHBvcnRzXG4gICAgICogICBhIGNlcnRhaW4gcHJvcGVydHksIGl0IHdvbid0IHJldHVybiB1bmRlZmluZWQgZm9yIGl0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRlc3RET01Qcm9wcyggcHJvcHMsIG9iaiwgZWxlbSApIHtcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcHJvcHMgKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG9ialtwcm9wc1tpXV07XG4gICAgICAgICAgICBpZiAoIGl0ZW0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBwcm9wZXJ0eSBuYW1lIGFzIGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IGZhbHNlKSByZXR1cm4gcHJvcHNbaV07XG5cbiAgICAgICAgICAgICAgICAvLyBsZXQncyBiaW5kIGEgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoaXMoaXRlbSwgJ2Z1bmN0aW9uJykpe1xuICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBhdXRvYmluZCB1bmxlc3Mgb3ZlcnJpZGVcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmJpbmQoZWxlbSB8fCBvYmopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdW5ib3VuZCBmdW5jdGlvbiBvciBvYmogb3IgdmFsdWVcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyo+PnRlc3RhbGxwcm9wcyovXG4gICAgLyoqXG4gICAgICogdGVzdFByb3BzQWxsIHRlc3RzIGEgbGlzdCBvZiBET00gcHJvcGVydGllcyB3ZSB3YW50IHRvIGNoZWNrIGFnYWluc3QuXG4gICAgICogICBXZSBzcGVjaWZ5IGxpdGVyYWxseSBBTEwgcG9zc2libGUgKGtub3duIGFuZC9vciBsaWtlbHkpIHByb3BlcnRpZXMgb25cbiAgICAgKiAgIHRoZSBlbGVtZW50IGluY2x1ZGluZyB0aGUgbm9uLXZlbmRvciBwcmVmaXhlZCBvbmUsIGZvciBmb3J3YXJkLVxuICAgICAqICAgY29tcGF0aWJpbGl0eS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0ZXN0UHJvcHNBbGwoIHByb3AsIHByZWZpeGVkLCBlbGVtICkge1xuXG4gICAgICAgIHZhciB1Y1Byb3AgID0gcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSksXG4gICAgICAgICAgICBwcm9wcyAgID0gKHByb3AgKyAnICcgKyBjc3NvbVByZWZpeGVzLmpvaW4odWNQcm9wICsgJyAnKSArIHVjUHJvcCkuc3BsaXQoJyAnKTtcblxuICAgICAgICAvLyBkaWQgdGhleSBjYWxsIC5wcmVmaXhlZCgnYm94U2l6aW5nJykgb3IgYXJlIHdlIGp1c3QgdGVzdGluZyBhIHByb3A/XG4gICAgICAgIGlmKGlzKHByZWZpeGVkLCBcInN0cmluZ1wiKSB8fCBpcyhwcmVmaXhlZCwgXCJ1bmRlZmluZWRcIikpIHtcbiAgICAgICAgICByZXR1cm4gdGVzdFByb3BzKHByb3BzLCBwcmVmaXhlZCk7XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlLCB0aGV5IGNhbGxlZCAucHJlZml4ZWQoJ3JlcXVlc3RBbmltYXRpb25GcmFtZScsIHdpbmRvd1ssIGVsZW1dKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzID0gKHByb3AgKyAnICcgKyAoZG9tUHJlZml4ZXMpLmpvaW4odWNQcm9wICsgJyAnKSArIHVjUHJvcCkuc3BsaXQoJyAnKTtcbiAgICAgICAgICByZXR1cm4gdGVzdERPTVByb3BzKHByb3BzLCBwcmVmaXhlZCwgZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyo+PnRlc3RhbGxwcm9wcyovXG5cblxuICAgIC8qKlxuICAgICAqIFRlc3RzXG4gICAgICogLS0tLS1cbiAgICAgKi9cblxuICAgIC8vIFRoZSAqbmV3KiBmbGV4Ym94XG4gICAgLy8gZGV2LnczLm9yZy9jc3N3Zy9jc3MzLWZsZXhib3hcblxuICAgIHRlc3RzWydmbGV4Ym94J10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2ZsZXhXcmFwJyk7XG4gICAgfTtcblxuICAgIC8vIFRoZSAqb2xkKiBmbGV4Ym94XG4gICAgLy8gd3d3LnczLm9yZy9UUi8yMDA5L1dELWNzczMtZmxleGJveC0yMDA5MDcyMy9cblxuICAgIHRlc3RzWydmbGV4Ym94bGVnYWN5J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYm94RGlyZWN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8vIE9uIHRoZSBTNjAgYW5kIEJCIFN0b3JtLCBnZXRDb250ZXh0IGV4aXN0cywgYnV0IGFsd2F5cyByZXR1cm5zIHVuZGVmaW5lZFxuICAgIC8vIHNvIHdlIGFjdHVhbGx5IGhhdmUgdG8gY2FsbCBnZXRDb250ZXh0KCkgdG8gdmVyaWZ5XG4gICAgLy8gZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy9pc3N1ZS85Ny9cblxuICAgIHRlc3RzWydjYW52YXMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICByZXR1cm4gISEoZWxlbS5nZXRDb250ZXh0ICYmIGVsZW0uZ2V0Q29udGV4dCgnMmQnKSk7XG4gICAgfTtcblxuICAgIHRlc3RzWydjYW52YXN0ZXh0J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhKE1vZGVybml6clsnY2FudmFzJ10gJiYgaXMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKS5maWxsVGV4dCwgJ2Z1bmN0aW9uJykpO1xuICAgIH07XG5cbiAgICAvLyB3ZWJrLml0LzcwMTE3IGlzIHRyYWNraW5nIGEgbGVnaXQgV2ViR0wgZmVhdHVyZSBkZXRlY3QgcHJvcG9zYWxcblxuICAgIC8vIFdlIGRvIGEgc29mdCBkZXRlY3Qgd2hpY2ggbWF5IGZhbHNlIHBvc2l0aXZlIGluIG9yZGVyIHRvIGF2b2lkXG4gICAgLy8gYW4gZXhwZW5zaXZlIGNvbnRleHQgY3JlYXRpb246IGJ1Z3ppbC5sYS83MzI0NDFcblxuICAgIHRlc3RzWyd3ZWJnbCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogVGhlIE1vZGVybml6ci50b3VjaCB0ZXN0IG9ubHkgaW5kaWNhdGVzIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzXG4gICAgICogICAgdG91Y2ggZXZlbnRzLCB3aGljaCBkb2VzIG5vdCBuZWNlc3NhcmlseSByZWZsZWN0IGEgdG91Y2hzY3JlZW5cbiAgICAgKiAgICBkZXZpY2UsIGFzIGV2aWRlbmNlZCBieSB0YWJsZXRzIHJ1bm5pbmcgV2luZG93cyA3IG9yLCBhbGFzLFxuICAgICAqICAgIHRoZSBQYWxtIFByZSAvIFdlYk9TICh0b3VjaCkgcGhvbmVzLlxuICAgICAqXG4gICAgICogQWRkaXRpb25hbGx5LCBDaHJvbWUgKGRlc2t0b3ApIHVzZWQgdG8gbGllIGFib3V0IGl0cyBzdXBwb3J0IG9uIHRoaXMsXG4gICAgICogICAgYnV0IHRoYXQgaGFzIHNpbmNlIGJlZW4gcmVjdGlmaWVkOiBjcmJ1Zy5jb20vMzY0MTVcbiAgICAgKlxuICAgICAqIFdlIGFsc28gdGVzdCBmb3IgRmlyZWZveCA0IE11bHRpdG91Y2ggU3VwcG9ydC5cbiAgICAgKlxuICAgICAqIEZvciBtb3JlIGluZm8sIHNlZTogbW9kZXJuaXpyLmdpdGh1Yi5jb20vTW9kZXJuaXpyL3RvdWNoLmh0bWxcbiAgICAgKi9cblxuICAgIHRlc3RzWyd0b3VjaCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib29sO1xuXG4gICAgICAgIGlmKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgICAgIGJvb2wgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKFsnQG1lZGlhICgnLHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSxtb2QsJyknLCd7I21vZGVybml6cnt0b3A6OXB4O3Bvc2l0aW9uOmFic29sdXRlfX0nXS5qb2luKCcnKSwgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgICAgICBib29sID0gbm9kZS5vZmZzZXRUb3AgPT09IDk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuXG5cbiAgICAvLyBnZW9sb2NhdGlvbiBpcyBvZnRlbiBjb25zaWRlcmVkIGEgdHJpdmlhbCBmZWF0dXJlIGRldGVjdC4uLlxuICAgIC8vIFR1cm5zIG91dCwgaXQncyBxdWl0ZSB0cmlja3kgdG8gZ2V0IHJpZ2h0OlxuICAgIC8vXG4gICAgLy8gVXNpbmcgISFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24gZG9lcyB0d28gdGhpbmdzIHdlIGRvbid0IHdhbnQuIEl0OlxuICAgIC8vICAgMS4gTGVha3MgbWVtb3J5IGluIElFOTogZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy81MTNcbiAgICAvLyAgIDIuIERpc2FibGVzIHBhZ2UgY2FjaGluZyBpbiBXZWJLaXQ6IHdlYmsuaXQvNDM5NTZcbiAgICAvL1xuICAgIC8vIE1lYW53aGlsZSwgaW4gRmlyZWZveCA8IDgsIGFuIGFib3V0OmNvbmZpZyBzZXR0aW5nIGNvdWxkIGV4cG9zZVxuICAgIC8vIGEgZmFsc2UgcG9zaXRpdmUgdGhhdCB3b3VsZCB0aHJvdyBhbiBleGNlcHRpb246IGJ1Z3ppbC5sYS82ODgxNThcblxuICAgIHRlc3RzWydnZW9sb2NhdGlvbiddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnZ2VvbG9jYXRpb24nIGluIG5hdmlnYXRvcjtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1sncG9zdG1lc3NhZ2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhd2luZG93LnBvc3RNZXNzYWdlO1xuICAgIH07XG5cblxuICAgIC8vIENocm9tZSBpbmNvZ25pdG8gbW9kZSB1c2VkIHRvIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHVzaW5nIG9wZW5EYXRhYmFzZVxuICAgIC8vIEl0IGRvZXNuJ3QgYW55bW9yZS5cbiAgICB0ZXN0c1snd2Vic3FsZGF0YWJhc2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhd2luZG93Lm9wZW5EYXRhYmFzZTtcbiAgICB9O1xuXG4gICAgLy8gVmVuZG9ycyBoYWQgaW5jb25zaXN0ZW50IHByZWZpeGluZyB3aXRoIHRoZSBleHBlcmltZW50YWwgSW5kZXhlZCBEQjpcbiAgICAvLyAtIFdlYmtpdCdzIGltcGxlbWVudGF0aW9uIGlzIGFjY2Vzc2libGUgdGhyb3VnaCB3ZWJraXRJbmRleGVkREJcbiAgICAvLyAtIEZpcmVmb3ggc2hpcHBlZCBtb3pfaW5kZXhlZERCIGJlZm9yZSBGRjRiOSwgYnV0IHNpbmNlIHRoZW4gaGFzIGJlZW4gbW96SW5kZXhlZERCXG4gICAgLy8gRm9yIHNwZWVkLCB3ZSBkb24ndCB0ZXN0IHRoZSBsZWdhY3kgKGFuZCBiZXRhLW9ubHkpIGluZGV4ZWREQlxuICAgIHRlc3RzWydpbmRleGVkREInXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhdGVzdFByb3BzQWxsKFwiaW5kZXhlZERCXCIsIHdpbmRvdyk7XG4gICAgfTtcblxuICAgIC8vIGRvY3VtZW50TW9kZSBsb2dpYyBmcm9tIFlVSSB0byBmaWx0ZXIgb3V0IElFOCBDb21wYXQgTW9kZVxuICAgIC8vICAgd2hpY2ggZmFsc2UgcG9zaXRpdmVzLlxuICAgIHRlc3RzWydoYXNoY2hhbmdlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpc0V2ZW50U3VwcG9ydGVkKCdoYXNoY2hhbmdlJywgd2luZG93KSAmJiAoZG9jdW1lbnQuZG9jdW1lbnRNb2RlID09PSB1bmRlZmluZWQgfHwgZG9jdW1lbnQuZG9jdW1lbnRNb2RlID4gNyk7XG4gICAgfTtcblxuICAgIC8vIFBlciAxLjY6XG4gICAgLy8gVGhpcyB1c2VkIHRvIGJlIE1vZGVybml6ci5oaXN0b3J5bWFuYWdlbWVudCBidXQgdGhlIGxvbmdlclxuICAgIC8vIG5hbWUgaGFzIGJlZW4gZGVwcmVjYXRlZCBpbiBmYXZvciBvZiBhIHNob3J0ZXIgYW5kIHByb3BlcnR5LW1hdGNoaW5nIG9uZS5cbiAgICAvLyBUaGUgb2xkIEFQSSBpcyBzdGlsbCBhdmFpbGFibGUgaW4gMS42LCBidXQgYXMgb2YgMi4wIHdpbGwgdGhyb3cgYSB3YXJuaW5nLFxuICAgIC8vIGFuZCBpbiB0aGUgZmlyc3QgcmVsZWFzZSB0aGVyZWFmdGVyIGRpc2FwcGVhciBlbnRpcmVseS5cbiAgICB0ZXN0c1snaGlzdG9yeSddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISEod2luZG93Lmhpc3RvcnkgJiYgaGlzdG9yeS5wdXNoU3RhdGUpO1xuICAgIH07XG5cbiAgICB0ZXN0c1snZHJhZ2FuZGRyb3AnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiAoJ2RyYWdnYWJsZScgaW4gZGl2KSB8fCAoJ29uZHJhZ3N0YXJ0JyBpbiBkaXYgJiYgJ29uZHJvcCcgaW4gZGl2KTtcbiAgICB9O1xuXG4gICAgLy8gRkYzLjYgd2FzIEVPTCdlZCBvbiA0LzI0LzEyLCBidXQgdGhlIEVTUiB2ZXJzaW9uIG9mIEZGMTBcbiAgICAvLyB3aWxsIGJlIHN1cHBvcnRlZCB1bnRpbCBGRjE5ICgyLzEyLzEzKSwgYXQgd2hpY2ggdGltZSwgRVNSIGJlY29tZXMgRkYxNy5cbiAgICAvLyBGRjEwIHN0aWxsIHVzZXMgcHJlZml4ZXMsIHNvIGNoZWNrIGZvciBpdCB1bnRpbCB0aGVuLlxuICAgIC8vIGZvciBtb3JlIEVTUiBpbmZvLCBzZWU6IG1vemlsbGEub3JnL2VuLVVTL2ZpcmVmb3gvb3JnYW5pemF0aW9ucy9mYXEvXG4gICAgdGVzdHNbJ3dlYnNvY2tldHMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ1dlYlNvY2tldCcgaW4gd2luZG93IHx8ICdNb3pXZWJTb2NrZXQnIGluIHdpbmRvdztcbiAgICB9O1xuXG5cbiAgICAvLyBjc3MtdHJpY2tzLmNvbS9yZ2JhLWJyb3dzZXItc3VwcG9ydC9cbiAgICB0ZXN0c1sncmdiYSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNldCBhbiByZ2JhKCkgY29sb3IgYW5kIGNoZWNrIHRoZSByZXR1cm5lZCB2YWx1ZVxuXG4gICAgICAgIHNldENzcygnYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDE1MCwyNTUsMTUwLC41KScpO1xuXG4gICAgICAgIHJldHVybiBjb250YWlucyhtU3R5bGUuYmFja2dyb3VuZENvbG9yLCAncmdiYScpO1xuICAgIH07XG5cbiAgICB0ZXN0c1snaHNsYSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNhbWUgYXMgcmdiYSgpLCBpbiBmYWN0LCBicm93c2VycyByZS1tYXAgaHNsYSgpIHRvIHJnYmEoKSBpbnRlcm5hbGx5LFxuICAgICAgICAvLyAgIGV4Y2VwdCBJRTkgd2hvIHJldGFpbnMgaXQgYXMgaHNsYVxuXG4gICAgICAgIHNldENzcygnYmFja2dyb3VuZC1jb2xvcjpoc2xhKDEyMCw0MCUsMTAwJSwuNSknKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbnMobVN0eWxlLmJhY2tncm91bmRDb2xvciwgJ3JnYmEnKSB8fCBjb250YWlucyhtU3R5bGUuYmFja2dyb3VuZENvbG9yLCAnaHNsYScpO1xuICAgIH07XG5cbiAgICB0ZXN0c1snbXVsdGlwbGViZ3MnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBTZXR0aW5nIG11bHRpcGxlIGltYWdlcyBBTkQgYSBjb2xvciBvbiB0aGUgYmFja2dyb3VuZCBzaG9ydGhhbmQgcHJvcGVydHlcbiAgICAgICAgLy8gIGFuZCB0aGVuIHF1ZXJ5aW5nIHRoZSBzdHlsZS5iYWNrZ3JvdW5kIHByb3BlcnR5IHZhbHVlIGZvciB0aGUgbnVtYmVyIG9mXG4gICAgICAgIC8vICBvY2N1cnJlbmNlcyBvZiBcInVybChcIiBpcyBhIHJlbGlhYmxlIG1ldGhvZCBmb3IgZGV0ZWN0aW5nIEFDVFVBTCBzdXBwb3J0IGZvciB0aGlzIVxuXG4gICAgICAgIHNldENzcygnYmFja2dyb3VuZDp1cmwoaHR0cHM6Ly8pLHVybChodHRwczovLykscmVkIHVybChodHRwczovLyknKTtcblxuICAgICAgICAvLyBJZiB0aGUgVUEgc3VwcG9ydHMgbXVsdGlwbGUgYmFja2dyb3VuZHMsIHRoZXJlIHNob3VsZCBiZSB0aHJlZSBvY2N1cnJlbmNlc1xuICAgICAgICAvLyAgIG9mIHRoZSBzdHJpbmcgXCJ1cmwoXCIgaW4gdGhlIHJldHVybiB2YWx1ZSBmb3IgZWxlbVN0eWxlLmJhY2tncm91bmRcblxuICAgICAgICByZXR1cm4gKC8odXJsXFxzKlxcKC4qPyl7M30vKS50ZXN0KG1TdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICB9O1xuXG5cblxuICAgIC8vIHRoaXMgd2lsbCBmYWxzZSBwb3NpdGl2ZSBpbiBPcGVyYSBNaW5pXG4gICAgLy8gICBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzM5NlxuXG4gICAgdGVzdHNbJ2JhY2tncm91bmRzaXplJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYmFja2dyb3VuZFNpemUnKTtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ2JvcmRlcmltYWdlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYm9yZGVySW1hZ2UnKTtcbiAgICB9O1xuXG5cbiAgICAvLyBTdXBlciBjb21wcmVoZW5zaXZlIHRhYmxlIGFib3V0IGFsbCB0aGUgdW5pcXVlIGltcGxlbWVudGF0aW9ucyBvZlxuICAgIC8vIGJvcmRlci1yYWRpdXM6IG11ZGRsZWRyYW1ibGluZ3MuY29tL3RhYmxlLW9mLWNzczMtYm9yZGVyLXJhZGl1cy1jb21wbGlhbmNlXG5cbiAgICB0ZXN0c1snYm9yZGVycmFkaXVzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYm9yZGVyUmFkaXVzJyk7XG4gICAgfTtcblxuICAgIC8vIFdlYk9TIHVuZm9ydHVuYXRlbHkgZmFsc2UgcG9zaXRpdmVzIG9uIHRoaXMgdGVzdC5cbiAgICB0ZXN0c1snYm94c2hhZG93J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYm94U2hhZG93Jyk7XG4gICAgfTtcblxuICAgIC8vIEZGMy4wIHdpbGwgZmFsc2UgcG9zaXRpdmUgb24gdGhpcyB0ZXN0XG4gICAgdGVzdHNbJ3RleHRzaGFkb3cnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGUudGV4dFNoYWRvdyA9PT0gJyc7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ29wYWNpdHknXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBCcm93c2VycyB0aGF0IGFjdHVhbGx5IGhhdmUgQ1NTIE9wYWNpdHkgaW1wbGVtZW50ZWQgaGF2ZSBkb25lIHNvXG4gICAgICAgIC8vICBhY2NvcmRpbmcgdG8gc3BlYywgd2hpY2ggbWVhbnMgdGhlaXIgcmV0dXJuIHZhbHVlcyBhcmUgd2l0aGluIHRoZVxuICAgICAgICAvLyAgcmFuZ2Ugb2YgWzAuMCwxLjBdIC0gaW5jbHVkaW5nIHRoZSBsZWFkaW5nIHplcm8uXG5cbiAgICAgICAgc2V0Q3NzQWxsKCdvcGFjaXR5Oi41NScpO1xuXG4gICAgICAgIC8vIFRoZSBub24tbGl0ZXJhbCAuIGluIHRoaXMgcmVnZXggaXMgaW50ZW50aW9uYWw6XG4gICAgICAgIC8vICAgR2VybWFuIENocm9tZSByZXR1cm5zIHRoaXMgdmFsdWUgYXMgMCw1NVxuICAgICAgICAvLyBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLyNpc3N1ZS81OS9jb21tZW50LzUxNjYzMlxuICAgICAgICByZXR1cm4gKC9eMC41NSQvKS50ZXN0KG1TdHlsZS5vcGFjaXR5KTtcbiAgICB9O1xuXG5cbiAgICAvLyBOb3RlLCBBbmRyb2lkIDwgNCB3aWxsIHBhc3MgdGhpcyB0ZXN0LCBidXQgY2FuIG9ubHkgYW5pbWF0ZVxuICAgIC8vICAgYSBzaW5nbGUgcHJvcGVydHkgYXQgYSB0aW1lXG4gICAgLy8gICBnb28uZ2wvdjNWNEdwXG4gICAgdGVzdHNbJ2Nzc2FuaW1hdGlvbnMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdhbmltYXRpb25OYW1lJyk7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc2NvbHVtbnMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdjb2x1bW5Db3VudCcpO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3NncmFkaWVudHMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRm9yIENTUyBHcmFkaWVudHMgc3ludGF4LCBwbGVhc2Ugc2VlOlxuICAgICAgICAgKiB3ZWJraXQub3JnL2Jsb2cvMTc1L2ludHJvZHVjaW5nLWNzcy1ncmFkaWVudHMvXG4gICAgICAgICAqIGRldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9DU1MvLW1vei1saW5lYXItZ3JhZGllbnRcbiAgICAgICAgICogZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NTUy8tbW96LXJhZGlhbC1ncmFkaWVudFxuICAgICAgICAgKiBkZXYudzMub3JnL2Nzc3dnL2NzczMtaW1hZ2VzLyNncmFkaWVudHMtXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBzdHIxID0gJ2JhY2tncm91bmQtaW1hZ2U6JyxcbiAgICAgICAgICAgIHN0cjIgPSAnZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLHJpZ2h0IGJvdHRvbSxmcm9tKCM5ZjkpLHRvKHdoaXRlKSk7JyxcbiAgICAgICAgICAgIHN0cjMgPSAnbGluZWFyLWdyYWRpZW50KGxlZnQgdG9wLCM5ZjksIHdoaXRlKTsnO1xuXG4gICAgICAgIHNldENzcyhcbiAgICAgICAgICAgICAvLyBsZWdhY3kgd2Via2l0IHN5bnRheCAoRklYTUU6IHJlbW92ZSB3aGVuIHN5bnRheCBub3QgaW4gdXNlIGFueW1vcmUpXG4gICAgICAgICAgICAgIChzdHIxICsgJy13ZWJraXQtICcuc3BsaXQoJyAnKS5qb2luKHN0cjIgKyBzdHIxKSArXG4gICAgICAgICAgICAgLy8gc3RhbmRhcmQgc3ludGF4ICAgICAgICAgICAgIC8vIHRyYWlsaW5nICdiYWNrZ3JvdW5kLWltYWdlOidcbiAgICAgICAgICAgICAgcHJlZml4ZXMuam9pbihzdHIzICsgc3RyMSkpLnNsaWNlKDAsIC1zdHIxLmxlbmd0aClcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbnMobVN0eWxlLmJhY2tncm91bmRJbWFnZSwgJ2dyYWRpZW50Jyk7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc3JlZmxlY3Rpb25zJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYm94UmVmbGVjdCcpO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3N0cmFuc2Zvcm1zJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhdGVzdFByb3BzQWxsKCd0cmFuc2Zvcm0nKTtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzdHJhbnNmb3JtczNkJ10gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgcmV0ID0gISF0ZXN0UHJvcHNBbGwoJ3BlcnNwZWN0aXZlJyk7XG5cbiAgICAgICAgLy8gV2Via2l0J3MgM0QgdHJhbnNmb3JtcyBhcmUgcGFzc2VkIG9mZiB0byB0aGUgYnJvd3NlcidzIG93biBncmFwaGljcyByZW5kZXJlci5cbiAgICAgICAgLy8gICBJdCB3b3JrcyBmaW5lIGluIFNhZmFyaSBvbiBMZW9wYXJkIGFuZCBTbm93IExlb3BhcmQsIGJ1dCBub3QgaW4gQ2hyb21lIGluXG4gICAgICAgIC8vICAgc29tZSBjb25kaXRpb25zLiBBcyBhIHJlc3VsdCwgV2Via2l0IHR5cGljYWxseSByZWNvZ25pemVzIHRoZSBzeW50YXggYnV0XG4gICAgICAgIC8vICAgd2lsbCBzb21ldGltZXMgdGhyb3cgYSBmYWxzZSBwb3NpdGl2ZSwgdGh1cyB3ZSBtdXN0IGRvIGEgbW9yZSB0aG9yb3VnaCBjaGVjazpcbiAgICAgICAgaWYgKCByZXQgJiYgJ3dlYmtpdFBlcnNwZWN0aXZlJyBpbiBkb2NFbGVtZW50LnN0eWxlICkge1xuXG4gICAgICAgICAgLy8gV2Via2l0IGFsbG93cyB0aGlzIG1lZGlhIHF1ZXJ5IHRvIHN1Y2NlZWQgb25seSBpZiB0aGUgZmVhdHVyZSBpcyBlbmFibGVkLlxuICAgICAgICAgIC8vIGBAbWVkaWEgKHRyYW5zZm9ybS0zZCksKC13ZWJraXQtdHJhbnNmb3JtLTNkKXsgLi4uIH1gXG4gICAgICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoJ0BtZWRpYSAodHJhbnNmb3JtLTNkKSwoLXdlYmtpdC10cmFuc2Zvcm0tM2QpeyNtb2Rlcm5penJ7bGVmdDo5cHg7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjNweDt9fScsIGZ1bmN0aW9uKCBub2RlLCBydWxlICkge1xuICAgICAgICAgICAgcmV0ID0gbm9kZS5vZmZzZXRMZWZ0ID09PSA5ICYmIG5vZGUub2Zmc2V0SGVpZ2h0ID09PSAzO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc3RyYW5zaXRpb25zJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgndHJhbnNpdGlvbicpO1xuICAgIH07XG5cblxuICAgIC8qPj5mb250ZmFjZSovXG4gICAgLy8gQGZvbnQtZmFjZSBkZXRlY3Rpb24gcm91dGluZSBieSBEaWVnbyBQZXJpbmlcbiAgICAvLyBqYXZhc2NyaXB0Lm53Ym94LmNvbS9DU1NTdXBwb3J0L1xuXG4gICAgLy8gZmFsc2UgcG9zaXRpdmVzOlxuICAgIC8vICAgV2ViT1MgZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8zNDJcbiAgICAvLyAgIFdQNyAgIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvNTM4XG4gICAgdGVzdHNbJ2ZvbnRmYWNlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJvb2w7XG5cbiAgICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoJ0Bmb250LWZhY2Uge2ZvbnQtZmFtaWx5OlwiZm9udFwiO3NyYzp1cmwoXCJodHRwczovL1wiKX0nLCBmdW5jdGlvbiggbm9kZSwgcnVsZSApIHtcbiAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc21vZGVybml6cicpLFxuICAgICAgICAgICAgICBzaGVldCA9IHN0eWxlLnNoZWV0IHx8IHN0eWxlLnN0eWxlU2hlZXQsXG4gICAgICAgICAgICAgIGNzc1RleHQgPSBzaGVldCA/IChzaGVldC5jc3NSdWxlcyAmJiBzaGVldC5jc3NSdWxlc1swXSA/IHNoZWV0LmNzc1J1bGVzWzBdLmNzc1RleHQgOiBzaGVldC5jc3NUZXh0IHx8ICcnKSA6ICcnO1xuXG4gICAgICAgICAgYm9vbCA9IC9zcmMvaS50ZXN0KGNzc1RleHQpICYmIGNzc1RleHQuaW5kZXhPZihydWxlLnNwbGl0KCcgJylbMF0pID09PSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuICAgIC8qPj5mb250ZmFjZSovXG5cbiAgICAvLyBDU1MgZ2VuZXJhdGVkIGNvbnRlbnQgZGV0ZWN0aW9uXG4gICAgdGVzdHNbJ2dlbmVyYXRlZGNvbnRlbnQnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm9vbDtcblxuICAgICAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyhbJyMnLG1vZCwne2ZvbnQ6MC8wIGF9IycsbW9kLCc6YWZ0ZXJ7Y29udGVudDpcIicsc21pbGUsJ1wiO3Zpc2liaWxpdHk6aGlkZGVuO2ZvbnQ6M3B4LzEgYX0nXS5qb2luKCcnKSwgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgICAgYm9vbCA9IG5vZGUub2Zmc2V0SGVpZ2h0ID49IDM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgIH07XG5cblxuXG4gICAgLy8gVGhlc2UgdGVzdHMgZXZhbHVhdGUgc3VwcG9ydCBvZiB0aGUgdmlkZW8vYXVkaW8gZWxlbWVudHMsIGFzIHdlbGwgYXNcbiAgICAvLyB0ZXN0aW5nIHdoYXQgdHlwZXMgb2YgY29udGVudCB0aGV5IHN1cHBvcnQuXG4gICAgLy9cbiAgICAvLyBXZSdyZSB1c2luZyB0aGUgQm9vbGVhbiBjb25zdHJ1Y3RvciBoZXJlLCBzbyB0aGF0IHdlIGNhbiBleHRlbmQgdGhlIHZhbHVlXG4gICAgLy8gZS5nLiAgTW9kZXJuaXpyLnZpZGVvICAgICAvLyB0cnVlXG4gICAgLy8gICAgICAgTW9kZXJuaXpyLnZpZGVvLm9nZyAvLyAncHJvYmFibHknXG4gICAgLy9cbiAgICAvLyBDb2RlYyB2YWx1ZXMgZnJvbSA6IGdpdGh1Yi5jb20vTmllbHNMZWVuaGVlci9odG1sNXRlc3QvYmxvYi85MTA2YTgvaW5kZXguaHRtbCNMODQ1XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aHggdG8gTmllbHNMZWVuaGVlciBhbmQgemNvcnBhblxuXG4gICAgLy8gTm90ZTogaW4gc29tZSBvbGRlciBicm93c2VycywgXCJub1wiIHdhcyBhIHJldHVybiB2YWx1ZSBpbnN0ZWFkIG9mIGVtcHR5IHN0cmluZy5cbiAgICAvLyAgIEl0IHdhcyBsaXZlIGluIEZGMy41LjAgYW5kIDMuNS4xLCBidXQgZml4ZWQgaW4gMy41LjJcbiAgICAvLyAgIEl0IHdhcyBhbHNvIGxpdmUgaW4gU2FmYXJpIDQuMC4wIC0gNC4wLjQsIGJ1dCBmaXhlZCBpbiA0LjAuNVxuXG4gICAgdGVzdHNbJ3ZpZGVvJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIElFOSBSdW5uaW5nIG9uIFdpbmRvd3MgU2VydmVyIFNLVSBjYW4gY2F1c2UgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biwgYnVnICMyMjRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICggYm9vbCA9ICEhZWxlbS5jYW5QbGF5VHlwZSApIHtcbiAgICAgICAgICAgICAgICBib29sICAgICAgPSBuZXcgQm9vbGVhbihib29sKTtcbiAgICAgICAgICAgICAgICBib29sLm9nZyAgPSBlbGVtLmNhblBsYXlUeXBlKCd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYVwiJykgICAgICAucmVwbGFjZSgvXm5vJC8sJycpO1xuXG4gICAgICAgICAgICAgICAgLy8gV2l0aG91dCBRdWlja1RpbWUsIHRoaXMgdmFsdWUgd2lsbCBiZSBgdW5kZWZpbmVkYC4gZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy81NDZcbiAgICAgICAgICAgICAgICBib29sLmgyNjQgPSBlbGVtLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFXCInKSAucmVwbGFjZSgvXm5vJC8sJycpO1xuXG4gICAgICAgICAgICAgICAgYm9vbC53ZWJtID0gZWxlbS5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoKGUpIHsgfVxuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgIH07XG5cbiAgICB0ZXN0c1snYXVkaW8nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICggYm9vbCA9ICEhZWxlbS5jYW5QbGF5VHlwZSApIHtcbiAgICAgICAgICAgICAgICBib29sICAgICAgPSBuZXcgQm9vbGVhbihib29sKTtcbiAgICAgICAgICAgICAgICBib29sLm9nZyAgPSBlbGVtLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sJycpO1xuICAgICAgICAgICAgICAgIGJvb2wubXAzICA9IGVsZW0uY2FuUGxheVR5cGUoJ2F1ZGlvL21wZWc7JykgICAgICAgICAgICAgICAucmVwbGFjZSgvXm5vJC8sJycpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWltZXR5cGVzIGFjY2VwdGVkOlxuICAgICAgICAgICAgICAgIC8vICAgZGV2ZWxvcGVyLm1vemlsbGEub3JnL0VuL01lZGlhX2Zvcm1hdHNfc3VwcG9ydGVkX2J5X3RoZV9hdWRpb19hbmRfdmlkZW9fZWxlbWVudHNcbiAgICAgICAgICAgICAgICAvLyAgIGJpdC5seS9pcGhvbmVvc2NvZGVjc1xuICAgICAgICAgICAgICAgIGJvb2wud2F2ICA9IGVsZW0uY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykgICAgIC5yZXBsYWNlKC9ebm8kLywnJyk7XG4gICAgICAgICAgICAgICAgYm9vbC5tNGEgID0gKCBlbGVtLmNhblBsYXlUeXBlKCdhdWRpby94LW00YTsnKSAgICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykpICAgICAgICAgICAgIC5yZXBsYWNlKC9ebm8kLywnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkgeyB9XG5cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcblxuXG4gICAgLy8gSW4gRkY0LCBpZiBkaXNhYmxlZCwgd2luZG93LmxvY2FsU3RvcmFnZSBzaG91bGQgPT09IG51bGwuXG5cbiAgICAvLyBOb3JtYWxseSwgd2UgY291bGQgbm90IHRlc3QgdGhhdCBkaXJlY3RseSBhbmQgbmVlZCB0byBkbyBhXG4gICAgLy8gICBgKCdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdykgJiYgYCB0ZXN0IGZpcnN0IGJlY2F1c2Ugb3RoZXJ3aXNlIEZpcmVmb3ggd2lsbFxuICAgIC8vICAgdGhyb3cgYnVnemlsLmxhLzM2NTc3MiBpZiBjb29raWVzIGFyZSBkaXNhYmxlZFxuXG4gICAgLy8gQWxzbyBpbiBpT1M1IFByaXZhdGUgQnJvd3NpbmcgbW9kZSwgYXR0ZW1wdGluZyB0byB1c2UgbG9jYWxTdG9yYWdlLnNldEl0ZW1cbiAgICAvLyB3aWxsIHRocm93IHRoZSBleGNlcHRpb246XG4gICAgLy8gICBRVU9UQV9FWENFRURFRF9FUlJST1IgRE9NIEV4Y2VwdGlvbiAyMi5cbiAgICAvLyBQZWN1bGlhcmx5LCBnZXRJdGVtIGFuZCByZW1vdmVJdGVtIGNhbGxzIGRvIG5vdCB0aHJvdy5cblxuICAgIC8vIEJlY2F1c2Ugd2UgYXJlIGZvcmNlZCB0byB0cnkvY2F0Y2ggdGhpcywgd2UnbGwgZ28gYWdncmVzc2l2ZS5cblxuICAgIC8vIEp1c3QgRldJVzogSUU4IENvbXBhdCBtb2RlIHN1cHBvcnRzIHRoZXNlIGZlYXR1cmVzIGNvbXBsZXRlbHk6XG4gICAgLy8gICB3d3cucXVpcmtzbW9kZS5vcmcvZG9tL2h0bWw1Lmh0bWxcbiAgICAvLyBCdXQgSUU4IGRvZXNuJ3Qgc3VwcG9ydCBlaXRoZXIgd2l0aCBsb2NhbCBmaWxlc1xuXG4gICAgdGVzdHNbJ2xvY2Fsc3RvcmFnZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShtb2QsIG1vZCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShtb2QpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRlc3RzWydzZXNzaW9uc3RvcmFnZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKG1vZCwgbW9kKTtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0obW9kKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRlc3RzWyd3ZWJ3b3JrZXJzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhd2luZG93LldvcmtlcjtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snYXBwbGljYXRpb25jYWNoZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIXdpbmRvdy5hcHBsaWNhdGlvbkNhY2hlO1xuICAgIH07XG5cblxuICAgIC8vIFRoYW5rcyB0byBFcmlrIERhaGxzdHJvbVxuICAgIHRlc3RzWydzdmcnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgISFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMuc3ZnLCAnc3ZnJykuY3JlYXRlU1ZHUmVjdDtcbiAgICB9O1xuXG4gICAgLy8gc3BlY2lmaWNhbGx5IGZvciBTVkcgaW5saW5lIGluIEhUTUwsIG5vdCB3aXRoaW4gWEhUTUxcbiAgICAvLyB0ZXN0IHBhZ2U6IHBhdWxpcmlzaC5jb20vZGVtby9pbmxpbmUtc3ZnXG4gICAgdGVzdHNbJ2lubGluZXN2ZyddID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzxzdmcvPic7XG4gICAgICByZXR1cm4gKGRpdi5maXJzdENoaWxkICYmIGRpdi5maXJzdENoaWxkLm5hbWVzcGFjZVVSSSkgPT0gbnMuc3ZnO1xuICAgIH07XG5cbiAgICAvLyBTVkcgU01JTCBhbmltYXRpb25cbiAgICB0ZXN0c1snc21pbCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAvU1ZHQW5pbWF0ZS8udGVzdCh0b1N0cmluZy5jYWxsKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucy5zdmcsICdhbmltYXRlJykpKTtcbiAgICB9O1xuXG4gICAgLy8gVGhpcyB0ZXN0IGlzIG9ubHkgZm9yIGNsaXAgcGF0aHMgaW4gU1ZHIHByb3Blciwgbm90IGNsaXAgcGF0aHMgb24gSFRNTCBjb250ZW50XG4gICAgLy8gZGVtbzogc3J1ZmFjdWx0eS5zcnUuZWR1L2RhdmlkLmRhaWxleS9zdmcvbmV3c3R1ZmYvY2xpcFBhdGg0LnN2Z1xuXG4gICAgLy8gSG93ZXZlciByZWFkIHRoZSBjb21tZW50cyB0byBkaWcgaW50byBhcHBseWluZyBTVkcgY2xpcHBhdGhzIHRvIEhUTUwgY29udGVudCBoZXJlOlxuICAgIC8vICAgZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8yMTMjaXNzdWVjb21tZW50LTExNDk0OTFcbiAgICB0ZXN0c1snc3ZnY2xpcHBhdGhzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmIC9TVkdDbGlwUGF0aC8udGVzdCh0b1N0cmluZy5jYWxsKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucy5zdmcsICdjbGlwUGF0aCcpKSk7XG4gICAgfTtcblxuICAgIC8qPj53ZWJmb3JtcyovXG4gICAgLy8gaW5wdXQgZmVhdHVyZXMgYW5kIGlucHV0IHR5cGVzIGdvIGRpcmVjdGx5IG9udG8gdGhlIHJldCBvYmplY3QsIGJ5cGFzc2luZyB0aGUgdGVzdHMgbG9vcC5cbiAgICAvLyBIb2xkIHRoaXMgZ3V5IHRvIGV4ZWN1dGUgaW4gYSBtb21lbnQuXG4gICAgZnVuY3Rpb24gd2ViZm9ybXMoKSB7XG4gICAgICAgIC8qPj5pbnB1dCovXG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIEhUTUw1J3MgbmV3IGlucHV0IGF0dHJpYnV0ZXMgdG8gc2VlIGlmIHRoZSBVQSB1bmRlcnN0YW5kcyBhbnkuXG4gICAgICAgIC8vIFdlJ3JlIHVzaW5nIGYgd2hpY2ggaXMgdGhlIDxpbnB1dD4gZWxlbWVudCBjcmVhdGVkIGVhcmx5IG9uXG4gICAgICAgIC8vIE1pa2UgVGF5bHIgaGFzIGNyZWF0ZWQgYSBjb21wcmVoZW5zaXZlIHJlc291cmNlIGZvciB0ZXN0aW5nIHRoZXNlIGF0dHJpYnV0ZXNcbiAgICAgICAgLy8gICB3aGVuIGFwcGxpZWQgdG8gYWxsIGlucHV0IHR5cGVzOlxuICAgICAgICAvLyAgIG1pa2V0YXlsci5jb20vY29kZS9pbnB1dC10eXBlLWF0dHIuaHRtbFxuICAgICAgICAvLyBzcGVjOiB3d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS1pbnB1dC1lbGVtZW50Lmh0bWwjaW5wdXQtdHlwZS1hdHRyLXN1bW1hcnlcblxuICAgICAgICAvLyBPbmx5IGlucHV0IHBsYWNlaG9sZGVyIGlzIHRlc3RlZCB3aGlsZSB0ZXh0YXJlYSdzIHBsYWNlaG9sZGVyIGlzIG5vdC5cbiAgICAgICAgLy8gQ3VycmVudGx5IFNhZmFyaSA0IGFuZCBPcGVyYSAxMSBoYXZlIHN1cHBvcnQgb25seSBmb3IgdGhlIGlucHV0IHBsYWNlaG9sZGVyXG4gICAgICAgIC8vIEJvdGggdGVzdHMgYXJlIGF2YWlsYWJsZSBpbiBmZWF0dXJlLWRldGVjdHMvZm9ybXMtcGxhY2Vob2xkZXIuanNcbiAgICAgICAgTW9kZXJuaXpyWydpbnB1dCddID0gKGZ1bmN0aW9uKCBwcm9wcyApIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgYXR0cnNbIHByb3BzW2ldIF0gPSAhIShwcm9wc1tpXSBpbiBpbnB1dEVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dHJzLmxpc3Qpe1xuICAgICAgICAgICAgICAvLyBzYWZhcmkgZmFsc2UgcG9zaXRpdmUncyBvbiBkYXRhbGlzdDogd2Viay5pdC83NDI1MlxuICAgICAgICAgICAgICAvLyBzZWUgYWxzbyBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzE0NlxuICAgICAgICAgICAgICBhdHRycy5saXN0ID0gISEoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnKSAmJiB3aW5kb3cuSFRNTERhdGFMaXN0RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXR0cnM7XG4gICAgICAgIH0pKCdhdXRvY29tcGxldGUgYXV0b2ZvY3VzIGxpc3QgcGxhY2Vob2xkZXIgbWF4IG1pbiBtdWx0aXBsZSBwYXR0ZXJuIHJlcXVpcmVkIHN0ZXAnLnNwbGl0KCcgJykpO1xuICAgICAgICAvKj4+aW5wdXQqL1xuXG4gICAgICAgIC8qPj5pbnB1dHR5cGVzKi9cbiAgICAgICAgLy8gUnVuIHRocm91Z2ggSFRNTDUncyBuZXcgaW5wdXQgdHlwZXMgdG8gc2VlIGlmIHRoZSBVQSB1bmRlcnN0YW5kcyBhbnkuXG4gICAgICAgIC8vICAgVGhpcyBpcyBwdXQgYmVoaW5kIHRoZSB0ZXN0cyBydW5sb29wIGJlY2F1c2UgaXQgZG9lc24ndCByZXR1cm4gYVxuICAgICAgICAvLyAgIHRydWUvZmFsc2UgbGlrZSBhbGwgdGhlIG90aGVyIHRlc3RzOyBpbnN0ZWFkLCBpdCByZXR1cm5zIGFuIG9iamVjdFxuICAgICAgICAvLyAgIGNvbnRhaW5pbmcgZWFjaCBpbnB1dCB0eXBlIHdpdGggaXRzIGNvcnJlc3BvbmRpbmcgdHJ1ZS9mYWxzZSB2YWx1ZVxuXG4gICAgICAgIC8vIEJpZyB0aGFua3MgdG8gQG1pa2V0YXlsciBmb3IgdGhlIGh0bWw1IGZvcm1zIGV4cGVydGlzZS4gbWlrZXRheWxyLmNvbS9cbiAgICAgICAgTW9kZXJuaXpyWydpbnB1dHR5cGVzJ10gPSAoZnVuY3Rpb24ocHJvcHMpIHtcblxuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBib29sLCBpbnB1dEVsZW1UeXBlLCBkZWZhdWx0VmlldywgbGVuID0gcHJvcHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG5cbiAgICAgICAgICAgICAgICBpbnB1dEVsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgaW5wdXRFbGVtVHlwZSA9IHByb3BzW2ldKTtcbiAgICAgICAgICAgICAgICBib29sID0gaW5wdXRFbGVtLnR5cGUgIT09ICd0ZXh0JztcblxuICAgICAgICAgICAgICAgIC8vIFdlIGZpcnN0IGNoZWNrIHRvIHNlZSBpZiB0aGUgdHlwZSB3ZSBnaXZlIGl0IHN0aWNrcy4uXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHR5cGUgZG9lcywgd2UgZmVlZCBpdCBhIHRleHR1YWwgdmFsdWUsIHdoaWNoIHNob3VsZG4ndCBiZSB2YWxpZC5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgZG9lc24ndCBzdGljaywgd2Uga25vdyB0aGVyZSdzIGlucHV0IHNhbml0aXphdGlvbiB3aGljaCBpbmZlcnMgYSBjdXN0b20gVUlcbiAgICAgICAgICAgICAgICBpZiAoIGJvb2wgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtLnZhbHVlICAgICAgICAgPSBzbWlsZTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVtLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47JztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIC9ecmFuZ2UkLy50ZXN0KGlucHV0RWxlbVR5cGUpICYmIGlucHV0RWxlbS5zdHlsZS5XZWJraXRBcHBlYXJhbmNlICE9PSB1bmRlZmluZWQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZpZXcgPSBkb2N1bWVudC5kZWZhdWx0VmlldztcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSAyLTQgYWxsb3dzIHRoZSBzbWlsZXkgYXMgYSB2YWx1ZSwgZGVzcGl0ZSBtYWtpbmcgYSBzbGlkZXJcbiAgICAgICAgICAgICAgICAgICAgICBib29sID0gIGRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoaW5wdXRFbGVtLCBudWxsKS5XZWJraXRBcHBlYXJhbmNlICE9PSAndGV4dGZpZWxkJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW9iaWxlIGFuZHJvaWQgd2ViIGJyb3dzZXIgaGFzIGZhbHNlIHBvc2l0aXZlLCBzbyBtdXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgaGVpZ2h0IHRvIHNlZSBpZiB0aGUgd2lkZ2V0IGlzIGFjdHVhbGx5IHRoZXJlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0RWxlbS5vZmZzZXRIZWlnaHQgIT09IDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgZG9jRWxlbWVudC5yZW1vdmVDaGlsZChpbnB1dEVsZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIC9eKHNlYXJjaHx0ZWwpJC8udGVzdChpbnB1dEVsZW1UeXBlKSApe1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWMgZG9lc24ndCBkZWZpbmUgYW55IHNwZWNpYWwgcGFyc2luZyBvciBkZXRlY3RhYmxlIFVJXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBiZWhhdmlvcnMgc28gd2UgcGFzcyB0aGVzZSB0aHJvdWdoIGFzIHRydWVcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIEludGVyZXN0aW5nbHksIG9wZXJhIGZhaWxzIHRoZSBlYXJsaWVyIHRlc3QsIHNvIGl0IGRvZXNuJ3RcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgZXZlbiBtYWtlIGl0IGhlcmUuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggL14odXJsfGVtYWlsKSQvLnRlc3QoaW5wdXRFbGVtVHlwZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmVhbCB1cmwgYW5kIGVtYWlsIHN1cHBvcnQgY29tZXMgd2l0aCBwcmViYWtlZCB2YWxpZGF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgIGJvb2wgPSBpbnB1dEVsZW0uY2hlY2tWYWxpZGl0eSAmJiBpbnB1dEVsZW0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1cGdyYWRlZCBpbnB1dCBjb21wb250ZW50IHJlamVjdHMgdGhlIDopIHRleHQsIHdlIGdvdCBhIHdpbm5lclxuICAgICAgICAgICAgICAgICAgICAgIGJvb2wgPSBpbnB1dEVsZW0udmFsdWUgIT0gc21pbGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnB1dHNbIHByb3BzW2ldIF0gPSAhIWJvb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5wdXRzO1xuICAgICAgICB9KSgnc2VhcmNoIHRlbCB1cmwgZW1haWwgZGF0ZXRpbWUgZGF0ZSBtb250aCB3ZWVrIHRpbWUgZGF0ZXRpbWUtbG9jYWwgbnVtYmVyIHJhbmdlIGNvbG9yJy5zcGxpdCgnICcpKTtcbiAgICAgICAgLyo+PmlucHV0dHlwZXMqL1xuICAgIH1cbiAgICAvKj4+d2ViZm9ybXMqL1xuXG5cbiAgICAvLyBFbmQgb2YgdGVzdCBkZWZpbml0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4gICAgLy8gUnVuIHRocm91Z2ggYWxsIHRlc3RzIGFuZCBkZXRlY3QgdGhlaXIgc3VwcG9ydCBpbiB0aGUgY3VycmVudCBVQS5cbiAgICAvLyB0b2RvOiBoeXBvdGhldGljYWxseSB3ZSBjb3VsZCBiZSBkb2luZyBhbiBhcnJheSBvZiB0ZXN0cyBhbmQgdXNlIGEgYmFzaWMgbG9vcCBoZXJlLlxuICAgIGZvciAoIHZhciBmZWF0dXJlIGluIHRlc3RzICkge1xuICAgICAgICBpZiAoIGhhc093blByb3AodGVzdHMsIGZlYXR1cmUpICkge1xuICAgICAgICAgICAgLy8gcnVuIHRoZSB0ZXN0LCB0aHJvdyB0aGUgcmV0dXJuIHZhbHVlIGludG8gdGhlIE1vZGVybml6cixcbiAgICAgICAgICAgIC8vICAgdGhlbiBiYXNlZCBvbiB0aGF0IGJvb2xlYW4sIGRlZmluZSBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWVcbiAgICAgICAgICAgIC8vICAgYW5kIHB1c2ggaXQgaW50byBhbiBhcnJheSBvZiBjbGFzc2VzIHdlJ2xsIGpvaW4gbGF0ZXIuXG4gICAgICAgICAgICBmZWF0dXJlTmFtZSAgPSBmZWF0dXJlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVdID0gdGVzdHNbZmVhdHVyZV0oKTtcblxuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKChNb2Rlcm5penJbZmVhdHVyZU5hbWVdID8gJycgOiAnbm8tJykgKyBmZWF0dXJlTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKj4+d2ViZm9ybXMqL1xuICAgIC8vIGlucHV0IHRlc3RzIG5lZWQgdG8gcnVuLlxuICAgIE1vZGVybml6ci5pbnB1dCB8fCB3ZWJmb3JtcygpO1xuICAgIC8qPj53ZWJmb3JtcyovXG5cblxuICAgIC8qKlxuICAgICAqIGFkZFRlc3QgYWxsb3dzIHRoZSB1c2VyIHRvIGRlZmluZSB0aGVpciBvd24gZmVhdHVyZSB0ZXN0c1xuICAgICAqIHRoZSByZXN1bHQgd2lsbCBiZSBhZGRlZCBvbnRvIHRoZSBNb2Rlcm5penIgb2JqZWN0LFxuICAgICAqIGFzIHdlbGwgYXMgYW4gYXBwcm9wcmlhdGUgY2xhc3NOYW1lIHNldCBvbiB0aGUgaHRtbCBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmVhdHVyZSAtIFN0cmluZyBuYW1pbmcgdGhlIGZlYXR1cmVcbiAgICAgKiBAcGFyYW0gdGVzdCAtIEZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIGZlYXR1cmUgaXMgc3VwcG9ydGVkLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICAgTW9kZXJuaXpyLmFkZFRlc3QgPSBmdW5jdGlvbiAoIGZlYXR1cmUsIHRlc3QgKSB7XG4gICAgICAgaWYgKCB0eXBlb2YgZmVhdHVyZSA9PSAnb2JqZWN0JyApIHtcbiAgICAgICAgIGZvciAoIHZhciBrZXkgaW4gZmVhdHVyZSApIHtcbiAgICAgICAgICAgaWYgKCBoYXNPd25Qcm9wKCBmZWF0dXJlLCBrZXkgKSApIHtcbiAgICAgICAgICAgICBNb2Rlcm5penIuYWRkVGVzdCgga2V5LCBmZWF0dXJlWyBrZXkgXSApO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgZmVhdHVyZSA9IGZlYXR1cmUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgaWYgKCBNb2Rlcm5penJbZmVhdHVyZV0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgLy8gd2UncmUgZ29pbmcgdG8gcXVpdCBpZiB5b3UncmUgdHJ5aW5nIHRvIG92ZXJ3cml0ZSBhbiBleGlzdGluZyB0ZXN0XG4gICAgICAgICAgIC8vIGlmIHdlIHdlcmUgdG8gYWxsb3cgaXQsIHdlJ2QgZG8gdGhpczpcbiAgICAgICAgICAgLy8gICB2YXIgcmUgPSBuZXcgUmVnRXhwKFwiXFxcXGIobm8tKT9cIiArIGZlYXR1cmUgKyBcIlxcXFxiXCIpO1xuICAgICAgICAgICAvLyAgIGRvY0VsZW1lbnQuY2xhc3NOYW1lID0gZG9jRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSggcmUsICcnICk7XG4gICAgICAgICAgIC8vIGJ1dCwgbm8gcmx5LCBzdHVmZiAnZW0uXG4gICAgICAgICAgIHJldHVybiBNb2Rlcm5penI7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHRlc3QgPSB0eXBlb2YgdGVzdCA9PSAnZnVuY3Rpb24nID8gdGVzdCgpIDogdGVzdDtcblxuICAgICAgICAgaWYgKHR5cGVvZiBlbmFibGVDbGFzc2VzICE9PSBcInVuZGVmaW5lZFwiICYmIGVuYWJsZUNsYXNzZXMpIHtcbiAgICAgICAgICAgZG9jRWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgKHRlc3QgPyAnJyA6ICduby0nKSArIGZlYXR1cmU7XG4gICAgICAgICB9XG4gICAgICAgICBNb2Rlcm5penJbZmVhdHVyZV0gPSB0ZXN0O1xuXG4gICAgICAgfVxuXG4gICAgICAgcmV0dXJuIE1vZGVybml6cjsgLy8gYWxsb3cgY2hhaW5pbmcuXG4gICAgIH07XG5cblxuICAgIC8vIFJlc2V0IG1vZEVsZW0uY3NzVGV4dCB0byBub3RoaW5nIHRvIHJlZHVjZSBtZW1vcnkgZm9vdHByaW50LlxuICAgIHNldENzcygnJyk7XG4gICAgbW9kRWxlbSA9IGlucHV0RWxlbSA9IG51bGw7XG5cbiAgICAvKj4+c2hpdiovXG4gICAgLyoqXG4gICAgICogQHByZXNlcnZlIEhUTUw1IFNoaXYgcHJldjMuNy4xIHwgQGFmYXJrYXMgQGpkYWx0b24gQGpvbl9uZWFsIEByZW0gfCBNSVQvR1BMMiBMaWNlbnNlZFxuICAgICAqL1xuICAgIDsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAgICAgICAvKmpzaGludCBldmlsOnRydWUgKi9cbiAgICAgICAgLyoqIHZlcnNpb24gKi9cbiAgICAgICAgdmFyIHZlcnNpb24gPSAnMy43LjAnO1xuXG4gICAgICAgIC8qKiBQcmVzZXQgb3B0aW9ucyAqL1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHdpbmRvdy5odG1sNSB8fCB7fTtcblxuICAgICAgICAvKiogVXNlZCB0byBza2lwIHByb2JsZW0gZWxlbWVudHMgKi9cbiAgICAgICAgdmFyIHJlU2tpcCA9IC9ePHxeKD86YnV0dG9ufG1hcHxzZWxlY3R8dGV4dGFyZWF8b2JqZWN0fGlmcmFtZXxvcHRpb258b3B0Z3JvdXApJC9pO1xuXG4gICAgICAgIC8qKiBOb3QgYWxsIGVsZW1lbnRzIGNhbiBiZSBjbG9uZWQgaW4gSUUgKiovXG4gICAgICAgIHZhciBzYXZlQ2xvbmVzID0gL14oPzphfGJ8Y29kZXxkaXZ8ZmllbGRzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aXxsYWJlbHxsaXxvbHxwfHF8c3BhbnxzdHJvbmd8c3R5bGV8dGFibGV8dGJvZHl8dGR8dGh8dHJ8dWwpJC9pO1xuXG4gICAgICAgIC8qKiBEZXRlY3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyBkZWZhdWx0IGh0bWw1IHN0eWxlcyAqL1xuICAgICAgICB2YXIgc3VwcG9ydHNIdG1sNVN0eWxlcztcblxuICAgICAgICAvKiogTmFtZSBvZiB0aGUgZXhwYW5kbywgdG8gd29yayB3aXRoIG11bHRpcGxlIGRvY3VtZW50cyBvciB0byByZS1zaGl2IG9uZSBkb2N1bWVudCAqL1xuICAgICAgICB2YXIgZXhwYW5kbyA9ICdfaHRtbDVzaGl2JztcblxuICAgICAgICAvKiogVGhlIGlkIGZvciB0aGUgdGhlIGRvY3VtZW50cyBleHBhbmRvICovXG4gICAgICAgIHZhciBleHBhbklEID0gMDtcblxuICAgICAgICAvKiogQ2FjaGVkIGRhdGEgZm9yIGVhY2ggZG9jdW1lbnQgKi9cbiAgICAgICAgdmFyIGV4cGFuZG9EYXRhID0ge307XG5cbiAgICAgICAgLyoqIERldGVjdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHVua25vd24gZWxlbWVudHMgKi9cbiAgICAgICAgdmFyIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzO1xuXG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBhLmlubmVySFRNTCA9ICc8eHl6PjwveHl6Pic7XG4gICAgICAgICAgICAvL2lmIHRoZSBoaWRkZW4gcHJvcGVydHkgaXMgaW1wbGVtZW50ZWQgd2UgY2FuIGFzc3VtZSwgdGhhdCB0aGUgYnJvd3NlciBzdXBwb3J0cyBiYXNpYyBIVE1MNSBTdHlsZXNcbiAgICAgICAgICAgIHN1cHBvcnRzSHRtbDVTdHlsZXMgPSAoJ2hpZGRlbicgaW4gYSk7XG5cbiAgICAgICAgICAgIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzID0gYS5jaGlsZE5vZGVzLmxlbmd0aCA9PSAxIHx8IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgLy8gYXNzaWduIGEgZmFsc2UgcG9zaXRpdmUgaWYgdW5hYmxlIHRvIHNoaXZcbiAgICAgICAgICAgICAgKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpKCdhJyk7XG4gICAgICAgICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBmcmFnLmNsb25lTm9kZSA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIHR5cGVvZiBmcmFnLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQgPT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZnJhZy5jcmVhdGVFbGVtZW50ID09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgLy8gYXNzaWduIGEgZmFsc2UgcG9zaXRpdmUgaWYgZGV0ZWN0aW9uIGZhaWxzID0+IHVuYWJsZSB0byBzaGl2XG4gICAgICAgICAgICBzdXBwb3J0c0h0bWw1U3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSgpKTtcblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHN0eWxlIHNoZWV0IHdpdGggdGhlIGdpdmVuIENTUyB0ZXh0IGFuZCBhZGRzIGl0IHRvIHRoZSBkb2N1bWVudC5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQuXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjc3NUZXh0IFRoZSBDU1MgdGV4dC5cbiAgICAgICAgICogQHJldHVybnMge1N0eWxlU2hlZXR9IFRoZSBzdHlsZSBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gYWRkU3R5bGVTaGVldChvd25lckRvY3VtZW50LCBjc3NUZXh0KSB7XG4gICAgICAgICAgdmFyIHAgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICAgICAgICBwYXJlbnQgPSBvd25lckRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0gfHwgb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgICBwLmlubmVySFRNTCA9ICd4PHN0eWxlPicgKyBjc3NUZXh0ICsgJzwvc3R5bGU+JztcbiAgICAgICAgICByZXR1cm4gcGFyZW50Lmluc2VydEJlZm9yZShwLmxhc3RDaGlsZCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGBodG1sNS5lbGVtZW50c2AgYXMgYW4gYXJyYXkuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2Ygc2hpdmVkIGVsZW1lbnQgbm9kZSBuYW1lcy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRzKCkge1xuICAgICAgICAgIHZhciBlbGVtZW50cyA9IGh0bWw1LmVsZW1lbnRzO1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgZWxlbWVudHMgPT0gJ3N0cmluZycgPyBlbGVtZW50cy5zcGxpdCgnICcpIDogZWxlbWVudHM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZGF0YSBhc3NvY2lhdGVkIHRvIHRoZSBnaXZlbiBkb2N1bWVudFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudC5cbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IG9mIGRhdGEuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBleHBhbmRvRGF0YVtvd25lckRvY3VtZW50W2V4cGFuZG9dXTtcbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSB7fTtcbiAgICAgICAgICAgIGV4cGFuSUQrKztcbiAgICAgICAgICAgIG93bmVyRG9jdW1lbnRbZXhwYW5kb10gPSBleHBhbklEO1xuICAgICAgICAgICAgZXhwYW5kb0RhdGFbZXhwYW5JRF0gPSBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm5zIGEgc2hpdmVkIGVsZW1lbnQgZm9yIHRoZSBnaXZlbiBub2RlTmFtZSBhbmQgZG9jdW1lbnRcbiAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBub2RlTmFtZSBuYW1lIG9mIHRoZSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGNvbnRleHQgZG9jdW1lbnQuXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBzaGl2ZWQgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobm9kZU5hbWUsIG93bmVyRG9jdW1lbnQsIGRhdGEpe1xuICAgICAgICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihzdXBwb3J0c1Vua25vd25FbGVtZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gZ2V0RXhwYW5kb0RhdGEob3duZXJEb2N1bWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBub2RlO1xuXG4gICAgICAgICAgaWYgKGRhdGEuY2FjaGVbbm9kZU5hbWVdKSB7XG4gICAgICAgICAgICBub2RlID0gZGF0YS5jYWNoZVtub2RlTmFtZV0uY2xvbmVOb2RlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzYXZlQ2xvbmVzLnRlc3Qobm9kZU5hbWUpKSB7XG4gICAgICAgICAgICBub2RlID0gKGRhdGEuY2FjaGVbbm9kZU5hbWVdID0gZGF0YS5jcmVhdGVFbGVtKG5vZGVOYW1lKSkuY2xvbmVOb2RlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF2b2lkIGFkZGluZyBzb21lIGVsZW1lbnRzIHRvIGZyYWdtZW50cyBpbiBJRSA8IDkgYmVjYXVzZVxuICAgICAgICAgIC8vICogQXR0cmlidXRlcyBsaWtlIGBuYW1lYCBvciBgdHlwZWAgY2Fubm90IGJlIHNldC9jaGFuZ2VkIG9uY2UgYW4gZWxlbWVudFxuICAgICAgICAgIC8vICAgaXMgaW5zZXJ0ZWQgaW50byBhIGRvY3VtZW50L2ZyYWdtZW50XG4gICAgICAgICAgLy8gKiBMaW5rIGVsZW1lbnRzIHdpdGggYHNyY2AgYXR0cmlidXRlcyB0aGF0IGFyZSBpbmFjY2Vzc2libGUsIGFzIHdpdGhcbiAgICAgICAgICAvLyAgIGEgNDAzIHJlc3BvbnNlLCB3aWxsIGNhdXNlIHRoZSB0YWIvd2luZG93IHRvIGNyYXNoXG4gICAgICAgICAgLy8gKiBTY3JpcHQgZWxlbWVudHMgYXBwZW5kZWQgdG8gZnJhZ21lbnRzIHdpbGwgZXhlY3V0ZSB3aGVuIHRoZWlyIGBzcmNgXG4gICAgICAgICAgLy8gICBvciBgdGV4dGAgcHJvcGVydHkgaXMgc2V0XG4gICAgICAgICAgcmV0dXJuIG5vZGUuY2FuSGF2ZUNoaWxkcmVuICYmICFyZVNraXAudGVzdChub2RlTmFtZSkgJiYgIW5vZGUudGFnVXJuID8gZGF0YS5mcmFnLmFwcGVuZENoaWxkKG5vZGUpIDogbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXR1cm5zIGEgc2hpdmVkIERvY3VtZW50RnJhZ21lbnQgZm9yIHRoZSBnaXZlbiBkb2N1bWVudFxuICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgY29udGV4dCBkb2N1bWVudC5cbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gVGhlIHNoaXZlZCBEb2N1bWVudEZyYWdtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRG9jdW1lbnRGcmFnbWVudChvd25lckRvY3VtZW50LCBkYXRhKXtcbiAgICAgICAgICBpZiAoIW93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG93bmVyRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoc3VwcG9ydHNVbmtub3duRWxlbWVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhID0gZGF0YSB8fCBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcbiAgICAgICAgICB2YXIgY2xvbmUgPSBkYXRhLmZyYWcuY2xvbmVOb2RlKCksXG4gICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgZWxlbXMgPSBnZXRFbGVtZW50cygpLFxuICAgICAgICAgIGwgPSBlbGVtcy5sZW5ndGg7XG4gICAgICAgICAgZm9yKDtpPGw7aSsrKXtcbiAgICAgICAgICAgIGNsb25lLmNyZWF0ZUVsZW1lbnQoZWxlbXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hpdnMgdGhlIGBjcmVhdGVFbGVtZW50YCBhbmQgYGNyZWF0ZURvY3VtZW50RnJhZ21lbnRgIG1ldGhvZHMgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fERvY3VtZW50RnJhZ21lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50LlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzaGl2TWV0aG9kcyhvd25lckRvY3VtZW50LCBkYXRhKSB7XG4gICAgICAgICAgaWYgKCFkYXRhLmNhY2hlKSB7XG4gICAgICAgICAgICBkYXRhLmNhY2hlID0ge307XG4gICAgICAgICAgICBkYXRhLmNyZWF0ZUVsZW0gPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQ7XG4gICAgICAgICAgICBkYXRhLmNyZWF0ZUZyYWcgPSBvd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQ7XG4gICAgICAgICAgICBkYXRhLmZyYWcgPSBkYXRhLmNyZWF0ZUZyYWcoKTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG5vZGVOYW1lKSB7XG4gICAgICAgICAgICAvL2Fib3J0IHNoaXZcbiAgICAgICAgICAgIGlmICghaHRtbDUuc2hpdk1ldGhvZHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IEZ1bmN0aW9uKCdoLGYnLCAncmV0dXJuIGZ1bmN0aW9uKCl7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhciBuPWYuY2xvbmVOb2RlKCksYz1uLmNyZWF0ZUVsZW1lbnQ7JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2guc2hpdk1ldGhvZHMmJignICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1bnJvbGwgdGhlIGBjcmVhdGVFbGVtZW50YCBjYWxsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEVsZW1lbnRzKCkuam9pbigpLnJlcGxhY2UoL1tcXHdcXC1dKy9nLCBmdW5jdGlvbihub2RlTmFtZSkge1xuICAgICAgICAgICAgZGF0YS5jcmVhdGVFbGVtKG5vZGVOYW1lKTtcbiAgICAgICAgICAgIGRhdGEuZnJhZy5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKTtcbiAgICAgICAgICAgIHJldHVybiAnYyhcIicgKyBub2RlTmFtZSArICdcIiknO1xuICAgICAgICAgIH0pICtcbiAgICAgICAgICAgICcpO3JldHVybiBufSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkoaHRtbDUsIGRhdGEuZnJhZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hpdnMgdGhlIGdpdmVuIGRvY3VtZW50LlxuICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQgdG8gc2hpdi5cbiAgICAgICAgICogQHJldHVybnMge0RvY3VtZW50fSBUaGUgc2hpdmVkIGRvY3VtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2hpdkRvY3VtZW50KG93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICBpZiAoIW93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG93bmVyRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGRhdGEgPSBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcblxuICAgICAgICAgIGlmIChodG1sNS5zaGl2Q1NTICYmICFzdXBwb3J0c0h0bWw1U3R5bGVzICYmICFkYXRhLmhhc0NTUykge1xuICAgICAgICAgICAgZGF0YS5oYXNDU1MgPSAhIWFkZFN0eWxlU2hlZXQob3duZXJEb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlY3RzIGJsb2NrIGRpc3BsYXkgbm90IGRlZmluZWQgaW4gSUU2LzcvOC85XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXJ0aWNsZSxhc2lkZSxkaWFsb2csZmlnY2FwdGlvbixmaWd1cmUsZm9vdGVyLGhlYWRlcixoZ3JvdXAsbWFpbixuYXYsc2VjdGlvbntkaXNwbGF5OmJsb2NrfScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGRzIHN0eWxpbmcgbm90IHByZXNlbnQgaW4gSUU2LzcvOC85XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXJre2JhY2tncm91bmQ6I0ZGMDtjb2xvcjojMDAwfScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoaWRlcyBub24tcmVuZGVyZWQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RlbXBsYXRle2Rpc3BsYXk6bm9uZX0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc3VwcG9ydHNVbmtub3duRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHNoaXZNZXRob2RzKG93bmVyRG9jdW1lbnQsIGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3duZXJEb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgYGh0bWw1YCBvYmplY3QgaXMgZXhwb3NlZCBzbyB0aGF0IG1vcmUgZWxlbWVudHMgY2FuIGJlIHNoaXZlZCBhbmRcbiAgICAgICAgICogZXhpc3Rpbmcgc2hpdmluZyBjYW4gYmUgZGV0ZWN0ZWQgb24gaWZyYW1lcy5cbiAgICAgICAgICogQHR5cGUgT2JqZWN0XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqIC8vIG9wdGlvbnMgY2FuIGJlIGNoYW5nZWQgYmVmb3JlIHRoZSBzY3JpcHQgaXMgaW5jbHVkZWRcbiAgICAgICAgICogaHRtbDUgPSB7ICdlbGVtZW50cyc6ICdtYXJrIHNlY3Rpb24nLCAnc2hpdkNTUyc6IGZhbHNlLCAnc2hpdk1ldGhvZHMnOiBmYWxzZSB9O1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGh0bWw1ID0ge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQW4gYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBub2RlIG5hbWVzIG9mIHRoZSBlbGVtZW50cyB0byBzaGl2LlxuICAgICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgICAqIEB0eXBlIEFycmF5fFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgICdlbGVtZW50cyc6IG9wdGlvbnMuZWxlbWVudHMgfHwgJ2FiYnIgYXJ0aWNsZSBhc2lkZSBhdWRpbyBiZGkgY2FudmFzIGRhdGEgZGF0YWxpc3QgZGV0YWlscyBkaWFsb2cgZmlnY2FwdGlvbiBmaWd1cmUgZm9vdGVyIGhlYWRlciBoZ3JvdXAgbWFpbiBtYXJrIG1ldGVyIG5hdiBvdXRwdXQgcHJvZ3Jlc3Mgc2VjdGlvbiBzdW1tYXJ5IHRlbXBsYXRlIHRpbWUgdmlkZW8nLFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogY3VycmVudCB2ZXJzaW9uIG9mIGh0bWw1c2hpdlxuICAgICAgICAgICAqL1xuICAgICAgICAgICd2ZXJzaW9uJzogdmVyc2lvbixcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSBIVE1MNSBzdHlsZSBzaGVldCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gICAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgICdzaGl2Q1NTJzogKG9wdGlvbnMuc2hpdkNTUyAhPT0gZmFsc2UpLFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSXMgZXF1YWwgdG8gdHJ1ZSBpZiBhIGJyb3dzZXIgc3VwcG9ydHMgY3JlYXRpbmcgdW5rbm93bi9IVE1MNSBlbGVtZW50c1xuICAgICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICAnc3VwcG9ydHNVbmtub3duRWxlbWVudHMnOiBzdXBwb3J0c1Vua25vd25FbGVtZW50cyxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEEgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSBkb2N1bWVudCdzIGBjcmVhdGVFbGVtZW50YCBhbmQgYGNyZWF0ZURvY3VtZW50RnJhZ21lbnRgXG4gICAgICAgICAgICogbWV0aG9kcyBzaG91bGQgYmUgb3ZlcndyaXR0ZW4uXG4gICAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgICdzaGl2TWV0aG9kcyc6IChvcHRpb25zLnNoaXZNZXRob2RzICE9PSBmYWxzZSksXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBIHN0cmluZyB0byBkZXNjcmliZSB0aGUgdHlwZSBvZiBgaHRtbDVgIG9iamVjdCAoXCJkZWZhdWx0XCIgb3IgXCJkZWZhdWx0IHByaW50XCIpLlxuICAgICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgICd0eXBlJzogJ2RlZmF1bHQnLFxuXG4gICAgICAgICAgLy8gc2hpdnMgdGhlIGRvY3VtZW50IGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGBodG1sNWAgb2JqZWN0IG9wdGlvbnNcbiAgICAgICAgICAnc2hpdkRvY3VtZW50Jzogc2hpdkRvY3VtZW50LFxuXG4gICAgICAgICAgLy9jcmVhdGVzIGEgc2hpdmVkIGVsZW1lbnRcbiAgICAgICAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuXG4gICAgICAgICAgLy9jcmVhdGVzIGEgc2hpdmVkIGRvY3VtZW50RnJhZ21lbnRcbiAgICAgICAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50OiBjcmVhdGVEb2N1bWVudEZyYWdtZW50XG4gICAgICAgIH07XG5cbiAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgLy8gZXhwb3NlIGh0bWw1XG4gICAgICAgIHdpbmRvdy5odG1sNSA9IGh0bWw1O1xuXG4gICAgICAgIC8vIHNoaXYgdGhlIGRvY3VtZW50XG4gICAgICAgIHNoaXZEb2N1bWVudChkb2N1bWVudCk7XG5cbiAgICB9KHRoaXMsIGRvY3VtZW50KSk7XG4gICAgLyo+PnNoaXYqL1xuXG4gICAgLy8gQXNzaWduIHByaXZhdGUgcHJvcGVydGllcyB0byB0aGUgcmV0dXJuIG9iamVjdCB3aXRoIHByZWZpeFxuICAgIE1vZGVybml6ci5fdmVyc2lvbiAgICAgID0gdmVyc2lvbjtcblxuICAgIC8vIGV4cG9zZSB0aGVzZSBmb3IgdGhlIHBsdWdpbiBBUEkuIExvb2sgaW4gdGhlIHNvdXJjZSBmb3IgaG93IHRvIGpvaW4oKSB0aGVtIGFnYWluc3QgeW91ciBpbnB1dFxuICAgIC8qPj5wcmVmaXhlcyovXG4gICAgTW9kZXJuaXpyLl9wcmVmaXhlcyAgICAgPSBwcmVmaXhlcztcbiAgICAvKj4+cHJlZml4ZXMqL1xuICAgIC8qPj5kb21wcmVmaXhlcyovXG4gICAgTW9kZXJuaXpyLl9kb21QcmVmaXhlcyAgPSBkb21QcmVmaXhlcztcbiAgICBNb2Rlcm5penIuX2Nzc29tUHJlZml4ZXMgID0gY3Nzb21QcmVmaXhlcztcbiAgICAvKj4+ZG9tcHJlZml4ZXMqL1xuXG4gICAgLyo+Pm1xKi9cbiAgICAvLyBNb2Rlcm5penIubXEgdGVzdHMgYSBnaXZlbiBtZWRpYSBxdWVyeSwgbGl2ZSBhZ2FpbnN0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB3aW5kb3dcbiAgICAvLyBBIGZldyBpbXBvcnRhbnQgbm90ZXM6XG4gICAgLy8gICAqIElmIGEgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IG1lZGlhIHF1ZXJpZXMgYXQgYWxsIChlZy4gb2xkSUUpIHRoZSBtcSgpIHdpbGwgYWx3YXlzIHJldHVybiBmYWxzZVxuICAgIC8vICAgKiBBIG1heC13aWR0aCBvciBvcmllbnRhdGlvbiBxdWVyeSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0IHRoZSBjdXJyZW50IHN0YXRlLCB3aGljaCBtYXkgY2hhbmdlIGxhdGVyLlxuICAgIC8vICAgKiBZb3UgbXVzdCBzcGVjaWZ5IHZhbHVlcy4gRWcuIElmIHlvdSBhcmUgdGVzdGluZyBzdXBwb3J0IGZvciB0aGUgbWluLXdpZHRoIG1lZGlhIHF1ZXJ5IHVzZTpcbiAgICAvLyAgICAgICBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6MCknKVxuICAgIC8vIHVzYWdlOlxuICAgIC8vIE1vZGVybml6ci5tcSgnb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NzY4KScpXG4gICAgTW9kZXJuaXpyLm1xICAgICAgICAgICAgPSB0ZXN0TWVkaWFRdWVyeTtcbiAgICAvKj4+bXEqL1xuXG4gICAgLyo+Pmhhc2V2ZW50Ki9cbiAgICAvLyBNb2Rlcm5penIuaGFzRXZlbnQoKSBkZXRlY3RzIHN1cHBvcnQgZm9yIGEgZ2l2ZW4gZXZlbnQsIHdpdGggYW4gb3B0aW9uYWwgZWxlbWVudCB0byB0ZXN0IG9uXG4gICAgLy8gTW9kZXJuaXpyLmhhc0V2ZW50KCdnZXN0dXJlc3RhcnQnLCBlbGVtKVxuICAgIE1vZGVybml6ci5oYXNFdmVudCAgICAgID0gaXNFdmVudFN1cHBvcnRlZDtcbiAgICAvKj4+aGFzZXZlbnQqL1xuXG4gICAgLyo+PnRlc3Rwcm9wKi9cbiAgICAvLyBNb2Rlcm5penIudGVzdFByb3AoKSBpbnZlc3RpZ2F0ZXMgd2hldGhlciBhIGdpdmVuIHN0eWxlIHByb3BlcnR5IGlzIHJlY29nbml6ZWRcbiAgICAvLyBOb3RlIHRoYXQgdGhlIHByb3BlcnR5IG5hbWVzIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhlIGNhbWVsQ2FzZSB2YXJpYW50LlxuICAgIC8vIE1vZGVybml6ci50ZXN0UHJvcCgncG9pbnRlckV2ZW50cycpXG4gICAgTW9kZXJuaXpyLnRlc3RQcm9wICAgICAgPSBmdW5jdGlvbihwcm9wKXtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wcyhbcHJvcF0pO1xuICAgIH07XG4gICAgLyo+PnRlc3Rwcm9wKi9cblxuICAgIC8qPj50ZXN0YWxscHJvcHMqL1xuICAgIC8vIE1vZGVybml6ci50ZXN0QWxsUHJvcHMoKSBpbnZlc3RpZ2F0ZXMgd2hldGhlciBhIGdpdmVuIHN0eWxlIHByb3BlcnR5LFxuICAgIC8vICAgb3IgYW55IG9mIGl0cyB2ZW5kb3ItcHJlZml4ZWQgdmFyaWFudHMsIGlzIHJlY29nbml6ZWRcbiAgICAvLyBOb3RlIHRoYXQgdGhlIHByb3BlcnR5IG5hbWVzIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhlIGNhbWVsQ2FzZSB2YXJpYW50LlxuICAgIC8vIE1vZGVybml6ci50ZXN0QWxsUHJvcHMoJ2JveFNpemluZycpXG4gICAgTW9kZXJuaXpyLnRlc3RBbGxQcm9wcyAgPSB0ZXN0UHJvcHNBbGw7XG4gICAgLyo+PnRlc3RhbGxwcm9wcyovXG5cblxuICAgIC8qPj50ZXN0c3R5bGVzKi9cbiAgICAvLyBNb2Rlcm5penIudGVzdFN0eWxlcygpIGFsbG93cyB5b3UgdG8gYWRkIGN1c3RvbSBzdHlsZXMgdG8gdGhlIGRvY3VtZW50IGFuZCB0ZXN0IGFuIGVsZW1lbnQgYWZ0ZXJ3YXJkc1xuICAgIC8vIE1vZGVybml6ci50ZXN0U3R5bGVzKCcjbW9kZXJuaXpyIHsgcG9zaXRpb246YWJzb2x1dGUgfScsIGZ1bmN0aW9uKGVsZW0sIHJ1bGUpeyAuLi4gfSlcbiAgICBNb2Rlcm5penIudGVzdFN0eWxlcyAgICA9IGluamVjdEVsZW1lbnRXaXRoU3R5bGVzO1xuICAgIC8qPj50ZXN0c3R5bGVzKi9cblxuXG4gICAgLyo+PnByZWZpeGVkKi9cbiAgICAvLyBNb2Rlcm5penIucHJlZml4ZWQoKSByZXR1cm5zIHRoZSBwcmVmaXhlZCBvciBub25wcmVmaXhlZCBwcm9wZXJ0eSBuYW1lIHZhcmlhbnQgb2YgeW91ciBpbnB1dFxuICAgIC8vIE1vZGVybml6ci5wcmVmaXhlZCgnYm94U2l6aW5nJykgLy8gJ01vekJveFNpemluZydcblxuICAgIC8vIFByb3BlcnRpZXMgbXVzdCBiZSBwYXNzZWQgYXMgZG9tLXN0eWxlIGNhbWVsY2FzZSwgcmF0aGVyIHRoYW4gYGJveC1zaXppbmdgIGh5cGVudGF0ZWQgc3R5bGUuXG4gICAgLy8gUmV0dXJuIHZhbHVlcyB3aWxsIGFsc28gYmUgdGhlIGNhbWVsQ2FzZSB2YXJpYW50LCBpZiB5b3UgbmVlZCB0byB0cmFuc2xhdGUgdGhhdCB0byBoeXBlbmF0ZWQgc3R5bGUgdXNlOlxuICAgIC8vXG4gICAgLy8gICAgIHN0ci5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uKHN0cixtMSl7IHJldHVybiAnLScgKyBtMS50b0xvd2VyQ2FzZSgpOyB9KS5yZXBsYWNlKC9ebXMtLywnLW1zLScpO1xuXG4gICAgLy8gSWYgeW91J3JlIHRyeWluZyB0byBhc2NlcnRhaW4gd2hpY2ggdHJhbnNpdGlvbiBlbmQgZXZlbnQgdG8gYmluZCB0bywgeW91IG1pZ2h0IGRvIHNvbWV0aGluZyBsaWtlLi4uXG4gICAgLy9cbiAgICAvLyAgICAgdmFyIHRyYW5zRW5kRXZlbnROYW1lcyA9IHtcbiAgICAvLyAgICAgICAnV2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gICAgICAgJ01velRyYW5zaXRpb24nICAgIDogJ3RyYW5zaXRpb25lbmQnLFxuICAgIC8vICAgICAgICdPVHJhbnNpdGlvbicgICAgICA6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gICAgICAgJ21zVHJhbnNpdGlvbicgICAgIDogJ01TVHJhbnNpdGlvbkVuZCcsXG4gICAgLy8gICAgICAgJ3RyYW5zaXRpb24nICAgICAgIDogJ3RyYW5zaXRpb25lbmQnXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHRyYW5zRW5kRXZlbnROYW1lID0gdHJhbnNFbmRFdmVudE5hbWVzWyBNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zaXRpb24nKSBdO1xuXG4gICAgTW9kZXJuaXpyLnByZWZpeGVkICAgICAgPSBmdW5jdGlvbihwcm9wLCBvYmosIGVsZW0pe1xuICAgICAgaWYoIW9iaikge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKHByb3AsICdwZngnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRlc3RpbmcgRE9NIHByb3BlcnR5IGUuZy4gTW9kZXJuaXpyLnByZWZpeGVkKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLCB3aW5kb3cpIC8vICdtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwocHJvcCwgb2JqLCBlbGVtKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qPj5wcmVmaXhlZCovXG5cblxuICAgIC8qPj5jc3NjbGFzc2VzKi9cbiAgICAvLyBSZW1vdmUgXCJuby1qc1wiIGNsYXNzIGZyb20gPGh0bWw+IGVsZW1lbnQsIGlmIGl0IGV4aXN0czpcbiAgICBkb2NFbGVtZW50LmNsYXNzTmFtZSA9IGRvY0VsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoLyhefFxccyluby1qcyhcXHN8JCkvLCAnJDEkMicpICtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV3IGNsYXNzZXMgdG8gdGhlIDxodG1sPiBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbmFibGVDbGFzc2VzID8gJyBqcyAnICsgY2xhc3Nlcy5qb2luKCcgJykgOiAnJyk7XG4gICAgLyo+PmNzc2NsYXNzZXMqL1xuXG4gICAgcmV0dXJuIE1vZGVybml6cjtcblxufSkodGhpcywgdGhpcy5kb2N1bWVudCk7XG4iLCIvKlxuICogRm91bmRhdGlvbiBSZXNwb25zaXZlIExpYnJhcnlcbiAqIGh0dHA6Ly9mb3VuZGF0aW9uLnp1cmIuY29tXG4gKiBDb3B5cmlnaHQgMjAxNCwgWlVSQlxuICogRnJlZSB0byB1c2UgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiovXG5cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgaGVhZGVyX2hlbHBlcnMgPSBmdW5jdGlvbiAoY2xhc3NfYXJyYXkpIHtcbiAgICB2YXIgaSA9IGNsYXNzX2FycmF5Lmxlbmd0aDtcbiAgICB2YXIgaGVhZCA9ICQoJ2hlYWQnKTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmKGhlYWQuaGFzKCcuJyArIGNsYXNzX2FycmF5W2ldKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaGVhZC5hcHBlbmQoJzxtZXRhIGNsYXNzPVwiJyArIGNsYXNzX2FycmF5W2ldICsgJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhlYWRlcl9oZWxwZXJzKFtcbiAgICAnZm91bmRhdGlvbi1tcS1zbWFsbCcsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbWVkaXVtJyxcbiAgICAnZm91bmRhdGlvbi1tcS1sYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteGxhcmdlJyxcbiAgICAnZm91bmRhdGlvbi1tcS14eGxhcmdlJyxcbiAgICAnZm91bmRhdGlvbi1kYXRhLWF0dHJpYnV0ZS1uYW1lc3BhY2UnXSk7XG5cbiAgLy8gRW5hYmxlIEZhc3RDbGljayBpZiBwcmVzZW50XG5cbiAgJChmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIEZhc3RDbGljayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIERvbid0IGF0dGFjaCB0byBib2R5IGlmIHVuZGVmaW5lZFxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gcHJpdmF0ZSBGYXN0IFNlbGVjdG9yIHdyYXBwZXIsXG4gIC8vIHJldHVybnMgalF1ZXJ5IG9iamVjdC4gT25seSB1c2Ugd2hlcmVcbiAgLy8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IGF2YWlsYWJsZS5cbiAgdmFyIFMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNvbnQ7XG4gICAgICAgIGlmIChjb250ZXh0LmpxdWVyeSkge1xuICAgICAgICAgIGNvbnQgPSBjb250ZXh0WzBdO1xuICAgICAgICAgIGlmICghY29udCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udCA9IGNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQoY29udC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJChzZWxlY3RvciwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gTmFtZXNwYWNlIGZ1bmN0aW9ucy5cblxuICB2YXIgYXR0cl9uYW1lID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgaWYgKCFpbml0KSBhcnIucHVzaCgnZGF0YScpO1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSBhcnIucHVzaCh0aGlzLm5hbWVzcGFjZSk7XG4gICAgYXJyLnB1c2godGhpcy5uYW1lKTtcblxuICAgIHJldHVybiBhcnIuam9pbignLScpO1xuICB9O1xuXG4gIHZhciBhZGRfbmFtZXNwYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnLScpLFxuICAgICAgICBpID0gcGFydHMubGVuZ3RoLFxuICAgICAgICBhcnIgPSBbXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIGFyci5wdXNoKHBhcnRzW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXJyLnB1c2godGhpcy5uYW1lc3BhY2UsIHBhcnRzW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnIucHVzaChwYXJ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKS5qb2luKCctJyk7XG4gIH07XG5cbiAgLy8gRXZlbnQgYmluZGluZyBhbmQgZGF0YS1vcHRpb25zIHVwZGF0aW5nLlxuXG4gIHZhciBiaW5kaW5ncyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHNob3VsZF9iaW5kX2V2ZW50cyA9ICFTKHRoaXMpLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkpO1xuXG5cbiAgICBpZiAoUyh0aGlzLnNjb3BlKS5pcygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsnXScpKSB7XG4gICAgICBTKHRoaXMuc2NvcGUpLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnLCAkLmV4dGVuZCh7fSwgdGhpcy5zZXR0aW5ncywgKG9wdGlvbnMgfHwgbWV0aG9kKSwgdGhpcy5kYXRhX29wdGlvbnMoUyh0aGlzLnNjb3BlKSkpKTtcblxuICAgICAgaWYgKHNob3VsZF9iaW5kX2V2ZW50cykge1xuICAgICAgICB0aGlzLmV2ZW50cyh0aGlzLnNjb3BlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBTKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyddJywgdGhpcy5zY29wZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaG91bGRfYmluZF9ldmVudHMgPSAhUyh0aGlzKS5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG4gICAgICAgIFModGhpcykuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcsICQuZXh0ZW5kKHt9LCBzZWxmLnNldHRpbmdzLCAob3B0aW9ucyB8fCBtZXRob2QpLCBzZWxmLmRhdGFfb3B0aW9ucyhTKHRoaXMpKSkpO1xuXG4gICAgICAgIGlmIChzaG91bGRfYmluZF9ldmVudHMpIHtcbiAgICAgICAgICBzZWxmLmV2ZW50cyh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vICMgUGF0Y2ggdG8gZml4ICM1MDQzIHRvIG1vdmUgdGhpcyAqYWZ0ZXIqIHRoZSBpZi9lbHNlIGNsYXVzZSBpbiBvcmRlciBmb3IgQmFja2JvbmUgYW5kIHNpbWlsYXIgZnJhbWV3b3JrcyB0byBoYXZlIGltcHJvdmVkIGNvbnRyb2wgb3ZlciBldmVudCBiaW5kaW5nIGFuZCBkYXRhLW9wdGlvbnMgdXBkYXRpbmcuIFxuICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kXS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICB9O1xuXG4gIHZhciBzaW5nbGVfaW1hZ2VfbG9hZGVkID0gZnVuY3Rpb24gKGltYWdlLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIGxvYWRlZCAoKSB7XG4gICAgICBjYWxsYmFjayhpbWFnZVswXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZExvYWQgKCkge1xuICAgICAgdGhpcy5vbmUoJ2xvYWQnLCBsb2FkZWQpO1xuXG4gICAgICBpZiAoL01TSUUgKFxcZCtcXC5cXGQrKTsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMuYXR0ciggJ3NyYycgKSxcbiAgICAgICAgICAgIHBhcmFtID0gc3JjLm1hdGNoKCAvXFw/LyApID8gJyYnIDogJz8nO1xuXG4gICAgICAgIHBhcmFtICs9ICdyYW5kb209JyArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuYXR0cignc3JjJywgc3JjICsgcGFyYW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW1hZ2UuYXR0cignc3JjJykpIHtcbiAgICAgIGxvYWRlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbWFnZVswXS5jb21wbGV0ZSB8fCBpbWFnZVswXS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICBsb2FkZWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmluZExvYWQuY2FsbChpbWFnZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL3BhdWxpcmlzaC9tYXRjaE1lZGlhLmpzXG4gICovXG5cbiAgd2luZG93Lm1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCAoZnVuY3Rpb24oIGRvYyApIHtcblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGJvb2wsXG4gICAgICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICByZWZOb2RlID0gZG9jRWxlbS5maXJzdEVsZW1lbnRDaGlsZCB8fCBkb2NFbGVtLmZpcnN0Q2hpbGQsXG4gICAgICAgIC8vIGZha2VCb2R5IHJlcXVpcmVkIGZvciA8RkY0IHdoZW4gZXhlY3V0ZWQgaW4gPGhlYWQ+XG4gICAgICAgIGZha2VCb2R5ID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwiYm9keVwiICksXG4gICAgICAgIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG5cbiAgICBkaXYuaWQgPSBcIm1xLXRlc3QtMVwiO1xuICAgIGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwMGVtXCI7XG4gICAgZmFrZUJvZHkuc3R5bGUuYmFja2dyb3VuZCA9IFwibm9uZVwiO1xuICAgIGZha2VCb2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHEpIHtcblxuICAgICAgZGl2LmlubmVySFRNTCA9IFwiJnNoeTs8c3R5bGUgbWVkaWE9XFxcIlwiICsgcSArIFwiXFxcIj4gI21xLXRlc3QtMSB7IHdpZHRoOiA0MnB4OyB9PC9zdHlsZT5cIjtcblxuICAgICAgZG9jRWxlbS5pbnNlcnRCZWZvcmUoIGZha2VCb2R5LCByZWZOb2RlICk7XG4gICAgICBib29sID0gZGl2Lm9mZnNldFdpZHRoID09PSA0MjtcbiAgICAgIGRvY0VsZW0ucmVtb3ZlQ2hpbGQoIGZha2VCb2R5ICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1hdGNoZXM6IGJvb2wsXG4gICAgICAgIG1lZGlhOiBxXG4gICAgICB9O1xuXG4gICAgfTtcblxuICB9KCBkb2N1bWVudCApKTtcblxuICAvKlxuICAgKiBqcXVlcnkucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nbmFyZjM3L2pxdWVyeS1yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICogUmVxdWlyZXMgalF1ZXJ5IDEuOCtcbiAgICpcbiAgICogQ29weXJpZ2h0IChjKSAyMDEyIENvcmV5IEZyYW5nXG4gICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAgICovXG5cbiAgKGZ1bmN0aW9uKCQpIHtcblxuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYWRhcHRlZCBmcm9tIEVyaWsgTcO2bGxlclxuICAvLyBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIC8vIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcblxuICB2YXIgYW5pbWF0aW5nLFxuICAgICAgbGFzdFRpbWUgPSAwLFxuICAgICAgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddLFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLFxuICAgICAganF1ZXJ5RnhBdmFpbGFibGUgPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGpRdWVyeS5meDtcblxuICBmb3IgKDsgbGFzdFRpbWUgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVxdWVzdEFuaW1hdGlvbkZyYW1lOyBsYXN0VGltZSsrKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIgXTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiIF0gfHxcbiAgICAgIHdpbmRvd1sgdmVuZG9yc1tsYXN0VGltZV0gKyBcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiIF07XG4gIH1cblxuICBmdW5jdGlvbiByYWYoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG5cbiAgICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgICBqUXVlcnkuZngudGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAvLyB1c2UgckFGXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgalF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIGlmICh0aW1lcigpICYmIGpRdWVyeS50aW1lcnMucHVzaCh0aW1lcikgJiYgIWFuaW1hdGluZykge1xuICAgICAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgcmFmKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHBvbHlmaWxsXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSksXG4gICAgICAgIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuXG4gIH1cblxuICB9KCBqUXVlcnkgKSk7XG5cblxuICBmdW5jdGlvbiByZW1vdmVRdW90ZXMgKHN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyB8fCBzdHJpbmcgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9eWydcXFxcL1wiXSt8KDtcXHM/fSkrfFsnXFxcXC9cIl0rJC9nLCAnJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIHdpbmRvdy5Gb3VuZGF0aW9uID0ge1xuICAgIG5hbWUgOiAnRm91bmRhdGlvbicsXG5cbiAgICB2ZXJzaW9uIDogJzUuMy4xJyxcblxuICAgIG1lZGlhX3F1ZXJpZXMgOiB7XG4gICAgICBzbWFsbCA6IFMoJy5mb3VuZGF0aW9uLW1xLXNtYWxsJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICBtZWRpdW0gOiBTKCcuZm91bmRhdGlvbi1tcS1tZWRpdW0nKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgIGxhcmdlIDogUygnLmZvdW5kYXRpb24tbXEtbGFyZ2UnKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgIHhsYXJnZTogUygnLmZvdW5kYXRpb24tbXEteGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICB4eGxhcmdlOiBTKCcuZm91bmRhdGlvbi1tcS14eGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJylcbiAgICB9LFxuXG4gICAgc3R5bGVzaGVldCA6ICQoJzxzdHlsZT48L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJylbMF0uc2hlZXQsXG5cbiAgICBnbG9iYWw6IHtcbiAgICAgIG5hbWVzcGFjZTogdW5kZWZpbmVkXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIGxpYnJhcmllcywgbWV0aG9kLCBvcHRpb25zLCByZXNwb25zZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbc2NvcGUsIG1ldGhvZCwgb3B0aW9ucywgcmVzcG9uc2VdLFxuICAgICAgICAgIHJlc3BvbnNlcyA9IFtdO1xuXG4gICAgICAvLyBjaGVjayBSVExcbiAgICAgIHRoaXMucnRsID0gL3J0bC9pLnRlc3QoUygnaHRtbCcpLmF0dHIoJ2RpcicpKTtcblxuICAgICAgLy8gc2V0IGZvdW5kYXRpb24gZ2xvYmFsIHNjb3BlXG4gICAgICB0aGlzLnNjb3BlID0gc2NvcGUgfHwgdGhpcy5zY29wZTtcblxuICAgICAgdGhpcy5zZXRfbmFtZXNwYWNlKCk7XG5cbiAgICAgIGlmIChsaWJyYXJpZXMgJiYgdHlwZW9mIGxpYnJhcmllcyA9PT0gJ3N0cmluZycgJiYgIS9yZWZsb3cvaS50ZXN0KGxpYnJhcmllcykpIHtcbiAgICAgICAgaWYgKHRoaXMubGlicy5oYXNPd25Qcm9wZXJ0eShsaWJyYXJpZXMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5pbml0X2xpYihsaWJyYXJpZXMsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgbGliIGluIHRoaXMubGlicykge1xuICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHRoaXMuaW5pdF9saWIobGliLCBsaWJyYXJpZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2NvcGU7XG4gICAgfSxcblxuICAgIGluaXRfbGliIDogZnVuY3Rpb24gKGxpYiwgYXJncykge1xuICAgICAgaWYgKHRoaXMubGlicy5oYXNPd25Qcm9wZXJ0eShsaWIpKSB7XG4gICAgICAgIHRoaXMucGF0Y2godGhpcy5saWJzW2xpYl0pO1xuXG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3MuaGFzT3duUHJvcGVydHkobGliKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmxpYnNbbGliXS5zZXR0aW5ncyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5zZXR0aW5ncywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLmxpYnNbbGliXS5kZWZhdWx0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5kZWZhdWx0cywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5saWJzW2xpYl0uaW5pdC5hcHBseSh0aGlzLmxpYnNbbGliXSwgW3RoaXMuc2NvcGUsIGFyZ3NbbGliXV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncyA9IGFyZ3MgaW5zdGFuY2VvZiBBcnJheSA/IGFyZ3MgOiBuZXcgQXJyYXkoYXJncyk7ICAgIC8vIFBBVENIOiBhZGRlZCB0aGlzIGxpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMubGlic1tsaWJdLmluaXQuYXBwbHkodGhpcy5saWJzW2xpYl0sIGFyZ3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgfSxcblxuICAgIHBhdGNoIDogZnVuY3Rpb24gKGxpYikge1xuICAgICAgbGliLnNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgIGxpYi5uYW1lc3BhY2UgPSB0aGlzLmdsb2JhbC5uYW1lc3BhY2U7XG4gICAgICBsaWIucnRsID0gdGhpcy5ydGw7XG4gICAgICBsaWJbJ2RhdGFfb3B0aW9ucyddID0gdGhpcy51dGlscy5kYXRhX29wdGlvbnM7XG4gICAgICBsaWJbJ2F0dHJfbmFtZSddID0gYXR0cl9uYW1lO1xuICAgICAgbGliWydhZGRfbmFtZXNwYWNlJ10gPSBhZGRfbmFtZXNwYWNlO1xuICAgICAgbGliWydiaW5kaW5ncyddID0gYmluZGluZ3M7XG4gICAgICBsaWJbJ1MnXSA9IHRoaXMudXRpbHMuUztcbiAgICB9LFxuXG4gICAgaW5oZXJpdCA6IGZ1bmN0aW9uIChzY29wZSwgbWV0aG9kcykge1xuICAgICAgdmFyIG1ldGhvZHNfYXJyID0gbWV0aG9kcy5zcGxpdCgnICcpLFxuICAgICAgICAgIGkgPSBtZXRob2RzX2Fyci5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbHMuaGFzT3duUHJvcGVydHkobWV0aG9kc19hcnJbaV0pKSB7XG4gICAgICAgICAgc2NvcGVbbWV0aG9kc19hcnJbaV1dID0gdGhpcy51dGlsc1ttZXRob2RzX2FycltpXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0X25hbWVzcGFjZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIERvbid0IGJvdGhlciByZWFkaW5nIHRoZSBuYW1lc3BhY2Ugb3V0IG9mIHRoZSBtZXRhIHRhZ1xuICAgICAgLy8gICAgaWYgdGhlIG5hbWVzcGFjZSBoYXMgYmVlbiBzZXQgZ2xvYmFsbHkgaW4gamF2YXNjcmlwdFxuICAgICAgLy9cbiAgICAgIC8vIEV4YW1wbGU6XG4gICAgICAvLyAgICBGb3VuZGF0aW9uLmdsb2JhbC5uYW1lc3BhY2UgPSAnbXktbmFtZXNwYWNlJztcbiAgICAgIC8vIG9yIG1ha2UgaXQgYW4gZW1wdHkgc3RyaW5nOlxuICAgICAgLy8gICAgRm91bmRhdGlvbi5nbG9iYWwubmFtZXNwYWNlID0gJyc7XG4gICAgICAvL1xuICAgICAgLy9cblxuICAgICAgLy8gSWYgdGhlIG5hbWVzcGFjZSBoYXMgbm90IGJlZW4gc2V0IChpcyB1bmRlZmluZWQpLCB0cnkgdG8gcmVhZCBpdCBvdXQgb2YgdGhlIG1ldGEgZWxlbWVudC5cbiAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIGdsb2JhbGx5IGRlZmluZWQgbmFtZXNwYWNlLCBldmVuIGlmIGl0J3MgZW1wdHkgKCcnKVxuICAgICAgdmFyIG5hbWVzcGFjZSA9ICggdGhpcy5nbG9iYWwubmFtZXNwYWNlID09PSB1bmRlZmluZWQgKSA/ICQoJy5mb3VuZGF0aW9uLWRhdGEtYXR0cmlidXRlLW5hbWVzcGFjZScpLmNzcygnZm9udC1mYW1pbHknKSA6IHRoaXMuZ2xvYmFsLm5hbWVzcGFjZTtcblxuICAgICAgLy8gRmluYWxseSwgaWYgdGhlIG5hbXNlcGFjZSBpcyBlaXRoZXIgdW5kZWZpbmVkIG9yIGZhbHNlLCBzZXQgaXQgdG8gYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgbmFtZXNwYWNlIHZhbHVlLlxuICAgICAgdGhpcy5nbG9iYWwubmFtZXNwYWNlID0gKCBuYW1lc3BhY2UgPT09IHVuZGVmaW5lZCB8fCAvZmFsc2UvaS50ZXN0KG5hbWVzcGFjZSkgKSA/ICcnIDogbmFtZXNwYWNlO1xuICAgIH0sXG5cbiAgICBsaWJzIDoge30sXG5cbiAgICAvLyBtZXRob2RzIHRoYXQgY2FuIGJlIGluaGVyaXRlZCBpbiBsaWJyYXJpZXNcbiAgICB1dGlscyA6IHtcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBGYXN0IFNlbGVjdG9yIHdyYXBwZXIgcmV0dXJucyBqUXVlcnkgb2JqZWN0LiBPbmx5IHVzZSB3aGVyZSBnZXRFbGVtZW50QnlJZFxuICAgICAgLy8gICAgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBTZWxlY3RvciAoU3RyaW5nKTogQ1NTIHNlbGVjdG9yIGRlc2NyaWJpbmcgdGhlIGVsZW1lbnQocykgdG8gYmVcbiAgICAgIC8vICAgIHJldHVybmVkIGFzIGEgalF1ZXJ5IG9iamVjdC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBTY29wZSAoU3RyaW5nKTogQ1NTIHNlbGVjdG9yIGRlc2NyaWJpbmcgdGhlIGFyZWEgdG8gYmUgc2VhcmNoZWQuIERlZmF1bHRcbiAgICAgIC8vICAgIGlzIGRvY3VtZW50LlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBFbGVtZW50IChqUXVlcnkgT2JqZWN0KTogalF1ZXJ5IG9iamVjdCBjb250YWluaW5nIGVsZW1lbnRzIG1hdGNoaW5nIHRoZVxuICAgICAgLy8gICAgc2VsZWN0b3Igd2l0aGluIHRoZSBzY29wZS5cbiAgICAgIFMgOiBTLFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEV4ZWN1dGVzIGEgZnVuY3Rpb24gYSBtYXggb2Ygb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEZ1bmMgKEZ1bmN0aW9uKTogRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkLlxuICAgICAgLy9cbiAgICAgIC8vICAgIERlbGF5IChJbnRlZ2VyKTogRnVuY3Rpb24gZXhlY3V0aW9uIHRocmVzaG9sZCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIExhenlfZnVuY3Rpb24gKEZ1bmN0aW9uKTogRnVuY3Rpb24gd2l0aCB0aHJvdHRsaW5nIGFwcGxpZWQuXG4gICAgICB0aHJvdHRsZSA6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSkge1xuICAgICAgICB2YXIgdGltZXIgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgaWYgKHRpbWVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEV4ZWN1dGVzIGEgZnVuY3Rpb24gd2hlbiBpdCBzdG9wcyBiZWluZyBpbnZva2VkIGZvciBuIHNlY29uZHNcbiAgICAgIC8vICAgIE1vZGlmaWVkIHZlcnNpb24gb2YgXy5kZWJvdW5jZSgpIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgRnVuYyAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWQuXG4gICAgICAvL1xuICAgICAgLy8gICAgRGVsYXkgKEludGVnZXIpOiBGdW5jdGlvbiBleGVjdXRpb24gdGhyZXNob2xkIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vXG4gICAgICAvLyAgICBJbW1lZGlhdGUgKEJvb2wpOiBXaGV0aGVyIHRoZSBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgIC8vICAgIG9mIHRoZSBkZWxheSBpbnN0ZWFkIG9mIHRoZSBlbmQuIERlZmF1bHQgaXMgZmFsc2UuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIExhenlfZnVuY3Rpb24gKEZ1bmN0aW9uKTogRnVuY3Rpb24gd2l0aCBkZWJvdW5jaW5nIGFwcGxpZWQuXG4gICAgICBkZWJvdW5jZSA6IGZ1bmN0aW9uIChmdW5jLCBkZWxheSwgaW1tZWRpYXRlKSB7XG4gICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIGRlbGF5KTtcbiAgICAgICAgICBpZiAoY2FsbE5vdykgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBQYXJzZXMgZGF0YS1vcHRpb25zIGF0dHJpYnV0ZVxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEVsIChqUXVlcnkgT2JqZWN0KTogRWxlbWVudCB0byBiZSBwYXJzZWQuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIE9wdGlvbnMgKEphdmFzY3JpcHQgT2JqZWN0KTogQ29udGVudHMgb2YgdGhlIGVsZW1lbnQncyBkYXRhLW9wdGlvbnNcbiAgICAgIC8vICAgIGF0dHJpYnV0ZS5cbiAgICAgIGRhdGFfb3B0aW9ucyA6IGZ1bmN0aW9uIChlbCwgZGF0YV9hdHRyX25hbWUpIHtcbiAgICAgICAgZGF0YV9hdHRyX25hbWUgPSBkYXRhX2F0dHJfbmFtZSB8fCAnb3B0aW9ucyc7XG4gICAgICAgIHZhciBvcHRzID0ge30sIGlpLCBwLCBvcHRzX2FycixcbiAgICAgICAgICAgIGRhdGFfb3B0aW9ucyA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICB2YXIgbmFtZXNwYWNlID0gRm91bmRhdGlvbi5nbG9iYWwubmFtZXNwYWNlO1xuXG4gICAgICAgICAgICAgIGlmIChuYW1lc3BhY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kYXRhKG5hbWVzcGFjZSArICctJyArIGRhdGFfYXR0cl9uYW1lKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBlbC5kYXRhKGRhdGFfYXR0cl9uYW1lKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNhY2hlZF9vcHRpb25zID0gZGF0YV9vcHRpb25zKGVsKTtcblxuICAgICAgICBpZiAodHlwZW9mIGNhY2hlZF9vcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJldHVybiBjYWNoZWRfb3B0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHNfYXJyID0gKGNhY2hlZF9vcHRpb25zIHx8ICc6Jykuc3BsaXQoJzsnKTtcbiAgICAgICAgaWkgPSBvcHRzX2Fyci5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gaXNOdW1iZXIgKG8pIHtcbiAgICAgICAgICByZXR1cm4gISBpc05hTiAoby0wKSAmJiBvICE9PSBudWxsICYmIG8gIT09IFwiXCIgJiYgbyAhPT0gZmFsc2UgJiYgbyAhPT0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyaW0gKHN0cikge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykgcmV0dXJuICQudHJpbShzdHIpO1xuICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaWktLSkge1xuICAgICAgICAgIHAgPSBvcHRzX2FycltpaV0uc3BsaXQoJzonKTtcbiAgICAgICAgICBwID0gW3BbMF0sIHAuc2xpY2UoMSkuam9pbignOicpXTtcblxuICAgICAgICAgIGlmICgvdHJ1ZS9pLnRlc3QocFsxXSkpIHBbMV0gPSB0cnVlO1xuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KHBbMV0pKSBwWzFdID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGlzTnVtYmVyKHBbMV0pKSB7XG4gICAgICAgICAgICBpZiAocFsxXS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHBbMV0gPSBwYXJzZUludChwWzFdLCAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwWzFdID0gcGFyc2VGbG9hdChwWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocC5sZW5ndGggPT09IDIgJiYgcFswXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcHRzW3RyaW0ocFswXSldID0gdHJpbShwWzFdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgQWRkcyBKUy1yZWNvZ25pemFibGUgbWVkaWEgcXVlcmllc1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIE1lZGlhIChTdHJpbmcpOiBLZXkgc3RyaW5nIGZvciB0aGUgbWVkaWEgcXVlcnkgdG8gYmUgc3RvcmVkIGFzIGluXG4gICAgICAvLyAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNcbiAgICAgIC8vXG4gICAgICAvLyAgICBDbGFzcyAoU3RyaW5nKTogQ2xhc3MgbmFtZSBmb3IgdGhlIGdlbmVyYXRlZCA8bWV0YT4gdGFnXG4gICAgICByZWdpc3Rlcl9tZWRpYSA6IGZ1bmN0aW9uIChtZWRpYSwgbWVkaWFfY2xhc3MpIHtcbiAgICAgICAgaWYoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCgnPG1ldGEgY2xhc3M9XCInICsgbWVkaWFfY2xhc3MgKyAnXCIvPicpO1xuICAgICAgICAgIEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV0gPSByZW1vdmVRdW90ZXMoJCgnLicgKyBtZWRpYV9jbGFzcykuY3NzKCdmb250LWZhbWlseScpKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBBZGQgY3VzdG9tIENTUyB3aXRoaW4gYSBKUy1kZWZpbmVkIG1lZGlhIHF1ZXJ5XG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgUnVsZSAoU3RyaW5nKTogQ1NTIHJ1bGUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIGRvY3VtZW50LlxuICAgICAgLy9cbiAgICAgIC8vICAgIE1lZGlhIChTdHJpbmcpOiBPcHRpb25hbCBtZWRpYSBxdWVyeSBzdHJpbmcgZm9yIHRoZSBDU1MgcnVsZSB0byBiZVxuICAgICAgLy8gICAgbmVzdGVkIHVuZGVyLlxuICAgICAgYWRkX2N1c3RvbV9ydWxlIDogZnVuY3Rpb24gKHJ1bGUsIG1lZGlhKSB7XG4gICAgICAgIGlmIChtZWRpYSA9PT0gdW5kZWZpbmVkICYmIEZvdW5kYXRpb24uc3R5bGVzaGVldCkge1xuICAgICAgICAgIEZvdW5kYXRpb24uc3R5bGVzaGVldC5pbnNlcnRSdWxlKHJ1bGUsIEZvdW5kYXRpb24uc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBxdWVyeSA9IEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV07XG5cbiAgICAgICAgICBpZiAocXVlcnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgRm91bmRhdGlvbi5zdHlsZXNoZWV0Lmluc2VydFJ1bGUoJ0BtZWRpYSAnICtcbiAgICAgICAgICAgICAgRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXSArICd7ICcgKyBydWxlICsgJyB9Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIFBlcmZvcm1zIGEgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhbiBpbWFnZSBpcyBmdWxseSBsb2FkZWRcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBJbWFnZSAoalF1ZXJ5IE9iamVjdCk6IEltYWdlKHMpIHRvIGNoZWNrIGlmIGxvYWRlZC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBDYWxsYmFjayAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gaW1hZ2UgaXMgZnVsbHkgbG9hZGVkLlxuICAgICAgaW1hZ2VfbG9hZGVkIDogZnVuY3Rpb24gKGltYWdlcywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgdW5sb2FkZWQgPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgICAgICAgIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpbWFnZXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2luZ2xlX2ltYWdlX2xvYWRlZChzZWxmLlModGhpcyksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVubG9hZGVkIC09IDE7XG4gICAgICAgICAgICBpZiAodW5sb2FkZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIFJldHVybnMgYSByYW5kb20sIGFscGhhbnVtZXJpYyBzdHJpbmdcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBMZW5ndGggKEludGVnZXIpOiBMZW5ndGggb2Ygc3RyaW5nIHRvIGJlIGdlbmVyYXRlZC4gRGVmYXVsdHMgdG8gcmFuZG9tXG4gICAgICAvLyAgICBpbnRlZ2VyLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBSYW5kIChTdHJpbmcpOiBQc2V1ZG8tcmFuZG9tLCBhbHBoYW51bWVyaWMgc3RyaW5nLlxuICAgICAgcmFuZG9tX3N0ciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpZHgpIHRoaXMuZmlkeCA9IDA7XG4gICAgICAgIHRoaXMucHJlZml4ID0gdGhpcy5wcmVmaXggfHwgWyh0aGlzLm5hbWUgfHwgJ0YnKSwgKCtuZXcgRGF0ZSkudG9TdHJpbmcoMzYpXS5qb2luKCctJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsgKHRoaXMuZmlkeCsrKS50b1N0cmluZygzNik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICQuZm4uZm91bmRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5pdC5hcHBseShGb3VuZGF0aW9uLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9O1xuXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duID0ge1xuICAgIG5hbWUgOiAnZHJvcGRvd24nLFxuXG4gICAgdmVyc2lvbiA6ICc1LjMuMScsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIGFjdGl2ZV9jbGFzczogJ29wZW4nLFxuICAgICAgYWxpZ246ICdib3R0b20nLFxuICAgICAgaXNfaG92ZXI6IGZhbHNlLFxuICAgICAgb3BlbmVkOiBmdW5jdGlvbigpe30sXG4gICAgICBjbG9zZWQ6IGZ1bmN0aW9uKCl7fVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAndGhyb3R0bGUnKTtcblxuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gc2VsZi5TO1xuXG4gICAgICBTKHRoaXMuc2NvcGUpXG4gICAgICAgIC5vZmYoJy5kcm9wZG93bicpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4uZHJvcGRvd24nLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBzZXR0aW5ncyA9IFModGhpcykuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5pc19ob3ZlciB8fCBNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlKCQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWVudGVyLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddLCBbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICBkcm9wZG93bixcbiAgICAgICAgICAgICAgdGFyZ2V0O1xuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dCk7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgZHJvcGRvd24gPSBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gJHRoaXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRyb3Bkb3duID0gJHRoaXM7XG4gICAgICAgICAgICB0YXJnZXQgPSBTKFwiW1wiICsgc2VsZi5hdHRyX25hbWUoKSArIFwiPSdcIiArIGRyb3Bkb3duLmF0dHIoJ2lkJykgKyBcIiddXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHRhcmdldC5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JykgfHwgc2VsZi5zZXR0aW5ncztcbiAgICAgICAgICBcbiAgICAgICAgICBpZihTKGUudGFyZ2V0KS5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpICYmIHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICBzZWxmLmNsb3NlYWxsLmNhbGwoc2VsZik7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikgc2VsZi5vcGVuLmFwcGx5KHNlbGYsIFtkcm9wZG93biwgdGFyZ2V0XSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5kcm9wZG93bicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSwgWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKTtcbiAgICAgICAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9ICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnPVwiJyArIFModGhpcykuYXR0cignaWQnKSArICdcIl0nKSxcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdGFyZ2V0LmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHNlbGYuY2xvc2UuY2FsbChzZWxmLCAkdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfS5iaW5kKHRoaXMpLCAxNTApO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpO1xuXG4gICAgICAgICAgaWYgKFMoZS50YXJnZXQpLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkgfHwgUyhlLnRhcmdldCkucGFyZW50KCkuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIShTKGUudGFyZ2V0KS5kYXRhKCdyZXZlYWxJZCcpKSAmJiBcbiAgICAgICAgICAgIChwYXJlbnQubGVuZ3RoID4gMCAmJiAoUyhlLnRhcmdldCkuaXMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSB8fCBcbiAgICAgICAgICAgICAgJC5jb250YWlucyhwYXJlbnQuZmlyc3QoKVswXSwgZS50YXJnZXQpKSkpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignb3BlbmVkLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9wZW5lZC5jYWxsKHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2Nsb3NlZC5mbmR0bi5kcm9wZG93bicsICdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5jbG9zZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIFMod2luZG93KVxuICAgICAgICAub2ZmKCcuZHJvcGRvd24nKVxuICAgICAgICAub24oJ3Jlc2l6ZS5mbmR0bi5kcm9wZG93bicsIHNlbGYudGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucmVzaXplLmNhbGwoc2VsZik7XG4gICAgICAgIH0sIDUwKSk7XG5cbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbiAoZHJvcGRvd24pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGRyb3Bkb3duLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VsZi5TKHRoaXMpLmhhc0NsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKSkge1xuICAgICAgICAgIHNlbGYuUyh0aGlzKVxuICAgICAgICAgICAgLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCc6J2xlZnQnLCAnLTk5OTk5cHgnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKVxuICAgICAgICAgICAgLnByZXYoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhzZWxmLnNldHRpbmdzLmFjdGl2ZV9jbGFzcylcbiAgICAgICAgICAgIC5yZW1vdmVEYXRhKCd0YXJnZXQnKTtcblxuICAgICAgICAgIHNlbGYuUyh0aGlzKS50cmlnZ2VyKCdjbG9zZWQnKS50cmlnZ2VyKCdjbG9zZWQuZm5kdG4uZHJvcGRvd24nLCBbZHJvcGRvd25dKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNsb3NlYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICQuZWFjaChzZWxmLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0nKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBzZWxmLlModGhpcykpXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgb3BlbjogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpc1xuICAgICAgICAgIC5jc3MoZHJvcGRvd25cbiAgICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdGl2ZV9jbGFzcyksIHRhcmdldCk7XG4gICAgICAgIGRyb3Bkb3duLnByZXYoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpO1xuICAgICAgICBkcm9wZG93bi5kYXRhKCd0YXJnZXQnLCB0YXJnZXQuZ2V0KDApKS50cmlnZ2VyKCdvcGVuZWQnKS50cmlnZ2VyKCdvcGVuZWQuZm5kdG4uZHJvcGRvd24nLCBbZHJvcGRvd24sIHRhcmdldF0pO1xuICAgIH0sXG5cbiAgICBkYXRhX2F0dHI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZSArICctJyArIHRoaXMubmFtZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIGRyb3Bkb3duID0gdGhpcy5TKCcjJyArIHRhcmdldC5kYXRhKHRoaXMuZGF0YV9hdHRyKCkpKTtcbiAgICAgIGlmIChkcm9wZG93bi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gTm8gZHJvcGRvd24gZm91bmQsIG5vdCBjb250aW51aW5nXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbG9zZS5jYWxsKHRoaXMsIHRoaXMuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpLm5vdChkcm9wZG93bikpO1xuXG4gICAgICBpZiAoZHJvcGRvd24uaGFzQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UuY2FsbCh0aGlzLCBkcm9wZG93bik7XG4gICAgICAgIGlmIChkcm9wZG93bi5kYXRhKCd0YXJnZXQnKSAhPT0gdGFyZ2V0LmdldCgwKSlcbiAgICAgICAgICB0aGlzLm9wZW4uY2FsbCh0aGlzLCBkcm9wZG93biwgdGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3Blbi5jYWxsKHRoaXMsIGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNpemUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZHJvcGRvd24gPSB0aGlzLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0ub3BlbicpLFxuICAgICAgICAgIHRhcmdldCA9IHRoaXMuUyhcIltcIiArIHRoaXMuYXR0cl9uYW1lKCkgKyBcIj0nXCIgKyBkcm9wZG93bi5hdHRyKCdpZCcpICsgXCInXVwiKTtcblxuICAgICAgaWYgKGRyb3Bkb3duLmxlbmd0aCAmJiB0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuY3NzKGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjc3MgOiBmdW5jdGlvbiAoZHJvcGRvd24sIHRhcmdldCkge1xuICAgICAgdmFyIGxlZnRfb2Zmc2V0ID0gTWF0aC5tYXgoKHRhcmdldC53aWR0aCgpIC0gZHJvcGRvd24ud2lkdGgoKSkgLyAyLCA4KTtcbiAgICAgIFxuICAgICAgdGhpcy5jbGVhcl9pZHgoKTtcblxuICAgICAgaWYgKHRoaXMuc21hbGwoKSkge1xuICAgICAgICB2YXIgcCA9IHRoaXMuZGlycy5ib3R0b20uY2FsbChkcm9wZG93biwgdGFyZ2V0KTtcblxuICAgICAgICBkcm9wZG93bi5hdHRyKCdzdHlsZScsICcnKS5yZW1vdmVDbGFzcygnZHJvcC1sZWZ0IGRyb3AtcmlnaHQgZHJvcC10b3AnKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICB3aWR0aDogJzk1JScsXG4gICAgICAgICAgJ21heC13aWR0aCc6ICdub25lJyxcbiAgICAgICAgICB0b3A6IHAudG9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRyb3Bkb3duLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCc6J2xlZnQnLCBsZWZ0X29mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3M7XG5cbiAgICAgICAgdGhpcy5zdHlsZShkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wZG93bjtcbiAgICB9LFxuXG4gICAgc3R5bGUgOiBmdW5jdGlvbiAoZHJvcGRvd24sIHRhcmdldCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBjc3MgPSAkLmV4dGVuZCh7cG9zaXRpb246ICdhYnNvbHV0ZSd9LCBcbiAgICAgICAgdGhpcy5kaXJzW3NldHRpbmdzLmFsaWduXS5jYWxsKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKSk7XG5cbiAgICAgIGRyb3Bkb3duLmF0dHIoJ3N0eWxlJywgJycpLmNzcyhjc3MpO1xuICAgIH0sXG5cbiAgICAvLyByZXR1cm4gQ1NTIHByb3BlcnR5IG9iamVjdFxuICAgIC8vIGB0aGlzYCBpcyB0aGUgZHJvcGRvd25cbiAgICBkaXJzIDoge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRhcmdldCBvZmZzZXRcbiAgICAgIF9iYXNlIDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIG9fcCA9IHRoaXMub2Zmc2V0UGFyZW50KCksXG4gICAgICAgICAgICBvID0gb19wLm9mZnNldCgpLFxuICAgICAgICAgICAgcCA9IHQub2Zmc2V0KCk7XG5cbiAgICAgICAgcC50b3AgLT0gby50b3A7XG4gICAgICAgIHAubGVmdCAtPSBvLmxlZnQ7XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9LFxuICAgICAgdG9wOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bixcbiAgICAgICAgICAgIHAgPSBzZWxmLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KSxcbiAgICAgICAgICAgIHBpcF9vZmZzZXRfYmFzZSA9IDg7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC10b3AnKTtcblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAocGlwX29mZnNldF9iYXNlLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChGb3VuZGF0aW9uLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdDogcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKSwgXG4gICAgICAgICAgICB0b3A6IHAudG9wIC0gdGhpcy5vdXRlckhlaWdodCgpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7bGVmdDogcC5sZWZ0LCB0b3A6IHAudG9wIC0gdGhpcy5vdXRlckhlaWdodCgpfTtcbiAgICAgIH0sXG4gICAgICBib3R0b206IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIHZhciBzZWxmID0gRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duLFxuICAgICAgICAgICAgcCA9IHNlbGYuZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpLFxuICAgICAgICAgICAgcGlwX29mZnNldF9iYXNlID0gODtcblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAocGlwX29mZnNldF9iYXNlLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdDogcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKSwgdG9wOiBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQ6IHAubGVmdCwgdG9wOiBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKX07XG4gICAgICB9LFxuICAgICAgbGVmdDogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgdmFyIHAgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd24uZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2Ryb3AtbGVmdCcpO1xuXG4gICAgICAgIHJldHVybiB7bGVmdDogcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCksIHRvcDogcC50b3B9O1xuICAgICAgfSxcbiAgICAgIHJpZ2h0OiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgcCA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC1yaWdodCcpO1xuXG4gICAgICAgIHJldHVybiB7bGVmdDogcC5sZWZ0ICsgdC5vdXRlcldpZHRoKCksIHRvcDogcC50b3B9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJbnNlcnQgcnVsZSB0byBzdHlsZSBwc3VlZG8gZWxlbWVudHNcbiAgICBhZGp1c3RfcGlwIDogZnVuY3Rpb24gKHBpcF9vZmZzZXRfYmFzZSwgcCkge1xuICAgICAgdmFyIHNoZWV0ID0gRm91bmRhdGlvbi5zdHlsZXNoZWV0O1xuXG4gICAgICBpZiAodGhpcy5zbWFsbCgpKSB7XG4gICAgICAgIHBpcF9vZmZzZXRfYmFzZSArPSBwLmxlZnQgLSA4O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJ1bGVfaWR4ID0gc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuXG4gICAgICB2YXIgc2VsX2JlZm9yZSA9ICcuZi1kcm9wZG93bi5vcGVuOmJlZm9yZScsXG4gICAgICAgICAgc2VsX2FmdGVyICA9ICcuZi1kcm9wZG93bi5vcGVuOmFmdGVyJyxcbiAgICAgICAgICBjc3NfYmVmb3JlID0gJ2xlZnQ6ICcgKyBwaXBfb2Zmc2V0X2Jhc2UgKyAncHg7JyxcbiAgICAgICAgICBjc3NfYWZ0ZXIgID0gJ2xlZnQ6ICcgKyAocGlwX29mZnNldF9iYXNlIC0gMSkgKyAncHg7JztcblxuICAgICAgaWYgKHNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShbc2VsX2JlZm9yZSwgJ3snLCBjc3NfYmVmb3JlLCAnfSddLmpvaW4oJyAnKSwgdGhpcy5ydWxlX2lkeCk7XG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoW3NlbF9hZnRlciwgJ3snLCBjc3NfYWZ0ZXIsICd9J10uam9pbignICcpLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9iZWZvcmUsIGNzc19iZWZvcmUsIHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9hZnRlciwgY3NzX2FmdGVyLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBvbGQgZHJvcGRvd24gcnVsZSBpbmRleFxuICAgIGNsZWFyX2lkeCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaGVldCA9IEZvdW5kYXRpb24uc3R5bGVzaGVldDtcblxuICAgICAgaWYgKHRoaXMucnVsZV9pZHgpIHtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZV9pZHg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNtYWxsIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzICYmXG4gICAgICAgICFtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIG9mZjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5TKHRoaXMuc2NvcGUpLm9mZignLmZuZHRuLmRyb3Bkb3duJyk7XG4gICAgICB0aGlzLlMoJ2h0bWwsIGJvZHknKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgICAgdGhpcy5TKHdpbmRvdykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuUygnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5vZmZjYW52YXMgPSB7XG4gICAgbmFtZSA6ICdvZmZjYW52YXMnLFxuXG4gICAgdmVyc2lvbiA6ICc1LjMuMScsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIG9wZW5fbWV0aG9kOiAnbW92ZScsXG4gICAgICBjbG9zZV9vbl9jbGljazogdHJ1ZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIFMgPSBzZWxmLlMsXG4gICAgICAgICAgbW92ZV9jbGFzcyA9ICcnLFxuICAgICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAnJyxcbiAgICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnJztcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdtb3ZlJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ21vdmUtJztcbiAgICAgICAgcmlnaHRfcG9zdGZpeCA9ICdyaWdodCc7XG4gICAgICAgIGxlZnRfcG9zdGZpeCA9ICdsZWZ0JztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5vcGVuX21ldGhvZCA9PT0gJ292ZXJsYXAnKSB7XG4gICAgICAgIG1vdmVfY2xhc3MgPSAnb2ZmY2FudmFzLW92ZXJsYXAnO1xuICAgICAgfVxuXG4gICAgICBTKHRoaXMuc2NvcGUpLm9mZignLm9mZmNhbnZhcycpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3RvZ2dsZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5sZWZ0LW9mZi1jYW52YXMtbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZWxmLmdldF9zZXR0aW5ncyhlKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY2xvc2Vfb25fY2xpY2spIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZS5jYWxsKHNlbGYsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4LCBzZWxmLmdldF93cmFwcGVyKGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5jbGlja190b2dnbGVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLW1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gc2VsZi5nZXRfc2V0dGluZ3MoZSk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmNsb3NlX29uX2NsaWNrKSB7XG4gICAgICAgICAgICBzZWxmLmhpZGUuY2FsbChzZWxmLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4LCBzZWxmLmdldF93cmFwcGVyKGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5leGl0LW9mZi1jYW52YXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIGlmIChyaWdodF9wb3N0Zml4KSBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHRvZ2dsZTogZnVuY3Rpb24oY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpIHtcbiAgICAgICRvZmZfY2FudmFzID0gJG9mZl9jYW52YXMgfHwgdGhpcy5nZXRfd3JhcHBlcigpO1xuICAgICAgaWYgKCRvZmZfY2FudmFzLmlzKCcuJyArIGNsYXNzX25hbWUpKSB7XG4gICAgICAgIHRoaXMuaGlkZShjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbihjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICAkb2ZmX2NhbnZhcy50cmlnZ2VyKCdvcGVuJykudHJpZ2dlcignb3Blbi5mbmR0bi5vZmZjYW52YXMnKTtcbiAgICAgICRvZmZfY2FudmFzLmFkZENsYXNzKGNsYXNzX25hbWUpO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbihjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICAkb2ZmX2NhbnZhcy50cmlnZ2VyKCdjbG9zZScpLnRyaWdnZXIoJ2Nsb3NlLmZuZHRuLm9mZmNhbnZhcycpO1xuICAgICAgJG9mZl9jYW52YXMucmVtb3ZlQ2xhc3MoY2xhc3NfbmFtZSk7XG4gICAgfSxcblxuICAgIGNsaWNrX3RvZ2dsZV9jbGFzczogZnVuY3Rpb24oZSwgY2xhc3NfbmFtZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICRvZmZfY2FudmFzID0gdGhpcy5nZXRfd3JhcHBlcihlKTtcbiAgICAgIHRoaXMudG9nZ2xlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICB9LFxuXG4gICAgY2xpY2tfcmVtb3ZlX2NsYXNzOiBmdW5jdGlvbihlLCBjbGFzc19uYW1lKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLmdldF93cmFwcGVyKGUpO1xuICAgICAgdGhpcy5oaWRlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICB9LFxuXG4gICAgZ2V0X3NldHRpbmdzOiBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgb2ZmY2FudmFzICA9IHRoaXMuUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKTtcbiAgICAgIHJldHVybiBvZmZjYW52YXMuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3M7XG4gICAgfSxcblxuICAgIGdldF93cmFwcGVyOiBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLlMoZSA/IGUudGFyZ2V0IDogdGhpcy5zY29wZSkuY2xvc2VzdCgnLm9mZi1jYW52YXMtd3JhcCcpO1xuXG4gICAgICBpZiAoJG9mZl9jYW52YXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICRvZmZfY2FudmFzID0gdGhpcy5TKCcub2ZmLWNhbnZhcy13cmFwJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJG9mZl9jYW52YXM7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHt9XG4gIH07XG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuXG4gIHZhciBPcmJpdCA9IGZ1bmN0aW9uKGVsLCBzZXR0aW5ncykge1xuICAgIC8vIERvbid0IHJlaW5pdGlhbGl6ZSBwbHVnaW5cbiAgICBpZiAoZWwuaGFzQ2xhc3Moc2V0dGluZ3Muc2xpZGVzX2NvbnRhaW5lcl9jbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzbGlkZXNfY29udGFpbmVyID0gZWwsXG4gICAgICAgIG51bWJlcl9jb250YWluZXIsXG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLFxuICAgICAgICB0aW1lcl9jb250YWluZXIsXG4gICAgICAgIGlkeCA9IDAsXG4gICAgICAgIGFuaW1hdGUsXG4gICAgICAgIHRpbWVyLFxuICAgICAgICBsb2NrZWQgPSBmYWxzZSxcbiAgICAgICAgYWRqdXN0X2hlaWdodF9hZnRlciA9IGZhbHNlO1xuXG5cbiAgICBzZWxmLnNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWRlc19jb250YWluZXIuY2hpbGRyZW4oc2V0dGluZ3Muc2xpZGVfc2VsZWN0b3IpO1xuICAgIH07XG5cbiAgICBzZWxmLnNsaWRlcygpLmZpcnN0KCkuYWRkQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcblxuICAgIHNlbGYudXBkYXRlX3NsaWRlX251bWJlciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICBpZiAoc2V0dGluZ3Muc2xpZGVfbnVtYmVyKSB7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuZmluZCgnc3BhbjpmaXJzdCcpLnRleHQocGFyc2VJbnQoaW5kZXgpKzEpO1xuICAgICAgICBudW1iZXJfY29udGFpbmVyLmZpbmQoJ3NwYW46bGFzdCcpLnRleHQoc2VsZi5zbGlkZXMoKS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmJ1bGxldHMpIHtcbiAgICAgICAgYnVsbGV0c19jb250YWluZXIuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgICAgICQoYnVsbGV0c19jb250YWluZXIuY2hpbGRyZW4oKS5nZXQoaW5kZXgpKS5hZGRDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlX2FjdGl2ZV9saW5rID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIHZhciBsaW5rID0gJCgnW2RhdGEtb3JiaXQtbGluaz1cIicrc2VsZi5zbGlkZXMoKS5lcShpbmRleCkuYXR0cignZGF0YS1vcmJpdC1zbGlkZScpKydcIl0nKTtcbiAgICAgIGxpbmsuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgICBsaW5rLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICB9O1xuXG4gICAgc2VsZi5idWlsZF9tYXJrdXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNsaWRlc19jb250YWluZXIud3JhcCgnPGRpdiBjbGFzcz1cIicrc2V0dGluZ3MuY29udGFpbmVyX2NsYXNzKydcIj48L2Rpdj4nKTtcbiAgICAgIGNvbnRhaW5lciA9IHNsaWRlc19jb250YWluZXIucGFyZW50KCk7XG4gICAgICBzbGlkZXNfY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MpO1xuICAgICAgXG4gICAgICBpZiAoc2V0dGluZ3Muc3RhY2tfb25fc21hbGwpIHtcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnN0YWNrX29uX3NtYWxsX2NsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLm5hdmlnYXRpb25fYXJyb3dzKSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJCgnPGEgaHJlZj1cIiNcIj48c3Bhbj48L3NwYW4+PC9hPicpLmFkZENsYXNzKHNldHRpbmdzLnByZXZfY2xhc3MpKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCgkKCc8YSBocmVmPVwiI1wiPjxzcGFuPjwvc3Bhbj48L2E+JykuYWRkQ2xhc3Moc2V0dGluZ3MubmV4dF9jbGFzcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MudGltZXIpIHtcbiAgICAgICAgdGltZXJfY29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpO1xuICAgICAgICB0aW1lcl9jb250YWluZXIuYXBwZW5kKCc8c3Bhbj4nKTtcbiAgICAgICAgdGltZXJfY29udGFpbmVyLmFwcGVuZCgkKCc8ZGl2PicpLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3Byb2dyZXNzX2NsYXNzKSk7XG4gICAgICAgIHRpbWVyX2NvbnRhaW5lci5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKHRpbWVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zbGlkZV9udW1iZXIpIHtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3Moc2V0dGluZ3Muc2xpZGVfbnVtYmVyX2NsYXNzKTtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lci5hcHBlbmQoJzxzcGFuPjwvc3Bhbj4gJyArIHNldHRpbmdzLnNsaWRlX251bWJlcl90ZXh0ICsgJyA8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQobnVtYmVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5idWxsZXRzKSB7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyID0gJCgnPG9sPicpLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfY29udGFpbmVyX2NsYXNzKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChidWxsZXRzX2NvbnRhaW5lcik7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLndyYXAoJzxkaXYgY2xhc3M9XCJvcmJpdC1idWxsZXRzLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24oaWR4LCBlbCkge1xuICAgICAgICAgIHZhciBidWxsZXQgPSAkKCc8bGk+JykuYXR0cignZGF0YS1vcmJpdC1zbGlkZScsIGlkeCkub24oJ2NsaWNrJywgc2VsZi5saW5rX2J1bGxldCk7O1xuICAgICAgICAgIGJ1bGxldHNfY29udGFpbmVyLmFwcGVuZChidWxsZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH07XG5cbiAgICBzZWxmLl9nb3RvID0gZnVuY3Rpb24obmV4dF9pZHgsIHN0YXJ0X3RpbWVyKSB7XG4gICAgICAvLyBpZiAobG9ja2VkKSB7cmV0dXJuIGZhbHNlO31cbiAgICAgIGlmIChuZXh0X2lkeCA9PT0gaWR4KSB7cmV0dXJuIGZhbHNlO31cbiAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7dGltZXIucmVzdGFydCgpO31cbiAgICAgIHZhciBzbGlkZXMgPSBzZWxmLnNsaWRlcygpO1xuXG4gICAgICB2YXIgZGlyID0gJ25leHQnO1xuICAgICAgbG9ja2VkID0gdHJ1ZTtcbiAgICAgIGlmIChuZXh0X2lkeCA8IGlkeCkge2RpciA9ICdwcmV2Jzt9XG4gICAgICBpZiAobmV4dF9pZHggPj0gc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIXNldHRpbmdzLmNpcmN1bGFyKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIG5leHRfaWR4ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAobmV4dF9pZHggPCAwKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MuY2lyY3VsYXIpIHJldHVybiBmYWxzZTtcbiAgICAgICAgbmV4dF9pZHggPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGN1cnJlbnQgPSAkKHNsaWRlcy5nZXQoaWR4KSk7XG4gICAgICB2YXIgbmV4dCA9ICQoc2xpZGVzLmdldChuZXh0X2lkeCkpO1xuXG4gICAgICBjdXJyZW50LmNzcygnekluZGV4JywgMik7XG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZV9zbGlkZV9jbGFzcyk7XG4gICAgICBuZXh0LmNzcygnekluZGV4JywgNCkuYWRkQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcblxuICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdiZWZvcmUtc2xpZGUtY2hhbmdlLmZuZHRuLm9yYml0Jyk7XG4gICAgICBzZXR0aW5ncy5iZWZvcmVfc2xpZGVfY2hhbmdlKCk7XG4gICAgICBzZWxmLnVwZGF0ZV9hY3RpdmVfbGluayhuZXh0X2lkeCk7XG4gICAgICBcbiAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWR4ID0gbmV4dF9pZHg7XG4gICAgICAgICAgbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHN0YXJ0X3RpbWVyID09PSB0cnVlKSB7dGltZXIgPSBzZWxmLmNyZWF0ZV90aW1lcigpOyB0aW1lci5zdGFydCgpO31cbiAgICAgICAgICBzZWxmLnVwZGF0ZV9zbGlkZV9udW1iZXIoaWR4KTtcbiAgICAgICAgICBzbGlkZXNfY29udGFpbmVyLnRyaWdnZXIoJ2FmdGVyLXNsaWRlLWNoYW5nZS5mbmR0bi5vcmJpdCcsW3tzbGlkZV9udW1iZXI6IGlkeCwgdG90YWxfc2xpZGVzOiBzbGlkZXMubGVuZ3RofV0pO1xuICAgICAgICAgIHNldHRpbmdzLmFmdGVyX3NsaWRlX2NoYW5nZShpZHgsIHNsaWRlcy5sZW5ndGgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoc2xpZGVzX2NvbnRhaW5lci5oZWlnaHQoKSAhPSBuZXh0LmhlaWdodCgpICYmIHNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICAgIHNsaWRlc19jb250YWluZXIuYW5pbWF0ZSh7J2hlaWdodCc6IG5leHQuaGVpZ2h0KCl9LCAyNTAsICdsaW5lYXInLCB1bmxvY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVubG9jaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMSkge2NhbGxiYWNrKCk7IHJldHVybiBmYWxzZTt9XG5cbiAgICAgIHZhciBzdGFydF9hbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRpciA9PT0gJ25leHQnKSB7YW5pbWF0ZS5uZXh0KGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKTt9XG4gICAgICAgIGlmIChkaXIgPT09ICdwcmV2Jykge2FuaW1hdGUucHJldihjdXJyZW50LCBuZXh0LCBjYWxsYmFjayk7fSAgICAgICAgXG4gICAgICB9O1xuXG4gICAgICBpZiAobmV4dC5oZWlnaHQoKSA+IHNsaWRlc19jb250YWluZXIuaGVpZ2h0KCkgJiYgc2V0dGluZ3MudmFyaWFibGVfaGVpZ2h0KSB7XG4gICAgICAgIHNsaWRlc19jb250YWluZXIuYW5pbWF0ZSh7J2hlaWdodCc6IG5leHQuaGVpZ2h0KCl9LCAyNTAsICdsaW5lYXInLCBzdGFydF9hbmltYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRfYW5pbWF0aW9uKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLm5leHQgPSBmdW5jdGlvbihlKSB7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5fZ290byhpZHggKyAxKTtcbiAgICB9O1xuICAgIFxuICAgIHNlbGYucHJldiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZWxmLl9nb3RvKGlkeCAtIDEpO1xuICAgIH07XG5cbiAgICBzZWxmLmxpbmtfY3VzdG9tID0gZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtb3JiaXQtbGluaycpO1xuICAgICAgaWYgKCh0eXBlb2YgbGluayA9PT0gJ3N0cmluZycpICYmIChsaW5rID0gJC50cmltKGxpbmspKSAhPSBcIlwiKSB7XG4gICAgICAgIHZhciBzbGlkZSA9IGNvbnRhaW5lci5maW5kKCdbZGF0YS1vcmJpdC1zbGlkZT0nK2xpbmsrJ10nKTtcbiAgICAgICAgaWYgKHNsaWRlLmluZGV4KCkgIT0gLTEpIHtzZWxmLl9nb3RvKHNsaWRlLmluZGV4KCkpO31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5saW5rX2J1bGxldCA9IGZ1bmN0aW9uKGUpIHsgICAgXG4gICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtb3JiaXQtc2xpZGUnKTtcbiAgICAgIGlmICgodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykgJiYgKGluZGV4ID0gJC50cmltKGluZGV4KSkgIT0gXCJcIikge1xuICAgICAgICBpZihpc05hTihwYXJzZUludChpbmRleCkpKVxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHNsaWRlID0gY29udGFpbmVyLmZpbmQoJ1tkYXRhLW9yYml0LXNsaWRlPScraW5kZXgrJ10nKTtcbiAgICAgICAgICBpZiAoc2xpZGUuaW5kZXgoKSAhPSAtMSkge3NlbGYuX2dvdG8oc2xpZGUuaW5kZXgoKSArIDEpO31cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxmLl9nb3RvKHBhcnNlSW50KGluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGYudGltZXJfY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuX2dvdG8oaWR4ICsgMSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3VycmVudCA9ICQoc2VsZi5zbGlkZXMoKS5nZXQoaWR4KSk7XG4gICAgICB2YXIgaCA9IGN1cnJlbnQuaGVpZ2h0KCk7XG4gICAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5oZWlnaHQoKSA+IGgpIHsgaCA9ICQodGhpcykuaGVpZ2h0KCk7IH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBzbGlkZXNfY29udGFpbmVyLmhlaWdodChoKTtcbiAgICB9O1xuXG4gICAgc2VsZi5jcmVhdGVfdGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ID0gbmV3IFRpbWVyKFxuICAgICAgICBjb250YWluZXIuZmluZCgnLicrc2V0dGluZ3MudGltZXJfY29udGFpbmVyX2NsYXNzKSwgXG4gICAgICAgIHNldHRpbmdzLCBcbiAgICAgICAgc2VsZi50aW1lcl9jYWxsYmFja1xuICAgICAgKTtcbiAgICAgIHJldHVybiB0O1xuICAgIH07XG5cbiAgICBzZWxmLnN0b3BfdGltZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB0aW1lci5zdG9wKCk7XG4gICAgfTtcblxuICAgIHNlbGYudG9nZ2xlX3RpbWVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdCA9IGNvbnRhaW5lci5maW5kKCcuJytzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpO1xuICAgICAgaWYgKHQuaGFzQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKSkge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVyID09PSAndW5kZWZpbmVkJykge3RpbWVyID0gc2VsZi5jcmVhdGVfdGltZXIoKTt9XG4gICAgICAgIHRpbWVyLnN0YXJ0KCk7ICAgICBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVyID09PSAnb2JqZWN0Jykge3RpbWVyLnN0b3AoKTt9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5idWlsZF9tYXJrdXAoKTtcbiAgICAgIGlmIChzZXR0aW5ncy50aW1lcikge1xuICAgICAgICB0aW1lciA9IHNlbGYuY3JlYXRlX3RpbWVyKCk7IFxuICAgICAgICBGb3VuZGF0aW9uLnV0aWxzLmltYWdlX2xvYWRlZCh0aGlzLnNsaWRlcygpLmNoaWxkcmVuKCdpbWcnKSwgdGltZXIuc3RhcnQpO1xuICAgICAgfVxuICAgICAgYW5pbWF0ZSA9IG5ldyBGYWRlQW5pbWF0aW9uKHNldHRpbmdzLCBzbGlkZXNfY29udGFpbmVyKTtcbiAgICAgIGlmIChzZXR0aW5ncy5hbmltYXRpb24gPT09ICdzbGlkZScpIFxuICAgICAgICBhbmltYXRlID0gbmV3IFNsaWRlQW5pbWF0aW9uKHNldHRpbmdzLCBzbGlkZXNfY29udGFpbmVyKTsgICAgICAgIFxuXG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy4nK3NldHRpbmdzLm5leHRfY2xhc3MsIHNlbGYubmV4dCk7XG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy4nK3NldHRpbmdzLnByZXZfY2xhc3MsIHNlbGYucHJldik7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5uZXh0X29uX2NsaWNrKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCAnLicrc2V0dGluZ3Muc2xpZGVzX2NvbnRhaW5lcl9jbGFzcysnIFtkYXRhLW9yYml0LXNsaWRlXScsIHNlbGYubGlua19idWxsZXQpO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgc2VsZi50b2dnbGVfdGltZXIpO1xuICAgICAgaWYgKHNldHRpbmdzLnN3aXBlKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbigndG91Y2hzdGFydC5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoIWUudG91Y2hlcykge2UgPSBlLm9yaWdpbmFsRXZlbnQ7fVxuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgc3RhcnRfcGFnZV94OiBlLnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICBzdGFydF9wYWdlX3k6IGUudG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWU6IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBkZWx0YV94OiAwLFxuICAgICAgICAgICAgaXNfc2Nyb2xsaW5nOiB1bmRlZmluZWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzd2lwZS10cmFuc2l0aW9uJywgZGF0YSk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCd0b3VjaG1vdmUuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKCFlLnRvdWNoZXMpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxuICAgICAgICAgIC8vIElnbm9yZSBwaW5jaC96b29tIGV2ZW50c1xuICAgICAgICAgIGlmKGUudG91Y2hlcy5sZW5ndGggPiAxIHx8IGUuc2NhbGUgJiYgZS5zY2FsZSAhPT0gMSkgcmV0dXJuO1xuXG4gICAgICAgICAgdmFyIGRhdGEgPSBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtkYXRhID0ge307fVxuXG4gICAgICAgICAgZGF0YS5kZWx0YV94ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gZGF0YS5zdGFydF9wYWdlX3g7XG5cbiAgICAgICAgICBpZiAoIHR5cGVvZiBkYXRhLmlzX3Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGRhdGEuaXNfc2Nyb2xsaW5nID0gISEoIGRhdGEuaXNfc2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRhdGEuZGVsdGFfeCkgPCBNYXRoLmFicyhlLnRvdWNoZXNbMF0ucGFnZVkgLSBkYXRhLnN0YXJ0X3BhZ2VfeSkgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEuaXNfc2Nyb2xsaW5nICYmICFkYXRhLmFjdGl2ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IChkYXRhLmRlbHRhX3ggPCAwKSA/IChpZHgrMSkgOiAoaWR4LTEpO1xuICAgICAgICAgICAgZGF0YS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5fZ290byhkaXJlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCd0b3VjaGVuZC5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicsIHt9KTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgY29udGFpbmVyLm9uKCdtb3VzZWVudGVyLmZuZHRuLm9yYml0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MudGltZXIgJiYgc2V0dGluZ3MucGF1c2Vfb25faG92ZXIpIHtcbiAgICAgICAgICBzZWxmLnN0b3BfdGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLnRpbWVyICYmIHNldHRpbmdzLnJlc3VtZV9vbl9tb3VzZW91dCkge1xuICAgICAgICAgIHRpbWVyLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtb3JiaXQtbGlua10nLCBzZWxmLmxpbmtfY3VzdG9tKTtcbiAgICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBzZWxmLmNvbXB1dGVfZGltZW5zaW9ucyk7XG4gICAgICBGb3VuZGF0aW9uLnV0aWxzLmltYWdlX2xvYWRlZCh0aGlzLnNsaWRlcygpLmNoaWxkcmVuKCdpbWcnKSwgc2VsZi5jb21wdXRlX2RpbWVuc2lvbnMpO1xuICAgICAgRm91bmRhdGlvbi51dGlscy5pbWFnZV9sb2FkZWQodGhpcy5zbGlkZXMoKS5jaGlsZHJlbignaW1nJyksIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250YWluZXIucHJldignLicrc2V0dGluZ3MucHJlbG9hZGVyX2NsYXNzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICBzZWxmLnVwZGF0ZV9zbGlkZV9udW1iZXIoMCk7XG4gICAgICAgIHNlbGYudXBkYXRlX2FjdGl2ZV9saW5rKDApO1xuICAgICAgICBzbGlkZXNfY29udGFpbmVyLnRyaWdnZXIoJ3JlYWR5LmZuZHRuLm9yYml0Jyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi5pbml0KCk7XG4gIH07XG5cbiAgdmFyIFRpbWVyID0gZnVuY3Rpb24oZWwsIHNldHRpbmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZHVyYXRpb24gPSBzZXR0aW5ncy50aW1lcl9zcGVlZCxcbiAgICAgICAgcHJvZ3Jlc3MgPSBlbC5maW5kKCcuJytzZXR0aW5ncy50aW1lcl9wcm9ncmVzc19jbGFzcyksXG4gICAgICAgIHN0YXJ0LCBcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgbGVmdCA9IC0xO1xuXG4gICAgdGhpcy51cGRhdGVfcHJvZ3Jlc3MgPSBmdW5jdGlvbih3KSB7XG4gICAgICB2YXIgbmV3X3Byb2dyZXNzID0gcHJvZ3Jlc3MuY2xvbmUoKTtcbiAgICAgIG5ld19wcm9ncmVzcy5hdHRyKCdzdHlsZScsICcnKTtcbiAgICAgIG5ld19wcm9ncmVzcy5jc3MoJ3dpZHRoJywgdysnJScpO1xuICAgICAgcHJvZ3Jlc3MucmVwbGFjZVdpdGgobmV3X3Byb2dyZXNzKTtcbiAgICAgIHByb2dyZXNzID0gbmV3X3Byb2dyZXNzO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGVsLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcyk7XG4gICAgICBsZWZ0ID0gLTE7XG4gICAgICBzZWxmLnVwZGF0ZV9wcm9ncmVzcygwKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFlbC5oYXNDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpKSB7cmV0dXJuIHRydWU7fVxuICAgICAgbGVmdCA9IChsZWZ0ID09PSAtMSkgPyBkdXJhdGlvbiA6IGxlZnQ7XG4gICAgICBlbC5yZW1vdmVDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHByb2dyZXNzLmFuaW1hdGUoeyd3aWR0aCc6ICcxMDAlJ30sIGxlZnQsICdsaW5lYXInKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnJlc3RhcnQoKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0sIGxlZnQpO1xuICAgICAgZWwudHJpZ2dlcigndGltZXItc3RhcnRlZC5mbmR0bi5vcmJpdCcpXG4gICAgfTtcblxuICAgIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGVsLmhhc0NsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcykpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBlbC5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgdmFyIGVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgbGVmdCA9IGxlZnQgLSAoZW5kIC0gc3RhcnQpO1xuICAgICAgdmFyIHcgPSAxMDAgLSAoKGxlZnQgLyBkdXJhdGlvbikgKiAxMDApO1xuICAgICAgc2VsZi51cGRhdGVfcHJvZ3Jlc3Modyk7XG4gICAgICBlbC50cmlnZ2VyKCd0aW1lci1zdG9wcGVkLmZuZHRuLm9yYml0Jyk7XG4gICAgfTtcbiAgfTtcbiAgXG4gIHZhciBTbGlkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uKHNldHRpbmdzLCBjb250YWluZXIpIHtcbiAgICB2YXIgZHVyYXRpb24gPSBzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQ7XG4gICAgdmFyIGlzX3J0bCA9ICgkKCdodG1sW2Rpcj1ydGxdJykubGVuZ3RoID09PSAxKTtcbiAgICB2YXIgbWFyZ2luID0gaXNfcnRsID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcbiAgICB2YXIgYW5pbU1hcmdpbiA9IHt9O1xuICAgIGFuaW1NYXJnaW5bbWFyZ2luXSA9ICcwJSc7XG5cbiAgICB0aGlzLm5leHQgPSBmdW5jdGlvbihjdXJyZW50LCBuZXh0LCBjYWxsYmFjaykge1xuICAgICAgY3VycmVudC5hbmltYXRlKHttYXJnaW5MZWZ0OictMTAwJSd9LCBkdXJhdGlvbik7XG4gICAgICBuZXh0LmFuaW1hdGUoYW5pbU1hcmdpbiwgZHVyYXRpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgICBjdXJyZW50LmNzcyhtYXJnaW4sICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmV2ID0gZnVuY3Rpb24oY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIGN1cnJlbnQuYW5pbWF0ZSh7bWFyZ2luTGVmdDonMTAwJSd9LCBkdXJhdGlvbik7XG4gICAgICBwcmV2LmNzcyhtYXJnaW4sICctMTAwJScpO1xuICAgICAgcHJldi5hbmltYXRlKGFuaW1NYXJnaW4sIGR1cmF0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3VycmVudC5jc3MobWFyZ2luLCAnMTAwJScpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgRmFkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uKHNldHRpbmdzLCBjb250YWluZXIpIHtcbiAgICB2YXIgZHVyYXRpb24gPSBzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQ7XG4gICAgdmFyIGlzX3J0bCA9ICgkKCdodG1sW2Rpcj1ydGxdJykubGVuZ3RoID09PSAxKTtcbiAgICB2YXIgbWFyZ2luID0gaXNfcnRsID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcblxuICAgIHRoaXMubmV4dCA9IGZ1bmN0aW9uKGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKSB7XG4gICAgICBuZXh0LmNzcyh7J21hcmdpbic6JzAlJywgJ29wYWNpdHknOicwLjAxJ30pO1xuICAgICAgbmV4dC5hbmltYXRlKHsnb3BhY2l0eSc6JzEnfSwgZHVyYXRpb24sICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3VycmVudC5jc3MoJ21hcmdpbicsICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmV2ID0gZnVuY3Rpb24oY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIHByZXYuY3NzKHsnbWFyZ2luJzonMCUnLCAnb3BhY2l0eSc6JzAuMDEnfSk7XG4gICAgICBwcmV2LmFuaW1hdGUoeydvcGFjaXR5JzonMSd9LCBkdXJhdGlvbiwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjdXJyZW50LmNzcygnbWFyZ2luJywgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG5cblxuICBGb3VuZGF0aW9uLmxpYnMgPSBGb3VuZGF0aW9uLmxpYnMgfHwge307XG5cbiAgRm91bmRhdGlvbi5saWJzLm9yYml0ID0ge1xuICAgIG5hbWU6ICdvcmJpdCcsXG5cbiAgICB2ZXJzaW9uOiAnNS4zLjEnLFxuXG4gICAgc2V0dGluZ3M6IHtcbiAgICAgIGFuaW1hdGlvbjogJ3NsaWRlJyxcbiAgICAgIHRpbWVyX3NwZWVkOiAxMDAwMCxcbiAgICAgIHBhdXNlX29uX2hvdmVyOiB0cnVlLFxuICAgICAgcmVzdW1lX29uX21vdXNlb3V0OiBmYWxzZSxcbiAgICAgIG5leHRfb25fY2xpY2s6IHRydWUsXG4gICAgICBhbmltYXRpb25fc3BlZWQ6IDUwMCxcbiAgICAgIHN0YWNrX29uX3NtYWxsOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb25fYXJyb3dzOiB0cnVlLFxuICAgICAgc2xpZGVfbnVtYmVyOiB0cnVlLFxuICAgICAgc2xpZGVfbnVtYmVyX3RleHQ6ICdvZicsXG4gICAgICBjb250YWluZXJfY2xhc3M6ICdvcmJpdC1jb250YWluZXInLFxuICAgICAgc3RhY2tfb25fc21hbGxfY2xhc3M6ICdvcmJpdC1zdGFjay1vbi1zbWFsbCcsXG4gICAgICBuZXh0X2NsYXNzOiAnb3JiaXQtbmV4dCcsXG4gICAgICBwcmV2X2NsYXNzOiAnb3JiaXQtcHJldicsXG4gICAgICB0aW1lcl9jb250YWluZXJfY2xhc3M6ICdvcmJpdC10aW1lcicsXG4gICAgICB0aW1lcl9wYXVzZWRfY2xhc3M6ICdwYXVzZWQnLFxuICAgICAgdGltZXJfcHJvZ3Jlc3NfY2xhc3M6ICdvcmJpdC1wcm9ncmVzcycsXG4gICAgICBzbGlkZXNfY29udGFpbmVyX2NsYXNzOiAnb3JiaXQtc2xpZGVzLWNvbnRhaW5lcicsXG4gICAgICBwcmVsb2FkZXJfY2xhc3M6ICdwcmVsb2FkZXInLFxuICAgICAgc2xpZGVfc2VsZWN0b3I6ICcqJyxcbiAgICAgIGJ1bGxldHNfY29udGFpbmVyX2NsYXNzOiAnb3JiaXQtYnVsbGV0cycsXG4gICAgICBidWxsZXRzX2FjdGl2ZV9jbGFzczogJ2FjdGl2ZScsXG4gICAgICBzbGlkZV9udW1iZXJfY2xhc3M6ICdvcmJpdC1zbGlkZS1udW1iZXInLFxuICAgICAgY2FwdGlvbl9jbGFzczogJ29yYml0LWNhcHRpb24nLFxuICAgICAgYWN0aXZlX3NsaWRlX2NsYXNzOiAnYWN0aXZlJyxcbiAgICAgIG9yYml0X3RyYW5zaXRpb25fY2xhc3M6ICdvcmJpdC10cmFuc2l0aW9uaW5nJyxcbiAgICAgIGJ1bGxldHM6IHRydWUsXG4gICAgICBjaXJjdWxhcjogdHJ1ZSxcbiAgICAgIHRpbWVyOiB0cnVlLFxuICAgICAgdmFyaWFibGVfaGVpZ2h0OiBmYWxzZSxcbiAgICAgIHN3aXBlOiB0cnVlLFxuICAgICAgYmVmb3JlX3NsaWRlX2NoYW5nZTogbm9vcCxcbiAgICAgIGFmdGVyX3NsaWRlX2NoYW5nZTogbm9vcFxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICB2YXIgb3JiaXRfaW5zdGFuY2UgPSBuZXcgT3JiaXQodGhpcy5TKGluc3RhbmNlKSwgdGhpcy5TKGluc3RhbmNlKS5kYXRhKCdvcmJpdC1pbml0JykpO1xuICAgICAgdGhpcy5TKGluc3RhbmNlKS5kYXRhKHNlbGYubmFtZSArICctaW5zdGFuY2UnLCBvcmJpdF9pbnN0YW5jZSk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHNlbGYuUyhzZWxmLnNjb3BlKS5pcygnW2RhdGEtb3JiaXRdJykpIHtcbiAgICAgICAgdmFyICRlbCA9IHNlbGYuUyhzZWxmLnNjb3BlKTtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJGVsLmRhdGEoc2VsZi5uYW1lICsgJy1pbnN0YW5jZScpO1xuICAgICAgICBpbnN0YW5jZS5jb21wdXRlX2RpbWVuc2lvbnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuUygnW2RhdGEtb3JiaXRdJywgc2VsZi5zY29wZSkuZWFjaChmdW5jdGlvbihpZHgsIGVsKSB7XG4gICAgICAgICAgdmFyICRlbCA9IHNlbGYuUyhlbCk7XG4gICAgICAgICAgdmFyIG9wdHMgPSBzZWxmLmRhdGFfb3B0aW9ucygkZWwpO1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRlbC5kYXRhKHNlbGYubmFtZSArICctaW5zdGFuY2UnKTtcbiAgICAgICAgICBpbnN0YW5jZS5jb21wdXRlX2RpbWVuc2lvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICAgXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLnRvcGJhciA9IHtcbiAgICBuYW1lIDogJ3RvcGJhcicsXG5cbiAgICB2ZXJzaW9uOiAnNS4zLjEnLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBpbmRleCA6IDAsXG4gICAgICBzdGlja3lfY2xhc3MgOiAnc3RpY2t5JyxcbiAgICAgIGN1c3RvbV9iYWNrX3RleHQ6IHRydWUsXG4gICAgICBiYWNrX3RleHQ6ICdCYWNrJyxcbiAgICAgIGlzX2hvdmVyOiB0cnVlLFxuICAgICAgc2Nyb2xsdG9wIDogdHJ1ZSwgLy8ganVtcCB0byB0b3Agd2hlbiBzdGlja3kgbmF2IG1lbnUgdG9nZ2xlIGlzIGNsaWNrZWRcbiAgICAgIHN0aWNreV9vbiA6ICdhbGwnXG4gICAgfSxcbiAgICBcbiAgICBpbml0IDogZnVuY3Rpb24gKHNlY3Rpb24sIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICdhZGRfY3VzdG9tX3J1bGUgcmVnaXN0ZXJfbWVkaWEgdGhyb3R0bGUnKTtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgc2VsZi5yZWdpc3Rlcl9tZWRpYSgndG9wYmFyJywgJ2ZvdW5kYXRpb24tbXEtdG9wYmFyJyk7XG5cbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcblxuICAgICAgc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScsIHRoaXMuc2NvcGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9wYmFyID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSxcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWxmLlMoJ3NlY3Rpb24nLCB0aGlzKTtcbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgMCk7XG4gICAgICAgIHZhciB0b3BiYXJDb250YWluZXIgPSB0b3BiYXIucGFyZW50KCk7XG4gICAgICAgIGlmICh0b3BiYXJDb250YWluZXIuaGFzQ2xhc3MoJ2ZpeGVkJykgfHwgc2VsZi5pc19zdGlja3kodG9wYmFyLCB0b3BiYXJDb250YWluZXIsIHNldHRpbmdzKSApIHtcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLnN0aWNreV9jbGFzcyA9IHNldHRpbmdzLnN0aWNreV9jbGFzcztcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLnN0aWNreV90b3BiYXIgPSB0b3BiYXI7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ2hlaWdodCcsIHRvcGJhckNvbnRhaW5lci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgICB0b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0JywgdG9wYmFyQ29udGFpbmVyLm9mZnNldCgpLnRvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ2hlaWdodCcsIHRvcGJhci5vdXRlckhlaWdodCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2V0dGluZ3MuYXNzZW1ibGVkKSB7XG4gICAgICAgICAgc2VsZi5hc3NlbWJsZSh0b3BiYXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duJywgdG9wYmFyKS5hZGRDbGFzcygnbm90LWNsaWNrJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duJywgdG9wYmFyKS5yZW1vdmVDbGFzcygnbm90LWNsaWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYWQgYm9keSB3aGVuIHN0aWNreSAoc2Nyb2xsZWQpIG9yIGZpeGVkLlxuICAgICAgICBzZWxmLmFkZF9jdXN0b21fcnVsZSgnLmYtdG9wYmFyLWZpeGVkIHsgcGFkZGluZy10b3A6ICcgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykgKyAncHggfScpO1xuXG4gICAgICAgIGlmICh0b3BiYXJDb250YWluZXIuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgaXNfc3RpY2t5OiBmdW5jdGlvbiAodG9wYmFyLCB0b3BiYXJDb250YWluZXIsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgc3RpY2t5ID0gdG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKHNldHRpbmdzLnN0aWNreV9jbGFzcyk7XG5cbiAgICAgIGlmIChzdGlja3kgJiYgc2V0dGluZ3Muc3RpY2t5X29uID09PSAnYWxsJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RpY2t5ICYmIHRoaXMuc21hbGwoKSAmJiBzZXR0aW5ncy5zdGlja3lfb24gPT09ICdzbWFsbCcpIHtcbiAgICAgICAgcmV0dXJuIChtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5zbWFsbCkubWF0Y2hlcyAmJiAhbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMubWVkaXVtKS5tYXRjaGVzICYmXG4gICAgICAgICAgICAhbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMubGFyZ2UpLm1hdGNoZXMpOyBcbiAgICAgICAgLy9yZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RpY2t5ICYmIHRoaXMubWVkaXVtKCkgJiYgc2V0dGluZ3Muc3RpY2t5X29uID09PSAnbWVkaXVtJykge1xuICAgICAgICByZXR1cm4gKG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzICYmIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSkubWF0Y2hlcyAmJlxuICAgICAgICAgICAgIW1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLmxhcmdlKS5tYXRjaGVzKTtcbiAgICAgICAgLy9yZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZihzdGlja3kgJiYgdGhpcy5sYXJnZSgpICYmIHNldHRpbmdzLnN0aWNreV9vbiA9PT0gJ2xhcmdlJykge1xuICAgICAgICByZXR1cm4gKG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzICYmIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSkubWF0Y2hlcyAmJlxuICAgICAgICAgICAgbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMubGFyZ2UpLm1hdGNoZXMpO1xuICAgICAgICAvL3JldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKHRvZ2dsZUVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgdG9wYmFyO1xuXG4gICAgICBpZiAodG9nZ2xlRWwpIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKHRvZ2dsZUVsKS5jbG9zZXN0KCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICB2YXIgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbiwgLnNlY3Rpb24nLCB0b3BiYXIpO1xuXG4gICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcbiAgICAgICAgaWYgKCFzZWxmLnJ0bCkge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0OiAnMCUnfSk7XG4gICAgICAgICAgJCgnPi5uYW1lJywgc2VjdGlvbikuY3NzKHtsZWZ0OiAnMTAwJSd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7cmlnaHQ6ICcwJSd9KTtcbiAgICAgICAgICAkKCc+Lm5hbWUnLCBzZWN0aW9uKS5jc3Moe3JpZ2h0OiAnMTAwJSd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuUygnbGkubW92ZWQnLCBzZWN0aW9uKS5yZW1vdmVDbGFzcygnbW92ZWQnKTtcbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgMCk7XG5cbiAgICAgICAgdG9wYmFyXG4gICAgICAgICAgLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3Muc2Nyb2xsdG9wKSB7XG4gICAgICAgIGlmICghdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRvcGJhci5wYXJlbnQoKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zY3JvbGx0b3ApIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHNlbGYuUygnYm9keScpLnJlbW92ZUNsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgdG9wYmFyLnBhcmVudCgpLCBzZXR0aW5ncykpIHtcbiAgICAgICAgICB0b3BiYXIucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9wYmFyLnBhcmVudCgpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgaWYgKCF0b3BiYXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgIHRvcGJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlX3N0aWNreV9wb3NpdGlvbmluZygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BiYXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdGltZXIgOiBudWxsLFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKGJhcikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIFMgPSB0aGlzLlM7XG5cbiAgICAgIFModGhpcy5zY29wZSlcbiAgICAgICAgLm9mZignLnRvcGJhcicpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIC50b2dnbGUtdG9wYmFyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2VsZi50b2dnbGUodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywnLnRvcC1iYXIgLnRvcC1iYXItc2VjdGlvbiBsaSBhW2hyZWZePVwiI1wiXSxbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAudG9wLWJhci1zZWN0aW9uIGxpIGFbaHJlZl49XCIjXCJdJyxmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGxpID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpO1xuICAgICAgICAgICAgaWYoc2VsZi5icmVha3BvaW50KCkgJiYgIWxpLmhhc0NsYXNzKCdiYWNrJykgJiYgIWxpLmhhc0NsYXNzKCdoYXMtZHJvcGRvd24nKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIGxpLmhhcy1kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIGxpID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gUyhlLnRhcmdldCksXG4gICAgICAgICAgICAgIHRvcGJhciA9IGxpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICAgIGlmKHRhcmdldC5kYXRhKCdyZXZlYWxJZCcpKSB7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSkgcmV0dXJuO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3ZlciAmJiAhTW9kZXJuaXpyLnRvdWNoKSByZXR1cm47XG5cbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKGxpLmhhc0NsYXNzKCdob3ZlcicpKSB7XG4gICAgICAgICAgICBsaVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuXG4gICAgICAgICAgICBsaS5wYXJlbnRzKCdsaS5ob3ZlcicpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGkuYWRkQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgICQobGkpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRbMF0ubm9kZU5hbWUgPT09ICdBJyAmJiB0YXJnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ2hhcy1kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIC5oYXMtZHJvcGRvd24+YScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKHNlbGYuYnJlYWtwb2ludCgpKSB7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgICB0b3BiYXIgPSAkdGhpcy5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSB0b3BiYXIuZmluZCgnc2VjdGlvbiwgLnNlY3Rpb24nKSxcbiAgICAgICAgICAgICAgICBkcm9wZG93bkhlaWdodCA9ICR0aGlzLm5leHQoJy5kcm9wZG93bicpLm91dGVySGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgJHNlbGVjdGVkTGkgPSAkdGhpcy5jbG9zZXN0KCdsaScpO1xuXG4gICAgICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCB0b3BiYXIuZGF0YSgnaW5kZXgnKSArIDEpO1xuICAgICAgICAgICAgJHNlbGVjdGVkTGkuYWRkQ2xhc3MoJ21vdmVkJyk7XG5cbiAgICAgICAgICAgIGlmICghc2VsZi5ydGwpIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5jc3Moe2xlZnQ6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgICAgIHNlY3Rpb24uZmluZCgnPi5uYW1lJykuY3NzKHtsZWZ0OiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0OiAtKDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpKSArICclJ30pO1xuICAgICAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7cmlnaHQ6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICR0aGlzLnNpYmxpbmdzKCd1bCcpLm91dGVySGVpZ2h0KHRydWUpICsgdG9wYmFyLmRhdGEoJ2hlaWdodCcpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICBTKHdpbmRvdykub2ZmKCcudG9wYmFyJykub24oJ3Jlc2l6ZS5mbmR0bi50b3BiYXInLCBzZWxmLnRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5yZXNpemUuY2FsbChzZWxmKTtcbiAgICAgIH0sIDUwKSkudHJpZ2dlcigncmVzaXplJykudHJpZ2dlcigncmVzaXplLmZuZHRuLnRvcGJhcicpO1xuXG4gICAgICBTKCdib2R5Jykub2ZmKCcudG9wYmFyJykub24oJ2NsaWNrLmZuZHRuLnRvcGJhciB0b3VjaHN0YXJ0LmZuZHRuLnRvcGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBTKGUudGFyZ2V0KS5jbG9zZXN0KCdsaScpLmNsb3Nlc3QoJ2xpLmhvdmVyJyk7XG5cbiAgICAgICAgaWYgKHBhcmVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10gbGkuaG92ZXInKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHbyB1cCBhIGxldmVsIG9uIENsaWNrXG4gICAgICBTKHRoaXMuc2NvcGUpLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLmhhcy1kcm9wZG93biAuYmFjaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgdG9wYmFyID0gJHRoaXMuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgIHNlY3Rpb24gPSB0b3BiYXIuZmluZCgnc2VjdGlvbiwgLnNlY3Rpb24nKSxcbiAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSxcbiAgICAgICAgICAgICRtb3ZlZExpID0gJHRoaXMuY2xvc2VzdCgnbGkubW92ZWQnKSxcbiAgICAgICAgICAgICRwcmV2aW91c0xldmVsVWwgPSAkbW92ZWRMaS5wYXJlbnQoKTtcblxuICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCB0b3BiYXIuZGF0YSgnaW5kZXgnKSAtIDEpO1xuXG4gICAgICAgIGlmICghc2VsZi5ydGwpIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7bGVmdDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7bGVmdDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7cmlnaHQ6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe3JpZ2h0OiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcGJhci5kYXRhKCdpbmRleCcpID09PSAwKSB7XG4gICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICRwcmV2aW91c0xldmVsVWwub3V0ZXJIZWlnaHQodHJ1ZSkgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJG1vdmVkTGkucmVtb3ZlQ2xhc3MoJ21vdmVkJyk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVzaXplIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9wYmFyID0gc2VsZi5TKHRoaXMpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICAgIHZhciBzdGlja3lDb250YWluZXIgPSB0b3BiYXIucGFyZW50KCcuJyArIHNlbGYuc2V0dGluZ3Muc3RpY2t5X2NsYXNzKTtcbiAgICAgICAgdmFyIHN0aWNreU9mZnNldDtcblxuICAgICAgICBpZiAoIXNlbGYuYnJlYWtwb2ludCgpKSB7XG4gICAgICAgICAgdmFyIGRvVG9nZ2xlID0gdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIHRvcGJhclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGlmKGRvVG9nZ2xlKSB7XG4gICAgICAgICAgICAgIHNlbGYudG9nZ2xlKHRvcGJhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZWxmLmlzX3N0aWNreSh0b3BiYXIsIHN0aWNreUNvbnRhaW5lciwgc2V0dGluZ3MpKSB7XG4gICAgICAgICAgaWYoc3RpY2t5Q29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpeGVkIHRvIGFsbG93IGZvciBjb3JyZWN0IGNhbGN1bGF0aW9uIG9mIHRoZSBvZmZzZXQuXG4gICAgICAgICAgICBzdGlja3lDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG5cbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICBpZihzZWxmLlMoZG9jdW1lbnQuYm9keSkuaGFzQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJykpIHtcbiAgICAgICAgICAgICAgc3RpY2t5T2Zmc2V0IC09IHRvcGJhci5kYXRhKCdoZWlnaHQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHN0aWNreU9mZnNldCk7XG4gICAgICAgICAgICBzdGlja3lDb250YWluZXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICB0b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0Jywgc3RpY2t5T2Zmc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGJyZWFrcG9pbnQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gIW1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWyd0b3BiYXInXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgc21hbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ3NtYWxsJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIG1lZGl1bSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1snbWVkaXVtJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIGxhcmdlIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWydsYXJnZSddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBhc3NlbWJsZSA6IGZ1bmN0aW9uICh0b3BiYXIpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JyksXG4gICAgICAgICAgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbicsIHRvcGJhcik7XG5cbiAgICAgIC8vIFB1bGwgZWxlbWVudCBvdXQgb2YgdGhlIERPTSBmb3IgbWFuaXB1bGF0aW9uXG4gICAgICBzZWN0aW9uLmRldGFjaCgpO1xuXG4gICAgICBzZWxmLlMoJy5oYXMtZHJvcGRvd24+YScsIHNlY3Rpb24pLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGxpbmsgPSBzZWxmLlModGhpcyksXG4gICAgICAgICAgICAkZHJvcGRvd24gPSAkbGluay5zaWJsaW5ncygnLmRyb3Bkb3duJyksXG4gICAgICAgICAgICB1cmwgPSAkbGluay5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAkdGl0bGVMaTtcblxuICAgICAgICBpZiAoISRkcm9wZG93bi5maW5kKCcudGl0bGUuYmFjaycpLmxlbmd0aCkge1xuICAgICAgICAgICR0aXRsZUxpID0gJCgnPGxpIGNsYXNzPVwidGl0bGUgYmFjayBqcy1nZW5lcmF0ZWRcIj48aDU+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjwvYT48L2g1PjwvbGk+Jyk7XG4gIFxuICAgICAgICAgIC8vIENvcHkgbGluayB0byBzdWJuYXZcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY3VzdG9tX2JhY2tfdGV4dCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAkKCdoNT5hJywgJHRpdGxlTGkpLmh0bWwoc2V0dGluZ3MuYmFja190ZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaDU+YScsICR0aXRsZUxpKS5odG1sKCcmbGFxdW87ICcgKyAkbGluay5odG1sKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkZHJvcGRvd24ucHJlcGVuZCgkdGl0bGVMaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBQdXQgZWxlbWVudCBiYWNrIGluIHRoZSBET01cbiAgICAgIHNlY3Rpb24uYXBwZW5kVG8odG9wYmFyKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIHN0aWNreVxuICAgICAgdGhpcy5zdGlja3koKTtcblxuICAgICAgdGhpcy5hc3NlbWJsZWQodG9wYmFyKTtcbiAgICB9LFxuXG4gICAgYXNzZW1ibGVkIDogZnVuY3Rpb24gKHRvcGJhcikge1xuICAgICAgdG9wYmFyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSksICQuZXh0ZW5kKHt9LCB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSksIHthc3NlbWJsZWQ6IHRydWV9KSk7XG4gICAgfSxcblxuICAgIGhlaWdodCA6IGZ1bmN0aW9uICh1bCkge1xuICAgICAgdmFyIHRvdGFsID0gMCxcbiAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgJCgnPiBsaScsIHVsKS5lYWNoKGZ1bmN0aW9uICgpIHsgXG4gICAgICAgIHRvdGFsICs9IHNlbGYuUyh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTsgXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH0sXG5cbiAgICBzdGlja3kgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi51cGRhdGVfc3RpY2t5X3Bvc2l0aW9uaW5nKCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlX3N0aWNreV9wb3NpdGlvbmluZzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIga2xhc3MgPSAnLicgKyB0aGlzLnNldHRpbmdzLnN0aWNreV9jbGFzcyxcbiAgICAgICAgICAkd2luZG93ID0gdGhpcy5TKHdpbmRvdyksIFxuICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoc2VsZi5zZXR0aW5ncy5zdGlja3lfdG9wYmFyICYmIHNlbGYuaXNfc3RpY2t5KHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhcix0aGlzLnNldHRpbmdzLnN0aWNreV90b3BiYXIucGFyZW50KCksIHRoaXMuc2V0dGluZ3MpKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnKTtcbiAgICAgICAgaWYgKCFzZWxmLlMoa2xhc3MpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgaWYgKCR3aW5kb3cuc2Nyb2xsVG9wKCkgPiAoZGlzdGFuY2UpKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuUyhrbGFzcykuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgICAgc2VsZi5TKGtsYXNzKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICgkd2luZG93LnNjcm9sbFRvcCgpIDw9IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5TKGtsYXNzKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgICBzZWxmLlMoa2xhc3MpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5yZW1vdmVDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgb2ZmIDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5TKHRoaXMuc2NvcGUpLm9mZignLmZuZHRuLnRvcGJhcicpO1xuICAgICAgdGhpcy5TKHdpbmRvdykub2ZmKCcuZm5kdG4udG9wYmFyJyk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHt9XG4gIH07XG59KGpRdWVyeSwgdGhpcywgdGhpcy5kb2N1bWVudCkpO1xuIiwiLy8gRWFzeSBSZXNwb25zaXZlIFRhYnMgUGx1Z2luXG4vLyBBdXRob3I6IFNhbXNvbi5Pbm5hIDxFbWFpbCA6IHNhbXNvbjNkQGdtYWlsLmNvbT5cbihmdW5jdGlvbiAoJCkge1xuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgZWFzeVJlc3BvbnNpdmVUYWJzOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy9TZXQgdGhlIGRlZmF1bHQgdmFsdWVzLCB1c2UgY29tbWEgdG8gc2VwYXJhdGUgdGhlIHNldHRpbmdzLCBleGFtcGxlOlxuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdkZWZhdWx0JywgLy9kZWZhdWx0LCB2ZXJ0aWNhbCwgYWNjb3JkaW9uO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgZml0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsb3NlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCl7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9WYXJpYWJsZXNcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG9wdCA9IG9wdGlvbnMsIGp0eXBlID0gb3B0LnR5cGUsIGpmaXQgPSBvcHQuZml0LCBqd2lkdGggPSBvcHQud2lkdGgsIHZ0YWJzID0gJ3ZlcnRpY2FsJywgYWNjb3JkID0gJ2FjY29yZGlvbic7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgdmFyIGhpc3RvcnlBcGkgPSAhISh3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vRXZlbnRzXG4gICAgICAgICAgICAkKHRoaXMpLmJpbmQoJ3RhYmFjdGl2YXRlJywgZnVuY3Rpb24oZSwgY3VycmVudFRhYikge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBvcHRpb25zLmFjdGl2YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYWN0aXZhdGUuY2FsbChjdXJyZW50VGFiLCBlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL01haW4gZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRyZXNwVGFicyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyICRyZXNwVGFic0xpc3QgPSAkcmVzcFRhYnMuZmluZCgndWwucmVzcC10YWJzLWxpc3QnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcFRhYnNJZCA9ICRyZXNwVGFicy5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCd1bC5yZXNwLXRhYnMtbGlzdCBsaScpLmFkZENsYXNzKCdyZXNwLXRhYi1pdGVtJyk7XG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogandpZHRoXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFicy1jb250YWluZXIgPiBkaXYnKS5hZGRDbGFzcygncmVzcC10YWItY29udGVudCcpO1xuICAgICAgICAgICAgICAgIGp0YWJfb3B0aW9ucygpO1xuICAgICAgICAgICAgICAgIC8vUHJvcGVydGllcyBGdW5jdGlvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGp0YWJfb3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGp0eXBlID09IHZ0YWJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuYWRkQ2xhc3MoJ3Jlc3AtdnRhYnMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoamZpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuY3NzKHsgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAnMHB4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoanR5cGUgPT0gYWNjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuYWRkQ2xhc3MoJ3Jlc3AtZWFzeS1hY2NvcmRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCcucmVzcC10YWJzLWxpc3QnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ25pbmcgdGhlIGgyIG1hcmt1cCB0byBhY2NvcmRpb24gdGl0bGVcbiAgICAgICAgICAgICAgICB2YXIgJHRhYkl0ZW1oMjtcbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQnKS5iZWZvcmUoXCI8aDIgY2xhc3M9J3Jlc3AtYWNjb3JkaW9uJyByb2xlPSd0YWInPjxzcGFuIGNsYXNzPSdyZXNwLWFycm93Jz48L3NwYW4+PC9oMj5cIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtaDIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRhYkl0ZW0gPSAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWl0ZW06ZXEoJyArIGl0ZW1Db3VudCArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYWNjSXRlbSA9ICRyZXNwVGFicy5maW5kKCcucmVzcC1hY2NvcmRpb246ZXEoJyArIGl0ZW1Db3VudCArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICRhY2NJdGVtLmFwcGVuZCgkdGFiSXRlbS5odG1sKCkpO1xuICAgICAgICAgICAgICAgICAgICAkYWNjSXRlbS5kYXRhKCR0YWJJdGVtLmRhdGEoKSk7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtaDIuYXR0cignYXJpYS1jb250cm9scycsICd0YWJfaXRlbS0nICsgKGl0ZW1Db3VudCkpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ291bnQrKztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduaW5nIHRoZSAnYXJpYS1jb250cm9scycgdG8gVGFiIGl0ZW1zXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgJHRhYkNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHRhYkl0ZW0uYXR0cignYXJpYS1jb250cm9scycsICd0YWJfaXRlbS0nICsgKGNvdW50KSk7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtLmF0dHIoJ3JvbGUnLCAndGFiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9Bc3NpZ25pbmcgdGhlICdhcmlhLWxhYmVsbGVkYnknIGF0dHIgdG8gdGFiLWNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFiQ29udGVudCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFiQ29udGVudC5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCAndGFiX2l0ZW0tJyArICh0YWJjb3VudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFiY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBjb3JyZWN0IGNvbnRlbnQgYXJlYVxuICAgICAgICAgICAgICAgIHZhciB0YWJOdW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmKGhhc2ghPScnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gaGFzaC5tYXRjaChuZXcgUmVnRXhwKHJlc3BUYWJzSWQrXCIoWzAtOV0rKVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzIT09bnVsbCAmJiBtYXRjaGVzLmxlbmd0aD09PTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYk51bSA9IHBhcnNlSW50KG1hdGNoZXNbMV0sMTApLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFiTnVtID4gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJOdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BY3RpdmUgY29ycmVjdCB0YWJcbiAgICAgICAgICAgICAgICAkKCRyZXNwVGFicy5maW5kKCcucmVzcC10YWItaXRlbScpW3RhYk51bV0pLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8va2VlcCBjbG9zZWQgaWYgb3B0aW9uID0gJ2Nsb3NlZCcgb3Igb3B0aW9uIGlzICdhY2NvcmRpb24nIGFuZCB0aGUgZWxlbWVudCBpcyBpbiBhY2NvcmRpb24gbW9kZVxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMuY2xvc2VkICE9PSB0cnVlICYmICEob3B0aW9ucy5jbG9zZWQgPT09ICdhY2NvcmRpb24nICYmICEkcmVzcFRhYnNMaXN0LmlzKCc6dmlzaWJsZScpKSAmJiAhKG9wdGlvbnMuY2xvc2VkID09PSAndGFicycgJiYgJHJlc3BUYWJzTGlzdC5pcygnOnZpc2libGUnKSkpIHsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJCgkcmVzcFRhYnMuZmluZCgnLnJlc3AtYWNjb3JkaW9uJylbdGFiTnVtXSkuYWRkQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKCRyZXNwVGFicy5maW5kKCcucmVzcC10YWItY29udGVudCcpW3RhYk51bV0pLmFkZENsYXNzKCdyZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6YmxvY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9hc3NpZ24gcHJvcGVyIGNsYXNzZXMgZm9yIHdoZW4gdGFicyBtb2RlIGlzIGFjdGl2YXRlZCBiZWZvcmUgbWFraW5nIGEgc2VsZWN0aW9uIGluIGFjY29yZGlvbiBtb2RlXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50JylbdGFiTnVtXSkuYWRkQ2xhc3MoJ3Jlc3AtdGFiLWNvbnRlbnQtYWN0aXZlIHJlc3AtYWNjb3JkaW9uLWNsb3NlZCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UYWIgQ2xpY2sgYWN0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbcm9sZT10YWJdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgJGN1cnJlbnRUYWIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFRhYi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY3VycmVudFRhYiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhYkFyaWEgPSAkY3VycmVudFRhYi5hdHRyKCdhcmlhLWNvbnRyb2xzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkY3VycmVudFRhYi5oYXNDbGFzcygncmVzcC1hY2NvcmRpb24nKSAmJiAkY3VycmVudFRhYi5oYXNDbGFzcygncmVzcC10YWItYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQtYWN0aXZlJykuc2xpZGVVcCgnJywgZnVuY3Rpb24gKCkgeyAkKHRoaXMpLmFkZENsYXNzKCdyZXNwLWFjY29yZGlvbi1jbG9zZWQnKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRUYWIucmVtb3ZlQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGN1cnJlbnRUYWIuaGFzQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpICYmICRjdXJyZW50VGFiLmhhc0NsYXNzKCdyZXNwLWFjY29yZGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1hY3RpdmUnKS5yZW1vdmVDbGFzcygncmVzcC10YWItYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpLnNsaWRlVXAoKS5yZW1vdmVDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUgcmVzcC1hY2NvcmRpb24tY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbYXJpYS1jb250cm9scz1cIiArICR0YWJBcmlhICsgXCJdXCIpLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCcucmVzcC10YWItY29udGVudFthcmlhLWxhYmVsbGVkYnkgPSAnICsgJHRhYkFyaWEgKyAnXScpLnNsaWRlRG93bigpLmFkZENsYXNzKCdyZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQtYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUnKS5yZW1vdmVDbGFzcygncmVzcC1hY2NvcmRpb24tY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbYXJpYS1jb250cm9scz1cIiArICR0YWJBcmlhICsgXCJdXCIpLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnRbYXJpYS1sYWJlbGxlZGJ5ID0gJyArICR0YWJBcmlhICsgJ10nKS5hZGRDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUnKS5hdHRyKCdzdHlsZScsICdkaXNwbGF5OmJsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RyaWdnZXIgdGFiIGFjdGl2YXRpb24gZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdXJyZW50VGFiLnRyaWdnZXIoJ3RhYmFjdGl2YXRlJywgJGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSBCcm93c2VyIEhpc3RvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhpc3RvcnlBcGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SGFzaCA9IHJlc3BUYWJzSWQrKHBhcnNlSW50KCR0YWJBcmlhLnN1YnN0cmluZyg5KSwxMCkrMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhhc2ghPVwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXNwVGFic0lkK1wiWzAtOV0rXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhhc2gubWF0Y2gocmUpIT1udWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIYXNoID0gY3VycmVudEhhc2gucmVwbGFjZShyZSxuZXdIYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hhc2ggPSBjdXJyZW50SGFzaCtcInxcIituZXdIYXNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIYXNoID0gJyMnK25ld0hhc2g7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsbnVsbCxuZXdIYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vV2luZG93IHJlc2l6ZSBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLWFjY29yZGlvbi1jbG9zZWQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKGpRdWVyeSk7XG5cbiIsIi8qXG4gKlx0alF1ZXJ5IGVsZXZhdGVab29tIDMuMC44XG4gKlx0RGVtbydzIGFuZCBkb2N1bWVudGF0aW9uOlxuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrL2ltYWdlLXpvb21cbiAqXG4gKlx0Q29weXJpZ2h0IChjKSAyMDEyIEFuZHJldyBFYWRlc1xuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrXG4gKlxuICpcdER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIEdQTCBhbmQgTUlUIGxpY2Vuc2VzLlxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2VcbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dOVV9HZW5lcmFsX1B1YmxpY19MaWNlbnNlXG4gKlxuXG4vKlxuICpcdGpRdWVyeSBlbGV2YXRlWm9vbSAzLjAuM1xuICpcdERlbW8ncyBhbmQgZG9jdW1lbnRhdGlvbjpcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51ay9pbWFnZS16b29tXG4gKlxuICpcdENvcHlyaWdodCAoYykgMjAxMiBBbmRyZXcgRWFkZXNcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51a1xuICpcbiAqXHREdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBHUEwgYW5kIE1JVCBsaWNlbnNlcy5cbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HTlVfR2VuZXJhbF9QdWJsaWNfTGljZW5zZVxuICovXG5cblxuaWYgKCB0eXBlb2YgT2JqZWN0LmNyZWF0ZSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9O1xuICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcbiAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgfTtcbn1cblxuKGZ1bmN0aW9uKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG4gICAgdmFyIEVsZXZhdGVab29tID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMsIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtID0gZWxlbTtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtID0gJCggZWxlbSApO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZVNyYyA9IHNlbGYuJGVsZW0uZGF0YShcInpvb20taW1hZ2VcIikgPyBzZWxmLiRlbGVtLmRhdGEoXCJ6b29tLWltYWdlXCIpIDogc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zID0gJC5leHRlbmQoIHt9LCAkLmZuLmVsZXZhdGVab29tLm9wdGlvbnMsIG9wdGlvbnMgKTtcblxuICAgICAgICAgICAgICAgIC8vVElOVCBPVkVSUklERSBTRVRUSU5HU1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5sZW5zQ29sb3VyID0gXCJub25lXCIsIC8vY29sb3VyIG9mIHRoZSBsZW5zIGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5ID0gIFwiMVwiIC8vb3BhY2l0eSBvZiB0aGUgbGVuc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lOTkVSIE9WRVJSSURFIFNFVFRJTkdTXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge3NlbGYub3B0aW9ucy5zaG93TGVucyA9IGZhbHNlO31cblxuXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgYWx0IG9uIGhvdmVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLnJlbW92ZUF0dHIoJ3RpdGxlJykucmVtb3ZlQXR0cignYWx0Jyk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnJlZnJlc2goIDEgKTtcblxuXG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaW1hZ2Ugc3dhcCBmcm9tIHRoZSBnYWxsZXJ5XG4gICAgICAgICAgICAgICAgJCgnIycrc2VsZi5vcHRpb25zLmdhbGxlcnkgKyAnIGEnKS5jbGljayggZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGEgY2xhc3Mgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgZ2FsbGVyeSBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuZ2FsbGVyeUFjdGl2ZUNsYXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnK3NlbGYub3B0aW9ucy5nYWxsZXJ5ICsgJyBhJykucmVtb3ZlQ2xhc3Moc2VsZi5vcHRpb25zLmdhbGxlcnlBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKHNlbGYub3B0aW9ucy5nYWxsZXJ5QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcCBhbnkgbGluayBvbiB0aGUgYSB0YWcgZnJvbSB3b3JraW5nXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NhbGwgdGhlIHN3YXAgaW1hZ2UgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKSl7c2VsZi56b29tSW1hZ2VQcmUgPSAkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpfVxuICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbUltYWdlUHJlID0gJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIik7fVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXB0aGVpbWFnZSgkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKSwgc2VsZi56b29tSW1hZ2VQcmUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCBsZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mZXRjaChzZWxmLmltYWdlU3JjKTtcblxuICAgICAgICAgICAgICAgIH0sIGxlbmd0aCB8fCBzZWxmLm9wdGlvbnMucmVmcmVzaCApO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKGltZ3NyYykge1xuICAgICAgICAgICAgICAgIC8vZ2V0IHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgbGFyZ2UgaW1hZ2UgZGltZW5zaW9ucyAtIHVzZWQgdG8gY2FsY3VsdGUgcmF0aW8nc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAvL29uY2UgaW1hZ2UgaXMgbG9hZGVkIHN0YXJ0IHRoZSBjYWxsc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGNhbGxlciBrbm93IGltYWdlIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMub25ab29tZWRJbWFnZUxvYWRlZChzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGltZ3NyYzsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnRab29tOiBmdW5jdGlvbiggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vZ2V0IGRpbWVuc2lvbnMgb2YgdGhlIG5vbiB6b29tZWQgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvL2FjdGl2YXRlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzTGVuc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNUaW50QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5vdmVyV2luZG93ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL0Nyb3NzRmFkZSBXcmFwcGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwID0gc2VsZi4kZWxlbS53cmFwKCc8ZGl2IHN0eWxlPVwiaGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O1wiIGNsYXNzPVwiem9vbVdyYXBwZXJcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMTtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy56b29tTGV2ZWw7XG5cblxuICAgICAgICAgICAgICAgIC8vZ2V0IG9mZnNldCBvZiB0aGUgbm9uIHpvb21lZCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSB3aWR0aCByYXRpbyBvZiB0aGUgbGFyZ2Uvc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56SGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAvL2lmIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3RleHQtYWxpZ246Y2VudGVyO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dCZ0NvbG91cilcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7d2lkdGg6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXNpemU6IFwiKyBzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsKyBcInB4IFwiICtzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO3otaW5kZXg6MTAwO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweCBzb2xpZCBcIiArIHNlbGYub3B0aW9ucy5ib3JkZXJDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vaWYgaW5uZXIgIHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaGFzIGEgYm9yZGVyIGJlZW4gcHV0IG9uIHRoZSBpbWFnZT8gTGV0cyBjYXRlciBmb3IgdGhpc1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3JkZXJXaWR0aCA9IHNlbGYuJGVsZW0uY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tbGVmdDogXCIgKyBTdHJpbmcoYm9yZGVyV2lkdGgpICsgXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tdG9wOiBcIiArIFN0cmluZyhib3JkZXJXaWR0aCkgKyBcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDogXCIgKyBTdHJpbmcoc2VsZi5ueldpZHRoKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6IFwiICsgU3RyaW5nKHNlbGYubnpIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiY3Vyc29yOlwiKyhzZWxmLm9wdGlvbnMuY3Vyc29yKStcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4IHNvbGlkIFwiICsgc2VsZi5vcHRpb25zLmJvcmRlckNvbG91clxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAvL2xlbnMgc3R5bGUgZm9yIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1N0eWxlID0gXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3dpZHRoOiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArIFwicHg7aGVpZ2h0OiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pXG4gICAgICAgICAgICAgICAgICAgICsgXCJweDtmbG9hdDogcmlnaHQ7ZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiei1pbmRleDogOTk5O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCItd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3BhY2l0eTpcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KStcIjtmaWx0ZXI6IGFscGhhKG9wYWNpdHkgPSBcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KjEwMCkrXCIpOyB6b29tOjE7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOlwiK2xlbnNXaWR0aCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6XCIrbGVuc0hlaWdodCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKyhzZWxmLm9wdGlvbnMubGVuc0NvbG91cikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImN1cnNvcjpcIisoc2VsZi5vcHRpb25zLmN1cnNvcikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlcjogXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSkrXCJweFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgc29saWQgXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyQ29sb3VyKStcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O3Bvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vdGludCBzdHlsZVxuICAgICAgICAgICAgICAgIHNlbGYudGludFN0eWxlID0gXCJkaXNwbGF5OiBibG9jaztcIlxuICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIitzZWxmLm9wdGlvbnMudGludENvbG91citcIjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiZmlsdGVyOmFscGhhKG9wYWNpdHk9MCk7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIm9wYWNpdHk6IDA7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOiBcIiArIHNlbGYubnpXaWR0aCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBzZWxmLm56SGVpZ2h0ICsgXCJweDtcIlxuXG4gICAgICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgIC8vbGVucyBzdHlsZSBmb3IgbGVucyB6b29tIHdpdGggb3B0aW9uYWwgcm91bmQgZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAgICAgICAgIHNlbGYubGVuc1JvdW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNTdHlsZSA9IFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImZsb2F0OiBsZWZ0O2Rpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXI6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHggc29saWQgXCIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyQ29sb3VyK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6XCIrIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OlwiKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKStcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy9kb2VzIG5vdCByb3VuZCBpbiBhbGwgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubGVuc1NoYXBlID09IFwicm91bmRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNSb3VuZCA9IFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBkaXYncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJcIlxuICAgICAgICAgICAgICAgIC8vc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3pvb21Db250YWluZXInKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiaGVpZ2h0XCI6c2VsZi5uekhlaWdodCwgXCJ3aWR0aFwiOnNlbGYubnpXaWR0aH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInpvb21Db250YWluZXJcIiBzdHlsZT1cIi13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6JytzZWxmLm56T2Zmc2V0LmxlZnQrJ3B4O3RvcDonK3NlbGYubnpPZmZzZXQudG9wKydweDtoZWlnaHQ6JytzZWxmLm56SGVpZ2h0KydweDt3aWR0aDonK3NlbGYubnpXaWR0aCsncHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChzZWxmLnpvb21Db250YWluZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgd2lsbCBhZGQgb3ZlcmZsb3cgaGlkZGVuIGFuZCBjb250cmFpbiB0aGUgbGVucyBvbiBsZW5zIG1vZGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29udGFpbkxlbnNab29tICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zID0gJChcIjxkaXYgY2xhc3M9J3pvb21MZW5zJyBzdHlsZT0nXCIgKyBzZWxmLmxlbnNTdHlsZSArIHNlbGYubGVuc1JvdW5kICtcIic+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0aW50Q29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50ID0gJChcIjxkaXYgY2xhc3M9J3pvb21UaW50JyBzdHlsZT0nXCIrc2VsZi50aW50U3R5bGUrXCInPjwvZGl2PlwiKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLndyYXAoc2VsZi50aW50Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50Y3NzID0gc2VsZi56b29tTGVucy5hZnRlcihzZWxmLnpvb21UaW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aW50IGVuYWJsZWQgLSBzZXQgYW4gaW1hZ2UgdG8gc2hvdyBvdmVyIHRoZSB0aW50XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZSA9ICQoJzxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDBweDsgdG9wOiAwcHg7IG1heC13aWR0aDogbm9uZTsgd2lkdGg6ICcrc2VsZi5ueldpZHRoKydweDsgaGVpZ2h0OiAnK3NlbGYubnpIZWlnaHQrJ3B4O1wiIHNyYz1cIicrc2VsZi5pbWFnZVNyYysnXCI+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21MZW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHpvb20gd2luZG93XG4gICAgICAgICAgICAgICAgaWYoaXNOYU4oc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbikpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3dDb250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnem9vbVdpbmRvd0NvbnRhaW5lcicpLmNzcyhcIndpZHRoXCIsc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LndyYXAoc2VsZi56b29tV2luZG93Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gIHNlbGYuY2FwdGlvblN0eWxlID0gXCJ0ZXh0LWFsaWduOiBsZWZ0O2JhY2tncm91bmQtY29sb3I6IGJsYWNrO2NvbG9yOiB3aGl0ZTtmb250LXdlaWdodDogYm9sZDtwYWRkaW5nOiAxMHB4O2ZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO2ZvbnQtc2l6ZTogMTFweFwiO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuem9vbUNhcHRpb24gPSAkKCc8ZGl2IGNsYXNzPVwiZWxldmF0ZXpvb20tY2FwdGlvblwiIHN0eWxlPVwiJytzZWxmLmNhcHRpb25TdHlsZSsnZGlzcGxheTogYmxvY2s7IHdpZHRoOiAyODBweDtcIj5JTlNFUlQgQUxUIFRBRzwvZGl2PicpLmFwcGVuZFRvKHNlbGYuem9vbVdpbmRvdy5wYXJlbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgc2VsZi5pbWFnZVNyYyArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tRU5EIFRIRSBaT09NIFdJTkRPVyBBTkQgTEVOUy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgICAgIC8vdG91Y2ggZXZlbnRzXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24odG91Y2gpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRvdWNoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbih0b3VjaCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL05lZWRlZCB0byB3b3JrIGluIElFXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vdmVyV2luZG93ID09IGZhbHNlKXtzZWxmLnNldEVsZW1lbnRzKFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3ZlcldpbmRvdyA9PSBmYWxzZSl7c2VsZi5zZXRFbGVtZW50cyhcInNob3dcIik7fVxuXG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5vdmVyV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vICBsZW5zRmFkZU91dDogNTAwLCAgem9vbVRpbnRGYWRlSW5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYWRkKHNlbGYuJGVsZW0pLm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm92ZXJXaW5kb3cgPT0gZmFsc2Upe3NlbGYuc2V0RWxlbWVudHMoXCJzaG93XCIpO31cblxuXG4gICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5zY3JvbGxMb2NrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9lbmQgb3ZlIGltYWdlXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub3ZlcldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVsZW1lbnRzKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZW5kIG92ZSBpbWFnZVxuXG5cblxuLy9cdFx0XHRcdHZhciBkZWx0YSA9IHBhcnNlSW50KGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IC1lLm9yaWdpbmFsRXZlbnQuZGV0YWlsKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgJCh0aGlzKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vZml4IGZvciBpbml0aWFsIHpvb20gc2V0dGluZ1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuem9vbUxldmVsICE9IDEpe1xuICAgICAgICAgICAgICAgICAgICAvL1x0c2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIG1pbiB6b29tbGV2ZWxcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5ab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pblpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50ICogMjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zY3JvbGxab29tKXtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5hZGQoc2VsZi4kZWxlbSkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCBNb3pNb3VzZVBpeGVsU2Nyb2xsJywgZnVuY3Rpb24oZSl7XG5cblxuLy9cdFx0XHRcdFx0XHRpbiBJRSB0aGVyZSBpcyBpc3N1ZSB3aXRoIGZpcmluZyBvZiBtb3VzZWxlYXZlIC0gU28gY2hlY2sgd2hldGhlciBzdGlsbCBzY3JvbGxpbmdcbi8vXHRcdFx0XHRcdFx0YW5kIG9uIG1vdXNlbGVhdmUgY2hlY2sgaWYgc2Nyb2xsbG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCgkLmRhdGEodGhpcywgJ3RpbWVyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsICd0aW1lcicsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDI1MCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhlRXZlbnQgPSBlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSB8fCBlLm9yaWdpbmFsRXZlbnQuZGV0YWlsKi0xXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNjcm9sbFRvcCArPSAoIGRlbHRhIDwgMCA/IDEgOiAtMSApICogMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGVFdmVudCAvMTIwID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsID49IHNlbGYubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxpbmcgZG93blxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsIDw9IHNlbGYub3B0aW9ucy5tYXhab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwocGFyc2VGbG9hdChzZWxmLmN1cnJlbnRab29tTGV2ZWwpK3NlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FuZHlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb21MZXZlbChwYXJzZUZsb2F0KHNlbGYuY3VycmVudFpvb21MZXZlbCkrc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVsZW1lbnRzOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZighc2VsZi5vcHRpb25zLnpvb21FbmFibGVkKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1dpbmRvd1NldCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9wdGlvbnMudGludCkge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcdHNlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoIXNlbGYub3B0aW9ucy56b29tRW5hYmxlZCl7cmV0dXJuIGZhbHNlO31cblxuICAgICAgICAgICAgICAgIC8vcmVjYWNsYyBvZmZzZXQgZWFjaCB0aW1lIGluIGNhc2UgdGhlIGltYWdlIG1vdmVzXG4gICAgICAgICAgICAgICAgLy90aGlzIGNhbiBiZSBjYXVzZWQgYnkgb3RoZXIgb24gcGFnZSBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyB0b3A6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBsZWZ0OiAwfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc2V0IHJlc3BvbnNpdmVcbiAgICAgICAgICAgICAgICAvL3dpbGwgY2hlY2tpbmcgaWYgdGhlIGltYWdlIG5lZWRzIGNoYW5naW5nIGJlZm9yZSBydW5uaW5nIHRoaXMgY29kZSB3b3JrIGZhc3Rlcj9cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMucmVzcG9uc2l2ZSAmJiAhc2VsZi5vcHRpb25zLnNjcm9sbFpvb20pe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gc2VsZi5sYXJnZVdpZHRoIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9zc2libHkgZG9udCBuZWVkIHRvIGtlZXAgcmVjYWxjYWxjdWxhdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGxlbnMgaXMgaGVpZ2hlciB0aGFuIHRoZSBpbWFnZSwgdGhlbiBzZXQgbGVucyBzaXplIHRvIGltYWdlIHNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnaGVpZ2h0JywgbGVuc0hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoJ3dpZHRoJywgc2VsZi5ueldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcygnaGVpZ2h0Jywgc2VsZi5uekhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgd2lkdGg6IFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICsgJ3B4JywgaGVpZ2h0OiBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKSArICdweCcgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VuZCByZXNwb25zaXZlIGltYWdlIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jb250YWluZXIgZml4XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyh7IHRvcDogc2VsZi5uek9mZnNldC50b3B9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKHsgbGVmdDogc2VsZi5uek9mZnNldC5sZWZ0fSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3VzZUxlZnQgPSBwYXJzZUludChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlVG9wID0gcGFyc2VJbnQoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKTtcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgTG9jYXRpb24gb2YgdGhlIExlbnNcblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBib3VuZCByZWdpb25zIC0gYnV0IG9ubHkgaWYgem9vbSB3aW5kb3dcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkV0b3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA8IChzZWxmLnpvb21MZW5zLmhlaWdodCgpLzIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FYm9wcG9zID0gKHNlbGYubW91c2VUb3AgPiBzZWxmLm56SGVpZ2h0IC0gKHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWxvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA8IDArKChzZWxmLnpvb21MZW5zLndpZHRoKCkvMikpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5Fcm9wcG9zID0gKHNlbGYubW91c2VMZWZ0ID4gKHNlbGYubnpXaWR0aCAtIChzZWxmLnpvb21MZW5zLndpZHRoKCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgYm91bmQgcmVnaW9ucyAtIGJ1dCBvbmx5IGZvciBpbm5lciB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXRvcHBvcyA9IChzZWxmLm1vdXNlVG9wIDwgKChzZWxmLm56SGVpZ2h0LzIpL3NlbGYuaGVpZ2h0UmF0aW8pICk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWJvcHBvcyA9IChzZWxmLm1vdXNlVG9wID4gKHNlbGYubnpIZWlnaHQgLSAoKHNlbGYubnpIZWlnaHQvMikvc2VsZi5oZWlnaHRSYXRpbykpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FbG9wcG9zID0gKHNlbGYubW91c2VMZWZ0IDwgMCsoKChzZWxmLm56V2lkdGgvMikvc2VsZi53aWR0aFJhdGlvKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVyb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPiAoc2VsZi5ueldpZHRoIC0gKHNlbGYubnpXaWR0aC8yKS9zZWxmLndpZHRoUmF0aW8tKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBtb3VzZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGlzIG9uZSBvZiB0aGUgb3V0ZXJib3VuZHMsIHRoZW4gaGlkZSAgd2luZG93IGFuZCBsZW5zXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubW91c2VMZWZ0IDw9IDAgfHwgc2VsZi5tb3VzZVRvcCA8IDAgfHwgc2VsZi5tb3VzZUxlZnQgPiBzZWxmLm56V2lkdGggfHwgc2VsZi5tb3VzZVRvcCA+IHNlbGYubnpIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZWxzZSBjb250aW51ZSB3aXRoIG9wZXJhdGlvbnNcbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vbGVucyBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cdFx0c2VsZi5zaG93SGlkZUxlbnMoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgYmFja2dyb3VuZCBwb3NpdGlvbiBvZiBsZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gU3RyaW5nKHNlbGYubW91c2VMZWZ0IC0gc2VsZi56b29tTGVucy53aWR0aCgpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBTdHJpbmcoc2VsZi5tb3VzZVRvcCAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9hZGp1c3QgdGhlIGJhY2tncm91bmQgcG9zaXRpb24gaWYgdGhlIG1vdXNlIGlzIGluIG9uZSBvZiB0aGUgb3V0ZXIgcmVnaW9uc1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVG9wIHJlZ2lvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkV0b3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0xlZnQgUmVnaW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3M9MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1NldCBib3R0b20gYW5kIHJpZ2h0IHJlZ2lvbiBmb3Igd2luZG93IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gTWF0aC5tYXgoIChzZWxmLm56SGVpZ2h0KS1zZWxmLnpvb21MZW5zLmhlaWdodCgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMiksIDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IChzZWxmLm56V2lkdGgtKHNlbGYuem9vbUxlbnMud2lkdGgoKSktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgYm90dG9tIGFuZCByaWdodCByZWdpb24gZm9yIGlubmVyIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBNYXRoLm1heCggKChzZWxmLm56SGVpZ2h0KS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSwgMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gKHNlbGYubnpXaWR0aC0oc2VsZi5ueldpZHRoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVucyB6b29tXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCkgKiBzZWxmLndpZHRoUmF0aW8gLSBzZWxmLnpvb21MZW5zLndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApICogc2VsZi5oZWlnaHRSYXRpbyAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFdpbmRvd1Bvc3RpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIHRpbnQgem9vbVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFRpbnRQb3NpdGlvbihlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBjc3MgYmFja2dyb3VuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgbGVmdDogc2VsZi5sZW5zTGVmdFBvcyArICdweCcsIHRvcDogc2VsZi5sZW5zVG9wUG9zICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGVsc2VcblxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVdpbmRvdzogZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tV2luZG93LnNob3coKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21XaW5kb3cuaGlkZSgpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZUxlbnM6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc0xlbnNBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxlbnNGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy5sZW5zRmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5zaG93KCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNMZW5zQWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sZW5zRmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLmxlbnNGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVRpbnQ6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKS5zdG9wKHRydWUsIHRydWUpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnNob3coKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzVGludEFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tVGludC5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1RpbnRBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMZW5zUG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0V2luZG93UG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBvYmouc2xpY2UoIDAsIGNvdW50ICk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgaWYoIWlzTmFOKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pKXtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTsvL0RPTkUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgrc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC8yKS0oc2VsZi5uekhlaWdodC8yKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAtIChzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAzLDlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpLShzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAtIDUsMTVcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC8yKS0oc2VsZi5ueldpZHRoLzIpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSAwOyAvL0RPTkUgNywgMTNcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiAgLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0IC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC0gKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIDMsOVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9ICgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvMiktKHNlbGYubnpIZWlnaHQvMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oMCk7IC8vRE9ORSA3LCAxM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvMiktKHNlbGYubnpXaWR0aC8yKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE1Oi8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgtc2VsZi56b29tV2luZG93LndpZHRoKCktKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIC0gNSwxNVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6ICAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eSk7Ly9ET05FIC0gMVxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy9lbmQgaXNOQU5cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAvL1dFIENBTiBQT1NJVElPTiBJTiBBIENMQVNTIC0gQVNTVU1FIFRIQVQgQU5ZIFNUUklORyBQQVNTRUQgSVNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lciA9ICQoJyMnK3NlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyV2lkdGggPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXJIZWlnaHQgPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0ID0gc2VsZi5leHRlcm5hbENvbnRhaW5lci5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXJPZmZzZXQudG9wOy8vRE9ORSAtIDFcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID1zZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0LmxlZnQ7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gc2VsZi53aW5kb3dPZmZzZXRUb3AgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eTtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSBzZWxmLndpbmRvd09mZnNldExlZnQgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eDtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyB0b3A6IHNlbGYud2luZG93T2Zmc2V0VG9wfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGxlZnQ6IHNlbGYud2luZG93T2Zmc2V0TGVmdH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgdG9wOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBsZWZ0OiAwfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IFN0cmluZygoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpICogc2VsZi53aWR0aFJhdGlvIC0gc2VsZi56b29tV2luZG93LndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gU3RyaW5nKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAqIHNlbGYuaGVpZ2h0UmF0aW8gLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXRvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAwO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVsb3Bwb3Mpe3NlbGYud2luZG93TGVmdFBvcyA9IDA7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAoc2VsZi5sYXJnZUhlaWdodC9zZWxmLmN1cnJlbnRab29tTGV2ZWwtc2VsZi56b29tV2luZG93LmhlaWdodCgpKSooLTEpOyAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7c2VsZi53aW5kb3dMZWZ0UG9zID0gKChzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpKSooLTEpKTt9XG5cbiAgICAgICAgICAgICAgICAvL3N0b3BzIG1pY3JvIG1vdmVtZW50c1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGx3aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIGNzcyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21Mb2NrID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9vdmVycmlkZXMgZm9yIGltYWdlcyBub3Qgem9vbWFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYud2lkdGhSYXRpbyA8PSAxKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmhlaWdodFJhdGlvIDw9IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1hZ2VzIGxlc3MgdGhhbiB0aGUgd2luZG93IGhlaWdodFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgem9vbXdpbmRvdyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZWFzaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKHNlbGYuY2hhbmdlWm9vbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBwb3MgdG8gMCBpZiBub3Qgc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi54cCl7c2VsZi54cCA9IDA7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYueXApe3NlbGYueXAgPSAwO31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbG9vcCBub3QgYWxyZWFkeSBzdGFydGVkLCB0aGVuIHJ1biBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgemVubydzIHBhcmFkb3hcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwICs9IChzZWxmLndpbmRvd0xlZnRQb3MgIC0gc2VsZi54cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnlwICs9IChzZWxmLndpbmRvd1RvcFBvcyAgLSBzZWxmLnlwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2Nyb2xsaW5nTG9jayl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi54cCA9IHNlbGYud2luZG93TGVmdFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueXAgPSBzZWxmLndpbmRvd1RvcFBvc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwID0gKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KSAqIHNlbGYud2lkdGhSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy53aWR0aCgpIC8gMikgKiAoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi55cCA9ICgoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgKiBzZWxmLmhlaWdodFJhdGlvIC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC8gMikgKiAoLTEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGlmKCFzZWxmLmJneHApe3NlbGYuYmd4cCA9IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmJneXApe3NlbGYuYmd5cCA9IHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSA7fVxuICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuYmdsb29wKXtcbiAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmdsb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICBzZWxmLmJneHAgKz0gKHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlICAtIHNlbGYuYmd4cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJneXAgKz0gKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSAgLSBzZWxmLmJneXApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcblxuICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5iZ3hwICsgJ3B4ICcgKyBzZWxmLmJneXAgKyAncHgnIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgIH0sIDE2KTtcblxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYueHAgKyAncHggJyArIHNlbGYueXAgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCkgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VGludFBvc2l0aW9uOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50cG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCktKHNlbGYuem9vbUxlbnMud2lkdGgoKSAvIDIpKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApIC0gc2VsZi56b29tTGVucy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FdG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcz0wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gKHNlbGYubnpIZWlnaHQtc2VsZi56b29tTGVucy5oZWlnaHQoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSooLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3MgPSAoKHNlbGYubnpXaWR0aC1zZWxmLnpvb21MZW5zLndpZHRoKCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkqKC0xKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcHMgbWljcm8gbW92ZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKHsnbGVmdCc6IHNlbGYudGludHBvcysncHgnfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3Moeyd0b3AnOiBzZWxmLnRpbnRwb3N5KydweCd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzd2FwdGhlaW1hZ2U6IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubG9hZGluZ0ljb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwaW5uZXIgPSAkKCc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKFxcJycrc2VsZi5vcHRpb25zLmxvYWRpbmdJY29uKydcXCcpIG5vLXJlcGVhdCBjZW50ZXI7aGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O3otaW5kZXg6IDIwMDA7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmFmdGVyKHNlbGYuc3Bpbm5lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9uSW1hZ2VTd2FwKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IGxhcmdlaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0ICsgJ3B4JyB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dhcEFjdGlvbihzbWFsbGltYWdlLCBsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gbGFyZ2VpbWFnZTsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN3YXBBY3Rpb246IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nMiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZzIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmUtY2FsY3VsYXRlIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gbmV3SW1nMi5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IG5ld0ltZzIud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5vbkltYWdlU3dhcENvbXBsZXRlKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nMi5zcmMgPSBzbWFsbGltYWdlO1xuXG4gICAgICAgICAgICAgICAgLy9yZXNldCB0aGUgem9vbWxldmVsIHRvIHRoYXQgaW5pdGlhbGx5IHNldCBpbiBvcHRpb25zXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnpvb21MZXZlbDtcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSBtYWluIGltYWdlXG4gICAgICAgICAgICAgICAgLy9zZWxmLiRlbGVtLmF0dHIoXCJzcmNcIixzbWFsbGltYWdlKTtcbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSB6b29tIGltYWdlXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIGxhcmdlaW1hZ2UgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEltYWdlID0gbGFyZ2VpbWFnZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWcgPSBzZWxmLiRlbGVtO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gb2xkSW1nLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYWZ0ZXIobmV3SW1nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgXHRcdFx0XHRpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgYW55IGF0dHJpYnV0ZXMgb24gdGhlIGNsb25lZCBpbWFnZSBzbyB3ZSBjYW4gcmVzaXplIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud2lkdGgoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJ3aWR0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oZWlnaHQoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJoZWlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9sZEltZy5mYWRlSW4oc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWdUaW50ID0gc2VsZi56b29tVGludEltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0ltZ1RpbnQgPSBvbGRJbWdUaW50LmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcInNyY1wiLGxhcmdlaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYWZ0ZXIobmV3SW1nVGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWdUaW50LnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZEltZ1RpbnQuZmFkZUluKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcIndpZHRoXCIsZWxlbS5kYXRhKFwiaW1hZ2VcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2l6ZSB0aGUgdGludCB3aW5kb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgaGVpZ2h0OiBzZWxmLiRlbGVtLmhlaWdodCgpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IHdpZHRoOiBzZWxmLiRlbGVtLndpZHRoKCl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJzcmNcIixsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJ3aWR0aFwiLGVsZW0uZGF0YShcImltYWdlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwiaGVpZ2h0XCIsc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuem9vbVRpbnRJbWFnZS5hdHRyKCdzcmMnKSA9IGVsZW0uZGF0YShcImltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyh7IGhlaWdodDogc2VsZi4kZWxlbS5oZWlnaHQoKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBoZWlnaHQ6IHNlbGYuJGVsZW0uaGVpZ2h0KCl9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9UaGlzIHdpbGwgY29udHJhaW4gdGhlIGltYWdlIHByb3BvcnRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlID09IFwiaGVpZ2h0XCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBcImF1dG9cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3R3aWR0aCA9IHNlbGYuem9vbVdyYXAud2lkdGgoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0d2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUgPT0gXCJ3aWR0aFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdGhlaWdodCA9IHNlbGYuem9vbVdyYXAuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0aGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9uZUNhbGxiYWNrOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sb2FkaW5nSWNvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3Bpbm5lci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHpvb21sZXZlbCBiYWNrIHRvIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuem9vbUxldmVsO1xuXG4gICAgICAgICAgICAgICAgLy9yYXRpbyBvZiB0aGUgbGFyZ2UgdG8gc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSBzZWxmLmxhcmdlV2lkdGggLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy9ORUVEIFRPIEFERCBUSEUgTEVOUyBTSVpFIEZPUiBST1VORFxuICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21MZW5zKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCdoZWlnaHQnLCBsZW5zSGVpZ2h0KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q3VycmVudEltYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi56b29tSW1hZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0R2FsbGVyeUxpc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vbG9vcCB0aHJvdWdoIHRoZSBnYWxsZXJ5IG9wdGlvbnMgYW5kIHNldCB0aGVtIGluIGxpc3QgZm9yIGZhbmN5Ym94XG4gICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2FsbGVyeSl7XG5cblxuICAgICAgICAgICAgICAgICAgICAkKCcjJytzZWxmLm9wdGlvbnMuZ2FsbGVyeSArICcgYScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWdfc3JjID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdfc3JjID0gJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ19zcmMgPSAkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHV0IHRoZSBjdXJyZW50IGltYWdlIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW1nX3NyYyA9PSBzZWxmLnpvb21JbWFnZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycraW1nX3NyYysnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK2ltZ19zcmMrJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgbm8gZ2FsbGVyeSAtIHJldHVybiBjdXJyZW50IGltYWdlXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK3NlbGYuem9vbUltYWdlKycnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nYWxsZXJ5bGlzdDtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVpvb21MZXZlbDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIC8vZmxhZyBhIHpvb20sIHNvIGNhbiBhZGp1c3QgdGhlIGVhc2luZyBkdXJpbmcgc2V0UG9zaXRpb25cbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy9yb3VuZCB0byB0d28gZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL21heHdpZHRoICYgTWF4aGVpZ2h0IG9mIHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIG1heGhlaWdodG5ld3ZhbHVlID0gc2VsZi5sYXJnZUhlaWdodC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0IC8gc2VsZi5uekhlaWdodCkgKiBzZWxmLm56SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHNlbGYubGFyZ2VXaWR0aC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGggLyBzZWxmLm56V2lkdGgpICogc2VsZi5ueldpZHRoKTtcblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIG5ldyBoZWlnaHRyYXRpb1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihtYXhoZWlnaHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbWF4aGVpZ2h0bmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L25ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuLy9cdFx0XHRcdFx0Y2FsY3VsYXRlIG5ldyB3aWR0aCByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1heHdpZHRodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbWF4d2lkdGh0bmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBtYXhoZWlnaHRuZXd2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhoZWlnaHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZUhlaWdodC9zZWxmLm56SGVpZ2h0KS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZVdpZHRoL3NlbGYubnpXaWR0aCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3dmFsdWUgPSBtYXh3aWR0aHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heGhlaWdodG5ld3ZhbHVlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4d2lkdGh0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGlubmVyXG4gICAgICAgICAgICAgICAgc2NyY29udGludWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYubmV3dmFsdWV3aWR0aCA8PSBtYXh3aWR0aHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA+IHNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5uZXd2YWx1ZXdpZHRoIDw9IG1heHdpZHRodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc2NyY29udGludWUpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlbnMgaGVpZ2h0IGlzIGxlc3MgdGhhbiBpbWFnZSBoZWlnaHRcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pIDw9IHNlbGYubnpIZWlnaHQpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWVoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHtoZWlnaHQ6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKSA8PSBzZWxmLm56V2lkdGgpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uZXd2YWx1ZXdpZHRoID4gc2VsZi5uZXd2YWx1ZWhlaWdodCkgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7d2lkdGg6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArICdweCcgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIiB8fCBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPiBzZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSAgICAgIC8vdW5kZXJcblxuICAgICAgICAgICAgICAgIC8vc2V0cyB0aGUgYm91bmRyeSBjaGFuZ2UsIGNhbGxlZCBpbiBzZXRXaW5kb3dQb3NcbiAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHNlbGYuY3VycmVudExvYyk7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUFsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21XaW5kb3cpe3NlbGYuem9vbVdpbmRvdy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbUxlbnMpe3NlbGYuem9vbUxlbnMuaGlkZSgpO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21UaW50KXtzZWxmLnpvb21UaW50LmhpZGUoKTt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ2VuYWJsZScpe3NlbGYub3B0aW9ucy56b29tRW5hYmxlZCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09ICdkaXNhYmxlJyl7c2VsZi5vcHRpb25zLnpvb21FbmFibGVkID0gZmFsc2U7fVxuXG4gICAgICAgICAgICB9XG5cbiAgICB9O1xuXG5cblxuXG4gICAgJC5mbi5lbGV2YXRlWm9vbSA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZXZhdGUgPSBPYmplY3QuY3JlYXRlKCBFbGV2YXRlWm9vbSApO1xuXG4gICAgICAgICAgICBlbGV2YXRlLmluaXQoIG9wdGlvbnMsIHRoaXMgKTtcblxuICAgICAgICAgICAgJC5kYXRhKCB0aGlzLCAnZWxldmF0ZVpvb20nLCBlbGV2YXRlICk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uZWxldmF0ZVpvb20ub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHpvb21BY3RpdmF0aW9uOiBcImhvdmVyXCIsIC8vIENhbiBhbHNvIGJlIGNsaWNrIChQTEFDRUhPTERFUiBGT1IgTkVYVCBWRVJTSU9OKVxuICAgICAgem9vbUVuYWJsZWQ6IHRydWUsIC8vZmFsc2UgZGlzYWJsZXMgem9vbXdpbmRvdyBmcm9tIHNob3dpbmdcbiAgICAgICAgICAgIHByZWxvYWRpbmc6IDEsIC8vYnkgZGVmYXVsdCwgbG9hZCBhbGwgdGhlIGltYWdlcywgaWYgMCwgdGhlbiBvbmx5IGxvYWQgaW1hZ2VzIGFmdGVyIGFjdGl2YXRlZCAoUExBQ0VIT0xERVIgRk9SIE5FWFQgVkVSU0lPTilcbiAgICAgICAgICAgIHpvb21MZXZlbDogMSwgLy9kZWZhdWx0IHpvb20gbGV2ZWwgb2YgaW1hZ2VcbiAgICAgICAgICAgIHNjcm9sbFpvb206IGZhbHNlLCAvL2FsbG93IHpvb20gb24gbW91c2V3aGVlbCwgdHJ1ZSB0byBhY3RpdmF0ZVxuICAgICAgICAgICAgc2Nyb2xsWm9vbUluY3JlbWVudDogMC4xLCAgLy9zdGVwcyBvZiB0aGUgc2Nyb2xsem9vbVxuICAgICAgICAgICAgbWluWm9vbUxldmVsOiBmYWxzZSxcbiAgICAgICAgICAgIG1heFpvb21MZXZlbDogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmc6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nQW1vdW50OiAxMixcbiAgICAgICAgICAgIGxlbnNTaXplOiAyMDAsXG4gICAgICAgICAgICB6b29tV2luZG93V2lkdGg6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dIZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dPZmZldHg6IDAsXG4gICAgICAgICAgICB6b29tV2luZG93T2ZmZXR5OiAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd1Bvc2l0aW9uOiAxLFxuICAgICAgICAgICAgem9vbVdpbmRvd0JnQ29sb3VyOiBcIiNmZmZcIixcbiAgICAgICAgICAgIGxlbnNGYWRlSW46IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0ZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgem9vbVdpbmRvd0ZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93RmFkZU91dDogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93QWx3YXlzU2hvdzogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgYm9yZGVyU2l6ZTogNCxcbiAgICAgICAgICAgIHNob3dMZW5zOiB0cnVlLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3VyOiBcIiM4ODhcIixcbiAgICAgICAgICAgIGxlbnNCb3JkZXJTaXplOiAxLFxuICAgICAgICAgICAgbGVuc0JvcmRlckNvbG91cjogXCIjMDAwXCIsXG4gICAgICAgICAgICBsZW5zU2hhcGU6IFwic3F1YXJlXCIsIC8vY2FuIGJlIFwicm91bmRcIlxuICAgICAgICAgICAgem9vbVR5cGU6IFwid2luZG93XCIsIC8vd2luZG93IGlzIGRlZmF1bHQsICBhbHNvIFwibGVuc1wiIGF2YWlsYWJsZSAtXG4gICAgICAgICAgICBjb250YWluTGVuc1pvb206IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0NvbG91cjogXCJ3aGl0ZVwiLCAvL2NvbG91ciBvZiB0aGUgbGVucyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBsZW5zT3BhY2l0eTogMC40LCAvL29wYWNpdHkgb2YgdGhlIGxlbnNcbiAgICAgICAgICAgIGxlbnN6b29tOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbnQ6IGZhbHNlLCAvL2VuYWJsZSB0aGUgdGludGluZ1xuICAgICAgICAgICAgdGludENvbG91cjogXCIjMzMzXCIsIC8vZGVmYXVsdCB0aW50IGNvbG9yLCBjYW4gYmUgYW55dGhpbmcsIHJlZCwgI2NjYywgcmdiKDAsMCwwKVxuICAgICAgICAgICAgdGludE9wYWNpdHk6IDAuNCwgLy9vcGFjaXR5IG9mIHRoZSB0aW50XG4gICAgICAgICAgICBnYWxsZXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGdhbGxlcnlBY3RpdmVDbGFzczogXCJ6b29tR2FsbGVyeUFjdGl2ZVwiLFxuICAgICAgICAgICAgaW1hZ2VDcm9zc2ZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uc3RyYWluVHlwZTogZmFsc2UsICAvL3dpZHRoIG9yIGhlaWdodFxuICAgICAgICAgICAgY29uc3RyYWluU2l6ZTogZmFsc2UsICAvL2luIHBpeGVscyB0aGUgZGltZW5zaW9ucyB5b3Ugd2FudCB0byBjb25zdHJhaW4gb25cbiAgICAgICAgICAgIGxvYWRpbmdJY29uOiBmYWxzZSwgLy9odHRwOi8vd3d3LmV4YW1wbGUuY29tL3NwaW5uZXIuZ2lmXG4gICAgICAgICAgICBjdXJzb3I6XCJkZWZhdWx0XCIsIC8vIHVzZXIgc2hvdWxkIHNldCB0byB3aGF0IHRoZXkgd2FudCB0aGUgY3Vyc29yIGFzLCBpZiB0aGV5IGhhdmUgc2V0IGEgY2xpY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHJlc3BvbnNpdmU6dHJ1ZSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICQubm9vcCxcbiAgICAgICAgICAgIG9uWm9vbWVkSW1hZ2VMb2FkZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvbkltYWdlU3dhcDogJC5ub29wLFxuICAgICAgICAgICAgb25JbWFnZVN3YXBDb21wbGV0ZTogJC5ub29wXG4gICAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApO1xuIiwiLypcbiAqIGpRdWVyeSBGbGV4U2xpZGVyIHYyLjIuMlxuICogQ29weXJpZ2h0IDIwMTIgV29vVGhlbWVzXG4gKiBDb250cmlidXRpbmcgQXV0aG9yOiBUeWxlciBTbWl0aFxuICovXG47XG4oZnVuY3Rpb24gKCQpIHtcblxuICAvL0ZsZXhTbGlkZXI6IE9iamVjdCBJbnN0YW5jZVxuICAkLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciBzbGlkZXIgPSAkKGVsKTtcblxuICAgIC8vIG1ha2luZyB2YXJpYWJsZXMgcHVibGljXG4gICAgc2xpZGVyLnZhcnMgPSAkLmV4dGVuZCh7fSwgJC5mbGV4c2xpZGVyLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIHZhciBuYW1lc3BhY2UgPSBzbGlkZXIudmFycy5uYW1lc3BhY2UsXG4gICAgICAgIG1zR2VzdHVyZSA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5NU0dlc3R1cmUsXG4gICAgICAgIHRvdWNoID0gKCggXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cgKSB8fCBtc0dlc3R1cmUgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSAmJiBzbGlkZXIudmFycy50b3VjaCxcbiAgICAgICAgLy8gZGVwcmljYXRpbmcgdGhpcyBpZGVhLCBhcyBkZXZpY2VzIGFyZSBiZWluZyByZWxlYXNlZCB3aXRoIGJvdGggb2YgdGhlc2UgZXZlbnRzXG4gICAgICAgIC8vZXZlbnRUeXBlID0gKHRvdWNoKSA/IFwidG91Y2hlbmRcIiA6IFwiY2xpY2tcIixcbiAgICAgICAgZXZlbnRUeXBlID0gXCJjbGljayB0b3VjaGVuZCBNU1BvaW50ZXJVcCBrZXl1cFwiLFxuICAgICAgICB3YXRjaGVkRXZlbnQgPSBcIlwiLFxuICAgICAgICB3YXRjaGVkRXZlbnRDbGVhclRpbWVyLFxuICAgICAgICB2ZXJ0aWNhbCA9IHNsaWRlci52YXJzLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICByZXZlcnNlID0gc2xpZGVyLnZhcnMucmV2ZXJzZSxcbiAgICAgICAgY2Fyb3VzZWwgPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gMCksXG4gICAgICAgIGZhZGUgPSBzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwiZmFkZVwiLFxuICAgICAgICBhc05hdiA9IHNsaWRlci52YXJzLmFzTmF2Rm9yICE9PSBcIlwiLFxuICAgICAgICBtZXRob2RzID0ge30sXG4gICAgICAgIGZvY3VzZWQgPSB0cnVlO1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIHNsaWRlciBvYmplY3RcbiAgICAkLmRhdGEoZWwsIFwiZmxleHNsaWRlclwiLCBzbGlkZXIpO1xuXG4gICAgLy8gUHJpdmF0ZSBzbGlkZXIgbWV0aG9kc1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAvLyBHZXQgY3VycmVudCBzbGlkZSBhbmQgbWFrZSBzdXJlIGl0IGlzIGEgbnVtYmVyXG4gICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBwYXJzZUludCggKCBzbGlkZXIudmFycy5zdGFydEF0ID8gc2xpZGVyLnZhcnMuc3RhcnRBdCA6IDApLCAxMCApO1xuICAgICAgICBpZiAoIGlzTmFOKCBzbGlkZXIuY3VycmVudFNsaWRlICkgKSBzbGlkZXIuY3VycmVudFNsaWRlID0gMDtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgc2xpZGVyLmF0RW5kID0gKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgfHwgc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IgPSBzbGlkZXIudmFycy5zZWxlY3Rvci5zdWJzdHIoMCxzbGlkZXIudmFycy5zZWxlY3Rvci5zZWFyY2goJyAnKSk7XG4gICAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyID0gJChzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IsIHNsaWRlcik7XG4gICAgICAgIHNsaWRlci5jb3VudCA9IHNsaWRlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBzbGlkZXIuc3luY0V4aXN0cyA9ICQoc2xpZGVyLnZhcnMuc3luYykubGVuZ3RoID4gMDtcbiAgICAgICAgLy8gU0xJREU6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwic2xpZGVcIikgc2xpZGVyLnZhcnMuYW5pbWF0aW9uID0gXCJzd2luZ1wiO1xuICAgICAgICBzbGlkZXIucHJvcCA9ICh2ZXJ0aWNhbCkgPyBcInRvcFwiIDogXCJtYXJnaW5MZWZ0XCI7XG4gICAgICAgIHNsaWRlci5hcmdzID0ge307XG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gZmFsc2U7XG4gICAgICAgIHNsaWRlci5zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIC8vUEFVU0UgV0hFTiBJTlZJU0lCTEVcbiAgICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGVyLnN0YXJ0VGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIFRPVUNIL1VTRUNTUzpcbiAgICAgICAgc2xpZGVyLnRyYW5zaXRpb25zID0gIXNsaWRlci52YXJzLnZpZGVvICYmICFmYWRlICYmIHNsaWRlci52YXJzLnVzZUNTUyAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICBwcm9wcyA9IFsncGVyc3BlY3RpdmVQcm9wZXJ0eScsICdXZWJraXRQZXJzcGVjdGl2ZScsICdNb3pQZXJzcGVjdGl2ZScsICdPUGVyc3BlY3RpdmUnLCAnbXNQZXJzcGVjdGl2ZSddO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICggb2JqLnN0eWxlWyBwcm9wc1tpXSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5wZnggPSBwcm9wc1tpXS5yZXBsYWNlKCdQZXJzcGVjdGl2ZScsJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIHNsaWRlci5wcm9wID0gXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIHNsaWRlci5lbnN1cmVBbmltYXRpb25FbmQgPSAnJztcbiAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lciAhPT0gXCJcIikgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyID0gJChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lcikubGVuZ3RoID4gMCAmJiAkKHNsaWRlci52YXJzLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gTUFOVUFMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMgIT09IFwiXCIpIHNsaWRlci5tYW51YWxDb250cm9scyA9ICQoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMpLmxlbmd0aCA+IDAgJiYgJChzbGlkZXIudmFycy5tYW51YWxDb250cm9scyk7XG5cbiAgICAgICAgLy8gUkFORE9NSVpFOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMucmFuZG9taXplKSB7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5zb3J0KGZ1bmN0aW9uKCkgeyByZXR1cm4gKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSktMC41KTsgfSk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgICAvLyBJTklUXG4gICAgICAgIHNsaWRlci5zZXR1cChcImluaXRcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmNvbnRyb2xOYXYpIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYuc2V0dXAoKTtcblxuICAgICAgICAvLyBLRVlCT0FSRDpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmtleWJvYXJkICYmICgkKHNsaWRlci5jb250YWluZXJTZWxlY3RvcikubGVuZ3RoID09PSAxIHx8IHNsaWRlci52YXJzLm11bHRpcGxlS2V5Ym9hcmQpKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGtleWNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIChrZXljb2RlID09PSAzOSB8fCBrZXljb2RlID09PSAzNykpIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChrZXljb2RlID09PSAzOSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWNvZGUgPT09IDM3KSA/IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKSA6IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNT1VTRVdIRUVMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubW91c2V3aGVlbCkge1xuICAgICAgICAgIHNsaWRlci5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoZGVsdGEgPCAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUEFVU0VQTEFZXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5wYXVzZVBsYXkpIG1ldGhvZHMucGF1c2VQbGF5LnNldHVwKCk7XG5cbiAgICAgICAgLy9QQVVTRSBXSEVOIElOVklTSUJMRVxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc2xpZGVzaG93ICYmIHNsaWRlci52YXJzLnBhdXNlSW52aXNpYmxlKSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLmluaXQoKTtcblxuICAgICAgICAvLyBTTElEU0VTSE9XXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbGlkZXNob3cpIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICBzbGlkZXIuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbFBsYXkgJiYgIXNsaWRlci5tYW51YWxQYXVzZSkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFzbGlkZXIubWFudWFsUGF1c2UgJiYgIXNsaWRlci5tYW51YWxQbGF5ICYmICFzbGlkZXIuc3RvcHBlZCkgc2xpZGVyLnBsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvblxuICAgICAgICAgIC8vSWYgd2UncmUgdmlzaWJsZSwgb3Igd2UgZG9uJ3QgdXNlIFBhZ2VWaXNpYmlsaXR5IEFQSVxuICAgICAgICAgIGlmKCFzbGlkZXIudmFycy5wYXVzZUludmlzaWJsZSB8fCAhbWV0aG9kcy5wYXVzZUludmlzaWJsZS5pc0hpZGRlbigpKSB7XG4gICAgICAgICAgICAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzbGlkZXIuc3RhcnRUaW1lb3V0ID0gc2V0VGltZW91dChzbGlkZXIucGxheSwgc2xpZGVyLnZhcnMuaW5pdERlbGF5KSA6IHNsaWRlci5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQVNOQVY6XG4gICAgICAgIGlmIChhc05hdikgbWV0aG9kcy5hc05hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIFRPVUNIXG4gICAgICAgIGlmICh0b3VjaCAmJiBzbGlkZXIudmFycy50b3VjaCkgbWV0aG9kcy50b3VjaCgpO1xuXG4gICAgICAgIC8vIEZBREUmJlNNT09USEhFSUdIVCB8fCBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlIHx8IChmYWRlICYmIHNsaWRlci52YXJzLnNtb290aEhlaWdodCkpICQod2luZG93KS5iaW5kKFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIGZvY3VzXCIsIG1ldGhvZHMucmVzaXplKTtcblxuICAgICAgICBzbGlkZXIuZmluZChcImltZ1wiKS5hdHRyKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG5cbiAgICAgICAgLy8gQVBJOiBzdGFydCgpIENhbGxiYWNrXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBzbGlkZXIudmFycy5zdGFydChzbGlkZXIpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfSxcbiAgICAgIGFzTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuYXNOYXYgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IE1hdGguZmxvb3Ioc2xpZGVyLmN1cnJlbnRTbGlkZS9zbGlkZXIubW92ZSk7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRJdGVtID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHNsaWRlci5jdXJyZW50SXRlbSkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgaWYoIW1zR2VzdHVyZSl7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMub24oZXZlbnRUeXBlLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgIHZhciBwb3NGcm9tTGVmdCA9ICRzbGlkZS5vZmZzZXQoKS5sZWZ0IC0gJChzbGlkZXIpLnNjcm9sbExlZnQoKTsgLy8gRmluZCBwb3NpdGlvbiBvZiBzbGlkZSByZWxhdGl2ZSB0byBsZWZ0IG9mIHNsaWRlciBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiggcG9zRnJvbUxlZnQgPD0gMCAmJiAkc2xpZGUuaGFzQ2xhc3MoIG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnICkgKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmdldFRhcmdldChcInByZXZcIiksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISQoc2xpZGVyLnZhcnMuYXNOYXZGb3IpLmRhdGEoJ2ZsZXhzbGlkZXInKS5hbmltYXRpbmcgJiYgISRzbGlkZS5oYXNDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKSkge1xuICAgICAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIGZhbHNlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVhY2goZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICB0aGF0Ll9nZXN0dXJlID0gbmV3IE1TR2VzdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5fZ2VzdHVyZS50YXJnZXQgPSB0aGF0O1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNQb2ludGVyRG93blwiLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5fZ2VzdHVyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0Ll9nZXN0dXJlLmFkZFBvaW50ZXIoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNHZXN0dXJlVGFwXCIsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghJChzbGlkZXIudmFycy5hc05hdkZvcikuZGF0YSgnZmxleHNsaWRlcicpLmFuaW1hdGluZyAmJiAhJHNsaWRlLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xOYXY6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0dXBQYWdpbmcoKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBNQU5VQUxDT05UUk9MUzpcbiAgICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cE1hbnVhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBQYWdpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0eXBlID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdjb250cm9sLXRodW1icycgOiAnY29udHJvbC1wYWdpbmcnLFxuICAgICAgICAgICAgICBqID0gMSxcbiAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgc2xpZGU7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkID0gJCgnPG9sIGNsYXNzPVwiJysgbmFtZXNwYWNlICsgJ2NvbnRyb2wtbmF2ICcgKyBuYW1lc3BhY2UgKyB0eXBlICsgJ1wiPjwvb2w+Jyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIucGFnaW5nQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBzbGlkZSA9IHNsaWRlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgIGl0ZW0gPSAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiA9PT0gXCJ0aHVtYm5haWxzXCIpID8gJzxpbWcgc3JjPVwiJyArIHNsaWRlLmF0dHIoICdkYXRhLXRodW1iJyApICsgJ1wiLz4nIDogJzxhPicgKyBqICsgJzwvYT4nO1xuICAgICAgICAgICAgICBpZiAoICd0aHVtYm5haWxzJyA9PT0gc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiB0cnVlID09PSBzbGlkZXIudmFycy50aHVtYkNhcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciBjYXB0biA9IHNsaWRlLmF0dHIoICdkYXRhLXRodW1iY2FwdGlvbicgKTtcbiAgICAgICAgICAgICAgICBpZiAoICcnICE9IGNhcHRuICYmIHVuZGVmaW5lZCAhPSBjYXB0biApIGl0ZW0gKz0gJzxzcGFuIGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICdjYXB0aW9uXCI+JyArIGNhcHRuICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuYXBwZW5kKCc8bGk+JyArIGl0ZW0gKyAnPC9saT4nKTtcbiAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpID8gJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkKSA6IHNsaWRlci5hcHBlbmQoc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZCk7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuXG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZSgnYSwgaW1nJywgZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHNsaWRlci5jb250cm9sTmF2LmluZGV4KCR0aGlzKTtcblxuICAgICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldHVwTWFudWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdiA9IHNsaWRlci5tYW51YWxDb250cm9scztcbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdi5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuY29udHJvbE5hdi5pbmRleCgkdGhpcyk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkdGhpcy5oYXNDbGFzcyhuYW1lc3BhY2UgKyAnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBzbGlkZXIuZGlyZWN0aW9uID0gXCJuZXh0XCIgOiBzbGlkZXIuZGlyZWN0aW9uID0gXCJwcmV2XCI7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0dXAgZmxhZ3MgdG8gcHJldmVudCBldmVudCBkdXBsaWNhdGlvblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIikge1xuICAgICAgICAgICAgICB3YXRjaGVkRXZlbnQgPSBldmVudC50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0aG9kcy5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdpbWcnIDogJ2EnO1xuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnY29udHJvbC1uYXYgbGkgJyArIHNlbGVjdG9yLCAoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKSA/IHNsaWRlci5jb250cm9sc0NvbnRhaW5lciA6IHNsaWRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmVcIikuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihhY3Rpb24sIHBvcykge1xuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIGFjdGlvbiA9PT0gXCJhZGRcIikge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoJCgnPGxpPjxhPicgKyBzbGlkZXIuY291bnQgKyAnPC9hPjwvbGk+JykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmZpbmQoJ2xpJykucmVtb3ZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmVxKHBvcykuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuICAgICAgICAgIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIHNsaWRlci5wYWdpbmdDb3VudCAhPT0gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSA/IHNsaWRlci51cGRhdGUocG9zLCBhY3Rpb24pIDogbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uTmF2U2NhZmZvbGQgPSAkKCc8dWwgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXZcIj48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ByZXZcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5wcmV2VGV4dCArICc8L2E+PC9saT48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ25leHRcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5uZXh0VGV4dCArICc8L2E+PC9saT48L3VsPicpO1xuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgaWYgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYmluZChldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gKCQodGhpcykuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ25leHQnKSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOiBzbGlkZXIuZ2V0VGFyZ2V0KCdwcmV2Jyk7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXR1cCBmbGFncyB0byBwcmV2ZW50IGV2ZW50IGR1cGxpY2F0aW9uXG4gICAgICAgICAgICBpZiAod2F0Y2hlZEV2ZW50ID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgIHdhdGNoZWRFdmVudCA9IGV2ZW50LnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRob2RzLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlzYWJsZWRDbGFzcyA9IG5hbWVzcGFjZSArICdkaXNhYmxlZCc7XG4gICAgICAgICAgaWYgKHNsaWRlci5wYWdpbmdDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJwcmV2XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5hbmltYXRpbmdUbyA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJuZXh0XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcykucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXVzZVBsYXk6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwYXVzZVBsYXlTY2FmZm9sZCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheVwiPjxhPjwvYT48L2Rpdj4nKTtcblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIGlmIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sc0NvbnRhaW5lci5hcHBlbmQocGF1c2VQbGF5U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLnBhdXNlUGxheSA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChwYXVzZVBsYXlTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2VQbGF5ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAncGF1c2VwbGF5IGEnLCBzbGlkZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1ldGhvZHMucGF1c2VQbGF5LnVwZGF0ZSgoc2xpZGVyLnZhcnMuc2xpZGVzaG93KSA/IG5hbWVzcGFjZSArICdwYXVzZScgOiBuYW1lc3BhY2UgKyAncGxheScpO1xuXG4gICAgICAgICAgc2xpZGVyLnBhdXNlUGxheS5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIucGxheSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgKHN0YXRlID09PSBcInBsYXlcIikgPyBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpLmFkZENsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuaHRtbChzbGlkZXIudmFycy5wbGF5VGV4dCkgOiBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuYWRkQ2xhc3MobmFtZXNwYWNlICsgJ3BhdXNlJykuaHRtbChzbGlkZXIudmFycy5wYXVzZVRleHQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgY3dpZHRoLFxuICAgICAgICAgIGR4LFxuICAgICAgICAgIHN0YXJ0VCxcbiAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZSxcbiAgICAgICAgICBsb2NhbFggPSAwLFxuICAgICAgICAgIGxvY2FsWSA9IDAsXG4gICAgICAgICAgYWNjRHggPSAwO1xuXG4gICAgICAgIGlmKCFtc0dlc3R1cmUpe1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggKCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgKSB8fCBlLnRvdWNoZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIENBUk9VU0VMOlxuICAgICAgICAgICAgICAgIGN3aWR0aCA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuaCA6IHNsaWRlci4gdztcbiAgICAgICAgICAgICAgICBzdGFydFQgPSBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAvLyBMb2NhbCB2YXJzIGZvciBYIGFuZCBZIHBvaW50cy5cbiAgICAgICAgICAgICAgICBsb2NhbFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwgJiYgcmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHJldmVyc2UpID8gKHNsaWRlci5sYXN0IC0gc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGggOiAoc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGg7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gKHZlcnRpY2FsKSA/IGxvY2FsWSA6IGxvY2FsWDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSAodmVydGljYWwpID8gbG9jYWxYIDogbG9jYWxZO1xuXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgICAgICAgIC8vIExvY2FsIHZhcnMgZm9yIFggYW5kIFkgcG9pbnRzLlxuXG4gICAgICAgICAgICAgIGxvY2FsWCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgIGR4ID0gKHZlcnRpY2FsKSA/IHN0YXJ0WCAtIGxvY2FsWSA6IHN0YXJ0WCAtIGxvY2FsWDtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gKHZlcnRpY2FsKSA/IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFggLSBzdGFydFkpKSA6IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFkgLSBzdGFydFkpKTtcblxuICAgICAgICAgICAgICB2YXIgZnhtcyA9IDUwMDtcblxuICAgICAgICAgICAgICBpZiAoICEgc2Nyb2xsaW5nIHx8IE51bWJlciggbmV3IERhdGUoKSApIC0gc3RhcnRUID4gZnhtcyApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWRlICYmIHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4ID0gZHgvKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGR4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBkeCA+IDApID8gKE1hdGguYWJzKGR4KS9jd2lkdGgrMikgOiAxKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhvZmZzZXQgKyBkeCwgXCJzZXRUb3VjaFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Ub3VjaEVuZChlKSB7XG4gICAgICAgICAgICAgIC8vIGZpbmlzaCB0aGUgdG91Y2ggYnkgdW5kb2luZyB0aGUgdG91Y2ggc2Vzc2lvblxuICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVEeCA9IChyZXZlcnNlKSA/IC1keCA6IGR4LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAodXBkYXRlRHggPiAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKCFmYWRlKSBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmN1cnJlbnRTbGlkZSwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgICAgIHN0YXJ0WSA9IG51bGw7XG4gICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgb2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbC5zdHlsZS5tc1RvdWNoQWN0aW9uID0gXCJub25lXCI7XG4gICAgICAgICAgICBlbC5fZ2VzdHVyZSA9IG5ldyBNU0dlc3R1cmUoKTtcbiAgICAgICAgICAgIGVsLl9nZXN0dXJlLnRhcmdldCA9IGVsO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TUG9pbnRlckRvd25cIiwgb25NU1BvaW50ZXJEb3duLCBmYWxzZSk7XG4gICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUNoYW5nZVwiLCBvbk1TR2VzdHVyZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUVuZFwiLCBvbk1TR2VzdHVyZUVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1TUG9pbnRlckRvd24oZSl7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgYWNjRHggPSAwO1xuICAgICAgICAgICAgICAgICAgICBjd2lkdGggPSAodmVydGljYWwpID8gc2xpZGVyLmggOiBzbGlkZXIuIHc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VCA9IE51bWJlcihuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiByZXZlcnNlKSA/IHNsaWRlci5saW1pdCAtICgoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0KSA/IHNsaWRlci5saW1pdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyAoc2xpZGVyLmxhc3QgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aCA6IChzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0cmFuc1ggPSAtZS50cmFuc2xhdGlvblgsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zWSA9IC1lLnRyYW5zbGF0aW9uWTtcblxuICAgICAgICAgICAgICAgIC8vQWNjdW11bGF0ZSB0cmFuc2xhdGlvbnMuXG4gICAgICAgICAgICAgICAgYWNjRHggPSBhY2NEeCArICgodmVydGljYWwpID8gdHJhbnNZIDogdHJhbnNYKTtcbiAgICAgICAgICAgICAgICBkeCA9IGFjY0R4O1xuICAgICAgICAgICAgICAgIHNjcm9sbGluZyA9ICh2ZXJ0aWNhbCkgPyAoTWF0aC5hYnMoYWNjRHgpIDwgTWF0aC5hYnMoLXRyYW5zWCkpIDogKE1hdGguYWJzKGFjY0R4KSA8IE1hdGguYWJzKC10cmFuc1kpKTtcblxuICAgICAgICAgICAgICAgIGlmKGUuZGV0YWlsID09PSBlLk1TR0VTVFVSRV9GTEFHX0lORVJUSUEpe1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNjcm9sbGluZyB8fCBOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPiA1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZhZGUgJiYgc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCA9IGFjY0R4IC8gKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGFjY0R4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBhY2NEeCA+IDApID8gKE1hdGguYWJzKGFjY0R4KSAvIGN3aWR0aCArIDIpIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMob2Zmc2V0ICsgZHgsIFwic2V0VG91Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlRW5kKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlRHggPSAocmV2ZXJzZSkgPyAtZHggOiBkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICh1cGRhdGVEeCA+IDApID8gc2xpZGVyLmdldFRhcmdldCgnbmV4dCcpIDogc2xpZGVyLmdldFRhcmdldCgncHJldicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmFkZSkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5jdXJyZW50U2xpZGUsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGFjY0R4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBzbGlkZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjYXJvdXNlbCkgeyAvL0NBUk9VU0VMOlxuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoc2xpZGVyLnBhZ2luZ0NvdW50KTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbCkgeyAvL1ZFUlRJQ0FMOlxuICAgICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChzbGlkZXIuaCk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyLmgsIFwic2V0VG90YWxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodCgpO1xuICAgICAgICAgICAgc2xpZGVyLm5ld1NsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXIuY29tcHV0ZWRXLCBcInNldFRvdGFsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNtb290aEhlaWdodDogZnVuY3Rpb24oZHVyKSB7XG4gICAgICAgIGlmICghdmVydGljYWwgfHwgZmFkZSkge1xuICAgICAgICAgIHZhciAkb2JqID0gKGZhZGUpID8gc2xpZGVyIDogc2xpZGVyLnZpZXdwb3J0O1xuICAgICAgICAgIChkdXIpID8gJG9iai5hbmltYXRlKHtcImhlaWdodFwiOiBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5hbmltYXRpbmdUbykuaGVpZ2h0KCl9LCBkdXIpIDogJG9iai5oZWlnaHQoc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuYW5pbWF0aW5nVG8pLmhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN5bmM6IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICAgICB2YXIgJG9iaiA9ICQoc2xpZGVyLnZhcnMuc3luYykuZGF0YShcImZsZXhzbGlkZXJcIiksXG4gICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiYW5pbWF0ZVwiOiAkb2JqLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgZmFsc2UsIHRydWUpOyBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGxheVwiOiBpZiAoISRvYmoucGxheWluZyAmJiAhJG9iai5hc05hdikgeyAkb2JqLnBsYXkoKTsgfSBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGF1c2VcIjogJG9iai5wYXVzZSgpOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVuaXF1ZUlEOiBmdW5jdGlvbigkY2xvbmUpIHtcbiAgICAgICAgLy8gQXBwZW5kIF9jbG9uZSB0byBjdXJyZW50IGxldmVsIGFuZCBjaGlsZHJlbiBlbGVtZW50cyB3aXRoIGlkIGF0dHJpYnV0ZXNcbiAgICAgICAgJGNsb25lLmZpbHRlciggJ1tpZF0nICkuYWRkKCRjbG9uZS5maW5kKCAnW2lkXScgKSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICR0aGlzLmF0dHIoICdpZCcsICR0aGlzLmF0dHIoICdpZCcgKSArICdfY2xvbmUnICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJGNsb25lO1xuICAgICAgfSxcbiAgICAgIHBhdXNlSW52aXNpYmxlOiB7XG4gICAgICAgIHZpc1Byb3A6IG51bGwsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcmVmaXhlcyA9IFsnd2Via2l0JywnbW96JywnbXMnLCdvJ107XG5cbiAgICAgICAgICBpZiAoJ2hpZGRlbicgaW4gZG9jdW1lbnQpIHJldHVybiAnaGlkZGVuJztcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKHByZWZpeGVzW2ldICsgJ0hpZGRlbicpIGluIGRvY3VtZW50KVxuICAgICAgICAgICAgbWV0aG9kcy5wYXVzZUludmlzaWJsZS52aXNQcm9wID0gcHJlZml4ZXNbaV0gKyAnSGlkZGVuJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUudmlzUHJvcCkge1xuICAgICAgICAgICAgdmFyIGV2dG5hbWUgPSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3AucmVwbGFjZSgvW0h8aF1pZGRlbi8sJycpICsgJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRuYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUuaXNIaWRkZW4oKSkge1xuICAgICAgICAgICAgICAgIGlmKHNsaWRlci5zdGFydFRpbWVvdXQpIGNsZWFyVGltZW91dChzbGlkZXIuc3RhcnRUaW1lb3V0KTsgLy9JZiBjbG9jayBpcyB0aWNraW5nLCBzdG9wIHRpbWVyIGFuZCBwcmV2ZW50IGZyb20gc3RhcnRpbmcgd2hpbGUgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgZWxzZSBzbGlkZXIucGF1c2UoKTsgLy9PciBqdXN0IHBhdXNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoc2xpZGVyLnN0YXJ0ZWQpIHNsaWRlci5wbGF5KCk7IC8vSW5pdGlhdGVkIGJlZm9yZSwganVzdCBwbGF5XG4gICAgICAgICAgICAgICAgZWxzZSAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzZXRUaW1lb3V0KHNsaWRlci5wbGF5LCBzbGlkZXIudmFycy5pbml0RGVsYXkpIDogc2xpZGVyLnBsYXkoKTsgLy9EaWRuJ3QgaW5pdCBiZWZvcmU6IHNpbXBseSBpbml0IG9yIHdhaXQgZm9yIGl0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNIaWRkZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudFttZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3BdIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0VG9DbGVhcldhdGNoZWRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh3YXRjaGVkRXZlbnRDbGVhclRpbWVyKTtcbiAgICAgICAgd2F0Y2hlZEV2ZW50Q2xlYXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gXCJcIjtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgc2xpZGVyLmZsZXhBbmltYXRlID0gZnVuY3Rpb24odGFyZ2V0LCBwYXVzZSwgb3ZlcnJpZGUsIHdpdGhTeW5jLCBmcm9tTmF2KSB7XG4gICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3AgJiYgdGFyZ2V0ICE9PSBzbGlkZXIuY3VycmVudFNsaWRlKSB7XG4gICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXNOYXYgJiYgc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuXG4gICAgICBpZiAoIXNsaWRlci5hbmltYXRpbmcgJiYgKHNsaWRlci5jYW5BZHZhbmNlKHRhcmdldCwgZnJvbU5hdikgfHwgb3ZlcnJpZGUpICYmIHNsaWRlci5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgIGlmIChhc05hdiAmJiB3aXRoU3luYykge1xuICAgICAgICAgIHZhciBtYXN0ZXIgPSAkKHNsaWRlci52YXJzLmFzTmF2Rm9yKS5kYXRhKCdmbGV4c2xpZGVyJyk7XG4gICAgICAgICAgc2xpZGVyLmF0RW5kID0gdGFyZ2V0ID09PSAwIHx8IHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgICAgICBtYXN0ZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZnJvbU5hdik7XG4gICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICBtYXN0ZXIuZGlyZWN0aW9uID0gc2xpZGVyLmRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmIChNYXRoLmNlaWwoKHRhcmdldCArIDEpL3NsaWRlci52aXNpYmxlKSAtIDEgIT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgdGFyZ2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudEl0ZW0gPSB0YXJnZXQ7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgICB0YXJnZXQgPSBNYXRoLmZsb29yKHRhcmdldC9zbGlkZXIudmlzaWJsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50SXRlbSA9IHRhcmdldDtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIikuZXEodGFyZ2V0KS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gdGFyZ2V0O1xuXG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgaWYgKHBhdXNlKSBzbGlkZXIucGF1c2UoKTtcblxuICAgICAgICAvLyBBUEk6IGJlZm9yZSgpIGFuaW1hdGlvbiBDYWxsYmFja1xuICAgICAgICBzbGlkZXIudmFycy5iZWZvcmUoc2xpZGVyKTtcblxuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMgJiYgIWZyb21OYXYpIG1ldGhvZHMuc3luYyhcImFuaW1hdGVcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdikgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgIC8vICFDQVJPVVNFTDpcbiAgICAgICAgLy8gQ0FORElEQVRFOiBzbGlkZSBhY3RpdmUgY2xhc3MgKGZvciBhZGQvcmVtb3ZlIHNsaWRlKVxuICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKS5lcSh0YXJnZXQpLmFkZENsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKTtcblxuICAgICAgICAvLyBJTkZJTklURSBMT09QOlxuICAgICAgICAvLyBDQU5ESURBVEU6IGF0RW5kXG4gICAgICAgIHNsaWRlci5hdEVuZCA9IHRhcmdldCA9PT0gMCB8fCB0YXJnZXQgPT09IHNsaWRlci5sYXN0O1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYudXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKHRhcmdldCA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAvLyBBUEk6IGVuZCgpIG9mIGN5Y2xlIENhbGxiYWNrXG4gICAgICAgICAgc2xpZGVyLnZhcnMuZW5kKHNsaWRlcik7XG4gICAgICAgICAgLy8gU0xJREVTSE9XICYmICFJTkZJTklURSBMT09QOlxuICAgICAgICAgIGlmICghc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlKSB7XG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuc2xpZGVzLmZpbHRlcignOmZpcnN0JykuaGVpZ2h0KCkgOiBzbGlkZXIuY29tcHV0ZWRXLFxuICAgICAgICAgICAgICBtYXJnaW4sIHNsaWRlU3RyaW5nLCBjYWxjTmV4dDtcblxuICAgICAgICAgIC8vIElORklOSVRFIExPT1AgLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgICAgLy9tYXJnaW4gPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbiAqIDIgOiBzbGlkZXIudmFycy5pdGVtTWFyZ2luO1xuICAgICAgICAgICAgbWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbjtcbiAgICAgICAgICAgIGNhbGNOZXh0ID0gKChzbGlkZXIuaXRlbVcgKyBtYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAoY2FsY05leHQgPiBzbGlkZXIubGltaXQgJiYgc2xpZGVyLnZpc2libGUgIT09IDEpID8gc2xpZGVyLmxpbWl0IDogY2FsY05leHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogZGltZW5zaW9uIDogMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHRhcmdldCA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwicHJldlwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IDAgOiAoc2xpZGVyLmNvdW50ICsgMSkgKiBkaW1lbnNpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlU3RyaW5nID0gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHRhcmdldCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb24gOiAodGFyZ2V0ICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGRpbWVuc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlU3RyaW5nLCBcIlwiLCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wIHx8ICFzbGlkZXIuYXRFbmQpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVbmJpbmQgcHJldmlvdXMgdHJhbnNpdGlvbkVuZCBldmVudHMgYW5kIHJlLWJpbmQgbmV3IHRyYW5zaXRpb25FbmQgZXZlbnRcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgIHNsaWRlci53cmFwdXAoZGltZW5zaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJbnN1cmFuY2UgZm9yIHRoZSBldmVyLXNvLWZpY2tsZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICBzbGlkZXIuZW5zdXJlQW5pbWF0aW9uRW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQgKyAxMDApO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYW5pbWF0ZShzbGlkZXIuYXJncywgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBGQURFOlxuICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgIC8vc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5mYWRlT3V0KHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcpO1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuZmFkZUluKHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcsIHNsaWRlci53cmFwdXApO1xuXG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMX0pLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nLCBzbGlkZXIud3JhcHVwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcInpJbmRleFwiOiAxIH0pO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcSh0YXJnZXQpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyIH0pO1xuICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodChzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzbGlkZXIud3JhcHVwID0gZnVuY3Rpb24oZGltZW5zaW9uKSB7XG4gICAgICAvLyBTTElERTpcbiAgICAgIGlmICghZmFkZSAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wRW5kXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHNsaWRlci5hbmltYXRpbmdUbyA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wU3RhcnRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAvLyBBUEk6IGFmdGVyKCkgYW5pbWF0aW9uIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5hZnRlcihzbGlkZXIpO1xuICAgIH07XG5cbiAgICAvLyBTTElERVNIT1c6XG4gICAgc2xpZGVyLmFuaW1hdGVTbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBmb2N1c2VkICkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5nZXRUYXJnZXQoXCJuZXh0XCIpKTtcbiAgICB9O1xuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IG51bGw7XG4gICAgICBzbGlkZXIucGxheWluZyA9IGZhbHNlO1xuICAgICAgLy8gUEFVU0VQTEFZOlxuICAgICAgaWYgKHNsaWRlci52YXJzLnBhdXNlUGxheSkgbWV0aG9kcy5wYXVzZVBsYXkudXBkYXRlKFwicGxheVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBhdXNlXCIpO1xuICAgIH07XG4gICAgLy8gU0xJREVTSE9XOlxuICAgIHNsaWRlci5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2xpZGVyLnBsYXlpbmcpIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IHNsaWRlci5hbmltYXRlZFNsaWRlcyB8fCBzZXRJbnRlcnZhbChzbGlkZXIuYW5pbWF0ZVNsaWRlcywgc2xpZGVyLnZhcnMuc2xpZGVzaG93U3BlZWQpO1xuICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBzbGlkZXIucGxheWluZyA9IHRydWU7XG4gICAgICAvLyBQQVVTRVBMQVk6XG4gICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoXCJwYXVzZVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBsYXlcIik7XG4gICAgfTtcbiAgICAvLyBTVE9QOlxuICAgIHNsaWRlci5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2xpZGVyLnBhdXNlKCk7XG4gICAgICBzbGlkZXIuc3RvcHBlZCA9IHRydWU7XG4gICAgfTtcbiAgICBzbGlkZXIuY2FuQWR2YW5jZSA9IGZ1bmN0aW9uKHRhcmdldCwgZnJvbU5hdikge1xuICAgICAgLy8gQVNOQVY6XG4gICAgICB2YXIgbGFzdCA9IChhc05hdikgPyBzbGlkZXIucGFnaW5nQ291bnQgLSAxIDogc2xpZGVyLmxhc3Q7XG4gICAgICByZXR1cm4gKGZyb21OYXYpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiB0YXJnZXQgPT09IDAgJiYgc2xpZGVyLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gMCAmJiB0YXJnZXQgPT09IHNsaWRlci5wYWdpbmdDb3VudCAtIDEgJiYgc2xpZGVyLmRpcmVjdGlvbiAhPT0gXCJuZXh0XCIpID8gZmFsc2UgOlxuICAgICAgICAgICAgICh0YXJnZXQgPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIWFzTmF2KSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgPyB0cnVlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgdGFyZ2V0ID09PSBsYXN0ICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IGxhc3QgJiYgdGFyZ2V0ID09PSAwICYmIHNsaWRlci5kaXJlY3Rpb24gPT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICB0cnVlO1xuICAgIH07XG4gICAgc2xpZGVyLmdldFRhcmdldCA9IGZ1bmN0aW9uKGRpcikge1xuICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IGRpcjtcbiAgICAgIGlmIChkaXIgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIHJldHVybiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpID8gMCA6IHNsaWRlci5jdXJyZW50U2xpZGUgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwKSA/IHNsaWRlci5sYXN0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSAtIDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNMSURFOlxuICAgIHNsaWRlci5zZXRQcm9wcyA9IGZ1bmN0aW9uKHBvcywgc3BlY2lhbCwgZHVyKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zQ2hlY2sgPSAocG9zKSA/IHBvcyA6ICgoc2xpZGVyLml0ZW1XICsgc2xpZGVyLnZhcnMuaXRlbU1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuYW5pbWF0aW5nVG8sXG4gICAgICAgICAgICBwb3NDYWxjID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNwZWNpYWwgPT09IFwic2V0VG91Y2hcIikgPyBwb3MgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOiBwb3NDaGVjaztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNwZWNpYWwpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRUb3RhbFwiOiByZXR1cm4gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zIDogKHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFRvdWNoXCI6IHJldHVybiAocmV2ZXJzZSkgPyBwb3MgOiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwianVtcEVuZFwiOiByZXR1cm4gKHJldmVyc2UpID8gcG9zIDogc2xpZGVyLmNvdW50ICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bXBTdGFydFwiOiByZXR1cm4gKHJldmVyc2UpID8gc2xpZGVyLmNvdW50ICogcG9zIDogcG9zO1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocG9zQ2FsYyAqIC0xKSArIFwicHhcIjtcbiAgICAgICAgICB9KCkpO1xuXG4gICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIHRhcmdldCA9ICh2ZXJ0aWNhbCkgPyBcInRyYW5zbGF0ZTNkKDAsXCIgKyB0YXJnZXQgKyBcIiwwKVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHRhcmdldCArIFwiLDAsMClcIjtcbiAgICAgICAgZHVyID0gKGR1ciAhPT0gdW5kZWZpbmVkKSA/IChkdXIvMTAwMCkgKyBcInNcIiA6IFwiMHNcIjtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNpdGlvbi1kdXJhdGlvblwiLCBkdXIpO1xuICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIGR1cik7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlci5hcmdzW3NsaWRlci5wcm9wXSA9IHRhcmdldDtcbiAgICAgIGlmIChzbGlkZXIudHJhbnNpdGlvbnMgfHwgZHVyID09PSB1bmRlZmluZWQpIHNsaWRlci5jb250YWluZXIuY3NzKHNsaWRlci5hcmdzKTtcblxuICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsdGFyZ2V0KTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLnNldHVwID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgLy8gU0xJREU6XG4gICAgICBpZiAoIWZhZGUpIHtcbiAgICAgICAgdmFyIHNsaWRlck9mZnNldCwgYXJyO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImluaXRcIikge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ZpZXdwb3J0XCI+PC9kaXY+JykuY3NzKHtcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwifSkuYXBwZW5kVG8oc2xpZGVyKS5hcHBlbmQoc2xpZGVyLmNvbnRhaW5lcik7XG4gICAgICAgICAgLy8gSU5GSU5JVEUgTE9PUDpcbiAgICAgICAgICBzbGlkZXIuY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgc2xpZGVyLmNsb25lT2Zmc2V0ID0gMDtcbiAgICAgICAgICAvLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICBhcnIgPSAkLm1ha2VBcnJheShzbGlkZXIuc2xpZGVzKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzID0gJChhcnIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSU5GSU5JVEUgTE9PUCAmJiAhQ0FST1VTRUw6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmICFjYXJvdXNlbCkge1xuICAgICAgICAgIHNsaWRlci5jbG9uZUNvdW50ID0gMjtcbiAgICAgICAgICBzbGlkZXIuY2xvbmVPZmZzZXQgPSAxO1xuICAgICAgICAgIC8vIGNsZWFyIG91dCBvbGQgY2xvbmVzXG4gICAgICAgICAgaWYgKHR5cGUgIT09IFwiaW5pdFwiKSBzbGlkZXIuY29udGFpbmVyLmZpbmQoJy5jbG9uZScpLnJlbW92ZSgpO1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYXBwZW5kKG1ldGhvZHMudW5pcXVlSUQoc2xpZGVyLnNsaWRlcy5maXJzdCgpLmNsb25lKCkuYWRkQ2xhc3MoJ2Nsb25lJykpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnByZXBlbmQobWV0aG9kcy51bmlxdWVJRChzbGlkZXIuc2xpZGVzLmxhc3QoKS5jbG9uZSgpLmFkZENsYXNzKCdjbG9uZScpKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5uZXdTbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuXG4gICAgICAgIHNsaWRlck9mZnNldCA9IChyZXZlcnNlKSA/IHNsaWRlci5jb3VudCAtIDEgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldDtcbiAgICAgICAgLy8gVkVSVElDQUw6XG4gICAgICAgIGlmICh2ZXJ0aWNhbCAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLmhlaWdodCgoc2xpZGVyLmNvdW50ICsgc2xpZGVyLmNsb25lQ291bnQpICogMjAwICsgXCIlXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIikud2lkdGgoXCIxMDAlXCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRlci5uZXdTbGlkZXMuY3NzKHtcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaGVpZ2h0KHNsaWRlci5oKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXJPZmZzZXQgKiBzbGlkZXIuaCwgXCJpbml0XCIpO1xuICAgICAgICAgIH0sICh0eXBlID09PSBcImluaXRcIikgPyAxMDAgOiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLndpZHRoKChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVDb3VudCkgKiAyMDAgKyBcIiVcIik7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlck9mZnNldCAqIHNsaWRlci5jb21wdXRlZFcsIFwiaW5pdFwiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIubmV3U2xpZGVzLmNzcyh7XCJ3aWR0aFwiOiBzbGlkZXIuY29tcHV0ZWRXLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICAgICAgaWYgKHNsaWRlci52YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICB9LCAodHlwZSA9PT0gXCJpbml0XCIpID8gMTAwIDogMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIEZBREU6XG4gICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHtcIndpZHRoXCI6IFwiMTAwJVwiLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcIm1hcmdpblJpZ2h0XCI6IFwiLTEwMCVcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJ9KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW5pdFwiKSB7XG4gICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmZhZGVJbihzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nKTtcbiAgICAgICAgICAgIGlmIChzbGlkZXIudmFycy5mYWRlRmlyc3RTbGlkZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcImRpc3BsYXlcIjogXCJibG9ja1wiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMn0pLmNzcyh7XCJvcGFjaXR5XCI6IDF9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwiekluZGV4XCI6IDEgfSkuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwid2Via2l0VHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgXCIgKyBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCAvIDEwMDAgKyBcInMgZWFzZVwiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgICAvLyAhQ0FST1VTRUw6XG4gICAgICAvLyBDQU5ESURBVEU6IGFjdGl2ZSBzbGlkZVxuICAgICAgaWYgKCFjYXJvdXNlbCkgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcblxuICAgICAgLy9GbGV4U2xpZGVyOiBpbml0KCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmluaXQoc2xpZGVyKTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLmRvTWF0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNsaWRlID0gc2xpZGVyLnNsaWRlcy5maXJzdCgpLFxuICAgICAgICAgIHNsaWRlTWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbixcbiAgICAgICAgICBtaW5JdGVtcyA9IHNsaWRlci52YXJzLm1pbkl0ZW1zLFxuICAgICAgICAgIG1heEl0ZW1zID0gc2xpZGVyLnZhcnMubWF4SXRlbXM7XG5cbiAgICAgIHNsaWRlci53ID0gKHNsaWRlci52aWV3cG9ydD09PXVuZGVmaW5lZCkgPyBzbGlkZXIud2lkdGgoKSA6IHNsaWRlci52aWV3cG9ydC53aWR0aCgpO1xuICAgICAgc2xpZGVyLmggPSBzbGlkZS5oZWlnaHQoKTtcbiAgICAgIHNsaWRlci5ib3hQYWRkaW5nID0gc2xpZGUub3V0ZXJXaWR0aCgpIC0gc2xpZGUud2lkdGgoKTtcblxuICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgc2xpZGVyLml0ZW1UID0gc2xpZGVyLnZhcnMuaXRlbVdpZHRoICsgc2xpZGVNYXJnaW47XG4gICAgICAgIHNsaWRlci5taW5XID0gKG1pbkl0ZW1zKSA/IG1pbkl0ZW1zICogc2xpZGVyLml0ZW1UIDogc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5tYXhXID0gKG1heEl0ZW1zKSA/IChtYXhJdGVtcyAqIHNsaWRlci5pdGVtVCkgLSBzbGlkZU1hcmdpbiA6IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIuaXRlbVcgPSAoc2xpZGVyLm1pblcgPiBzbGlkZXIudykgPyAoc2xpZGVyLncgLSAoc2xpZGVNYXJnaW4gKiAobWluSXRlbXMgLSAxKSkpL21pbkl0ZW1zIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlci5tYXhXIDwgc2xpZGVyLncpID8gKHNsaWRlci53IC0gKHNsaWRlTWFyZ2luICogKG1heEl0ZW1zIC0gMSkpKS9tYXhJdGVtcyA6XG4gICAgICAgICAgICAgICAgICAgICAgIChzbGlkZXIudmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyBzbGlkZXIudyA6IHNsaWRlci52YXJzLml0ZW1XaWR0aDtcblxuICAgICAgICBzbGlkZXIudmlzaWJsZSA9IE1hdGguZmxvb3Ioc2xpZGVyLncvKHNsaWRlci5pdGVtVykpO1xuICAgICAgICBzbGlkZXIubW92ZSA9IChzbGlkZXIudmFycy5tb3ZlID4gMCAmJiBzbGlkZXIudmFycy5tb3ZlIDwgc2xpZGVyLnZpc2libGUgKSA/IHNsaWRlci52YXJzLm1vdmUgOiBzbGlkZXIudmlzaWJsZTtcbiAgICAgICAgc2xpZGVyLnBhZ2luZ0NvdW50ID0gTWF0aC5jZWlsKCgoc2xpZGVyLmNvdW50IC0gc2xpZGVyLnZpc2libGUpL3NsaWRlci5tb3ZlKSArIDEpO1xuICAgICAgICBzbGlkZXIubGFzdCA9ICBzbGlkZXIucGFnaW5nQ291bnQgLSAxO1xuICAgICAgICBzbGlkZXIubGltaXQgPSAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gKHNsaWRlci5pdGVtVyAqIChzbGlkZXIuY291bnQgLSAxKSkgKyAoc2xpZGVNYXJnaW4gKiAoc2xpZGVyLmNvdW50IC0gMSkpIDogKChzbGlkZXIuaXRlbVcgKyBzbGlkZU1hcmdpbikgKiBzbGlkZXIuY291bnQpIC0gc2xpZGVyLncgLSBzbGlkZU1hcmdpbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5pdGVtVyA9IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIucGFnaW5nQ291bnQgPSBzbGlkZXIuY291bnQ7XG4gICAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNsaWRlci5jb21wdXRlZFcgPSBzbGlkZXIuaXRlbVcgLSBzbGlkZXIuYm94UGFkZGluZztcbiAgICB9O1xuXG4gICAgc2xpZGVyLnVwZGF0ZSA9IGZ1bmN0aW9uKHBvcywgYWN0aW9uKSB7XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUgYW5kIHNsaWRlci5hbmltYXRpbmdUbyBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHBvcyA8IHNsaWRlci5jdXJyZW50U2xpZGUpIHtcbiAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zIDw9IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgcG9zICE9PSAwKSB7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IHNsaWRlci5jdXJyZW50U2xpZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjb250cm9sTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiAhc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgIGlmICgoYWN0aW9uID09PSBcImFkZFwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50ID4gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnVwZGF0ZShcImFkZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICgoYWN0aW9uID09PSBcInJlbW92ZVwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50IDwgc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPiBzbGlkZXIubGFzdCkge1xuICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi51cGRhdGUoXCJyZW1vdmVcIiwgc2xpZGVyLmxhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgZGlyZWN0aW9uTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgIH07XG5cbiAgICBzbGlkZXIuYWRkU2xpZGUgPSBmdW5jdGlvbihvYmosIHBvcykge1xuICAgICAgdmFyICRvYmogPSAkKG9iaik7XG5cbiAgICAgIHNsaWRlci5jb3VudCArPSAxO1xuICAgICAgc2xpZGVyLmxhc3QgPSBzbGlkZXIuY291bnQgLSAxO1xuXG4gICAgICAvLyBhcHBlbmQgbmV3IHNsaWRlXG4gICAgICBpZiAodmVydGljYWwgJiYgcmV2ZXJzZSkge1xuICAgICAgICAocG9zICE9PSB1bmRlZmluZWQpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY291bnQgLSBwb3MpLmFmdGVyKCRvYmopIDogc2xpZGVyLmNvbnRhaW5lci5wcmVwZW5kKCRvYmopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHBvcyAhPT0gdW5kZWZpbmVkKSA/IHNsaWRlci5zbGlkZXMuZXEocG9zKS5iZWZvcmUoJG9iaikgOiBzbGlkZXIuY29udGFpbmVyLmFwcGVuZCgkb2JqKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRTbGlkZSwgYW5pbWF0aW5nVG8sIGNvbnRyb2xOYXYsIGFuZCBkaXJlY3Rpb25OYXZcbiAgICAgIHNsaWRlci51cGRhdGUocG9zLCBcImFkZFwiKTtcblxuICAgICAgLy8gdXBkYXRlIHNsaWRlci5zbGlkZXNcbiAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yICsgJzpub3QoLmNsb25lKScsIHNsaWRlcik7XG4gICAgICAvLyByZS1zZXR1cCB0aGUgc2xpZGVyIHRvIGFjY29tZGF0ZSBuZXcgc2xpZGVcbiAgICAgIHNsaWRlci5zZXR1cCgpO1xuXG4gICAgICAvL0ZsZXhTbGlkZXI6IGFkZGVkKCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmFkZGVkKHNsaWRlcik7XG4gICAgfTtcbiAgICBzbGlkZXIucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBwb3MgPSAoaXNOYU4ob2JqKSkgPyBzbGlkZXIuc2xpZGVzLmluZGV4KCQob2JqKSkgOiBvYmo7XG5cbiAgICAgIC8vIHVwZGF0ZSBjb3VudFxuICAgICAgc2xpZGVyLmNvdW50IC09IDE7XG4gICAgICBzbGlkZXIubGFzdCA9IHNsaWRlci5jb3VudCAtIDE7XG5cbiAgICAgIC8vIHJlbW92ZSBzbGlkZVxuICAgICAgaWYgKGlzTmFOKG9iaikpIHtcbiAgICAgICAgJChvYmosIHNsaWRlci5zbGlkZXMpLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHZlcnRpY2FsICYmIHJldmVyc2UpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIubGFzdCkucmVtb3ZlKCkgOiBzbGlkZXIuc2xpZGVzLmVxKG9iaikucmVtb3ZlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUsIGFuaW1hdGluZ1RvLCBjb250cm9sTmF2LCBhbmQgZGlyZWN0aW9uTmF2XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICBzbGlkZXIudXBkYXRlKHBvcywgXCJyZW1vdmVcIik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzbGlkZXIuc2xpZGVzXG4gICAgICBzbGlkZXIuc2xpZGVzID0gJChzbGlkZXIudmFycy5zZWxlY3RvciArICc6bm90KC5jbG9uZSknLCBzbGlkZXIpO1xuICAgICAgLy8gcmUtc2V0dXAgdGhlIHNsaWRlciB0byBhY2NvbWRhdGUgbmV3IHNsaWRlXG4gICAgICBzbGlkZXIuc2V0dXAoKTtcblxuICAgICAgLy8gRmxleFNsaWRlcjogcmVtb3ZlZCgpIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5yZW1vdmVkKHNsaWRlcik7XG4gICAgfTtcblxuICAgIC8vRmxleFNsaWRlcjogSW5pdGlhbGl6ZVxuICAgIG1ldGhvZHMuaW5pdCgpO1xuICB9O1xuXG4gIC8vIEVuc3VyZSB0aGUgc2xpZGVyIGlzbid0IGZvY3Vzc2VkIGlmIHRoZSB3aW5kb3cgbG9zZXMgZm9jdXMuXG4gICQoIHdpbmRvdyApLmJsdXIoIGZ1bmN0aW9uICggZSApIHtcbiAgICBmb2N1c2VkID0gZmFsc2U7XG4gIH0pLmZvY3VzKCBmdW5jdGlvbiAoIGUgKSB7XG4gICAgZm9jdXNlZCA9IHRydWU7XG4gIH0pO1xuXG4gIC8vRmxleFNsaWRlcjogRGVmYXVsdCBTZXR0aW5nc1xuICAkLmZsZXhzbGlkZXIuZGVmYXVsdHMgPSB7XG4gICAgbmFtZXNwYWNlOiBcImZsZXgtXCIsICAgICAgICAgICAgIC8ve05FV30gU3RyaW5nOiBQcmVmaXggc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBvZiBldmVyeSBlbGVtZW50IGdlbmVyYXRlZCBieSB0aGUgcGx1Z2luXG4gICAgc2VsZWN0b3I6IFwiLnNsaWRlcyA+IGxpXCIsICAgICAgIC8ve05FV30gU2VsZWN0b3I6IE11c3QgbWF0Y2ggYSBzaW1wbGUgcGF0dGVybi4gJ3tjb250YWluZXJ9ID4ge3NsaWRlfScgLS0gSWdub3JlIHBhdHRlcm4gYXQgeW91ciBvd24gcGVyaWxcbiAgICBhbmltYXRpb246IFwiZmFkZVwiLCAgICAgICAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB5b3VyIGFuaW1hdGlvbiB0eXBlLCBcImZhZGVcIiBvciBcInNsaWRlXCJcbiAgICBlYXNpbmc6IFwic3dpbmdcIiwgICAgICAgICAgICAgICAgLy97TkVXfSBTdHJpbmc6IERldGVybWluZXMgdGhlIGVhc2luZyBtZXRob2QgdXNlZCBpbiBqUXVlcnkgdHJhbnNpdGlvbnMuIGpRdWVyeSBlYXNpbmcgcGx1Z2luIGlzIHN1cHBvcnRlZCFcbiAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB0aGUgc2xpZGluZyBkaXJlY3Rpb24sIFwiaG9yaXpvbnRhbFwiIG9yIFwidmVydGljYWxcIlxuICAgIHJldmVyc2U6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy97TkVXfSBCb29sZWFuOiBSZXZlcnNlIHRoZSBhbmltYXRpb24gZGlyZWN0aW9uXG4gICAgYW5pbWF0aW9uTG9vcDogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFNob3VsZCB0aGUgYW5pbWF0aW9uIGxvb3A/IElmIGZhbHNlLCBkaXJlY3Rpb25OYXYgd2lsbCByZWNlaXZlZCBcImRpc2FibGVcIiBjbGFzc2VzIGF0IGVpdGhlciBlbmRcbiAgICBzbW9vdGhIZWlnaHQ6IGZhbHNlLCAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogQWxsb3cgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgdG8gYW5pbWF0ZSBzbW9vdGhseSBpbiBob3Jpem9udGFsIG1vZGVcbiAgICBzdGFydEF0OiAwLCAgICAgICAgICAgICAgICAgICAgIC8vSW50ZWdlcjogVGhlIHNsaWRlIHRoYXQgdGhlIHNsaWRlciBzaG91bGQgc3RhcnQgb24uIEFycmF5IG5vdGF0aW9uICgwID0gZmlyc3Qgc2xpZGUpXG4gICAgc2xpZGVzaG93OiB0cnVlLCAgICAgICAgICAgICAgICAvL0Jvb2xlYW46IEFuaW1hdGUgc2xpZGVyIGF1dG9tYXRpY2FsbHlcbiAgICBzbGlkZXNob3dTcGVlZDogNzAwMCwgICAgICAgICAgIC8vSW50ZWdlcjogU2V0IHRoZSBzcGVlZCBvZiB0aGUgc2xpZGVzaG93IGN5Y2xpbmcsIGluIG1pbGxpc2Vjb25kc1xuICAgIGFuaW1hdGlvblNwZWVkOiA2MDAsICAgICAgICAgICAgLy9JbnRlZ2VyOiBTZXQgdGhlIHNwZWVkIG9mIGFuaW1hdGlvbnMsIGluIG1pbGxpc2Vjb25kc1xuICAgIGluaXREZWxheTogMCwgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBTZXQgYW4gaW5pdGlhbGl6YXRpb24gZGVsYXksIGluIG1pbGxpc2Vjb25kc1xuICAgIHJhbmRvbWl6ZTogZmFsc2UsICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBSYW5kb21pemUgc2xpZGUgb3JkZXJcbiAgICBmYWRlRmlyc3RTbGlkZTogdHJ1ZSwgICAgICAgICAgIC8vQm9vbGVhbjogRmFkZSBpbiB0aGUgZmlyc3Qgc2xpZGUgd2hlbiBhbmltYXRpb24gdHlwZSBpcyBcImZhZGVcIlxuICAgIHRodW1iQ2FwdGlvbnM6IGZhbHNlLCAgICAgICAgICAgLy9Cb29sZWFuOiBXaGV0aGVyIG9yIG5vdCB0byBwdXQgY2FwdGlvbnMgb24gdGh1bWJuYWlscyB3aGVuIHVzaW5nIHRoZSBcInRodW1ibmFpbHNcIiBjb250cm9sTmF2LlxuXG4gICAgLy8gVXNhYmlsaXR5IGZlYXR1cmVzXG4gICAgcGF1c2VPbkFjdGlvbjogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiBpbnRlcmFjdGluZyB3aXRoIGNvbnRyb2wgZWxlbWVudHMsIGhpZ2hseSByZWNvbW1lbmRlZC5cbiAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLCAgICAgICAgICAgIC8vQm9vbGVhbjogUGF1c2UgdGhlIHNsaWRlc2hvdyB3aGVuIGhvdmVyaW5nIG92ZXIgc2xpZGVyLCB0aGVuIHJlc3VtZSB3aGVuIG5vIGxvbmdlciBob3ZlcmluZ1xuICAgIHBhdXNlSW52aXNpYmxlOiB0cnVlLCAgIFx0XHQvL3tORVd9IEJvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiB0YWIgaXMgaW52aXNpYmxlLCByZXN1bWUgd2hlbiB2aXNpYmxlLiBQcm92aWRlcyBiZXR0ZXIgVVgsIGxvd2VyIENQVSB1c2FnZS5cbiAgICB1c2VDU1M6IHRydWUsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogU2xpZGVyIHdpbGwgdXNlIENTUzMgdHJhbnNpdGlvbnMgaWYgYXZhaWxhYmxlXG4gICAgdG91Y2g6IHRydWUsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IEFsbG93IHRvdWNoIHN3aXBlIG5hdmlnYXRpb24gb2YgdGhlIHNsaWRlciBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbiAgICB2aWRlbzogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogSWYgdXNpbmcgdmlkZW8gaW4gdGhlIHNsaWRlciwgd2lsbCBwcmV2ZW50IENTUzMgM0QgVHJhbnNmb3JtcyB0byBhdm9pZCBncmFwaGljYWwgZ2xpdGNoZXNcblxuICAgIC8vIFByaW1hcnkgQ29udHJvbHNcbiAgICBjb250cm9sTmF2OiB0cnVlLCAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQ3JlYXRlIG5hdmlnYXRpb24gZm9yIHBhZ2luZyBjb250cm9sIG9mIGVhY2ggc2xpZGU/IE5vdGU6IExlYXZlIHRydWUgZm9yIG1hbnVhbENvbnRyb2xzIHVzYWdlXG4gICAgZGlyZWN0aW9uTmF2OiB0cnVlLCAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBuYXZpZ2F0aW9uIGZvciBwcmV2aW91cy9uZXh0IG5hdmlnYXRpb24/ICh0cnVlL2ZhbHNlKVxuICAgIHByZXZUZXh0OiBcIlByZXZpb3VzXCIsICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwcmV2aW91c1wiIGRpcmVjdGlvbk5hdiBpdGVtXG4gICAgbmV4dFRleHQ6IFwiTmV4dFwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcIm5leHRcIiBkaXJlY3Rpb25OYXYgaXRlbVxuXG4gICAgLy8gU2Vjb25kYXJ5IE5hdmlnYXRpb25cbiAgICBrZXlib2FyZDogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQWxsb3cgc2xpZGVyIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkIGxlZnQvcmlnaHQga2V5c1xuICAgIG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLCAgICAgICAgLy97TkVXfSBCb29sZWFuOiBBbGxvdyBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIGFmZmVjdCBtdWx0aXBsZSBzbGlkZXJzLiBEZWZhdWx0IGJlaGF2aW9yIGN1dHMgb3V0IGtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtb3JlIHRoYW4gb25lIHNsaWRlciBwcmVzZW50LlxuICAgIG1vdXNld2hlZWw6IGZhbHNlLCAgICAgICAgICAgICAgLy97VVBEQVRFRH0gQm9vbGVhbjogUmVxdWlyZXMganF1ZXJ5Lm1vdXNld2hlZWwuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFuZG9uYWFyb24vanF1ZXJ5LW1vdXNld2hlZWwpIC0gQWxsb3dzIHNsaWRlciBuYXZpZ2F0aW5nIHZpYSBtb3VzZXdoZWVsXG4gICAgcGF1c2VQbGF5OiBmYWxzZSwgICAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBwYXVzZS9wbGF5IGR5bmFtaWMgZWxlbWVudFxuICAgIHBhdXNlVGV4dDogXCJQYXVzZVwiLCAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwYXVzZVwiIHBhdXNlUGxheSBpdGVtXG4gICAgcGxheVRleHQ6IFwiUGxheVwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcInBsYXlcIiBwYXVzZVBsYXkgaXRlbVxuXG4gICAgLy8gU3BlY2lhbCBwcm9wZXJ0aWVzXG4gICAgY29udHJvbHNDb250YWluZXI6IFwiXCIsICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgd2hpY2ggY29udGFpbmVyIHRoZSBuYXZpZ2F0aW9uIGVsZW1lbnRzIHNob3VsZCBiZSBhcHBlbmRlZCB0b28uIERlZmF1bHQgY29udGFpbmVyIGlzIHRoZSBGbGV4U2xpZGVyIGVsZW1lbnQuIEV4YW1wbGUgdXNlIHdvdWxkIGJlICQoXCIuZmxleHNsaWRlci1jb250YWluZXJcIikuIFByb3BlcnR5IGlzIGlnbm9yZWQgaWYgZ2l2ZW4gZWxlbWVudCBpcyBub3QgZm91bmQuXG4gICAgbWFudWFsQ29udHJvbHM6IFwiXCIsICAgICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgY3VzdG9tIGNvbnRyb2wgbmF2aWdhdGlvbi4gRXhhbXBsZXMgd291bGQgYmUgJChcIi5mbGV4LWNvbnRyb2wtbmF2IGxpXCIpIG9yIFwiI3RhYnMtbmF2IGxpIGltZ1wiLCBldGMuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4geW91ciBjb250cm9sTmF2IHNob3VsZCBtYXRjaCB0aGUgbnVtYmVyIG9mIHNsaWRlcy90YWJzLlxuICAgIHN5bmM6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBNaXJyb3IgdGhlIGFjdGlvbnMgcGVyZm9ybWVkIG9uIHRoaXMgc2xpZGVyIHdpdGggYW5vdGhlciBzbGlkZXIuIFVzZSB3aXRoIGNhcmUuXG4gICAgYXNOYXZGb3I6IFwiXCIsICAgICAgICAgICAgICAgICAgIC8ve05FV30gU2VsZWN0b3I6IEludGVybmFsIHByb3BlcnR5IGV4cG9zZWQgZm9yIHR1cm5pbmcgdGhlIHNsaWRlciBpbnRvIGEgdGh1bWJuYWlsIG5hdmlnYXRpb24gZm9yIGFub3RoZXIgc2xpZGVyXG5cbiAgICAvLyBDYXJvdXNlbCBPcHRpb25zXG4gICAgaXRlbVdpZHRoOiAwLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IEJveC1tb2RlbCB3aWR0aCBvZiBpbmRpdmlkdWFsIGNhcm91c2VsIGl0ZW1zLCBpbmNsdWRpbmcgaG9yaXpvbnRhbCBib3JkZXJzIGFuZCBwYWRkaW5nLlxuICAgIGl0ZW1NYXJnaW46IDAsICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBNYXJnaW4gYmV0d2VlbiBjYXJvdXNlbCBpdGVtcy5cbiAgICBtaW5JdGVtczogMSwgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTWluaW11bSBudW1iZXIgb2YgY2Fyb3VzZWwgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZS4gSXRlbXMgd2lsbCByZXNpemUgZmx1aWRseSB3aGVuIGJlbG93IHRoaXMuXG4gICAgbWF4SXRlbXM6IDAsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE1heG1pbXVtIG51bWJlciBvZiBjYXJvdXNlbCBpdGVtcyB0aGF0IHNob3VsZCBiZSB2aXNpYmxlLiBJdGVtcyB3aWxsIHJlc2l6ZSBmbHVpZGx5IHdoZW4gYWJvdmUgdGhpcyBsaW1pdC5cbiAgICBtb3ZlOiAwLCAgICAgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTnVtYmVyIG9mIGNhcm91c2VsIGl0ZW1zIHRoYXQgc2hvdWxkIG1vdmUgb24gYW5pbWF0aW9uLiBJZiAwLCBzbGlkZXIgd2lsbCBtb3ZlIGFsbCB2aXNpYmxlIGl0ZW1zLlxuICAgIGFsbG93T25lU2xpZGU6IHRydWUsICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IFdoZXRoZXIgb3Igbm90IHRvIGFsbG93IGEgc2xpZGVyIGNvbXByaXNlZCBvZiBhIHNpbmdsZSBzbGlkZVxuXG4gICAgLy8gQ2FsbGJhY2sgQVBJXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgd2hlbiB0aGUgc2xpZGVyIGxvYWRzIHRoZSBmaXJzdCBzbGlkZVxuICAgIGJlZm9yZTogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFzeW5jaHJvbm91c2x5IHdpdGggZWFjaCBzbGlkZXIgYW5pbWF0aW9uXG4gICAgYWZ0ZXI6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgZWFjaCBzbGlkZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgIGVuZDogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIHdoZW4gdGhlIHNsaWRlciByZWFjaGVzIHRoZSBsYXN0IHNsaWRlIChhc3luY2hyb25vdXMpXG4gICAgYWRkZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL3tORVd9IENhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgYSBzbGlkZSBpcyBhZGRlZFxuICAgIHJlbW92ZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciBhIHNsaWRlIGlzIHJlbW92ZWRcbiAgICBpbml0OiBmdW5jdGlvbigpIHt9ICAgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciB0aGUgc2xpZGVyIGlzIGluaXRpYWxseSBzZXR1cFxuICB9O1xuXG4gIC8vRmxleFNsaWRlcjogUGx1Z2luIEZ1bmN0aW9uXG4gICQuZm4uZmxleHNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSBvcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RvciA9IChvcHRpb25zLnNlbGVjdG9yKSA/IG9wdGlvbnMuc2VsZWN0b3IgOiBcIi5zbGlkZXMgPiBsaVwiLFxuICAgICAgICAgICAgJHNsaWRlcyA9ICR0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXG4gICAgICBpZiAoICggJHNsaWRlcy5sZW5ndGggPT09IDEgJiYgb3B0aW9ucy5hbGxvd09uZVNsaWRlID09PSB0cnVlICkgfHwgJHNsaWRlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgJHNsaWRlcy5mYWRlSW4oNDAwKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5zdGFydCkgb3B0aW9ucy5zdGFydCgkdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuZGF0YSgnZmxleHNsaWRlcicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBuZXcgJC5mbGV4c2xpZGVyKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGVscGVyIHN0cmluZ3MgdG8gcXVpY2tseSBwZXJmb3JtIGZ1bmN0aW9ucyBvbiB0aGUgc2xpZGVyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcykuZGF0YSgnZmxleHNsaWRlcicpO1xuICAgICAgc3dpdGNoIChvcHRpb25zKSB7XG4gICAgICAgIGNhc2UgXCJwbGF5XCI6ICRzbGlkZXIucGxheSgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInBhdXNlXCI6ICRzbGlkZXIucGF1c2UoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdG9wXCI6ICRzbGlkZXIuc3RvcCgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIm5leHRcIjogJHNsaWRlci5mbGV4QW5pbWF0ZSgkc2xpZGVyLmdldFRhcmdldChcIm5leHRcIiksIHRydWUpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgY2FzZSBcInByZXZpb3VzXCI6ICRzbGlkZXIuZmxleEFuaW1hdGUoJHNsaWRlci5nZXRUYXJnZXQoXCJwcmV2XCIpLCB0cnVlKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIikgJHNsaWRlci5mbGV4QW5pbWF0ZShvcHRpb25zLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9