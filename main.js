document.addEventListener("DOMContentLoaded", function() {
    // Function to find comment nodes
    function findComment(commentText) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() === commentText) {
                return node;
            }
        }
        return null;
    }

    // Fetch and insert the header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for header.html');
            }
            return response.text();
        })
        .then(data => {
            const placeholder = findComment('HEADER-PLACEHOLDER');
            if (placeholder) {
                const range = document.createRange();
                range.selectNode(placeholder);
                const documentFragment = range.createContextualFragment(data);
                placeholder.parentNode.replaceChild(documentFragment, placeholder);
            } else {
                console.error('Header placeholder not found');
            }
        })
        .catch(error => {
            console.error('Failed to fetch header:', error);
        });

    // Fetch and insert the footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for footer.html');
            }
            return response.text();
        })
        .then(data => {
            const placeholder = findComment('FOOTER-PLACEHOLDER');
            if (placeholder) {
                const range = document.createRange();
                range.selectNode(placeholder);
                const documentFragment = range.createContextualFragment(data);
                placeholder.parentNode.replaceChild(documentFragment, placeholder);
            } else {
                console.error('Footer placeholder not found');
            }
        })
        .catch(error => {
            console.error('Failed to fetch footer:', error);
        });
});

/* =================================
   Testimonial Carousel Logic (V2)
   ================================= */
document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const nav = document.querySelector('.carousel-nav');
    const dots = Array.from(nav.children);
    let currentSlide = 0;

    const updateSlidePositions = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('current-slide', 'prev-slide', 'next-slide');

            if (index === currentSlide) {
                slide.classList.add('current-slide');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev-slide');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next-slide');
            }
        });

        // Update navigation dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('current-slide', index === currentSlide);
        });
    };

    const moveToSlide = (targetIndex) => {
        // Stop and reset all videos before moving
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.muted = true; // Re-mute videos when not active
            }
        });

        currentSlide = targetIndex;
        updateSlidePositions();
    };

    // Event listeners for arrow buttons
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    // Event listener for navigation dots
    nav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(targetIndex);
    });

    // Event listeners for video playback with SOUND
    slides.forEach((slide, index) => {
        const video = slide.querySelector('.testimonial-video');
        if (video) {
            slide.addEventListener('mouseover', () => {
                if (slide.classList.contains('current-slide')) {
                    video.muted = false; // Unmute the active video on hover
                    video.play().catch(e => console.log("Video play interrupted."));
                }
            });
            slide.addEventListener('mouseout', () => {
                video.pause();
                video.muted = true; // Re-mute when mouse leaves
            });
        }
    });

    // Initialize the carousel
    updateSlidePositions();
});
