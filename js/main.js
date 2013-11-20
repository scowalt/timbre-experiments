var gamejs = require('gamejs');
var sound = require('sound');
var Circle = require('Circle').Circle;

var width = window.innerWidth;
var height = window.innerHeight;
var MAX_BALLS = 100;

gamejs.preload([]);

gamejs.ready(function(){
	var balls = new Array(MAX_BALLS);
	var ballIdx = 0;
	var color = "#ffffff";

	var display = gamejs.display.setMode([width, height]);

	gamejs.onEvent(function(event){
		// event handling
		if (event.type == 1) {
			if (event.key == 16) {
				sound.changeKey();
				color = get_random_color();
			}
			else {
				sound.playNote();
				createBall();
			}
		}
	});

	function createBall(){
		var x = Math.floor(Math.random() * width);
		var y = Math.floor(Math.random() * height);
		var diameter = Math.floor(Math.random() * 40) + 30;
		balls[ballIdx] = new Circle(x, y, diameter, ballIdx, balls, color);
		ballIdx = (ballIdx + 1) % balls.length;
	}

	// http://stackoverflow.com/a/1484514/1222411
	function get_random_color(){
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}

	gamejs.onTick(function(msDuration){
		gamejs.draw.rect(display, "#000000",
			new gamejs.Rect([0, 0], [width, height]));
		for (var i = 0; i < balls.length; i++) {
			if (balls[i]) {
				balls[i].collide();
				balls[i].move();
				balls[i].draw(gamejs, display);
			}
		}
	});
});