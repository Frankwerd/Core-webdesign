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
   Testimonial Carousel Logic
   ================================= */
document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button--right');
        const prevButton = document.querySelector('.carousel-button--left');
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Arrange the slides next to one another
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        let currentSlide = 0;

        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentSlide = targetIndex;
        };

        // When I click left, move slides to the left
        prevButton.addEventListener('click', e => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1; // Loop to the end
            }
            moveToSlide(prevIndex);
        });

        // When I click right, move slides to the right
        nextButton.addEventListener('click', e => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0; // Loop to the beginning
            }
            moveToSlide(nextIndex);
        });
    }
});
