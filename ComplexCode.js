/* Filename: ComplexCode.js
   Content: Complex JavaScript code implementing a web-based game */

// Define global variables
var canvas, ctx;
var player;
var enemies;
var bullets;
var score;

// Initialize the game
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  player = new Player();
  enemies = [];
  bullets = [];
  score = 0;

  // Initialize event listeners for key presses
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Start the game loop
  setInterval(update, 10);
}

// Main game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update player position
  player.update();

  // Update enemy positions
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();

    // Check for collision with player
    if (player.collidesWith(enemies[i])) {
      gameOver();
      return;
    }

    // Check for collision with bullets
    for (var j = 0; j < bullets.length; j++) {
      if (bullets[j].collidesWith(enemies[i])) {
        // Increase score and remove enemy/bullet
        score += 10;
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        break;
      }
    }
  }

  // Update bullet positions
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update();

    // Remove bullets that move off screen
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }

  // Render player, enemies, and bullets
  player.render();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].render();
  }
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].render();
  }

  // Render score
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 30);
}

// Handle keydown event
function handleKeyDown(event) {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  } else if (event.key === "Space") {
    player.shoot();
  }
}

// Handle keyup event
function handleKeyUp(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    player.stopMoving();
  }
}

// Game over
function gameOver() {
  // Stop the game loop and show game over screen
  clearInterval(update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Game Over", canvas.width/2 - 120, canvas.height/2);
  ctx.font = "24px Arial";
  ctx.fillText("Final Score: " + score, canvas.width/2 - 80, canvas.height/2 + 40);
}

// Player class
function Player() {
  this.x = canvas.width/2;
  this.y = canvas.height - 50;
  this.width = 50;
  this.height = 50;
  this.speed = 5;
  this.isMovingRight = false;
  this.isMovingLeft = false;

  // Update player position
  this.update = function() {
    if (this.isMovingRight && this.x + this.width < canvas.width) {
      this.x += this.speed;
    } else if (this.isMovingLeft && this.x > 0) {
      this.x -= this.speed;
    }
  };

  // Move player right
  this.moveRight = function() {
    this.isMovingRight = true;
  };

  // Move player left
  this.moveLeft = function() {
    this.isMovingLeft = true;
  };

  // Stop player movement
  this.stopMoving = function() {
    this.isMovingRight = false;
    this.isMovingLeft = false;
  };

  // Shoot bullet
  this.shoot = function() {
    bullets.push(new Bullet(this.x + this.width/2, this.y));
  };

  // Check collision with other objects
  this.collidesWith = function(object) {
    return this.x < object.x + object.width &&
           this.x + this.width > object.x &&
           this.y < object.y + object.height &&
           this.y + this.height > object.y;
  };

  // Render player on canvas
  this.render = function() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Enemy class
function Enemy(x, y, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;

  // Update enemy position
  this.update = function() {
    this.y += this.speed;
  };

  // Check collision with other objects
  this.collidesWith = function(object) {
    return this.x < object.x + object.width &&
           this.x + this.width > object.x &&
           this.y < object.y + object.height &&
           this.y + this.height > object.y;
  };

  // Render enemy on canvas
  this.render = function() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Bullet class
function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.width = 5;
  this.height = 15;
  this.speed = 10;

  // Update bullet position
  this.update = function() {
    this.y -= this.speed;
  };

  // Check collision with other objects
  this.collidesWith = function(object) {
    return this.x < object.x + object.width &&
           this.x + this.width > object.x &&
           this.y < object.y + object.height &&
           this.y + this.height > object.y;
  };

  // Render bullet on canvas
  this.render = function() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Initialize the game
init();