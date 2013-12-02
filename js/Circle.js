var density = 1.0;
var friction = 0.5;
var restitution = 0.2;

var Circle = function(xin, yin, din, world) {
    this.diameter = din;

    this.bodyDef = new Box2D.Dynamics.b2BodyDef;
    this.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
    this.bodyDef.position.x = xin;
    this.bodyDef.position.y = yin;

    var fixDef = new Box2D.Dynamics.b2FixtureDef;
    fixDef.density = density;
    fixDef.friction = friction;
    fixDef.restitution = restitution;

    fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(din / 2);
    world.CreateBody(this.bodyDef).CreateFixture(fixDef);
};

exports.Circle = Circle;
