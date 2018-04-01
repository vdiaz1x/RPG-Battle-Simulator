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
  | Battle Functions
  |--------------------------------------------------------------------------
  */

  const allySpace1 = $('#ally-avatar1 .ball');
  const allySpace2 = $('#ally-avatar2 .ball');
  const allySpace3 = $('#ally-avatar3 .ball');
  const allySpace4 = $('#ally-avatar4 .ball');
  const bossSpace = $('#enemy-avatar');

  // generating images on battle screen
  function imgGen(ally1, ally2, ally3, ally4, boss) {
    allySpace1.addClass(ally1.img);
    allySpace2.addClass(ally2.img);
    allySpace3.addClass(ally1.img);
    allySpace4.addClass(ally1.img);
    bossSpace.addClass(boss.img);
  }

  imgGen(fire, water, air, earth, abraxes);

  // generating HP/MP bars for allies/bosses

  statusGenBoss(abraxes);

  // attack select
  let nameList = [];
  let atkList = [];
  let attacks = [];

  let turnGo = false;

  /*
  |--------------------------------------------------------------------------
  | Character Select Functions
  |--------------------------------------------------------------------------
  */

  function advChoice() {
    if ($(this).attr('id') === 'yes') {
      $('#select').show();
      $('#landing').hide();
    }
  }

  function charaSelect() {
    const dataAlly = $(this).attr('data-ally');

    const newAlly = charaList.find(ally => ally.element === dataAlly);

    switch (allyList.length) {
      case 0:
        newAlly.position = 'block1';
        newAlly.id = '#status-ally1';
        // newAlly.
        break;
      case 1:
        newAlly.position = 'block2';
        newAlly.id = '#status-ally2';
        break;
      case 2:
        newAlly.position = 'block3';
        newAlly.id = '#status-ally3';
        break;
      case 3:
        newAlly.position = 'block4';
        newAlly.id = '#status-ally4';
        break;
      default:
        break;
    }

    if (allyList.length < 4 && allyList.indexOf(newAlly) === -1) {
      allyList.push(newAlly);
    }

    $(this).addClass('selected');

    $(this).off('click');
  }

  function grabNames() {
    const first = $('#primary').val();
    const second = $('#secondary').val();
    const third = $('#ternary').val();
    const fourth = $('#quadnary').val();

    nameList = [first, second, third, fourth];
    // l(names)

    if (allyList.length === 4) {
      allyList.forEach((ally, i) => {
        ally.name = nameList[i];
      });
    }

    $('.atk-block').each((i, el) => {
      $(el).text(allyList[i].name);
      // console.log(allyList[i]);
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Battle Display Functions
  |--------------------------------------------------------------------------
  */

  function statusGen(ally) {
    // gets HP/MP values from ally

    // puts HP/MP count into counter boxes
    $(ally.counterFindAllyHP()).text(ally.totalHP);
    $(ally.counterFindAllyMP()).text(ally.totalMP);

    // puts name into name slot
    $(ally.nameFindAlly()).text(`${ally.name}`);
  }

  function statusGenBoss(boss) {
    // gets HP/MP values from ally

    // puts HP/MP count into counter boxes
    $(boss.counterFindBossHP()).text(boss.totalHP);
    $(boss.counterFindBossMP()).text(boss.totalMP);

    // puts name into name slot
    $(boss.nameFindBoss()).text(`${boss.name}`);
    // l(boss.nameFindBoss())
  }

  /*
  |--------------------------------------------------------------------------
  | Attack Select Functions
  |--------------------------------------------------------------------------
  */

  function clickAlly() {
    $('#attack').show();

    const id = $(this).attr('id');

    // help from jason , get url for prototype.find
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    // debugger;
    const currentAlly = allyList.find(ally => ally.position === id);

    if (atkList.length < 4 && atkList.indexOf(currentAlly.attack) === -1) {
      atkList.push(currentAlly.attack);
    }
    // help from jason
    // http://api.jquery.com/jquery.each
    $('.atk-choice').each((i, el) => {
      $(el).text(currentAlly.attack[i].name);
    });

    $(this).off('click');
  }

  function clickAttack() {
    $('#attack').hide();

    const atkId = `#${$(this).attr('id')}`;

    let currentATK;

    // for (atkArr of atkList) {
    // let atkArr = atkList.find(arr => arr)
    atkList.forEach((atkArr) => {
      currentATK = atkArr.find(atk => atk.name === $(atkId).text());
    });
    // currentATK = atkArr.find(atk => atk.name === $(atkId).text());
    // console.log('loop',currentATK);
    // }
    // console.log(currentATK);

    if (attacks.length < 4 && attacks.indexOf(currentATK) === -1) {
      attacks.push(currentATK);
    }

    if (attacks.length === 4) {
      turnGo = true;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Progress Function
  |--------------------------------------------------------------------------
  */

  // have progress bar listen to change in status???

  // progress meter
  // reference - https://www.w3schools.com/howto/howto_js_progressbar.asp
  // had to modify with animate
  function progress(being, meter) {
    // width of the total size of the div
    const start = being[`width${meter}`];

    const width = (being[`current${meter}`] / being[`total${meter}`]) * start;

    // help from jason
    // object destructuring
    const { name } = being.constructor;

    // the decrementation of the progress bar
    // const percent = setInterval(frame, 10);
    // const counter = setInterval(countdown, 10)

    // function for calculation of the decrement step
    // function frame() {
    // if width is less than ratio of current HP (to be reflected on the bar), stop
    // if (width <= (being[`current${meter}`] / being[`total${meter}`]) * start) {
    //   // stops any more decrements
    //   clearInterval(percent);
    //   //  otherwise, decrement the meter
    // } else {
    //   // ratio for decrementation
    //   width -= (being[`current${meter}`] / being[`total${meter}`]);
    //   // using decrement ratio to change the actual size of the progress bar div
    //   $(being[`meterFind${name}${meter}`]()).css('width', `${width}%`);
    // }

    $(being[`meterFind${name}${meter}`]()).animate({ width: `${width}%` }, { duration: 1000, easing: 'linear' });
    // }

    // function for inputting the meter counter
    $(being[`counterFind${name}${meter}`]()).text(being[`current${meter}`]);
    // }
  }

  /*
  |--------------------------------------------------------------------------
  | Damage Functions
  |--------------------------------------------------------------------------
  */

  // damage calc
  function damage(boss, ally, atk) {
    boss.currentHP -= atk.dmg;
    ally.currentMP -= atk.cost;
    progress(abraxes, 'HP');
    progress(ally, 'MP');
    $('#message').text(atk.name).show();
  }

  function bossDamage(boss, allyList) {
    allyList.forEach((ally) => {
      ally.currentHP -= boss.attack[1].dmg;
      boss.currentMP -= boss.attack[1].cost;
      progress(ally, 'HP');
      $('#message').text(boss.attack[1].name)
    });
    progress(abraxes, 'MP');
  }

  /*
  |--------------------------------------------------------------------------
  | Turn Loop Functions
  |--------------------------------------------------------------------------
  */

  let turnCounter = 1;
  $('#turn-number').text(turnCounter);

  function move(order) {
    // order of players
    damage(abraxes, allyList[order], attacks[order]);
    //   progress(abraxes, 'HP');
    //   // $('body').trigger('update');
    // }, 4000);
    // moving progress inside setTimeout makes it not work unless the multiplier from the
    // setTimeout time is removed, which makes the progress bar stutter as it goes down.
    // outside, it only works once. but then all the math for the HP deduction is done at once
  }

  function turn() {
    console.log('turn:', turnCounter);
    // idea from https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/
    (function atkLoop(i) {
      let n = i;
      setTimeout(() => {
        move(n);
        n += 1;
        if (n < 4) {
          atkLoop(n);
        }
      }, 3000);
    }(0));

    setTimeout(() => {
      bossDamage(abraxes, allyList);
    }, 15000);

    setTimeout(() => {
      if (abraxes.currentHP > 0) {
        console.log('fight');
        $('#turn-number').text(turnCounter);
        atkList = [];
        attacks = [];
        // turn();
      } else {
        console.log('win');
        clearInterval(checkTurn);
      }
    }, 18000);
    $('#message').hide();
    turnCounter += 1;
  }

  const checkStatus = setInterval(() => {
    if (allyList.length === 4 && nameList.length === 4) {
      allyList.forEach((ally) => { statusGen(ally); });
      $('#select').hide();
      $('#battle').show();
    }
  }, 1000);

  const checkTurn = setInterval(() => {
    // how to select which character to get moves from
    $('.atk-block').on('click', clickAlly);

    // how to select which attack to use
    $('.atk-choice').on('click', clickAttack);
    // l(turnGo);

    if (turnGo) {
      clearInterval(checkStatus);

      turn();
      turnGo = false;
      // clearInterval(checkTurn);
    }
  }, 5000);

  /*
  |--------------------------------------------------------------------------
  | Event Listeners
  |--------------------------------------------------------------------------
  */

  // start adventure
  $('.button').on('click', advChoice);

  // select allies to use
  $('.ally-select-square').on('click', charaSelect);

  // // how to select which character to get moves from
  // $('.atk-block').on('click', clickAlly);

  // // how to select which attack to use
  // $('.atk-choice').on('click', clickAttack);

  // get names for allies
  $('#submit-button').on('click', grabNames);

// end
});

/*
|--------------------------------------------------------------------------
| Time Log
|--------------------------------------------------------------------------
*/

// pseudo code - 1hr
// basic skeleton framing - 4 hr
// advanced styling - 4.25 hr
// adding jquery to eslint - 1 hr
// adding more jquery functionality -19.5 hr
// updating readme - .5 hr
// jquery syntax - 1 hr
