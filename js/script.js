$(document).ready(function () {
    if ($('a[href="#"]').length > 0) {
        $(document).on('click', 'a[href="#"]', function () {
            return false;
        })
    }

    $('form').validate();

    $(document).on('click', '.open-nav', function () {
        var toggle = $(this).data('toggle');
        if (toggle) {
            $(toggle).addClass('active');
            $('body').append('<div class="mask-site"></div>');
            $('body').addClass('o-hide');
        }
    });

    $(document).on('click', '.close-nav, .mask-site', function () {
        $('.main-nav-wrap').removeClass('active');
        $('.mask-site').remove();
        $('body').removeClass('o-hide');
    });

    $(document).on('click', '.js-modal-adr a', function () {
        $('.js-modal-adr a').removeClass('active');
        $(this).addClass('active');
        $('#call input[name=adr]').val($(this).children('.title').text());
    });

    if ($('.r-nav.fix').length > 0) {
        var cont = $('.left-content'),
            contH = +cont.height() - 120,
            contPos = cont.position();
        $(window).scroll(function () {
            if ($(window).scrollTop() > contPos.top) {
                console.log((($(window).scrollTop() - contPos.top) + $('.r-nav.fix').height()), contH);
                if (contH > (($(window).scrollTop() - contPos.top) + $('.r-nav.fix').height())) {
                    $('.r-nav.fix').css('top', ($(window).scrollTop() - contPos.top) + 15 + 'px');
                }
            } else {
                $('.r-nav.fix').css('top', 0);
            }
        });
    }


    if ($('.js-mobile-nav').length > 0) {
        if ($('.mobile-nav-wrap').is(':visible')) {
            $('.mobile-nav-wrap').css('height', $('.mobile-nav-wrap').height() + 'px');
        }
        $(window).scroll(function () {
            if ($(window).scrollTop() > $('.header').height()) {
                $('.js-mobile-nav').addClass('fix');
            } else {
                $('.js-mobile-nav').removeClass('fix');
            }
        });
    }




});
