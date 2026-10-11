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

// On Ready
$(document).ready(function(){

    init_love_story();

});