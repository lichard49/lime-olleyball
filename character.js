function Character(x, y, color, isFacingLeft) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.isFacingLeft = isFacingLeft ? -1 : 1;
}

Character.prototype.moveLeft = function() {
	this.xVelocity = 5;
}

Character.prototype.moveRight = function() {
	this.xVelocity = -5;
}

Character.prototype.jump = function() {
	// jump only if we're on the ground
	if(this.yVelocity == 0) {
		this.yVelocity = -10;
	}
}

Character.prototype.stop = function() {
	this.xVelocity = 0;
}

Character.prototype.tick = function(floorY) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y > floorY) {
		this.y = floorY;
		this.yVelocity = 0;
	}
	else if(this.y < floorY) {
		this.yVelocity += 0.5;
	}
}

Character.prototype.draw = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, 70, Math.PI, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = this.color;
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();

	// eye
	context.beginPath();
	context.arc(this.x+(this.isFacingLeft*35), this.y-30, 5, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();

	context.beginPath();
	context.arc(this.x+(this.isFacingLeft*55), this.y-30, 5, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();

	// mouth
	context.beginPath();
	context.arc(this.x+(this.isFacingLeft*45), this.y-15, 10, 0, Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();
	context.beginPath();
}