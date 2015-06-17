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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVybml6ci5qcyIsImZvdW5kYXRpb24uanMiLCJmb3VuZGF0aW9uLmRyb3Bkb3duLmpzIiwiZm91bmRhdGlvbi5lcXVhbGl6ZXIuanMiLCJmb3VuZGF0aW9uLm9mZmNhbnZhcy5qcyIsImZvdW5kYXRpb24ub3JiaXQuanMiLCJmb3VuZGF0aW9uLnRvcGJhci5qcyIsImVhc3lSZXNwb25zaXZlVGFicy5qcyIsImpxdWVyeS5lbGV2YXRlem9vbS5qcyIsImpxdWVyeS5mbGV4c2xpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzkzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcnRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDanZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBNb2Rlcm5penIgdjIuOC4zXG4gKiB3d3cubW9kZXJuaXpyLmNvbVxuICpcbiAqIENvcHlyaWdodCAoYykgRmFydWsgQXRlcywgUGF1bCBJcmlzaCwgQWxleCBTZXh0b25cbiAqIEF2YWlsYWJsZSB1bmRlciB0aGUgQlNEIGFuZCBNSVQgbGljZW5zZXM6IHd3dy5tb2Rlcm5penIuY29tL2xpY2Vuc2UvXG4gKi9cblxuLypcbiAqIE1vZGVybml6ciB0ZXN0cyB3aGljaCBuYXRpdmUgQ1NTMyBhbmQgSFRNTDUgZmVhdHVyZXMgYXJlIGF2YWlsYWJsZSBpblxuICogdGhlIGN1cnJlbnQgVUEgYW5kIG1ha2VzIHRoZSByZXN1bHRzIGF2YWlsYWJsZSB0byB5b3UgaW4gdHdvIHdheXM6XG4gKiBhcyBwcm9wZXJ0aWVzIG9uIGEgZ2xvYmFsIE1vZGVybml6ciBvYmplY3QsIGFuZCBhcyBjbGFzc2VzIG9uIHRoZVxuICogPGh0bWw+IGVsZW1lbnQuIFRoaXMgaW5mb3JtYXRpb24gYWxsb3dzIHlvdSB0byBwcm9ncmVzc2l2ZWx5IGVuaGFuY2VcbiAqIHlvdXIgcGFnZXMgd2l0aCBhIGdyYW51bGFyIGxldmVsIG9mIGNvbnRyb2wgb3ZlciB0aGUgZXhwZXJpZW5jZS5cbiAqXG4gKiBNb2Rlcm5penIgaGFzIGFuIG9wdGlvbmFsIChub3QgaW5jbHVkZWQpIGNvbmRpdGlvbmFsIHJlc291cmNlIGxvYWRlclxuICogY2FsbGVkIE1vZGVybml6ci5sb2FkKCksIGJhc2VkIG9uIFllcG5vcGUuanMgKHllcG5vcGVqcy5jb20pLlxuICogVG8gZ2V0IGEgYnVpbGQgdGhhdCBpbmNsdWRlcyBNb2Rlcm5penIubG9hZCgpLCBhcyB3ZWxsIGFzIGNob29zaW5nXG4gKiB3aGljaCB0ZXN0cyB0byBpbmNsdWRlLCBnbyB0byB3d3cubW9kZXJuaXpyLmNvbS9kb3dubG9hZC9cbiAqXG4gKiBBdXRob3JzICAgICAgICBGYXJ1ayBBdGVzLCBQYXVsIElyaXNoLCBBbGV4IFNleHRvblxuICogQ29udHJpYnV0b3JzICAgUnlhbiBTZWRkb24sIEJlbiBBbG1hblxuICovXG5cbndpbmRvdy5Nb2Rlcm5penIgPSAoZnVuY3Rpb24oIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAgIHZhciB2ZXJzaW9uID0gJzIuOC4zJyxcblxuICAgIE1vZGVybml6ciA9IHt9LFxuXG4gICAgLyo+PmNzc2NsYXNzZXMqL1xuICAgIC8vIG9wdGlvbiBmb3IgZW5hYmxpbmcgdGhlIEhUTUwgY2xhc3NlcyB0byBiZSBhZGRlZFxuICAgIGVuYWJsZUNsYXNzZXMgPSB0cnVlLFxuICAgIC8qPj5jc3NjbGFzc2VzKi9cblxuICAgIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgb3VyIFwibW9kZXJuaXpyXCIgZWxlbWVudCB0aGF0IHdlIGRvIG1vc3QgZmVhdHVyZSB0ZXN0cyBvbi5cbiAgICAgKi9cbiAgICBtb2QgPSAnbW9kZXJuaXpyJyxcbiAgICBtb2RFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChtb2QpLFxuICAgIG1TdHlsZSA9IG1vZEVsZW0uc3R5bGUsXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGlucHV0IGVsZW1lbnQgZm9yIHZhcmlvdXMgV2ViIEZvcm1zIGZlYXR1cmUgdGVzdHMuXG4gICAgICovXG4gICAgaW5wdXRFbGVtIC8qPj5pbnB1dGVsZW0qLyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykgLyo+PmlucHV0ZWxlbSovICxcblxuICAgIC8qPj5zbWlsZSovXG4gICAgc21pbGUgPSAnOiknLFxuICAgIC8qPj5zbWlsZSovXG5cbiAgICB0b1N0cmluZyA9IHt9LnRvU3RyaW5nLFxuXG4gICAgLy8gVE9ETyA6OiBtYWtlIHRoZSBwcmVmaXhlcyBtb3JlIGdyYW51bGFyXG4gICAgLyo+PnByZWZpeGVzKi9cbiAgICAvLyBMaXN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBzZXQgZm9yIGNzcyB0ZXN0cy4gU2VlIHRpY2tldCAjMjFcbiAgICBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpLFxuICAgIC8qPj5wcmVmaXhlcyovXG5cbiAgICAvKj4+ZG9tcHJlZml4ZXMqL1xuICAgIC8vIEZvbGxvd2luZyBzcGVjIGlzIHRvIGV4cG9zZSB2ZW5kb3Itc3BlY2lmaWMgc3R5bGUgcHJvcGVydGllcyBhczpcbiAgICAvLyAgIGVsZW0uc3R5bGUuV2Via2l0Qm9yZGVyUmFkaXVzXG4gICAgLy8gYW5kIHRoZSBmb2xsb3dpbmcgd291bGQgYmUgaW5jb3JyZWN0OlxuICAgIC8vICAgZWxlbS5zdHlsZS53ZWJraXRCb3JkZXJSYWRpdXNcblxuICAgIC8vIFdlYmtpdCBnaG9zdHMgdGhlaXIgcHJvcGVydGllcyBpbiBsb3dlcmNhc2UgYnV0IE9wZXJhICYgTW96IGRvIG5vdC5cbiAgICAvLyBNaWNyb3NvZnQgdXNlcyBhIGxvd2VyY2FzZSBgbXNgIGluc3RlYWQgb2YgdGhlIGNvcnJlY3QgYE1zYCBpbiBJRTgrXG4gICAgLy8gICBlcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwOC8wMy8xMC8yMS40OC4xMC9cblxuICAgIC8vIE1vcmUgaGVyZTogZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy9pc3N1ZS8yMVxuICAgIG9tUHJlZml4ZXMgPSAnV2Via2l0IE1veiBPIG1zJyxcblxuICAgIGNzc29tUHJlZml4ZXMgPSBvbVByZWZpeGVzLnNwbGl0KCcgJyksXG5cbiAgICBkb21QcmVmaXhlcyA9IG9tUHJlZml4ZXMudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLFxuICAgIC8qPj5kb21wcmVmaXhlcyovXG5cbiAgICAvKj4+bnMqL1xuICAgIG5zID0geydzdmcnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnfSxcbiAgICAvKj4+bnMqL1xuXG4gICAgdGVzdHMgPSB7fSxcbiAgICBpbnB1dHMgPSB7fSxcbiAgICBhdHRycyA9IHt9LFxuXG4gICAgY2xhc3NlcyA9IFtdLFxuXG4gICAgc2xpY2UgPSBjbGFzc2VzLnNsaWNlLFxuXG4gICAgZmVhdHVyZU5hbWUsIC8vIHVzZWQgaW4gdGVzdGluZyBsb29wXG5cblxuICAgIC8qPj50ZXN0c3R5bGVzKi9cbiAgICAvLyBJbmplY3QgZWxlbWVudCB3aXRoIHN0eWxlIGVsZW1lbnQgYW5kIHNvbWUgQ1NTIHJ1bGVzXG4gICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMgPSBmdW5jdGlvbiggcnVsZSwgY2FsbGJhY2ssIG5vZGVzLCB0ZXN0bmFtZXMgKSB7XG5cbiAgICAgIHZhciBzdHlsZSwgcmV0LCBub2RlLCBkb2NPdmVyZmxvdyxcbiAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAvLyBBZnRlciBwYWdlIGxvYWQgaW5qZWN0aW5nIGEgZmFrZSBib2R5IGRvZXNuJ3Qgd29yayBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgIC8vIElFNiBhbmQgNyB3b24ndCByZXR1cm4gb2Zmc2V0V2lkdGggb3Igb2Zmc2V0SGVpZ2h0IHVubGVzcyBpdCdzIGluIHRoZSBib2R5IGVsZW1lbnQsIHNvIHdlIGZha2UgaXQuXG4gICAgICAgICAgZmFrZUJvZHkgPSBib2R5IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcblxuICAgICAgaWYgKCBwYXJzZUludChub2RlcywgMTApICkge1xuICAgICAgICAgIC8vIEluIG9yZGVyIG5vdCB0byBnaXZlIGZhbHNlIHBvc2l0aXZlcyB3ZSBjcmVhdGUgYSBub2RlIGZvciBlYWNoIHRlc3RcbiAgICAgICAgICAvLyBUaGlzIGFsc28gYWxsb3dzIHRoZSBtZXRob2QgdG8gc2NhbGUgZm9yIHVuc3BlY2lmaWVkIHVzZXNcbiAgICAgICAgICB3aGlsZSAoIG5vZGVzLS0gKSB7XG4gICAgICAgICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgbm9kZS5pZCA9IHRlc3RuYW1lcyA/IHRlc3RuYW1lc1tub2Rlc10gOiBtb2QgKyAobm9kZXMgKyAxKTtcbiAgICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gPHN0eWxlPiBlbGVtZW50cyBpbiBJRTYtOSBhcmUgY29uc2lkZXJlZCAnTm9TY29wZScgZWxlbWVudHMgYW5kIHRoZXJlZm9yZSB3aWxsIGJlIHJlbW92ZWRcbiAgICAgIC8vIHdoZW4gaW5qZWN0ZWQgd2l0aCBpbm5lckhUTUwuIFRvIGdldCBhcm91bmQgdGhpcyB5b3UgbmVlZCB0byBwcmVwZW5kIHRoZSAnTm9TY29wZScgZWxlbWVudFxuICAgICAgLy8gd2l0aCBhICdzY29wZWQnIGVsZW1lbnQsIGluIG91ciBjYXNlIHRoZSBzb2Z0LWh5cGhlbiBlbnRpdHkgYXMgaXQgd29uJ3QgbWVzcyB3aXRoIG91ciBtZWFzdXJlbWVudHMuXG4gICAgICAvLyBtc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMzg5NyUyOFZTLjg1JTI5LmFzcHhcbiAgICAgIC8vIERvY3VtZW50cyBzZXJ2ZWQgYXMgeG1sIHdpbGwgdGhyb3cgaWYgdXNpbmcgJnNoeTsgc28gdXNlIHhtbCBmcmllbmRseSBlbmNvZGVkIHZlcnNpb24uIFNlZSBpc3N1ZSAjMjc3XG4gICAgICBzdHlsZSA9IFsnJiMxNzM7JywnPHN0eWxlIGlkPVwicycsIG1vZCwgJ1wiPicsIHJ1bGUsICc8L3N0eWxlPiddLmpvaW4oJycpO1xuICAgICAgZGl2LmlkID0gbW9kO1xuICAgICAgLy8gSUU2IHdpbGwgZmFsc2UgcG9zaXRpdmUgb24gc29tZSB0ZXN0cyBkdWUgdG8gdGhlIHN0eWxlIGVsZW1lbnQgaW5zaWRlIHRoZSB0ZXN0IGRpdiBzb21laG93IGludGVyZmVyaW5nIG9mZnNldEhlaWdodCwgc28gaW5zZXJ0IGl0IGludG8gYm9keSBvciBmYWtlYm9keS5cbiAgICAgIC8vIE9wZXJhIHdpbGwgYWN0IGFsbCBxdWlya3kgd2hlbiBpbmplY3RpbmcgZWxlbWVudHMgaW4gZG9jdW1lbnRFbGVtZW50IHdoZW4gcGFnZSBpcyBzZXJ2ZWQgYXMgeG1sLCBuZWVkcyBmYWtlYm9keSB0b28uICMyNzBcbiAgICAgIChib2R5ID8gZGl2IDogZmFrZUJvZHkpLmlubmVySFRNTCArPSBzdHlsZTtcbiAgICAgIGZha2VCb2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICBpZiAoICFib2R5ICkge1xuICAgICAgICAgIC8vYXZvaWQgY3Jhc2hpbmcgSUU4LCBpZiBiYWNrZ3JvdW5kIGltYWdlIGlzIHVzZWRcbiAgICAgICAgICBmYWtlQm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgLy9TYWZhcmkgNS4xMy81LjEuNCBPU1ggc3RvcHMgbG9hZGluZyBpZiA6Oi13ZWJraXQtc2Nyb2xsYmFyIGlzIHVzZWQgYW5kIHNjcm9sbGJhcnMgYXJlIHZpc2libGVcbiAgICAgICAgICBmYWtlQm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgIGRvY092ZXJmbG93ID0gZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdztcbiAgICAgICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgZG9jRWxlbWVudC5hcHBlbmRDaGlsZChmYWtlQm9keSk7XG4gICAgICB9XG5cbiAgICAgIHJldCA9IGNhbGxiYWNrKGRpdiwgcnVsZSk7XG4gICAgICAvLyBJZiB0aGlzIGlzIGRvbmUgYWZ0ZXIgcGFnZSBsb2FkIHdlIGRvbid0IHdhbnQgdG8gcmVtb3ZlIHRoZSBib2R5IHNvIGNoZWNrIGlmIGJvZHkgZXhpc3RzXG4gICAgICBpZiAoICFib2R5ICkge1xuICAgICAgICAgIGZha2VCb2R5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFrZUJvZHkpO1xuICAgICAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2NPdmVyZmxvdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEhcmV0O1xuXG4gICAgfSxcbiAgICAvKj4+dGVzdHN0eWxlcyovXG5cbiAgICAvKj4+bXEqL1xuICAgIC8vIGFkYXB0ZWQgZnJvbSBtYXRjaE1lZGlhIHBvbHlmaWxsXG4gICAgLy8gYnkgU2NvdHQgSmVobCBhbmQgUGF1bCBJcmlzaFxuICAgIC8vIGdpc3QuZ2l0aHViLmNvbS83ODY3NjhcbiAgICB0ZXN0TWVkaWFRdWVyeSA9IGZ1bmN0aW9uKCBtcSApIHtcblxuICAgICAgdmFyIG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCB3aW5kb3cubXNNYXRjaE1lZGlhO1xuICAgICAgaWYgKCBtYXRjaE1lZGlhICkge1xuICAgICAgICByZXR1cm4gbWF0Y2hNZWRpYShtcSkgJiYgbWF0Y2hNZWRpYShtcSkubWF0Y2hlcyB8fCBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvb2w7XG5cbiAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKCdAbWVkaWEgJyArIG1xICsgJyB7ICMnICsgbW9kICsgJyB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSB9JywgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgIGJvb2wgPSAod2luZG93LmdldENvbXB1dGVkU3R5bGUgP1xuICAgICAgICAgICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKSA6XG4gICAgICAgICAgICAgICAgICBub2RlLmN1cnJlbnRTdHlsZSlbJ3Bvc2l0aW9uJ10gPT0gJ2Fic29sdXRlJztcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gYm9vbDtcblxuICAgICB9LFxuICAgICAvKj4+bXEqL1xuXG5cbiAgICAvKj4+aGFzZXZlbnQqL1xuICAgIC8vXG4gICAgLy8gaXNFdmVudFN1cHBvcnRlZCBkZXRlcm1pbmVzIGlmIGEgZ2l2ZW4gZWxlbWVudCBzdXBwb3J0cyB0aGUgZ2l2ZW4gZXZlbnRcbiAgICAvLyBrYW5nYXguZ2l0aHViLmNvbS9pc2V2ZW50c3VwcG9ydGVkL1xuICAgIC8vXG4gICAgLy8gVGhlIGZvbGxvd2luZyByZXN1bHRzIGFyZSBrbm93biBpbmNvcnJlY3RzOlxuICAgIC8vICAgTW9kZXJuaXpyLmhhc0V2ZW50KFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLCBlbGVtKSAvLyBmYWxzZSBuZWdhdGl2ZVxuICAgIC8vICAgTW9kZXJuaXpyLmhhc0V2ZW50KFwidGV4dElucHV0XCIpIC8vIGluIFdlYmtpdC4gZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8zMzNcbiAgICAvLyAgIC4uLlxuICAgIGlzRXZlbnRTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBUQUdOQU1FUyA9IHtcbiAgICAgICAgJ3NlbGVjdCc6ICdpbnB1dCcsICdjaGFuZ2UnOiAnaW5wdXQnLFxuICAgICAgICAnc3VibWl0JzogJ2Zvcm0nLCAncmVzZXQnOiAnZm9ybScsXG4gICAgICAgICdlcnJvcic6ICdpbWcnLCAnbG9hZCc6ICdpbWcnLCAnYWJvcnQnOiAnaW1nJ1xuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gaXNFdmVudFN1cHBvcnRlZCggZXZlbnROYW1lLCBlbGVtZW50ICkge1xuXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoVEFHTkFNRVNbZXZlbnROYW1lXSB8fCAnZGl2Jyk7XG4gICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG5cbiAgICAgICAgLy8gV2hlbiB1c2luZyBgc2V0QXR0cmlidXRlYCwgSUUgc2tpcHMgXCJ1bmxvYWRcIiwgV2ViS2l0IHNraXBzIFwidW5sb2FkXCIgYW5kIFwicmVzaXplXCIsIHdoZXJlYXMgYGluYCBcImNhdGNoZXNcIiB0aG9zZVxuICAgICAgICB2YXIgaXNTdXBwb3J0ZWQgPSBldmVudE5hbWUgaW4gZWxlbWVudDtcblxuICAgICAgICBpZiAoICFpc1N1cHBvcnRlZCApIHtcbiAgICAgICAgICAvLyBJZiBpdCBoYXMgbm8gYHNldEF0dHJpYnV0ZWAgKGkuZS4gZG9lc24ndCBpbXBsZW1lbnQgTm9kZSBpbnRlcmZhY2UpLCB0cnkgZ2VuZXJpYyBlbGVtZW50XG4gICAgICAgICAgaWYgKCAhZWxlbWVudC5zZXRBdHRyaWJ1dGUgKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggZWxlbWVudC5zZXRBdHRyaWJ1dGUgJiYgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUgKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShldmVudE5hbWUsICcnKTtcbiAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gaXMoZWxlbWVudFtldmVudE5hbWVdLCAnZnVuY3Rpb24nKTtcblxuICAgICAgICAgICAgLy8gSWYgcHJvcGVydHkgd2FzIGNyZWF0ZWQsIFwicmVtb3ZlIGl0XCIgKGJ5IHNldHRpbmcgdmFsdWUgdG8gYHVuZGVmaW5lZGApXG4gICAgICAgICAgICBpZiAoICFpcyhlbGVtZW50W2V2ZW50TmFtZV0sICd1bmRlZmluZWQnKSApIHtcbiAgICAgICAgICAgICAgZWxlbWVudFtldmVudE5hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoZXZlbnROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzRXZlbnRTdXBwb3J0ZWQ7XG4gICAgfSkoKSxcbiAgICAvKj4+aGFzZXZlbnQqL1xuXG4gICAgLy8gVE9ETyA6OiBBZGQgZmxhZyBmb3IgaGFzb3ducHJvcCA/IGRpZG4ndCBsYXN0IHRpbWVcblxuICAgIC8vIGhhc093blByb3BlcnR5IHNoaW0gYnkga2FuZ2F4IG5lZWRlZCBmb3IgU2FmYXJpIDIuMCBzdXBwb3J0XG4gICAgX2hhc093blByb3BlcnR5ID0gKHt9KS5oYXNPd25Qcm9wZXJ0eSwgaGFzT3duUHJvcDtcblxuICAgIGlmICggIWlzKF9oYXNPd25Qcm9wZXJ0eSwgJ3VuZGVmaW5lZCcpICYmICFpcyhfaGFzT3duUHJvcGVydHkuY2FsbCwgJ3VuZGVmaW5lZCcpICkge1xuICAgICAgaGFzT3duUHJvcCA9IGZ1bmN0aW9uIChvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGFzT3duUHJvcCA9IGZ1bmN0aW9uIChvYmplY3QsIHByb3BlcnR5KSB7IC8qIHllcywgdGhpcyBjYW4gZ2l2ZSBmYWxzZSBwb3NpdGl2ZXMvbmVnYXRpdmVzLCBidXQgbW9zdCBvZiB0aGUgdGltZSB3ZSBkb24ndCBjYXJlIGFib3V0IHRob3NlICovXG4gICAgICAgIHJldHVybiAoKHByb3BlcnR5IGluIG9iamVjdCkgJiYgaXMob2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtwcm9wZXJ0eV0sICd1bmRlZmluZWQnKSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEFkYXB0ZWQgZnJvbSBFUzUtc2hpbSBodHRwczovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL2VzNS1zaGltL2Jsb2IvbWFzdGVyL2VzNS1zaGltLmpzXG4gICAgLy8gZXM1LmdpdGh1Yi5jb20vI3gxNS4zLjQuNVxuXG4gICAgaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgYm91bmQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcblxuICAgICAgICAgICAgICB2YXIgRiA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgICAgICAgRi5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IG5ldyBGKCk7XG5cbiAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICAgIHNlbGYsXG4gICAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYm91bmQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENzcyBhcHBsaWVzIGdpdmVuIHN0eWxlcyB0byB0aGUgTW9kZXJuaXpyIERPTSBub2RlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldENzcyggc3RyICkge1xuICAgICAgICBtU3R5bGUuY3NzVGV4dCA9IHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRDc3NBbGwgZXh0cmFwb2xhdGVzIGFsbCB2ZW5kb3Itc3BlY2lmaWMgY3NzIHN0cmluZ3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0Q3NzQWxsKCBzdHIxLCBzdHIyICkge1xuICAgICAgICByZXR1cm4gc2V0Q3NzKHByZWZpeGVzLmpvaW4oc3RyMSArICc7JykgKyAoIHN0cjIgfHwgJycgKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXMgcmV0dXJucyBhIGJvb2xlYW4gZm9yIGlmIHR5cGVvZiBvYmogaXMgZXhhY3RseSB0eXBlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGlzKCBvYmosIHR5cGUgKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNvbnRhaW5zIHJldHVybnMgYSBib29sZWFuIGZvciBpZiBzdWJzdHIgaXMgZm91bmQgd2l0aGluIHN0ci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb250YWlucyggc3RyLCBzdWJzdHIgKSB7XG4gICAgICAgIHJldHVybiAhIX4oJycgKyBzdHIpLmluZGV4T2Yoc3Vic3RyKTtcbiAgICB9XG5cbiAgICAvKj4+dGVzdHByb3AqL1xuXG4gICAgLy8gdGVzdFByb3BzIGlzIGEgZ2VuZXJpYyBDU1MgLyBET00gcHJvcGVydHkgdGVzdC5cblxuICAgIC8vIEluIHRlc3Rpbmcgc3VwcG9ydCBmb3IgYSBnaXZlbiBDU1MgcHJvcGVydHksIGl0J3MgbGVnaXQgdG8gdGVzdDpcbiAgICAvLyAgICBgZWxlbS5zdHlsZVtzdHlsZU5hbWVdICE9PSB1bmRlZmluZWRgXG4gICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBpdCB3aWxsIHJldHVybiBhbiBlbXB0eSBzdHJpbmcsXG4gICAgLy8gaWYgdW5zdXBwb3J0ZWQgaXQgd2lsbCByZXR1cm4gdW5kZWZpbmVkLlxuXG4gICAgLy8gV2UnbGwgdGFrZSBhZHZhbnRhZ2Ugb2YgdGhpcyBxdWljayB0ZXN0IGFuZCBza2lwIHNldHRpbmcgYSBzdHlsZVxuICAgIC8vIG9uIG91ciBtb2Rlcm5penIgZWxlbWVudCwgYnV0IGluc3RlYWQganVzdCB0ZXN0aW5nIHVuZGVmaW5lZCB2c1xuICAgIC8vIGVtcHR5IHN0cmluZy5cblxuICAgIC8vIEJlY2F1c2UgdGhlIHRlc3Rpbmcgb2YgdGhlIENTUyBwcm9wZXJ0eSBuYW1lcyAod2l0aCBcIi1cIiwgYXNcbiAgICAvLyBvcHBvc2VkIHRvIHRoZSBjYW1lbENhc2UgRE9NIHByb3BlcnRpZXMpIGlzIG5vbi1wb3J0YWJsZSBhbmRcbiAgICAvLyBub24tc3RhbmRhcmQgYnV0IHdvcmtzIGluIFdlYktpdCBhbmQgSUUgKGJ1dCBub3QgR2Vja28gb3IgT3BlcmEpLFxuICAgIC8vIHdlIGV4cGxpY2l0bHkgcmVqZWN0IHByb3BlcnRpZXMgd2l0aCBkYXNoZXMgc28gdGhhdCBhdXRob3JzXG4gICAgLy8gZGV2ZWxvcGluZyBpbiBXZWJLaXQgb3IgSUUgZmlyc3QgZG9uJ3QgZW5kIHVwIHdpdGhcbiAgICAvLyBicm93c2VyLXNwZWNpZmljIGNvbnRlbnQgYnkgYWNjaWRlbnQuXG5cbiAgICBmdW5jdGlvbiB0ZXN0UHJvcHMoIHByb3BzLCBwcmVmaXhlZCApIHtcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcHJvcHMgKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgaWYgKCAhY29udGFpbnMocHJvcCwgXCItXCIpICYmIG1TdHlsZVtwcm9wXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmVmaXhlZCA9PSAncGZ4JyA/IHByb3AgOiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyo+PnRlc3Rwcm9wKi9cblxuICAgIC8vIFRPRE8gOjogYWRkIHRlc3RET01Qcm9wc1xuICAgIC8qKlxuICAgICAqIHRlc3RET01Qcm9wcyBpcyBhIGdlbmVyaWMgRE9NIHByb3BlcnR5IHRlc3Q7IGlmIGEgYnJvd3NlciBzdXBwb3J0c1xuICAgICAqICAgYSBjZXJ0YWluIHByb3BlcnR5LCBpdCB3b24ndCByZXR1cm4gdW5kZWZpbmVkIGZvciBpdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0ZXN0RE9NUHJvcHMoIHByb3BzLCBvYmosIGVsZW0gKSB7XG4gICAgICAgIGZvciAoIHZhciBpIGluIHByb3BzICkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBvYmpbcHJvcHNbaV1dO1xuICAgICAgICAgICAgaWYgKCBpdGVtICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcHJvcGVydHkgbmFtZSBhcyBhIHN0cmluZ1xuICAgICAgICAgICAgICAgIGlmIChlbGVtID09PSBmYWxzZSkgcmV0dXJuIHByb3BzW2ldO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0J3MgYmluZCBhIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGlzKGl0ZW0sICdmdW5jdGlvbicpKXtcbiAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYXV0b2JpbmQgdW5sZXNzIG92ZXJyaWRlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5iaW5kKGVsZW0gfHwgb2JqKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVuYm91bmQgZnVuY3Rpb24gb3Igb2JqIG9yIHZhbHVlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qPj50ZXN0YWxscHJvcHMqL1xuICAgIC8qKlxuICAgICAqIHRlc3RQcm9wc0FsbCB0ZXN0cyBhIGxpc3Qgb2YgRE9NIHByb3BlcnRpZXMgd2Ugd2FudCB0byBjaGVjayBhZ2FpbnN0LlxuICAgICAqICAgV2Ugc3BlY2lmeSBsaXRlcmFsbHkgQUxMIHBvc3NpYmxlIChrbm93biBhbmQvb3IgbGlrZWx5KSBwcm9wZXJ0aWVzIG9uXG4gICAgICogICB0aGUgZWxlbWVudCBpbmNsdWRpbmcgdGhlIG5vbi12ZW5kb3IgcHJlZml4ZWQgb25lLCBmb3IgZm9yd2FyZC1cbiAgICAgKiAgIGNvbXBhdGliaWxpdHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdGVzdFByb3BzQWxsKCBwcm9wLCBwcmVmaXhlZCwgZWxlbSApIHtcblxuICAgICAgICB2YXIgdWNQcm9wICA9IHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpLFxuICAgICAgICAgICAgcHJvcHMgICA9IChwcm9wICsgJyAnICsgY3Nzb21QcmVmaXhlcy5qb2luKHVjUHJvcCArICcgJykgKyB1Y1Byb3ApLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgLy8gZGlkIHRoZXkgY2FsbCAucHJlZml4ZWQoJ2JveFNpemluZycpIG9yIGFyZSB3ZSBqdXN0IHRlc3RpbmcgYSBwcm9wP1xuICAgICAgICBpZihpcyhwcmVmaXhlZCwgXCJzdHJpbmdcIikgfHwgaXMocHJlZml4ZWQsIFwidW5kZWZpbmVkXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRlc3RQcm9wcyhwcm9wcywgcHJlZml4ZWQpO1xuXG4gICAgICAgIC8vIG90aGVyd2lzZSwgdGhleSBjYWxsZWQgLnByZWZpeGVkKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLCB3aW5kb3dbLCBlbGVtXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wcyA9IChwcm9wICsgJyAnICsgKGRvbVByZWZpeGVzKS5qb2luKHVjUHJvcCArICcgJykgKyB1Y1Byb3ApLnNwbGl0KCcgJyk7XG4gICAgICAgICAgcmV0dXJuIHRlc3RET01Qcm9wcyhwcm9wcywgcHJlZml4ZWQsIGVsZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qPj50ZXN0YWxscHJvcHMqL1xuXG5cbiAgICAvKipcbiAgICAgKiBUZXN0c1xuICAgICAqIC0tLS0tXG4gICAgICovXG5cbiAgICAvLyBUaGUgKm5ldyogZmxleGJveFxuICAgIC8vIGRldi53My5vcmcvY3Nzd2cvY3NzMy1mbGV4Ym94XG5cbiAgICB0ZXN0c1snZmxleGJveCddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGVzdFByb3BzQWxsKCdmbGV4V3JhcCcpO1xuICAgIH07XG5cbiAgICAvLyBUaGUgKm9sZCogZmxleGJveFxuICAgIC8vIHd3dy53My5vcmcvVFIvMjAwOS9XRC1jc3MzLWZsZXhib3gtMjAwOTA3MjMvXG5cbiAgICB0ZXN0c1snZmxleGJveGxlZ2FjeSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JveERpcmVjdGlvbicpO1xuICAgIH07XG5cbiAgICAvLyBPbiB0aGUgUzYwIGFuZCBCQiBTdG9ybSwgZ2V0Q29udGV4dCBleGlzdHMsIGJ1dCBhbHdheXMgcmV0dXJucyB1bmRlZmluZWRcbiAgICAvLyBzbyB3ZSBhY3R1YWxseSBoYXZlIHRvIGNhbGwgZ2V0Q29udGV4dCgpIHRvIHZlcmlmeVxuICAgIC8vIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvaXNzdWUvOTcvXG5cbiAgICB0ZXN0c1snY2FudmFzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgcmV0dXJuICEhKGVsZW0uZ2V0Q29udGV4dCAmJiBlbGVtLmdldENvbnRleHQoJzJkJykpO1xuICAgIH07XG5cbiAgICB0ZXN0c1snY2FudmFzdGV4dCddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIShNb2Rlcm5penJbJ2NhbnZhcyddICYmIGlzKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJykuZmlsbFRleHQsICdmdW5jdGlvbicpKTtcbiAgICB9O1xuXG4gICAgLy8gd2Viay5pdC83MDExNyBpcyB0cmFja2luZyBhIGxlZ2l0IFdlYkdMIGZlYXR1cmUgZGV0ZWN0IHByb3Bvc2FsXG5cbiAgICAvLyBXZSBkbyBhIHNvZnQgZGV0ZWN0IHdoaWNoIG1heSBmYWxzZSBwb3NpdGl2ZSBpbiBvcmRlciB0byBhdm9pZFxuICAgIC8vIGFuIGV4cGVuc2l2ZSBjb250ZXh0IGNyZWF0aW9uOiBidWd6aWwubGEvNzMyNDQxXG5cbiAgICB0ZXN0c1snd2ViZ2wnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISF3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIFRoZSBNb2Rlcm5penIudG91Y2ggdGVzdCBvbmx5IGluZGljYXRlcyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0c1xuICAgICAqICAgIHRvdWNoIGV2ZW50cywgd2hpY2ggZG9lcyBub3QgbmVjZXNzYXJpbHkgcmVmbGVjdCBhIHRvdWNoc2NyZWVuXG4gICAgICogICAgZGV2aWNlLCBhcyBldmlkZW5jZWQgYnkgdGFibGV0cyBydW5uaW5nIFdpbmRvd3MgNyBvciwgYWxhcyxcbiAgICAgKiAgICB0aGUgUGFsbSBQcmUgLyBXZWJPUyAodG91Y2gpIHBob25lcy5cbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWxseSwgQ2hyb21lIChkZXNrdG9wKSB1c2VkIHRvIGxpZSBhYm91dCBpdHMgc3VwcG9ydCBvbiB0aGlzLFxuICAgICAqICAgIGJ1dCB0aGF0IGhhcyBzaW5jZSBiZWVuIHJlY3RpZmllZDogY3JidWcuY29tLzM2NDE1XG4gICAgICpcbiAgICAgKiBXZSBhbHNvIHRlc3QgZm9yIEZpcmVmb3ggNCBNdWx0aXRvdWNoIFN1cHBvcnQuXG4gICAgICpcbiAgICAgKiBGb3IgbW9yZSBpbmZvLCBzZWU6IG1vZGVybml6ci5naXRodWIuY29tL01vZGVybml6ci90b3VjaC5odG1sXG4gICAgICovXG5cbiAgICB0ZXN0c1sndG91Y2gnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYm9vbDtcblxuICAgICAgICBpZigoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcbiAgICAgICAgICBib29sID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyhbJ0BtZWRpYSAoJyxwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksbW9kLCcpJywneyNtb2Rlcm5penJ7dG9wOjlweDtwb3NpdGlvbjphYnNvbHV0ZX19J10uam9pbignJyksIGZ1bmN0aW9uKCBub2RlICkge1xuICAgICAgICAgICAgYm9vbCA9IG5vZGUub2Zmc2V0VG9wID09PSA5O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcblxuXG4gICAgLy8gZ2VvbG9jYXRpb24gaXMgb2Z0ZW4gY29uc2lkZXJlZCBhIHRyaXZpYWwgZmVhdHVyZSBkZXRlY3QuLi5cbiAgICAvLyBUdXJucyBvdXQsIGl0J3MgcXVpdGUgdHJpY2t5IHRvIGdldCByaWdodDpcbiAgICAvL1xuICAgIC8vIFVzaW5nICEhbmF2aWdhdG9yLmdlb2xvY2F0aW9uIGRvZXMgdHdvIHRoaW5ncyB3ZSBkb24ndCB3YW50LiBJdDpcbiAgICAvLyAgIDEuIExlYWtzIG1lbW9yeSBpbiBJRTk6IGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvNTEzXG4gICAgLy8gICAyLiBEaXNhYmxlcyBwYWdlIGNhY2hpbmcgaW4gV2ViS2l0OiB3ZWJrLml0LzQzOTU2XG4gICAgLy9cbiAgICAvLyBNZWFud2hpbGUsIGluIEZpcmVmb3ggPCA4LCBhbiBhYm91dDpjb25maWcgc2V0dGluZyBjb3VsZCBleHBvc2VcbiAgICAvLyBhIGZhbHNlIHBvc2l0aXZlIHRoYXQgd291bGQgdGhyb3cgYW4gZXhjZXB0aW9uOiBidWd6aWwubGEvNjg4MTU4XG5cbiAgICB0ZXN0c1snZ2VvbG9jYXRpb24nXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ2dlb2xvY2F0aW9uJyBpbiBuYXZpZ2F0b3I7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ3Bvc3RtZXNzYWdlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhIXdpbmRvdy5wb3N0TWVzc2FnZTtcbiAgICB9O1xuXG5cbiAgICAvLyBDaHJvbWUgaW5jb2duaXRvIG1vZGUgdXNlZCB0byB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiB1c2luZyBvcGVuRGF0YWJhc2VcbiAgICAvLyBJdCBkb2Vzbid0IGFueW1vcmUuXG4gICAgdGVzdHNbJ3dlYnNxbGRhdGFiYXNlJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhIXdpbmRvdy5vcGVuRGF0YWJhc2U7XG4gICAgfTtcblxuICAgIC8vIFZlbmRvcnMgaGFkIGluY29uc2lzdGVudCBwcmVmaXhpbmcgd2l0aCB0aGUgZXhwZXJpbWVudGFsIEluZGV4ZWQgREI6XG4gICAgLy8gLSBXZWJraXQncyBpbXBsZW1lbnRhdGlvbiBpcyBhY2Nlc3NpYmxlIHRocm91Z2ggd2Via2l0SW5kZXhlZERCXG4gICAgLy8gLSBGaXJlZm94IHNoaXBwZWQgbW96X2luZGV4ZWREQiBiZWZvcmUgRkY0YjksIGJ1dCBzaW5jZSB0aGVuIGhhcyBiZWVuIG1vekluZGV4ZWREQlxuICAgIC8vIEZvciBzcGVlZCwgd2UgZG9uJ3QgdGVzdCB0aGUgbGVnYWN5IChhbmQgYmV0YS1vbmx5KSBpbmRleGVkREJcbiAgICB0ZXN0c1snaW5kZXhlZERCJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhIXRlc3RQcm9wc0FsbChcImluZGV4ZWREQlwiLCB3aW5kb3cpO1xuICAgIH07XG5cbiAgICAvLyBkb2N1bWVudE1vZGUgbG9naWMgZnJvbSBZVUkgdG8gZmlsdGVyIG91dCBJRTggQ29tcGF0IE1vZGVcbiAgICAvLyAgIHdoaWNoIGZhbHNlIHBvc2l0aXZlcy5cbiAgICB0ZXN0c1snaGFzaGNoYW5nZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaXNFdmVudFN1cHBvcnRlZCgnaGFzaGNoYW5nZScsIHdpbmRvdykgJiYgKGRvY3VtZW50LmRvY3VtZW50TW9kZSA9PT0gdW5kZWZpbmVkIHx8IGRvY3VtZW50LmRvY3VtZW50TW9kZSA+IDcpO1xuICAgIH07XG5cbiAgICAvLyBQZXIgMS42OlxuICAgIC8vIFRoaXMgdXNlZCB0byBiZSBNb2Rlcm5penIuaGlzdG9yeW1hbmFnZW1lbnQgYnV0IHRoZSBsb25nZXJcbiAgICAvLyBuYW1lIGhhcyBiZWVuIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgYSBzaG9ydGVyIGFuZCBwcm9wZXJ0eS1tYXRjaGluZyBvbmUuXG4gICAgLy8gVGhlIG9sZCBBUEkgaXMgc3RpbGwgYXZhaWxhYmxlIGluIDEuNiwgYnV0IGFzIG9mIDIuMCB3aWxsIHRocm93IGEgd2FybmluZyxcbiAgICAvLyBhbmQgaW4gdGhlIGZpcnN0IHJlbGVhc2UgdGhlcmVhZnRlciBkaXNhcHBlYXIgZW50aXJlbHkuXG4gICAgdGVzdHNbJ2hpc3RvcnknXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhKHdpbmRvdy5oaXN0b3J5ICYmIGhpc3RvcnkucHVzaFN0YXRlKTtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ2RyYWdhbmRkcm9wJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZXR1cm4gKCdkcmFnZ2FibGUnIGluIGRpdikgfHwgKCdvbmRyYWdzdGFydCcgaW4gZGl2ICYmICdvbmRyb3AnIGluIGRpdik7XG4gICAgfTtcblxuICAgIC8vIEZGMy42IHdhcyBFT0wnZWQgb24gNC8yNC8xMiwgYnV0IHRoZSBFU1IgdmVyc2lvbiBvZiBGRjEwXG4gICAgLy8gd2lsbCBiZSBzdXBwb3J0ZWQgdW50aWwgRkYxOSAoMi8xMi8xMyksIGF0IHdoaWNoIHRpbWUsIEVTUiBiZWNvbWVzIEZGMTcuXG4gICAgLy8gRkYxMCBzdGlsbCB1c2VzIHByZWZpeGVzLCBzbyBjaGVjayBmb3IgaXQgdW50aWwgdGhlbi5cbiAgICAvLyBmb3IgbW9yZSBFU1IgaW5mbywgc2VlOiBtb3ppbGxhLm9yZy9lbi1VUy9maXJlZm94L29yZ2FuaXphdGlvbnMvZmFxL1xuICAgIHRlc3RzWyd3ZWJzb2NrZXRzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICdXZWJTb2NrZXQnIGluIHdpbmRvdyB8fCAnTW96V2ViU29ja2V0JyBpbiB3aW5kb3c7XG4gICAgfTtcblxuXG4gICAgLy8gY3NzLXRyaWNrcy5jb20vcmdiYS1icm93c2VyLXN1cHBvcnQvXG4gICAgdGVzdHNbJ3JnYmEnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBTZXQgYW4gcmdiYSgpIGNvbG9yIGFuZCBjaGVjayB0aGUgcmV0dXJuZWQgdmFsdWVcblxuICAgICAgICBzZXRDc3MoJ2JhY2tncm91bmQtY29sb3I6cmdiYSgxNTAsMjU1LDE1MCwuNSknKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbnMobVN0eWxlLmJhY2tncm91bmRDb2xvciwgJ3JnYmEnKTtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ2hzbGEnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBTYW1lIGFzIHJnYmEoKSwgaW4gZmFjdCwgYnJvd3NlcnMgcmUtbWFwIGhzbGEoKSB0byByZ2JhKCkgaW50ZXJuYWxseSxcbiAgICAgICAgLy8gICBleGNlcHQgSUU5IHdobyByZXRhaW5zIGl0IGFzIGhzbGFcblxuICAgICAgICBzZXRDc3MoJ2JhY2tncm91bmQtY29sb3I6aHNsYSgxMjAsNDAlLDEwMCUsLjUpJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKG1TdHlsZS5iYWNrZ3JvdW5kQ29sb3IsICdyZ2JhJykgfHwgY29udGFpbnMobVN0eWxlLmJhY2tncm91bmRDb2xvciwgJ2hzbGEnKTtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ211bHRpcGxlYmdzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gU2V0dGluZyBtdWx0aXBsZSBpbWFnZXMgQU5EIGEgY29sb3Igb24gdGhlIGJhY2tncm91bmQgc2hvcnRoYW5kIHByb3BlcnR5XG4gICAgICAgIC8vICBhbmQgdGhlbiBxdWVyeWluZyB0aGUgc3R5bGUuYmFja2dyb3VuZCBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIG51bWJlciBvZlxuICAgICAgICAvLyAgb2NjdXJyZW5jZXMgb2YgXCJ1cmwoXCIgaXMgYSByZWxpYWJsZSBtZXRob2QgZm9yIGRldGVjdGluZyBBQ1RVQUwgc3VwcG9ydCBmb3IgdGhpcyFcblxuICAgICAgICBzZXRDc3MoJ2JhY2tncm91bmQ6dXJsKGh0dHBzOi8vKSx1cmwoaHR0cHM6Ly8pLHJlZCB1cmwoaHR0cHM6Ly8pJyk7XG5cbiAgICAgICAgLy8gSWYgdGhlIFVBIHN1cHBvcnRzIG11bHRpcGxlIGJhY2tncm91bmRzLCB0aGVyZSBzaG91bGQgYmUgdGhyZWUgb2NjdXJyZW5jZXNcbiAgICAgICAgLy8gICBvZiB0aGUgc3RyaW5nIFwidXJsKFwiIGluIHRoZSByZXR1cm4gdmFsdWUgZm9yIGVsZW1TdHlsZS5iYWNrZ3JvdW5kXG5cbiAgICAgICAgcmV0dXJuICgvKHVybFxccypcXCguKj8pezN9LykudGVzdChtU3R5bGUuYmFja2dyb3VuZCk7XG4gICAgfTtcblxuXG5cbiAgICAvLyB0aGlzIHdpbGwgZmFsc2UgcG9zaXRpdmUgaW4gT3BlcmEgTWluaVxuICAgIC8vICAgZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8zOTZcblxuICAgIHRlc3RzWydiYWNrZ3JvdW5kc2l6ZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JhY2tncm91bmRTaXplJyk7XG4gICAgfTtcblxuICAgIHRlc3RzWydib3JkZXJpbWFnZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JvcmRlckltYWdlJyk7XG4gICAgfTtcblxuXG4gICAgLy8gU3VwZXIgY29tcHJlaGVuc2l2ZSB0YWJsZSBhYm91dCBhbGwgdGhlIHVuaXF1ZSBpbXBsZW1lbnRhdGlvbnMgb2ZcbiAgICAvLyBib3JkZXItcmFkaXVzOiBtdWRkbGVkcmFtYmxpbmdzLmNvbS90YWJsZS1vZi1jc3MzLWJvcmRlci1yYWRpdXMtY29tcGxpYW5jZVxuXG4gICAgdGVzdHNbJ2JvcmRlcnJhZGl1cyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JvcmRlclJhZGl1cycpO1xuICAgIH07XG5cbiAgICAvLyBXZWJPUyB1bmZvcnR1bmF0ZWx5IGZhbHNlIHBvc2l0aXZlcyBvbiB0aGlzIHRlc3QuXG4gICAgdGVzdHNbJ2JveHNoYWRvdyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JveFNoYWRvdycpO1xuICAgIH07XG5cbiAgICAvLyBGRjMuMCB3aWxsIGZhbHNlIHBvc2l0aXZlIG9uIHRoaXMgdGVzdFxuICAgIHRlc3RzWyd0ZXh0c2hhZG93J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlLnRleHRTaGFkb3cgPT09ICcnO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydvcGFjaXR5J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgdGhhdCBhY3R1YWxseSBoYXZlIENTUyBPcGFjaXR5IGltcGxlbWVudGVkIGhhdmUgZG9uZSBzb1xuICAgICAgICAvLyAgYWNjb3JkaW5nIHRvIHNwZWMsIHdoaWNoIG1lYW5zIHRoZWlyIHJldHVybiB2YWx1ZXMgYXJlIHdpdGhpbiB0aGVcbiAgICAgICAgLy8gIHJhbmdlIG9mIFswLjAsMS4wXSAtIGluY2x1ZGluZyB0aGUgbGVhZGluZyB6ZXJvLlxuXG4gICAgICAgIHNldENzc0FsbCgnb3BhY2l0eTouNTUnKTtcblxuICAgICAgICAvLyBUaGUgbm9uLWxpdGVyYWwgLiBpbiB0aGlzIHJlZ2V4IGlzIGludGVudGlvbmFsOlxuICAgICAgICAvLyAgIEdlcm1hbiBDaHJvbWUgcmV0dXJucyB0aGlzIHZhbHVlIGFzIDAsNTVcbiAgICAgICAgLy8gZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8jaXNzdWUvNTkvY29tbWVudC81MTY2MzJcbiAgICAgICAgcmV0dXJuICgvXjAuNTUkLykudGVzdChtU3R5bGUub3BhY2l0eSk7XG4gICAgfTtcblxuXG4gICAgLy8gTm90ZSwgQW5kcm9pZCA8IDQgd2lsbCBwYXNzIHRoaXMgdGVzdCwgYnV0IGNhbiBvbmx5IGFuaW1hdGVcbiAgICAvLyAgIGEgc2luZ2xlIHByb3BlcnR5IGF0IGEgdGltZVxuICAgIC8vICAgZ29vLmdsL3YzVjRHcFxuICAgIHRlc3RzWydjc3NhbmltYXRpb25zJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnYW5pbWF0aW9uTmFtZScpO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3Njb2x1bW5zJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbCgnY29sdW1uQ291bnQnKTtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzZ3JhZGllbnRzJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvciBDU1MgR3JhZGllbnRzIHN5bnRheCwgcGxlYXNlIHNlZTpcbiAgICAgICAgICogd2Via2l0Lm9yZy9ibG9nLzE3NS9pbnRyb2R1Y2luZy1jc3MtZ3JhZGllbnRzL1xuICAgICAgICAgKiBkZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vQ1NTLy1tb3otbGluZWFyLWdyYWRpZW50XG4gICAgICAgICAqIGRldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9DU1MvLW1vei1yYWRpYWwtZ3JhZGllbnRcbiAgICAgICAgICogZGV2LnczLm9yZy9jc3N3Zy9jc3MzLWltYWdlcy8jZ3JhZGllbnRzLVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgc3RyMSA9ICdiYWNrZ3JvdW5kLWltYWdlOicsXG4gICAgICAgICAgICBzdHIyID0gJ2dyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxyaWdodCBib3R0b20sZnJvbSgjOWY5KSx0byh3aGl0ZSkpOycsXG4gICAgICAgICAgICBzdHIzID0gJ2xpbmVhci1ncmFkaWVudChsZWZ0IHRvcCwjOWY5LCB3aGl0ZSk7JztcblxuICAgICAgICBzZXRDc3MoXG4gICAgICAgICAgICAgLy8gbGVnYWN5IHdlYmtpdCBzeW50YXggKEZJWE1FOiByZW1vdmUgd2hlbiBzeW50YXggbm90IGluIHVzZSBhbnltb3JlKVxuICAgICAgICAgICAgICAoc3RyMSArICctd2Via2l0LSAnLnNwbGl0KCcgJykuam9pbihzdHIyICsgc3RyMSkgK1xuICAgICAgICAgICAgIC8vIHN0YW5kYXJkIHN5bnRheCAgICAgICAgICAgICAvLyB0cmFpbGluZyAnYmFja2dyb3VuZC1pbWFnZTonXG4gICAgICAgICAgICAgIHByZWZpeGVzLmpvaW4oc3RyMyArIHN0cjEpKS5zbGljZSgwLCAtc3RyMS5sZW5ndGgpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKG1TdHlsZS5iYWNrZ3JvdW5kSW1hZ2UsICdncmFkaWVudCcpO1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3NyZWZsZWN0aW9ucyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ2JveFJlZmxlY3QnKTtcbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snY3NzdHJhbnNmb3JtcyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIXRlc3RQcm9wc0FsbCgndHJhbnNmb3JtJyk7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2Nzc3RyYW5zZm9ybXMzZCddID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHJldCA9ICEhdGVzdFByb3BzQWxsKCdwZXJzcGVjdGl2ZScpO1xuXG4gICAgICAgIC8vIFdlYmtpdCdzIDNEIHRyYW5zZm9ybXMgYXJlIHBhc3NlZCBvZmYgdG8gdGhlIGJyb3dzZXIncyBvd24gZ3JhcGhpY3MgcmVuZGVyZXIuXG4gICAgICAgIC8vICAgSXQgd29ya3MgZmluZSBpbiBTYWZhcmkgb24gTGVvcGFyZCBhbmQgU25vdyBMZW9wYXJkLCBidXQgbm90IGluIENocm9tZSBpblxuICAgICAgICAvLyAgIHNvbWUgY29uZGl0aW9ucy4gQXMgYSByZXN1bHQsIFdlYmtpdCB0eXBpY2FsbHkgcmVjb2duaXplcyB0aGUgc3ludGF4IGJ1dFxuICAgICAgICAvLyAgIHdpbGwgc29tZXRpbWVzIHRocm93IGEgZmFsc2UgcG9zaXRpdmUsIHRodXMgd2UgbXVzdCBkbyBhIG1vcmUgdGhvcm91Z2ggY2hlY2s6XG4gICAgICAgIGlmICggcmV0ICYmICd3ZWJraXRQZXJzcGVjdGl2ZScgaW4gZG9jRWxlbWVudC5zdHlsZSApIHtcblxuICAgICAgICAgIC8vIFdlYmtpdCBhbGxvd3MgdGhpcyBtZWRpYSBxdWVyeSB0byBzdWNjZWVkIG9ubHkgaWYgdGhlIGZlYXR1cmUgaXMgZW5hYmxlZC5cbiAgICAgICAgICAvLyBgQG1lZGlhICh0cmFuc2Zvcm0tM2QpLCgtd2Via2l0LXRyYW5zZm9ybS0zZCl7IC4uLiB9YFxuICAgICAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKCdAbWVkaWEgKHRyYW5zZm9ybS0zZCksKC13ZWJraXQtdHJhbnNmb3JtLTNkKXsjbW9kZXJuaXpye2xlZnQ6OXB4O3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDozcHg7fX0nLCBmdW5jdGlvbiggbm9kZSwgcnVsZSApIHtcbiAgICAgICAgICAgIHJldCA9IG5vZGUub2Zmc2V0TGVmdCA9PT0gOSAmJiBub2RlLm9mZnNldEhlaWdodCA9PT0gMztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cblxuICAgIHRlc3RzWydjc3N0cmFuc2l0aW9ucyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHNBbGwoJ3RyYW5zaXRpb24nKTtcbiAgICB9O1xuXG5cbiAgICAvKj4+Zm9udGZhY2UqL1xuICAgIC8vIEBmb250LWZhY2UgZGV0ZWN0aW9uIHJvdXRpbmUgYnkgRGllZ28gUGVyaW5pXG4gICAgLy8gamF2YXNjcmlwdC5ud2JveC5jb20vQ1NTU3VwcG9ydC9cblxuICAgIC8vIGZhbHNlIHBvc2l0aXZlczpcbiAgICAvLyAgIFdlYk9TIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvMzQyXG4gICAgLy8gICBXUDcgICBnaXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvaXNzdWVzLzUzOFxuICAgIHRlc3RzWydmb250ZmFjZSddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBib29sO1xuXG4gICAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKCdAZm9udC1mYWNlIHtmb250LWZhbWlseTpcImZvbnRcIjtzcmM6dXJsKFwiaHR0cHM6Ly9cIil9JywgZnVuY3Rpb24oIG5vZGUsIHJ1bGUgKSB7XG4gICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Ntb2Rlcm5penInKSxcbiAgICAgICAgICAgICAgc2hlZXQgPSBzdHlsZS5zaGVldCB8fCBzdHlsZS5zdHlsZVNoZWV0LFxuICAgICAgICAgICAgICBjc3NUZXh0ID0gc2hlZXQgPyAoc2hlZXQuY3NzUnVsZXMgJiYgc2hlZXQuY3NzUnVsZXNbMF0gPyBzaGVldC5jc3NSdWxlc1swXS5jc3NUZXh0IDogc2hlZXQuY3NzVGV4dCB8fCAnJykgOiAnJztcblxuICAgICAgICAgIGJvb2wgPSAvc3JjL2kudGVzdChjc3NUZXh0KSAmJiBjc3NUZXh0LmluZGV4T2YocnVsZS5zcGxpdCgnICcpWzBdKSA9PT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcbiAgICAvKj4+Zm9udGZhY2UqL1xuXG4gICAgLy8gQ1NTIGdlbmVyYXRlZCBjb250ZW50IGRldGVjdGlvblxuICAgIHRlc3RzWydnZW5lcmF0ZWRjb250ZW50J10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJvb2w7XG5cbiAgICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoWycjJyxtb2QsJ3tmb250OjAvMCBhfSMnLG1vZCwnOmFmdGVye2NvbnRlbnQ6XCInLHNtaWxlLCdcIjt2aXNpYmlsaXR5OmhpZGRlbjtmb250OjNweC8xIGF9J10uam9pbignJyksIGZ1bmN0aW9uKCBub2RlICkge1xuICAgICAgICAgIGJvb2wgPSBub2RlLm9mZnNldEhlaWdodCA+PSAzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuXG5cblxuICAgIC8vIFRoZXNlIHRlc3RzIGV2YWx1YXRlIHN1cHBvcnQgb2YgdGhlIHZpZGVvL2F1ZGlvIGVsZW1lbnRzLCBhcyB3ZWxsIGFzXG4gICAgLy8gdGVzdGluZyB3aGF0IHR5cGVzIG9mIGNvbnRlbnQgdGhleSBzdXBwb3J0LlxuICAgIC8vXG4gICAgLy8gV2UncmUgdXNpbmcgdGhlIEJvb2xlYW4gY29uc3RydWN0b3IgaGVyZSwgc28gdGhhdCB3ZSBjYW4gZXh0ZW5kIHRoZSB2YWx1ZVxuICAgIC8vIGUuZy4gIE1vZGVybml6ci52aWRlbyAgICAgLy8gdHJ1ZVxuICAgIC8vICAgICAgIE1vZGVybml6ci52aWRlby5vZ2cgLy8gJ3Byb2JhYmx5J1xuICAgIC8vXG4gICAgLy8gQ29kZWMgdmFsdWVzIGZyb20gOiBnaXRodWIuY29tL05pZWxzTGVlbmhlZXIvaHRtbDV0ZXN0L2Jsb2IvOTEwNmE4L2luZGV4Lmh0bWwjTDg0NVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGh4IHRvIE5pZWxzTGVlbmhlZXIgYW5kIHpjb3JwYW5cblxuICAgIC8vIE5vdGU6IGluIHNvbWUgb2xkZXIgYnJvd3NlcnMsIFwibm9cIiB3YXMgYSByZXR1cm4gdmFsdWUgaW5zdGVhZCBvZiBlbXB0eSBzdHJpbmcuXG4gICAgLy8gICBJdCB3YXMgbGl2ZSBpbiBGRjMuNS4wIGFuZCAzLjUuMSwgYnV0IGZpeGVkIGluIDMuNS4yXG4gICAgLy8gICBJdCB3YXMgYWxzbyBsaXZlIGluIFNhZmFyaSA0LjAuMCAtIDQuMC40LCBidXQgZml4ZWQgaW4gNC4wLjVcblxuICAgIHRlc3RzWyd2aWRlbyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICAvLyBJRTkgUnVubmluZyBvbiBXaW5kb3dzIFNlcnZlciBTS1UgY2FuIGNhdXNlIGFuIGV4Y2VwdGlvbiB0byBiZSB0aHJvd24sIGJ1ZyAjMjI0XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIGJvb2wgPSAhIWVsZW0uY2FuUGxheVR5cGUgKSB7XG4gICAgICAgICAgICAgICAgYm9vbCAgICAgID0gbmV3IEJvb2xlYW4oYm9vbCk7XG4gICAgICAgICAgICAgICAgYm9vbC5vZ2cgID0gZWxlbS5jYW5QbGF5VHlwZSgndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIicpICAgICAgLnJlcGxhY2UoL15ubyQvLCcnKTtcblxuICAgICAgICAgICAgICAgIC8vIFdpdGhvdXQgUXVpY2tUaW1lLCB0aGlzIHZhbHVlIHdpbGwgYmUgYHVuZGVmaW5lZGAuIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvNTQ2XG4gICAgICAgICAgICAgICAgYm9vbC5oMjY0ID0gZWxlbS5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRVwiJykgLnJlcGxhY2UoL15ubyQvLCcnKTtcblxuICAgICAgICAgICAgICAgIGJvb2wud2VibSA9IGVsZW0uY2FuUGxheVR5cGUoJ3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaChlKSB7IH1cblxuICAgICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuXG4gICAgdGVzdHNbJ2F1ZGlvJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIGJvb2wgPSAhIWVsZW0uY2FuUGxheVR5cGUgKSB7XG4gICAgICAgICAgICAgICAgYm9vbCAgICAgID0gbmV3IEJvb2xlYW4oYm9vbCk7XG4gICAgICAgICAgICAgICAgYm9vbC5vZ2cgID0gZWxlbS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCcnKTtcbiAgICAgICAgICAgICAgICBib29sLm1wMyAgPSBlbGVtLmNhblBsYXlUeXBlKCdhdWRpby9tcGVnOycpICAgICAgICAgICAgICAgLnJlcGxhY2UoL15ubyQvLCcnKTtcblxuICAgICAgICAgICAgICAgIC8vIE1pbWV0eXBlcyBhY2NlcHRlZDpcbiAgICAgICAgICAgICAgICAvLyAgIGRldmVsb3Blci5tb3ppbGxhLm9yZy9Fbi9NZWRpYV9mb3JtYXRzX3N1cHBvcnRlZF9ieV90aGVfYXVkaW9fYW5kX3ZpZGVvX2VsZW1lbnRzXG4gICAgICAgICAgICAgICAgLy8gICBiaXQubHkvaXBob25lb3Njb2RlY3NcbiAgICAgICAgICAgICAgICBib29sLndhdiAgPSBlbGVtLmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpICAgICAucmVwbGFjZSgvXm5vJC8sJycpO1xuICAgICAgICAgICAgICAgIGJvb2wubTRhICA9ICggZWxlbS5jYW5QbGF5VHlwZSgnYXVkaW8veC1tNGE7JykgICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpKSAgICAgICAgICAgICAucmVwbGFjZSgvXm5vJC8sJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHsgfVxuXG4gICAgICAgIHJldHVybiBib29sO1xuICAgIH07XG5cblxuICAgIC8vIEluIEZGNCwgaWYgZGlzYWJsZWQsIHdpbmRvdy5sb2NhbFN0b3JhZ2Ugc2hvdWxkID09PSBudWxsLlxuXG4gICAgLy8gTm9ybWFsbHksIHdlIGNvdWxkIG5vdCB0ZXN0IHRoYXQgZGlyZWN0bHkgYW5kIG5lZWQgdG8gZG8gYVxuICAgIC8vICAgYCgnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cpICYmIGAgdGVzdCBmaXJzdCBiZWNhdXNlIG90aGVyd2lzZSBGaXJlZm94IHdpbGxcbiAgICAvLyAgIHRocm93IGJ1Z3ppbC5sYS8zNjU3NzIgaWYgY29va2llcyBhcmUgZGlzYWJsZWRcblxuICAgIC8vIEFsc28gaW4gaU9TNSBQcml2YXRlIEJyb3dzaW5nIG1vZGUsIGF0dGVtcHRpbmcgdG8gdXNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtXG4gICAgLy8gd2lsbCB0aHJvdyB0aGUgZXhjZXB0aW9uOlxuICAgIC8vICAgUVVPVEFfRVhDRUVERURfRVJSUk9SIERPTSBFeGNlcHRpb24gMjIuXG4gICAgLy8gUGVjdWxpYXJseSwgZ2V0SXRlbSBhbmQgcmVtb3ZlSXRlbSBjYWxscyBkbyBub3QgdGhyb3cuXG5cbiAgICAvLyBCZWNhdXNlIHdlIGFyZSBmb3JjZWQgdG8gdHJ5L2NhdGNoIHRoaXMsIHdlJ2xsIGdvIGFnZ3Jlc3NpdmUuXG5cbiAgICAvLyBKdXN0IEZXSVc6IElFOCBDb21wYXQgbW9kZSBzdXBwb3J0cyB0aGVzZSBmZWF0dXJlcyBjb21wbGV0ZWx5OlxuICAgIC8vICAgd3d3LnF1aXJrc21vZGUub3JnL2RvbS9odG1sNS5odG1sXG4gICAgLy8gQnV0IElFOCBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyIHdpdGggbG9jYWwgZmlsZXNcblxuICAgIHRlc3RzWydsb2NhbHN0b3JhZ2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obW9kLCBtb2QpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obW9kKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0ZXN0c1snc2Vzc2lvbnN0b3JhZ2UnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShtb2QsIG1vZCk7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKG1vZCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0ZXN0c1snd2Vid29ya2VycyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIXdpbmRvdy5Xb3JrZXI7XG4gICAgfTtcblxuXG4gICAgdGVzdHNbJ2FwcGxpY2F0aW9uY2FjaGUnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISF3aW5kb3cuYXBwbGljYXRpb25DYWNoZTtcbiAgICB9O1xuXG5cbiAgICAvLyBUaGFua3MgdG8gRXJpayBEYWhsc3Ryb21cbiAgICB0ZXN0c1snc3ZnJ10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLnN2ZywgJ3N2ZycpLmNyZWF0ZVNWR1JlY3Q7XG4gICAgfTtcblxuICAgIC8vIHNwZWNpZmljYWxseSBmb3IgU1ZHIGlubGluZSBpbiBIVE1MLCBub3Qgd2l0aGluIFhIVE1MXG4gICAgLy8gdGVzdCBwYWdlOiBwYXVsaXJpc2guY29tL2RlbW8vaW5saW5lLXN2Z1xuICAgIHRlc3RzWydpbmxpbmVzdmcnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9ICc8c3ZnLz4nO1xuICAgICAgcmV0dXJuIChkaXYuZmlyc3RDaGlsZCAmJiBkaXYuZmlyc3RDaGlsZC5uYW1lc3BhY2VVUkkpID09IG5zLnN2ZztcbiAgICB9O1xuXG4gICAgLy8gU1ZHIFNNSUwgYW5pbWF0aW9uXG4gICAgdGVzdHNbJ3NtaWwnXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgL1NWR0FuaW1hdGUvLnRlc3QodG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMuc3ZnLCAnYW5pbWF0ZScpKSk7XG4gICAgfTtcblxuICAgIC8vIFRoaXMgdGVzdCBpcyBvbmx5IGZvciBjbGlwIHBhdGhzIGluIFNWRyBwcm9wZXIsIG5vdCBjbGlwIHBhdGhzIG9uIEhUTUwgY29udGVudFxuICAgIC8vIGRlbW86IHNydWZhY3VsdHkuc3J1LmVkdS9kYXZpZC5kYWlsZXkvc3ZnL25ld3N0dWZmL2NsaXBQYXRoNC5zdmdcblxuICAgIC8vIEhvd2V2ZXIgcmVhZCB0aGUgY29tbWVudHMgdG8gZGlnIGludG8gYXBwbHlpbmcgU1ZHIGNsaXBwYXRocyB0byBIVE1MIGNvbnRlbnQgaGVyZTpcbiAgICAvLyAgIGdpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9pc3N1ZXMvMjEzI2lzc3VlY29tbWVudC0xMTQ5NDkxXG4gICAgdGVzdHNbJ3N2Z2NsaXBwYXRocyddID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAvU1ZHQ2xpcFBhdGgvLnRlc3QodG9TdHJpbmcuY2FsbChkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMuc3ZnLCAnY2xpcFBhdGgnKSkpO1xuICAgIH07XG5cbiAgICAvKj4+d2ViZm9ybXMqL1xuICAgIC8vIGlucHV0IGZlYXR1cmVzIGFuZCBpbnB1dCB0eXBlcyBnbyBkaXJlY3RseSBvbnRvIHRoZSByZXQgb2JqZWN0LCBieXBhc3NpbmcgdGhlIHRlc3RzIGxvb3AuXG4gICAgLy8gSG9sZCB0aGlzIGd1eSB0byBleGVjdXRlIGluIGEgbW9tZW50LlxuICAgIGZ1bmN0aW9uIHdlYmZvcm1zKCkge1xuICAgICAgICAvKj4+aW5wdXQqL1xuICAgICAgICAvLyBSdW4gdGhyb3VnaCBIVE1MNSdzIG5ldyBpbnB1dCBhdHRyaWJ1dGVzIHRvIHNlZSBpZiB0aGUgVUEgdW5kZXJzdGFuZHMgYW55LlxuICAgICAgICAvLyBXZSdyZSB1c2luZyBmIHdoaWNoIGlzIHRoZSA8aW5wdXQ+IGVsZW1lbnQgY3JlYXRlZCBlYXJseSBvblxuICAgICAgICAvLyBNaWtlIFRheWxyIGhhcyBjcmVhdGVkIGEgY29tcHJlaGVuc2l2ZSByZXNvdXJjZSBmb3IgdGVzdGluZyB0aGVzZSBhdHRyaWJ1dGVzXG4gICAgICAgIC8vICAgd2hlbiBhcHBsaWVkIHRvIGFsbCBpbnB1dCB0eXBlczpcbiAgICAgICAgLy8gICBtaWtldGF5bHIuY29tL2NvZGUvaW5wdXQtdHlwZS1hdHRyLmh0bWxcbiAgICAgICAgLy8gc3BlYzogd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtaW5wdXQtZWxlbWVudC5odG1sI2lucHV0LXR5cGUtYXR0ci1zdW1tYXJ5XG5cbiAgICAgICAgLy8gT25seSBpbnB1dCBwbGFjZWhvbGRlciBpcyB0ZXN0ZWQgd2hpbGUgdGV4dGFyZWEncyBwbGFjZWhvbGRlciBpcyBub3QuXG4gICAgICAgIC8vIEN1cnJlbnRseSBTYWZhcmkgNCBhbmQgT3BlcmEgMTEgaGF2ZSBzdXBwb3J0IG9ubHkgZm9yIHRoZSBpbnB1dCBwbGFjZWhvbGRlclxuICAgICAgICAvLyBCb3RoIHRlc3RzIGFyZSBhdmFpbGFibGUgaW4gZmVhdHVyZS1kZXRlY3RzL2Zvcm1zLXBsYWNlaG9sZGVyLmpzXG4gICAgICAgIE1vZGVybml6clsnaW5wdXQnXSA9IChmdW5jdGlvbiggcHJvcHMgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaSA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgICAgICAgICAgICAgIGF0dHJzWyBwcm9wc1tpXSBdID0gISEocHJvcHNbaV0gaW4gaW5wdXRFbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRycy5saXN0KXtcbiAgICAgICAgICAgICAgLy8gc2FmYXJpIGZhbHNlIHBvc2l0aXZlJ3Mgb24gZGF0YWxpc3Q6IHdlYmsuaXQvNzQyNTJcbiAgICAgICAgICAgICAgLy8gc2VlIGFsc28gZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2lzc3Vlcy8xNDZcbiAgICAgICAgICAgICAgYXR0cnMubGlzdCA9ICEhKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JykgJiYgd2luZG93LkhUTUxEYXRhTGlzdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgICAgICB9KSgnYXV0b2NvbXBsZXRlIGF1dG9mb2N1cyBsaXN0IHBsYWNlaG9sZGVyIG1heCBtaW4gbXVsdGlwbGUgcGF0dGVybiByZXF1aXJlZCBzdGVwJy5zcGxpdCgnICcpKTtcbiAgICAgICAgLyo+PmlucHV0Ki9cblxuICAgICAgICAvKj4+aW5wdXR0eXBlcyovXG4gICAgICAgIC8vIFJ1biB0aHJvdWdoIEhUTUw1J3MgbmV3IGlucHV0IHR5cGVzIHRvIHNlZSBpZiB0aGUgVUEgdW5kZXJzdGFuZHMgYW55LlxuICAgICAgICAvLyAgIFRoaXMgaXMgcHV0IGJlaGluZCB0aGUgdGVzdHMgcnVubG9vcCBiZWNhdXNlIGl0IGRvZXNuJ3QgcmV0dXJuIGFcbiAgICAgICAgLy8gICB0cnVlL2ZhbHNlIGxpa2UgYWxsIHRoZSBvdGhlciB0ZXN0czsgaW5zdGVhZCwgaXQgcmV0dXJucyBhbiBvYmplY3RcbiAgICAgICAgLy8gICBjb250YWluaW5nIGVhY2ggaW5wdXQgdHlwZSB3aXRoIGl0cyBjb3JyZXNwb25kaW5nIHRydWUvZmFsc2UgdmFsdWVcblxuICAgICAgICAvLyBCaWcgdGhhbmtzIHRvIEBtaWtldGF5bHIgZm9yIHRoZSBodG1sNSBmb3JtcyBleHBlcnRpc2UuIG1pa2V0YXlsci5jb20vXG4gICAgICAgIE1vZGVybml6clsnaW5wdXR0eXBlcyddID0gKGZ1bmN0aW9uKHByb3BzKSB7XG5cbiAgICAgICAgICAgIGZvciAoIHZhciBpID0gMCwgYm9vbCwgaW5wdXRFbGVtVHlwZSwgZGVmYXVsdFZpZXcsIGxlbiA9IHByb3BzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuXG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsIGlucHV0RWxlbVR5cGUgPSBwcm9wc1tpXSk7XG4gICAgICAgICAgICAgICAgYm9vbCA9IGlucHV0RWxlbS50eXBlICE9PSAndGV4dCc7XG5cbiAgICAgICAgICAgICAgICAvLyBXZSBmaXJzdCBjaGVjayB0byBzZWUgaWYgdGhlIHR5cGUgd2UgZ2l2ZSBpdCBzdGlja3MuLlxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB0eXBlIGRvZXMsIHdlIGZlZWQgaXQgYSB0ZXh0dWFsIHZhbHVlLCB3aGljaCBzaG91bGRuJ3QgYmUgdmFsaWQuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGRvZXNuJ3Qgc3RpY2ssIHdlIGtub3cgdGhlcmUncyBpbnB1dCBzYW5pdGl6YXRpb24gd2hpY2ggaW5mZXJzIGEgY3VzdG9tIFVJXG4gICAgICAgICAgICAgICAgaWYgKCBib29sICkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbS52YWx1ZSAgICAgICAgID0gc21pbGU7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0RWxlbS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO3Zpc2liaWxpdHk6aGlkZGVuOyc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAvXnJhbmdlJC8udGVzdChpbnB1dEVsZW1UeXBlKSAmJiBpbnB1dEVsZW0uc3R5bGUuV2Via2l0QXBwZWFyYW5jZSAhPT0gdW5kZWZpbmVkICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgZG9jRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgMi00IGFsbG93cyB0aGUgc21pbGV5IGFzIGEgdmFsdWUsIGRlc3BpdGUgbWFraW5nIGEgc2xpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgYm9vbCA9ICBkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGlucHV0RWxlbSwgbnVsbCkuV2Via2l0QXBwZWFyYW5jZSAhPT0gJ3RleHRmaWVsZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vYmlsZSBhbmRyb2lkIHdlYiBicm93c2VyIGhhcyBmYWxzZSBwb3NpdGl2ZSwgc28gbXVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIGhlaWdodCB0byBzZWUgaWYgdGhlIHdpZGdldCBpcyBhY3R1YWxseSB0aGVyZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dEVsZW0ub2Zmc2V0SGVpZ2h0ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgIGRvY0VsZW1lbnQucmVtb3ZlQ2hpbGQoaW5wdXRFbGVtKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAvXihzZWFyY2h8dGVsKSQvLnRlc3QoaW5wdXRFbGVtVHlwZSkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjIGRvZXNuJ3QgZGVmaW5lIGFueSBzcGVjaWFsIHBhcnNpbmcgb3IgZGV0ZWN0YWJsZSBVSVxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgYmVoYXZpb3JzIHNvIHdlIHBhc3MgdGhlc2UgdGhyb3VnaCBhcyB0cnVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbnRlcmVzdGluZ2x5LCBvcGVyYSBmYWlscyB0aGUgZWFybGllciB0ZXN0LCBzbyBpdCBkb2Vzbid0XG4gICAgICAgICAgICAgICAgICAgICAgLy8gIGV2ZW4gbWFrZSBpdCBoZXJlLlxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIC9eKHVybHxlbWFpbCkkLy50ZXN0KGlucHV0RWxlbVR5cGUpICkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFJlYWwgdXJsIGFuZCBlbWFpbCBzdXBwb3J0IGNvbWVzIHdpdGggcHJlYmFrZWQgdmFsaWRhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICBib29sID0gaW5wdXRFbGVtLmNoZWNrVmFsaWRpdHkgJiYgaW5wdXRFbGVtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXBncmFkZWQgaW5wdXQgY29tcG9udGVudCByZWplY3RzIHRoZSA6KSB0ZXh0LCB3ZSBnb3QgYSB3aW5uZXJcbiAgICAgICAgICAgICAgICAgICAgICBib29sID0gaW5wdXRFbGVtLnZhbHVlICE9IHNtaWxlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5wdXRzWyBwcm9wc1tpXSBdID0gISFib29sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlucHV0cztcbiAgICAgICAgfSkoJ3NlYXJjaCB0ZWwgdXJsIGVtYWlsIGRhdGV0aW1lIGRhdGUgbW9udGggd2VlayB0aW1lIGRhdGV0aW1lLWxvY2FsIG51bWJlciByYW5nZSBjb2xvcicuc3BsaXQoJyAnKSk7XG4gICAgICAgIC8qPj5pbnB1dHR5cGVzKi9cbiAgICB9XG4gICAgLyo+PndlYmZvcm1zKi9cblxuXG4gICAgLy8gRW5kIG9mIHRlc3QgZGVmaW5pdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuICAgIC8vIFJ1biB0aHJvdWdoIGFsbCB0ZXN0cyBhbmQgZGV0ZWN0IHRoZWlyIHN1cHBvcnQgaW4gdGhlIGN1cnJlbnQgVUEuXG4gICAgLy8gdG9kbzogaHlwb3RoZXRpY2FsbHkgd2UgY291bGQgYmUgZG9pbmcgYW4gYXJyYXkgb2YgdGVzdHMgYW5kIHVzZSBhIGJhc2ljIGxvb3AgaGVyZS5cbiAgICBmb3IgKCB2YXIgZmVhdHVyZSBpbiB0ZXN0cyApIHtcbiAgICAgICAgaWYgKCBoYXNPd25Qcm9wKHRlc3RzLCBmZWF0dXJlKSApIHtcbiAgICAgICAgICAgIC8vIHJ1biB0aGUgdGVzdCwgdGhyb3cgdGhlIHJldHVybiB2YWx1ZSBpbnRvIHRoZSBNb2Rlcm5penIsXG4gICAgICAgICAgICAvLyAgIHRoZW4gYmFzZWQgb24gdGhhdCBib29sZWFuLCBkZWZpbmUgYW4gYXBwcm9wcmlhdGUgY2xhc3NOYW1lXG4gICAgICAgICAgICAvLyAgIGFuZCBwdXNoIGl0IGludG8gYW4gYXJyYXkgb2YgY2xhc3NlcyB3ZSdsbCBqb2luIGxhdGVyLlxuICAgICAgICAgICAgZmVhdHVyZU5hbWUgID0gZmVhdHVyZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgTW9kZXJuaXpyW2ZlYXR1cmVOYW1lXSA9IHRlc3RzW2ZlYXR1cmVdKCk7XG5cbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgoTW9kZXJuaXpyW2ZlYXR1cmVOYW1lXSA/ICcnIDogJ25vLScpICsgZmVhdHVyZU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyo+PndlYmZvcm1zKi9cbiAgICAvLyBpbnB1dCB0ZXN0cyBuZWVkIHRvIHJ1bi5cbiAgICBNb2Rlcm5penIuaW5wdXQgfHwgd2ViZm9ybXMoKTtcbiAgICAvKj4+d2ViZm9ybXMqL1xuXG5cbiAgICAvKipcbiAgICAgKiBhZGRUZXN0IGFsbG93cyB0aGUgdXNlciB0byBkZWZpbmUgdGhlaXIgb3duIGZlYXR1cmUgdGVzdHNcbiAgICAgKiB0aGUgcmVzdWx0IHdpbGwgYmUgYWRkZWQgb250byB0aGUgTW9kZXJuaXpyIG9iamVjdCxcbiAgICAgKiBhcyB3ZWxsIGFzIGFuIGFwcHJvcHJpYXRlIGNsYXNzTmFtZSBzZXQgb24gdGhlIGh0bWwgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIGZlYXR1cmUgLSBTdHJpbmcgbmFtaW5nIHRoZSBmZWF0dXJlXG4gICAgICogQHBhcmFtIHRlc3QgLSBGdW5jdGlvbiByZXR1cm5pbmcgdHJ1ZSBpZiBmZWF0dXJlIGlzIHN1cHBvcnRlZCwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgIE1vZGVybml6ci5hZGRUZXN0ID0gZnVuY3Rpb24gKCBmZWF0dXJlLCB0ZXN0ICkge1xuICAgICAgIGlmICggdHlwZW9mIGZlYXR1cmUgPT0gJ29iamVjdCcgKSB7XG4gICAgICAgICBmb3IgKCB2YXIga2V5IGluIGZlYXR1cmUgKSB7XG4gICAgICAgICAgIGlmICggaGFzT3duUHJvcCggZmVhdHVyZSwga2V5ICkgKSB7XG4gICAgICAgICAgICAgTW9kZXJuaXpyLmFkZFRlc3QoIGtleSwgZmVhdHVyZVsga2V5IF0gKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgIGZlYXR1cmUgPSBmZWF0dXJlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgIGlmICggTW9kZXJuaXpyW2ZlYXR1cmVdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgIC8vIHdlJ3JlIGdvaW5nIHRvIHF1aXQgaWYgeW91J3JlIHRyeWluZyB0byBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgdGVzdFxuICAgICAgICAgICAvLyBpZiB3ZSB3ZXJlIHRvIGFsbG93IGl0LCB3ZSdkIGRvIHRoaXM6XG4gICAgICAgICAgIC8vICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIlxcXFxiKG5vLSk/XCIgKyBmZWF0dXJlICsgXCJcXFxcYlwiKTtcbiAgICAgICAgICAgLy8gICBkb2NFbGVtZW50LmNsYXNzTmFtZSA9IGRvY0VsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoIHJlLCAnJyApO1xuICAgICAgICAgICAvLyBidXQsIG5vIHJseSwgc3R1ZmYgJ2VtLlxuICAgICAgICAgICByZXR1cm4gTW9kZXJuaXpyO1xuICAgICAgICAgfVxuXG4gICAgICAgICB0ZXN0ID0gdHlwZW9mIHRlc3QgPT0gJ2Z1bmN0aW9uJyA/IHRlc3QoKSA6IHRlc3Q7XG5cbiAgICAgICAgIGlmICh0eXBlb2YgZW5hYmxlQ2xhc3NlcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbmFibGVDbGFzc2VzKSB7XG4gICAgICAgICAgIGRvY0VsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArICh0ZXN0ID8gJycgOiAnbm8tJykgKyBmZWF0dXJlO1xuICAgICAgICAgfVxuICAgICAgICAgTW9kZXJuaXpyW2ZlYXR1cmVdID0gdGVzdDtcblxuICAgICAgIH1cblxuICAgICAgIHJldHVybiBNb2Rlcm5penI7IC8vIGFsbG93IGNoYWluaW5nLlxuICAgICB9O1xuXG5cbiAgICAvLyBSZXNldCBtb2RFbGVtLmNzc1RleHQgdG8gbm90aGluZyB0byByZWR1Y2UgbWVtb3J5IGZvb3RwcmludC5cbiAgICBzZXRDc3MoJycpO1xuICAgIG1vZEVsZW0gPSBpbnB1dEVsZW0gPSBudWxsO1xuXG4gICAgLyo+PnNoaXYqL1xuICAgIC8qKlxuICAgICAqIEBwcmVzZXJ2ZSBIVE1MNSBTaGl2IHByZXYzLjcuMSB8IEBhZmFya2FzIEBqZGFsdG9uIEBqb25fbmVhbCBAcmVtIHwgTUlUL0dQTDIgTGljZW5zZWRcbiAgICAgKi9cbiAgICA7KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgICAgICAgLypqc2hpbnQgZXZpbDp0cnVlICovXG4gICAgICAgIC8qKiB2ZXJzaW9uICovXG4gICAgICAgIHZhciB2ZXJzaW9uID0gJzMuNy4wJztcblxuICAgICAgICAvKiogUHJlc2V0IG9wdGlvbnMgKi9cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB3aW5kb3cuaHRtbDUgfHwge307XG5cbiAgICAgICAgLyoqIFVzZWQgdG8gc2tpcCBwcm9ibGVtIGVsZW1lbnRzICovXG4gICAgICAgIHZhciByZVNraXAgPSAvXjx8Xig/OmJ1dHRvbnxtYXB8c2VsZWN0fHRleHRhcmVhfG9iamVjdHxpZnJhbWV8b3B0aW9ufG9wdGdyb3VwKSQvaTtcblxuICAgICAgICAvKiogTm90IGFsbCBlbGVtZW50cyBjYW4gYmUgY2xvbmVkIGluIElFICoqL1xuICAgICAgICB2YXIgc2F2ZUNsb25lcyA9IC9eKD86YXxifGNvZGV8ZGl2fGZpZWxkc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGl8bGFiZWx8bGl8b2x8cHxxfHNwYW58c3Ryb25nfHN0eWxlfHRhYmxlfHRib2R5fHRkfHRofHRyfHVsKSQvaTtcblxuICAgICAgICAvKiogRGV0ZWN0IHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgZGVmYXVsdCBodG1sNSBzdHlsZXMgKi9cbiAgICAgICAgdmFyIHN1cHBvcnRzSHRtbDVTdHlsZXM7XG5cbiAgICAgICAgLyoqIE5hbWUgb2YgdGhlIGV4cGFuZG8sIHRvIHdvcmsgd2l0aCBtdWx0aXBsZSBkb2N1bWVudHMgb3IgdG8gcmUtc2hpdiBvbmUgZG9jdW1lbnQgKi9cbiAgICAgICAgdmFyIGV4cGFuZG8gPSAnX2h0bWw1c2hpdic7XG5cbiAgICAgICAgLyoqIFRoZSBpZCBmb3IgdGhlIHRoZSBkb2N1bWVudHMgZXhwYW5kbyAqL1xuICAgICAgICB2YXIgZXhwYW5JRCA9IDA7XG5cbiAgICAgICAgLyoqIENhY2hlZCBkYXRhIGZvciBlYWNoIGRvY3VtZW50ICovXG4gICAgICAgIHZhciBleHBhbmRvRGF0YSA9IHt9O1xuXG4gICAgICAgIC8qKiBEZXRlY3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB1bmtub3duIGVsZW1lbnRzICovXG4gICAgICAgIHZhciBzdXBwb3J0c1Vua25vd25FbGVtZW50cztcblxuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgYS5pbm5lckhUTUwgPSAnPHh5ej48L3h5ej4nO1xuICAgICAgICAgICAgLy9pZiB0aGUgaGlkZGVuIHByb3BlcnR5IGlzIGltcGxlbWVudGVkIHdlIGNhbiBhc3N1bWUsIHRoYXQgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYmFzaWMgSFRNTDUgU3R5bGVzXG4gICAgICAgICAgICBzdXBwb3J0c0h0bWw1U3R5bGVzID0gKCdoaWRkZW4nIGluIGEpO1xuXG4gICAgICAgICAgICBzdXBwb3J0c1Vua25vd25FbGVtZW50cyA9IGEuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSB8fCAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vIGFzc2lnbiBhIGZhbHNlIHBvc2l0aXZlIGlmIHVuYWJsZSB0byBzaGl2XG4gICAgICAgICAgICAgIChkb2N1bWVudC5jcmVhdGVFbGVtZW50KSgnYScpO1xuICAgICAgICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgZnJhZy5jbG9uZU5vZGUgPT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZnJhZy5jcmVhdGVEb2N1bWVudEZyYWdtZW50ID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIGZyYWcuY3JlYXRlRWxlbWVudCA9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIC8vIGFzc2lnbiBhIGZhbHNlIHBvc2l0aXZlIGlmIGRldGVjdGlvbiBmYWlscyA9PiB1bmFibGUgdG8gc2hpdlxuICAgICAgICAgICAgc3VwcG9ydHNIdG1sNVN0eWxlcyA9IHRydWU7XG4gICAgICAgICAgICBzdXBwb3J0c1Vua25vd25FbGVtZW50cyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0oKSk7XG5cbiAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSBzdHlsZSBzaGVldCB3aXRoIHRoZSBnaXZlbiBDU1MgdGV4dCBhbmQgYWRkcyBpdCB0byB0aGUgZG9jdW1lbnQuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50LlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gY3NzVGV4dCBUaGUgQ1NTIHRleHQuXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHlsZVNoZWV0fSBUaGUgc3R5bGUgZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGFkZFN0eWxlU2hlZXQob3duZXJEb2N1bWVudCwgY3NzVGV4dCkge1xuICAgICAgICAgIHZhciBwID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgICAgICAgcGFyZW50ID0gb3duZXJEb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgICAgcC5pbm5lckhUTUwgPSAneDxzdHlsZT4nICsgY3NzVGV4dCArICc8L3N0eWxlPic7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudC5pbnNlcnRCZWZvcmUocC5sYXN0Q2hpbGQsIHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBgaHRtbDUuZWxlbWVudHNgIGFzIGFuIGFycmF5LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IEFuIGFycmF5IG9mIHNoaXZlZCBlbGVtZW50IG5vZGUgbmFtZXMuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRFbGVtZW50cygpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudHMgPSBodG1sNS5lbGVtZW50cztcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGVsZW1lbnRzID09ICdzdHJpbmcnID8gZWxlbWVudHMuc3BsaXQoJyAnKSA6IGVsZW1lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRhdGEgYXNzb2NpYXRlZCB0byB0aGUgZ2l2ZW4gZG9jdW1lbnRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudH0gb3duZXJEb2N1bWVudCBUaGUgZG9jdW1lbnQuXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBvZiBkYXRhLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0RXhwYW5kb0RhdGEob3duZXJEb2N1bWVudCkge1xuICAgICAgICAgIHZhciBkYXRhID0gZXhwYW5kb0RhdGFbb3duZXJEb2N1bWVudFtleHBhbmRvXV07XG4gICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICBleHBhbklEKys7XG4gICAgICAgICAgICBvd25lckRvY3VtZW50W2V4cGFuZG9dID0gZXhwYW5JRDtcbiAgICAgICAgICAgIGV4cGFuZG9EYXRhW2V4cGFuSURdID0gZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJucyBhIHNoaXZlZCBlbGVtZW50IGZvciB0aGUgZ2l2ZW4gbm9kZU5hbWUgYW5kIGRvY3VtZW50XG4gICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbm9kZU5hbWUgbmFtZSBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0ge0RvY3VtZW50fSBvd25lckRvY3VtZW50IFRoZSBjb250ZXh0IGRvY3VtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc2hpdmVkIGVsZW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KG5vZGVOYW1lLCBvd25lckRvY3VtZW50LCBkYXRhKXtcbiAgICAgICAgICBpZiAoIW93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIG93bmVyRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoc3VwcG9ydHNVbmtub3duRWxlbWVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgZGF0YSA9IGdldEV4cGFuZG9EYXRhKG93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbm9kZTtcblxuICAgICAgICAgIGlmIChkYXRhLmNhY2hlW25vZGVOYW1lXSkge1xuICAgICAgICAgICAgbm9kZSA9IGRhdGEuY2FjaGVbbm9kZU5hbWVdLmNsb25lTm9kZSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2F2ZUNsb25lcy50ZXN0KG5vZGVOYW1lKSkge1xuICAgICAgICAgICAgbm9kZSA9IChkYXRhLmNhY2hlW25vZGVOYW1lXSA9IGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSkpLmNsb25lTm9kZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gZGF0YS5jcmVhdGVFbGVtKG5vZGVOYW1lKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdm9pZCBhZGRpbmcgc29tZSBlbGVtZW50cyB0byBmcmFnbWVudHMgaW4gSUUgPCA5IGJlY2F1c2VcbiAgICAgICAgICAvLyAqIEF0dHJpYnV0ZXMgbGlrZSBgbmFtZWAgb3IgYHR5cGVgIGNhbm5vdCBiZSBzZXQvY2hhbmdlZCBvbmNlIGFuIGVsZW1lbnRcbiAgICAgICAgICAvLyAgIGlzIGluc2VydGVkIGludG8gYSBkb2N1bWVudC9mcmFnbWVudFxuICAgICAgICAgIC8vICogTGluayBlbGVtZW50cyB3aXRoIGBzcmNgIGF0dHJpYnV0ZXMgdGhhdCBhcmUgaW5hY2Nlc3NpYmxlLCBhcyB3aXRoXG4gICAgICAgICAgLy8gICBhIDQwMyByZXNwb25zZSwgd2lsbCBjYXVzZSB0aGUgdGFiL3dpbmRvdyB0byBjcmFzaFxuICAgICAgICAgIC8vICogU2NyaXB0IGVsZW1lbnRzIGFwcGVuZGVkIHRvIGZyYWdtZW50cyB3aWxsIGV4ZWN1dGUgd2hlbiB0aGVpciBgc3JjYFxuICAgICAgICAgIC8vICAgb3IgYHRleHRgIHByb3BlcnR5IGlzIHNldFxuICAgICAgICAgIHJldHVybiBub2RlLmNhbkhhdmVDaGlsZHJlbiAmJiAhcmVTa2lwLnRlc3Qobm9kZU5hbWUpICYmICFub2RlLnRhZ1VybiA/IGRhdGEuZnJhZy5hcHBlbmRDaGlsZChub2RlKSA6IG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmV0dXJucyBhIHNoaXZlZCBEb2N1bWVudEZyYWdtZW50IGZvciB0aGUgZ2l2ZW4gZG9jdW1lbnRcbiAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGNvbnRleHQgZG9jdW1lbnQuXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBzaGl2ZWQgRG9jdW1lbnRGcmFnbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQob3duZXJEb2N1bWVudCwgZGF0YSl7XG4gICAgICAgICAgaWYgKCFvd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICBvd25lckRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBvd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YSA9IGRhdGEgfHwgZ2V0RXhwYW5kb0RhdGEob3duZXJEb2N1bWVudCk7XG4gICAgICAgICAgdmFyIGNsb25lID0gZGF0YS5mcmFnLmNsb25lTm9kZSgpLFxuICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgIGVsZW1zID0gZ2V0RWxlbWVudHMoKSxcbiAgICAgICAgICBsID0gZWxlbXMubGVuZ3RoO1xuICAgICAgICAgIGZvcig7aTxsO2krKyl7XG4gICAgICAgICAgICBjbG9uZS5jcmVhdGVFbGVtZW50KGVsZW1zW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNoaXZzIHRoZSBgY3JlYXRlRWxlbWVudGAgYW5kIGBjcmVhdGVEb2N1bWVudEZyYWdtZW50YCBtZXRob2RzIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHBhcmFtIHtEb2N1bWVudHxEb2N1bWVudEZyYWdtZW50fSBvd25lckRvY3VtZW50IFRoZSBkb2N1bWVudC5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2hpdk1ldGhvZHMob3duZXJEb2N1bWVudCwgZGF0YSkge1xuICAgICAgICAgIGlmICghZGF0YS5jYWNoZSkge1xuICAgICAgICAgICAgZGF0YS5jYWNoZSA9IHt9O1xuICAgICAgICAgICAgZGF0YS5jcmVhdGVFbGVtID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50O1xuICAgICAgICAgICAgZGF0YS5jcmVhdGVGcmFnID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50O1xuICAgICAgICAgICAgZGF0YS5mcmFnID0gZGF0YS5jcmVhdGVGcmFnKCk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihub2RlTmFtZSkge1xuICAgICAgICAgICAgLy9hYm9ydCBzaGl2XG4gICAgICAgICAgICBpZiAoIWh0bWw1LnNoaXZNZXRob2RzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhLmNyZWF0ZUVsZW0obm9kZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQobm9kZU5hbWUsIG93bmVyRG9jdW1lbnQsIGRhdGEpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBvd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQgPSBGdW5jdGlvbignaCxmJywgJ3JldHVybiBmdW5jdGlvbigpeycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YXIgbj1mLmNsb25lTm9kZSgpLGM9bi5jcmVhdGVFbGVtZW50OycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdoLnNoaXZNZXRob2RzJiYoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5yb2xsIHRoZSBgY3JlYXRlRWxlbWVudGAgY2FsbHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRFbGVtZW50cygpLmpvaW4oKS5yZXBsYWNlKC9bXFx3XFwtXSsvZywgZnVuY3Rpb24obm9kZU5hbWUpIHtcbiAgICAgICAgICAgIGRhdGEuY3JlYXRlRWxlbShub2RlTmFtZSk7XG4gICAgICAgICAgICBkYXRhLmZyYWcuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gJ2MoXCInICsgbm9kZU5hbWUgKyAnXCIpJztcbiAgICAgICAgICB9KSArXG4gICAgICAgICAgICAnKTtyZXR1cm4gbn0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKGh0bWw1LCBkYXRhLmZyYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNoaXZzIHRoZSBnaXZlbiBkb2N1bWVudC5cbiAgICAgICAgICogQG1lbWJlck9mIGh0bWw1XG4gICAgICAgICAqIEBwYXJhbSB7RG9jdW1lbnR9IG93bmVyRG9jdW1lbnQgVGhlIGRvY3VtZW50IHRvIHNoaXYuXG4gICAgICAgICAqIEByZXR1cm5zIHtEb2N1bWVudH0gVGhlIHNoaXZlZCBkb2N1bWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHNoaXZEb2N1bWVudChvd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgaWYgKCFvd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgICBvd25lckRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkYXRhID0gZ2V0RXhwYW5kb0RhdGEob3duZXJEb2N1bWVudCk7XG5cbiAgICAgICAgICBpZiAoaHRtbDUuc2hpdkNTUyAmJiAhc3VwcG9ydHNIdG1sNVN0eWxlcyAmJiAhZGF0YS5oYXNDU1MpIHtcbiAgICAgICAgICAgIGRhdGEuaGFzQ1NTID0gISFhZGRTdHlsZVNoZWV0KG93bmVyRG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JyZWN0cyBibG9jayBkaXNwbGF5IG5vdCBkZWZpbmVkIGluIElFNi83LzgvOVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FydGljbGUsYXNpZGUsZGlhbG9nLGZpZ2NhcHRpb24sZmlndXJlLGZvb3RlcixoZWFkZXIsaGdyb3VwLG1haW4sbmF2LHNlY3Rpb257ZGlzcGxheTpibG9ja30nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkcyBzdHlsaW5nIG5vdCBwcmVzZW50IGluIElFNi83LzgvOVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFya3tiYWNrZ3JvdW5kOiNGRjA7Y29sb3I6IzAwMH0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlkZXMgbm9uLXJlbmRlcmVkIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZW1wbGF0ZXtkaXNwbGF5Om5vbmV9J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXN1cHBvcnRzVW5rbm93bkVsZW1lbnRzKSB7XG4gICAgICAgICAgICBzaGl2TWV0aG9kcyhvd25lckRvY3VtZW50LCBkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG93bmVyRG9jdW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGBodG1sNWAgb2JqZWN0IGlzIGV4cG9zZWQgc28gdGhhdCBtb3JlIGVsZW1lbnRzIGNhbiBiZSBzaGl2ZWQgYW5kXG4gICAgICAgICAqIGV4aXN0aW5nIHNoaXZpbmcgY2FuIGJlIGRldGVjdGVkIG9uIGlmcmFtZXMuXG4gICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAvLyBvcHRpb25zIGNhbiBiZSBjaGFuZ2VkIGJlZm9yZSB0aGUgc2NyaXB0IGlzIGluY2x1ZGVkXG4gICAgICAgICAqIGh0bWw1ID0geyAnZWxlbWVudHMnOiAnbWFyayBzZWN0aW9uJywgJ3NoaXZDU1MnOiBmYWxzZSwgJ3NoaXZNZXRob2RzJzogZmFsc2UgfTtcbiAgICAgICAgICovXG4gICAgICAgIHZhciBodG1sNSA9IHtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEFuIGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Ygbm9kZSBuYW1lcyBvZiB0aGUgZWxlbWVudHMgdG8gc2hpdi5cbiAgICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICAgKiBAdHlwZSBBcnJheXxTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAnZWxlbWVudHMnOiBvcHRpb25zLmVsZW1lbnRzIHx8ICdhYmJyIGFydGljbGUgYXNpZGUgYXVkaW8gYmRpIGNhbnZhcyBkYXRhIGRhdGFsaXN0IGRldGFpbHMgZGlhbG9nIGZpZ2NhcHRpb24gZmlndXJlIGZvb3RlciBoZWFkZXIgaGdyb3VwIG1haW4gbWFyayBtZXRlciBuYXYgb3V0cHV0IHByb2dyZXNzIHNlY3Rpb24gc3VtbWFyeSB0ZW1wbGF0ZSB0aW1lIHZpZGVvJyxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIGN1cnJlbnQgdmVyc2lvbiBvZiBodG1sNXNoaXZcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAndmVyc2lvbic6IHZlcnNpb24sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgSFRNTDUgc3R5bGUgc2hlZXQgc2hvdWxkIGJlIGluc2VydGVkLlxuICAgICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICAnc2hpdkNTUyc6IChvcHRpb25zLnNoaXZDU1MgIT09IGZhbHNlKSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElzIGVxdWFsIHRvIHRydWUgaWYgYSBicm93c2VyIHN1cHBvcnRzIGNyZWF0aW5nIHVua25vd24vSFRNTDUgZWxlbWVudHNcbiAgICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgJ3N1cHBvcnRzVW5rbm93bkVsZW1lbnRzJzogc3VwcG9ydHNVbmtub3duRWxlbWVudHMsXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBBIGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgZG9jdW1lbnQncyBgY3JlYXRlRWxlbWVudGAgYW5kIGBjcmVhdGVEb2N1bWVudEZyYWdtZW50YFxuICAgICAgICAgICAqIG1ldGhvZHMgc2hvdWxkIGJlIG92ZXJ3cml0dGVuLlxuICAgICAgICAgICAqIEBtZW1iZXJPZiBodG1sNVxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICAnc2hpdk1ldGhvZHMnOiAob3B0aW9ucy5zaGl2TWV0aG9kcyAhPT0gZmFsc2UpLFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQSBzdHJpbmcgdG8gZGVzY3JpYmUgdGhlIHR5cGUgb2YgYGh0bWw1YCBvYmplY3QgKFwiZGVmYXVsdFwiIG9yIFwiZGVmYXVsdCBwcmludFwiKS5cbiAgICAgICAgICAgKiBAbWVtYmVyT2YgaHRtbDVcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICAndHlwZSc6ICdkZWZhdWx0JyxcblxuICAgICAgICAgIC8vIHNoaXZzIHRoZSBkb2N1bWVudCBhY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCBgaHRtbDVgIG9iamVjdCBvcHRpb25zXG4gICAgICAgICAgJ3NoaXZEb2N1bWVudCc6IHNoaXZEb2N1bWVudCxcblxuICAgICAgICAgIC8vY3JlYXRlcyBhIHNoaXZlZCBlbGVtZW50XG4gICAgICAgICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcblxuICAgICAgICAgIC8vY3JlYXRlcyBhIHNoaXZlZCBkb2N1bWVudEZyYWdtZW50XG4gICAgICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudDogY3JlYXRlRG9jdW1lbnRGcmFnbWVudFxuICAgICAgICB9O1xuXG4gICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgIC8vIGV4cG9zZSBodG1sNVxuICAgICAgICB3aW5kb3cuaHRtbDUgPSBodG1sNTtcblxuICAgICAgICAvLyBzaGl2IHRoZSBkb2N1bWVudFxuICAgICAgICBzaGl2RG9jdW1lbnQoZG9jdW1lbnQpO1xuXG4gICAgfSh0aGlzLCBkb2N1bWVudCkpO1xuICAgIC8qPj5zaGl2Ki9cblxuICAgIC8vIEFzc2lnbiBwcml2YXRlIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybiBvYmplY3Qgd2l0aCBwcmVmaXhcbiAgICBNb2Rlcm5penIuX3ZlcnNpb24gICAgICA9IHZlcnNpb247XG5cbiAgICAvLyBleHBvc2UgdGhlc2UgZm9yIHRoZSBwbHVnaW4gQVBJLiBMb29rIGluIHRoZSBzb3VyY2UgZm9yIGhvdyB0byBqb2luKCkgdGhlbSBhZ2FpbnN0IHlvdXIgaW5wdXRcbiAgICAvKj4+cHJlZml4ZXMqL1xuICAgIE1vZGVybml6ci5fcHJlZml4ZXMgICAgID0gcHJlZml4ZXM7XG4gICAgLyo+PnByZWZpeGVzKi9cbiAgICAvKj4+ZG9tcHJlZml4ZXMqL1xuICAgIE1vZGVybml6ci5fZG9tUHJlZml4ZXMgID0gZG9tUHJlZml4ZXM7XG4gICAgTW9kZXJuaXpyLl9jc3NvbVByZWZpeGVzICA9IGNzc29tUHJlZml4ZXM7XG4gICAgLyo+PmRvbXByZWZpeGVzKi9cblxuICAgIC8qPj5tcSovXG4gICAgLy8gTW9kZXJuaXpyLm1xIHRlc3RzIGEgZ2l2ZW4gbWVkaWEgcXVlcnksIGxpdmUgYWdhaW5zdCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgd2luZG93XG4gICAgLy8gQSBmZXcgaW1wb3J0YW50IG5vdGVzOlxuICAgIC8vICAgKiBJZiBhIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBtZWRpYSBxdWVyaWVzIGF0IGFsbCAoZWcuIG9sZElFKSB0aGUgbXEoKSB3aWxsIGFsd2F5cyByZXR1cm4gZmFsc2VcbiAgICAvLyAgICogQSBtYXgtd2lkdGggb3Igb3JpZW50YXRpb24gcXVlcnkgd2lsbCBiZSBldmFsdWF0ZWQgYWdhaW5zdCB0aGUgY3VycmVudCBzdGF0ZSwgd2hpY2ggbWF5IGNoYW5nZSBsYXRlci5cbiAgICAvLyAgICogWW91IG11c3Qgc3BlY2lmeSB2YWx1ZXMuIEVnLiBJZiB5b3UgYXJlIHRlc3Rpbmcgc3VwcG9ydCBmb3IgdGhlIG1pbi13aWR0aCBtZWRpYSBxdWVyeSB1c2U6XG4gICAgLy8gICAgICAgTW9kZXJuaXpyLm1xKCcobWluLXdpZHRoOjApJylcbiAgICAvLyB1c2FnZTpcbiAgICAvLyBNb2Rlcm5penIubXEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2OCknKVxuICAgIE1vZGVybml6ci5tcSAgICAgICAgICAgID0gdGVzdE1lZGlhUXVlcnk7XG4gICAgLyo+Pm1xKi9cblxuICAgIC8qPj5oYXNldmVudCovXG4gICAgLy8gTW9kZXJuaXpyLmhhc0V2ZW50KCkgZGV0ZWN0cyBzdXBwb3J0IGZvciBhIGdpdmVuIGV2ZW50LCB3aXRoIGFuIG9wdGlvbmFsIGVsZW1lbnQgdG8gdGVzdCBvblxuICAgIC8vIE1vZGVybml6ci5oYXNFdmVudCgnZ2VzdHVyZXN0YXJ0JywgZWxlbSlcbiAgICBNb2Rlcm5penIuaGFzRXZlbnQgICAgICA9IGlzRXZlbnRTdXBwb3J0ZWQ7XG4gICAgLyo+Pmhhc2V2ZW50Ki9cblxuICAgIC8qPj50ZXN0cHJvcCovXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RQcm9wKCkgaW52ZXN0aWdhdGVzIHdoZXRoZXIgYSBnaXZlbiBzdHlsZSBwcm9wZXJ0eSBpcyByZWNvZ25pemVkXG4gICAgLy8gTm90ZSB0aGF0IHRoZSBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoZSBjYW1lbENhc2UgdmFyaWFudC5cbiAgICAvLyBNb2Rlcm5penIudGVzdFByb3AoJ3BvaW50ZXJFdmVudHMnKVxuICAgIE1vZGVybml6ci50ZXN0UHJvcCAgICAgID0gZnVuY3Rpb24ocHJvcCl7XG4gICAgICAgIHJldHVybiB0ZXN0UHJvcHMoW3Byb3BdKTtcbiAgICB9O1xuICAgIC8qPj50ZXN0cHJvcCovXG5cbiAgICAvKj4+dGVzdGFsbHByb3BzKi9cbiAgICAvLyBNb2Rlcm5penIudGVzdEFsbFByb3BzKCkgaW52ZXN0aWdhdGVzIHdoZXRoZXIgYSBnaXZlbiBzdHlsZSBwcm9wZXJ0eSxcbiAgICAvLyAgIG9yIGFueSBvZiBpdHMgdmVuZG9yLXByZWZpeGVkIHZhcmlhbnRzLCBpcyByZWNvZ25pemVkXG4gICAgLy8gTm90ZSB0aGF0IHRoZSBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlIHByb3ZpZGVkIGluIHRoZSBjYW1lbENhc2UgdmFyaWFudC5cbiAgICAvLyBNb2Rlcm5penIudGVzdEFsbFByb3BzKCdib3hTaXppbmcnKVxuICAgIE1vZGVybml6ci50ZXN0QWxsUHJvcHMgID0gdGVzdFByb3BzQWxsO1xuICAgIC8qPj50ZXN0YWxscHJvcHMqL1xuXG5cbiAgICAvKj4+dGVzdHN0eWxlcyovXG4gICAgLy8gTW9kZXJuaXpyLnRlc3RTdHlsZXMoKSBhbGxvd3MgeW91IHRvIGFkZCBjdXN0b20gc3R5bGVzIHRvIHRoZSBkb2N1bWVudCBhbmQgdGVzdCBhbiBlbGVtZW50IGFmdGVyd2FyZHNcbiAgICAvLyBNb2Rlcm5penIudGVzdFN0eWxlcygnI21vZGVybml6ciB7IHBvc2l0aW9uOmFic29sdXRlIH0nLCBmdW5jdGlvbihlbGVtLCBydWxlKXsgLi4uIH0pXG4gICAgTW9kZXJuaXpyLnRlc3RTdHlsZXMgICAgPSBpbmplY3RFbGVtZW50V2l0aFN0eWxlcztcbiAgICAvKj4+dGVzdHN0eWxlcyovXG5cblxuICAgIC8qPj5wcmVmaXhlZCovXG4gICAgLy8gTW9kZXJuaXpyLnByZWZpeGVkKCkgcmV0dXJucyB0aGUgcHJlZml4ZWQgb3Igbm9ucHJlZml4ZWQgcHJvcGVydHkgbmFtZSB2YXJpYW50IG9mIHlvdXIgaW5wdXRcbiAgICAvLyBNb2Rlcm5penIucHJlZml4ZWQoJ2JveFNpemluZycpIC8vICdNb3pCb3hTaXppbmcnXG5cbiAgICAvLyBQcm9wZXJ0aWVzIG11c3QgYmUgcGFzc2VkIGFzIGRvbS1zdHlsZSBjYW1lbGNhc2UsIHJhdGhlciB0aGFuIGBib3gtc2l6aW5nYCBoeXBlbnRhdGVkIHN0eWxlLlxuICAgIC8vIFJldHVybiB2YWx1ZXMgd2lsbCBhbHNvIGJlIHRoZSBjYW1lbENhc2UgdmFyaWFudCwgaWYgeW91IG5lZWQgdG8gdHJhbnNsYXRlIHRoYXQgdG8gaHlwZW5hdGVkIHN0eWxlIHVzZTpcbiAgICAvL1xuICAgIC8vICAgICBzdHIucmVwbGFjZSgvKFtBLVpdKS9nLCBmdW5jdGlvbihzdHIsbTEpeyByZXR1cm4gJy0nICsgbTEudG9Mb3dlckNhc2UoKTsgfSkucmVwbGFjZSgvXm1zLS8sJy1tcy0nKTtcblxuICAgIC8vIElmIHlvdSdyZSB0cnlpbmcgdG8gYXNjZXJ0YWluIHdoaWNoIHRyYW5zaXRpb24gZW5kIGV2ZW50IHRvIGJpbmQgdG8sIHlvdSBtaWdodCBkbyBzb21ldGhpbmcgbGlrZS4uLlxuICAgIC8vXG4gICAgLy8gICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgLy8gICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgIC8vICAgICAgICdNb3pUcmFuc2l0aW9uJyAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAvLyAgICAgICAnT1RyYW5zaXRpb24nICAgICAgOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgIC8vICAgICAgICdtc1RyYW5zaXRpb24nICAgICA6ICdNU1RyYW5zaXRpb25FbmQnLFxuICAgIC8vICAgICAgICd0cmFuc2l0aW9uJyAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB0cmFuc0VuZEV2ZW50TmFtZSA9IHRyYW5zRW5kRXZlbnROYW1lc1sgTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2l0aW9uJykgXTtcblxuICAgIE1vZGVybml6ci5wcmVmaXhlZCAgICAgID0gZnVuY3Rpb24ocHJvcCwgb2JqLCBlbGVtKXtcbiAgICAgIGlmKCFvYmopIHtcbiAgICAgICAgcmV0dXJuIHRlc3RQcm9wc0FsbChwcm9wLCAncGZ4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUZXN0aW5nIERPTSBwcm9wZXJ0eSBlLmcuIE1vZGVybml6ci5wcmVmaXhlZCgncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgd2luZG93KSAvLyAnbW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lJ1xuICAgICAgICByZXR1cm4gdGVzdFByb3BzQWxsKHByb3AsIG9iaiwgZWxlbSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvKj4+cHJlZml4ZWQqL1xuXG5cbiAgICAvKj4+Y3NzY2xhc3NlcyovXG4gICAgLy8gUmVtb3ZlIFwibm8tanNcIiBjbGFzcyBmcm9tIDxodG1sPiBlbGVtZW50LCBpZiBpdCBleGlzdHM6XG4gICAgZG9jRWxlbWVudC5jbGFzc05hbWUgPSBkb2NFbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKC8oXnxcXHMpbm8tanMoXFxzfCQpLywgJyQxJDInKSArXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIG5ldyBjbGFzc2VzIHRvIHRoZSA8aHRtbD4gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW5hYmxlQ2xhc3NlcyA/ICcganMgJyArIGNsYXNzZXMuam9pbignICcpIDogJycpO1xuICAgIC8qPj5jc3NjbGFzc2VzKi9cblxuICAgIHJldHVybiBNb2Rlcm5penI7XG5cbn0pKHRoaXMsIHRoaXMuZG9jdW1lbnQpO1xuIiwiLypcbiAqIEZvdW5kYXRpb24gUmVzcG9uc2l2ZSBMaWJyYXJ5XG4gKiBodHRwOi8vZm91bmRhdGlvbi56dXJiLmNvbVxuICogQ29weXJpZ2h0IDIwMTQsIFpVUkJcbiAqIEZyZWUgdG8gdXNlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qL1xuXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGhlYWRlcl9oZWxwZXJzID0gZnVuY3Rpb24gKGNsYXNzX2FycmF5KSB7XG4gICAgdmFyIGkgPSBjbGFzc19hcnJheS5sZW5ndGg7XG4gICAgdmFyIGhlYWQgPSAkKCdoZWFkJyk7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoaGVhZC5oYXMoJy4nICsgY2xhc3NfYXJyYXlbaV0pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBoZWFkLmFwcGVuZCgnPG1ldGEgY2xhc3M9XCInICsgY2xhc3NfYXJyYXlbaV0gKyAnXCIgLz4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGVhZGVyX2hlbHBlcnMoW1xuICAgICdmb3VuZGF0aW9uLW1xLXNtYWxsJyxcbiAgICAnZm91bmRhdGlvbi1tcS1zbWFsbC1vbmx5JyxcbiAgICAnZm91bmRhdGlvbi1tcS1tZWRpdW0nLFxuICAgICdmb3VuZGF0aW9uLW1xLW1lZGl1bS1vbmx5JyxcbiAgICAnZm91bmRhdGlvbi1tcS1sYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tbXEtbGFyZ2Utb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteGxhcmdlJyxcbiAgICAnZm91bmRhdGlvbi1tcS14bGFyZ2Utb25seScsXG4gICAgJ2ZvdW5kYXRpb24tbXEteHhsYXJnZScsXG4gICAgJ2ZvdW5kYXRpb24tZGF0YS1hdHRyaWJ1dGUtbmFtZXNwYWNlJ10pO1xuXG4gIC8vIEVuYWJsZSBGYXN0Q2xpY2sgaWYgcHJlc2VudFxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgRmFzdENsaWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gRG9uJ3QgYXR0YWNoIHRvIGJvZHkgaWYgdW5kZWZpbmVkXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBwcml2YXRlIEZhc3QgU2VsZWN0b3Igd3JhcHBlcixcbiAgLy8gcmV0dXJucyBqUXVlcnkgb2JqZWN0LiBPbmx5IHVzZSB3aGVyZVxuICAvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgYXZhaWxhYmxlLlxuICB2YXIgUyA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICB2YXIgY29udDtcbiAgICAgICAgaWYgKGNvbnRleHQuanF1ZXJ5KSB7XG4gICAgICAgICAgY29udCA9IGNvbnRleHRbMF07XG4gICAgICAgICAgaWYgKCFjb250KSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udCA9IGNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQoY29udC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJChzZWxlY3RvciwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gTmFtZXNwYWNlIGZ1bmN0aW9ucy5cblxuICB2YXIgYXR0cl9uYW1lID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgaWYgKCFpbml0KSB7XG4gICAgICBhcnIucHVzaCgnZGF0YScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uYW1lc3BhY2UubGVuZ3RoID4gMCkge1xuICAgICAgYXJyLnB1c2godGhpcy5uYW1lc3BhY2UpO1xuICAgIH1cbiAgICBhcnIucHVzaCh0aGlzLm5hbWUpO1xuXG4gICAgcmV0dXJuIGFyci5qb2luKCctJyk7XG4gIH07XG5cbiAgdmFyIGFkZF9uYW1lc3BhY2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCctJyksXG4gICAgICAgIGkgPSBwYXJ0cy5sZW5ndGgsXG4gICAgICAgIGFyciA9IFtdO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgYXJyLnB1c2gocGFydHNbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMubmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBhcnIucHVzaCh0aGlzLm5hbWVzcGFjZSwgcGFydHNbaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyci5wdXNoKHBhcnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpLmpvaW4oJy0nKTtcbiAgfTtcblxuICAvLyBFdmVudCBiaW5kaW5nIGFuZCBkYXRhLW9wdGlvbnMgdXBkYXRpbmcuXG5cbiAgdmFyIGJpbmRpbmdzID0gZnVuY3Rpb24gKG1ldGhvZCwgb3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYmluZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyICR0aGlzID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgc2hvdWxkX2JpbmRfZXZlbnRzID0gISR0aGlzLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcbiAgICAgICAgICAkdGhpcy5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JywgJC5leHRlbmQoe30sIHNlbGYuc2V0dGluZ3MsIChvcHRpb25zIHx8IG1ldGhvZCksIHNlbGYuZGF0YV9vcHRpb25zKCR0aGlzKSkpO1xuXG4gICAgICAgICAgaWYgKHNob3VsZF9iaW5kX2V2ZW50cykge1xuICAgICAgICAgICAgc2VsZi5ldmVudHModGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgaWYgKFModGhpcy5zY29wZSkuaXMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArJ10nKSkge1xuICAgICAgYmluZC5jYWxsKHRoaXMuc2NvcGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBTKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyddJywgdGhpcy5zY29wZSkuZWFjaChiaW5kKTtcbiAgICB9XG4gICAgLy8gIyBQYXRjaCB0byBmaXggIzUwNDMgdG8gbW92ZSB0aGlzICphZnRlciogdGhlIGlmL2Vsc2UgY2xhdXNlIGluIG9yZGVyIGZvciBCYWNrYm9uZSBhbmQgc2ltaWxhciBmcmFtZXdvcmtzIHRvIGhhdmUgaW1wcm92ZWQgY29udHJvbCBvdmVyIGV2ZW50IGJpbmRpbmcgYW5kIGRhdGEtb3B0aW9ucyB1cGRhdGluZy5cbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzW21ldGhvZF0uY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgfTtcblxuICB2YXIgc2luZ2xlX2ltYWdlX2xvYWRlZCA9IGZ1bmN0aW9uIChpbWFnZSwgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiBsb2FkZWQgKCkge1xuICAgICAgY2FsbGJhY2soaW1hZ2VbMF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRMb2FkICgpIHtcbiAgICAgIHRoaXMub25lKCdsb2FkJywgbG9hZGVkKTtcblxuICAgICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIHZhciBzcmMgPSB0aGlzLmF0dHIoICdzcmMnICksXG4gICAgICAgICAgICBwYXJhbSA9IHNyYy5tYXRjaCggL1xcPy8gKSA/ICcmJyA6ICc/JztcblxuICAgICAgICBwYXJhbSArPSAncmFuZG9tPScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLmF0dHIoJ3NyYycsIHNyYyArIHBhcmFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWltYWdlLmF0dHIoJ3NyYycpKSB7XG4gICAgICBsb2FkZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW1hZ2VbMF0uY29tcGxldGUgfHwgaW1hZ2VbMF0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgbG9hZGVkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJpbmRMb2FkLmNhbGwoaW1hZ2UpO1xuICAgIH1cbiAgfTtcblxuICAvKiEgbWF0Y2hNZWRpYSgpIHBvbHlmaWxsIC0gVGVzdCBhIENTUyBtZWRpYSB0eXBlL3F1ZXJ5IGluIEpTLiBBdXRob3JzICYgY29weXJpZ2h0IChjKSAyMDEyOiBTY290dCBKZWhsLCBQYXVsIElyaXNoLCBOaWNob2xhcyBaYWthcywgRGF2aWQgS25pZ2h0LiBEdWFsIE1JVC9CU0QgbGljZW5zZSAqL1xuXG4gIHdpbmRvdy5tYXRjaE1lZGlhIHx8ICh3aW5kb3cubWF0Y2hNZWRpYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgbWF0Y2hNZWRpdW0gYXBpIHN1Y2ggYXMgSUUgOSBhbmQgd2Via2l0XG4gICAgICB2YXIgc3R5bGVNZWRpYSA9ICh3aW5kb3cuc3R5bGVNZWRpYSB8fCB3aW5kb3cubWVkaWEpO1xuXG4gICAgICAvLyBGb3IgdGhvc2UgdGhhdCBkb24ndCBzdXBwb3J0IG1hdGNoTWVkaXVtXG4gICAgICBpZiAoIXN0eWxlTWVkaWEpIHtcbiAgICAgICAgICB2YXIgc3R5bGUgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLFxuICAgICAgICAgICAgICBzY3JpcHQgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXSxcbiAgICAgICAgICAgICAgaW5mbyAgICAgICAgPSBudWxsO1xuXG4gICAgICAgICAgc3R5bGUudHlwZSAgPSAndGV4dC9jc3MnO1xuICAgICAgICAgIHN0eWxlLmlkICAgID0gJ21hdGNobWVkaWFqcy10ZXN0JztcblxuICAgICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzdHlsZSwgc2NyaXB0KTtcblxuICAgICAgICAgIC8vICdzdHlsZS5jdXJyZW50U3R5bGUnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlJyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgICAgaW5mbyA9ICgnZ2V0Q29tcHV0ZWRTdHlsZScgaW4gd2luZG93KSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzdHlsZSwgbnVsbCkgfHwgc3R5bGUuY3VycmVudFN0eWxlO1xuXG4gICAgICAgICAgc3R5bGVNZWRpYSA9IHtcbiAgICAgICAgICAgICAgbWF0Y2hNZWRpdW06IGZ1bmN0aW9uKG1lZGlhKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICdAbWVkaWEgJyArIG1lZGlhICsgJ3sgI21hdGNobWVkaWFqcy10ZXN0IHsgd2lkdGg6IDFweDsgfSB9JztcblxuICAgICAgICAgICAgICAgICAgLy8gJ3N0eWxlLnN0eWxlU2hlZXQnIGlzIHVzZWQgYnkgSUUgPD0gOCBhbmQgJ3N0eWxlLnRleHRDb250ZW50JyBmb3IgYWxsIG90aGVyIGJyb3dzZXJzXG4gICAgICAgICAgICAgICAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gVGVzdCBpZiBtZWRpYSBxdWVyeSBpcyB0cnVlIG9yIGZhbHNlXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaW5mby53aWR0aCA9PT0gJzFweCc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24obWVkaWEpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBtYXRjaGVzOiBzdHlsZU1lZGlhLm1hdGNoTWVkaXVtKG1lZGlhIHx8ICdhbGwnKSxcbiAgICAgICAgICAgICAgbWVkaWE6IG1lZGlhIHx8ICdhbGwnXG4gICAgICAgICAgfTtcbiAgICAgIH07XG4gIH0oKSk7XG5cbiAgLypcbiAgICoganF1ZXJ5LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZ25hcmYzNy9qcXVlcnktcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIFJlcXVpcmVzIGpRdWVyeSAxLjgrXG4gICAqXG4gICAqIENvcHlyaWdodCAoYykgMjAxMiBDb3JleSBGcmFuZ1xuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gICAqL1xuXG4gIChmdW5jdGlvbihqUXVlcnkpIHtcblxuXG4gIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbCBhZGFwdGVkIGZyb20gRXJpayBNw7ZsbGVyXG4gIC8vIGZpeGVzIGZyb20gUGF1bCBJcmlzaCBhbmQgVGlubyBaaWpkZWxcbiAgLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cbiAgLy8gaHR0cDovL215Lm9wZXJhLmNvbS9lbW9sbGVyL2Jsb2cvMjAxMS8xMi8yMC9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWVyLWFuaW1hdGluZ1xuXG4gIHZhciBhbmltYXRpbmcsXG4gICAgICBsYXN0VGltZSA9IDAsXG4gICAgICB2ZW5kb3JzID0gWyd3ZWJraXQnLCAnbW96J10sXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUsXG4gICAgICBqcXVlcnlGeEF2YWlsYWJsZSA9ICd1bmRlZmluZWQnICE9PSB0eXBlb2YgalF1ZXJ5LmZ4O1xuXG4gIGZvciAoOyBsYXN0VGltZSA8IHZlbmRvcnMubGVuZ3RoICYmICFyZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IGxhc3RUaW1lKyspIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJyBdIHx8XG4gICAgICB3aW5kb3dbIHZlbmRvcnNbbGFzdFRpbWVdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhZigpIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcblxuICAgICAgaWYgKGpxdWVyeUZ4QXZhaWxhYmxlKSB7XG4gICAgICAgIGpRdWVyeS5meC50aWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgIC8vIHVzZSByQUZcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gICAgaWYgKGpxdWVyeUZ4QXZhaWxhYmxlKSB7XG4gICAgICBqUXVlcnkuZngudGltZXIgPSBmdW5jdGlvbiAodGltZXIpIHtcbiAgICAgICAgaWYgKHRpbWVyKCkgJiYgalF1ZXJ5LnRpbWVycy5wdXNoKHRpbWVyKSAmJiAhYW5pbWF0aW5nKSB7XG4gICAgICAgICAgYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICByYWYoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgalF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gcG9seWZpbGxcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKSxcbiAgICAgICAgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG5cbiAgfVxuXG4gIH0oICQgKSk7XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUXVvdGVzIChzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycgfHwgc3RyaW5nIGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXlsnXFxcXC9cIl0rfCg7XFxzP30pK3xbJ1xcXFwvXCJdKyQvZywgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICB3aW5kb3cuRm91bmRhdGlvbiA9IHtcbiAgICBuYW1lIDogJ0ZvdW5kYXRpb24nLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBtZWRpYV9xdWVyaWVzIDoge1xuICAgICAgJ3NtYWxsJyAgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLXNtYWxsJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnc21hbGwtb25seScgIDogUygnLmZvdW5kYXRpb24tbXEtc21hbGwtb25seScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ21lZGl1bScgICAgICA6IFMoJy5mb3VuZGF0aW9uLW1xLW1lZGl1bScpLmNzcygnZm9udC1mYW1pbHknKS5yZXBsYWNlKC9eW1xcL1xcXFwnXCJdK3woO1xccz99KSt8W1xcL1xcXFwnXCJdKyQvZywgJycpLFxuICAgICAgJ21lZGl1bS1vbmx5JyA6IFMoJy5mb3VuZGF0aW9uLW1xLW1lZGl1bS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAnbGFyZ2UnICAgICAgIDogUygnLmZvdW5kYXRpb24tbXEtbGFyZ2UnKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICdsYXJnZS1vbmx5JyAgOiBTKCcuZm91bmRhdGlvbi1tcS1sYXJnZS1vbmx5JykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneGxhcmdlJyAgICAgIDogUygnLmZvdW5kYXRpb24tbXEteGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJyksXG4gICAgICAneGxhcmdlLW9ubHknIDogUygnLmZvdW5kYXRpb24tbXEteGxhcmdlLW9ubHknKS5jc3MoJ2ZvbnQtZmFtaWx5JykucmVwbGFjZSgvXltcXC9cXFxcJ1wiXSt8KDtcXHM/fSkrfFtcXC9cXFxcJ1wiXSskL2csICcnKSxcbiAgICAgICd4eGxhcmdlJyAgICAgOiBTKCcuZm91bmRhdGlvbi1tcS14eGxhcmdlJykuY3NzKCdmb250LWZhbWlseScpLnJlcGxhY2UoL15bXFwvXFxcXCdcIl0rfCg7XFxzP30pK3xbXFwvXFxcXCdcIl0rJC9nLCAnJylcbiAgICB9LFxuXG4gICAgc3R5bGVzaGVldCA6ICQoJzxzdHlsZT48L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJylbMF0uc2hlZXQsXG5cbiAgICBnbG9iYWwgOiB7XG4gICAgICBuYW1lc3BhY2UgOiB1bmRlZmluZWRcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzY29wZSwgbGlicmFyaWVzLCBtZXRob2QsIG9wdGlvbnMsIHJlc3BvbnNlKSB7XG4gICAgICB2YXIgYXJncyA9IFtzY29wZSwgbWV0aG9kLCBvcHRpb25zLCByZXNwb25zZV0sXG4gICAgICAgICAgcmVzcG9uc2VzID0gW107XG5cbiAgICAgIC8vIGNoZWNrIFJUTFxuICAgICAgdGhpcy5ydGwgPSAvcnRsL2kudGVzdChTKCdodG1sJykuYXR0cignZGlyJykpO1xuXG4gICAgICAvLyBzZXQgZm91bmRhdGlvbiBnbG9iYWwgc2NvcGVcbiAgICAgIHRoaXMuc2NvcGUgPSBzY29wZSB8fCB0aGlzLnNjb3BlO1xuXG4gICAgICB0aGlzLnNldF9uYW1lc3BhY2UoKTtcblxuICAgICAgaWYgKGxpYnJhcmllcyAmJiB0eXBlb2YgbGlicmFyaWVzID09PSAnc3RyaW5nJyAmJiAhL3JlZmxvdy9pLnRlc3QobGlicmFyaWVzKSkge1xuICAgICAgICBpZiAodGhpcy5saWJzLmhhc093blByb3BlcnR5KGxpYnJhcmllcykpIHtcbiAgICAgICAgICByZXNwb25zZXMucHVzaCh0aGlzLmluaXRfbGliKGxpYnJhcmllcywgYXJncykpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBsaWIgaW4gdGhpcy5saWJzKSB7XG4gICAgICAgICAgcmVzcG9uc2VzLnB1c2godGhpcy5pbml0X2xpYihsaWIsIGxpYnJhcmllcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIFMod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUyh3aW5kb3cpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5jbGVhcmluZycpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5kcm9wZG93bicpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5lcXVhbGl6ZXInKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uaW50ZXJjaGFuZ2UnKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uam95cmlkZScpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi5tYWdlbGxhbicpXG4gICAgICAgICAgLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKVxuICAgICAgICAgIC50cmlnZ2VyKCdyZXNpemUuZm5kdG4uc2xpZGVyJyk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHNjb3BlO1xuICAgIH0sXG5cbiAgICBpbml0X2xpYiA6IGZ1bmN0aW9uIChsaWIsIGFyZ3MpIHtcbiAgICAgIGlmICh0aGlzLmxpYnMuaGFzT3duUHJvcGVydHkobGliKSkge1xuICAgICAgICB0aGlzLnBhdGNoKHRoaXMubGlic1tsaWJdKTtcblxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmhhc093blByb3BlcnR5KGxpYikpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5saWJzW2xpYl0uc2V0dGluZ3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoaXMubGlic1tsaWJdLnNldHRpbmdzLCBhcmdzW2xpYl0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5saWJzW2xpYl0uZGVmYXVsdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoaXMubGlic1tsaWJdLmRlZmF1bHRzLCBhcmdzW2xpYl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLmxpYnNbbGliXS5pbml0LmFwcGx5KHRoaXMubGlic1tsaWJdLCBbdGhpcy5zY29wZSwgYXJnc1tsaWJdXSk7XG4gICAgICAgIH1cblxuICAgICAgICBhcmdzID0gYXJncyBpbnN0YW5jZW9mIEFycmF5ID8gYXJncyA6IG5ldyBBcnJheShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlic1tsaWJdLmluaXQuYXBwbHkodGhpcy5saWJzW2xpYl0sIGFyZ3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgfSxcblxuICAgIHBhdGNoIDogZnVuY3Rpb24gKGxpYikge1xuICAgICAgbGliLnNjb3BlID0gdGhpcy5zY29wZTtcbiAgICAgIGxpYi5uYW1lc3BhY2UgPSB0aGlzLmdsb2JhbC5uYW1lc3BhY2U7XG4gICAgICBsaWIucnRsID0gdGhpcy5ydGw7XG4gICAgICBsaWJbJ2RhdGFfb3B0aW9ucyddID0gdGhpcy51dGlscy5kYXRhX29wdGlvbnM7XG4gICAgICBsaWJbJ2F0dHJfbmFtZSddID0gYXR0cl9uYW1lO1xuICAgICAgbGliWydhZGRfbmFtZXNwYWNlJ10gPSBhZGRfbmFtZXNwYWNlO1xuICAgICAgbGliWydiaW5kaW5ncyddID0gYmluZGluZ3M7XG4gICAgICBsaWJbJ1MnXSA9IHRoaXMudXRpbHMuUztcbiAgICB9LFxuXG4gICAgaW5oZXJpdCA6IGZ1bmN0aW9uIChzY29wZSwgbWV0aG9kcykge1xuICAgICAgdmFyIG1ldGhvZHNfYXJyID0gbWV0aG9kcy5zcGxpdCgnICcpLFxuICAgICAgICAgIGkgPSBtZXRob2RzX2Fyci5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbHMuaGFzT3duUHJvcGVydHkobWV0aG9kc19hcnJbaV0pKSB7XG4gICAgICAgICAgc2NvcGVbbWV0aG9kc19hcnJbaV1dID0gdGhpcy51dGlsc1ttZXRob2RzX2FycltpXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0X25hbWVzcGFjZSA6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBEb24ndCBib3RoZXIgcmVhZGluZyB0aGUgbmFtZXNwYWNlIG91dCBvZiB0aGUgbWV0YSB0YWdcbiAgICAgIC8vICAgIGlmIHRoZSBuYW1lc3BhY2UgaGFzIGJlZW4gc2V0IGdsb2JhbGx5IGluIGphdmFzY3JpcHRcbiAgICAgIC8vXG4gICAgICAvLyBFeGFtcGxlOlxuICAgICAgLy8gICAgRm91bmRhdGlvbi5nbG9iYWwubmFtZXNwYWNlID0gJ215LW5hbWVzcGFjZSc7XG4gICAgICAvLyBvciBtYWtlIGl0IGFuIGVtcHR5IHN0cmluZzpcbiAgICAgIC8vICAgIEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZSA9ICcnO1xuICAgICAgLy9cbiAgICAgIC8vXG5cbiAgICAgIC8vIElmIHRoZSBuYW1lc3BhY2UgaGFzIG5vdCBiZWVuIHNldCAoaXMgdW5kZWZpbmVkKSwgdHJ5IHRvIHJlYWQgaXQgb3V0IG9mIHRoZSBtZXRhIGVsZW1lbnQuXG4gICAgICAvLyBPdGhlcndpc2UgdXNlIHRoZSBnbG9iYWxseSBkZWZpbmVkIG5hbWVzcGFjZSwgZXZlbiBpZiBpdCdzIGVtcHR5ICgnJylcbiAgICAgIHZhciBuYW1lc3BhY2UgPSAoIHRoaXMuZ2xvYmFsLm5hbWVzcGFjZSA9PT0gdW5kZWZpbmVkICkgPyAkKCcuZm91bmRhdGlvbi1kYXRhLWF0dHJpYnV0ZS1uYW1lc3BhY2UnKS5jc3MoJ2ZvbnQtZmFtaWx5JykgOiB0aGlzLmdsb2JhbC5uYW1lc3BhY2U7XG5cbiAgICAgIC8vIEZpbmFsbHksIGlmIHRoZSBuYW1zZXBhY2UgaXMgZWl0aGVyIHVuZGVmaW5lZCBvciBmYWxzZSwgc2V0IGl0IHRvIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgIC8vIE90aGVyd2lzZSB1c2UgdGhlIG5hbWVzcGFjZSB2YWx1ZS5cbiAgICAgIHRoaXMuZ2xvYmFsLm5hbWVzcGFjZSA9ICggbmFtZXNwYWNlID09PSB1bmRlZmluZWQgfHwgL2ZhbHNlL2kudGVzdChuYW1lc3BhY2UpICkgPyAnJyA6IG5hbWVzcGFjZTtcbiAgICB9LFxuXG4gICAgbGlicyA6IHt9LFxuXG4gICAgLy8gbWV0aG9kcyB0aGF0IGNhbiBiZSBpbmhlcml0ZWQgaW4gbGlicmFyaWVzXG4gICAgdXRpbHMgOiB7XG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgRmFzdCBTZWxlY3RvciB3cmFwcGVyIHJldHVybnMgalF1ZXJ5IG9iamVjdC4gT25seSB1c2Ugd2hlcmUgZ2V0RWxlbWVudEJ5SWRcbiAgICAgIC8vICAgIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgU2VsZWN0b3IgKFN0cmluZyk6IENTUyBzZWxlY3RvciBkZXNjcmliaW5nIHRoZSBlbGVtZW50KHMpIHRvIGJlXG4gICAgICAvLyAgICByZXR1cm5lZCBhcyBhIGpRdWVyeSBvYmplY3QuXG4gICAgICAvL1xuICAgICAgLy8gICAgU2NvcGUgKFN0cmluZyk6IENTUyBzZWxlY3RvciBkZXNjcmliaW5nIHRoZSBhcmVhIHRvIGJlIHNlYXJjaGVkLiBEZWZhdWx0XG4gICAgICAvLyAgICBpcyBkb2N1bWVudC5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgRWxlbWVudCAoalF1ZXJ5IE9iamVjdCk6IGpRdWVyeSBvYmplY3QgY29udGFpbmluZyBlbGVtZW50cyBtYXRjaGluZyB0aGVcbiAgICAgIC8vICAgIHNlbGVjdG9yIHdpdGhpbiB0aGUgc2NvcGUuXG4gICAgICBTIDogUyxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBFeGVjdXRlcyBhIGZ1bmN0aW9uIGEgbWF4IG9mIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBGdW5jIChGdW5jdGlvbik6IEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBEZWxheSAoSW50ZWdlcik6IEZ1bmN0aW9uIGV4ZWN1dGlvbiB0aHJlc2hvbGQgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBMYXp5X2Z1bmN0aW9uIChGdW5jdGlvbik6IEZ1bmN0aW9uIHdpdGggdGhyb3R0bGluZyBhcHBsaWVkLlxuICAgICAgdGhyb3R0bGUgOiBmdW5jdGlvbiAoZnVuYywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICAgIGlmICh0aW1lciA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBFeGVjdXRlcyBhIGZ1bmN0aW9uIHdoZW4gaXQgc3RvcHMgYmVpbmcgaW52b2tlZCBmb3IgbiBzZWNvbmRzXG4gICAgICAvLyAgICBNb2RpZmllZCB2ZXJzaW9uIG9mIF8uZGVib3VuY2UoKSBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIEZ1bmMgKEZ1bmN0aW9uKTogRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkLlxuICAgICAgLy9cbiAgICAgIC8vICAgIERlbGF5IChJbnRlZ2VyKTogRnVuY3Rpb24gZXhlY3V0aW9uIHRocmVzaG9sZCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAvL1xuICAgICAgLy8gICAgSW1tZWRpYXRlIChCb29sKTogV2hldGhlciB0aGUgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nXG4gICAgICAvLyAgICBvZiB0aGUgZGVsYXkgaW5zdGVhZCBvZiB0aGUgZW5kLiBEZWZhdWx0IGlzIGZhbHNlLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBMYXp5X2Z1bmN0aW9uIChGdW5jdGlvbik6IEZ1bmN0aW9uIHdpdGggZGVib3VuY2luZyBhcHBsaWVkLlxuICAgICAgZGVib3VuY2UgOiBmdW5jdGlvbiAoZnVuYywgZGVsYXksIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIGRlbGF5KTtcbiAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgUGFyc2VzIGRhdGEtb3B0aW9ucyBhdHRyaWJ1dGVcbiAgICAgIC8vXG4gICAgICAvLyBBcmd1bWVudHM6XG4gICAgICAvLyAgICBFbCAoalF1ZXJ5IE9iamVjdCk6IEVsZW1lbnQgdG8gYmUgcGFyc2VkLlxuICAgICAgLy9cbiAgICAgIC8vIFJldHVybnM6XG4gICAgICAvLyAgICBPcHRpb25zIChKYXZhc2NyaXB0IE9iamVjdCk6IENvbnRlbnRzIG9mIHRoZSBlbGVtZW50J3MgZGF0YS1vcHRpb25zXG4gICAgICAvLyAgICBhdHRyaWJ1dGUuXG4gICAgICBkYXRhX29wdGlvbnMgOiBmdW5jdGlvbiAoZWwsIGRhdGFfYXR0cl9uYW1lKSB7XG4gICAgICAgIGRhdGFfYXR0cl9uYW1lID0gZGF0YV9hdHRyX25hbWUgfHwgJ29wdGlvbnMnO1xuICAgICAgICB2YXIgb3B0cyA9IHt9LCBpaSwgcCwgb3B0c19hcnIsXG4gICAgICAgICAgICBkYXRhX29wdGlvbnMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IEZvdW5kYXRpb24uZ2xvYmFsLm5hbWVzcGFjZTtcblxuICAgICAgICAgICAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuZGF0YShuYW1lc3BhY2UgKyAnLScgKyBkYXRhX2F0dHJfbmFtZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZWwuZGF0YShkYXRhX2F0dHJfbmFtZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjYWNoZWRfb3B0aW9ucyA9IGRhdGFfb3B0aW9ucyhlbCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWNoZWRfb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVkX29wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzX2FyciA9IChjYWNoZWRfb3B0aW9ucyB8fCAnOicpLnNwbGl0KCc7Jyk7XG4gICAgICAgIGlpID0gb3B0c19hcnIubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIGlzTnVtYmVyIChvKSB7XG4gICAgICAgICAgcmV0dXJuICFpc05hTiAobyAtIDApICYmIG8gIT09IG51bGwgJiYgbyAhPT0gJycgJiYgbyAhPT0gZmFsc2UgJiYgbyAhPT0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRyaW0gKHN0cikge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuICQudHJpbShzdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGlpLS0pIHtcbiAgICAgICAgICBwID0gb3B0c19hcnJbaWldLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgcCA9IFtwWzBdLCBwLnNsaWNlKDEpLmpvaW4oJzonKV07XG5cbiAgICAgICAgICBpZiAoL3RydWUvaS50ZXN0KHBbMV0pKSB7XG4gICAgICAgICAgICBwWzFdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKC9mYWxzZS9pLnRlc3QocFsxXSkpIHtcbiAgICAgICAgICAgIHBbMV0gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzTnVtYmVyKHBbMV0pKSB7XG4gICAgICAgICAgICBpZiAocFsxXS5pbmRleE9mKCcuJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHBbMV0gPSBwYXJzZUludChwWzFdLCAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwWzFdID0gcGFyc2VGbG9hdChwWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocC5sZW5ndGggPT09IDIgJiYgcFswXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcHRzW3RyaW0ocFswXSldID0gdHJpbShwWzFdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgQWRkcyBKUy1yZWNvZ25pemFibGUgbWVkaWEgcXVlcmllc1xuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIE1lZGlhIChTdHJpbmcpOiBLZXkgc3RyaW5nIGZvciB0aGUgbWVkaWEgcXVlcnkgdG8gYmUgc3RvcmVkIGFzIGluXG4gICAgICAvLyAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNcbiAgICAgIC8vXG4gICAgICAvLyAgICBDbGFzcyAoU3RyaW5nKTogQ2xhc3MgbmFtZSBmb3IgdGhlIGdlbmVyYXRlZCA8bWV0YT4gdGFnXG4gICAgICByZWdpc3Rlcl9tZWRpYSA6IGZ1bmN0aW9uIChtZWRpYSwgbWVkaWFfY2xhc3MpIHtcbiAgICAgICAgaWYgKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxtZXRhIGNsYXNzPVwiJyArIG1lZGlhX2NsYXNzICsgJ1wiLz4nKTtcbiAgICAgICAgICBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdID0gcmVtb3ZlUXVvdGVzKCQoJy4nICsgbWVkaWFfY2xhc3MpLmNzcygnZm9udC1mYW1pbHknKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIC8vIERlc2NyaXB0aW9uOlxuICAgICAgLy8gICAgQWRkIGN1c3RvbSBDU1Mgd2l0aGluIGEgSlMtZGVmaW5lZCBtZWRpYSBxdWVyeVxuICAgICAgLy9cbiAgICAgIC8vIEFyZ3VtZW50czpcbiAgICAgIC8vICAgIFJ1bGUgKFN0cmluZyk6IENTUyBydWxlIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBkb2N1bWVudC5cbiAgICAgIC8vXG4gICAgICAvLyAgICBNZWRpYSAoU3RyaW5nKTogT3B0aW9uYWwgbWVkaWEgcXVlcnkgc3RyaW5nIGZvciB0aGUgQ1NTIHJ1bGUgdG8gYmVcbiAgICAgIC8vICAgIG5lc3RlZCB1bmRlci5cbiAgICAgIGFkZF9jdXN0b21fcnVsZSA6IGZ1bmN0aW9uIChydWxlLCBtZWRpYSkge1xuICAgICAgICBpZiAobWVkaWEgPT09IHVuZGVmaW5lZCAmJiBGb3VuZGF0aW9uLnN0eWxlc2hlZXQpIHtcbiAgICAgICAgICBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuaW5zZXJ0UnVsZShydWxlLCBGb3VuZGF0aW9uLnN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcXVlcnkgPSBGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbbWVkaWFdO1xuXG4gICAgICAgICAgaWYgKHF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIEZvdW5kYXRpb24uc3R5bGVzaGVldC5pbnNlcnRSdWxlKCdAbWVkaWEgJyArXG4gICAgICAgICAgICAgIEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1ttZWRpYV0gKyAneyAnICsgcnVsZSArICcgfScsIEZvdW5kYXRpb24uc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBQZXJmb3JtcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYW4gaW1hZ2UgaXMgZnVsbHkgbG9hZGVkXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgSW1hZ2UgKGpRdWVyeSBPYmplY3QpOiBJbWFnZShzKSB0byBjaGVjayBpZiBsb2FkZWQuXG4gICAgICAvL1xuICAgICAgLy8gICAgQ2FsbGJhY2sgKEZ1bmN0aW9uKTogRnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIGltYWdlIGlzIGZ1bGx5IGxvYWRlZC5cbiAgICAgIGltYWdlX2xvYWRlZCA6IGZ1bmN0aW9uIChpbWFnZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHVubG9hZGVkID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgICAgICBmdW5jdGlvbiBwaWN0dXJlc19oYXNfaGVpZ2h0KGltYWdlcykge1xuICAgICAgICAgIHZhciBwaWN0dXJlc19udW1iZXIgPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHBpY3R1cmVzX251bWJlciAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZihpbWFnZXMuYXR0cignaGVpZ2h0JykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1bmxvYWRlZCA9PT0gMCB8fCBwaWN0dXJlc19oYXNfaGVpZ2h0KGltYWdlcykpIHtcbiAgICAgICAgICBjYWxsYmFjayhpbWFnZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW1hZ2VzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNpbmdsZV9pbWFnZV9sb2FkZWQoc2VsZi5TKHRoaXMpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bmxvYWRlZCAtPSAxO1xuICAgICAgICAgICAgaWYgKHVubG9hZGVkID09PSAwKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBSZXR1cm5zIGEgcmFuZG9tLCBhbHBoYW51bWVyaWMgc3RyaW5nXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgTGVuZ3RoIChJbnRlZ2VyKTogTGVuZ3RoIG9mIHN0cmluZyB0byBiZSBnZW5lcmF0ZWQuIERlZmF1bHRzIHRvIHJhbmRvbVxuICAgICAgLy8gICAgaW50ZWdlci5cbiAgICAgIC8vXG4gICAgICAvLyBSZXR1cm5zOlxuICAgICAgLy8gICAgUmFuZCAoU3RyaW5nKTogUHNldWRvLXJhbmRvbSwgYWxwaGFudW1lcmljIHN0cmluZy5cbiAgICAgIHJhbmRvbV9zdHIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5maWR4KSB7XG4gICAgICAgICAgdGhpcy5maWR4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZWZpeCA9IHRoaXMucHJlZml4IHx8IFsodGhpcy5uYW1lIHx8ICdGJyksICgrbmV3IERhdGUpLnRvU3RyaW5nKDM2KV0uam9pbignLScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArICh0aGlzLmZpZHgrKykudG9TdHJpbmcoMzYpO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBIZWxwZXIgZm9yIHdpbmRvdy5tYXRjaE1lZGlhXG4gICAgICAvL1xuICAgICAgLy8gQXJndW1lbnRzOlxuICAgICAgLy8gICAgbXEgKFN0cmluZyk6IE1lZGlhIHF1ZXJ5XG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIChCb29sZWFuKTogV2hldGhlciB0aGUgbWVkaWEgcXVlcnkgcGFzc2VzIG9yIG5vdFxuICAgICAgbWF0Y2ggOiBmdW5jdGlvbiAobXEpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKG1xKS5tYXRjaGVzO1xuICAgICAgfSxcblxuICAgICAgLy8gRGVzY3JpcHRpb246XG4gICAgICAvLyAgICBIZWxwZXJzIGZvciBjaGVja2luZyBGb3VuZGF0aW9uIGRlZmF1bHQgbWVkaWEgcXVlcmllcyB3aXRoIEpTXG4gICAgICAvL1xuICAgICAgLy8gUmV0dXJuczpcbiAgICAgIC8vICAgIChCb29sZWFuKTogV2hldGhlciB0aGUgbWVkaWEgcXVlcnkgcGFzc2VzIG9yIG5vdFxuXG4gICAgICBpc19zbWFsbF91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX21lZGl1bV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSk7XG4gICAgICB9LFxuXG4gICAgICBpc19sYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLmxhcmdlKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3hsYXJnZV91cCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2goRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnhsYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc194eGxhcmdlX3VwIDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMueHhsYXJnZSk7XG4gICAgICB9LFxuXG4gICAgICBpc19zbWFsbF9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgIXRoaXMuaXNfbGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc19tZWRpdW1fb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgIXRoaXMuaXNfbGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194bGFyZ2VfdXAoKSAmJiAhdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9LFxuXG4gICAgICBpc19sYXJnZV9vbmx5IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc19tZWRpdW1fdXAoKSAmJiB0aGlzLmlzX2xhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgIXRoaXMuaXNfeHhsYXJnZV91cCgpO1xuICAgICAgfSxcblxuICAgICAgaXNfeGxhcmdlX29ubHkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzX21lZGl1bV91cCgpICYmIHRoaXMuaXNfbGFyZ2VfdXAoKSAmJiB0aGlzLmlzX3hsYXJnZV91cCgpICYmICF0aGlzLmlzX3h4bGFyZ2VfdXAoKTtcbiAgICAgIH0sXG5cbiAgICAgIGlzX3h4bGFyZ2Vfb25seSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbWVkaXVtX3VwKCkgJiYgdGhpcy5pc19sYXJnZV91cCgpICYmIHRoaXMuaXNfeGxhcmdlX3VwKCkgJiYgdGhpcy5pc194eGxhcmdlX3VwKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gICQuZm4uZm91bmRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5pdC5hcHBseShGb3VuZGF0aW9uLCBbdGhpc10uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9O1xuXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duID0ge1xuICAgIG5hbWUgOiAnZHJvcGRvd24nLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIGFjdGl2ZV9jbGFzcyA6ICdvcGVuJyxcbiAgICAgIGRpc2FibGVkX2NsYXNzIDogJ2Rpc2FibGVkJyxcbiAgICAgIG1lZ2FfY2xhc3MgOiAnbWVnYScsXG4gICAgICBhbGlnbiA6ICdib3R0b20nLFxuICAgICAgaXNfaG92ZXIgOiBmYWxzZSxcbiAgICAgIGhvdmVyX3RpbWVvdXQgOiAxNTAsXG4gICAgICBvcGVuZWQgOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGNsb3NlZCA6IGZ1bmN0aW9uICgpIHt9XG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICd0aHJvdHRsZScpO1xuXG4gICAgICAkLmV4dGVuZCh0cnVlLCB0aGlzLnNldHRpbmdzLCBtZXRob2QsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gc2VsZi5TO1xuXG4gICAgICBTKHRoaXMuc2NvcGUpXG4gICAgICAgIC5vZmYoJy5kcm9wZG93bicpXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4uZHJvcGRvd24nLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBzZXR0aW5ncyA9IFModGhpcykuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgaWYgKCFzZXR0aW5ncy5pc19ob3ZlciB8fCBNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChTKHRoaXMpLnBhcmVudCgnW2RhdGEtcmV2ZWFsLWlkXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50b2dnbGUoJCh0aGlzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ21vdXNlZW50ZXIuZm5kdG4uZHJvcGRvd24nLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10sIFsnICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciAkdGhpcyA9IFModGhpcyksXG4gICAgICAgICAgICAgIGRyb3Bkb3duLFxuICAgICAgICAgICAgICB0YXJnZXQ7XG5cbiAgICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KTtcblxuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICBkcm9wZG93biA9IFMoJyMnICsgJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cigpKSk7XG4gICAgICAgICAgICB0YXJnZXQgPSAkdGhpcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJvcGRvd24gPSAkdGhpcztcbiAgICAgICAgICAgIHRhcmdldCA9IFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICc9XCInICsgZHJvcGRvd24uYXR0cignaWQnKSArICdcIl0nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG5cbiAgICAgICAgICBpZiAoUyhlLmN1cnJlbnRUYXJnZXQpLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkgJiYgc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgIHNlbGYuY2xvc2VhbGwuY2FsbChzZWxmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIpIHtcbiAgICAgICAgICAgIHNlbGYub3Blbi5hcHBseShzZWxmLCBbZHJvcGRvd24sIHRhcmdldF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddLCBbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpO1xuICAgICAgICAgIHZhciBzZXR0aW5ncztcblxuICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICAgIHNldHRpbmdzID0gJHRoaXMuZGF0YShzZWxmLmRhdGFfYXR0cih0cnVlKSArICctaW5pdCcpIHx8IHNlbGYuc2V0dGluZ3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCAgID0gUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJz1cIicgKyBTKHRoaXMpLmF0dHIoJ2lkJykgKyAnXCJdJyksXG4gICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRhcmdldC5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JykgfHwgc2VsZi5zZXR0aW5ncztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkdGhpcy5kYXRhKHNlbGYuZGF0YV9hdHRyKCkpKSB7XG4gICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UuY2FsbChzZWxmLCBTKCcjJyArICR0aGlzLmRhdGEoc2VsZi5kYXRhX2F0dHIoKSkpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmlzX2hvdmVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsICR0aGlzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0uYmluZCh0aGlzKSwgc2V0dGluZ3MuaG92ZXJfdGltZW91dCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4uZHJvcGRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBTKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJyk7XG4gICAgICAgICAgdmFyIGxpbmtzICA9IHBhcmVudC5maW5kKCdhJyk7XG5cbiAgICAgICAgICBpZiAobGlua3MubGVuZ3RoID4gMCAmJiBwYXJlbnQuYXR0cignYXJpYS1hdXRvY2xvc2UnKSAhPT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGRvY3VtZW50ICYmICEkLmNvbnRhaW5zKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZS50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFMoZS50YXJnZXQpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKFMoZS50YXJnZXQpLmRhdGEoJ3JldmVhbElkJykpICYmXG4gICAgICAgICAgICAocGFyZW50Lmxlbmd0aCA+IDAgJiYgKFMoZS50YXJnZXQpLmlzKCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykgfHxcbiAgICAgICAgICAgICAgJC5jb250YWlucyhwYXJlbnQuZmlyc3QoKVswXSwgZS50YXJnZXQpKSkpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5jbG9zZS5jYWxsKHNlbGYsIFMoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignb3BlbmVkLmZuZHRuLmRyb3Bkb3duJywgJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICctY29udGVudF0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5vcGVuZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbG9zZWQuZm5kdG4uZHJvcGRvd24nLCAnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJy1jb250ZW50XScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmNsb3NlZC5jYWxsKHRoaXMpO1xuICAgICAgICB9KTtcblxuICAgICAgUyh3aW5kb3cpXG4gICAgICAgIC5vZmYoJy5kcm9wZG93bicpXG4gICAgICAgIC5vbigncmVzaXplLmZuZHRuLmRyb3Bkb3duJywgc2VsZi50aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5yZXNpemUuY2FsbChzZWxmKTtcbiAgICAgICAgfSwgNTApKTtcblxuICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9LFxuXG4gICAgY2xvc2UgOiBmdW5jdGlvbiAoZHJvcGRvd24pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGRyb3Bkb3duLmVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICB2YXIgb3JpZ2luYWxfdGFyZ2V0ID0gJCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJz0nICsgZHJvcGRvd25baWR4XS5pZCArICddJykgfHwgJCgnYXJpYS1jb250cm9scz0nICsgZHJvcGRvd25baWR4XS5pZCArICddJyk7XG4gICAgICAgIG9yaWdpbmFsX3RhcmdldC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIGlmIChzZWxmLlModGhpcykuaGFzQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpKSB7XG4gICAgICAgICAgc2VsZi5TKHRoaXMpXG4gICAgICAgICAgICAuY3NzKEZvdW5kYXRpb24ucnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JywgJy05OTk5OXB4JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhzZWxmLnNldHRpbmdzLmFjdGl2ZV9jbGFzcylcbiAgICAgICAgICAgIC5wcmV2KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3Moc2VsZi5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpXG4gICAgICAgICAgICAucmVtb3ZlRGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgICBzZWxmLlModGhpcykudHJpZ2dlcignY2xvc2VkLmZuZHRuLmRyb3Bkb3duJywgW2Ryb3Bkb3duXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZHJvcGRvd24ucmVtb3ZlQ2xhc3MoJ2Ytb3Blbi0nICsgdGhpcy5hdHRyX25hbWUodHJ1ZSkpO1xuICAgIH0sXG5cbiAgICBjbG9zZWFsbCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICQuZWFjaChzZWxmLlMoJy5mLW9wZW4tJyArIHRoaXMuYXR0cl9uYW1lKHRydWUpKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmNsb3NlLmNhbGwoc2VsZiwgc2VsZi5TKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvcGVuIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQpIHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmNzcyhkcm9wZG93blxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3RpdmVfY2xhc3MpLCB0YXJnZXQpO1xuICAgICAgZHJvcGRvd24ucHJldignWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nKS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdGl2ZV9jbGFzcyk7XG4gICAgICBkcm9wZG93bi5kYXRhKCd0YXJnZXQnLCB0YXJnZXQuZ2V0KDApKS50cmlnZ2VyKCdvcGVuZWQuZm5kdG4uZHJvcGRvd24nLCBbZHJvcGRvd24sIHRhcmdldF0pO1xuICAgICAgZHJvcGRvd24uYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIHRhcmdldC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgIGRyb3Bkb3duLmZvY3VzKCk7XG4gICAgICBkcm9wZG93bi5hZGRDbGFzcygnZi1vcGVuLScgKyB0aGlzLmF0dHJfbmFtZSh0cnVlKSk7XG4gICAgfSxcblxuICAgIGRhdGFfYXR0ciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZSArICctJyArIHRoaXMubmFtZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldC5oYXNDbGFzcyh0aGlzLnNldHRpbmdzLmRpc2FibGVkX2NsYXNzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZHJvcGRvd24gPSB0aGlzLlMoJyMnICsgdGFyZ2V0LmRhdGEodGhpcy5kYXRhX2F0dHIoKSkpO1xuICAgICAgaWYgKGRyb3Bkb3duLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBObyBkcm9wZG93biBmb3VuZCwgbm90IGNvbnRpbnVpbmdcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsb3NlLmNhbGwodGhpcywgdGhpcy5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLWNvbnRlbnRdJykubm90KGRyb3Bkb3duKSk7XG5cbiAgICAgIGlmIChkcm9wZG93bi5oYXNDbGFzcyh0aGlzLnNldHRpbmdzLmFjdGl2ZV9jbGFzcykpIHtcbiAgICAgICAgdGhpcy5jbG9zZS5jYWxsKHRoaXMsIGRyb3Bkb3duKTtcbiAgICAgICAgaWYgKGRyb3Bkb3duLmRhdGEoJ3RhcmdldCcpICE9PSB0YXJnZXQuZ2V0KDApKSB7XG4gICAgICAgICAgdGhpcy5vcGVuLmNhbGwodGhpcywgZHJvcGRvd24sIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3Blbi5jYWxsKHRoaXMsIGRyb3Bkb3duLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNpemUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZHJvcGRvd24gPSB0aGlzLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICctY29udGVudF0ub3BlbicpO1xuICAgICAgdmFyIHRhcmdldCA9ICQoZHJvcGRvd24uZGF0YShcInRhcmdldFwiKSk7XG5cbiAgICAgIGlmIChkcm9wZG93bi5sZW5ndGggJiYgdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNzcyhkcm9wZG93biwgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY3NzIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQpIHtcbiAgICAgIHZhciBsZWZ0X29mZnNldCA9IE1hdGgubWF4KCh0YXJnZXQud2lkdGgoKSAtIGRyb3Bkb3duLndpZHRoKCkpIC8gMiwgOCksXG4gICAgICAgICAgc2V0dGluZ3MgPSB0YXJnZXQuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpIHx8IHRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgcGFyZW50T3ZlcmZsb3cgPSBkcm9wZG93bi5wYXJlbnQoKS5jc3MoJ292ZXJmbG93LXknKSB8fCBkcm9wZG93bi5wYXJlbnQoKS5jc3MoJ292ZXJmbG93Jyk7XG5cbiAgICAgIHRoaXMuY2xlYXJfaWR4KCk7XG5cblxuXG4gICAgICBpZiAodGhpcy5zbWFsbCgpKSB7XG4gICAgICAgIHZhciBwID0gdGhpcy5kaXJzLmJvdHRvbS5jYWxsKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKTtcblxuICAgICAgICBkcm9wZG93bi5hdHRyKCdzdHlsZScsICcnKS5yZW1vdmVDbGFzcygnZHJvcC1sZWZ0IGRyb3AtcmlnaHQgZHJvcC10b3AnKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICB3aWR0aCA6ICc5NSUnLFxuICAgICAgICAgICdtYXgtd2lkdGgnIDogJ25vbmUnLFxuICAgICAgICAgIHRvcCA6IHAudG9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRyb3Bkb3duLmNzcyhGb3VuZGF0aW9uLnJ0bCA/ICdyaWdodCcgOiAnbGVmdCcsIGxlZnRfb2Zmc2V0KTtcbiAgICAgIH1cbiAgICAgIC8vIGRldGVjdCBpZiBkcm9wZG93biBpcyBpbiBhbiBvdmVyZmxvdyBjb250YWluZXJcbiAgICAgIGVsc2UgaWYgKHBhcmVudE92ZXJmbG93ICE9PSAndmlzaWJsZScpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRhcmdldFswXS5vZmZzZXRUb3AgKyB0YXJnZXRbMF0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGRyb3Bkb3duLmF0dHIoJ3N0eWxlJywgJycpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb24gOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcCA6IG9mZnNldFxuICAgICAgICB9KTtcblxuICAgICAgICBkcm9wZG93bi5jc3MoRm91bmRhdGlvbi5ydGwgPyAncmlnaHQnIDogJ2xlZnQnLCBsZWZ0X29mZnNldCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcblxuICAgICAgICB0aGlzLnN0eWxlKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3Bkb3duO1xuICAgIH0sXG5cbiAgICBzdHlsZSA6IGZ1bmN0aW9uIChkcm9wZG93biwgdGFyZ2V0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGNzcyA9ICQuZXh0ZW5kKHtwb3NpdGlvbiA6ICdhYnNvbHV0ZSd9LFxuICAgICAgICB0aGlzLmRpcnNbc2V0dGluZ3MuYWxpZ25dLmNhbGwoZHJvcGRvd24sIHRhcmdldCwgc2V0dGluZ3MpKTtcblxuICAgICAgZHJvcGRvd24uYXR0cignc3R5bGUnLCAnJykuY3NzKGNzcyk7XG4gICAgfSxcblxuICAgIC8vIHJldHVybiBDU1MgcHJvcGVydHkgb2JqZWN0XG4gICAgLy8gYHRoaXNgIGlzIHRoZSBkcm9wZG93blxuICAgIGRpcnMgOiB7XG4gICAgICAvLyBDYWxjdWxhdGUgdGFyZ2V0IG9mZnNldFxuICAgICAgX2Jhc2UgOiBmdW5jdGlvbiAodCkge1xuICAgICAgICB2YXIgb19wID0gdGhpcy5vZmZzZXRQYXJlbnQoKSxcbiAgICAgICAgICAgIG8gPSBvX3Aub2Zmc2V0KCksXG4gICAgICAgICAgICBwID0gdC5vZmZzZXQoKTtcblxuICAgICAgICBwLnRvcCAtPSBvLnRvcDtcbiAgICAgICAgcC5sZWZ0IC09IG8ubGVmdDtcblxuICAgICAgICAvL3NldCBzb21lIGZsYWdzIG9uIHRoZSBwIG9iamVjdCB0byBwYXNzIGFsb25nXG4gICAgICAgIHAubWlzc1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHAubWlzc1RvcCA9IGZhbHNlO1xuICAgICAgICBwLm1pc3NMZWZ0ID0gZmFsc2U7XG4gICAgICAgIHAubGVmdFJpZ2h0RmxhZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vbGV0cyBzZWUgaWYgdGhlIHBhbmVsIHdpbGwgYmUgb2ZmIHRoZSBzY3JlZW5cbiAgICAgICAgLy9nZXQgdGhlIGFjdHVhbCB3aWR0aCBvZiB0aGUgcGFnZSBhbmQgc3RvcmUgaXRcbiAgICAgICAgdmFyIGFjdHVhbEJvZHlXaWR0aDtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JvdycpWzBdKSB7XG4gICAgICAgICAgYWN0dWFsQm9keVdpZHRoID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncm93JylbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0dWFsQm9keVdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0dWFsTWFyZ2luV2lkdGggPSAod2luZG93LmlubmVyV2lkdGggLSBhY3R1YWxCb2R5V2lkdGgpIC8gMjtcbiAgICAgICAgdmFyIGFjdHVhbEJvdW5kYXJ5ID0gYWN0dWFsQm9keVdpZHRoO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNDbGFzcygnbWVnYScpKSB7XG4gICAgICAgICAgLy9taXNzIHRvcFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLnRvcCA8PSB0aGlzLm91dGVySGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIHAubWlzc1RvcCA9IHRydWU7XG4gICAgICAgICAgICBhY3R1YWxCb3VuZGFyeSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gYWN0dWFsTWFyZ2luV2lkdGg7XG4gICAgICAgICAgICBwLmxlZnRSaWdodEZsYWcgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vbWlzcyByaWdodFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLmxlZnQgKyB0aGlzLm91dGVyV2lkdGgoKSA+IHQub2Zmc2V0KCkubGVmdCArIGFjdHVhbE1hcmdpbldpZHRoICYmIHQub2Zmc2V0KCkubGVmdCAtIGFjdHVhbE1hcmdpbldpZHRoID4gdGhpcy5vdXRlcldpZHRoKCkpIHtcbiAgICAgICAgICAgIHAubWlzc1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHAubWlzc0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL21pc3MgbGVmdFxuICAgICAgICAgIGlmICh0Lm9mZnNldCgpLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSA8PSAwKSB7XG4gICAgICAgICAgICBwLm1pc3NMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHAubWlzc1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9LFxuXG4gICAgICB0b3AgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bixcbiAgICAgICAgICAgIHAgPSBzZWxmLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICB0aGlzLmFkZENsYXNzKCdkcm9wLXRvcCcpO1xuXG4gICAgICAgIGlmIChwLm1pc3NUb3AgPT0gdHJ1ZSkge1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCkgKyB0aGlzLm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC10b3AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Lm91dGVyV2lkdGgoKSA8IHRoaXMub3V0ZXJXaWR0aCgpIHx8IHNlbGYuc21hbGwoKSB8fCB0aGlzLmhhc0NsYXNzKHMubWVnYV9tZW51KSkge1xuICAgICAgICAgIHNlbGYuYWRqdXN0X3BpcCh0aGlzLCB0LCBzLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChGb3VuZGF0aW9uLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCksXG4gICAgICAgICAgICB0b3AgOiBwLnRvcCAtIHRoaXMub3V0ZXJIZWlnaHQoKX07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQsIHRvcCA6IHAudG9wIC0gdGhpcy5vdXRlckhlaWdodCgpfTtcbiAgICAgIH0sXG5cbiAgICAgIGJvdHRvbSA6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIHZhciBzZWxmID0gRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duLFxuICAgICAgICAgICAgcCA9IHNlbGYuZGlycy5fYmFzZS5jYWxsKHRoaXMsIHQpO1xuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCkgKyB0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0Lm91dGVyV2lkdGgoKSA8IHRoaXMub3V0ZXJXaWR0aCgpIHx8IHNlbGYuc21hbGwoKSB8fCB0aGlzLmhhc0NsYXNzKHMubWVnYV9tZW51KSkge1xuICAgICAgICAgIHNlbGYuYWRqdXN0X3BpcCh0aGlzLCB0LCBzLCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLnJ0bCkge1xuICAgICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCAtIHRoaXMub3V0ZXJXaWR0aCgpICsgdC5vdXRlcldpZHRoKCksIHRvcCA6IHAudG9wICsgdC5vdXRlckhlaWdodCgpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7bGVmdCA6IHAubGVmdCwgdG9wIDogcC50b3AgKyB0Lm91dGVySGVpZ2h0KCl9O1xuICAgICAgfSxcblxuICAgICAgbGVmdCA6IGZ1bmN0aW9uICh0LCBzKSB7XG4gICAgICAgIHZhciBwID0gRm91bmRhdGlvbi5saWJzLmRyb3Bkb3duLmRpcnMuX2Jhc2UuY2FsbCh0aGlzLCB0KTtcblxuICAgICAgICB0aGlzLmFkZENsYXNzKCdkcm9wLWxlZnQnKTtcblxuICAgICAgICBpZiAocC5taXNzTGVmdCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gIHAubGVmdCArIHRoaXMub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgIHAudG9wID0gcC50b3AgKyB0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZHJvcC1sZWZ0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgLSB0aGlzLm91dGVyV2lkdGgoKSwgdG9wIDogcC50b3B9O1xuICAgICAgfSxcblxuICAgICAgcmlnaHQgOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICB2YXIgcCA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bi5kaXJzLl9iYXNlLmNhbGwodGhpcywgdCk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGFzcygnZHJvcC1yaWdodCcpO1xuXG4gICAgICAgIGlmIChwLm1pc3NSaWdodCA9PSB0cnVlKSB7XG4gICAgICAgICAgcC5sZWZ0ID0gcC5sZWZ0IC0gdGhpcy5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgcC50b3AgPSBwLnRvcCArIHQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcm9wLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC50cmlnZ2VyZWRSaWdodCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IEZvdW5kYXRpb24ubGlicy5kcm9wZG93bjtcblxuICAgICAgICBpZiAodC5vdXRlcldpZHRoKCkgPCB0aGlzLm91dGVyV2lkdGgoKSB8fCBzZWxmLnNtYWxsKCkgfHwgdGhpcy5oYXNDbGFzcyhzLm1lZ2FfbWVudSkpIHtcbiAgICAgICAgICBzZWxmLmFkanVzdF9waXAodGhpcywgdCwgcywgcCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge2xlZnQgOiBwLmxlZnQgKyB0Lm91dGVyV2lkdGgoKSwgdG9wIDogcC50b3B9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJbnNlcnQgcnVsZSB0byBzdHlsZSBwc3VlZG8gZWxlbWVudHNcbiAgICBhZGp1c3RfcGlwIDogZnVuY3Rpb24gKGRyb3Bkb3duLCB0YXJnZXQsIHNldHRpbmdzLCBwb3NpdGlvbikge1xuICAgICAgdmFyIHNoZWV0ID0gRm91bmRhdGlvbi5zdHlsZXNoZWV0LFxuICAgICAgICAgIHBpcF9vZmZzZXRfYmFzZSA9IDg7XG5cbiAgICAgIGlmIChkcm9wZG93bi5oYXNDbGFzcyhzZXR0aW5ncy5tZWdhX2NsYXNzKSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSBwb3NpdGlvbi5sZWZ0ICsgKHRhcmdldC5vdXRlcldpZHRoKCkgLyAyKSAtIDg7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc21hbGwoKSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgKz0gcG9zaXRpb24ubGVmdCAtIDg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucnVsZV9pZHggPSBzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG5cbiAgICAgIC8vZGVmYXVsdFxuICAgICAgdmFyIHNlbF9iZWZvcmUgPSAnLmYtZHJvcGRvd24ub3BlbjpiZWZvcmUnLFxuICAgICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgICAgY3NzX2JlZm9yZSA9ICdsZWZ0OiAnICsgcGlwX29mZnNldF9iYXNlICsgJ3B4OycsXG4gICAgICAgICAgY3NzX2FmdGVyICA9ICdsZWZ0OiAnICsgKHBpcF9vZmZzZXRfYmFzZSAtIDEpICsgJ3B4Oyc7XG5cbiAgICAgIGlmIChwb3NpdGlvbi5taXNzUmlnaHQgPT0gdHJ1ZSkge1xuICAgICAgICBwaXBfb2Zmc2V0X2Jhc2UgPSBkcm9wZG93bi5vdXRlcldpZHRoKCkgLSAyMztcbiAgICAgICAgc2VsX2JlZm9yZSA9ICcuZi1kcm9wZG93bi5vcGVuOmJlZm9yZScsXG4gICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDogJyArIHBpcF9vZmZzZXRfYmFzZSArICdweDsnLFxuICAgICAgICBjc3NfYWZ0ZXIgID0gJ2xlZnQ6ICcgKyAocGlwX29mZnNldF9iYXNlIC0gMSkgKyAncHg7JztcbiAgICAgIH1cblxuICAgICAgLy9qdXN0IGEgY2FzZSB3aGVyZSByaWdodCBpcyBmaXJlZCwgYnV0IGl0cyBub3QgbWlzc2luZyByaWdodFxuICAgICAgaWYgKHBvc2l0aW9uLnRyaWdnZXJlZFJpZ2h0ID09IHRydWUpIHtcbiAgICAgICAgc2VsX2JlZm9yZSA9ICcuZi1kcm9wZG93bi5vcGVuOmJlZm9yZScsXG4gICAgICAgIHNlbF9hZnRlciAgPSAnLmYtZHJvcGRvd24ub3BlbjphZnRlcicsXG4gICAgICAgIGNzc19iZWZvcmUgPSAnbGVmdDotMTJweDsnLFxuICAgICAgICBjc3NfYWZ0ZXIgID0gJ2xlZnQ6LTE0cHg7JztcbiAgICAgIH1cblxuICAgICAgaWYgKHNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShbc2VsX2JlZm9yZSwgJ3snLCBjc3NfYmVmb3JlLCAnfSddLmpvaW4oJyAnKSwgdGhpcy5ydWxlX2lkeCk7XG4gICAgICAgIHNoZWV0Lmluc2VydFJ1bGUoW3NlbF9hZnRlciwgJ3snLCBjc3NfYWZ0ZXIsICd9J10uam9pbignICcpLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9iZWZvcmUsIGNzc19iZWZvcmUsIHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5hZGRSdWxlKHNlbF9hZnRlciwgY3NzX2FmdGVyLCB0aGlzLnJ1bGVfaWR4ICsgMSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSBvbGQgZHJvcGRvd24gcnVsZSBpbmRleFxuICAgIGNsZWFyX2lkeCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaGVldCA9IEZvdW5kYXRpb24uc3R5bGVzaGVldDtcblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnJ1bGVfaWR4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzaGVldC5kZWxldGVSdWxlKHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBzaGVldC5kZWxldGVSdWxlKHRoaXMucnVsZV9pZHgpO1xuICAgICAgICBkZWxldGUgdGhpcy5ydWxlX2lkeDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc21hbGwgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXMuc21hbGwpLm1hdGNoZXMgJiZcbiAgICAgICAgIW1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLm1lZGl1bSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgb2ZmIDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5TKHRoaXMuc2NvcGUpLm9mZignLmZuZHRuLmRyb3Bkb3duJyk7XG4gICAgICB0aGlzLlMoJ2h0bWwsIGJvZHknKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgICAgdGhpcy5TKHdpbmRvdykub2ZmKCcuZm5kdG4uZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuUygnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKS5vZmYoJy5mbmR0bi5kcm9wZG93bicpO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5lcXVhbGl6ZXIgPSB7XG4gICAgbmFtZSA6ICdlcXVhbGl6ZXInLFxuXG4gICAgdmVyc2lvbiA6ICc1LjMuMScsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIHVzZV90YWxsZXN0OiB0cnVlLFxuICAgICAgYmVmb3JlX2hlaWdodF9jaGFuZ2U6ICQubm9vcCxcbiAgICAgIGFmdGVyX2hlaWdodF9jaGFuZ2U6ICQubm9vcCxcbiAgICAgIGVxdWFsaXplX29uX3N0YWNrOiB0cnVlXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgRm91bmRhdGlvbi5pbmhlcml0KHRoaXMsICdpbWFnZV9sb2FkZWQnKTtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICAgIHRoaXMucmVmbG93KCk7XG4gICAgfSxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuUyh3aW5kb3cpLm9mZignLmVxdWFsaXplcicpLm9uKCdyZXNpemUuZm5kdG4uZXF1YWxpemVyJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHRoaXMucmVmbG93KCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBlcXVhbGl6ZTogZnVuY3Rpb24oZXF1YWxpemVyKSB7XG4gICAgICB2YXIgaXNTdGFja2VkID0gZmFsc2UsXG4gICAgICAgICAgdmFscyA9IGVxdWFsaXplci5maW5kKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnLXdhdGNoXTp2aXNpYmxlJyksXG4gICAgICAgICAgc2V0dGluZ3MgPSBlcXVhbGl6ZXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSsnLWluaXQnKTtcblxuICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICB2YXIgZmlyc3RUb3BPZmZzZXQgPSB2YWxzLmZpcnN0KCkub2Zmc2V0KCkudG9wO1xuICAgICAgc2V0dGluZ3MuYmVmb3JlX2hlaWdodF9jaGFuZ2UoKTtcbiAgICAgIGVxdWFsaXplci50cmlnZ2VyKCdiZWZvcmUtaGVpZ2h0LWNoYW5nZScpLnRyaWdnZXIoJ2JlZm9yZS1oZWlnaHQtY2hhbmdlLmZuZHRoLmVxdWFsaXplcicpO1xuICAgICAgdmFscy5oZWlnaHQoJ2luaGVyaXQnKTtcblxuICAgICAgdmFyIGhlaWdodHMgPSB2YWxzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gJCh0aGlzKS5vdXRlckhlaWdodChmYWxzZSkgfSkuZ2V0KCk7XG5cbiAgICAgIGlmIChzZXR0aW5ncy51c2VfdGFsbGVzdCkge1xuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaGVpZ2h0cyk7XG4gICAgICAgIHZhbHMuY3NzKCdoZWlnaHQnLCBtYXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIGhlaWdodHMpO1xuICAgICAgICB2YWxzLmNzcygnaGVpZ2h0JywgbWluKTtcbiAgICAgIH1cbiAgICAgIHNldHRpbmdzLmFmdGVyX2hlaWdodF9jaGFuZ2UoKTtcbiAgICAgIGVxdWFsaXplci50cmlnZ2VyKCdhZnRlci1oZWlnaHQtY2hhbmdlJykudHJpZ2dlcignYWZ0ZXItaGVpZ2h0LWNoYW5nZS5mbmR0bi5lcXVhbGl6ZXInKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLlMoJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddJywgdGhpcy5zY29wZSkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJGVxX3RhcmdldCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYuaW1hZ2VfbG9hZGVkKHNlbGYuUygnaW1nJywgdGhpcyksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgc2VsZi5lcXVhbGl6ZSgkZXFfdGFyZ2V0KVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pKGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpO1xuXG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIEZvdW5kYXRpb24ubGlicy5vZmZjYW52YXMgPSB7XG4gICAgbmFtZSA6ICdvZmZjYW52YXMnLFxuXG4gICAgdmVyc2lvbiA6ICc1LjUuMicsXG5cbiAgICBzZXR0aW5ncyA6IHtcbiAgICAgIG9wZW5fbWV0aG9kIDogJ21vdmUnLFxuICAgICAgY2xvc2Vfb25fY2xpY2sgOiBmYWxzZVxuICAgIH0sXG5cbiAgICBpbml0IDogZnVuY3Rpb24gKHNjb3BlLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MobWV0aG9kLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgZXZlbnRzIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIFMgPSBzZWxmLlMsXG4gICAgICAgICAgbW92ZV9jbGFzcyA9ICcnLFxuICAgICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAnJyxcbiAgICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnJztcblxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdtb3ZlJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ21vdmUtJztcbiAgICAgICAgcmlnaHRfcG9zdGZpeCA9ICdyaWdodCc7XG4gICAgICAgIGxlZnRfcG9zdGZpeCA9ICdsZWZ0JztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5vcGVuX21ldGhvZCA9PT0gJ292ZXJsYXBfc2luZ2xlJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ29mZmNhbnZhcy1vdmVybGFwLSc7XG4gICAgICAgIHJpZ2h0X3Bvc3RmaXggPSAncmlnaHQnO1xuICAgICAgICBsZWZ0X3Bvc3RmaXggPSAnbGVmdCc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Mub3Blbl9tZXRob2QgPT09ICdvdmVybGFwJykge1xuICAgICAgICBtb3ZlX2NsYXNzID0gJ29mZmNhbnZhcy1vdmVybGFwJztcbiAgICAgIH1cblxuICAgICAgUyh0aGlzLnNjb3BlKS5vZmYoJy5vZmZjYW52YXMnKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLm9mZmNhbnZhcycsICcubGVmdC1vZmYtY2FudmFzLXRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgc2VsZi5jbGlja190b2dnbGVfY2xhc3MoZSwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgpO1xuICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLm9wZW5fbWV0aG9kICE9PSAnb3ZlcmxhcCcpIHtcbiAgICAgICAgICAgIFMoJy5sZWZ0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5sZWZ0LW9mZi1jYW52YXMtbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZWxmLmdldF9zZXR0aW5ncyhlKTtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyh0aGlzKS5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jbG9zZV9vbl9jbGljayAmJiAhcGFyZW50Lmhhc0NsYXNzKCdoYXMtc3VibWVudScpICYmICFwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgc2VsZi5oaWRlLmNhbGwoc2VsZiwgbW92ZV9jbGFzcyArIHJpZ2h0X3Bvc3RmaXgsIHNlbGYuZ2V0X3dyYXBwZXIoZSkpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFModGhpcykucGFyZW50KCkuaGFzQ2xhc3MoJ2hhcy1zdWJtZW51JykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFModGhpcykuc2libGluZ3MoJy5sZWZ0LXN1Ym1lbnUnKS50b2dnbGVDbGFzcyhtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcGFyZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmxlZnQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBzZWxmLmNsaWNrX3RvZ2dsZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICBpZiAoc2VsZi5zZXR0aW5ncy5vcGVuX21ldGhvZCAhPT0gJ292ZXJsYXAnKSB7XG4gICAgICAgICAgICBTKCcucmlnaHQtc3VibWVudScpLnJlbW92ZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcucmlnaHQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi5vZmZjYW52YXMnLCAnLnJpZ2h0LW9mZi1jYW52YXMtbWVudSBhJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZWxmLmdldF9zZXR0aW5ncyhlKTtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gUyh0aGlzKS5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jbG9zZV9vbl9jbGljayAmJiAhcGFyZW50Lmhhc0NsYXNzKCdoYXMtc3VibWVudScpICYmICFwYXJlbnQuaGFzQ2xhc3MoJ2JhY2snKSkge1xuICAgICAgICAgICAgc2VsZi5oaWRlLmNhbGwoc2VsZiwgbW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCwgc2VsZi5nZXRfd3JhcHBlcihlKSk7XG4gICAgICAgICAgICBwYXJlbnQucGFyZW50KCkucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChTKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdoYXMtc3VibWVudScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBTKHRoaXMpLnNpYmxpbmdzKCcucmlnaHQtc3VibWVudScpLnRvZ2dsZUNsYXNzKG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50Lmhhc0NsYXNzKCdiYWNrJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHBhcmVudC5wYXJlbnQoKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5leGl0LW9mZi1jYW52YXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgIFMoJy5yaWdodC1zdWJtZW51JykucmVtb3ZlQ2xhc3MobW92ZV9jbGFzcyArIGxlZnRfcG9zdGZpeCk7XG4gICAgICAgICAgaWYgKHJpZ2h0X3Bvc3RmaXgpIHtcbiAgICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyByaWdodF9wb3N0Zml4KTtcbiAgICAgICAgICAgIFMoJy5sZWZ0LXN1Ym1lbnUnKS5yZW1vdmVDbGFzcyhtb3ZlX2NsYXNzICsgbGVmdF9wb3N0Zml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLnJpZ2h0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4ub2ZmY2FudmFzJywgJy5leGl0LW9mZi1jYW52YXMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHNlbGYuY2xpY2tfcmVtb3ZlX2NsYXNzKGUsIG1vdmVfY2xhc3MgKyBsZWZ0X3Bvc3RmaXgpO1xuICAgICAgICAgICQoJy5sZWZ0LW9mZi1jYW52YXMtdG9nZ2xlJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgIGlmIChyaWdodF9wb3N0Zml4KSB7XG4gICAgICAgICAgICBzZWxmLmNsaWNrX3JlbW92ZV9jbGFzcyhlLCBtb3ZlX2NsYXNzICsgcmlnaHRfcG9zdGZpeCk7XG4gICAgICAgICAgICAkKCcucmlnaHQtb2ZmLWNhbnZhcy10b2dnbGUnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKSB7XG4gICAgICAkb2ZmX2NhbnZhcyA9ICRvZmZfY2FudmFzIHx8IHRoaXMuZ2V0X3dyYXBwZXIoKTtcbiAgICAgIGlmICgkb2ZmX2NhbnZhcy5pcygnLicgKyBjbGFzc19uYW1lKSkge1xuICAgICAgICB0aGlzLmhpZGUoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdyA6IGZ1bmN0aW9uIChjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcykge1xuICAgICAgJG9mZl9jYW52YXMgPSAkb2ZmX2NhbnZhcyB8fCB0aGlzLmdldF93cmFwcGVyKCk7XG4gICAgICAkb2ZmX2NhbnZhcy50cmlnZ2VyKCdvcGVuLmZuZHRuLm9mZmNhbnZhcycpO1xuICAgICAgJG9mZl9jYW52YXMuYWRkQ2xhc3MoY2xhc3NfbmFtZSk7XG4gICAgfSxcblxuICAgIGhpZGUgOiBmdW5jdGlvbiAoY2xhc3NfbmFtZSwgJG9mZl9jYW52YXMpIHtcbiAgICAgICRvZmZfY2FudmFzID0gJG9mZl9jYW52YXMgfHwgdGhpcy5nZXRfd3JhcHBlcigpO1xuICAgICAgJG9mZl9jYW52YXMudHJpZ2dlcignY2xvc2UuZm5kdG4ub2ZmY2FudmFzJyk7XG4gICAgICAkb2ZmX2NhbnZhcy5yZW1vdmVDbGFzcyhjbGFzc19uYW1lKTtcbiAgICB9LFxuXG4gICAgY2xpY2tfdG9nZ2xlX2NsYXNzIDogZnVuY3Rpb24gKGUsIGNsYXNzX25hbWUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkb2ZmX2NhbnZhcyA9IHRoaXMuZ2V0X3dyYXBwZXIoZSk7XG4gICAgICB0aGlzLnRvZ2dsZShjbGFzc19uYW1lLCAkb2ZmX2NhbnZhcyk7XG4gICAgfSxcblxuICAgIGNsaWNrX3JlbW92ZV9jbGFzcyA6IGZ1bmN0aW9uIChlLCBjbGFzc19uYW1lKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJG9mZl9jYW52YXMgPSB0aGlzLmdldF93cmFwcGVyKGUpO1xuICAgICAgdGhpcy5oaWRlKGNsYXNzX25hbWUsICRvZmZfY2FudmFzKTtcbiAgICB9LFxuXG4gICAgZ2V0X3NldHRpbmdzIDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBvZmZjYW52YXMgID0gdGhpcy5TKGUudGFyZ2V0KS5jbG9zZXN0KCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgcmV0dXJuIG9mZmNhbnZhcy5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JykgfHwgdGhpcy5zZXR0aW5ncztcbiAgICB9LFxuXG4gICAgZ2V0X3dyYXBwZXIgOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRvZmZfY2FudmFzID0gdGhpcy5TKGUgPyBlLnRhcmdldCA6IHRoaXMuc2NvcGUpLmNsb3Nlc3QoJy5vZmYtY2FudmFzLXdyYXAnKTtcblxuICAgICAgaWYgKCRvZmZfY2FudmFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkb2ZmX2NhbnZhcyA9IHRoaXMuUygnLm9mZi1jYW52YXMtd3JhcCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICRvZmZfY2FudmFzO1xuICAgIH0sXG5cbiAgICByZWZsb3cgOiBmdW5jdGlvbiAoKSB7fVxuICB9O1xufShqUXVlcnksIHdpbmRvdywgd2luZG93LmRvY3VtZW50KSk7XG4iLCI7KGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBub29wID0gZnVuY3Rpb24gKCkge307XG5cbiAgdmFyIE9yYml0ID0gZnVuY3Rpb24gKGVsLCBzZXR0aW5ncykge1xuICAgIC8vIERvbid0IHJlaW5pdGlhbGl6ZSBwbHVnaW5cbiAgICBpZiAoZWwuaGFzQ2xhc3Moc2V0dGluZ3Muc2xpZGVzX2NvbnRhaW5lcl9jbGFzcykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBzbGlkZXNfY29udGFpbmVyID0gZWwsXG4gICAgICAgIG51bWJlcl9jb250YWluZXIsXG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLFxuICAgICAgICB0aW1lcl9jb250YWluZXIsXG4gICAgICAgIGlkeCA9IDAsXG4gICAgICAgIGFuaW1hdGUsXG4gICAgICAgIHRpbWVyLFxuICAgICAgICBsb2NrZWQgPSBmYWxzZSxcbiAgICAgICAgYWRqdXN0X2hlaWdodF9hZnRlciA9IGZhbHNlO1xuXG4gICAgc2VsZi5zbGlkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2xpZGVzX2NvbnRhaW5lci5jaGlsZHJlbihzZXR0aW5ncy5zbGlkZV9zZWxlY3Rvcik7XG4gICAgfTtcblxuICAgIHNlbGYuc2xpZGVzKCkuZmlyc3QoKS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVfc2xpZGVfY2xhc3MpO1xuXG4gICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICBpZiAoc2V0dGluZ3Muc2xpZGVfbnVtYmVyKSB7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuZmluZCgnc3BhbjpmaXJzdCcpLnRleHQocGFyc2VJbnQoaW5kZXgpICsgMSk7XG4gICAgICAgIG51bWJlcl9jb250YWluZXIuZmluZCgnc3BhbjpsYXN0JykudGV4dChzZWxmLnNsaWRlcygpLmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBpZiAoc2V0dGluZ3MuYnVsbGV0cykge1xuICAgICAgICBidWxsZXRzX2NvbnRhaW5lci5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICAgICAgJChidWxsZXRzX2NvbnRhaW5lci5jaGlsZHJlbigpLmdldChpbmRleCkpLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfYWN0aXZlX2NsYXNzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi51cGRhdGVfYWN0aXZlX2xpbmsgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHZhciBsaW5rID0gJCgnW2RhdGEtb3JiaXQtbGluaz1cIicgKyBzZWxmLnNsaWRlcygpLmVxKGluZGV4KS5hdHRyKCdkYXRhLW9yYml0LXNsaWRlJykgKyAnXCJdJyk7XG4gICAgICBsaW5rLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYnVsbGV0c19hY3RpdmVfY2xhc3MpO1xuICAgICAgbGluay5hZGRDbGFzcyhzZXR0aW5ncy5idWxsZXRzX2FjdGl2ZV9jbGFzcyk7XG4gICAgfTtcblxuICAgIHNlbGYuYnVpbGRfbWFya3VwID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2xpZGVzX2NvbnRhaW5lci53cmFwKCc8ZGl2IGNsYXNzPVwiJyArIHNldHRpbmdzLmNvbnRhaW5lcl9jbGFzcyArICdcIj48L2Rpdj4nKTtcbiAgICAgIGNvbnRhaW5lciA9IHNsaWRlc19jb250YWluZXIucGFyZW50KCk7XG4gICAgICBzbGlkZXNfY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MpO1xuXG4gICAgICBpZiAoc2V0dGluZ3Muc3RhY2tfb25fc21hbGwpIHtcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKHNldHRpbmdzLnN0YWNrX29uX3NtYWxsX2NsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLm5hdmlnYXRpb25fYXJyb3dzKSB7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoJCgnPGEgaHJlZj1cIiNcIj48c3Bhbj48L3NwYW4+PC9hPicpLmFkZENsYXNzKHNldHRpbmdzLnByZXZfY2xhc3MpKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCgkKCc8YSBocmVmPVwiI1wiPjxzcGFuPjwvc3Bhbj48L2E+JykuYWRkQ2xhc3Moc2V0dGluZ3MubmV4dF9jbGFzcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MudGltZXIpIHtcbiAgICAgICAgdGltZXJfY29udGFpbmVyID0gJCgnPGRpdj4nKS5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9jb250YWluZXJfY2xhc3MpO1xuICAgICAgICB0aW1lcl9jb250YWluZXIuYXBwZW5kKCc8c3Bhbj4nKTtcbiAgICAgICAgdGltZXJfY29udGFpbmVyLmFwcGVuZCgkKCc8ZGl2PicpLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3Byb2dyZXNzX2NsYXNzKSk7XG4gICAgICAgIHRpbWVyX2NvbnRhaW5lci5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKHRpbWVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5zbGlkZV9udW1iZXIpIHtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lciA9ICQoJzxkaXY+JykuYWRkQ2xhc3Moc2V0dGluZ3Muc2xpZGVfbnVtYmVyX2NsYXNzKTtcbiAgICAgICAgbnVtYmVyX2NvbnRhaW5lci5hcHBlbmQoJzxzcGFuPjwvc3Bhbj4gJyArIHNldHRpbmdzLnNsaWRlX251bWJlcl90ZXh0ICsgJyA8c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQobnVtYmVyX2NvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5idWxsZXRzKSB7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyID0gJCgnPG9sPicpLmFkZENsYXNzKHNldHRpbmdzLmJ1bGxldHNfY29udGFpbmVyX2NsYXNzKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChidWxsZXRzX2NvbnRhaW5lcik7XG4gICAgICAgIGJ1bGxldHNfY29udGFpbmVyLndyYXAoJzxkaXYgY2xhc3M9XCJvcmJpdC1idWxsZXRzLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24gKGlkeCwgZWwpIHtcbiAgICAgICAgICB2YXIgYnVsbGV0ID0gJCgnPGxpPicpLmF0dHIoJ2RhdGEtb3JiaXQtc2xpZGUnLCBpZHgpLm9uKCdjbGljaycsIHNlbGYubGlua19idWxsZXQpOztcbiAgICAgICAgICBidWxsZXRzX2NvbnRhaW5lci5hcHBlbmQoYnVsbGV0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9O1xuXG4gICAgc2VsZi5fZ290byA9IGZ1bmN0aW9uIChuZXh0X2lkeCwgc3RhcnRfdGltZXIpIHtcbiAgICAgIC8vIGlmIChsb2NrZWQpIHtyZXR1cm4gZmFsc2U7fVxuICAgICAgaWYgKG5leHRfaWR4ID09PSBpZHgpIHtyZXR1cm4gZmFsc2U7fVxuICAgICAgaWYgKHR5cGVvZiB0aW1lciA9PT0gJ29iamVjdCcpIHt0aW1lci5yZXN0YXJ0KCk7fVxuICAgICAgdmFyIHNsaWRlcyA9IHNlbGYuc2xpZGVzKCk7XG5cbiAgICAgIHZhciBkaXIgPSAnbmV4dCc7XG4gICAgICBsb2NrZWQgPSB0cnVlO1xuICAgICAgaWYgKG5leHRfaWR4IDwgaWR4KSB7ZGlyID0gJ3ByZXYnO31cbiAgICAgIGlmIChuZXh0X2lkeCA+PSBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmICghc2V0dGluZ3MuY2lyY3VsYXIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dF9pZHggPSAwO1xuICAgICAgfSBlbHNlIGlmIChuZXh0X2lkeCA8IDApIHtcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5jaXJjdWxhcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0X2lkeCA9IHNsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudCA9ICQoc2xpZGVzLmdldChpZHgpKTtcbiAgICAgIHZhciBuZXh0ID0gJChzbGlkZXMuZ2V0KG5leHRfaWR4KSk7XG5cbiAgICAgIGN1cnJlbnQuY3NzKCd6SW5kZXgnLCAyKTtcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYWN0aXZlX3NsaWRlX2NsYXNzKTtcbiAgICAgIG5leHQuY3NzKCd6SW5kZXgnLCA0KS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVfc2xpZGVfY2xhc3MpO1xuXG4gICAgICBzbGlkZXNfY29udGFpbmVyLnRyaWdnZXIoJ2JlZm9yZS1zbGlkZS1jaGFuZ2UuZm5kdG4ub3JiaXQnKTtcbiAgICAgIHNldHRpbmdzLmJlZm9yZV9zbGlkZV9jaGFuZ2UoKTtcbiAgICAgIHNlbGYudXBkYXRlX2FjdGl2ZV9saW5rKG5leHRfaWR4KTtcblxuICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlkeCA9IG5leHRfaWR4O1xuICAgICAgICAgIGxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmIChzdGFydF90aW1lciA9PT0gdHJ1ZSkge3RpbWVyID0gc2VsZi5jcmVhdGVfdGltZXIoKTsgdGltZXIuc3RhcnQoKTt9XG4gICAgICAgICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyKGlkeCk7XG4gICAgICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdhZnRlci1zbGlkZS1jaGFuZ2UuZm5kdG4ub3JiaXQnLCBbe3NsaWRlX251bWJlciA6IGlkeCwgdG90YWxfc2xpZGVzIDogc2xpZGVzLmxlbmd0aH1dKTtcbiAgICAgICAgICBzZXR0aW5ncy5hZnRlcl9zbGlkZV9jaGFuZ2UoaWR4LCBzbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHNsaWRlc19jb250YWluZXIub3V0ZXJIZWlnaHQoKSAhPSBuZXh0Lm91dGVySGVpZ2h0KCkgJiYgc2V0dGluZ3MudmFyaWFibGVfaGVpZ2h0KSB7XG4gICAgICAgICAgc2xpZGVzX2NvbnRhaW5lci5hbmltYXRlKHsnaGVpZ2h0JzogbmV4dC5vdXRlckhlaWdodCgpfSwgMjUwLCAnbGluZWFyJywgdW5sb2NrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1bmxvY2soKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKHNsaWRlcy5sZW5ndGggPT09IDEpIHtjYWxsYmFjaygpOyByZXR1cm4gZmFsc2U7fVxuXG4gICAgICB2YXIgc3RhcnRfYW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZGlyID09PSAnbmV4dCcpIHthbmltYXRlLm5leHQoY3VycmVudCwgbmV4dCwgY2FsbGJhY2spO31cbiAgICAgICAgaWYgKGRpciA9PT0gJ3ByZXYnKSB7YW5pbWF0ZS5wcmV2KGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKTt9XG4gICAgICB9O1xuXG4gICAgICBpZiAobmV4dC5vdXRlckhlaWdodCgpID4gc2xpZGVzX2NvbnRhaW5lci5vdXRlckhlaWdodCgpICYmIHNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICBzbGlkZXNfY29udGFpbmVyLmFuaW1hdGUoeydoZWlnaHQnOiBuZXh0Lm91dGVySGVpZ2h0KCl9LCAyNTAsICdsaW5lYXInLCBzdGFydF9hbmltYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRfYW5pbWF0aW9uKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYubmV4dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgc2VsZi5fZ290byhpZHggKyAxKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wcmV2ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzZWxmLl9nb3RvKGlkeCAtIDEpO1xuICAgIH07XG5cbiAgICBzZWxmLmxpbmtfY3VzdG9tID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5hdHRyKCdkYXRhLW9yYml0LWxpbmsnKTtcbiAgICAgIGlmICgodHlwZW9mIGxpbmsgPT09ICdzdHJpbmcnKSAmJiAobGluayA9ICQudHJpbShsaW5rKSkgIT0gJycpIHtcbiAgICAgICAgdmFyIHNsaWRlID0gY29udGFpbmVyLmZpbmQoJ1tkYXRhLW9yYml0LXNsaWRlPScgKyBsaW5rICsgJ10nKTtcbiAgICAgICAgaWYgKHNsaWRlLmluZGV4KCkgIT0gLTEpIHtzZWxmLl9nb3RvKHNsaWRlLmluZGV4KCkpO31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5saW5rX2J1bGxldCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtb3JiaXQtc2xpZGUnKTtcbiAgICAgIGlmICgodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykgJiYgKGluZGV4ID0gJC50cmltKGluZGV4KSkgIT0gJycpIHtcbiAgICAgICAgaWYgKGlzTmFOKHBhcnNlSW50KGluZGV4KSkpIHtcbiAgICAgICAgICB2YXIgc2xpZGUgPSBjb250YWluZXIuZmluZCgnW2RhdGEtb3JiaXQtc2xpZGU9JyArIGluZGV4ICsgJ10nKTtcbiAgICAgICAgICBpZiAoc2xpZGUuaW5kZXgoKSAhPSAtMSkge3NlbGYuX2dvdG8oc2xpZGUuaW5kZXgoKSArIDEpO31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLl9nb3RvKHBhcnNlSW50KGluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHNlbGYudGltZXJfY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLl9nb3RvKGlkeCArIDEsIHRydWUpO1xuICAgIH1cblxuICAgIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSAkKHNlbGYuc2xpZGVzKCkuZ2V0KGlkeCkpO1xuICAgICAgdmFyIGggPSBjdXJyZW50Lm91dGVySGVpZ2h0KCk7XG4gICAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlX2hlaWdodCkge1xuICAgICAgICBzZWxmLnNsaWRlcygpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5vdXRlckhlaWdodCgpID4gaCkgeyBoID0gJCh0aGlzKS5vdXRlckhlaWdodCgpOyB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc2xpZGVzX2NvbnRhaW5lci5oZWlnaHQoaCk7XG4gICAgfTtcblxuICAgIHNlbGYuY3JlYXRlX3RpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHQgPSBuZXcgVGltZXIoXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcuJyArIHNldHRpbmdzLnRpbWVyX2NvbnRhaW5lcl9jbGFzcyksXG4gICAgICAgIHNldHRpbmdzLFxuICAgICAgICBzZWxmLnRpbWVyX2NhbGxiYWNrXG4gICAgICApO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcblxuICAgIHNlbGYuc3RvcF90aW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRpbWVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi50b2dnbGVfdGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdCA9IGNvbnRhaW5lci5maW5kKCcuJyArIHNldHRpbmdzLnRpbWVyX2NvbnRhaW5lcl9jbGFzcyk7XG4gICAgICBpZiAodC5oYXNDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICd1bmRlZmluZWQnKSB7dGltZXIgPSBzZWxmLmNyZWF0ZV90aW1lcigpO31cbiAgICAgICAgdGltZXIuc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGltZXIgPT09ICdvYmplY3QnKSB7dGltZXIuc3RvcCgpO31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5idWlsZF9tYXJrdXAoKTtcbiAgICAgIGlmIChzZXR0aW5ncy50aW1lcikge1xuICAgICAgICB0aW1lciA9IHNlbGYuY3JlYXRlX3RpbWVyKCk7XG4gICAgICAgIEZvdW5kYXRpb24udXRpbHMuaW1hZ2VfbG9hZGVkKHRoaXMuc2xpZGVzKCkuY2hpbGRyZW4oJ2ltZycpLCB0aW1lci5zdGFydCk7XG4gICAgICB9XG4gICAgICBhbmltYXRlID0gbmV3IEZhZGVBbmltYXRpb24oc2V0dGluZ3MsIHNsaWRlc19jb250YWluZXIpO1xuICAgICAgaWYgKHNldHRpbmdzLmFuaW1hdGlvbiA9PT0gJ3NsaWRlJykge1xuICAgICAgICBhbmltYXRlID0gbmV3IFNsaWRlQW5pbWF0aW9uKHNldHRpbmdzLCBzbGlkZXNfY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLm5leHRfY2xhc3MsIHNlbGYubmV4dCk7XG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy4nICsgc2V0dGluZ3MucHJldl9jbGFzcywgc2VsZi5wcmV2KTtcblxuICAgICAgaWYgKHNldHRpbmdzLm5leHRfb25fY2xpY2spIHtcbiAgICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLnNsaWRlc19jb250YWluZXJfY2xhc3MgKyAnIFtkYXRhLW9yYml0LXNsaWRlXScsIHNlbGYubGlua19idWxsZXQpO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIub24oJ2NsaWNrJywgc2VsZi50b2dnbGVfdGltZXIpO1xuICAgICAgaWYgKHNldHRpbmdzLnN3aXBlKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbigndG91Y2hzdGFydC5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKCFlLnRvdWNoZXMpIHtlID0gZS5vcmlnaW5hbEV2ZW50O31cbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHN0YXJ0X3BhZ2VfeCA6IGUudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgIHN0YXJ0X3BhZ2VfeSA6IGUudG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgIHN0YXJ0X3RpbWUgOiAobmV3IERhdGUoKSkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgZGVsdGFfeCA6IDAsXG4gICAgICAgICAgICBpc19zY3JvbGxpbmcgOiB1bmRlZmluZWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzd2lwZS10cmFuc2l0aW9uJywgZGF0YSk7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCd0b3VjaG1vdmUuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmICghZS50b3VjaGVzKSB7XG4gICAgICAgICAgICBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZ25vcmUgcGluY2gvem9vbSBldmVudHNcbiAgICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZS5zY2FsZSAmJiBlLnNjYWxlICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRhdGEgPSBjb250YWluZXIuZGF0YSgnc3dpcGUtdHJhbnNpdGlvbicpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtkYXRhID0ge307fVxuXG4gICAgICAgICAgZGF0YS5kZWx0YV94ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gZGF0YS5zdGFydF9wYWdlX3g7XG5cbiAgICAgICAgICBpZiAoIHR5cGVvZiBkYXRhLmlzX3Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGRhdGEuaXNfc2Nyb2xsaW5nID0gISEoIGRhdGEuaXNfc2Nyb2xsaW5nIHx8IE1hdGguYWJzKGRhdGEuZGVsdGFfeCkgPCBNYXRoLmFicyhlLnRvdWNoZXNbMF0ucGFnZVkgLSBkYXRhLnN0YXJ0X3BhZ2VfeSkgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWRhdGEuaXNfc2Nyb2xsaW5nICYmICFkYXRhLmFjdGl2ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IChkYXRhLmRlbHRhX3ggPCAwKSA/IChpZHggKyAxKSA6IChpZHggLSAxKTtcbiAgICAgICAgICAgIGRhdGEuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuX2dvdG8oZGlyZWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbigndG91Y2hlbmQuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzd2lwZS10cmFuc2l0aW9uJywge30pO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBjb250YWluZXIub24oJ21vdXNlZW50ZXIuZm5kdG4ub3JiaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoc2V0dGluZ3MudGltZXIgJiYgc2V0dGluZ3MucGF1c2Vfb25faG92ZXIpIHtcbiAgICAgICAgICBzZWxmLnN0b3BfdGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5mbmR0bi5vcmJpdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy50aW1lciAmJiBzZXR0aW5ncy5yZXN1bWVfb25fbW91c2VvdXQpIHtcbiAgICAgICAgICB0aW1lci5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLW9yYml0LWxpbmtdJywgc2VsZi5saW5rX2N1c3RvbSk7XG4gICAgICAkKHdpbmRvdykub24oJ2xvYWQgcmVzaXplJywgc2VsZi5jb21wdXRlX2RpbWVuc2lvbnMpO1xuICAgICAgRm91bmRhdGlvbi51dGlscy5pbWFnZV9sb2FkZWQodGhpcy5zbGlkZXMoKS5jaGlsZHJlbignaW1nJyksIHNlbGYuY29tcHV0ZV9kaW1lbnNpb25zKTtcbiAgICAgIEZvdW5kYXRpb24udXRpbHMuaW1hZ2VfbG9hZGVkKHRoaXMuc2xpZGVzKCkuY2hpbGRyZW4oJ2ltZycpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5wcmV2KCcuJyArIHNldHRpbmdzLnByZWxvYWRlcl9jbGFzcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgc2VsZi51cGRhdGVfc2xpZGVfbnVtYmVyKDApO1xuICAgICAgICBzZWxmLnVwZGF0ZV9hY3RpdmVfbGluaygwKTtcbiAgICAgICAgc2xpZGVzX2NvbnRhaW5lci50cmlnZ2VyKCdyZWFkeS5mbmR0bi5vcmJpdCcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdCgpO1xuICB9O1xuXG4gIHZhciBUaW1lciA9IGZ1bmN0aW9uIChlbCwgc2V0dGluZ3MsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkdXJhdGlvbiA9IHNldHRpbmdzLnRpbWVyX3NwZWVkLFxuICAgICAgICBwcm9ncmVzcyA9IGVsLmZpbmQoJy4nICsgc2V0dGluZ3MudGltZXJfcHJvZ3Jlc3NfY2xhc3MpLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgbGVmdCA9IC0xO1xuXG4gICAgdGhpcy51cGRhdGVfcHJvZ3Jlc3MgPSBmdW5jdGlvbiAodykge1xuICAgICAgdmFyIG5ld19wcm9ncmVzcyA9IHByb2dyZXNzLmNsb25lKCk7XG4gICAgICBuZXdfcHJvZ3Jlc3MuYXR0cignc3R5bGUnLCAnJyk7XG4gICAgICBuZXdfcHJvZ3Jlc3MuY3NzKCd3aWR0aCcsIHcgKyAnJScpO1xuICAgICAgcHJvZ3Jlc3MucmVwbGFjZVdpdGgobmV3X3Byb2dyZXNzKTtcbiAgICAgIHByb2dyZXNzID0gbmV3X3Byb2dyZXNzO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBlbC5hZGRDbGFzcyhzZXR0aW5ncy50aW1lcl9wYXVzZWRfY2xhc3MpO1xuICAgICAgbGVmdCA9IC0xO1xuICAgICAgc2VsZi51cGRhdGVfcHJvZ3Jlc3MoMCk7XG4gICAgfTtcblxuICAgIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWVsLmhhc0NsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcykpIHtyZXR1cm4gdHJ1ZTt9XG4gICAgICBsZWZ0ID0gKGxlZnQgPT09IC0xKSA/IGR1cmF0aW9uIDogbGVmdDtcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcyk7XG4gICAgICBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgcHJvZ3Jlc3MuYW5pbWF0ZSh7J3dpZHRoJyA6ICcxMDAlJ30sIGxlZnQsICdsaW5lYXInKTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5yZXN0YXJ0KCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9LCBsZWZ0KTtcbiAgICAgIGVsLnRyaWdnZXIoJ3RpbWVyLXN0YXJ0ZWQuZm5kdG4ub3JiaXQnKVxuICAgIH07XG5cbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZWwuaGFzQ2xhc3Moc2V0dGluZ3MudGltZXJfcGF1c2VkX2NsYXNzKSkge3JldHVybiB0cnVlO31cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGVsLmFkZENsYXNzKHNldHRpbmdzLnRpbWVyX3BhdXNlZF9jbGFzcyk7XG4gICAgICB2YXIgZW5kID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBsZWZ0ID0gbGVmdCAtIChlbmQgLSBzdGFydCk7XG4gICAgICB2YXIgdyA9IDEwMCAtICgobGVmdCAvIGR1cmF0aW9uKSAqIDEwMCk7XG4gICAgICBzZWxmLnVwZGF0ZV9wcm9ncmVzcyh3KTtcbiAgICAgIGVsLnRyaWdnZXIoJ3RpbWVyLXN0b3BwZWQuZm5kdG4ub3JiaXQnKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBTbGlkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChzZXR0aW5ncywgY29udGFpbmVyKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkO1xuICAgIHZhciBpc19ydGwgPSAoJCgnaHRtbFtkaXI9cnRsXScpLmxlbmd0aCA9PT0gMSk7XG4gICAgdmFyIG1hcmdpbiA9IGlzX3J0bCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gICAgdmFyIGFuaW1NYXJnaW4gPSB7fTtcbiAgICBhbmltTWFyZ2luW21hcmdpbl0gPSAnMCUnO1xuXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24gKGN1cnJlbnQsIG5leHQsIGNhbGxiYWNrKSB7XG4gICAgICBjdXJyZW50LmFuaW1hdGUoe21hcmdpbkxlZnQgOiAnLTEwMCUnfSwgZHVyYXRpb24pO1xuICAgICAgbmV4dC5hbmltYXRlKGFuaW1NYXJnaW4sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJlbnQuY3NzKG1hcmdpbiwgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSBmdW5jdGlvbiAoY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIGN1cnJlbnQuYW5pbWF0ZSh7bWFyZ2luTGVmdCA6ICcxMDAlJ30sIGR1cmF0aW9uKTtcbiAgICAgIHByZXYuY3NzKG1hcmdpbiwgJy0xMDAlJyk7XG4gICAgICBwcmV2LmFuaW1hdGUoYW5pbU1hcmdpbiwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudC5jc3MobWFyZ2luLCAnMTAwJScpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgRmFkZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChzZXR0aW5ncywgY29udGFpbmVyKSB7XG4gICAgdmFyIGR1cmF0aW9uID0gc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkO1xuICAgIHZhciBpc19ydGwgPSAoJCgnaHRtbFtkaXI9cnRsXScpLmxlbmd0aCA9PT0gMSk7XG4gICAgdmFyIG1hcmdpbiA9IGlzX3J0bCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG5cbiAgICB0aGlzLm5leHQgPSBmdW5jdGlvbiAoY3VycmVudCwgbmV4dCwgY2FsbGJhY2spIHtcbiAgICAgIG5leHQuY3NzKHsnbWFyZ2luJyA6ICcwJScsICdvcGFjaXR5JyA6ICcwLjAxJ30pO1xuICAgICAgbmV4dC5hbmltYXRlKHsnb3BhY2l0eScgOicxJ30sIGR1cmF0aW9uLCAnbGluZWFyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjdXJyZW50LmNzcygnbWFyZ2luJywgJzEwMCUnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSBmdW5jdGlvbiAoY3VycmVudCwgcHJldiwgY2FsbGJhY2spIHtcbiAgICAgIHByZXYuY3NzKHsnbWFyZ2luJyA6ICcwJScsICdvcGFjaXR5JyA6ICcwLjAxJ30pO1xuICAgICAgcHJldi5hbmltYXRlKHsnb3BhY2l0eScgOiAnMSd9LCBkdXJhdGlvbiwgJ2xpbmVhcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudC5jc3MoJ21hcmdpbicsICcxMDAlJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIEZvdW5kYXRpb24ubGlicyA9IEZvdW5kYXRpb24ubGlicyB8fCB7fTtcblxuICBGb3VuZGF0aW9uLmxpYnMub3JiaXQgPSB7XG4gICAgbmFtZSA6ICdvcmJpdCcsXG5cbiAgICB2ZXJzaW9uIDogJzUuNS4yJyxcblxuICAgIHNldHRpbmdzIDoge1xuICAgICAgYW5pbWF0aW9uIDogJ3NsaWRlJyxcbiAgICAgIHRpbWVyX3NwZWVkIDogMTAwMDAsXG4gICAgICBwYXVzZV9vbl9ob3ZlciA6IHRydWUsXG4gICAgICByZXN1bWVfb25fbW91c2VvdXQgOiBmYWxzZSxcbiAgICAgIG5leHRfb25fY2xpY2sgOiB0cnVlLFxuICAgICAgYW5pbWF0aW9uX3NwZWVkIDogNTAwLFxuICAgICAgc3RhY2tfb25fc21hbGwgOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRpb25fYXJyb3dzIDogdHJ1ZSxcbiAgICAgIHNsaWRlX251bWJlciA6IHRydWUsXG4gICAgICBzbGlkZV9udW1iZXJfdGV4dCA6ICdvZicsXG4gICAgICBjb250YWluZXJfY2xhc3MgOiAnb3JiaXQtY29udGFpbmVyJyxcbiAgICAgIHN0YWNrX29uX3NtYWxsX2NsYXNzIDogJ29yYml0LXN0YWNrLW9uLXNtYWxsJyxcbiAgICAgIG5leHRfY2xhc3MgOiAnb3JiaXQtbmV4dCcsXG4gICAgICBwcmV2X2NsYXNzIDogJ29yYml0LXByZXYnLFxuICAgICAgdGltZXJfY29udGFpbmVyX2NsYXNzIDogJ29yYml0LXRpbWVyJyxcbiAgICAgIHRpbWVyX3BhdXNlZF9jbGFzcyA6ICdwYXVzZWQnLFxuICAgICAgdGltZXJfcHJvZ3Jlc3NfY2xhc3MgOiAnb3JiaXQtcHJvZ3Jlc3MnLFxuICAgICAgc2xpZGVzX2NvbnRhaW5lcl9jbGFzcyA6ICdvcmJpdC1zbGlkZXMtY29udGFpbmVyJyxcbiAgICAgIHByZWxvYWRlcl9jbGFzcyA6ICdwcmVsb2FkZXInLFxuICAgICAgc2xpZGVfc2VsZWN0b3IgOiAnKicsXG4gICAgICBidWxsZXRzX2NvbnRhaW5lcl9jbGFzcyA6ICdvcmJpdC1idWxsZXRzJyxcbiAgICAgIGJ1bGxldHNfYWN0aXZlX2NsYXNzIDogJ2FjdGl2ZScsXG4gICAgICBzbGlkZV9udW1iZXJfY2xhc3MgOiAnb3JiaXQtc2xpZGUtbnVtYmVyJyxcbiAgICAgIGNhcHRpb25fY2xhc3MgOiAnb3JiaXQtY2FwdGlvbicsXG4gICAgICBhY3RpdmVfc2xpZGVfY2xhc3MgOiAnYWN0aXZlJyxcbiAgICAgIG9yYml0X3RyYW5zaXRpb25fY2xhc3MgOiAnb3JiaXQtdHJhbnNpdGlvbmluZycsXG4gICAgICBidWxsZXRzIDogdHJ1ZSxcbiAgICAgIGNpcmN1bGFyIDogdHJ1ZSxcbiAgICAgIHRpbWVyIDogdHJ1ZSxcbiAgICAgIHZhcmlhYmxlX2hlaWdodCA6IGZhbHNlLFxuICAgICAgc3dpcGUgOiB0cnVlLFxuICAgICAgYmVmb3JlX3NsaWRlX2NoYW5nZSA6IG5vb3AsXG4gICAgICBhZnRlcl9zbGlkZV9jaGFuZ2UgOiBub29wXG4gICAgfSxcblxuICAgIGluaXQgOiBmdW5jdGlvbiAoc2NvcGUsIG1ldGhvZCwgb3B0aW9ucykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5iaW5kaW5ncyhtZXRob2QsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBldmVudHMgOiBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIHZhciBvcmJpdF9pbnN0YW5jZSA9IG5ldyBPcmJpdCh0aGlzLlMoaW5zdGFuY2UpLCB0aGlzLlMoaW5zdGFuY2UpLmRhdGEoJ29yYml0LWluaXQnKSk7XG4gICAgICB0aGlzLlMoaW5zdGFuY2UpLmRhdGEodGhpcy5uYW1lICsgJy1pbnN0YW5jZScsIG9yYml0X2luc3RhbmNlKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoc2VsZi5TKHNlbGYuc2NvcGUpLmlzKCdbZGF0YS1vcmJpdF0nKSkge1xuICAgICAgICB2YXIgJGVsID0gc2VsZi5TKHNlbGYuc2NvcGUpO1xuICAgICAgICB2YXIgaW5zdGFuY2UgPSAkZWwuZGF0YShzZWxmLm5hbWUgKyAnLWluc3RhbmNlJyk7XG4gICAgICAgIGluc3RhbmNlLmNvbXB1dGVfZGltZW5zaW9ucygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5TKCdbZGF0YS1vcmJpdF0nLCBzZWxmLnNjb3BlKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsKSB7XG4gICAgICAgICAgdmFyICRlbCA9IHNlbGYuUyhlbCk7XG4gICAgICAgICAgdmFyIG9wdHMgPSBzZWxmLmRhdGFfb3B0aW9ucygkZWwpO1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9ICRlbC5kYXRhKHNlbGYubmFtZSArICctaW5zdGFuY2UnKTtcbiAgICAgICAgICBpbnN0YW5jZS5jb21wdXRlX2RpbWVuc2lvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG59KGpRdWVyeSwgd2luZG93LCB3aW5kb3cuZG9jdW1lbnQpKTtcbiIsIjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgRm91bmRhdGlvbi5saWJzLnRvcGJhciA9IHtcbiAgICBuYW1lIDogJ3RvcGJhcicsXG5cbiAgICB2ZXJzaW9uIDogJzUuNS4yJyxcblxuICAgIHNldHRpbmdzIDoge1xuICAgICAgaW5kZXggOiAwLFxuICAgICAgc3RhcnRfb2Zmc2V0IDogMCxcbiAgICAgIHN0aWNreV9jbGFzcyA6ICdzdGlja3knLFxuICAgICAgY3VzdG9tX2JhY2tfdGV4dCA6IHRydWUsXG4gICAgICBiYWNrX3RleHQgOiAnQmFjaycsXG4gICAgICBtb2JpbGVfc2hvd19wYXJlbnRfbGluayA6IHRydWUsXG4gICAgICBpc19ob3ZlciA6IHRydWUsXG4gICAgICBzY3JvbGx0b3AgOiB0cnVlLCAvLyBqdW1wIHRvIHRvcCB3aGVuIHN0aWNreSBuYXYgbWVudSB0b2dnbGUgaXMgY2xpY2tlZFxuICAgICAgc3RpY2t5X29uIDogJ2FsbCcsXG4gICAgICBkcm9wZG93bl9hdXRvY2xvc2U6IHRydWVcbiAgICB9LFxuXG4gICAgaW5pdCA6IGZ1bmN0aW9uIChzZWN0aW9uLCBtZXRob2QsIG9wdGlvbnMpIHtcbiAgICAgIEZvdW5kYXRpb24uaW5oZXJpdCh0aGlzLCAnYWRkX2N1c3RvbV9ydWxlIHJlZ2lzdGVyX21lZGlhIHRocm90dGxlJyk7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHNlbGYucmVnaXN0ZXJfbWVkaWEoJ3RvcGJhcicsICdmb3VuZGF0aW9uLW1xLXRvcGJhcicpO1xuXG4gICAgICB0aGlzLmJpbmRpbmdzKG1ldGhvZCwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYuUygnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10nLCB0aGlzLnNjb3BlKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvcGJhciA9ICQodGhpcyksXG4gICAgICAgICAgICBzZXR0aW5ncyA9IHRvcGJhci5kYXRhKHNlbGYuYXR0cl9uYW1lKHRydWUpICsgJy1pbml0JyksXG4gICAgICAgICAgICBzZWN0aW9uID0gc2VsZi5TKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJywgdGhpcyk7XG4gICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIDApO1xuICAgICAgICB2YXIgdG9wYmFyQ29udGFpbmVyID0gdG9wYmFyLnBhcmVudCgpO1xuICAgICAgICBpZiAodG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpIHx8IHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgdG9wYmFyQ29udGFpbmVyLCBzZXR0aW5ncykgKSB7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5zdGlja3lfY2xhc3MgPSBzZXR0aW5ncy5zdGlja3lfY2xhc3M7XG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5zdGlja3lfdG9wYmFyID0gdG9wYmFyO1xuICAgICAgICAgIHRvcGJhci5kYXRhKCdoZWlnaHQnLCB0b3BiYXJDb250YWluZXIub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHRvcGJhckNvbnRhaW5lci5vZmZzZXQoKS50b3ApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcGJhci5kYXRhKCdoZWlnaHQnLCB0b3BiYXIub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNldHRpbmdzLmFzc2VtYmxlZCkge1xuICAgICAgICAgIHNlbGYuYXNzZW1ibGUodG9wYmFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgIHNlbGYuUygnLmhhcy1kcm9wZG93bicsIHRvcGJhcikuYWRkQ2xhc3MoJ25vdC1jbGljaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuUygnLmhhcy1kcm9wZG93bicsIHRvcGJhcikucmVtb3ZlQ2xhc3MoJ25vdC1jbGljaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFkIGJvZHkgd2hlbiBzdGlja3kgKHNjcm9sbGVkKSBvciBmaXhlZC5cbiAgICAgICAgc2VsZi5hZGRfY3VzdG9tX3J1bGUoJy5mLXRvcGJhci1maXhlZCB7IHBhZGRpbmctdG9wOiAnICsgdG9wYmFyLmRhdGEoJ2hlaWdodCcpICsgJ3B4IH0nKTtcblxuICAgICAgICBpZiAodG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGlzX3N0aWNreSA6IGZ1bmN0aW9uICh0b3BiYXIsIHRvcGJhckNvbnRhaW5lciwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBzdGlja3kgICAgID0gdG9wYmFyQ29udGFpbmVyLmhhc0NsYXNzKHNldHRpbmdzLnN0aWNreV9jbGFzcyk7XG4gICAgICB2YXIgc21hbGxNYXRjaCA9IG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLnNtYWxsKS5tYXRjaGVzO1xuICAgICAgdmFyIG1lZE1hdGNoICAgPSBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllcy5tZWRpdW0pLm1hdGNoZXM7XG4gICAgICB2YXIgbHJnTWF0Y2ggICA9IG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzLmxhcmdlKS5tYXRjaGVzO1xuXG4gICAgICBpZiAoc3RpY2t5ICYmIHNldHRpbmdzLnN0aWNreV9vbiA9PT0gJ2FsbCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5ICYmIHRoaXMuc21hbGwoKSAmJiBzZXR0aW5ncy5zdGlja3lfb24uaW5kZXhPZignc21hbGwnKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgIW1lZE1hdGNoICYmICFscmdNYXRjaCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgaWYgKHN0aWNreSAmJiB0aGlzLm1lZGl1bSgpICYmIHNldHRpbmdzLnN0aWNreV9vbi5pbmRleE9mKCdtZWRpdW0nKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgbWVkTWF0Y2ggJiYgIWxyZ01hdGNoKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5ICYmIHRoaXMubGFyZ2UoKSAmJiBzZXR0aW5ncy5zdGlja3lfb24uaW5kZXhPZignbGFyZ2UnKSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKHNtYWxsTWF0Y2ggJiYgbWVkTWF0Y2ggJiYgbHJnTWF0Y2gpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cblxuICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlIDogZnVuY3Rpb24gKHRvZ2dsZUVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgdG9wYmFyO1xuXG4gICAgICBpZiAodG9nZ2xlRWwpIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKHRvZ2dsZUVsKS5jbG9zZXN0KCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wYmFyID0gc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICB2YXIgc2VjdGlvbiA9IHNlbGYuUygnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicsIHRvcGJhcik7XG5cbiAgICAgIGlmIChzZWxmLmJyZWFrcG9pbnQoKSkge1xuICAgICAgICBpZiAoIXNlbGYucnRsKSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe2xlZnQgOiAnMCUnfSk7XG4gICAgICAgICAgJCgnPi5uYW1lJywgc2VjdGlvbikuY3NzKHtsZWZ0IDogJzEwMCUnfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogJzAlJ30pO1xuICAgICAgICAgICQoJz4ubmFtZScsIHNlY3Rpb24pLmNzcyh7cmlnaHQgOiAnMTAwJSd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuUygnbGkubW92ZWQnLCBzZWN0aW9uKS5yZW1vdmVDbGFzcygnbW92ZWQnKTtcbiAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgMCk7XG5cbiAgICAgICAgdG9wYmFyXG4gICAgICAgICAgLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3Muc2Nyb2xsdG9wKSB7XG4gICAgICAgIGlmICghdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRvcGJhci5wYXJlbnQoKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5zY3JvbGx0b3ApIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHRvcGJhci5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgICAgIHNlbGYuUygnYm9keScpLnJlbW92ZUNsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuXG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcGJhci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZWxmLmlzX3N0aWNreSh0b3BiYXIsIHRvcGJhci5wYXJlbnQoKSwgc2V0dGluZ3MpKSB7XG4gICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcGJhci5wYXJlbnQoKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgIGlmICghdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICB0b3BiYXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICB0b3BiYXIucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZV9zdGlja3lfcG9zaXRpb25pbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9wYmFyLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgdG9wYmFyLnBhcmVudCgpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgc2VsZi5TKCdib2R5JykuYWRkQ2xhc3MoJ2YtdG9wYmFyLWZpeGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRpbWVyIDogbnVsbCxcblxuICAgIGV2ZW50cyA6IGZ1bmN0aW9uIChiYXIpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBTID0gdGhpcy5TO1xuXG4gICAgICBTKHRoaXMuc2NvcGUpXG4gICAgICAgIC5vZmYoJy50b3BiYXInKVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsICdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAudG9nZ2xlLXRvcGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlbGYudG9nZ2xlKHRoaXMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2NsaWNrLmZuZHRuLnRvcGJhciBjb250ZXh0bWVudS5mbmR0bi50b3BiYXInLCAnLnRvcC1iYXIgLnRvcC1iYXItc2VjdGlvbiBsaSBhW2hyZWZePVwiI1wiXSxbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXSAudG9wLWJhci1zZWN0aW9uIGxpIGFbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBsaSA9ICQodGhpcykuY2xvc2VzdCgnbGknKSxcbiAgICAgICAgICAgICAgICB0b3BiYXIgPSBsaS5jbG9zZXN0KCdbJyArIHNlbGYuYXR0cl9uYW1lKCkgKyAnXScpLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmRyb3Bkb3duX2F1dG9jbG9zZSAmJiBzZXR0aW5ncy5pc19ob3Zlcikge1xuICAgICAgICAgICAgICB2YXIgaG92ZXJMaSA9ICQodGhpcykuY2xvc2VzdCgnLmhvdmVyJyk7XG4gICAgICAgICAgICAgIGhvdmVyTGkucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkgJiYgIWxpLmhhc0NsYXNzKCdiYWNrJykgJiYgIWxpLmhhc0NsYXNzKCdoYXMtZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgICBzZWxmLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICAgIC5vbignY2xpY2suZm5kdG4udG9wYmFyJywgJ1snICsgdGhpcy5hdHRyX25hbWUoKSArICddIGxpLmhhcy1kcm9wZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdmFyIGxpID0gUyh0aGlzKSxcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gUyhlLnRhcmdldCksXG4gICAgICAgICAgICAgIHRvcGJhciA9IGxpLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgIHNldHRpbmdzID0gdG9wYmFyLmRhdGEoc2VsZi5hdHRyX25hbWUodHJ1ZSkgKyAnLWluaXQnKTtcblxuICAgICAgICAgIGlmICh0YXJnZXQuZGF0YSgncmV2ZWFsSWQnKSkge1xuICAgICAgICAgICAgc2VsZi50b2dnbGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MuaXNfaG92ZXIgJiYgIU1vZGVybml6ci50b3VjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBpZiAobGkuaGFzQ2xhc3MoJ2hvdmVyJykpIHtcbiAgICAgICAgICAgIGxpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaG92ZXInKVxuICAgICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGxpLnBhcmVudHMoJ2xpLmhvdmVyJylcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaS5hZGRDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgJChsaSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldFswXS5ub2RlTmFtZSA9PT0gJ0EnICYmIHRhcmdldC5wYXJlbnQoKS5oYXNDbGFzcygnaGFzLWRyb3Bkb3duJykpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLmhhcy1kcm9wZG93bj5hJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoc2VsZi5icmVha3BvaW50KCkpIHtcblxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgICAgIHRvcGJhciA9ICR0aGlzLmNsb3Nlc3QoJ1snICsgc2VsZi5hdHRyX25hbWUoKSArICddJyksXG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IHRvcGJhci5maW5kKCdzZWN0aW9uLCAudG9wLWJhci1zZWN0aW9uJyksXG4gICAgICAgICAgICAgICAgZHJvcGRvd25IZWlnaHQgPSAkdGhpcy5uZXh0KCcuZHJvcGRvd24nKS5vdXRlckhlaWdodCgpLFxuICAgICAgICAgICAgICAgICRzZWxlY3RlZExpID0gJHRoaXMuY2xvc2VzdCgnbGknKTtcblxuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ2luZGV4JywgdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAxKTtcbiAgICAgICAgICAgICRzZWxlY3RlZExpLmFkZENsYXNzKCdtb3ZlZCcpO1xuXG4gICAgICAgICAgICBpZiAoIXNlbGYucnRsKSB7XG4gICAgICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe2xlZnQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICAgICAgc2VjdGlvbi5maW5kKCc+Lm5hbWUnKS5jc3Moe3JpZ2h0IDogMTAwICogdG9wYmFyLmRhdGEoJ2luZGV4JykgKyAnJSd9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJHRoaXMuc2libGluZ3MoJ3VsJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIFMod2luZG93KS5vZmYoJy50b3BiYXInKS5vbigncmVzaXplLmZuZHRuLnRvcGJhcicsIHNlbGYudGhyb3R0bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucmVzaXplLmNhbGwoc2VsZik7XG4gICAgICB9LCA1MCkpLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKS5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgb2Zmc2V0IGlzIGNhbGN1bGF0ZWQgYWZ0ZXIgYWxsIG9mIHRoZSBwYWdlcyByZXNvdXJjZXMgaGF2ZSBsb2FkZWRcbiAgICAgICAgICBTKHRoaXMpLnRyaWdnZXIoJ3Jlc2l6ZS5mbmR0bi50b3BiYXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBTKCdib2R5Jykub2ZmKCcudG9wYmFyJykub24oJ2NsaWNrLmZuZHRuLnRvcGJhcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBTKGUudGFyZ2V0KS5jbG9zZXN0KCdsaScpLmNsb3Nlc3QoJ2xpLmhvdmVyJyk7XG5cbiAgICAgICAgaWYgKHBhcmVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgUygnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10gbGkuaG92ZXInKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHbyB1cCBhIGxldmVsIG9uIENsaWNrXG4gICAgICBTKHRoaXMuc2NvcGUpLm9uKCdjbGljay5mbmR0bi50b3BiYXInLCAnWycgKyB0aGlzLmF0dHJfbmFtZSgpICsgJ10gLmhhcy1kcm9wZG93biAuYmFjaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRoaXMgPSBTKHRoaXMpLFxuICAgICAgICAgICAgdG9wYmFyID0gJHRoaXMuY2xvc2VzdCgnWycgKyBzZWxmLmF0dHJfbmFtZSgpICsgJ10nKSxcbiAgICAgICAgICAgIHNlY3Rpb24gPSB0b3BiYXIuZmluZCgnc2VjdGlvbiwgLnRvcC1iYXItc2VjdGlvbicpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpLFxuICAgICAgICAgICAgJG1vdmVkTGkgPSAkdGhpcy5jbG9zZXN0KCdsaS5tb3ZlZCcpLFxuICAgICAgICAgICAgJHByZXZpb3VzTGV2ZWxVbCA9ICRtb3ZlZExpLnBhcmVudCgpO1xuXG4gICAgICAgIHRvcGJhci5kYXRhKCdpbmRleCcsIHRvcGJhci5kYXRhKCdpbmRleCcpIC0gMSk7XG5cbiAgICAgICAgaWYgKCFzZWxmLnJ0bCkge1xuICAgICAgICAgIHNlY3Rpb24uY3NzKHtsZWZ0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7bGVmdCA6IDEwMCAqIHRvcGJhci5kYXRhKCdpbmRleCcpICsgJyUnfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VjdGlvbi5jc3Moe3JpZ2h0IDogLSgxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSkgKyAnJSd9KTtcbiAgICAgICAgICBzZWN0aW9uLmZpbmQoJz4ubmFtZScpLmNzcyh7cmlnaHQgOiAxMDAgKiB0b3BiYXIuZGF0YSgnaW5kZXgnKSArICclJ30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvcGJhci5kYXRhKCdpbmRleCcpID09PSAwKSB7XG4gICAgICAgICAgdG9wYmFyLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcGJhci5jc3MoJ2hlaWdodCcsICRwcmV2aW91c0xldmVsVWwub3V0ZXJIZWlnaHQodHJ1ZSkgKyB0b3BiYXIuZGF0YSgnaGVpZ2h0JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJG1vdmVkTGkucmVtb3ZlQ2xhc3MoJ21vdmVkJyk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2hvdyBkcm9wZG93biBtZW51cyB3aGVuIHRoZWlyIGl0ZW1zIGFyZSBmb2N1c2VkXG4gICAgICBTKHRoaXMuc2NvcGUpLmZpbmQoJy5kcm9wZG93biBhJylcbiAgICAgICAgLmZvY3VzKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5oYXMtZHJvcGRvd24nKS5hZGRDbGFzcygnaG92ZXInKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmJsdXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykucGFyZW50cygnLmhhcy1kcm9wZG93bicpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVzaXplIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgc2VsZi5TKCdbJyArIHRoaXMuYXR0cl9uYW1lKCkgKyAnXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9wYmFyID0gc2VsZi5TKHRoaXMpLFxuICAgICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YShzZWxmLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpO1xuXG4gICAgICAgIHZhciBzdGlja3lDb250YWluZXIgPSB0b3BiYXIucGFyZW50KCcuJyArIHNlbGYuc2V0dGluZ3Muc3RpY2t5X2NsYXNzKTtcbiAgICAgICAgdmFyIHN0aWNreU9mZnNldDtcblxuICAgICAgICBpZiAoIXNlbGYuYnJlYWtwb2ludCgpKSB7XG4gICAgICAgICAgdmFyIGRvVG9nZ2xlID0gdG9wYmFyLmhhc0NsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgIHRvcGJhclxuICAgICAgICAgICAgLmNzcygnaGVpZ2h0JywgJycpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG5cbiAgICAgICAgICAgIGlmIChkb1RvZ2dsZSkge1xuICAgICAgICAgICAgICBzZWxmLnRvZ2dsZSh0b3BiYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuaXNfc3RpY2t5KHRvcGJhciwgc3RpY2t5Q29udGFpbmVyLCBzZXR0aW5ncykpIHtcbiAgICAgICAgICBpZiAoc3RpY2t5Q29udGFpbmVyLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpeGVkIHRvIGFsbG93IGZvciBjb3JyZWN0IGNhbGN1bGF0aW9uIG9mIHRoZSBvZmZzZXQuXG4gICAgICAgICAgICBzdGlja3lDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG5cbiAgICAgICAgICAgIHN0aWNreU9mZnNldCA9IHN0aWNreUNvbnRhaW5lci5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICBpZiAoc2VsZi5TKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdmLXRvcGJhci1maXhlZCcpKSB7XG4gICAgICAgICAgICAgIHN0aWNreU9mZnNldCAtPSB0b3BiYXIuZGF0YSgnaGVpZ2h0Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnLCBzdGlja3lPZmZzZXQpO1xuICAgICAgICAgICAgc3RpY2t5Q29udGFpbmVyLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGlja3lPZmZzZXQgPSBzdGlja3lDb250YWluZXIub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgdG9wYmFyLmRhdGEoJ3N0aWNreW9mZnNldCcsIHN0aWNreU9mZnNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBicmVha3BvaW50IDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1sndG9wYmFyJ10pLm1hdGNoZXM7XG4gICAgfSxcblxuICAgIHNtYWxsIDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdGNoTWVkaWEoRm91bmRhdGlvbi5tZWRpYV9xdWVyaWVzWydzbWFsbCddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBtZWRpdW0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hNZWRpYShGb3VuZGF0aW9uLm1lZGlhX3F1ZXJpZXNbJ21lZGl1bSddKS5tYXRjaGVzO1xuICAgIH0sXG5cbiAgICBsYXJnZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBtYXRjaE1lZGlhKEZvdW5kYXRpb24ubWVkaWFfcXVlcmllc1snbGFyZ2UnXSkubWF0Y2hlcztcbiAgICB9LFxuXG4gICAgYXNzZW1ibGUgOiBmdW5jdGlvbiAodG9wYmFyKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgc2V0dGluZ3MgPSB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSArICctaW5pdCcpLFxuICAgICAgICAgIHNlY3Rpb24gPSBzZWxmLlMoJ3NlY3Rpb24sIC50b3AtYmFyLXNlY3Rpb24nLCB0b3BiYXIpO1xuXG4gICAgICAvLyBQdWxsIGVsZW1lbnQgb3V0IG9mIHRoZSBET00gZm9yIG1hbmlwdWxhdGlvblxuICAgICAgc2VjdGlvbi5kZXRhY2goKTtcblxuICAgICAgc2VsZi5TKCcuaGFzLWRyb3Bkb3duPmEnLCBzZWN0aW9uKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRsaW5rID0gc2VsZi5TKHRoaXMpLFxuICAgICAgICAgICAgJGRyb3Bkb3duID0gJGxpbmsuc2libGluZ3MoJy5kcm9wZG93bicpLFxuICAgICAgICAgICAgdXJsID0gJGxpbmsuYXR0cignaHJlZicpLFxuICAgICAgICAgICAgJHRpdGxlTGk7XG5cbiAgICAgICAgaWYgKCEkZHJvcGRvd24uZmluZCgnLnRpdGxlLmJhY2snKS5sZW5ndGgpIHtcblxuICAgICAgICAgIGlmIChzZXR0aW5ncy5tb2JpbGVfc2hvd19wYXJlbnRfbGluayA9PSB0cnVlICYmIHVybCkge1xuICAgICAgICAgICAgJHRpdGxlTGkgPSAkKCc8bGkgY2xhc3M9XCJ0aXRsZSBiYWNrIGpzLWdlbmVyYXRlZFwiPjxoNT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PC9hPjwvaDU+PC9saT48bGkgY2xhc3M9XCJwYXJlbnQtbGluayBoaWRlLWZvci1tZWRpdW0tdXBcIj48YSBjbGFzcz1cInBhcmVudC1saW5rIGpzLWdlbmVyYXRlZFwiIGhyZWY9XCInICsgdXJsICsgJ1wiPicgKyAkbGluay5odG1sKCkgKyc8L2E+PC9saT4nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRpdGxlTGkgPSAkKCc8bGkgY2xhc3M9XCJ0aXRsZSBiYWNrIGpzLWdlbmVyYXRlZFwiPjxoNT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PC9hPjwvaDU+Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29weSBsaW5rIHRvIHN1Ym5hdlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5jdXN0b21fYmFja190ZXh0ID09IHRydWUpIHtcbiAgICAgICAgICAgICQoJ2g1PmEnLCAkdGl0bGVMaSkuaHRtbChzZXR0aW5ncy5iYWNrX3RleHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCdoNT5hJywgJHRpdGxlTGkpLmh0bWwoJyZsYXF1bzsgJyArICRsaW5rLmh0bWwoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICRkcm9wZG93bi5wcmVwZW5kKCR0aXRsZUxpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIFB1dCBlbGVtZW50IGJhY2sgaW4gdGhlIERPTVxuICAgICAgc2VjdGlvbi5hcHBlbmRUbyh0b3BiYXIpO1xuXG4gICAgICAvLyBjaGVjayBmb3Igc3RpY2t5XG4gICAgICB0aGlzLnN0aWNreSgpO1xuXG4gICAgICB0aGlzLmFzc2VtYmxlZCh0b3BiYXIpO1xuICAgIH0sXG5cbiAgICBhc3NlbWJsZWQgOiBmdW5jdGlvbiAodG9wYmFyKSB7XG4gICAgICB0b3BiYXIuZGF0YSh0aGlzLmF0dHJfbmFtZSh0cnVlKSwgJC5leHRlbmQoe30sIHRvcGJhci5kYXRhKHRoaXMuYXR0cl9uYW1lKHRydWUpKSwge2Fzc2VtYmxlZCA6IHRydWV9KSk7XG4gICAgfSxcblxuICAgIGhlaWdodCA6IGZ1bmN0aW9uICh1bCkge1xuICAgICAgdmFyIHRvdGFsID0gMCxcbiAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgJCgnPiBsaScsIHVsKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG90YWwgKz0gc2VsZi5TKHRoaXMpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9LFxuXG4gICAgc3RpY2t5IDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLlMod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnVwZGF0ZV9zdGlja3lfcG9zaXRpb25pbmcoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVfc3RpY2t5X3Bvc2l0aW9uaW5nIDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGtsYXNzID0gJy4nICsgdGhpcy5zZXR0aW5ncy5zdGlja3lfY2xhc3MsXG4gICAgICAgICAgJHdpbmRvdyA9IHRoaXMuUyh3aW5kb3cpLFxuICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAoc2VsZi5zZXR0aW5ncy5zdGlja3lfdG9wYmFyICYmIHNlbGYuaXNfc3RpY2t5KHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhcix0aGlzLnNldHRpbmdzLnN0aWNreV90b3BiYXIucGFyZW50KCksIHRoaXMuc2V0dGluZ3MpKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuc2V0dGluZ3Muc3RpY2t5X3RvcGJhci5kYXRhKCdzdGlja3lvZmZzZXQnKSArIHRoaXMuc2V0dGluZ3Muc3RhcnRfb2Zmc2V0O1xuICAgICAgICBpZiAoIXNlbGYuUyhrbGFzcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICBpZiAoJHdpbmRvdy5zY3JvbGxUb3AoKSA+IChkaXN0YW5jZSkpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5TKGtsYXNzKS5oYXNDbGFzcygnZml4ZWQnKSkge1xuICAgICAgICAgICAgICBzZWxmLlMoa2xhc3MpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAgICAgICBzZWxmLlMoJ2JvZHknKS5hZGRDbGFzcygnZi10b3BiYXItZml4ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCR3aW5kb3cuc2Nyb2xsVG9wKCkgPD0gZGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLlMoa2xhc3MpLmhhc0NsYXNzKCdmaXhlZCcpKSB7XG4gICAgICAgICAgICAgIHNlbGYuUyhrbGFzcykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgICAgICAgICAgIHNlbGYuUygnYm9keScpLnJlbW92ZUNsYXNzKCdmLXRvcGJhci1maXhlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBvZmYgOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLlModGhpcy5zY29wZSkub2ZmKCcuZm5kdG4udG9wYmFyJyk7XG4gICAgICB0aGlzLlMod2luZG93KS5vZmYoJy5mbmR0bi50b3BiYXInKTtcbiAgICB9LFxuXG4gICAgcmVmbG93IDogZnVuY3Rpb24gKCkge31cbiAgfTtcbn0oalF1ZXJ5LCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCkpO1xuIiwiLy8gRWFzeSBSZXNwb25zaXZlIFRhYnMgUGx1Z2luXG4vLyBBdXRob3I6IFNhbXNvbi5Pbm5hIDxFbWFpbCA6IHNhbXNvbjNkQGdtYWlsLmNvbT5cbihmdW5jdGlvbiAoJCkge1xuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgZWFzeVJlc3BvbnNpdmVUYWJzOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy9TZXQgdGhlIGRlZmF1bHQgdmFsdWVzLCB1c2UgY29tbWEgdG8gc2VwYXJhdGUgdGhlIHNldHRpbmdzLCBleGFtcGxlOlxuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdkZWZhdWx0JywgLy9kZWZhdWx0LCB2ZXJ0aWNhbCwgYWNjb3JkaW9uO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgZml0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsb3NlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCl7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9WYXJpYWJsZXNcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG9wdCA9IG9wdGlvbnMsIGp0eXBlID0gb3B0LnR5cGUsIGpmaXQgPSBvcHQuZml0LCBqd2lkdGggPSBvcHQud2lkdGgsIHZ0YWJzID0gJ3ZlcnRpY2FsJywgYWNjb3JkID0gJ2FjY29yZGlvbic7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgdmFyIGhpc3RvcnlBcGkgPSAhISh3aW5kb3cuaGlzdG9yeSAmJiBoaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vRXZlbnRzXG4gICAgICAgICAgICAkKHRoaXMpLmJpbmQoJ3RhYmFjdGl2YXRlJywgZnVuY3Rpb24oZSwgY3VycmVudFRhYikge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBvcHRpb25zLmFjdGl2YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYWN0aXZhdGUuY2FsbChjdXJyZW50VGFiLCBlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL01haW4gZnVuY3Rpb25cbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRyZXNwVGFicyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyICRyZXNwVGFic0xpc3QgPSAkcmVzcFRhYnMuZmluZCgndWwucmVzcC10YWJzLWxpc3QnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcFRhYnNJZCA9ICRyZXNwVGFicy5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCd1bC5yZXNwLXRhYnMtbGlzdCBsaScpLmFkZENsYXNzKCdyZXNwLXRhYi1pdGVtJyk7XG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogandpZHRoXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFicy1jb250YWluZXIgPiBkaXYnKS5hZGRDbGFzcygncmVzcC10YWItY29udGVudCcpO1xuICAgICAgICAgICAgICAgIGp0YWJfb3B0aW9ucygpO1xuICAgICAgICAgICAgICAgIC8vUHJvcGVydGllcyBGdW5jdGlvblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGp0YWJfb3B0aW9ucygpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGp0eXBlID09IHZ0YWJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuYWRkQ2xhc3MoJ3Jlc3AtdnRhYnMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoamZpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuY3NzKHsgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAnMHB4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoanR5cGUgPT0gYWNjb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuYWRkQ2xhc3MoJ3Jlc3AtZWFzeS1hY2NvcmRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCcucmVzcC10YWJzLWxpc3QnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9Bc3NpZ25pbmcgdGhlIGgyIG1hcmt1cCB0byBhY2NvcmRpb24gdGl0bGVcbiAgICAgICAgICAgICAgICB2YXIgJHRhYkl0ZW1oMjtcbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQnKS5iZWZvcmUoXCI8aDIgY2xhc3M9J3Jlc3AtYWNjb3JkaW9uJyByb2xlPSd0YWInPjxzcGFuIGNsYXNzPSdyZXNwLWFycm93Jz48L3NwYW4+PC9oMj5cIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtaDIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRhYkl0ZW0gPSAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWl0ZW06ZXEoJyArIGl0ZW1Db3VudCArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkYWNjSXRlbSA9ICRyZXNwVGFicy5maW5kKCcucmVzcC1hY2NvcmRpb246ZXEoJyArIGl0ZW1Db3VudCArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICRhY2NJdGVtLmFwcGVuZCgkdGFiSXRlbS5odG1sKCkpO1xuICAgICAgICAgICAgICAgICAgICAkYWNjSXRlbS5kYXRhKCR0YWJJdGVtLmRhdGEoKSk7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtaDIuYXR0cignYXJpYS1jb250cm9scycsICd0YWJfaXRlbS0nICsgKGl0ZW1Db3VudCkpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ291bnQrKztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vQXNzaWduaW5nIHRoZSAnYXJpYS1jb250cm9scycgdG8gVGFiIGl0ZW1zXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgJHRhYkNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1pdGVtJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHRhYkl0ZW0uYXR0cignYXJpYS1jb250cm9scycsICd0YWJfaXRlbS0nICsgKGNvdW50KSk7XG4gICAgICAgICAgICAgICAgICAgICR0YWJJdGVtLmF0dHIoJ3JvbGUnLCAndGFiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9Bc3NpZ25pbmcgdGhlICdhcmlhLWxhYmVsbGVkYnknIGF0dHIgdG8gdGFiLWNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50JykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFiQ29udGVudCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFiQ29udGVudC5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCAndGFiX2l0ZW0tJyArICh0YWJjb3VudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFiY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBjb3JyZWN0IGNvbnRlbnQgYXJlYVxuICAgICAgICAgICAgICAgIHZhciB0YWJOdW0gPSAwO1xuICAgICAgICAgICAgICAgIGlmKGhhc2ghPScnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gaGFzaC5tYXRjaChuZXcgUmVnRXhwKHJlc3BUYWJzSWQrXCIoWzAtOV0rKVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzIT09bnVsbCAmJiBtYXRjaGVzLmxlbmd0aD09PTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYk51bSA9IHBhcnNlSW50KG1hdGNoZXNbMV0sMTApLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFiTnVtID4gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJOdW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BY3RpdmUgY29ycmVjdCB0YWJcbiAgICAgICAgICAgICAgICAkKCRyZXNwVGFicy5maW5kKCcucmVzcC10YWItaXRlbScpW3RhYk51bV0pLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIC8va2VlcCBjbG9zZWQgaWYgb3B0aW9uID0gJ2Nsb3NlZCcgb3Igb3B0aW9uIGlzICdhY2NvcmRpb24nIGFuZCB0aGUgZWxlbWVudCBpcyBpbiBhY2NvcmRpb24gbW9kZVxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMuY2xvc2VkICE9PSB0cnVlICYmICEob3B0aW9ucy5jbG9zZWQgPT09ICdhY2NvcmRpb24nICYmICEkcmVzcFRhYnNMaXN0LmlzKCc6dmlzaWJsZScpKSAmJiAhKG9wdGlvbnMuY2xvc2VkID09PSAndGFicycgJiYgJHJlc3BUYWJzTGlzdC5pcygnOnZpc2libGUnKSkpIHsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgJCgkcmVzcFRhYnMuZmluZCgnLnJlc3AtYWNjb3JkaW9uJylbdGFiTnVtXSkuYWRkQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKCRyZXNwVGFicy5maW5kKCcucmVzcC10YWItY29udGVudCcpW3RhYk51bV0pLmFkZENsYXNzKCdyZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpLmF0dHIoJ3N0eWxlJywgJ2Rpc3BsYXk6YmxvY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9hc3NpZ24gcHJvcGVyIGNsYXNzZXMgZm9yIHdoZW4gdGFicyBtb2RlIGlzIGFjdGl2YXRlZCBiZWZvcmUgbWFraW5nIGEgc2VsZWN0aW9uIGluIGFjY29yZGlvbiBtb2RlXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50JylbdGFiTnVtXSkuYWRkQ2xhc3MoJ3Jlc3AtdGFiLWNvbnRlbnQtYWN0aXZlIHJlc3AtYWNjb3JkaW9uLWNsb3NlZCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9UYWIgQ2xpY2sgYWN0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbcm9sZT10YWJdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgJGN1cnJlbnRUYWIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFRhYi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY3VycmVudFRhYiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRhYkFyaWEgPSAkY3VycmVudFRhYi5hdHRyKCdhcmlhLWNvbnRyb2xzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkY3VycmVudFRhYi5oYXNDbGFzcygncmVzcC1hY2NvcmRpb24nKSAmJiAkY3VycmVudFRhYi5oYXNDbGFzcygncmVzcC10YWItYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQtYWN0aXZlJykuc2xpZGVVcCgnJywgZnVuY3Rpb24gKCkgeyAkKHRoaXMpLmFkZENsYXNzKCdyZXNwLWFjY29yZGlvbi1jbG9zZWQnKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRUYWIucmVtb3ZlQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGN1cnJlbnRUYWIuaGFzQ2xhc3MoJ3Jlc3AtdGFiLWFjdGl2ZScpICYmICRjdXJyZW50VGFiLmhhc0NsYXNzKCdyZXNwLWFjY29yZGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1hY3RpdmUnKS5yZW1vdmVDbGFzcygncmVzcC10YWItYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpLnNsaWRlVXAoKS5yZW1vdmVDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUgcmVzcC1hY2NvcmRpb24tY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbYXJpYS1jb250cm9scz1cIiArICR0YWJBcmlhICsgXCJdXCIpLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyZXNwVGFicy5maW5kKCcucmVzcC10YWItY29udGVudFthcmlhLWxhYmVsbGVkYnkgPSAnICsgJHRhYkFyaWEgKyAnXScpLnNsaWRlRG93bigpLmFkZENsYXNzKCdyZXNwLXRhYi1jb250ZW50LWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnQtYWN0aXZlJykucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUnKS5yZW1vdmVDbGFzcygncmVzcC1hY2NvcmRpb24tY2xvc2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoXCJbYXJpYS1jb250cm9scz1cIiArICR0YWJBcmlhICsgXCJdXCIpLmFkZENsYXNzKCdyZXNwLXRhYi1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcmVzcFRhYnMuZmluZCgnLnJlc3AtdGFiLWNvbnRlbnRbYXJpYS1sYWJlbGxlZGJ5ID0gJyArICR0YWJBcmlhICsgJ10nKS5hZGRDbGFzcygncmVzcC10YWItY29udGVudC1hY3RpdmUnKS5hdHRyKCdzdHlsZScsICdkaXNwbGF5OmJsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RyaWdnZXIgdGFiIGFjdGl2YXRpb24gZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICRjdXJyZW50VGFiLnRyaWdnZXIoJ3RhYmFjdGl2YXRlJywgJGN1cnJlbnRUYWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSBCcm93c2VyIEhpc3RvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhpc3RvcnlBcGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SGFzaCA9IHJlc3BUYWJzSWQrKHBhcnNlSW50KCR0YWJBcmlhLnN1YnN0cmluZyg5KSwxMCkrMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhhc2ghPVwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChyZXNwVGFic0lkK1wiWzAtOV0rXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEhhc2gubWF0Y2gocmUpIT1udWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIYXNoID0gY3VycmVudEhhc2gucmVwbGFjZShyZSxuZXdIYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hhc2ggPSBjdXJyZW50SGFzaCtcInxcIituZXdIYXNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIYXNoID0gJyMnK25ld0hhc2g7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsbnVsbCxuZXdIYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vV2luZG93IHJlc2l6ZSBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHJlc3BUYWJzLmZpbmQoJy5yZXNwLWFjY29yZGlvbi1jbG9zZWQnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKGpRdWVyeSk7XG5cbiIsIi8qXG4gKlx0alF1ZXJ5IGVsZXZhdGVab29tIDMuMC44XG4gKlx0RGVtbydzIGFuZCBkb2N1bWVudGF0aW9uOlxuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrL2ltYWdlLXpvb21cbiAqXG4gKlx0Q29weXJpZ2h0IChjKSAyMDEyIEFuZHJldyBFYWRlc1xuICpcdHd3dy5lbGV2YXRld2ViLmNvLnVrXG4gKlxuICpcdER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIEdQTCBhbmQgTUlUIGxpY2Vuc2VzLlxuICpcdGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2VcbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dOVV9HZW5lcmFsX1B1YmxpY19MaWNlbnNlXG4gKlxuXG4vKlxuICpcdGpRdWVyeSBlbGV2YXRlWm9vbSAzLjAuM1xuICpcdERlbW8ncyBhbmQgZG9jdW1lbnRhdGlvbjpcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51ay9pbWFnZS16b29tXG4gKlxuICpcdENvcHlyaWdodCAoYykgMjAxMiBBbmRyZXcgRWFkZXNcbiAqXHR3d3cuZWxldmF0ZXdlYi5jby51a1xuICpcbiAqXHREdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBHUEwgYW5kIE1JVCBsaWNlbnNlcy5cbiAqXHRodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlXG4gKlx0aHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HTlVfR2VuZXJhbF9QdWJsaWNfTGljZW5zZVxuICovXG5cblxuaWYgKCB0eXBlb2YgT2JqZWN0LmNyZWF0ZSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9O1xuICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcbiAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgfTtcbn1cblxuKGZ1bmN0aW9uKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG4gICAgdmFyIEVsZXZhdGVab29tID0ge1xuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24oIG9wdGlvbnMsIGVsZW0gKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtID0gZWxlbTtcbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtID0gJCggZWxlbSApO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5pbWFnZVNyYyA9IHNlbGYuJGVsZW0uZGF0YShcInpvb20taW1hZ2VcIikgPyBzZWxmLiRlbGVtLmRhdGEoXCJ6b29tLWltYWdlXCIpIDogc2VsZi4kZWxlbS5hdHRyKFwic3JjXCIpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zID0gJC5leHRlbmQoIHt9LCAkLmZuLmVsZXZhdGVab29tLm9wdGlvbnMsIG9wdGlvbnMgKTtcblxuICAgICAgICAgICAgICAgIC8vVElOVCBPVkVSUklERSBTRVRUSU5HU1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5sZW5zQ29sb3VyID0gXCJub25lXCIsIC8vY29sb3VyIG9mIHRoZSBsZW5zIGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5ID0gIFwiMVwiIC8vb3BhY2l0eSBvZiB0aGUgbGVuc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lOTkVSIE9WRVJSSURFIFNFVFRJTkdTXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge3NlbGYub3B0aW9ucy5zaG93TGVucyA9IGZhbHNlO31cblxuXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgYWx0IG9uIGhvdmVyXG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnBhcmVudCgpLnJlbW92ZUF0dHIoJ3RpdGxlJykucmVtb3ZlQXR0cignYWx0Jyk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnJlZnJlc2goIDEgKTtcblxuXG5cbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSB0aGUgaW1hZ2Ugc3dhcCBmcm9tIHRoZSBnYWxsZXJ5XG4gICAgICAgICAgICAgICAgJCgnIycrc2VsZi5vcHRpb25zLmdhbGxlcnkgKyAnIGEnKS5jbGljayggZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGEgY2xhc3Mgb24gdGhlIGN1cnJlbnRseSBhY3RpdmUgZ2FsbGVyeSBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuZ2FsbGVyeUFjdGl2ZUNsYXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnK3NlbGYub3B0aW9ucy5nYWxsZXJ5ICsgJyBhJykucmVtb3ZlQ2xhc3Moc2VsZi5vcHRpb25zLmdhbGxlcnlBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKHNlbGYub3B0aW9ucy5nYWxsZXJ5QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcCBhbnkgbGluayBvbiB0aGUgYSB0YWcgZnJvbSB3b3JraW5nXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NhbGwgdGhlIHN3YXAgaW1hZ2UgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKSl7c2VsZi56b29tSW1hZ2VQcmUgPSAkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpfVxuICAgICAgICAgICAgICAgICAgICBlbHNle3NlbGYuem9vbUltYWdlUHJlID0gJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIik7fVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN3YXB0aGVpbWFnZSgkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKSwgc2VsZi56b29tSW1hZ2VQcmUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCBsZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mZXRjaChzZWxmLmltYWdlU3JjKTtcblxuICAgICAgICAgICAgICAgIH0sIGxlbmd0aCB8fCBzZWxmLm9wdGlvbnMucmVmcmVzaCApO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKGltZ3NyYykge1xuICAgICAgICAgICAgICAgIC8vZ2V0IHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgbGFyZ2UgaW1hZ2UgZGltZW5zaW9ucyAtIHVzZWQgdG8gY2FsY3VsdGUgcmF0aW8nc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAvL29uY2UgaW1hZ2UgaXMgbG9hZGVkIHN0YXJ0IHRoZSBjYWxsc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0Wm9vbSgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRJbWFnZSA9IHNlbGYuaW1hZ2VTcmM7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGNhbGxlciBrbm93IGltYWdlIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMub25ab29tZWRJbWFnZUxvYWRlZChzZWxmLiRlbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGltZ3NyYzsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnRab29tOiBmdW5jdGlvbiggKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vZ2V0IGRpbWVuc2lvbnMgb2YgdGhlIG5vbiB6b29tZWQgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLm56V2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5uekhlaWdodCA9IHNlbGYuJGVsZW0uaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAvL2FjdGl2YXRlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzTGVuc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuaXNUaW50QWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5vdmVyV2luZG93ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL0Nyb3NzRmFkZSBXcmFwcGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwID0gc2VsZi4kZWxlbS53cmFwKCc8ZGl2IHN0eWxlPVwiaGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O1wiIGNsYXNzPVwiem9vbVdyYXBwZXJcIiAvPicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcygncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMTtcbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy56b29tTGV2ZWw7XG5cblxuICAgICAgICAgICAgICAgIC8vZ2V0IG9mZnNldCBvZiB0aGUgbm9uIHpvb21lZCBpbWFnZVxuICAgICAgICAgICAgICAgIHNlbGYubnpPZmZzZXQgPSBzZWxmLiRlbGVtLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSB3aWR0aCByYXRpbyBvZiB0aGUgbGFyZ2Uvc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCkgLyBzZWxmLm56SGVpZ2h0O1xuXG5cbiAgICAgICAgICAgICAgICAvL2lmIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3RleHQtYWxpZ246Y2VudGVyO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dCZ0NvbG91cilcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7d2lkdGg6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLXNpemU6IFwiKyBzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsKyBcInB4IFwiICtzZWxmLmxhcmdlSGVpZ2h0L3NlbGYuY3VycmVudFpvb21MZXZlbCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO3otaW5kZXg6MTAwO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJweCBzb2xpZCBcIiArIHNlbGYub3B0aW9ucy5ib3JkZXJDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCI7YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vaWYgaW5uZXIgIHpvb21cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaGFzIGEgYm9yZGVyIGJlZW4gcHV0IG9uIHRoZSBpbWFnZT8gTGV0cyBjYXRlciBmb3IgdGhpc1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBib3JkZXJXaWR0aCA9IHNlbGYuJGVsZW0uY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93U3R5bGUgPSBcIm92ZXJmbG93OiBoaWRkZW47XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tbGVmdDogXCIgKyBTdHJpbmcoYm9yZGVyV2lkdGgpICsgXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJtYXJnaW4tdG9wOiBcIiArIFN0cmluZyhib3JkZXJXaWR0aCkgKyBcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImJhY2tncm91bmQtcG9zaXRpb246IDBweCAwcHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJ3aWR0aDogXCIgKyBTdHJpbmcoc2VsZi5ueldpZHRoKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6IFwiICsgU3RyaW5nKHNlbGYubnpIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicHg7ZmxvYXQ6IGxlZnQ7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJkaXNwbGF5OiBub25lO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiY3Vyc29yOlwiKyhzZWxmLm9wdGlvbnMuY3Vyc29yKStcIjtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcInB4IHNvbGlkIFwiICsgc2VsZi5vcHRpb25zLmJvcmRlckNvbG91clxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiO1xuICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAvL2xlbnMgc3R5bGUgZm9yIHdpbmRvdyB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNIZWlnaHQgPSBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVuc1N0eWxlID0gXCJiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O3dpZHRoOiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArIFwicHg7aGVpZ2h0OiBcIiArIFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pXG4gICAgICAgICAgICAgICAgICAgICsgXCJweDtmbG9hdDogcmlnaHQ7ZGlzcGxheTogbm9uZTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3ZlcmZsb3c6IGhpZGRlbjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiei1pbmRleDogOTk5O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCItd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcIlxuICAgICAgICAgICAgICAgICAgICArIFwib3BhY2l0eTpcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KStcIjtmaWx0ZXI6IGFscGhhKG9wYWNpdHkgPSBcIisoc2VsZi5vcHRpb25zLmxlbnNPcGFjaXR5KjEwMCkrXCIpOyB6b29tOjE7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOlwiK2xlbnNXaWR0aCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJoZWlnaHQ6XCIrbGVuc0hlaWdodCtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOlwiKyhzZWxmLm9wdGlvbnMubGVuc0NvbG91cikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImN1cnNvcjpcIisoc2VsZi5vcHRpb25zLmN1cnNvcikrXCI7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlcjogXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSkrXCJweFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCIgc29saWQgXCIrKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyQ29sb3VyKStcIjtiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O3Bvc2l0aW9uOiBhYnNvbHV0ZTtcIjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vdGludCBzdHlsZVxuICAgICAgICAgICAgICAgIHNlbGYudGludFN0eWxlID0gXCJkaXNwbGF5OiBibG9jaztcIlxuICAgICAgICAgICAgICAgICAgICArIFwicG9zaXRpb246IGFic29sdXRlO1wiXG4gICAgICAgICAgICAgICAgICAgICsgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIitzZWxmLm9wdGlvbnMudGludENvbG91citcIjtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiZmlsdGVyOmFscGhhKG9wYWNpdHk9MCk7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIm9wYWNpdHk6IDA7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIndpZHRoOiBcIiArIHNlbGYubnpXaWR0aCArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImhlaWdodDogXCIgKyBzZWxmLm56SGVpZ2h0ICsgXCJweDtcIlxuXG4gICAgICAgICAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgICAgIC8vbGVucyBzdHlsZSBmb3IgbGVucyB6b29tIHdpdGggb3B0aW9uYWwgcm91bmQgZm9yIG1vZGVybiBicm93c2Vyc1xuICAgICAgICAgICAgICAgIHNlbGYubGVuc1JvdW5kID0gJyc7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNTdHlsZSA9IFwiYmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IDBweDtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBcImZsb2F0OiBsZWZ0O2Rpc3BsYXk6IG5vbmU7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgXCJib3JkZXI6IFwiICsgU3RyaW5nKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHggc29saWQgXCIgKyBzZWxmLm9wdGlvbnMuYm9yZGVyQ29sb3VyK1wiO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwid2lkdGg6XCIrIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICtcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiaGVpZ2h0OlwiKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKStcInB4O1wiXG4gICAgICAgICAgICAgICAgICAgICAgICArIFwiYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtwb3NpdGlvbjogYWJzb2x1dGU7XCI7XG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy9kb2VzIG5vdCByb3VuZCBpbiBhbGwgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubGVuc1NoYXBlID09IFwicm91bmRcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNSb3VuZCA9IFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIlxuICAgICAgICAgICAgICAgICAgICArIFwiYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogXCIgKyBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplIC8gMiArIHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKSArIFwicHg7XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcImJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiBcIiArIFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUgLyAyICsgc2VsZi5vcHRpb25zLmJvcmRlclNpemUpICsgXCJweDtcIjtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBkaXYncyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJcIlxuICAgICAgICAgICAgICAgIC8vc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ3pvb21Db250YWluZXInKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiaGVpZ2h0XCI6c2VsZi5uekhlaWdodCwgXCJ3aWR0aFwiOnNlbGYubnpXaWR0aH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInpvb21Db250YWluZXJcIiBzdHlsZT1cIi13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6JytzZWxmLm56T2Zmc2V0LmxlZnQrJ3B4O3RvcDonK3NlbGYubnpPZmZzZXQudG9wKydweDtoZWlnaHQ6JytzZWxmLm56SGVpZ2h0KydweDt3aWR0aDonK3NlbGYubnpXaWR0aCsncHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZChzZWxmLnpvb21Db250YWluZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgd2lsbCBhZGQgb3ZlcmZsb3cgaGlkZGVuIGFuZCBjb250cmFpbiB0aGUgbGVucyBvbiBsZW5zIG1vZGVcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29udGFpbkxlbnNab29tICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zID0gJChcIjxkaXYgY2xhc3M9J3pvb21MZW5zJyBzdHlsZT0nXCIgKyBzZWxmLmxlbnNTdHlsZSArIHNlbGYubGVuc1JvdW5kICtcIic+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lciA9ICQoJzxkaXYvPicpLmFkZENsYXNzKCd0aW50Q29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50ID0gJChcIjxkaXYgY2xhc3M9J3pvb21UaW50JyBzdHlsZT0nXCIrc2VsZi50aW50U3R5bGUrXCInPjwvZGl2PlwiKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLndyYXAoc2VsZi50aW50Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50Y3NzID0gc2VsZi56b29tTGVucy5hZnRlcihzZWxmLnpvb21UaW50KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiB0aW50IGVuYWJsZWQgLSBzZXQgYW4gaW1hZ2UgdG8gc2hvdyBvdmVyIHRoZSB0aW50XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZSA9ICQoJzxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDBweDsgdG9wOiAwcHg7IG1heC13aWR0aDogbm9uZTsgd2lkdGg6ICcrc2VsZi5ueldpZHRoKydweDsgaGVpZ2h0OiAnK3NlbGYubnpIZWlnaHQrJ3B4O1wiIHNyYz1cIicrc2VsZi5pbWFnZVNyYysnXCI+JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21MZW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHpvb20gd2luZG93XG4gICAgICAgICAgICAgICAgaWYoaXNOYU4oc2VsZi5vcHRpb25zLnpvb21XaW5kb3dQb3NpdGlvbikpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cgPSAkKFwiPGRpdiBzdHlsZT0nei1pbmRleDo5OTk7bGVmdDpcIisoc2VsZi53aW5kb3dPZmZzZXRMZWZ0KStcInB4O3RvcDpcIisoc2VsZi53aW5kb3dPZmZzZXRUb3ApK1wicHg7XCIgKyBzZWxmLnpvb21XaW5kb3dTdHlsZSArIFwiJyBjbGFzcz0nem9vbVdpbmRvdyc+Jm5ic3A7PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhzZWxmLnpvb21Db250YWluZXIpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3dDb250YWluZXIgPSAkKCc8ZGl2Lz4nKS5hZGRDbGFzcygnem9vbVdpbmRvd0NvbnRhaW5lcicpLmNzcyhcIndpZHRoXCIsc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LndyYXAoc2VsZi56b29tV2luZG93Q29udGFpbmVyKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gIHNlbGYuY2FwdGlvblN0eWxlID0gXCJ0ZXh0LWFsaWduOiBsZWZ0O2JhY2tncm91bmQtY29sb3I6IGJsYWNrO2NvbG9yOiB3aGl0ZTtmb250LXdlaWdodDogYm9sZDtwYWRkaW5nOiAxMHB4O2ZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO2ZvbnQtc2l6ZTogMTFweFwiO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuem9vbUNhcHRpb24gPSAkKCc8ZGl2IGNsYXNzPVwiZWxldmF0ZXpvb20tY2FwdGlvblwiIHN0eWxlPVwiJytzZWxmLmNhcHRpb25TdHlsZSsnZGlzcGxheTogYmxvY2s7IHdpZHRoOiAyODBweDtcIj5JTlNFUlQgQUxUIFRBRzwvZGl2PicpLmFwcGVuZFRvKHNlbGYuem9vbVdpbmRvdy5wYXJlbnQoKSk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIHNlbGYuaW1hZ2VTcmMgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRJbWFnZTogXCJ1cmwoJ1wiICsgc2VsZi5pbWFnZVNyYyArIFwiJylcIiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tRU5EIFRIRSBaT09NIFdJTkRPVyBBTkQgTEVOUy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuICAgICAgICAgICAgICAgIC8vdG91Y2ggZXZlbnRzXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UG9zaXRpb24odG91Y2gpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRvdWNoKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmJpbmQoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVRpbnQoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0gfHwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbih0b3VjaCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5iaW5kKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93SGlkZVdpbmRvdyhcImhpZGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcImhpZGVcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL05lZWRlZCB0byB3b3JrIGluIElFXG4gICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5iaW5kKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vdmVyV2luZG93ID09IGZhbHNlKXtzZWxmLnNldEVsZW1lbnRzKFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3ZlcldpbmRvdyA9PSBmYWxzZSl7c2VsZi5zZXRFbGVtZW50cyhcInNob3dcIik7fVxuXG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFzdFggIT09IGUuY2xpZW50WCB8fCBzZWxmLmxhc3RZICE9PSBlLmNsaWVudFkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuYmluZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc3VyZSBvbiBvcmllbnRhdGlvbiBjaGFuZ2UgdGhlIHNldHBvc2l0aW9uIGlzIG5vdCBmaXJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5sYXN0WCAhPT0gZS5jbGllbnRYIHx8IHNlbGYubGFzdFkgIT09IGUuY2xpZW50WSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRMb2MgPSBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubGFzdFkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmJpbmQoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi5vdmVyV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFrZSBzdXJlIG9uIG9yaWVudGF0aW9uIGNoYW5nZSB0aGUgc2V0cG9zaXRpb24gaXMgbm90IGZpcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhc3RYICE9PSBlLmNsaWVudFggfHwgc2VsZi5sYXN0WSAhPT0gZS5jbGllbnRZKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudExvYyA9IGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sYXN0WSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vICBsZW5zRmFkZU91dDogNTAwLCAgem9vbVRpbnRGYWRlSW5cbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuYWRkKHNlbGYuJGVsZW0pLm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm92ZXJXaW5kb3cgPT0gZmFsc2Upe3NlbGYuc2V0RWxlbWVudHMoXCJzaG93XCIpO31cblxuXG4gICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5zY3JvbGxMb2NrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9lbmQgb3ZlIGltYWdlXG5cblxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93Lm1vdXNlZW50ZXIoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub3ZlcldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEVsZW1lbnRzKFwiaGlkZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSkubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm92ZXJXaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZW5kIG92ZSBpbWFnZVxuXG5cblxuLy9cdFx0XHRcdHZhciBkZWx0YSA9IHBhcnNlSW50KGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIHx8IC1lLm9yaWdpbmFsRXZlbnQuZGV0YWlsKTtcblxuICAgICAgICAgICAgICAgIC8vICAgICAgJCh0aGlzKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vZml4IGZvciBpbml0aWFsIHpvb20gc2V0dGluZ1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuem9vbUxldmVsICE9IDEpe1xuICAgICAgICAgICAgICAgICAgICAvL1x0c2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIG1pbiB6b29tbGV2ZWxcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5ab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMubWluWm9vbUxldmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pblpvb21MZXZlbCA9IHNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50ICogMjtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zY3JvbGxab29tKXtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5hZGQoc2VsZi4kZWxlbSkuYmluZCgnbW91c2V3aGVlbCBET01Nb3VzZVNjcm9sbCBNb3pNb3VzZVBpeGVsU2Nyb2xsJywgZnVuY3Rpb24oZSl7XG5cblxuLy9cdFx0XHRcdFx0XHRpbiBJRSB0aGVyZSBpcyBpc3N1ZSB3aXRoIGZpcmluZyBvZiBtb3VzZWxlYXZlIC0gU28gY2hlY2sgd2hldGhlciBzdGlsbCBzY3JvbGxpbmdcbi8vXHRcdFx0XHRcdFx0YW5kIG9uIG1vdXNlbGVhdmUgY2hlY2sgaWYgc2Nyb2xsbG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCgkLmRhdGEodGhpcywgJ3RpbWVyJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsICd0aW1lcicsIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxMb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDI1MCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhlRXZlbnQgPSBlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YSB8fCBlLm9yaWdpbmFsRXZlbnQuZGV0YWlsKi0xXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnNjcm9sbFRvcCArPSAoIGRlbHRhIDwgMCA/IDEgOiAtMSApICogMzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGVFdmVudCAvMTIwID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsID49IHNlbGYubWluWm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwoc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY3JvbGxpbmcgZG93blxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jdXJyZW50Wm9vbUxldmVsIDw9IHNlbGYub3B0aW9ucy5tYXhab29tTGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tTGV2ZWwocGFyc2VGbG9hdChzZWxmLmN1cnJlbnRab29tTGV2ZWwpK3NlbGYub3B0aW9ucy5zY3JvbGxab29tSW5jcmVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FuZHlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVpvb21MZXZlbChwYXJzZUZsb2F0KHNlbGYuY3VycmVudFpvb21MZXZlbCkrc2VsZi5vcHRpb25zLnNjcm9sbFpvb21JbmNyZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVsZW1lbnRzOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZighc2VsZi5vcHRpb25zLnpvb21FbmFibGVkKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwic2hvd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1dpbmRvd1NldCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7c2VsZi5zaG93SGlkZVdpbmRvdyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwic2hvd1wiKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpIHtzZWxmLnNob3dIaWRlTGVucyhcInNob3dcIik7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge3NlbGYuc2hvd0hpZGVUaW50KFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtzZWxmLnNob3dIaWRlV2luZG93KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLm9wdGlvbnMudGludCkge3NlbGYuc2hvd0hpZGVXaW5kb3coXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7c2VsZi5zaG93SGlkZUxlbnMoXCJoaWRlXCIpO31cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnRpbnQpIHtcdHNlbGYuc2hvd0hpZGVUaW50KFwiaGlkZVwiKTt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYoIXNlbGYub3B0aW9ucy56b29tRW5hYmxlZCl7cmV0dXJuIGZhbHNlO31cblxuICAgICAgICAgICAgICAgIC8vcmVjYWNsYyBvZmZzZXQgZWFjaCB0aW1lIGluIGNhc2UgdGhlIGltYWdlIG1vdmVzXG4gICAgICAgICAgICAgICAgLy90aGlzIGNhbiBiZSBjYXVzZWQgYnkgb3RoZXIgb24gcGFnZSBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IHNlbGYuJGVsZW0ud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm56T2Zmc2V0ID0gc2VsZi4kZWxlbS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50ICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyB0b3A6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBsZWZ0OiAwfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc2V0IHJlc3BvbnNpdmVcbiAgICAgICAgICAgICAgICAvL3dpbGwgY2hlY2tpbmcgaWYgdGhlIGltYWdlIG5lZWRzIGNoYW5naW5nIGJlZm9yZSBydW5uaW5nIHRoaXMgY29kZSB3b3JrIGZhc3Rlcj9cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMucmVzcG9uc2l2ZSAmJiAhc2VsZi5vcHRpb25zLnNjcm9sbFpvb20pe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuc2hvd0xlbnMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA8IHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gc2VsZi5sYXJnZVdpZHRoIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcG9zc2libHkgZG9udCBuZWVkIHRvIGtlZXAgcmVjYWxjYWxjdWxhdGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgdGhlIGxlbnMgaXMgaGVpZ2hlciB0aGFuIHRoZSBpbWFnZSwgdGhlbiBzZXQgbGVucyBzaXplIHRvIGltYWdlIHNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gc2VsZi5uekhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5zSGVpZ2h0ID0gU3RyaW5nKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC9zZWxmLmhlaWdodFJhdGlvKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9IHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuc1dpZHRoID0gIChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoL3NlbGYud2lkdGhSYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcygnaGVpZ2h0JywgbGVuc0hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoJ3dpZHRoJywgc2VsZi5ueldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcygnaGVpZ2h0Jywgc2VsZi5uekhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgd2lkdGg6IFN0cmluZyhzZWxmLm9wdGlvbnMubGVuc1NpemUpICsgJ3B4JywgaGVpZ2h0OiBTdHJpbmcoc2VsZi5vcHRpb25zLmxlbnNTaXplKSArICdweCcgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VuZCByZXNwb25zaXZlIGltYWdlIGNoYW5nZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jb250YWluZXIgZml4XG4gICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyh7IHRvcDogc2VsZi5uek9mZnNldC50b3B9KTtcbiAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKHsgbGVmdDogc2VsZi5uek9mZnNldC5sZWZ0fSk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3VzZUxlZnQgPSBwYXJzZUludChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdXNlVG9wID0gcGFyc2VJbnQoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKTtcbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgTG9jYXRpb24gb2YgdGhlIExlbnNcblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBib3VuZCByZWdpb25zIC0gYnV0IG9ubHkgaWYgem9vbSB3aW5kb3dcbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkV0b3Bwb3MgPSAoc2VsZi5tb3VzZVRvcCA8IChzZWxmLnpvb21MZW5zLmhlaWdodCgpLzIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FYm9wcG9zID0gKHNlbGYubW91c2VUb3AgPiBzZWxmLm56SGVpZ2h0IC0gKHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWxvcHBvcyA9IChzZWxmLm1vdXNlTGVmdCA8IDArKChzZWxmLnpvb21MZW5zLndpZHRoKCkvMikpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5Fcm9wcG9zID0gKHNlbGYubW91c2VMZWZ0ID4gKHNlbGYubnpXaWR0aCAtIChzZWxmLnpvb21MZW5zLndpZHRoKCkvMiktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB0aGUgYm91bmQgcmVnaW9ucyAtIGJ1dCBvbmx5IGZvciBpbm5lciB6b29tXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRXRvcHBvcyA9IChzZWxmLm1vdXNlVG9wIDwgKChzZWxmLm56SGVpZ2h0LzIpL3NlbGYuaGVpZ2h0UmF0aW8pICk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuRWJvcHBvcyA9IChzZWxmLm1vdXNlVG9wID4gKHNlbGYubnpIZWlnaHQgLSAoKHNlbGYubnpIZWlnaHQvMikvc2VsZi5oZWlnaHRSYXRpbykpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5FbG9wcG9zID0gKHNlbGYubW91c2VMZWZ0IDwgMCsoKChzZWxmLm56V2lkdGgvMikvc2VsZi53aWR0aFJhdGlvKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLkVyb3Bwb3MgPSAoc2VsZi5tb3VzZUxlZnQgPiAoc2VsZi5ueldpZHRoIC0gKHNlbGYubnpXaWR0aC8yKS9zZWxmLndpZHRoUmF0aW8tKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBtb3VzZSBwb3NpdGlvbiBvZiB0aGUgc2xpZGVyIGlzIG9uZSBvZiB0aGUgb3V0ZXJib3VuZHMsIHRoZW4gaGlkZSAgd2luZG93IGFuZCBsZW5zXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubW91c2VMZWZ0IDw9IDAgfHwgc2VsZi5tb3VzZVRvcCA8IDAgfHwgc2VsZi5tb3VzZUxlZnQgPiBzZWxmLm56V2lkdGggfHwgc2VsZi5tb3VzZVRvcCA+IHNlbGYubnpIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0RWxlbWVudHMoXCJoaWRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZWxzZSBjb250aW51ZSB3aXRoIG9wZXJhdGlvbnNcbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vbGVucyBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5zaG93TGVucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9cdFx0c2VsZi5zaG93SGlkZUxlbnMoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgYmFja2dyb3VuZCBwb3NpdGlvbiBvZiBsZW5zXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gU3RyaW5nKHNlbGYubW91c2VMZWZ0IC0gc2VsZi56b29tTGVucy53aWR0aCgpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBTdHJpbmcoc2VsZi5tb3VzZVRvcCAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9hZGp1c3QgdGhlIGJhY2tncm91bmQgcG9zaXRpb24gaWYgdGhlIG1vdXNlIGlzIGluIG9uZSBvZiB0aGUgb3V0ZXIgcmVnaW9uc1xuXG4gICAgICAgICAgICAgICAgICAgIC8vVG9wIHJlZ2lvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLkV0b3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0xlZnQgUmVnaW9uXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd0xlZnRQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3M9MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1NldCBib3R0b20gYW5kIHJpZ2h0IHJlZ2lvbiBmb3Igd2luZG93IG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zVG9wUG9zID0gTWF0aC5tYXgoIChzZWxmLm56SGVpZ2h0KS1zZWxmLnpvb21MZW5zLmhlaWdodCgpLShzZWxmLm9wdGlvbnMubGVuc0JvcmRlclNpemUqMiksIDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IChzZWxmLm56V2lkdGgtKHNlbGYuem9vbUxlbnMud2lkdGgoKSktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgYm90dG9tIGFuZCByaWdodCByZWdpb24gZm9yIGlubmVyIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5FYm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNUb3BQb3MgPSBNYXRoLm1heCggKChzZWxmLm56SGVpZ2h0KS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSwgMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5Fcm9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlbnNMZWZ0UG9zID0gKHNlbGYubnpXaWR0aC0oc2VsZi5ueldpZHRoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgbGVucyB6b29tXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dMZWZ0UG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCkgKiBzZWxmLndpZHRoUmF0aW8gLSBzZWxmLnpvb21MZW5zLndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dUb3BQb3MgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApICogc2VsZi5oZWlnaHRSYXRpbyAtIHNlbGYuem9vbUxlbnMuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFdpbmRvd1Bvc3RpdGlvbihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIHRpbnQgem9vbVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFRpbnRQb3NpdGlvbihlKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBjc3MgYmFja2dyb3VuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRXaW5kb3dQb3N0aXRpb24oZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnNob3dMZW5zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sZW5zTGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgbGVmdDogc2VsZi5sZW5zTGVmdFBvcyArICdweCcsIHRvcDogc2VsZi5sZW5zVG9wUG9zICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGVsc2VcblxuXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVdpbmRvdzogZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcInNob3dcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tV2luZG93LnNob3coKTt9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzV2luZG93QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJoaWRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmlzV2luZG93QWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93RmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0ZhZGVPdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtzZWxmLnpvb21XaW5kb3cuaGlkZSgpO31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZUxlbnM6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc0xlbnNBY3RpdmUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmxlbnNGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuc3RvcCh0cnVlLCB0cnVlLCBmYWxzZSkuZmFkZUluKHNlbGYub3B0aW9ucy5sZW5zRmFkZUluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5zaG93KCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNoYW5nZSA9PSBcImhpZGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNMZW5zQWN0aXZlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sZW5zRmFkZU91dCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5zdG9wKHRydWUsIHRydWUpLmZhZGVPdXQoc2VsZi5vcHRpb25zLmxlbnNGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tTGVucy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0xlbnNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93SGlkZVRpbnQ6IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZihjaGFuZ2UgPT0gXCJzaG93XCIpe1xuICAgICAgICAgICAgICAgICAgICBpZighc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlSW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKS5zdG9wKHRydWUsIHRydWUpLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHtvcGFjaXR5OnNlbGYub3B0aW9ucy50aW50T3BhY2l0eX0pLmFuaW1hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnNob3coKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzVGludEFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlID09IFwiaGlkZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5pc1RpbnRBY3RpdmUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LnN0b3AodHJ1ZSwgdHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuem9vbVRpbnRGYWRlT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7c2VsZi56b29tVGludC5oaWRlKCk7fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc1RpbnRBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMZW5zUG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcblxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0V2luZG93UG9zdGl0aW9uOiBmdW5jdGlvbiggZSApIHtcbiAgICAgICAgICAgICAgICAvL3JldHVybiBvYmouc2xpY2UoIDAsIGNvdW50ICk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgaWYoIWlzTmFOKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pKXtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTsvL0RPTkUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgrc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQgPiBzZWxmLm56SGVpZ2h0KXsgLy9wb3NpdGl2ZSBtYXJnaW5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodC8yKS0oc2VsZi5uekhlaWdodC8yKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCAtIHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSAtIChzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAzLDlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYubnpXaWR0aCk7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0KTsgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpLShzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSk7IC8vRE9ORSAtIDUsMTVcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC8yKS0oc2VsZi5ueldpZHRoLzIpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7IC8vbmVnYXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYubnpIZWlnaHQpOyAgLy9ET05FIC0gNCw1LDYsNyw4XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSAwOyAvL0RPTkUgNywgMTNcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi5uekhlaWdodCk7IC8vRE9ORSAtIDQsNSw2LDcsOFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiAgLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm56SGVpZ2h0IC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC0gKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIDMsOVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0ID4gc2VsZi5uekhlaWdodCl7IC8vcG9zaXRpdmUgbWFyZ2luXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9ICgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvMiktKHNlbGYubnpIZWlnaHQvMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi56b29tV2luZG93LndpZHRoKCkrKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpICkqICgtMSk7ICAvL0RPTkUgOCw5LDEwLDExLDEyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYub3B0aW9ucy56b29tV2luZG93T2ZmZXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0TGVmdCA9KHNlbGYuem9vbVdpbmRvdy53aWR0aCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSApKiAoLTEpOyAgLy9ET05FIDgsOSwxMCwxMSwxMlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6IC8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLnpvb21XaW5kb3cud2lkdGgoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikgKSogKC0xKTsgIC8vRE9ORSA4LDksMTAsMTEsMTJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOiAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oMCk7IC8vRE9ORSA3LCAxM1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCA+IHNlbGYubnpIZWlnaHQpeyAvL3Bvc2l0aXZlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvMiktKHNlbGYubnpXaWR0aC8yKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNleyAvL25lZ2F0aXZlIG1hcmdpblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE1Oi8vZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRUb3AgPSAoc2VsZi56b29tV2luZG93LmhlaWdodCgpKyhzZWxmLm9wdGlvbnMuYm9yZGVyU2l6ZSoyKSkqKC0xKTsgLy9ET05FIDEyLDEzLDE0LDE1LDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgtc2VsZi56b29tV2luZG93LndpZHRoKCktKHNlbGYub3B0aW9ucy5ib3JkZXJTaXplKjIpKTsgLy9ET05FIC0gNSwxNVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6ICAvL2RvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gKHNlbGYuem9vbVdpbmRvdy5oZWlnaHQoKSsoc2VsZi5vcHRpb25zLmJvcmRlclNpemUqMikpKigtMSk7IC8vRE9ORSAxMiwxMywxNCwxNSwxNlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID0oc2VsZi5ueldpZHRoKTsgLy9ET05FIDEsIDIsIDMsIDQsIDE2XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogLy9kb25lXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IChzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eSk7Ly9ET05FIC0gMVxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPShzZWxmLm56V2lkdGgpOyAvL0RPTkUgMSwgMiwgMywgNCwgMTZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy9lbmQgaXNOQU5cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAvL1dFIENBTiBQT1NJVElPTiBJTiBBIENMQVNTIC0gQVNTVU1FIFRIQVQgQU5ZIFNUUklORyBQQVNTRUQgSVNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leHRlcm5hbENvbnRhaW5lciA9ICQoJyMnK3NlbGYub3B0aW9ucy56b29tV2luZG93UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyV2lkdGggPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXh0ZXJuYWxDb250YWluZXJIZWlnaHQgPSBzZWxmLmV4dGVybmFsQ29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0ID0gc2VsZi5leHRlcm5hbENvbnRhaW5lci5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldFRvcCA9IHNlbGYuZXh0ZXJuYWxDb250YWluZXJPZmZzZXQudG9wOy8vRE9ORSAtIDFcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53aW5kb3dPZmZzZXRMZWZ0ID1zZWxmLmV4dGVybmFsQ29udGFpbmVyT2Zmc2V0LmxlZnQ7IC8vRE9ORSAxLCAyLCAzLCA0LCAxNlxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuaXNXaW5kb3dTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93T2Zmc2V0VG9wID0gc2VsZi53aW5kb3dPZmZzZXRUb3AgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eTtcbiAgICAgICAgICAgICAgICBzZWxmLndpbmRvd09mZnNldExlZnQgPSBzZWxmLndpbmRvd09mZnNldExlZnQgKyBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd09mZmV0eDtcblxuICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyB0b3A6IHNlbGYud2luZG93T2Zmc2V0VG9wfSk7XG4gICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGxlZnQ6IHNlbGYud2luZG93T2Zmc2V0TGVmdH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgdG9wOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBsZWZ0OiAwfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IFN0cmluZygoKGUucGFnZVggLSBzZWxmLm56T2Zmc2V0LmxlZnQpICogc2VsZi53aWR0aFJhdGlvIC0gc2VsZi56b29tV2luZG93LndpZHRoKCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gU3RyaW5nKCgoZS5wYWdlWSAtIHNlbGYubnpPZmZzZXQudG9wKSAqIHNlbGYuaGVpZ2h0UmF0aW8gLSBzZWxmLnpvb21XaW5kb3cuaGVpZ2h0KCkgLyAyKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXRvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAwO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVsb3Bwb3Mpe3NlbGYud2luZG93TGVmdFBvcyA9IDA7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWJvcHBvcyl7c2VsZi53aW5kb3dUb3BQb3MgPSAoc2VsZi5sYXJnZUhlaWdodC9zZWxmLmN1cnJlbnRab29tTGV2ZWwtc2VsZi56b29tV2luZG93LmhlaWdodCgpKSooLTEpOyAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRXJvcHBvcyl7c2VsZi53aW5kb3dMZWZ0UG9zID0gKChzZWxmLmxhcmdlV2lkdGgvc2VsZi5jdXJyZW50Wm9vbUxldmVsLXNlbGYuem9vbVdpbmRvdy53aWR0aCgpKSooLTEpKTt9XG5cbiAgICAgICAgICAgICAgICAvL3N0b3BzIG1pY3JvIG1vdmVtZW50c1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLmZ1bGx3aWR0aCl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zZXQgdGhlIGNzcyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcIndpbmRvd1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21Mb2NrID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9vdmVycmlkZXMgZm9yIGltYWdlcyBub3Qgem9vbWFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYud2lkdGhSYXRpbyA8PSAxKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmhlaWdodFJhdGlvIDw9IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1hZ2VzIGxlc3MgdGhhbiB0aGUgd2luZG93IGhlaWdodFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubGFyZ2VIZWlnaHQgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93VG9wUG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmxhcmdlV2lkdGggPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2luZG93TGVmdFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgem9vbXdpbmRvdyBiYWNrZ3JvdW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZWFzaW5nKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKHNlbGYuY2hhbmdlWm9vbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYuY2hhbmdlWm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IHRoZSBwb3MgdG8gMCBpZiBub3Qgc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc2VsZi54cCl7c2VsZi54cCA9IDA7fVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYueXApe3NlbGYueXAgPSAwO31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbG9vcCBub3QgYWxyZWFkeSBzdGFydGVkLCB0aGVuIHJ1biBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxvb3Ape1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgemVubydzIHBhcmFkb3hcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwICs9IChzZWxmLndpbmRvd0xlZnRQb3MgIC0gc2VsZi54cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnlwICs9IChzZWxmLndpbmRvd1RvcFBvcyAgLSBzZWxmLnlwKSAvIHNlbGYub3B0aW9ucy5lYXNpbmdBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2Nyb2xsaW5nTG9jayl7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmxvb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi54cCA9IHNlbGYud2luZG93TGVmdFBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYueXAgPSBzZWxmLndpbmRvd1RvcFBvc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnhwID0gKChlLnBhZ2VYIC0gc2VsZi5uek9mZnNldC5sZWZ0KSAqIHNlbGYud2lkdGhSYXRpbyAtIHNlbGYuem9vbVdpbmRvdy53aWR0aCgpIC8gMikgKiAoLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi55cCA9ICgoKGUucGFnZVkgLSBzZWxmLm56T2Zmc2V0LnRvcCkgKiBzZWxmLmhlaWdodFJhdGlvIC0gc2VsZi56b29tV2luZG93LmhlaWdodCgpIC8gMikgKiAoLTEpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jaGFuZ2VCZ1NpemUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQ+c2VsZi5ueldpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgIGlmKCFzZWxmLmJneHApe3NlbGYuYmd4cCA9IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFzZWxmLmJneXApe3NlbGYuYmd5cCA9IHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSA7fVxuICAgICAgICAgICAgICAgICBpZiAoIXNlbGYuYmdsb29wKXtcbiAgICAgICAgICAgICAgICAgICAgIHNlbGYuYmdsb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICBzZWxmLmJneHAgKz0gKHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlICAtIHNlbGYuYmd4cCkgLyBzZWxmLm9wdGlvbnMuZWFzaW5nQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmJneXAgKz0gKHNlbGYubGFyZ2VIZWlnaHQvc2VsZi5uZXd2YWx1ZSAgLSBzZWxmLmJneXApIC8gc2VsZi5vcHRpb25zLmVhc2luZ0Ftb3VudDtcblxuICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5iZ3hwICsgJ3B4ICcgKyBzZWxmLmJneXAgKyAncHgnIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgIH0sIDE2KTtcblxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9vcCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY2hhbmdlQmdTaXplKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0PnNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kUG9zaXRpb246IHNlbGYueHAgKyAncHggJyArIHNlbGYueXAgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmNoYW5nZUJnU2l6ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodD5zZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZWhlaWdodCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoL3NlbGYubmV3dmFsdWV3aWR0aCArICdweCAnICsgc2VsZi5sYXJnZUhlaWdodC9zZWxmLm5ld3ZhbHVld2lkdGggKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKChzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCkgPCBzZWxmLm9wdGlvbnMuem9vbVdpbmRvd0hlaWdodCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGgvc2VsZi5uZXd2YWx1ZXdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWV3aWR0aCArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IFwiYmFja2dyb3VuZC1zaXplXCI6IHNlbGYubGFyZ2VXaWR0aC9zZWxmLm5ld3ZhbHVlaGVpZ2h0ICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0L3NlbGYubmV3dmFsdWVoZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyh7IGJhY2tncm91bmRQb3NpdGlvbjogc2VsZi53aW5kb3dMZWZ0UG9zICsgJ3B4ICcgKyBzZWxmLndpbmRvd1RvcFBvcyArICdweCcgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VGludFBvc2l0aW9uOiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi50aW50cG9zID0gU3RyaW5nKCgoZS5wYWdlWCAtIHNlbGYubnpPZmZzZXQubGVmdCktKHNlbGYuem9vbUxlbnMud2lkdGgoKSAvIDIpKSAqICgtMSkpO1xuICAgICAgICAgICAgICAgIHNlbGYudGludHBvc3kgPSBTdHJpbmcoKChlLnBhZ2VZIC0gc2VsZi5uek9mZnNldC50b3ApIC0gc2VsZi56b29tTGVucy5oZWlnaHQoKSAvIDIpICogKC0xKSk7XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5FdG9wcG9zKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50aW50cG9zeSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuRWxvcHBvcyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcz0wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVib3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gKHNlbGYubnpIZWlnaHQtc2VsZi56b29tTGVucy5oZWlnaHQoKS0oc2VsZi5vcHRpb25zLmxlbnNCb3JkZXJTaXplKjIpKSooLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLkVyb3Bwb3Mpe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3MgPSAoKHNlbGYubnpXaWR0aC1zZWxmLnpvb21MZW5zLndpZHRoKCktKHNlbGYub3B0aW9ucy5sZW5zQm9yZGVyU2l6ZSoyKSkqKC0xKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcHMgbWljcm8gbW92ZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbGhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRwb3N5ID0gMDtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZnVsbHdpZHRoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludHBvcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKHsnbGVmdCc6IHNlbGYudGludHBvcysncHgnfSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3Moeyd0b3AnOiBzZWxmLnRpbnRwb3N5KydweCd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzd2FwdGhlaW1hZ2U6IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubG9hZGluZ0ljb24pe1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNwaW5uZXIgPSAkKCc8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKFxcJycrc2VsZi5vcHRpb25zLmxvYWRpbmdJY29uKydcXCcpIG5vLXJlcGVhdCBjZW50ZXI7aGVpZ2h0Oicrc2VsZi5uekhlaWdodCsncHg7d2lkdGg6JytzZWxmLm56V2lkdGgrJ3B4O3otaW5kZXg6IDIwMDA7cG9zaXRpb246IGFic29sdXRlOyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmFmdGVyKHNlbGYuc3Bpbm5lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLm9uSW1hZ2VTd2FwKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgbmV3SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmxhcmdlV2lkdGggPSBuZXdJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGFyZ2VIZWlnaHQgPSBuZXdJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21JbWFnZSA9IGxhcmdlaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBcImJhY2tncm91bmQtc2l6ZVwiOiBzZWxmLmxhcmdlV2lkdGggKyAncHggJyArIHNlbGYubGFyZ2VIZWlnaHQgKyAncHgnIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgXCJiYWNrZ3JvdW5kLXNpemVcIjogc2VsZi5sYXJnZVdpZHRoICsgJ3B4ICcgKyBzZWxmLmxhcmdlSGVpZ2h0ICsgJ3B4JyB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3dhcEFjdGlvbihzbWFsbGltYWdlLCBsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdJbWcuc3JjID0gbGFyZ2VpbWFnZTsgLy8gdGhpcyBtdXN0IGJlIGRvbmUgQUZURVIgc2V0dGluZyBvbmxvYWRcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN3YXBBY3Rpb246IGZ1bmN0aW9uKHNtYWxsaW1hZ2UsIGxhcmdlaW1hZ2Upe1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nMiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZzIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmUtY2FsY3VsYXRlIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm56SGVpZ2h0ID0gbmV3SW1nMi5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubnpXaWR0aCA9IG5ld0ltZzIud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5vbkltYWdlU3dhcENvbXBsZXRlKHNlbGYuJGVsZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZG9uZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3SW1nMi5zcmMgPSBzbWFsbGltYWdlO1xuXG4gICAgICAgICAgICAgICAgLy9yZXNldCB0aGUgem9vbWxldmVsIHRvIHRoYXQgaW5pdGlhbGx5IHNldCBpbiBvcHRpb25zXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50Wm9vbUxldmVsID0gc2VsZi5vcHRpb25zLnpvb21MZXZlbDtcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMubWF4Wm9vbUxldmVsID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSBtYWluIGltYWdlXG4gICAgICAgICAgICAgICAgLy9zZWxmLiRlbGVtLmF0dHIoXCJzcmNcIixzbWFsbGltYWdlKTtcbiAgICAgICAgICAgICAgICAvL3N3YXBzIHRoZSB6b29tIGltYWdlXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJ3aW5kb3dcIikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKHsgYmFja2dyb3VuZEltYWdlOiBcInVybCgnXCIgKyBsYXJnZWltYWdlICsgXCInKVwiIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoeyBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKCdcIiArIGxhcmdlaW1hZ2UgKyBcIicpXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudEltYWdlID0gbGFyZ2VpbWFnZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWcgPSBzZWxmLiRlbGVtO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gb2xkSW1nLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYWZ0ZXIobmV3SW1nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgXHRcdFx0XHRpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgYW55IGF0dHJpYnV0ZXMgb24gdGhlIGNsb25lZCBpbWFnZSBzbyB3ZSBjYW4gcmVzaXplIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0ud2lkdGgoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJ3aWR0aFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZWxlbS5oZWlnaHQoXCJhdXRvXCIpLnJlbW92ZUF0dHIoXCJoZWlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9sZEltZy5mYWRlSW4oc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCAmJiBzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJpbm5lclwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbWdUaW50ID0gc2VsZi56b29tVGludEltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0ltZ1RpbnQgPSBvbGRJbWdUaW50LmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcInNyY1wiLGxhcmdlaW1hZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuYWZ0ZXIobmV3SW1nVGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbWdUaW50LnN0b3AodHJ1ZSkuZmFkZU91dChzZWxmLm9wdGlvbnMuaW1hZ2VDcm9zc2ZhZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZEltZ1RpbnQuZmFkZUluKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnpvb21UaW50SW1hZ2UuYXR0cihcIndpZHRoXCIsZWxlbS5kYXRhKFwiaW1hZ2VcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2l6ZSB0aGUgdGludCB3aW5kb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnQuY3NzKHsgaGVpZ2h0OiBzZWxmLiRlbGVtLmhlaWdodCgpfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyh7IHdpZHRoOiBzZWxmLiRlbGVtLndpZHRoKCl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLnBhcmVudCgpLmNzcyhcIndpZHRoXCIsIHNlbGYuJGVsZW0ud2lkdGgoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuJGVsZW0uaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uYXR0cihcInNyY1wiLHNtYWxsaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMudGludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJzcmNcIixsYXJnZWltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZi56b29tVGludEltYWdlLmF0dHIoXCJ3aWR0aFwiLGVsZW0uZGF0YShcImltYWdlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5hdHRyKFwiaGVpZ2h0XCIsc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGYuem9vbVRpbnRJbWFnZS5hdHRyKCdzcmMnKSA9IGVsZW0uZGF0YShcImltYWdlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyh7IGhlaWdodDogc2VsZi4kZWxlbS5oZWlnaHQoKX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoeyBoZWlnaHQ6IHNlbGYuJGVsZW0uaGVpZ2h0KCl9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgc2VsZi4kZWxlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLiRlbGVtLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBzZWxmLiRlbGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgc2VsZi4kZWxlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuY29uc3RyYWluVHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9UaGlzIHdpbGwgY29udHJhaW4gdGhlIGltYWdlIHByb3BvcnRpb25zXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5jb25zdHJhaW5UeXBlID09IFwiaGVpZ2h0XCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Db250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBcImF1dG9cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5pbWFnZUNyb3NzZmFkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAuY3NzKFwid2lkdGhcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uc3R3aWR0aCA9IHNlbGYuem9vbVdyYXAud2lkdGgoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0d2lkdGggPSBzZWxmLiRlbGVtLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5wYXJlbnQoKS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XaW5kb3cuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwid2lkdGhcIiwgc2VsZi5jb25zdHdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50LmNzcyhcImhlaWdodFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJoZWlnaHRcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVRpbnRJbWFnZS5jc3MoXCJ3aWR0aFwiLCBzZWxmLmNvbnN0d2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmNvbnN0cmFpblR5cGUgPT0gXCJ3aWR0aFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUNvbnRhaW5lci5jc3MoXCJoZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tQ29udGFpbmVyLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLmltYWdlQ3Jvc3NmYWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21XcmFwLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV3JhcC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25zdGhlaWdodCA9IHNlbGYuem9vbVdyYXAuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW0uY3NzKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbGVtLmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnN0aGVpZ2h0ID0gc2VsZi4kZWxlbS5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdyYXAucGFyZW50KCkuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbVdpbmRvdy5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tV2luZG93LmNzcyhcIndpZHRoXCIsIHNlbGYub3B0aW9ucy5jb25zdHJhaW5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy50aW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRpbnRDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsIHNlbGYuY29uc3RoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGludENvbnRhaW5lci5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJoZWlnaHRcIiwgc2VsZi5jb25zdGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludC5jc3MoXCJ3aWR0aFwiLCBzZWxmLm9wdGlvbnMuY29uc3RyYWluU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tVGludEltYWdlLmNzcyhcImhlaWdodFwiLCBzZWxmLmNvbnN0aGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21UaW50SW1hZ2UuY3NzKFwid2lkdGhcIiwgc2VsZi5vcHRpb25zLmNvbnN0cmFpblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG9uZUNhbGxiYWNrOiBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy5sb2FkaW5nSWNvbil7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3Bpbm5lci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5uek9mZnNldCA9IHNlbGYuJGVsZW0ub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5ueldpZHRoID0gc2VsZi4kZWxlbS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIHNlbGYubnpIZWlnaHQgPSBzZWxmLiRlbGVtLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHpvb21sZXZlbCBiYWNrIHRvIGRlZmF1bHRcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRab29tTGV2ZWwgPSBzZWxmLm9wdGlvbnMuem9vbUxldmVsO1xuXG4gICAgICAgICAgICAgICAgLy9yYXRpbyBvZiB0aGUgbGFyZ2UgdG8gc21hbGwgaW1hZ2VcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSBzZWxmLmxhcmdlV2lkdGggLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IHNlbGYubGFyZ2VIZWlnaHQgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy9ORUVEIFRPIEFERCBUSEUgTEVOUyBTSVpFIEZPUiBST1VORFxuICAgICAgICAgICAgICAgIC8vIGFkanVzdCBpbWFnZXMgbGVzcyB0aGFuIHRoZSB3aW5kb3cgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwid2luZG93XCIpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm56SGVpZ2h0IDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IHNlbGYubnpIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVuc0hlaWdodCA9IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQvc2VsZi5oZWlnaHRSYXRpbykpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVdpbmRvd1dpZHRoIDwgc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5zV2lkdGggPSBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbnNXaWR0aCA9ICAoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aC9zZWxmLndpZHRoUmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21MZW5zKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi56b29tTGVucy5jc3MoJ3dpZHRoJywgbGVuc1dpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKCdoZWlnaHQnLCBsZW5zSGVpZ2h0KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q3VycmVudEltYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi56b29tSW1hZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0R2FsbGVyeUxpc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIC8vbG9vcCB0aHJvdWdoIHRoZSBnYWxsZXJ5IG9wdGlvbnMgYW5kIHNldCB0aGVtIGluIGxpc3QgZm9yIGZhbmN5Ym94XG4gICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZ2FsbGVyeSl7XG5cblxuICAgICAgICAgICAgICAgICAgICAkKCcjJytzZWxmLm9wdGlvbnMuZ2FsbGVyeSArICcgYScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWdfc3JjID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHRoaXMpLmRhdGEoXCJ6b29tLWltYWdlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdfc3JjID0gJCh0aGlzKS5kYXRhKFwiem9vbS1pbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoJCh0aGlzKS5kYXRhKFwiaW1hZ2VcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ19zcmMgPSAkKHRoaXMpLmRhdGEoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHV0IHRoZSBjdXJyZW50IGltYWdlIGF0IHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW1nX3NyYyA9PSBzZWxmLnpvb21JbWFnZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogJycraW1nX3NyYysnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2FsbGVyeWxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK2ltZ19zcmMrJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vaWYgbm8gZ2FsbGVyeSAtIHJldHVybiBjdXJyZW50IGltYWdlXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYWxsZXJ5bGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcnK3NlbGYuem9vbUltYWdlKycnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZmluZCgnaW1nJykuYXR0cihcInRpdGxlXCIpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5nYWxsZXJ5bGlzdDtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZVpvb21MZXZlbDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIC8vZmxhZyBhIHpvb20sIHNvIGNhbiBhZGp1c3QgdGhlIGVhc2luZyBkdXJpbmcgc2V0UG9zaXRpb25cbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbGluZ0xvY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy9yb3VuZCB0byB0d28gZGVjaW1hbCBwbGFjZXNcbiAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMik7XG5cblxuXG5cbiAgICAgICAgICAgICAgICAvL21heHdpZHRoICYgTWF4aGVpZ2h0IG9mIHRoZSBpbWFnZVxuICAgICAgICAgICAgICAgIG1heGhlaWdodG5ld3ZhbHVlID0gc2VsZi5sYXJnZUhlaWdodC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93SGVpZ2h0IC8gc2VsZi5uekhlaWdodCkgKiBzZWxmLm56SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHNlbGYubGFyZ2VXaWR0aC8oKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGggLyBzZWxmLm56V2lkdGgpICogc2VsZi5ueldpZHRoKTtcblxuXG5cblxuICAgICAgICAgICAgICAgIC8vY2FsY3VsYXRlIG5ldyBoZWlnaHRyYXRpb1xuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihtYXhoZWlnaHRuZXd2YWx1ZSA8PSBuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhlaWdodFJhdGlvID0gKHNlbGYubGFyZ2VIZWlnaHQvbWF4aGVpZ2h0bmV3dmFsdWUpIC8gc2VsZi5uekhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5oZWlnaHRSYXRpbyA9IChzZWxmLmxhcmdlSGVpZ2h0L25ld3ZhbHVlKSAvIHNlbGYubnpIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVlaGVpZ2h0ID0gbmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuLy9cdFx0XHRcdFx0Y2FsY3VsYXRlIG5ldyB3aWR0aCByYXRpb1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1heHdpZHRodG5ld3ZhbHVlIDw9IG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbWF4d2lkdGh0bmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53aWR0aFJhdGlvID0gKHNlbGYubGFyZ2VXaWR0aC9uZXd2YWx1ZSkgLyBzZWxmLm56V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJsZW5zXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBtYXhoZWlnaHRuZXd2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYud2lkdGhSYXRpbyA9IChzZWxmLmxhcmdlV2lkdGgvbmV3dmFsdWUpIC8gc2VsZi5ueldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtYXhoZWlnaHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZUhlaWdodC9zZWxmLm56SGVpZ2h0KS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICBtYXh3aWR0aHRuZXd2YWx1ZSA9IHBhcnNlRmxvYXQoc2VsZi5sYXJnZVdpZHRoL3NlbGYubnpXaWR0aCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXd2YWx1ZSA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3dmFsdWUgPSBtYXh3aWR0aHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4aGVpZ2h0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3dmFsdWUgPiBtYXhoZWlnaHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG1heGhlaWdodG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZWhlaWdodCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaGVpZ2h0UmF0aW8gPSAoc2VsZi5sYXJnZUhlaWdodC9uZXd2YWx1ZSkgLyBzZWxmLm56SGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXd2YWx1ZSA+IG1heGhlaWdodG5ld3ZhbHVlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBtYXhoZWlnaHRuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWVoZWlnaHQgPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbGhlaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYobWF4d2lkdGh0bmV3dmFsdWUgPD0gbmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3ZhbHVlID4gbWF4d2lkdGh0bmV3dmFsdWUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXd2YWx1ZXdpZHRoID0gbWF4d2lkdGh0bmV3dmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm5ld3ZhbHVld2lkdGggPSBuZXd2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndpZHRoUmF0aW8gPSAoc2VsZi5sYXJnZVdpZHRoL25ld3ZhbHVlKSAvIHNlbGYubnpXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubmV3dmFsdWV3aWR0aCA9IG5ld3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsd2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9IC8vZW5kIGlubmVyXG4gICAgICAgICAgICAgICAgc2NyY29udGludWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYubmV3dmFsdWV3aWR0aCA8PSBtYXh3aWR0aHRuZXd2YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyY29udGludWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsaGVpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGx3aWR0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uekhlaWdodCA+IHNlbGYubnpXaWR0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5uZXd2YWx1ZXdpZHRoIDw9IG1heHdpZHRodG5ld3ZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmNvbnRpbnVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZ1bGxoZWlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZnVsbHdpZHRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpe1xuICAgICAgICAgICAgICAgICAgICBzY3Jjb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc2NyY29udGludWUpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21Mb2NrID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2Vab29tID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIGxlbnMgaGVpZ2h0IGlzIGxlc3MgdGhhbiBpbWFnZSBoZWlnaHRcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCgoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pIDw9IHNlbGYubnpIZWlnaHQpe1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWVoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMuem9vbVR5cGUgIT0gXCJsZW5zXCIgJiYgc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlQmdTaXplID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuem9vbUxlbnMuY3NzKHtoZWlnaHQ6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dIZWlnaHQpL3NlbGYuaGVpZ2h0UmF0aW8pICsgJ3B4JyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwibGVuc1wiIHx8IHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoKHNlbGYub3B0aW9ucy56b29tV2luZG93V2lkdGgvc2VsZi53aWR0aFJhdGlvKSA8PSBzZWxmLm56V2lkdGgpe1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5uZXd2YWx1ZXdpZHRoID4gc2VsZi5uZXd2YWx1ZWhlaWdodCkgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlICE9IFwibGVuc1wiICYmIHNlbGYub3B0aW9ucy56b29tVHlwZSAhPSBcImlubmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnpvb21MZW5zLmNzcyh7d2lkdGg6IFN0cmluZygoc2VsZi5vcHRpb25zLnpvb21XaW5kb3dXaWR0aCkvc2VsZi53aWR0aFJhdGlvKSArICdweCcgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYub3B0aW9ucy56b29tVHlwZSA9PSBcImxlbnNcIiB8fCBzZWxmLm9wdGlvbnMuem9vbVR5cGUgPT0gXCJpbm5lclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VCZ1NpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5vcHRpb25zLnpvb21UeXBlID09IFwiaW5uZXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZUJnU2l6ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpXaWR0aCA+IHNlbGYubnpIZWlnaHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubnpIZWlnaHQgPiBzZWxmLm56V2lkdGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFpvb21MZXZlbCA9IHNlbGYubmV3dmFsdWV3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSAgICAgIC8vdW5kZXJcblxuICAgICAgICAgICAgICAgIC8vc2V0cyB0aGUgYm91bmRyeSBjaGFuZ2UsIGNhbGxlZCBpbiBzZXRXaW5kb3dQb3NcbiAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHNlbGYuY3VycmVudExvYyk7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZUFsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21XaW5kb3cpe3NlbGYuem9vbVdpbmRvdy5oaWRlKCk7fVxuICAgICAgICAgICAgICAgIGlmKHNlbGYuem9vbUxlbnMpe3NlbGYuem9vbUxlbnMuaGlkZSgpO31cbiAgICAgICAgICAgICAgICBpZihzZWxmLnpvb21UaW50KXtzZWxmLnpvb21UaW50LmhpZGUoKTt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUgPT0gJ2VuYWJsZScpe3NlbGYub3B0aW9ucy56b29tRW5hYmxlZCA9IHRydWU7fVxuICAgICAgICAgICAgICAgIGlmKHZhbHVlID09ICdkaXNhYmxlJyl7c2VsZi5vcHRpb25zLnpvb21FbmFibGVkID0gZmFsc2U7fVxuXG4gICAgICAgICAgICB9XG5cbiAgICB9O1xuXG5cblxuXG4gICAgJC5mbi5lbGV2YXRlWm9vbSA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZXZhdGUgPSBPYmplY3QuY3JlYXRlKCBFbGV2YXRlWm9vbSApO1xuXG4gICAgICAgICAgICBlbGV2YXRlLmluaXQoIG9wdGlvbnMsIHRoaXMgKTtcblxuICAgICAgICAgICAgJC5kYXRhKCB0aGlzLCAnZWxldmF0ZVpvb20nLCBlbGV2YXRlICk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICQuZm4uZWxldmF0ZVpvb20ub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHpvb21BY3RpdmF0aW9uOiBcImhvdmVyXCIsIC8vIENhbiBhbHNvIGJlIGNsaWNrIChQTEFDRUhPTERFUiBGT1IgTkVYVCBWRVJTSU9OKVxuICAgICAgem9vbUVuYWJsZWQ6IHRydWUsIC8vZmFsc2UgZGlzYWJsZXMgem9vbXdpbmRvdyBmcm9tIHNob3dpbmdcbiAgICAgICAgICAgIHByZWxvYWRpbmc6IDEsIC8vYnkgZGVmYXVsdCwgbG9hZCBhbGwgdGhlIGltYWdlcywgaWYgMCwgdGhlbiBvbmx5IGxvYWQgaW1hZ2VzIGFmdGVyIGFjdGl2YXRlZCAoUExBQ0VIT0xERVIgRk9SIE5FWFQgVkVSU0lPTilcbiAgICAgICAgICAgIHpvb21MZXZlbDogMSwgLy9kZWZhdWx0IHpvb20gbGV2ZWwgb2YgaW1hZ2VcbiAgICAgICAgICAgIHNjcm9sbFpvb206IGZhbHNlLCAvL2FsbG93IHpvb20gb24gbW91c2V3aGVlbCwgdHJ1ZSB0byBhY3RpdmF0ZVxuICAgICAgICAgICAgc2Nyb2xsWm9vbUluY3JlbWVudDogMC4xLCAgLy9zdGVwcyBvZiB0aGUgc2Nyb2xsem9vbVxuICAgICAgICAgICAgbWluWm9vbUxldmVsOiBmYWxzZSxcbiAgICAgICAgICAgIG1heFpvb21MZXZlbDogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmc6IGZhbHNlLFxuICAgICAgICAgICAgZWFzaW5nQW1vdW50OiAxMixcbiAgICAgICAgICAgIGxlbnNTaXplOiAyMDAsXG4gICAgICAgICAgICB6b29tV2luZG93V2lkdGg6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dIZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHpvb21XaW5kb3dPZmZldHg6IDAsXG4gICAgICAgICAgICB6b29tV2luZG93T2ZmZXR5OiAwLFxuICAgICAgICAgICAgem9vbVdpbmRvd1Bvc2l0aW9uOiAxLFxuICAgICAgICAgICAgem9vbVdpbmRvd0JnQ29sb3VyOiBcIiNmZmZcIixcbiAgICAgICAgICAgIGxlbnNGYWRlSW46IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0ZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgem9vbVdpbmRvd0ZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93RmFkZU91dDogZmFsc2UsXG4gICAgICAgICAgICB6b29tV2luZG93QWx3YXlzU2hvdzogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVJbjogZmFsc2UsXG4gICAgICAgICAgICB6b29tVGludEZhZGVPdXQ6IGZhbHNlLFxuICAgICAgICAgICAgYm9yZGVyU2l6ZTogNCxcbiAgICAgICAgICAgIHNob3dMZW5zOiB0cnVlLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3VyOiBcIiM4ODhcIixcbiAgICAgICAgICAgIGxlbnNCb3JkZXJTaXplOiAxLFxuICAgICAgICAgICAgbGVuc0JvcmRlckNvbG91cjogXCIjMDAwXCIsXG4gICAgICAgICAgICBsZW5zU2hhcGU6IFwic3F1YXJlXCIsIC8vY2FuIGJlIFwicm91bmRcIlxuICAgICAgICAgICAgem9vbVR5cGU6IFwid2luZG93XCIsIC8vd2luZG93IGlzIGRlZmF1bHQsICBhbHNvIFwibGVuc1wiIGF2YWlsYWJsZSAtXG4gICAgICAgICAgICBjb250YWluTGVuc1pvb206IGZhbHNlLFxuICAgICAgICAgICAgbGVuc0NvbG91cjogXCJ3aGl0ZVwiLCAvL2NvbG91ciBvZiB0aGUgbGVucyBiYWNrZ3JvdW5kXG4gICAgICAgICAgICBsZW5zT3BhY2l0eTogMC40LCAvL29wYWNpdHkgb2YgdGhlIGxlbnNcbiAgICAgICAgICAgIGxlbnN6b29tOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbnQ6IGZhbHNlLCAvL2VuYWJsZSB0aGUgdGludGluZ1xuICAgICAgICAgICAgdGludENvbG91cjogXCIjMzMzXCIsIC8vZGVmYXVsdCB0aW50IGNvbG9yLCBjYW4gYmUgYW55dGhpbmcsIHJlZCwgI2NjYywgcmdiKDAsMCwwKVxuICAgICAgICAgICAgdGludE9wYWNpdHk6IDAuNCwgLy9vcGFjaXR5IG9mIHRoZSB0aW50XG4gICAgICAgICAgICBnYWxsZXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGdhbGxlcnlBY3RpdmVDbGFzczogXCJ6b29tR2FsbGVyeUFjdGl2ZVwiLFxuICAgICAgICAgICAgaW1hZ2VDcm9zc2ZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uc3RyYWluVHlwZTogZmFsc2UsICAvL3dpZHRoIG9yIGhlaWdodFxuICAgICAgICAgICAgY29uc3RyYWluU2l6ZTogZmFsc2UsICAvL2luIHBpeGVscyB0aGUgZGltZW5zaW9ucyB5b3Ugd2FudCB0byBjb25zdHJhaW4gb25cbiAgICAgICAgICAgIGxvYWRpbmdJY29uOiBmYWxzZSwgLy9odHRwOi8vd3d3LmV4YW1wbGUuY29tL3NwaW5uZXIuZ2lmXG4gICAgICAgICAgICBjdXJzb3I6XCJkZWZhdWx0XCIsIC8vIHVzZXIgc2hvdWxkIHNldCB0byB3aGF0IHRoZXkgd2FudCB0aGUgY3Vyc29yIGFzLCBpZiB0aGV5IGhhdmUgc2V0IGEgY2xpY2sgZnVuY3Rpb25cbiAgICAgICAgICAgIHJlc3BvbnNpdmU6dHJ1ZSxcbiAgICAgICAgICAgIG9uQ29tcGxldGU6ICQubm9vcCxcbiAgICAgICAgICAgIG9uWm9vbWVkSW1hZ2VMb2FkZWQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICBvbkltYWdlU3dhcDogJC5ub29wLFxuICAgICAgICAgICAgb25JbWFnZVN3YXBDb21wbGV0ZTogJC5ub29wXG4gICAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApO1xuIiwiLypcbiAqIGpRdWVyeSBGbGV4U2xpZGVyIHYyLjIuMlxuICogQ29weXJpZ2h0IDIwMTIgV29vVGhlbWVzXG4gKiBDb250cmlidXRpbmcgQXV0aG9yOiBUeWxlciBTbWl0aFxuICovXG47XG4oZnVuY3Rpb24gKCQpIHtcblxuICAvL0ZsZXhTbGlkZXI6IE9iamVjdCBJbnN0YW5jZVxuICAkLmZsZXhzbGlkZXIgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciBzbGlkZXIgPSAkKGVsKTtcblxuICAgIC8vIG1ha2luZyB2YXJpYWJsZXMgcHVibGljXG4gICAgc2xpZGVyLnZhcnMgPSAkLmV4dGVuZCh7fSwgJC5mbGV4c2xpZGVyLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIHZhciBuYW1lc3BhY2UgPSBzbGlkZXIudmFycy5uYW1lc3BhY2UsXG4gICAgICAgIG1zR2VzdHVyZSA9IHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5NU0dlc3R1cmUsXG4gICAgICAgIHRvdWNoID0gKCggXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cgKSB8fCBtc0dlc3R1cmUgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSAmJiBzbGlkZXIudmFycy50b3VjaCxcbiAgICAgICAgLy8gZGVwcmljYXRpbmcgdGhpcyBpZGVhLCBhcyBkZXZpY2VzIGFyZSBiZWluZyByZWxlYXNlZCB3aXRoIGJvdGggb2YgdGhlc2UgZXZlbnRzXG4gICAgICAgIC8vZXZlbnRUeXBlID0gKHRvdWNoKSA/IFwidG91Y2hlbmRcIiA6IFwiY2xpY2tcIixcbiAgICAgICAgZXZlbnRUeXBlID0gXCJjbGljayB0b3VjaGVuZCBNU1BvaW50ZXJVcCBrZXl1cFwiLFxuICAgICAgICB3YXRjaGVkRXZlbnQgPSBcIlwiLFxuICAgICAgICB3YXRjaGVkRXZlbnRDbGVhclRpbWVyLFxuICAgICAgICB2ZXJ0aWNhbCA9IHNsaWRlci52YXJzLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiLFxuICAgICAgICByZXZlcnNlID0gc2xpZGVyLnZhcnMucmV2ZXJzZSxcbiAgICAgICAgY2Fyb3VzZWwgPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gMCksXG4gICAgICAgIGZhZGUgPSBzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwiZmFkZVwiLFxuICAgICAgICBhc05hdiA9IHNsaWRlci52YXJzLmFzTmF2Rm9yICE9PSBcIlwiLFxuICAgICAgICBtZXRob2RzID0ge30sXG4gICAgICAgIGZvY3VzZWQgPSB0cnVlO1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIHNsaWRlciBvYmplY3RcbiAgICAkLmRhdGEoZWwsIFwiZmxleHNsaWRlclwiLCBzbGlkZXIpO1xuXG4gICAgLy8gUHJpdmF0ZSBzbGlkZXIgbWV0aG9kc1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAvLyBHZXQgY3VycmVudCBzbGlkZSBhbmQgbWFrZSBzdXJlIGl0IGlzIGEgbnVtYmVyXG4gICAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBwYXJzZUludCggKCBzbGlkZXIudmFycy5zdGFydEF0ID8gc2xpZGVyLnZhcnMuc3RhcnRBdCA6IDApLCAxMCApO1xuICAgICAgICBpZiAoIGlzTmFOKCBzbGlkZXIuY3VycmVudFNsaWRlICkgKSBzbGlkZXIuY3VycmVudFNsaWRlID0gMDtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgc2xpZGVyLmF0RW5kID0gKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgfHwgc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IgPSBzbGlkZXIudmFycy5zZWxlY3Rvci5zdWJzdHIoMCxzbGlkZXIudmFycy5zZWxlY3Rvci5zZWFyY2goJyAnKSk7XG4gICAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuICAgICAgICBzbGlkZXIuY29udGFpbmVyID0gJChzbGlkZXIuY29udGFpbmVyU2VsZWN0b3IsIHNsaWRlcik7XG4gICAgICAgIHNsaWRlci5jb3VudCA9IHNsaWRlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBzbGlkZXIuc3luY0V4aXN0cyA9ICQoc2xpZGVyLnZhcnMuc3luYykubGVuZ3RoID4gMDtcbiAgICAgICAgLy8gU0xJREU6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb24gPT09IFwic2xpZGVcIikgc2xpZGVyLnZhcnMuYW5pbWF0aW9uID0gXCJzd2luZ1wiO1xuICAgICAgICBzbGlkZXIucHJvcCA9ICh2ZXJ0aWNhbCkgPyBcInRvcFwiIDogXCJtYXJnaW5MZWZ0XCI7XG4gICAgICAgIHNsaWRlci5hcmdzID0ge307XG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gZmFsc2U7XG4gICAgICAgIHNsaWRlci5zdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIC8vUEFVU0UgV0hFTiBJTlZJU0lCTEVcbiAgICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgc2xpZGVyLnN0YXJ0VGltZW91dCA9IG51bGw7XG4gICAgICAgIC8vIFRPVUNIL1VTRUNTUzpcbiAgICAgICAgc2xpZGVyLnRyYW5zaXRpb25zID0gIXNsaWRlci52YXJzLnZpZGVvICYmICFmYWRlICYmIHNsaWRlci52YXJzLnVzZUNTUyAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgICBwcm9wcyA9IFsncGVyc3BlY3RpdmVQcm9wZXJ0eScsICdXZWJraXRQZXJzcGVjdGl2ZScsICdNb3pQZXJzcGVjdGl2ZScsICdPUGVyc3BlY3RpdmUnLCAnbXNQZXJzcGVjdGl2ZSddO1xuICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICggb2JqLnN0eWxlWyBwcm9wc1tpXSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgIHNsaWRlci5wZnggPSBwcm9wc1tpXS5yZXBsYWNlKCdQZXJzcGVjdGl2ZScsJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIHNsaWRlci5wcm9wID0gXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNmb3JtXCI7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIHNsaWRlci5lbnN1cmVBbmltYXRpb25FbmQgPSAnJztcbiAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lciAhPT0gXCJcIikgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyID0gJChzbGlkZXIudmFycy5jb250cm9sc0NvbnRhaW5lcikubGVuZ3RoID4gMCAmJiAkKHNsaWRlci52YXJzLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgLy8gTUFOVUFMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMgIT09IFwiXCIpIHNsaWRlci5tYW51YWxDb250cm9scyA9ICQoc2xpZGVyLnZhcnMubWFudWFsQ29udHJvbHMpLmxlbmd0aCA+IDAgJiYgJChzbGlkZXIudmFycy5tYW51YWxDb250cm9scyk7XG5cbiAgICAgICAgLy8gUkFORE9NSVpFOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMucmFuZG9taXplKSB7XG4gICAgICAgICAgc2xpZGVyLnNsaWRlcy5zb3J0KGZ1bmN0aW9uKCkgeyByZXR1cm4gKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSktMC41KTsgfSk7XG4gICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5kb01hdGgoKTtcblxuICAgICAgICAvLyBJTklUXG4gICAgICAgIHNsaWRlci5zZXR1cChcImluaXRcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmNvbnRyb2xOYXYpIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYuc2V0dXAoKTtcblxuICAgICAgICAvLyBLRVlCT0FSRDpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmtleWJvYXJkICYmICgkKHNsaWRlci5jb250YWluZXJTZWxlY3RvcikubGVuZ3RoID09PSAxIHx8IHNsaWRlci52YXJzLm11bHRpcGxlS2V5Ym9hcmQpKSB7XG4gICAgICAgICAgJChkb2N1bWVudCkuYmluZCgna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGtleWNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIuYW5pbWF0aW5nICYmIChrZXljb2RlID09PSAzOSB8fCBrZXljb2RlID09PSAzNykpIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChrZXljb2RlID09PSAzOSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWNvZGUgPT09IDM3KSA/IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKSA6IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNT1VTRVdIRUVMOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMubW91c2V3aGVlbCkge1xuICAgICAgICAgIHNsaWRlci5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoZGVsdGEgPCAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUEFVU0VQTEFZXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5wYXVzZVBsYXkpIG1ldGhvZHMucGF1c2VQbGF5LnNldHVwKCk7XG5cbiAgICAgICAgLy9QQVVTRSBXSEVOIElOVklTSUJMRVxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc2xpZGVzaG93ICYmIHNsaWRlci52YXJzLnBhdXNlSW52aXNpYmxlKSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLmluaXQoKTtcblxuICAgICAgICAvLyBTTElEU0VTSE9XXG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbGlkZXNob3cpIHtcbiAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICAgICAgICBzbGlkZXIuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbFBsYXkgJiYgIXNsaWRlci5tYW51YWxQYXVzZSkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFzbGlkZXIubWFudWFsUGF1c2UgJiYgIXNsaWRlci5tYW51YWxQbGF5ICYmICFzbGlkZXIuc3RvcHBlZCkgc2xpZGVyLnBsYXkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpbml0aWFsaXplIGFuaW1hdGlvblxuICAgICAgICAgIC8vSWYgd2UncmUgdmlzaWJsZSwgb3Igd2UgZG9uJ3QgdXNlIFBhZ2VWaXNpYmlsaXR5IEFQSVxuICAgICAgICAgIGlmKCFzbGlkZXIudmFycy5wYXVzZUludmlzaWJsZSB8fCAhbWV0aG9kcy5wYXVzZUludmlzaWJsZS5pc0hpZGRlbigpKSB7XG4gICAgICAgICAgICAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzbGlkZXIuc3RhcnRUaW1lb3V0ID0gc2V0VGltZW91dChzbGlkZXIucGxheSwgc2xpZGVyLnZhcnMuaW5pdERlbGF5KSA6IHNsaWRlci5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQVNOQVY6XG4gICAgICAgIGlmIChhc05hdikgbWV0aG9kcy5hc05hdi5zZXR1cCgpO1xuXG4gICAgICAgIC8vIFRPVUNIXG4gICAgICAgIGlmICh0b3VjaCAmJiBzbGlkZXIudmFycy50b3VjaCkgbWV0aG9kcy50b3VjaCgpO1xuXG4gICAgICAgIC8vIEZBREUmJlNNT09USEhFSUdIVCB8fCBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlIHx8IChmYWRlICYmIHNsaWRlci52YXJzLnNtb290aEhlaWdodCkpICQod2luZG93KS5iaW5kKFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIGZvY3VzXCIsIG1ldGhvZHMucmVzaXplKTtcblxuICAgICAgICBzbGlkZXIuZmluZChcImltZ1wiKS5hdHRyKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG5cbiAgICAgICAgLy8gQVBJOiBzdGFydCgpIENhbGxiYWNrXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICBzbGlkZXIudmFycy5zdGFydChzbGlkZXIpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfSxcbiAgICAgIGFzTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuYXNOYXYgPSB0cnVlO1xuICAgICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IE1hdGguZmxvb3Ioc2xpZGVyLmN1cnJlbnRTbGlkZS9zbGlkZXIubW92ZSk7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRJdGVtID0gc2xpZGVyLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHNsaWRlci5jdXJyZW50SXRlbSkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgaWYoIW1zR2VzdHVyZSl7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMub24oZXZlbnRUeXBlLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgIHZhciBwb3NGcm9tTGVmdCA9ICRzbGlkZS5vZmZzZXQoKS5sZWZ0IC0gJChzbGlkZXIpLnNjcm9sbExlZnQoKTsgLy8gRmluZCBwb3NpdGlvbiBvZiBzbGlkZSByZWxhdGl2ZSB0byBsZWZ0IG9mIHNsaWRlciBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiggcG9zRnJvbUxlZnQgPD0gMCAmJiAkc2xpZGUuaGFzQ2xhc3MoIG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnICkgKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmdldFRhcmdldChcInByZXZcIiksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoISQoc2xpZGVyLnZhcnMuYXNOYXZGb3IpLmRhdGEoJ2ZsZXhzbGlkZXInKS5hbmltYXRpbmcgJiYgISRzbGlkZS5oYXNDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKSkge1xuICAgICAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIGZhbHNlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVhY2goZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICB0aGF0Ll9nZXN0dXJlID0gbmV3IE1TR2VzdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5fZ2VzdHVyZS50YXJnZXQgPSB0aGF0O1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNQb2ludGVyRG93blwiLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5fZ2VzdHVyZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0Ll9nZXN0dXJlLmFkZFBvaW50ZXIoZS5wb2ludGVySWQpO1xuICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5hZGRFdmVudExpc3RlbmVyKFwiTVNHZXN0dXJlVGFwXCIsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICRzbGlkZS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghJChzbGlkZXIudmFycy5hc05hdkZvcikuZGF0YSgnZmxleHNsaWRlcicpLmFuaW1hdGluZyAmJiAhJHNsaWRlLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xOYXY6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuc2V0dXBQYWdpbmcoKTtcbiAgICAgICAgICB9IGVsc2UgeyAvLyBNQU5VQUxDT05UUk9MUzpcbiAgICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi5zZXR1cE1hbnVhbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBQYWdpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0eXBlID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdjb250cm9sLXRodW1icycgOiAnY29udHJvbC1wYWdpbmcnLFxuICAgICAgICAgICAgICBqID0gMSxcbiAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgc2xpZGU7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkID0gJCgnPG9sIGNsYXNzPVwiJysgbmFtZXNwYWNlICsgJ2NvbnRyb2wtbmF2ICcgKyBuYW1lc3BhY2UgKyB0eXBlICsgJ1wiPjwvb2w+Jyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIucGFnaW5nQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBzbGlkZSA9IHNsaWRlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgIGl0ZW0gPSAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiA9PT0gXCJ0aHVtYm5haWxzXCIpID8gJzxpbWcgc3JjPVwiJyArIHNsaWRlLmF0dHIoICdkYXRhLXRodW1iJyApICsgJ1wiLz4nIDogJzxhPicgKyBqICsgJzwvYT4nO1xuICAgICAgICAgICAgICBpZiAoICd0aHVtYm5haWxzJyA9PT0gc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiB0cnVlID09PSBzbGlkZXIudmFycy50aHVtYkNhcHRpb25zICkge1xuICAgICAgICAgICAgICAgIHZhciBjYXB0biA9IHNsaWRlLmF0dHIoICdkYXRhLXRodW1iY2FwdGlvbicgKTtcbiAgICAgICAgICAgICAgICBpZiAoICcnICE9IGNhcHRuICYmIHVuZGVmaW5lZCAhPSBjYXB0biApIGl0ZW0gKz0gJzxzcGFuIGNsYXNzPVwiJyArIG5hbWVzcGFjZSArICdjYXB0aW9uXCI+JyArIGNhcHRuICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2U2NhZmZvbGQuYXBwZW5kKCc8bGk+JyArIGl0ZW0gKyAnPC9saT4nKTtcbiAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpID8gJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkKSA6IHNsaWRlci5hcHBlbmQoc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZCk7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuXG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5kZWxlZ2F0ZSgnYSwgaW1nJywgZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHNsaWRlci5jb250cm9sTmF2LmluZGV4KCR0aGlzKTtcblxuICAgICAgICAgICAgICBpZiAoISR0aGlzLmhhc0NsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldHVwTWFudWFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdiA9IHNsaWRlci5tYW51YWxDb250cm9scztcbiAgICAgICAgICBtZXRob2RzLmNvbnRyb2xOYXYuYWN0aXZlKCk7XG5cbiAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdi5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuY29udHJvbE5hdi5pbmRleCgkdGhpcyk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkdGhpcy5oYXNDbGFzcyhuYW1lc3BhY2UgKyAnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBzbGlkZXIuZGlyZWN0aW9uID0gXCJuZXh0XCIgOiBzbGlkZXIuZGlyZWN0aW9uID0gXCJwcmV2XCI7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0dXAgZmxhZ3MgdG8gcHJldmVudCBldmVudCBkdXBsaWNhdGlvblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIikge1xuICAgICAgICAgICAgICB3YXRjaGVkRXZlbnQgPSBldmVudC50eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWV0aG9kcy5zZXRUb0NsZWFyV2F0Y2hlZEV2ZW50KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gKHNsaWRlci52YXJzLmNvbnRyb2xOYXYgPT09IFwidGh1bWJuYWlsc1wiKSA/ICdpbWcnIDogJ2EnO1xuICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnY29udHJvbC1uYXYgbGkgJyArIHNlbGVjdG9yLCAoc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKSA/IHNsaWRlci5jb250cm9sc0NvbnRhaW5lciA6IHNsaWRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGFjdGl2ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXYucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmVcIikuZXEoc2xpZGVyLmFuaW1hdGluZ1RvKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbihhY3Rpb24sIHBvcykge1xuICAgICAgICAgIGlmIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIGFjdGlvbiA9PT0gXCJhZGRcIikge1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRyb2xOYXZTY2FmZm9sZC5hcHBlbmQoJCgnPGxpPjxhPicgKyBzbGlkZXIuY291bnQgKyAnPC9hPjwvbGk+JykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBzbGlkZXIuY29udHJvbE5hdlNjYWZmb2xkLmZpbmQoJ2xpJykucmVtb3ZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sTmF2LmVxKHBvcykuY2xvc2VzdCgnbGknKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnNldCgpO1xuICAgICAgICAgIChzbGlkZXIucGFnaW5nQ291bnQgPiAxICYmIHNsaWRlci5wYWdpbmdDb3VudCAhPT0gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSA/IHNsaWRlci51cGRhdGUocG9zLCBhY3Rpb24pIDogbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGlyZWN0aW9uTmF2OiB7XG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlyZWN0aW9uTmF2U2NhZmZvbGQgPSAkKCc8dWwgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ2RpcmVjdGlvbi1uYXZcIj48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ByZXZcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5wcmV2VGV4dCArICc8L2E+PC9saT48bGk+PGEgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ25leHRcIiBocmVmPVwiI1wiPicgKyBzbGlkZXIudmFycy5uZXh0VGV4dCArICc8L2E+PC9saT48L3VsPicpO1xuXG4gICAgICAgICAgLy8gQ09OVFJPTFNDT05UQUlORVI6XG4gICAgICAgICAgaWYgKHNsaWRlci5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgJChzbGlkZXIuY29udHJvbHNDb250YWluZXIpLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChkaXJlY3Rpb25OYXZTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAnZGlyZWN0aW9uLW5hdiBsaSBhJywgc2xpZGVyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYuYmluZChldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldDtcblxuICAgICAgICAgICAgaWYgKHdhdGNoZWRFdmVudCA9PT0gXCJcIiB8fCB3YXRjaGVkRXZlbnQgPT09IGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gKCQodGhpcykuaGFzQ2xhc3MobmFtZXNwYWNlICsgJ25leHQnKSkgPyBzbGlkZXIuZ2V0VGFyZ2V0KCduZXh0JykgOiBzbGlkZXIuZ2V0VGFyZ2V0KCdwcmV2Jyk7XG4gICAgICAgICAgICAgIHNsaWRlci5mbGV4QW5pbWF0ZSh0YXJnZXQsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXR1cCBmbGFncyB0byBwcmV2ZW50IGV2ZW50IGR1cGxpY2F0aW9uXG4gICAgICAgICAgICBpZiAod2F0Y2hlZEV2ZW50ID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgIHdhdGNoZWRFdmVudCA9IGV2ZW50LnR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXRob2RzLnNldFRvQ2xlYXJXYXRjaGVkRXZlbnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGlzYWJsZWRDbGFzcyA9IG5hbWVzcGFjZSArICdkaXNhYmxlZCc7XG4gICAgICAgICAgaWYgKHNsaWRlci5wYWdpbmdDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5hZGRDbGFzcyhkaXNhYmxlZENsYXNzKS5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IDApIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJwcmV2XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5hbmltYXRpbmdUbyA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbk5hdi5yZW1vdmVDbGFzcyhkaXNhYmxlZENsYXNzKS5maWx0ZXIoJy4nICsgbmFtZXNwYWNlICsgXCJuZXh0XCIpLmFkZENsYXNzKGRpc2FibGVkQ2xhc3MpLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZXIuZGlyZWN0aW9uTmF2LnJlbW92ZUNsYXNzKGRpc2FibGVkQ2xhc3MpLnJlbW92ZUF0dHIoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5kaXJlY3Rpb25OYXYucmVtb3ZlQ2xhc3MoZGlzYWJsZWRDbGFzcykucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXVzZVBsYXk6IHtcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwYXVzZVBsYXlTY2FmZm9sZCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheVwiPjxhPjwvYT48L2Rpdj4nKTtcblxuICAgICAgICAgIC8vIENPTlRST0xTQ09OVEFJTkVSOlxuICAgICAgICAgIGlmIChzbGlkZXIuY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250cm9sc0NvbnRhaW5lci5hcHBlbmQocGF1c2VQbGF5U2NhZmZvbGQpO1xuICAgICAgICAgICAgc2xpZGVyLnBhdXNlUGxheSA9ICQoJy4nICsgbmFtZXNwYWNlICsgJ3BhdXNlcGxheSBhJywgc2xpZGVyLmNvbnRyb2xzQ29udGFpbmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZChwYXVzZVBsYXlTY2FmZm9sZCk7XG4gICAgICAgICAgICBzbGlkZXIucGF1c2VQbGF5ID0gJCgnLicgKyBuYW1lc3BhY2UgKyAncGF1c2VwbGF5IGEnLCBzbGlkZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1ldGhvZHMucGF1c2VQbGF5LnVwZGF0ZSgoc2xpZGVyLnZhcnMuc2xpZGVzaG93KSA/IG5hbWVzcGFjZSArICdwYXVzZScgOiBuYW1lc3BhY2UgKyAncGxheScpO1xuXG4gICAgICAgICAgc2xpZGVyLnBhdXNlUGxheS5iaW5kKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIgfHwgd2F0Y2hlZEV2ZW50ID09PSBldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLm1hbnVhbFBhdXNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIubWFudWFsUGxheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNsaWRlci5tYW51YWxQbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzbGlkZXIucGxheSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldHVwIGZsYWdzIHRvIHByZXZlbnQgZXZlbnQgZHVwbGljYXRpb25cbiAgICAgICAgICAgIGlmICh3YXRjaGVkRXZlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gZXZlbnQudHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldGhvZHMuc2V0VG9DbGVhcldhdGNoZWRFdmVudCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgKHN0YXRlID09PSBcInBsYXlcIikgPyBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwYXVzZScpLmFkZENsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuaHRtbChzbGlkZXIudmFycy5wbGF5VGV4dCkgOiBzbGlkZXIucGF1c2VQbGF5LnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdwbGF5JykuYWRkQ2xhc3MobmFtZXNwYWNlICsgJ3BhdXNlJykuaHRtbChzbGlkZXIudmFycy5wYXVzZVRleHQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnRYLFxuICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgY3dpZHRoLFxuICAgICAgICAgIGR4LFxuICAgICAgICAgIHN0YXJ0VCxcbiAgICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZSxcbiAgICAgICAgICBsb2NhbFggPSAwLFxuICAgICAgICAgIGxvY2FsWSA9IDAsXG4gICAgICAgICAgYWNjRHggPSAwO1xuXG4gICAgICAgIGlmKCFtc0dlc3R1cmUpe1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggKCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgKSB8fCBlLnRvdWNoZXMubGVuZ3RoID09PSAxICkge1xuICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIENBUk9VU0VMOlxuICAgICAgICAgICAgICAgIGN3aWR0aCA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuaCA6IHNsaWRlci4gdztcbiAgICAgICAgICAgICAgICBzdGFydFQgPSBOdW1iZXIobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAvLyBMb2NhbCB2YXJzIGZvciBYIGFuZCBZIHBvaW50cy5cbiAgICAgICAgICAgICAgICBsb2NhbFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAoY2Fyb3VzZWwgJiYgcmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHJldmVyc2UpID8gKHNsaWRlci5sYXN0IC0gc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGggOiAoc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBjd2lkdGg7XG4gICAgICAgICAgICAgICAgc3RhcnRYID0gKHZlcnRpY2FsKSA/IGxvY2FsWSA6IGxvY2FsWDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSAodmVydGljYWwpID8gbG9jYWxYIDogbG9jYWxZO1xuXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICAgICAgICAgIC8vIExvY2FsIHZhcnMgZm9yIFggYW5kIFkgcG9pbnRzLlxuXG4gICAgICAgICAgICAgIGxvY2FsWCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgICAgICAgbG9jYWxZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuXG4gICAgICAgICAgICAgIGR4ID0gKHZlcnRpY2FsKSA/IHN0YXJ0WCAtIGxvY2FsWSA6IHN0YXJ0WCAtIGxvY2FsWDtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gKHZlcnRpY2FsKSA/IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFggLSBzdGFydFkpKSA6IChNYXRoLmFicyhkeCkgPCBNYXRoLmFicyhsb2NhbFkgLSBzdGFydFkpKTtcblxuICAgICAgICAgICAgICB2YXIgZnhtcyA9IDUwMDtcblxuICAgICAgICAgICAgICBpZiAoICEgc2Nyb2xsaW5nIHx8IE51bWJlciggbmV3IERhdGUoKSApIC0gc3RhcnRUID4gZnhtcyApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWRlICYmIHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4ID0gZHgvKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGR4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBkeCA+IDApID8gKE1hdGguYWJzKGR4KS9jd2lkdGgrMikgOiAxKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhvZmZzZXQgKyBkeCwgXCJzZXRUb3VjaFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Ub3VjaEVuZChlKSB7XG4gICAgICAgICAgICAgIC8vIGZpbmlzaCB0aGUgdG91Y2ggYnkgdW5kb2luZyB0aGUgdG91Y2ggc2Vzc2lvblxuICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVEeCA9IChyZXZlcnNlKSA/IC1keCA6IGR4LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAodXBkYXRlRHggPiAwKSA/IHNsaWRlci5nZXRUYXJnZXQoJ25leHQnKSA6IHNsaWRlci5nZXRUYXJnZXQoJ3ByZXYnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKCFmYWRlKSBzbGlkZXIuZmxleEFuaW1hdGUoc2xpZGVyLmN1cnJlbnRTbGlkZSwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgIHN0YXJ0WCA9IG51bGw7XG4gICAgICAgICAgICAgIHN0YXJ0WSA9IG51bGw7XG4gICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgb2Zmc2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbC5zdHlsZS5tc1RvdWNoQWN0aW9uID0gXCJub25lXCI7XG4gICAgICAgICAgICBlbC5fZ2VzdHVyZSA9IG5ldyBNU0dlc3R1cmUoKTtcbiAgICAgICAgICAgIGVsLl9nZXN0dXJlLnRhcmdldCA9IGVsO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TUG9pbnRlckRvd25cIiwgb25NU1BvaW50ZXJEb3duLCBmYWxzZSk7XG4gICAgICAgICAgICBlbC5fc2xpZGVyID0gc2xpZGVyO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUNoYW5nZVwiLCBvbk1TR2VzdHVyZUNoYW5nZSwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIk1TR2VzdHVyZUVuZFwiLCBvbk1TR2VzdHVyZUVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbk1TUG9pbnRlckRvd24oZSl7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5hZGRQb2ludGVyKGUucG9pbnRlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgYWNjRHggPSAwO1xuICAgICAgICAgICAgICAgICAgICBjd2lkdGggPSAodmVydGljYWwpID8gc2xpZGVyLmggOiBzbGlkZXIuIHc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VCA9IE51bWJlcihuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ0FST1VTRUw6XG5cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gKGNhcm91c2VsICYmIHJldmVyc2UgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCAmJiByZXZlcnNlKSA/IHNsaWRlci5saW1pdCAtICgoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0KSA/IHNsaWRlci5saW1pdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjYXJvdXNlbCkgPyAoKHNsaWRlci5pdGVtVyArIHNsaWRlci52YXJzLml0ZW1NYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmN1cnJlbnRTbGlkZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyAoc2xpZGVyLmxhc3QgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aCA6IChzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGN3aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0cmFuc1ggPSAtZS50cmFuc2xhdGlvblgsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zWSA9IC1lLnRyYW5zbGF0aW9uWTtcblxuICAgICAgICAgICAgICAgIC8vQWNjdW11bGF0ZSB0cmFuc2xhdGlvbnMuXG4gICAgICAgICAgICAgICAgYWNjRHggPSBhY2NEeCArICgodmVydGljYWwpID8gdHJhbnNZIDogdHJhbnNYKTtcbiAgICAgICAgICAgICAgICBkeCA9IGFjY0R4O1xuICAgICAgICAgICAgICAgIHNjcm9sbGluZyA9ICh2ZXJ0aWNhbCkgPyAoTWF0aC5hYnMoYWNjRHgpIDwgTWF0aC5hYnMoLXRyYW5zWCkpIDogKE1hdGguYWJzKGFjY0R4KSA8IE1hdGguYWJzKC10cmFuc1kpKTtcblxuICAgICAgICAgICAgICAgIGlmKGUuZGV0YWlsID09PSBlLk1TR0VTVFVSRV9GTEFHX0lORVJUSUEpe1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5fZ2VzdHVyZS5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNjcm9sbGluZyB8fCBOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPiA1MDApIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZhZGUgJiYgc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCA9IGFjY0R4IC8gKChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIGFjY0R4IDwgMCB8fCBzbGlkZXIuY3VycmVudFNsaWRlID09PSBzbGlkZXIubGFzdCAmJiBhY2NEeCA+IDApID8gKE1hdGguYWJzKGFjY0R4KSAvIGN3aWR0aCArIDIpIDogMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMob2Zmc2V0ICsgZHgsIFwic2V0VG91Y2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTVNHZXN0dXJlRW5kKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXIgPSBlLnRhcmdldC5fc2xpZGVyO1xuICAgICAgICAgICAgICAgIGlmKCFzbGlkZXIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIXNjcm9sbGluZyAmJiAhKGR4ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlRHggPSAocmV2ZXJzZSkgPyAtZHggOiBkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9ICh1cGRhdGVEeCA+IDApID8gc2xpZGVyLmdldFRhcmdldCgnbmV4dCcpIDogc2xpZGVyLmdldFRhcmdldCgncHJldicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXIuY2FuQWR2YW5jZSh0YXJnZXQpICYmIChOdW1iZXIobmV3IERhdGUoKSkgLSBzdGFydFQgPCA1NTAgJiYgTWF0aC5hYnModXBkYXRlRHgpID4gNTAgfHwgTWF0aC5hYnModXBkYXRlRHgpID4gY3dpZHRoLzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXIuZmxleEFuaW1hdGUodGFyZ2V0LCBzbGlkZXIudmFycy5wYXVzZU9uQWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmFkZSkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5jdXJyZW50U2xpZGUsIHNsaWRlci52YXJzLnBhdXNlT25BY3Rpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RhcnRYID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzdGFydFkgPSBudWxsO1xuICAgICAgICAgICAgICAgIGR4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGFjY0R4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBzbGlkZXIuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgICAgICBpZiAoZmFkZSkge1xuICAgICAgICAgICAgLy8gU01PT1RIIEhFSUdIVDpcbiAgICAgICAgICAgIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjYXJvdXNlbCkgeyAvL0NBUk9VU0VMOlxuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci51cGRhdGUoc2xpZGVyLnBhZ2luZ0NvdW50KTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbCkgeyAvL1ZFUlRJQ0FMOlxuICAgICAgICAgICAgc2xpZGVyLnZpZXdwb3J0LmhlaWdodChzbGlkZXIuaCk7XG4gICAgICAgICAgICBzbGlkZXIuc2V0UHJvcHMoc2xpZGVyLmgsIFwic2V0VG90YWxcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodCgpO1xuICAgICAgICAgICAgc2xpZGVyLm5ld1NsaWRlcy53aWR0aChzbGlkZXIuY29tcHV0ZWRXKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXIuY29tcHV0ZWRXLCBcInNldFRvdGFsXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNtb290aEhlaWdodDogZnVuY3Rpb24oZHVyKSB7XG4gICAgICAgIGlmICghdmVydGljYWwgfHwgZmFkZSkge1xuICAgICAgICAgIHZhciAkb2JqID0gKGZhZGUpID8gc2xpZGVyIDogc2xpZGVyLnZpZXdwb3J0O1xuICAgICAgICAgIChkdXIpID8gJG9iai5hbmltYXRlKHtcImhlaWdodFwiOiBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5hbmltYXRpbmdUbykuaGVpZ2h0KCl9LCBkdXIpIDogJG9iai5oZWlnaHQoc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuYW5pbWF0aW5nVG8pLmhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHN5bmM6IGZ1bmN0aW9uKGFjdGlvbikge1xuICAgICAgICB2YXIgJG9iaiA9ICQoc2xpZGVyLnZhcnMuc3luYykuZGF0YShcImZsZXhzbGlkZXJcIiksXG4gICAgICAgICAgICB0YXJnZXQgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG5cbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwiYW5pbWF0ZVwiOiAkb2JqLmZsZXhBbmltYXRlKHRhcmdldCwgc2xpZGVyLnZhcnMucGF1c2VPbkFjdGlvbiwgZmFsc2UsIHRydWUpOyBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGxheVwiOiBpZiAoISRvYmoucGxheWluZyAmJiAhJG9iai5hc05hdikgeyAkb2JqLnBsYXkoKTsgfSBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGF1c2VcIjogJG9iai5wYXVzZSgpOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVuaXF1ZUlEOiBmdW5jdGlvbigkY2xvbmUpIHtcbiAgICAgICAgLy8gQXBwZW5kIF9jbG9uZSB0byBjdXJyZW50IGxldmVsIGFuZCBjaGlsZHJlbiBlbGVtZW50cyB3aXRoIGlkIGF0dHJpYnV0ZXNcbiAgICAgICAgJGNsb25lLmZpbHRlciggJ1tpZF0nICkuYWRkKCRjbG9uZS5maW5kKCAnW2lkXScgKSkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICR0aGlzLmF0dHIoICdpZCcsICR0aGlzLmF0dHIoICdpZCcgKSArICdfY2xvbmUnICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJGNsb25lO1xuICAgICAgfSxcbiAgICAgIHBhdXNlSW52aXNpYmxlOiB7XG4gICAgICAgIHZpc1Byb3A6IG51bGwsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcmVmaXhlcyA9IFsnd2Via2l0JywnbW96JywnbXMnLCdvJ107XG5cbiAgICAgICAgICBpZiAoJ2hpZGRlbicgaW4gZG9jdW1lbnQpIHJldHVybiAnaGlkZGVuJztcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKHByZWZpeGVzW2ldICsgJ0hpZGRlbicpIGluIGRvY3VtZW50KVxuICAgICAgICAgICAgbWV0aG9kcy5wYXVzZUludmlzaWJsZS52aXNQcm9wID0gcHJlZml4ZXNbaV0gKyAnSGlkZGVuJztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUudmlzUHJvcCkge1xuICAgICAgICAgICAgdmFyIGV2dG5hbWUgPSBtZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3AucmVwbGFjZSgvW0h8aF1pZGRlbi8sJycpICsgJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRuYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKG1ldGhvZHMucGF1c2VJbnZpc2libGUuaXNIaWRkZW4oKSkge1xuICAgICAgICAgICAgICAgIGlmKHNsaWRlci5zdGFydFRpbWVvdXQpIGNsZWFyVGltZW91dChzbGlkZXIuc3RhcnRUaW1lb3V0KTsgLy9JZiBjbG9jayBpcyB0aWNraW5nLCBzdG9wIHRpbWVyIGFuZCBwcmV2ZW50IGZyb20gc3RhcnRpbmcgd2hpbGUgaW52aXNpYmxlXG4gICAgICAgICAgICAgICAgZWxzZSBzbGlkZXIucGF1c2UoKTsgLy9PciBqdXN0IHBhdXNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoc2xpZGVyLnN0YXJ0ZWQpIHNsaWRlci5wbGF5KCk7IC8vSW5pdGlhdGVkIGJlZm9yZSwganVzdCBwbGF5XG4gICAgICAgICAgICAgICAgZWxzZSAoc2xpZGVyLnZhcnMuaW5pdERlbGF5ID4gMCkgPyBzZXRUaW1lb3V0KHNsaWRlci5wbGF5LCBzbGlkZXIudmFycy5pbml0RGVsYXkpIDogc2xpZGVyLnBsYXkoKTsgLy9EaWRuJ3QgaW5pdCBiZWZvcmU6IHNpbXBseSBpbml0IG9yIHdhaXQgZm9yIGl0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNIaWRkZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudFttZXRob2RzLnBhdXNlSW52aXNpYmxlLnZpc1Byb3BdIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0VG9DbGVhcldhdGNoZWRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh3YXRjaGVkRXZlbnRDbGVhclRpbWVyKTtcbiAgICAgICAgd2F0Y2hlZEV2ZW50Q2xlYXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2F0Y2hlZEV2ZW50ID0gXCJcIjtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHB1YmxpYyBtZXRob2RzXG4gICAgc2xpZGVyLmZsZXhBbmltYXRlID0gZnVuY3Rpb24odGFyZ2V0LCBwYXVzZSwgb3ZlcnJpZGUsIHdpdGhTeW5jLCBmcm9tTmF2KSB7XG4gICAgICBpZiAoIXNsaWRlci52YXJzLmFuaW1hdGlvbkxvb3AgJiYgdGFyZ2V0ICE9PSBzbGlkZXIuY3VycmVudFNsaWRlKSB7XG4gICAgICAgIHNsaWRlci5kaXJlY3Rpb24gPSAodGFyZ2V0ID4gc2xpZGVyLmN1cnJlbnRTbGlkZSkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXNOYXYgJiYgc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSBzbGlkZXIuZGlyZWN0aW9uID0gKHNsaWRlci5jdXJyZW50SXRlbSA8IHRhcmdldCkgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuXG4gICAgICBpZiAoIXNsaWRlci5hbmltYXRpbmcgJiYgKHNsaWRlci5jYW5BZHZhbmNlKHRhcmdldCwgZnJvbU5hdikgfHwgb3ZlcnJpZGUpICYmIHNsaWRlci5pcyhcIjp2aXNpYmxlXCIpKSB7XG4gICAgICAgIGlmIChhc05hdiAmJiB3aXRoU3luYykge1xuICAgICAgICAgIHZhciBtYXN0ZXIgPSAkKHNsaWRlci52YXJzLmFzTmF2Rm9yKS5kYXRhKCdmbGV4c2xpZGVyJyk7XG4gICAgICAgICAgc2xpZGVyLmF0RW5kID0gdGFyZ2V0ID09PSAwIHx8IHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgICAgICBtYXN0ZXIuZmxleEFuaW1hdGUodGFyZ2V0LCB0cnVlLCBmYWxzZSwgdHJ1ZSwgZnJvbU5hdik7XG4gICAgICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IChzbGlkZXIuY3VycmVudEl0ZW0gPCB0YXJnZXQpID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgICBtYXN0ZXIuZGlyZWN0aW9uID0gc2xpZGVyLmRpcmVjdGlvbjtcblxuICAgICAgICAgIGlmIChNYXRoLmNlaWwoKHRhcmdldCArIDEpL3NsaWRlci52aXNpYmxlKSAtIDEgIT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgdGFyZ2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBzbGlkZXIuY3VycmVudEl0ZW0gPSB0YXJnZXQ7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArIFwiYWN0aXZlLXNsaWRlXCIpLmVxKHRhcmdldCkuYWRkQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIik7XG4gICAgICAgICAgICB0YXJnZXQgPSBNYXRoLmZsb29yKHRhcmdldC9zbGlkZXIudmlzaWJsZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jdXJyZW50SXRlbSA9IHRhcmdldDtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMucmVtb3ZlQ2xhc3MobmFtZXNwYWNlICsgXCJhY3RpdmUtc2xpZGVcIikuZXEodGFyZ2V0KS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvID0gdGFyZ2V0O1xuXG4gICAgICAgIC8vIFNMSURFU0hPVzpcbiAgICAgICAgaWYgKHBhdXNlKSBzbGlkZXIucGF1c2UoKTtcblxuICAgICAgICAvLyBBUEk6IGJlZm9yZSgpIGFuaW1hdGlvbiBDYWxsYmFja1xuICAgICAgICBzbGlkZXIudmFycy5iZWZvcmUoc2xpZGVyKTtcblxuICAgICAgICAvLyBTWU5DOlxuICAgICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMgJiYgIWZyb21OYXYpIG1ldGhvZHMuc3luYyhcImFuaW1hdGVcIik7XG5cbiAgICAgICAgLy8gQ09OVFJPTE5BVlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdikgbWV0aG9kcy5jb250cm9sTmF2LmFjdGl2ZSgpO1xuXG4gICAgICAgIC8vICFDQVJPVVNFTDpcbiAgICAgICAgLy8gQ0FORElEQVRFOiBzbGlkZSBhY3RpdmUgY2xhc3MgKGZvciBhZGQvcmVtb3ZlIHNsaWRlKVxuICAgICAgICBpZiAoIWNhcm91c2VsKSBzbGlkZXIuc2xpZGVzLnJlbW92ZUNsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKS5lcSh0YXJnZXQpLmFkZENsYXNzKG5hbWVzcGFjZSArICdhY3RpdmUtc2xpZGUnKTtcblxuICAgICAgICAvLyBJTkZJTklURSBMT09QOlxuICAgICAgICAvLyBDQU5ESURBVEU6IGF0RW5kXG4gICAgICAgIHNsaWRlci5hdEVuZCA9IHRhcmdldCA9PT0gMCB8fCB0YXJnZXQgPT09IHNsaWRlci5sYXN0O1xuXG4gICAgICAgIC8vIERJUkVDVElPTk5BVjpcbiAgICAgICAgaWYgKHNsaWRlci52YXJzLmRpcmVjdGlvbk5hdikgbWV0aG9kcy5kaXJlY3Rpb25OYXYudXBkYXRlKCk7XG5cbiAgICAgICAgaWYgKHRhcmdldCA9PT0gc2xpZGVyLmxhc3QpIHtcbiAgICAgICAgICAvLyBBUEk6IGVuZCgpIG9mIGN5Y2xlIENhbGxiYWNrXG4gICAgICAgICAgc2xpZGVyLnZhcnMuZW5kKHNsaWRlcik7XG4gICAgICAgICAgLy8gU0xJREVTSE9XICYmICFJTkZJTklURSBMT09QOlxuICAgICAgICAgIGlmICghc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgc2xpZGVyLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTTElERTpcbiAgICAgICAgaWYgKCFmYWRlKSB7XG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9ICh2ZXJ0aWNhbCkgPyBzbGlkZXIuc2xpZGVzLmZpbHRlcignOmZpcnN0JykuaGVpZ2h0KCkgOiBzbGlkZXIuY29tcHV0ZWRXLFxuICAgICAgICAgICAgICBtYXJnaW4sIHNsaWRlU3RyaW5nLCBjYWxjTmV4dDtcblxuICAgICAgICAgIC8vIElORklOSVRFIExPT1AgLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICAgICAgLy9tYXJnaW4gPSAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbiAqIDIgOiBzbGlkZXIudmFycy5pdGVtTWFyZ2luO1xuICAgICAgICAgICAgbWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbjtcbiAgICAgICAgICAgIGNhbGNOZXh0ID0gKChzbGlkZXIuaXRlbVcgKyBtYXJnaW4pICogc2xpZGVyLm1vdmUpICogc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgc2xpZGVTdHJpbmcgPSAoY2FsY05leHQgPiBzbGlkZXIubGltaXQgJiYgc2xpZGVyLnZpc2libGUgIT09IDEpID8gc2xpZGVyLmxpbWl0IDogY2FsY05leHQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwICYmIHRhcmdldCA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogZGltZW5zaW9uIDogMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHRhcmdldCA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwicHJldlwiKSB7XG4gICAgICAgICAgICBzbGlkZVN0cmluZyA9IChyZXZlcnNlKSA/IDAgOiAoc2xpZGVyLmNvdW50ICsgMSkgKiBkaW1lbnNpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlU3RyaW5nID0gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHRhcmdldCArIHNsaWRlci5jbG9uZU9mZnNldCkgKiBkaW1lbnNpb24gOiAodGFyZ2V0ICsgc2xpZGVyLmNsb25lT2Zmc2V0KSAqIGRpbWVuc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlU3RyaW5nLCBcIlwiLCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICAgICAgaWYgKHNsaWRlci50cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFzbGlkZXIudmFycy5hbmltYXRpb25Mb29wIHx8ICFzbGlkZXIuYXRFbmQpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlID0gc2xpZGVyLmFuaW1hdGluZ1RvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVbmJpbmQgcHJldmlvdXMgdHJhbnNpdGlvbkVuZCBldmVudHMgYW5kIHJlLWJpbmQgbmV3IHRyYW5zaXRpb25FbmQgZXZlbnRcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIudW5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5iaW5kKFwid2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICAgIHNsaWRlci53cmFwdXAoZGltZW5zaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJbnN1cmFuY2UgZm9yIHRoZSBldmVyLXNvLWZpY2tsZSB0cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2xpZGVyLmVuc3VyZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgICAgICBzbGlkZXIuZW5zdXJlQW5pbWF0aW9uRW5kID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQgKyAxMDApO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYW5pbWF0ZShzbGlkZXIuYXJncywgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBGQURFOlxuICAgICAgICAgIGlmICghdG91Y2gpIHtcbiAgICAgICAgICAgIC8vc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5mYWRlT3V0KHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcpO1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuZmFkZUluKHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLCBzbGlkZXIudmFycy5lYXNpbmcsIHNsaWRlci53cmFwdXApO1xuXG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMX0pLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgc2xpZGVyLnZhcnMuYW5pbWF0aW9uU3BlZWQsIHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHRhcmdldCkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nLCBzbGlkZXIud3JhcHVwKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcInpJbmRleFwiOiAxIH0pO1xuICAgICAgICAgICAgc2xpZGVyLnNsaWRlcy5lcSh0YXJnZXQpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyIH0pO1xuICAgICAgICAgICAgc2xpZGVyLndyYXB1cChkaW1lbnNpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICBpZiAoc2xpZGVyLnZhcnMuc21vb3RoSGVpZ2h0KSBtZXRob2RzLnNtb290aEhlaWdodChzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzbGlkZXIud3JhcHVwID0gZnVuY3Rpb24oZGltZW5zaW9uKSB7XG4gICAgICAvLyBTTElERTpcbiAgICAgIGlmICghZmFkZSAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wRW5kXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jdXJyZW50U2xpZGUgPT09IHNsaWRlci5sYXN0ICYmIHNsaWRlci5hbmltYXRpbmdUbyA9PT0gMCAmJiBzbGlkZXIudmFycy5hbmltYXRpb25Mb29wKSB7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKGRpbWVuc2lvbiwgXCJqdW1wU3RhcnRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHNsaWRlci5jdXJyZW50U2xpZGUgPSBzbGlkZXIuYW5pbWF0aW5nVG87XG4gICAgICAvLyBBUEk6IGFmdGVyKCkgYW5pbWF0aW9uIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5hZnRlcihzbGlkZXIpO1xuICAgIH07XG5cbiAgICAvLyBTTElERVNIT1c6XG4gICAgc2xpZGVyLmFuaW1hdGVTbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2xpZGVyLmFuaW1hdGluZyAmJiBmb2N1c2VkICkgc2xpZGVyLmZsZXhBbmltYXRlKHNsaWRlci5nZXRUYXJnZXQoXCJuZXh0XCIpKTtcbiAgICB9O1xuICAgIC8vIFNMSURFU0hPVzpcbiAgICBzbGlkZXIucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IG51bGw7XG4gICAgICBzbGlkZXIucGxheWluZyA9IGZhbHNlO1xuICAgICAgLy8gUEFVU0VQTEFZOlxuICAgICAgaWYgKHNsaWRlci52YXJzLnBhdXNlUGxheSkgbWV0aG9kcy5wYXVzZVBsYXkudXBkYXRlKFwicGxheVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBhdXNlXCIpO1xuICAgIH07XG4gICAgLy8gU0xJREVTSE9XOlxuICAgIHNsaWRlci5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2xpZGVyLnBsYXlpbmcpIGNsZWFySW50ZXJ2YWwoc2xpZGVyLmFuaW1hdGVkU2xpZGVzKTtcbiAgICAgIHNsaWRlci5hbmltYXRlZFNsaWRlcyA9IHNsaWRlci5hbmltYXRlZFNsaWRlcyB8fCBzZXRJbnRlcnZhbChzbGlkZXIuYW5pbWF0ZVNsaWRlcywgc2xpZGVyLnZhcnMuc2xpZGVzaG93U3BlZWQpO1xuICAgICAgc2xpZGVyLnN0YXJ0ZWQgPSBzbGlkZXIucGxheWluZyA9IHRydWU7XG4gICAgICAvLyBQQVVTRVBMQVk6XG4gICAgICBpZiAoc2xpZGVyLnZhcnMucGF1c2VQbGF5KSBtZXRob2RzLnBhdXNlUGxheS51cGRhdGUoXCJwYXVzZVwiKTtcbiAgICAgIC8vIFNZTkM6XG4gICAgICBpZiAoc2xpZGVyLnN5bmNFeGlzdHMpIG1ldGhvZHMuc3luYyhcInBsYXlcIik7XG4gICAgfTtcbiAgICAvLyBTVE9QOlxuICAgIHNsaWRlci5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2xpZGVyLnBhdXNlKCk7XG4gICAgICBzbGlkZXIuc3RvcHBlZCA9IHRydWU7XG4gICAgfTtcbiAgICBzbGlkZXIuY2FuQWR2YW5jZSA9IGZ1bmN0aW9uKHRhcmdldCwgZnJvbU5hdikge1xuICAgICAgLy8gQVNOQVY6XG4gICAgICB2YXIgbGFzdCA9IChhc05hdikgPyBzbGlkZXIucGFnaW5nQ291bnQgLSAxIDogc2xpZGVyLmxhc3Q7XG4gICAgICByZXR1cm4gKGZyb21OYXYpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gc2xpZGVyLmNvdW50IC0gMSAmJiB0YXJnZXQgPT09IDAgJiYgc2xpZGVyLmRpcmVjdGlvbiA9PT0gXCJwcmV2XCIpID8gdHJ1ZSA6XG4gICAgICAgICAgICAgKGFzTmF2ICYmIHNsaWRlci5jdXJyZW50SXRlbSA9PT0gMCAmJiB0YXJnZXQgPT09IHNsaWRlci5wYWdpbmdDb3VudCAtIDEgJiYgc2xpZGVyLmRpcmVjdGlvbiAhPT0gXCJuZXh0XCIpID8gZmFsc2UgOlxuICAgICAgICAgICAgICh0YXJnZXQgPT09IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgIWFzTmF2KSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuYW5pbWF0aW9uTG9vcCkgPyB0cnVlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IDAgJiYgdGFyZ2V0ID09PSBsYXN0ICYmIHNsaWRlci5kaXJlY3Rpb24gIT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICAoc2xpZGVyLmF0RW5kICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPT09IGxhc3QgJiYgdGFyZ2V0ID09PSAwICYmIHNsaWRlci5kaXJlY3Rpb24gPT09IFwibmV4dFwiKSA/IGZhbHNlIDpcbiAgICAgICAgICAgICB0cnVlO1xuICAgIH07XG4gICAgc2xpZGVyLmdldFRhcmdldCA9IGZ1bmN0aW9uKGRpcikge1xuICAgICAgc2xpZGVyLmRpcmVjdGlvbiA9IGRpcjtcbiAgICAgIGlmIChkaXIgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIHJldHVybiAoc2xpZGVyLmN1cnJlbnRTbGlkZSA9PT0gc2xpZGVyLmxhc3QpID8gMCA6IHNsaWRlci5jdXJyZW50U2xpZGUgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChzbGlkZXIuY3VycmVudFNsaWRlID09PSAwKSA/IHNsaWRlci5sYXN0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSAtIDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNMSURFOlxuICAgIHNsaWRlci5zZXRQcm9wcyA9IGZ1bmN0aW9uKHBvcywgc3BlY2lhbCwgZHVyKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zQ2hlY2sgPSAocG9zKSA/IHBvcyA6ICgoc2xpZGVyLml0ZW1XICsgc2xpZGVyLnZhcnMuaXRlbU1hcmdpbikgKiBzbGlkZXIubW92ZSkgKiBzbGlkZXIuYW5pbWF0aW5nVG8sXG4gICAgICAgICAgICBwb3NDYWxjID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNwZWNpYWwgPT09IFwic2V0VG91Y2hcIikgPyBwb3MgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSAmJiBzbGlkZXIuYW5pbWF0aW5nVG8gPT09IHNsaWRlci5sYXN0KSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAocmV2ZXJzZSkgPyBzbGlkZXIubGltaXQgLSAoKChzbGlkZXIuaXRlbVcgKyBzbGlkZXIudmFycy5pdGVtTWFyZ2luKSAqIHNsaWRlci5tb3ZlKSAqIHNsaWRlci5hbmltYXRpbmdUbykgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLmFuaW1hdGluZ1RvID09PSBzbGlkZXIubGFzdCkgPyBzbGlkZXIubGltaXQgOiBwb3NDaGVjaztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNwZWNpYWwpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRUb3RhbFwiOiByZXR1cm4gKHJldmVyc2UpID8gKChzbGlkZXIuY291bnQgLSAxKSAtIHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zIDogKHNsaWRlci5jdXJyZW50U2xpZGUgKyBzbGlkZXIuY2xvbmVPZmZzZXQpICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInNldFRvdWNoXCI6IHJldHVybiAocmV2ZXJzZSkgPyBwb3MgOiBwb3M7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwianVtcEVuZFwiOiByZXR1cm4gKHJldmVyc2UpID8gcG9zIDogc2xpZGVyLmNvdW50ICogcG9zO1xuICAgICAgICAgICAgICAgICAgY2FzZSBcImp1bXBTdGFydFwiOiByZXR1cm4gKHJldmVyc2UpID8gc2xpZGVyLmNvdW50ICogcG9zIDogcG9zO1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgIHJldHVybiAocG9zQ2FsYyAqIC0xKSArIFwicHhcIjtcbiAgICAgICAgICB9KCkpO1xuXG4gICAgICBpZiAoc2xpZGVyLnRyYW5zaXRpb25zKSB7XG4gICAgICAgIHRhcmdldCA9ICh2ZXJ0aWNhbCkgPyBcInRyYW5zbGF0ZTNkKDAsXCIgKyB0YXJnZXQgKyBcIiwwKVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHRhcmdldCArIFwiLDAsMClcIjtcbiAgICAgICAgZHVyID0gKGR1ciAhPT0gdW5kZWZpbmVkKSA/IChkdXIvMTAwMCkgKyBcInNcIiA6IFwiMHNcIjtcbiAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCItXCIgKyBzbGlkZXIucGZ4ICsgXCItdHJhbnNpdGlvbi1kdXJhdGlvblwiLCBkdXIpO1xuICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIGR1cik7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlci5hcmdzW3NsaWRlci5wcm9wXSA9IHRhcmdldDtcbiAgICAgIGlmIChzbGlkZXIudHJhbnNpdGlvbnMgfHwgZHVyID09PSB1bmRlZmluZWQpIHNsaWRlci5jb250YWluZXIuY3NzKHNsaWRlci5hcmdzKTtcblxuICAgICAgc2xpZGVyLmNvbnRhaW5lci5jc3MoJ3RyYW5zZm9ybScsdGFyZ2V0KTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLnNldHVwID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgLy8gU0xJREU6XG4gICAgICBpZiAoIWZhZGUpIHtcbiAgICAgICAgdmFyIHNsaWRlck9mZnNldCwgYXJyO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImluaXRcIikge1xuICAgICAgICAgIHNsaWRlci52aWV3cG9ydCA9ICQoJzxkaXYgY2xhc3M9XCInICsgbmFtZXNwYWNlICsgJ3ZpZXdwb3J0XCI+PC9kaXY+JykuY3NzKHtcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCIsIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwifSkuYXBwZW5kVG8oc2xpZGVyKS5hcHBlbmQoc2xpZGVyLmNvbnRhaW5lcik7XG4gICAgICAgICAgLy8gSU5GSU5JVEUgTE9PUDpcbiAgICAgICAgICBzbGlkZXIuY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgc2xpZGVyLmNsb25lT2Zmc2V0ID0gMDtcbiAgICAgICAgICAvLyBSRVZFUlNFOlxuICAgICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICBhcnIgPSAkLm1ha2VBcnJheShzbGlkZXIuc2xpZGVzKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBzbGlkZXIuc2xpZGVzID0gJChhcnIpO1xuICAgICAgICAgICAgc2xpZGVyLmNvbnRhaW5lci5lbXB0eSgpLmFwcGVuZChzbGlkZXIuc2xpZGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSU5GSU5JVEUgTE9PUCAmJiAhQ0FST1VTRUw6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5hbmltYXRpb25Mb29wICYmICFjYXJvdXNlbCkge1xuICAgICAgICAgIHNsaWRlci5jbG9uZUNvdW50ID0gMjtcbiAgICAgICAgICBzbGlkZXIuY2xvbmVPZmZzZXQgPSAxO1xuICAgICAgICAgIC8vIGNsZWFyIG91dCBvbGQgY2xvbmVzXG4gICAgICAgICAgaWYgKHR5cGUgIT09IFwiaW5pdFwiKSBzbGlkZXIuY29udGFpbmVyLmZpbmQoJy5jbG9uZScpLnJlbW92ZSgpO1xuICAgICAgICAgIHNsaWRlci5jb250YWluZXIuYXBwZW5kKG1ldGhvZHMudW5pcXVlSUQoc2xpZGVyLnNsaWRlcy5maXJzdCgpLmNsb25lKCkuYWRkQ2xhc3MoJ2Nsb25lJykpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnByZXBlbmQobWV0aG9kcy51bmlxdWVJRChzbGlkZXIuc2xpZGVzLmxhc3QoKS5jbG9uZSgpLmFkZENsYXNzKCdjbG9uZScpKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykpO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5uZXdTbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yLCBzbGlkZXIpO1xuXG4gICAgICAgIHNsaWRlck9mZnNldCA9IChyZXZlcnNlKSA/IHNsaWRlci5jb3VudCAtIDEgLSBzbGlkZXIuY3VycmVudFNsaWRlICsgc2xpZGVyLmNsb25lT2Zmc2V0IDogc2xpZGVyLmN1cnJlbnRTbGlkZSArIHNsaWRlci5jbG9uZU9mZnNldDtcbiAgICAgICAgLy8gVkVSVElDQUw6XG4gICAgICAgIGlmICh2ZXJ0aWNhbCAmJiAhY2Fyb3VzZWwpIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLmhlaWdodCgoc2xpZGVyLmNvdW50ICsgc2xpZGVyLmNsb25lQ291bnQpICogMjAwICsgXCIlXCIpLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIikud2lkdGgoXCIxMDAlXCIpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNsaWRlci5uZXdTbGlkZXMuY3NzKHtcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIudmlld3BvcnQuaGVpZ2h0KHNsaWRlci5oKTtcbiAgICAgICAgICAgIHNsaWRlci5zZXRQcm9wcyhzbGlkZXJPZmZzZXQgKiBzbGlkZXIuaCwgXCJpbml0XCIpO1xuICAgICAgICAgIH0sICh0eXBlID09PSBcImluaXRcIikgPyAxMDAgOiAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuY29udGFpbmVyLndpZHRoKChzbGlkZXIuY291bnQgKyBzbGlkZXIuY2xvbmVDb3VudCkgKiAyMDAgKyBcIiVcIik7XG4gICAgICAgICAgc2xpZGVyLnNldFByb3BzKHNsaWRlck9mZnNldCAqIHNsaWRlci5jb21wdXRlZFcsIFwiaW5pdFwiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICAgICAgICBzbGlkZXIubmV3U2xpZGVzLmNzcyh7XCJ3aWR0aFwiOiBzbGlkZXIuY29tcHV0ZWRXLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcImRpc3BsYXlcIjogXCJibG9ja1wifSk7XG4gICAgICAgICAgICAvLyBTTU9PVEggSEVJR0hUOlxuICAgICAgICAgICAgaWYgKHNsaWRlci52YXJzLnNtb290aEhlaWdodCkgbWV0aG9kcy5zbW9vdGhIZWlnaHQoKTtcbiAgICAgICAgICB9LCAodHlwZSA9PT0gXCJpbml0XCIpID8gMTAwIDogMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7IC8vIEZBREU6XG4gICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHtcIndpZHRoXCI6IFwiMTAwJVwiLCBcImZsb2F0XCI6IFwibGVmdFwiLCBcIm1hcmdpblJpZ2h0XCI6IFwiLTEwMCVcIiwgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCJ9KTtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaW5pdFwiKSB7XG4gICAgICAgICAgaWYgKCF0b3VjaCkge1xuICAgICAgICAgICAgLy9zbGlkZXIuc2xpZGVzLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmZhZGVJbihzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCwgc2xpZGVyLnZhcnMuZWFzaW5nKTtcbiAgICAgICAgICAgIGlmIChzbGlkZXIudmFycy5mYWRlRmlyc3RTbGlkZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzbGlkZXIuc2xpZGVzLmNzcyh7IFwib3BhY2l0eVwiOiAwLCBcImRpc3BsYXlcIjogXCJibG9ja1wiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7XCJ6SW5kZXhcIjogMn0pLmNzcyh7XCJvcGFjaXR5XCI6IDF9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwiekluZGV4XCI6IDEgfSkuZXEoc2xpZGVyLmN1cnJlbnRTbGlkZSkuY3NzKHtcInpJbmRleFwiOiAyfSkuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LHNsaWRlci52YXJzLmFuaW1hdGlvblNwZWVkLHNsaWRlci52YXJzLmVhc2luZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlci5zbGlkZXMuY3NzKHsgXCJvcGFjaXR5XCI6IDAsIFwiZGlzcGxheVwiOiBcImJsb2NrXCIsIFwid2Via2l0VHJhbnNpdGlvblwiOiBcIm9wYWNpdHkgXCIgKyBzbGlkZXIudmFycy5hbmltYXRpb25TcGVlZCAvIDEwMDAgKyBcInMgZWFzZVwiLCBcInpJbmRleFwiOiAxIH0pLmVxKHNsaWRlci5jdXJyZW50U2xpZGUpLmNzcyh7IFwib3BhY2l0eVwiOiAxLCBcInpJbmRleFwiOiAyfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNNT09USCBIRUlHSFQ6XG4gICAgICAgIGlmIChzbGlkZXIudmFycy5zbW9vdGhIZWlnaHQpIG1ldGhvZHMuc21vb3RoSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgICAvLyAhQ0FST1VTRUw6XG4gICAgICAvLyBDQU5ESURBVEU6IGFjdGl2ZSBzbGlkZVxuICAgICAgaWYgKCFjYXJvdXNlbCkgc2xpZGVyLnNsaWRlcy5yZW1vdmVDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKS5lcShzbGlkZXIuY3VycmVudFNsaWRlKS5hZGRDbGFzcyhuYW1lc3BhY2UgKyBcImFjdGl2ZS1zbGlkZVwiKTtcblxuICAgICAgLy9GbGV4U2xpZGVyOiBpbml0KCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmluaXQoc2xpZGVyKTtcbiAgICB9O1xuXG4gICAgc2xpZGVyLmRvTWF0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNsaWRlID0gc2xpZGVyLnNsaWRlcy5maXJzdCgpLFxuICAgICAgICAgIHNsaWRlTWFyZ2luID0gc2xpZGVyLnZhcnMuaXRlbU1hcmdpbixcbiAgICAgICAgICBtaW5JdGVtcyA9IHNsaWRlci52YXJzLm1pbkl0ZW1zLFxuICAgICAgICAgIG1heEl0ZW1zID0gc2xpZGVyLnZhcnMubWF4SXRlbXM7XG5cbiAgICAgIHNsaWRlci53ID0gKHNsaWRlci52aWV3cG9ydD09PXVuZGVmaW5lZCkgPyBzbGlkZXIud2lkdGgoKSA6IHNsaWRlci52aWV3cG9ydC53aWR0aCgpO1xuICAgICAgc2xpZGVyLmggPSBzbGlkZS5oZWlnaHQoKTtcbiAgICAgIHNsaWRlci5ib3hQYWRkaW5nID0gc2xpZGUub3V0ZXJXaWR0aCgpIC0gc2xpZGUud2lkdGgoKTtcblxuICAgICAgLy8gQ0FST1VTRUw6XG4gICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgc2xpZGVyLml0ZW1UID0gc2xpZGVyLnZhcnMuaXRlbVdpZHRoICsgc2xpZGVNYXJnaW47XG4gICAgICAgIHNsaWRlci5taW5XID0gKG1pbkl0ZW1zKSA/IG1pbkl0ZW1zICogc2xpZGVyLml0ZW1UIDogc2xpZGVyLnc7XG4gICAgICAgIHNsaWRlci5tYXhXID0gKG1heEl0ZW1zKSA/IChtYXhJdGVtcyAqIHNsaWRlci5pdGVtVCkgLSBzbGlkZU1hcmdpbiA6IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIuaXRlbVcgPSAoc2xpZGVyLm1pblcgPiBzbGlkZXIudykgPyAoc2xpZGVyLncgLSAoc2xpZGVNYXJnaW4gKiAobWluSXRlbXMgLSAxKSkpL21pbkl0ZW1zIDpcbiAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlci5tYXhXIDwgc2xpZGVyLncpID8gKHNsaWRlci53IC0gKHNsaWRlTWFyZ2luICogKG1heEl0ZW1zIC0gMSkpKS9tYXhJdGVtcyA6XG4gICAgICAgICAgICAgICAgICAgICAgIChzbGlkZXIudmFycy5pdGVtV2lkdGggPiBzbGlkZXIudykgPyBzbGlkZXIudyA6IHNsaWRlci52YXJzLml0ZW1XaWR0aDtcblxuICAgICAgICBzbGlkZXIudmlzaWJsZSA9IE1hdGguZmxvb3Ioc2xpZGVyLncvKHNsaWRlci5pdGVtVykpO1xuICAgICAgICBzbGlkZXIubW92ZSA9IChzbGlkZXIudmFycy5tb3ZlID4gMCAmJiBzbGlkZXIudmFycy5tb3ZlIDwgc2xpZGVyLnZpc2libGUgKSA/IHNsaWRlci52YXJzLm1vdmUgOiBzbGlkZXIudmlzaWJsZTtcbiAgICAgICAgc2xpZGVyLnBhZ2luZ0NvdW50ID0gTWF0aC5jZWlsKCgoc2xpZGVyLmNvdW50IC0gc2xpZGVyLnZpc2libGUpL3NsaWRlci5tb3ZlKSArIDEpO1xuICAgICAgICBzbGlkZXIubGFzdCA9ICBzbGlkZXIucGFnaW5nQ291bnQgLSAxO1xuICAgICAgICBzbGlkZXIubGltaXQgPSAoc2xpZGVyLnBhZ2luZ0NvdW50ID09PSAxKSA/IDAgOlxuICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVyLnZhcnMuaXRlbVdpZHRoID4gc2xpZGVyLncpID8gKHNsaWRlci5pdGVtVyAqIChzbGlkZXIuY291bnQgLSAxKSkgKyAoc2xpZGVNYXJnaW4gKiAoc2xpZGVyLmNvdW50IC0gMSkpIDogKChzbGlkZXIuaXRlbVcgKyBzbGlkZU1hcmdpbikgKiBzbGlkZXIuY291bnQpIC0gc2xpZGVyLncgLSBzbGlkZU1hcmdpbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5pdGVtVyA9IHNsaWRlci53O1xuICAgICAgICBzbGlkZXIucGFnaW5nQ291bnQgPSBzbGlkZXIuY291bnQ7XG4gICAgICAgIHNsaWRlci5sYXN0ID0gc2xpZGVyLmNvdW50IC0gMTtcbiAgICAgIH1cbiAgICAgIHNsaWRlci5jb21wdXRlZFcgPSBzbGlkZXIuaXRlbVcgLSBzbGlkZXIuYm94UGFkZGluZztcbiAgICB9O1xuXG4gICAgc2xpZGVyLnVwZGF0ZSA9IGZ1bmN0aW9uKHBvcywgYWN0aW9uKSB7XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUgYW5kIHNsaWRlci5hbmltYXRpbmdUbyBpZiBuZWNlc3NhcnlcbiAgICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKHBvcyA8IHNsaWRlci5jdXJyZW50U2xpZGUpIHtcbiAgICAgICAgICBzbGlkZXIuY3VycmVudFNsaWRlICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zIDw9IHNsaWRlci5jdXJyZW50U2xpZGUgJiYgcG9zICE9PSAwKSB7XG4gICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlci5hbmltYXRpbmdUbyA9IHNsaWRlci5jdXJyZW50U2xpZGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjb250cm9sTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuY29udHJvbE5hdiAmJiAhc2xpZGVyLm1hbnVhbENvbnRyb2xzKSB7XG4gICAgICAgIGlmICgoYWN0aW9uID09PSBcImFkZFwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50ID4gc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgbWV0aG9kcy5jb250cm9sTmF2LnVwZGF0ZShcImFkZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICgoYWN0aW9uID09PSBcInJlbW92ZVwiICYmICFjYXJvdXNlbCkgfHwgc2xpZGVyLnBhZ2luZ0NvdW50IDwgc2xpZGVyLmNvbnRyb2xOYXYubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKGNhcm91c2VsICYmIHNsaWRlci5jdXJyZW50U2xpZGUgPiBzbGlkZXIubGFzdCkge1xuICAgICAgICAgICAgc2xpZGVyLmN1cnJlbnRTbGlkZSAtPSAxO1xuICAgICAgICAgICAgc2xpZGVyLmFuaW1hdGluZ1RvIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGhvZHMuY29udHJvbE5hdi51cGRhdGUoXCJyZW1vdmVcIiwgc2xpZGVyLmxhc3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyB1cGRhdGUgZGlyZWN0aW9uTmF2XG4gICAgICBpZiAoc2xpZGVyLnZhcnMuZGlyZWN0aW9uTmF2KSBtZXRob2RzLmRpcmVjdGlvbk5hdi51cGRhdGUoKTtcblxuICAgIH07XG5cbiAgICBzbGlkZXIuYWRkU2xpZGUgPSBmdW5jdGlvbihvYmosIHBvcykge1xuICAgICAgdmFyICRvYmogPSAkKG9iaik7XG5cbiAgICAgIHNsaWRlci5jb3VudCArPSAxO1xuICAgICAgc2xpZGVyLmxhc3QgPSBzbGlkZXIuY291bnQgLSAxO1xuXG4gICAgICAvLyBhcHBlbmQgbmV3IHNsaWRlXG4gICAgICBpZiAodmVydGljYWwgJiYgcmV2ZXJzZSkge1xuICAgICAgICAocG9zICE9PSB1bmRlZmluZWQpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIuY291bnQgLSBwb3MpLmFmdGVyKCRvYmopIDogc2xpZGVyLmNvbnRhaW5lci5wcmVwZW5kKCRvYmopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHBvcyAhPT0gdW5kZWZpbmVkKSA/IHNsaWRlci5zbGlkZXMuZXEocG9zKS5iZWZvcmUoJG9iaikgOiBzbGlkZXIuY29udGFpbmVyLmFwcGVuZCgkb2JqKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRTbGlkZSwgYW5pbWF0aW5nVG8sIGNvbnRyb2xOYXYsIGFuZCBkaXJlY3Rpb25OYXZcbiAgICAgIHNsaWRlci51cGRhdGUocG9zLCBcImFkZFwiKTtcblxuICAgICAgLy8gdXBkYXRlIHNsaWRlci5zbGlkZXNcbiAgICAgIHNsaWRlci5zbGlkZXMgPSAkKHNsaWRlci52YXJzLnNlbGVjdG9yICsgJzpub3QoLmNsb25lKScsIHNsaWRlcik7XG4gICAgICAvLyByZS1zZXR1cCB0aGUgc2xpZGVyIHRvIGFjY29tZGF0ZSBuZXcgc2xpZGVcbiAgICAgIHNsaWRlci5zZXR1cCgpO1xuXG4gICAgICAvL0ZsZXhTbGlkZXI6IGFkZGVkKCkgQ2FsbGJhY2tcbiAgICAgIHNsaWRlci52YXJzLmFkZGVkKHNsaWRlcik7XG4gICAgfTtcbiAgICBzbGlkZXIucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBwb3MgPSAoaXNOYU4ob2JqKSkgPyBzbGlkZXIuc2xpZGVzLmluZGV4KCQob2JqKSkgOiBvYmo7XG5cbiAgICAgIC8vIHVwZGF0ZSBjb3VudFxuICAgICAgc2xpZGVyLmNvdW50IC09IDE7XG4gICAgICBzbGlkZXIubGFzdCA9IHNsaWRlci5jb3VudCAtIDE7XG5cbiAgICAgIC8vIHJlbW92ZSBzbGlkZVxuICAgICAgaWYgKGlzTmFOKG9iaikpIHtcbiAgICAgICAgJChvYmosIHNsaWRlci5zbGlkZXMpLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHZlcnRpY2FsICYmIHJldmVyc2UpID8gc2xpZGVyLnNsaWRlcy5lcShzbGlkZXIubGFzdCkucmVtb3ZlKCkgOiBzbGlkZXIuc2xpZGVzLmVxKG9iaikucmVtb3ZlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50U2xpZGUsIGFuaW1hdGluZ1RvLCBjb250cm9sTmF2LCBhbmQgZGlyZWN0aW9uTmF2XG4gICAgICBzbGlkZXIuZG9NYXRoKCk7XG4gICAgICBzbGlkZXIudXBkYXRlKHBvcywgXCJyZW1vdmVcIik7XG5cbiAgICAgIC8vIHVwZGF0ZSBzbGlkZXIuc2xpZGVzXG4gICAgICBzbGlkZXIuc2xpZGVzID0gJChzbGlkZXIudmFycy5zZWxlY3RvciArICc6bm90KC5jbG9uZSknLCBzbGlkZXIpO1xuICAgICAgLy8gcmUtc2V0dXAgdGhlIHNsaWRlciB0byBhY2NvbWRhdGUgbmV3IHNsaWRlXG4gICAgICBzbGlkZXIuc2V0dXAoKTtcblxuICAgICAgLy8gRmxleFNsaWRlcjogcmVtb3ZlZCgpIENhbGxiYWNrXG4gICAgICBzbGlkZXIudmFycy5yZW1vdmVkKHNsaWRlcik7XG4gICAgfTtcblxuICAgIC8vRmxleFNsaWRlcjogSW5pdGlhbGl6ZVxuICAgIG1ldGhvZHMuaW5pdCgpO1xuICB9O1xuXG4gIC8vIEVuc3VyZSB0aGUgc2xpZGVyIGlzbid0IGZvY3Vzc2VkIGlmIHRoZSB3aW5kb3cgbG9zZXMgZm9jdXMuXG4gICQoIHdpbmRvdyApLmJsdXIoIGZ1bmN0aW9uICggZSApIHtcbiAgICBmb2N1c2VkID0gZmFsc2U7XG4gIH0pLmZvY3VzKCBmdW5jdGlvbiAoIGUgKSB7XG4gICAgZm9jdXNlZCA9IHRydWU7XG4gIH0pO1xuXG4gIC8vRmxleFNsaWRlcjogRGVmYXVsdCBTZXR0aW5nc1xuICAkLmZsZXhzbGlkZXIuZGVmYXVsdHMgPSB7XG4gICAgbmFtZXNwYWNlOiBcImZsZXgtXCIsICAgICAgICAgICAgIC8ve05FV30gU3RyaW5nOiBQcmVmaXggc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBvZiBldmVyeSBlbGVtZW50IGdlbmVyYXRlZCBieSB0aGUgcGx1Z2luXG4gICAgc2VsZWN0b3I6IFwiLnNsaWRlcyA+IGxpXCIsICAgICAgIC8ve05FV30gU2VsZWN0b3I6IE11c3QgbWF0Y2ggYSBzaW1wbGUgcGF0dGVybi4gJ3tjb250YWluZXJ9ID4ge3NsaWRlfScgLS0gSWdub3JlIHBhdHRlcm4gYXQgeW91ciBvd24gcGVyaWxcbiAgICBhbmltYXRpb246IFwiZmFkZVwiLCAgICAgICAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB5b3VyIGFuaW1hdGlvbiB0eXBlLCBcImZhZGVcIiBvciBcInNsaWRlXCJcbiAgICBlYXNpbmc6IFwic3dpbmdcIiwgICAgICAgICAgICAgICAgLy97TkVXfSBTdHJpbmc6IERldGVybWluZXMgdGhlIGVhc2luZyBtZXRob2QgdXNlZCBpbiBqUXVlcnkgdHJhbnNpdGlvbnMuIGpRdWVyeSBlYXNpbmcgcGx1Z2luIGlzIHN1cHBvcnRlZCFcbiAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLCAgICAgICAgLy9TdHJpbmc6IFNlbGVjdCB0aGUgc2xpZGluZyBkaXJlY3Rpb24sIFwiaG9yaXpvbnRhbFwiIG9yIFwidmVydGljYWxcIlxuICAgIHJldmVyc2U6IGZhbHNlLCAgICAgICAgICAgICAgICAgLy97TkVXfSBCb29sZWFuOiBSZXZlcnNlIHRoZSBhbmltYXRpb24gZGlyZWN0aW9uXG4gICAgYW5pbWF0aW9uTG9vcDogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFNob3VsZCB0aGUgYW5pbWF0aW9uIGxvb3A/IElmIGZhbHNlLCBkaXJlY3Rpb25OYXYgd2lsbCByZWNlaXZlZCBcImRpc2FibGVcIiBjbGFzc2VzIGF0IGVpdGhlciBlbmRcbiAgICBzbW9vdGhIZWlnaHQ6IGZhbHNlLCAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogQWxsb3cgaGVpZ2h0IG9mIHRoZSBzbGlkZXIgdG8gYW5pbWF0ZSBzbW9vdGhseSBpbiBob3Jpem9udGFsIG1vZGVcbiAgICBzdGFydEF0OiAwLCAgICAgICAgICAgICAgICAgICAgIC8vSW50ZWdlcjogVGhlIHNsaWRlIHRoYXQgdGhlIHNsaWRlciBzaG91bGQgc3RhcnQgb24uIEFycmF5IG5vdGF0aW9uICgwID0gZmlyc3Qgc2xpZGUpXG4gICAgc2xpZGVzaG93OiB0cnVlLCAgICAgICAgICAgICAgICAvL0Jvb2xlYW46IEFuaW1hdGUgc2xpZGVyIGF1dG9tYXRpY2FsbHlcbiAgICBzbGlkZXNob3dTcGVlZDogNzAwMCwgICAgICAgICAgIC8vSW50ZWdlcjogU2V0IHRoZSBzcGVlZCBvZiB0aGUgc2xpZGVzaG93IGN5Y2xpbmcsIGluIG1pbGxpc2Vjb25kc1xuICAgIGFuaW1hdGlvblNwZWVkOiA2MDAsICAgICAgICAgICAgLy9JbnRlZ2VyOiBTZXQgdGhlIHNwZWVkIG9mIGFuaW1hdGlvbnMsIGluIG1pbGxpc2Vjb25kc1xuICAgIGluaXREZWxheTogMCwgICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBTZXQgYW4gaW5pdGlhbGl6YXRpb24gZGVsYXksIGluIG1pbGxpc2Vjb25kc1xuICAgIHJhbmRvbWl6ZTogZmFsc2UsICAgICAgICAgICAgICAgLy9Cb29sZWFuOiBSYW5kb21pemUgc2xpZGUgb3JkZXJcbiAgICBmYWRlRmlyc3RTbGlkZTogdHJ1ZSwgICAgICAgICAgIC8vQm9vbGVhbjogRmFkZSBpbiB0aGUgZmlyc3Qgc2xpZGUgd2hlbiBhbmltYXRpb24gdHlwZSBpcyBcImZhZGVcIlxuICAgIHRodW1iQ2FwdGlvbnM6IGZhbHNlLCAgICAgICAgICAgLy9Cb29sZWFuOiBXaGV0aGVyIG9yIG5vdCB0byBwdXQgY2FwdGlvbnMgb24gdGh1bWJuYWlscyB3aGVuIHVzaW5nIHRoZSBcInRodW1ibmFpbHNcIiBjb250cm9sTmF2LlxuXG4gICAgLy8gVXNhYmlsaXR5IGZlYXR1cmVzXG4gICAgcGF1c2VPbkFjdGlvbjogdHJ1ZSwgICAgICAgICAgICAvL0Jvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiBpbnRlcmFjdGluZyB3aXRoIGNvbnRyb2wgZWxlbWVudHMsIGhpZ2hseSByZWNvbW1lbmRlZC5cbiAgICBwYXVzZU9uSG92ZXI6IGZhbHNlLCAgICAgICAgICAgIC8vQm9vbGVhbjogUGF1c2UgdGhlIHNsaWRlc2hvdyB3aGVuIGhvdmVyaW5nIG92ZXIgc2xpZGVyLCB0aGVuIHJlc3VtZSB3aGVuIG5vIGxvbmdlciBob3ZlcmluZ1xuICAgIHBhdXNlSW52aXNpYmxlOiB0cnVlLCAgIFx0XHQvL3tORVd9IEJvb2xlYW46IFBhdXNlIHRoZSBzbGlkZXNob3cgd2hlbiB0YWIgaXMgaW52aXNpYmxlLCByZXN1bWUgd2hlbiB2aXNpYmxlLiBQcm92aWRlcyBiZXR0ZXIgVVgsIGxvd2VyIENQVSB1c2FnZS5cbiAgICB1c2VDU1M6IHRydWUsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogU2xpZGVyIHdpbGwgdXNlIENTUzMgdHJhbnNpdGlvbnMgaWYgYXZhaWxhYmxlXG4gICAgdG91Y2g6IHRydWUsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IEFsbG93IHRvdWNoIHN3aXBlIG5hdmlnYXRpb24gb2YgdGhlIHNsaWRlciBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbiAgICB2aWRlbzogZmFsc2UsICAgICAgICAgICAgICAgICAgIC8ve05FV30gQm9vbGVhbjogSWYgdXNpbmcgdmlkZW8gaW4gdGhlIHNsaWRlciwgd2lsbCBwcmV2ZW50IENTUzMgM0QgVHJhbnNmb3JtcyB0byBhdm9pZCBncmFwaGljYWwgZ2xpdGNoZXNcblxuICAgIC8vIFByaW1hcnkgQ29udHJvbHNcbiAgICBjb250cm9sTmF2OiB0cnVlLCAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQ3JlYXRlIG5hdmlnYXRpb24gZm9yIHBhZ2luZyBjb250cm9sIG9mIGVhY2ggc2xpZGU/IE5vdGU6IExlYXZlIHRydWUgZm9yIG1hbnVhbENvbnRyb2xzIHVzYWdlXG4gICAgZGlyZWN0aW9uTmF2OiB0cnVlLCAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBuYXZpZ2F0aW9uIGZvciBwcmV2aW91cy9uZXh0IG5hdmlnYXRpb24/ICh0cnVlL2ZhbHNlKVxuICAgIHByZXZUZXh0OiBcIlByZXZpb3VzXCIsICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwcmV2aW91c1wiIGRpcmVjdGlvbk5hdiBpdGVtXG4gICAgbmV4dFRleHQ6IFwiTmV4dFwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcIm5leHRcIiBkaXJlY3Rpb25OYXYgaXRlbVxuXG4gICAgLy8gU2Vjb25kYXJ5IE5hdmlnYXRpb25cbiAgICBrZXlib2FyZDogdHJ1ZSwgICAgICAgICAgICAgICAgIC8vQm9vbGVhbjogQWxsb3cgc2xpZGVyIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkIGxlZnQvcmlnaHQga2V5c1xuICAgIG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLCAgICAgICAgLy97TkVXfSBCb29sZWFuOiBBbGxvdyBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIGFmZmVjdCBtdWx0aXBsZSBzbGlkZXJzLiBEZWZhdWx0IGJlaGF2aW9yIGN1dHMgb3V0IGtleWJvYXJkIG5hdmlnYXRpb24gd2l0aCBtb3JlIHRoYW4gb25lIHNsaWRlciBwcmVzZW50LlxuICAgIG1vdXNld2hlZWw6IGZhbHNlLCAgICAgICAgICAgICAgLy97VVBEQVRFRH0gQm9vbGVhbjogUmVxdWlyZXMganF1ZXJ5Lm1vdXNld2hlZWwuanMgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFuZG9uYWFyb24vanF1ZXJ5LW1vdXNld2hlZWwpIC0gQWxsb3dzIHNsaWRlciBuYXZpZ2F0aW5nIHZpYSBtb3VzZXdoZWVsXG4gICAgcGF1c2VQbGF5OiBmYWxzZSwgICAgICAgICAgICAgICAvL0Jvb2xlYW46IENyZWF0ZSBwYXVzZS9wbGF5IGR5bmFtaWMgZWxlbWVudFxuICAgIHBhdXNlVGV4dDogXCJQYXVzZVwiLCAgICAgICAgICAgICAvL1N0cmluZzogU2V0IHRoZSB0ZXh0IGZvciB0aGUgXCJwYXVzZVwiIHBhdXNlUGxheSBpdGVtXG4gICAgcGxheVRleHQ6IFwiUGxheVwiLCAgICAgICAgICAgICAgIC8vU3RyaW5nOiBTZXQgdGhlIHRleHQgZm9yIHRoZSBcInBsYXlcIiBwYXVzZVBsYXkgaXRlbVxuXG4gICAgLy8gU3BlY2lhbCBwcm9wZXJ0aWVzXG4gICAgY29udHJvbHNDb250YWluZXI6IFwiXCIsICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgd2hpY2ggY29udGFpbmVyIHRoZSBuYXZpZ2F0aW9uIGVsZW1lbnRzIHNob3VsZCBiZSBhcHBlbmRlZCB0b28uIERlZmF1bHQgY29udGFpbmVyIGlzIHRoZSBGbGV4U2xpZGVyIGVsZW1lbnQuIEV4YW1wbGUgdXNlIHdvdWxkIGJlICQoXCIuZmxleHNsaWRlci1jb250YWluZXJcIikuIFByb3BlcnR5IGlzIGlnbm9yZWQgaWYgZ2l2ZW4gZWxlbWVudCBpcyBub3QgZm91bmQuXG4gICAgbWFudWFsQ29udHJvbHM6IFwiXCIsICAgICAgICAgICAgIC8ve1VQREFURUR9IGpRdWVyeSBPYmplY3QvU2VsZWN0b3I6IERlY2xhcmUgY3VzdG9tIGNvbnRyb2wgbmF2aWdhdGlvbi4gRXhhbXBsZXMgd291bGQgYmUgJChcIi5mbGV4LWNvbnRyb2wtbmF2IGxpXCIpIG9yIFwiI3RhYnMtbmF2IGxpIGltZ1wiLCBldGMuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4geW91ciBjb250cm9sTmF2IHNob3VsZCBtYXRjaCB0aGUgbnVtYmVyIG9mIHNsaWRlcy90YWJzLlxuICAgIHN5bmM6IFwiXCIsICAgICAgICAgICAgICAgICAgICAgICAvL3tORVd9IFNlbGVjdG9yOiBNaXJyb3IgdGhlIGFjdGlvbnMgcGVyZm9ybWVkIG9uIHRoaXMgc2xpZGVyIHdpdGggYW5vdGhlciBzbGlkZXIuIFVzZSB3aXRoIGNhcmUuXG4gICAgYXNOYXZGb3I6IFwiXCIsICAgICAgICAgICAgICAgICAgIC8ve05FV30gU2VsZWN0b3I6IEludGVybmFsIHByb3BlcnR5IGV4cG9zZWQgZm9yIHR1cm5pbmcgdGhlIHNsaWRlciBpbnRvIGEgdGh1bWJuYWlsIG5hdmlnYXRpb24gZm9yIGFub3RoZXIgc2xpZGVyXG5cbiAgICAvLyBDYXJvdXNlbCBPcHRpb25zXG4gICAgaXRlbVdpZHRoOiAwLCAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IEJveC1tb2RlbCB3aWR0aCBvZiBpbmRpdmlkdWFsIGNhcm91c2VsIGl0ZW1zLCBpbmNsdWRpbmcgaG9yaXpvbnRhbCBib3JkZXJzIGFuZCBwYWRkaW5nLlxuICAgIGl0ZW1NYXJnaW46IDAsICAgICAgICAgICAgICAgICAgLy97TkVXfSBJbnRlZ2VyOiBNYXJnaW4gYmV0d2VlbiBjYXJvdXNlbCBpdGVtcy5cbiAgICBtaW5JdGVtczogMSwgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTWluaW11bSBudW1iZXIgb2YgY2Fyb3VzZWwgaXRlbXMgdGhhdCBzaG91bGQgYmUgdmlzaWJsZS4gSXRlbXMgd2lsbCByZXNpemUgZmx1aWRseSB3aGVuIGJlbG93IHRoaXMuXG4gICAgbWF4SXRlbXM6IDAsICAgICAgICAgICAgICAgICAgICAvL3tORVd9IEludGVnZXI6IE1heG1pbXVtIG51bWJlciBvZiBjYXJvdXNlbCBpdGVtcyB0aGF0IHNob3VsZCBiZSB2aXNpYmxlLiBJdGVtcyB3aWxsIHJlc2l6ZSBmbHVpZGx5IHdoZW4gYWJvdmUgdGhpcyBsaW1pdC5cbiAgICBtb3ZlOiAwLCAgICAgICAgICAgICAgICAgICAgICAgIC8ve05FV30gSW50ZWdlcjogTnVtYmVyIG9mIGNhcm91c2VsIGl0ZW1zIHRoYXQgc2hvdWxkIG1vdmUgb24gYW5pbWF0aW9uLiBJZiAwLCBzbGlkZXIgd2lsbCBtb3ZlIGFsbCB2aXNpYmxlIGl0ZW1zLlxuICAgIGFsbG93T25lU2xpZGU6IHRydWUsICAgICAgICAgICAvL3tORVd9IEJvb2xlYW46IFdoZXRoZXIgb3Igbm90IHRvIGFsbG93IGEgc2xpZGVyIGNvbXByaXNlZCBvZiBhIHNpbmdsZSBzbGlkZVxuXG4gICAgLy8gQ2FsbGJhY2sgQVBJXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgd2hlbiB0aGUgc2xpZGVyIGxvYWRzIHRoZSBmaXJzdCBzbGlkZVxuICAgIGJlZm9yZTogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIGFzeW5jaHJvbm91c2x5IHdpdGggZWFjaCBzbGlkZXIgYW5pbWF0aW9uXG4gICAgYWZ0ZXI6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL0NhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgZWFjaCBzbGlkZXIgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgIGVuZDogZnVuY3Rpb24oKXt9LCAgICAgICAgICAgICAgLy9DYWxsYmFjazogZnVuY3Rpb24oc2xpZGVyKSAtIEZpcmVzIHdoZW4gdGhlIHNsaWRlciByZWFjaGVzIHRoZSBsYXN0IHNsaWRlIChhc3luY2hyb25vdXMpXG4gICAgYWRkZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgICAvL3tORVd9IENhbGxiYWNrOiBmdW5jdGlvbihzbGlkZXIpIC0gRmlyZXMgYWZ0ZXIgYSBzbGlkZSBpcyBhZGRlZFxuICAgIHJlbW92ZWQ6IGZ1bmN0aW9uKCl7fSwgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciBhIHNsaWRlIGlzIHJlbW92ZWRcbiAgICBpbml0OiBmdW5jdGlvbigpIHt9ICAgICAgICAgICAgIC8ve05FV30gQ2FsbGJhY2s6IGZ1bmN0aW9uKHNsaWRlcikgLSBGaXJlcyBhZnRlciB0aGUgc2xpZGVyIGlzIGluaXRpYWxseSBzZXR1cFxuICB9O1xuXG4gIC8vRmxleFNsaWRlcjogUGx1Z2luIEZ1bmN0aW9uXG4gICQuZm4uZmxleHNsaWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkKSBvcHRpb25zID0ge307XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICBzZWxlY3RvciA9IChvcHRpb25zLnNlbGVjdG9yKSA/IG9wdGlvbnMuc2VsZWN0b3IgOiBcIi5zbGlkZXMgPiBsaVwiLFxuICAgICAgICAgICAgJHNsaWRlcyA9ICR0aGlzLmZpbmQoc2VsZWN0b3IpO1xuXG4gICAgICBpZiAoICggJHNsaWRlcy5sZW5ndGggPT09IDEgJiYgb3B0aW9ucy5hbGxvd09uZVNsaWRlID09PSB0cnVlICkgfHwgJHNsaWRlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgJHNsaWRlcy5mYWRlSW4oNDAwKTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5zdGFydCkgb3B0aW9ucy5zdGFydCgkdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoJHRoaXMuZGF0YSgnZmxleHNsaWRlcicpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBuZXcgJC5mbGV4c2xpZGVyKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGVscGVyIHN0cmluZ3MgdG8gcXVpY2tseSBwZXJmb3JtIGZ1bmN0aW9ucyBvbiB0aGUgc2xpZGVyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcykuZGF0YSgnZmxleHNsaWRlcicpO1xuICAgICAgc3dpdGNoIChvcHRpb25zKSB7XG4gICAgICAgIGNhc2UgXCJwbGF5XCI6ICRzbGlkZXIucGxheSgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInBhdXNlXCI6ICRzbGlkZXIucGF1c2UoKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdG9wXCI6ICRzbGlkZXIuc3RvcCgpOyBicmVhaztcbiAgICAgICAgY2FzZSBcIm5leHRcIjogJHNsaWRlci5mbGV4QW5pbWF0ZSgkc2xpZGVyLmdldFRhcmdldChcIm5leHRcIiksIHRydWUpOyBicmVhaztcbiAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgY2FzZSBcInByZXZpb3VzXCI6ICRzbGlkZXIuZmxleEFuaW1hdGUoJHNsaWRlci5nZXRUYXJnZXQoXCJwcmV2XCIpLCB0cnVlKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJudW1iZXJcIikgJHNsaWRlci5mbGV4QW5pbWF0ZShvcHRpb25zLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9