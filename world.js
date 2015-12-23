function World(canvas) {
	this.skyX = 0;
	this.skyY = 0;
	this.skyWidth = canvas.width;
	this.skyHeight = 2*canvas.height/3;

	this.floorX = 0;
	this.floorY = 2*canvas.height/3;
	this.floorWidth = canvas.width;
	this.floorHeight = canvas.height/3;

	this.netWidth = 50;
	this.netHeight = 100;
	this.netX = canvas.width/2-this.netWidth/2;
	this.netY = this.floorY-this.netHeight;
}

World.prototype.draw = function(context) {
	context.fillStyle = "#7ec0ee";
	context.fillRect(this.skyX, this.skyY, this.skyWidth, this.skyHeight);
	context.fillStyle = "#00FF00";
	context.fillRect(this.floorX, this.floorY, this.floorWidth, this.floorHeight);
	context.fillStyle = "#614126";
	context.fillRect(this.netX, this.netY, this.netWidth, this.netHeight);
}