import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", "../src/assets/images/bolosprites64.png");
    this.load.tilemapTiledJSON("map", "../src/assets/maps/test-map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const tileset = map.addTilesetImage("bolosprites64", "tiles", 64, 64, 0, 0);

    const bottom = map.createLayer("Bottom", tileset, 0, 0).setScale(1);
    const top = map.createLayer("Top", tileset, 0, 0).setScale(1);

    top.setCollisionByProperty({ collides: true });
    bottom.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(top);
    this.matter.world.convertTilemapLayer(bottom);

    this.player = new Player({
      scene: this,
      x: 300,
      y: 300,
      texture: "tank",
      frame: "tank1",
    }).setScale(0.85);

    this.cameras.main.setBounds(0, 0, "100%", "100%");
    this.cameras.main.startFollow(this.player, true, 1, 1);
  }

  update() {
    this.player.update();
  }
}
