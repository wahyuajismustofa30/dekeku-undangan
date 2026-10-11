// Photo Options Nav
var photo_nav_options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    fade: true,
    arrows: false,
    adaptiveHeight: false,
    variableWidth: true,
    infinite: true,
    useTransform: true,
    speed: 500,
    touchThreshold: 10000,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    asNavFor: $('.photo-slider')
};

// Photo Options Slider
var photo_slider_options = {
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    fade: false,
    arrows: false,
    adaptiveHeight: false,
    variableWidth: false,
    infinite: true,
    useTransform: true,
    speed: 1500,
    touchThreshold: 10000,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    // prevArrow: $('.photo-arrow.prev'),
    // nextArrow: $('.photo-arrow.next'),
    asNavFor: $('.photo-nav')
};

// Resize Photo Nav
var resize_photo_nav = function() {
    var $nav = $('.photo-nav');

    var width = $nav.find('.photo-item').width();
  
    $nav.each((i, o) => {
        $(o).css('height', (width * 1.4) + "px");
    });
}    


$(document).ready(function(){

    resize_photo_nav();

    if ( $('.photo-nav').children().length > 0 ) {
        // Slick
        $('.photo-nav').slick(photo_nav_options);
    }    

    if ( $('.photo-slider').children().length > 0 ) {
        // Slick
        $('.photo-slider').slick(photo_slider_options);
    }

});
