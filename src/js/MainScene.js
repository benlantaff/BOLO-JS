import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.player = new Player({
      scene: this,
      x: 200,
      y: 200,
      texture: "tank",
      frame: "tank1",
    }).setScale(0.5);
  }

  update() {
    this.player.update();
  }
}
