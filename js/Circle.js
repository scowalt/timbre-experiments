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
     * OBJECT VARIABLES
     */
    this.body = world.CreateBody(bodyDef);
    this.fixture = this.body.CreateFixture(fixDef);
    this.color = colorin;
    this.diameter = din;

    /**
     * OBJECT METHODS
     */
    this.draw = function(processing) {
        var pos = this.body.GetPosition();
        processing.fill(this.color);
        processing.ellipse(pos.x, pos.y, this.diameter, this.diameter);
    };
};

exports.Circle = Circle;
