
var bgGrass;
let isDebug = true;
let textDebug;

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
	this.load.spritesheet("mobFlytrap", '../img/mob.flytrap.sprite.svg', { frameWidth: 275, frameHeight: 275 });
}

function create () {
	/*
	TODO Finish this to make cursor a seed... 	cursor: url('../img/cursor.crosshairs.png') 16 16, crosshair;
	document.body.style.cursor = "url(../img/cursor.seed.png)";
	*/
	
	//document.querySelector("*").style.cursor = "url(../img/cursor.crosshairs.png)";
	
    bgGrass = scene.add.tileSprite(0, 0, 4000, 4000, "bgGrass"); //TODO change this to game
	bgGrass.fixedToCamera = false;
	//mobFlytrap = this.add.sprite(300, 300, "mobFlytrap");
	
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
    
    let frX = this.anims.generateFrameNumbers('mobFlytrap', { start: 0, end: 4 });
    scene.anims.create({ key: 'grow', frames: frX, frameRate: 0.1, repeat: 0 });

}

function update (time, delta) {
	var pointer = scene.input.activePointer;
	
	if (pointer.isDown) {
		// If statement nesting required for debugging.
		if (timer.canClick()) {
			if (settings.inventory.isAddPlant()) {
				timer.doClick();
				//mobFlytrap = this.load.spritesheet(pointer.worldX, pointer.worldY, "mobFlytrap", { frameWidth: 275, frameHeight: 275 });
				mobFlytrap = scene.add.sprite(pointer.worldX, pointer.worldY, "mobFlytrap");
				mobFlytrap.anims.play("grow");
			}    
		}    
	}    
	controls.update(delta);

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

