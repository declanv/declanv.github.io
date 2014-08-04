$(function() {

  $( ".hi-intro-wrap" ).load( "svg_real.html", function() {

    var paths = document.querySelectorAll('.squiggle-animated');

    $(paths).each(function(path){

      var length = paths[path].getTotalLength();

      paths[path].style.transition = paths[path].style.WebkitTransition =
      'none';

      paths[path].style.strokeDasharray = length + ' ' + length;
      paths[path].style.strokeDashoffset = length;

      paths[path].getBoundingClientRect();

      paths[path].style.transition = paths[path].style.WebkitTransition =
      'stroke-dashoffset 5s ease-in-out';

      paths[path].style.strokeDashoffset = '0';

    });

  });

});
