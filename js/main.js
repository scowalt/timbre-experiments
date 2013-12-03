// BOX2D naming
var b2Vec2 = Box2D.Common.Math.b2Vec2, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2Fixture = Box2D.Dynamics.b2Fixture, b2World = Box2D.Dynamics.b2World, b2MassData = Box2D.Collision.Shapes.b2MassData, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

var sound = require('sound');
var Circle = require('Circle').Circle;

var width = window.innerWidth - 30;
var height = window.innerHeight - 20;

function sketchProc(processing) {
    var color = "#ffffff";
    var world = null;

    processing.setup = function() {
        processing.size(width, height);
        processing.background(0);
        processing.frameRate(60);
        world = new b2World(new b2Vec2(0.0, 10), true);
    };

    processing.keyPressed = function(event) {
        if (processing.keyCode == 16) {
            sound.changeKey();
            color = get_random_color();
        } else {
            sound.playNote();
            createBall();
        }
    };

    function createBall() {
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        var diameter = Math.floor(Math.random() * 40) + 30;
        new Circle(x, y, diameter, world);
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

        // step the physics
        world.Step(5.0 / 60.0, 10, 10);
        world.ClearForces();

        // draw balls
        // console.log(world.GetBodyList());
        var ball = world.GetBodyList();
        while (ball) {
            var pos = ball.GetPosition();
            var fix = ball.GetFixtureList();
            if (fix) {
                var shape = fix.GetShape();
                var diameter = shape.m_radius * 2;
                processing.fill(color);
                processing.ellipse(pos.x, pos.y, diameter, diameter);
            }
            ball = ball.GetNext();
        }

    };
}

var processingInstance = new Processing(document.getElementById("mycanvas"), sketchProc);
