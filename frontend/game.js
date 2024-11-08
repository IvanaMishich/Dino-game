
let sc = 0

function preload() {
    this.load.image('Dino', 'static/images/Dino.png');
    this.load.image('background', 'static/images/Background.png');
    this.load.image('enemy1', 'static/images/enemy1.png');
    this.load.image('enemy2', 'static/images/enemy2.png');
    this.load.image('enemy3', 'static/images/enemy3.png');
    this.load.image('enemy4', 'static/images/enemy4.png');
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
    this.load.image('tree', 'static/images/tree.png');
}

function enemies_way(enemy) {
    enemy.minX = enemy.x - 500;
    enemy.maxX = enemy.x;
    enemy.speed = 300;
    enemy.direction = -1;
}

function enemies_finalway(enemy) {
    enemy.minX = enemy.x - 500;
    enemy.maxX = enemy.x;
    enemy.speed = 600;
    enemy.direction = -1;
}

function enemies_direction(enemy) {
    if (enemy.x <= enemy.minX) {
        enemy.direction = 1;
        enemy.setFlipX(true);
    } else if (enemy.x >= enemy.maxX) {
        enemy.direction = -1;
        enemy.setFlipX(false);
    }
    enemy.setVelocityX(enemy.speed * enemy.direction);
}

function sushi_way(sushi) {
    sushi.minY = sushi.y;
    sushi.maxY = sushi.y + 20;
    sushi.speed = 45;
    sushi.direction = -1;
}

function sushi_direction(sushi) {
    if (sushi.y <= sushi.minY) {
        sushi.direction = 1;
    } else if (sushi.y >= sushi.maxY) {
        sushi.direction = -1;
    }
    sushi.setVelocityY(sushi.speed * sushi.direction);
}

function ScoreToBackend(score) {
    this.physics.pause()
    if (playerID) {
        fetch('/players/${playerID}/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({score})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Score updated successfully:', data);
            })
            .catch(error => {
                console.error('Error updating score:', error);
            });
    } else {
         console.log("Player not logged in, score not sent.");
    }
}
function create() {
    this.background = this.add.tileSprite(0, 0, 12000, game.config.height, 'background').setOrigin(0, 0);
    this.cameras.main.setBounds(0, 0, 12000, game.config.height);

    this.sushiGroup = this.physics.add.group();
    this.sushiGroup.create(500, 200, 'sushi1');
    this.sushiGroup.create(1500, 300, 'sushi2');
    this.sushiGroup.create(2500, 150, 'sushi3');
    this.sushiGroup.create(3900, 450, 'sushi4');
    this.sushiGroup.create(4500, 220, 'sushi5');
    this.sushiGroup.create(3400, 250, 'sushi1');
    this.sushiGroup.create(5100, 220, 'sushi2');
    this.sushiGroup.create(5600, 130, 'sushi3');
    this.sushiGroup.create(6500, 350, 'sushi4');
    this.sushiGroup.create(6900, 120, 'sushi5');
    this.sushiGroup.create(7600, 250, 'sushi1');
    this.sushiGroup.create(8200, 220, 'sushi2');
    this.sushiGroup.create(8900, 450, 'sushi4')

    this.sushiGroup.children.iterate((sushi) => {
        sushi_way(sushi);
    });

    this.stoneGroup = this.physics.add.staticGroup();
    this.stoneGroup.create(500, 495, 'stone1').setSize(100, 150);
    this.stoneGroup.create(1100, 428, 'stone2').setSize(100, 250);
    this.stoneGroup.create(1750, 480, 'stone3').setSize(100, 150);
    this.stoneGroup.create(3000, 380, 'stone4').setSize(230, 320);
    this.stoneGroup.create(4600, 460, 'stone5').setSize(130, 180);
    this.stoneGroup.create(6200, 428, 'stone2').setSize(100, 250);
    this.stoneGroup.create(6800, 495, 'stone1').setSize(100, 150);
    this.stoneGroup.create(7300, 380, 'stone4').setSize(230, 320);
    this.stoneGroup.create(8350, 460, 'stone5').setSize(130, 180);
    this.stoneGroup.create(10200, 428, 'stone2').setSize(100, 250);

    this.enemy1 = this.physics.add.sprite(2500, 520, 'enemy1').setOffset(20, 15);
    this.enemy2 = this.physics.add.sprite(3800, 520, 'enemy2').setOffset(20, 15);
    this.enemy3 = this.physics.add.sprite(5800, 530, 'enemy3').setOffset(20, 20);
    this.enemy4 = this.physics.add.sprite(9100, 520, 'enemy4').setOffset(20, 20);
    this.enemy5 = this.physics.add.sprite(8100, 520, 'enemy1').setOffset(20, 15);
    this.enemy6 = this.physics.add.sprite(9900, 520, 'enemy2').setOffset(20, 15);
    this.enemy1.setCollideWorldBounds(true);
    this.enemy2.setCollideWorldBounds(true);
    this.enemy3.setCollideWorldBounds(true);
    this.enemy4.setCollideWorldBounds(true);
    this.enemy5.setCollideWorldBounds(true);
    this.enemy6.setCollideWorldBounds(true);

    enemies_way(this.enemy1);
    enemies_way(this.enemy2);
    enemies_way(this.enemy3);
    enemies_finalway(this.enemy4);
    enemies_finalway(this.enemy5);
    enemies_finalway(this.enemy6);

    this.tree = this.physics.add.staticImage(11700, 300, 'tree');

    this.player = this.physics.add.sprite(0, 500, 'Dino');
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.world.setBounds(0, 0, 12000, 600);

    this.physics.add.collider(this.player, this.sushiGroup, collectSushi, null, this);
    this.physics.add.collider(this.player, this.stoneGroup);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(6000, game.config.height - 5, null).setDisplaySize(12000, 10).setSize(12000, 20).refreshBody().setAlpha(0);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy1, this.ground);
    this.physics.add.collider(this.enemy2, this.ground);
    this.physics.add.collider(this.enemy3, this.ground);
    this.physics.add.collider(this.enemy4, this.ground);
    this.physics.add.collider(this.enemy5, this.ground);
    this.physics.add.collider(this.enemy6, this.ground);

    this.physics.add.collider(this.player, this.enemy1, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy2, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy3, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy4, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy5, hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy6, hitEnemy, null, this);
}

function collectSushi(player, sushi) {
    sushi.disableBody(true, true); // Make the sushi disappear
    sc += 1;
}

function hitEnemy(player, enemy) {
  if (player.y < enemy.y - enemy.height/2) {
      enemy.setTint(0xff0000);
      this.physics.pause();
      this.anims.pauseAll();
      this.time.delayedCall(80, () => {
          enemy.disableBody(true, true);
          this.physics.resume();
          this.anims.resumeAll();
      });
  } else {
      this.physics.pause();
      player.setTint(0xff0000);

      sc = 0;
  }
}

function update() {
    if (this.player.body.touching.down) {
        this.jumpsinair = 0;
    }
    if (this.cursors.left.isDown) {
        this.player.setFlipX(true);
        this.player.setVelocityX(-320);
        this.cameras.main.stopFollow();
    } else if (this.cursors.right.isDown) {
        this.player.setFlipX(false);
        this.player.setVelocityX(320);
    } else {
        this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.jumpsinair <= 1) {
        this.player.setVelocityY(-450);
        this.jumpsinair++;
    }

    if (this.player.x > game.config.width / 2 && this.cameras.main.scrollX < this.background.width - game.config.width) {
        this.cameras.main.scrollX = this.player.x - game.config.width / 2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.1;
    }

    if (this.player.x > 11700) {
        ScoreToBackend(sc)
    }

    enemies_direction(this.enemy1);
    enemies_direction(this.enemy2);
    enemies_direction(this.enemy3);
    enemies_direction(this.enemy4);
    enemies_direction(this.enemy5);
    enemies_direction(this.enemy6);

    this.sushiGroup.children.iterate((sushi) => {
        if (sushi.active) {
            sushi_direction(sushi);
        }
    });
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
