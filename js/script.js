var MIN_MIDI = 40;
var MAX_MIDI = 89;
var OCTAVE_LENGTH = 12;
var NUMBER_OF_OCTAVES = 11;

function getRandomPentatonicMIDI(){
	var base_scale = [0, 2, 4, 7, 9];
	var octave = Math.floor(Math.random() * NUMBER_OF_OCTAVES);
	var base_note = base_scale[Math.floor(Math.random() * base_scale.length)];
	var note = octave * OCTAVE_LENGTH + base_note;
	if (note < MIN_MIDI || note > MAX_MIDI){
		return getRandomPentatonicMIDI();
	}
	return note;
}

$(document).ready(function(){
	$(document).keypress(function(){
		console.log("Received keypress()");
		var freq = getRandomPentatonicMIDI().midicps();
		var note = T("sin", {
			freq : freq,
			mul  : 0.10});
		note.play();
		window.setTimeout(function(){
			note.pause();
		}, 1000);
	});
});