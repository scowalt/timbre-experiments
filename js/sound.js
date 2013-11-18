var MIN_MIDI = 36;
var MAX_MIDI = 89;
var OCTAVE_LENGTH = 12;
var NUMBER_OF_OCTAVES = 11;
var SOUND_LENGTH = 1000; //ms

function getRandomPentatonicMIDI(){
	var base_scale = [0, 2, 4, 7, 9];
	var octave = Math.floor(Math.random() * NUMBER_OF_OCTAVES);
	var base_note = base_scale[Math.floor(Math.random() * base_scale.length)];
	var note = octave * OCTAVE_LENGTH + base_note;
	if(note < MIN_MIDI || note > MAX_MIDI) {
		return getRandomPentatonicMIDI();
	}
	return note;
}

function playNote(){
	var freq = getRandomPentatonicMIDI().midicps();
	var note = T("sin", {
		freq : freq,
		mul  : 0.20});
	var envelope = T("perc", {r : SOUND_LENGTH}, note).on("ended",function(){
		this.pause();
	}).bang().play();
}