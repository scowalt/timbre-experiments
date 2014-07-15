// BOX2D naming
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var sound = require('sound');
var Circle = require('Circle').Circle;
var Star = require('Star').Star;

var width = window.innerWidth - 30;
var height = window.innerHeight - 20;
var center = {
	x: width / 2,
	y: height / 2
};

function sketchProc(processing) {
	var color = "#ffffff";
	var world = null;
	var balls = [];
	var stars = [];

	processing.setup = function() {
		processing.size(width, height);
		processing.background(0);
		processing.frameRate(60);
		world = new b2World(new b2Vec2(0.0, 0.0), true);
	};

	processing.keyPressed = function(event) {
		if (processing.keyCode == 16) {
			sound.changeKey();
			color = get_random_color();
		} else {
			sound.playNote();
			createBall(Math.floor(Math.random() * width), Math.random() * height);
		}
	};

	processing.mousePressed = function(event) {
		sound.playNote();
		createBall(processing.mouseX, processing.mouseY);
	}

	function createBall(x, y) {
		var diameter = Math.floor(Math.random() * 50) + 50;
		balls.push(new Circle(x, y, color, diameter, world));
	}

	// http://stackoverflow.com/a/18037185/1222411
	function get_random_color() {
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);

		R = (R << 16) & 0x00FF0000;
		G = (G << 8) & 0x0000FF00;
		B = B & 0x000000FF;

		return 0xFF000000 | R | G | B;
	}

	processing.draw = function() {
		// draw background
		processing.background(0, 0, 0);

		// apply gravity and shrink stars
		stars.forEach(function(star, i, stars) {
			star.translate(center);
			star.shrink();
			if (star.checkRemoval()) {
				stars.splice(i, 1);
			}
		})

		// apply gravity and shrink balls
		balls.forEach(function(ball, i, balls) {
			ball.applyGravity(center);
			ball.shrink();
			if (ball.checkRemoval(world, center)) {
				balls.splice(i, 1);
			}
		});

		// step the physics
		world.Step(5.0 / 60.0, 10, 10);
		world.ClearForces();

		// draw stars
		stars.forEach(function(star){
			star.draw(processing);
		})

		// draw balls
		balls.forEach(function(ball) {
			ball.draw(processing);
		});

		// spawn star
		stars.push(new Star(Math.floor(Math.random() * width), Math.random() * height));
	};
}

var processingInstance = new Processing(document.getElementById("mycanvas"), sketchProc);
