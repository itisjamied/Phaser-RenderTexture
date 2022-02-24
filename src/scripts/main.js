import Phaser from 'phaser';
import MenuScene from './Scenes/MenuScene';
import GameScene from './Scenes/GameScene';
/* 
Pseudocode
Opening Screen
- Game title opens up + +
Player 
- Stagnant player in the center of screen (limit movement/create boundaries??)
- Item selections mechanic (menu of 2 items) (1234 /  scroll wheel)
- Player (right clicks) and shoots desired food item at customer
Customer
- Pre-load character off screen (generate randomly coming from any direction, put into a list of customers) 
- 4 conditions - left, right, top, bottom (handy notes)
- Move into center
- Has a desire for one food item
- When given that item, the customer fades out of the screen and is removed from list.
Scores
- Running count of how many customers are correct and how many wrong or missed.
- Add one to the displayed score/tips
Pause, Load, Menu
- Add a pause menu to the game, pausing all the movements and actions and timer
 */
// Set configuration for phaser game instance
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 720,
  backgroundColor: '#FFA633',

  //magical #s (bad coding)

  // Add physics, arcade, scene, and audio
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  scene: [MenuScene, GameScene],
  //add menu scen back to array for start menu
  audio: {
    disableWebAudio: true,
  },
};

// Initialize game instance
new Phaser.Game(config);
