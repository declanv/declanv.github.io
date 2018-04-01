$( document ).ready(function() {
    console.log( "something!" );
    // Barba.Pjax.Dom.containerClass = 'body';


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

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
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

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
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

  Barba.Dispatcher.on('linkClicked', function() {

    debugger;
    console.log('link clicked: ', this);

  })


  var updateBodyLink = function (name) {

    $('body').removeClass();
    $('body').addClass(name);

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
    },
    onLeave: function() {

      console.log("alright, we are leaving the photo view")

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

        // The new Container is ready and attached to the DOM.
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
      console.log("alright, the art view enter has completed")


      initPhotoSwipeFromDOM('.projects-container');

    },
    onLeave: function() {

      console.log("alright, we are leaving the art view")

        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
    }
  });

Homepage.init();
Art.init();
Web.init();
Photo.init();
About.init();

Barba.Pjax.start();


});