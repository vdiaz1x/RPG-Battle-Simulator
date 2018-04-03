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
  | Game Start
  |--------------------------------------------------------------------------
  */

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

  // putting allies into list for searching
  const charaList = [fire, water, air, earth, ice, thunder, wood, metal, light, dark];

  // creating bosses
  const abraxes = new Boss('Abraxes', 'darkness', abraxesATK, 'abraxes');

  // hard coded images for allies and boss
  const allySpace1 = $('#ally-avatar1 .avatar-img');
  const allySpace2 = $('#ally-avatar2 .avatar-img');
  const allySpace3 = $('#ally-avatar3 .avatar-img');
  const allySpace4 = $('#ally-avatar4 .avatar-img');
  const bossSpace = $('#enemy-avatar');

  imgGen(fire, water, air, earth, abraxes);

  // empty list to insert allies chosen
  let allyList = [];

  // empty lists for use later to enter names, attack lists, and actual attacks chosen
  let nameList = [];
  let atkList = [];
  let attacks = [];

  // flag for turn
  let turnGo = false;

  // turn counter starts at 1
  let turnCounter = 1;

  /*
  |--------------------------------------------------------------------------
  | Battle Functions
  |--------------------------------------------------------------------------
  */

  // generating images on battle screen
  function imgGen(ally1, ally2, ally3, ally4, boss) {
    // for each space for the allies, add the appropriate image
    allySpace1.addClass(ally1.img);
    allySpace2.addClass(ally1.img);
    allySpace3.addClass(ally1.img);
    allySpace4.addClass(ally1.img);
    bossSpace.addClass(boss.img);
  }

  /*
  |--------------------------------------------------------------------------
  | Character Select Functions
  |--------------------------------------------------------------------------
  */

  // function to start the adventure
  function advChoice() {
    if ($(this).attr('id') === 'yes') {
      // showing the next section and hiding the current one
      $('#select').show();
      $('#landing').hide();
    }
  }

  // function to select characters
  function charaSelect() {
    // grabbing the data attribute for this DOM element
    const dataAlly = $(this).attr('data-ally');

    // comparing data attribute to a list of characters to find which ally way chosen
    const newAlly = charaList.find(ally => ally.element === dataAlly);

    // if the chosen ally list is not full and the chosen ally is not in the list, add it in
    if (allyList.length < 4 && allyList.indexOf(newAlly) === -1) {
      allyList.push(newAlly);
      // adds a class to denote it has been selected
      $(this).addClass('selected');
    }

    allyList.forEach((ally, i) => {
      newAlly.position = `block${i + 1}`;
      newAlly.id = `#status-ally${i + 1}`;
    });
  }

  // function to grab the names
  function grabNames() {
    // variables to hold names from form
    const first = $('#primary').val();
    const second = $('#secondary').val();
    const third = $('#ternary').val();
    const fourth = $('#quadnary').val();

    // putting the name variables in an array for searching
    nameList = [first, second, third, fourth];

    // if the list of allies is full, give the chosen ally the name chosen
    // via the object.name property
    if (allyList.length === 4) {
      allyList.forEach((ally, i) => {
        ally.name = nameList[i];
      });
    }

    // when the names are chosen, the blocks to select the attack names
    // are filled with the ally name
    $('.atk-block').each((i, el) => {
      $(el).text(allyList[i].name);
    });

    // if the ally list is full and there are no empty names in the name list\
    // generate the status for the allies and the boss
    if (allyList.length === 4 && nameList.indexOf('') === -1) {
      allyList.forEach((ally) => { statusGen(ally); });

      statusGenBoss(abraxes);

      // hide the chara select and show the battle screen
      $('#select').hide();
      $('#battle').show();

      // adds turn counter to turn display
      $('#turn-number').text(turnCounter);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Battle Display Functions
  |--------------------------------------------------------------------------
  */

  // function to set up the counter for the ally HP
  function statusGen(ally) {
    // puts HP/MP count into counter boxes
    $(ally.counterFindAllyHP()).text(ally.totalHP);
    $(ally.counterFindAllyMP()).text(ally.totalMP);

    // puts name into name slot
    $(ally.nameFindAlly()).text(`${ally.name}`);
  }

  // function to set up the counter for the boss
  function statusGenBoss(boss) {
    // gets HP/MP values from ally

    // puts HP/MP count into counter boxes
    $(boss.counterFindBossHP()).text(boss.totalHP);
    $(boss.counterFindBossMP()).text(boss.totalMP);

    // puts name into name slot
    $(boss.nameFindBoss()).text(`${boss.name}`);
  }

  /*
  |--------------------------------------------------------------------------
  | Attack Select Functions
  |--------------------------------------------------------------------------
  */

  // function to get the attack for each ally
  function clickAlly() {
    // show the panel for all the attacks
    $('#attack').show();

    // get the id for the ally block selected
    const id = $(this).attr('id');

    // help from jason , get url for prototype.find
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    // the current ally is found inside the list of chosen allies
    // if the position matches the id of ally clicked
    const currentAlly = allyList.find(ally => ally.position === id);

    // if the attack object list is not full and the attack is not found
    // inside the attack object list
    if (atkList.length < 4 && atkList.indexOf(currentAlly.attack) === -1) {
      atkList.push(currentAlly.attack);
    }
    // help from jason
    // http://api.jquery.com/jquery.each

    // for each ally, put the names of the attacks in the attack panel
    $('.atk-choice').each((i, el) => {
      $(el).text(currentAlly.attack[i].name);
    });

    // turns off the click so the ally cannot be selected again
    $(this).off('click');
  }

  // function to get the attack that will be used
  function clickAttack() {
    // hide the attack panel
    $('#attack').hide();

    // get the id of the attack block selected
    const atkId = `#${$(this).attr('id')}`;

    let currentATK;

    // for each attack in the attack object list, the attack will be searched
    // attack search will look at each object to match an attack
    // and put it into the current attack
    atkList.forEach((atkArr) => {
      currentATK = atkArr.find(atk => atk.name === $(atkId).text());
    });

    // if the attack list is not full and the attack is not in the list, then put it in
    if (attacks.length < 4 && attacks.indexOf(currentATK) === -1) {
      attacks.push(currentATK);
    }

    // once the attack list is full, then the turn flag is turned on and the turn can begin
    if (attacks.length === 4) {
      turnGo = true;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Progress Function
  |--------------------------------------------------------------------------
  */

  // progress meter
  // reference - https://www.w3schools.com/howto/howto_js_progressbar.asp
  // had to modify with animate
  // animates the HP and MP meters
  function progress(being, meter) {
    // width of the total size of the div
    const start = being[`width${meter}`];

    // the width is the proportion of the current and total HP multiplied by the starting factor
    // to get the correct size of the progress meter
    const width = (being[`current${meter}`] / being[`total${meter}`]) * start;

    // help from jason
    // object destructuring
    // grabbing the name of the class (ally or boss)
    const { name } = being.constructor;

    // this animates the width to the size of the proportion of the meter
    $(being[`meterFind${name}${meter}`]()).animate({ width: `${width}%` }, { duration: 1000, easing: 'linear' });

    // if the number for the meter value is less than zero, put it at zero
    if (being[`current${meter}`] < 0) {
      being[`current${meter}`] = 0;
    }

    // put the counter into the correct display
    $(being[`counterFind${name}${meter}`]()).text(being[`current${meter}`]);
  }

  /*
  |--------------------------------------------------------------------------
  | Damage Functions
  |--------------------------------------------------------------------------
  */

  // function for damage calc for allies
  function damage(boss, ally, atk) {
    // subtract the attack damage from the boss current HP
    boss.currentHP -= atk.dmg;
    // subtract the cost of the attack from the ally current MP
    ally.currentMP -= atk.cost;

    // progress meter to animate the damage calc/cost
    progress(abraxes, 'HP');
    progress(ally, 'MP');

    // show the attack name
    $('#message-box').show();
    $('#attack-name').text(ally.name);
    $('#message').text(atk.name);
  }

  // function for damage calc for bosses
  function bossDamage(boss, list) {
    // for each ally, subtract the damage of the attack from the ally current HP
    list.forEach((ally) => {
      // does the math for ally HP and boss MP
      ally.currentHP -= boss.attack[1].dmg;
      boss.currentMP -= boss.attack[1].cost;

      // animate the current ally HP
      progress(ally, 'HP');
      $('#attack-name').text(boss.name);
      $('#message').text(boss.attack[1].name);
    });

    // animate the current boss MP
    progress(abraxes, 'MP');
  }

  /*
  |--------------------------------------------------------------------------
  | Turn Loop Functions
  |--------------------------------------------------------------------------
  */

  // function for moves
  function move(order) {
    // damage calc for allies
    damage(abraxes, allyList[order], attacks[order]);
  }

  function turn() {
    // idea from https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/
    // making a function that calls itself so that the moves can be called step by step rather
    // than having consecutive function calls simultaneously

    // function to loop attacks (i is entered as zero)
    // immediately invoked function expression
    (function atkLoop(i) {
      // defining variable to not use the argument itself
      let n = i;

      const allyMove = setTimeout(() => {
        // calling move function for one move
        move(n);

        // incrementing; this number is used to call the moves for the other allies
        n += 1;

        // win condition
        winCon();

        // if win con is true, make counter 4 to prematurely end the loop
        if (winCon()) {
          n = 4;
        }

        // if the counter is less than 4, the loop continues with the next move
        if (n < 4) {
          atkLoop(n);
        }
        // the initial value for i is 0, the set timeout is every 2 seconds to space out the attacks
      }, 2000);
    }(0));

    // set timeout for the boss attack
    const bossMove = setTimeout(() => {
      // if the boss has current HP > , attack
      if (abraxes.currentHP > 0) {
        // boss deals damage
        bossDamage(abraxes, allyList);
        // checking if the first ally has zero current HP
        // implied that all allies have zero HP
        if (allyList[0].currentHP === 0) {
          // show battle message message
          $('#message-box').show();
        }
      }
      // boss deals damage after 10 seconds, after all allies
    }, 10000);

    // set timeout to check after turn conditions
    const turnRestart = setTimeout(() => {
      // if the boss has > 0 current HP, continue fighting
      if (abraxes.currentHP > 0) {
        // put the turn counter on screen
        $('#turn-number').text(turnCounter);

        // hide battle message
        $('#message-box').hide();

        // reset turn metrics
        turnGo = false;
        turnCounter += 1;
        atkList = [];
        attacks = [];
        // if ally is dead
      } else {
        // console.log('win');
        clearInterval(checkTurn);
        $('#battle-end').show();
        $('#battle-end-message').text('You Win!');
        $('#message-box').hide();
      }
      // runs after all allies and boss have attacked
    }, 12000);
  }

  // function to check whether turn should run
  const checkTurn = () => {
    setInterval(() => {
      if (!turnGo) {
        // how to select which character to get moves from
        $('.atk-block').on('click', clickAlly);

        // how to select which attack to use
        $('.atk-choice').on('click', clickAttack);
      }
      // if turnGo is true, then run the turn function
      if (turnGo) {
        // calling turn function
        turn();
        // making turnGo false
        turnGo = false;
      }
      // checks every second
    }, 12000);
  };

  checkTurn();

  // function for win condition
  function winCon() {
    // if the boss' current HP is zero, then reset turn values
    if (abraxes.currentHP <= 0) {
      // resets all arrays that get used
      atkList = [];
      attacks = [];

      // resets all running intervals
      clearInterval(checkTurn);
      clearInterval(allyMove);
      clearInterval(bossMove);
      clearInterval(turnRestart);

      // hide battle message and show end message
      $('#battle-end').show();
      $('#battle-end-message').text('You Win!');
      // console.log($('#battle-end-message'));
      $('#message').hide();

      return true;
    }
    return false;
  }

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  // function to reset game
  function reset() {
    // shows landing page and hides everything else
    $('#battle-end').hide();
    $('#landing').show();
    $('#battle').hide();

    // unselects allies selected in chara select page
    $('.ally-select-square').removeClass('selected');
    // console.log($('.selected

    // removes all text from inputs
    $('input').val('');
    // // generating HP/MP bars for allies/bosses

    // resets HP and MP values for allies
    allyList.forEach((ally, i) => {
      ally.currentHP = allyList[i].totalHP;
      ally.currentMP = allyList[i].totalMP;
      // console.log(ally.meterFindAllyHP());
      $(ally.meterFindAllyHP()).css('width', `${ally.widthHP}%`);
      $(ally.meterFindAllyMP()).css('width', `${ally.widthMP}%`);
    });

    // resets HP and MP values for boss
    abraxes.currentHP = abraxes.totalHP;
    abraxes.currentMP = abraxes.totalMP;
    $(abraxes.meterFindBossHP()).css('width', `${abraxes.widthHP}%`);
    $(abraxes.meterFindBossMP()).css('width', `${abraxes.widthHP}%`);

    // resets all lists used
    nameList = [];
    atkList = [];
    attacks = [];
    allyList = [];

    // sets turn starter to false
    turnGo = false;

    // sets turn counter to zero
    turnCounter = 1;

    // checkTurn();

    //
  }

  /*
  |--------------------------------------------------------------------------
  | Event Listeners
  |--------------------------------------------------------------------------
  */

  // start adventure
  $('.button').on('click', advChoice);

  // select allies to use
  $('.ally-select-square').on('click', charaSelect);

  // how to select which character to get moves from
  $('.atk-block').on('click', clickAlly);

  // how to select which attack to use
  $('.atk-choice').on('click', clickAttack);

  // get names for allies
  $('#submit-button').on('click', grabNames);

  // reset game
  $('#reset-button').on('click', reset);

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
// adding more jquery functionality -26.5 hr
// updating readme - .5 hr
// jquery syntax - 2 hr
// presentation - 1 hr
