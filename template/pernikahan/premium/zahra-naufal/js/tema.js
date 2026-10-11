// Story Box Size
var story_box_size = function() {
    var $storyBox = $('.story-box');
    var windowWidth = $(window).width();

    for(var i = 0; i < $storyBox.length; i++) {
        var width = parseInt($($storyBox[i]).width());
        var maxWidth = parseInt($($storyBox[i]).css('max-width'));

        width = ((windowWidth * 90) / 100) - 40;

        if (width >= maxWidth) width = maxWidth;

        var newHeight = width + (width / 3);

        $($storyBox[i])
            .css('width', width + "px")
            .css('height',newHeight + "px")
            .css('border-radius', (width / 4) + "px");
    }
}

// Photo item size
var photo_item_size = function() {
    var $photoBox = $('.photo-box');
    var $photoItem = $('.photo-item');

    var boxWidth = parseInt($photoBox.width());
    var boxHeight = parseInt($photoBox.height());

    for (var i=0; i < $photoItem.length; i++) {
        var margin = parseInt($($photoItem[i]).css('margin'));

        var newWidth = (boxWidth / 2) - (margin * 2) - 5;
        var newHeight = (boxWidth / 2) - (margin * 2) - 5;

        // if ($photoItem.length == (i+1) && ($photoItem.length % 2) == 1 ) {
        //     var newHeight = (boxWidth / 2) + (margin * 12) - 5;
        // }

        $( $photoItem[i] )
            .css('width', newWidth + "px")
            .css('height', newHeight + "px");
    }
}

// Cover Details Size
var cover_details_size = function() {
    var $coverInner = $('.cover-inner');
    var $coverDetails = $('.cover-details');

    var innerWidth = $coverInner.width();

    $coverDetails.css('border-radius', (innerWidth / 2) + "px");
}



$(window).on('resize', function(){
    story_box_size();
    photo_item_size();
    cover_details_size();
});

$(document).ready(function(){
    story_box_size();
    photo_item_size();
    cover_details_size();
});