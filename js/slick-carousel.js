// slick-carousel.js

$(document).ready(function() {
    // Initialize Slick Carousel
    $('.slick-slider').slick({
        arrows: false,       // Disable arrows (unless you want them)
        loop: true,          // Enable looping
        dots: true,          // Show navigation dots
        autoplay: true,      // Enable autoplay
        fade: true,          // Use fade transition
        speed: 1000,         // Transition speed
        autoplaySpeed: 3000, // Delay between slides
        pauseOnHover: true,  // Pause on hover
        pauseOnFocus: true,  // Pause on focus (for accessibility)
    });

    // Optional: If you want to do any custom behavior when a slide changes
    $('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log('Before slide change: ', currentSlide, nextSlide);
    });
});
