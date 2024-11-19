// slick-carousel.js

$(document).ready(function() {
    // Initialize Slick Carousel
    $('.slick-slider').slick({
        arrows: true,        // Enable arrows for manual navigation
        loop: true,          // Enable infinite loop
        dots: false,         // Disable dots (optional)
        autoplay: true,      // Enable autoplay
        slidesToShow: 1,     // Show one slide at a time
        slidesToScroll: 1,   // Scroll one slide at a time
        autoplaySpeed: 3000, // Delay between slides
        speed: 1000,         // Transition speed
        easing: 'ease',      // Easing effect (optional)
        pauseOnHover: true,  // Pause on hover
        pauseOnFocus: true,  // Pause on focus
    });

    // Optional: If you want to do any custom behavior when a slide changes
    $('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log('Before slide change: ', currentSlide, nextSlide);
    });
});
