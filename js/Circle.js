/**
 * PRIVATE CLASS VARIABLES
 */
var density = 1.0;
var friction = 0.5;
var restitution = 0.2;

var Circle = function(xin, yin, colorin, din, world) {
	/**
	 * CONSTRUCTION
	 */
	var bodyDef = new Box2D.Dynamics.b2BodyDef;
	bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
	bodyDef.position.x = xin;
	bodyDef.position.y = yin;

	var fixDef = new Box2D.Dynamics.b2FixtureDef;
	fixDef.density = density;
	fixDef.friction = friction;
	fixDef.restitution = restitution;

	fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(din / 2);
	fixDef.userData = colorin;

	/**
	 * PUBLIC OBJECT VARIABLES
	 */
	this.body = world.CreateBody(bodyDef);
	this.fixture = this.body.CreateFixture(fixDef);
	this.color = colorin;

	/**
	 * PUBLIC OBJECT METHODS
	 */
	this.draw = function(processing) {
		var pos = this.body.GetPosition();
		processing.fill(this.color);
		var shape = this.fixture.GetShape();
		var diameter = shape.m_radius * 2;
		processing.ellipse(pos.x, pos.y, diameter, diameter);
	};

	this.checkRemoval = function(world, point) {
		var pos = this.body.GetPosition();
		var radius = this.fixture.GetShape().m_radius;
		if (radius < 20.0 && Math.abs(pos.x - point.x) < 10.0 && Math.abs(pos.y - point.y) < 10.0) {
			world.DestroyBody(this.body);
			return true;
		}
		return false;
	};

	this.applyGravity = function(point) {
		var b2Vec2 = Box2D.Common.Math.b2Vec2;
		var x = point.x;
		var y = point.y;
		var pos = this.body.GetPosition();
		var d = distance(x, y, pos.x, pos.y);

		// these next 3 lines are voodoo magic
		var force = Math.pow(d, -1.1);
		var gravityVec = new b2Vec2(x - pos.x, y - pos.y);
		var mul = 15 * (1 + Math.log(d));
		gravityVec.Multiply(mul);

		this.body.ApplyForce(gravityVec, new b2Vec2(pos.x, pos.y));
	};

	this.shrink = function() {
		var radius = this.fixture.GetShape().m_radius;
		this.fixture.GetShape().m_radius = radius - 0.5;
	};

	/**
	 * PRIVATE OBJECT METHOD
	 */
	function distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	};
};

exports.Circle = Circle;
