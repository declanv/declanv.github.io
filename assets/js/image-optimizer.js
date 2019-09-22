var imageOptimizer = function(galleryContainer, masonryInstance) {
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
                    if (entry.isIntersecting && entry.intersectionRatio > 0) {
                        var lazyImage = entry.target;
                        var downloadingImage = new Image();
                        downloadingImage.onload = function () {
                            lazyImage.src = this.src;
                            if (masonryInstance !== null || typeof masonryInstance !== undefined) {
                                $(galleryContainer).masonry('layout');
                            }
                        }
                        downloadingImage.src = lazyImage.dataset.src;
                        $lazyImage = $(lazyImage);
                        console.log('lazy image: ', $lazyImage);
                        $lazyImage.parent().addClass('unblur');
                        $lazyImage.removeClass('blur');
                        lazyImage.classList.add('unblur');
                        lazyImageObserver.unobserve(lazyImage);
                    } else {
                        console.log('image is not yet in viewport...here is the entry: ', entry.target);
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