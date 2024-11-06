
function preload() {
    this.load.image('Dino', 'static/images/Dino.png');
    this.load.image('background', 'static/images/Background.png');
    this.load.image('enemy1', 'static/images/enemy1.png');
    this.load.image('enemy2', 'static/images/enemy2.png');
    this.load.image('sushi1', 'static/images/1.png');
    this.load.image('sushi2', 'static/images/2.png');
    this.load.image('sushi3', 'static/images/3.png');
    this.load.image('sushi4', 'static/images/4.png');
    this.load.image('sushi5', 'static/images/5.png');
    this.load.image('stone1', 'static/images/s1.png');
    this.load.image('stone2', 'static/images/s2.png');
    this.load.image('stone3', 'static/images/s3.png');
    this.load.image('stone4', 'static/images/s4.png');
    this.load.image('stone5', 'static/images/s5.png');
}

function enemies_way(enemy) {
    enemy.minX = enemy.x - 500;
    enemy.maxX = enemy.x;
    enemy.speed = 200;
    enemy.direction = -1;
}

function enemies_direction(enemy) {
    if (enemy.x <= enemy.minX) {
        enemy.direction = 1;
    } else if (enemy.x >= enemy.maxX) {
        enemy.direction = -1;
    }
    enemy.setVelocityX(enemy.speed * enemy.direction);
}
function create() {
    this.background = this.add.tileSprite(0, 0, 6000, game.config.height, 'background').setOrigin(0, 0);

    this.player = this.physics.add.sprite(0, 500, 'Dino');
    this.player.setCollideWorldBounds(true);

    this.enemy1 = this.physics.add.sprite(2500, 500, 'enemy1');
    this.enemy2 = this.physics.add.sprite(3500, 500, 'enemy2');
    this.enemy1.setCollideWorldBounds(true);
    this.enemy2.setCollideWorldBounds(true);

    this.sushiGroup = this.physics.add.staticGroup();
    this.sushiGroup.create(500, 200, 'sushi1');
    this.sushiGroup.create(1500, 300, 'sushi2');
    this.sushiGroup.create(2500, 50, 'sushi3');
    this.sushiGroup.create(3500, 450, 'sushi4');
    this.sushiGroup.create(4500, 220, 'sushi5');

    this.stoneGroup = this.physics.add.staticGroup();
    this.stoneGroup.create(500, 495, 'stone1');
    this.stoneGroup.create(900, 500, 'stone2');
    this.stoneGroup.create(1400, 490, 'stone3');
    this.stoneGroup.create(2000, 500, 'stone4');
    this.stoneGroup.create(3600, 500, 'stone5');

    enemies_way(this.enemy1);
    enemies_way(this.enemy2);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.world.setBounds(0, 0, 6000, 600);

    this.physics.add.collider(this.player, this.sushiGroup, collectSushi, null, this);
    this.physics.add.collider(this.player, this.stoneGroup);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(game.config.width / 2, game.config.height - 5, null).refreshBody().setAlpha(0);
    this.physics.add.collider(this.player, this.ground);
}

function collectSushi(player, sushi) {
    sushi.disableBody(true, true); // Make the sushi disappear
}

function update() {
    if (this.player.body.touching.down) {
        this.jumpsinair = 0;
    }
    if (this.cursors.left.isDown) {
            this.player.setVelocityX(-350);
            this.cameras.main.stopFollow();
    } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(350);
    }else {
        this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpsinair < 2) {
        this.player.setVelocityY(-400);
        this.jumpsinair++;
    }

    if (this.player.x > game.config.width / 2) {
        this.cameras.main.scrollX = this.player.x - game.config.width / 2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.5;
    }
    enemies_direction(this.enemy1);
    enemies_direction(this.enemy2);
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
