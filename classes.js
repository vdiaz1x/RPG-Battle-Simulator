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
  new Attack('Flame', 50, 25),
  new Attack('Fireball', 200, 50),
  new Attack('Meteor', 300, 75),
  new Attack('Volcano', 400, 100),
];

const waterATK = [
  new Attack('Wave', 50, 25),
  new Attack('Waterball', 200, 50),
  new Attack('Tsunami', 300, 75),
  new Attack('Ocean', 400, 100),
];

const airATK = [
  new Attack('Gust', 50, 25),
  new Attack('Airball', 200, 50),
  new Attack('Tornado', 300, 75),
  new Attack('Hurricane', 400, 100),
];

const earthATK = [
  new Attack('Rock', 50, 25),
  new Attack('Earthball', 200, 50),
  new Attack('Earthquake', 300, 75),
  new Attack('Fissure', 400, 100),
];

const iceATK = [
  new Attack('Iceicle', 50, 25),
  new Attack('Iceball', 200, 50),
  new Attack('Avalanche', 300, 75),
  new Attack('Bliizard', 400, 100),
];

const thunderATK = [
  new Attack('Bolt', 50, 25),
  new Attack('Thunderball', 200, 50),
  new Attack('Lightning', 300, 75),
  new Attack('Storm', 400, 100),
];

const woodATK = [
  new Attack('Leaf', 50, 25),
  new Attack('Woodball', 200, 50),
  new Attack('Forest', 300, 75),
  new Attack('Wormwood', 400, 100),
];

const metalATK = [
  new Attack('Steel', 50, 25),
  new Attack('Metalball', 200, 50),
  new Attack('Magnet', 300, 75),
  new Attack('Titanium Strike', 400, 100),
];

const lightATK = [
  new Attack('Flash', 50, 25),
  new Attack('Lightball', 200, 50),
  new Attack('Burst', 300, 75),
  new Attack('Nova', 400, 100),
];

const darkATK = [
  new Attack('Darkness', 50, 25),
  new Attack('Darkball', 200, 50),
  new Attack('Extinguish', 300, 75),
  new Attack('Death', 400, 100),
];

// creating attacks for bosses
const abraxesATK = [
  new Attack('Darkness', 50, 5),
  new Attack('Gravit Well', 200, 10),
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

// creating allies
const fire = new Ally('fire', fireATK, 'ally1');
const water = new Ally('water', waterATK, 'ally2');
const air = new Ally('air', airATK, 'ally3');
const earth = new Ally('earth', earthATK, 'ally4');
const ice = new Ally('ice', iceATK, 'ally5');
const thunder = new Ally('thunder', thunderATK, 'ally6');
const wood = new Ally('wood', woodATK, 'ally7');
const metal = new Ally('metal', metalATK, 'ally8');
const light = new Ally('light', lightATK, 'ally9');
const dark = new Ally('dark', darkATK, 'ally10');

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
