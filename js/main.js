var gamejs = require('gamejs');
var sound = require('sound');

var spring = 0.05;
var gravity = 0.05;
var friction = -0.9;
var width = 600;
var height = 400;

function Circle(xin, yin, din, idin, oin, colorin){
	this.x = xin;
	this.y = yin;
	this.diameter = din;
	this.vx = 0;
	this.vy = 0;
	this.id = idin;
	this.others = oin;
	this.color = colorin;


	this.collide = function(){
		for (var i = this.id + 1; i < this.others.length; i++) {
			if (this.others[i]) {
				var dx = this.others[i].x - this.x;
				var dy = this.others[i].y - this.y;
				var distance = Math.sqrt(dx * dx + dy * dy);
				var minDist = this.others[i].diameter / 2 + this.diameter / 2;
				if (distance < minDist) {
					var angle = Math.atan2(dy, dx);
					var targetX = this.x + Math.cos(angle) * minDist;
					var targetY = this.y + Math.sin(angle) * minDist;
					var ax = (targetX - this.others[i].x) * spring;
					var ay = (targetY - this.others[i].y) * spring;
					this.vx -= ax;
					this.vy -= ay;
					this.others[i].vx += ax;
					this.others[i].vy += ay;
				}
			}
		}
	}

	this.move = function(){
		this.vy += gravity;
		this.x += this.vx;
		this.y += this.vy;
		/*		if (this.x + this.diameter / 2 > width) {
		 this.x = width - this.diameter / 2;
		 this.vx *= friction;
		 }
		 else if (this.x - this.diameter / 2 < 0) {
		 this.x = this.diameter / 2;
		 this.vx *= friction;
		 }
		 if (this.y + this.diameter / 2 > height) {
		 this.y = height - this.diameter / 2;
		 this.vy *= friction;
		 }
		 else if (this.y - this.diameter / 2 < 0) {
		 this.y = this.diameter / 2;
		 this.vy *= friction;
		 }*/
	}

	this.draw = function(display){
		gamejs.draw.circle(display, this.color, [this.x, this.y],
			this.diameter / 2);
	}
}

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
				balls[i].draw(display);
			}
		}
	});
});