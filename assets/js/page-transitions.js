$( document ).ready(function() {
	  // Barba.Pjax.Dom.containerClass = 'body';

  var closeSubPageGroups = function() {

	  var navWChildren = $('.subpages').prev('.page-link');
	  var subpages = navWChildren.siblings('.subpages');

	  navWChildren.find('.page-link').removeClass('selected');
	  $('.trigger.box').removeClass('subnav-open');

	  // subpages.addClass('closing-subnav');
	  subpages.removeClass('open');
  }

  mobileMenuOpen = false;
	  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  var clickOutsideClose = function() {

	$(document).on("click.document", function (e) {

	  if ($(window).width() <= 600 && mobileMenuOpen) {
	    var navWChildren = $('.subpages').prev('.page-link');

		if (!navWChildren.is(e.target) // if the target of the click isn't the container...
				&& navWChildren.has(e.target).length === 0
				  && !$('#menu').is(e.target)
				) // ... nor a descendant of the container
		{


		  // console.log('inside the clickOutsideClose and here is the element: ', e.target);

			closeSubPageGroups();

		  // window.setTimeout(function() {subpages.removeClass('open')}, 100);

		}

	  }

	});

  }

	var closeMobileMenu = function() {
		mobileMenuOpen = false;
		$('.site-header').removeClass('open-mobile');
		closeSubPageGroups();
		// console.log('closing mobile menu.');
	}

  var openMobileMenu = function() {
	  mobileMenuOpen = true;
	  $('.site-header').addClass('open-mobile');
  }

  var mobileMenuClick = function() {

	// console.log('mobile menu click triggered. Is the #menu around? ', $('#menu').length);
	$('#menu').off('click');

	$('#menu').on('click', function(){
	  $(this).addClass('touched');
	  if (!mobileMenuOpen) {
		  openMobileMenu();
	  } else {
		  closeMobileMenu();
	  }
	});

	var mobileSubpageClick = function($link) {
		$link.addClass('selected');
		$('.trigger.box').addClass('subnav-open');
		var currentSubPageSet = $link.siblings('.subpages');
		$('.subpages').not(currentSubPageSet).removeClass('open');
		// I will likely need to add another class here which will enable a reverse transition (like a fadeout)
		// $('.subpages').addClass('closing-subnav');
		currentSubPageSet.addClass('open');
		// currentSubPageSet.removeClass('closing-subnav');
		clickOutsideClose();
  	}

	$('.page-link, .site-title').on('click', function(e){
		if (window.innerWidth < 600 && $(this).siblings('.subpages').length > 0) {
			e.preventDefault();
			e.stopImmediatePropagation();
			mobileSubpageClick($(this));
		} else {
			closeMobileMenu();
		}
	});

	// $('.subpages').siblings('.page-link').on('click', function(e) {
	//
	//   e.preventDefault();
	//
	//   $(this).addClass('selected');
	//
	//   $('.trigger.box').addClass('subnav-open');
	//
	//   $(this).siblings('.subpages').addClass('open');
	//   $(this).siblings('.subpages').removeClass('closing-subnav');
	//   clickOutsideClose();
	//
	// })
  }



  function isElementInViewport (el) 
  {
	  //special bonus for those using jQuery
	  if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

	  var rect = el.getBoundingClientRect();
	  var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	  var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

	  return (
			 (rect.left >= 0)
		  && (rect.top >= 0)
		  && ((rect.left + rect.width/2.75) <= windowWidth)
		  && ((rect.top + rect.height/2.75) <= windowHeight)
	  );

  }


  var last_known_scroll_position = 0;
  var ticking = false;

  window.addEventListener('scroll', function(e) {

	last_known_scroll_position = window.scrollY;

	if (!ticking) {

	  window.requestAnimationFrame(function() {

		scrollToShow();
	  	// console.log('scroll check happening')
		fadeHeader();
		ticking = false;
	  });

	  ticking = true;

	}

  });



  var scroll = window.requestAnimationFrame ||
			function(callback){window.setTimeout(callback, 1000/60)};

  // seenYet = false;

  function scrollToShow() {

	var elementsToShow = document.querySelectorAll('.show-on-scroll');

	elementsToShow.forEach(function (element) {
	  // console.log('seenYet: ', seenYet);

	  // elementSeenYet  = $(element).data('seen-yet');
	  // console.log('elementSeenYet: ', elementSeenYet);
	  if (isElementInViewport(element)) {
		// console.log('visible')

		element.classList.add('visible');
		element.classList.add('play');

		// if ($(element).data('seen-yet') == false) {
		//  console.log("hey, this thing hasn't been seen yet")
		//  element.classList.add('play');
		//  seenYet = true;
		//  $(element).data('seen-yet', true);

		// } else {
		//  element.classList.remove('play');
		// }
	  } else {
		// console.log('invisible')
		// element.classList.remove('visible');
		// element.classList.remove('play');
		// seenYet = true;
	  }
	});

	// scroll(scrollToShow);

  }

  // scrollToShow();

  function fadeHeader() {


	if ($(window).scrollTop() > $('.site-header').outerHeight() * 2) {


	  $('header').addClass('scroll-away');
	  $('header').removeClass('scroll-in');
	  $('header').removeClass('initial');
	  // console.log('we are scrolling out. Here is the window scrollTop: ',
	  //   $(window).scrollTop(),
	  //   ' and here is the siteheader outerHeight * 2: ',
	  //   $('.site-header').outerHeight() * 2
	  //   );

	} else if ($(window).scrollTop() <= $('.site-header').outerHeight() * 2 && !$('.siteheader').hasClass('initial')) {

	  // console.log('we are scrolling in');
	  $('header').removeClass('scroll-away');
	  $('header').addClass('scroll-in');

	};

	if ($('.page-nav.next').length && $(window).scrollTop() + $(window).height() > $(document).height() - 300) {
		$('.page-nav.next').addClass('open');
	} else if ($('.page-nav.next').length && $(window).scrollTop() + $(window).height() < $(document).height() - 300) {
		$('.page-nav.next').removeClass('open');
	};

	// else if ($('.page-nav.next').length && $(window).scrollTop() >= $('.page-nav.next').outerHeight() * 2 && !$('.page-nav.next').hasClass('initial')) {

	//   console.log("scrolled near the bottom");
	//   $('.page-nav.next').addClass('.scroll-in');

	// };

	  // scroll(fadeHeader);

	  // console.log("fading in header");

  }

  // fadeHeader();


  var initPhotoSwipeFromDOM = function(gallerySelector) {

	// console.log('init photo swipe is actually happening')

	// parse slide data (url, title, size ...) from DOM elements
	// (children of gallerySelector)
	var parseThumbnailElements = function(el) {
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;

		for(var i = 0; i < numNodes; i++) {

			figureEl = thumbElements[i]; // <figure> element

			// console.log('here is the figureEl', figureEl);

			// include only element nodes
			if(figureEl.nodeType !== 1) {
				continue;
			}

			linkEl = figureEl.children[0]; // <a> element

			// console.log('here is the linkEl: ', linkEl);

			size = linkEl.getAttribute('data-size').split('x');

			// create slide object
			item = {
				src: linkEl.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10)
			};



			if(figureEl.children.length > 1) {
				// <figcaption> content
				item.title = figureEl.children[1].innerHTML;
			}

			if(linkEl.children.length > 0) {
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.children[0].getAttribute('src');
			}

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn) {
		return el && ( fn(el) ? el : closest(el.parentNode, fn) );
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function(e) {

		// console.log('in onthumbnails click');
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function(el) {
			// add check to see whether the thing clicked was a project page link
			// console.log('here is the element in clickedListItem function: ', el, "and here is the eTarget: ", eTarget);
			return (el.tagName && el.tagName.toUpperCase() === 'FIGURE' && eTarget.className !== "project-link-text");
		});

		// console.log("here is the clickedListItem: ", clickedListItem);

		if(!clickedListItem) {
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++) {
			if(childNodes[i].nodeType !== 1) {
				continue;
			}

			if(childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}



		if(index >= 0) {
			// open PhotoSwipe if valid index found
			console.log('open photoswipe bc valid index found');

			openPhotoSwipe( index, clickedGallery );
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function() {
		var hash = window.location.hash.substring(1),
		params = {};

		if(hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if(!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');
			if(pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}

		if(params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		return params;
	};

	var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {

		console.log("open photoswipe is actually happening");
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items;

		items = parseThumbnailElements(galleryElement);

		// define options (if needed)
		options = {

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			getThumbBoundsFn: function(index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();

				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			}

		};

		// PhotoSwipe opened from URL
		if(fromURL) {
			if(options.galleryPIDs) {
				// parse real index when custom PIDs are used
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for(var j = 0; j < items.length; j++) {
					if(items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {

				// in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}

		// exit if index not found
		if( isNaN(options.index) ) {
			return;
		}

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		console.log("photoswipe, here is the element ", pswpElement, "here are the items: ", items, "here are the options: ", options);


		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		console.log('here is the gallery: ', gallery);
		gallery.init();
	};

	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll( gallerySelector );

	for(var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute('data-pswp-uid', i+1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if(hashData.pid && hashData.gid) {
		openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
	}
  };

  var transitionContainer = $("#transition-shape");  

  defaultTransitionColor = '#ffffff';
  currentTransitionColor = defaultTransitionColor;

  Barba.Dispatcher.on('linkClicked', function(el) {

	currentTransitionColor = defaultTransitionColor;

	if (el.dataset.hex !== null && el.dataset.hex !== undefined) {
	  currentTransitionColor = el.dataset.hex;
	} else {
	  currentTransitionColor = defaultTransitionColor;
	}

  });

  var FadeTransition = Barba.BaseTransition.extend({
	start: function() {
	  /**
	   * This function is automatically called as soon the Transition starts
	   * this.newContainerLoading is a Promise for the loading of the new container
	   * (Barba.js also comes with an handy Promise polyfill!)
	   */

	  // As soon the loading is finished and the old page is faded out, let's fade the new page
	  Promise
		.all([this.newContainerLoading, this.fadeOut()])
		.then(this.fadeIn.bind(this));
	},

	fadeOut: function() {
	  /**
	   * this.oldContainer is the HTMLElement of the old Container
	   */
	  // $('body').removeClass('transition');
	  // console.log('here is what the background color will look like: ', '#' + currentTransitionColor);
	  transitionContainer.removeClass('transition-out');
	  transitionContainer.addClass('transition-in');
	  transitionContainer.css('background-color', '#' + currentTransitionColor);

	  return $(this.oldContainer).animate({ opacity: 0 }, 800, function() {}).promise().then(
	  	function() {
			removePreviousBodyClass()
		}
	  );

	},

	fadeIn: function() {
	  /**
	   * this.newContainer is the HTMLElement of the new Container
	   * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	   * Please note, newContainer is available just after newContainerLoading is resolved!
	   */

	  var _this = this;


	  var $el = $(this.newContainer);
	  addCurrentBodyClass();
	  $(this.oldContainer).hide();

	  // $('header').addClass('initial');
	  $(window).scrollTop(0);

	  fadeHeader();
	  // mobileMenuClick();

	  // $('body').addClass('transition');



	  // transitionContainer.show();
	  transitionContainer.removeClass('transition-in');
	  transitionContainer.addClass('transition-out');

	  $el.css({
		visibility : 'visible',
		opacity : 0
	  });
	  // transitionContainer.addClass('.transition-in');

	  $el.animate({ opacity: 1 }, 800, function() {
		/**
		 * Do not forget to call .done() as soon your transition is finished!
		 * .done() will automatically remove from the DOM the old Container
		 */


		_this.done(function() {
		});
	  });

	  // the view could contain the hex value we'll use for the background color of the transition container.
	  //  Then we'll animate it over, using css. Since the animation will be the same each time, hopefully we can make it work with css
	  //  and avoid needing to use js to manipulate an svg or something...

	},
	finish: function() {

	}
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function() {
	/**
	 * Here you can use your own logic!
	 * For example you can use different Transition based on the current page or link...
	 */

	return FadeTransition;

  };

  // Barba.Dispatcher.on('newPageReady', function() {
  //   scrollToShow();
  //   fadeHeader();
  //   updateBodyLink(this.namespace);
  //
  //   console.log('a new page is ready');
  //
  //   // mobileMenuClick();
  //   // $('.grid').masonry({
  //   //   // itemSelector: '.grid-item',
  //   //   // columnWidth: '.grid-sizer',
  //   //   // columnWidth: 300,
  //   //   percentPosition: true,
  //   //   // fitWidth: true,
  //   //   gutter: 30
  //   // });
  //   // initPhotoSwipeFromDOM('.projects-container');
  // });


	// I'll need a function that fades out the content section before I futz with the body class
	var fadeOutContent = function() {

	}

	previousBodyClass = '';
    var removePreviousBodyClass = function () {
    	// console.log('here is the previous body class: ', previousBodyClass);
        $('body').removeClass(previousBodyClass);
    }

    var addCurrentBodyClass = function () {
        $('body').addClass(currentBodyClass);
    }

  var setupGalleryView = function(parent, viewName, notGridLayout) {
	  var camelCasedView = viewName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	  var nameSpace = viewName.replace(/-/g, ' ');

	  var viewName = Barba.BaseView.extend({
		  namespace: nameSpace,
		  onEnter: function() {
			  // The new Container is ready and attached to the DOM.
			  currentBodyClass = parent;
			  addCurrentBodyClass();
		  },
		  onEnterCompleted: function() {
			  // The Transition has just finished.
			  mobileMenuClick();

			  $('.grid').imagesLoaded().done( function( instance ) {
				  // console.log('all images successfully loaded');

				  $('.grid').addClass("fade-in-grid");

			  })
			  .always( function( instance ) {
				  // console.log('all images loaded');

				  // $('.grid').masonry({
					//   // itemSelector: '.grid-item',
					//   // columnWidth: '.grid-sizer',
					//   // columnWidth: 300,
					//   percentPosition: true,
					//   fitWidth: true,
					//   gutter: 0
				  // });
				  if (notGridLayout == false) {
					  var macyInstance = Macy({
						  // See below for all available options.
						  container: '.grid',
						  trueOrder: false,
						  waitForImages: true,
						  margin: 0,
						  columns: 2,
						  // breakAt: {
						  //   1200: 5,
						  //   940: 3,
						  //   520: 2,
						  //   400: 1
						  // }
					  });
				  }

				  imageOptimizer();
				  initPhotoSwipeFromDOM('.projects-container');

			  })

			  .fail( function() {
				  // console.log('all images loaded, at least one is broken');
			  })
			  .progress( function( instance, image ) {
				  var result = image.isLoaded ? 'loaded' : 'broken';
				  // console.log( 'image is ' + result + ' for ' + image.img.src );

			  });

		  },
		  onLeave: function() {
			  previousBodyClass = parent;
			  // A new Transition toward a new page has just started.
		  },
		  onLeaveCompleted: function() {
			  // The Container has just been removed from the DOM.
		  }
	  })

	  viewName.init();
  }

var galleryViews  = [
	{
	  'parent':'home',
	  'namespace':'home',
	  'notGridLayout':true
	},
	{
	  'parent':'web',
	  'namespace':'web',
	  'notGridLayout':true
	},
	{
		'parent':'art',
		'namespace':'art'
	},
	{
		'parent':'art',
		'namespace':'figure-drawings'
	},
	{
		'parent':'art',
		'namespace':'illustration'
	},
	{
		'parent':'photo',
		'namespace':'photo'
	},
	{
		'parent':'photo',
		'namespace':'holga'
	},
	{
		'parent':'photo',
		'namespace':'editorial'
	},
	{
		'parent':'photo',
		'namespace':'other'
	},
	{
		'parent':'about',
		'namespace':'about',
		'notGridLayout':true
	}
];

$.each(galleryViews, function(i, galleryView){
	if (typeof galleryView.notGridLayout === 'undefined') {
		var notGridLayout = false;
	} else {
		var notGridLayout = true;
	}
	setupGalleryView(galleryView.parent, galleryView.namespace, notGridLayout);
//     Home.init();
//     Art.init();
// // Illustration.init();
// // FigureDrawings.init();
//     Web.init();
//     Photo.init();
// // Holga.init();
//     About.init();
})



Barba.Pjax.start();
// mobileMenuClick();


});