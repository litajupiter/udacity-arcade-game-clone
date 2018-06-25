// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    // Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;
    // Setting the Enemy speed (you need to implement)
    this.speed = speed;
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    // Updates the Enemy location (you need to implement)
    if (this.x > 505) {
      this.x = -25;
      this.speed = 150 + Math.floor(Math.random() * 222);
    }
    // Handles collision with the Player (you need to implement)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    // Loading the image by setting this.sprite to the appropriate image in the image folder
    this.sprite = 'images/char-pink-girl.png';
};

// This class requires an update(), render() and a handleInput() method.
Player.prototype.update = function(dt) {
    // Can be similiar to the one for the Enemy:
    //      You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    //      Updates the Enemy location (you need to implement)
    //      Handles collision with the Player (you need to implement)
};

Player.prototype.render = function() {
    // Use the code from the render method for the Enemy
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Left key should move the player to the left, but not off screen
    if (key == 'left' && this.x > 10) {
      this.x -= 101;
    }
    // Right key should move the player to the right, but not off screen
    if (key == 'right' && this.x < 405) {
      this.x += 101;
    }
    // Up arrow should move the player up
    if (key == 'up' && this.y > 0) {
      this.y -= 83;
    }
    // Down arrow should move the player down, but not off screen
    if (key == 'down' && this.y < 400) {
      this.y += 83;
    }
    // If the player reaches the water, the game should be reset by moving the player back to the initial location
    if (this.y < 0) {
      player.x = 203;
      player.y = 403;
    }
}


// Now instantiate your objects.
// Once you have completed implementing the Player and Enemy, you should instantiate them by:
//     Creating a new Player object
//     Creating several new Enemies objects and placing them in an array called allEnemies

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 63, 100), new Enemy(0, 147, 150), new Enemy(0, 230, 200)];

// Place the player object in a variable called player
var player = new Player(203, 403);


// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
