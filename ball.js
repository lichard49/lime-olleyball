function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.radius = 30;
	this.xVelocity = 0;
	this.yVelocity = 0;
}

Ball.prototype.tick = function(world, players) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y > world.floorY) {
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.y = world.floorY;
		//alert("Game over");
	}
	else if(this.y < world.floorY) {
		this.yVelocity += 0.1;
	}

	if(this.x > world.floorX + world.floorWidth) {
		this.xVelocity = -1*this.xVelocity;
	}
	else if(this.x < world.floorX) {
		this.xVelocity = -1*this.xVelocity;
	}

	for(var i = 0, player; player = players[i]; i++) {
		// characters and ball are all round, so just use distance formula to detect collision
		var distance = Math.trunc(Math.sqrt((this.x-player.x)*(this.x-player.x)+(this.y-player.y)*(this.y-player.y)));
		var threshold = this.radius+player.radius;
		if(distance <= threshold) {
			this.yVelocity = -1.1*(player.y-this.y)/(distance)*(this.yVelocity+this.xVelocity);
			this.xVelocity = 1.1*(player.x-this.x)/(distance)*(this.yVelocity+this.xVelocity);

			this.yVelocity = Math.max(-10, Math.min(10, this.yVelocity));
			this.xVelocity = Math.max(-10, Math.min(10, this.xVelocity));
		}
	}
}

Ball.prototype.draw = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = '#550000';
	context.stroke();
}