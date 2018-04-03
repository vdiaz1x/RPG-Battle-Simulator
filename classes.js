/*
|--------------------------------------------------------------------------
| Initialize Attacks
|--------------------------------------------------------------------------
*/

// creating the Attack class to se for making attacks
class Attack {
  constructor(name, dmg, cost) {
    this.name = name;
    this.dmg = dmg;
    this.cost = cost;
  }
}

// creating attacks for allies
const fireATK = [
  new Attack('Flame', 20, 10),
  new Attack('Fireball', 100, 20),
  new Attack('Meteor', 300, 30),
  new Attack('Volcano', 400, 40),
];

const waterATK = [
  new Attack('Wave', 20, 10),
  new Attack('Waterball', 100, 20),
  new Attack('Tsunami', 300, 30),
  new Attack('Ocean', 400, 40),
];

const airATK = [
  new Attack('Gust', 20, 10),
  new Attack('Airball', 100, 20),
  new Attack('Tornado', 300, 30),
  new Attack('Hurricane', 400, 40),
];

const earthATK = [
  new Attack('Rock', 20, 10),
  new Attack('Earthball', 100, 20),
  new Attack('Earthquake', 300, 30),
  new Attack('Fissure', 400, 40),
];

const iceATK = [
  new Attack('Icicle', 20, 10),
  new Attack('Iceball', 100, 20),
  new Attack('Avalanche', 300, 30),
  new Attack('Bliizard', 400, 40),
];

const thunderATK = [
  new Attack('Bolt', 20, 10),
  new Attack('Thunderball', 100, 20),
  new Attack('Lightning', 300, 30),
  new Attack('Storm', 400, 40),
];

const woodATK = [
  new Attack('Leaf', 20, 10),
  new Attack('Woodball', 100, 20),
  new Attack('Forest', 300, 30),
  new Attack('Wormwood', 400, 40),
];

const metalATK = [
  new Attack('Steel', 20, 10),
  new Attack('Metalball', 100, 20),
  new Attack('Magnet', 300, 30),
  new Attack('Titanium Strike', 400, 40),
];

const lightATK = [
  new Attack('Flash', 20, 10),
  new Attack('Lightball', 100, 20),
  new Attack('Burst', 300, 30),
  new Attack('Nova', 400, 40),
];

const darkATK = [
  new Attack('Darkness', 20, 10),
  new Attack('Darkball', 100, 20),
  new Attack('Extinguish', 300, 30),
  new Attack('Death', 400, 40),
];

// creating attacks for bosses
const abraxesATK = [
  new Attack('Darkness', 20, 5),
  new Attack('Gravity Well', 300, 1.5),
  new Attack('Eruptor', 300, 15),
  new Attack('Blood Bath', 400, 20),
];

/*
|--------------------------------------------------------------------------
| Initialize Beings
|--------------------------------------------------------------------------
*/

// one class for all allies/bosses with relevant stats
class Being {
  constructor(element, atk, img) {
    this.name;
    this.totalHP = 1000;
    this.currentHP = this.totalHP;
    this.totalMP = 100;
    this.currentMP = this.totalMP;
    this.element = element;
    this.attack = atk;
    this.img = img;
    this.id;
  }
  // methods
}

// extend being into ally
class Ally extends Being {
  constructor(element, atk, img) {
    super(element, atk, img);
    this.meterHP = '.HP-meter-ally';
    this.meterMP = '.MP-meter-ally';
    this.progress = '.progress';
    this.counter = '.counter';
    this.nameSlot = '.name-ally';
    this.position;
    this.widthHP = 80;
    this.widthMP = 80;
    // this.being = "Ally";
  }
  // methods
  meterFindAllyHP() {
    return `${this.id} ${this.meterHP} ${this.progress}`;
  }
  meterFindAllyMP() {
    return `${this.id} ${this.meterMP} ${this.progress}`;
  }
  counterFindAllyHP() {
    return `${this.id} ${this.meterHP} ${this.counter}`;
  }
  counterFindAllyMP() {
    return `${this.id} ${this.meterMP} ${this.counter}`;
  }
  nameFindAlly() {
    return `${this.id} ${this.nameSlot}`;
  }
}

// extends being into boss
class Boss extends Being {
  constructor(name, element, atk, img) {
    super(element, atk, img);
    this.name = name;
    this.meterHP = '.HP-meter-enemy';
    this.meterMP = '.MP-meter-enemy';
    this.progress = '.boss-progress';
    this.counter = '.boss-counter';
    this.nameSlot = '.name-boss';
    // this.position = 'enemy-meter';
    this.widthHP = 100;
    this.widthMP = 70;
    this.id = '#enemy-meter';
    // this.being = "Boss";
  }
  // methods
  meterFindBossHP() {
    return `${this.id} ${this.meterHP} ${this.progress}`;
  }
  meterFindBossMP() {
    return `${this.id} ${this.meterMP} ${this.progress}`;
  }
  counterFindBossHP() {
    return `${this.id} ${this.meterMP} ${this.counter} #boss-HP`;
  }
  counterFindBossMP() {
    return `${this.id} ${this.meterMP} ${this.counter} #boss-MP`;
  }
  nameFindBoss() {
    return `${this.id} ${this.nameSlot}`;
  }
}
