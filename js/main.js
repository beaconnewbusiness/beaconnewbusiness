
// Mobile nav sliding menu
function mobileNav() {
    $('#mobile_menu').click(function() {
        $('.mobile_nav ul').slideToggle();
        return false;
    });
}


// Resize div to specific height on page
function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    vpf = vph / 1.3;
    if (vpw > 1000){
        $('.fold').css({'height': vpf});
    } else {
        $('.fold').css({'height': vpf - 140});
    }
};


// Scroll from anchor to anchor
function scrollToAnchor(aid){
    vwidth = $(window).width();
    var divTag = $("section[name='"+ aid +"']");
    if (vwidth > 1000){
        $('html,body').animate({scrollTop: divTag.offset().top - 100},'slow');
    } else {
        $('html,body').animate({scrollTop: divTag.offset().top},'slow');
    }
}


// Function to enable cross browser nav bar animation on scrolling
// Detects whether the browser supports html or body for scrolltop function
// Note that the DOM needs to be loaded first, 
// or else document.body will be undefined
function getScrollTopElement() {

    // if missing doctype (quirks mode) then will always use 'body'
    if ( document.compatMode !== 'CSS1Compat' ) return 'body';

    // if there's a doctype (and your page should)
    // most browsers will support the scrollTop property on EITHER html OR body
    // we'll have to do a quick test to detect which one...

    var html = document.documentElement;
    var body = document.body;

    // get our starting position. 
    // pageYOffset works for all browsers except IE8 and below
    var startingY = window.pageYOffset || body.scrollTop || html.scrollTop;

    // scroll the window down by 1px (scrollTo works in all browsers)
    var newY = startingY + 1;
    window.scrollTo(0, newY);

    // And check which property changed
    // FF and IE use only html. Safari uses only body.
    // Chrome has values for both, but says 
    // body.scrollTop is deprecated when in Strict mode.,
    // so let's check for html first.
    var element = ( html.scrollTop === newY ) ? 'html' : 'body';

    // now reset back to the starting position
    window.scrollTo(0, startingY);

    return element;
}

// store the element selector name in a global var -
// we'll use this as the selector for our page scrolling animation.
scrollTopElement = getScrollTopElement();

// Animate nav bar
$(document).ready(function() {
    $(function(){
        $('.nav_wrapper').data('size','big');
    });

    $(window).scroll(function(){
        var $nav = $('.nav_wrapper');
        if ($(scrollTopElement).scrollTop() > 0) {
            if ($nav.data('size') == 'big') {
                $nav.data('size','small').stop().animate({
                    backgroundColor:"rgba(23,40,32,1)"
                }, 600);
            }
        } else {
            if ($nav.data('size') == 'small') {
                $nav.data('size','big').stop().animate({
                    backgroundColor:"rgba(0,0,0,0.0)"
                }, 600);
            }  
        }
    });
});


// Call functions

$(".fold_arrow").click(function() {
   scrollToAnchor('int');
});

$(document).ready(function() {
    resizeDiv();
});

$(document).ready(function() {
    mobileNav();
});

window.onresize = function(event) {
    resizeDiv();
};
