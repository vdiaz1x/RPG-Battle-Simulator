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
	alert('hello');
});
