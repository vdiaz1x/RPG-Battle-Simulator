/*
|--------------------------------------------------------------------------
|RPG Battle Simulator
|--------------------------------------------------------------------------
*/

// RPG Battle Simulator based on old school turn-based RPGs mixed with modern mobile game design
// as well as thematic UI/UX elements.
// inspiration for turn-based system from games like Final Fantasy 1
// inspiration for mobile game design from games like Fate/Grand Order
// inspiration for thematic UI/UX from Persona 5

/*
|--------------------------------------------------------------------------
| Pseudo Code
|--------------------------------------------------------------------------
*/

// Landing Page
// greet player
// ask them if brave or coward
// if coward, game over, reset to greet player
// if brave, continue with character select

// Character Select
// display with boss enemies to face and ally avatars
// select one boss
// select 4 allies
// go to battle phase

// Battle Phase

// Pre-Battle
// display with avatars of Enemy and Allies
// display with Enemy HP/MP progress meter and Ally HP/MP progress meter
// display with Turn Number and Turn Order
// display with attack for avatar 1 pops up
// attack selection- select avatar attack from choice
// character attack choice in order, first to last
// confirm attack choices
// enter battle phase

// Battle Phase
// order of damage dealing determined by turn order (speed implemented as post MVP)
// first ally deals damage to boss
// boss HP set in beginning, each attack has set amount of damage
// calc for damage is current boss HP = boss HP - ally attack damage
// (implement randomizer function and buff/debuff damage in post MVP)
// after attack, win con function checks for boss HP
// if boss HP <= 0, win
// if boss HP > 0, next ally attacks
// loop continues until all allies attack
// after all allies attack, if boss HP > 0, boss deals damage to allies
// boss damage is single target or aoe (implementation ?)
// boss damage pattern dependent on turn order (dependent on HP post MVP)
// if ally HP <= 0, ally dead status (cannot attack)
// if no allies have HP > 0, party dead and lose con

// Post-Battle
// win con- boss fades, display win message (display loot post MVP)
// lose con- party grayed out, lose message
// after messages, display restart message
// select restart- go back to character select screen

/*
|--------------------------------------------------------------------------
| JQuery Document.ready()
|--------------------------------------------------------------------------
*/

$(() => {
// beginning

  /*
  |--------------------------------------------------------------------------
  | Useful/Test Functions
  |--------------------------------------------------------------------------
  */

  function l(log) {
    console.log(log);
  }

  /*
  |--------------------------------------------------------------------------
  | Initialize Characters
  |--------------------------------------------------------------------------
  */

  // attack objects to put into classes

  class Attack {
    constructor(name, dmg, cost) {
      this.name = name;
      this.dmg = dmg;
      this.cost = cost;
    }
  }

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

  // one class for all ally/bosses
  // with relevant stats
  class Being {
    constructor(name, element, atk, img, id) {
      this.name = name;
      this.totalHP = 1000;
      this.currentHP = this.totalHP;
      this.totalMP = 10;
      this.currentMP = this.totalMP;
      this.element = element;
      this.attack = atk;
      this.img = img;
      this.id = id;
    }
    // methods
  }

  // extend being into ally
  class Ally extends Being {
    constructor(name, element, atk, img, id, position) {
      super(name, element, atk, img, id);
      this.meterHP = '.HP-meter-ally';
      this.meterMP = '.MP-meter-ally';
      this.progress = '.progress';
      this.counter = '.counter';
      this.nameSlot = '.name-ally';
      this.position = position;
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
  }

  const fire = new Ally('blargh', 'fire', fireATK, 'ally1', '#status-ally1', 'block1');
  const water = new Ally('fish', 'water', waterATK, 'ally2', '#status-ally2', 'block2');
  const air = new Ally('birb', 'air', airATK, 'ally3', '#status-ally3', 'block3');
  const earth = new Ally('stone', 'earth', earthATK, 'ally4', '#status-ally4', 'block4');

  const allyList = [fire, water, air, earth];

  // extends being into boss
  class Boss extends Being {
    constructor(name, element, atk, img, id, position) {
      super(name, element, atk, img, id);
      this.meterHP = '.HP-meter-enemy';
      this.meterMP = '.MP-meter-enemy';
      this.progress = '.boss-progress';
      // this.counter = '.counter';
      // this.nameSlot = '.name-ally';
      this.position = position;
      this.widthHP = 100;
      this.widthMP = 70;
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
      return `${this.id} ${this.meterHP} ${this.counter}`;
    }
    counterFindBossMP() {
      return `${this.id} ${this.meterMP} ${this.counter}`;
    }
  }

  const abraxes = new Boss('Abraxes', 'darkness', fireATK, 'abraxes', '#enemy-meter');

  // l(abraxes);

  /*
  |--------------------------------------------------------------------------
  | Battle Functions
  |--------------------------------------------------------------------------
  */

  const allySpace1 = $('#ally-avatar1 .ball');
  const allySpace2 = $('#ally-avatar2 .ball');

  const bossSpace = $('#enemy-avatar');

  // generating images on battle screen
  function imgGen(ally1, ally2, boss) {
    allySpace1.addClass(ally1.img);
    allySpace2.addClass(ally2.img).addClass('size');
    // l(boss)

    bossSpace.addClass(boss.img);
  }
  imgGen(fire, water, abraxes);

  // generating HP/MP bars for allies/bosses
  function statusGen(ally) {
    // gets HP/MP values from ally

    // puts HP/MP count into counter boxes
    $(ally.counterFindAllyHP()).text(ally.totalHP);
    $(ally.counterFindAllyMP()).text(ally.totalMP);

    // puts name into name slot
    $(ally.nameSlot).text(`${ally.name}`);
  }
  statusGen(fire);

  // attack select

  const atkList = [];
  const attacks = [];

  /*
  |--------------------------------------------------------------------------
  | Click Events
  |--------------------------------------------------------------------------
  */

  //

  /*
  |--------------------------------------------------------------------------
  | Attack Select
  |--------------------------------------------------------------------------
  */

  // how to select which character to get moves from
  $('.atk-block').on('click', clickAlly);

  function clickAlly() {
    $('#attack').show();
    const id = $(this).attr('id');

    // help from jason , get url for prototype.find
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const currentAlly = allyList.find(ally => ally.position === id);
    // for (ally of allyList) {
    //   if (ally.position === id) {
    //     currentAlly = ally;
    //   }
    // }

    if (atkList.length < 4 && atkList.indexOf(currentAlly.attack) === -1) {
      atkList.push(currentAlly.attack);
    }

    // help from jason
    // http://api.jquery.com/jquery.each/
    $('.atk-choice').each((i, el) => {
      $(el).text(currentAlly.attack[i].name);
    });

    $(this).off('click');
  }

  // how to select which attack to use
  $('.atk-choice').on('click', clickAttack);

  function clickAttack() {
    $('#attack').hide();

    const atkId = `#${$(this).attr('id')}`;

    let currentATK;

    for (atkArr of atkList) {
      for (atk of atkArr) {
        if (atk.name === $(atkId).text()) {
          currentATK = atk;
        }
      }
    }

    if (attacks.length < 4 && attacks.indexOf(currentATK) === -1) {
      attacks.push(currentATK);
    }
    l(attacks);

    $(this).off('click');
  }


  function turn(atkArr) {
    for (let i = 1; i <= atkArr.length; i += 1) {
      move(i);
    }
  }

  // turn()

  function move(order) {
    // order of players
    // let playerNum = attacks.length;

    // for(let i = 0; i < playerNum; i++) {
    attacks.push(fire.attack[0]);
    // l(fire.attack[0])

    damage(abraxes, attacks[0]);
    setTimeout(() => {
      l(abraxes.currentHP);

      // abraxes.currentHP -= 100;
      // abraxes.currentMP -= 10;
      // l(abraxes.currentHP);
      // l(abraxes.currentMP)

      progress(abraxes, abraxes.widthHP, 'HP');
    }, 3000 * order);

    // progress(abraxes, abraxes.widthMP, 'MP');
    // }

    // progress(fire, fire.widthHP, 'HP');
    // progress(fire, fire.widthMP, 'MP')

    // (fire.constructor.name)
  }

  // move(1);

  // damage calc
  function damage(being, atkArr) {
    // l(atkArr.dmg)
    being.currentHP -= atkArr.dmg;
    return being.currentHP;
  }

  /*
  |--------------------------------------------------------------------------
  | Progress
  |--------------------------------------------------------------------------
  */

  // have progress bar listen to change in status???

  // progress meter
  // reference - https://www.w3schools.com/howto/howto_js_progressbar.asp
  function progress(being, start, meter) {
    // width of the total size of the div (80%)
    let width = start;
    // console.log(width);

    // help from jason
    // object destructuring
    const { name } = being.constructor;

    // the decrementation of the progress bar
    const percent = setInterval(frame, 50);
    // const counter = setInterval(countdown, 50)

    // function for calculation of the decrement step
    function frame() {
      // l((being.currentHP/being.totalHP)*80);
      // if width is less than ratio of current HP (to be reflected on the bar), stop
      // l(start)
      if (width <= (being[`current${meter}`] / being[`total${meter}`]) * start) {
        // console.log((being[`current${meter}`] / being[`total${meter}`]) * width)
        // stops any more decrements
        clearInterval(percent);
        //  otherwise, decrement the meter
      } else {
        // ratio for decrementation
        width -= (being[`current${meter}`] / being[`total${meter}`]);
        // l(being[`current${meter}`])
        // using decrement ratio to change the actual size of the progress bar div
        $(being[`meterFind${name}${meter}`]()).css('width', `${width}%`);
        // l(being[`meterFiname}${meter}`]());
      }
    }

    function countdown() {
      $(being.counterFindAllyHP()).text(fire.currentHP);
      $(being[`counterFind${name}${meter}`]()).text(being.currentHP);
    }
  }

// test
// let p = $('#status-ally1 div .progress');
// progress(p, fire);

// end
});

/*
|--------------------------------------------------------------------------
| Time Log
|--------------------------------------------------------------------------
*/

// pseudo code - 1hr
// basic skeleton framing - 3.75 hr
// advanced styling - //
// adding jquery to eslint - 1 hr
// adding more jquery functionality -9.5 hr
// updating readme - .5 hr
// jquery syntax - .5 hr
