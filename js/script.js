var pentatonic_freq = [261.63, 293.67, 329.63, 392.00, 440.00, 523.25]

$(document).ready(function(){
	$(document).keypress(function(){
		console.log("Received keypress()");
		var idx = Math.floor(Math.random() * pentatonic_freq.length);
		var freq = pentatonic_freq[idx];
		var note = T("sin", {
			freq : freq,
			mul  : 0.25});
		note.play();
		window.setTimeout(function(){
			note.pause();
		}, 1000);
	});
});