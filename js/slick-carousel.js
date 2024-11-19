// slick-carousel.js

$(document).ready(function(){
    $('.slick-slider').slick({
        arrows: false,       // Show navigation arrows
        dots: true,         // Show navigation dots
        autoplay: true,     // Enable autoplay
        autoplaySpeed: 3000, // 3 seconds between slides
        slidesToShow: 1,    // Show one slide at a time
        slidesToScroll: 1,  // Scroll one slide at a time
        loop: true,         // Enable infinite loop
        speed: 1000,        // 1-second transition speed
        pauseOnHover: true, // Pause on hover
        pauseOnFocus: true  // Pause on focus
    });




    // Optional: If you want to do any custom behavior when a slide changes
    $('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log('Before slide change: ', currentSlide, nextSlide);
    });
});
