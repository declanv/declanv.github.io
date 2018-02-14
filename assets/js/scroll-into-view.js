//http://tobiasahlin.com/moving-letters/# --> Out Now animation		
$(document).ready(function(){

	// http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
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
	        && ((rect.left + rect.width) <= windowWidth)
	        && ((rect.top + rect.height) <= windowHeight)
	    );

	}

	var scroll = window.requestAnimationFrame ||
            function(callback){window.setTimeout(callback, 1000/60)};
    var elementsToShow = document.querySelectorAll('.show-on-scroll');
	seenYet = false;

    function loop() {

	  elementsToShow.forEach(function (element) {
	  	console.log('seenYet: ', seenYet);
	    if (isElementInViewport(element)) {
	    	console.log('visible')
	      element.classList.add('visible');
	      if (seenYet == false) {
	      	element.classList.add('play');
	      	// seenYet = true;
	      } else {
	      	element.classList.remove('play');
	      }
	    } else {
	    	console.log('invisible')
	      element.classList.remove('visible');
     	  element.classList.remove('play');
     	  // seenYet = true;
	    }
	  });

	  scroll(loop);
	}

	loop();
});