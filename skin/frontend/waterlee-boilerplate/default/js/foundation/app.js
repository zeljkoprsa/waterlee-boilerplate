(function ($) {

    $(function(){
        $(document).foundationTopBar();
        $(document).foundationAlerts();
        $(document).foundationButtons();
        $(document).foundationAccordion();
        $(document).foundationNavigation();
        $(document).foundationTabs();
        $(document).foundationCustomForms();
        $(document).foundationMediaQueryViewer();
        $(document).foundationTabs({callback:$.foundation.customForms.appendCustomMarkup});
        $(document).tooltips();
        $('input, textarea').placeholder();

        // COMMENT THE LINES BELOW IF YOU DO NOT WANT IE8 SUPPORT WHEN USING .block-grids
        $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
        $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
        $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
        $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});
    });

})(jQuery);
