$(document).ready(function () {
    if ($('a[href="#"]').length > 0) {
        $(document).on('click', 'a[href="#"]', function () {
            return false;
        })
    }

    $('form').validate();
    
    /*
    $('.main-nav a').hover(function () {
        var id = $(this).data('id');
        $(id).addClass('active');
    }, function () {
        var id = $(this).data('id');
        $(id).removeClass('active');
    });
    */


});
