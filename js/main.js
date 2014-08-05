$(function() {

  $(".name-wrap").load("name_svg.html", function(){
    var namePaths = document.querySelectorAll('.name-path');

    $(namePaths).each(function(nPath){

      var length = paths[nPath].getTotalLength();

      paths[nPath].style.transition = paths[nPath].style.WebkitTransition =
      'none';

      paths[nPath].style.strokeDasharray = length + ' ' + length;
      paths[nPath].style.strokeDashoffset = length;

      paths[nPath].getBoundingClientRect();

      paths[nPath].style.transition = paths[nPath].style.WebkitTransition =
      'stroke-dashoffset 5s ease-in-out';

      paths[nPath].style.strokeDashoffset = '0';

    });

  });

  $( ".hi-intro-wrap" ).load( "desktop_svg.html", function() {

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
