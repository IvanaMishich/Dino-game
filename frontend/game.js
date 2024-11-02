
function preload() {
    this.load.image('Dino', 'static/images/Dino.png');
    this.load.image('background', 'static/images/Background.png');
}

function create() {
    this.background = this.add.tileSprite(0, 0, window.innerWidth, game.config.height, 'background').setOrigin(0, 0);
    this.player = this.physics.add.sprite(0, 500, 'Dino');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    if (this.cursors.left.isDown) {
        if (this.player.x > game.config.width / 2) {
            this.player.setVelocityX(0);
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-210);
        } else {
            this.player.setVelocityX(-210);
        }
    } else if (this.cursors.right.isDown) {
        if (this.player.x > game.config.width / 2) {
            this.background.tilePositionX += 4;
            this.player.setVelocityX(0);
        } else {
            this.player.setVelocityX(210);
        }
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
