var sound = require('sound');
var Circle = require('Circle').Circle;

var width = window.innerWidth - 30;
var height = window.innerHeight - 20;
var MAX_BALLS = 100;

function sketchProc(processing){
	var balls = new Array(MAX_BALLS);
	var ballIdx = 0;
	var color = "#ffffff";

	processing.setup = function(){
		processing.size(width, height);
		processing.background(0);
	}

	processing.keyPressed = function(){
		if (event.shiftKey) {
			sound.changeKey();
			color = get_random_color();
		}
		else {
			sound.playNote();
			createBall();
		}
	};

	function createBall(){
		var x = Math.floor(Math.random() * width);
		var y = Math.floor(Math.random() * height);
		var diameter = Math.floor(Math.random() * 40) + 30;
		balls[ballIdx] = new Circle(x, y, diameter, ballIdx, balls, color);
		ballIdx = (ballIdx + 1) % balls.length;
	}

	// http://stackoverflow.com/a/18037185/1222411
	function get_random_color(){
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);

		R = (R << 16) & 0x00FF0000;
		G = (G << 8) & 0x0000FF00;
		B = B & 0x000000FF;

		return 0xFF000000 | R | G | B;
	}

	processing.draw = function(){
		// draw background
		processing.background(0, 0, 0);

		// draw balls
		for (var i = 0; i < balls.length; i++) {
			if (balls[i]) {
				balls[i].collide();
				balls[i].move();
				balls[i].draw(processing);
			}
		}
	}
}

var processingInstance = new Processing(document.getElementById("mycanvas"),
	sketchProc);