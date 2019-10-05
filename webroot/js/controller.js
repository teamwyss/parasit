
var bgGrass;
/*
var windowSettings = {
	player: {
		speedXY: 300
	}
};
*/

let isDebug = true;
let textDebug;

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

function preload () {
    this.load.image('bgGrass', '../img/bg.grass.png');
    this.load.image('mobFlytrap', '../img/mob.flytrap.png');
}

console.log("dsfdsfsdfsdfdsfsdfsdfsdf");

function create () {
	

 
	/*
	TODO Finish this to make cursor a seed... 	cursor: url('../img/cursor.crosshairs.png') 16 16, crosshair;
	document.body.style.cursor = "url(../img/cursor.seed.png)";
	*/
	
	document.querySelector("*").style.cursor = "url(../img/cursor.crosshairs.png)";
	
    bgGrass = this.add.tileSprite(0, 0, 4000, 4000, "bgGrass"); //TODO change this to game
	bgGrass.fixedToCamera = false;
	//mobFlytrap = this.add.sprite(300, 300, "mobFlytrap");
	
    var sf = 0.5; //TODO Orphans?
    var px = 64;

    this.cameras.main.setBounds(0, 0, 4000, 4000);

    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.5,
        drag: 0.002,
        maxSpeed: 0.5
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    textDebug = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
    
    
}

function update (time, delta) {
	var pointer = this.input.activePointer;
	
	if (pointer.isDown) {
		//mobFlytrap = this.add.sprite(pointer.midPoint.x, pointer.midPoint.y, "mobFlytrap");
		mobFlytrap = this.add.sprite(pointer.worldX, pointer.worldY, "mobFlytrap");
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

