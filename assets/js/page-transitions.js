$( document ).ready(function() {
      // Barba.Pjax.Dom.containerClass = 'body';
  mobileMenuOpen = false;
      // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  var clickOutsideClose = function() {

    var navWChildren = $('.nav-w-children');  
    var subpages = navWChildren.find('.subpages');

    $(document).on("click.document", function (e) {

      if ($(window).width() < 650 && mobileMenuOpen) {

        if (!navWChildren.is(e.target) // if the target of the click isn't the container...
                && navWChildren.has(e.target).length === 0
                  && !$('#menu').is(e.target)
                ) // ... nor a descendant of the container
        {


          console.log('inside the clickOutsideClose and here is the element: ', e.target);

          navWChildren.find('.page-link').removeClass('selected');
          $('.trigger.box').removeClass('subnav-open');

          subpages.addClass('closing-subnav');
          // subpages.removeClass('open');

          window.setTimeout(function() {subpages.removeClass('open')}, 100);

          // courseFinder.hide(
          //   function () {
          //     courseFinderBtn.find("#course-search-label").html("Show Course Finder");
          //     courseFinderBtnClick();
          //     courseFinderOpen = false;
          //     removeWindowListeners();
          //   }
          // );

        }

      }

    });

  }


  var mobileMenuClick = function() {

    console.log('mobile menu click triggered. Is the #menu around? ', $('#menu').length);

    $('#menu').on('click', function(){
      console.log("menu is clicked");
      $(this).addClass('touched');
      $('.site-header').toggleClass('open-mobile');
      console.log("here is the mobileMenuOpen value: ", mobileMenuOpen);
      if (!mobileMenuOpen) {
        mobileMenuOpen = true;

      } else {
        mobileMenuOpen = false;
      }
    });

    $('.subpages').siblings('.page-link').on('click', function(e) {

      e.preventDefault();

      $(this).addClass('selected');

      $('.trigger.box').addClass('subnav-open');

      $(this).siblings('.subpages').addClass('open');
      $(this).siblings('.subpages').removeClass('closing-subnav');
      // clickOutsideClose();

    })
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
        fadeHeader();
        // doSomething(last_known_scroll_position);
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
        console.log("you're at the bottom of the page");
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

    
  var transitionContainer = $("#transition-shape");  

  defaultTransitionColor = '#ffffff';
  currentTransitionColor = defaultTransitionColor;

  Barba.Dispatcher.on('linkClicked', function(el) {

    currentTransitionColor = defaultTransitionColor;

    console.log("here is the el being clicked: ", el);

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
      console.log('here is what the background color will look like: ', '#' + currentTransitionColor);
      transitionContainer.removeClass('transition-out');
      transitionContainer.addClass('transition-in');
      transitionContainer.css('background-color', '#' + currentTransitionColor);

      return $(this.oldContainer).animate({ opacity: 0 }, 800, function() {}).promise();

    },

    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;


      var $el = $(this.newContainer);

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

    console.log('in transition');

    return FadeTransition;

  };

  Barba.Dispatcher.on('newPageReady', function() {
    scrollToShow();
    fadeHeader();
    updateBodyLink(this.namespace);

    // mobileMenuClick();
    // $('.grid').masonry({
    //   // itemSelector: '.grid-item',
    //   // columnWidth: '.grid-sizer',
    //   // columnWidth: 300,
    //   percentPosition: true,
    //   // fitWidth: true,
    //   gutter: 30
    // });
    // initPhotoSwipeFromDOM('.projects-container');
  })


  var updateBodyLink = function (name) {

    $('body').removeClass();
    $('body').addClass(name);

    console.log("body link updated to: ", name);

  }

  var Homepage = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function() {

      console.log("alright, the homepage view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function(namespace) {
        // The Transition has just finished.
      console.log("alright, the homepage view enter has completed. here is the namespace: ", this.namespace);
      mobileMenuClick();

    },
    onLeave: function() {

      console.log("alright, we are leaving the homepage view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function() {

      console.log("alright, the about view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the about view enter has completed")
      mobileMenuClick();

    },
    onLeave: function() {

      console.log("alright, we are leaving the about view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Web = Barba.BaseView.extend({
    namespace: 'web',
    onEnter: function() {

      console.log("alright, the web view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the web view enter has completed")
      mobileMenuClick();

    },
    onLeave: function() {

      console.log("alright, we are leaving the web view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Photo = Barba.BaseView.extend({
    namespace: 'photo',
    onEnter: function() {

      console.log("alright, the photo view is ready")
      updateBodyLink(this.namespace);

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the photo view enter has completed")
      mobileMenuClick();

    },
    onLeave: function() {

      console.log("alright, we are leaving the photo view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Holga = Barba.BaseView.extend({
    namespace: 'holga',
    onEnter: function() {

      console.log("alright, the holga view is ready")
      updateBodyLink(this.namespace);

        $('.grid').css("background-color: black;");


        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the photo view enter has completed")
      mobileMenuClick();

        //Begin loading animation:


        $('.grid').imagesLoaded().done( function( instance ) {
            console.log('all images successfully loaded');

            $('.grid').addClass("fade-in-grid");

        })
            .always( function( instance ) {
                console.log('all images loaded');

                $('.grid').masonry({
                    // itemSelector: '.grid-item',
                    // columnWidth: '.grid-sizer',
                    // columnWidth: 300,
                    percentPosition: true,
                    // fitWidth: true,
                    gutter: 30
                });

                imageOptimizer();
                initPhotoSwipeFromDOM('.projects-container');

            })

            .fail( function() {
                console.log('all images loaded, at least one is broken');
            })
            .progress( function( instance, image ) {
                var result = image.isLoaded ? 'loaded' : 'broken';
                console.log( 'image is ' + result + ' for ' + image.img.src );

            });

    },
    onLeave: function() {

      console.log("alright, we are leaving the holga view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Art = Barba.BaseView.extend({
    namespace: 'art',
    onEnter: function() {

      console.log("alright, the art view is ready")
        updateBodyLink(this.namespace);

    console.log('here is what the body currently looks like: ', $('body'));
      // updateBodyLink(this.namespace);
      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the art view enter has completed")
      console.log("here is the namespace", this.namespace);

      // initPhotoSwipeFromDOM('.projects-container');

      // For some reason, just the art namespace needs to be added in onEnterCompleted 
      // mobileMenuClick();

        // initPhotoSwipeFromDOM('.projects-container');


        // $('.grid').masonry({
        //     // itemSelector: '.grid-item',
        //     // columnWidth: '.grid-sizer',
        //     // columnWidth: 300,
        //     percentPosition: true,
        //     // fitWidth: true,
        //     gutter: 30
        // });

        $('.grid').imagesLoaded().done( function( instance ) {
            console.log('all images successfully loaded');

        })
        .always( function( instance ) {
            console.log('all images loaded');
            initPhotoSwipeFromDOM('.projects-container');


            $('.grid').masonry({
                // itemSelector: '.grid-item',
                // columnWidth: '.grid-sizer',
                // columnWidth: 300,
                percentPosition: true,
                // fitWidth: true,
                gutter: 30
            });
        })

        .fail( function() {
            console.log('all images loaded, at least one is broken');
        })
        .progress( function( instance, image ) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );

        });

      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });
      // initPhotoSwipeFromDOM('.projects-container');
      mobileMenuClick();
      

    },
    onLeave: function() {

      console.log("alright, we are leaving the art view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var Illustration = Barba.BaseView.extend({
    namespace: 'illustration',
    onEnter: function() {

      console.log("alright, the illustration view is ready")
        updateBodyLink(this.namespace);

    console.log('here is what the body currently looks like: ', $('body'));
      // updateBodyLink(this.namespace);
      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the illustration view enter has completed")
      console.log("here is the namespace", this.namespace);

      // initPhotoSwipeFromDOM('.projects-container');

      // For some reason, just the art namespace needs to be added in onEnterCompleted
      // mobileMenuClick();

        // initPhotoSwipeFromDOM('.projects-container');


        // $('.grid').masonry({
        //     // itemSelector: '.grid-item',
        //     // columnWidth: '.grid-sizer',
        //     // columnWidth: 300,
        //     percentPosition: true,
        //     // fitWidth: true,
        //     gutter: 30
        // });

        $('.grid').imagesLoaded().done( function( instance ) {
            console.log('all images successfully loaded');

        })
        .always( function( instance ) {
            console.log('all images loaded');
            initPhotoSwipeFromDOM('.projects-container');


            $('.grid').masonry({
                // itemSelector: '.grid-item',
                // columnWidth: '.grid-sizer',
                // columnWidth: 300,
                percentPosition: true,
                // fitWidth: true,
                gutter: 30
            });
        })

        .fail( function() {
            console.log('all images loaded, at least one is broken');
        })
        .progress( function( instance, image ) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );

        });

      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });
      // initPhotoSwipeFromDOM('.projects-container');
      mobileMenuClick();


    },
    onLeave: function() {

      console.log("alright, we are leaving the illustration view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

  var FigureDrawings = Barba.BaseView.extend({
    namespace: 'figure drawings',
    onEnter: function() {

      console.log("alright, the figureDrawings view is ready")
        updateBodyLink(this.namespace);

    console.log('here is what the body currently looks like: ', $('body'));
      // updateBodyLink(this.namespace);
      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the figureDrawings view enter has completed")
      console.log("here is the namespace", this.namespace);

      // initPhotoSwipeFromDOM('.projects-container');

      // For some reason, just the art namespace needs to be added in onEnterCompleted
      // mobileMenuClick();

        // initPhotoSwipeFromDOM('.projects-container');


        // $('.grid').masonry({
        //     // itemSelector: '.grid-item',
        //     // columnWidth: '.grid-sizer',
        //     // columnWidth: 300,
        //     percentPosition: true,
        //     // fitWidth: true,
        //     gutter: 30
        // });

        $('.grid').imagesLoaded().done( function( instance ) {
            console.log('all images successfully loaded');

        })
        .always( function( instance ) {
            console.log('all images loaded');
            initPhotoSwipeFromDOM('.projects-container');


            $('.grid').masonry({
                // itemSelector: '.grid-item',
                // columnWidth: '.grid-sizer',
                // columnWidth: 300,
                percentPosition: true,
                // fitWidth: true,
                gutter: 30
            });
        })

        .fail( function() {
            console.log('all images loaded, at least one is broken');
        })
        .progress( function( instance, image ) {
            var result = image.isLoaded ? 'loaded' : 'broken';
            console.log( 'image is ' + result + ' for ' + image.img.src );

        });

      // $('.grid').masonry({
      //   // itemSelector: '.grid-item',
      //   // columnWidth: '.grid-sizer',
      //   // columnWidth: 300,
      //   percentPosition: true,
      //   // fitWidth: true,
      //   gutter: 30
      // });
      // initPhotoSwipeFromDOM('.projects-container');
      mobileMenuClick();


    },
    onLeave: function() {

      console.log("alright, we are leaving the figureDrawings view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

Homepage.init();
Art.init();
Illustration.init();
FigureDrawings.init();
Web.init();
Photo.init();
Holga.init();
About.init();

Barba.Pjax.start();
// mobileMenuClick();


});