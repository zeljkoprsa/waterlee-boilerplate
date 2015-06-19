// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
jQuery(document).foundation();

jQuery(document).ready(function() {

  //Flexslider

  jQuery(window).load(function() {
    jQuery('.product-flexslider').flexslider({
      animation: "slide",
      slideshow: false,
      maxItems: 2,
      itemWidth: 50
    });
  });

  // Product page / wishlist - quantity increase/decrease
  jQuery(".quantity").append('<i id="add1" class="plus fa fa-plus" />').prepend('<i id="minus1" class="minus fa fa-minus" />');
  jQuery(".quantity .plus").click(function(){
    var currentVal = parseInt(jQuery(this).parent().find(".qty").val());
    if (!currentVal || currentVal=="" || currentVal == "NaN") currentVal = 0;
    jQuery(this).parent().find(".qty").val(currentVal + 1);
  });

  jQuery(".quantity .minus").click(function(){
    var currentVal = parseInt(jQuery(this).parent().find(".qty").val());
    if (currentVal == "NaN") currentVal = 0;
    if (currentVal > 1){
      jQuery(this).parent().find(".qty").val(currentVal - 1);
    }
  });

  //Grid / List view
  jQuery('.view-mode strong.grid').after('<i class="fa fa-th"></i>');
  jQuery('.view-mode strong.list').after('<i class="fa fa-align-justify"></i>');

  jQuery('.view-mode a.list').each(function() {
    if (jQuery(this).text() == 'List')
      jQuery(this).text('');
      jQuery(this).append('<i class="fa fa-align-justify"></i>');
    });

  jQuery('.view-mode a.grid').each(function() {
    if (jQuery(this).text() == 'Grid')
      jQuery(this).text('');
      jQuery(this).append('<i class="fa fa-th"></i>');
  });

  //Scroll to top

  jQuery('.footer-container').after('<div class="scrollToTop"></div>');
  jQuery('.scrollToTop').append('<i class="fa fa-chevron-circle-up fa-2x"></i>');
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

});