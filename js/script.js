function marginCotainer() {
    var selector = $('.header .container-fluid'),
        mar = parseInt(selector.css('marginLeft')) + parseInt(selector.css('paddingLeft'));
    if (mar < 41) mar = 0;
    $('.map-wrap .contact-block').css('right', mar + 'px');
}

function addModal(content, id) {
    if (!id) id = 'ajaxmodal';
    if (!content) content = '';
    var tplModal = '<div class="modal fade" tabindex="-1" role="dialog" id="' + id + '">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="icon-close"></span></button>' +
        '<div class="modal-body">' +
        content +
        '</div>' +
        ' </div>' +
        '</div>' +
        '</div>';
    $('body').append(tplModal);
}


$(document).ready(function () {
    marginCotainer();
    $(window).resize(function () {
        marginCotainer();
    });


    if ($('.shema-item').length > 0) {
        var shemaModal = 'shema-modal';
        addModal('', shemaModal);
        $(document).on('click', '.js-shema', function () {
            var id = $(this).data('id'),
                content = '<div class="shema-item">' + $('#' + id).html() + '</div>';
            $('#' + shemaModal + ' .modal-body').html(content);
            $('#' + shemaModal).modal('show');
        });
    }

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


    $(document).on('click', '.main-nav > ul > li > a', function(){
        $(this).parent().toggleClass('activen');
    });



});
