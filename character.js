function Character(x, y, color, isFacingLeft, screenRatio) {
	this.color = color;
	this.x = x;
	this.y = y;
	this.defaultX = x;
	this.defaultY = y;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.radius = 70/screenRatio;
	this.isFacingLeft = isFacingLeft ? -1 : 1;
	this.HORIZONTAL_ACCELERATION = 5/screenRatio;
	this.VERTICAL_ACCELERATION = -10/screenRatio;
}

Character.prototype.reset = function() {
	this.x = this.defaultX;
	this.y = this.defaultY;
	this.xVelocity = 0;
	this.yVelocity = 0;
}

Character.prototype.moveLeft = function() {
	this.xVelocity = this.HORIZONTAL_ACCELERATION;
}

Character.prototype.moveRight = function() {
	this.xVelocity = -1*this.HORIZONTAL_ACCELERATION;
}

Character.prototype.jump = function() {
	// jump only if we're on the ground
	if(this.yVelocity == 0) {
		this.yVelocity = this.VERTICAL_ACCELERATION;
	}
}

Character.prototype.stop = function() {
	this.xVelocity = 0;
}

Character.prototype.tick = function(world) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y > world.floorY) {
		// on the ground
		this.y = world.floorY;
		this.yVelocity = 0;
	}
	else if(this.y < world.floorY) {
		// falling
		this.yVelocity += 0.5;
	}

	// keep character in the screen
	if(this.x-this.radius < world.floorX) {
		this.x = world.floorX+this.radius;
	}
	else if(this.x+this.radius > world.floorWidth) {
		this.x = world.floorWidth-this.radius;
	}
	else if(this.x+this.radius > world.netX && this.x-this.radius < world.netX+world.netWidth) {
		// handle the net
		if(this.xVelocity > 0) {
			this.x = world.netX-this.radius;
		}
		else {
			this.x = world.netX+world.netWidth+this.radius;
		}
	}
}

Character.prototype.draw = function(context) {
	// body
	context.beginPath();
	context.arc(this.x, this.y, this.radius, Math.PI, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = this.color;
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();
	var img;
	if(this.isFacingLeft > 0) {
		img = document.getElementById("lime");
	}
	else {
		img = document.getElementById("lemon");
	}
	context.drawImage(img, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius);

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