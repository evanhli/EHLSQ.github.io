var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {

    var currentdate = new Date();
    var datetime = "" + currentdate.getDay() + "/"+currentdate.getMonth()
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    function updateClock() {

        var now = new Date();


        var minutes = now.getMinutes();

        var hours = now.getHours();

        if ((minutes - 10) < 0) {
          minutes = "0" + minutes;
        }

        if ((hours- 10) < 0) {
          hours= "0" + hours;
        }

        time = hours + ':' + minutes;

        document.getElementById('time').innerHTML = time;

        setTimeout(updateClock, 1000);
    }

    updateClock();

  });
