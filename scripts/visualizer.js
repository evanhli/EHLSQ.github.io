var clientID = '01bb591b4637b19ade24864ab8ab2dfc';

var loader;
var canvas;
var canvasCtx;

$( "form" ).submit(function( event ) {
  var input = document.getElementById('myText');
  var track_url = input.value;
  loader = new SoundCloudLoader(player, track_url);

  event.preventDefault();

});

window.onload = function init () {

  var player =  document.getElementById('player');
  player.crossOrigin = "anonymous";

  canvas = document.querySelector('.visualizer');
  canvasCtx = canvas.getContext("2d");


  var audioSource = new SoundCloudAudioSource(player);

}

var SoundCloudAudioSource = function ( player ) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext);
  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  var source = audioCtx.createMediaElementSource(player);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  var streamData = new Uint8Array(128);

  // setInterval(function () {
  //   analyser.getByteFrequencyData(streamData);
  //   console.log(streamData);
  //
  // }, 20)

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(streamData);
    var bufferLength = analyser.frequencyBinCount;

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    var barWidth = (canvas.width / bufferLength) * 4;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i+=3) {

      barHeight = Math.pow(streamData[i],1);

      canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ', ' + (barHeight) + ' , 0 )';
      canvasCtx.fillRect(x, canvas.height-barHeight/2, barWidth, barHeight * 5);

      x += barWidth + 1;
    }
  };

  draw();

  player.play();


}

var SoundCloudLoader = function ( player, track_url ) {

  SC.initialize({
    client_id: clientID
  });

  var sound = { url: track_url};

  SC.get('/resolve', sound).then(function(audio){
    var stream_url = audio.stream_url;

    player.src = stream_url + '?client_id=' + clientID;

  });
}
