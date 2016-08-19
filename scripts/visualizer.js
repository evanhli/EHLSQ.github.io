var clientID = '01bb591b4637b19ade24864ab8ab2dfc';

var loader;

window.onload = function init () {
  var player =  document.getElementById('player');
  player.crossOrigin = "anonymous";

  var audioSource = new SoundCloudAudioSource(player);

}

$( "form" ).submit(function( event ) {
  var input = document.getElementById('myText');
  var track_url = input.value;
  loader = new SoundCloudLoader(player, track_url);

  event.preventDefault();

});


var SoundCloudAudioSource = function ( player ) {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext);
  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  var source = audioCtx.createMediaElementSource(player);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  var streamData = new Uint8Array(128);

  setInterval(function () {
    analyser.getByteFrequencyData(streamData);
    console.log(streamData);
  }, 20)

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
