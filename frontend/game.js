
let sc = 0;

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
    fetch(`/players/${playerID}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({score})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Score updated successfully:', data);
    }).catch(error => {
        console.error('Error updating score:', error);
    });
}

function create() {
    this.background = this.add.tileSprite(0, 0, 12000, game.config.height, 'background').setOrigin(0, 0);
    this.cameras.main.setBounds(0, 0, 12000, game.config.height);

    const sushiPositions = [
        { x: 500, y: 200, key: 'sushi1' },
        { x: 1500, y: 300, key: 'sushi2' },
        { x: 2500, y: 150, key: 'sushi3' },
        { x: 3900, y: 450, key: 'sushi4' },
        { x: 4500, y: 220, key: 'sushi5' },
        { x: 3400, y: 250, key: 'sushi1' },
        { x: 5100, y: 220, key: 'sushi2' },
        { x: 5600, y: 130, key: 'sushi3' },
        { x: 6500, y: 350, key: 'sushi4' },
        { x: 6900, y: 120, key: 'sushi5' },
        { x: 7600, y: 250, key: 'sushi1' },
        { x: 8200, y: 220, key: 'sushi2' },
        { x: 8900, y: 450, key: 'sushi4' },
    ];
    this.sushiGroup = this.physics.add.group();

    sushiPositions.forEach(position => {
        this.sushiGroup.create(position.x, position.y, position.key);
    });

    this.sushiGroup.children.iterate((sushi) => {
        sushi_way(sushi);
    });

    const stoneData = [
        { x: 500, y: 495, key: 'stone1', width: 100, height: 150 },
        { x: 1100, y: 428, key: 'stone2', width: 100, height: 250 },
        { x: 1750, y: 480, key: 'stone3', width: 100, height: 150 },
        { x: 3000, y: 380, key: 'stone4', width: 230, height: 320 },
        { x: 4600, y: 460, key: 'stone5', width: 130, height: 180 },
        { x: 6200, y: 428, key: 'stone2', width: 100, height: 250 },
        { x: 6800, y: 495, key: 'stone1', width: 100, height: 150 },
        { x: 7300, y: 380, key: 'stone4', width: 230, height: 320 },
        { x: 8350, y: 460, key: 'stone5', width: 130, height: 180 },
        { x: 10200, y: 428, key: 'stone2', width: 100, height: 250 }
    ];

    this.stoneGroup = this.physics.add.staticGroup();

    stoneData.forEach(data => {
        this.stoneGroup.create(data.x, data.y, data.key).setSize(data.width, data.height);
    });

    const enemyData = [
        { x: 2500, y: 490, key: 'enemy1', offsetX: 20, offsetY: 15, speed: 300, type: 'way' },
        { x: 3800, y: 490, key: 'enemy2', offsetX: 20, offsetY: 15, speed: 300, type: 'way' },
        { x: 5800, y: 490, key: 'enemy3', offsetX: 20, offsetY: 20, speed: 300, type: 'way' },
        { x: 9100, y: 490, key: 'enemy4', offsetX: 20, offsetY: 20, speed: 600, type: 'finalway' },
        { x: 8100, y: 490, key: 'enemy1', offsetX: 20, offsetY: 15, speed: 600, type: 'finalway' },
        { x: 9900, y: 490, key: 'enemy2', offsetX: 20, offsetY: 15, speed: 600, type: 'finalway' }
    ];

    this.enemyGroup = this.physics.add.group();

    enemyData.forEach(data => {
        let enemy = this.enemyGroup.create(data.x, data.y, data.key);
        enemy.setOffset(data.offsetX, data.offsetY);
        enemy.setCollideWorldBounds(true);
        if (data.type === 'way') {
            enemies_way(enemy);
        } else if (data.type === 'finalway') {
            enemies_finalway(enemy);
        }
    });

    this.tree = this.physics.add.staticImage(11700, 300, 'tree');

    this.player = this.physics.add.sprite(0, 500, 'Dino');
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.physics.world.setBounds(0, 0, 12000, 600);

    this.physics.add.collider(this.player, this.sushiGroup, collectSushi, null, this);
    this.physics.add.collider(this.player, this.stoneGroup);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(6000, game.config.height - 5, null).setDisplaySize(12000, 10).setSize(12000, 20).refreshBody().setAlpha(0);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemyGroup, this.ground);
    this.physics.add.collider(this.player, this.enemyGroup, hitEnemy, null, this);

    this.modal = this.add.graphics();
    this.modal.fillStyle(0x000000, 0.8);
    this.modal.fillRect(this.player.x - (game.config.width / 2) - 10, 0, game.config.width + 10, game.config.height);

    this.text = this.add.text(12000 - (game.config.width / 2), game.config.height / 2 - 20, 'Save your score by logging in!', { fontSize: '36px', fontFamily: 'Georgia', fill: '#ffffff' });
    this.text.setOrigin(0.5);

    this.loginButton = this.add.text(12000 - (game.config.width / 2), game.config.height / 2 + 50, 'Login', { fontSize: '34px', fontFamily: 'Georgia', fill: '#00ff00' });
    this.loginButton.setOrigin(0.5);
    this.loginButton.setInteractive({cursor: 'pointer'});
    this.loginButton.on('pointerdown', function () {
        window.location.href = '/login/';
    });

    this.registerButton = this.add.text(12000 - (game.config.width / 2), game.config.height / 2 + 100, 'Register', { fontSize: '34px', fontFamily: 'Georgia', fill: '#00ff00' });
    this.registerButton.setOrigin(0.5);
    this.registerButton.setInteractive({cursor: 'pointer'});
    this.registerButton.on('pointerdown', function () {
        window.location.href = '/register/' + '?score=' + sc
    });

     this.retryButton = this.add.text(this.player.x - 20, game.config.height / 2, 'Retry', { fontSize: '34px', fontFamily: 'Georgia', fill: '#e1fa00' });
     this.retryButton.setOrigin(0.5);
     this.retryButton.setInteractive({cursor: 'pointer'});
     this.retryButton.on('pointerdown', function () {
         window.location.href = '/';
     });

    this.top10Button = this.add.text(this.player.x - 10, game.config.height / 2 - 10, 'Top-10 players', { fontSize: '34px', fontFamily: 'Georgia', fill: '#e1fa00' });
    this.top10Button.setOrigin(0.5);
    this.top10Button.setInteractive({cursor: 'pointer'});
    this.top10Button.on('pointerdown', function () {
        window.location.href = 'top10/';
    });

    this.modal.setVisible(false);
    this.text.setVisible(false);
    this.loginButton.setVisible(false);
    this.registerButton.setVisible(false);
    this.top10Button.setVisible(false);

    this.ScoreText = this.add.text(10, 10, `SCORE: ${sc}`, { fontSize: '30px', fontFamily: 'Georgia', fill: '#ff1b79' });
}

function collectSushi(player, sushi) {
    sushi.disableBody(true, true); // Make the sushi disappear
    sc += 1;
    this.ScoreText.text = `SCORE: ${sc}`;
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

      if (!playerID) {
          this.modal = this.add.graphics();
          this.modal.fillStyle(0x000000, 0.8);
          this.modal.fillRect(player.x - (game.config.width / 2) - 10, 0, game.config.width + 10, game.config.height);
          this.text.setPosition(player.x, game.config.height / 3).setText('Game over. Save your score by logging in!');
          this.text.setDepth(10);
          this.loginButton.setPosition(player.x - 10, game.config.height / 2 - 10);
          this.loginButton.setDepth(10);
          this.registerButton.setPosition(player.x - 10, game.config.height / 2 + 40);
          this.registerButton.setDepth(10);
          this.retryButton.setPosition(player.x - 15, game.config.height / 2 + 160);
          this.retryButton.setDepth(10);
          this.top10Button.setPosition(player.x - 18, game.config.height / 2 + 100);
          this.top10Button.setDepth(10);

          this.modal.setVisible(true);
          this.text.setVisible(true);
          this.loginButton.setVisible(true);
          this.registerButton.setVisible(true);
          this.top10Button.setVisible(true);
      } else {
          ScoreToBackend.call(this, sc);
          this.modal = this.add.graphics();
          this.modal.fillStyle(0x000000, 0.8);
          this.modal.fillRect(this.player.x - (game.config.width / 2) - 10, 0, game.config.width + 10, game.config.height);
          this.retryButton.setPosition(this.player.x - 20, game.config.height / 2);
          this.retryButton.setDepth(10);
          this.top10Button.setPosition(player.x - 20, game.config.height / 2 + 60);
          this.top10Button.setDepth(10);

          this.modal.setVisible(true);
          this.retryButton.setVisible(true);
          this.top10Button.setVisible(true);

          scoreSent = true;
      }
  }
}

let scoreSent = false;

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

    if (Phaser.Input.Keyboard.JustDown(this.escape)) {
        if (this.modal.visible) {
            this.physics.resume();
            this.modal.setVisible(false);
            this.retryButton.setVisible(false);
            this.top10Button.setVisible(false);
        } else {
            this.physics.pause();
            if (this.player.x < (game.config.width / 2)) {
                this.modal = this.add.graphics();
                this.modal.fillStyle(0x000000, 0.8);
                this.modal.fillRect(0, 0, game.config.width + 10, game.config.height);
                this.retryButton.setPosition((game.config.width / 2) - 20, game.config.height / 2);
                this.retryButton.setDepth(10);
                this.top10Button.setPosition((game.config.width / 2) - 20, game.config.height / 2 + 60);
                this.top10Button.setDepth(10);

                this.modal.setVisible(true);
                this.retryButton.setVisible(true);
                this.top10Button.setVisible(true);
            } else {
                this.modal = this.add.graphics();
                this.modal.fillStyle(0x000000, 0.8);
                this.modal.fillRect(this.player.x - (game.config.width / 2) - 10, 0, game.config.width + 10, game.config.height);
                this.retryButton.setPosition(this.player.x - 20, game.config.height / 2);
                this.retryButton.setDepth(10);
                this.top10Button.setPosition(this.player.x - 20, game.config.height / 2 + 60);
                this.top10Button.setDepth(10);

                this.modal.setVisible(true);
                this.retryButton.setVisible(true);
                this.top10Button.setVisible(true);
            }
        }
    }

    if (this.player.x > game.config.width / 2 && this.cameras.main.scrollX < this.background.width - game.config.width) {
        this.cameras.main.scrollX = this.player.x - game.config.width / 2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.ScoreText.x = this.player.x + 10 - game.config.width / 2;
    }

    if (this.player.x > 11700 && !scoreSent) {
        this.physics.pause();

        if (!playerID) {
            this.modal = this.add.graphics();
            this.modal.fillStyle(0x000000, 0.8);
            this.modal.fillRect(12000 - game.config.width, 0, game.config.width + 10, game.config.height);
            this.modal.setVisible(true);
            this.text.setDepth(10);
            this.text.setVisible(true);
            this.loginButton.setDepth(10);
            this.loginButton.setVisible(true);
            this.registerButton.setDepth(10);
            this.registerButton.setVisible(true);
        } else {
            ScoreToBackend.call(this, sc);
            this.modal = this.add.graphics();
            this.modal.fillStyle(0x000000, 0.8);
            this.modal.fillRect(12000 - game.config.width, 0, game.config.width + 10, game.config.height);
            this.modal.setVisible(true);

            this.retryButton.setPosition(12000 - (game.config.width / 2), game.config.height / 2);
            this.retryButton.setDepth(10);
            this.top10Button.setPosition(12000 - (game.config.width / 2), game.config.height / 2 + 60);
            this.top10Button.setDepth(10);

            this.retryButton.setVisible(true);
            this.top10Button.setVisible(true);

            scoreSent = true;
        }
    }

    this.enemyGroup.children.iterate((enemy) => {
        if (enemy.active) {
            enemies_direction(enemy);
        }
    });

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

