
var bgGrass;
/*
var windowSettings = {
	player: {
		speedXY: 300
	}
};
*/
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

function preload ()
{
    //this.load.image('einstein', 'assets/pics/ra-einstein.png');
    //game.load.image('bgGrass', '../img/bgGrass.png');
    this.load.image('bgGrass', '../img/bgGrass.png');
}

function create ()
{
    var smileys = [ 'u needa eat plonts','parasit rocks','yay its working','yeet roflol' ];

    //var iBgW = 64 * 64;
	//var iBgH = iBgW;
    //bgGrass = game.add.tileSprite(0, 0, iBgW, iBgH, 'bgGrass');
    //bgGrass = this.add.tileSprite(0, 0, config.map.width, config.map.height, 'bgGrass'); //TODO change this to game
    //bgGrass = this.add.tileSprite(0, 0, 4000, 4000, 'bgGrass'); //TODO change this to game
    bgGrass = this.add.tileSprite(0, 0, 4000, 4000, "bgGrass");
	bgGrass.fixedToCamera = false;
	
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
}

function update (time, delta)
{
    controls.update(delta);
}
