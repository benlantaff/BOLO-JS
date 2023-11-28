const { debugDraw } = require('../js/Utils');
const Phaser = require('phaser');

jest.mock('phaser', () => ({
    Game: jest.fn(),
    Scene: jest.fn(),
    Display: {
        Color: jest.fn()
    }
}));

describe('Utils', () => {
    it('debugDraw should work', () => {

        const layer = {
            renderDebug: jest.fn()
        };
  
        const scene = {
            add: {
              graphics: jest.fn().mockReturnValue({
                setAlpha: jest.fn()
              })
            }
        };

        debugDraw(layer, scene);

        expect(scene.add.graphics).toHaveBeenCalled();
        expect(layer.renderDebug).toHaveBeenCalled();
        expect(Phaser.Display.Color).toHaveBeenCalledTimes(2);
    });
});