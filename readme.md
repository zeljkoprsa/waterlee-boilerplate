#Magento HTML5 responsive boilerplate [![endorse](http://api.coderwall.com/zeljkoprsa/endorsecount.png)](http://coderwall.com/zeljkoprsa)
 - Built on Foundation 5.4.5 by ZURB.
 - Works with Magento 1.7, 1.8 & 1.9

**Update**
#WATERLEE on Foundation 5.4.5 for sites is here.

## Create responsive Magento themes.
#### Built on ZURB Foundation framework, waterlee has everything you need from the start.
If you're only starting with Waterlee check out the "Getting started" article here:
http://jakesharp.uservoice.com/knowledgebase/articles/245052-intro-to-waterlee


## Here’s the things you’ll love.
### Besides being built on HTML5, CSS3 and jQuery here's the gist of it:

Remember this is a boilerplate not a production ready theme ;)


## Create Rapidly
Whether you have the design ready or design directly in the browser, best if combined, you're saving time and effort using style patterns for layout and components already built in.

##Get everyone on board
When we all speak the same lingo it's easier to communicate inside the design/development process to achieve the best result, hence the ZURB Foundation 5 Documentation.
http://foundation.zurb.com/docs/

##Benefit from OOCSS
CSS is notorious for being easily turned into pile of unreadable code. Cut that at the roots with organizing your SCSS files separately related to the component, template or page view.

##Responsive from the start
Adapting the site to the plethora of devices is a battle inside itself. Win it constantly by using built-in classes and media queries and build upon that with your own customized code.

Checkout the demo:
It's pretty ugly but you know better than to expect a boilerplate to be good looking, right?
[http://waterlee.jakesharp.co](http://waterlee.jakesharp.co)

##Installation
Once you install the Waterlee package and assuming you already installed the "Jake Sharp" extension used for the main category menu which is packed within the theme package., go to your Magento administration backend and look for "Jake Sharp" theme settings under "System -> Configuration | Configuration -> JAKESHARP WATERLEE -> Theme Settings -> Enable" to enable the theme's menu.
For detailed instructions check knowledge base @ http://jakesharp.uservoice.com/ 

To get your stylesheets compiled you'll need to have Bower. Run 'bower install' to get Foundation with its dependencies. You'll also need to install sass and compass with its dependencies & 'compass watch' will listen your sass changes and compile css.
http://compass-style.org/install/
http://sass-lang.com/install

Despite our waterlee-boilerplate updates, you want to have latest foundation version, right? Do it yourself!
'foundation update' should do the trick if you install bower & foundation client.
Follow these simple instructions on ZURB's website:
http://foundation.zurb.com/docs/sass.html

##SCSS Organization
For starters, Waterlee is based on ZURB Foundation framework 5 which relies on mobile first approach. This means that all of the HTML classes for layout at your disposal are mobile-first so keep that in mind while developing. There is a folder named "custom" under the "/skin/frontend/waterlee-boilerplate/default/SCSS/".

The "custom" folder is already configured following the OOCSS principles of separating as many styling areas such as: page views, global components etc. All of the files are then imported into one main style.scss. Feel free to adapt it to your needs or not use it at all. Our recommendation is that you build upon it, suggest improvements for organization or just first take it for a spin to see the benefits.

It's refreshing to have the that final SCSS organized by maintaining focus using separate .scss files where you can easily find redundant code. If you get lost you can always find that HTML class using the find function in your IDE.

What's inside:
- **NEW** All of the Foundation Javascript is now placed in the footer for faster loading.
- **NEW** Theme top menu extension. Find it under "JAKE SHARP WATERLEE" system settings after installation (Remember, you'll need to install the extension separately.)
- **NEW**: Off Canvas menu (http://www.zurb.com/playground/off-canvas-layouts)
- **NEW**: Current SubCategory menu for mobile view
- Foundation 5 by ZURB built in (http://foundation.zurb.com/)
- OOCSS SASS implemented (http://compass-style.org/)
- Local XML for layout overrides
- Implemented classes that adhere to foundation docs
- **NEW**: Foundation now uses bower for easy updating from the command line
- **NEW**: From now on by default, JS is loaded separately by components in local.xml. Use only what you need! If you want from some reason full foundation, comment components and uncomment foundation.js in js.phtml. The same applies for importing scss files in styles.scss
- **NEW**: Implemented easyResponsiveTabs [http://webtrendset.com/demo/easy-responsive-tabs/Index.html#horizontalTab2]
- **NEW**: Implemented elevatezoom for product page with cool inner zoom on mobile layout [http://www.elevateweb.co.uk/image-zoom]
- **NEW**: Implemented scroll to top
- **NEW**: Gulp support with gulpfile.js (Check http://gulpjs.com/ on how to use it)
- **NEW**: Implemented Fira font [https://github.com/mozilla/Fira] & HTML5 WYSIWYG Editor for Magento [https://www.meanbee.com/magento-extensions/meanbee-tinymce.html]
- **NEW**: Implemented flexslider for product page thumb slides [http://www.woothemes.com/flexslider/]

##What's next:

- Implementing "Interchange" for loading images based on media query [http://foundation.zurb.com/docs/components/interchange.html]
- Implementing "Abide" for form validation [http://foundation.zurb.com/docs/components/abide.html] 

##Licence
GPLv2 (or later) - http://www.gnu.org/licenses/gpl-2.0.html
Foundation by ZURB is MIT - http://opensource.org/licenses/MIT

Means Waterlee is free to use and a link back is always welcome.
https://www.codeship.io/projects/09e00190-a6a7-0131-bfdd-324d295efe74/status
