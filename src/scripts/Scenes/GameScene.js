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
    this.load.image('bubble', new URL('../../assets/thought-bubble.png', import.meta.url).href);
    this.load.image('cheeseburger', new URL('../../assets/cheeseburger.png', import.meta.url).href);

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

    const rt = this.make.renderTexture({ width: 300, height: 300 });
    console.log(rt)
    const texture = rt.saveTexture('player');
    texture.add('person1', 0, 100, 100, 1500, 1500);
    texture.add('cheeseburger', 0, 120, 120, 1500, 1500);

    // texture.add('down1', 0, x, y, width, height);
    // texture.add('down2', 0, x, y, width, height);

    customerPositions.map((position) => {
      // console.log(position.x, position.y, position.img);
      const customer = new Customer(this, position.x, position.y,  texture);
      this.customers.push(customer);
      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        this.physics.world.removeCollider(collider);
        customer.body.stop();
      });
    });

    // create though bubble sprite and set it invisible
    this.bubble = this.add.sprite(500,600, 'bubble').setScale(0.15);
    this.bubble.setVisible(false);
    this.cheeseburger = this.add.sprite(250, 300, 'cheeseburger').setScale(0.10);
    this.cheeseburger.setVisible(false);
    this.customer1 = this.add.sprite(300, 300, 'person1').setScale(0.15)
    this.customer1.setVisible(false)

    this.customerGroup = this.physics.add.group();
    // for (let i = 0; i < 1; i ++) {
    this.addCustomer(true);
  // }

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

  addCustomer(isFirstcustomer){
    let customer1 = this.add.renderTexture(this.game.config.width / 4, isFirstcustomer ? this.game.config.width / 2 : 0, this.game.config.width / 6, this.game.config.height / 4);
    customer1.setOrigin(0.5);
    //this.physics.add.exisiting(customer1);
    this.customerGroup.add(customer1);
    this.drawCustomer(customer1);
  } 

  drawCustomer(customer){
    
    customer.draw(this.bubble, customer.width / 2, customer.height / 2)
  customer.draw(this.cheeseburger, customer.width - 58, customer.height - 48)
  customer.draw(this.customer1, customer.width - 80, customer.height)
  console.log(customer.width, customer.height)
  }
}
