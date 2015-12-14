function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.xVelocity = 0;
	this.yVelocity = 0;
}

Ball.prototype.bounce = function() {
	this.xVelocity = 0;
}

Ball.prototype.tick = function(floorY) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y > floorY-15) {
		this.y = floorY-15;
		this.yVelocity = -1*this.yVelocity;
	}
	else if(this.y < floorY-15) {
		this.yVelocity += 0.5;
	}
}

Ball.prototype.draw = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, 30, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();
}