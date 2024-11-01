
function preload() {
    this.load.image('Dino', 'static/images/Dino.png');
}

function create() {
    this.player = this.physics.add.sprite(0, 500, 'Dino');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(200);
    } else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.player.setVelocityY(-400);
    } else {
        this.player.setVelocityX(0);
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);
