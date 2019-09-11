var imageOptimizer = function(galleryContainer, macyInstance) {
    if (typeof galleryContainer === undefined || galleryContainer === null) {
        galleryContainer = '.grid';
    }
    var container = document.querySelector(galleryContainer);
    var lazyImages = [].slice.call(container.querySelectorAll('img.lazy'));
    // console.log("here are the lazyImages: ", lazyImages);
    if ('IntersectionObserver' in window) {
        // console.log('the intersection observer check works');
        config = {
            // If the image gets within 250px of the browser's viewport,
            // start the download:
            rootMargin: '250px 0px',
        };
        var lazyImageObserver = new IntersectionObserver(
            function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        $lazyImage = $(lazyImage);
                        $lazyImage.parent().addClass('unblur');
                        $lazyImage.removeClass('blur');
                        // lazyImage.classList.add('unblur');
                        lazyImageObserver.unobserve(lazyImage);
                        console.log('here is the galleryCOntainer: ', galleryContainer);
                        if (macyInstance != null || typeof macyInstance != 'undefined') {
                            macyInstance.recalculate();
                        }
                    }
                });
            }, config);
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // For browsers that don't support IntersectionObserver yet,
        // load all the images now:
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
        });
    }
}

// imageOptimizer();