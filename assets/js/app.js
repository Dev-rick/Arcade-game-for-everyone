let isMobile = false; // initiate as false
// device detection as the mobile version has one col fewer to be playable and a joystick with touch events
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
  isMobile = true;
}

const playmodal = document.querySelector('.playmodal');
const gameovermodal = document.querySelector('.gameovermodal');
const score = document.querySelector('.score');
const gameoverFooter = document.querySelector('.gameovermodal-footer');
const playmodalFooter = document.querySelector('.playmodal-footer');

/**
 * The gameVar object (instance of the following constructor function) provides variables for the game instead of using global variables.
 * @param {array} allEnemies - holds all enemies created by the function createEnemies();
 * @param {array} allGems - holds all Gems created by the function createGems();
 * @param {number} allHearts - holds all Hearts created by the function createHearts();
 * @param {number} gameSpeed - the speed of the enemies (will increase with a level increase)
 * @param {number} score - increments each time the player arrives at water and collects a gem
 * @param {number} numberOfTimesPlayerReachedTheWater - increments each time the player arrives at the water (different from score as the level increase should happened based on this number)
 * @param {number} level - increments each time numberOfTimesPlayerReachedTheWater % 4 === 0
 * @param {boolean} checkCollision - if true the Collision will be checked --> important to avoid that the function not runs all the the time if it is not needed
 * @param {boolean} playerReachedTheWaterCheck - if true it will be checked if the player reached the water --> important to avoid that the function not runs all the the time if it is not needed
 * @param {boolean} addingActive - makes sure that the touchevent is only added once
 * @method createEnemies(n) - creates the number of enemies entered with n
 * @method createGems(n) - creates the number of gems entered with n
 * @method createHearts(n) - creates the number of hearts entered with n
 * @method GotEaten() - if the player collited with an enemy, the player loses a life and checks if the player lost all his lifes a modal will display with his score and says he died
 * @method playerBackToStart() - resets the player position to the start position
 * @method resetTheGame() - resets the Variable of the gameVar each time the player dies
 * @method playerReachedTheWater() - if the player reached the water this method increases its score and makes sure the level increases
 * @method startTheGame() - first methode to be called when the users click the playmodalFooter, which create 3 enemies and one gem
 * @method increaseLevel() - makes sure the level increases and gems and hearts are created add the right time
 */

class VariablesForThisGame {
  constructor (allEnemies = [], allGems = [], allHearts = [], gameSpeed = 1, score = 0, numberOfTimesPlayerReachedTheWater = 0, level = 1, checkCollision = true, playerReachedTheWaterCheck = true, addingActive = true) {
    this.allEnemies = allEnemies;
    this.allGems = allGems;
    this.speedOfGame = gameSpeed;
    this.score = score;
    this.numberOfTimesPlayerReachedTheWater = numberOfTimesPlayerReachedTheWater;
    this.level = level;
    this.allHearts = allHearts;
    this.checkCollision = checkCollision;
    this.playerReachedTheWaterCheck = playerReachedTheWaterCheck;
    this.addingActive = addingActive;
  }
  createEnemies (n) {
    for (let i = 0; i < n; i++) {
      let enemy = new Enemy(0, [63, 143, 223][Math.floor(Math.random() * 3)], 150 + (this.speedOfGame * (Math.floor(Math.random() * 300))));
      this.allEnemies.push(enemy);
    }
  }
  createGems (n) {
    for (let i = 0; i < n; i++) {
      let randomNumber = isMobile ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 5)
      let gem = new Gem([20, 120, 220, 320, 420][randomNumber], [113, 193, 273][Math.floor(Math.random() * 3)], [0, 1, 2][Math.floor(Math.random() * 3)]);
      this.allGems.push(gem);
    }
  }
  createHearts (n) {
    for (let i = 0; i < n; i++) {
      let randomNumber = isMobile ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 5)
      let heart = new Heart([20, 120, 220, 320, 420][randomNumber], [123, 203, 283][Math.floor(Math.random() * 3)], [0, 1, 2][Math.floor(Math.random() * 3)]);
      this.allHearts.push(heart);
    }
  }
  GotEaeten () {
    score.innerHTML = `${this.score}`;
    const that = this;
    player.lifes -= 1;
    if (player.lifes === 0) {
      setTimeout(function () {
        gameovermodal.style.display = 'flex';
        that.checkCollision = true;
      }, 200)
    } else {
      setTimeout(function () {
        that.playerBackToStart();
        that.checkCollision = true;
      }, 200);
    }
  }
  playerBackToStart () {
    player.x = 200;
    player.y = isMobile ? 300 : 400;
    this.playerReachedTheWaterCheck = true;
    addRemovedEventListener();
  }
  resetTheGame () {
    this.score = 0;
    this.level = 1;
    this.numberOfTimesPlayerReachedTheWater = 0;
    this.allEnemies = [];
    this.allGems = [];
    this.allHearts = [];
    setTimeout(this.createEnemies.bind(gameVar), 500, 3);
    setTimeout(this.createGems.bind(gameVar), 500, 1);
    player = isMobile ? new Player(200, 300, 3) : new Player(200, 400, 3);
    this.playerReachedTheWaterCheck = true;
    this.checkCollision = true;
    addRemovedEventListener();
  }
  playerReachedTheWater () {
    this.score += 1;
    this.numberOfTimesPlayerReachedTheWater += 1;
    if (this.numberOfTimesPlayerReachedTheWater % 4 === 0) {
      this.increaseLevel();
    }
    setTimeout(this.playerBackToStart.bind(gameVar), 500);
  }
  startTheGame () {
    this.createEnemies(3);
    this.createGems(1);
    addRemovedEventListener();
    this.addingActive = false;
  }
  increaseLevel () {
    if (this.level < 5) {
      this.level += 1;
      setTimeout(this.createEnemies.bind(this), 500, 1);
      this.speed += 0.3;
    }
    if (this.score % 3 === 0) {
      setTimeout(this.createHearts.bind(this), 500, 1);
    }
    setTimeout(this.createGems.bind(this), 500, 1);
  }
}

/** Gem's the player can collect to increse his score
* Gem Class
* @param {number} x - gem's x axis position
* @param {number} y - gem's y axis position
* @param {number} pictureNumber - a random number to choose the color of the gem
* @method render() - the image rendered by the engine.js
* @method checkCollection(playerPosition,gem) - the method which checks if the player collected a gem
*/

class Gem {
  constructor (x, y, pictureNumber) {
    this.x = x;
    this.y = y;
    this.sprite = ['assets/img/Gem-Blue.png', 'assets/img/Gem-Orange.png', 'assets/img/Gem-Green.png'][pictureNumber];
    this.width = 65;
    this.height = 90;
    this.position = isMobile ? [[this.x - 50, this.x + 50], [this.y - 82, this.y - 20]] : [[this.x - 50, this.x + 50], [this.y - 42, this.y + 40]];
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }
  checkCollection (playerPosition, gem) {
    if (playerPosition[0] > this.position[0][0] && playerPosition[0] < this.position[0][1]) {
      if (playerPosition[1] > this.position[1][0] && playerPosition[1] < this.position[1][1]) {
        let indexOfGem = gameVar.allGems.indexOf(gem);
        // the gem will be removed from the list and disappears from the canvas
        gameVar.allGems.splice(indexOfGem, 1);
        gameVar.score += 1;
      }
    }
  }
}

/** Heart's the player can collect to increse its number of lifes
* Heart Class
* @param {number} x - heart's x axis position
* @param {number} y - heart's y axis position
* @method render() - the image rendered by the engine.js
* @method checkCollection(playerPosition,heart) - the method which checks if the player collected a heart
*/

class Heart {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'assets/img/Heart.png';
    this.width = 65;
    this.height = 90;
    this.position = isMobile ? [[this.x - 50, this.x + 50], [this.y - 92, this.y - 30]] : [[this.x - 50, this.x + 50], [this.y - 52, this.y + 30]];
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
  }
  checkCollection (playerPosition, heart) {
    if (playerPosition[0] > this.position[0][0] && playerPosition[0] < this.position[0][1]) {
      if (playerPosition[1] > this.position[1][0] && playerPosition[1] < this.position[1][1]) {
        let indexOfHeart = gameVar.allHearts.indexOf(heart);
        // the heart will be removed from the list and disappears from the canvas
        gameVar.allHearts.splice(indexOfHeart, 1);
        player.lifes += 1;
      }
    }
  }
}

/** Enemies our player must avoid
* Enemy Class
* @param {number} x - enemy's x axis position
* @param {number} y - enemy's y axis position
* @param {number} speed - random number generated for use in the Enemy.update() method
* @method update(dt) - an update function which makes it possible that the game runs smooth and which updates the position and the speed of the enemies
* @method render() - a render function which renders the image of the enemy
* @method checkCollision(playerPosition) - checks if the enemies position is the same as the one of the player and if it is the GotEaeten() method will be run
*/

class Enemy {
  constructor (x, y, speed) {
    this.sprite = 'assets/img/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 89;
    this.height = 71;
    this.position = [[this.x - 40, this.x + 40], [this.y - 14, this.y + 14]];
  }
  update (dt) {
    this.x += this.speed * dt;
    this.position = [[this.x - 40, this.x + 40], [this.y - 14, this.y + 14]];
    // when off canvas, reset the x axis position of enemy to move across again and to randomly position it and increase or dcrease its speed
    if (this.x > 550) {
      this.x = -100;
      this.speed = 150 + (gameVar.speedOfGame * (Math.floor(Math.random() * 300)));
      this.y = [63, 143, 223][Math.floor(Math.random() * 3)]
    }
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  checkCollision (playerPosition) {
    if (playerPosition[0] > this.position[0][0] && playerPosition[0] < this.position[0][1]) {
      if (playerPosition[1] > this.position[1][0] && playerPosition[1] < this.position[1][1]) {
        gameVar.playerReachedTheWaterCheck = false;
        gameVar.checkCollision = false;
        removeAllEventListener();
        gameVar.GotEaeten();
      }
    }
  }
}

/** The Player Class
* Player Class
* @param {number} x - player's x axis position
* @param {number} y - player's y axis position
* @param {number} lifes - displays the number of lifes the player has
* @method update() - the position of the player will be udpated
* @method render() - a render function which renders the image of the Player
* @method handleInput(key) - handles the keys or the touch moves entered as param
*/

class Player {
  constructor (x, y, lifes) {
    this.sprite = 'assets/img/char-boy.png';
    this.x = x;
    this.y = y;
    this.lifes = lifes;
    this.width = 10;
    this.height = 10;
    this.position = [this.x, this.y];
  }
  update () {
    this.position = [this.x, this.y];
  }
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '25pt Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${gameVar.score} Level: ${gameVar.level} Lifes: ${player.lifes}`, canvas.width / 2, 40);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(`Score: ${gameVar.score} Level: ${gameVar.level} Lifes: ${player.lifes}`, canvas.width / 2, 40);
  }
  handleInput (key) {
    let conditionNumberY = isMobile ? 300 : 400;
    if (key === 'up' && this.y > 0) {
      this.y -= 82;
    } else if (key === 'down' & this.y < conditionNumberY) {
      this.y += 82;
    } else if (key === 'right' && this.x < conditionNumberY) {
      this.x += 100;
    } else if (key === 'left' && this.x > 0) {
      this.x -= 100;
    } else {
      console.log('stand');
    }
    if (this.y <= -10) {
      if (gameVar.playerReachedTheWaterCheck === true) {
        console.log('check');
        gameVar.playerReachedTheWaterCheck = false;
        removeAllEventListener();
        gameVar.playerReachedTheWater();
      }
    }
  }
}

// the key listen function

function listenForKeys (e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
}

// checks if the touch event was in the area of the canvas triangle so the player moves in the right position

function move (x, y) {
  console.log(player.y)
  if (x >= 204 && x <= 304 && y >= 304 && y <= 354) {
    player.handleInput('up');
  } else if (x >= 144 && x <= 194 && y >= 364 && y <= 464) {
    player.handleInput('left');
  } else if (x >= 204 && x <= 304 && y >= 474 && y <= 524) {
    player.handleInput('down');
  } else if (x >= 314 && x <= 364 && y >= 364 && y <= 464) {
    player.handleInput('right');
  } else {
    player.handleInput('stand');
  }
}

// removes the key events when different function happen

function removeAllEventListener () {
  document.removeEventListener('keyup', listenForKeys);
}

// add the touch and key events needed

function addRemovedEventListener () {
  document.addEventListener('keyup', listenForKeys);
  if (isMobile === true && gameVar.addingActive === true) {
    canvas.addEventListener('touchstart', function (e) {
      move(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    })
  }
}

// makes sure that the game resets and the gameoverModal disappears

gameoverFooter.addEventListener('click', function () {
  gameovermodal.style.display = 'none';
  setTimeout(gameVar.resetTheGame.bind(gameVar), 500);
});

// makes sure that the game starts and the playmodal disappears

playmodalFooter.addEventListener('click', function () {
  playmodal.style.display = 'none';
  gameVar.startTheGame();
});

// generates the necessary gameVar object and player Object

const gameVar = new VariablesForThisGame([], [], [], 1, 0, 0, 1, true, true, true);
let player = isMobile ? new Player(200, 300, 3) : new Player(200, 400, 3);
