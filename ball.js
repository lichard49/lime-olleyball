function Ball(x, y, x2, screenRatio) {
	this.x = x;
	this.y = y;
	this.defaultX1 = x;
	this.defaultX2 = x2;
	this.defaultY = y;
	this.radius = 30/screenRatio;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.MAX_VELOCITY = 8/screenRatio;
	this.MIN_VELOCITY = -1*this.MAX_VELOCITY;

}

Ball.prototype.reset = function(whichDefault) {
	switch(whichDefault) {
		case 1:
			this.x = this.defaultX1;
			break;
		case 2:
			this.x = this.defaultX2;
			break;
	}
	this.y = this.defaultY;
}

/* 
 * return 0 if the game is still in play
 * return 1 if player 1 scores
 * return 2 if player 2 scores
 */
Ball.prototype.tick = function(world, players) {
	this.x += this.xVelocity;
	this.y += this.yVelocity;

	if(this.y+this.radius > world.floorY) {
		// game over when the ball touches the ground
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.y = world.floorY-this.radius;
		//alert("Game over");
		if(this.x > world.floorWidth/2) {
			// landed on player 2's side, score for player 1
			return 1;
		}
		else {
			// vice versa
			return 2;
		}
	}
	else if(this.y-this.radius < world.floorY) {
		// apply gravity when not on the ground
		this.yVelocity += 0.1;
		this.yVelocity = Math.max(this.MIN_VELOCITY, Math.min(this.MAX_VELOCITY, this.yVelocity));
	}

	// keep ball in the screen
	if(this.x+this.radius > world.floorX+world.floorWidth) {
		this.xVelocity = -1*this.xVelocity;
		this.x = world.floorX+world.floorWidth-this.radius;
	}
	else if(this.x-this.radius < world.floorX) {
		this.xVelocity = -1*this.xVelocity;
		this.x = world.floorX+this.radius;
	}

	// check for the wall
	var netCenterX = world.netX+world.netWidth/2;
	var netCenterY = world.netY+world.netHeight/2;
	var distanceX = Math.abs(this.x-netCenterX);
	var distanceY = Math.abs(this.y-netCenterY);
	var distanceSquared = Math.pow(distanceX-world.netWidth/2, 2)+Math.pow(distanceY-world.netHeight/2, 2);
	if(distanceX > world.netWidth/2+this.radius || distanceY > world.netHeight/2+this.radius) {

	}
	else {
		if(distanceX < world.netWidth/2 || distanceY < world.netHeight/2 ||
			distanceSquared < Math.pow(this.radius, 2)) {

			console.log();

			if(this.x > world.netX && this.x < world.netX+world.netWidth) {
				// hitting top of wall means bounce up
				this.yVelocity = -1*this.yVelocity;
				this.y -= this.radius;
				console.log('top');
			}
			else {
				// hitting side of wall means bounce left/right
				console.log('side');
				this.xVelocity = -1*this.xVelocity;
				if(this.xVelocity > 0) {
					this.x += this.radius;
				}
				else {
					this.x -= this.radius;
				}
			}
		}
	}

	for(var i = 0, player; player = players[i]; i++) {
		// characters and ball are all round, so just use distance formula to detect collision
		var distance = Math.trunc(Math.sqrt((this.x-player.x)*(this.x-player.x)+(this.y-player.y)*(this.y-player.y)));
		var threshold = this.radius+player.radius;
		if(distance <= threshold) {
			// collision correction
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
			var deltaX = Math.abs((threshold*(this.x-player.x))/distance);
			if(this.x > player.x) {
				this.x = player.x+deltaX;
			}
			else {
				this.x = player.x-deltaX;
			}
			this.y = (threshold*(this.y-player.y))/distance + player.y;

			// elastic collision
			this.yVelocity = -1.5*(player.y-this.y)/(distance)*(this.yVelocity+player.yVelocity+this.xVelocity+player.xVelocity);
			this.xVelocity = 1.5*(player.x-this.x)/(distance)*(this.xVelocity+player.xVelocity+this.yVelocity+player.yVelocity);

			// cap the speed
			this.yVelocity = Math.max(this.MIN_VELOCITY, Math.min(this.MAX_VELOCITY, this.yVelocity));
			this.xVelocity = Math.max(this.MIN_VELOCITY, Math.min(this.MAX_VELOCITY, this.xVelocity));
		}
	}
	return 0;
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