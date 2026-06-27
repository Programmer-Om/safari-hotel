// 1. Initialize variables globally so the whole file can access them
let currentIndex = 0;
let track = null;
let totalSlides = 0;
let isScrollingLocked = false; 
let autoplayTimer = null; // ADDED: Stores the auto-scroll timer instance

// 2. Wait for the HTML elements to fully load in the browser
window.addEventListener("DOMContentLoaded", () => {
    track = document.getElementById("carouselTrack");
    if (track) {
        totalSlides = track.children.length;

        // Connected directly to the track wrapper
        track.addEventListener("wheel", (event) => {
            event.preventDefault();
            if (isScrollingLocked) return;
            isScrollingLocked = true;

            if (event.deltaY > 0) {
                window.nextSlide();
            } else {
                window.prevSlide();
            }

            setTimeout(() => {
                isScrollingLocked = false;
            }, 600);

        }, { passive: false });
    }

    // STEP 2a: Start the automatic scrolling as soon as the page loads
    window.startAutoplay();
});

// 3. Keep functions exposed directly to the global window so your HTML onClick works
window.updateCarousel = function() {
    if (!track) return;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

window.nextSlide = function() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Seamlessly loop back to Slide 1
    }
    window.updateCarousel();
    window.resetAutoplay(); // ADDED: Resets the timer when next button is clicked
}

window.prevSlide = function() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1; // Seamlessly loop back to Slide 3
    }
    window.updateCarousel();
    window.resetAutoplay(); // ADDED: Resets the timer when prev button is clicked
}

window.goToSlide = function(slideIndex) {
    currentIndex = slideIndex;
    window.updateCarousel();
    window.resetAutoplay(); // ADDED: Resets the timer when navbar links are clicked
}

// 4. ADDED: Autoplay mechanism functions
window.startAutoplay = function() {
    autoplayTimer = setInterval(() => {
        window.nextSlide();
    }, 5000); // 3000ms = 3 seconds
}

window.resetAutoplay = function() {
    clearInterval(autoplayTimer); // Clears the current 3-second countdown
    window.startAutoplay();       // Starts a brand new fresh 3-second countdown
}
