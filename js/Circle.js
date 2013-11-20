var spring = 0.05;
var gravity = 0.05;
var friction = -0.9;

var Circle = function(xin, yin, din, idin, oin, colorin){
	var x = xin;
	var y = yin;
	var diameter = din;
	var vx = 0;
	var vy = 0;
	var id = idin;
	var others = oin;
	var color = colorin;


	var collide = function(){
		for (var i = id + 1; i < others.length; i++) {
			if (others[i]) {
				var dx = others[i].x - x;
				var dy = others[i].y - y;
				var distance = Math.sqrt(dx * dx + dy * dy);
				var minDist = others[i].diameter / 2 + diameter / 2;
				if (distance < minDist) {
					var angle = Math.atan2(dy, dx);
					var targetX = x + Math.cos(angle) * minDist;
					var targetY = y + Math.sin(angle) * minDist;
					var ax = (targetX - others[i].x) * spring;
					var ay = (targetY - others[i].y) * spring;
					vx -= ax;
					vy -= ay;
					others[i].vx += ax;
					others[i].vy += ay;
				}
			}
		}
	}

	var move = function(){
		vy += gravity;
		x += vx;
		y += vy;
	}

	var draw = function(gamejs, display){
		gamejs.draw.circle(display, color, [x, y],
			diameter / 2);
	}

	return {
		collide : collide,
		move    : move,
		draw    : draw
	}
}

exports.Circle = Circle;