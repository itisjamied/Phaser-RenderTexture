import Phaser from 'phaser';
import Customer from '../Sprites/Customer';
import Line from '../Sprites/Line';
import Player from '../Sprites/Player';
import Counter from '../Sprites/Counter';

export default class GameScene extends Phaser.Scene {
  player;
  container;

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
    this.load.image('food1', new URL('../../assets/food1.png', import.meta.url).href);
    this.load.image('food2', new URL('../../assets/food2.png', import.meta.url).href);
    this.load.image('food3', new URL('../../assets/food3.png', import.meta.url).href);


  }

  create() {
    this.counter = new Counter(this, this.game.config.width / 2, this.game.config.height / 2);
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);
    this.line = new Line(this, this.game.config.width / 2, this.game.config.height / 2);
    this.createSpawnZone();

    // this.container = this.add.container(400, 300).setVisible(true);

    // create though bubble sprite and set it invisible
    this.bubble = this.add.sprite(0,0, 'bubble').setScale(0.15).setVisible(false);
    this.cheeseburger = this.add.sprite(2, 0, 'food1').setScale(0.10).setVisible(false);
    this.customer1 = this.add.sprite(-50, 55, 'person1').setScale(0.15).setVisible(false)
    this.customer2 = this.add.sprite(-50, 55, 'person2').setScale(0.15).setVisible(false)


    // this.container.add([ this.bubble, this.cheeseburger, this.customer1]);

    // this.rt = this.add.renderTexture(100, 100, 200, 150);

    // this.rt.draw(this.container)
    
    // Create an instance of a renderTexture Obj
    // const rt = this.make.renderTexture({ width: 512, height: 512 });
    // console.log(rt)
    // const texture = rt.saveTexture('player');
    // texture.add('person1', 0, 100, 100, 750, 750);
    // texture.add('cheeseburger', 0, 120, 120, 1024, 1024);

    this.customerGroup = this.physics.add.group();
    this.addCustomer(true);
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
    // console.log(position);

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
    const rt = [];
    const myTextures = [];

    let count = 0;
    for (let i = 1; i < 4; i++){
      // for (let j = 1; j < 3; j++){
        rt.push(this.add.renderTexture(this.game.config.width / 4, isFirstcustomer ? this.game.config.width / 2 : 0, this.game.config.width / 5, this.game.config.height / 4));
        this.drawTexture(rt, myTextures, i, count);
      count ++;
      // }
      rt[i - 1].setOrigin(0.5);

    }
    console.log(rt);
    // let rt = this.add.renderTexture(this.game.config.width / 4, isFirstcustomer ? this.game.config.width / 2 : 0, this.game.config.width / 5, this.game.config.height / 4);
    // rt.setOrigin(0.5);
    // this.physics.add.exisiting(rt);
    // this.customerGroup.add(myTextures);
    myTextures.map(t => {this.customerGroup.add(t)})
    //this.customerGroup.add();
    // this.drawTexture(rt);
    this.drawCustomer(myTextures);
  }

  drawTexture(rt, myTextures, i, count){
    // console.log(rt[i-1]);
    // console.log('REACHME 02');
    // for (let i = 1; i < 3; i++){
      // for (let j = 1; j < 3; j++){
        rt[i - 1].draw({
        img: 'person' + i, 
        x: (rt.width / 2) - 25,
        y: (rt.height / 2) + 25,
      });
      rt[i - 1].draw({
        img: 'food' + i, 
        x: (rt.width / 2) + 32,
        y: (rt.height / 2) - 25,
      });
      rt[i - 1].draw({
        img: 'bubble', 
        x: (rt.width / 2) + 30,
        y: (rt.height / 2) - 25,
      });
      console.log(i);
      myTextures.push(rt[i - 1].saveTexture('doodle' + count))
    // }
    // }
    console.log('REACHME 09');
    console.log(myTextures)
  }

  drawCustomer(myTextures){
    // console.log(myCustomer);
    
    rt.draw(this.bubble, (rt.width / 2) + 30, (rt.height / 2) -25);
    rt.draw(this.cheeseburger, (rt.width / 2) + 32, (rt.height / 2) -25);
    rt.draw(this.customer1, (rt.width / 2) - 25, (rt.height / 2) + 25);
    rt.setVisible(false);
    // rt.removeCollider(rt);
    rt.saveTexture('doodle1');
    console.log(rt);
    rt.draw(this.customer2, (rt.width / 2) - 25, (rt.height / 2) + 25);
    rt.saveTexture('doodle2');
    console.log(rt);





    // Generate an array of 8 random positions for the customers to spawn
    const customerPositions = [];
    for (let i = 1; i < 4; i++) {
      const position = this.getRandomPosition();
      customerPositions.push({
        x: position.x,
        y: position.y,
        img: 'person' + i,
      });
    }
    // this.rt = this.physics.add.existing(this.rt, 0);
    // this.rt.batchDraw(this.bubble, 200, 175);


    console.log(customerPositions);
    customerPositions.map((position, idx) => {
      const customer = new Customer(this, position.x, position.y, myTextures[idx].key);
      console.log(myTextures[idx].key)
      // this.rt = new Customer(this, position.x, position.y, position.img);
      this.customers.push(customer);

      const collider = this.physics.add.overlap(this.counter, customer, (counter, customer) => {
        this.physics.world.removeCollider(collider);
        customer.body.stop();
      });
    });
  }
}
