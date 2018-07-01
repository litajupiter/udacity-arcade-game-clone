var numLives = 3;

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
    if (numLives === 0) {
      loseGame();
    }
    // Handles collision with the Player (you need to implement)
    if (this.x + 75 > player.x &&
        this.x < player.x + 75 &&
        this.y + 50 > player.y &&
        this.y < player.y + 50 &&
        numLives > 0) {
            numLives -= 1;
            console.log(numLives);
            resetGame();
    }
    if (numLives === 0) {
      loseGame();
    }
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
      resetGame();
      winGame();
    }
}

// Now instantiate your objects.
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

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.classList.toggle("visible");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.toggle("visible");
    }
}

function resetGame() {
    player.x = 203;
    player.y = 403;
}

function winGame() {
    modal.classList.toggle("visible");
    document.querySelector(".modal-text").innerHTML = `<img src="${player.sprite}"><p style="color: green;">Congratulations, you won! With ${numLives} out of 3 lives remaining!</p>`;
}

function loseGame() {
    modal.classList.toggle("visible");
    document.querySelector(".modal-text").innerHTML = `<img src="images/enemy-bug.png"><p style="color: red;">Game over, man! Better luck next time!</p>`;
}
