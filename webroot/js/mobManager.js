
let mobManager = {
	posNow: pos(400,300),
	flies: 0,
	maxFlies: 4,
	xLimit: 1000,
	yLimit: 100,
	movementX: 30,
	movementY: 1,
	directionX: 1,
	directionY: 1,
	fly: null,
	spawn: function(mobType) {
		if (this.flies < this.maxFlies) {
			console.log("create fly");
			this.fly = scene.physics.add.sprite(150, 150, "mobFly");
			//this.flies++;
		}
		return this.fly;
	},
	respawn: function() {
		this.posNow.x = -20;
		this.posNow.y = 900 * Math.random();
	},
	getNextPos: function() {
		if (this.posNow.x > this.xLimit) {
			this.directionX = -1;
		} else if (this.posNow.x < 5) {
			this.directionX = 1;
		}
		if (this.posNow.y > this.yLimit) {
			this.directionY = -1;
		} else if (this.posNow.y < 5) {
			this.directionY = 1;
		}
		let iNewX = this.posNow.x + (this.movementX * this.directionX);
		let iNewY = this.posNow.y + (this.movementY * this.directionY);
		this.posNow = pos(iNewX, iNewY);
		
		return this.posNow;
	}
}