function Character(x, y, color, isFacingLeft) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.defaultX = x;
	this.defaultY = y;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.radius = 70;
	this.isFacingLeft = isFacingLeft ? -1 : 1;
}

Character.prototype.reset = function() {
	this.x = this.defaultX;
	this.y = this.defaultY;
	this.xVelocity = 0;
	this.yVelocity = 0;
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

Character.prototype.tick = function(world) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y > world.floorY) {
		this.y = world.floorY;
		this.yVelocity = 0;
	}
	else if(this.y < world.floorY) {
		this.yVelocity += 0.5;
	}

	if(this.x-this.radius < world.floorX) {
		this.x = world.floorX+this.radius;
	}
	else if(this.x+this.radius > world.floorWidth) {
		this.x = world.floorWidth-this.radius;
	}
	else if(this.x+this.radius > world.netX && this.x-this.radius < world.netX+world.netWidth) {
		if(this.xVelocity > 0) {
			this.x = world.netX-this.radius;
		}
		else {
			this.x = world.netX+world.netWidth+this.radius;
		}
	}
}

Character.prototype.draw = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, Math.PI, 2*Math.PI, false);
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