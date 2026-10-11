// Love Story
var init_love_story = function() {

  var galleryWrap = $('.story-chitra__slider-wrap');

  if (galleryWrap.length) {

      var sliderForOptions = {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          fade: true,
                          arrows: true,
                          adaptiveHeight: false,
                          infinite: true,
                          useTransform: true,
                          speed: 300,
                          cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
                          prevArrow: $('.story-chitra__arrow-btn.prev'),
                          nextArrow: $('.story-chitra__arrow-btn.next')
                      };
                      
      // Sliders
      var sliderForWrap = $('.story-chitra__slider-for');

      $(sliderForWrap)
          .on('init', function(event, slick) {                
              $('.story-chitra__slider-nav__item__manual').eq(0).addClass('is-active');            

              var width = $(this).find('.story-chitra__slider-for__item').width();
              var height = width - (width / 4);

              $('.story-chitra__slider-for__item').css('height', height + 'px');
              
              // Panggil init_read_more setelah slider diinisialisasi
              init_read_more();
          })
          .slick(sliderForOptions);
      
      $(sliderForWrap).on('afterChange', function(event, slick, currentSlide) {
          var manualNav = $('.story-chitra__slider-nav__item__manual');
          for (var i = 0; i < manualNav.length; i++) {                
              var slickIndex = $(manualNav[i]).attr('data-slick-index');            
              if (slickIndex <= currentSlide) $(manualNav[i]).addClass('is-active');
              if (slickIndex > currentSlide) $(manualNav[i]).removeClass('is-active');
          }        
      });    

  }

}

var init_read_more = function () {
    var maxLength = 325; // Batas karakter

    $('.story-chitra__caption').each(function () {
        var content = $(this).html();
        if (content.length > maxLength) {
            var visibleContent = content.substr(0, maxLength);
            var hiddenContent = content.substr(maxLength);

            const lang = $('body').attr('data-lang') || 'ID';
            const seeMore = lang == 'ID' ? 'Lihat Selengkapnya' : 'See more';

            var newContent = visibleContent + '<span class="more-link"> ...' + seeMore + '</span><span class="more-text" style="display:none;">' + hiddenContent + '</span>';
            
            $(this).html(newContent);
        }
    });

    $('.story-chitra__caption').on('click', '.more-link', function () {
        $(this).hide();
        $(this).next('.more-text').slideDown(300, function() {
            $('.story-chitra__slider-for').slick('setPosition');
      });
    });
}

var init_gifts_slick = function () {
    var gifts_wrap = $('.hadiah-wrap')

    if (gifts_wrap.length) {
        var sliderOptions = {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            prevArrow: false, 
            nextArrow: false, 
        }
        
        gifts_wrap.on('init', function () {
            $('.gifts__slider-nav__item__manual').eq(0).addClass('is-active');
        }).slick(sliderOptions);
        
      }
    //   console.log(gifts_wrap);      
}

// Calculating radius for wedding-gift
var calculateRadius = function () {    
    var wrapper = $('.wedding-gift-wrapper');
    var item = $('.wedding-gift-wrap');
    var target = $('.wedding-gift-body');
    
    if (wrapper.length) {
        var width = wrapper.width();
        
        if (item.length) {
            target.css({
                'border-top-left-radius' : (width / 2) + 'px',
                'border-top-right-radius' : (width / 2) + 'px',
            });
        };
    }
}

// Window onResize
$(window).on('resize', function(){
    calculateRadius();
});

// Ready
$(document).ready(function(){
    init_love_story();
    calculateRadius();
  
    var kadoWrapper = $('.kado-wrapper');
    if (kadoWrapper) {
        var intervalId = setInterval(function() {
          var $gifts_wrap = $('.hadiah-wrap');
    
          // Memeriksa apakah data sudah ada
          if ($gifts_wrap.length && $gifts_wrap.children().length > 0) {
              // Data sudah ada, inisialisasi slider
              init_gifts_slick();
    
              // Hentikan interval
              clearInterval(intervalId);
          }
        }, 500); // Periksa setiap 500 milidetik (0,5 detik)
    }
});
