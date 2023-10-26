import MainScene from "./MainScene.js";

const config = {
  width: window.screen.availWidth,
  height: window.screen.availHeight,
  backgroundColor: "#999999",
  type: Phaser.AUTO,
  parent: "bolojs-game",
  scene: [MainScene],
  scale: { zoom: 1 },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin.default,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};

new Phaser.Game(config);
