import Phaser from 'phaser';

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'line');

    scene.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setScale(0.5);

    return this;
  }

  update() {
    const point1 = {
      x: this.scene.game.input.mousePointer.x,
      y: this.scene.game.input.mousePointer.y,
    };
    const point2 = {
      x: this.scene.game.config.width / 2,
      y: this.scene.game.config.height / 2,
    };

    const angle = Phaser.Math.Angle.BetweenPoints(point1, point2) - Phaser.Math.DegToRad(90);
    const distance = Phaser.Math.Distance.BetweenPoints(point1, point2);
    const interpolatedDistance = range(5, 500, 0.1, 0.6, distance);

    this.setScale(interpolatedDistance);

    this.setRotation(angle);
  }
}
