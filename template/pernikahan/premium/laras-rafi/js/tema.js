// Love Story
var init_love_story = function () {

    var galleryWrap = $('.story-chitra__slider-wrap');

    if (galleryWrap.length) {

        var sliderForOptions = {
            slidesToShow: 1,
            slidesToScroll: 1,
            // fade: false,
            arrows: false,
            adaptiveHeight: false,
            // infinite: false,
            useTransform: true,
            variableWidth: true,
            speed: 300,
            arrows: false,
            cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
        }

        // Sliders
        var sliderForWrap = $('.story-chitra__slider-for');

        $(sliderForWrap)
            .on('init', function (event, slick) {
                $('.story-chitra__slider-nav__item__manual').eq(0).addClass('is-active');

                var width = $(this).find('.story-chitra__slider-for__item').width();
                let maxHeight = 0;

                $('.story-chitra__title').each(function () {
                    let currentHeight = $(this).height();
                    if (currentHeight > maxHeight) {
                        maxHeight = currentHeight;
                    }
                });

                $('.story-chitra__title').css('min-height', maxHeight + 'px');

                var height = width + (width / 3) + maxHeight;

                $('.story-chitra__slider-for__item').css('width', (320 + 'px'));
                $('.story-chitra__slider-for__item').css('height', height + 'px');
            })
            .slick(sliderForOptions);

        $(sliderForWrap).on('afterChange', function (event, slick, currentSlide) {
            var manualNav = $('.story-chitra__slider-nav__item__manual');
            for (var i = 0; i < manualNav.length; i++) {
                var slickIndex = $(manualNav[i]).attr('data-slick-index');
                if (slickIndex <= currentSlide) $(manualNav[i]).addClass('is-active')
                if (slickIndex > currentSlide) $(manualNav[i]).removeClass('is-active')
            }
        });

    }

}

// toggle show wedding gift bank
var toggleGift = function () {
    $(".hadiah-content").slideToggle();
};


$(document).ready(function () {
    init_love_story();

    var kadoWrapper = $('.kado-wrapper');
    if (kadoWrapper) {
        var intervalId = setInterval(function () {
            var $gifts_wrap = $('.hadiah-wrap');
            var $giftItem = $gifts_wrap.find('.hadiah-card-wrap');

            if ($giftItem.length) {
                // Sembunyikan semua item terlebih dahulu
                $giftItem.hide();

                // Tampilkan dua elemen pertama
                $giftItem.slice(0, 2).show();

                if ($giftItem.length > 2) {
                    var $buttonWrap = $('.more-gift-wrap');
                    $buttonWrap.addClass('show');
                }

                // Tentukan berapa item yang sudah ditampilkan
                var itemsToShow = 2;

                // Tombol untuk menampilkan lebih banyak hadiah
                $('#moreGifts').off('click').on('click', function () {
                    var hiddenItems = $giftItem.filter(':hidden'); // Ambil item yang tersembunyi

                    if (hiddenItems.length > 0) {
                        hiddenItems.slice(0, 2).fadeIn(); // Tampilkan dua item berikutnya

                        // Perbarui itemsToShow dengan dua item tambahan
                        itemsToShow += 2;

                        // Jika semua item sudah ditampilkan, sembunyikan tombol
                        if (itemsToShow >= $giftItem.length) {
                            $(this).hide();
                        }
                    }
                });

                // Toggle hadiah
                $('#toggleWrap').off('click').on('click', function () {
                    toggleGift(); // Fungsi toggle hadiah
                    $(this).toggleClass('active');
                });

                // Hentikan interval setelah elemen ditemukan
                clearInterval(intervalId);
            }
        }, 500); // Periksa setiap 500 milidetik
    }
})
