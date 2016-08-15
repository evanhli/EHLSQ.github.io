$(document).ready( function () {
  $(".block").hide();
});


$(function(){
    $(".title").typed({
      strings: ["Evan ^100L^40i<br>NCSU CS 2018",  ],
      typeSpeed: 0,
      showCursor: false,
      callback: function () {
        displayBody();
      }
    });
});

function displayBody() {
    $(".block").fadeIn ( 800, function () {

    });
}
