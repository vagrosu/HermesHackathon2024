import { Scene, Scale } from "phaser";
import { LEVELS, SIZES } from "../../constants";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.scale.scaleMode = Scale.FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.physics.world.gravity.y = 600;

    // Constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 550;

    this.killCooldown = false;
    this.lives = 3;
    this.coins = 0;
  }

  preload() {
    this.load.image("hearts0", "assets/donkeyKong/hearts0.png");
    this.load.image("hearts1", "assets/donkeyKong/hearts1.png");
    this.load.image("hearts2", "assets/donkeyKong/hearts2.png");
    this.load.image("hearts3", "assets/donkeyKong/hearts3.png");
    this.load.image("closeButton", "assets/donkeyKong/close.png");
    this.load.image("barrel", "assets/donkeyKong/barrel.png");
    this.load.image("goal", "assets/donkeyKong/gorilla3.png");
    this.load.image("ground", "assets/donkeyKong/ground.png");
    this.load.image("platform", "assets/donkeyKong/platform.png");
    this.load.spritesheet("fire", "assets/donkeyKong/fire_spritesheet.png", {
      frameWidth: SIZES.fire.width,
      frameHeight: SIZES.fire.height,
    });
    this.load.spritesheet("player", "assets/donkeyKong/player_spritesheet.png", {
      frameWidth: SIZES.player.width,
      frameHeight: SIZES.player.height,
    });

    this.load.audio("theme", "assets/donkeyKong/game_soundtrack.mp3");
    this.load.audio("jump", "assets/donkeyKong/jump.mp3");
    this.load.audio("dead", "assets/donkeyKong/dead.mp3");
    this.load.audio("barrel", "assets/donkeyKong/barrel.mp3");
    this.load.audio("question", "assets/donkeyKong/question.mp3");
  }

  create() {
    this.onEndGame = this.scene.settings.data.onEndGame;

    this.sounds = {
      jump: this.sound.add("jump"),
      dead: this.sound.add("dead"),
      barrel: this.sound.add("barrel"),
      question: this.sound.add("question"),

      background: this.sound.add("theme", { loop: true, volume: 0.5 }),
    };
    this.sounds.background.play();

    this.levelData = LEVELS[0];

    // Ground
    this.ground = this.add.sprite(0, SIZES.screen.height - SIZES.ground.height, "ground").setOrigin(0, 0);
    this.ground.setScale(SIZES.screen.width / SIZES.ground.width, 1);
    this.physics.add.existing(this.ground, true);

    // Platforms
    this.platforms = this.physics.add.group();
    this.levelData.platformData.forEach((platform) => {
      const plat = this.platforms.create(platform.x, platform.y, "platform");
      plat.setScale(1, 0.6);
      plat.body.allowGravity = false;
      plat.body.immovable = true;
    });

    // Fires
    this.fires = this.physics.add.group();
    this.levelData.fireData.forEach((fireData) => {
      const fire = this.fires.create(fireData.x, fireData.y, "fire");
      fire.anims.create({
        key: "burn",
        frames: this.anims.generateFrameNumbers("fire", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
      fire.setScale(1.05, 1.05);
      fire.play("burn");
    });

    // Goal
    this.goal = this.physics.add.sprite(this.levelData.goal.x, this.levelData.goal.y, "goal");
    this.goal.setScale(1.5);

    // Player
    this.player = this.physics.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, "player");
    this.player.setScale(1.4);
    this.player.setCollideWorldBounds(true);
    this.player.anims.create({
      key: "walking",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.flipX = true;

    // Barrel
    this.barrels = this.physics.add.group();
    this.time.addEvent({
      delay: this.levelData.barrelFrequency * 1000,
      callback: () => {
        this.createBarrel(this.levelData.goal.x, this.levelData.goal.y);
      },
      callbackScope: this,
      loop: true,
    });

    // Collisions
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.goal, this.ground);
    this.physics.add.collider(this.goal, this.platforms);
    this.physics.add.collider(this.fires, this.platforms);
    this.physics.add.collider(this.fires, this.ground);
    this.physics.add.collider(this.barrels, this.ground);
    this.physics.add.collider(this.barrels, this.platforms);

    this.physics.add.overlap(this.player, this.fires, this.killPlayer, null, this);
    this.physics.add.overlap(this.player, this.barrels, this.killPlayer, null, this);
    this.physics.add.overlap(this.player, this.goal, this.win, null, this);

    // UI
    this.closeButton = this.add
      .image(20, 25, "closeButton")
      .setOrigin(0, 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.onEndGame) {
          this.onEndGame();
        }
      })
      .setScale(0.15);
    this.hearts = this.add.image(80, 0, "hearts3").setOrigin(0, 0).setScale(0.15);

    // Question Overlay
    this.time.addEvent({
      delay: this.levelData.questionFrequency * 1000,
      callback: () => {
        this.showQuestion();
        this.sounds.question.play();
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    // Player movement
    this.player.setVelocityX(0);

    if (this.input.keyboard.createCursorKeys().left.isDown) {
      this.player.setVelocityX(-this.RUNNING_SPEED);
      this.player.flipX = false;
      this.player.anims.play("walking", true);
    } else if (this.input.keyboard.createCursorKeys().right.isDown) {
      this.player.setVelocityX(this.RUNNING_SPEED);
      this.player.flipX = true;
      this.player.anims.play("walking", true);
    } else {
      this.player.anims.stop();
    }

    if (this.input.keyboard.createCursorKeys().up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-this.JUMPING_SPEED);
      this.sounds.jump.play();
    }

    // Remove barrels
    this.barrels.children.each((barrel) => {
      if (barrel.x <= this.levelData.playerStart.x && barrel.y >= this.levelData.playerStart.y) {
        barrel.destroy();
      }
      if (barrel.x <= 0) {
        barrel.body.setVelocityX(this.levelData.barrelSpeed);
      } else if (barrel.x >= SIZES.screen.width) {
        barrel.body.setVelocityX(-this.levelData.barrelSpeed);
      }
    });
  }

  createBarrel(goalX, goalY) {
    this.sounds.barrel.play();
    const barrel = this.barrels.getFirstDead(true, goalX, goalY, "barrel");
    barrel.body.setVelocityX(-this.levelData.barrelSpeed);
    barrel.setScale(1.5);
  }

  showQuestion() {
    this.scene.pause();

    this.scene.launch("QuestionOverlay", {
      onClose: (similarity) => {
        // console.log({ similarity });
        this.killCooldown = true;

        if (similarity < 50) {
          this.lives--;
          this.hearts.setTexture(`hearts${this.lives}`);
          console.log(`Lives remaining: ${this.lives}`);

          if (this.lives <= 0) {
            if (this.onEndGame) {
              this.onEndGame(false);
            }
          }
        }

        this.coins += similarity;

        this.time.delayedCall(3000, () => {
          this.killCooldown = false;
        });

        this.scene.resume();
      },
    });
  }

  killPlayer(player, fire) {
    if (this.killCooldown) {
      //   console.log("Kill logic skipped due to cooldown.");
      return;
    }

    console.log("Player hit!");
    this.sounds.dead.play();
    this.player.setX(this.levelData.playerStart.x);
    this.player.setY(this.levelData.playerStart.y);
    this.player.setVelocity(0, 0);
  }

  win(player, goal) {
    if (this.onEndGame) {
      this.onEndGame(true);
    }
    console.log("You win!");
  }
}
