import Phaser from 'phaser';
import Customer from '../Sprites/Customer';
import Line from '../Sprites/Line';
import Player from '../Sprites/Player';
import Counter from '../Sprites/Counter';

export default class GameScene extends Phaser.Scene {
  player;

  constructor() {
    super({
      key: 'GameScene',
    });
    this.customers = [];
    this.spawnZone;
  }

  preload() {
    this.load.image('player', new URL('../../assets/player.png', import.meta.url).href);
    this.load.image('counter', new URL('../../assets/counter.png', import.meta.url).href);
    this.load.image('line', new URL('../../assets/line.png', import.meta.url).href);
    this.load.image('start', new URL('../../assets/burger.png', import.meta.url).href);
    this.load.image('person1', new URL('../../assets/person1.png', import.meta.url).href);
    this.load.image('person2', new URL('../../assets/person2.png', import.meta.url).href);
    this.load.image('person3', new URL('../../assets/person3.png', import.meta.url).href);
    this.load.image('person4', new URL('../../assets/person4.png', import.meta.url).href);
    this.load.image('person5', new URL('../../assets/person5.png', import.meta.url).href);
    this.load.image('person6', new URL('../../assets/person6.png', import.meta.url).href);
    this.load.image('person7', new URL('../../assets/person7.png', import.meta.url).href);
    this.load.image('person8', new URL('../../assets/person8.png', import.meta.url).href);
  }

  create() {
    this.counter = new Counter(this, this.game.config.width / 2, this.game.config.height / 2);
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    this.line = new Line(this, this.game.config.width / 2, this.game.config.height / 2);
    this.createSpawnZone();

    const customerPositions = [];
    for (let i = 1; i < 9; i++) {
      const position = this.getRandomPosition();
      customerPositions.push({
        x: position.x,
        y: position.y,
        img: 'person' + i,
      });
    }

    customerPositions.map((position) => {
      console.log(position.x, position.y, position.img);
      const customer = new Customer(this, position.x, position.y, position.img);
      this.customers.push(customer);
      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        this.physics.world.removeCollider(collider);
        customer.body.stop();
      });
    });
  }

  update() {
    this.line.update();
    this.customers.map((customer) => {
      customer.update();
    });
  }

  getRandomPosition() {
    const position = {
      x: Math.floor(Math.random() * 960),
      y: Math.floor(Math.random() * 720),
    };

    const isInZone = this.spawnZone.contains(position.x, position.y);
    console.log(position);

    if (!isInZone) {
      return this.getRandomPosition();
    }

    return position;
  }

  createSpawnZone() {
    const { height, width } = this.game.config;
    const counterBody = this.counter.body;
    // var graphics = this.add.graphics();

    // extend this further than Counter
    const counterPositions = [
      [width / 2 - counterBody.width / 2, height / 2 - counterBody.height / 2],
      [width / 2 - counterBody.width / 2, height / 2 + counterBody.height / 2],
      [width / 2 + counterBody.width / 2, height / 2 + counterBody.height / 2],
      [width / 2 + counterBody.width / 2, height / 2 - counterBody.height / 2],
    ];

    var polygon = new Phaser.Geom.Polygon([
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
      [0, 0],
      counterPositions[0],
      counterPositions[1],
      counterPositions[2],
      counterPositions[3],
      counterPositions[0],
      [0, 0],
    ]);

    this.spawnZone = polygon;
  }
}
