let currentSlide, nextSlide, prevSlide,
    screenWidth = window.screen.width;

$(document).ready(function() {

    $('.slider').slick({
        dots: false,
        infinite: false,
        speed: 300,
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
                $('.slide').removeClass('locked')
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
        let next = nextSlide.text();
        let current = currentSlide.text();

        currentSlide.text(next);
        currentSlide.toggleClass('locked');

        nextSlide.text(current);
        nextSlide.toggleClass('locked');

        currentSlide = nextSlide;
        activeSlide(currentSlide);
    }

    if($(this).hasClass('slick-disabled')){
        $(this).addClass('disabled')
    }
})

$('body').on('click', '.slick-prev', function () {
    $('.slick-next').removeClass('disabled')

    if(!$(this).hasClass('disabled') && $('.slide').hasClass('locked')){
        let prev = prevSlide.text();
        let current = currentSlide.text();

        currentSlide.text(prev);
        currentSlide.toggleClass('locked');

        prevSlide.text(current);
        prevSlide.toggleClass('locked');

        currentSlide = prevSlide;
        activeSlide(currentSlide);
    }

    if($(this).hasClass('slick-disabled')){
        $(this).addClass('disabled')
    }
})


$(window).resize(function() {
    screenWidth = window.screen.width;
    $('.slide').removeClass('locked')
    currentSlide = nextSlide = prevSlide = null;
});

function activeSlide(focus) {
    nextSlide = focus.next();
    prevSlide = focus.prev();
}
