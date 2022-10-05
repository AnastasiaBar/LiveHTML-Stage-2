let currentSlide, nextSlide, prevSlide,
    screenWidth = window.screen.width;

let cur, next, prev, next2, prev2;


$(document).ready(function() {

    $('.slider').slick({
        dots: false,
        infinite: false,
        speed: 0,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.slide').on('click', function() {
        if(screenWidth >= 480){
            if ($(this).hasClass('locked')) {
                $(this).toggleClass('locked');
            }
            else{
                $('.slide').removeClass('locked').removeClass('active')
                $(this).toggleClass('locked');
                currentSlide = $(this);
                activeSlide($(this));
            }
        }

        if(!$('.slide').hasClass('locked')){
            currentSlide = nextSlide = prevSlide = null;
        }

    });

});



$('body').on('click', '.slick-next', function () {
    $('.slick-prev').removeClass('disabled')

    if(!$(this).hasClass('disabled') && $('.slide').hasClass('locked')){
        cur.addClass('active')

        let testnext = $('.locked').next().next()

        testnext.nextAll().css('transform', ' translateX(-100%)')
        testnext.nextAll().css('transition', ' 200ms linear')

        testnext.css('transform', ' translateX(-100%)')
        testnext.css('transition', ' 200ms linear')

        $('.locked').next().css('transform', ' translateX(-100%)')
        $('.locked').next().css('transition', ' 200ms linear')


        setTimeout(function() {
            cur.swap(next)
            $('.slide').css('transform', '')
            $('.slide').css('transition', '')
            $('.slide.locked').css('transform', '')
            cur.removeClass('active')
        }, 250);


        activeSlide(cur);
    }

    if($(this).hasClass('slick-disabled')){
        $(this).addClass('disabled')
    }
})




$('body').on('click', '.slick-prev', function () {


    next.removeClass('slick-snext-two');

    if(!$(this).hasClass('disabled') && $('.slide').hasClass('locked')){
        cur.addClass('active-prev')

        let testnext = $('.locked').prev().prev()

        testnext.prevAll().css('transform', ' translateX(100%)')
        testnext.prevAll().css('transition', ' 200ms linear')

        testnext.css('transform', ' translateX(100%)')
        testnext.css('transition', ' 200ms linear')

        $('.locked').prev().css('transform', ' translateX(100%)')
        $('.locked').prev().css('transition', ' 200ms linear')


        setTimeout(function() {
            cur.swap(prev)
            $('.slide').css('transform', '')
            $('.slide').css('transition', '')
            $('.slide.locked').css('transform', '')
            cur.removeClass('active-prev')
        }, 250);


        activeSlide(cur);
    }

    if($(this).hasClass('slick-disabled')){
        $(this).addClass('disabled')
    }
})

jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};

$(window).resize(function() {
    screenWidth = window.screen.width;
    $('.slide').removeClass('locked')
    currentSlide = nextSlide = prevSlide = null;
});

function activeSlide(focus) {
    nextSlide =  focus.next();
    prevSlide =  focus.prev();


    cur =  focus,
    next = cur.next(),
    prev = cur.prev()
}




