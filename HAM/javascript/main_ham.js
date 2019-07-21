"use strict";

///SERVICES

$(function() {
    $("ul.tabs").on("click", "li:not(.active)", function() {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
        $("div.tabs-content")
            .find("div.tab-content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
    });
});

//AMAZING WORK SECTION//
let imageArray = document.getElementsByClassName("work-image-item");
let clicked = 0;

$(function loadMore() {
    $("#loader").hide();
    for (let index = 0; index < 12; index++) {
        $(imageArray[index]).show();
    }
    $("#loadMore").on("click", function(event) {
        clicked++;
        $("#loader").show();
        $("#loadMore").hide();
        if (clicked == 1) {
            setTimeout(function() {
                $("#loader").hide();
                for (let index = 12; index < 24; index++) {
                    $(imageArray[index]).fadeIn("slow");
                }
                $("#loadMore").show();
            }, 1000);
        }
        if (clicked == 2) {
            setTimeout(function() {
                $("#loader").hide();
                for (let index = 24; index < imageArray.length; index++) {
                    $(imageArray[index]).fadeIn("slow");
                }
                $("#loadMore").hide();
            }, 1000);
        }
    });
});

$(function filter() {
    $(".work-tab-item").on("click", function() {
        $(".work-image-item").hide();
        $(".work-tab-item").removeClass("work-tab-item-active");
        $(this).addClass("work-tab-item-active");
        imageArray = document.getElementsByClassName($(this).attr("data-type"));
        for (let index = 0; index < 12; index++) {
            $(imageArray[index]).show();
        }
        if ($(imageArray).length <= 12) {
            $("#loadMore").hide();
        } else {
            $("#loadMore").show();
        }
    });
});

// FEEDBACKS //
( () => {
    function Client (name, position, picture, cite) {
        this.name = name;
        this.position = position;
        this.picture = picture;
        this.cite = cite;
    };

    let client01 = new Client (
        'Mary Stark',
        'CEO',
        'images/person.jpg',
        'Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Morbi pulvinar odio eget aliquam facilisis. non dictum odio nisi quis massa.'
    );
    let client02 = new Client (
        'Caroline Dofort',
        'Manager',
        'images/person1.jpg',
        'dig. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. '
    );
    let client03 = new Client (
        'Mary Black',
        'Producing Accounter',
        'images/person2.jpg',
        'Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. '
    );
    let client04 = new Client (
        'John Bolt',
        'UX Designer',
        'images/person3.jpg',
        'Integer dignissim, augue tempus ucies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Tempus ultricies luctus, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. '
    );
    let client05 = new Client (
        'John Bolt',
        'UX Designer',
        'images/person4.jpg',
        'Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laorltricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, non dictum odio nisi quis massa.'
    );
    let clients =[client01, client02, client03, client04, client05];


    let $facesCarousel = $('.faces-carousel');

    for (let i = 0, length = clients.length; i < length; i++) {
        let $face = $(`<div class="face" data-index="${i}" style="background-image: url(${clients[i].picture});"></div>`);

        if(i === 2) {$face.addClass('selected')};
        if(i < 1 || i > 4) {$face.addClass('hidden')};
        $facesCarousel.append($face);

    };

    displayFeedback();

    function displayFeedback () {

        let i = +$('.faces-carousel > .selected').attr('data-index');

        $('.saying-cite p').text(clients[i].cite);
        $('.saying-name p:nth-child(1)').text(clients[i].name);
        $('.saying-name p:nth-child(2)').text(clients[i].position);
        $('.saying-pic-face').css({backgroundImage: `url(${clients[i].picture})`});
    };


    $('.face').on('click', moveFaceUp);

    function moveFaceUp () {

        $('.faces-carousel > .selected').removeClass('selected')
        $(this).addClass('selected');

        displayFeedback();
    };



    $('.right-btn').on('click', function() {


        $('.face').off('click', moveFaceUp);

        let $selected = $('.faces-carousel > .selected');
        $selected.removeClass('selected');
        $selected.next().addClass('selected');

        displayFeedback();

        if ($($('.face')[4]).hasClass('selected')) {
            $($('.face')[0]).addClass('hidden');
            $($('.face')[4]).removeClass('hidden');
            $facesCarousel.append($($('.face')[0]).clone(true));
            $('.face')[0].remove();
        };
        $('.face').on('click', moveFaceUp);
    });


    $('.left-btn').on('click', function() {
        $('.face').off('click', moveFaceUp);

        let $selected = $('.faces-carousel > .selected');
        $selected.removeClass('selected');
        $selected.prev().addClass('selected');

        displayFeedback();

        if ($($('.face')[0]).hasClass('selected')) {
            $($('.face')[4]).addClass('hidden');
            let lastFace = $('.face')[$('.face').length-1];
            $($('.face')[0]).removeClass('hidden');
            ($('.face')[0]).before(lastFace.cloneNode(true));
            lastFace.remove();
        };
        $('.face').off('click', moveFaceUp);
    });

})();


