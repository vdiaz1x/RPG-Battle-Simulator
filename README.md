# RPG-Battle-Sequence
A battle sequence in the style of old school RPGs (Final Fantasy/turn-based) with a touch of modern mobage sensibilities

# Project Overview

## Project Schedule

|  Day | Deliverable | Complete? |
|---|---|--|
|Day 1: Tue| Wireframes and Priority Matrix | Yes |
|Day 2: Wed| Project Approval | Yes |
| | Pseudocode | Yes |
| | Basic Structure (Skeleton)| Yes |
|Day 3: Thur| Basic Structure/Style (Visual Design)| Yes |
| | Basic Functionality (Clicks)| Yes|
| | Landing Page | Yes |
|Day 4: Fri| Battle Logic | Yes |
| | Win/Lose Logic | Yes |
|Day 5: Sat| Reset Logic | Yes |
|Day 6: Sun| Bugs | |
| | Stylying | |
| | PostMVP | |
|Day 7: Mon| Finish Bugs| Yes |
|Day 8: Tues| Project Presentations | |


## Project Description

This project is based off of a typical RPG boss battle. The idea is to model it after a traditional turn based combat system commonly found in JRPGS like Final Fantasy or Dragon Quest, mixed in with modern presentation a la Japanese mobile games like Fate/Grand Order and Granblue Fantasy. Also, the idea of having an exciting and thematic UI/UX for the game, like what is found in Persona 5, is appealing both in making the game stand out and also make the game flavorful from a visual standpoint.

## Wireframes

### Original Brainstorm

[Part 1](https://photos.app.goo.gl/8XM3lAQa0e9YkJeC2)

[Part 2](https://photos.app.goo.gl/pTyf4iPdxnrStcbA3)

[Part 3](https://photos.app.goo.gl/FULzuRwy5mtVyA0o2)

### Wireframes


## Priority Matrix

### High Priority
- Game Logic (Battle Calculation and Turn Loop)
- Win Condition

### Medium Priority
- Basic Game Styling
- Landing Page
- Restart

## Low Priority
- Advanced Game Styling
- Add PostMVP Features

## User Stories

### Landing Page

- As a player, I want to be able to see a beginning and enter a choice whether I want to play

### Game Initialization

- As a player, I expect to have a character select screen to select who I am playing as, as well as choose my enemy

### Playing The Game

- As a player, I want to see all the visuals needed to play (status/life totals for allies and for enemies)
- As a player, I expect that selecting my moves for my turn to be simple
- As a player, I expect to see indication of my attacks working
- As a player, I want to see good visual effects

### Winning The Game

- As a player, I expect to see a confirmation of winning
- As a player, I expect to see a confirmation of losing

### Game Reset

- As a player, I want to see a way to return to the character select screen and fight again

## Game Components

### Landing Page
The idea is to start the battle with a question- if you really want to fight a monster. If you are ready, you will then select the boss you will fight, as well as your party.

### Game Initialization
When the battle is started, you will see the boss you selected earlier and your party, as well as the relevant meters for HP/MP values

### Playing The Game
The player has to select an attack from each ally. After attack selection, the allies will attack the boss, one at a time. If the boss is not dead, the boss will attack. If your party is not dead after the boss attack, then you will return to select attacks to hit the boss with.

#### Battle Start
- Display Enemy and Allies
- Select Ally Attack, One at a Time
- Confirm Ally Attack Selection

#### Battle Sequence
- Allies Attack, One at a Time
- Boss HP Goes Down With Every Attack
- If Boss HP > 0, Boss Attacks Allies. Else, Boss dies (Win Con)
- If Ally HP < 0, Ally Cannot Attack. If All Allies' HP < 0, No Allies Can Attack (Lose Con).
- If Both Boss and Allies' HP > 0, Turn Over And Next Attack Phase Begins (Battle Start)

#### Post-Battle
- Battle Message Depending on Win or Lose Con
- After Battle Message, Option to Go Back to Main Character Selection

### Winning The Game
Once the boss' HP reaches zero, you win the game. If the HP of all your allies reaches zero, you lose.

### Game Reset
After a win or loss, you will have the option to go back and select a new enemy to fight.

## MVP

### Deliverables

- Landing Page with Message (Get Name)
- Select Player Avatar and Allies
- Battle Screen with Boss and Allies as well as HP/MP meters
- Battle Damage Calculation/Display
- Basic Attack Animation/Notification
- Win Con Based on Boss HP <= 0
- Lose Con Based on Allies' HP <= 0
- Return to Ally Select Screen

## POST MVP

### Planned Expansion

- Adding Attacks with Buff/Debuff
- Attack Damage Randomizer
- Detailed Display of Status
- Tooltips
- Different Enemies
- Expand Ally Select
- Mobile View
- Dialogue in Battle
- Change Boss Behavior Based on HP

## Functional Components 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Game Logic | H | 20hrs| 00hrs | 24hrs |
| (Progress) | H | 3hrs| 00hrs | 4hrs |
| (Turn Order) | H | 3hrs| 00hrs | 10hrs |
| (Classes) | H | 3hrs| 00hrs | 2hrs |
| (On-screen) | H | 4hrs| 00hrs | 4hrs |
| (Damage) | H | 4hrs| 00hrs | 2hrs |
| (Misc) | H | 3hrs| 00hrs | 4hrs |
| Win Condition | H | 4hrs| 00hrs | 4hrs |
| Basic Game Styling | M | 6hrs| 00hrs | 6hrs |
| Landing Page | M | 00hrs| 2hrs | 2hrs |
| Restart | M | 00hrs| 00hrs | 4hrs |
| Total |  | 34hrs| 00hrs | 40hrs |
| Advanced Game Styling | L | 5hrs| 00hrs | 00hrs |
| PostMVP | L | 10hrs| 00hrs | 00hrs |
| Super Total |  | 50hrs| 00hrs | 00hrs |

My time estimates were way off. Also, I underestimated the scope and difficulty of this project.

## Helper Functions

| Function | Description | 
| --- | :---: |  
| Progress | Tracks progress of a quantity | 

## Additional Libraries
 JQuery - for DOM manipulation and other useful functions

## Code Snippet

```javascript
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
```

I found the basic structure of this immediately invoking function expression that executes a setTimeout one after the other, rather than simultaneously. I had to heavily modify it for my use, but it still served as a solid base to make the game loop for the ally attacks. Basically, it has a parameter i, which you immediately pass an argument of zero at the end. Using a counter equal to the initial input, you use it inside a setTimeout where the move function is called with the argument of the counter. inside the setTimeout, increment the counter. The win con function is checked; if the win con is true, then the counter is set to a condition to end the loop. Otherwise, if the counter is less than 4, the function is called again. The way the function is structured, the next function call won't activate until the first function calll is completed, giving the illusion of stacking attacks in order.

## jQuery Discoveries

.each - loops through DOM elements grabbed by JQuery
.off - removes event handlers made through .on

## Change Log

I had to scale back the project a bit. I could not really implement the postMVP, although the main project is more or less done.

## Issues and Resolutions

### Major Issue - Game Loop

Unlike the high-low game, I could not pause the game via user input- the attacks had to be executed one after the other without making it simultaneous. Unlike the tic tac toe, the loop was not a simple player 1/player 2 situation. I found a way to do the loop with a recursive self invoking function.

### Major Issue - Creating Characters

Instead of creating objects for all of my characters, I made classes. I realized that the attacks also warranted their own class as well. However, whenever I had to change my code to make it more extendable, I had to edit the class definition. Using classes did make it easier to do any editing on my characters, though.

#### Error/Resolution

**ERROR**: eslint regenerator-runtime, prefer iteration to loops                             
**RESOLUTION**: Instead of using for...of loops for arrays, I used forEach

**ERROR**: eslint object deconstructing                     
**RESOLUTION**: I had to switch the way I got the class name for my objects (minor semantic detail)

**ERROR**: eslint function used before it was declared            
**RESOLUTION**: I moved function declarations higher up

## References

Final Fantasy 1 for basic layout
Jason for several functions
https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/ for IIFE
https://www.w3schools.com/howto/howto_js_progressbar.asp for basic progress meter
