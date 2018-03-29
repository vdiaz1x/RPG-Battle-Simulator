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

function l(log){
	console.log(log);
}

/*
|--------------------------------------------------------------------------
| Initialize Characters
|--------------------------------------------------------------------------
*/

//image urls saved in variable for easy to read class
	const allyImg1 = 'https://cdn.shopify.com/s/files/1/0862/4240/products/1_fff69c51-5a4d-409e-b644-60268ee1570f.gif?v=1441092369';

	const bossImg1 = 'https://vignette.wikia.nocookie.net/vsbattles/images/d/dd/Demon-ffvi-ios.png/revision/latest?cb=20160816201328';

	// one class for all ally/bosses
	// with relevant stats
	class Being {
		constructor(name, element, atk1, atk1DMG, atk2, atk2DMG, img, id) {
			this.name = name;
			this.totalHP = 999;
			this.currentHP = this.totalHP;
			this.totalMP = 99;
			this.currentMP = this.totalMP;
			this.element = element;
			this.attacks = {
				atk1: atk1,
				atk1DMG: atk1DMG,
				atk2: atk2,
				atk2DMG: atk2DMG
			}
			this.img = img;
			this.id = id;
		}
		// methods
	}

	// extend being into ally
	class Ally extends Being {
		constructor(name, element, atk1, atk1DMG, atk2, atk2DMG, img, id) {
			super(name, element, atk1, atk1DMG, atk2, atk2DMG, img, id);
		}
		// methods
	}

	let fire = new Ally('blargh', 'fire', 'one', 100, 'two', 200, allyImg1, '#status-ally1');
	let water = new Ally('fish', 'water', 'three', 100, 'four', 200, allyImg1, '#status-ally2');

l(fire);
l(water);

// extends being into boss
	class Boss extends Being {
		constructor(name, element, atk1, atk1DMG, atk2, atk2DMG, img, id) {
			super(name, element, atk1, atk1DMG, atk2, atk2DMG, img, id);
		}
		// methods
	}

	let abraxes = new Boss('Abraxes', 'darkness', 'Ultima', 300, 'Illumina', 400, bossImg1, '#enemy-meter');

l(abraxes);

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
	allySpace1.css('background', `url(${ally1}`);
	allySpace2.css('background', `url(${ally2}`);

	bossSpace.css('background', `url(${boss}`);
}

imgGen(fire.img, water.img, abraxes.img);

// generating HP/MP bars for allies/bosses
function statusGen(ally) {
	// gets HP/MP values from ally
	let HP = ally.HP, MP = ally.MP;
	// get relevant HP/MP meters
	let subHP = ".HP-meter-ally";
	let subMP = ".MP-meter-ally"
	let barHP = `${ally.id} ${subHP} .progress`;
	let barMP = `${ally.id} ${subMP} .progress`;
	let countHP = `${ally.id} ${subHP} .counter`;
	let countMP = `${ally.id} ${subMP} .counter`;
// puts HP/MP count into counter boxes
	$(countHP).text(ally.HP);
	$(countMP).text(ally.MP);
}

statusGen(fire);

// function turn(){

// }

//damage calc
function damage(hitPoints, attack){
	return hitPoints - attack;
}

	// progress meter
	// reference - https://www.w3schools.com/howto/howto_js_progressbar.asp
	function progress(meter, being){
		// width of the total size of the div (80%)
		let width = 80;
		// the decrementation of the progress bar
		let percent = setInterval(frame, 50);

		//function for calculation of the decrement step
		function frame(){
			// l((being.currentHP/being.totalHP)*80);
			// if width is less than ratio of current HP (to be reflected on the bar), stop
			if(width <= (being.currentHP/being.totalHP)*80) {
				//stops any more decrements
				clearInterval(percent);
				//  otherwise, decrement the meter
			}else{
				// ratio for decrementation
				width-=(being.currentHP/being.totalHP);
				// using decrement ratio to change the actual size of the progress bar div
				meter.css('width', `${width}%`);
			}
		}
	}

// test
let p = $('#status-ally1 div .progress');
	progress(p, fire);

// end
});

/*
|--------------------------------------------------------------------------
| Time Log
|--------------------------------------------------------------------------
*/

// pseudo code - 1hr
// basic skeleton framing - 2 hr
// adding jquery to eslint - 1 hr
// adding more jquery functionality -2.5 hr
