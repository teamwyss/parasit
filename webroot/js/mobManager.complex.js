
let mobManager = {
	maxFlies: 1,
	flies: 0,
	fly: null,
	moveX: 2,
	drift: 0,
	driftDiff: 50,
	driftDist: 5,
	driftAmp: 0,
	driftAmpMax: 50,
	origin: pos(0,0),
	dest: pos(0,0),
	spawn: function(mobType) {
		if (this.flies < this.maxFlies) {
			console.log("create fly");
			this.fly = scene.physics.add.sprite(100, 100, "mobFly");
			this.flies++;
		}
		return this.fly;
	},
	getDrift: function() {
		if (this.drift > 1000) {
			this.driftDiff = -100;
		} else if (this.drift < -1000) {
			this.driftDiff = 10;
		}
		this.drift += this.driftDiff;
		console.log(this.drift);
		debugger;
		return 100 + this.driftDiff;
	},
	move: function() {
		if (this.fly.x > 100) {
			this.moveX = -2;
		} if (this.fly.x < 10) {
			this.moveX = 2;
		} 
		this.fly.x += this.moveX;
		this.fly.y += this.moveX;
		console.log("fly :::: " + this.fly);
	},
	beginMoveToTarget: function(posOrigin, posDest) {
		this.driftAmpMaxNeg = this.driftAmpMax * -1;
		let iPxToTravel = 10;
		this.origin = posOrigin;
		this.dest = posDest;
		let fAngle = Phaser.Math.Angle.BetweenPoints(posOrigin, posDest);
		let fDist = Phaser.Math.Distance.Between(posOrigin.x, posOrigin.y, posDest.x, posDest.y);
		let posDiff = posSubtract(posDest, posOrigin);
		let nSteps = Math.ceil(fDist / iPxToTravel);
		let posPxBetween = posDivide(posDiff, nSteps);
		console.log(posToString(posPxBetween));
		this.distance = posPxBetween;
	},
	getNextPos: function() {
		let isPastX = (this.origin.x < this.dest.x);
		let isPastY = (this.origin.y < this.dest.y);
		if (isPastX || isPastY) {
			if ((this.dest.x < this.origin.x)) {
				this.distance.x = 0;
			}
			if ((this.dest.y < this.origin.y)) {
				this.distance.y = 0;
			}
			if (
				(this.driftAmp > this.driftAmpMax)
				|| (this.driftAmp < this.driftAmpMaxNeg)
			) {
				this.driftDist *= -1;
			}
			this.driftAmp += this.driftDist;
			console.log("amp:" + this.driftAmpMax + " max:" + this.driftAmpMax);
			this.origin = posMove(this.origin, posAdd(this.distance, pos(this.driftAmp, 0)));
		}	
		return this.origin;
	}
}