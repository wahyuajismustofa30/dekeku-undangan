// Photo Options Nav
var photo_nav_options = {
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: false,
  adaptiveHeight: false,
  variableWidth: false,
  infinite: true,
  useTransform: true,
  speed: 500,
  cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  asNavFor: $('.photo-slider')
};

// Photo Options Slider
var photo_slider_options = {
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: false,
  arrows: true,
  adaptiveHeight: false,
  variableWidth: true,
  infinite: true,
  useTransform: true,
  speed: 500,
  cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
  prevArrow: $('.photo-arrow.prev'),
  nextArrow: $('.photo-arrow.next'),
  asNavFor: $('.photo-nav'),
  touchThreshold: 10000
};

// Resize Photo Nav
var resize_photo_nav = function() {
  var $nav = $('.photo-nav');

  var width = $nav.find('.photo-item').width();

  $nav.find('.photo-img-wrap').each((i, o) => {
      $(o).css('height', width + "px");
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
