// Love Story
var init_love_story = function() {

    var galleryWrap = $('.story__slider-wrap');

    if (galleryWrap.length) {

        var sliderForOptions = {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            arrows: true,
                            adaptiveHeight: true,
                            infinite: false,
                            useTransform: true,
                            speed: 300,
                            cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
                            prevArrow: $('.story__arrow-btn.prev'),
                            nextArrow: $('.story__arrow-btn.next')
                        }
                        
        // Sliders
        var sliderForWrap = $('.story__slider-for');

        $(sliderForWrap)
            .on('init', function(event, slick) {                
                $('.story__slider-nav__item__manual').eq(0).addClass('is-active');            

                var width = $(this).find('.story__slider-for__item').width();
                var height = width + (width / 3);

                $('.story__slider-for__item').css('height', height + 'px');
            })
            .slick(sliderForOptions);
        
        $(sliderForWrap).on('afterChange', function(event, slick, currentSlide) {
            var manualNav = $('.story__slider-nav__item__manual');
            for (var i = 0; i < manualNav.length; i++) {                
                var slickIndex = $(manualNav[i]).attr('data-slick-index');            
                if (slickIndex <= currentSlide) $(manualNav[i]).addClass('is-active')
                if (slickIndex > currentSlide) $(manualNav[i]).removeClass('is-active')
            }        
        });    

    }

}

// Resize Protocol 04
var resizeProtocol_04 = function() {
    var $inner = $('section.protocol-04 > .inner');
    var width = $inner.outerWidth();

    $inner.css({ 
        borderTopLeftRadius: width, 
        borderTopRightRadius: width
    });
}

// Resize Live Filter
var resizeLiveFilter = function() {
    var $inner = $('.live-filter-inner');
    var width = $inner.outerWidth();

    $inner.css({ 
        borderRadius: width
    });
}

// Show Logo
var showLogo = function() {
    var $coverHead = $('.cover .cover-inner .cover-head');
    var $logoWrap = $('.cover .cover-inner .logo-wrap');
    var $logo = $('.cover .cover-inner .logo-img');


    // cover head and logo are exist
    if ($coverHead.length && $logo.length) {
        var top = ($coverHead.offset().top / 2) - ($logo.outerHeight() / 2) + 18;

        $logoWrap.addClass('show');

        if (($coverHead.offset().top / 2) > 60) {
            $logoWrap.css({
                top: top,
            });
        } else {
            $logoWrap.css({
                position: "relative",
                marginBottom: 40,
            });
        }
    }
}

// Resizing
var resizingElements = function() {
    resizeProtocol_04();
    resizeLiveFilter();
    showLogo();
}


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


// Window on Resize
$(window).on('resize', function(){

    resizingElements();

});

// On Ready
$(document).ready(function(){

    resizingElements();

    init_love_story();

});