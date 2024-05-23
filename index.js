document.addEventListener('DOMContentLoaded', () => {
    // Regular expression to match the class pattern and capture the URL
    const bgImageRegex = /bg-img-url\(([^)]+)\)/;

    // Select all elements within the body that potentially have the class pattern
    const potentialMatches = document.body.querySelectorAll('[class*="bg-img-url"]');

    potentialMatches.forEach(element => {
        // Check each class to see if it matches the pattern
        for (const cls of element.classList) {
            const match = cls.match(bgImageRegex);
            if (match) {
                const imageUrl = match[1]; // The captured URL

                // Preload the image
                const img = new Image();
                img.src = imageUrl;

                // Event listener for when the image loads successfully
                img.onload = () => {
                    element.style.backgroundImage = `url(${imageUrl})`;
                    console.log(`Background image loaded successfully for element:`, element);
                };

                // Event listener for when the image fails to load
                img.onerror = () => {
                    console.error(`Failed to load background image: ${imageUrl} for element:`, element);
                    // Handle the error (e.g., set a fallback background image or remove the background)
                    // element.style.backgroundImage = 'url(fallback-image-url)';
                };

                // Once we've found a matching class, we don't need to check the other classes
                break;
            }
        }
    });
});
