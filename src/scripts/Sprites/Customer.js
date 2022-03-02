import Phaser from 'phaser';

export default class Customer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, personIcon) {
    super(scene, x, y, personIcon);

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    // this.setCollideWorldBounds(true);
    this.setScale(0.75);

    this.scene.physics.moveToObject(this, this.scene.player, 25);

    return this;
  }

  update() {}
}
