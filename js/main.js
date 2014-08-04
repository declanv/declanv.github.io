$(function() {

  // skrollr.init({
  //   forceHeight: false
  // });

  // $("#hi-intro-wrap").load("/svg_real.html" [, data ]
  //       [, complete(responseText, textStatus, XMLHttpRequest) ]);
  // $( window ).load(function() {
  //   $(".illustration").on("click", function(){

  // // Run code
  $( ".hi-intro-wrap" ).load( "svg_real.html", function() {
  alert( "Load was performed." );
  // $('.squiggle-animated').on('load', function() {

var paths = document.querySelectorAll('.squiggle-animated');
debugger
// var paths = Array.prototype.slice.call(document.querySelectorAll('.squiggle-animated'));
$(paths).each(function(path){
var length = paths[path].getTotalLength();
// Clear any previous transition
paths[path].style.transition = paths[path].style.WebkitTransition =
  'none';
// Set up the starting positions
paths[path].style.strokeDasharray = length + ' ' + length;
paths[path].style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
paths[path].getBoundingClientRect();
// Define our transition
paths[path].style.transition = paths[path].style.WebkitTransition =
  'stroke-dashoffset 5s ease-in-out';
// Go!
paths[path].style.strokeDashoffset = '0';

});
  });
  // });
//    function load_home(){
// document.getElementById("content").innerHTML='<object type="text/html" data="svg_real.html" ></object>';
// }

//   /* copy loaded thumbnails into carousel */
// $('.row .thumbnail').on('load', function() {

// }).each(function(i) {
//   if(this.complete) {
//     var item = $('<div class="item"></div>');
//     var itemDiv = $(this).parents('div');
//     var title = $(this).parent('a').attr("title");

//     item.attr("title",title);
//     $(itemDiv.html()).appendTo(item);
//     item.appendTo('.carousel-inner');
//     if (i==0){ // set first item active
//      item.addClass('active');
//     }
//   }
// });

// /* activate the carousel */
// $('#modalCarousel').carousel({interval:false});

// /* change modal title when slide changes */
// $('#modalCarousel').on('slid.bs.carousel', function () {
//   $('.modal-title').html($(this).find('.active').attr("title"));
// })

// /* when clicking a thumbnail */
// $('.row .thumbnail').click(function(){
//     var idx = $(this).parents('div').index();
//     var id = parseInt(idx);
//     $('#myModal').modal('show'); // show the modal
//     $('#modalCarousel').carousel(id); // slide carousel to selected

// });

// var offset = 80;

// $('.nav li a').click(function(event) {
//     event.preventDefault();
//     $($(this).attr('href'))[0].scrollIntoView();
//     scrollBy(0, -offset);
//     $(this).addClass('active').siblings().removeClass('active');

// });

// One working option:

// function simulatePathDrawing(path) {
//   // var path = document.querySelector('.squiggle-animated path');
//   var length = path.getTotalLength();
//   // Clear any previous transition
//   path.style.transition = path.style.WebkitTransition =
//   'none';
//   // Set up the starting positions
//   path.style.strokeDasharray = length + ' ' + length;
//   path.style.strokeDashoffset = length;
//   // Trigger a layout so styles are calculated & the browser
//   // picks up the starting position before animating
//   path.getBoundingClientRect();
//   // Define our transition
//   path.style.transition = path.style.WebkitTransition =
//   'stroke-dashoffset 1.5s ease-in-out';
//   // Go!
//   path.style.strokeDashoffset = '0';
//   path.style.strokeWidth = '1px';
//   // path.style.fill = 'rgba(255,255,0,.12)';
// }

// var chars = $('.squiggle-animated').on('mouseover', function(e) {
//   simulatePathDrawing(this)
// })

// Another option (not working):

// var distancePerPoint = 1;
// var drawFPS          = 60;

// var orig = document.querySelector('path'), length, timer;
// orig.addEventListener('mouseover',startDrawingPath,false);
// orig.addEventListener('mouseout', stopDrawingPath, false);

// function startDrawingPath(){
//   length = 0;
//   orig.style.stroke = '#f60';
//   timer = setInterval(increaseLength,1000/drawFPS);
// }

// function increaseLength(){
//   var pathLength = orig.getTotalLength();
//   length += distancePerPoint;
//   orig.style.strokeDasharray = [length,pathLength].join(' ');
//   if (length >= pathLength) clearInterval(timer);
// }

// function stopDrawingPath(){
//   clearInterval(timer);
//   orig.style.stroke = '';
//   orig.style.strokeDasharray = '';
// }

// And another:
// Trying to select a loaded object and the xml document contained within.
// object = document.querySelectorAll('object');



// doc = object['#document'];

// paths = object.document.querySelectorAll('.squiggle-animated');
// $('.squiggle-animated').on('load', function() {

// var paths = document.querySelectorAll('.squiggle-animated');
// debugger
// // var paths = Array.prototype.slice.call(document.querySelectorAll('.squiggle-animated'));
// $(paths).each(function(path){
// var length = paths[path].getTotalLength();
// // Clear any previous transition
// paths[path].style.transition = paths[path].style.WebkitTransition =
//   'none';
// // Set up the starting positions
// paths[path].style.strokeDasharray = length + ' ' + length;
// paths[path].style.strokeDashoffset = length;
// // Trigger a layout so styles are calculated & the browser
// // picks up the starting position before animating
// paths[path].getBoundingClientRect();
// // Define our transition
// paths[path].style.transition = paths[path].style.WebkitTransition =
//   'stroke-dashoffset 5s ease-in-out';
// // Go!
// paths[path].style.strokeDashoffset = '0';

// });
// });
// An approach using object tag:


// function svgloaded() {
//   console.log("test");
//   var svgEmbed = document.querySelector("#svg_real");
//   var svg = svgEmbed.getSVGDocument();

//   var td = svg.getElementById("squiggle-animated");
//   td.textContent = "Foo";

//   // var gn = svg.getElementById("greenBlock");
//   // gn.setAttribute("fill", "#ff0000");

// }

// document.addEventListener("DOMContentLoaded", function(){

//   var svgEmbed = document.querySelector("#svgembed");
//   svgEmbed.addEventListener("load", svgloaded);

// },false);


});
