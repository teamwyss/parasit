
var bgGrass;
let isDebug = true;
let textDebug;
let mobFly;
let mobFlytrapZero = null;
let mobFlytrapTrapGroup = null;
let flySpin = 0;

var settings = {
	inventory: {
		plantsAvailable: 4,
		isAddPlant: function() {
			//d ebugger;
			let iNow = this.plantsAvailable;
			this.plantsAvailable = Math.max(0, this.plantsAvailable - 1);
			return iNow > 0;
		}
	}
};

var timer = {
	_isClickOk: true,
	resetClick: function() {
		this._isClickOk = true;
	},
	canClick: function() {
		return this._isClickOk;
	},
	doClick: function() {
		this._isClickOk = false;
		//this.clickTimer = 
		setTimeout(function(){
			timer.resetClick();
		}, 1000);
	}
}

var config = {
    type: Phaser.AUTO,
    backgroundColor: '#008800',
    window: {
    	w: window.innerWidth - 2,
    	h: window.innerHeight - 4
    },
    map: {
    	width: 4000,
    	height: 4000
    },
    scale: {
        _mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        width: window.innerWidth - 2,
        height: window.innerHeight - 2
    },
    dom: {
        createContainer: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
		default: 'arcade',
		arcade: {
			debug: true
		}
	}
};

var controls;

var game = new Phaser.Game(config);
var scene;

function preload () {
	scene = this;
	scene.load.image('bgGrass', '../img/bg.grass.png');
	//scene.load.image('mobFlytrapBaby01', '../img/mob.flytrapBaby.01.svg');
	//scene.load.image('mobFlytrapBaby02', '../img/mob.flytrapBaby.02.svg');
	//scene.load.image('mobFlytrapBaby03', '../img/mob.flytrapBaby.03.svg');
	//scene.load.image('mobFlytrap', '../img/mob.flytrap.png');
	//scene.load.image('mobFlytrap', '../img/mob.flytrap.sprite.svg');
	scene.load.image('mobFly', '../img/mob.fly.svg');
	scene.load.image('itemPoo', '../img/item.poo.png');
	this.load.spritesheet("mobFlytrap", '../img/mob.flytrap.sprite.svg', { frameWidth: 275, frameHeight: 275 });
	this.load.spritesheet("mobFlytrapTrap", '../img/mob.flytrap.trap.svg', { frameWidth: 100, frameHeight: 100 });
}

function create () {
	/*
	TODO Finish this to make cursor a seed... 	cursor: url('../img/cursor.crosshairs.png') 16 16, crosshair;
	document.body.style.cursor = "url(../img/cursor.seed.png)";
	*/
	
	mobFlytrapTrapGroup = this.physics.add.staticGroup({
        key: 'health',
        frameQuantity: 10,
        immovable: true
    });
	
	//document.querySelector("*").style.cursor = "url(../img/cursor.crosshairs.png)";
	
    bgGrass = scene.add.tileSprite(0, 0, 4000, 4000, "bgGrass"); //TODO change this to game
	bgGrass.fixedToCamera = false;
	//mobFlytrap = this.add.sprite(300, 300, "mobFlytrap");
	
	let itemPoo = scene.add.image(200, 200, 'itemPoo');
	itemPoo.setScale(0.5);
    var sf = 0.5; //TODO Orphans?
    var px = 64;

    this.cameras.main.setBounds(0, 0, 4000, 4000);

    var cursors = scene.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: scene.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.5,
        drag: 0.002,
        maxSpeed: 0.5
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    textDebug = scene.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
    
	//DO NOT DELETE let frX = this.anims.generateFrameNumbers('mobFlytrap', { start: 0, end: 4 });
	//DO NOT DELETE scene.anims.create({ key: 'grow', frames: frX, frameRate: 0.1, repeat: 0 });
    //let frX = this.anims.generateFrameNumbers('mobFlytrapTrap', { start: 0, end: 4 });
    let frSnap = this.anims.generateFrameNumbers('mobFlytrapTrap', {frames:[3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0]});
    scene.anims.create({ key: 'snapLoop', frames: frSnap, frameRate: 90, repeat: 3 });

    let frSnapClosed = this.anims.generateFrameNumbers('mobFlytrapTrap', {frames:[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]});
    scene.anims.create({ key: 'snapClosed', frames: frSnapClosed, frameRate: 50, repeat: 0 });
    mobFly = mobManager.spawn("fly");
}
function flyCollision(mobFly, mobFlytrapTrapSrc) {
	debugger;
	console.error("AAAAAAEUUUUUUWWWWW COLLLLLLLISSSSIOINNNN");
	mobFlytrapTrapSrc.body.debugBodyColor = 0xffffff;
	mobFly.body.debugBodyColor = 0x000000;
	mobFlytrapTrapSrc.anims.play("snapClosed");
	//mobFly.destroy();
	//mobFly = mobManager.spawn("fly");
	mobManager.respawn();
}
function update (time, delta) {
	var pointer = scene.input.activePointer;
	
	if (pointer.isDown) {
		// If statement nesting required for debugging.
		if (timer.canClick()) {
			if (settings.inventory.isAddPlant()) {
				timer.doClick();
				//mobFlytrap = this.load.spritesheet(pointer.worldX, pointer.worldY, "mobFlytrap", { frameWidth: 275, frameHeight: 275 });
				//mobFlytrap = scene.physics.add.sprite(pointer.worldX, pointer.worldY, "mobFlytrap");
				mobFlytrap = scene.physics.add.sprite(0, 0, "mobFlytrap");
				//mobFlytrap.addChild(game.make.sprite(-50, -50, mobFlytrap_trap"));
				//mobFlytrap.addChild(scene.add.sprite(-50, -50, "mobFlytrap_trap"));
				//debugger;
				//game.physics.enable(mobFlytrap, Phaser.Physics.ARCADE);
				containerPlant = scene.add.container(pointer.worldX, pointer.worldY);
				mobFlytrap.setFrame(2);
				containerPlant.add(mobFlytrap);
				let aoTrap = [
					{x: -24, y: -89, r: 350},
					{x: 92, y: 80, r: 130},
					{x: -95, y: 57, r: 258}
				];
				for (let iT = 0; iT < 3; iT++) {
					let oTrap = aoTrap[iT];
					let mobFlytrapTrap = scene.add.sprite(pointer.worldX + oTrap.x, pointer.worldY + oTrap.y, "mobFlytrapTrap");
					//mobFlytrapTrap.enableBody()
					//debugger;
					
					
					mobFlytrapTrapGroup.add(mobFlytrapTrap);
					this.physics.add.overlap(mobFly, mobFlytrapTrapGroup, flyCollision);
					
					mobFlytrapTrap.setScale(0.50, 0.50);
					mobFlytrapTrap.angle = oTrap.r;
					
					
					mobFlytrapTrap.setInteractive();

					/*mobFlytrapTrap.on('pointerover', () => {
						console.log('pointerover');
						mobFlytrapTrap.anims.play("snapClosed");
					}); */
					
					mobFlytrapTrap.anims.play("snapLoop");
					mobFlytrapTrap.drawDebug = true;
					mobFlytrapTrap.body.setSize(20, 20, true);
					mobFlytrapTrap.body.setOffset(40, 40);
					//containerPlant.add(mobFlytrapTrap);
					scene.add.sprite(-50, -50, "mobFlytrapTrap");
					//d ebugger;
				}
				//mobFlytrap.anims.play("grow");
				if (mobFlytrapZero == null) {
					mobFlytrapZero = mobFlytrap;
					//mobManager.beginMoveToTarget(pos(100, 100), pos(pointer.worldX, pointer.worldY));
				}
			}    
		}    
	}
	//player.anims.currentFrame.index === 3
	controls.update(delta);
	//mobManager.move();
	//d ebugger;
	if (mobFlytrapZero != null) {
		//this.physics.moveToObject(mobFly, mobFlytrapZero, 100)
		//this.physics.moveTo(mobFly, mobFlytrapZero.x, mobFlytrapZero.y, mobManager.getDrift());
		let oNex = mobManager.getNextPos();
		mobFly.setPosition(oNex.x,oNex.y);
		mobFly.setAngle(flySpin);
		flySpin = flySpin + 74;
	}
    textDebug.setText([
        'x: ' + pointer.x,
        'y: ' + pointer.y,
        'mid x: ' + pointer.midPoint.x,
        'mid y: ' + pointer.midPoint.y,
        'velocity x: ' + pointer.velocity.x,
        'velocity y: ' + pointer.velocity.y,
        'movementX: ' + pointer.movementX,
        'movementY: ' + pointer.movementY,
        "worldX: " + pointer.worldX
    ]);
}

