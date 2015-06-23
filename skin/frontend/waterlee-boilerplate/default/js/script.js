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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci5qcyIsImZvdW5kYXRpb24uanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiZm91bmRhdGlvbi5lcXVhbGl6ZXIuanMiLCJmb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsImZvdW5kYXRpb24ub3JiaXQuanMiLCJmb3VuZGF0aW9uLnRvcGJhci5qcyIsImpxdWVyeS5lbGV2YXRlem9vbS5qcyIsImpxdWVyeS5mbGV4c2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzkzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcnRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2p2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogTW9kZXJuaXpyIHYyLjguM1xuICogd3d3Lm1vZGVybml6ci5jb21cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhcnVrIEF0ZXMsIFBhdWwgSXJpc2gsIEFsZXggU2V4dG9uXG4gKiBBdmFpbGFibGUgdW5kZXIgdGhlIEJTRCBhbmQgTUlUIGxpY2Vuc2VzOiB3d3cubW9kZXJuaXpyLmNvbS9saWNlbnNlL1xuICovXG5cbi8qXG4gKiBNb2Rlcm5penIgdGVzdHMgd2hpY2ggbmF0aXZlIENTUzMgYW5kIEhUTUw1IGZlYXR1cmVzIGFyZSBhdmFpbGFibGUgaW5cbiAqIHRoZSBjdXJyZW50IFVBIGFuZCBtYWtlcyB0aGUgcmVzdWx0cyBhdmFpbGFibGUgdG8geW91IGluIHR3byB3YXlzOlxuICogYXMgcHJvcGVydGllcyBvbiBhIGdsb2JhbCBNb2Rlcm5penIgb2JqZWN0LCBhbmQgYXMgY2xhc3NlcyBvbiB0aGVcbiAqIDxodG1sPiBlbGVtZW50LiBUaGlzIGluZm9ybWF0aW9uIGFsbG93cyB5b3UgdG8gcHJvZ3Jlc3NpdmVseSBlbmhhbmNlXG4gKiB5b3VyIHBhZ2VzIHdpdGggYSBncmFudWxhciBsZXZlbCBvZiBjb250cm9sIG92ZXIgdGhlIGV4cGVyaWVuY2UuXG4gKlxuICogTW9kZXJuaXpyIGhhcyBhbiBvcHRpb25hbCAobm90IGluY2x1ZGVkKSBjb25kaXRpb25hbCByZXNvdXJjZSBsb2FkZXJcbiAqIGNhbGxlZCBNb2Rlcm5penIubG9hZCgpLCBiYXNlZCBvbiBZZXBub3BlLmpzICh5ZXBub3BlanMuY29tKS5cbiAqIFRvIGdldCBhIGJ1aWxkIHRoYXQgaW5jbHVkZXMgTW9kZXJuaXpyLmxvYWQoKSwgYXMgd2VsbCBhcyBjaG9vc2luZ1xuICogd2hpY2ggdGVzdHMgdG8gaW5jbHVkZSwgZ28gdG8gd3d3Lm1vZGVybml6ci5jb20vZG93bmxvYWQvXG4gKlxuICogQXV0aG9ycyAgICAgICAgRmFydWsgQXRlcywgUGF1bCBJcmlzaCwgQWxleCBTZXh0b25cbiAqIENvbnRyaWJ1dG9ycyAgIFJ5YW4gU2VkZG9uLCBCZW4gQWxtYW5cbiAqL1xuXG53aW5kb3cuTW9kZXJuaXpyID0gKGZ1bmN0aW9uKCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgICB2YXIgdmVyc2lvbiA9ICcyLjguMycsXG5cbiAgICBNb2Rlcm5penIgPSB7fSxcblxuICAgIC8qPj5jc3NjbGFzc2VzKi9cbiAgICAvLyBvcHRpb24gZm9yIGVuYWJsaW5nIHRoZSBIVE1MIGNsYXNzZXMgdG8gYmUgYWRkZWRcbiAgICBlbmFibGVDbGFzc2VzID0gdHJ1ZSxcbiAgICAvKj4+Y3NzY2xhc3NlcyovXG5cbiAgICBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG91ciBcIm1vZGVybml6clwiIGVsZW1lbnQgdGhhdCB3ZSBkbyBtb3N0IGZlYXR1cmUgdGVzdHMgb24uXG4gICAgICovXG4gICAgbW9kID0gJ21vZGVybml6cicsXG4gICAgbW9kRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobW9kKSxcbiAgICBtU3R5bGUgPSBtb2RFbGVtLnN0eWxlLFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBpbnB1dCBlbGVtZW50IGZvciB2YXJpb3VzIFdlYiBGb3JtcyBmZWF0dXJlIHRlc3RzLlxuICAgICAqL1xuICAgIGlucHV0RWxlbSAvKj4+aW5wdXRlbGVtKi8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpIC8qPj5pbnB1dGVsZW0qLyAsXG5cbiAgICAvKj4+c21pbGUqL1xuICAgIHNtaWxlID0gJzopJyxcbiAgICAvKj4+c21pbGUqL1xuXG4gICAgdG9TdHJpbmcgPSB7fS50b1N0cmluZyxcblxuICAgIC8vIFRPRE8gOjogbWFrZSB0aGUgcHJlZml4ZXMgbW9yZSBncmFudWxhclxuICAgIC8qPj5wcmVmaXhlcyovXG4gICAgLy8gTGlzdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gc2V0IGZvciBjc3MgdGVzdHMuIFNlZSB0aWNrZXQgIzIxXG4gICAgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKSxcbiAgICAvKj4+cHJlZml4ZXMqL1xuXG4gICAgLyo+PmRvbXByZWZpeGVzKi9cbiAgICAvLyBGb2xsb3dpbmcgc3BlYyBpcyB0byBleHBvc2UgdmVuZG9yLXNwZWNpZmljIHN0eWxlIHByb3BlcnRpZXMgYXM6XG4gICAgLy8gICBlbGVtLnN0eWxlLldlYmtpdEJvcmRlclJhZGl1c1xuICAgIC8vIGFuZCB0aGUgZm9sbG93aW5nIHdvdWxkIGJlIGluY29ycmVjdDpcbiAgICAvLyAgIGVsZW0uc3R5bGUud2Via2l0Qm9yZGVyUmFkaXVzXG5cbiAgICAvLyBXZWJraXQgZ2hvc3RzIHRoZWlyIHByb3BlcnRpZXMgaW4gbG93ZXJjYXNlIGJ1dCBPcGVyYSAmIE1veiBkbyBub3QuXG4gICAgLy8gTWljcm9zb2Z0IHVzZXMgYSBsb3dlcmNhc2UgYG1zYCBpbnN0ZWFkIG9mIHRoZSBjb3JyZWN0IGBNc2AgaW4gSUU4K1xuICAgIC8vICAgZXJpay5lYWUubmV0L2FyY2hpdmVzLzIwMDgvMDMvMTAvMjEuNDguMTAvXG5cbiAgICAvLyBNb3JlIGhlcmU6IGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvaXNzdWUvMjFcbiAgICBvbVByZWZpeGVzID0gJ1dlYmtpdCBNb3ogTyBtcycsXG5cbiAgICBjc3NvbVByZWZpeGVzID0gb21QcmVmaXhlcy5zcGxpdCgnICcpLFxuXG4gICAgZG9tUHJlZml4ZXMgPSBvbVByZWZpeGVzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJyAnKSxcbiAgICAvKj4+ZG9tcHJlZml4ZXMqL1xuXG4gICAgLyo+Pm5zKi9cbiAgICBucyA9IHsnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ30sXG4gICAgLyo+Pm5zKi9cblxuICAgIHRlc3RzID0ge30sXG4gICAgaW5wdXRzID0ge30sXG4gICAgYXR0cnMgPSB7fSxcblxuICAgIGNsYXNzZXMgPSBbXSxcblxuICAgIHNsaWNlID0gY2xhc3Nlcy5zbGljZSxcblxuICAgIGZlYXR1cmVOYW1lLCAvLyB1c2VkIGluIHRlc3RpbmcgbG9vcFxuXG5cbiAgICAvKj4+dGVzdHN0eWxlcyovXG4gICAgLy8gSW5qZWN0IGVsZW1lbnQgd2l0aCBzdHlsZSBlbGVtZW50IGFuZCBzb21lIENTUyBydWxlc1xuICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzID0gZnVuY3Rpb24oIHJ1bGUsIGNhbGxiYWNrLCBub2RlcywgdGVzdG5hbWVzICkge1xuXG4gICAgICB2YXIgc3R5bGUsIHJldCwgbm9kZSwgZG9jT3ZlcmZsb3csXG4gICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgLy8gQWZ0ZXIgcGFnZSBsb2FkIGluamVjdGluZyBhIGZha2UgYm9keSBkb2Vzbid0IHdvcmsgc28gY2hlY2sgaWYgYm9keSBleGlzdHNcbiAgICAgICAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAvLyBJRTYgYW5kIDcgd29uJ3QgcmV0dXJuIG9mZnNldFdpZHRoIG9yIG9mZnNldEhlaWdodCB1bmxlc3MgaXQncyBpbiB0aGUgYm9keSBlbGVtZW50LCBzbyB3ZSBmYWtlIGl0LlxuICAgICAgICAgIGZha2VCb2R5ID0gYm9keSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG5cbiAgICAgIGlmICggcGFyc2VJbnQobm9kZXMsIDEwKSApIHtcbiAgICAgICAgICAvLyBJbiBvcmRlciBub3QgdG8gZ2l2ZSBmYWxzZSBwb3NpdGl2ZXMgd2UgY3JlYXRlIGEgbm9kZSBmb3IgZWFjaCB0ZXN0XG4gICAgICAgICAgLy8gVGhpcyBhbHNvIGFsbG93cyB0aGUgbWV0aG9kIHRvIHNjYWxlIGZvciB1bnNwZWNpZmllZCB1c2VzXG4gICAgICAgICAgd2hpbGUgKCBub2Rlcy0tICkge1xuICAgICAgICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgIG5vZGUuaWQgPSB0ZXN0bmFtZXMgPyB0ZXN0bmFtZXNbbm9kZXNdIDogbW9kICsgKG5vZGVzICsgMSk7XG4gICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIDxzdHlsZT4gZWxlbWVudHMgaW4gSUU2LTkgYXJlIGNvbnNpZGVyZWQgJ05vU2NvcGUnIGVsZW1lbnRzIGFuZCB0aGVyZWZvcmUgd2lsbCBiZSByZW1vdmVkXG4gICAgICAvLyB3aGVuIGluamVjdGVkIHdpdGggaW5uZXJIVE1MLiBUbyBnZXQgYXJvdW5kIHRoaXMgeW91IG5lZWQgdG8gcHJlcGVuZCB0aGUgJ05vU2NvcGUnIGVsZW1lbnRcbiAgICAgIC8vIHdpdGggYSAnc2NvcGVkJyBlbGVtZW50LCBpbiBvdXIgY2FzZSB0aGUgc29mdC1oeXBoZW4gZW50aXR5IGFzIGl0IHdvbid0IG1lc3Mgd2l0aCBvdXIgbWVhc3VyZW1lbnRzLlxuICAgICAgLy8gbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzM4OTclMjhWUy44NSUyOS5hc3B4XG4gICAgICAvLyBEb2N1bWVudHMgc2VydmVkIGFzIHhtbCB3aWxsIHRocm93IGlmIHVzaW5nICZzaHk7IHNvIHVzZSB4bWwgZnJpZW5kbHkgZW5jb2RlZCB2ZXJzaW9uLiBTZWUgaXNzdWUgIzI3N1xuICAgICAgc3R5bGUgPSBbJyYjMTczOycsJzxzdHlsZSBpZD1cInMnLCBtb2QsICdcIj4nLCBydWxlLCAnPC9zdHlsZT4nXS5qb2luKCcnKTtcbiAgICAgIGRpdi5pZCA9IG1vZDtcbiAgICAgIC8vIElFNiB3aWxsIGZhbHNlIHBvc2l0aXZlIG9uIHNvbWUgdGVzdHMgZHVlIHRvIHRoZSBzdHlsZSBlbGVtZW50IGluc2lkZSB0aGUgdGVzdCBkaXYgc29tZWhvdyBpbnRlcmZlcmluZyBvZmZzZXRIZWlnaHQsIHNvIGluc2VydCBpdCBpbnRvIGJvZHkgb3IgZmFrZWJvZHkuXG4gICAgICAvLyBPcGVyYSB3aWxsIGFjdCBhbGwgcXVpcmt5IHdoZW4gaW5qZWN0aW5nIGVsZW1lbnRzIGluIGRvY3VtZW50RWxlbWVudCB3aGVuIHBhZ2UgaXMgc2VydmVkIGFzIHhtbCwgbmVlZHMgZmFrZWJvZHkgdG9vLiAjMjcwXG4gICAgICAoYm9keSA/IGRpdiA6IGZha2VCb2R5KS5pbm5lckhUTUwgKz0gc3R5bGU7XG4gICAgICBmYWtlQm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgaWYgKCAhYm9keSApIHtcbiAgICAgICAgICAvL2F2b2lkIGNyYXNoaW5nIElFOCwgaWYgYmFja2dyb3VuZCBpbWFnZSBpcyB1c2VkXG4gICAgICAgICAgZmFrZUJvZHkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgICAgIC8vU2FmYXJpIDUuMTMvNS4xLjQgT1NYIHN0b3BzIGxvYWRpbmcgaWYgOjotd2Via2l0LXNjcm9sbGJhciBpcyB1c2VkIGFuZCBzY3JvbGxiYXJzIGFyZSB2aXNpYmxlXG4gICAgICAgICAgZmFrZUJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICBkb2NPdmVyZmxvdyA9IGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XG4gICAgICAgICAgZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIGRvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmFrZUJvZHkpO1xuICAgICAgfVxuXG4gICAgICByZXQgPSBjYWxsYmFjayhkaXYsIHJ1bGUpO1xuICAgICAgLy8gSWYgdGhpcyBpcyBkb25lIGFmdGVyIHBhZ2UgbG9hZCB3ZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGUgYm9keSBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgICAgaWYgKCAhYm9keSApIHtcbiAgICAgICAgICBmYWtlQm9keS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZha2VCb2R5KTtcbiAgICAgICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jT3ZlcmZsb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhIXJldDtcblxuICAgIH0sXG4gICAgLyo+PnRlc3RzdHlsZXMqL1xuXG4gICAgLyo+Pm1xKi9cbiAgICAvLyBhZGFwdGVkIGZyb20gbWF0Y2hNZWRpYSBwb2x5ZmlsbFxuICAgIC8vIGJ5IFNjb3R0IEplaGwgYW5kIFBhdWwgSXJpc2hcbiAgICAvLyBnaXN0LmdpdGh1Yi5jb20vNzg2NzY4XG4gICAgdGVzdE1lZGlhUXVlcnkgPSBmdW5jdGlvbiggbXEgKSB7XG5cbiAgICAgIHZhciBtYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEgfHwgd2luZG93Lm1zTWF0Y2hNZWRpYTtcbiAgICAgIGlmICggbWF0Y2hNZWRpYSApIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoTWVkaWEobXEpICYmIG1hdGNoTWVkaWEobXEpLm1hdGNoZXMgfHwgZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBib29sO1xuXG4gICAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcygnQG1lZGlhICcgKyBtcSArICcgeyAjJyArIG1vZCArICcgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfScsIGZ1bmN0aW9uKCBub2RlICkge1xuICAgICAgICBib29sID0gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID9cbiAgICAgICAgICAgICAgICAgIGdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbCkgOlxuICAgICAgICAgICAgICAgICAgbm9kZS5jdXJyZW50U3R5bGUpWydwb3NpdGlvbiddID09ICdhYnNvbHV0ZSc7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGJvb2w7XG5cbiAgICAgfSxcbiAgICAgLyo+Pm1xKi9cblxuXG4gICAgLyo+Pmhhc2V2ZW50Ki9cbiAgICAvL1xuICAgIC8vIGlzRXZlbnRTdXBwb3J0ZWQgZGV0ZXJtaW5lcyBpZiBhIGdpdmVuIGVsZW1lbnQgc3VwcG9ydHMgdGhlIGdpdmVuIGV2ZW50XG4gICAgLy8ga2FuZ2F4LmdpdGh1Yi5jb20vaXNldmVudHN1cHBvcnRlZC9cbiAgICAvL1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgcmVzdWx0cyBhcmUga25vd24gaW5jb3JyZWN0czpcbiAgICAvLyAgIE1vZGVybml6ci5oYXNFdmVudChcIndlYmtpdFRyYW5zaXRpb25FbmRcIiwgZWxlbSkgLy8gZmFsc2UgbmVnYXRpdmVcbiAgICAvLyAgIE1vZGVybml6ci5oYXNFdmVudChcInRleHRJbnB1dFwiKSAvLyBpbiBXZWJraXQuIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvMzMzXG4gICAgLy8gICAuLi5cbiAgICBpc0V2ZW50U3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgVEFHTkFNRVMgPSB7XG4gICAgICAgICdzZWxlY3QnOiAnaW5wdXQnLCAnY2hhbmdlJzogJ2lucHV0JyxcbiAgICAgICAgJ3N1Ym1pdCc6ICdmb3JtJywgJ3Jlc2V0JzogJ2Zvcm0nLFxuICAgICAgICAnZXJyb3InOiAnaW1nJywgJ2xvYWQnOiAnaW1nJywgJ2Fib3J0JzogJ2ltZydcbiAgICAgIH07XG5cbiAgICAgIGZ1bmN0aW9uIGlzRXZlbnRTdXBwb3J0ZWQoIGV2ZW50TmFtZSwgZWxlbWVudCApIHtcblxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFRBR05BTUVTW2V2ZW50TmFtZV0gfHwgJ2RpdicpO1xuICAgICAgICBldmVudE5hbWUgPSAnb24nICsgZXZlbnROYW1lO1xuXG4gICAgICAgIC8vIFdoZW4gdXNpbmcgYHNldEF0dHJpYnV0ZWAsIElFIHNraXBzIFwidW5sb2FkXCIsIFdlYktpdCBza2lwcyBcInVubG9hZFwiIGFuZCBcInJlc2l6ZVwiLCB3aGVyZWFzIGBpbmAgXCJjYXRjaGVzXCIgdGhvc2VcbiAgICAgICAgdmFyIGlzU3VwcG9ydGVkID0gZXZlbnROYW1lIGluIGVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKCAhaXNTdXBwb3J0ZWQgKSB7XG4gICAgICAgICAgLy8gSWYgaXQgaGFzIG5vIGBzZXRBdHRyaWJ1dGVgIChpLmUuIGRvZXNuJ3QgaW1wbGVtZW50IE5vZGUgaW50ZXJmYWNlKSwgdHJ5IGdlbmVyaWMgZWxlbWVudFxuICAgICAgICAgIGlmICggIWVsZW1lbnQuc2V0QXR0cmlidXRlICkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIGVsZW1lbnQuc2V0QXR0cmlidXRlICYmIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlICkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZXZlbnROYW1lLCAnJyk7XG4gICAgICAgICAgICBpc1N1cHBvcnRlZCA9IGlzKGVsZW1lbnRbZXZlbnROYW1lXSwgJ2Z1bmN0aW9uJyk7XG5cbiAgICAgICAgICAgIC8vIElmIHByb3BlcnR5IHdhcyBjcmVhdGVkLCBcInJlbW92ZSBpdFwiIChieSBzZXR0aW5nIHZhbHVlIHRvIGB1bmRlZmluZWRgKVxuICAgICAgICAgICAgaWYgKCAhaXMoZWxlbWVudFtldmVudE5hbWVdLCAndW5kZWZpbmVkJykgKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRbZXZlbnROYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGV2ZW50TmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiBpc1N1cHBvcnRlZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpc0V2ZW50U3VwcG9ydGVkO1xuICAgIH0pKCksXG4gICAgLyo+Pmhhc2V2ZW50Ki9cblxuICAgIC8vIFRPRE8gOjogQWRkIGZsYWcgZm9yIGhhc293bnByb3AgPyBkaWRuJ3QgbGFzdCB0aW1lXG5cbiAgICAvLyBoYXNPd25Qcm9wZXJ0eSBzaGltIGJ5IGthbmdheCBuZWVkZWQgZm9yIFNhZmFyaSAyLjAgc3VwcG9ydFxuICAgIF9oYXNPd25Qcm9wZXJ0eSA9ICh7fSkuaGFzT3duUHJvcGVydHksIGhhc093blByb3A7XG5cbiAgICBpZiAoICFpcyhfaGFzT3duUHJvcGVydHksICd1bmRlZmluZWQnKSAmJiAhaXMoX2hhc093blByb3BlcnR5LmNhbGwsICd1bmRlZmluZWQnKSApIHtcbiAgICAgIGhhc093blByb3AgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhhc093blByb3AgPSBmdW5jdGlvbiAob2JqZWN0LCBwcm9wZXJ0eSkgeyAvKiB5ZXMsIHRoaXMgY2FuIGdpdmUgZmFsc2UgcG9zaXRpdmVzL25lZ2F0aXZlcywgYnV0IG1vc3Qgb2YgdGhlIHRpbWUgd2UgZG9uJ3QgY2FyZSBhYm91dCB0aG9zZSAqL1xuICAgICAgICByZXR1cm4gKChwcm9wZXJ0eSBpbiBvYmplY3QpICYmIGlzKG9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGVbcHJvcGVydHldLCAndW5kZWZpbmVkJykpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBBZGFwdGVkIGZyb20gRVM1LXNoaW0gaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9lczUtc2hpbS9ibG9iL21hc3Rlci9lczUtc2hpbS5qc1xuICAgIC8vIGVzNS5naXRodWIuY29tLyN4MTUuMy40LjVcblxuICAgIGlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGJvdW5kID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG5cbiAgICAgICAgICAgICAgdmFyIEYgPSBmdW5jdGlvbigpe307XG4gICAgICAgICAgICAgIEYucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgdmFyIHNlbGYgPSBuZXcgRigpO1xuXG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICBzZWxmLFxuICAgICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGJvdW5kO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRDc3MgYXBwbGllcyBnaXZlbiBzdHlsZXMgdG8gdGhlIE1vZGVybml6ciBET00gbm9kZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRDc3MoIHN0ciApIHtcbiAgICAgICAgbVN0eWxlLmNzc1RleHQgPSBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0Q3NzQWxsIGV4dHJhcG9sYXRlcyBhbGwgdmVuZG9yLXNwZWNpZmljIGNzcyBzdHJpbmdzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENzc0FsbCggc3RyMSwgc3RyMiApIHtcbiAgICAgICAgcmV0dXJuIHNldENzcyhwcmVmaXhlcy5qb2luKHN0cjEgKyAnOycpICsgKCBzdHIyIHx8ICcnICkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzIHJldHVybnMgYSBib29sZWFuIGZvciBpZiB0eXBlb2Ygb2JqIGlzIGV4YWN0bHkgdHlwZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpcyggb2JqLCB0eXBlICkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb250YWlucyByZXR1cm5zIGEgYm9vbGVhbiBmb3IgaWYgc3Vic3RyIGlzIGZvdW5kIHdpdGhpbiBzdHIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29udGFpbnMoIHN0ciwgc3Vic3RyICkge1xuICAgICAgICByZXR1cm4gISF+KCcnICsgc3RyKS5pbmRleE9mKHN1YnN0cik7XG4gICAgfVxuXG4gICAgLyo+PnRlc3Rwcm9wKi9cblxuICAgIC8vIHRlc3RQcm9wcyBpcyBhIGdlbmVyaWMgQ1NTIC8gRE9NIHByb3BlcnR5IHRlc3QuXG5cbiAgICAvLyBJbiB0ZXN0aW5nIHN1cHBvcnQgZm9yIGEgZ2l2ZW4gQ1NTIHByb3BlcnR5LCBpdCdzIGxlZ2l0IHRvIHRlc3Q6XG4gICAgLy8gICAgYGVsZW0uc3R5bGVbc3R5bGVOYW1lXSAhPT0gdW5kZWZpbmVkYFxuICAgIC8vIElmIHRoZSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgaXQgd2lsbCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nLFxuICAgIC8vIGlmIHVuc3VwcG9ydGVkIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZC5cblxuICAgIC8vIFdlJ2xsIHRha2UgYWR2YW50YWdlIG9mIHRoaXMgcXVpY2sgdGVzdCBhbmQgc2tpcCBzZXR0aW5nIGEgc3R5bGVcbiAgICAvLyBvbiBvdXIgbW9kZXJuaXpyIGVsZW1lbnQsIGJ1dCBpbnN0ZWFkIGp1c3QgdGVzdGluZyB1bmRlZmluZWQgdnNcbiAgICAvLyBlbXB0eSBzdHJpbmcuXG5cbiAgICAvLyBCZWNhdXNlIHRoZSB0ZXN0aW5nIG9mIHRoZSBDU1MgcHJvcGVydHkgbmFtZXMgKHdpdGggXCItXCIsIGFzXG4gICAgLy8gb3Bwb3NlZCB0byB0aGUgY2FtZWxDYXNlIERPTSBwcm9wZXJ0aWVzKSBpcyBub24tcG9ydGFibGUgYW5kXG4gICAgLy8gbm9uLXN0YW5kYXJkIGJ1dCB3b3JrcyBpbiBXZWJLaXQgYW5kIElFIChidXQgbm90IEdlY2tvIG9yIE9wZXJhKSxcbiAgICAvLyB3ZSBleHBsaWNpdGx5IHJlamVjdCBwcm9wZXJ0aWVzIHdpdGggZGFzaGVzIHNvIHRoYXQgYXV0aG9yc1xuICAgIC8vIGRldmVsb3BpbmcgaW4gV2ViS2l0IG9yIElFIGZpcnN0IGRvbid0IGVuZCB1cCB3aXRoXG4gICAgLy8gYnJvd3Nlci1zcGVjaWZpYyBjb250ZW50IGJ5IGFjY2lkZW50LlxuXG4gICAgZnVuY3Rpb24gdGVzdFByb3BzKCBwcm9wcywgcHJlZml4ZWQgKSB7XG4gICAgICAgIGZvciAoIHZhciBpIGluIHByb3BzICkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgIGlmICggIWNvbnRhaW5zKHByb3AsIFwiLVwiKSAmJiBtU3R5bGVbcHJvcF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ZWQgPT0gJ3BmeCcgPyBwcm9wIDogdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qPj50ZXN0cHJvcCovXG5cbiAgICAvLyBUT0RPIDo6IGFkZCB0ZXN0RE9NUHJvcHNcbiAgICAvKipcbiAgICAgKiB0ZXN0RE9NUHJvcHMgaXMgYSBnZW5lcmljIERPTSBwcm9wZXJ0eSB0ZXN0OyBpZiBhIGJyb3dzZXIgc3VwcG9ydHNcbiAgICAgKiAgIGEgY2VydGFpbiBwcm9wZXJ0eSwgaXQgd29uJ3QgcmV0dXJuIHVuZGVmaW5lZCBmb3IgaXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGVzdERPTVByb3BzKCBwcm9wcywgb2JqLCBlbGVtICkge1xuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwcm9wcyApIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gb2JqW3Byb3BzW2ldXTtcbiAgICAgICAgICAgIGlmICggaXRlbSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByb3BlcnR5IG5hbWUgYXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gZmFsc2UpIHJldHVybiBwcm9wc1tpXTtcblxuICAgICAgICAgICAgICAgIC8vIGxldCdzIGJpbmQgYSBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGlmIChpcyhpdGVtLCAnZnVuY3Rpb24nKSl7XG4gICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIGF1dG9iaW5kIHVubGVzcyBvdmVycmlkZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYmluZChlbGVtIHx8IG9iaik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1bmJvdW5kIGZ1bmN0aW9uIG9yIG9iaiBvciB2YWx1ZVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKj4+dGVzdGFsbHByb3BzKi9cbiAgICAvKipcbiAgICAgKiB0ZXN0UHJvcHNBbGwgdGVzdHMgYSBsaXN0IG9mIERPTSBwcm9wZXJ0aWVzIHdlIHdhbnQgdG8gY2hlY2sgYWdhaW5zdC5cbiAgICAgKiAgIFdlIHNwZWNpZnkgbGl0ZXJhbGx5IEFMTCBwb3NzaWJsZSAoa25vd24gYW5kL29yIGxpa2VseSkgcHJvcGVydGllcyBvblxuICAgICAqICAgdGhlIGVsZW1lbnQgaW5jbHVkaW5nIHRoZSBub24tdmVuZG9yIHByZWZpeGVkIG9uZSwgZm9yIGZvcndhcmQtXG4gICAgICogICBjb21wYXRpYmlsaXR5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRlc3RQcm9wc0FsbCggcHJvcCwgcHJlZml4ZWQsIGVsZW0gKSB7XG5cbiAgICAgICAgdmFyIHVjUHJvcCAgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKSxcbiAgICAgICAgICAgIHByb3BzICAgPSAocHJvcCArICcgJyArIGNzc29tUHJlZml4ZXMuam9pbih1Y1Byb3AgKyAnICcpICsgdWNQcm9wKS5zcGxpdCgnICcpO1xuXG4gICAgICAgIC8vIGRpZCB0aGV5IGNhbGwgLnByZWZpeGVkKCdib3hTaXppbmcnKSBvciBhcmUgd2UganVzdCB0ZXN0aW5nIGEgcHJvcD9cbiAgICAgICAgaWYoaXMocHJlZml4ZWQsIFwic3RyaW5nXCIpIHx8IGlzKHByZWZpeGVkLCBcInVuZGVmaW5lZFwiKSkge1xuICAgICAgICAgIHJldHVybiB0ZXN0UHJvcHMocHJvcHMsIHByZWZpeGVkKTtcblxuICAgICAgICAvLyBvdGhlcndpc2UsIHRoZXkgY2FsbGVkIC5wcmVmaXhlZCgncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgd2luZG93WywgZWxlbV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHMgPSAocHJvcCArICcgJyArIChkb21QcmVmaXhlcykuam9pbih1Y1Byb3AgKyAnICcpICsgdWNQcm9wKS5zcGxpdCgnICcpO1xuICAgICAgICAgIHJldHVybiB0ZXN0RE9NUHJvcHMocHJvcHMsIHByZWZpeGVkLCBlbGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKj4+dGVzdGFsbHByb3BzKi9cblxuXG4gICAgLyoqXG4gICAgICogVGVzdHNcbiAgICAgKiAtLS0tLVxuICAgICAqL1xuXG4gICAgLy8gVGhlICpuZXcqIGZsZXhib3hcbiAgICAvLyBkZXYudzMub3JnL2Nzc3dnL2NzczMtZmxleGJveFxuXG4gICAgdGVzdHNbJ2ZsZXhib3gnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnZmxleFdyYXAnKTtcbiAgICB9O1xuXG4gICAgLy8gVGhlICpvbGQqIGZsZXhib3hcbiAgICAvLyB3d3cudzMub3JnL1RSLzIwMDkvV0QtY3NzMy1mbGV4Ym94LTIwMDkwNzIzL1xuXG4gICAgdGVzdHNbJ2ZsZXhib3hsZWdhY3knXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdib3hEaXJlY3Rpb24nKTtcbiAgICB9O1xuXG4gICAgLy8gT24gdGhlIFM2MCBhbmQgQkIgU3Rvcm0sIGdldENvbnRleHQgZXhpc3RzLCBidXQgYWx3YXlzIHJldHVybnMgdW5kZWZpbmVkXG4gICAgLy8gc28gd2UgYWN0dWFsbHkgaGF2ZSB0byBjYWxsIGdldENvbnRleHQoKSB0byB2ZXJpZnlcbiAgICAvLyBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzL2lzc3VlLzk3L1xuXG4gICAgdGVzdHNbJ2NhbnZhcyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHJldHVybiAhIShlbGVtLmdldENvbnRleHQgJiYgZWxlbS5nZXRDb250ZXh0KCcyZCcpKTtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ2NhbnZhc3RleHQnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISEoTW9kZXJuaXpyWydjYW52YXMnXSAmJiBpcyhkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLmZpbGxUZXh0LCAnZnVuY3Rpb24nKSk7XG4gICAgfTtcblxuICAgIC8vIHdlYmsuaXQvNzAxMTcgaXMgdHJhY2tpbmcgYSBsZWdpdCBXZWJHTCBmZWF0dXJlIGRldGVjdCBwcm9wb3NhbFxuXG4gICAgLy8gV2UgZG8gYSBzb2Z0IGRldGVjdCB3aGljaCBtYXkgZmFsc2UgcG9zaXRpdmUgaW4gb3JkZXIgdG8gYXZvaWRcbiAgICAvLyBhbiBleHBlbnNpdmUgY29udGV4dCBjcmVhdGlvbjogYnVnemlsLmxhLzczMjQ0MVxuXG4gICAgdGVzdHNbJ3dlYmdsJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiBUaGUgTW9kZXJuaXpyLnRvdWNoIHRlc3Qgb25seSBpbmRpY2F0ZXMgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHNcbiAgICAgKiAgICB0b3VjaCBldmVudHMsIHdoaWNoIGRvZXMgbm90IG5lY2Vzc2FyaWx5IHJlZmxlY3QgYSB0b3VjaHNjcmVlblxuICAgICAqICAgIGRldmljZSwgYXMgZXZpZGVuY2VkIGJ5IHRhYmxldHMgcnVubmluZyBXaW5kb3dzIDcgb3IsIGFsYXMsXG4gICAgICogICAgdGhlIFBhbG0gUHJlIC8gV2ViT1MgKHRvdWNoKSBwaG9uZXMuXG4gICAgICpcbiAgICAgKiBBZGRpdGlvbmFsbHksIENocm9tZSAoZGVza3RvcCkgdXNlZCB0byBsaWUgYWJvdXQgaXRzIHN1cHBvcnQgb24gdGhpcyxcbiAgICAgKiAgICBidXQgdGhhdCBoYXMgc2luY2UgYmVlbiByZWN0aWZpZWQ6IGNyYnVnLmNvbS8zNjQxNVxuICAgICAqXG4gICAgICogV2UgYWxzbyB0ZXN0IGZvciBGaXJlZm94IDQgTXVsdGl0b3VjaCBTdXBwb3J0LlxuICAgICAqXG4gICAgICogRm9yIG1vcmUgaW5mbywgc2VlOiBtb2Rlcm5penIuZ2l0aHViLmNvbS9Nb2Rlcm5penIvdG91Y2guaHRtbFxuICAgICAqL1xuXG4gICAgdGVzdHNbJ3RvdWNoJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJvb2w7XG5cbiAgICAgICAgaWYoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSB7XG4gICAgICAgICAgYm9vbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoWydAbWVkaWEgKCcscHJlZml4ZXMuam9pbigndG91Y2gtZW5hYmxlZCksKCcpLG1vZCwnKScsJ3sjbW9kZXJuaXpye3RvcDo5cHg7cG9zaXRpb246YWJzb2x1dGV9fSddLmpvaW4oJycpLCBmdW5jdGlvbiggbm9kZSApIHtcbiAgICAgICAgICAgIGJvb2wgPSBub2RlLm9mZnNldFRvcCA9PT0gOTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgIH07XG5cblxuICAgIC8vIGdlb2xvY2F0aW9uIGlzIG9mdGVuIGNvbnNpZGVyZWQgYSB0cml2aWFsIGZlYXR1cmUgZGV0ZWN0Li4uXG4gICAgLy8gVHVybnMgb3V0LCBpdCdzIHF1aXRlIHRyaWNreSB0byBnZXQgcmlnaHQ6XG4gICAgLy9cbiAgICAvLyBVc2luZyAhIW5hdmlnYXRvci5nZW9sb2NhdGlvbiBkb2VzIHR3byB0aGluZ3Mgd2UgZG9uJ3Qgd2FudC4gSXQ6XG4gICAgLy8gICAxLiBMZWFrcyBtZW1vcnkgaW4gSUU5OiBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzUxM1xuICAgIC8vICAgMi4gRGlzYWJsZXMgcGFnZSBjYWNoaW5nIGluIFdlYktpdDogd2Viay5pdC80Mzk1NlxuICAgIC8vXG4gICAgLy8gTWVhbndoaWxlLCBpbiBGaXJlZm94IDwgOCwgYW4gYWJvdXQ6Y29uZmlnIHNldHRpbmcgY291bGQgZXhwb3NlXG4gICAgLy8gYSBmYWxzZSBwb3NpdGl2ZSB0aGF0IHdvdWxkIHRocm93IGFuIGV4Y2VwdGlvbjogYnVnemlsLmxhLzY4ODE1OFxuXG4gICAgdGVzdHNbJ2dlb2xvY2F0aW9uJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICdnZW9sb2NhdGlvbicgaW4gbmF2aWdhdG9yO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydwb3N0bWVzc2FnZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISF3aW5kb3cucG9zdE1lc3NhZ2U7XG4gICAgfTtcblxuXG4gICAgLy8gQ2hyb21lIGluY29nbml0byBtb2RlIHVzZWQgdG8gdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gdXNpbmcgb3BlbkRhdGFiYXNlXG4gICAgLy8gSXQgZG9lc24ndCBhbnltb3JlLlxuICAgIHRlc3RzWyd3ZWJzcWxkYXRhYmFzZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISF3aW5kb3cub3BlbkRhdGFiYXNlO1xuICAgIH07XG5cbiAgICAvLyBWZW5kb3JzIGhhZCBpbmNvbnNpc3RlbnQgcHJlZml4aW5nIHdpdGggdGhlIGV4cGVyaW1lbnRhbCBJbmRleGVkIERCOlxuICAgIC8vIC0gV2Via2l0J3MgaW1wbGVtZW50YXRpb24gaXMgYWNjZXNzaWJsZSB0aHJvdWdoIHdlYmtpdEluZGV4ZWREQlxuICAgIC8vIC0gRmlyZWZveCBzaGlwcGVkIG1vel9pbmRleGVkREIgYmVmb3JlIEZGNGI5LCBidXQgc2luY2UgdGhlbiBoYXMgYmVlbiBtb3pJbmRleGVkREJcbiAgICAvLyBGb3Igc3BlZWQsIHdlIGRvbid0IHRlc3QgdGhlIGxlZ2FjeSAoYW5kIGJldGEtb25seSkgaW5kZXhlZERCXG4gICAgdGVzdHNbJ2luZGV4ZWREQiddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gISF0ZXN0UHJvcHNBbGwoXCJpbmRleGVkREJcIiwgd2luZG93KTtcbiAgICB9O1xuXG4gICAgLy8gZG9jdW1lbnRNb2RlIGxvZ2ljIGZyb20gWVVJIHRvIGZpbHRlciBvdXQgSUU4IENvbXBhdCBNb2RlXG4gICAgLy8gICB3aGljaCBmYWxzZSBwb3NpdGl2ZXMuXG4gICAgdGVzdHNbJ2hhc2hjaGFuZ2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGlzRXZlbnRTdXBwb3J0ZWQoJ2hhc2hjaGFuZ2UnLCB3aW5kb3cpICYmIChkb2N1bWVudC5kb2N1bWVudE1vZGUgPT09IHVuZGVmaW5lZCB8fCBkb2N1bWVudC5kb2N1bWVudE1vZGUgPiA3KTtcbiAgICB9O1xuXG4gICAgLy8gUGVyIDEuNjpcbiAgICAvLyBUaGlzIHVzZWQgdG8gYmUgTW9kZXJuaXpyLmhpc3RvcnltYW5hZ2VtZW50IGJ1dCB0aGUgbG9uZ2VyXG4gICAgLy8gbmFtZSBoYXMgYmVlbiBkZXByZWNhdGVkIGluIGZhdm9yIG9mIGEgc2hvcnRlciBhbmQgcHJvcGVydHktbWF0Y2hpbmcgb25lLlxuICAgIC8vIFRoZSBvbGQgQVBJIGlzIHN0aWxsIGF2YWlsYWJsZSBpbiAxLjYsIGJ1dCBhcyBvZiAyLjAgd2lsbCB0aHJvdyBhIHdhcm5pbmcsXG4gICAgLy8gYW5kIGluIHRoZSBmaXJzdCByZWxlYXNlIHRoZXJlYWZ0ZXIgZGlzYXBwZWFyIGVudGlyZWx5LlxuICAgIHRlc3RzWydoaXN0b3J5J10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhISh3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnB1c2hTdGF0ZSk7XG4gICAgfTtcblxuICAgIHRlc3RzWydkcmFnYW5kZHJvcCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmV0dXJuICgnZHJhZ2dhYmxlJyBpbiBkaXYpIHx8ICgnb25kcmFnc3RhcnQnIGluIGRpdiAmJiAnb25kcm9wJyBpbiBkaXYpO1xuICAgIH07XG5cbiAgICAvLyBGRjMuNiB3YXMgRU9MJ2VkIG9uIDQvMjQvMTIsIGJ1dCB0aGUgRVNSIHZlcnNpb24gb2YgRkYxMFxuICAgIC8vIHdpbGwgYmUgc3VwcG9ydGVkIHVudGlsIEZGMTkgKDIvMTIvMTMpLCBhdCB3aGljaCB0aW1lLCBFU1IgYmVjb21lcyBGRjE3LlxuICAgIC8vIEZGMTAgc3RpbGwgdXNlcyBwcmVmaXhlcywgc28gY2hlY2sgZm9yIGl0IHVudGlsIHRoZW4uXG4gICAgLy8gZm9yIG1vcmUgRVNSIGluZm8sIHNlZTogbW96aWxsYS5vcmcvZW4tVVMvZmlyZWZveC9vcmdhbml6YXRpb25zL2ZhcS9cbiAgICB0ZXN0c1snd2Vic29ja2V0cyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnV2ViU29ja2V0JyBpbiB3aW5kb3cgfHwgJ01veldlYlNvY2tldCcgaW4gd2luZG93O1xuICAgIH07XG5cblxuICAgIC8vIGNzcy10cmlja3MuY29tL3JnYmEtYnJvd3Nlci1zdXBwb3J0L1xuICAgIHRlc3RzWydyZ2JhJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gU2V0IGFuIHJnYmEoKSBjb2xvciBhbmQgY2hlY2sgdGhlIHJldHVybmVkIHZhbHVlXG5cbiAgICAgICAgc2V0Q3NzKCdiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTUwLDI1NSwxNTAsLjUpJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKG1TdHlsZS5iYWNrZ3JvdW5kQ29sb3IsICdyZ2JhJyk7XG4gICAgfTtcblxuICAgIHRlc3RzWydoc2xhJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gU2FtZSBhcyByZ2JhKCksIGluIGZhY3QsIGJyb3dzZXJzIHJlLW1hcCBoc2xhKCkgdG8gcmdiYSgpIGludGVybmFsbHksXG4gICAgICAgIC8vICAgZXhjZXB0IElFOSB3aG8gcmV0YWlucyBpdCBhcyBoc2xhXG5cbiAgICAgICAgc2V0Q3NzKCdiYWNrZ3JvdW5kLWNvbG9yOmhzbGEoMTIwLDQwJSwxMDAlLC41KScpO1xuXG4gICAgICAgIHJldHVybiBjb250YWlucyhtU3R5bGUuYmFja2dyb3VuZENvbG9yLCAncmdiYScpIHx8IGNvbnRhaW5zKG1TdHlsZS5iYWNrZ3JvdW5kQ29sb3IsICdoc2xhJyk7XG4gICAgfTtcblxuICAgIHRlc3RzWydtdWx0aXBsZWJncyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNldHRpbmcgbXVsdGlwbGUgaW1hZ2VzIEFORCBhIGNvbG9yIG9uIHRoZSBiYWNrZ3JvdW5kIHNob3J0aGFuZCBwcm9wZXJ0eVxuICAgICAgICAvLyAgYW5kIHRoZW4gcXVlcnlpbmcgdGhlIHN0eWxlLmJhY2tncm91bmQgcHJvcGVydHkgdmFsdWUgZm9yIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgLy8gIG9jY3VycmVuY2VzIG9mIFwidXJsKFwiIGlzIGEgcmVsaWFibGUgbWV0aG9kIGZvciBkZXRlY3RpbmcgQUNUVUFMIHN1cHBvcnQgZm9yIHRoaXMhXG5cbiAgICAgICAgc2V0Q3NzKCdiYWNrZ3JvdW5kOnVybChodHRwczovLyksdXJsKGh0dHBzOi8vKSxyZWQgdXJsKGh0dHBzOi8vKScpO1xuXG4gICAgICAgIC8vIElmIHRoZSBVQSBzdXBwb3J0cyBtdWx0aXBsZSBiYWNrZ3JvdW5kcywgdGhlcmUgc2hvdWxkIGJlIHRocmVlIG9jY3VycmVuY2VzXG4gICAgICAgIC8vICAgb2YgdGhlIHN0cmluZyBcInVybChcIiBpbiB0aGUgcmV0dXJuIHZhbHVlIGZvciBlbGVtU3R5bGUuYmFja2dyb3VuZFxuXG4gICAgICAgIHJldHVybiAoLyh1cmxcXHMqXFwoLio/KXszfS8pLnRlc3QobVN0eWxlLmJhY2tncm91bmQpO1xuICAgIH07XG5cblxuXG4gICAgLy8gdGhpcyB3aWxsIGZhbHNlIHBvc2l0aXZlIGluIE9wZXJhIE1pbmlcbiAgICAvLyAgIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvMzk2XG5cbiAgICB0ZXN0c1snYmFja2dyb3VuZHNpemUnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdiYWNrZ3JvdW5kU2l6ZScpO1xuICAgIH07XG5cbiAgICB0ZXN0c1snYm9yZGVyaW1hZ2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdib3JkZXJJbWFnZScpO1xuICAgIH07XG5cblxuICAgIC8vIFN1cGVyIGNvbXByZWhlbnNpdmUgdGFibGUgYWJvdXQgYWxsIHRoZSB1bmlxdWUgaW1wbGVtZW50YXRpb25zIG9mXG4gICAgLy8gYm9yZGVyLXJhZGl1czogbXVkZGxlZHJhbWJsaW5ncy5jb20vdGFibGUtb2YtY3NzMy1ib3JkZXItcmFkaXVzLWNvbXBsaWFuY2VcblxuICAgIHRlc3RzWydib3JkZXJyYWRpdXMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdib3JkZXJSYWRpdXMnKTtcbiAgICB9O1xuXG4gICAgLy8gV2ViT1MgdW5mb3J0dW5hdGVseSBmYWxzZSBwb3NpdGl2ZXMgb24gdGhpcyB0ZXN0LlxuICAgIHRlc3RzWydib3hzaGFkb3cnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdib3hTaGFkb3cnKTtcbiAgICB9O1xuXG4gICAgLy8gRkYzLjAgd2lsbCBmYWxzZSBwb3NpdGl2ZSBvbiB0aGlzIHRlc3RcbiAgICB0ZXN0c1sndGV4dHNoYWRvdyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZS50ZXh0U2hhZG93ID09PSAnJztcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snb3BhY2l0eSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIHRoYXQgYWN0dWFsbHkgaGF2ZSBDU1MgT3BhY2l0eSBpbXBsZW1lbnRlZCBoYXZlIGRvbmUgc29cbiAgICAgICAgLy8gIGFjY29yZGluZyB0byBzcGVjLCB3aGljaCBtZWFucyB0aGVpciByZXR1cm4gdmFsdWVzIGFyZSB3aXRoaW4gdGhlXG4gICAgICAgIC8vICByYW5nZSBvZiBbMC4wLDEuMF0gLSBpbmNsdWRpbmcgdGhlIGxlYWRpbmcgemVyby5cblxuICAgICAgICBzZXRDc3NBbGwoJ29wYWNpdHk6LjU1Jyk7XG5cbiAgICAgICAgLy8gVGhlIG5vbi1saXRlcmFsIC4gaW4gdGhpcyByZWdleCBpcyBpbnRlbnRpb25hbDpcbiAgICAgICAgLy8gICBHZXJtYW4gQ2hyb21lIHJldHVybnMgdGhpcyB2YWx1ZSBhcyAwLDU1XG4gICAgICAgIC8vIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvI2lzc3VlLzU5L2NvbW1lbnQvNTE2NjMyXG4gICAgICAgIHJldHVybiAoL14wLjU1JC8pLnRlc3QobVN0eWxlLm9wYWNpdHkpO1xuICAgIH07XG5cblxuICAgIC8vIE5vdGUsIEFuZHJvaWQgPCA0IHdpbGwgcGFzcyB0aGlzIHRlc3QsIGJ1dCBjYW4gb25seSBhbmltYXRlXG4gICAgLy8gICBhIHNpbmdsZSBwcm9wZXJ0eSBhdCBhIHRpbWVcbiAgICAvLyAgIGdvby5nbC92M1Y0R3BcbiAgICB0ZXN0c1snY3NzYW5pbWF0aW9ucyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2FuaW1hdGlvbk5hbWUnKTtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzY29sdW1ucyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2NvbHVtbkNvdW50Jyk7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc2dyYWRpZW50cyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGb3IgQ1NTIEdyYWRpZW50cyBzeW50YXgsIHBsZWFzZSBzZWU6XG4gICAgICAgICAqIHdlYmtpdC5vcmcvYmxvZy8xNzUvaW50cm9kdWNpbmctY3NzLWdyYWRpZW50cy9cbiAgICAgICAgICogZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NTUy8tbW96LWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgKiBkZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vQ1NTLy1tb3otcmFkaWFsLWdyYWRpZW50XG4gICAgICAgICAqIGRldi53My5vcmcvY3Nzd2cvY3NzMy1pbWFnZXMvI2dyYWRpZW50cy1cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHN0cjEgPSAnYmFja2dyb3VuZC1pbWFnZTonLFxuICAgICAgICAgICAgc3RyMiA9ICdncmFkaWVudChsaW5lYXIsbGVmdCB0b3AscmlnaHQgYm90dG9tLGZyb20oIzlmOSksdG8od2hpdGUpKTsnLFxuICAgICAgICAgICAgc3RyMyA9ICdsaW5lYXItZ3JhZGllbnQobGVmdCB0b3AsIzlmOSwgd2hpdGUpOyc7XG5cbiAgICAgICAgc2V0Q3NzKFxuICAgICAgICAgICAgIC8vIGxlZ2FjeSB3ZWJraXQgc3ludGF4IChGSVhNRTogcmVtb3ZlIHdoZW4gc3ludGF4IG5vdCBpbiB1c2UgYW55bW9yZSlcbiAgICAgICAgICAgICAgKHN0cjEgKyAnLXdlYmtpdC0gJy5zcGxpdCgnICcpLmpvaW4oc3RyMiArIHN0cjEpICtcbiAgICAgICAgICAgICAvLyBzdGFuZGFyZCBzeW50YXggICAgICAgICAgICAgLy8gdHJhaWxpbmcgJ2JhY2tncm91bmQtaW1hZ2U6J1xuICAgICAgICAgICAgICBwcmVmaXhlcy5qb2luKHN0cjMgKyBzdHIxKSkuc2xpY2UoMCwgLXN0cjEubGVuZ3RoKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBjb250YWlucyhtU3R5bGUuYmFja2dyb3VuZEltYWdlLCAnZ3JhZGllbnQnKTtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzcmVmbGVjdGlvbnMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdib3hSZWZsZWN0Jyk7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc3RyYW5zZm9ybXMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISF0ZXN0UHJvcHNBbGwoJ3RyYW5zZm9ybScpO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3N0cmFuc2Zvcm1zM2QnXSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciByZXQgPSAhIXRlc3RQcm9wc0FsbCgncGVyc3BlY3RpdmUnKTtcblxuICAgICAgICAvLyBXZWJraXQncyAzRCB0cmFuc2Zvcm1zIGFyZSBwYXNzZWQgb2ZmIHRvIHRoZSBicm93c2VyJ3Mgb3duIGdyYXBoaWNzIHJlbmRlcmVyLlxuICAgICAgICAvLyAgIEl0IHdvcmtzIGZpbmUgaW4gU2FmYXJpIG9uIExlb3BhcmQgYW5kIFNub3cgTGVvcGFyZCwgYnV0IG5vdCBpbiBDaHJvbWUgaW5cbiAgICAgICAgLy8gICBzb21lIGNvbmRpdGlvbnMuIEFzIGEgcmVzdWx0LCBXZWJraXQgdHlwaWNhbGx5IHJlY29nbml6ZXMgdGhlIHN5bnRheCBidXRcbiAgICAgICAgLy8gICB3aWxsIHNvbWV0aW1lcyB0aHJvdyBhIGZhbHNlIHBvc2l0aXZlLCB0aHVzIHdlIG11c3QgZG8gYSBtb3JlIHRob3JvdWdoIGNoZWNrOlxuICAgICAgICBpZiAoIHJldCAmJiAnd2Via2l0UGVyc3BlY3RpdmUnIGluIGRvY0VsZW1lbnQuc3R5bGUgKSB7XG5cbiAgICAgICAgICAvLyBXZWJraXQgYWxsb3dzIHRoaXMgbWVkaWEgcXVlcnkgdG8gc3VjY2VlZCBvbmx5IGlmIHRoZSBmZWF0dXJlIGlzIGVuYWJsZWQuXG4gICAgICAgICAgLy8gYEBtZWRpYSAodHJhbnNmb3JtLTNkKSwoLXdlYmtpdC10cmFuc2Zvcm0tM2QpeyAuLi4gfWBcbiAgICAgICAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcygnQG1lZGlhICh0cmFuc2Zvcm0tM2QpLCgtd2Via2l0LXRyYW5zZm9ybS0zZCl7I21vZGVybml6cntsZWZ0OjlweDtwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6M3B4O319JywgZnVuY3Rpb24oIG5vZGUsIHJ1bGUgKSB7XG4gICAgICAgICAgICByZXQgPSBub2RlLm9mZnNldExlZnQgPT09IDkgJiYgbm9kZS5vZmZzZXRIZWlnaHQgPT09IDM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzdHJhbnNpdGlvbnMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCd0cmFuc2l0aW9uJyk7XG4gICAgfTtcblxuXG4gICAgLyo+PmZvbnRmYWNlKi9cbiAgICAvLyBAZm9udC1mYWNlIGRldGVjdGlvbiByb3V0aW5lIGJ5IERpZWdvIFBlcmluaVxuICAgIC8vIGphdmFzY3JpcHQubndib3guY29tL0NTU1N1cHBvcnQvXG5cbiAgICAvLyBmYWxzZSBwb3NpdGl2ZXM6XG4gICAgLy8gICBXZWJPUyBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzM0MlxuICAgIC8vICAgV1A3ICAgZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy81MzhcbiAgICB0ZXN0c1snZm9udGZhY2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm9vbDtcblxuICAgICAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcygnQGZvbnQtZmFjZSB7Zm9udC1mYW1pbHk6XCJmb250XCI7c3JjOnVybChcImh0dHBzOi8vXCIpfScsIGZ1bmN0aW9uKCBub2RlLCBydWxlICkge1xuICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbW9kZXJuaXpyJyksXG4gICAgICAgICAgICAgIHNoZWV0ID0gc3R5bGUuc2hlZXQgfHwgc3R5bGUuc3R5bGVTaGVldCxcbiAgICAgICAgICAgICAgY3NzVGV4dCA9IHNoZWV0ID8gKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzWzBdID8gc2hlZXQuY3NzUnVsZXNbMF0uY3NzVGV4dCA6IHNoZWV0LmNzc1RleHQgfHwgJycpIDogJyc7XG5cbiAgICAgICAgICBib29sID0gL3NyYy9pLnRlc3QoY3NzVGV4dCkgJiYgY3NzVGV4dC5pbmRleE9mKHJ1bGUuc3BsaXQoJyAnKVswXSkgPT09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgIH07XG4gICAgLyo+PmZvbnRmYWNlKi9cblxuICAgIC8vIENTUyBnZW5lcmF0ZWQgY29udGVudCBkZXRlY3Rpb25cbiAgICB0ZXN0c1snZ2VuZXJhdGVkY29udGVudCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib29sO1xuXG4gICAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKFsnIycsbW9kLCd7Zm9udDowLzAgYX0jJyxtb2QsJzphZnRlcntjb250ZW50OlwiJyxzbWlsZSwnXCI7dmlzaWJpbGl0eTpoaWRkZW47Zm9udDozcHgvMSBhfSddLmpvaW4oJycpLCBmdW5jdGlvbiggbm9kZSApIHtcbiAgICAgICAgICBib29sID0gbm9kZS5vZmZzZXRIZWlnaHQgPj0gMztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcblxuXG5cbiAgICAvLyBUaGVzZSB0ZXN0cyBldmFsdWF0ZSBzdXBwb3J0IG9mIHRoZSB2aWRlby9hdWRpbyBlbGVtZW50cywgYXMgd2VsbCBhc1xuICAgIC8vIHRlc3Rpbmcgd2hhdCB0eXBlcyBvZiBjb250ZW50IHRoZXkgc3VwcG9ydC5cbiAgICAvL1xuICAgIC8vIFdlJ3JlIHVzaW5nIHRoZSBCb29sZWFuIGNvbnN0cnVjdG9yIGhlcmUsIHNvIHRoYXQgd2UgY2FuIGV4dGVuZCB0aGUgdmFsdWVcbiAgICAvLyBlLmcuICBNb2Rlcm5penIudmlkZW8gICAgIC8vIHRydWVcbiAgICAvLyAgICAgICBNb2Rlcm5penIudmlkZW8ub2dnIC8vICdwcm9iYWJseSdcbiAgICAvL1xuICAgIC8vIENvZGVjIHZhbHVlcyBmcm9tIDogZ2l0aHViLmNvbS9OaWVsc0xlZW5oZWVyL2h0bWw1dGVzdC9ibG9iLzkxMDZhOC9pbmRleC5odG1sI0w4NDVcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoeCB0byBOaWVsc0xlZW5oZWVyIGFuZCB6Y29ycGFuXG5cbiAgICAvLyBOb3RlOiBpbiBzb21lIG9sZGVyIGJyb3dzZXJzLCBcIm5vXCIgd2FzIGEgcmV0dXJuIHZhbHVlIGluc3RlYWQgb2YgZW1wdHkgc3RyaW5nLlxuICAgIC8vICAgSXQgd2FzIGxpdmUgaW4gRkYzLjUuMCBhbmQgMy41LjEsIGJ1dCBmaXhlZCBpbiAzLjUuMlxuICAgIC8vICAgSXQgd2FzIGFsc28gbGl2ZSBpbiBTYWZhcmkgNC4wLjAgLSA0LjAuNCwgYnV0IGZpeGVkIGluIDQuMC41XG5cbiAgICB0ZXN0c1sndmlkZW8nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgLy8gSUU5IFJ1bm5pbmcgb24gV2luZG93cyBTZXJ2ZXIgU0tVIGNhbiBjYXVzZSBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duLCBidWcgIzIyNFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCBib29sID0gISFlbGVtLmNhblBsYXlUeXBlICkge1xuICAgICAgICAgICAgICAgIGJvb2wgICAgICA9IG5ldyBCb29sZWFuKGJvb2wpO1xuICAgICAgICAgICAgICAgIGJvb2wub2dnICA9IGVsZW0uY2FuUGxheVR5cGUoJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhXCInKSAgICAgIC5yZXBsYWNlKC9ebm8kLywnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaXRob3V0IFF1aWNrVGltZSwgdGhpcyB2YWx1ZSB3aWxsIGJlIGB1bmRlZmluZWRgLiBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzU0NlxuICAgICAgICAgICAgICAgIGJvb2wuaDI2NCA9IGVsZW0uY2FuUGxheVR5cGUoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUVcIicpIC5yZXBsYWNlKC9ebm8kLywnJyk7XG5cbiAgICAgICAgICAgICAgICBib29sLndlYm0gPSBlbGVtLmNhblBsYXlUeXBlKCd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2goZSkgeyB9XG5cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcblxuICAgIHRlc3RzWydhdWRpbyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCBib29sID0gISFlbGVtLmNhblBsYXlUeXBlICkge1xuICAgICAgICAgICAgICAgIGJvb2wgICAgICA9IG5ldyBCb29sZWFuKGJvb2wpO1xuICAgICAgICAgICAgICAgIGJvb2wub2dnICA9IGVsZW0uY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywnJyk7XG4gICAgICAgICAgICAgICAgYm9vbC5tcDMgID0gZWxlbS5jYW5QbGF5VHlwZSgnYXVkaW8vbXBlZzsnKSAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ebm8kLywnJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBNaW1ldHlwZXMgYWNjZXB0ZWQ6XG4gICAgICAgICAgICAgICAgLy8gICBkZXZlbG9wZXIubW96aWxsYS5vcmcvRW4vTWVkaWFfZm9ybWF0c19zdXBwb3J0ZWRfYnlfdGhlX2F1ZGlvX2FuZF92aWRlb19lbGVtZW50c1xuICAgICAgICAgICAgICAgIC8vICAgYml0Lmx5L2lwaG9uZW9zY29kZWNzXG4gICAgICAgICAgICAgICAgYm9vbC53YXYgID0gZWxlbS5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKSAgICAgLnJlcGxhY2UoL15ubyQvLCcnKTtcbiAgICAgICAgICAgICAgICBib29sLm00YSAgPSAoIGVsZW0uY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbTRhOycpICAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkgICAgICAgICAgICAgLnJlcGxhY2UoL15ubyQvLCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaChlKSB7IH1cblxuICAgICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuXG5cbiAgICAvLyBJbiBGRjQsIGlmIGRpc2FibGVkLCB3aW5kb3cubG9jYWxTdG9yYWdlIHNob3VsZCA9PT0gbnVsbC5cblxuICAgIC8vIE5vcm1hbGx5LCB3ZSBjb3VsZCBub3QgdGVzdCB0aGF0IGRpcmVjdGx5IGFuZCBuZWVkIHRvIGRvIGFcbiAgICAvLyAgIGAoJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93KSAmJiBgIHRlc3QgZmlyc3QgYmVjYXVzZSBvdGhlcndpc2UgRmlyZWZveCB3aWxsXG4gICAgLy8gICB0aHJvdyBidWd6aWwubGEvMzY1NzcyIGlmIGNvb2tpZXMgYXJlIGRpc2FibGVkXG5cbiAgICAvLyBBbHNvIGluIGlPUzUgUHJpdmF0ZSBCcm93c2luZyBtb2RlLCBhdHRlbXB0aW5nIHRvIHVzZSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbVxuICAgIC8vIHdpbGwgdGhyb3cgdGhlIGV4Y2VwdGlvbjpcbiAgICAvLyAgIFFVT1RBX0VYQ0VFREVEX0VSUlJPUiBET00gRXhjZXB0aW9uIDIyLlxuICAgIC8vIFBlY3VsaWFybHksIGdldEl0ZW0gYW5kIHJlbW92ZUl0ZW0gY2FsbHMgZG8gbm90IHRocm93LlxuXG4gICAgLy8gQmVjYXVzZSB3ZSBhcmUgZm9yY2VkIHRvIHRyeS9jYXRjaCB0aGlzLCB3ZSdsbCBnbyBhZ2dyZXNzaXZlLlxuXG4gICAgLy8gSnVzdCBGV0lXOiBJRTggQ29tcGF0IG1vZGUgc3VwcG9ydHMgdGhlc2UgZmVhdHVyZXMgY29tcGxldGVseTpcbiAgICAvLyAgIHd3dy5xdWlya3Ntb2RlLm9yZy9kb20vaHRtbDUuaHRtbFxuICAgIC8vIEJ1dCBJRTggZG9lc24ndCBzdXBwb3J0IGVpdGhlciB3aXRoIGxvY2FsIGZpbGVzXG5cbiAgICB0ZXN0c1snbG9jYWxzdG9yYWdlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG1vZCwgbW9kKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG1vZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGVzdHNbJ3Nlc3Npb25zdG9yYWdlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0obW9kLCBtb2QpO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShtb2QpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ3dlYndvcmtlcnMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISF3aW5kb3cuV29ya2VyO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydhcHBsaWNhdGlvbmNhY2hlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhd2luZG93LmFwcGxpY2F0aW9uQ2FjaGU7XG4gICAgfTtcblxuXG4gICAgLy8gVGhhbmtzIHRvIEVyaWsgRGFobHN0cm9tXG4gICAgdGVzdHNbJ3N2ZyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucy5zdmcsICdzdmcnKS5jcmVhdGVTVkdSZWN0O1xuICAgIH07XG5cbiAgICAvLyBzcGVjaWZpY2FsbHkgZm9yIFNWRyBpbmxpbmUgaW4gSFRNTCwgbm90IHdpdGhpbiBYSFRNTFxuICAgIC8vIHRlc3QgcGFnZTogcGF1bGlyaXNoLmNvbS9kZW1vL2lubGluZS1zdmdcbiAgICB0ZXN0c1snaW5saW5lc3ZnJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnPHN2Zy8+JztcbiAgICAgIHJldHVybiAoZGl2LmZpcnN0Q2hpbGQgJiYgZGl2LmZpcnN0Q2hpbGQubmFtZXNwYWNlVVJJKSA9PSBucy5zdmc7XG4gICAgfTtcblxuICAgIC8vIFNWRyBTTUlMIGFuaW1hdGlvblxuICAgIHRlc3RzWydzbWlsJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmIC9TVkdBbmltYXRlLy50ZXN0KHRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLnN2ZywgJ2FuaW1hdGUnKSkpO1xuICAgIH07XG5cbiAgICAvLyBUaGlzIHRlc3QgaXMgb25seSBmb3IgY2xpcCBwYXRocyBpbiBTVkcgcHJvcGVyLCBub3QgY2xpcCBwYXRocyBvbiBIVE1MIGNvbnRlbnRcbiAgICAvLyBkZW1vOiBzcnVmYWN1bHR5LnNydS5lZHUvZGF2aWQuZGFpbGV5L3N2Zy9uZXdzdHVmZi9jbGlwUGF0aDQuc3ZnXG5cbiAgICAvLyBIb3dldmVyIHJlYWQgdGhlIGNvbW1lbnRzIHRvIGRpZyBpbnRvIGFwcGx5aW5nIFNWRyBjbGlwcGF0aHMgdG8gSFRNTCBjb250ZW50IGhlcmU6XG4gICAgLy8gICBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzIxMyNpc3N1ZWNvbW1lbnQtMTE0OTQ5MVxuICAgIHRlc3RzWydzdmdjbGlwcGF0aHMnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgL1NWR0NsaXBQYXRoLy50ZXN0KHRvU3RyaW5nLmNhbGwoZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLnN2ZywgJ2NsaXBQYXRoJykpKTtcbiAgICB9O1xuXG4gICAgLyo+PndlYmZvcm1zKi9cbiAgICAvLyBpbnB1dCBmZWF0dXJlcyBhbmQgaW5wdXQgdHlwZXMgZ28gZGlyZWN0bHkgb250byB0aGUgcmV0IG9iamVjdCwgYnlwYXNzaW5nIHRoZSB0ZXN0cyBsb29wLlxuICAgIC8vIEhvbGQgdGhpcyBndXkgdG8gZXhlY3V0ZSBpbiBhIG1vbWVudC5cbiAgICBmdW5jdGlvbiB3ZWJmb3JtcygpIHtcbiAgICAgICAgLyo+PmlucHV0Ki9cbiAgICAgICAgLy8gUnVuIHRocm91Z2ggSFRNTDUncyBuZXcgaW5wdXQgYXR0cmlidXRlcyB0byBzZWUgaWYgdGhlIFVBIHVuZGVyc3RhbmRzIGFueS5cbiAgICAgICAgLy8gV2UncmUgdXNpbmcgZiB3aGljaCBpcyB0aGUgPGlucHV0PiBlbGVtZW50IGNyZWF0ZWQgZWFybHkgb25cbiAgICAgICAgLy8gTWlrZSBUYXlsciBoYXMgY3JlYXRlZCBhIGNvbXByZWhlbnNpdmUgcmVzb3VyY2UgZm9yIHRlc3RpbmcgdGhlc2UgYXR0cmlidXRlc1xuICAgICAgICAvLyAgIHdoZW4gYXBwbGllZCB0byBhbGwgaW5wdXQgdHlwZXM6XG4gICAgICAgIC8vICAgbWlrZXRheWxyLmNvbS9jb2RlL2lucHV0LXR5cGUtYXR0ci5odG1sXG4gICAgICAgIC8vIHNwZWM6IHd3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGhlLWlucHV0LWVsZW1lbnQuaHRtbCNpbnB1dC10eXBlLWF0dHItc3VtbWFyeVxuXG4gICAgICAgIC8vIE9ubHkgaW5wdXQgcGxhY2Vob2xkZXIgaXMgdGVzdGVkIHdoaWxlIHRleHRhcmVhJ3MgcGxhY2Vob2xkZXIgaXMgbm90LlxuICAgICAgICAvLyBDdXJyZW50bHkgU2FmYXJpIDQgYW5kIE9wZXJhIDExIGhhdmUgc3VwcG9ydCBvbmx5IGZvciB0aGUgaW5wdXQgcGxhY2Vob2xkZXJcbiAgICAgICAgLy8gQm90aCB0ZXN0cyBhcmUgYXZhaWxhYmxlIGluIGZlYXR1cmUtZGV0ZWN0cy9mb3Jtcy1wbGFjZWhvbGRlci5qc1xuICAgICAgICBNb2Rlcm5penJbJ2lucHV0J10gPSAoZnVuY3Rpb24oIHByb3BzICkge1xuICAgICAgICAgICAgZm9yICggdmFyIGkgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgICAgICAgICAgICBhdHRyc1sgcHJvcHNbaV0gXSA9ICEhKHByb3BzW2ldIGluIGlucHV0RWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0cnMubGlzdCl7XG4gICAgICAgICAgICAgIC8vIHNhZmFyaSBmYWxzZSBwb3NpdGl2ZSdzIG9uIGRhdGFsaXN0OiB3ZWJrLml0Lzc0MjUyXG4gICAgICAgICAgICAgIC8vIHNlZSBhbHNvIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvMTQ2XG4gICAgICAgICAgICAgIGF0dHJzLmxpc3QgPSAhIShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcpICYmIHdpbmRvdy5IVE1MRGF0YUxpc3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhdHRycztcbiAgICAgICAgfSkoJ2F1dG9jb21wbGV0ZSBhdXRvZm9jdXMgbGlzdCBwbGFjZWhvbGRlciBtYXggbWluIG11bHRpcGxlIHBhdHRlcm4gcmVxdWlyZWQgc3RlcCcuc3BsaXQoJyAnKSk7XG4gICAgICAgIC8qPj5pbnB1dCovXG5cbiAgICAgICAgLyo+PmlucHV0dHlwZXMqL1xuICAgICAgICAvLyBSdW4gdGhyb3VnaCBIVE1MNSdzIG5ldyBpbnB1dCB0eXBlcyB0byBzZWUgaWYgdGhlIFVBIHVuZGVyc3RhbmRzIGFueS5cbiAgICAgICAgLy8gICBUaGlzIGlzIHB1dCBiZWhpbmQgdGhlIHRlc3RzIHJ1bmxvb3AgYmVjYXVzZSBpdCBkb2Vzbid0IHJldHVybiBhXG4gICAgICAgIC8vICAgdHJ1ZS9mYWxzZSBsaWtlIGFsbCB0aGUgb3RoZXIgdGVzdHM7IGluc3RlYWQsIGl0IHJldHVybnMgYW4gb2JqZWN0XG4gICAgICAgIC8vICAgY29udGFpbmluZyBlYWNoIGlucHV0IHR5cGUgd2l0aCBpdHMgY29ycmVzcG9uZGluZyB0cnVlL2ZhbHNlIHZhbHVlXG5cbiAgICAgICAgLy8gQmlnIHRoYW5rcyB0byBAbWlrZXRheWxyIGZvciB0aGUgaHRtbDUgZm9ybXMgZXhwZXJ0aXNlLiBtaWtldGF5bHIuY29tL1xuICAgICAgICBNb2Rlcm5penJbJ2lucHV0dHlwZXMnXSA9IChmdW5jdGlvbihwcm9wcykge1xuXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGJvb2wsIGlucHV0RWxlbVR5cGUsIGRlZmF1bHRWaWV3LCBsZW4gPSBwcm9wcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcblxuICAgICAgICAgICAgICAgIGlucHV0RWxlbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBpbnB1dEVsZW1UeXBlID0gcHJvcHNbaV0pO1xuICAgICAgICAgICAgICAgIGJvb2wgPSBpbnB1dEVsZW0udHlwZSAhPT0gJ3RleHQnO1xuXG4gICAgICAgICAgICAgICAgLy8gV2UgZmlyc3QgY2hlY2sgdG8gc2VlIGlmIHRoZSB0eXBlIHdlIGdpdmUgaXQgc3RpY2tzLi5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdHlwZSBkb2VzLCB3ZSBmZWVkIGl0IGEgdGV4dHVhbCB2YWx1ZSwgd2hpY2ggc2hvdWxkbid0IGJlIHZhbGlkLlxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB2YWx1ZSBkb2Vzbid0IHN0aWNrLCB3ZSBrbm93IHRoZXJlJ3MgaW5wdXQgc2FuaXRpemF0aW9uIHdoaWNoIGluZmVycyBhIGN1c3RvbSBVSVxuICAgICAgICAgICAgICAgIGlmICggYm9vbCApIHtcblxuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW0udmFsdWUgICAgICAgICA9IHNtaWxlO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZW0uc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjsnO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggL15yYW5nZSQvLnRlc3QoaW5wdXRFbGVtVHlwZSkgJiYgaW5wdXRFbGVtLnN0eWxlLldlYmtpdEFwcGVhcmFuY2UgIT09IHVuZGVmaW5lZCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgIGRvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gU2FmYXJpIDItNCBhbGxvd3MgdGhlIHNtaWxleSBhcyBhIHZhbHVlLCBkZXNwaXRlIG1ha2luZyBhIHNsaWRlclxuICAgICAgICAgICAgICAgICAgICAgIGJvb2wgPSAgZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShpbnB1dEVsZW0sIG51bGwpLldlYmtpdEFwcGVhcmFuY2UgIT09ICd0ZXh0ZmllbGQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2JpbGUgYW5kcm9pZCB3ZWIgYnJvd3NlciBoYXMgZmFsc2UgcG9zaXRpdmUsIHNvIG11c3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBoZWlnaHQgdG8gc2VlIGlmIHRoZSB3aWRnZXQgaXMgYWN0dWFsbHkgdGhlcmUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXRFbGVtLm9mZnNldEhlaWdodCAhPT0gMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBkb2NFbGVtZW50LnJlbW92ZUNoaWxkKGlucHV0RWxlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICggL14oc2VhcmNofHRlbCkkLy50ZXN0KGlucHV0RWxlbVR5cGUpICl7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gU3BlYyBkb2Vzbid0IGRlZmluZSBhbnkgc3BlY2lhbCBwYXJzaW5nIG9yIGRldGVjdGFibGUgVUlcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIGJlaGF2aW9ycyBzbyB3ZSBwYXNzIHRoZXNlIHRocm91Z2ggYXMgdHJ1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gSW50ZXJlc3RpbmdseSwgb3BlcmEgZmFpbHMgdGhlIGVhcmxpZXIgdGVzdCwgc28gaXQgZG9lc24ndFxuICAgICAgICAgICAgICAgICAgICAgIC8vICBldmVuIG1ha2UgaXQgaGVyZS5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAvXih1cmx8ZW1haWwpJC8udGVzdChpbnB1dEVsZW1UeXBlKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBSZWFsIHVybCBhbmQgZW1haWwgc3VwcG9ydCBjb21lcyB3aXRoIHByZWJha2VkIHZhbGlkYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgYm9vbCA9IGlucHV0RWxlbS5jaGVja1ZhbGlkaXR5ICYmIGlucHV0RWxlbS5jaGVja1ZhbGlkaXR5KCkgPT09IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVwZ3JhZGVkIGlucHV0IGNvbXBvbnRlbnQgcmVqZWN0cyB0aGUgOikgdGV4dCwgd2UgZ290IGEgd2lubmVyXG4gICAgICAgICAgICAgICAgICAgICAgYm9vbCA9IGlucHV0RWxlbS52YWx1ZSAhPSBzbWlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlucHV0c1sgcHJvcHNbaV0gXSA9ICEhYm9vbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnB1dHM7XG4gICAgICAgIH0pKCdzZWFyY2ggdGVsIHVybCBlbWFpbCBkYXRldGltZSBkYXRlIG1vbnRoIHdlZWsgdGltZSBkYXRldGltZS1sb2NhbCBudW1iZXIgcmFuZ2UgY29sb3InLnNwbGl0KCcgJykpO1xuICAgICAgICAvKj4+aW5wdXR0eXBlcyovXG4gICAgfVxuICAgIC8qPj53ZWJmb3JtcyovXG5cblxuICAgIC8vIEVuZCBvZiB0ZXN0IGRlZmluaXRpb25zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiAgICAvLyBSdW4gdGhyb3VnaCBhbGwgdGVzdHMgYW5kIGRldGVjdCB0aGVpciBzdXBwb3J0IGluIHRoZSBjdXJyZW50IFVBLlxuICAgIC8vIHRvZG86IGh5cG90aGV0aWNhbGx5IHdlIGNvdWxkIGJlIGRvaW5nIGFuIGFycmF5IG9mIHRlc3RzIGFuZCB1c2UgYSBiYXNpYyBsb29wIGhlcmUuXG4gICAgZm9yICggdmFyIGZlYXR1cmUgaW4gdGVzdHMgKSB7XG4gICAgICAgIGlmICggaGFzT3duUHJvcCh0ZXN0cywgZmVhdHVyZSkgKSB7XG4gICAgICAgICAgICAvLyBydW4gdGhlIHRlc3QsIHRocm93IHRoZSByZXR1cm4gdmFsdWUgaW50byB0aGUgTW9kZXJuaXpyLFxuICAgICAgICAgICAgLy8gICB0aGVuIGJhc2VkIG9uIHRoYXQgYm9vbGVhbiwgZGVmaW5lIGFuIGFwcHJvcHJpYXRlIGNsYXNzTmFtZVxuICAgICAgICAgICAgLy8gICBhbmQgcHVzaCBpdCBpbnRvIGFuIGFycmF5IG9mIGNsYXNzZXMgd2UnbGwgam9pbiBsYXRlci5cbiAgICAgICAgICAgIGZlYXR1cmVOYW1lICA9IGZlYXR1cmUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIE1vZGVybml6cltmZWF0dXJlTmFtZV0gPSB0ZXN0c1tmZWF0dXJlXSgpO1xuXG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goKE1vZGVybml6cltmZWF0dXJlTmFtZV0gPyAnJyA6ICduby0nKSArIGZlYXR1cmVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qPj53ZWJmb3JtcyovXG4gICAgLy8gaW5wdXQgdGVzdHMgbmVlZCB0byBydW4uXG4gICAgTW9kZXJuaXpyLmlucHV0IHx8IHdlYmZvcm1zKCk7XG4gICAgLyo+PndlYmZvcm1zKi9cblxuXG4gICAgLyoqXG4gICAgICogYWRkVGVzdCBhbGxvd3MgdGhlIHVzZXIgdG8gZGVmaW5lIHRoZWlyIG93biBmZWF0dXJlIHRlc3RzXG4gICAgICogdGhlIHJlc3VsdCB3aWxsIGJlIGFkZGVkIG9udG8gdGhlIE1vZGVybml6ciBvYmplY3QsXG4gICAgICogYXMgd2VsbCBhcyBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWUgc2V0IG9uIHRoZSBodG1sIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmZWF0dXJlIC0gU3RyaW5nIG5hbWluZyB0aGUgZmVhdHVyZVxuICAgICAqIEBwYXJhbSB0ZXN0IC0gRnVuY3Rpb24gcmV0dXJuaW5nIHRydWUgaWYgZmVhdHVyZSBpcyBzdXBwb3J0ZWQsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgICBNb2Rlcm5penIuYWRkVGVzdCA9IGZ1bmN0aW9uICggZmVhdHVyZSwgdGVzdCApIHtcbiAgICAgICBpZiAoIHR5cGVvZiBmZWF0dXJlID09ICdvYmplY3QnICkge1xuICAgICAgICAgZm9yICggdmFyIGtleSBpbiBmZWF0dXJlICkge1xuICAgICAgICAgICBpZiAoIGhhc093blByb3AoIGZlYXR1cmUsIGtleSApICkge1xuICAgICAgICAgICAgIE1vZGVybml6ci5hZGRUZXN0KCBrZXksIGZlYXR1cmVbIGtleSBdICk7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICBmZWF0dXJlID0gZmVhdHVyZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICBpZiAoIE1vZGVybml6cltmZWF0dXJlXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAvLyB3ZSdyZSBnb2luZyB0byBxdWl0IGlmIHlvdSdyZSB0cnlpbmcgdG8gb3ZlcndyaXRlIGFuIGV4aXN0aW5nIHRlc3RcbiAgICAgICAgICAgLy8gaWYgd2Ugd2VyZSB0byBhbGxvdyBpdCwgd2UnZCBkbyB0aGlzOlxuICAgICAgICAgICAvLyAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCJcXFxcYihuby0pP1wiICsgZmVhdHVyZSArIFwiXFxcXGJcIik7XG4gICAgICAgICAgIC8vICAgZG9jRWxlbWVudC5jbGFzc05hbWUgPSBkb2NFbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKCByZSwgJycgKTtcbiAgICAgICAgICAgLy8gYnV0LCBubyBybHksIHN0dWZmICdlbS5cbiAgICAgICAgICAgcmV0dXJuIE1vZGVybml6cjtcbiAgICAgICAgIH1cblxuICAgICAgICAgdGVzdCA9IHR5cGVvZiB0ZXN0ID09ICdmdW5jdGlvbicgPyB0ZXN0KCkgOiB0ZXN0O1xuXG4gICAgICAgICBpZiAodHlwZW9mIGVuYWJsZUNsYXNzZXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZW5hYmxlQ2xhc3Nlcykge1xuICAgICAgICAgICBkb2NFbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyAodGVzdCA/ICcnIDogJ25vLScpICsgZmVhdHVyZTtcbiAgICAgICAgIH1cbiAgICAgICAgIE1vZGVybml6cltmZWF0dXJlXSA9IHRlc3Q7XG5cbiAgICAgICB9XG5cbiAgICAgICByZXR1cm4gTW9kZXJuaXpyOyAvLyBhbGxvdyBjaGFpbmluZy5cbiAgICAgfTtcblxuXG4gICAgLy8gUmVzZXQgbW9kRWxlbS5jc3NUZXh0IHRvIG5vdGhpbmcgdG8gcmVkdWNlIG1lbW9yeSBmb290cHJpbnQuXG4gICAgc2V0Q3NzKCcnKTtcbiAgICBtb2RFbGVtID0gaW5wdXRFbGVtID0gbnVsbDtcblxuICAgIC8qPj5zaGl2Ki9cbiAgICAvKipcbiAgICAgKiBAcHJlc2VydmUgSFRNTDUgU2hpdiBwcmV2My43LjEgfCBAYWZhcmthcyBAamRhbHRvbiBAam9uX25lYWwgQHJlbSB8IE1JVC9HUEwyIExpY2Vuc2VkXG4gICAgICovXG4gICAgOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50KSB7XG4gICAgICAgIC8qanNoaW50IGV2aWw6dHJ1ZSAqL1xuICAgICAgICAvKiogdmVyc2lvbiAqL1xuICAgICAgICB2YXIgdmVyc2lvbiA9ICczLjcuMCc7XG5cbiAgICAgICAgLyoqIFByZXNldCBvcHRpb25zICovXG4gICAgICAgIHZhciBvcHRpb25zID0gd2luZG93Lmh0bWw1IHx8IHt9O1xuXG4gICAgICAgIC8qKiBVc2VkIHRvIHNraXAgcHJvYmxlbSBlbGVtZW50cyAqL1xuICAgICAgICB2YXIgcmVTa2lwID0gL148fF4oPzpidXR0b258bWFwfHNlbGVjdHx0ZXh0YXJlYXxvYmplY3R8aWZyYW1lfG9wdGlvbnxvcHRncm91cCkkL2k7XG5cbiAgICAgICAgLyoqIE5vdCBhbGwgZWxlbWVudHMgY2FuIGJlIGNsb25lZCBpbiBJRSAqKi9cbiAgICAgICAgdmFyIHNhdmVDbG9uZXMgPSAvXig/OmF8Ynxjb2RlfGRpdnxmaWVsZHNldHxoMXxoMnxoM3xoNHxoNXxoNnxpfGxhYmVsfGxpfG9sfHB8cXxzcGFufHN0cm9uZ3xzdHlsZXx0YWJsZXx0Ym9keXx0ZHx0aHx0cnx1bCkkL2k7XG5cbiAgICAgICAgLyoqIERldGVjdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIGRlZmF1bHQgaHRtbDUgc3R5bGVzICovXG4gICAgICAgIHZhciBzdXBwb3J0c0h0bWw1U3R5bGVzO1xuXG4gICAgICAgIC8qKiBOYW1lIG9mIHRoZSBleHBhbmRvLCB0byB3b3JrIHdpdGggbXVsdGlwbGUgZG9jdW1lbnRzIG9yIHRvIHJlLXNoaXYgb25lIGRvY3VtZW50ICovXG4gICAgICAgIHZhciBleHBhbmRvID0gJ19odG1sNXNoaXYnO1xuXG4gICAgICAgIC8qKiBUaGUgaWQgZm9yIHRoZSB0aGUgZG9jdW1lbnRzIGV4cGFuZG8gKi9cbiAgICAgICAgdmFyIGV4cGFuSUQgPSAwO1xuXG4gICAgICAgIC8qKiBDYWNoZWQgZGF0YSBmb3IgZWFjaCBkb2N1bWVudCAqL1xuICAgICAgICB2YXIgZXhwYW5kb0RhdGEgPSB7fTtcblxuICAgICAgICAvKiogRGV0ZWN0IHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdW5rbm93biBlbGVtZW50cyAqL1xuICAgICAgICB2YXIgc3VwcG9ydHNVbmtub3duRWxlbWVudHM7XG5cbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGEuaW5uZXJIVE1MID0gJzx4eXo+PC94eXo+JztcbiAgICAgICAgICAgIC8vaWYgdGhlIGhpZGRlbiBwcm9wZXJ0eSBpcyBpbXBsZW1lbnRlZCB3ZSBjYW4gYXNzdW1lLCB0aGF0IHRoZSBicm93c2VyIHN1cHBvcnRzIGJhc2ljIEhUTUw1IFN0eWxlc1xuICAgICAgICAgICAgc3VwcG9ydHNIdG1sNVN0eWxlcyA9ICgnaGlkZGVuJyBpbiBhKTtcblxuICAgICAgICAgICAgc3VwcG9ydHNVbmtub3duRWxlbWVudHMgPSBhLmNoaWxkTm9kZXMubGVuZ3RoID09IDEgfHwgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvLyBhc3NpZ24gYSBmYWxzZSBwb3NpdGl2ZSBpZiB1bmFibGUgdG8gc2hpdlxuICAgICAgICAgICAgICAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCkoJ2EnKTtcbiAgICAgICAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIGZyYWcuY2xvbmVOb2RlID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIGZyYWcuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgIHR5cGVvZiBmcmFnLmNyZWF0ZUVsZW1lbnQgPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAvLyBhc3NpZ24gYSBmYWxzZSBwb3NpdGl2ZSBpZiBkZXRlY3Rpb24gZmFpbHMgPT4gdW5hYmxlIHRvIHNoaXZcbiAgICAgICAgICAgIHN1cHBvcnRzSHRtbDVTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgc3VwcG9ydHNVbmtub3duRWxlbWVudHMgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KCkpO1xuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgc3R5bGUgc2hlZXQgd2l0aCB0aGUgZ2l2ZW4gQ1NTIHRleHQgYW5kIGFkZHMgaXQgdG8gdGhlIGRvY3VtZW50LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudC5cbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGNzc1RleHQgVGhlIENTUyB0ZXh0LlxuICAgICAgICAgKiBAcmV0dXJucyB7U3R5bGVTaGVldH0gVGhlIHN0eWxlIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBhZGRTdHlsZVNoZWV0KG93bmVyRG9jdW1lbnQsIGNzc1RleHQpIHtcbiAgICAgICAgICB2YXIgcCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLFxuICAgICAgICAgIHBhcmVudCA9IG93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSB8fCBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgIHAuaW5uZXJIVE1MID0gJ3g8c3R5bGU+JyArIGNzc1RleHQgKyAnPC9zdHlsZT4nO1xuICAgICAgICAgIHJldHVybiBwYXJlbnQuaW5zZXJ0QmVmb3JlKHAubGFzdENoaWxkLCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYGh0bWw1LmVsZW1lbnRzYCBhcyBhbiBhcnJheS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBBbiBhcnJheSBvZiBzaGl2ZWQgZWxlbWVudCBub2RlIG5hbWVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0RWxlbWVudHMoKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnRzID0gaHRtbDUuZWxlbWVudHM7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBlbGVtZW50cyA9PSAnc3RyaW5nJyA/IGVsZW1lbnRzLnNwbGl0KCcgJykgOiBlbGVtZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkYXRhIGFzc29jaWF0ZWQgdG8gdGhlIGdpdmVuIGRvY3VtZW50XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3Qgb2YgZGF0YS5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGV4cGFuZG9EYXRhW293bmVyRG9jdW1lbnRbZXhwYW5kb11dO1xuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgICAgICAgZXhwYW5JRCsrO1xuICAgICAgICAgICAgb3duZXJEb2N1bWVudFtleHBhbmRvXSA9IGV4cGFuSUQ7XG4gICAgICAgICAgICBleHBhbmRvRGF0YVtleHBhbklEXSA9IGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybnMgYSBzaGl2ZWQgZWxlbWVudCBmb3IgdGhlIGdpdmVuIG5vZGVOYW1lIGFuZCBkb2N1bWVudFxuICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5vZGVOYW1lIG5hbWUgb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgY29udGV4dCBkb2N1bWVudC5cbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gVGhlIHNoaXZlZCBlbGVtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChub2RlTmFtZSwgb3duZXJEb2N1bWVudCwgZGF0YSl7XG4gICAgICAgICAgaWYgKCFvd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICBvd25lckRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBnZXRFeHBhbmRvRGF0YShvd25lckRvY3VtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG5vZGU7XG5cbiAgICAgICAgICBpZiAoZGF0YS5jYWNoZVtub2RlTmFtZV0pIHtcbiAgICAgICAgICAgIG5vZGUgPSBkYXRhLmNhY2hlW25vZGVOYW1lXS5jbG9uZU5vZGUoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNhdmVDbG9uZXMudGVzdChub2RlTmFtZSkpIHtcbiAgICAgICAgICAgIG5vZGUgPSAoZGF0YS5jYWNoZVtub2RlTmFtZV0gPSBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpKS5jbG9uZU5vZGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQXZvaWQgYWRkaW5nIHNvbWUgZWxlbWVudHMgdG8gZnJhZ21lbnRzIGluIElFIDwgOSBiZWNhdXNlXG4gICAgICAgICAgLy8gKiBBdHRyaWJ1dGVzIGxpa2UgYG5hbWVgIG9yIGB0eXBlYCBjYW5ub3QgYmUgc2V0L2NoYW5nZWQgb25jZSBhbiBlbGVtZW50XG4gICAgICAgICAgLy8gICBpcyBpbnNlcnRlZCBpbnRvIGEgZG9jdW1lbnQvZnJhZ21lbnRcbiAgICAgICAgICAvLyAqIExpbmsgZWxlbWVudHMgd2l0aCBgc3JjYCBhdHRyaWJ1dGVzIHRoYXQgYXJlIGluYWNjZXNzaWJsZSwgYXMgd2l0aFxuICAgICAgICAgIC8vICAgYSA0MDMgcmVzcG9uc2UsIHdpbGwgY2F1c2UgdGhlIHRhYi93aW5kb3cgdG8gY3Jhc2hcbiAgICAgICAgICAvLyAqIFNjcmlwdCBlbGVtZW50cyBhcHBlbmRlZCB0byBmcmFnbWVudHMgd2lsbCBleGVjdXRlIHdoZW4gdGhlaXIgYHNyY2BcbiAgICAgICAgICAvLyAgIG9yIGB0ZXh0YCBwcm9wZXJ0eSBpcyBzZXRcbiAgICAgICAgICByZXR1cm4gbm9kZS5jYW5IYXZlQ2hpbGRyZW4gJiYgIXJlU2tpcC50ZXN0KG5vZGVOYW1lKSAmJiAhbm9kZS50YWdVcm4gPyBkYXRhLmZyYWcuYXBwZW5kQ2hpbGQobm9kZSkgOiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldHVybnMgYSBzaGl2ZWQgRG9jdW1lbnRGcmFnbWVudCBmb3IgdGhlIGdpdmVuIGRvY3VtZW50XG4gICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBjb250ZXh0IGRvY3VtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc2hpdmVkIERvY3VtZW50RnJhZ21lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50KG93bmVyRG9jdW1lbnQsIGRhdGEpe1xuICAgICAgICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihzdXBwb3J0c1Vua25vd25FbGVtZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgIHZhciBjbG9uZSA9IGRhdGEuZnJhZy5jbG9uZU5vZGUoKSxcbiAgICAgICAgICBpID0gMCxcbiAgICAgICAgICBlbGVtcyA9IGdldEVsZW1lbnRzKCksXG4gICAgICAgICAgbCA9IGVsZW1zLmxlbmd0aDtcbiAgICAgICAgICBmb3IoO2k8bDtpKyspe1xuICAgICAgICAgICAgY2xvbmUuY3JlYXRlRWxlbWVudChlbGVtc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaGl2cyB0aGUgYGNyZWF0ZUVsZW1lbnRgIGFuZCBgY3JlYXRlRG9jdW1lbnRGcmFnbWVudGAgbWV0aG9kcyBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHNoaXZNZXRob2RzKG93bmVyRG9jdW1lbnQsIGRhdGEpIHtcbiAgICAgICAgICBpZiAoIWRhdGEuY2FjaGUpIHtcbiAgICAgICAgICAgIGRhdGEuY2FjaGUgPSB7fTtcbiAgICAgICAgICAgIGRhdGEuY3JlYXRlRWxlbSA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudDtcbiAgICAgICAgICAgIGRhdGEuY3JlYXRlRnJhZyA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudDtcbiAgICAgICAgICAgIGRhdGEuZnJhZyA9IGRhdGEuY3JlYXRlRnJhZygpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24obm9kZU5hbWUpIHtcbiAgICAgICAgICAgIC8vYWJvcnQgc2hpdlxuICAgICAgICAgICAgaWYgKCFodG1sNS5zaGl2TWV0aG9kcykge1xuICAgICAgICAgICAgICByZXR1cm4gZGF0YS5jcmVhdGVFbGVtKG5vZGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KG5vZGVOYW1lLCBvd25lckRvY3VtZW50LCBkYXRhKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50ID0gRnVuY3Rpb24oJ2gsZicsICdyZXR1cm4gZnVuY3Rpb24oKXsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFyIG49Zi5jbG9uZU5vZGUoKSxjPW4uY3JlYXRlRWxlbWVudDsnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaC5zaGl2TWV0aG9kcyYmKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVucm9sbCB0aGUgYGNyZWF0ZUVsZW1lbnRgIGNhbGxzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RWxlbWVudHMoKS5qb2luKCkucmVwbGFjZSgvW1xcd1xcLV0rL2csIGZ1bmN0aW9uKG5vZGVOYW1lKSB7XG4gICAgICAgICAgICBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpO1xuICAgICAgICAgICAgZGF0YS5mcmFnLmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuICdjKFwiJyArIG5vZGVOYW1lICsgJ1wiKSc7XG4gICAgICAgICAgfSkgK1xuICAgICAgICAgICAgJyk7cmV0dXJuIG59J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKShodG1sNSwgZGF0YS5mcmFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaGl2cyB0aGUgZ2l2ZW4gZG9jdW1lbnQuXG4gICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudCB0byBzaGl2LlxuICAgICAgICAgKiBAcmV0dXJucyB7RG9jdW1lbnR9IFRoZSBzaGl2ZWQgZG9jdW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzaGl2RG9jdW1lbnQob3duZXJEb2N1bWVudCkge1xuICAgICAgICAgIGlmICghb3duZXJEb2N1bWVudCkge1xuICAgICAgICAgICAgb3duZXJEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZGF0YSA9IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuXG4gICAgICAgICAgaWYgKGh0bWw1LnNoaXZDU1MgJiYgIXN1cHBvcnRzSHRtbDVTdHlsZXMgJiYgIWRhdGEuaGFzQ1NTKSB7XG4gICAgICAgICAgICBkYXRhLmhhc0NTUyA9ICEhYWRkU3R5bGVTaGVldChvd25lckRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVjdHMgYmxvY2sgZGlzcGxheSBub3QgZGVmaW5lZCBpbiBJRTYvNy84LzlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcnRpY2xlLGFzaWRlLGRpYWxvZyxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsaGVhZGVyLGhncm91cCxtYWluLG5hdixzZWN0aW9ue2Rpc3BsYXk6YmxvY2t9JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZHMgc3R5bGluZyBub3QgcHJlc2VudCBpbiBJRTYvNy84LzlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmt7YmFja2dyb3VuZDojRkYwO2NvbG9yOiMwMDB9JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZGVzIG5vbi1yZW5kZXJlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGVtcGxhdGV7ZGlzcGxheTpub25lfSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFzdXBwb3J0c1Vua25vd25FbGVtZW50cykge1xuICAgICAgICAgICAgc2hpdk1ldGhvZHMob3duZXJEb2N1bWVudCwgZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvd25lckRvY3VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgaHRtbDVgIG9iamVjdCBpcyBleHBvc2VkIHNvIHRoYXQgbW9yZSBlbGVtZW50cyBjYW4gYmUgc2hpdmVkIGFuZFxuICAgICAgICAgKiBleGlzdGluZyBzaGl2aW5nIGNhbiBiZSBkZXRlY3RlZCBvbiBpZnJhbWVzLlxuICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogLy8gb3B0aW9ucyBjYW4gYmUgY2hhbmdlZCBiZWZvcmUgdGhlIHNjcmlwdCBpcyBpbmNsdWRlZFxuICAgICAgICAgKiBodG1sNSA9IHsgJ2VsZW1lbnRzJzogJ21hcmsgc2VjdGlvbicsICdzaGl2Q1NTJzogZmFsc2UsICdzaGl2TWV0aG9kcyc6IGZhbHNlIH07XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaHRtbDUgPSB7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBbiBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIG5vZGUgbmFtZXMgb2YgdGhlIGVsZW1lbnRzIHRvIHNoaXYuXG4gICAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAgICogQHR5cGUgQXJyYXl8U3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ2VsZW1lbnRzJzogb3B0aW9ucy5lbGVtZW50cyB8fCAnYWJiciBhcnRpY2xlIGFzaWRlIGF1ZGlvIGJkaSBjYW52YXMgZGF0YSBkYXRhbGlzdCBkZXRhaWxzIGRpYWxvZyBmaWdjYXB0aW9uIGZpZ3VyZSBmb290ZXIgaGVhZGVyIGhncm91cCBtYWluIG1hcmsgbWV0ZXIgbmF2IG91dHB1dCBwcm9ncmVzcyBzZWN0aW9uIHN1bW1hcnkgdGVtcGxhdGUgdGltZSB2aWRlbycsXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBjdXJyZW50IHZlcnNpb24gb2YgaHRtbDVzaGl2XG4gICAgICAgICAgICovXG4gICAgICAgICAgJ3ZlcnNpb24nOiB2ZXJzaW9uLFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIEhUTUw1IHN0eWxlIHNoZWV0IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAgICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ3NoaXZDU1MnOiAob3B0aW9ucy5zaGl2Q1NTICE9PSBmYWxzZSksXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBJcyBlcXVhbCB0byB0cnVlIGlmIGEgYnJvd3NlciBzdXBwb3J0cyBjcmVhdGluZyB1bmtub3duL0hUTUw1IGVsZW1lbnRzXG4gICAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAgICogQHR5cGUgYm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgICdzdXBwb3J0c1Vua25vd25FbGVtZW50cyc6IHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzLFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIGRvY3VtZW50J3MgYGNyZWF0ZUVsZW1lbnRgIGFuZCBgY3JlYXRlRG9jdW1lbnRGcmFnbWVudGBcbiAgICAgICAgICAgKiBtZXRob2RzIHNob3VsZCBiZSBvdmVyd3JpdHRlbi5cbiAgICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ3NoaXZNZXRob2RzJzogKG9wdGlvbnMuc2hpdk1ldGhvZHMgIT09IGZhbHNlKSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEEgc3RyaW5nIHRvIGRlc2NyaWJlIHRoZSB0eXBlIG9mIGBodG1sNWAgb2JqZWN0IChcImRlZmF1bHRcIiBvciBcImRlZmF1bHQgcHJpbnRcIikuXG4gICAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ3R5cGUnOiAnZGVmYXVsdCcsXG5cbiAgICAgICAgICAvLyBzaGl2cyB0aGUgZG9jdW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgYGh0bWw1YCBvYmplY3Qgb3B0aW9uc1xuICAgICAgICAgICdzaGl2RG9jdW1lbnQnOiBzaGl2RG9jdW1lbnQsXG5cbiAgICAgICAgICAvL2NyZWF0ZXMgYSBzaGl2ZWQgZWxlbWVudFxuICAgICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG5cbiAgICAgICAgICAvL2NyZWF0ZXMgYSBzaGl2ZWQgZG9jdW1lbnRGcmFnbWVudFxuICAgICAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQ6IGNyZWF0ZURvY3VtZW50RnJhZ21lbnRcbiAgICAgICAgfTtcblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAvLyBleHBvc2UgaHRtbDVcbiAgICAgICAgd2luZG93Lmh0bWw1ID0gaHRtbDU7XG5cbiAgICAgICAgLy8gc2hpdiB0aGUgZG9jdW1lbnRcbiAgICAgICAgc2hpdkRvY3VtZW50KGRvY3VtZW50KTtcblxuICAgIH0odGhpcywgZG9jdW1lbnQpKTtcbiAgICAvKj4+c2hpdiovXG5cbiAgICAvLyBBc3NpZ24gcHJpdmF0ZSBwcm9wZXJ0aWVzIHRvIHRoZSByZXR1cm4gb2JqZWN0IHdpdGggcHJlZml4XG4gICAgTW9kZXJuaXpyLl92ZXJzaW9uICAgICAgPSB2ZXJzaW9uO1xuXG4gICAgLy8gZXhwb3NlIHRoZXNlIGZvciB0aGUgcGx1Z2luIEFQSS4gTG9vayBpbiB0aGUgc291cmNlIGZvciBob3cgdG8gam9pbigpIHRoZW0gYWdhaW5zdCB5b3VyIGlucHV0XG4gICAgLyo+PnByZWZpeGVzKi9cbiAgICBNb2Rlcm5penIuX3ByZWZpeGVzICAgICA9IHByZWZpeGVzO1xuICAgIC8qPj5wcmVmaXhlcyovXG4gICAgLyo+PmRvbXByZWZpeGVzKi9cbiAgICBNb2Rlcm5penIuX2RvbVByZWZpeGVzICA9IGRvbVByZWZpeGVzO1xuICAgIE1vZGVybml6ci5fY3Nzb21QcmVmaXhlcyAgPSBjc3NvbVByZWZpeGVzO1xuICAgIC8qPj5kb21wcmVmaXhlcyovXG5cbiAgICAvKj4+bXEqL1xuICAgIC8vIE1vZGVybml6ci5tcSB0ZXN0cyBhIGdpdmVuIG1lZGlhIHF1ZXJ5LCBsaXZlIGFnYWluc3QgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHdpbmRvd1xuICAgIC8vIEEgZmV3IGltcG9ydGFudCBub3RlczpcbiAgICAvLyAgICogSWYgYSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbWVkaWEgcXVlcmllcyBhdCBhbGwgKGVnLiBvbGRJRSkgdGhlIG1xKCkgd2lsbCBhbHdheXMgcmV0dXJuIGZhbHNlXG4gICAgLy8gICAqIEEgbWF4LXdpZHRoIG9yIG9yaWVudGF0aW9uIHF1ZXJ5IHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QgdGhlIGN1cnJlbnQgc3RhdGUsIHdoaWNoIG1heSBjaGFuZ2UgbGF0ZXIuXG4gICAgLy8gICAqIFlvdSBtdXN0IHNwZWNpZnkgdmFsdWVzLiBFZy4gSWYgeW91IGFyZSB0ZXN0aW5nIHN1cHBvcnQgZm9yIHRoZSBtaW4td2lkdGggbWVkaWEgcXVlcnkgdXNlOlxuICAgIC8vICAgICAgIE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDowKScpXG4gICAgLy8gdXNhZ2U6XG4gICAgLy8gTW9kZXJuaXpyLm1xKCdvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjgpJylcbiAgICBNb2Rlcm5penIubXEgICAgICAgICAgICA9IHRlc3RNZWRpYVF1ZXJ5O1xuICAgIC8qPj5tcSovXG5cbiAgICAvKj4+aGFzZXZlbnQqL1xuICAgIC8vIE1vZGVybml6ci5oYXNFdmVudCgpIGRldGVjdHMgc3VwcG9ydCBmb3IgYSBnaXZlbiBldmVudCwgd2l0aCBhbiBvcHRpb25hbCBlbGVtZW50IHRvIHRlc3Qgb25cbiAgICAvLyBNb2Rlcm5penIuaGFzRXZlbnQoJ2dlc3R1cmVzdGFydCcsIGVsZW0pXG4gICAgTW9kZXJuaXpyLmhhc0V2ZW50ICAgICAgPSBpc0V2ZW50U3VwcG9ydGVkO1xuICAgIC8qPj5oYXNldmVudCovXG5cbiAgICAvKj4+dGVzdHByb3AqL1xuICAgIC8vIE1vZGVybml6ci50ZXN0UHJvcCgpIGludmVzdGlnYXRlcyB3aGV0aGVyIGEgZ2l2ZW4gc3R5bGUgcHJvcGVydHkgaXMgcmVjb2duaXplZFxuICAgIC8vIE5vdGUgdGhhdCB0aGUgcHJvcGVydHkgbmFtZXMgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGUgY2FtZWxDYXNlIHZhcmlhbnQuXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RQcm9wKCdwb2ludGVyRXZlbnRzJylcbiAgICBNb2Rlcm5penIudGVzdFByb3AgICAgICA9IGZ1bmN0aW9uKHByb3Ape1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzKFtwcm9wXSk7XG4gICAgfTtcbiAgICAvKj4+dGVzdHByb3AqL1xuXG4gICAgLyo+PnRlc3RhbGxwcm9wcyovXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RBbGxQcm9wcygpIGludmVzdGlnYXRlcyB3aGV0aGVyIGEgZ2l2ZW4gc3R5bGUgcHJvcGVydHksXG4gICAgLy8gICBvciBhbnkgb2YgaXRzIHZlbmRvci1wcmVmaXhlZCB2YXJpYW50cywgaXMgcmVjb2duaXplZFxuICAgIC8vIE5vdGUgdGhhdCB0aGUgcHJvcGVydHkgbmFtZXMgbXVzdCBiZSBwcm92aWRlZCBpbiB0aGUgY2FtZWxDYXNlIHZhcmlhbnQuXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RBbGxQcm9wcygnYm94U2l6aW5nJylcbiAgICBNb2Rlcm5penIudGVzdEFsbFByb3BzICA9IHRlc3RQcm9wc0FsbDtcbiAgICAvKj4+dGVzdGFsbHByb3BzKi9cblxuXG4gICAgLyo+PnRlc3RzdHlsZXMqL1xuICAgIC8vIE1vZGVybml6ci50ZXN0U3R5bGVzKCkgYWxsb3dzIHlvdSB0byBhZGQgY3VzdG9tIHN0eWxlcyB0byB0aGUgZG9jdW1lbnQgYW5kIHRlc3QgYW4gZWxlbWVudCBhZnRlcndhcmRzXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RTdHlsZXMoJyNtb2Rlcm5penIgeyBwb3NpdGlvbjphYnNvbHV0ZSB9JywgZnVuY3Rpb24oZWxlbSwgcnVsZSl7IC4uLiB9KVxuICAgIE1vZGVybml6ci50ZXN0U3R5bGVzICAgID0gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXM7XG4gICAgLyo+PnRlc3RzdHlsZXMqL1xuXG5cbiAgICAvKj4+cHJlZml4ZWQqL1xuICAgIC8vIE1vZGVybml6ci5wcmVmaXhlZCgpIHJldHVybnMgdGhlIHByZWZpeGVkIG9yIG5vbnByZWZpeGVkIHByb3BlcnR5IG5hbWUgdmFyaWFudCBvZiB5b3VyIGlucHV0XG4gICAgLy8gTW9kZXJuaXpyLnByZWZpeGVkKCdib3hTaXppbmcnKSAvLyAnTW96Qm94U2l6aW5nJ1xuXG4gICAgLy8gUHJvcGVydGllcyBtdXN0IGJlIHBhc3NlZCBhcyBkb20tc3R5bGUgY2FtZWxjYXNlLCByYXRoZXIgdGhhbiBgYm94LXNpemluZ2AgaHlwZW50YXRlZCBzdHlsZS5cbiAgICAvLyBSZXR1cm4gdmFsdWVzIHdpbGwgYWxzbyBiZSB0aGUgY2FtZWxDYXNlIHZhcmlhbnQsIGlmIHlvdSBuZWVkIHRvIHRyYW5zbGF0ZSB0aGF0IHRvIGh5cGVuYXRlZCBzdHlsZSB1c2U6XG4gICAgLy9cbiAgICAvLyAgICAgc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgZnVuY3Rpb24oc3RyLG0xKXsgcmV0dXJuICctJyArIG0xLnRvTG93ZXJDYXNlKCk7IH0pLnJlcGxhY2UoL15tcy0vLCctbXMtJyk7XG5cbiAgICAvLyBJZiB5b3UncmUgdHJ5aW5nIHRvIGFzY2VydGFpbiB3aGljaCB0cmFuc2l0aW9uIGVuZCBldmVudCB0byBiaW5kIHRvLCB5b3UgbWlnaHQgZG8gc29tZXRoaW5nIGxpa2UuLi5cbiAgICAvL1xuICAgIC8vICAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgIC8vICAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAvLyAgICAgICAnTW96VHJhbnNpdGlvbicgICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgLy8gICAgICAgJ09UcmFuc2l0aW9uJyAgICAgIDogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAvLyAgICAgICAnbXNUcmFuc2l0aW9uJyAgICAgOiAnTVNUcmFuc2l0aW9uRW5kJyxcbiAgICAvLyAgICAgICAndHJhbnNpdGlvbicgICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgdHJhbnNFbmRFdmVudE5hbWUgPSB0cmFuc0VuZEV2ZW50TmFtZXNbIE1vZGVybml6ci5wcmVmaXhlZCgndHJhbnNpdGlvbicpIF07XG5cbiAgICBNb2Rlcm5penIucHJlZml4ZWQgICAgICA9IGZ1bmN0aW9uKHByb3AsIG9iaiwgZWxlbSl7XG4gICAgICBpZighb2JqKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwocHJvcCwgJ3BmeCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGVzdGluZyBET00gcHJvcGVydHkgZS5nLiBNb2Rlcm5penIucHJlZml4ZWQoJ3JlcXVlc3RBbmltYXRpb25GcmFtZScsIHdpbmRvdykgLy8gJ21velJlcXVlc3RBbmltYXRpb25GcmFtZSdcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbChwcm9wLCBvYmosIGVsZW0pO1xuICAgICAgfVxuICAgIH07XG4gICAgLyo+PnByZWZpeGVkKi9cblxuXG4gICAgLyo+PmNzc2NsYXNzZXMqL1xuICAgIC8vIFJlbW92ZSBcIm5vLWpzXCIgY2xhc3MgZnJvbSA8aHRtbD4gZWxlbWVudCwgaWYgaXQgZXhpc3RzOlxuICAgIGRvY0VsZW1lbnQuY2xhc3NOYW1lID0gZG9jRWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgvKF58XFxzKW5vLWpzKFxcc3wkKS8sICckMSQyJykgK1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBuZXcgY2xhc3NlcyB0byB0aGUgPGh0bWw+IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVuYWJsZUNsYXNzZXMgPyAnIGpzICcgKyBjbGFzc2VzLmpvaW4oJyAnKSA6ICcnKTtcbiAgICAvKj4+Y3NzY2xhc3NlcyovXG5cbiAgICByZXR1cm4gTW9kZXJuaXpyO1xuXG59KSh0aGlzLCB0aGlzLmRvY3VtZW50KTtcbiIsIi8qXG4gKiBGb3VuZGF0aW9uIFJlc3BvbnNpdmUgTGlicmFyeVxuICogaHR0cDovL2ZvdW5kYXRpb24uenVyYi5jb21cbiAqIENvcHlyaWdodCAyMDE0LCBaVVJCXG4gKiBGcmVlIHRvIHVzZSB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuKi9cblxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBoZWFkZXJfaGVscGVycyA9IGZ1bmN0aW9uIChjbGFzc19hcnJheSkge1xuICAgIHZhciBpID0gY2xhc3NfYXJyYXkubGVuZ3RoO1xuICAgIHZhciBoZWFkID0gJCgnaGVhZCcpO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGhlYWQuaGFzKCcuJyArIGNsYXNzX2FycmF5W2ldKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaGVhZC5hcHBlbmQoJzxtZXRhIGNsYXNzPVwiJyArIGNsYXNzX2FycmF5W2ldICsgJ1wiIC8+Jyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGhlYWRlcl9oZWxwZXJzKFtcbiAgICAnZm91bmRhdGlvbi1tcS1zbWFsbCcsXG4gICAgJ2ZvdW5kYXRpb24tbXEtc21hbGwtb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbWVkaXVtJyxcbiAgICAnZm91bmRhdGlvbi1tcS1tZWRpdW0tb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbGFyZ2UnLFxuICAgICdmb3VuZGF0aW9uLW1xLWxhcmdlLW9ubHknLFxuICAgICdmb3VuZGF0aW9uLW1xLXhsYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteGxhcmdlLW9ubHknLFxuICAgICdmb3VuZGF0aW9uLW1xLXh4bGFyZ2UnLFxuICAgICdmb3VuZGF0aW9uLWRhdGEtYXR0cmlidXRlLW5hbWVzcGFjZSddKTtcblxuICAvLyBFbmFibGUgRmFzdENsaWNrIGlmIHByZXNlbnRcblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodHlwZW9mIEZhc3RDbGljayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIERvbid0IGF0dGFjaCB0byBib2R5IGlmIHVuZGVmaW5lZFxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gcHJpdmF0ZSBGYXN0IFNlbGVjdG9yIHdyYXBwZXIsXG4gIC8vIHJldHVybnMgalF1ZXJ5IG9iamVjdC4gT25seSB1c2Ugd2hlcmVcbiAgLy8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IGF2YWlsYWJsZS5cbiAgdmFyIFMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNvbnQ7XG4gICAgICAgIGlmIChjb250ZXh0LmpxdWVyeSkge1xuICAgICAgICAgIGNvbnQgPSBjb250ZXh0WzBdO1xuICAgICAgICAgIGlmICghY29udCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnQgPSBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkKGNvbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICQoc2VsZWN0b3IsIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIE5hbWVzcGFjZSBmdW5jdGlvbnMuXG5cbiAgdmFyIGF0dHJfbmFtZSA9IGZ1bmN0aW9uIChpbml0KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGlmICghaW5pdCkge1xuICAgICAgYXJyLnB1c2goJ2RhdGEnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgIGFyci5wdXNoKHRoaXMubmFtZXNwYWNlKTtcbiAgICB9XG4gICAgYXJyLnB1c2godGhpcy5uYW1lKTtcblxuICAgIHJldHVybiBhcnIuam9pbignLScpO1xuICB9O1xuXG4gIHZhciBhZGRfbmFtZXNwYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnLScpLFxuICAgICAgICBpID0gcGFydHMubGVuZ3RoLFxuICAgICAgICBhcnIgPSBbXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIGFyci5wdXNoKHBhcnRzW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXJyLnB1c2godGhpcy5uYW1lc3BhY2UsIHBhcnRzW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnIucHVzaChwYXJ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKS5qb2luKCctJyk7XG4gIH07XG5cbiAgLy8gRXZlbnQgYmluZGluZyBhbmQgZGF0YS1vcHRpb25zIHVwZGF0aW5nLlxuXG4gIHZhciBiaW5kaW5ncyA9IGZ1bmN0aW9uIChtZXRob2QsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGJpbmQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICAgIHNob3VsZF9iaW5kX2V2ZW50cyA9ICEkdGhpcy5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG4gICAgICAgICAgJHRoaXMuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcsICQuZXh0ZW5kKHt9LCBzZWxmLnNldHRpbmdzLCAob3B0aW9ucyB8fCBtZXRob2QpLCBzZWxmLmRhdGFfb3B0aW9ucygkdGhpcykpKTtcblxuICAgICAgICAgIGlmIChzaG91bGRfYmluZF9ldmVudHMpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIGlmIChTKHRoaXMuc2NvcGUpLmlzKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyddJykpIHtcbiAgICAgIGJpbmQuY2FsbCh0aGlzLnNjb3BlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsnXScsIHRoaXMuc2NvcGUpLmVhY2goYmluZCk7XG4gICAgfVxuICAgIC8vICMgUGF0Y2ggdG8gZml4ICM1MDQzIHRvIG1vdmUgdGhpcyAqYWZ0ZXIqIHRoZSBpZi9lbHNlIGNsYXVzZSBpbiBvcmRlciBmb3IgQmFja2JvbmUgYW5kIHNpbWlsYXIgZnJhbWV3b3JrcyB0byBoYXZlIGltcHJvdmVkIGNvbnRyb2wgb3ZlciBldmVudCBiaW5kaW5nIGFuZCBkYXRhLW9wdGlvbnMgdXBkYXRpbmcuXG4gICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpc1ttZXRob2RdLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gIH07XG5cbiAgdmFyIHNpbmdsZV9pbWFnZV9sb2FkZWQgPSBmdW5jdGlvbiAoaW1hZ2UsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gbG9hZGVkICgpIHtcbiAgICAgIGNhbGxiYWNrKGltYWdlWzBdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kTG9hZCAoKSB7XG4gICAgICB0aGlzLm9uZSgnbG9hZCcsIGxvYWRlZCk7XG5cbiAgICAgIGlmICgvTVNJRSAoXFxkK1xcLlxcZCspOy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5hdHRyKCAnc3JjJyApLFxuICAgICAgICAgICAgcGFyYW0gPSBzcmMubWF0Y2goIC9cXD8vICkgPyAnJicgOiAnPyc7XG5cbiAgICAgICAgcGFyYW0gKz0gJ3JhbmRvbT0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5hdHRyKCdzcmMnLCBzcmMgKyBwYXJhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbWFnZS5hdHRyKCdzcmMnKSkge1xuICAgICAgbG9hZGVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGltYWdlWzBdLmNvbXBsZXRlIHx8IGltYWdlWzBdLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgIGxvYWRlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiaW5kTG9hZC5jYWxsKGltYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLyohIG1hdGNoTWVkaWEoKSBwb2x5ZmlsbCAtIFRlc3QgYSBDU1MgbWVkaWEgdHlwZS9xdWVyeSBpbiBKUy4gQXV0aG9ycyAmIGNvcHlyaWdodCAoYykgMjAxMjogU2NvdHQgSmVobCwgUGF1bCBJcmlzaCwgTmljaG9sYXMgWmFrYXMsIERhdmlkIEtuaWdodC4gRHVhbCBNSVQvQlNEIGxpY2Vuc2UgKi9cblxuICB3aW5kb3cubWF0Y2hNZWRpYSB8fCAod2luZG93Lm1hdGNoTWVkaWEgPSBmdW5jdGlvbigpIHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IG1hdGNoTWVkaXVtIGFwaSBzdWNoIGFzIElFIDkgYW5kIHdlYmtpdFxuICAgICAgdmFyIHN0eWxlTWVkaWEgPSAod2luZG93LnN0eWxlTWVkaWEgfHwgd2luZG93Lm1lZGlhKTtcblxuICAgICAgLy8gRm9yIHRob3NlIHRoYXQgZG9uJ3Qgc3VwcG9ydCBtYXRjaE1lZGl1bVxuICAgICAgaWYgKCFzdHlsZU1lZGlhKSB7XG4gICAgICAgICAgdmFyIHN0eWxlICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICAgICAgICAgICAgc2NyaXB0ICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF0sXG4gICAgICAgICAgICAgIGluZm8gICAgICAgID0gbnVsbDtcblxuICAgICAgICAgIHN0eWxlLnR5cGUgID0gJ3RleHQvY3NzJztcbiAgICAgICAgICBzdHlsZS5pZCAgICA9ICdtYXRjaG1lZGlhanMtdGVzdCc7XG5cbiAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3R5bGUsIHNjcmlwdCk7XG5cbiAgICAgICAgICAvLyAnc3R5bGUuY3VycmVudFN0eWxlJyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICd3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZScgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICAgIGluZm8gPSAoJ2dldENvbXB1dGVkU3R5bGUnIGluIHdpbmRvdykgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUoc3R5bGUsIG51bGwpIHx8IHN0eWxlLmN1cnJlbnRTdHlsZTtcblxuICAgICAgICAgIHN0eWxlTWVkaWEgPSB7XG4gICAgICAgICAgICAgIG1hdGNoTWVkaXVtOiBmdW5jdGlvbihtZWRpYSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRleHQgPSAnQG1lZGlhICcgKyBtZWRpYSArICd7ICNtYXRjaG1lZGlhanMtdGVzdCB7IHdpZHRoOiAxcHg7IH0gfSc7XG5cbiAgICAgICAgICAgICAgICAgIC8vICdzdHlsZS5zdHlsZVNoZWV0JyBpcyB1c2VkIGJ5IElFIDw9IDggYW5kICdzdHlsZS50ZXh0Q29udGVudCcgZm9yIGFsbCBvdGhlciBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vIFRlc3QgaWYgbWVkaWEgcXVlcnkgaXMgdHJ1ZSBvciBmYWxzZVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZm8ud2lkdGggPT09ICcxcHgnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbWF0Y2hlczogc3R5bGVNZWRpYS5tYXRjaE1lZGl1bShtZWRpYSB8fCAnYWxsJyksXG4gICAgICAgICAgICAgIG1lZGlhOiBtZWRpYSB8fCAnYWxsJ1xuICAgICAgICAgIH07XG4gICAgICB9O1xuICB9KCkpO1xuXG4gIC8qXG4gICAqIGpxdWVyeS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2duYXJmMzcvanF1ZXJ5LXJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBSZXF1aXJlcyBqUXVlcnkgMS44K1xuICAgKlxuICAgKiBDb3B5cmlnaHQgKGMpIDIwMTIgQ29yZXkgRnJhbmdcbiAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICAgKi9cblxuICAoZnVuY3Rpb24oalF1ZXJ5KSB7XG5cblxuICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYWRhcHRlZCBmcm9tIEVyaWsgTcO2bGxlclxuICAvLyBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gIC8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gIC8vIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcblxuICB2YXIgYW5pbWF0aW5nLFxuICAgICAgbGFzdFRpbWUgPSAwLFxuICAgICAgdmVuZG9ycyA9IFsnd2Via2l0JywgJ21veiddLFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLFxuICAgICAganF1ZXJ5RnhBdmFpbGFibGUgPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGpRdWVyeS5meDtcblxuICBmb3IgKDsgbGFzdFRpbWUgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmVxdWVzdEFuaW1hdGlvbkZyYW1lOyBsYXN0VGltZSsrKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdDYW5jZWxBbmltYXRpb25GcmFtZScgXSB8fFxuICAgICAgd2luZG93WyB2ZW5kb3JzW2xhc3RUaW1lXSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gIH1cblxuICBmdW5jdGlvbiByYWYoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG5cbiAgICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgICBqUXVlcnkuZngudGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAvLyB1c2UgckFGXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBjYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmIChqcXVlcnlGeEF2YWlsYWJsZSkge1xuICAgICAgalF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIGlmICh0aW1lcigpICYmIGpRdWVyeS50aW1lcnMucHVzaCh0aW1lcikgJiYgIWFuaW1hdGluZykge1xuICAgICAgICAgIGFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgICAgcmFmKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHBvbHlmaWxsXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSksXG4gICAgICAgIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcblxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuXG4gIH1cblxuICB9KCAkICkpO1xuXG4gIGZ1bmN0aW9uIHJlbW92ZVF1b3RlcyAoc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnIHx8IHN0cmluZyBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL15bJ1xcXFwvXCJdK3woO1xccz99KSt8WydcXFxcL1wiXSskL2csICcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9XG5cbiAgd2luZG93LkZvdW5kYXRpb24gPSB7XG4gICAgbmFtZSA6ICdGb3VuZGF0aW9uJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgbWVkaWFfcXVlcmllcyA6IHtcbiAgICAgICdzbWFsbCcgICAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS1zbWFsbCcpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3NtYWxsLW9ubHknICA6IFMoJy5mb3VuZGF0aW9uLW1xLXNtYWxsLW9ubHknKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdtZWRpdW0nICAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS1tZWRpdW0nKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdtZWRpdW0tb25seScgOiBTKCcuZm91bmRhdGlvbi1tcS1tZWRpdW0tb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ2xhcmdlJyAgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLWxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnbGFyZ2Utb25seScgIDogUygnLmZvdW5kYXRpb24tbXEtbGFyZ2Utb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3hsYXJnZScgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLXhsYXJnZScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ3hsYXJnZS1vbmx5JyA6IFMoJy5mb3VuZGF0aW9uLW1xLXhsYXJnZS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneHhsYXJnZScgICAgIDogUygnLmZvdW5kYXRpb24tbXEteHhsYXJnZScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpXG4gICAgfSxcblxuICAgIHN0eWxlc2hlZXQgOiAkKCc8c3R5bGU+PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpWzBdLnNoZWV0LFxuXG4gICAgZ2xvYmFsIDoge1xuICAgICAgbmFtZXNwYWNlIDogdW5kZWZpbmVkXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIGxpYnJhcmllcywgbWV0aG9kLCBvcHRpb25zLCByZXNwb25zZSkge1xuICAgICAgdmFyIGFyZ3MgPSBbc2NvcGUsIG1ldGhvZCwgb3B0aW9ucywgcmVzcG9uc2VdLFxuICAgICAgICAgIHJlc3BvbnNlcyA9IFtdO1xuXG4gICAgICAvLyBjaGVjayBSVExcbiAgICAgIHRoaXMucnRsID0gL3J0bC9pLnRlc3QoUygnaHRtbCcpLmF0dHIoJ2RpcicpKTtcblxuICAgICAgLy8gc2V0IGZvdW5kYXRpb24gZ2xvYmFsIHNjb3BlXG4gICAgICB0aGlzLnNjb3BlID0gc2NvcGUgfHwgdGhpcy5zY29wZTtcblxuICAgICAgdGhpcy5zZXRfbmFtZXNwYWNlKCk7XG5cbiAgICAgIGlmIChsaWJyYXJpZXMgJiYgdHlwZW9mIGxpYnJhcmllcyA9PT0gJ3N0cmluZycgJiYgIS9yZWZsb3cvaS50ZXN0KGxpYnJhcmllcykpIHtcbiAgICAgICAgaWYgKHRoaXMubGlicy5oYXNPd25Qcm9wZXJ0eShsaWJyYXJpZXMpKSB7XG4gICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5pbml0X2xpYihsaWJyYXJpZXMsIGFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgbGliIGluIHRoaXMubGlicykge1xuICAgICAgICAgIHJlc3BvbnNlcy5wdXNoKHRoaXMuaW5pdF9saWIobGliLCBsaWJyYXJpZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBTKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIFMod2luZG93KVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uY2xlYXJpbmcnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uZHJvcGRvd24nKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uZXF1YWxpemVyJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLmludGVyY2hhbmdlJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLmpveXJpZGUnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4ubWFnZWxsYW4nKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4udG9wYmFyJylcbiAgICAgICAgICAudHJpZ2dlcigncmVzaXplLmZuZHRuLnNsaWRlcicpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzY29wZTtcbiAgICB9LFxuXG4gICAgaW5pdF9saWIgOiBmdW5jdGlvbiAobGliLCBhcmdzKSB7XG4gICAgICBpZiAodGhpcy5saWJzLmhhc093blByb3BlcnR5KGxpYikpIHtcbiAgICAgICAgdGhpcy5wYXRjaCh0aGlzLmxpYnNbbGliXSk7XG5cbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5oYXNPd25Qcm9wZXJ0eShsaWIpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMubGlic1tsaWJdLnNldHRpbmdzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5zZXR0aW5ncywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubGlic1tsaWJdLmRlZmF1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLmxpYnNbbGliXS5kZWZhdWx0cywgYXJnc1tsaWJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5saWJzW2xpYl0uaW5pdC5hcHBseSh0aGlzLmxpYnNbbGliXSwgW3RoaXMuc2NvcGUsIGFyZ3NbbGliXV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJncyA9IGFyZ3MgaW5zdGFuY2VvZiBBcnJheSA/IGFyZ3MgOiBuZXcgQXJyYXkoYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpYnNbbGliXS5pbml0LmFwcGx5KHRoaXMubGlic1tsaWJdLCBhcmdzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgIH0sXG5cbiAgICBwYXRjaCA6IGZ1bmN0aW9uIChsaWIpIHtcbiAgICAgIGxpYi5zY29wZSA9IHRoaXMuc2NvcGU7XG4gICAgICBsaWIubmFtZXNwYWNlID0gdGhpcy5nbG9iYWwubmFtZXNwYWNlO1xuICAgICAgbGliLnJ0bCA9IHRoaXMucnRsO1xuICAgICAgbGliWydkYXRhX29wdGlvbnMnXSA9IHRoaXMudXRpbHMuZGF0YV9vcHRpb25zO1xuICAgICAgbGliWydhdHRyX25hbWUnXSA9IGF0dHJfbmFtZTtcbiAgICAgIGxpYlsnYWRkX25hbWVzcGFjZSddID0gYWRkX25hbWVzcGFjZTtcbiAgICAgIGxpYlsnYmluZGluZ3MnXSA9IGJpbmRpbmdzO1xuICAgICAgbGliWydTJ10gPSB0aGlzLnV0aWxzLlM7XG4gICAgfSxcblxuICAgIGluaGVyaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZHMpIHtcbiAgICAgIHZhciBtZXRob2RzX2FyciA9IG1ldGhvZHMuc3BsaXQoJyAnKSxcbiAgICAgICAgICBpID0gbWV0aG9kc19hcnIubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLnV0aWxzLmhhc093blByb3BlcnR5KG1ldGhvZHNfYXJyW2ldKSkge1xuICAgICAgICAgIHNjb3BlW21ldGhvZHNfYXJyW2ldXSA9IHRoaXMudXRpbHNbbWV0aG9kc19hcnJbaV1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldF9uYW1lc3BhY2UgOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRG9uJ3QgYm90aGVyIHJlYWRpbmcgdGhlIG5hbWVzcGFjZSBvdXQgb2YgdGhlIG1ldGEgdGFnXG4gICAgICAvLyAgICBpZiB0aGUgbmFtZXNwYWNlIGhhcyBiZWVuIHNldCBnbG9iYWxseSBpbiBqYXZhc2NyaXB0XG4gICAgICAvL1xuICAgICAgLy8gRXhhbXBsZTpcbiAgICAgIC8vICAgIEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZSA9ICdteS1uYW1lc3BhY2UnO1xuICAgICAgLy8gb3IgbWFrZSBpdCBhbiBlbXB0eSBzdHJpbmc6XG4gICAgICAvLyAgICBGb3VuZGF0aW9uLmdsb2JhbC5uYW1lc3BhY2UgPSAnJztcbiAgICAgIC8vXG4gICAgICAvL1xuXG4gICAgICAvLyBJZiB0aGUgbmFtZXNwYWNlIGhhcyBub3QgYmVlbiBzZXQgKGlzIHVuZGVmaW5lZCksIHRyeSB0byByZWFkIGl0IG91dCBvZiB0aGUgbWV0YSBlbGVtZW50LlxuICAgICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZ2xvYmFsbHkgZGVmaW5lZCBuYW1lc3BhY2UsIGV2ZW4gaWYgaXQncyBlbXB0eSAoJycpXG4gICAgICB2YXIgbmFtZXNwYWNlID0gKCB0aGlzLmdsb2JhbC5uYW1lc3BhY2UgPT09IHVuZGVmaW5lZCApID8gJCgnLmZvdW5kYXRpb24tZGF0YS1hdHRyaWJ1dGUtbmFtZXNwYWNlJykuY3NzKCdmb250LWZhbWlseScpIDogdGhpcy5nbG9iYWwubmFtZXNwYWNlO1xuXG4gICAgICAvLyBGaW5hbGx5LCBpZiB0aGUgbmFtc2VwYWNlIGlzIGVpdGhlciB1bmRlZmluZWQgb3IgZmFsc2UsIHNldCBpdCB0byBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBuYW1lc3BhY2UgdmFsdWUuXG4gICAgICB0aGlzLmdsb2JhbC5uYW1lc3BhY2UgPSAoIG5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkIHx8IC9mYWxzZS9pLnRlc3QobmFtZXNwYWNlKSApID8gJycgOiBuYW1lc3BhY2U7XG4gICAgfSxcblxuICAgIGxpYnMgOiB7fSxcblxuICAgIC8vIG1ldGhvZHMgdGhhdCBjYW4gYmUgaW5oZXJpdGVkIGluIGxpYnJhcmllc1xuICAgIHV0aWxzIDoge1xuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEZhc3QgU2VsZWN0b3Igd3JhcHBlciByZXR1cm5zIGpRdWVyeSBvYmplY3QuIE9ubHkgdXNlIHdoZXJlIGdldEVsZW1lbnRCeUlkXG4gICAgICAvLyAgICBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIFNlbGVjdG9yIChTdHJpbmcpOiBDU1Mgc2VsZWN0b3IgZGVzY3JpYmluZyB0aGUgZWxlbWVudChzKSB0byBiZVxuICAgICAgLy8gICAgcmV0dXJuZWQgYXMgYSBqUXVlcnkgb2JqZWN0LlxuICAgICAgLy9cbiAgICAgIC8vICAgIFNjb3BlIChTdHJpbmcpOiBDU1Mgc2VsZWN0b3IgZGVzY3JpYmluZyB0aGUgYXJlYSB0byBiZSBzZWFyY2hlZC4gRGVmYXVsdFxuICAgICAgLy8gICAgaXMgZG9jdW1lbnQuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIEVsZW1lbnQgKGpRdWVyeSBPYmplY3QpOiBqUXVlcnkgb2JqZWN0IGNvbnRhaW5pbmcgZWxlbWVudHMgbWF0Y2hpbmcgdGhlXG4gICAgICAvLyAgICBzZWxlY3RvciB3aXRoaW4gdGhlIHNjb3BlLlxuICAgICAgUyA6IFMsXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRXhlY3V0ZXMgYSBmdW5jdGlvbiBhIG1heCBvZiBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgRnVuYyAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWQuXG4gICAgICAvL1xuICAgICAgLy8gICAgRGVsYXkgKEludGVnZXIpOiBGdW5jdGlvbiBleGVjdXRpb24gdGhyZXNob2xkIGluIG1pbGxpc2Vjb25kcy5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgTGF6eV9mdW5jdGlvbiAoRnVuY3Rpb24pOiBGdW5jdGlvbiB3aXRoIHRocm90dGxpbmcgYXBwbGllZC5cbiAgICAgIHRocm90dGxlIDogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5KSB7XG4gICAgICAgIHZhciB0aW1lciA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgICBpZiAodGltZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRXhlY3V0ZXMgYSBmdW5jdGlvbiB3aGVuIGl0IHN0b3BzIGJlaW5nIGludm9rZWQgZm9yIG4gc2Vjb25kc1xuICAgICAgLy8gICAgTW9kaWZpZWQgdmVyc2lvbiBvZiBfLmRlYm91bmNlKCkgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBGdW5jIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBEZWxheSAoSW50ZWdlcik6IEZ1bmN0aW9uIGV4ZWN1dGlvbiB0aHJlc2hvbGQgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgLy9cbiAgICAgIC8vICAgIEltbWVkaWF0ZSAoQm9vbCk6IFdoZXRoZXIgdGhlIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZ1xuICAgICAgLy8gICAgb2YgdGhlIGRlbGF5IGluc3RlYWQgb2YgdGhlIGVuZC4gRGVmYXVsdCBpcyBmYWxzZS5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgTGF6eV9mdW5jdGlvbiAoRnVuY3Rpb24pOiBGdW5jdGlvbiB3aXRoIGRlYm91bmNpbmcgYXBwbGllZC5cbiAgICAgIGRlYm91bmNlIDogZnVuY3Rpb24gKGZ1bmMsIGRlbGF5LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCBkZWxheSk7XG4gICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIFBhcnNlcyBkYXRhLW9wdGlvbnMgYXR0cmlidXRlXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgRWwgKGpRdWVyeSBPYmplY3QpOiBFbGVtZW50IHRvIGJlIHBhcnNlZC5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgT3B0aW9ucyAoSmF2YXNjcmlwdCBPYmplY3QpOiBDb250ZW50cyBvZiB0aGUgZWxlbWVudCdzIGRhdGEtb3B0aW9uc1xuICAgICAgLy8gICAgYXR0cmlidXRlLlxuICAgICAgZGF0YV9vcHRpb25zIDogZnVuY3Rpb24gKGVsLCBkYXRhX2F0dHJfbmFtZSkge1xuICAgICAgICBkYXRhX2F0dHJfbmFtZSA9IGRhdGFfYXR0cl9uYW1lIHx8ICdvcHRpb25zJztcbiAgICAgICAgdmFyIG9wdHMgPSB7fSwgaWksIHAsIG9wdHNfYXJyLFxuICAgICAgICAgICAgZGF0YV9vcHRpb25zID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSBGb3VuZGF0aW9uLmdsb2JhbC5uYW1lc3BhY2U7XG5cbiAgICAgICAgICAgICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmRhdGEobmFtZXNwYWNlICsgJy0nICsgZGF0YV9hdHRyX25hbWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGVsLmRhdGEoZGF0YV9hdHRyX25hbWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2FjaGVkX29wdGlvbnMgPSBkYXRhX29wdGlvbnMoZWwpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FjaGVkX29wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlZF9vcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0c19hcnIgPSAoY2FjaGVkX29wdGlvbnMgfHwgJzonKS5zcGxpdCgnOycpO1xuICAgICAgICBpaSA9IG9wdHNfYXJyLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiBpc051bWJlciAobykge1xuICAgICAgICAgIHJldHVybiAhaXNOYU4gKG8gLSAwKSAmJiBvICE9PSBudWxsICYmIG8gIT09ICcnICYmIG8gIT09IGZhbHNlICYmIG8gIT09IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0cmltIChzdHIpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnRyaW0oc3RyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChpaS0tKSB7XG4gICAgICAgICAgcCA9IG9wdHNfYXJyW2lpXS5zcGxpdCgnOicpO1xuICAgICAgICAgIHAgPSBbcFswXSwgcC5zbGljZSgxKS5qb2luKCc6JyldO1xuXG4gICAgICAgICAgaWYgKC90cnVlL2kudGVzdChwWzFdKSkge1xuICAgICAgICAgICAgcFsxXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvZmFsc2UvaS50ZXN0KHBbMV0pKSB7XG4gICAgICAgICAgICBwWzFdID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc051bWJlcihwWzFdKSkge1xuICAgICAgICAgICAgaWYgKHBbMV0uaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgICBwWzFdID0gcGFyc2VJbnQocFsxXSwgMTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcFsxXSA9IHBhcnNlRmxvYXQocFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHAubGVuZ3RoID09PSAyICYmIHBbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgb3B0c1t0cmltKHBbMF0pXSA9IHRyaW0ocFsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEFkZHMgSlMtcmVjb2duaXphYmxlIG1lZGlhIHF1ZXJpZXNcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBNZWRpYSAoU3RyaW5nKTogS2V5IHN0cmluZyBmb3IgdGhlIG1lZGlhIHF1ZXJ5IHRvIGJlIHN0b3JlZCBhcyBpblxuICAgICAgLy8gICAgRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzXG4gICAgICAvL1xuICAgICAgLy8gICAgQ2xhc3MgKFN0cmluZyk6IENsYXNzIG5hbWUgZm9yIHRoZSBnZW5lcmF0ZWQgPG1ldGE+IHRhZ1xuICAgICAgcmVnaXN0ZXJfbWVkaWEgOiBmdW5jdGlvbiAobWVkaWEsIG1lZGlhX2NsYXNzKSB7XG4gICAgICAgIGlmIChGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCc8bWV0YSBjbGFzcz1cIicgKyBtZWRpYV9jbGFzcyArICdcIi8+Jyk7XG4gICAgICAgICAgRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXSA9IHJlbW92ZVF1b3RlcygkKCcuJyArIG1lZGlhX2NsYXNzKS5jc3MoJ2ZvbnQtZmFtaWx5JykpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyBEZXNjcmlwdGlvbjpcbiAgICAgIC8vICAgIEFkZCBjdXN0b20gQ1NTIHdpdGhpbiBhIEpTLWRlZmluZWQgbWVkaWEgcXVlcnlcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBSdWxlIChTdHJpbmcpOiBDU1MgcnVsZSB0byBiZSBhcHBlbmRlZCB0byB0aGUgZG9jdW1lbnQuXG4gICAgICAvL1xuICAgICAgLy8gICAgTWVkaWEgKFN0cmluZyk6IE9wdGlvbmFsIG1lZGlhIHF1ZXJ5IHN0cmluZyBmb3IgdGhlIENTUyBydWxlIHRvIGJlXG4gICAgICAvLyAgICBuZXN0ZWQgdW5kZXIuXG4gICAgICBhZGRfY3VzdG9tX3J1bGUgOiBmdW5jdGlvbiAocnVsZSwgbWVkaWEpIHtcbiAgICAgICAgaWYgKG1lZGlhID09PSB1bmRlZmluZWQgJiYgRm91bmRhdGlvbi5zdHlsZXNoZWV0KSB7XG4gICAgICAgICAgRm91bmRhdGlvbi5zdHlsZXNoZWV0Lmluc2VydFJ1bGUocnVsZSwgRm91bmRhdGlvbi5zdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHF1ZXJ5ID0gRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzW21lZGlhXTtcblxuICAgICAgICAgIGlmIChxdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuaW5zZXJ0UnVsZSgnQG1lZGlhICcgK1xuICAgICAgICAgICAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdICsgJ3sgJyArIHJ1bGUgKyAnIH0nLCBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUGVyZm9ybXMgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGFuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZFxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEltYWdlIChqUXVlcnkgT2JqZWN0KTogSW1hZ2UocykgdG8gY2hlY2sgaWYgbG9hZGVkLlxuICAgICAgLy9cbiAgICAgIC8vICAgIENhbGxiYWNrIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiBpbWFnZSBpcyBmdWxseSBsb2FkZWQuXG4gICAgICBpbWFnZV9sb2FkZWQgOiBmdW5jdGlvbiAoaW1hZ2VzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICB1bmxvYWRlZCA9IGltYWdlcy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcGljdHVyZXNfaGFzX2hlaWdodChpbWFnZXMpIHtcbiAgICAgICAgICB2YXIgcGljdHVyZXNfbnVtYmVyID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSBwaWN0dXJlc19udW1iZXIgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYoaW1hZ2VzLmF0dHIoJ2hlaWdodCcpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodW5sb2FkZWQgPT09IDAgfHwgcGljdHVyZXNfaGFzX2hlaWdodChpbWFnZXMpKSB7XG4gICAgICAgICAgY2FsbGJhY2soaW1hZ2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGltYWdlcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzaW5nbGVfaW1hZ2VfbG9hZGVkKHNlbGYuUyh0aGlzKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW5sb2FkZWQgLT0gMTtcbiAgICAgICAgICAgIGlmICh1bmxvYWRlZCA9PT0gMCkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhpbWFnZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUmV0dXJucyBhIHJhbmRvbSwgYWxwaGFudW1lcmljIHN0cmluZ1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIExlbmd0aCAoSW50ZWdlcik6IExlbmd0aCBvZiBzdHJpbmcgdG8gYmUgZ2VuZXJhdGVkLiBEZWZhdWx0cyB0byByYW5kb21cbiAgICAgIC8vICAgIGludGVnZXIuXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIFJhbmQgKFN0cmluZyk6IFBzZXVkby1yYW5kb20sIGFscGhhbnVtZXJpYyBzdHJpbmcuXG4gICAgICByYW5kb21fc3RyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuZmlkeCkge1xuICAgICAgICAgIHRoaXMuZmlkeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVmaXggPSB0aGlzLnByZWZpeCB8fCBbKHRoaXMubmFtZSB8fCAnRicpLCAoK25ldyBEYXRlKS50b1N0cmluZygzNildLmpvaW4oJy0nKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyAodGhpcy5maWR4KyspLnRvU3RyaW5nKDM2KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgSGVscGVyIGZvciB3aW5kb3cubWF0Y2hNZWRpYVxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIG1xIChTdHJpbmcpOiBNZWRpYSBxdWVyeVxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICAoQm9vbGVhbik6IFdoZXRoZXIgdGhlIG1lZGlhIHF1ZXJ5IHBhc3NlcyBvciBub3RcbiAgICAgIG1hdGNoIDogZnVuY3Rpb24gKG1xKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShtcSkubWF0Y2hlcztcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgSGVscGVycyBmb3IgY2hlY2tpbmcgRm91bmRhdGlvbiBkZWZhdWx0IG1lZGlhIHF1ZXJpZXMgd2l0aCBKU1xuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICAoQm9vbGVhbik6IFdoZXRoZXIgdGhlIG1lZGlhIHF1ZXJ5IHBhc3NlcyBvciBub3RcblxuICAgICAgaXNfc21hbGxfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5zbWFsbCk7XG4gICAgICB9LFxuXG4gICAgICBpc19tZWRpdW1fdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pO1xuICAgICAgfSxcblxuICAgICAgaXNfbGFyZ2VfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5sYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc194bGFyZ2VfdXAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy54bGFyZ2UpO1xuICAgICAgfSxcblxuICAgICAgaXNfeHhsYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnh4bGFyZ2UpO1xuICAgICAgfSxcblxuICAgICAgaXNfc21hbGxfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzX21lZGl1bV91cCgpICYmICF0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfbWVkaXVtX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmICF0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfbGFyZ2Vfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgdGhpcy5pc19sYXJnZV91cCgpICYmICF0aGlzLmlzX3hsYXJnZV91cCgpICYmICF0aGlzLmlzX3h4bGFyZ2VfdXAoKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3hsYXJnZV9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc19tZWRpdW1fdXAoKSAmJiB0aGlzLmlzX2xhcmdlX3VwKCkgJiYgdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc194eGxhcmdlX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmIHRoaXMuaXNfbGFyZ2VfdXAoKSAmJiB0aGlzLmlzX3hsYXJnZV91cCgpICYmIHRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAkLmZuLmZvdW5kYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBGb3VuZGF0aW9uLmluaXQuYXBwbHkoRm91bmRhdGlvbiwgW3RoaXNdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KTtcbiAgfTtcblxufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5kcm9wZG93biA9IHtcbiAgICBuYW1lIDogJ2Ryb3Bkb3duJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBhY3RpdmVfY2xhc3MgOiAnb3BlbicsXG4gICAgICBkaXNhYmxlZF9jbGFzcyA6ICdkaXNhYmxlZCcsXG4gICAgICBtZWdhX2NsYXNzIDogJ21lZ2EnLFxuICAgICAgYWxpZ24gOiAnYm90dG9tJyxcbiAgICAgIGlzX2hvdmVyIDogZmFsc2UsXG4gICAgICBob3Zlcl90aW1lb3V0IDogMTUwLFxuICAgICAgb3BlbmVkIDogZnVuY3Rpb24gKCkge30sXG4gICAgICBjbG9zZWQgOiBmdW5jdGlvbiAoKSB7fVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAndGhyb3R0bGUnKTtcblxuICAgICAgJC5leHRlbmQodHJ1ZSwgdGhpcy5zZXR0aW5ncywgbWV0aG9kLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgUyA9IHNlbGYuUztcblxuICAgICAgUyh0aGlzLnNjb3BlKVxuICAgICAgICAub2ZmKCcuZHJvcGRvd24nKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBTKHRoaXMpLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgIGlmICghc2V0dGluZ3MuaXNfaG92ZXIgfHwgTW9kZXJuaXpyLnRvdWNoKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoUyh0aGlzKS5wYXJlbnQoJ1tkYXRhLXJldmVhbC1pZF0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYudG9nZ2xlKCQodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWVudGVyLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddLCBbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICBkcm9wZG93bixcbiAgICAgICAgICAgICAgdGFyZ2V0O1xuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dCk7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgZHJvcGRvd24gPSBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gJHRoaXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRyb3Bkb3duID0gJHRoaXM7XG4gICAgICAgICAgICB0YXJnZXQgPSBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnPVwiJyArIGRyb3Bkb3duLmF0dHIoJ2lkJykgKyAnXCJdJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gdGFyZ2V0LmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuXG4gICAgICAgICAgaWYgKFMoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpICYmIHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICBzZWxmLmNsb3NlYWxsLmNhbGwoc2VsZik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICBzZWxmLm9wZW4uYXBwbHkoc2VsZiwgW2Ryb3Bkb3duLCB0YXJnZXRdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5kcm9wZG93bicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSwgWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKTtcbiAgICAgICAgICB2YXIgc2V0dGluZ3M7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgICBzZXR0aW5ncyA9ICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIodHJ1ZSkgKyAnLWluaXQnKSB8fCBzZWxmLnNldHRpbmdzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciB0YXJnZXQgICA9IFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9XCInICsgUyh0aGlzKS5hdHRyKCdpZCcpICsgJ1wiXScpLFxuICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSkge1xuICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgUygnIycgKyAkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCAkdGhpcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LmJpbmQodGhpcyksIHNldHRpbmdzLmhvdmVyX3RpbWVvdXQpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLmRyb3Bkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpO1xuICAgICAgICAgIHZhciBsaW5rcyAgPSBwYXJlbnQuZmluZCgnYScpO1xuXG4gICAgICAgICAgaWYgKGxpbmtzLmxlbmd0aCA+IDAgJiYgcGFyZW50LmF0dHIoJ2FyaWEtYXV0b2Nsb3NlJykgIT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBkb2N1bWVudCAmJiAhJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChTKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIShTKGUudGFyZ2V0KS5kYXRhKCdyZXZlYWxJZCcpKSAmJlxuICAgICAgICAgICAgKHBhcmVudC5sZW5ndGggPiAwICYmIChTKGUudGFyZ2V0KS5pcygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpIHx8XG4gICAgICAgICAgICAgICQuY29udGFpbnMocGFyZW50LmZpcnN0KClbMF0sIGUudGFyZ2V0KSkpKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBTKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ29wZW5lZC5mbmR0bi5kcm9wZG93bicsICdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub3BlbmVkLmNhbGwodGhpcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xvc2VkLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5jbG9zZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIFMod2luZG93KVxuICAgICAgICAub2ZmKCcuZHJvcGRvd24nKVxuICAgICAgICAub24oJ3Jlc2l6ZS5mbmR0bi5kcm9wZG93bicsIHNlbGYudGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucmVzaXplLmNhbGwoc2VsZik7XG4gICAgICAgIH0sIDUwKSk7XG5cbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSxcblxuICAgIGNsb3NlIDogZnVuY3Rpb24gKGRyb3Bkb3duKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBkcm9wZG93bi5lYWNoKGZ1bmN0aW9uIChpZHgpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsX3RhcmdldCA9ICQoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9JyArIGRyb3Bkb3duW2lkeF0uaWQgKyAnXScpIHx8ICQoJ2FyaWEtY29udHJvbHM9JyArIGRyb3Bkb3duW2lkeF0uaWQgKyAnXScpO1xuICAgICAgICBvcmlnaW5hbF90YXJnZXQuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICBpZiAoc2VsZi5TKHRoaXMpLmhhc0NsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKSkge1xuICAgICAgICAgIHNlbGYuUyh0aGlzKVxuICAgICAgICAgICAgLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCcgOiAnbGVmdCcsICctOTk5OTlweCcpXG4gICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpXG4gICAgICAgICAgICAucHJldignWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHNlbGYuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKVxuICAgICAgICAgICAgLnJlbW92ZURhdGEoJ3RhcmdldCcpO1xuXG4gICAgICAgICAgc2VsZi5TKHRoaXMpLnRyaWdnZXIoJ2Nsb3NlZC5mbmR0bi5kcm9wZG93bicsIFtkcm9wZG93bl0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRyb3Bkb3duLnJlbW92ZUNsYXNzKCdmLW9wZW4tJyArIHRoaXMuYXR0cl9uYW1lKHRydWUpKTtcbiAgICB9LFxuXG4gICAgY2xvc2VhbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAkLmVhY2goc2VsZi5TKCcuZi1vcGVuLScgKyB0aGlzLmF0dHJfbmFtZSh0cnVlKSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIHNlbGYuUyh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgb3BlbiA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0KSB7XG4gICAgICB0aGlzXG4gICAgICAgIC5jc3MoZHJvcGRvd25cbiAgICAgICAgLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYWN0aXZlX2NsYXNzKSwgdGFyZ2V0KTtcbiAgICAgIGRyb3Bkb3duLnByZXYoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpO1xuICAgICAgZHJvcGRvd24uZGF0YSgndGFyZ2V0JywgdGFyZ2V0LmdldCgwKSkudHJpZ2dlcignb3BlbmVkLmZuZHRuLmRyb3Bkb3duJywgW2Ryb3Bkb3duLCB0YXJnZXRdKTtcbiAgICAgIGRyb3Bkb3duLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICB0YXJnZXQuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICBkcm9wZG93bi5mb2N1cygpO1xuICAgICAgZHJvcGRvd24uYWRkQ2xhc3MoJ2Ytb3Blbi0nICsgdGhpcy5hdHRyX25hbWUodHJ1ZSkpO1xuICAgIH0sXG5cbiAgICBkYXRhX2F0dHIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2UubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2UgKyAnLScgKyB0aGlzLm5hbWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzQ2xhc3ModGhpcy5zZXR0aW5ncy5kaXNhYmxlZF9jbGFzcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRyb3Bkb3duID0gdGhpcy5TKCcjJyArIHRhcmdldC5kYXRhKHRoaXMuZGF0YV9hdHRyKCkpKTtcbiAgICAgIGlmIChkcm9wZG93bi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gTm8gZHJvcGRvd24gZm91bmQsIG5vdCBjb250aW51aW5nXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbG9zZS5jYWxsKHRoaXMsIHRoaXMuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpLm5vdChkcm9wZG93bikpO1xuXG4gICAgICBpZiAoZHJvcGRvd24uaGFzQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UuY2FsbCh0aGlzLCBkcm9wZG93bik7XG4gICAgICAgIGlmIChkcm9wZG93bi5kYXRhKCd0YXJnZXQnKSAhPT0gdGFyZ2V0LmdldCgwKSkge1xuICAgICAgICAgIHRoaXMub3Blbi5jYWxsKHRoaXMsIGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW4uY2FsbCh0aGlzLCBkcm9wZG93biwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzaXplIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRyb3Bkb3duID0gdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdLm9wZW4nKTtcbiAgICAgIHZhciB0YXJnZXQgPSAkKGRyb3Bkb3duLmRhdGEoXCJ0YXJnZXRcIikpO1xuXG4gICAgICBpZiAoZHJvcGRvd24ubGVuZ3RoICYmIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5jc3MoZHJvcGRvd24sIHRhcmdldCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGNzcyA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0KSB7XG4gICAgICB2YXIgbGVmdF9vZmZzZXQgPSBNYXRoLm1heCgodGFyZ2V0LndpZHRoKCkgLSBkcm9wZG93bi53aWR0aCgpKSAvIDIsIDgpLFxuICAgICAgICAgIHNldHRpbmdzID0gdGFyZ2V0LmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSB8fCB0aGlzLnNldHRpbmdzLFxuICAgICAgICAgIHBhcmVudE92ZXJmbG93ID0gZHJvcGRvd24ucGFyZW50KCkuY3NzKCdvdmVyZmxvdy15JykgfHwgZHJvcGRvd24ucGFyZW50KCkuY3NzKCdvdmVyZmxvdycpO1xuXG4gICAgICB0aGlzLmNsZWFyX2lkeCgpO1xuXG5cblxuICAgICAgaWYgKHRoaXMuc21hbGwoKSkge1xuICAgICAgICB2YXIgcCA9IHRoaXMuZGlycy5ib3R0b20uY2FsbChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncyk7XG5cbiAgICAgICAgZHJvcGRvd24uYXR0cignc3R5bGUnLCAnJykucmVtb3ZlQ2xhc3MoJ2Ryb3AtbGVmdCBkcm9wLXJpZ2h0IGRyb3AtdG9wJykuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbiA6ICdhYnNvbHV0ZScsXG4gICAgICAgICAgd2lkdGggOiAnOTUlJyxcbiAgICAgICAgICAnbWF4LXdpZHRoJyA6ICdub25lJyxcbiAgICAgICAgICB0b3AgOiBwLnRvcFxuICAgICAgICB9KTtcblxuICAgICAgICBkcm9wZG93bi5jc3MoRm91bmRhdGlvbi5ydGwgPyAncmlnaHQnIDogJ2xlZnQnLCBsZWZ0X29mZnNldCk7XG4gICAgICB9XG4gICAgICAvLyBkZXRlY3QgaWYgZHJvcGRvd24gaXMgaW4gYW4gb3ZlcmZsb3cgY29udGFpbmVyXG4gICAgICBlbHNlIGlmIChwYXJlbnRPdmVyZmxvdyAhPT0gJ3Zpc2libGUnKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0YXJnZXRbMF0ub2Zmc2V0VG9wICsgdGFyZ2V0WzBdLm9mZnNldEhlaWdodDtcblxuICAgICAgICBkcm9wZG93bi5hdHRyKCdzdHlsZScsICcnKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3AgOiBvZmZzZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZHJvcGRvd24uY3NzKEZvdW5kYXRpb24ucnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JywgbGVmdF9vZmZzZXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG5cbiAgICAgICAgdGhpcy5zdHlsZShkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wZG93bjtcbiAgICB9LFxuXG4gICAgc3R5bGUgOiBmdW5jdGlvbiAoZHJvcGRvd24sIHRhcmdldCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBjc3MgPSAkLmV4dGVuZCh7cG9zaXRpb24gOiAnYWJzb2x1dGUnfSxcbiAgICAgICAgdGhpcy5kaXJzW3NldHRpbmdzLmFsaWduXS5jYWxsKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKSk7XG5cbiAgICAgIGRyb3Bkb3duLmF0dHIoJ3N0eWxlJywgJycpLmNzcyhjc3MpO1xuICAgIH0sXG5cbiAgICAvLyByZXR1cm4gQ1NTIHByb3BlcnR5IG9iamVjdFxuICAgIC8vIGB0aGlzYCBpcyB0aGUgZHJvcGRvd25cbiAgICBkaXJzIDoge1xuICAgICAgLy8gQ2FsY3VsYXRlIHRhcmdldCBvZmZzZXRcbiAgICAgIF9iYXNlIDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgdmFyIG9fcCA9IHRoaXMub2Zmc2V0UGFyZW50KCksXG4gICAgICAgICAgICBvID0gb19wLm9mZnNldCgpLFxuICAgICAgICAgICAgcCA9IHQub2Zmc2V0KCk7XG5cbiAgICAgICAgcC50b3AgLT0gby50b3A7XG4gICAgICAgIHAubGVmdCAtPSBvLmxlZnQ7XG5cbiAgICAgICAgLy9zZXQgc29tZSBmbGFncyBvbiB0aGUgcCBvYmplY3QgdG8gcGFzcyBhbG9uZ1xuICAgICAgICBwLm1pc3NSaWdodCA9IGZhbHNlO1xuICAgICAgICBwLm1pc3NUb3AgPSBmYWxzZTtcbiAgICAgICAgcC5taXNzTGVmdCA9IGZhbHNlO1xuICAgICAgICBwLmxlZnRSaWdodEZsYWcgPSBmYWxzZTtcblxuICAgICAgICAvL2xldHMgc2VlIGlmIHRoZSBwYW5lbCB3aWxsIGJlIG9mZiB0aGUgc2NyZWVuXG4gICAgICAgIC8vZ2V0IHRoZSBhY3R1YWwgd2lkdGggb2YgdGhlIHBhZ2UgYW5kIHN0b3JlIGl0XG4gICAgICAgIHZhciBhY3R1YWxCb2R5V2lkdGg7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyb3cnKVswXSkge1xuICAgICAgICAgIGFjdHVhbEJvZHlXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JvdycpWzBdLmNsaWVudFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdHVhbEJvZHlXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdHVhbE1hcmdpbldpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gYWN0dWFsQm9keVdpZHRoKSAvIDI7XG4gICAgICAgIHZhciBhY3R1YWxCb3VuZGFyeSA9IGFjdHVhbEJvZHlXaWR0aDtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzQ2xhc3MoJ21lZ2EnKSkge1xuICAgICAgICAgIC8vbWlzcyB0b3BcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS50b3AgPD0gdGhpcy5vdXRlckhlaWdodCgpKSB7XG4gICAgICAgICAgICBwLm1pc3NUb3AgPSB0cnVlO1xuICAgICAgICAgICAgYWN0dWFsQm91bmRhcnkgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGFjdHVhbE1hcmdpbldpZHRoO1xuICAgICAgICAgICAgcC5sZWZ0UmlnaHRGbGFnID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL21pc3MgcmlnaHRcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS5sZWZ0ICsgdGhpcy5vdXRlcldpZHRoKCkgPiB0Lm9mZnNldCgpLmxlZnQgKyBhY3R1YWxNYXJnaW5XaWR0aCAmJiB0Lm9mZnNldCgpLmxlZnQgLSBhY3R1YWxNYXJnaW5XaWR0aCA+IHRoaXMub3V0ZXJXaWR0aCgpKSB7XG4gICAgICAgICAgICBwLm1pc3NSaWdodCA9IHRydWU7XG4gICAgICAgICAgICBwLm1pc3NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9taXNzIGxlZnRcbiAgICAgICAgICBpZiAodC5vZmZzZXQoKS5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgPD0gMCkge1xuICAgICAgICAgICAgcC5taXNzTGVmdCA9IHRydWU7XG4gICAgICAgICAgICBwLm1pc3NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSxcblxuICAgICAgdG9wIDogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd24sXG4gICAgICAgICAgICBwID0gc2VsZi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC10b3AnKTtcblxuICAgICAgICBpZiAocC5taXNzVG9wID09IHRydWUpIHtcbiAgICAgICAgICBwLnRvcCA9IHAudG9wICsgdC5vdXRlckhlaWdodCgpICsgdGhpcy5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2Ryb3AtdG9wJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoRm91bmRhdGlvbi5ydGwpIHtcbiAgICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSArIHQub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgICAgdG9wIDogcC50b3AgLSB0aGlzLm91dGVySGVpZ2h0KCl9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0LCB0b3AgOiBwLnRvcCAtIHRoaXMub3V0ZXJIZWlnaHQoKX07XG4gICAgICB9LFxuXG4gICAgICBib3R0b20gOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bixcbiAgICAgICAgICAgIHAgPSBzZWxmLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5ydGwpIHtcbiAgICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSArIHQub3V0ZXJXaWR0aCgpLCB0b3AgOiBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQsIHRvcCA6IHAudG9wICsgdC5vdXRlckhlaWdodCgpfTtcbiAgICAgIH0sXG5cbiAgICAgIGxlZnQgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgcCA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC1sZWZ0Jyk7XG5cbiAgICAgICAgaWYgKHAubWlzc0xlZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9ICBwLmxlZnQgKyB0aGlzLm91dGVyV2lkdGgoKTtcbiAgICAgICAgICBwLnRvcCA9IHAudG9wICsgdC5vdXRlckhlaWdodCgpO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2Ryb3AtbGVmdCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wfTtcbiAgICAgIH0sXG5cbiAgICAgIHJpZ2h0IDogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgdmFyIHAgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd24uZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2Ryb3AtcmlnaHQnKTtcblxuICAgICAgICBpZiAocC5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAubGVmdCA9IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC1yaWdodCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHAudHJpZ2dlcmVkUmlnaHQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlbGYgPSBGb3VuZGF0aW9uLmxpYnMuZHJvcGRvd247XG5cbiAgICAgICAgaWYgKHQub3V0ZXJXaWR0aCgpIDwgdGhpcy5vdXRlcldpZHRoKCkgfHwgc2VsZi5zbWFsbCgpIHx8IHRoaXMuaGFzQ2xhc3Mocy5tZWdhX21lbnUpKSB7XG4gICAgICAgICAgc2VsZi5hZGp1c3RfcGlwKHRoaXMsIHQsIHMsIHApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsZWZ0IDogcC5sZWZ0ICsgdC5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSW5zZXJ0IHJ1bGUgdG8gc3R5bGUgcHN1ZWRvIGVsZW1lbnRzXG4gICAgYWRqdXN0X3BpcCA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncywgcG9zaXRpb24pIHtcbiAgICAgIHZhciBzaGVldCA9IEZvdW5kYXRpb24uc3R5bGVzaGVldCxcbiAgICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSA4O1xuXG4gICAgICBpZiAoZHJvcGRvd24uaGFzQ2xhc3Moc2V0dGluZ3MubWVnYV9jbGFzcykpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlID0gcG9zaXRpb24ubGVmdCArICh0YXJnZXQub3V0ZXJXaWR0aCgpIC8gMikgLSA4O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNtYWxsKCkpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlICs9IHBvc2l0aW9uLmxlZnQgLSA4O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJ1bGVfaWR4ID0gc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuXG4gICAgICAvL2RlZmF1bHRcbiAgICAgIHZhciBzZWxfYmVmb3JlID0gJy5mLWRyb3Bkb3duLm9wZW46YmVmb3JlJyxcbiAgICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDogJyArIHBpcF9vZmZzZXRfYmFzZSArICdweDsnLFxuICAgICAgICAgIGNzc19hZnRlciAgPSAnbGVmdDogJyArIChwaXBfb2Zmc2V0X2Jhc2UgLSAxKSArICdweDsnO1xuXG4gICAgICBpZiAocG9zaXRpb24ubWlzc1JpZ2h0ID09IHRydWUpIHtcbiAgICAgICAgcGlwX29mZnNldF9iYXNlID0gZHJvcGRvd24ub3V0ZXJXaWR0aCgpIC0gMjM7XG4gICAgICAgIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICBjc3NfYmVmb3JlID0gJ2xlZnQ6ICcgKyBwaXBfb2Zmc2V0X2Jhc2UgKyAncHg7JyxcbiAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0OiAnICsgKHBpcF9vZmZzZXRfYmFzZSAtIDEpICsgJ3B4Oyc7XG4gICAgICB9XG5cbiAgICAgIC8vanVzdCBhIGNhc2Ugd2hlcmUgcmlnaHQgaXMgZmlyZWQsIGJ1dCBpdHMgbm90IG1pc3NpbmcgcmlnaHRcbiAgICAgIGlmIChwb3NpdGlvbi50cmlnZ2VyZWRSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICBzZWxfYWZ0ZXIgID0gJy5mLWRyb3Bkb3duLm9wZW46YWZ0ZXInLFxuICAgICAgICBjc3NfYmVmb3JlID0gJ2xlZnQ6LTEycHg7JyxcbiAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0Oi0xNHB4Oyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGVldC5pbnNlcnRSdWxlKSB7XG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoW3NlbF9iZWZvcmUsICd7JywgY3NzX2JlZm9yZSwgJ30nXS5qb2luKCcgJyksIHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5pbnNlcnRSdWxlKFtzZWxfYWZ0ZXIsICd7JywgY3NzX2FmdGVyLCAnfSddLmpvaW4oJyAnKSwgdGhpcy5ydWxlX2lkeCArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxfYmVmb3JlLCBjc3NfYmVmb3JlLCB0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgc2hlZXQuYWRkUnVsZShzZWxfYWZ0ZXIsIGNzc19hZnRlciwgdGhpcy5ydWxlX2lkeCArIDEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb2xkIGRyb3Bkb3duIHJ1bGUgaW5kZXhcbiAgICBjbGVhcl9pZHggOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2hlZXQgPSBGb3VuZGF0aW9uLnN0eWxlc2hlZXQ7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5ydWxlX2lkeCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgc2hlZXQuZGVsZXRlUnVsZSh0aGlzLnJ1bGVfaWR4KTtcbiAgICAgICAgZGVsZXRlIHRoaXMucnVsZV9pZHg7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNtYWxsIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzICYmXG4gICAgICAgICFtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIG9mZiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuUyh0aGlzLnNjb3BlKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgICAgdGhpcy5TKCdodG1sLCBib2R5Jykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9mZignLmZuZHRuLmRyb3Bkb3duJyk7XG4gICAgICB0aGlzLlMoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBGb3VuZGF0aW9uLmxpYnMuZXF1YWxpemVyID0ge1xuICAgIG5hbWUgOiAnZXF1YWxpemVyJyxcblxuICAgIHZlcnNpb24gOiAnNS4zLjEnLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICB1c2VfdGFsbGVzdDogdHJ1ZSxcbiAgICAgIGJlZm9yZV9oZWlnaHRfY2hhbmdlOiAkLm5vb3AsXG4gICAgICBhZnRlcl9oZWlnaHRfY2hhbmdlOiAkLm5vb3AsXG4gICAgICBlcXVhbGl6ZV9vbl9zdGFjazogdHJ1ZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAnaW1hZ2VfbG9hZGVkJyk7XG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgICB0aGlzLnJlZmxvdygpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLlMod2luZG93KS5vZmYoJy5lcXVhbGl6ZXInKS5vbigncmVzaXplLmZuZHRuLmVxdWFsaXplcicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLnJlZmxvdygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgZXF1YWxpemU6IGZ1bmN0aW9uKGVxdWFsaXplcikge1xuICAgICAgdmFyIGlzU3RhY2tlZCA9IGZhbHNlLFxuICAgICAgICAgIHZhbHMgPSBlcXVhbGl6ZXIuZmluZCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJy13YXRjaF06dmlzaWJsZScpLFxuICAgICAgICAgIHNldHRpbmdzID0gZXF1YWxpemVyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkrJy1pbml0Jyk7XG5cbiAgICAgIGlmICh2YWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgdmFyIGZpcnN0VG9wT2Zmc2V0ID0gdmFscy5maXJzdCgpLm9mZnNldCgpLnRvcDtcbiAgICAgIHNldHRpbmdzLmJlZm9yZV9oZWlnaHRfY2hhbmdlKCk7XG4gICAgICBlcXVhbGl6ZXIudHJpZ2dlcignYmVmb3JlLWhlaWdodC1jaGFuZ2UnKS50cmlnZ2VyKCdiZWZvcmUtaGVpZ2h0LWNoYW5nZS5mbmR0aC5lcXVhbGl6ZXInKTtcbiAgICAgIHZhbHMuaGVpZ2h0KCdpbmhlcml0Jyk7XG5cbiAgICAgIHZhciBoZWlnaHRzID0gdmFscy5tYXAoZnVuY3Rpb24oKXsgcmV0dXJuICQodGhpcykub3V0ZXJIZWlnaHQoZmFsc2UpIH0pLmdldCgpO1xuXG4gICAgICBpZiAoc2V0dGluZ3MudXNlX3RhbGxlc3QpIHtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgICB2YWxzLmNzcygnaGVpZ2h0JywgbWF4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbi5hcHBseShudWxsLCBoZWlnaHRzKTtcbiAgICAgICAgdmFscy5jc3MoJ2hlaWdodCcsIG1pbik7XG4gICAgICB9XG4gICAgICBzZXR0aW5ncy5hZnRlcl9oZWlnaHRfY2hhbmdlKCk7XG4gICAgICBlcXVhbGl6ZXIudHJpZ2dlcignYWZ0ZXItaGVpZ2h0LWNoYW5nZScpLnRyaWdnZXIoJ2FmdGVyLWhlaWdodC1jaGFuZ2UuZm5kdG4uZXF1YWxpemVyJyk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScsIHRoaXMuc2NvcGUpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRlcV90YXJnZXQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmltYWdlX2xvYWRlZChzZWxmLlMoJ2ltZycsIHRoaXMpLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNlbGYuZXF1YWxpemUoJGVxX3RhcmdldClcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KTtcblxuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBGb3VuZGF0aW9uLmxpYnMub2ZmY2FudmFzID0ge1xuICAgIG5hbWUgOiAnb2ZmY2FudmFzJyxcblxuICAgIHZlcnNpb24gOiAnNS41LjInLFxuXG4gICAgc2V0dGluZ3MgOiB7XG4gICAgICBvcGVuX21ldGhvZCA6ICdtb3ZlJyxcbiAgICAgIGNsb3NlX29uX2NsaWNrIDogZmFsc2VcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzY29wZSwgbWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG4gICAgfSxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gc2VsZi5TLFxuICAgICAgICAgIG1vdmVfY2xhc3MgPSAnJyxcbiAgICAgICAgICByaWdodF9wb3N0Zml4ID0gJycsXG4gICAgICAgICAgbGVmdF9wb3N0Zml4ID0gJyc7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZW5fbWV0aG9kID09PSAnbW92ZScpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdtb3ZlLSc7XG4gICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAncmlnaHQnO1xuICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnbGVmdCc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdvdmVybGFwX3NpbmdsZScpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdvZmZjYW52YXMtb3ZlcmxhcC0nO1xuICAgICAgICByaWdodF9wb3N0Zml4ID0gJ3JpZ2h0JztcbiAgICAgICAgbGVmdF9wb3N0Zml4ID0gJ2xlZnQnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLm9wZW5fbWV0aG9kID09PSAnb3ZlcmxhcCcpIHtcbiAgICAgICAgbW92ZV9jbGFzcyA9ICdvZmZjYW52YXMtb3ZlcmxhcCc7XG4gICAgICB9XG5cbiAgICAgIFModGhpcy5zY29wZSkub2ZmKCcub2ZmY2FudmFzJylcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLmxlZnQtb2ZmLWNhbnZhcy10b2dnbGUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfdG9nZ2xlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vcGVuX21ldGhvZCAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICAgICAgICBTKCcubGVmdC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcubGVmdC1vZmYtY2FudmFzLW1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gc2VsZi5nZXRfc2V0dGluZ3MoZSk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IFModGhpcykucGFyZW50KCk7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY2xvc2Vfb25fY2xpY2sgJiYgIXBhcmVudC5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSAmJiAhcGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZS5jYWxsKHNlbGYsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4LCBzZWxmLmdldF93cmFwcGVyKGUpKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChTKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBTKHRoaXMpLnNpYmxpbmdzKCcubGVmdC1zdWJtZW51JykudG9nZ2xlQ2xhc3MobW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5jbGlja190b2dnbGVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3Mub3Blbl9tZXRob2QgIT09ICdvdmVybGFwJykge1xuICAgICAgICAgICAgUygnLnJpZ2h0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5yaWdodC1vZmYtY2FudmFzLW1lbnUgYScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIHNldHRpbmdzID0gc2VsZi5nZXRfc2V0dGluZ3MoZSk7XG4gICAgICAgICAgdmFyIHBhcmVudCA9IFModGhpcykucGFyZW50KCk7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY2xvc2Vfb25fY2xpY2sgJiYgIXBhcmVudC5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSAmJiAhcGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZS5jYWxsKHNlbGYsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgsIHNlbGYuZ2V0X3dyYXBwZXIoZSkpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoUyh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnaGFzLXN1Ym1lbnUnKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgUyh0aGlzKS5zaWJsaW5ncygnLnJpZ2h0LXN1Ym1lbnUnKS50b2dnbGVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmVudC5oYXNDbGFzcygnYmFjaycpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBwYXJlbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcuZXhpdC1vZmYtY2FudmFzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICBTKCcucmlnaHQtc3VibWVudScpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIGlmIChyaWdodF9wb3N0Zml4KSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgICBTKCcubGVmdC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5yaWdodC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcuZXhpdC1vZmYtY2FudmFzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICAkKCcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgICBpZiAocmlnaHRfcG9zdGZpeCkge1xuICAgICAgICAgICAgc2VsZi5jbGlja19yZW1vdmVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZSA6IGZ1bmN0aW9uIChjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICBpZiAoJG9mZl9jYW52YXMuaXMoJy4nICsgY2xhc3NfbmFtZSkpIHtcbiAgICAgICAgdGhpcy5oaWRlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdyhjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3cgOiBmdW5jdGlvbiAoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpIHtcbiAgICAgICRvZmZfY2FudmFzID0gJG9mZl9jYW52YXMgfHwgdGhpcy5nZXRfd3JhcHBlcigpO1xuICAgICAgJG9mZl9jYW52YXMudHJpZ2dlcignb3Blbi5mbmR0bi5vZmZjYW52YXMnKTtcbiAgICAgICRvZmZfY2FudmFzLmFkZENsYXNzKGNsYXNzX25hbWUpO1xuICAgIH0sXG5cbiAgICBoaWRlIDogZnVuY3Rpb24gKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKSB7XG4gICAgICAkb2ZmX2NhbnZhcyA9ICRvZmZfY2FudmFzIHx8IHRoaXMuZ2V0X3dyYXBwZXIoKTtcbiAgICAgICRvZmZfY2FudmFzLnRyaWdnZXIoJ2Nsb3NlLmZuZHRuLm9mZmNhbnZhcycpO1xuICAgICAgJG9mZl9jYW52YXMucmVtb3ZlQ2xhc3MoY2xhc3NfbmFtZSk7XG4gICAgfSxcblxuICAgIGNsaWNrX3RvZ2dsZV9jbGFzcyA6IGZ1bmN0aW9uIChlLCBjbGFzc19uYW1lKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLmdldF93cmFwcGVyKGUpO1xuICAgICAgdGhpcy50b2dnbGUoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpO1xuICAgIH0sXG5cbiAgICBjbGlja19yZW1vdmVfY2xhc3MgOiBmdW5jdGlvbiAoZSwgY2xhc3NfbmFtZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICRvZmZfY2FudmFzID0gdGhpcy5nZXRfd3JhcHBlcihlKTtcbiAgICAgIHRoaXMuaGlkZShjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgfSxcblxuICAgIGdldF9zZXR0aW5ncyA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgb2ZmY2FudmFzICA9IHRoaXMuUyhlLnRhcmdldCkuY2xvc2VzdCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKTtcbiAgICAgIHJldHVybiBvZmZjYW52YXMuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3M7XG4gICAgfSxcblxuICAgIGdldF93cmFwcGVyIDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkb2ZmX2NhbnZhcyA9IHRoaXMuUyhlID8gZS50YXJnZXQgOiB0aGlzLnNjb3BlKS5jbG9zZXN0KCcub2ZmLWNhbnZhcy13cmFwJyk7XG5cbiAgICAgIGlmICgkb2ZmX2NhbnZhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJG9mZl9jYW52YXMgPSB0aGlzLlMoJy5vZmYtY2FudmFzLXdyYXAnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkb2ZmX2NhbnZhcztcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiOyhmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIHZhciBPcmJpdCA9IGZ1bmN0aW9uIChlbCwgc2V0dGluZ3MpIHtcbiAgICAvLyBEb24ndCByZWluaXRpYWxpemUgcGx1Z2luXG4gICAgaWYgKGVsLmhhc0NsYXNzKHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgc2xpZGVzX2NvbnRhaW5lciA9IGVsLFxuICAgICAgICBudW1iZXJfY29udGFpbmVyLFxuICAgICAgICBidWxsZXRzX2NvbnRhaW5lcixcbiAgICAgICAgdGltZXJfY29udGFpbmVyLFxuICAgICAgICBpZHggPSAwLFxuICAgICAgICBhbmltYXRlLFxuICAgICAgICB0aW1lcixcbiAgICAgICAgbG9ja2VkID0gZmFsc2UsXG4gICAgICAgIGFkanVzdF9oZWlnaHRfYWZ0ZXIgPSBmYWxzZTtcblxuICAgIHNlbGYuc2xpZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHNsaWRlc19jb250YWluZXIuY2hpbGRyZW4oc2V0dGluZ3Muc2xpZGVfc2VsZWN0b3IpO1xuICAgIH07XG5cbiAgICBzZWxmLnNsaWRlcygpLmZpcnN0KCkuYWRkQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcblxuICAgIHNlbGYudXBkYXRlX3NsaWRlX251bWJlciA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgaWYgKHNldHRpbmdzLnNsaWRlX251bWJlcikge1xuICAgICAgICBudW1iZXJfY29udGFpbmVyLmZpbmQoJ3NwYW46Zmlyc3QnKS50ZXh0KHBhcnNlSW50KGluZGV4KSArIDEpO1xuICAgICAgICBudW1iZXJfY29udGFpbmVyLmZpbmQoJ3NwYW46bGFzdCcpLnRleHQoc2VsZi5zbGlkZXMoKS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRpbmdzLmJ1bGxldHMpIHtcbiAgICAgICAgYnVsbGV0c19jb250YWluZXIuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgICAgICQoYnVsbGV0c19jb250YWluZXIuY2hpbGRyZW4oKS5nZXQoaW5kZXgpKS5hZGRDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlX2FjdGl2ZV9saW5rID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICB2YXIgbGluayA9ICQoJ1tkYXRhLW9yYml0LWxpbms9XCInICsgc2VsZi5zbGlkZXMoKS5lcShpbmRleCkuYXR0cignZGF0YS1vcmJpdC1zbGlkZScpICsgJ1wiXScpO1xuICAgICAgbGluay5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICAgIGxpbmsuYWRkQ2xhc3Moc2V0dGluZ3MuYnVsbGV0c19hY3RpdmVfY2xhc3MpO1xuICAgIH07XG5cbiAgICBzZWxmLmJ1aWxkX21hcmt1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNsaWRlc19jb250YWluZXIud3JhcCgnPGRpdiBjbGFzcz1cIicgKyBzZXR0aW5ncy5jb250YWluZXJfY2xhc3MgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICBjb250YWluZXIgPSBzbGlkZXNfY29udGFpbmVyLnBhcmVudCgpO1xuICAgICAgc2xpZGVzX2NvbnRhaW5lci5hZGRDbGFzcyhzZXR0aW5ncy5zbGlkZXNfY29udGFpbmVyX2NsYXNzKTtcblxuICAgICAgaWYgKHNldHRpbmdzLnN0YWNrX29uX3NtYWxsKSB7XG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhzZXR0aW5ncy5zdGFja19vbl9zbWFsbF9jbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5uYXZpZ2F0aW9uX2Fycm93cykge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKCQoJzxhIGhyZWY9XCIjXCI+PHNwYW4+PC9zcGFuPjwvYT4nKS5hZGRDbGFzcyhzZXR0aW5ncy5wcmV2X2NsYXNzKSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJCgnPGEgaHJlZj1cIiNcIj48c3Bhbj48L3NwYW4+PC9hPicpLmFkZENsYXNzKHNldHRpbmdzLm5leHRfY2xhc3MpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLnRpbWVyKSB7XG4gICAgICAgIHRpbWVyX2NvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3Moc2V0dGluZ3MudGltZXJfY29udGFpbmVyX2NsYXNzKTtcbiAgICAgICAgdGltZXJfY29udGFpbmVyLmFwcGVuZCgnPHNwYW4+Jyk7XG4gICAgICAgIHRpbWVyX2NvbnRhaW5lci5hcHBlbmQoJCgnPGRpdj4nKS5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wcm9ncmVzc19jbGFzcykpO1xuICAgICAgICB0aW1lcl9jb250YWluZXIuYWRkQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0aW1lcl9jb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3Muc2xpZGVfbnVtYmVyKSB7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKHNldHRpbmdzLnNsaWRlX251bWJlcl9jbGFzcyk7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuYXBwZW5kKCc8c3Bhbj48L3NwYW4+ICcgKyBzZXR0aW5ncy5zbGlkZV9udW1iZXJfdGV4dCArICcgPHNwYW4+PC9zcGFuPicpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKG51bWJlcl9jb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MuYnVsbGV0cykge1xuICAgICAgICBidWxsZXRzX2NvbnRhaW5lciA9ICQoJzxvbD4nKS5hZGRDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2NvbnRhaW5lcl9jbGFzcyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoYnVsbGV0c19jb250YWluZXIpO1xuICAgICAgICBidWxsZXRzX2NvbnRhaW5lci53cmFwKCc8ZGl2IGNsYXNzPVwib3JiaXQtYnVsbGV0cy1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgc2VsZi5zbGlkZXMoKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsKSB7XG4gICAgICAgICAgdmFyIGJ1bGxldCA9ICQoJzxsaT4nKS5hdHRyKCdkYXRhLW9yYml0LXNsaWRlJywgaWR4KS5vbignY2xpY2snLCBzZWxmLmxpbmtfYnVsbGV0KTs7XG4gICAgICAgICAgYnVsbGV0c19jb250YWluZXIuYXBwZW5kKGJ1bGxldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfTtcblxuICAgIHNlbGYuX2dvdG8gPSBmdW5jdGlvbiAobmV4dF9pZHgsIHN0YXJ0X3RpbWVyKSB7XG4gICAgICAvLyBpZiAobG9ja2VkKSB7cmV0dXJuIGZhbHNlO31cbiAgICAgIGlmIChuZXh0X2lkeCA9PT0gaWR4KSB7cmV0dXJuIGZhbHNlO31cbiAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7dGltZXIucmVzdGFydCgpO31cbiAgICAgIHZhciBzbGlkZXMgPSBzZWxmLnNsaWRlcygpO1xuXG4gICAgICB2YXIgZGlyID0gJ25leHQnO1xuICAgICAgbG9ja2VkID0gdHJ1ZTtcbiAgICAgIGlmIChuZXh0X2lkeCA8IGlkeCkge2RpciA9ICdwcmV2Jzt9XG4gICAgICBpZiAobmV4dF9pZHggPj0gc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAoIXNldHRpbmdzLmNpcmN1bGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIG5leHRfaWR4ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAobmV4dF9pZHggPCAwKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MuY2lyY3VsYXIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dF9pZHggPSBzbGlkZXMubGVuZ3RoIC0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnQgPSAkKHNsaWRlcy5nZXQoaWR4KSk7XG4gICAgICB2YXIgbmV4dCA9ICQoc2xpZGVzLmdldChuZXh0X2lkeCkpO1xuXG4gICAgICBjdXJyZW50LmNzcygnekluZGV4JywgMik7XG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZV9zbGlkZV9jbGFzcyk7XG4gICAgICBuZXh0LmNzcygnekluZGV4JywgNCkuYWRkQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcblxuICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdiZWZvcmUtc2xpZGUtY2hhbmdlLmZuZHRuLm9yYml0Jyk7XG4gICAgICBzZXR0aW5ncy5iZWZvcmVfc2xpZGVfY2hhbmdlKCk7XG4gICAgICBzZWxmLnVwZGF0ZV9hY3RpdmVfbGluayhuZXh0X2lkeCk7XG5cbiAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHVubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZHggPSBuZXh0X2lkeDtcbiAgICAgICAgICBsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoc3RhcnRfdGltZXIgPT09IHRydWUpIHt0aW1lciA9IHNlbGYuY3JlYXRlX3RpbWVyKCk7IHRpbWVyLnN0YXJ0KCk7fVxuICAgICAgICAgIHNlbGYudXBkYXRlX3NsaWRlX251bWJlcihpZHgpO1xuICAgICAgICAgIHNsaWRlc19jb250YWluZXIudHJpZ2dlcignYWZ0ZXItc2xpZGUtY2hhbmdlLmZuZHRuLm9yYml0JywgW3tzbGlkZV9udW1iZXIgOiBpZHgsIHRvdGFsX3NsaWRlcyA6IHNsaWRlcy5sZW5ndGh9XSk7XG4gICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJfc2xpZGVfY2hhbmdlKGlkeCwgc2xpZGVzLmxlbmd0aCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzbGlkZXNfY29udGFpbmVyLm91dGVySGVpZ2h0KCkgIT0gbmV4dC5vdXRlckhlaWdodCgpICYmIHNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICAgIHNsaWRlc19jb250YWluZXIuYW5pbWF0ZSh7J2hlaWdodCc6IG5leHQub3V0ZXJIZWlnaHQoKX0sIDI1MCwgJ2xpbmVhcicsIHVubG9jayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdW5sb2NrKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChzbGlkZXMubGVuZ3RoID09PSAxKSB7Y2FsbGJhY2soKTsgcmV0dXJuIGZhbHNlO31cblxuICAgICAgdmFyIHN0YXJ0X2FuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGRpciA9PT0gJ25leHQnKSB7YW5pbWF0ZS5uZXh0KGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKTt9XG4gICAgICAgIGlmIChkaXIgPT09ICdwcmV2Jykge2FuaW1hdGUucHJldihjdXJyZW50LCBuZXh0LCBjYWxsYmFjayk7fVxuICAgICAgfTtcblxuICAgICAgaWYgKG5leHQub3V0ZXJIZWlnaHQoKSA+IHNsaWRlc19jb250YWluZXIub3V0ZXJIZWlnaHQoKSAmJiBzZXR0aW5ncy52YXJpYWJsZV9oZWlnaHQpIHtcbiAgICAgICAgc2xpZGVzX2NvbnRhaW5lci5hbmltYXRlKHsnaGVpZ2h0JzogbmV4dC5vdXRlckhlaWdodCgpfSwgMjUwLCAnbGluZWFyJywgc3RhcnRfYW5pbWF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0X2FuaW1hdGlvbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzZWxmLm5leHQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHNlbGYuX2dvdG8oaWR4ICsgMSk7XG4gICAgfTtcblxuICAgIHNlbGYucHJldiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5fZ290byhpZHggLSAxKTtcbiAgICB9O1xuXG4gICAgc2VsZi5saW5rX2N1c3RvbSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgbGluayA9ICQodGhpcykuYXR0cignZGF0YS1vcmJpdC1saW5rJyk7XG4gICAgICBpZiAoKHR5cGVvZiBsaW5rID09PSAnc3RyaW5nJykgJiYgKGxpbmsgPSAkLnRyaW0obGluaykpICE9ICcnKSB7XG4gICAgICAgIHZhciBzbGlkZSA9IGNvbnRhaW5lci5maW5kKCdbZGF0YS1vcmJpdC1zbGlkZT0nICsgbGluayArICddJyk7XG4gICAgICAgIGlmIChzbGlkZS5pbmRleCgpICE9IC0xKSB7c2VsZi5fZ290byhzbGlkZS5pbmRleCgpKTt9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYubGlua19idWxsZXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5hdHRyKCdkYXRhLW9yYml0LXNsaWRlJyk7XG4gICAgICBpZiAoKHR5cGVvZiBpbmRleCA9PT0gJ3N0cmluZycpICYmIChpbmRleCA9ICQudHJpbShpbmRleCkpICE9ICcnKSB7XG4gICAgICAgIGlmIChpc05hTihwYXJzZUludChpbmRleCkpKSB7XG4gICAgICAgICAgdmFyIHNsaWRlID0gY29udGFpbmVyLmZpbmQoJ1tkYXRhLW9yYml0LXNsaWRlPScgKyBpbmRleCArICddJyk7XG4gICAgICAgICAgaWYgKHNsaWRlLmluZGV4KCkgIT0gLTEpIHtzZWxmLl9nb3RvKHNsaWRlLmluZGV4KCkgKyAxKTt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5fZ290byhwYXJzZUludChpbmRleCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBzZWxmLnRpbWVyX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5fZ290byhpZHggKyAxLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZWxmLmNvbXB1dGVfZGltZW5zaW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gJChzZWxmLnNsaWRlcygpLmdldChpZHgpKTtcbiAgICAgIHZhciBoID0gY3VycmVudC5vdXRlckhlaWdodCgpO1xuICAgICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZV9oZWlnaHQpIHtcbiAgICAgICAgc2VsZi5zbGlkZXMoKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgaWYgKCQodGhpcykub3V0ZXJIZWlnaHQoKSA+IGgpIHsgaCA9ICQodGhpcykub3V0ZXJIZWlnaHQoKTsgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHNsaWRlc19jb250YWluZXIuaGVpZ2h0KGgpO1xuICAgIH07XG5cbiAgICBzZWxmLmNyZWF0ZV90aW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0ID0gbmV3IFRpbWVyKFxuICAgICAgICBjb250YWluZXIuZmluZCgnLicgKyBzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpLFxuICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgc2VsZi50aW1lcl9jYWxsYmFja1xuICAgICAgKTtcbiAgICAgIHJldHVybiB0O1xuICAgIH07XG5cbiAgICBzZWxmLnN0b3BfdGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIHRpbWVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aW1lci5zdG9wKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYudG9nZ2xlX3RpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHQgPSBjb250YWluZXIuZmluZCgnLicgKyBzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpO1xuICAgICAgaWYgKHQuaGFzQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKSkge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVyID09PSAndW5kZWZpbmVkJykge3RpbWVyID0gc2VsZi5jcmVhdGVfdGltZXIoKTt9XG4gICAgICAgIHRpbWVyLnN0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHRpbWVyID09PSAnb2JqZWN0Jykge3RpbWVyLnN0b3AoKTt9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuYnVpbGRfbWFya3VwKCk7XG4gICAgICBpZiAoc2V0dGluZ3MudGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZWxmLmNyZWF0ZV90aW1lcigpO1xuICAgICAgICBGb3VuZGF0aW9uLnV0aWxzLmltYWdlX2xvYWRlZCh0aGlzLnNsaWRlcygpLmNoaWxkcmVuKCdpbWcnKSwgdGltZXIuc3RhcnQpO1xuICAgICAgfVxuICAgICAgYW5pbWF0ZSA9IG5ldyBGYWRlQW5pbWF0aW9uKHNldHRpbmdzLCBzbGlkZXNfY29udGFpbmVyKTtcbiAgICAgIGlmIChzZXR0aW5ncy5hbmltYXRpb24gPT09ICdzbGlkZScpIHtcbiAgICAgICAgYW5pbWF0ZSA9IG5ldyBTbGlkZUFuaW1hdGlvbihzZXR0aW5ncywgc2xpZGVzX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCAnLicgKyBzZXR0aW5ncy5uZXh0X2NsYXNzLCBzZWxmLm5leHQpO1xuICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLnByZXZfY2xhc3MsIHNlbGYucHJldik7XG5cbiAgICAgIGlmIChzZXR0aW5ncy5uZXh0X29uX2NsaWNrKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCAnLicgKyBzZXR0aW5ncy5zbGlkZXNfY29udGFpbmVyX2NsYXNzICsgJyBbZGF0YS1vcmJpdC1zbGlkZV0nLCBzZWxmLmxpbmtfYnVsbGV0KTtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsIHNlbGYudG9nZ2xlX3RpbWVyKTtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZSkge1xuICAgICAgICBjb250YWluZXIub24oJ3RvdWNoc3RhcnQuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmICghZS50b3VjaGVzKSB7ZSA9IGUub3JpZ2luYWxFdmVudDt9XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBzdGFydF9wYWdlX3ggOiBlLnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICBzdGFydF9wYWdlX3kgOiBlLnRvdWNoZXNbMF0ucGFnZVksXG4gICAgICAgICAgICBzdGFydF90aW1lIDogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIGRlbHRhX3ggOiAwLFxuICAgICAgICAgICAgaXNfc2Nyb2xsaW5nIDogdW5kZWZpbmVkXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicsIGRhdGEpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbigndG91Y2htb3ZlLmZuZHRuLm9yYml0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoIWUudG91Y2hlcykge1xuICAgICAgICAgICAgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWdub3JlIHBpbmNoL3pvb20gZXZlbnRzXG4gICAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPiAxIHx8IGUuc2NhbGUgJiYgZS5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBkYXRhID0gY29udGFpbmVyLmRhdGEoJ3N3aXBlLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnKSB7ZGF0YSA9IHt9O31cblxuICAgICAgICAgIGRhdGEuZGVsdGFfeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIGRhdGEuc3RhcnRfcGFnZV94O1xuXG4gICAgICAgICAgaWYgKCB0eXBlb2YgZGF0YS5pc19zY3JvbGxpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBkYXRhLmlzX3Njcm9sbGluZyA9ICEhKCBkYXRhLmlzX3Njcm9sbGluZyB8fCBNYXRoLmFicyhkYXRhLmRlbHRhX3gpIDwgTWF0aC5hYnMoZS50b3VjaGVzWzBdLnBhZ2VZIC0gZGF0YS5zdGFydF9wYWdlX3kpICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFkYXRhLmlzX3Njcm9sbGluZyAmJiAhZGF0YS5hY3RpdmUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSAoZGF0YS5kZWx0YV94IDwgMCkgPyAoaWR4ICsgMSkgOiAoaWR4IC0gMSk7XG4gICAgICAgICAgICBkYXRhLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLl9nb3RvKGRpcmVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ3RvdWNoZW5kLmZuZHRuLm9yYml0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicsIHt9KTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgY29udGFpbmVyLm9uKCdtb3VzZWVudGVyLmZuZHRuLm9yYml0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLnRpbWVyICYmIHNldHRpbmdzLnBhdXNlX29uX2hvdmVyKSB7XG4gICAgICAgICAgc2VsZi5zdG9wX3RpbWVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlbGVhdmUuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MudGltZXIgJiYgc2V0dGluZ3MucmVzdW1lX29uX21vdXNlb3V0KSB7XG4gICAgICAgICAgdGltZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1vcmJpdC1saW5rXScsIHNlbGYubGlua19jdXN0b20pO1xuICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHJlc2l6ZScsIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zKTtcbiAgICAgIEZvdW5kYXRpb24udXRpbHMuaW1hZ2VfbG9hZGVkKHRoaXMuc2xpZGVzKCkuY2hpbGRyZW4oJ2ltZycpLCBzZWxmLmNvbXB1dGVfZGltZW5zaW9ucyk7XG4gICAgICBGb3VuZGF0aW9uLnV0aWxzLmltYWdlX2xvYWRlZCh0aGlzLnNsaWRlcygpLmNoaWxkcmVuKCdpbWcnKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIucHJldignLicgKyBzZXR0aW5ncy5wcmVsb2FkZXJfY2xhc3MpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIHNlbGYudXBkYXRlX3NsaWRlX251bWJlcigwKTtcbiAgICAgICAgc2VsZi51cGRhdGVfYWN0aXZlX2xpbmsoMCk7XG4gICAgICAgIHNsaWRlc19jb250YWluZXIudHJpZ2dlcigncmVhZHkuZm5kdG4ub3JiaXQnKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXQoKTtcbiAgfTtcblxuICB2YXIgVGltZXIgPSBmdW5jdGlvbiAoZWwsIHNldHRpbmdzLCBjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZHVyYXRpb24gPSBzZXR0aW5ncy50aW1lcl9zcGVlZCxcbiAgICAgICAgcHJvZ3Jlc3MgPSBlbC5maW5kKCcuJyArIHNldHRpbmdzLnRpbWVyX3Byb2dyZXNzX2NsYXNzKSxcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHRpbWVvdXQsXG4gICAgICAgIGxlZnQgPSAtMTtcblxuICAgIHRoaXMudXBkYXRlX3Byb2dyZXNzID0gZnVuY3Rpb24gKHcpIHtcbiAgICAgIHZhciBuZXdfcHJvZ3Jlc3MgPSBwcm9ncmVzcy5jbG9uZSgpO1xuICAgICAgbmV3X3Byb2dyZXNzLmF0dHIoJ3N0eWxlJywgJycpO1xuICAgICAgbmV3X3Byb2dyZXNzLmNzcygnd2lkdGgnLCB3ICsgJyUnKTtcbiAgICAgIHByb2dyZXNzLnJlcGxhY2VXaXRoKG5ld19wcm9ncmVzcyk7XG4gICAgICBwcm9ncmVzcyA9IG5ld19wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgdGhpcy5yZXN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgZWwuYWRkQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKTtcbiAgICAgIGxlZnQgPSAtMTtcbiAgICAgIHNlbGYudXBkYXRlX3Byb2dyZXNzKDApO1xuICAgIH07XG5cbiAgICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFlbC5oYXNDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpKSB7cmV0dXJuIHRydWU7fVxuICAgICAgbGVmdCA9IChsZWZ0ID09PSAtMSkgPyBkdXJhdGlvbiA6IGxlZnQ7XG4gICAgICBlbC5yZW1vdmVDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHByb2dyZXNzLmFuaW1hdGUoeyd3aWR0aCcgOiAnMTAwJSd9LCBsZWZ0LCAnbGluZWFyJyk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucmVzdGFydCgpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSwgbGVmdCk7XG4gICAgICBlbC50cmlnZ2VyKCd0aW1lci1zdGFydGVkLmZuZHRuLm9yYml0JylcbiAgICB9O1xuXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGVsLmhhc0NsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcykpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBlbC5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgdmFyIGVuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgbGVmdCA9IGxlZnQgLSAoZW5kIC0gc3RhcnQpO1xuICAgICAgdmFyIHcgPSAxMDAgLSAoKGxlZnQgLyBkdXJhdGlvbikgKiAxMDApO1xuICAgICAgc2VsZi51cGRhdGVfcHJvZ3Jlc3Modyk7XG4gICAgICBlbC50cmlnZ2VyKCd0aW1lci1zdG9wcGVkLmZuZHRuLm9yYml0Jyk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgU2xpZGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2V0dGluZ3MsIGNvbnRhaW5lcikge1xuICAgIHZhciBkdXJhdGlvbiA9IHNldHRpbmdzLmFuaW1hdGlvbl9zcGVlZDtcbiAgICB2YXIgaXNfcnRsID0gKCQoJ2h0bWxbZGlyPXJ0bF0nKS5sZW5ndGggPT09IDEpO1xuICAgIHZhciBtYXJnaW4gPSBpc19ydGwgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuICAgIHZhciBhbmltTWFyZ2luID0ge307XG4gICAgYW5pbU1hcmdpblttYXJnaW5dID0gJzAlJztcblxuICAgIHRoaXMubmV4dCA9IGZ1bmN0aW9uIChjdXJyZW50LCBuZXh0LCBjYWxsYmFjaykge1xuICAgICAgY3VycmVudC5hbmltYXRlKHttYXJnaW5MZWZ0IDogJy0xMDAlJ30sIGR1cmF0aW9uKTtcbiAgICAgIG5leHQuYW5pbWF0ZShhbmltTWFyZ2luLCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjdXJyZW50LmNzcyhtYXJnaW4sICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmV2ID0gZnVuY3Rpb24gKGN1cnJlbnQsIHByZXYsIGNhbGxiYWNrKSB7XG4gICAgICBjdXJyZW50LmFuaW1hdGUoe21hcmdpbkxlZnQgOiAnMTAwJSd9LCBkdXJhdGlvbik7XG4gICAgICBwcmV2LmNzcyhtYXJnaW4sICctMTAwJScpO1xuICAgICAgcHJldi5hbmltYXRlKGFuaW1NYXJnaW4sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJlbnQuY3NzKG1hcmdpbiwgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIEZhZGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2V0dGluZ3MsIGNvbnRhaW5lcikge1xuICAgIHZhciBkdXJhdGlvbiA9IHNldHRpbmdzLmFuaW1hdGlvbl9zcGVlZDtcbiAgICB2YXIgaXNfcnRsID0gKCQoJ2h0bWxbZGlyPXJ0bF0nKS5sZW5ndGggPT09IDEpO1xuICAgIHZhciBtYXJnaW4gPSBpc19ydGwgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKSB7XG4gICAgICBuZXh0LmNzcyh7J21hcmdpbicgOiAnMCUnLCAnb3BhY2l0eScgOiAnMC4wMSd9KTtcbiAgICAgIG5leHQuYW5pbWF0ZSh7J29wYWNpdHknIDonMSd9LCBkdXJhdGlvbiwgJ2xpbmVhcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudC5jc3MoJ21hcmdpbicsICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmV2ID0gZnVuY3Rpb24gKGN1cnJlbnQsIHByZXYsIGNhbGxiYWNrKSB7XG4gICAgICBwcmV2LmNzcyh7J21hcmdpbicgOiAnMCUnLCAnb3BhY2l0eScgOiAnMC4wMSd9KTtcbiAgICAgIHByZXYuYW5pbWF0ZSh7J29wYWNpdHknIDogJzEnfSwgZHVyYXRpb24sICdsaW5lYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJlbnQuY3NzKCdtYXJnaW4nLCAnMTAwJScpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcblxuICBGb3VuZGF0aW9uLmxpYnMgPSBGb3VuZGF0aW9uLmxpYnMgfHwge307XG5cbiAgRm91bmRhdGlvbi5saWJzLm9yYml0ID0ge1xuICAgIG5hbWUgOiAnb3JiaXQnLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIGFuaW1hdGlvbiA6ICdzbGlkZScsXG4gICAgICB0aW1lcl9zcGVlZCA6IDEwMDAwLFxuICAgICAgcGF1c2Vfb25faG92ZXIgOiB0cnVlLFxuICAgICAgcmVzdW1lX29uX21vdXNlb3V0IDogZmFsc2UsXG4gICAgICBuZXh0X29uX2NsaWNrIDogdHJ1ZSxcbiAgICAgIGFuaW1hdGlvbl9zcGVlZCA6IDUwMCxcbiAgICAgIHN0YWNrX29uX3NtYWxsIDogZmFsc2UsXG4gICAgICBuYXZpZ2F0aW9uX2Fycm93cyA6IHRydWUsXG4gICAgICBzbGlkZV9udW1iZXIgOiB0cnVlLFxuICAgICAgc2xpZGVfbnVtYmVyX3RleHQgOiAnb2YnLFxuICAgICAgY29udGFpbmVyX2NsYXNzIDogJ29yYml0LWNvbnRhaW5lcicsXG4gICAgICBzdGFja19vbl9zbWFsbF9jbGFzcyA6ICdvcmJpdC1zdGFjay1vbi1zbWFsbCcsXG4gICAgICBuZXh0X2NsYXNzIDogJ29yYml0LW5leHQnLFxuICAgICAgcHJldl9jbGFzcyA6ICdvcmJpdC1wcmV2JyxcbiAgICAgIHRpbWVyX2NvbnRhaW5lcl9jbGFzcyA6ICdvcmJpdC10aW1lcicsXG4gICAgICB0aW1lcl9wYXVzZWRfY2xhc3MgOiAncGF1c2VkJyxcbiAgICAgIHRpbWVyX3Byb2dyZXNzX2NsYXNzIDogJ29yYml0LXByb2dyZXNzJyxcbiAgICAgIHNsaWRlc19jb250YWluZXJfY2xhc3MgOiAnb3JiaXQtc2xpZGVzLWNvbnRhaW5lcicsXG4gICAgICBwcmVsb2FkZXJfY2xhc3MgOiAncHJlbG9hZGVyJyxcbiAgICAgIHNsaWRlX3NlbGVjdG9yIDogJyonLFxuICAgICAgYnVsbGV0c19jb250YWluZXJfY2xhc3MgOiAnb3JiaXQtYnVsbGV0cycsXG4gICAgICBidWxsZXRzX2FjdGl2ZV9jbGFzcyA6ICdhY3RpdmUnLFxuICAgICAgc2xpZGVfbnVtYmVyX2NsYXNzIDogJ29yYml0LXNsaWRlLW51bWJlcicsXG4gICAgICBjYXB0aW9uX2NsYXNzIDogJ29yYml0LWNhcHRpb24nLFxuICAgICAgYWN0aXZlX3NsaWRlX2NsYXNzIDogJ2FjdGl2ZScsXG4gICAgICBvcmJpdF90cmFuc2l0aW9uX2NsYXNzIDogJ29yYml0LXRyYW5zaXRpb25pbmcnLFxuICAgICAgYnVsbGV0cyA6IHRydWUsXG4gICAgICBjaXJjdWxhciA6IHRydWUsXG4gICAgICB0aW1lciA6IHRydWUsXG4gICAgICB2YXJpYWJsZV9oZWlnaHQgOiBmYWxzZSxcbiAgICAgIHN3aXBlIDogdHJ1ZSxcbiAgICAgIGJlZm9yZV9zbGlkZV9jaGFuZ2UgOiBub29wLFxuICAgICAgYWZ0ZXJfc2xpZGVfY2hhbmdlIDogbm9vcFxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICB2YXIgb3JiaXRfaW5zdGFuY2UgPSBuZXcgT3JiaXQodGhpcy5TKGluc3RhbmNlKSwgdGhpcy5TKGluc3RhbmNlKS5kYXRhKCdvcmJpdC1pbml0JykpO1xuICAgICAgdGhpcy5TKGluc3RhbmNlKS5kYXRhKHRoaXMubmFtZSArICctaW5zdGFuY2UnLCBvcmJpdF9pbnN0YW5jZSk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHNlbGYuUyhzZWxmLnNjb3BlKS5pcygnW2RhdGEtb3JiaXRdJykpIHtcbiAgICAgICAgdmFyICRlbCA9IHNlbGYuUyhzZWxmLnNjb3BlKTtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJGVsLmRhdGEoc2VsZi5uYW1lICsgJy1pbnN0YW5jZScpO1xuICAgICAgICBpbnN0YW5jZS5jb21wdXRlX2RpbWVuc2lvbnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuUygnW2RhdGEtb3JiaXRdJywgc2VsZi5zY29wZSkuZWFjaChmdW5jdGlvbiAoaWR4LCBlbCkge1xuICAgICAgICAgIHZhciAkZWwgPSBzZWxmLlMoZWwpO1xuICAgICAgICAgIHZhciBvcHRzID0gc2VsZi5kYXRhX29wdGlvbnMoJGVsKTtcbiAgICAgICAgICB2YXIgaW5zdGFuY2UgPSAkZWwuZGF0YShzZWxmLm5hbWUgKyAnLWluc3RhbmNlJyk7XG4gICAgICAgICAgaW5zdGFuY2UuY29tcHV0ZV9kaW1lbnNpb25zKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy50b3BiYXIgPSB7XG4gICAgbmFtZSA6ICd0b3BiYXInLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIGluZGV4IDogMCxcbiAgICAgIHN0YXJ0X29mZnNldCA6IDAsXG4gICAgICBzdGlja3lfY2xhc3MgOiAnc3RpY2t5JyxcbiAgICAgIGN1c3RvbV9iYWNrX3RleHQgOiB0cnVlLFxuICAgICAgYmFja190ZXh0IDogJ0JhY2snLFxuICAgICAgbW9iaWxlX3Nob3dfcGFyZW50X2xpbmsgOiB0cnVlLFxuICAgICAgaXNfaG92ZXIgOiB0cnVlLFxuICAgICAgc2Nyb2xsdG9wIDogdHJ1ZSwgLy8ganVtcCB0byB0b3Agd2hlbiBzdGlja3kgbmF2IG1lbnUgdG9nZ2xlIGlzIGNsaWNrZWRcbiAgICAgIHN0aWNreV9vbiA6ICdhbGwnLFxuICAgICAgZHJvcGRvd25fYXV0b2Nsb3NlOiB0cnVlXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2VjdGlvbiwgbWV0aG9kLCBvcHRpb25zKSB7XG4gICAgICBGb3VuZGF0aW9uLmluaGVyaXQodGhpcywgJ2FkZF9jdXN0b21fcnVsZSByZWdpc3Rlcl9tZWRpYSB0aHJvdHRsZScpO1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBzZWxmLnJlZ2lzdGVyX21lZGlhKCd0b3BiYXInLCAnZm91bmRhdGlvbi1tcS10b3BiYXInKTtcblxuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuXG4gICAgICBzZWxmLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJywgdGhpcy5zY29wZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b3BiYXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpLFxuICAgICAgICAgICAgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicsIHRoaXMpO1xuICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCAwKTtcbiAgICAgICAgdmFyIHRvcGJhckNvbnRhaW5lciA9IHRvcGJhci5wYXJlbnQoKTtcbiAgICAgICAgaWYgKHRvcGJhckNvbnRhaW5lci5oYXNDbGFzcygnZml4ZWQnKSB8fCBzZWxmLmlzX3N0aWNreSh0b3BiYXIsIHRvcGJhckNvbnRhaW5lciwgc2V0dGluZ3MpICkge1xuICAgICAgICAgIHNlbGYuc2V0dGluZ3Muc3RpY2t5X2NsYXNzID0gc2V0dGluZ3Muc3RpY2t5X2NsYXNzO1xuICAgICAgICAgIHNlbGYuc2V0dGluZ3Muc3RpY2t5X3RvcGJhciA9IHRvcGJhcjtcbiAgICAgICAgICB0b3BiYXIuZGF0YSgnaGVpZ2h0JywgdG9wYmFyQ29udGFpbmVyLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICAgIHRvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnLCB0b3BiYXJDb250YWluZXIub2Zmc2V0KCkudG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3BiYXIuZGF0YSgnaGVpZ2h0JywgdG9wYmFyLm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZXR0aW5ncy5hc3NlbWJsZWQpIHtcbiAgICAgICAgICBzZWxmLmFzc2VtYmxlKHRvcGJhcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICBzZWxmLlMoJy5oYXMtZHJvcGRvd24nLCB0b3BiYXIpLmFkZENsYXNzKCdub3QtY2xpY2snKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLlMoJy5oYXMtZHJvcGRvd24nLCB0b3BiYXIpLnJlbW92ZUNsYXNzKCdub3QtY2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBhZCBib2R5IHdoZW4gc3RpY2t5IChzY3JvbGxlZCkgb3IgZml4ZWQuXG4gICAgICAgIHNlbGYuYWRkX2N1c3RvbV9ydWxlKCcuZi10b3BiYXItZml4ZWQgeyBwYWRkaW5nLXRvcDogJyArIHRvcGJhci5kYXRhKCdoZWlnaHQnKSArICdweCB9Jyk7XG5cbiAgICAgICAgaWYgKHRvcGJhckNvbnRhaW5lci5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIHNlbGYuUygnYm9keScpLmFkZENsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBpc19zdGlja3kgOiBmdW5jdGlvbiAodG9wYmFyLCB0b3BiYXJDb250YWluZXIsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgc3RpY2t5ICAgICA9IHRvcGJhckNvbnRhaW5lci5oYXNDbGFzcyhzZXR0aW5ncy5zdGlja3lfY2xhc3MpO1xuICAgICAgdmFyIHNtYWxsTWF0Y2ggPSBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5zbWFsbCkubWF0Y2hlcztcbiAgICAgIHZhciBtZWRNYXRjaCAgID0gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMubWVkaXVtKS5tYXRjaGVzO1xuICAgICAgdmFyIGxyZ01hdGNoICAgPSBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5sYXJnZSkubWF0Y2hlcztcblxuICAgICAgaWYgKHN0aWNreSAmJiBzZXR0aW5ncy5zdGlja3lfb24gPT09ICdhbGwnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHN0aWNreSAmJiB0aGlzLnNtYWxsKCkgJiYgc2V0dGluZ3Muc3RpY2t5X29uLmluZGV4T2YoJ3NtYWxsJykgIT09IC0xKSB7XG4gICAgICAgIGlmIChzbWFsbE1hdGNoICYmICFtZWRNYXRjaCAmJiAhbHJnTWF0Y2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGlja3kgJiYgdGhpcy5tZWRpdW0oKSAmJiBzZXR0aW5ncy5zdGlja3lfb24uaW5kZXhPZignbWVkaXVtJykgIT09IC0xKSB7XG4gICAgICAgIGlmIChzbWFsbE1hdGNoICYmIG1lZE1hdGNoICYmICFscmdNYXRjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgaWYgKHN0aWNreSAmJiB0aGlzLmxhcmdlKCkgJiYgc2V0dGluZ3Muc3RpY2t5X29uLmluZGV4T2YoJ2xhcmdlJykgIT09IC0xKSB7XG4gICAgICAgIGlmIChzbWFsbE1hdGNoICYmIG1lZE1hdGNoICYmIGxyZ01hdGNoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG5cbiAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHRvZ2dsZSA6IGZ1bmN0aW9uICh0b2dnbGVFbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIHRvcGJhcjtcblxuICAgICAgaWYgKHRvZ2dsZUVsKSB7XG4gICAgICAgIHRvcGJhciA9IHNlbGYuUyh0b2dnbGVFbCkuY2xvc2VzdCgnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcGJhciA9IHNlbGYuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNldHRpbmdzID0gdG9wYmFyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgdmFyIHNlY3Rpb24gPSBzZWxmLlMoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nLCB0b3BiYXIpO1xuXG4gICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcbiAgICAgICAgaWYgKCFzZWxmLnJ0bCkge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0IDogJzAlJ30pO1xuICAgICAgICAgICQoJz4ubmFtZScsIHNlY3Rpb24pLmNzcyh7bGVmdCA6ICcxMDAlJ30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtyaWdodCA6ICcwJSd9KTtcbiAgICAgICAgICAkKCc+Lm5hbWUnLCBzZWN0aW9uKS5jc3Moe3JpZ2h0IDogJzEwMCUnfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLlMoJ2xpLm1vdmVkJywgc2VjdGlvbikucmVtb3ZlQ2xhc3MoJ21vdmVkJyk7XG4gICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIDApO1xuXG4gICAgICAgIHRvcGJhclxuICAgICAgICAgIC50b2dnbGVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLnNjcm9sbHRvcCkge1xuICAgICAgICBpZiAoIXRvcGJhci5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgIGlmICh0b3BiYXIuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHNlbGYuUygnYm9keScpLmFkZENsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0b3BiYXIucGFyZW50KCkuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3Muc2Nyb2xsdG9wKSB7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5yZW1vdmVDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2VsZi5pc19zdGlja3kodG9wYmFyLCB0b3BiYXIucGFyZW50KCksIHNldHRpbmdzKSkge1xuICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3BiYXIucGFyZW50KCkuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICBpZiAoIXRvcGJhci5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgdG9wYmFyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgc2VsZi51cGRhdGVfc3RpY2t5X3Bvc2l0aW9uaW5nKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGJhci5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIHNlbGYuUygnYm9keScpLmFkZENsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0aW1lciA6IG51bGwsXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoYmFyKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgUyA9IHRoaXMuUztcblxuICAgICAgUyh0aGlzLnNjb3BlKVxuICAgICAgICAub2ZmKCcudG9wYmFyJylcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLnRvZ2dsZS10b3BiYXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZWxmLnRvZ2dsZSh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi50b3BiYXIgY29udGV4dG1lbnUuZm5kdG4udG9wYmFyJywgJy50b3AtYmFyIC50b3AtYmFyLXNlY3Rpb24gbGkgYVtocmVmXj1cIiNcIl0sWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLnRvcC1iYXItc2VjdGlvbiBsaSBhW2hyZWZePVwiI1wiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgbGkgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJyksXG4gICAgICAgICAgICAgICAgdG9wYmFyID0gbGkuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5kcm9wZG93bl9hdXRvY2xvc2UgJiYgc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGhvdmVyTGkgPSAkKHRoaXMpLmNsb3Nlc3QoJy5ob3ZlcicpO1xuICAgICAgICAgICAgICBob3ZlckxpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuYnJlYWtwb2ludCgpICYmICFsaS5oYXNDbGFzcygnYmFjaycpICYmICFsaS5oYXNDbGFzcygnaGFzLWRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgc2VsZi50b2dnbGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSBsaS5oYXMtZHJvcGRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBsaSA9IFModGhpcyksXG4gICAgICAgICAgICAgIHRhcmdldCA9IFMoZS50YXJnZXQpLFxuICAgICAgICAgICAgICB0b3BiYXIgPSBsaS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0Jyk7XG5cbiAgICAgICAgICBpZiAodGFyZ2V0LmRhdGEoJ3JldmVhbElkJykpIHtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYuYnJlYWtwb2ludCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyICYmICFNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKGxpLmhhc0NsYXNzKCdob3ZlcicpKSB7XG4gICAgICAgICAgICBsaVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJylcbiAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuXG4gICAgICAgICAgICBsaS5wYXJlbnRzKCdsaS5ob3ZlcicpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGkuYWRkQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgICQobGkpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRbMF0ubm9kZU5hbWUgPT09ICdBJyAmJiB0YXJnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ2hhcy1kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIC5oYXMtZHJvcGRvd24+YScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKHNlbGYuYnJlYWtwb2ludCgpKSB7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgICB0b3BiYXIgPSAkdGhpcy5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgICAgIHNlY3Rpb24gPSB0b3BiYXIuZmluZCgnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicpLFxuICAgICAgICAgICAgICAgIGRyb3Bkb3duSGVpZ2h0ID0gJHRoaXMubmV4dCgnLmRyb3Bkb3duJykub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAkc2VsZWN0ZWRMaSA9ICR0aGlzLmNsb3Nlc3QoJ2xpJyk7XG5cbiAgICAgICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIHRvcGJhci5kYXRhKCdpbmRleCcpICsgMSk7XG4gICAgICAgICAgICAkc2VsZWN0ZWRMaS5hZGRDbGFzcygnbW92ZWQnKTtcblxuICAgICAgICAgICAgaWYgKCFzZWxmLnJ0bCkge1xuICAgICAgICAgICAgICBzZWN0aW9uLmNzcyh7bGVmdCA6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgICAgIHNlY3Rpb24uZmluZCgnPi5uYW1lJykuY3NzKHtsZWZ0IDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24uY3NzKHtyaWdodCA6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgICAgIHNlY3Rpb24uZmluZCgnPi5uYW1lJykuY3NzKHtyaWdodCA6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICR0aGlzLnNpYmxpbmdzKCd1bCcpLm91dGVySGVpZ2h0KHRydWUpICsgdG9wYmFyLmRhdGEoJ2hlaWdodCcpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICBTKHdpbmRvdykub2ZmKCcudG9wYmFyJykub24oJ3Jlc2l6ZS5mbmR0bi50b3BiYXInLCBzZWxmLnRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnJlc2l6ZS5jYWxsKHNlbGYpO1xuICAgICAgfSwgNTApKS50cmlnZ2VyKCdyZXNpemUuZm5kdG4udG9wYmFyJykubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIG9mZnNldCBpcyBjYWxjdWxhdGVkIGFmdGVyIGFsbCBvZiB0aGUgcGFnZXMgcmVzb3VyY2VzIGhhdmUgbG9hZGVkXG4gICAgICAgICAgUyh0aGlzKS50cmlnZ2VyKCdyZXNpemUuZm5kdG4udG9wYmFyJyk7XG4gICAgICB9KTtcblxuICAgICAgUygnYm9keScpLm9mZignLnRvcGJhcicpLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gUyhlLnRhcmdldCkuY2xvc2VzdCgnbGknKS5jbG9zZXN0KCdsaS5ob3ZlcicpO1xuXG4gICAgICAgIGlmIChwYXJlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddIGxpLmhvdmVyJykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gR28gdXAgYSBsZXZlbCBvbiBDbGlja1xuICAgICAgUyh0aGlzLnNjb3BlKS5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIC5oYXMtZHJvcGRvd24gLmJhY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKSxcbiAgICAgICAgICAgIHRvcGJhciA9ICR0aGlzLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICBzZWN0aW9uID0gdG9wYmFyLmZpbmQoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nKSxcbiAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSxcbiAgICAgICAgICAgICRtb3ZlZExpID0gJHRoaXMuY2xvc2VzdCgnbGkubW92ZWQnKSxcbiAgICAgICAgICAgICRwcmV2aW91c0xldmVsVWwgPSAkbW92ZWRMaS5wYXJlbnQoKTtcblxuICAgICAgICB0b3BiYXIuZGF0YSgnaW5kZXgnLCB0b3BiYXIuZGF0YSgnaW5kZXgnKSAtIDEpO1xuXG4gICAgICAgIGlmICghc2VsZi5ydGwpIHtcbiAgICAgICAgICBzZWN0aW9uLmNzcyh7bGVmdCA6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe2xlZnQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtyaWdodCA6IC0oMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykpICsgJyUnfSk7XG4gICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe3JpZ2h0IDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3BiYXIuZGF0YSgnaW5kZXgnKSA9PT0gMCkge1xuICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3BiYXIuY3NzKCdoZWlnaHQnLCAkcHJldmlvdXNMZXZlbFVsLm91dGVySGVpZ2h0KHRydWUpICsgdG9wYmFyLmRhdGEoJ2hlaWdodCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRtb3ZlZExpLnJlbW92ZUNsYXNzKCdtb3ZlZCcpO1xuICAgICAgICB9LCAzMDApO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFNob3cgZHJvcGRvd24gbWVudXMgd2hlbiB0aGVpciBpdGVtcyBhcmUgZm9jdXNlZFxuICAgICAgUyh0aGlzLnNjb3BlKS5maW5kKCcuZHJvcGRvd24gYScpXG4gICAgICAgIC5mb2N1cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuaGFzLWRyb3Bkb3duJykuYWRkQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5ibHVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5oYXMtZHJvcGRvd24nKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlc2l6ZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHNlbGYuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvcGJhciA9IHNlbGYuUyh0aGlzKSxcbiAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICB2YXIgc3RpY2t5Q29udGFpbmVyID0gdG9wYmFyLnBhcmVudCgnLicgKyBzZWxmLnNldHRpbmdzLnN0aWNreV9jbGFzcyk7XG4gICAgICAgIHZhciBzdGlja3lPZmZzZXQ7XG5cbiAgICAgICAgaWYgKCFzZWxmLmJyZWFrcG9pbnQoKSkge1xuICAgICAgICAgIHZhciBkb1RvZ2dsZSA9IHRvcGJhci5oYXNDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICB0b3BiYXJcbiAgICAgICAgICAgIC5jc3MoJ2hlaWdodCcsICcnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuXG4gICAgICAgICAgICBpZiAoZG9Ub2dnbGUpIHtcbiAgICAgICAgICAgICAgc2VsZi50b2dnbGUodG9wYmFyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLmlzX3N0aWNreSh0b3BiYXIsIHN0aWNreUNvbnRhaW5lciwgc2V0dGluZ3MpKSB7XG4gICAgICAgICAgaWYgKHN0aWNreUNvbnRhaW5lci5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBmaXhlZCB0byBhbGxvdyBmb3IgY29ycmVjdCBjYWxjdWxhdGlvbiBvZiB0aGUgb2Zmc2V0LlxuICAgICAgICAgICAgc3RpY2t5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuXG4gICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lDb250YWluZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgaWYgKHNlbGYuUyhkb2N1bWVudC5ib2R5KS5oYXNDbGFzcygnZi10b3BiYXItZml4ZWQnKSkge1xuICAgICAgICAgICAgICBzdGlja3lPZmZzZXQgLT0gdG9wYmFyLmRhdGEoJ2hlaWdodCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0Jywgc3RpY2t5T2Zmc2V0KTtcbiAgICAgICAgICAgIHN0aWNreUNvbnRhaW5lci5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RpY2t5T2Zmc2V0ID0gc3RpY2t5Q29udGFpbmVyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIHRvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnLCBzdGlja3lPZmZzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYnJlYWtwb2ludCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ3RvcGJhciddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBzbWFsbCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1snc21hbGwnXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgbWVkaXVtIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWydtZWRpdW0nXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgbGFyZ2UgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ2xhcmdlJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIGFzc2VtYmxlIDogZnVuY3Rpb24gKHRvcGJhcikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKSxcbiAgICAgICAgICBzZWN0aW9uID0gc2VsZi5TKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJywgdG9wYmFyKTtcblxuICAgICAgLy8gUHVsbCBlbGVtZW50IG91dCBvZiB0aGUgRE9NIGZvciBtYW5pcHVsYXRpb25cbiAgICAgIHNlY3Rpb24uZGV0YWNoKCk7XG5cbiAgICAgIHNlbGYuUygnLmhhcy1kcm9wZG93bj5hJywgc2VjdGlvbikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbGluayA9IHNlbGYuUyh0aGlzKSxcbiAgICAgICAgICAgICRkcm9wZG93biA9ICRsaW5rLnNpYmxpbmdzKCcuZHJvcGRvd24nKSxcbiAgICAgICAgICAgIHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgICAgICR0aXRsZUxpO1xuXG4gICAgICAgIGlmICghJGRyb3Bkb3duLmZpbmQoJy50aXRsZS5iYWNrJykubGVuZ3RoKSB7XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MubW9iaWxlX3Nob3dfcGFyZW50X2xpbmsgPT0gdHJ1ZSAmJiB1cmwpIHtcbiAgICAgICAgICAgICR0aXRsZUxpID0gJCgnPGxpIGNsYXNzPVwidGl0bGUgYmFjayBqcy1nZW5lcmF0ZWRcIj48aDU+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjwvYT48L2g1PjwvbGk+PGxpIGNsYXNzPVwicGFyZW50LWxpbmsgaGlkZS1mb3ItbWVkaXVtLXVwXCI+PGEgY2xhc3M9XCJwYXJlbnQtbGluayBqcy1nZW5lcmF0ZWRcIiBocmVmPVwiJyArIHVybCArICdcIj4nICsgJGxpbmsuaHRtbCgpICsnPC9hPjwvbGk+Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0aXRsZUxpID0gJCgnPGxpIGNsYXNzPVwidGl0bGUgYmFjayBqcy1nZW5lcmF0ZWRcIj48aDU+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjwvYT48L2g1PicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvcHkgbGluayB0byBzdWJuYXZcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuY3VzdG9tX2JhY2tfdGV4dCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAkKCdoNT5hJywgJHRpdGxlTGkpLmh0bWwoc2V0dGluZ3MuYmFja190ZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaDU+YScsICR0aXRsZUxpKS5odG1sKCcmbGFxdW87ICcgKyAkbGluay5odG1sKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkZHJvcGRvd24ucHJlcGVuZCgkdGl0bGVMaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBQdXQgZWxlbWVudCBiYWNrIGluIHRoZSBET01cbiAgICAgIHNlY3Rpb24uYXBwZW5kVG8odG9wYmFyKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIHN0aWNreVxuICAgICAgdGhpcy5zdGlja3koKTtcblxuICAgICAgdGhpcy5hc3NlbWJsZWQodG9wYmFyKTtcbiAgICB9LFxuXG4gICAgYXNzZW1ibGVkIDogZnVuY3Rpb24gKHRvcGJhcikge1xuICAgICAgdG9wYmFyLmRhdGEodGhpcy5hdHRyX25hbWUodHJ1ZSksICQuZXh0ZW5kKHt9LCB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSksIHthc3NlbWJsZWQgOiB0cnVlfSkpO1xuICAgIH0sXG5cbiAgICBoZWlnaHQgOiBmdW5jdGlvbiAodWwpIHtcbiAgICAgIHZhciB0b3RhbCA9IDAsXG4gICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICQoJz4gbGknLCB1bCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvdGFsICs9IHNlbGYuUyh0aGlzKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdG90YWw7XG4gICAgfSxcblxuICAgIHN0aWNreSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5TKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi51cGRhdGVfc3RpY2t5X3Bvc2l0aW9uaW5nKCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlX3N0aWNreV9wb3NpdGlvbmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBrbGFzcyA9ICcuJyArIHRoaXMuc2V0dGluZ3Muc3RpY2t5X2NsYXNzLFxuICAgICAgICAgICR3aW5kb3cgPSB0aGlzLlMod2luZG93KSxcbiAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHNlbGYuc2V0dGluZ3Muc3RpY2t5X3RvcGJhciAmJiBzZWxmLmlzX3N0aWNreSh0aGlzLnNldHRpbmdzLnN0aWNreV90b3BiYXIsdGhpcy5zZXR0aW5ncy5zdGlja3lfdG9wYmFyLnBhcmVudCgpLCB0aGlzLnNldHRpbmdzKSkge1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLnNldHRpbmdzLnN0aWNreV90b3BiYXIuZGF0YSgnc3RpY2t5b2Zmc2V0JykgKyB0aGlzLnNldHRpbmdzLnN0YXJ0X29mZnNldDtcbiAgICAgICAgaWYgKCFzZWxmLlMoa2xhc3MpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgaWYgKCR3aW5kb3cuc2Nyb2xsVG9wKCkgPiAoZGlzdGFuY2UpKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuUyhrbGFzcykuaGFzQ2xhc3MoJ2ZpeGVkJykpIHtcbiAgICAgICAgICAgICAgc2VsZi5TKGtsYXNzKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICgkd2luZG93LnNjcm9sbFRvcCgpIDw9IGRpc3RhbmNlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5TKGtsYXNzKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgICBzZWxmLlMoa2xhc3MpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5yZW1vdmVDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgb2ZmIDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5TKHRoaXMuc2NvcGUpLm9mZignLmZuZHRuLnRvcGJhcicpO1xuICAgICAgdGhpcy5TKHdpbmRvdykub2ZmKCcuZm5kdG4udG9wYmFyJyk7XG4gICAgfSxcblxuICAgIHJlZmxvdyA6IGZ1bmN0aW9uICgpIHt9XG4gIH07XG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIi8qXG4gKlx0alF1ZXJ5IGVsZXZhdGVab29tIDMuMC44XG4gKlx0RGVtbydzIGFuZCBkb2N1bWVudGF0aW9uOlxuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrL2ltYWdlLXpvb21cbiAqXG4gKlx0Q29weXJpZ2h0IChjKSAyMDEyIEFuZHJldyBFYWRlc1xuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrXG4gKlxuICpcdER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIEdQTCBhbmQgTUlUIGxpY2Vuc2VzLlxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2VcbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dOVV9HZW5lcmFsX1B1YmxpY19MaWNlbnNlXG4gKlxuXG4vKlxuICpcdGpRdWVyeSBlbGV2YXRlWm9vbSAzLjAuM1xuICpcdERlbW8ncyBhbmQgZG9jdW1lbnRhdGlvbjpcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51ay9pbWFnZS16b29tXG4gKlxuICpcdENvcHlyaWdodCAoYykgMjAxMiBBbmRyZXcgRWFkZXNcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51a1xuICpcbiAqXHREdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBHUEwgYW5kIE1JVCBsaWNlbnNlcy5cbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HTlVfR2VuZXJhbF9QdWJsaWNfTGljZW5zZVxuICovXG5cblxuaWYgKCB0eXBlb2YgT2JqZWN0LmNyZWF0ZSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9O1xuICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcbiAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgfTtcbn1cblxuKGZ1bmN0aW9uKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG4gICAgdmFyIEVsZXZhdGVab29tID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMsIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtID0gZWxlbTtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtID0gJCggZWxlbSApO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZVNyYyA9IHNlbGYuJGVsZW0uZGF0YShcInpvb20taW1hZ2VcIikgPyBzZWxmLiRlbGVtLmRhdGEoXCJ6b29tLWltYWdlXCIpIDogc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zID0gJC5leHRlbmQoIHt9LCAkLmZuLmVsZXZhdGVab29tLm9wdGlvbnMsIG9wdGlvbnMgKTtcblxuICAgICAgICAgICAgICAgIC8vVElOVCBPVkVSUklERSBTRVRUSU5HU1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5sZW5zQ29sb3VyID0gXCJub25lXCIsIC8vY29sb3VyIG9mIHRoZSBsZW5zIGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5ID0gIFwiMVwiIC8vb3BhY2l0eSBvZiB0aGUgbGVuc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lOTkVSIE9WRVJSSURFIFNFVFRJTkdTXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge3NlbGYub3B0aW9ucy5zaG93TGVucyA9IGZhbHNlO31cblxuXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgYWx0IG9uIGhvdmVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLnJlbW92ZUF0dHIoJ3RpdGxlJykucmVtb3ZlQXR0cignYWx0Jyk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnJlZnJlc2goIDEgKTtcblxuXG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaW1hZ2Ugc3dhcCBmcm9tIHRoZSBnYWxsZXJ5XG4gICAgICAgICAgICAgICAgJCgnIycrc2VsZi5vcHRpb25zLmdhbGxlcnkgKyAnIGEnKS5jbGljayggZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGEgY2xhc3Mgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgZ2FsbGVyeSBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuZ2FsbGVyeUFjdGl2ZUNsYXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnK3NlbGYub3B0aW9ucy5nYWxsZXJ5ICsgJyBhJykucmVtb3ZlQ2xhc3Moc2VsZi5vcHRpb25zLmdhbGxlcnlBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKHNlbGYub3B0aW9ucy5nYWxsZXJ5QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcCBhbnkgbGluayBvbiB0aGUgYSB0YWcgZnJvbSB3b3JraW5nXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NhbGwgdGhlIHN3YXAgaW1hZ2UgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKSl7c2VsZi56b29tSW1hZ2VQcmUgPSAkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpfVxuICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbUltYWdlUHJlID0gJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIik7fVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXB0aGVpbWFnZSgkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKSwgc2VsZi56b29tSW1hZ2VQcmUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCBsZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mZXRjaChzZWxmLmltYWdlU3JjKTtcblxuICAgICAgICAgICAgICAgIH0sIGxlbmd0aCB8fCBzZWxmLm9wdGlvbnMucmVmcmVzaCApO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKGltZ3NyYykge1xuICAgICAgICAgICAgICAgIC8vZ2V0IHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgbGFyZ2UgaW1hZ2UgZGltZW5zaW9ucyAtIHVzZWQgdG8gY2FsY3VsdGUgcmF0aW8nc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAvL29uY2UgaW1hZ2UgaXMgbG9hZGVkIHN0YXJ0IHRoZSBjYWxsc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGNhbGxlciBrbm93IGltYWdlIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMub25ab29tZWRJbWFnZUxvYWRlZChzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGltZ3NyYzsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnRab29tOiBmdW5jdGlvbiggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vZ2V0IGRpbWVuc2lvbnMgb2YgdGhlIG5vbiB6b29tZWQgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvL2FjdGl2YXRlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzTGVuc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNUaW50QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5vdmVyV2luZG93ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL0Nyb3NzRmFkZSBXcmFwcGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwID0gc2VsZi4kZWxlbS53cmFwKCc8ZGl2IHN0eWxlPVwiaGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O1wiIGNsYXNzPVwiem9vbVdyYXBwZXJcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMTtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy56b29tTGV2ZWw7XG5cblxuICAgICAgICAgICAgICAgIC8vZ2V0IG9mZnNldCBvZiB0aGUgbm9uIHpvb21lZCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSB3aWR0aCByYXRpbyBvZiB0aGUgbGFyZ2Uvc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56SGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAvL2lmIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3RleHQtYWxpZ246Y2VudGVyO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dCZ0NvbG91cilcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7d2lkdGg6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXNpemU6IFwiKyBzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsKyBcInB4IFwiICtzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO3otaW5kZXg6MTAwO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweCBzb2xpZCBcIiArIHNlbGYub3B0aW9ucy5ib3JkZXJDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vaWYgaW5uZXIgIHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaGFzIGEgYm9yZGVyIGJlZW4gcHV0IG9uIHRoZSBpbWFnZT8gTGV0cyBjYXRlciBmb3IgdGhpc1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3JkZXJXaWR0aCA9IHNlbGYuJGVsZW0uY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tbGVmdDogXCIgKyBTdHJpbmcoYm9yZGVyV2lkdGgpICsgXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tdG9wOiBcIiArIFN0cmluZyhib3JkZXJXaWR0aCkgKyBcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDogXCIgKyBTdHJpbmcoc2VsZi5ueldpZHRoKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6IFwiICsgU3RyaW5nKHNlbGYubnpIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiY3Vyc29yOlwiKyhzZWxmLm9wdGlvbnMuY3Vyc29yKStcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4IHNvbGlkIFwiICsgc2VsZi5vcHRpb25zLmJvcmRlckNvbG91clxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAvL2xlbnMgc3R5bGUgZm9yIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1N0eWxlID0gXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3dpZHRoOiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArIFwicHg7aGVpZ2h0OiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pXG4gICAgICAgICAgICAgICAgICAgICsgXCJweDtmbG9hdDogcmlnaHQ7ZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiei1pbmRleDogOTk5O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCItd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3BhY2l0eTpcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KStcIjtmaWx0ZXI6IGFscGhhKG9wYWNpdHkgPSBcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KjEwMCkrXCIpOyB6b29tOjE7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOlwiK2xlbnNXaWR0aCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6XCIrbGVuc0hlaWdodCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKyhzZWxmLm9wdGlvbnMubGVuc0NvbG91cikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImN1cnNvcjpcIisoc2VsZi5vcHRpb25zLmN1cnNvcikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlcjogXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSkrXCJweFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgc29saWQgXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyQ29sb3VyKStcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O3Bvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vdGludCBzdHlsZVxuICAgICAgICAgICAgICAgIHNlbGYudGludFN0eWxlID0gXCJkaXNwbGF5OiBibG9jaztcIlxuICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIitzZWxmLm9wdGlvbnMudGludENvbG91citcIjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiZmlsdGVyOmFscGhhKG9wYWNpdHk9MCk7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIm9wYWNpdHk6IDA7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOiBcIiArIHNlbGYubnpXaWR0aCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBzZWxmLm56SGVpZ2h0ICsgXCJweDtcIlxuXG4gICAgICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgIC8vbGVucyBzdHlsZSBmb3IgbGVucyB6b29tIHdpdGggb3B0aW9uYWwgcm91bmQgZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAgICAgICAgIHNlbGYubGVuc1JvdW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNTdHlsZSA9IFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImZsb2F0OiBsZWZ0O2Rpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXI6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHggc29saWQgXCIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyQ29sb3VyK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6XCIrIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OlwiKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKStcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy9kb2VzIG5vdCByb3VuZCBpbiBhbGwgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubGVuc1NoYXBlID09IFwicm91bmRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNSb3VuZCA9IFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBkaXYncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJcIlxuICAgICAgICAgICAgICAgIC8vc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3pvb21Db250YWluZXInKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiaGVpZ2h0XCI6c2VsZi5uekhlaWdodCwgXCJ3aWR0aFwiOnNlbGYubnpXaWR0aH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInpvb21Db250YWluZXJcIiBzdHlsZT1cIi13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6JytzZWxmLm56T2Zmc2V0LmxlZnQrJ3B4O3RvcDonK3NlbGYubnpPZmZzZXQudG9wKydweDtoZWlnaHQ6JytzZWxmLm56SGVpZ2h0KydweDt3aWR0aDonK3NlbGYubnpXaWR0aCsncHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChzZWxmLnpvb21Db250YWluZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgd2lsbCBhZGQgb3ZlcmZsb3cgaGlkZGVuIGFuZCBjb250cmFpbiB0aGUgbGVucyBvbiBsZW5zIG1vZGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29udGFpbkxlbnNab29tICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zID0gJChcIjxkaXYgY2xhc3M9J3pvb21MZW5zJyBzdHlsZT0nXCIgKyBzZWxmLmxlbnNTdHlsZSArIHNlbGYubGVuc1JvdW5kICtcIic+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0aW50Q29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50ID0gJChcIjxkaXYgY2xhc3M9J3pvb21UaW50JyBzdHlsZT0nXCIrc2VsZi50aW50U3R5bGUrXCInPjwvZGl2PlwiKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLndyYXAoc2VsZi50aW50Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50Y3NzID0gc2VsZi56b29tTGVucy5hZnRlcihzZWxmLnpvb21UaW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aW50IGVuYWJsZWQgLSBzZXQgYW4gaW1hZ2UgdG8gc2hvdyBvdmVyIHRoZSB0aW50XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZSA9ICQoJzxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDBweDsgdG9wOiAwcHg7IG1heC13aWR0aDogbm9uZTsgd2lkdGg6ICcrc2VsZi5ueldpZHRoKydweDsgaGVpZ2h0OiAnK3NlbGYubnpIZWlnaHQrJ3B4O1wiIHNyYz1cIicrc2VsZi5pbWFnZVNyYysnXCI+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21MZW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHpvb20gd2luZG93XG4gICAgICAgICAgICAgICAgaWYoaXNOYU4oc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbikpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3dDb250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnem9vbVdpbmRvd0NvbnRhaW5lcicpLmNzcyhcIndpZHRoXCIsc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LndyYXAoc2VsZi56b29tV2luZG93Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gIHNlbGYuY2FwdGlvblN0eWxlID0gXCJ0ZXh0LWFsaWduOiBsZWZ0O2JhY2tncm91bmQtY29sb3I6IGJsYWNrO2NvbG9yOiB3aGl0ZTtmb250LXdlaWdodDogYm9sZDtwYWRkaW5nOiAxMHB4O2ZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO2ZvbnQtc2l6ZTogMTFweFwiO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuem9vbUNhcHRpb24gPSAkKCc8ZGl2IGNsYXNzPVwiZWxldmF0ZXpvb20tY2FwdGlvblwiIHN0eWxlPVwiJytzZWxmLmNhcHRpb25TdHlsZSsnZGlzcGxheTogYmxvY2s7IHdpZHRoOiAyODBweDtcIj5JTlNFUlQgQUxUIFRBRzwvZGl2PicpLmFwcGVuZFRvKHNlbGYuem9vbVdpbmRvdy5wYXJlbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgc2VsZi5pbWFnZVNyYyArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tRU5EIFRIRSBaT09NIFdJTkRPVyBBTkQgTEVOUy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgICAgIC8vdG91Y2ggZXZlbnRzXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24odG91Y2gpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRvdWNoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbih0b3VjaCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL05lZWRlZCB0byB3b3JrIGluIElFXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vdmVyV2luZG93ID09IGZhbHNlKXtzZWxmLnNldEVsZW1lbnRzKFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3ZlcldpbmRvdyA9PSBmYWxzZSl7c2VsZi5zZXRFbGVtZW50cyhcInNob3dcIik7fVxuXG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5vdmVyV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vICBsZW5zRmFkZU91dDogNTAwLCAgem9vbVRpbnRGYWRlSW5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYWRkKHNlbGYuJGVsZW0pLm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm92ZXJXaW5kb3cgPT0gZmFsc2Upe3NlbGYuc2V0RWxlbWVudHMoXCJzaG93XCIpO31cblxuXG4gICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5zY3JvbGxMb2NrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9lbmQgb3ZlIGltYWdlXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub3ZlcldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVsZW1lbnRzKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZW5kIG92ZSBpbWFnZVxuXG5cblxuLy9cdFx0XHRcdHZhciBkZWx0YSA9IHBhcnNlSW50KGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IC1lLm9yaWdpbmFsRXZlbnQuZGV0YWlsKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgJCh0aGlzKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vZml4IGZvciBpbml0aWFsIHpvb20gc2V0dGluZ1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuem9vbUxldmVsICE9IDEpe1xuICAgICAgICAgICAgICAgICAgICAvL1x0c2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIG1pbiB6b29tbGV2ZWxcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5ab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pblpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50ICogMjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zY3JvbGxab29tKXtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5hZGQoc2VsZi4kZWxlbSkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCBNb3pNb3VzZVBpeGVsU2Nyb2xsJywgZnVuY3Rpb24oZSl7XG5cblxuLy9cdFx0XHRcdFx0XHRpbiBJRSB0aGVyZSBpcyBpc3N1ZSB3aXRoIGZpcmluZyBvZiBtb3VzZWxlYXZlIC0gU28gY2hlY2sgd2hldGhlciBzdGlsbCBzY3JvbGxpbmdcbi8vXHRcdFx0XHRcdFx0YW5kIG9uIG1vdXNlbGVhdmUgY2hlY2sgaWYgc2Nyb2xsbG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCgkLmRhdGEodGhpcywgJ3RpbWVyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsICd0aW1lcicsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDI1MCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhlRXZlbnQgPSBlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSB8fCBlLm9yaWdpbmFsRXZlbnQuZGV0YWlsKi0xXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNjcm9sbFRvcCArPSAoIGRlbHRhIDwgMCA/IDEgOiAtMSApICogMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGVFdmVudCAvMTIwID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsID49IHNlbGYubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxpbmcgZG93blxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsIDw9IHNlbGYub3B0aW9ucy5tYXhab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwocGFyc2VGbG9hdChzZWxmLmN1cnJlbnRab29tTGV2ZWwpK3NlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FuZHlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb21MZXZlbChwYXJzZUZsb2F0KHNlbGYuY3VycmVudFpvb21MZXZlbCkrc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVsZW1lbnRzOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZighc2VsZi5vcHRpb25zLnpvb21FbmFibGVkKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1dpbmRvd1NldCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9wdGlvbnMudGludCkge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcdHNlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoIXNlbGYub3B0aW9ucy56b29tRW5hYmxlZCl7cmV0dXJuIGZhbHNlO31cblxuICAgICAgICAgICAgICAgIC8vcmVjYWNsYyBvZmZzZXQgZWFjaCB0aW1lIGluIGNhc2UgdGhlIGltYWdlIG1vdmVzXG4gICAgICAgICAgICAgICAgLy90aGlzIGNhbiBiZSBjYXVzZWQgYnkgb3RoZXIgb24gcGFnZSBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyB0b3A6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBsZWZ0OiAwfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc2V0IHJlc3BvbnNpdmVcbiAgICAgICAgICAgICAgICAvL3dpbGwgY2hlY2tpbmcgaWYgdGhlIGltYWdlIG5lZWRzIGNoYW5naW5nIGJlZm9yZSBydW5uaW5nIHRoaXMgY29kZSB3b3JrIGZhc3Rlcj9cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMucmVzcG9uc2l2ZSAmJiAhc2VsZi5vcHRpb25zLnNjcm9sbFpvb20pe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gc2VsZi5sYXJnZVdpZHRoIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9zc2libHkgZG9udCBuZWVkIHRvIGtlZXAgcmVjYWxjYWxjdWxhdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGxlbnMgaXMgaGVpZ2hlciB0aGFuIHRoZSBpbWFnZSwgdGhlbiBzZXQgbGVucyBzaXplIHRvIGltYWdlIHNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnaGVpZ2h0JywgbGVuc0hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoJ3dpZHRoJywgc2VsZi5ueldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcygnaGVpZ2h0Jywgc2VsZi5uekhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgd2lkdGg6IFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICsgJ3B4JywgaGVpZ2h0OiBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKSArICdweCcgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VuZCByZXNwb25zaXZlIGltYWdlIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jb250YWluZXIgZml4XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyh7IHRvcDogc2VsZi5uek9mZnNldC50b3B9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKHsgbGVmdDogc2VsZi5uek9mZnNldC5sZWZ0fSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3VzZUxlZnQgPSBwYXJzZUludChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlVG9wID0gcGFyc2VJbnQoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKTtcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgTG9jYXRpb24gb2YgdGhlIExlbnNcblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBib3VuZCByZWdpb25zIC0gYnV0IG9ubHkgaWYgem9vbSB3aW5kb3dcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkV0b3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA8IChzZWxmLnpvb21MZW5zLmhlaWdodCgpLzIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FYm9wcG9zID0gKHNlbGYubW91c2VUb3AgPiBzZWxmLm56SGVpZ2h0IC0gKHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWxvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA8IDArKChzZWxmLnpvb21MZW5zLndpZHRoKCkvMikpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5Fcm9wcG9zID0gKHNlbGYubW91c2VMZWZ0ID4gKHNlbGYubnpXaWR0aCAtIChzZWxmLnpvb21MZW5zLndpZHRoKCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgYm91bmQgcmVnaW9ucyAtIGJ1dCBvbmx5IGZvciBpbm5lciB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXRvcHBvcyA9IChzZWxmLm1vdXNlVG9wIDwgKChzZWxmLm56SGVpZ2h0LzIpL3NlbGYuaGVpZ2h0UmF0aW8pICk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWJvcHBvcyA9IChzZWxmLm1vdXNlVG9wID4gKHNlbGYubnpIZWlnaHQgLSAoKHNlbGYubnpIZWlnaHQvMikvc2VsZi5oZWlnaHRSYXRpbykpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FbG9wcG9zID0gKHNlbGYubW91c2VMZWZ0IDwgMCsoKChzZWxmLm56V2lkdGgvMikvc2VsZi53aWR0aFJhdGlvKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVyb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPiAoc2VsZi5ueldpZHRoIC0gKHNlbGYubnpXaWR0aC8yKS9zZWxmLndpZHRoUmF0aW8tKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBtb3VzZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGlzIG9uZSBvZiB0aGUgb3V0ZXJib3VuZHMsIHRoZW4gaGlkZSAgd2luZG93IGFuZCBsZW5zXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubW91c2VMZWZ0IDw9IDAgfHwgc2VsZi5tb3VzZVRvcCA8IDAgfHwgc2VsZi5tb3VzZUxlZnQgPiBzZWxmLm56V2lkdGggfHwgc2VsZi5tb3VzZVRvcCA+IHNlbGYubnpIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZWxzZSBjb250aW51ZSB3aXRoIG9wZXJhdGlvbnNcbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vbGVucyBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cdFx0c2VsZi5zaG93SGlkZUxlbnMoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgYmFja2dyb3VuZCBwb3NpdGlvbiBvZiBsZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gU3RyaW5nKHNlbGYubW91c2VMZWZ0IC0gc2VsZi56b29tTGVucy53aWR0aCgpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBTdHJpbmcoc2VsZi5tb3VzZVRvcCAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9hZGp1c3QgdGhlIGJhY2tncm91bmQgcG9zaXRpb24gaWYgdGhlIG1vdXNlIGlzIGluIG9uZSBvZiB0aGUgb3V0ZXIgcmVnaW9uc1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVG9wIHJlZ2lvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkV0b3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0xlZnQgUmVnaW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3M9MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1NldCBib3R0b20gYW5kIHJpZ2h0IHJlZ2lvbiBmb3Igd2luZG93IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gTWF0aC5tYXgoIChzZWxmLm56SGVpZ2h0KS1zZWxmLnpvb21MZW5zLmhlaWdodCgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMiksIDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IChzZWxmLm56V2lkdGgtKHNlbGYuem9vbUxlbnMud2lkdGgoKSktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgYm90dG9tIGFuZCByaWdodCByZWdpb24gZm9yIGlubmVyIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBNYXRoLm1heCggKChzZWxmLm56SGVpZ2h0KS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSwgMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gKHNlbGYubnpXaWR0aC0oc2VsZi5ueldpZHRoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVucyB6b29tXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCkgKiBzZWxmLndpZHRoUmF0aW8gLSBzZWxmLnpvb21MZW5zLndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApICogc2VsZi5oZWlnaHRSYXRpbyAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFdpbmRvd1Bvc3RpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIHRpbnQgem9vbVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFRpbnRQb3NpdGlvbihlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBjc3MgYmFja2dyb3VuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgbGVmdDogc2VsZi5sZW5zTGVmdFBvcyArICdweCcsIHRvcDogc2VsZi5sZW5zVG9wUG9zICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGVsc2VcblxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVdpbmRvdzogZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tV2luZG93LnNob3coKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21XaW5kb3cuaGlkZSgpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZUxlbnM6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc0xlbnNBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxlbnNGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy5sZW5zRmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5zaG93KCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNMZW5zQWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sZW5zRmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLmxlbnNGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVRpbnQ6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKS5zdG9wKHRydWUsIHRydWUpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnNob3coKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzVGludEFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tVGludC5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1RpbnRBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMZW5zUG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0V2luZG93UG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBvYmouc2xpY2UoIDAsIGNvdW50ICk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgaWYoIWlzTmFOKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pKXtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTsvL0RPTkUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgrc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC8yKS0oc2VsZi5uekhlaWdodC8yKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAtIChzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAzLDlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpLShzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAtIDUsMTVcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC8yKS0oc2VsZi5ueldpZHRoLzIpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSAwOyAvL0RPTkUgNywgMTNcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiAgLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0IC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC0gKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIDMsOVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9ICgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvMiktKHNlbGYubnpIZWlnaHQvMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oMCk7IC8vRE9ORSA3LCAxM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvMiktKHNlbGYubnpXaWR0aC8yKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE1Oi8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgtc2VsZi56b29tV2luZG93LndpZHRoKCktKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIC0gNSwxNVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6ICAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eSk7Ly9ET05FIC0gMVxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy9lbmQgaXNOQU5cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAvL1dFIENBTiBQT1NJVElPTiBJTiBBIENMQVNTIC0gQVNTVU1FIFRIQVQgQU5ZIFNUUklORyBQQVNTRUQgSVNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lciA9ICQoJyMnK3NlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyV2lkdGggPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXJIZWlnaHQgPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0ID0gc2VsZi5leHRlcm5hbENvbnRhaW5lci5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXJPZmZzZXQudG9wOy8vRE9ORSAtIDFcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID1zZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0LmxlZnQ7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gc2VsZi53aW5kb3dPZmZzZXRUb3AgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eTtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSBzZWxmLndpbmRvd09mZnNldExlZnQgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eDtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyB0b3A6IHNlbGYud2luZG93T2Zmc2V0VG9wfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGxlZnQ6IHNlbGYud2luZG93T2Zmc2V0TGVmdH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgdG9wOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBsZWZ0OiAwfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IFN0cmluZygoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpICogc2VsZi53aWR0aFJhdGlvIC0gc2VsZi56b29tV2luZG93LndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gU3RyaW5nKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAqIHNlbGYuaGVpZ2h0UmF0aW8gLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXRvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAwO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVsb3Bwb3Mpe3NlbGYud2luZG93TGVmdFBvcyA9IDA7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAoc2VsZi5sYXJnZUhlaWdodC9zZWxmLmN1cnJlbnRab29tTGV2ZWwtc2VsZi56b29tV2luZG93LmhlaWdodCgpKSooLTEpOyAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7c2VsZi53aW5kb3dMZWZ0UG9zID0gKChzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpKSooLTEpKTt9XG5cbiAgICAgICAgICAgICAgICAvL3N0b3BzIG1pY3JvIG1vdmVtZW50c1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGx3aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIGNzcyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21Mb2NrID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9vdmVycmlkZXMgZm9yIGltYWdlcyBub3Qgem9vbWFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYud2lkdGhSYXRpbyA8PSAxKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmhlaWdodFJhdGlvIDw9IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1hZ2VzIGxlc3MgdGhhbiB0aGUgd2luZG93IGhlaWdodFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgem9vbXdpbmRvdyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZWFzaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKHNlbGYuY2hhbmdlWm9vbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBwb3MgdG8gMCBpZiBub3Qgc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi54cCl7c2VsZi54cCA9IDA7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYueXApe3NlbGYueXAgPSAwO31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbG9vcCBub3QgYWxyZWFkeSBzdGFydGVkLCB0aGVuIHJ1biBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgemVubydzIHBhcmFkb3hcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwICs9IChzZWxmLndpbmRvd0xlZnRQb3MgIC0gc2VsZi54cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnlwICs9IChzZWxmLndpbmRvd1RvcFBvcyAgLSBzZWxmLnlwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2Nyb2xsaW5nTG9jayl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi54cCA9IHNlbGYud2luZG93TGVmdFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueXAgPSBzZWxmLndpbmRvd1RvcFBvc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwID0gKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KSAqIHNlbGYud2lkdGhSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy53aWR0aCgpIC8gMikgKiAoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi55cCA9ICgoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgKiBzZWxmLmhlaWdodFJhdGlvIC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC8gMikgKiAoLTEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGlmKCFzZWxmLmJneHApe3NlbGYuYmd4cCA9IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmJneXApe3NlbGYuYmd5cCA9IHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSA7fVxuICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuYmdsb29wKXtcbiAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmdsb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICBzZWxmLmJneHAgKz0gKHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlICAtIHNlbGYuYmd4cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJneXAgKz0gKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSAgLSBzZWxmLmJneXApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcblxuICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5iZ3hwICsgJ3B4ICcgKyBzZWxmLmJneXAgKyAncHgnIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgIH0sIDE2KTtcblxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYueHAgKyAncHggJyArIHNlbGYueXAgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCkgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VGludFBvc2l0aW9uOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50cG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCktKHNlbGYuem9vbUxlbnMud2lkdGgoKSAvIDIpKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApIC0gc2VsZi56b29tTGVucy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FdG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcz0wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gKHNlbGYubnpIZWlnaHQtc2VsZi56b29tTGVucy5oZWlnaHQoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSooLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3MgPSAoKHNlbGYubnpXaWR0aC1zZWxmLnpvb21MZW5zLndpZHRoKCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkqKC0xKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcHMgbWljcm8gbW92ZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKHsnbGVmdCc6IHNlbGYudGludHBvcysncHgnfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3Moeyd0b3AnOiBzZWxmLnRpbnRwb3N5KydweCd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzd2FwdGhlaW1hZ2U6IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubG9hZGluZ0ljb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwaW5uZXIgPSAkKCc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKFxcJycrc2VsZi5vcHRpb25zLmxvYWRpbmdJY29uKydcXCcpIG5vLXJlcGVhdCBjZW50ZXI7aGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O3otaW5kZXg6IDIwMDA7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmFmdGVyKHNlbGYuc3Bpbm5lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9uSW1hZ2VTd2FwKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IGxhcmdlaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0ICsgJ3B4JyB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dhcEFjdGlvbihzbWFsbGltYWdlLCBsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gbGFyZ2VpbWFnZTsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN3YXBBY3Rpb246IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nMiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZzIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmUtY2FsY3VsYXRlIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gbmV3SW1nMi5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IG5ld0ltZzIud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5vbkltYWdlU3dhcENvbXBsZXRlKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nMi5zcmMgPSBzbWFsbGltYWdlO1xuXG4gICAgICAgICAgICAgICAgLy9yZXNldCB0aGUgem9vbWxldmVsIHRvIHRoYXQgaW5pdGlhbGx5IHNldCBpbiBvcHRpb25zXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnpvb21MZXZlbDtcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSBtYWluIGltYWdlXG4gICAgICAgICAgICAgICAgLy9zZWxmLiRlbGVtLmF0dHIoXCJzcmNcIixzbWFsbGltYWdlKTtcbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSB6b29tIGltYWdlXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIGxhcmdlaW1hZ2UgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEltYWdlID0gbGFyZ2VpbWFnZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWcgPSBzZWxmLiRlbGVtO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gb2xkSW1nLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYWZ0ZXIobmV3SW1nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgXHRcdFx0XHRpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgYW55IGF0dHJpYnV0ZXMgb24gdGhlIGNsb25lZCBpbWFnZSBzbyB3ZSBjYW4gcmVzaXplIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud2lkdGgoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJ3aWR0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oZWlnaHQoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJoZWlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9sZEltZy5mYWRlSW4oc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWdUaW50ID0gc2VsZi56b29tVGludEltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0ltZ1RpbnQgPSBvbGRJbWdUaW50LmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcInNyY1wiLGxhcmdlaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYWZ0ZXIobmV3SW1nVGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWdUaW50LnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZEltZ1RpbnQuZmFkZUluKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcIndpZHRoXCIsZWxlbS5kYXRhKFwiaW1hZ2VcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2l6ZSB0aGUgdGludCB3aW5kb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgaGVpZ2h0OiBzZWxmLiRlbGVtLmhlaWdodCgpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IHdpZHRoOiBzZWxmLiRlbGVtLndpZHRoKCl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJzcmNcIixsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJ3aWR0aFwiLGVsZW0uZGF0YShcImltYWdlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwiaGVpZ2h0XCIsc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuem9vbVRpbnRJbWFnZS5hdHRyKCdzcmMnKSA9IGVsZW0uZGF0YShcImltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyh7IGhlaWdodDogc2VsZi4kZWxlbS5oZWlnaHQoKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBoZWlnaHQ6IHNlbGYuJGVsZW0uaGVpZ2h0KCl9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9UaGlzIHdpbGwgY29udHJhaW4gdGhlIGltYWdlIHByb3BvcnRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlID09IFwiaGVpZ2h0XCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBcImF1dG9cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3R3aWR0aCA9IHNlbGYuem9vbVdyYXAud2lkdGgoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0d2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUgPT0gXCJ3aWR0aFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdGhlaWdodCA9IHNlbGYuem9vbVdyYXAuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0aGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9uZUNhbGxiYWNrOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sb2FkaW5nSWNvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3Bpbm5lci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHpvb21sZXZlbCBiYWNrIHRvIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuem9vbUxldmVsO1xuXG4gICAgICAgICAgICAgICAgLy9yYXRpbyBvZiB0aGUgbGFyZ2UgdG8gc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSBzZWxmLmxhcmdlV2lkdGggLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy9ORUVEIFRPIEFERCBUSEUgTEVOUyBTSVpFIEZPUiBST1VORFxuICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21MZW5zKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCdoZWlnaHQnLCBsZW5zSGVpZ2h0KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q3VycmVudEltYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi56b29tSW1hZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0R2FsbGVyeUxpc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vbG9vcCB0aHJvdWdoIHRoZSBnYWxsZXJ5IG9wdGlvbnMgYW5kIHNldCB0aGVtIGluIGxpc3QgZm9yIGZhbmN5Ym94XG4gICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2FsbGVyeSl7XG5cblxuICAgICAgICAgICAgICAgICAgICAkKCcjJytzZWxmLm9wdGlvbnMuZ2FsbGVyeSArICcgYScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWdfc3JjID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdfc3JjID0gJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ19zcmMgPSAkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHV0IHRoZSBjdXJyZW50IGltYWdlIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW1nX3NyYyA9PSBzZWxmLnpvb21JbWFnZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycraW1nX3NyYysnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK2ltZ19zcmMrJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgbm8gZ2FsbGVyeSAtIHJldHVybiBjdXJyZW50IGltYWdlXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK3NlbGYuem9vbUltYWdlKycnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nYWxsZXJ5bGlzdDtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVpvb21MZXZlbDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIC8vZmxhZyBhIHpvb20sIHNvIGNhbiBhZGp1c3QgdGhlIGVhc2luZyBkdXJpbmcgc2V0UG9zaXRpb25cbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy9yb3VuZCB0byB0d28gZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL21heHdpZHRoICYgTWF4aGVpZ2h0IG9mIHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIG1heGhlaWdodG5ld3ZhbHVlID0gc2VsZi5sYXJnZUhlaWdodC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0IC8gc2VsZi5uekhlaWdodCkgKiBzZWxmLm56SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHNlbGYubGFyZ2VXaWR0aC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGggLyBzZWxmLm56V2lkdGgpICogc2VsZi5ueldpZHRoKTtcblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIG5ldyBoZWlnaHRyYXRpb1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihtYXhoZWlnaHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbWF4aGVpZ2h0bmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L25ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuLy9cdFx0XHRcdFx0Y2FsY3VsYXRlIG5ldyB3aWR0aCByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1heHdpZHRodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbWF4d2lkdGh0bmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBtYXhoZWlnaHRuZXd2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhoZWlnaHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZUhlaWdodC9zZWxmLm56SGVpZ2h0KS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZVdpZHRoL3NlbGYubnpXaWR0aCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3dmFsdWUgPSBtYXh3aWR0aHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heGhlaWdodG5ld3ZhbHVlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4d2lkdGh0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGlubmVyXG4gICAgICAgICAgICAgICAgc2NyY29udGludWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYubmV3dmFsdWV3aWR0aCA8PSBtYXh3aWR0aHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA+IHNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5uZXd2YWx1ZXdpZHRoIDw9IG1heHdpZHRodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc2NyY29udGludWUpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlbnMgaGVpZ2h0IGlzIGxlc3MgdGhhbiBpbWFnZSBoZWlnaHRcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pIDw9IHNlbGYubnpIZWlnaHQpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWVoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHtoZWlnaHQ6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKSA8PSBzZWxmLm56V2lkdGgpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uZXd2YWx1ZXdpZHRoID4gc2VsZi5uZXd2YWx1ZWhlaWdodCkgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7d2lkdGg6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArICdweCcgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIiB8fCBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPiBzZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSAgICAgIC8vdW5kZXJcblxuICAgICAgICAgICAgICAgIC8vc2V0cyB0aGUgYm91bmRyeSBjaGFuZ2UsIGNhbGxlZCBpbiBzZXRXaW5kb3dQb3NcbiAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHNlbGYuY3VycmVudExvYyk7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUFsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21XaW5kb3cpe3NlbGYuem9vbVdpbmRvdy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbUxlbnMpe3NlbGYuem9vbUxlbnMuaGlkZSgpO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21UaW50KXtzZWxmLnpvb21UaW50LmhpZGUoKTt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ2VuYWJsZScpe3NlbGYub3B0aW9ucy56b29tRW5hYmxlZCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09ICdkaXNhYmxlJyl7c2VsZi5vcHRpb25zLnpvb21FbmFibGVkID0gZmFsc2U7fVxuXG4gICAgICAgICAgICB9XG5cbiAgICB9O1xuXG5cblxuXG4gICAgJC5mbi5lbGV2YXRlWm9vbSA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZXZhdGUgPSBPYmplY3QuY3JlYXRlKCBFbGV2YXRlWm9vbSApO1xuXG4gICAgICAgICAgICBlbGV2YXRlLmluaXQoIG9wdGlvbnMsIHRoaXMgKTtcblxuICAgICAgICAgICAgJC5kYXRhKCB0aGlzLCAnZWxldmF0ZVpvb20nLCBlbGV2YXRlICk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uZWxldmF0ZVpvb20ub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHpvb21BY3RpdmF0aW9uOiBcImhvdmVyXCIsIC8vIENhbiBhbHNvIGJlIGNsaWNrIChQTEFDRUhPTERFUiBGT1IgTkVYVCBWRVJTSU9OKVxuICAgICAgem9vbUVuYWJsZWQ6IHRydWUsIC8vZmFsc2UgZGlzYWJsZXMgem9vbXdpbmRvdyBmcm9tIHNob3dpbmdcbiAgICAgICAgICAgIHByZWxvYWRpbmc6IDEsIC8vYnkgZGVmYXVsdCwgbG9hZCBhbGwgdGhlIGltYWdlcywgaWYgMCwgdGhlbiBvbmx5IGxvYWQgaW1hZ2VzIGFmdGVyIGFjdGl2YXRlZCAoUExBQ0VIT0xERVIgRk9SIE5FWFQgVkVSU0lPTilcbiAgICAgICAgICAgIHpvb21MZXZlbDogMSwgLy9kZWZhdWx0IHpvb20gbGV2ZWwgb2YgaW1hZ2VcbiAgICAgICAgICAgIHNjcm9sbFpvb206IGZhbHNlLCAvL2FsbG93IHpvb20gb24gbW91c2V3aGVlbCwgdHJ1ZSB0byBhY3RpdmF0ZVxuICAgICAgICAgICAgc2Nyb2xsWm9vbUluY3JlbWVudDogMC4xLCAgLy9zdGVwcyBvZiB0aGUgc2Nyb2xsem9vbVxuICAgICAgICAgICAgbWluWm9vbUxldmVsOiBmYWxzZSxcbiAgICAgICAgICAgIG1heFpvb21MZXZlbDogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmc6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nQW1vdW50OiAxMixcbiAgICAgICAgICAgIGxlbnNTaXplOiAyMDAsXG4gICAgICAgICAgICB6b29tV2luZG93V2lkdGg6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dIZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dPZmZldHg6IDAsXG4gICAgICAgICAgICB6b29tV2luZG93T2ZmZXR5OiAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd1Bvc2l0aW9uOiAxLFxuICAgICAgICAgICAgem9vbVdpbmRvd0JnQ29sb3VyOiBcIiNmZmZcIixcbiAgICAgICAgICAgIGxlbnNGYWRlSW46IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0ZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgem9vbVdpbmRvd0ZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93RmFkZU91dDogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93QWx3YXlzU2hvdzogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgYm9yZGVyU2l6ZTogNCxcbiAgICAgICAgICAgIHNob3dMZW5zOiB0cnVlLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3VyOiBcIiM4ODhcIixcbiAgICAgICAgICAgIGxlbnNCb3JkZXJTaXplOiAxLFxuICAgICAgICAgICAgbGVuc0JvcmRlckNvbG91cjogXCIjMDAwXCIsXG4gICAgICAgICAgICBsZW5zU2hhcGU6IFwic3F1YXJlXCIsIC8vY2FuIGJlIFwicm91bmRcIlxuICAgICAgICAgICAgem9vbVR5cGU6IFwid2luZG93XCIsIC8vd2luZG93IGlzIGRlZmF1bHQsICBhbHNvIFwibGVuc1wiIGF2YWlsYWJsZSAtXG4gICAgICAgICAgICBjb250YWluTGVuc1pvb206IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0NvbG91cjogXCJ3aGl0ZVwiLCAvL2NvbG91ciBvZiB0aGUgbGVucyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBsZW5zT3BhY2l0eTogMC40LCAvL29wYWNpdHkgb2YgdGhlIGxlbnNcbiAgICAgICAgICAgIGxlbnN6b29tOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbnQ6IGZhbHNlLCAvL2VuYWJsZSB0aGUgdGludGluZ1xuICAgICAgICAgICAgdGludENvbG91cjogXCIjMzMzXCIsIC8vZGVmYXVsdCB0aW50IGNvbG9yLCBjYW4gYmUgYW55dGhpbmcsIHJlZCwgI2NjYywgcmdiKDAsMCwwKVxuICAgICAgICAgICAgdGludE9wYWNpdHk6IDAuNCwgLy9vcGFjaXR5IG9mIHRoZSB0aW50XG4gICAgICAgICAgICBnYWxsZXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGdhbGxlcnlBY3RpdmVDbGFzczogXCJ6b29tR2FsbGVyeUFjdGl2ZVwiLFxuICAgICAgICAgICAgaW1hZ2VDcm9zc2ZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uc3RyYWluVHlwZTogZmFsc2UsICAvL3dpZHRoIG9yIGhlaWdodFxuICAgICAgICAgICAgY29uc3RyYWluU2l6ZTogZmFsc2UsICAvL2luIHBpeGVscyB0aGUgZGltZW5zaW9ucyB5b3Ugd2FudCB0byBjb25zdHJhaW4gb25cbiAgICAgICAgICAgIGxvYWRpbmdJY29uOiBmYWxzZSwgLy9odHRwOi8vd3d3LmV4YW1wbGUuY29tL3NwaW5uZXIuZ2lmXG4gICAgICAgICAgICBjdXJzb3I6XCJkZWZhdWx0XCIsIC8vIHVzZXIgc2hvdWxkIHNldCB0byB3aGF0IHRoZXkgd2FudCB0aGUgY3Vyc29yIGFzLCBpZiB0aGV5IGhhdmUgc2V0IGEgY2xpY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHJlc3BvbnNpdmU6dHJ1ZSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICQubm9vcCxcbiAgICAgICAgICAgIG9uWm9vbWVkSW1hZ2VMb2FkZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvbkltYWdlU3dhcDogJC5ub29wLFxuICAgICAgICAgICAgb25JbWFnZVN3YXBDb21wbGV0ZTogJC5ub29wXG4gICAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApO1xuIiwiLypcbiAqIGpRdWVyeSBGbGV4U2xpZGVyIHYyLjIuMlxuICogQ29weXJpZ2h0IDIwMTIgV29vVGhlbWVzXG4gKiBDb250cmlidXRpbmcgQXV0aG9yOiBUeWxlciBTbWl0aFxuICovXG47XG4oZnVuY3Rpb24gKCQpIHtcblxuICAvL0ZsZXhTbGlkZXI6IE9iamVjdCBJbnN0YW5jZVxuICAkLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciBzbGlkZXIgPSAkKGVsKTtcblxuICAgIC8vIG1ha2luZyB2YXJpYWJsZXMgcHVibGljXG4gICAgc2xpZGVyLnZhcnMgPSAkLmV4dGVuZCh7fSwgJC5mbGV4c2xpZGVyLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIHZhciBuYW1lc3BhY2UgPSBzbGlkZXIudmFycy5uYW1lc3BhY2UsXG4gICAgICAgIG1zR2VzdHVyZSA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5NU0dlc3R1cmUsXG4gICAgICAgIHRvdWNoID0gKCggXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cgKSB8fCBtc0dlc3R1cmUgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSAmJiBzbGlkZXIudmFycy50b3VjaCxcbiAgICAgICAgLy8gZGVwcmljYXRpbmcgdGhpcyBpZGVhLCBhcyBkZXZpY2VzIGFyZSBiZWluZyByZWxlYXNlZCB3aXRoIGJvdGggb2YgdGhlc2UgZXZlbnRzXG4gICAgICAgIC8vZXZlbnRUeXBlID0gKHRvdWNoKSA/IFwidG91Y2hlbmRcIiA6IFwiY2xpY2tcIixcbiAgICAgICAgZXZlbnRUeXBlID0gXCJjbGljayB0b3VjaGVuZCBNU1BvaW50ZXJVcCBrZXl1cFwiLFxuICAgICAgICB3YXRjaGVkRXZlbnQgPSBcIlwiLFxuICAgICAgICB3YXRjaGVkRXZlbnRDbGVhclRpbWVyLFxuICAgICAgICB2ZXJ0aWNhbCA9IHNsaWRlci52YXJzLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICByZXZlcnNlID0gc2xpZGVyLnZhcnMucmV2ZXJzZSxcbiAgICAgICAgY2Fyb3VzZWwgPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gMCksXG4gICAgICAgIGZhZGUgPSBzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwiZmFkZVwiLFxuICAgICAgICBhc05hdiA9IHNsaWRlci52YXJzLmFzTmF2Rm9yICE9PSBcIlwiLFxuICAgICAgICBtZXRob2RzID0ge30sXG4gICAgICAgIGZvY3VzZWQgPSB0cnVlO1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIHNsaWRlciBvYmplY3RcbiAgICAkLmRhdGEoZWwsIFwiZmxleHNsaWRlclwiLCBzbGlkZXIpO1xuXG4gICAgLy8gUHJpdmF0ZSBzbGlkZXIgbWV0aG9kc1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAvLyBHZXQgY3VycmVudCBzbGlkZSBhbmQgbWFrZSBzdXJlIGl0IGlzIGEgbnVtYmVyXG4gICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBwYXJzZUludCggKCBzbGlkZXIudmFycy5zdGFydEF0ID8gc2xpZGVyLnZhcnMuc3RhcnRBdCA6IDApLCAxMCApO1xuICAgICAgICBpZiAoIGlzTmFOKCBzbGlkZXIuY3VycmVudFNsaWRlICkgKSBzbGlkZXIuY3VycmVudFNsaWRlID0gMDtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgc2xpZGVyLmF0RW5kID0gKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgfHwgc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IgPSBzbGlkZXIudmFycy5zZWxlY3Rvci5zdWJzdHIoMCxzbGlkZXIudmFycy5zZWxlY3Rvci5zZWFyY2goJyAnKSk7XG4gICAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyID0gJChzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IsIHNsaWRlcik7XG4gICAgICAgIHNsaWRlci5jb3VudCA9IHNsaWRlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBzbGlkZXIuc3luY0V4aXN0cyA9ICQoc2xpZGVyLnZhcnMuc3luYykubGVuZ3RoID4gMDtcbiAgICAgICAgLy8gU0xJREU6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwic2xpZGVcIikgc2xpZGVyLnZhcnMuYW5pbWF0aW9uID0gXCJzd2luZ1wiO1xuICAgICAgICBzbGlkZXIucHJvcCA9ICh2ZXJ0aWNhbCkgPyBcInRvcFwiIDogXCJtYXJnaW5MZWZ0XCI7XG4gICAgICAgIHNsaWRlci5hcmdzID0ge307XG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gZmFsc2U7XG4gICAgICAgIHNsaWRlci5zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIC8vUEFVU0UgV0hFTiBJTlZJU0lCTEVcbiAgICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGVyLnN0YXJ0VGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIFRPVUNIL1VTRUNTUzpcbiAgICAgICAgc2xpZGVyLnRyYW5zaXRpb25zID0gIXNsaWRlci52YXJzLnZpZGVvICYmICFmYWRlICYmIHNsaWRlci52YXJzLnVzZUNTUyAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICBwcm9wcyA9IFsncGVyc3BlY3RpdmVQcm9wZXJ0eScsICdXZWJraXRQZXJzcGVjdGl2ZScsICdNb3pQZXJzcGVjdGl2ZScsICdPUGVyc3BlY3RpdmUnLCAnbXNQZXJzcGVjdGl2ZSddO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICggb2JqLnN0eWxlWyBwcm9wc1tpXSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5wZnggPSBwcm9wc1tpXS5yZXBsYWNlKCdQZXJzcGVjdGl2ZScsJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIHNsaWRlci5wcm9wID0gXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIHNsaWRlci5lbnN1cmVBbmltYXRpb25FbmQgPSAnJztcbiAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lciAhPT0gXCJcIikgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyID0gJChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lcikubGVuZ3RoID4gMCAmJiAkKHNsaWRlci52YXJzLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gTUFOVUFMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMgIT09IFwiXCIpIHNsaWRlci5tYW51YWxDb250cm9scyA9ICQoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMpLmxlbmd0aCA+IDAgJiYgJChzbGlkZXIudmFycy5tYW51YWxDb250cm9scyk7XG5cbiAgICAgICAgLy8gUkFORE9NSVpFOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMucmFuZG9taXplKSB7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5zb3J0KGZ1bmN0aW9uKCkgeyByZXR1cm4gKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSktMC41KTsgfSk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgICAvLyBJTklUXG4gICAgICAgIHNsaWRlci5zZXR1cChcImluaXRcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmNvbnRyb2xOYXYpIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYuc2V0dXAoKTtcblxuICAgICAgICAvLyBLRVlCT0FSRDpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmtleWJvYXJkICYmICgkKHNsaWRlci5jb250YWluZXJTZWxlY3RvcikubGVuZ3RoID09PSAxIHx8IHNsaWRlci52YXJzLm11bHRpcGxlS2V5Ym9hcmQpKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGtleWNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIChrZXljb2RlID09PSAzOSB8fCBrZXljb2RlID09PSAzNykpIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChrZXljb2RlID09PSAzOSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWNvZGUgPT09IDM3KSA/IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKSA6IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNT1VTRVdIRUVMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubW91c2V3aGVlbCkge1xuICAgICAgICAgIHNsaWRlci5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoZGVsdGEgPCAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUEFVU0VQTEFZXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5wYXVzZVBsYXkpIG1ldGhvZHMucGF1c2VQbGF5LnNldHVwKCk7XG5cbiAgICAgICAgLy9QQVVTRSBXSEVOIElOVklTSUJMRVxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc2xpZGVzaG93ICYmIHNsaWRlci52YXJzLnBhdXNlSW52aXNpYmxlKSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLmluaXQoKTtcblxuICAgICAgICAvLyBTTElEU0VTSE9XXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbGlkZXNob3cpIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICBzbGlkZXIuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbFBsYXkgJiYgIXNsaWRlci5tYW51YWxQYXVzZSkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFzbGlkZXIubWFudWFsUGF1c2UgJiYgIXNsaWRlci5tYW51YWxQbGF5ICYmICFzbGlkZXIuc3RvcHBlZCkgc2xpZGVyLnBsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvblxuICAgICAgICAgIC8vSWYgd2UncmUgdmlzaWJsZSwgb3Igd2UgZG9uJ3QgdXNlIFBhZ2VWaXNpYmlsaXR5IEFQSVxuICAgICAgICAgIGlmKCFzbGlkZXIudmFycy5wYXVzZUludmlzaWJsZSB8fCAhbWV0aG9kcy5wYXVzZUludmlzaWJsZS5pc0hpZGRlbigpKSB7XG4gICAgICAgICAgICAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzbGlkZXIuc3RhcnRUaW1lb3V0ID0gc2V0VGltZW91dChzbGlkZXIucGxheSwgc2xpZGVyLnZhcnMuaW5pdERlbGF5KSA6IHNsaWRlci5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQVNOQVY6XG4gICAgICAgIGlmIChhc05hdikgbWV0aG9kcy5hc05hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIFRPVUNIXG4gICAgICAgIGlmICh0b3VjaCAmJiBzbGlkZXIudmFycy50b3VjaCkgbWV0aG9kcy50b3VjaCgpO1xuXG4gICAgICAgIC8vIEZBREUmJlNNT09USEhFSUdIVCB8fCBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlIHx8IChmYWRlICYmIHNsaWRlci52YXJzLnNtb290aEhlaWdodCkpICQod2luZG93KS5iaW5kKFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIGZvY3VzXCIsIG1ldGhvZHMucmVzaXplKTtcblxuICAgICAgICBzbGlkZXIuZmluZChcImltZ1wiKS5hdHRyKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG5cbiAgICAgICAgLy8gQVBJOiBzdGFydCgpIENhbGxiYWNrXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBzbGlkZXIudmFycy5zdGFydChzbGlkZXIpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfSxcbiAgICAgIGFzTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuYXNOYXYgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IE1hdGguZmxvb3Ioc2xpZGVyLmN1cnJlbnRTbGlkZS9zbGlkZXIubW92ZSk7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRJdGVtID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHNsaWRlci5jdXJyZW50SXRlbSkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgaWYoIW1zR2VzdHVyZSl7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMub24oZXZlbnRUeXBlLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgIHZhciBwb3NGcm9tTGVmdCA9ICRzbGlkZS5vZmZzZXQoKS5sZWZ0IC0gJChzbGlkZXIpLnNjcm9sbExlZnQoKTsgLy8gRmluZCBwb3NpdGlvbiBvZiBzbGlkZSByZWxhdGl2ZSB0byBsZWZ0IG9mIHNsaWRlciBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiggcG9zRnJvbUxlZnQgPD0gMCAmJiAkc2xpZGUuaGFzQ2xhc3MoIG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnICkgKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmdldFRhcmdldChcInByZXZcIiksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISQoc2xpZGVyLnZhcnMuYXNOYXZGb3IpLmRhdGEoJ2ZsZXhzbGlkZXInKS5hbmltYXRpbmcgJiYgISRzbGlkZS5oYXNDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKSkge1xuICAgICAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIGZhbHNlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVhY2goZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICB0aGF0Ll9nZXN0dXJlID0gbmV3IE1TR2VzdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5fZ2VzdHVyZS50YXJnZXQgPSB0aGF0O1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNQb2ludGVyRG93blwiLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5fZ2VzdHVyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0Ll9nZXN0dXJlLmFkZFBvaW50ZXIoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNHZXN0dXJlVGFwXCIsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghJChzbGlkZXIudmFycy5hc05hdkZvcikuZGF0YSgnZmxleHNsaWRlcicpLmFuaW1hdGluZyAmJiAhJHNsaWRlLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xOYXY6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0dXBQYWdpbmcoKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBNQU5VQUxDT05UUk9MUzpcbiAgICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cE1hbnVhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBQYWdpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0eXBlID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdjb250cm9sLXRodW1icycgOiAnY29udHJvbC1wYWdpbmcnLFxuICAgICAgICAgICAgICBqID0gMSxcbiAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgc2xpZGU7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkID0gJCgnPG9sIGNsYXNzPVwiJysgbmFtZXNwYWNlICsgJ2NvbnRyb2wtbmF2ICcgKyBuYW1lc3BhY2UgKyB0eXBlICsgJ1wiPjwvb2w+Jyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIucGFnaW5nQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBzbGlkZSA9IHNsaWRlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgIGl0ZW0gPSAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiA9PT0gXCJ0aHVtYm5haWxzXCIpID8gJzxpbWcgc3JjPVwiJyArIHNsaWRlLmF0dHIoICdkYXRhLXRodW1iJyApICsgJ1wiLz4nIDogJzxhPicgKyBqICsgJzwvYT4nO1xuICAgICAgICAgICAgICBpZiAoICd0aHVtYm5haWxzJyA9PT0gc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiB0cnVlID09PSBzbGlkZXIudmFycy50aHVtYkNhcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciBjYXB0biA9IHNsaWRlLmF0dHIoICdkYXRhLXRodW1iY2FwdGlvbicgKTtcbiAgICAgICAgICAgICAgICBpZiAoICcnICE9IGNhcHRuICYmIHVuZGVmaW5lZCAhPSBjYXB0biApIGl0ZW0gKz0gJzxzcGFuIGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICdjYXB0aW9uXCI+JyArIGNhcHRuICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuYXBwZW5kKCc8bGk+JyArIGl0ZW0gKyAnPC9saT4nKTtcbiAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpID8gJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkKSA6IHNsaWRlci5hcHBlbmQoc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZCk7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuXG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZSgnYSwgaW1nJywgZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHNsaWRlci5jb250cm9sTmF2LmluZGV4KCR0aGlzKTtcblxuICAgICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldHVwTWFudWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdiA9IHNsaWRlci5tYW51YWxDb250cm9scztcbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdi5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuY29udHJvbE5hdi5pbmRleCgkdGhpcyk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkdGhpcy5oYXNDbGFzcyhuYW1lc3BhY2UgKyAnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBzbGlkZXIuZGlyZWN0aW9uID0gXCJuZXh0XCIgOiBzbGlkZXIuZGlyZWN0aW9uID0gXCJwcmV2XCI7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0dXAgZmxhZ3MgdG8gcHJldmVudCBldmVudCBkdXBsaWNhdGlvblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIikge1xuICAgICAgICAgICAgICB3YXRjaGVkRXZlbnQgPSBldmVudC50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0aG9kcy5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdpbWcnIDogJ2EnO1xuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnY29udHJvbC1uYXYgbGkgJyArIHNlbGVjdG9yLCAoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKSA/IHNsaWRlci5jb250cm9sc0NvbnRhaW5lciA6IHNsaWRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmVcIikuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihhY3Rpb24sIHBvcykge1xuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIGFjdGlvbiA9PT0gXCJhZGRcIikge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoJCgnPGxpPjxhPicgKyBzbGlkZXIuY291bnQgKyAnPC9hPjwvbGk+JykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmZpbmQoJ2xpJykucmVtb3ZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmVxKHBvcykuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuICAgICAgICAgIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIHNsaWRlci5wYWdpbmdDb3VudCAhPT0gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSA/IHNsaWRlci51cGRhdGUocG9zLCBhY3Rpb24pIDogbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uTmF2U2NhZmZvbGQgPSAkKCc8dWwgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXZcIj48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ByZXZcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5wcmV2VGV4dCArICc8L2E+PC9saT48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ25leHRcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5uZXh0VGV4dCArICc8L2E+PC9saT48L3VsPicpO1xuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgaWYgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYmluZChldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gKCQodGhpcykuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ25leHQnKSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOiBzbGlkZXIuZ2V0VGFyZ2V0KCdwcmV2Jyk7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXR1cCBmbGFncyB0byBwcmV2ZW50IGV2ZW50IGR1cGxpY2F0aW9uXG4gICAgICAgICAgICBpZiAod2F0Y2hlZEV2ZW50ID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgIHdhdGNoZWRFdmVudCA9IGV2ZW50LnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRob2RzLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlzYWJsZWRDbGFzcyA9IG5hbWVzcGFjZSArICdkaXNhYmxlZCc7XG4gICAgICAgICAgaWYgKHNsaWRlci5wYWdpbmdDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJwcmV2XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5hbmltYXRpbmdUbyA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJuZXh0XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcykucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXVzZVBsYXk6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwYXVzZVBsYXlTY2FmZm9sZCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheVwiPjxhPjwvYT48L2Rpdj4nKTtcblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIGlmIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sc0NvbnRhaW5lci5hcHBlbmQocGF1c2VQbGF5U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLnBhdXNlUGxheSA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChwYXVzZVBsYXlTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2VQbGF5ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAncGF1c2VwbGF5IGEnLCBzbGlkZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1ldGhvZHMucGF1c2VQbGF5LnVwZGF0ZSgoc2xpZGVyLnZhcnMuc2xpZGVzaG93KSA/IG5hbWVzcGFjZSArICdwYXVzZScgOiBuYW1lc3BhY2UgKyAncGxheScpO1xuXG4gICAgICAgICAgc2xpZGVyLnBhdXNlUGxheS5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIucGxheSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgKHN0YXRlID09PSBcInBsYXlcIikgPyBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpLmFkZENsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuaHRtbChzbGlkZXIudmFycy5wbGF5VGV4dCkgOiBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuYWRkQ2xhc3MobmFtZXNwYWNlICsgJ3BhdXNlJykuaHRtbChzbGlkZXIudmFycy5wYXVzZVRleHQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgY3dpZHRoLFxuICAgICAgICAgIGR4LFxuICAgICAgICAgIHN0YXJ0VCxcbiAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZSxcbiAgICAgICAgICBsb2NhbFggPSAwLFxuICAgICAgICAgIGxvY2FsWSA9IDAsXG4gICAgICAgICAgYWNjRHggPSAwO1xuXG4gICAgICAgIGlmKCFtc0dlc3R1cmUpe1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggKCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgKSB8fCBlLnRvdWNoZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIENBUk9VU0VMOlxuICAgICAgICAgICAgICAgIGN3aWR0aCA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuaCA6IHNsaWRlci4gdztcbiAgICAgICAgICAgICAgICBzdGFydFQgPSBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAvLyBMb2NhbCB2YXJzIGZvciBYIGFuZCBZIHBvaW50cy5cbiAgICAgICAgICAgICAgICBsb2NhbFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwgJiYgcmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHJldmVyc2UpID8gKHNsaWRlci5sYXN0IC0gc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGggOiAoc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGg7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gKHZlcnRpY2FsKSA/IGxvY2FsWSA6IGxvY2FsWDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSAodmVydGljYWwpID8gbG9jYWxYIDogbG9jYWxZO1xuXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgICAgICAgIC8vIExvY2FsIHZhcnMgZm9yIFggYW5kIFkgcG9pbnRzLlxuXG4gICAgICAgICAgICAgIGxvY2FsWCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgIGR4ID0gKHZlcnRpY2FsKSA/IHN0YXJ0WCAtIGxvY2FsWSA6IHN0YXJ0WCAtIGxvY2FsWDtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gKHZlcnRpY2FsKSA/IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFggLSBzdGFydFkpKSA6IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFkgLSBzdGFydFkpKTtcblxuICAgICAgICAgICAgICB2YXIgZnhtcyA9IDUwMDtcblxuICAgICAgICAgICAgICBpZiAoICEgc2Nyb2xsaW5nIHx8IE51bWJlciggbmV3IERhdGUoKSApIC0gc3RhcnRUID4gZnhtcyApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWRlICYmIHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4ID0gZHgvKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGR4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBkeCA+IDApID8gKE1hdGguYWJzKGR4KS9jd2lkdGgrMikgOiAxKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhvZmZzZXQgKyBkeCwgXCJzZXRUb3VjaFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Ub3VjaEVuZChlKSB7XG4gICAgICAgICAgICAgIC8vIGZpbmlzaCB0aGUgdG91Y2ggYnkgdW5kb2luZyB0aGUgdG91Y2ggc2Vzc2lvblxuICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVEeCA9IChyZXZlcnNlKSA/IC1keCA6IGR4LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAodXBkYXRlRHggPiAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKCFmYWRlKSBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmN1cnJlbnRTbGlkZSwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgICAgIHN0YXJ0WSA9IG51bGw7XG4gICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgb2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbC5zdHlsZS5tc1RvdWNoQWN0aW9uID0gXCJub25lXCI7XG4gICAgICAgICAgICBlbC5fZ2VzdHVyZSA9IG5ldyBNU0dlc3R1cmUoKTtcbiAgICAgICAgICAgIGVsLl9nZXN0dXJlLnRhcmdldCA9IGVsO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TUG9pbnRlckRvd25cIiwgb25NU1BvaW50ZXJEb3duLCBmYWxzZSk7XG4gICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUNoYW5nZVwiLCBvbk1TR2VzdHVyZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUVuZFwiLCBvbk1TR2VzdHVyZUVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1TUG9pbnRlckRvd24oZSl7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgYWNjRHggPSAwO1xuICAgICAgICAgICAgICAgICAgICBjd2lkdGggPSAodmVydGljYWwpID8gc2xpZGVyLmggOiBzbGlkZXIuIHc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VCA9IE51bWJlcihuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiByZXZlcnNlKSA/IHNsaWRlci5saW1pdCAtICgoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0KSA/IHNsaWRlci5saW1pdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyAoc2xpZGVyLmxhc3QgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aCA6IChzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0cmFuc1ggPSAtZS50cmFuc2xhdGlvblgsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zWSA9IC1lLnRyYW5zbGF0aW9uWTtcblxuICAgICAgICAgICAgICAgIC8vQWNjdW11bGF0ZSB0cmFuc2xhdGlvbnMuXG4gICAgICAgICAgICAgICAgYWNjRHggPSBhY2NEeCArICgodmVydGljYWwpID8gdHJhbnNZIDogdHJhbnNYKTtcbiAgICAgICAgICAgICAgICBkeCA9IGFjY0R4O1xuICAgICAgICAgICAgICAgIHNjcm9sbGluZyA9ICh2ZXJ0aWNhbCkgPyAoTWF0aC5hYnMoYWNjRHgpIDwgTWF0aC5hYnMoLXRyYW5zWCkpIDogKE1hdGguYWJzKGFjY0R4KSA8IE1hdGguYWJzKC10cmFuc1kpKTtcblxuICAgICAgICAgICAgICAgIGlmKGUuZGV0YWlsID09PSBlLk1TR0VTVFVSRV9GTEFHX0lORVJUSUEpe1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNjcm9sbGluZyB8fCBOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPiA1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZhZGUgJiYgc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCA9IGFjY0R4IC8gKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGFjY0R4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBhY2NEeCA+IDApID8gKE1hdGguYWJzKGFjY0R4KSAvIGN3aWR0aCArIDIpIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMob2Zmc2V0ICsgZHgsIFwic2V0VG91Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlRW5kKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlRHggPSAocmV2ZXJzZSkgPyAtZHggOiBkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICh1cGRhdGVEeCA+IDApID8gc2xpZGVyLmdldFRhcmdldCgnbmV4dCcpIDogc2xpZGVyLmdldFRhcmdldCgncHJldicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmFkZSkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5jdXJyZW50U2xpZGUsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGFjY0R4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBzbGlkZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjYXJvdXNlbCkgeyAvL0NBUk9VU0VMOlxuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoc2xpZGVyLnBhZ2luZ0NvdW50KTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbCkgeyAvL1ZFUlRJQ0FMOlxuICAgICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChzbGlkZXIuaCk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyLmgsIFwic2V0VG90YWxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodCgpO1xuICAgICAgICAgICAgc2xpZGVyLm5ld1NsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXIuY29tcHV0ZWRXLCBcInNldFRvdGFsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNtb290aEhlaWdodDogZnVuY3Rpb24oZHVyKSB7XG4gICAgICAgIGlmICghdmVydGljYWwgfHwgZmFkZSkge1xuICAgICAgICAgIHZhciAkb2JqID0gKGZhZGUpID8gc2xpZGVyIDogc2xpZGVyLnZpZXdwb3J0O1xuICAgICAgICAgIChkdXIpID8gJG9iai5hbmltYXRlKHtcImhlaWdodFwiOiBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5hbmltYXRpbmdUbykuaGVpZ2h0KCl9LCBkdXIpIDogJG9iai5oZWlnaHQoc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuYW5pbWF0aW5nVG8pLmhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN5bmM6IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICAgICB2YXIgJG9iaiA9ICQoc2xpZGVyLnZhcnMuc3luYykuZGF0YShcImZsZXhzbGlkZXJcIiksXG4gICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiYW5pbWF0ZVwiOiAkb2JqLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgZmFsc2UsIHRydWUpOyBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGxheVwiOiBpZiAoISRvYmoucGxheWluZyAmJiAhJG9iai5hc05hdikgeyAkb2JqLnBsYXkoKTsgfSBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGF1c2VcIjogJG9iai5wYXVzZSgpOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVuaXF1ZUlEOiBmdW5jdGlvbigkY2xvbmUpIHtcbiAgICAgICAgLy8gQXBwZW5kIF9jbG9uZSB0byBjdXJyZW50IGxldmVsIGFuZCBjaGlsZHJlbiBlbGVtZW50cyB3aXRoIGlkIGF0dHJpYnV0ZXNcbiAgICAgICAgJGNsb25lLmZpbHRlciggJ1tpZF0nICkuYWRkKCRjbG9uZS5maW5kKCAnW2lkXScgKSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICR0aGlzLmF0dHIoICdpZCcsICR0aGlzLmF0dHIoICdpZCcgKSArICdfY2xvbmUnICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJGNsb25lO1xuICAgICAgfSxcbiAgICAgIHBhdXNlSW52aXNpYmxlOiB7XG4gICAgICAgIHZpc1Byb3A6IG51bGwsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcmVmaXhlcyA9IFsnd2Via2l0JywnbW96JywnbXMnLCdvJ107XG5cbiAgICAgICAgICBpZiAoJ2hpZGRlbicgaW4gZG9jdW1lbnQpIHJldHVybiAnaGlkZGVuJztcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKHByZWZpeGVzW2ldICsgJ0hpZGRlbicpIGluIGRvY3VtZW50KVxuICAgICAgICAgICAgbWV0aG9kcy5wYXVzZUludmlzaWJsZS52aXNQcm9wID0gcHJlZml4ZXNbaV0gKyAnSGlkZGVuJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUudmlzUHJvcCkge1xuICAgICAgICAgICAgdmFyIGV2dG5hbWUgPSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3AucmVwbGFjZSgvW0h8aF1pZGRlbi8sJycpICsgJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRuYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUuaXNIaWRkZW4oKSkge1xuICAgICAgICAgICAgICAgIGlmKHNsaWRlci5zdGFydFRpbWVvdXQpIGNsZWFyVGltZW91dChzbGlkZXIuc3RhcnRUaW1lb3V0KTsgLy9JZiBjbG9jayBpcyB0aWNraW5nLCBzdG9wIHRpbWVyIGFuZCBwcmV2ZW50IGZyb20gc3RhcnRpbmcgd2hpbGUgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgZWxzZSBzbGlkZXIucGF1c2UoKTsgLy9PciBqdXN0IHBhdXNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoc2xpZGVyLnN0YXJ0ZWQpIHNsaWRlci5wbGF5KCk7IC8vSW5pdGlhdGVkIGJlZm9yZSwganVzdCBwbGF5XG4gICAgICAgICAgICAgICAgZWxzZSAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzZXRUaW1lb3V0KHNsaWRlci5wbGF5LCBzbGlkZXIudmFycy5pbml0RGVsYXkpIDogc2xpZGVyLnBsYXkoKTsgLy9EaWRuJ3QgaW5pdCBiZWZvcmU6IHNpbXBseSBpbml0IG9yIHdhaXQgZm9yIGl0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNIaWRkZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudFttZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3BdIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0VG9DbGVhcldhdGNoZWRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh3YXRjaGVkRXZlbnRDbGVhclRpbWVyKTtcbiAgICAgICAgd2F0Y2hlZEV2ZW50Q2xlYXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gXCJcIjtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgc2xpZGVyLmZsZXhBbmltYXRlID0gZnVuY3Rpb24odGFyZ2V0LCBwYXVzZSwgb3ZlcnJpZGUsIHdpdGhTeW5jLCBmcm9tTmF2KSB7XG4gICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3AgJiYgdGFyZ2V0ICE9PSBzbGlkZXIuY3VycmVudFNsaWRlKSB7XG4gICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXNOYXYgJiYgc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuXG4gICAgICBpZiAoIXNsaWRlci5hbmltYXRpbmcgJiYgKHNsaWRlci5jYW5BZHZhbmNlKHRhcmdldCwgZnJvbU5hdikgfHwgb3ZlcnJpZGUpICYmIHNsaWRlci5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgIGlmIChhc05hdiAmJiB3aXRoU3luYykge1xuICAgICAgICAgIHZhciBtYXN0ZXIgPSAkKHNsaWRlci52YXJzLmFzTmF2Rm9yKS5kYXRhKCdmbGV4c2xpZGVyJyk7XG4gICAgICAgICAgc2xpZGVyLmF0RW5kID0gdGFyZ2V0ID09PSAwIHx8IHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgICAgICBtYXN0ZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZnJvbU5hdik7XG4gICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICBtYXN0ZXIuZGlyZWN0aW9uID0gc2xpZGVyLmRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmIChNYXRoLmNlaWwoKHRhcmdldCArIDEpL3NsaWRlci52aXNpYmxlKSAtIDEgIT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgdGFyZ2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudEl0ZW0gPSB0YXJnZXQ7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgICB0YXJnZXQgPSBNYXRoLmZsb29yKHRhcmdldC9zbGlkZXIudmlzaWJsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50SXRlbSA9IHRhcmdldDtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIikuZXEodGFyZ2V0KS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gdGFyZ2V0O1xuXG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgaWYgKHBhdXNlKSBzbGlkZXIucGF1c2UoKTtcblxuICAgICAgICAvLyBBUEk6IGJlZm9yZSgpIGFuaW1hdGlvbiBDYWxsYmFja1xuICAgICAgICBzbGlkZXIudmFycy5iZWZvcmUoc2xpZGVyKTtcblxuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMgJiYgIWZyb21OYXYpIG1ldGhvZHMuc3luYyhcImFuaW1hdGVcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdikgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgIC8vICFDQVJPVVNFTDpcbiAgICAgICAgLy8gQ0FORElEQVRFOiBzbGlkZSBhY3RpdmUgY2xhc3MgKGZvciBhZGQvcmVtb3ZlIHNsaWRlKVxuICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKS5lcSh0YXJnZXQpLmFkZENsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKTtcblxuICAgICAgICAvLyBJTkZJTklURSBMT09QOlxuICAgICAgICAvLyBDQU5ESURBVEU6IGF0RW5kXG4gICAgICAgIHNsaWRlci5hdEVuZCA9IHRhcmdldCA9PT0gMCB8fCB0YXJnZXQgPT09IHNsaWRlci5sYXN0O1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYudXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKHRhcmdldCA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAvLyBBUEk6IGVuZCgpIG9mIGN5Y2xlIENhbGxiYWNrXG4gICAgICAgICAgc2xpZGVyLnZhcnMuZW5kKHNsaWRlcik7XG4gICAgICAgICAgLy8gU0xJREVTSE9XICYmICFJTkZJTklURSBMT09QOlxuICAgICAgICAgIGlmICghc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlKSB7XG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuc2xpZGVzLmZpbHRlcignOmZpcnN0JykuaGVpZ2h0KCkgOiBzbGlkZXIuY29tcHV0ZWRXLFxuICAgICAgICAgICAgICBtYXJnaW4sIHNsaWRlU3RyaW5nLCBjYWxjTmV4dDtcblxuICAgICAgICAgIC8vIElORklOSVRFIExPT1AgLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgICAgLy9tYXJnaW4gPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbiAqIDIgOiBzbGlkZXIudmFycy5pdGVtTWFyZ2luO1xuICAgICAgICAgICAgbWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbjtcbiAgICAgICAgICAgIGNhbGNOZXh0ID0gKChzbGlkZXIuaXRlbVcgKyBtYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAoY2FsY05leHQgPiBzbGlkZXIubGltaXQgJiYgc2xpZGVyLnZpc2libGUgIT09IDEpID8gc2xpZGVyLmxpbWl0IDogY2FsY05leHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogZGltZW5zaW9uIDogMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHRhcmdldCA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwicHJldlwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IDAgOiAoc2xpZGVyLmNvdW50ICsgMSkgKiBkaW1lbnNpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlU3RyaW5nID0gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHRhcmdldCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb24gOiAodGFyZ2V0ICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGRpbWVuc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlU3RyaW5nLCBcIlwiLCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wIHx8ICFzbGlkZXIuYXRFbmQpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVbmJpbmQgcHJldmlvdXMgdHJhbnNpdGlvbkVuZCBldmVudHMgYW5kIHJlLWJpbmQgbmV3IHRyYW5zaXRpb25FbmQgZXZlbnRcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgIHNsaWRlci53cmFwdXAoZGltZW5zaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJbnN1cmFuY2UgZm9yIHRoZSBldmVyLXNvLWZpY2tsZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICBzbGlkZXIuZW5zdXJlQW5pbWF0aW9uRW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQgKyAxMDApO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYW5pbWF0ZShzbGlkZXIuYXJncywgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBGQURFOlxuICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgIC8vc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5mYWRlT3V0KHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcpO1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuZmFkZUluKHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcsIHNsaWRlci53cmFwdXApO1xuXG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMX0pLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nLCBzbGlkZXIud3JhcHVwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcInpJbmRleFwiOiAxIH0pO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcSh0YXJnZXQpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyIH0pO1xuICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodChzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzbGlkZXIud3JhcHVwID0gZnVuY3Rpb24oZGltZW5zaW9uKSB7XG4gICAgICAvLyBTTElERTpcbiAgICAgIGlmICghZmFkZSAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wRW5kXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHNsaWRlci5hbmltYXRpbmdUbyA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wU3RhcnRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAvLyBBUEk6IGFmdGVyKCkgYW5pbWF0aW9uIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5hZnRlcihzbGlkZXIpO1xuICAgIH07XG5cbiAgICAvLyBTTElERVNIT1c6XG4gICAgc2xpZGVyLmFuaW1hdGVTbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBmb2N1c2VkICkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5nZXRUYXJnZXQoXCJuZXh0XCIpKTtcbiAgICB9O1xuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IG51bGw7XG4gICAgICBzbGlkZXIucGxheWluZyA9IGZhbHNlO1xuICAgICAgLy8gUEFVU0VQTEFZOlxuICAgICAgaWYgKHNsaWRlci52YXJzLnBhdXNlUGxheSkgbWV0aG9kcy5wYXVzZVBsYXkudXBkYXRlKFwicGxheVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBhdXNlXCIpO1xuICAgIH07XG4gICAgLy8gU0xJREVTSE9XOlxuICAgIHNsaWRlci5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2xpZGVyLnBsYXlpbmcpIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IHNsaWRlci5hbmltYXRlZFNsaWRlcyB8fCBzZXRJbnRlcnZhbChzbGlkZXIuYW5pbWF0ZVNsaWRlcywgc2xpZGVyLnZhcnMuc2xpZGVzaG93U3BlZWQpO1xuICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBzbGlkZXIucGxheWluZyA9IHRydWU7XG4gICAgICAvLyBQQVVTRVBMQVk6XG4gICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoXCJwYXVzZVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBsYXlcIik7XG4gICAgfTtcbiAgICAvLyBTVE9QOlxuICAgIHNsaWRlci5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2xpZGVyLnBhdXNlKCk7XG4gICAgICBzbGlkZXIuc3RvcHBlZCA9IHRydWU7XG4gICAgfTtcbiAgICBzbGlkZXIuY2FuQWR2YW5jZSA9IGZ1bmN0aW9uKHRhcmdldCwgZnJvbU5hdikge1xuICAgICAgLy8gQVNOQVY6XG4gICAgICB2YXIgbGFzdCA9IChhc05hdikgPyBzbGlkZXIucGFnaW5nQ291bnQgLSAxIDogc2xpZGVyLmxhc3Q7XG4gICAgICByZXR1cm4gKGZyb21OYXYpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiB0YXJnZXQgPT09IDAgJiYgc2xpZGVyLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gMCAmJiB0YXJnZXQgPT09IHNsaWRlci5wYWdpbmdDb3VudCAtIDEgJiYgc2xpZGVyLmRpcmVjdGlvbiAhPT0gXCJuZXh0XCIpID8gZmFsc2UgOlxuICAgICAgICAgICAgICh0YXJnZXQgPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIWFzTmF2KSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgPyB0cnVlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgdGFyZ2V0ID09PSBsYXN0ICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IGxhc3QgJiYgdGFyZ2V0ID09PSAwICYmIHNsaWRlci5kaXJlY3Rpb24gPT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICB0cnVlO1xuICAgIH07XG4gICAgc2xpZGVyLmdldFRhcmdldCA9IGZ1bmN0aW9uKGRpcikge1xuICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IGRpcjtcbiAgICAgIGlmIChkaXIgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIHJldHVybiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpID8gMCA6IHNsaWRlci5jdXJyZW50U2xpZGUgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwKSA/IHNsaWRlci5sYXN0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSAtIDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNMSURFOlxuICAgIHNsaWRlci5zZXRQcm9wcyA9IGZ1bmN0aW9uKHBvcywgc3BlY2lhbCwgZHVyKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zQ2hlY2sgPSAocG9zKSA/IHBvcyA6ICgoc2xpZGVyLml0ZW1XICsgc2xpZGVyLnZhcnMuaXRlbU1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuYW5pbWF0aW5nVG8sXG4gICAgICAgICAgICBwb3NDYWxjID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNwZWNpYWwgPT09IFwic2V0VG91Y2hcIikgPyBwb3MgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOiBwb3NDaGVjaztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNwZWNpYWwpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRUb3RhbFwiOiByZXR1cm4gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zIDogKHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFRvdWNoXCI6IHJldHVybiAocmV2ZXJzZSkgPyBwb3MgOiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwianVtcEVuZFwiOiByZXR1cm4gKHJldmVyc2UpID8gcG9zIDogc2xpZGVyLmNvdW50ICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bXBTdGFydFwiOiByZXR1cm4gKHJldmVyc2UpID8gc2xpZGVyLmNvdW50ICogcG9zIDogcG9zO1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocG9zQ2FsYyAqIC0xKSArIFwicHhcIjtcbiAgICAgICAgICB9KCkpO1xuXG4gICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIHRhcmdldCA9ICh2ZXJ0aWNhbCkgPyBcInRyYW5zbGF0ZTNkKDAsXCIgKyB0YXJnZXQgKyBcIiwwKVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHRhcmdldCArIFwiLDAsMClcIjtcbiAgICAgICAgZHVyID0gKGR1ciAhPT0gdW5kZWZpbmVkKSA/IChkdXIvMTAwMCkgKyBcInNcIiA6IFwiMHNcIjtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNpdGlvbi1kdXJhdGlvblwiLCBkdXIpO1xuICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIGR1cik7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlci5hcmdzW3NsaWRlci5wcm9wXSA9IHRhcmdldDtcbiAgICAgIGlmIChzbGlkZXIudHJhbnNpdGlvbnMgfHwgZHVyID09PSB1bmRlZmluZWQpIHNsaWRlci5jb250YWluZXIuY3NzKHNsaWRlci5hcmdzKTtcblxuICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsdGFyZ2V0KTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLnNldHVwID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgLy8gU0xJREU6XG4gICAgICBpZiAoIWZhZGUpIHtcbiAgICAgICAgdmFyIHNsaWRlck9mZnNldCwgYXJyO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImluaXRcIikge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ZpZXdwb3J0XCI+PC9kaXY+JykuY3NzKHtcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwifSkuYXBwZW5kVG8oc2xpZGVyKS5hcHBlbmQoc2xpZGVyLmNvbnRhaW5lcik7XG4gICAgICAgICAgLy8gSU5GSU5JVEUgTE9PUDpcbiAgICAgICAgICBzbGlkZXIuY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgc2xpZGVyLmNsb25lT2Zmc2V0ID0gMDtcbiAgICAgICAgICAvLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICBhcnIgPSAkLm1ha2VBcnJheShzbGlkZXIuc2xpZGVzKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzID0gJChhcnIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSU5GSU5JVEUgTE9PUCAmJiAhQ0FST1VTRUw6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmICFjYXJvdXNlbCkge1xuICAgICAgICAgIHNsaWRlci5jbG9uZUNvdW50ID0gMjtcbiAgICAgICAgICBzbGlkZXIuY2xvbmVPZmZzZXQgPSAxO1xuICAgICAgICAgIC8vIGNsZWFyIG91dCBvbGQgY2xvbmVzXG4gICAgICAgICAgaWYgKHR5cGUgIT09IFwiaW5pdFwiKSBzbGlkZXIuY29udGFpbmVyLmZpbmQoJy5jbG9uZScpLnJlbW92ZSgpO1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYXBwZW5kKG1ldGhvZHMudW5pcXVlSUQoc2xpZGVyLnNsaWRlcy5maXJzdCgpLmNsb25lKCkuYWRkQ2xhc3MoJ2Nsb25lJykpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnByZXBlbmQobWV0aG9kcy51bmlxdWVJRChzbGlkZXIuc2xpZGVzLmxhc3QoKS5jbG9uZSgpLmFkZENsYXNzKCdjbG9uZScpKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5uZXdTbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuXG4gICAgICAgIHNsaWRlck9mZnNldCA9IChyZXZlcnNlKSA/IHNsaWRlci5jb3VudCAtIDEgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldDtcbiAgICAgICAgLy8gVkVSVElDQUw6XG4gICAgICAgIGlmICh2ZXJ0aWNhbCAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLmhlaWdodCgoc2xpZGVyLmNvdW50ICsgc2xpZGVyLmNsb25lQ291bnQpICogMjAwICsgXCIlXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIikud2lkdGgoXCIxMDAlXCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRlci5uZXdTbGlkZXMuY3NzKHtcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaGVpZ2h0KHNsaWRlci5oKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXJPZmZzZXQgKiBzbGlkZXIuaCwgXCJpbml0XCIpO1xuICAgICAgICAgIH0sICh0eXBlID09PSBcImluaXRcIikgPyAxMDAgOiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLndpZHRoKChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVDb3VudCkgKiAyMDAgKyBcIiVcIik7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlck9mZnNldCAqIHNsaWRlci5jb21wdXRlZFcsIFwiaW5pdFwiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIubmV3U2xpZGVzLmNzcyh7XCJ3aWR0aFwiOiBzbGlkZXIuY29tcHV0ZWRXLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICAgICAgaWYgKHNsaWRlci52YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICB9LCAodHlwZSA9PT0gXCJpbml0XCIpID8gMTAwIDogMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIEZBREU6XG4gICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHtcIndpZHRoXCI6IFwiMTAwJVwiLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcIm1hcmdpblJpZ2h0XCI6IFwiLTEwMCVcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJ9KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW5pdFwiKSB7XG4gICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmZhZGVJbihzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nKTtcbiAgICAgICAgICAgIGlmIChzbGlkZXIudmFycy5mYWRlRmlyc3RTbGlkZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcImRpc3BsYXlcIjogXCJibG9ja1wiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMn0pLmNzcyh7XCJvcGFjaXR5XCI6IDF9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwiekluZGV4XCI6IDEgfSkuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwid2Via2l0VHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgXCIgKyBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCAvIDEwMDAgKyBcInMgZWFzZVwiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgICAvLyAhQ0FST1VTRUw6XG4gICAgICAvLyBDQU5ESURBVEU6IGFjdGl2ZSBzbGlkZVxuICAgICAgaWYgKCFjYXJvdXNlbCkgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcblxuICAgICAgLy9GbGV4U2xpZGVyOiBpbml0KCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmluaXQoc2xpZGVyKTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLmRvTWF0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNsaWRlID0gc2xpZGVyLnNsaWRlcy5maXJzdCgpLFxuICAgICAgICAgIHNsaWRlTWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbixcbiAgICAgICAgICBtaW5JdGVtcyA9IHNsaWRlci52YXJzLm1pbkl0ZW1zLFxuICAgICAgICAgIG1heEl0ZW1zID0gc2xpZGVyLnZhcnMubWF4SXRlbXM7XG5cbiAgICAgIHNsaWRlci53ID0gKHNsaWRlci52aWV3cG9ydD09PXVuZGVmaW5lZCkgPyBzbGlkZXIud2lkdGgoKSA6IHNsaWRlci52aWV3cG9ydC53aWR0aCgpO1xuICAgICAgc2xpZGVyLmggPSBzbGlkZS5oZWlnaHQoKTtcbiAgICAgIHNsaWRlci5ib3hQYWRkaW5nID0gc2xpZGUub3V0ZXJXaWR0aCgpIC0gc2xpZGUud2lkdGgoKTtcblxuICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgc2xpZGVyLml0ZW1UID0gc2xpZGVyLnZhcnMuaXRlbVdpZHRoICsgc2xpZGVNYXJnaW47XG4gICAgICAgIHNsaWRlci5taW5XID0gKG1pbkl0ZW1zKSA/IG1pbkl0ZW1zICogc2xpZGVyLml0ZW1UIDogc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5tYXhXID0gKG1heEl0ZW1zKSA/IChtYXhJdGVtcyAqIHNsaWRlci5pdGVtVCkgLSBzbGlkZU1hcmdpbiA6IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIuaXRlbVcgPSAoc2xpZGVyLm1pblcgPiBzbGlkZXIudykgPyAoc2xpZGVyLncgLSAoc2xpZGVNYXJnaW4gKiAobWluSXRlbXMgLSAxKSkpL21pbkl0ZW1zIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlci5tYXhXIDwgc2xpZGVyLncpID8gKHNsaWRlci53IC0gKHNsaWRlTWFyZ2luICogKG1heEl0ZW1zIC0gMSkpKS9tYXhJdGVtcyA6XG4gICAgICAgICAgICAgICAgICAgICAgIChzbGlkZXIudmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyBzbGlkZXIudyA6IHNsaWRlci52YXJzLml0ZW1XaWR0aDtcblxuICAgICAgICBzbGlkZXIudmlzaWJsZSA9IE1hdGguZmxvb3Ioc2xpZGVyLncvKHNsaWRlci5pdGVtVykpO1xuICAgICAgICBzbGlkZXIubW92ZSA9IChzbGlkZXIudmFycy5tb3ZlID4gMCAmJiBzbGlkZXIudmFycy5tb3ZlIDwgc2xpZGVyLnZpc2libGUgKSA/IHNsaWRlci52YXJzLm1vdmUgOiBzbGlkZXIudmlzaWJsZTtcbiAgICAgICAgc2xpZGVyLnBhZ2luZ0NvdW50ID0gTWF0aC5jZWlsKCgoc2xpZGVyLmNvdW50IC0gc2xpZGVyLnZpc2libGUpL3NsaWRlci5tb3ZlKSArIDEpO1xuICAgICAgICBzbGlkZXIubGFzdCA9ICBzbGlkZXIucGFnaW5nQ291bnQgLSAxO1xuICAgICAgICBzbGlkZXIubGltaXQgPSAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gKHNsaWRlci5pdGVtVyAqIChzbGlkZXIuY291bnQgLSAxKSkgKyAoc2xpZGVNYXJnaW4gKiAoc2xpZGVyLmNvdW50IC0gMSkpIDogKChzbGlkZXIuaXRlbVcgKyBzbGlkZU1hcmdpbikgKiBzbGlkZXIuY291bnQpIC0gc2xpZGVyLncgLSBzbGlkZU1hcmdpbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5pdGVtVyA9IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIucGFnaW5nQ291bnQgPSBzbGlkZXIuY291bnQ7XG4gICAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNsaWRlci5jb21wdXRlZFcgPSBzbGlkZXIuaXRlbVcgLSBzbGlkZXIuYm94UGFkZGluZztcbiAgICB9O1xuXG4gICAgc2xpZGVyLnVwZGF0ZSA9IGZ1bmN0aW9uKHBvcywgYWN0aW9uKSB7XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUgYW5kIHNsaWRlci5hbmltYXRpbmdUbyBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHBvcyA8IHNsaWRlci5jdXJyZW50U2xpZGUpIHtcbiAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zIDw9IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgcG9zICE9PSAwKSB7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IHNsaWRlci5jdXJyZW50U2xpZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjb250cm9sTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiAhc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgIGlmICgoYWN0aW9uID09PSBcImFkZFwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50ID4gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnVwZGF0ZShcImFkZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICgoYWN0aW9uID09PSBcInJlbW92ZVwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50IDwgc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPiBzbGlkZXIubGFzdCkge1xuICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi51cGRhdGUoXCJyZW1vdmVcIiwgc2xpZGVyLmxhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgZGlyZWN0aW9uTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgIH07XG5cbiAgICBzbGlkZXIuYWRkU2xpZGUgPSBmdW5jdGlvbihvYmosIHBvcykge1xuICAgICAgdmFyICRvYmogPSAkKG9iaik7XG5cbiAgICAgIHNsaWRlci5jb3VudCArPSAxO1xuICAgICAgc2xpZGVyLmxhc3QgPSBzbGlkZXIuY291bnQgLSAxO1xuXG4gICAgICAvLyBhcHBlbmQgbmV3IHNsaWRlXG4gICAgICBpZiAodmVydGljYWwgJiYgcmV2ZXJzZSkge1xuICAgICAgICAocG9zICE9PSB1bmRlZmluZWQpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY291bnQgLSBwb3MpLmFmdGVyKCRvYmopIDogc2xpZGVyLmNvbnRhaW5lci5wcmVwZW5kKCRvYmopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHBvcyAhPT0gdW5kZWZpbmVkKSA/IHNsaWRlci5zbGlkZXMuZXEocG9zKS5iZWZvcmUoJG9iaikgOiBzbGlkZXIuY29udGFpbmVyLmFwcGVuZCgkb2JqKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRTbGlkZSwgYW5pbWF0aW5nVG8sIGNvbnRyb2xOYXYsIGFuZCBkaXJlY3Rpb25OYXZcbiAgICAgIHNsaWRlci51cGRhdGUocG9zLCBcImFkZFwiKTtcblxuICAgICAgLy8gdXBkYXRlIHNsaWRlci5zbGlkZXNcbiAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yICsgJzpub3QoLmNsb25lKScsIHNsaWRlcik7XG4gICAgICAvLyByZS1zZXR1cCB0aGUgc2xpZGVyIHRvIGFjY29tZGF0ZSBuZXcgc2xpZGVcbiAgICAgIHNsaWRlci5zZXR1cCgpO1xuXG4gICAgICAvL0ZsZXhTbGlkZXI6IGFkZGVkKCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmFkZGVkKHNsaWRlcik7XG4gICAgfTtcbiAgICBzbGlkZXIucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBwb3MgPSAoaXNOYU4ob2JqKSkgPyBzbGlkZXIuc2xpZGVzLmluZGV4KCQob2JqKSkgOiBvYmo7XG5cbiAgICAgIC8vIHVwZGF0ZSBjb3VudFxuICAgICAgc2xpZGVyLmNvdW50IC09IDE7XG4gICAgICBzbGlkZXIubGFzdCA9IHNsaWRlci5jb3VudCAtIDE7XG5cbiAgICAgIC8vIHJlbW92ZSBzbGlkZVxuICAgICAgaWYgKGlzTmFOKG9iaikpIHtcbiAgICAgICAgJChvYmosIHNsaWRlci5zbGlkZXMpLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHZlcnRpY2FsICYmIHJldmVyc2UpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIubGFzdCkucmVtb3ZlKCkgOiBzbGlkZXIuc2xpZGVzLmVxKG9iaikucmVtb3ZlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUsIGFuaW1hdGluZ1RvLCBjb250cm9sTmF2LCBhbmQgZGlyZWN0aW9uTmF2XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICBzbGlkZXIudXBkYXRlKHBvcywgXCJyZW1vdmVcIik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzbGlkZXIuc2xpZGVzXG4gICAgICBzbGlkZXIuc2xpZGVzID0gJChzbGlkZXIudmFycy5zZWxlY3RvciArICc6bm90KC5jbG9uZSknLCBzbGlkZXIpO1xuICAgICAgLy8gcmUtc2V0dXAgdGhlIHNsaWRlciB0byBhY2NvbWRhdGUgbmV3IHNsaWRlXG4gICAgICBzbGlkZXIuc2V0dXAoKTtcblxuICAgICAgLy8gRmxleFNsaWRlcjogcmVtb3ZlZCgpIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5yZW1vdmVkKHNsaWRlcik7XG4gICAgfTtcblxuICAgIC8vRmxleFNsaWRlcjogSW5pdGlhbGl6ZVxuICAgIG1ldGhvZHMuaW5pdCgpO1xuICB9O1xuXG4gIC8vIEVuc3VyZSB0aGUgc2xpZGVyIGlzbid0IGZvY3Vzc2VkIGlmIHRoZSB3aW5kb3cgbG9zZXMgZm9jdXMuXG4gICQoIHdpbmRvdyApLmJsdXIoIGZ1bmN0aW9uICggZSApIHtcbiAgICBmb2N1c2VkID0gZmFsc2U7XG4gIH0pLmZvY3VzKCBmdW5jdGlvbiAoIGUgKSB7XG4gICAgZm9jdXNlZCA9IHRydWU7XG4gIH0pO1xuXG4gIC8vRmxleFNsaWRlcjogRGVmYXVsdCBTZXR0aW5nc1xuICAkLmZsZXhzbGlkZXIuZGVmYXVsdHMgPSB7XG4gICAgbmFtZXNwYWNlOiBcImZsZXgtXCIsICAgICAgICAgICAgIC8ve05FV30gU3RyaW5nOiBQcmVmaXggc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBvZiBldmVyeSBlbGVtZW50IGdlbmVyYXRlZCBieSB0aGUgcGx1Z2luXG4gICAgc2VsZWN0b3I6IFwiLnNsaWRlcyA+IGxpXCIsICAgICAgIC8ve05FV30gU2VsZWN0b3I6IE11c3QgbWF0Y2ggYSBzaW1wbGUgcGF0dGVybi4gJ3tjb250YWluZXJ9ID4ge3NsaWRlfScgLS0gSWdub3JlIHBhdHRlcm4gYXQgeW91ciBvd24gcGVyaWxcbiAgICBhbmltYXRpb246IFwiZmFkZVwiLCAgICAgICAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB5b3VyIGFuaW1hdGlvbiB0eXBlLCBcImZhZGVcIiBvciBcInNsaWRlXCJcbiAgICBlYXNpbmc6IFwic3dpbmdcIiwgICAgICAgICAgICAgICAgLy97TkVXfSBTdHJpbmc6IERldGVybWluZXMgdGhlIGVhc2luZyBtZXRob2QgdXNlZCBpbiBqUXVlcnkgdHJhbnNpdGlvbnMuIGpRdWVyeSBlYXNpbmcgcGx1Z2luIGlzIHN1cHBvcnRlZCFcbiAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB0aGUgc2xpZGluZyBkaXJlY3Rpb24sIFwiaG9yaXpvbnRhbFwiIG9yIFwidmVydGljYWxcIlxuICAgIHJldmVyc2U6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy97TkVXfSBCb29sZWFuOiBSZXZlcnNlIHRoZSBhbmltYXRpb24gZGlyZWN0aW9uXG4gICAgYW5pbWF0aW9uTG9vcDogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFNob3VsZCB0aGUgYW5pbWF0aW9uIGxvb3A/IElmIGZhbHNlLCBkaXJlY3Rpb25OYXYgd2lsbCByZWNlaXZlZCBcImRpc2FibGVcIiBjbGFzc2VzIGF0IGVpdGhlciBlbmRcbiAgICBzbW9vdGhIZWlnaHQ6IGZhbHNlLCAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogQWxsb3cgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgdG8gYW5pbWF0ZSBzbW9vdGhseSBpbiBob3Jpem9udGFsIG1vZGVcbiAgICBzdGFydEF0OiAwLCAgICAgICAgICAgICAgICAgICAgIC8vSW50ZWdlcjogVGhlIHNsaWRlIHRoYXQgdGhlIHNsaWRlciBzaG91bGQgc3RhcnQgb24uIEFycmF5IG5vdGF0aW9uICgwID0gZmlyc3Qgc2xpZGUpXG4gICAgc2xpZGVzaG93OiB0cnVlLCAgICAgICAgICAgICAgICAvL0Jvb2xlYW46IEFuaW1hdGUgc2xpZGVyIGF1dG9tYXRpY2FsbHlcbiAgICBzbGlkZXNob3dTcGVlZDogNzAwMCwgICAgICAgICAgIC8vSW50ZWdlcjogU2V0IHRoZSBzcGVlZCBvZiB0aGUgc2xpZGVzaG93IGN5Y2xpbmcsIGluIG1pbGxpc2Vjb25kc1xuICAgIGFuaW1hdGlvblNwZWVkOiA2MDAsICAgICAgICAgICAgLy9JbnRlZ2VyOiBTZXQgdGhlIHNwZWVkIG9mIGFuaW1hdGlvbnMsIGluIG1pbGxpc2Vjb25kc1xuICAgIGluaXREZWxheTogMCwgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBTZXQgYW4gaW5pdGlhbGl6YXRpb24gZGVsYXksIGluIG1pbGxpc2Vjb25kc1xuICAgIHJhbmRvbWl6ZTogZmFsc2UsICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBSYW5kb21pemUgc2xpZGUgb3JkZXJcbiAgICBmYWRlRmlyc3RTbGlkZTogdHJ1ZSwgICAgICAgICAgIC8vQm9vbGVhbjogRmFkZSBpbiB0aGUgZmlyc3Qgc2xpZGUgd2hlbiBhbmltYXRpb24gdHlwZSBpcyBcImZhZGVcIlxuICAgIHRodW1iQ2FwdGlvbnM6IGZhbHNlLCAgICAgICAgICAgLy9Cb29sZWFuOiBXaGV0aGVyIG9yIG5vdCB0byBwdXQgY2FwdGlvbnMgb24gdGh1bWJuYWlscyB3aGVuIHVzaW5nIHRoZSBcInRodW1ibmFpbHNcIiBjb250cm9sTmF2LlxuXG4gICAgLy8gVXNhYmlsaXR5IGZlYXR1cmVzXG4gICAgcGF1c2VPbkFjdGlvbjogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiBpbnRlcmFjdGluZyB3aXRoIGNvbnRyb2wgZWxlbWVudHMsIGhpZ2hseSByZWNvbW1lbmRlZC5cbiAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLCAgICAgICAgICAgIC8vQm9vbGVhbjogUGF1c2UgdGhlIHNsaWRlc2hvdyB3aGVuIGhvdmVyaW5nIG92ZXIgc2xpZGVyLCB0aGVuIHJlc3VtZSB3aGVuIG5vIGxvbmdlciBob3ZlcmluZ1xuICAgIHBhdXNlSW52aXNpYmxlOiB0cnVlLCAgIFx0XHQvL3tORVd9IEJvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiB0YWIgaXMgaW52aXNpYmxlLCByZXN1bWUgd2hlbiB2aXNpYmxlLiBQcm92aWRlcyBiZXR0ZXIgVVgsIGxvd2VyIENQVSB1c2FnZS5cbiAgICB1c2VDU1M6IHRydWUsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogU2xpZGVyIHdpbGwgdXNlIENTUzMgdHJhbnNpdGlvbnMgaWYgYXZhaWxhYmxlXG4gICAgdG91Y2g6IHRydWUsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IEFsbG93IHRvdWNoIHN3aXBlIG5hdmlnYXRpb24gb2YgdGhlIHNsaWRlciBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbiAgICB2aWRlbzogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogSWYgdXNpbmcgdmlkZW8gaW4gdGhlIHNsaWRlciwgd2lsbCBwcmV2ZW50IENTUzMgM0QgVHJhbnNmb3JtcyB0byBhdm9pZCBncmFwaGljYWwgZ2xpdGNoZXNcblxuICAgIC8vIFByaW1hcnkgQ29udHJvbHNcbiAgICBjb250cm9sTmF2OiB0cnVlLCAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQ3JlYXRlIG5hdmlnYXRpb24gZm9yIHBhZ2luZyBjb250cm9sIG9mIGVhY2ggc2xpZGU/IE5vdGU6IExlYXZlIHRydWUgZm9yIG1hbnVhbENvbnRyb2xzIHVzYWdlXG4gICAgZGlyZWN0aW9uTmF2OiB0cnVlLCAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBuYXZpZ2F0aW9uIGZvciBwcmV2aW91cy9uZXh0IG5hdmlnYXRpb24/ICh0cnVlL2ZhbHNlKVxuICAgIHByZXZUZXh0OiBcIlByZXZpb3VzXCIsICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwcmV2aW91c1wiIGRpcmVjdGlvbk5hdiBpdGVtXG4gICAgbmV4dFRleHQ6IFwiTmV4dFwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcIm5leHRcIiBkaXJlY3Rpb25OYXYgaXRlbVxuXG4gICAgLy8gU2Vjb25kYXJ5IE5hdmlnYXRpb25cbiAgICBrZXlib2FyZDogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQWxsb3cgc2xpZGVyIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkIGxlZnQvcmlnaHQga2V5c1xuICAgIG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLCAgICAgICAgLy97TkVXfSBCb29sZWFuOiBBbGxvdyBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIGFmZmVjdCBtdWx0aXBsZSBzbGlkZXJzLiBEZWZhdWx0IGJlaGF2aW9yIGN1dHMgb3V0IGtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtb3JlIHRoYW4gb25lIHNsaWRlciBwcmVzZW50LlxuICAgIG1vdXNld2hlZWw6IGZhbHNlLCAgICAgICAgICAgICAgLy97VVBEQVRFRH0gQm9vbGVhbjogUmVxdWlyZXMganF1ZXJ5Lm1vdXNld2hlZWwuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFuZG9uYWFyb24vanF1ZXJ5LW1vdXNld2hlZWwpIC0gQWxsb3dzIHNsaWRlciBuYXZpZ2F0aW5nIHZpYSBtb3VzZXdoZWVsXG4gICAgcGF1c2VQbGF5OiBmYWxzZSwgICAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBwYXVzZS9wbGF5IGR5bmFtaWMgZWxlbWVudFxuICAgIHBhdXNlVGV4dDogXCJQYXVzZVwiLCAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwYXVzZVwiIHBhdXNlUGxheSBpdGVtXG4gICAgcGxheVRleHQ6IFwiUGxheVwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcInBsYXlcIiBwYXVzZVBsYXkgaXRlbVxuXG4gICAgLy8gU3BlY2lhbCBwcm9wZXJ0aWVzXG4gICAgY29udHJvbHNDb250YWluZXI6IFwiXCIsICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgd2hpY2ggY29udGFpbmVyIHRoZSBuYXZpZ2F0aW9uIGVsZW1lbnRzIHNob3VsZCBiZSBhcHBlbmRlZCB0b28uIERlZmF1bHQgY29udGFpbmVyIGlzIHRoZSBGbGV4U2xpZGVyIGVsZW1lbnQuIEV4YW1wbGUgdXNlIHdvdWxkIGJlICQoXCIuZmxleHNsaWRlci1jb250YWluZXJcIikuIFByb3BlcnR5IGlzIGlnbm9yZWQgaWYgZ2l2ZW4gZWxlbWVudCBpcyBub3QgZm91bmQuXG4gICAgbWFudWFsQ29udHJvbHM6IFwiXCIsICAgICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgY3VzdG9tIGNvbnRyb2wgbmF2aWdhdGlvbi4gRXhhbXBsZXMgd291bGQgYmUgJChcIi5mbGV4LWNvbnRyb2wtbmF2IGxpXCIpIG9yIFwiI3RhYnMtbmF2IGxpIGltZ1wiLCBldGMuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4geW91ciBjb250cm9sTmF2IHNob3VsZCBtYXRjaCB0aGUgbnVtYmVyIG9mIHNsaWRlcy90YWJzLlxuICAgIHN5bmM6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBNaXJyb3IgdGhlIGFjdGlvbnMgcGVyZm9ybWVkIG9uIHRoaXMgc2xpZGVyIHdpdGggYW5vdGhlciBzbGlkZXIuIFVzZSB3aXRoIGNhcmUuXG4gICAgYXNOYXZGb3I6IFwiXCIsICAgICAgICAgICAgICAgICAgIC8ve05FV30gU2VsZWN0b3I6IEludGVybmFsIHByb3BlcnR5IGV4cG9zZWQgZm9yIHR1cm5pbmcgdGhlIHNsaWRlciBpbnRvIGEgdGh1bWJuYWlsIG5hdmlnYXRpb24gZm9yIGFub3RoZXIgc2xpZGVyXG5cbiAgICAvLyBDYXJvdXNlbCBPcHRpb25zXG4gICAgaXRlbVdpZHRoOiAwLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IEJveC1tb2RlbCB3aWR0aCBvZiBpbmRpdmlkdWFsIGNhcm91c2VsIGl0ZW1zLCBpbmNsdWRpbmcgaG9yaXpvbnRhbCBib3JkZXJzIGFuZCBwYWRkaW5nLlxuICAgIGl0ZW1NYXJnaW46IDAsICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBNYXJnaW4gYmV0d2VlbiBjYXJvdXNlbCBpdGVtcy5cbiAgICBtaW5JdGVtczogMSwgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTWluaW11bSBudW1iZXIgb2YgY2Fyb3VzZWwgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZS4gSXRlbXMgd2lsbCByZXNpemUgZmx1aWRseSB3aGVuIGJlbG93IHRoaXMuXG4gICAgbWF4SXRlbXM6IDAsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE1heG1pbXVtIG51bWJlciBvZiBjYXJvdXNlbCBpdGVtcyB0aGF0IHNob3VsZCBiZSB2aXNpYmxlLiBJdGVtcyB3aWxsIHJlc2l6ZSBmbHVpZGx5IHdoZW4gYWJvdmUgdGhpcyBsaW1pdC5cbiAgICBtb3ZlOiAwLCAgICAgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTnVtYmVyIG9mIGNhcm91c2VsIGl0ZW1zIHRoYXQgc2hvdWxkIG1vdmUgb24gYW5pbWF0aW9uLiBJZiAwLCBzbGlkZXIgd2lsbCBtb3ZlIGFsbCB2aXNpYmxlIGl0ZW1zLlxuICAgIGFsbG93T25lU2xpZGU6IHRydWUsICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IFdoZXRoZXIgb3Igbm90IHRvIGFsbG93IGEgc2xpZGVyIGNvbXByaXNlZCBvZiBhIHNpbmdsZSBzbGlkZVxuXG4gICAgLy8gQ2FsbGJhY2sgQVBJXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgd2hlbiB0aGUgc2xpZGVyIGxvYWRzIHRoZSBmaXJzdCBzbGlkZVxuICAgIGJlZm9yZTogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFzeW5jaHJvbm91c2x5IHdpdGggZWFjaCBzbGlkZXIgYW5pbWF0aW9uXG4gICAgYWZ0ZXI6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgZWFjaCBzbGlkZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgIGVuZDogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIHdoZW4gdGhlIHNsaWRlciByZWFjaGVzIHRoZSBsYXN0IHNsaWRlIChhc3luY2hyb25vdXMpXG4gICAgYWRkZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL3tORVd9IENhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgYSBzbGlkZSBpcyBhZGRlZFxuICAgIHJlbW92ZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciBhIHNsaWRlIGlzIHJlbW92ZWRcbiAgICBpbml0OiBmdW5jdGlvbigpIHt9ICAgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciB0aGUgc2xpZGVyIGlzIGluaXRpYWxseSBzZXR1cFxuICB9O1xuXG4gIC8vRmxleFNsaWRlcjogUGx1Z2luIEZ1bmN0aW9uXG4gICQuZm4uZmxleHNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSBvcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RvciA9IChvcHRpb25zLnNlbGVjdG9yKSA/IG9wdGlvbnMuc2VsZWN0b3IgOiBcIi5zbGlkZXMgPiBsaVwiLFxuICAgICAgICAgICAgJHNsaWRlcyA9ICR0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXG4gICAgICBpZiAoICggJHNsaWRlcy5sZW5ndGggPT09IDEgJiYgb3B0aW9ucy5hbGxvd09uZVNsaWRlID09PSB0cnVlICkgfHwgJHNsaWRlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgJHNsaWRlcy5mYWRlSW4oNDAwKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5zdGFydCkgb3B0aW9ucy5zdGFydCgkdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuZGF0YSgnZmxleHNsaWRlcicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBuZXcgJC5mbGV4c2xpZGVyKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGVscGVyIHN0cmluZ3MgdG8gcXVpY2tseSBwZXJmb3JtIGZ1bmN0aW9ucyBvbiB0aGUgc2xpZGVyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcykuZGF0YSgnZmxleHNsaWRlcicpO1xuICAgICAgc3dpdGNoIChvcHRpb25zKSB7XG4gICAgICAgIGNhc2UgXCJwbGF5XCI6ICRzbGlkZXIucGxheSgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInBhdXNlXCI6ICRzbGlkZXIucGF1c2UoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdG9wXCI6ICRzbGlkZXIuc3RvcCgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIm5leHRcIjogJHNsaWRlci5mbGV4QW5pbWF0ZSgkc2xpZGVyLmdldFRhcmdldChcIm5leHRcIiksIHRydWUpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgY2FzZSBcInByZXZpb3VzXCI6ICRzbGlkZXIuZmxleEFuaW1hdGUoJHNsaWRlci5nZXRUYXJnZXQoXCJwcmV2XCIpLCB0cnVlKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIikgJHNsaWRlci5mbGV4QW5pbWF0ZShvcHRpb25zLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9