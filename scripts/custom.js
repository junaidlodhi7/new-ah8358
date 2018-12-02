function laodTYVedios() {
    var html = '';
    var url = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCm8SisFgvDujJztYOBC6NiIh52eL47y9c&chart=mostPopular&regionCode=US&part=snippet,contentDetails,statistics&videoCategoryId="
    $.get( url, function( data ) {
        data.items.forEach(function(video){
            var vId = 'https://www.youtube.com/watch?v=' + video.id;
            var img = video.snippet.thumbnails.high.url;
            var title = video.snippet.title;
            var date = '22 Jun 2017';
            html += "<div class='video-item'><div class='thumb-wrap'>";
            html += "<img src='"+ img +"' alt='Movie Thumb'><div class='thumb-hover'>";
            html += "<a class='play-video' href='" +vId+ "'><i class='fa fa-play'></i></a></div></div>";
            html += "<div class='video-details'> <h4 class='video-title'><a href='movie-detail.html'>" + title + "</a></h4>";
            html += "<p class='video-release-on'>" + date + "</p></div></div>";
        });
        $('#video-carousel').html(html);
        $('.video-carousel').owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [991, 3],
            itemsTablet: [767, 3],
            itemsMobile: [479, 1],
            slideSpeed: 200,
            navigation: true,
            navigationText: ['<i class=\"fa fa-angle-left\"></i>', '<i class=\"fa fa-angle-right\"></i>'],
            pagination: false,
        });
        /*-----------------------------------------
        Magnific Popup
        -----------------------------------------*/
        $('.image-large').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
        $('.play-video').magnificPopup({
            type: 'iframe'
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });
    });
    
}
$(document).ready(function () {
    'use strict';

    /*-----------------------------------------------------
    Navbar Toggle for Mobile
    ------------------------------------------------------*/
    function navbarCollapse() {
        if ($(window).width() < 992) {
            $(document).on('click', function (event) {
                var clickover = $(event.target);
                var _opened = $("#main-nav-collapse").hasClass("in");
                if (_opened === true && !(clickover.is('.dropdown, #main-nav-collapse input, #main-nav-collapse button, #main-nav-collapse .fa, #main-nav-collapse select'))) {
                    $("button.navbar-toggle").trigger('click');
                }
            });

            $('.dropdown').unbind('click');
            $('.dropdown').on('click', function () {
                $(this).children('.dropdown-menu').slideToggle();
            });
        }
    }
    navbarCollapse();

    /*-----------------------------------------
    Mobile dropdown toggle
    -----------------------------------------*/
    function dropdownToggle() {
        if ($(window).width() < 992) {
            $('.navbar-toggle').css('display', 'block');
            $('.navbar-collapse').css('display', 'none');

            $('.dropdown').unbind('click');

            $('.dropdown').on('click', function (dd) {
                dd.stopPropagation();
                $(this).children('.dropdown-menu').slideToggle();
            });
        } else {
            $('.navbar-toggle').css('display', 'none');
            $('.navbar-collapse').css('display', 'block');
        }
    }

    dropdownToggle();

    /*-----------------------------------------
    Header Slider 
    -----------------------------------------*/
    $('#banner-slider').owlCarousel({
        singleItem: true,
        slideSpeed: 200,
        autoPlay: 3000,
        stopOnHover: true,
        navigation: false,
        pagination: true,
        paginationNumbers: true,
    });

    /*-----------------------------------------
    Video Carousel 
    -----------------------------------------*/
    laodTYVedios();
    

    
    /*==========================================================
		Newletter Subscribe	
	==========================================================*/
    $(".subscription").ajaxChimp({
        callback: mailchimpResponse,
        url: "http://codepassenger.us10.list-manage.com/subscribe/post?u=6b2e008d85f125cf2eb2b40e9&id=6083876991" // Replace your mailchimp post url inside double quote "".  
    });

    function mailchimpResponse(resp) {
        if (resp.result === 'success') {

            $('.newsletter-success').html(resp.msg).fadeIn().delay(3000).fadeOut();

        } else if (resp.result === 'error') {
            $('.newsletter-error').html(resp.msg).fadeIn().delay(3000).fadeOut();
        }
    }

    
    /*-----------------------------------------
    All window event
    -----------------------------------------*/
    $(window).on('resize orientationchange', function () {
        dropdownToggle();
        navbarCollapse();
    });

});

