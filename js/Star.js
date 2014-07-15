var shrinkRate = 1.00;
var transRate = 1; // get it?

var Star = function(xin, yin) {
	var side = 50;
	var x = xin;
	var y = yin;

	this.draw = function(processing) {
		processing.fill("#ffffff");
		processing.rect(x, y, side, side);
	}

	this.shrink = function() {
		side = side - shrinkRate;
		// move the box to compensate (shrinks to top left)
		x = x + shrinkRate / 2;
		y = y + shrinkRate / 2;
	}

	this.translate = function(worldCenter) {
		var thisCenter = {
			x: x + side / 2,
			y: y + side / 2
		};

		var xDif = thisCenter.x - worldCenter.x;
		var yDif = thisCenter.y - worldCenter.y;

		if (xDif > 0){
			x -= transRate;
		} else {
			x += transRate;
		}
		if (yDif > 0){
			y -= transRate;
		} else {
			y += transRate;
		}
	}

	this.checkRemoval = function() {
		return side <= 0;
	}
}

exports.Star = Star
