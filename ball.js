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
		// game over when the ball touches the ground
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.y = world.floorY;
		//alert("Game over");
	}
	else if(this.y < world.floorY) {
		// apply gravity when not on the ground
		this.yVelocity += 0.1;
		this.yVelocity = Math.max(-10, Math.min(10, this.yVelocity));
	}

	// keep ball in the screen
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
			// elastic collision
			this.yVelocity = -1.1*(player.y-this.y)/(distance)*(this.yVelocity+player.yVelocity+this.xVelocity+player.xVelocity);
			this.xVelocity = 1.1*(player.x-this.x)/(distance)*(this.xVelocity+player.xVelocity+this.yVelocity+player.yVelocity);

			// cap the speed
			this.yVelocity = Math.max(-10, Math.min(10, this.yVelocity));
			this.xVelocity = Math.max(-10, Math.min(10, this.xVelocity));

			// keep the ball physically out of the slime
			// sin(theta) = opposite/hypotenuse
			//        /|
			//       / |
			//      /  |
			//     /   |
			//    /____|
			//   /     |
			//  /______|
			// 1: current, 2: desired
			// hypotenuse1/base1 = hypotenuse2/base2
			// distance/(ball.x-player.x) = threshold/(ball.newX-player.x)
			// -> ball.newX-player.x = (threshold(ball.x-player.x))/distance
			this.x = (threshold*(this.x-player.x))/distance + player.x;
			this.y = (threshold*(this.y-player.y))/distance + player.y;
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