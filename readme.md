#Magento HTML5 responsive boilerplate [![endorse](http://api.coderwall.com/zeljkoprsa/endorsecount.png)](http://coderwall.com/zeljkoprsa)
 - Built on Foundation 5. by ZURB.

**Update**
#WATERLEE on Foundation 5 is here.

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
When we all speak the same lingo it's easier to communicate inside the design/development process to achieve the best result, hence the ZURB Foundation 4 Documentation.

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

##SCSS Organization
For starters, Waterlee is based on ZURB Foundation framework 4.0 which relies on mobile first approach. This means that all of the HTML classes for layout at your disposal are mobile-first so keep that in mind while developing. There is a folder named "custom" under the "/skin/frontend/waterlee-boilerplate/default/SCSS/".

The "custom" folder is already configured following the OOCSS principles of separating as many styling areas such as: page views, global components etc. All of the files are then imported into one main style.scss. Feel free to adapt it to your needs or not use it at all. Our recommendation is that you build upon it, suggest improvements for organization or just first take it for a spin to see the benefits.

It's refreshing to have the that final SCSS organized by maintaining focus using separate .scss files where you can easily find redundant code. If you get lost you can always find that HTML class using the find function in your IDE.

What's inside:
- **NEW** All of the Foundation Javascript is now placed in the footer for faster loading.
- **NEW** Theme top menu extension. Find it under "JAKE SHARP WATERLEE" system settings after installation (Remember, you'll need to install the extension separately.)
- **NEW**: Off Canvas menu (http://www.zurb.com/playground/off-canvas-layouts)
- **NEW**: Current SubCategory menu for mobile view
- Foundation 4 by ZURB built in (http://foundation.zurb.com/)
- OOCSS SASS implemented (http://compass-style.org/)
- Local XML for layout overrides
- Implemented classes that adhere to foundation docs
- **NEW**: Foundation now uses bower for easy updating from the command line


##What's next:

- Implementing "Interchange" for loading images based on media query [http://foundation.zurb.com/docs/components/interchange.html]
- Implementing "Abide" for form validation [http://foundation.zurb.com/docs/components/abide.html] 

##Licence
GPLv2 (or later) - http://www.gnu.org/licenses/gpl-2.0.html
Foundation by ZURB is MIT - http://opensource.org/licenses/MIT

Means Waterlee is free to use and a link back is always welcome.
