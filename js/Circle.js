var spring = 0.05;
var gravity = 0.05;
var friction = -0.9;

var Circle = function(xin, yin, din, idin, oin, colorin){
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
	}

	this.draw = function(processing){
		processing.fill(this.color);
		processing.ellipse(this.x,this.y,this.diameter, this.diameter);
	}
}

exports.Circle = Circle;