export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let playerCollider = Bodies.circle(this.x, this.y, 40, {
      isSensor: false,
      label: "playerCollider",
    });
    let playerSensor = Bodies.circle(this.x, this.y, 48, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.scene.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  static preload(scene) {
    scene.load.atlas(
      "tank",
      "../src/assets/images/tank_atlas.png",
      "../src/assets/images/tank_atlas.json"
    );
  }

  update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.scene.inputKeys.left.isDown) {
      this.angle += -1;
    } else if (this.scene.inputKeys.right.isDown) {
      this.angle += 1;
    }
    if (this.scene.inputKeys.up.isDown) {
      playerVelocity.setToPolar(this.rotation, 1);
    } else if (this.scene.inputKeys.down.isDown) {
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
