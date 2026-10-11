// Textarea Wedding Wish
$(document)
    .on('keyup', 'textarea.guest-comment', function(e){
        if (this.value != '') {
            $('.comment-box-wrap').addClass('focus');
            this.style.height = (50 + this.scrollHeight) + 'px';
        }
    })
    .on('focus', 'textarea.guest-comment', function(e){
        e.preventDefault();
        $('.comment-box-wrap').addClass('focus');
        this.style.height = (50 + this.scrollHeight) + 'px';
    })
    .on('focusout', 'textarea.guest-comment', function(e){
        e.preventDefault();
        if ($(this).val() == '') {
            $('.comment-box-wrap').removeClass('focus');
            this.style.height = this.scrollHeight + 'px';
        }
    });


// Resize Couple
var resizeCouple = function() {
    var $couple = $('.couple-preview');
    var width = $couple.outerWidth();

    $couple.css({ 
        borderTopLeftRadius: width, 
        borderTopRightRadius: width
    });
}

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
        adaptiveHeight: true,
    };

    // slick options
    var storyPreviewOptions = {...options, ...{
        appendDots: '#story__slider-dots',
        asNavFor: '#story__slider-caption'
    }};

    var storyCaptionOptions = {...options, ...{
        speed: 750,
        dots: false,
        adaptiveHeight: true,
        asNavFor: '#story__slider-preview'
    }};

    // init slick
    $('#story__slider-preview').slick(storyPreviewOptions);

    $('#story__slider-caption').slick(storyCaptionOptions);
}

// Resizing
var resizingElements = function() {
    resizeCouple();
}

// Window on Resize
$(window).on('resize', function(){

    resizingElements();

});

// On Ready
$(document).ready(function(){

    resizingElements();

    storySlider();

});