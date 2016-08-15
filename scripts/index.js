var aboutButton;
$(document).ready( function () {
  $(".block").hide();
  $(".about").hide();
  aboutButton = document.getElementById("aboutButton");
  aboutButton.onclick = displayAbout;
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

function displayAbout() {
  $(".about").fadeIn( 800, function () {

  })
}
