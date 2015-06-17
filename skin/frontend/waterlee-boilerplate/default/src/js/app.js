// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
jQuery(document).foundation();

jQuery(document).ready(function(){

	// media query event handler
if (matchMedia) {
	var mq = window.matchMedia("(min-width: 640px)");
	mq.addListener(WidthChange);
	WidthChange(mq);
}

// media query change
function WidthChange(mq) {

	if (mq.matches) {
		// window width is at least 500px
		  jQuery('.gallery-image.visible').elevateZoom();
		  jQuery('.more-views').click(function(){
		    jQuery('.gallery-image.visible').elevateZoom();
		  })

	}
	else {
		// window width is less than 500px
		 jQuery('.gallery-image.visible').elevateZoom({
		    constrainType:"height",
		    constrainSize:274,		   
		    zoomType: "lens",
		    containLensZoom: true,
			cursor: "pointer",
			galleryActiveClass: "active",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 750
		    });

		  jQuery('.more-views').click(function(){
		    jQuery('.gallery-image.visible').elevateZoom({
		    constrainType:"height",
		    constrainSize:274,		   
		    zoomType: "lens",
		    containLensZoom: true,
			cursor: "pointer",
			galleryActiveClass: "active",
			zoomWindowFadeIn: 500,
			zoomWindowFadeOut: 750
   			});
		  })		
	}

}
 	 jQuery('#demoTab').easyResponsiveTabs();
 	 
 	 //Scroll to the top
 	 //Check to see if the window is top if not then display button
	jQuery(window).scroll(function(){
		if (jQuery(this).scrollTop() > 100) {
			jQuery('.scrollToTop').fadeIn();
		} else {
			jQuery('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	jQuery('.scrollToTop').click(function(){
		jQuery('html, body').animate({scrollTop : 0},800);
		return false;
	});

 

})

	jQuery(window).load(function(){
      jQuery('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider'
      });
    });

	