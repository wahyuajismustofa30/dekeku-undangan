let settingUndangan = window.dekeku_tmp.set.undangan
// Dummy postData untuk menghindari error ReferenceError jika tidak ada implementasi asli
function postData(data, onSuccess, onError, beforeSend) {
    if (typeof beforeSend === 'function') beforeSend();
    // Simulasikan response kosong
    if (typeof onSuccess === 'function') onSuccess({});
    // Tidak pernah error
}
/* 
    ++++++++++ ATTENTION!!! ++++++++++
    Before including this file
    make sure if your had included JQUERY too
*/ 

/*  ================================================
    GENERAL CONFIGURATION
============================================= */

// ---------- Start Your Journey (Function) --------------------------------------------------
function startTheJourney() {
    $('.top-cover').eq(0).addClass('hide');            
    $('body').eq(0).css('overflow', 'visible');

    // Enhanced music start with delay for better UX
    setTimeout(() => {
        if (typeof playMusicOnce === 'function') {
            playMusicOnce();
        }
    }, 500); // Small delay for smoother transition

    setTimeout(function() {
        // Looping the aos animate
        $('.aos-init').each(function(i, el){
            // If the parent is not 'Top Cover'
            if ($(el).closest('.top-cover').length == 0) {

                var duration = parseInt($(el).attr('data-aos-duration') || 0);
                var delay = parseInt($(el).attr('data-aos-delay') || 0);
                
                if ($(el).hasClass('aos-animate')) {
                    // Remove 'aos-animate' class
                    $(el).css({
                        opacity: 0,
                        "transition-duration": 0 + "ms"
                    }).removeClass('aos-animate');

                    // wait for delay
                    setTimeout(function(){
                        // Add 'aos-amimate' class
                        $(el).css({
                            opacity: 1,
                            "transition-duration": duration + "ms"
                        }).addClass('aos-animate');
                    }, delay);
                }
            }            
        });
    }, 50);

    setTimeout(function(){
        $('.top-cover').eq(0).remove();
    }, 3000);    
}

// ---------- ALERT --------------------------------------------------
var $alert = $('#alert');                           // alert
var $alertClose = $('#alert .alert-close');         // alert close
var $alertText = $('#alert .alert-text');           // Alert Text

// ---------- Hide Alert (Function) --------------------------------------------------
function hideAlert() {
    $alert.removeClass();           // Remove All Class
    $alert.addClass('alert hide');                                        // hiding alert            
}

// ---------- Show Alert (Function) --------------------------------------------------
function showAlert(message, status) {    
    if (status != '') {
        $alert.removeClass();     // Remove All Class
        $alert.addClass('alert show ' + status);
        $alertText.text(message);
        setTimeout(hideAlert, 3000);
    }    
}

// ---------- Copy to  (Function) --------------------------------------------------
function copyToClipboard(text) {
    if (!navigator.clipboard) {
        // ExecCommand
        var dummy = document.createElement("textarea");

        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
    
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        
        document.execCommand("copy");
        document.body.removeChild(dummy);
    
        // Show Alert
        return showAlert('Berhasil di salin ke papan klip', 'success');
    } else {
        // Clipboard API
        return navigator.clipboard.writeText(text).then(() => {
            showAlert('Berhasil di salin ke papan klip', 'success');
        });
    }
}

// ---------- URLify  (Function) --------------------------------------------------
function urlify(text) {
    var lineBreak = '';
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        var finalURL = url;
        if (url.indexOf('<br>') > -1) {
            finalURL = url.replace(/<br>/g, '');
            lineBreak = '<br>';
        }
        return '<a href="' + finalURL + '" target="_blank">' + finalURL + '</a>' + lineBreak;
    });
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

// ---------- Copy Account [ON CLICK] ---------------------------------------------------------------
$(document).on('click', '.copy-account', function(e){
    e.preventDefault();
    var book = $(this).closest('.book');
    var number = $(book).find('.account-number');
    copyToClipboard(number.html());
});

// ---------- Number Format (Variables) ---------------------------------------------------------------
var numberFormat = new Intl.NumberFormat('ID', {
    // style: 'currency',
    // currency: 'IDR',
});

// ---------- Disabled Dragging an image [ON DRAGSTART] -----------------------------------------------
$('img').on('dragstart', function(e){
    e.preventDefault();
});


/*  ==============================
        CALLING
============================== */

// ---------- AJAX DISABLED FOR LOCAL PREVIEW ----------
function ajaxCall(data, callback) {
    // Do nothing or call callback with dummy data
    if (typeof callback === 'function') {
        //callback({error: false, message: 'AJAX disabled (local preview)', comments: '', more: '', modal: '', callback: ''});
    }
}

// ---------- AJAX DISABLED FOR LOCAL PREVIEW ----------
function ajaxMultiPart(data, beforeSend, callback) {
    if (typeof beforeSend === 'function') beforeSend();
    if (typeof callback === 'function') {
        //callback({error: false, message: 'AJAX disabled (local preview)'});
    }
}



/*  ==============================
        COVERS
============================== */
// ---------- Slider Options (Function) --------------------------------------------------
function sliderOptions(options) {
    let configs = {
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: false,
        arrows: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        draggable: false,
        touchMove: false
    }

    // combine options to configs
    if (typeof options === 'object') {
        configs = {...configs, ...options}
    }

    return configs;
};

// Is Cover Played
var isCoverPlayed = false;

// COVER CONFIGURATION
(function coverConfiguration() {

    var windowWidth = $(window).width(),                                // Window Width    
        smallScreen = window.matchMedia( "(max-width: 1024px)" );       // Small screen
    
    // If width matched
    if (windowWidth > '1020' && windowWidth < '1030') {        
        isCoverPlayed = false;      // cover is not played
    }

    // COVERS
    if (typeof settingUndangan.covers != 'undefined') {
        // COVERS LOOP
        $(settingUndangan.covers).each(function(i, cover){

            var position = cover.position,      // position
                details = cover.details,        // details
                element = cover.element,        // element
                coverInner = $(element).closest('.cover-inner'),        // Cover Inner
                options = cover.options || '';                          // options

            // If element does exist
            if ($(element).length > 0) {
                // if the position is MAIN
                if (position == 'MAIN') {                            
                    // COVERS                    
                    // If Cover Inner does exist
                    if (coverInner.length) {
                        $(coverInner).removeClass('covers');        // Remove class 'covers'
                        if (details.desktop != '' || details.mobile != '') {                    
                            $(coverInner).addClass('covers');       // Add Class to cover-inner
                        }
                    }                    
                }

                // if cover has been slicked
                if ($(element).hasClass('slick-initialized')) {
                    $(element).slick('unslick');      // stop the slider
                }                
                $(element).html('');      // empty element

                // if the small screen does not match (DESKTOP SIZE) 
                if (!smallScreen.matches) {
                    // if cover desktop is not empty
                    if (details.desktop != '') {                                            
                        // if the position is MAIN and the cover is not played
                        if (position == 'MAIN' && !isCoverPlayed) {
                            isCoverPlayed = true;       // Played the cover                     
                        }

                        // Tambahkan id unik pada setiap slick-slide setelah inisialisasi
                        $(element).append(details.desktop);     // Append new cover elements into cover
                        $(element).slick(sliderOptions(options));            // Start the slider
                        // Tambahkan id pada slick-slide pertama
                        var $firstSlide = $(element).find('.slick-slide').eq(0);
                        if ($firstSlide.length) $firstSlide.attr('id', 'cover-opening-slide');
                        if (coverInner.length) $(coverInner).removeClass('mobile').addClass('desktop');     // Add class desktop
                    }                    
                } else {
                    // the screen is small (MOBILE SIZE)
                    // if cover desktop is not empty
                    if (details.mobile != '') {                    
                        // if the position is MAIN and the cover is not played
                        if (position == 'MAIN' && !isCoverPlayed) {        
                            isCoverPlayed = true;       // Played the cover                        
                        }

                        // Tambahkan id unik pada setiap slick-slide setelah inisialisasi
                        $(element).append(details.mobile);     // Append new cover elements into cover
                        $(element).slick(sliderOptions(options));            // Start the slider
                        // Tambahkan id pada slick-slide pertama
                        var $firstSlide = $(element).find('.slick-slide').eq(0);
                        if ($firstSlide.length) $firstSlide.attr('id', 'cover-opening-slide');
                        if (coverInner.length) $(coverInner).removeClass('desktop').addClass('mobile');     // Add class desktop
                    }    
                }
            }
        });
    }   
}());



/*  ================================================
    SAVE THE DATE
============================================= */
// ----------- COUNTDOWN (Function) ------------------------------------------------------
(function countdown(){
    if (typeof settingUndangan.event != 'undefined') {
        var schedule = settingUndangan.event,
            event = new Date(schedule).getTime(),
            start = setInterval(rundown, 1000);

        // Rundown
        function rundown() {
            var now = new Date().getTime(),
                distance = event - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24)),                            // days
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),      // hours
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),              // minutes
                seconds = Math.floor((distance % (1000 * 60)) / 1000);                          // seconds

            if (distance < 0) {
                clearInterval(start);
                $('.count-day').text('0');
                $('.count-hour').text('0');
                $('.count-minute').text('0');
                $('.count-second').text('0');
            } else {
                $('.count-day').text(days);
                $('.count-hour').text(hours);
                $('.count-minute').text(minutes);
                $('.count-second').text(seconds);
            }
        }
    }    
}());


/*  ==============================
        RSVP
============================== */

// ---------- Attendance Toggle (Function) --------------------------------------------------
function attendanceToggle(input) {
    var attendanceCome = $('.attendance-value.come');
    var attendanceNotCome = $('.attendance-value.not-come');

    var isFace = typeof $(input).attr('data-face') != 'undefined' && $(input).attr('data-face') == 'true' ? true : false;

    var come = 'Datang',                // Come
        notCome = 'Tidak Datang';       // Not Come

    if (typeof window.RSVP != 'undefined') {
        come = window.RSVP['button_text']['attend'];            // Attend
        notCome = window.RSVP['button_text']['not_attend'];     // Not Attend
    }    

    $(attendanceCome).html(come);
    $(attendanceNotCome).html(notCome);

    if ($(input).is(':checked')) {
        if ($(input).next('.attendance-value.come').length > 0) {
            $(attendanceCome).html((isFace ? '<i class="fas fa-smile"></i> ' : '') + come);
            $('#rsvp-guest-amount').slideDown();
        }
        if ($(input).next('.attendance-value.not-come').length > 0) {
            $(attendanceNotCome).html((isFace ? '<i class="fas fa-sad-tear"></i> ' : '') + notCome);
            $('#rsvp-guest-amount').slideUp();
        }     
    }
}

// ---------- Attendance [ON CLICK] --------------------------------------------------
$(document).on('change', '[name="attendance"]', function(e){
    e.preventDefault();
    attendanceToggle(this);
})

// ---------- Change Confirmation [ON CLICK] --------------------------------------------------
$(document).on('click', '.change-confirmation', function(e){
    e.preventDefault();
    $('.rsvp-inner').find('.rsvp-form').fadeIn();
    $('.rsvp-inner').find('.rsvp-confirm').hide();
});

// ---------- Plus Button [ON CLICK] --------------------------------------------------
$(document).on('click', '[data-quantity="plus"]', function(e){
    e.preventDefault();

    var fieldName = $(this).attr('data-field');
    var $input = $(`input[name="${fieldName}"]`);
    var max = $input.attr('max');
    var value = parseInt($input.val()) + 1;

    // is editable
    if (!$input.prop('readonly')) {
        // max. value
        if (max !== 'undefined'){
            max = parseInt(max);
            if (value >= max) value = max;
        }

        // min. value
        if (value <= 0) value = 1;

        // change value
        $input.val(value);
    }
});

// ---------- Minus Button [ON CLICK] --------------------------------------------------
$(document).on('click', '[data-quantity="minus"]', function(e){
    e.preventDefault();

    var fieldName = $(this).attr('data-field');
    var $input = $(`input[name="${fieldName}"]`);
    var min = $input.attr('min');
    var value = parseInt($input.val()) - 1;
    
    // is editable
    if (!$input.prop('readonly')) {
        // min. value
        if (min !== 'undefined'){
            min = parseInt(min);            
            if (value <= min) value = min;
        }

        // 0 (zero) is not allowed
        if (value <= 0) value = 1;

        // change value
        $input.val(value);
    }
});

// ----- Amount into Decimal  ----- //
$(document).ready(function() {
    $('input[name="amount"]').attr('type', 'text');
    $('input[name="amount"]').on('input', function() {
        var value = $(this).val();

        value = value.replace(/,/g, '').replace(/\./g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        $(this).val(value);
    });
});

// ---------- Quantity Control [ON CHANGE] --------------------------------------------------
$(document).on('change', '[data-quantity="control"]', function(e){
    e.preventDefault();
    var max = $(this).prop('max');
    var value = $(this).val();
    if (value > max) {
        $(this).val(max);
    }
});

// ---------- Nominal [ON CHANGE] --------------------------------------------------
$(document).on('change', '[name="nominal"]', function(e){
    e.preventDefault();
    var val = $(this).val();
    var input = $('.insert-nominal');
    
    $(input).slideUp();
    if (parseInt(val) <= 0) {
        if ($(this).is(':checked') == true) {
            $(input).slideDown();
            $(input).find('[name="inserted_nominal"]').val('').focus();
        }
    }

    // var x = numberFormat.format(parseInt(val));
    $(input).find('[name="inserted_nominal"]').val(val);

});

// ---------- Inserted Nominal [ON KEYUP, KEYDOWN, CHANGE] --------------------------------------------------
$(document).on('keyup keydown change', '[name="inserted_nominal"]', function(e){
    if($(this).val().length > 16){
        var val = $(this).val().substr(0,$(this).val().length-1);
        $(this).val(val);
    };
});




/*  ==============================    
        WEDDING GIFT
============================== */

// ---------- Choose Bank (Function) --------------------------------------------------
function chooseBank(value) {
    // Data Book
    $('[data-book]').each(function(i, book){
        // Hide
        $(book).hide();
        // if book is exist
        if ($(book).attr('data-book') == value) {
            $(book).fadeIn();
        }
    });
}

// ---------- Choose Bank [ON CHANGE] --------------------------------------------------
$(document).on('change', 'select[name="choose_bank"]', function(e){
    e.preventDefault();
    chooseBank($(this).val());
});

// ---------- Gift Picture [ON CLICK] --------------------------------------------------
$(document).on('click', 'div[data-upload="gift-picture"]', function(e){
    e.preventDefault();
    $('#weddingGiftForm input[name="picture"]').click();
});

// ---------- Picture insinde Gift [ON CHANGE] --------------------------------------------------
$(document).on('change', '#weddingGiftForm input[name="picture"]', function(e){
    e.preventDefault();
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(er) {
            $('[data-image="uploaded-gift"]').fadeIn();
            $('[data-image="uploaded-gift"]').attr('src', er.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// ---------- Gift Next [ON CLICK] --------------------------------------------------
$(document).on('click', '.gift-next', function(e){
    e.preventDefault();
    var form = $('#weddingGiftForm');

    if ($(form).find('[name="name"]').val() == '') {
        $(form).find('[name="name"]').focus();
        return;
    }
    if ($(form).find('[name="account_name"]').val() == '') {
        $(form).find('[name="account_name"]').focus();
        return;
    }
    if ($(form).find('[name="message"]').val() == '') {
        $(form).find('[name="message"]').focus();
        return;
    }
    if ($(form).find('[name="inserted_nominal"]').val() <= 0) {
        $('.insert-nominal').slideDown();
        $(form).find('[name="inserted_nominal"]').focus();
        return;
    }

    $('.gift-details').hide();
    $('.gift-picture').fadeIn();
});

// ---------- Gift Back [ON CLICK] --------------------------------------------------
$(document).on('click', '.gift-back', function(e){
    e.preventDefault();
    $('.gift-picture').hide();
    $('.gift-details').fadeIn();
});







// Select Bank
var select_bank = function(e) {
    e.preventDefault();
    var bankId = $(this).val();        
    $('.bank-item').removeClass('show');
    $('#savingBook' + bankId).addClass('show');
}

$(document).on('change', 'select#selectBank', select_bank);

// Wedding Gift Upload File
var wgu_file = function(e) {
    e.preventDefault();
    var input = $(this).attr('data-wgu-file');
    $(input).trigger('click');
}

$(document).on('click', '[data-wgu-file]', wgu_file);    

// Wedding Gift Picture
var wgu_handle_picture = function(e) {
    var preview = $(this).attr('data-wgu-preview');
    if (e.target.files.length > 0) {
        var src = URL.createObjectURL(e.target.files[0]);
        $(preview).attr('src', src);

        $('.wgu-description').removeClass('show');
        $('.wgu-img-wrap').addClass('show');
    }
}

$(document).on('change', 'input#weddingGiftPicture', wgu_handle_picture);    

// Wedding Gift Next
var wedding_gift_next = function(e) {
    e.preventDefault();
    var width = $('#weddingGiftForm').width();
    var marginLeft = parseFloat($('.wedding-gift__first-slide').css('margin-left'));

    var newMarginLeft = marginLeft - width;

    $('.wedding-gift__first-slide').css('margin-left', newMarginLeft + "px");
}

$(document).on('click', '.wedding-gift__next', wedding_gift_next);

// Wedding Gift Prev
var weeding_gift_prev = function(e) {
    e.preventDefault();
    var width = $('#weddingGiftForm').width();
    var marginLeft = parseFloat($('.wedding-gift__first-slide').css('margin-left'));

    var newMarginLeft = marginLeft + width;
    if (newMarginLeft < 0) newMarginLeft = 0;

    $('.wedding-gift__first-slide').css('margin-left', newMarginLeft + "px");        
}

$(document).on('click', '.wedding-gift__prev', weeding_gift_prev);        


// Init Wedding Gift
var init_wedding_gift = function() {        
    // Bank Options
    if (typeof settingUndangan.bank_option !== 'undefined' && settingUndangan.bank_option) {
        if ($("#bankOption").length) {
            // Target elemen
            const $bankContainer = $("#bankOption");
            $bankContainer.empty();
            
            $.each(settingUndangan.bank_option, function (i, bank) {
                const $bankItem = $(`
                    <div class="bank-item" id="savingBook${bank.id}">
                        <div class="bank-detail">
                            <h3 class="bank-name">${bank.title}</h3>
                            <div>
                                <small class="bank-account-number-label">No. Rekening</small>
                                <h4 class="bank-account-number" data-copy="${bank.credential}">
                                    ${bank.credential}
                                    <i class="fas fa-clone fa-flip-horizontal ic-copy"></i>
                                </h4>
                            </div>
                            <div>
                                <small class="bank-account-name-label">a/n</small>
                                <h4 class="bank-account-name">${bank.name}</h4>
                            </div>
                        </div>
                    </div>
                `);

                $bankContainer.append($bankItem);
            });        
        }

        var el = $('select#selectBank').get(0);

        if ($(el).length) {

            // Options
            var options = selectize_options({
                            maxItems: 1,
                            valueField: 'id',
                            labelField: 'title',
                            searchField: ['title', 'credential'],
                            options: (settingUndangan.bank_option ? settingUndangan.bank_option : []),
                            render: {
                                item: function(item, escape) {
                                    var title = item.title;
                                    return '<div>' + (title ? '<p class="select-bank__title">' + escape(title) + '</p>' : '') + '</div>';
                                },
                                option: function(item, escape) {
                                    var title = item.title;
                                    var credential = item.credential;                        
                                    return '<div class="item">' +
                                                '<p class="select-bank__title">' + escape(title) + '</p>' +
                                                '<p class="select-bank__credential">' + escape(credential) + '</p>' +
                                            '</div>';
                                }
                            },
                            onInitialize: function() {
                                var instance = this;
        
                                // disabled input
                                instance.$control_input.attr('readonly', 'readonly');
        
                                // Document onClick
                                $(instance.$control).off('click').on('click', function(e){
                                    e.stopPropagation();
        
                                    // is focused
                                    if (instance.isFocused) return false;
                                });
                            }
                        });

            // Generate Bank
            var selectize = init_selectize( el, options );


            // Select Bank
            var selected = selected_selectize( selectize, settingUndangan.bank_option[0]['id'] );

            // Trigger Select
            $(el).val(selectize.getValue()).trigger('change');

            // Hadiah on Select
            $('.selectize-control .selectize-input').on('click', function (e) {
                e.stopPropagation(); // Hindari trigger klik di luar

                const parent = $('.selectize-control');
                const existingElement = parent.find('.selectize-control-cover');

                // Hapus elemen jika sudah ada sebelumnya (biar tidak duplikasi)
                if (existingElement.length) {
                    existingElement.remove();
                }

                // Tambahkan elemen di dalam .selectize-control paling depan
                parent.prepend('<div class="selectize-control-cover"></div>');

                // Styling untuk memastikan elemen terlihat jelas
                $('.selectize-control-cover').css({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    inset: '0',
                    background: 'transparent',
                    cursor: 'pointer',
                    zIndex: '10',
                });
            });

            // Event saat elemen diklik, elemen akan hilang
            $(document).on('click', '.selectize-control-cover', function () {
                $(this).remove();
            });

            // 🔥 Hook untuk mendeteksi perubahan display: none pada .selectize-dropdown
            const dropdownEl = $('.selectize-dropdown')[0];

            if (dropdownEl) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'style') {
                            const display = $(dropdownEl).css('display');

                            if (display === 'none') {
                                $('.selectize-control-cover').remove(); // Hapus cover saat dropdown tertutup
                            }
                        }
                    });
                });

                // Observe perubahan atribut style pada dropdown
                observer.observe(dropdownEl, { attributes: true, attributeFilter: ['style'] });
            }
        }

    }

}

setTimeout(() => { init_wedding_gift(); }, 500);









/*  ==============================
        WEDDING WISH
============================== */

// ---------- Calling Modal [ON CLICK] --------------------------------------------------
$(document).on('click', '[data-modal]', function(e){
    e.preventDefault();
    var element = this;
    var modal = $(element).data('modal');
    var data = { 
        'status': 'modal',
        'modal': modal
    }

    // Delete Comment
    if (modal == 'delete_comment') {
        var comment = $(element).data('comment');
        data['comment'] = comment;
    }

    ajaxCall(data, function(result){
        if (result.modal != '') {
            openModal(result['modal']);
        }

    });

});

// ---------- Deleting [ON CLICK] --------------------------------------------------
$(document).on('click', '[data-delete]', function(e){
    e.preventDefault();
    var element = this;
    var status = $(element).data('delete');
    var data = {
        'status': status
    };

    if (status == 'delete_comment') {
        var comment = $(element).data('comment');
        data['comment'] = comment;
    }

    ajaxCall(data, function(result){
        if (result.callback == 'comment') {
            showAlert(result.message, 'success');

            closeModal();

            if (typeof allComments === 'function') allComments();
            if (typeof load_comment === 'function') load_comment();
            if (typeof lysha_get_all_comments === 'function') lysha_get_all_comments();
        }        
    });

});

// ---------- All Comments (Function) --------------------------------------------------
var allComments = (function comment(){
    var data = {
        'status': 'all_comments',
    }
    ajaxCall(data, function(result){
        $('.comments').html('');
        $('.comments').append(result.comments);
        if (result.more != '') {
            $('.comment-inner .foot').html('');
            $('.comment-inner .foot').append(result.more);
        }
    });
    return comment;
}());


// ---------- More Comment --------------------------------------------------
$(document).on('click', '.more-comment', function(e){
    e.preventDefault();
    var lastComment = $(this).data('last-comment');
    var data = {
        'status': 'more_comments',
        'last_comment': lastComment,
    }
    $(this).html('Loading... <i class="fas fa-spinner fa-spin"></i>');
    ajaxCall(data, function(result){
        $('.comment-inner .foot').html('');
        $('.more-comment').html('Show more comments');
        if (result.comments != '') {
            $('.comments').append(result.comments);
        }
        if (result.more != '') {
            $('.comment-inner .foot').append(result.more);
        }
    });
});


// Load Comment
var load_comment = function() {
    var data = new FormData();
    data.append('post', 'loadComment');

    var template = $('.wedding-wish-wrap').attr('data-template');
    if (template != '') data.append('template', template);

    var onSuccess = function(res) {
        if (res.commentItems) $('.comment-wrap').addClass('show').html(res.commentItems);

        if (!res.commentItems) $('.comment-wrap').removeClass('show');

        if (res.nextComment && res.nextComment != 0) {
            $('.more-comment-wrap').addClass('show');
            $('#moreComment').attr('data-start', res.nextComment);
        }

        if (!res.nextComment) {
            $('.more-comment-wrap').removeClass('show');
            $('#moreComment').attr('data-start', 0);
        }
    }

    postData(data, onSuccess);
}

setTimeout(() => { load_comment(); }, 500);


// More Comment
var more_comment = function(e) {
    e.preventDefault();
    var me = this;
    var meText = $(me).html();
    var start = $(this).attr('data-start');
    var loadText = $(this).attr('data-load-text');
    var template = $(this).attr('data-template');

    if (loadText == '') loadText = "Loading";

    if (start != '') {

        var data = new FormData();
        data.append('post', 'moreComment');
        data.append('start', start);
        data.append('template', template);

        var onSuccess = function(res) {
            if (res.commentItems) $('.comment-wrap').addClass('show').append(res.commentItems);

            if (res.nextComment && res.nextComment != 0) {
                $('.more-comment-wrap').addClass('show');
                $(me).attr('data-start', res.nextComment);
            }

            if (!res.nextComment) {
                $('.more-comment-wrap').removeClass('show');
                $(me).attr('data-start', 0);
            }

            afterSend();
        }

        var onError = function(res=null) { afterSend(); }

        var afterSend = function() {
            $(me).prop('disabled', false).html(meText);
        }

        var beforeSend = function() {
            $(me).prop('disabled', true).html(loadText + " <i class='fas fa-spinner fa-spin'></i>");
        }

        postData(data, onSuccess, onError, beforeSend);
    }
}

$(document).on('click', '#moreComment', more_comment);



/*  ==============================
        MUSIC
============================== */
// Enhanced Universal Audio System for Wedding Invitations
var AudioManager = {
    // State management
    state: {
        isMusicAttemptingToPlay: false,
        isMusicPlayed: false,
        isAudioUnlocked: false,
        audioContext: null,
        backgroundMusic: null,
        retryAttempts: 0,
        maxRetries: 3
    },

    // Enhanced device detection
    device: {
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
        isMac: /Mac/.test(navigator.platform),
        isAndroid: /Android/.test(navigator.userAgent),
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isChrome: /Chrome/.test(navigator.userAgent),
        isFirefox: /Firefox/.test(navigator.userAgent),

        // Enhanced autoplay detection
        isAutoplayBlocked: function() {
            return this.isIOS || this.isSafari || 
                   (this.isAndroid && !this.isChrome) ||
                   (this.isChrome && this.isMobile);
        },

        // Check if in-app browser (WhatsApp, Instagram, etc)
        isInAppBrowser: function() {
            return /FBAN|FBAV|Instagram|Line|WhatsApp|Telegram/i.test(navigator.userAgent);
        }
    },

    // Initialize audio system
    init: function(config) {
        if (typeof settingUndangan.music === 'undefined' || !settingUndangan.music.url) {
            // console.log('No music configuration found');
            return;
        }

        this.config = {
            url: settingUndangan.music.url,
            box: settingUndangan.music.box,
            volume: config?.volume || 0.5,
            // fadeInDuration: config?.fadeInDuration || 2000,
            retryDelay: config?.retryDelay || 1000
        };

        this.setupAudio();
        this.bindEvents();
        this.setupVisibilityHandling();
        
        // console.log('AudioManager initialized for:', this.device);
    },

    // Setup audio element with enhanced compatibility
    setupAudio: function() {
        const audio = document.createElement("audio");
        
        // Basic setup
        audio.loop = true;
        audio.preload = 'auto';
        audio.crossOrigin = 'anonymous';
        audio.playsInline = true; // Important for iOS
        
        // Platform-specific setup
        if (this.device.isAutoplayBlocked()) {
            audio.muted = false;
            audio.autoplay = false;
        } else {
            audio.muted = true; // Start muted for autoplay
            audio.autoplay = true;
        }

        // Multiple source support for better compatibility
        if (Array.isArray(this.config.url)) {
            this.config.url.forEach(src => {
                const source = document.createElement('source');
                source.src = src;
                source.type = this.getAudioType(src);
                audio.appendChild(source);
            });
        } else {
            audio.src = this.config.url;
        }

        audio.load();
        this.state.backgroundMusic = audio;
        
        // Setup Web Audio Context
        this.initAudioContext();
    },

    // Get MIME type for audio source
    getAudioType: function(src) {
        const ext = src.split('.').pop().toLowerCase();
        const types = {
            mp3: 'audio/mpeg',
            ogg: 'audio/ogg',
            wav: 'audio/wav',
            m4a: 'audio/mp4',
            aac: 'audio/aac'
        };
        return types[ext] || 'audio/mpeg';
    },

    // Initialize Web Audio Context
    initAudioContext: function() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext && !this.state.audioContext) {
                this.state.audioContext = new AudioContext();
            }
        } catch(e) {
            console.log('Web Audio API not supported:', e);
        }
    },

    // Enhanced audio unlock with retry mechanism
    unlockAudio: function() {
        if (this.state.isAudioUnlocked) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            // console.log(`Attempting to unlock audio (attempt ${this.state.retryAttempts + 1}/${this.state.maxRetries})`);

            const audio = this.state.backgroundMusic;
            if (!audio) {
                reject('Audio element not found');
                return;
            }

            // For iOS, create a silent audio buffer first
            if (this.device.isIOS) {
                this.unlockIOSAudio().then(resolve).catch(() => {
                    this.fallbackUnlock().then(resolve).catch(reject);
                });
            } else {
                this.fallbackUnlock().then(resolve).catch(reject);
            }
        });
    },

    // iOS-specific unlock method
    unlockIOSAudio: function() {
        return new Promise((resolve, reject) => {
            const audio = this.state.backgroundMusic;
            
            // Create silent buffer
            const silentAudio = new Audio();
            silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAAA==';
            silentAudio.preload = 'auto';
            
            const playPromise = silentAudio.play();
            
            if (playPromise) {
                playPromise.then(() => {
                    silentAudio.pause();
                    silentAudio.currentTime = 0;
                    
                    // Now unlock the main audio
                    const mainPromise = audio.play();
                    if (mainPromise) {
                        mainPromise.then(() => {
                            audio.pause();
                            audio.currentTime = 0;
                            this.state.isAudioUnlocked = true;
                            // console.log('iOS audio unlocked successfully');
                            resolve();
                        }).catch(reject);
                    } else {
                        this.state.isAudioUnlocked = true;
                        resolve();
                    }
                }).catch(reject);
            } else {
                reject('iOS silent audio failed');
            }
        });
    },

    // Fallback unlock method
    fallbackUnlock: function() {
        return new Promise((resolve, reject) => {
            const audio = this.state.backgroundMusic;
            audio.muted = false;
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    this.state.isAudioUnlocked = true;
                    
                    // Also unlock Web Audio Context
                    if (this.state.audioContext && this.state.audioContext.state === 'suspended') {
                        this.state.audioContext.resume().then(() => {
                            // console.log('Web Audio Context resumed');
                        });
                    }
                    
                    // console.log('Audio unlocked via fallback method');
                    resolve();
                }).catch(error => {
                    console.log('Fallback unlock failed:', error);
                    
                    // Last resort - just mark as unlocked for old browsers
                    if (this.state.retryAttempts < this.state.maxRetries) {
                        this.state.retryAttempts++;
                        setTimeout(() => {
                            this.unlockAudio().then(resolve).catch(reject);
                        }, this.config.retryDelay);
                    } else {
                        this.state.isAudioUnlocked = true; // Give up gracefully
                        resolve();
                    }
                });
            } else {
                this.state.isAudioUnlocked = true;
                resolve();
            }
        });
    },

    // Enhanced play music with fade-in
    playMusic: function() {
        if (!this.state.isAudioUnlocked) {
            // console.log('Audio not unlocked, attempting unlock...');
            this.unlockAudio().then(() => {
                setTimeout(() => this.playMusic(), 100);
            }).catch(error => {
                console.log('Failed to unlock audio:', error);
                this.pauseBoxAnimation();
            });
            return;
        }

        if (this.state.isMusicAttemptingToPlay) {
            return; // Already attempting
        }

        const audio = this.state.backgroundMusic;
        if (!audio) return;

        this.state.isMusicAttemptingToPlay = true;
        audio.muted = false;
        audio.volume = this.config.volume; // Set volume directly
        
        const promise = audio.play();

        if (promise !== undefined) {
            promise.then(() => {
                this.state.isMusicPlayed = true;
                this.state.isMusicAttemptingToPlay = false;
                this.playBoxAnimation();
                
                // Fade in
                // this.fadeIn(audio, this.config.volume, this.config.fadeInDuration);
                
                // console.log('Audio playing successfully');
            }).catch(error => {
                this.state.isMusicPlayed = false;
                this.state.isMusicAttemptingToPlay = false;
                this.pauseBoxAnimation();
                console.log('Audio play failed:', error);
            });
        } else {
            // Fallback for very old browsers
            this.state.isMusicPlayed = true;
            this.state.isMusicAttemptingToPlay = false;
            this.playBoxAnimation();
            audio.volume = this.config.volume;
        }
    },


    // Pause music with fade-out
    pauseMusic: function() {
        const audio = this.state.backgroundMusic;
        if (!audio) return;

        audio.pause();
        this.pauseBoxAnimation();
        this.state.isMusicAttemptingToPlay = false;
        this.state.isMusicPlayed = false;

        // Quick fade out
        // this.fadeOut(audio, 500, () => {
        // });
    },


    // Animation controls
    playBoxAnimation: function() {
        const box = $(this.config.box);
        if (!box.hasClass('playing')) {
            box.addClass('playing');
        }
        if (box.css('animationPlayState') !== 'running') {
            box.css('animationPlayState', 'running');
        }
    },

    pauseBoxAnimation: function() {
        const box = $(this.config.box);
        if (box.hasClass('playing')) {
            if (box.css('animationPlayState') === 'running') {
                box.css('animationPlayState', 'paused');
            }
        }
    },

    // Enhanced event binding
    bindEvents: function() {
        const self = this;
        
        // Music box click
        $(document).on('click', this.config.box, function(e) {
            e.preventDefault();
            if (self.state.isMusicPlayed) {
                self.pauseMusic();
            } else {
                self.playMusic();
            }
        });

        // Pause when video plays
        $(document).on('click', '.play-btn, .play-youtube-video', function(e) {
            e.preventDefault();
            if (self.state.isMusicPlayed) {
                self.pauseMusic();
            }
        });

        // Is Box Hidden?
        var prevScrollpos = window.pageYOffset; 
        var isBoxHidden = false;
        var boxTimeout;
        var box = this.config.box

        // Show Music Box
        var showMusicBox = function() {
            // Show Music Box
            $(box).removeClass('hide');                     // Showing the box
            isBoxHidden = false;                            // Box is not hidden

            clearTimeout(boxTimeout);                       // Clear Timeout
        }

        // Hide Music Box
        var hideMusicBox = function() {
            // Hide Music Box
            $(box).addClass('hide');                        // Hiding the box
            isBoxHidden = true;                             // Box is hidden

            clearTimeout(boxTimeout);                       // Clear Timeout
            boxTimeout = setTimeout(showMusicBox, 5000);    // Set Timeout
        }            

        // Window On Scroll
        $(window).on('scroll', function(){
            var currentScrollPos = window.pageYOffset;

            if (prevScrollpos > currentScrollPos) {                    
                if (isBoxHidden) showMusicBox();
            } else {
                if (!isBoxHidden) hideMusicBox();
            }

            prevScrollpos = currentScrollPos;
        });

        // Universal unlock events with improved detection
        const unlockEvents = ['touchstart', 'touchend', 'click', 'keydown'];
        let unlockHandlerExecuted = false;

        const unlockHandler = function(e) {
            if (!self.state.isAudioUnlocked && !unlockHandlerExecuted) {
                unlockHandlerExecuted = true;
                
                self.unlockAudio().then(() => {
                    // Remove listeners after successful unlock
                    unlockEvents.forEach(event => {
                        document.removeEventListener(event, unlockHandler, true);
                    });
                }).catch(() => {
                    // Reset flag on failure to allow retry
                    unlockHandlerExecuted = false;
                });
            }        
        };

        // Add unlock listeners
        unlockEvents.forEach(event => {
            document.addEventListener(event, unlockHandler, { capture: true, passive: true });
        });
    },

    // Enhanced visibility change handling with auto-resume
    setupVisibilityHandling: function() {
        const self = this;
        
        // Main visibility change handler
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                // Store current playing state before pausing                
                if (self.state.isMusicPlayed) {
                    self.pauseMusic();
                }
            } else if (document.visibilityState === 'visible') {
                // Resume music 
                if (self.state.isAudioUnlocked) {
                    // Small delay to ensure tab is fully active (especially on iOS)
                    setTimeout(() => {
                        self.playMusic();
                    }, 100);
                }
            }
        });

        // Handle page unload
        window.addEventListener('beforeunload', function() {
            if (self.state.isMusicPlayed && self.state.backgroundMusic) {
                self.state.backgroundMusic.pause();
            }
        });
    },

    // Public API
    play: function() { this.playMusic(); },
    pause: function() { this.pauseMusic(); },
    isPlaying: function() { return this.state.isMusicPlayed; },
    isUnlocked: function() { return this.state.isAudioUnlocked; },
    getState: function() { return { ...this.state }; }
};

// Initialize when DOM is ready
$(document).ready(function() {
    // Initialize AudioManager with config
    AudioManager.init({
        volume: 0.6,
        // fadeInDuration: 3000,
        retryDelay: 1500
    });

    // Expose to global scope for backward compatibility
    window.playMusic = () => AudioManager.play();
    window.pauseMusic = () => AudioManager.pause();
    window.audioControls = AudioManager;
});

// Enhanced playMusicOnce function
function playMusicOnce() {
    if (AudioManager && !AudioManager.state.isMusicAttemptingToPlay && !AudioManager.state.isMusicPlayed) {
        AudioManager.play();
    }
}

// Function untuk cek viewport width
function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

if (getViewportWidth() > 960) {
    $(document).on('touchstart click', function(e) {
        // Play Music Once
        playMusicOnce()
    });
}

/*  ==============================
        BOOK CONFIGURATION
============================== */
// ---------- SELECTIZE --------------------------------------------------
(function bookConfiguration() {
    if (typeof window.BOOKS != 'undefined') {
        var books = window.BOOKS,
            template = '',
            allBank = [];

        // if books are not empty
        if (books != '') {
            // Looping
            for (var i = 0; i < books.length; i++) {
                template = {
                    'id': books[i]['id'],
                    'title': books[i]['title'],
                    'credential': books[i]['credential']
                }
                allBank.push(template);
            }
    
            // Options
            var options = {
                maxItems: 1,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                options: allBank,
                create: false,
                render: {
                    item: function(item, escape) {
                        return '<div>' +
                            (item.title ? '<p>' + escape(item.title) + '</p>' : '') +
                        '</div>';
                    },
                    option: function(item, escape) {
                        var label = item.title;
                        var desc = item.credential;
                        return '<div class="item">' +
                            '<p style="font-size: 14px;"><strong>' + escape(label) + '</strong></p>' +
                            '<p style="font-size: 12px;"><strong>' + escape(desc) + '</strong></p>' +
                        '</div>';
                    }
                },
                onInitialize: function() {
                    var instance = this;

                    // disabled input
                    instance.$control_input.attr('readonly', 'readonly');

                    // Document onClick
                    $(instance.$control).off('click').on('click', function(e){
                        e.stopPropagation();

                        // is focused
                        if (instance.isFocused) return false;
                    });
                }
            };

            // Choose Bank Default
            if ($('select[name="choose_bank"]').length > 0) {
                var select = $('select[name="choose_bank"]').selectize(options);
                var selectize = $(select)[0].selectize;
                if (allBank.length > 0) {
                    selectize.setValue(allBank[0]['id'], 1);
                }
                $(".selectize-input input").attr('readonly','readonly');
            }
        }
    }
}());


/*  ==============================
        PROTOCOL
============================== */
(function protocolConfiguration(){
    // if protocol is not undefined
    if (typeof window.PROTOCOL != 'undefined') {
        var protocolSlider = window.PROTOCOL.slider,
            protocolDots = window.PROTOCOL.dots;

        var protocolOptions = {
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 3,
                variableWidth: true,
                slidesToScroll: 1,
                swipeToSlide: true,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                speed: 700,
                cssEase: 'ease-in-out',
                dots: false,
                arrows: false,
                asNavFor: protocolDots,
                pauseOnFocus: false,
                pauseOnHover: false,
                draggable: true,
                // touchMove: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
        }
        
        var protocolDotsOptions = {
                centerMode: true,
                variableWidth: true,
                slidesToScroll: 1,
                swipeToSlide: true,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                speed: 700,
                cssEase: 'ease-in-out',
                dots: false,
                arrows: false,
                asNavFor: protocolSlider,
                pauseOnFocus: false,
                pauseOnHover: false,
                draggable: true,
        }
            
        if ($(protocolSlider).hasClass('slick-initialized')) $(protocolSlider).slick('unslick');     // unslick the slider
        if ($(protocolDots).hasClass('slick-initialized')) $(protocolDots).slick('unslick');    // Unslick the dots

        $(protocolSlider).slick(protocolOptions);       // slick the slider
        $(protocolDots).slick(protocolDotsOptions);     // slick the dots
        
        // Before Change
        $(protocolSlider).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            if ( nextSlide == 0 ) {
                var cls = 'slick-current slick-active' + ( protocolOptions.centerMode ? ' slick-center' : '' );
        
                setTimeout(function() {
                    $( '[data-slick-index="' + slick.$slides.length + '"]' ).addClass( cls ).siblings().removeClass( cls );
                    for (var i = slick.options.slidesToShow - slick.options.slidesToShow; i >= 0; i--) {
                        $( '[data-slick-index="' + i + '"]' ).addClass( cls );
                    }
                }, 10 );
            }
        });
    }
}());


/*  ==============================
        PERSON
============================== */
var hideInfoTimeout;                // Hide Timeout Out

// Toggle Person Info
function togglePersonInfo() {
    var person = $('#person'),
        greeting = $(person).find('.person-greeting'),
        info = $(person).find('.person-info');

    if ($(person).length) {            

        var showGreeting = function() {
            $(greeting).addClass('show');
        }
        var hideGreeting = function() {
            $(greeting).removeClass('show');
        }
        var showInfo = function() {
            $(info).addClass('show');            
            hideInfoTimeout = setTimeout(function(){
                hideInfo();         // Hide Info
                showGreeting();     // Show Greeting
            }, 10000);
        }
        var hideInfo = function() {
            $(info).removeClass('show');
            if (typeof hideInfoTimeout != 'undefined') {
                clearTimeout(hideInfoTimeout);           // Clear Timeout                    
            };
        }
    
        $(greeting).hasClass('show') ? hideGreeting() : showGreeting();            // Toggle Greeting
        $(info).hasClass('show') ? hideInfo() : showInfo();                        // Toggle Info
            
        if ($(greeting).hasClass('show') === false && $(info).hasClass('show') === false) showGreeting();       // Default Set        
        if ($(greeting).hasClass('show') && $(info).hasClass('show')) hideInfo();                               // If both is showed
    }        
}

$(function() {
    setTimeout(togglePersonInfo, 1000);
});



/*  ==============================
        GALLERY SLIDER SYNCING
============================== */
// SLIDER SYNCING
function startSliderSyncing() {
    if ($('.slider-syncing__preview').length && $('.slider-syncing__nav').length) {

        var sliderSyncingPreviewOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-syncing__nav'
            }
        var sliderSyncingNavOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.slider-syncing__preview',
                arrows: false,
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                speed: 750,
                variableWidth: true,
                infinite: true,
            }

        var sliderSyncingPreview = $('.slider-syncing__preview');
        var sliderSyncingNav = $('.slider-syncing__nav');

        if ($(sliderSyncingPreview).hasClass('slick-initialized')) $(sliderSyncingPreview).slick('unslick');
        if ($(sliderSyncingNav).hasClass('slick-initialized')) $(sliderSyncingNav).slick('unslick');

        $(sliderSyncingPreview).slick(sliderSyncingPreviewOptions);
        $(sliderSyncingNav).slick(sliderSyncingNavOptions);

    }   
}

// SINGLE SLIDER
function gallerySingleSlider(configs) {
    if (typeof window.GALLERY_SINGLE_SLIDER != 'undefined' && window.GALLERY_SINGLE_SLIDER === true) {

        var singleSliderContainer = $('#singleSliderContainer');        // Single Slider Container

        // custom container
        if (typeof configs !== 'undefined' && configs.hasOwnProperty("container")) {
            singleSliderContainer = $(configs.container);
        }

        if (singleSliderContainer.length) {
            var singleSliderOptions = {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    centerMode: true,
                    speed: 300,
                    variableWidth: true,
                    infinite: false,
                    touchThreshold: 5000,
                    swipeToSlide: false
            }

            // configs is an object
            if (typeof configs === 'object') singleSliderOptions = {...singleSliderOptions, ...configs};

            
            if ($(singleSliderContainer).hasClass('slick-initialized')) $(singleSliderContainer).slick('unslick');      //  Unslick if it has initialized
            var singleSlider = $(singleSliderContainer).slick(singleSliderOptions);            // Start new slider

            // Single Slider On Wheel
            singleSlider.on('wheel', (function(e) {
                e.preventDefault();
              
                if (e.originalEvent.deltaY > 0) {
                  $(this).slick('slickNext');
                } else {
                  $(this).slick('slickPrev');
                }
            }));

            // is Sliding
            var isSliding = false;

            // Before Change
            $(singleSliderContainer).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                isSliding = true;

                if ( nextSlide == 0 ) {
                    var cls = 'slick-current slick-active' + ( singleSliderOptions.centerMode ? ' slick-center' : '' );
            
                    if (singleSliderOptions.infinite === true) {
                        setTimeout(function() {
                            $( '[data-slick-index="' + slick.$slides.length + '"]' ).addClass( cls ).siblings().removeClass( cls );
                            for (var i = slick.options.slidesToShow - slick.options.slidesToShow; i >= 0; i--) {
                                $( '[data-slick-index="' + i + '"]' ).addClass( cls );
                            }
                        }, 10 );
                    }                    
                }

            });

            // After Change
            $(singleSliderContainer).on('afterChange', function(event, slick, currentSlide){
                isSliding = false;
            });

            // Prevent Trigger Clicking While Swiping
            singleSlider.find('.singleSliderPicture > .anchor').click(function(e){
                if (isSliding) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            });

            // Single Slider Picture
            $(singleSliderContainer).find('.singleSliderPicture').each(function(i, picture){
                var width = $(this).width();
                var height = width + (width / 3);

                $(picture).css('--width', width + 'px');
                $(picture).css('--height', height + 'px');
            });

        }        
    }    
}    


// KAT GALLERY MODERN
function galleryKatModern() {
    if (typeof window.GALLERY_MODERN != 'undefined' && window.GALLERY_MODERN === true) {
        var galleryModern = $('#katGalleryModern');
        if (galleryModern.length) { 

            var imgWrap = $(galleryModern).find('.modern__img-wrap').get(0);
            var modernList = $(galleryModern).find('.modern__list').children();        
            var modulus = modernList.length % 3;

            // Modern List
            if (modernList.length) {
                
                // Moder List
                $(modernList).each(function(i, list){
                    var margin = 2.5;
                    var width = $(list).width();
                    width = width - (margin * 2);
                    var height = width + (width / 3);

                    $(list).css('width', width + 'px');
                    $(list).css('height', height + 'px');
                    $(list).css('margin', margin + 'px');

                    if (modulus > 0 && (modernList.length - 1) == i) {
                        $(list).css('flex-grow', '1');
                    }
                });

                // Modern List On Click
                $(modernList).on('click', function(e){
                    e.preventDefault();
                    var me = this;
                    var src = $(me).attr('href');

                    if ($(me).hasClass('selected') === false) {
                        // Modern List
                        $(modernList).each(function(i, list){
                            $(list).removeClass('selected');
                        });
                        $(me).addClass('selected');             // Selected

                        if (typeof imgWrap != 'undefined') {
                            var img = $(imgWrap).children('img');
                            $(img).removeClass('show');

                            setTimeout(function(){
                                $(img).attr('src', src);

                                setTimeout(function(){
                                    $(img).addClass('show');
                                }, 375);

                            }, 350);
                        }
                    }            
                });

                // Trigger first element
                $(modernList).eq(0).trigger('click');

            }        

            // Img Wrap        
            if (typeof imgWrap != 'undefined') {                    
                var margin = 2.5;
                var width = $(imgWrap).width();
                width = width - (margin * 2);
                var height = width + (width / 3);

                $(imgWrap).css('width', width + 'px');
                $(imgWrap).css('height', height + 'px');
                $(imgWrap).css('margin', margin + 'px auto');
            }
        }
    }    
}



/*  ==============================
        OTHERS
============================== */
// ---------- Modal Video ---------------------------------------------------------------
var modal_video_options = {
        youtube: {
                autoplay: 1,
                cc_load_policy: 1,
                color: null,
                controls: 1,
                disableks: 0,
                enablejsapi: 0,
                end: null,
                fs: 1,
                h1: null,
                iv_load_policy: 1,
                // list: null,
                listType: null,
                loop: 0,
                modestbranding: null,
                mute: 0,
                origin: null,
                // playlist: null,
                playsinline: null,
                rel: 0,
                showinfo: 1,
                start: 0,
                wmode: 'transparent',
                theme: 'dark',
                nocookie: false,
            }
    };


$('.play-btn').modalVideo(modal_video_options);
$('.play-youtube-video').modalVideo(modal_video_options);


// ---------- AOS (Animation) ------------------------------------------------------
var AOSOptions = {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 10, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
}

// Run AOS on Load
$(window).on('load', function () {
    AOS.refresh();
});

$(function() {
    AOS.init(AOSOptions);
});

$(window).on("scroll", function () {
    AOS.init(AOSOptions);
});


// ---------- LIGHT GALLERY --------------------------------------------------
$(function(){
    lightGallery(document.getElementById('lightGallery'), {
        download: false,
    });
    
    showGalleries();
});

// SHOW GALLERY
function showGalleries() {
    $('.lightgallery').each(function(i, gallery) {
        lightGallery(gallery, {
            download: false,
        });
    });
};



var einvitationCardReload = true;

// Capturing E Invitation Card
var capturing_einvitation_card = function() {
    // not allowed
    if (einvitationCardReload) return false;
    
    const $qrcardWrapper = $('.rsvp-qrcard-wrap');
    const $qrcardImage = $qrcardWrapper.find('.rsvp-qrcard-img');
    const $qrcardButton = $qrcardWrapper.find('.rsvp-confirm-btn');

    let formData = new FormData();
    formData.append('post', 'postCapturedPage');

    // blur it
    $qrcardImage.css({
        filter: 'blur(2px)'
    });

    const onSuccess = (res) => {
        // returned cards
        if (typeof res.card !== 'undefined' && res.card) {
            // replace image
            $qrcardImage.attr('src', res.card);
            $qrcardButton.attr('href', res.card);
            
            einvitationCardReload = true;
        }

        // unblur it
        $qrcardImage.css({
            filter: ''
        });
    }

    postData(formData, onSuccess);
}



/*  ================================================
        RSVP Functions
============================================= */

// Function RSVP Init
var fn_rsvp_init = function() {

    var post, request, content, template, changeButton;
    
    if (typeof window.RSVP_DATA != 'undefined') {
        post = window.RSVP_DATA.post;
        request = window.RSVP_DATA.request;
        content = window.RSVP_DATA.content;
        template = window.RSVP_DATA.template;
        changeButton = window.RSVP_DATA.changeButton;
    }

    var changeRSVPText = $(changeButton).html();

    // Data
    var data = new FormData();
    data.append('post', post);
    data.append('request', request);
    data.append('content', content);
    data.append('template', template);    

    var onSuccess = function(res) {
        // content
        if (res.rsvp_content && res.rsvp_content != '') {
            // append content to body
            $('.rsvp-body').html(res.rsvp_content);

            // URLify
            $('.rsvp-body').find('p').each(function(i, el) {
                el.innerHTML = urlify(el.innerHTML);
            });

            // RSVP Status
            if ( $('input[type="radio"][name="rsvp_status"]:checked').length == 0 ) {
                $('input[type="radio"][name="rsvp_status"]').eq(0).trigger('click');
            }
        }

        $(changeButton).html(changeRSVPText).prop('disabled', false);

        // capturing
        capturing_einvitation_card();
    }

    var onError = function(res=null) {
        $(changeButton).html(changeRSVPText).prop('disabled', false);
    }

    var beforeSend = function() {
        $(changeButton).html(changeRSVPText + " <i class='fas fa-spinner fa-spin'></i>").prop('disabled', true);
    }

    postData(data, onSuccess, onError, beforeSend);
}


// Function RSVP Change
var fn_rsvp_change = function(e) {
    e.preventDefault();

    if (typeof window.RSVP_DATA != 'undefined') {
        window.RSVP_DATA.content = 'rsvp_form';

        if (typeof fn_rsvp_init === 'function') fn_rsvp_init();

        window.RSVP_DATA.content = '';
    }
}

$(document).on('click', '#changeRSVP', fn_rsvp_change);




// Function RSVP Amount Toggle
var fn_rsvp_amount_toggle = function(e) {
    e.preventDefault();
    if (typeof window.RSVP_DATA != 'undefined') {
        if ( $(this).val() == 'going' ) {
            $(window.RSVP_DATA.amountElement).slideDown('slow');
        } else {
            $(window.RSVP_DATA.amountElement).slideUp('slow');
        }      
    }
}

$(document).on('change', 'input[type="radio"][name="rsvp_status"]', fn_rsvp_amount_toggle);


// Customization Template
function customizationTemplate(data) {

    var customFontsClass = '';

    // Selected Fonts
    if (data.selectedFonts) {
        Object.entries(data.selectedFonts).forEach(([key, field]) => {
            // css variable
            var cssvar = key.split(/(?=[A-Z])/).join('-').toLowerCase();

            // Reset values
            $('body').css({
                [`--${cssvar}-family`]: '',
                [`--${cssvar}-style`]: '',
                [`--${cssvar}-weight`]: '',
                [`--${cssvar}-size`]: '',
                [`--${cssvar}-lettercase`]: ''
            });

            // Priority font family
            if (field.family && field.category) {
                $('body')[0].style.setProperty(`--${cssvar}-family`, `"${field.family}", ${field.category}`, 'important');
                customFontsClass = 'custom-fonts';
            }
            
            // Priority font style
            if (field.style) {
                $('body')[0].style.setProperty(`--${cssvar}-style`, `${field.style}`, 'important');
            }

            // Priority font weight
            if (field.weight) {
                $('body')[0].style.setProperty(`--${cssvar}-weight`, `${field.weight}`, 'important');
            }

            // Priority font size
            if (field.size) {
                $('body')[0].style.setProperty(`--${cssvar}-size`, `${field.size}px`, 'important');
            }

            // Priority font lettercase
            if (field.lettercase) {
                $('body')[0].style.setProperty(`--${cssvar}-lettercase`, `${field.lettercase}`, 'important');
            }

            // URL
            if (field.url) {
                // check if url exist
                $('link.font-css').each(function(i, link){
                    if ($(link).attr('href') == field.url) $(link).addClass('stay');
                });

                // append link
                if ($(`link.font-css[href="${field.url}"]`).length == 0) {
                    $('head').append(`<link class="font-css stay" rel="stylesheet" href="${field.url}">`);
                }
            }
        });
    }
    
    // remove font-css
    $('link.font-css:not(.stay)').remove();
    $('link.font-css').removeClass('stay');


    // Selected Colors
    if (data.selectedColors) {
        Object.entries(data.selectedColors).forEach(([key, field]) => {
            // css variable
            var cssvar = key.split(/(?=[A-Z])/).slice(1).join('-').toLowerCase();

            // Reset values
            $('body').css({
                [`--${cssvar}`] : ''
            });

            // Priority Color
            if (field) {
                $('body')[0].style.setProperty(`--${cssvar}`, `${field}`, 'important');
            }
        });
    }

    // body has class
    if (typeof $('body').attr('class') !== 'undefined') {
        // Get preset classes
        var presetClasses = $('body').attr('class').split(' ').filter(x => x.indexOf('preset-') !== -1);

        // Remove preset classes
        presetClasses.map(x => $('body').removeClass(`${x.replace('preset-', '')} ${x}`));
    }
    
    // Add body class
    $('body').removeClass('custom-fonts').addClass(`${customFontsClass}`);

    // Preset class
    if (data.presetCode) $('body').addClass(`${data.presetCode} preset-${data.presetCode}`);

}


// Extract Main Domain
function extractMainDomain(url) {
    // Create an anchor element to parse the URL
    var parser = document.createElement('a');
    parser.href = url;
  
    // Extract the hostname, which includes the subdomain
    var hostname = parser.hostname;
  
    // Split the hostname by dots and take the last two parts
    var parts = hostname.split('.').slice(-2);
  
    // Join the last two parts to get the main domain
    var mainDomain = parts.join('.');
  
    return mainDomain;
}
        
// Window visualViewport
$(window.visualViewport).on('resize', function(){

    // body height
    $('body').css({'--body-height': `${window.visualViewport.height}px`});

});               


// Before unload
// Patch: Prevent ReferenceError if isMusicPlayed is not defined
if (typeof isMusicPlayed === 'undefined') {
    var isMusicPlayed = false;
}
$(window).on('beforeunload', function(){
    // Pause Music
    if (isMusicPlayed && typeof pauseMusic === 'function') return pauseMusic();
});


// Get Message
window.addEventListener('message', function(event){
    // verify origin
    if (extractMainDomain(event.origin) === extractMainDomain(this.window.location.origin)) {
        
        var action = event.data.action;

        // Customize Template
        if (action === "customizeTemplate" && event.data.customizeTemplate) {
            customizationTemplate(event.data.customizeTemplate);
        }

        // Load Content
        if (action === "loadContent" && typeof event.data.content !== 'undefined') {
            var iframeDoc = event.target.document;
            var content = event.data.content;

            // Replace the iframe's content
            iframeDoc.open();
            iframeDoc.write(content);
            iframeDoc.close();
        }

    }
});


/* ===================================================
    FUNCTION KADO
==================================================  */

var func_kado_init = function () {
    var post, request, content, template, ornament;

    if (typeof window.KADO_DATA !== 'undefined') {
        post = window.KADO_DATA.post;
        request = window.KADO_DATA.request;
        content = window.KADO_DATA.content || 'hadiah_content';
        template = window.KADO_DATA.template || 'default';
        ornament = window.KADO_DATA.ornament || '';
    }

    var data = new FormData();
    data.append('post', post);
    data.append('request', request);
    data.append('content', content);
    data.append('template', template);
    data.append('modal', 'show_modal_kado')

    var onSuccess = function (res) {
        if (res.hadiah_content && res.hadiah_content !== '') {
            var kadoSection = $('.wedding-gifts-wrap');

            kadoSection.html(res.hadiah_content);

            if (ornament !== '' || ornament !== undefined) {
                kadoSection.find('.wedding-gifts-inner').prepend(ornament);                
            }
            
            detailKadoClick();
        }
    };
    
    function detailKadoClick() {
        $(document).on('click', '.wedding-gifts-body .hadiah-card-button', function (e) {
            e.preventDefault();
            var KadoName = $(this).attr('data-name');
            var KadoAddress = $(this).attr('data-address');
            var KadoPrice = $(this).attr('data-price');
            var KadoAmount = $(this).attr('data-amount');
            var KadoWeb = $(this).attr('data-web');
            var KadoImg = $(this).attr('data-img');
            var KadoDesc = $(this).attr('data-description');
            var KadoID  = $(this).attr('data-id');
            var KadoDibeli  = $(this).attr('data-dibeli');
            var KadoDibelilabel  = $(this).attr('data-dibeli-label');
            var KadoAmountlabel  = $(this).attr('data-amount-label');
            showKadoModal(KadoName, KadoAddress, KadoPrice, KadoAmount, KadoWeb, KadoImg, KadoDesc, KadoID, KadoDibeli, KadoDibelilabel, KadoAmountlabel);
        });
    }
    
    function showKadoModal(KadoName, KadoAddress, KadoPrice, KadoAmount, KadoWeb, KadoImg, KadoDesc, KadoID, KadoDibeli, KadoDibelilabel, KadoAmountlabel) {
        var data = createFormData('show_modal_kado', 'Is_show');
        
        var onSuccess = function (res) {
            if (res.modal !== '') {
                openModal(res.modal);
                var KadoModal = $('.kat__cropper-modal.kado.modal-details');

                var currency = KadoModal.find('.price-field').attr('data-currency') || 'Rp';
                var formatPrice = currency + ' ' + parseFloat(KadoPrice).toLocaleString('id-ID');
                var SisaKado = parseFloat(KadoAmount) - parseFloat(KadoDibeli);

                KadoModal.find('.address').text(KadoAddress);
                KadoModal.find('.kado-img').attr('src', KadoImg);
                KadoModal.find('.kado-name').text(KadoName);
                KadoModal.find('.kado-ket').text(KadoDesc);
                KadoModal.find('.price-field').text(formatPrice);
                KadoModal.find('.amount-field').text(KadoAmountlabel);
                KadoModal.find('.buying-kado-btn').attr('href', KadoWeb);
                KadoModal.find('.confirm-kado-btn').attr('data-id', KadoID);
                KadoModal.find('.confirm-kado-btn').attr('data-img', KadoImg);
                KadoModal.find('.confirm-kado-btn').attr('data-name', KadoName);
                KadoModal.find('.confirm-kado-btn').attr('data-sisa', SisaKado);
                KadoModal.find('.note-kado').text( KadoDibelilabel );

                confirmKadoClick();
                CloseModalButton();
            }
        };
    
        postData(data, onSuccess);
    }
    
    function confirmKadoClick() {
        $(document).on('click', '.confirm-kado-btn', function (e) {
            e.preventDefault();
            var returnKadoID = $(this).attr('data-id');
            var returnKadoImg = $(this).attr('data-img');
            var returnKadoName = $(this).attr('data-name');
            var returnKadoSisa = $(this).attr('data-sisa');
            showConfirmModal(returnKadoID,  returnKadoImg, returnKadoName, returnKadoSisa);
        });
    }
    
    function showConfirmModal(returnKadoID, returnKadoImg, returnKadoName, returnKadoSisa) {
        if ($('.kat__cropper-modal.kado.modal-confirm').length > 0) {
            return;
        }
    
        var data = createFormData('show_confirm_modal', 'is_confirm');
        var onSuccess = function (res) {
            if (res.modal !== '') {
                openModal(res.modal);
    
                var ConfirmModal = $('.kat__cropper-modal.kado.modal-confirm');
                ConfirmModal.find('[name="kado_id"]').val(returnKadoID);
                ConfirmModal.find('.img-confirm').attr('src', returnKadoImg);
                ConfirmModal.find('.img-caption').text(returnKadoName);
                ConfirmModal.find('[name="sisa_kado"]').val(returnKadoSisa);
                sendKado();
                CloseModalButton();
            }
        };
    
        postData(data, onSuccess);
    }
    
    function CloseModalButton() {
        $('.close-kado-btn').on('click', function (e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    
    
    function createFormData(postValue, modalValue) {
        var data = new FormData();
        data.append('post', postValue);
        data.append('modal', modalValue);
        return data;
    }
    

    var onError = function (res = null) {
        // alert("An error occurred while processing your request.");
    };

    postData(data, onSuccess, onError);
}



/*  ================================================
        DOCUMENT [ON READY]
============================================= */
$(document).ready(function(){

    // ======================================================================================
    // body height
    $('body').css({'--body-height': `${window.visualViewport.height}px`});
    
    // RSVP Inititalization
    if (typeof fn_rsvp_init === 'function') fn_rsvp_init();

    // Kado Inititalization
    if (typeof func_kado_init === 'function') func_kado_init();

    // ---------- URLify --------------------------------------------------
    $('p, label').each(function(i, el) {
        el.innerHTML = urlify(el.innerHTML);
    });

    // ---------- Checking the Quantity Control value --------------------------------------------------
    $('[data-quantity="control"]').each(function(i, input){
        var max = $(input).attr('max');
        var value = $(input).val();

        // If value is greater than max
        if (value >= max) $(input).val(max);

        // If value lower than 0
        if (value <= 0) $(input).val(1);
    });

    // ---------- Check nominal (Wedding Gift) value --------------------------------------------------    
    $('[name="nominal"]').each(function(i, el){
        if ($(el).is(':checked')) {
            if ($(this).val() <= 0) {
                $('.insert-nominal').slideDown();
                $('.insert-nominal').find('[name="inserted_nominal"]').focus();
            }
        }
    });

    // ---------- Show or Hide Saving Books --------------------------------------------------
    var select = $('select[name="choose_bank"]');
    if (select.length) {
        chooseBank($(select).val());
    }    

    // ---------- Attendance Toggling --------------------------------------------------
    $.each($('input[name="attendance"]'), function(i, input){
        attendanceToggle(input);
    }); 

    // ---------- RSVP INNER --------------------------------------------------
    var rsvpInner = $('.rsvp-inner');
    if ($(rsvpInner).hasClass('come')) {
        // If RSVP Inner has 'come' class
        $(rsvpInner).find('.rsvp-form').fadeOut();
        $(rsvpInner).find('.rsvp-confirm').fadeIn();
    } 
    if ($(rsvpInner).hasClass('not-come')) {
        // If RSVP Inner has 'not-come' class
        $(rsvpInner).find('.rsvp-form').fadeOut();
        $(rsvpInner).find('.rsvp-confirm').fadeIn();
    } 
    if ($(rsvpInner).hasClass('no-news')) {
        // If RSVP Inner has 'no-news' class
        $(rsvpInner).find('.rsvp-form').fadeIn();
        $(rsvpInner).find('.rsvp-confirm').fadeOut();
    }
    // --------------- scrollToTop ----------------------------------------------
    $(window).scrollTop(0);
});
