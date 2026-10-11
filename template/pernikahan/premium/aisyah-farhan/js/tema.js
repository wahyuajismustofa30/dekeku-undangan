// story slider
var storySlider = function() {
    var options = {
        speed: 500,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnFocus: false,
        pauseOnHover: false,
        touchThreshold: 5000,
        swipeToSlide: true,
        arrows: false,
        dots: true,
        adaptiveHeight: false,
    };

    // slick options
    var storyPreviewOptions = {...options, ...{
        appendDots: '#story__slider-dots',
        asNavFor: '#story__slider-caption'
    }};

    var storyCaptionOptions = {...options, ...{
        speed: 750,
        dots: false,
        adaptiveHeight: false,
        asNavFor: '#story__slider-preview'
    }};

    // init slick
    $('#story__slider-preview').slick(storyPreviewOptions);

    $('#story__slider-caption').slick(storyCaptionOptions);
}

// On Ready
$(document).ready(function(){
    
    storySlider();

});