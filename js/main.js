$(function() {

  $(".name-wrap").load("name_svg.html", function(){
    var namePaths = document.querySelectorAll('.name-path');
    console.log("name loaded, and here are the namepaths", namePaths);
    $(namePaths).each(function(nPath){

      var length = namePaths[nPath].getTotalLength();

      namePaths[nPath].style.transition = namePaths[nPath].style.WebkitTransition =
      'none';

      namePaths[nPath].style.strokeDasharray = length + ' ' + length;
      namePaths[nPath].style.strokeDashoffset = length;

      namePaths[nPath].getBoundingClientRect();

      namePaths[nPath].style.transition = namePaths[nPath].style.WebkitTransition =
      'stroke-dashoffset 10s ease-in-out';

      namePaths[nPath].style.strokeDashoffset = '0';

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
