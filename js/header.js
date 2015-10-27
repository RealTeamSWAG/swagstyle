$(window).load(function() {
    $(window).scroll(header);
});

var header = function() {
    
    if($(document).scrollTop() >= $(window).height()) {
        $('nav').css({'position': 'fixed', 'background-color': 'white'});
        $('.nav').css({'color': 'black'});
    } else {
        $('hero-big').css({'margin-top': '0'});
        $('nav').css({'position': 'relative', 'background-color': 'transparent'});
        $('.nav').css({'color': 'white'});
    }
}