/**
 * Accepts a tilemap layer and a scene, and draws the collision tiles on the screen.
 *
 * @param {Phaser.Tilemaps.TilemapLayer} layer
 * @param {Phaser.Scene} scene
 */
export function debugDraw(layer, scene) {
  console.warn("Debug draw enabled");

  const debugGraphics = scene.add.graphics().setAlpha(0.7);
  layer.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255),
  });
}
