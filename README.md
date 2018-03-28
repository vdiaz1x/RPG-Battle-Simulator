# RPG-Battle-Sequence
A battle sequence in the style of old school RPGs (Final Fantasy/turn-based) with a touch of modern mobage sensibilities

# Project Overview

## Project Schedule

|  Day | Deliverable | Complete? |
|---|---|--|
|Day 1: Tue| Wireframes and Priority Matrix| |
|Day 2: Wed| Project Approval /  Pseudocode / actual code| |
|Day 3: Thur| Basic Clickable Model | |
|Day 4: Fri| Working Prototype | |
|Day 5: Sat| Final Working Project | |
|Day 6: Sun| Bugs / Stylying / PostMVP | |
|Day 7: Mon| Project Presentations | |


## Project Description

This project is based off of a typical RPG boss battle. The idea is to model it after a traditional turn based combat system commonly found in JRPGS like Final Fantasy or Dragon Quest, mixed in with modern presentation a la Japanese mobile games like Fate/Grand Order and Granblue Fantasy. Also, the idea of having an exciting and thematic UI/UX for the game, like what is found in Persona 5, is appealing both in making the game stand out and also make the game flavorful from a visual standpoint.

## Wireframes

Original Brainstorm
[Part 1](https://photos.app.goo.gl/8XM3lAQa0e9YkJeC2)
[Part 2](https://photos.app.goo.gl/pTyf4iPdxnrStcbA3)
[Part 3](https://photos.app.goo.gl/FULzuRwy5mtVyA0o2)

Wireframes


## Priority Matrix

### High Priority
-Game Logic
-Win Condition

### Medium Priority
-Game Styling
-Landing Page
-Restart

## Low Priority
-Add PostMVP Features

## Game Components

### Landing Page
The idea is to start the battle with a question- if you really want to fight a monster. If you are ready, you will then select the boss you will fight, as well as your party.

### Game Initialization
When the battle is started, you will see the boss you selected earlier and your party, as well as the relevant meters for HP/MP values

### Playing The Game
The player has to select an attack from each ally. After attack selection, the allies will attack the boss, one at a time. If the boss is not dead, the boss will attack. If your party is not dead after the boss attack, then you will return to select attacks to hit the boss with.

### Winning The Game
Once the boss' HP reaches zero, you win the game. If the HP of all your allies reaches zero, you lose.

### Game Reset
After a win or loss, you will have the option to go back and select a new enemy to fight.

## MVP 
Deliverables

Landing Page with Message (Get Name)
Select Player Avatar and Allies
Battle Screen with Boss and Allies as well as HP/MP meters
Battle Damage Calculation/Display
Basic Attack Animation/Notification
Win Con Based on Boss HP <= 0
Lose Con Based on Allies' HP <= 0
Return to Boss Select Screen

## POST MVP
Planned Expansion

Adding Attacks with Buff/Debuff
Attack Damage Randomizer
Detailed Display of Status
Tooltips
Different Enemies
Expand Ally Select
Mobile View
Dialogue in Battle
Change Boss Behavior Based on HP

## Functional Components

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method. 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. 

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Component 1 | H | 10hrs| 12hrs | 12hrs |
| Total |  | 10hrs| 12hrs | 12hrs |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string | 

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.  

## jQuery Discoveries
 Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object