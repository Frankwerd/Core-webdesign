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
