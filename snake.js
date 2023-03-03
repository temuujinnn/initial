// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define game variables
const blockSize = 10;
let snake = [{ x: 50, y: 50 }];
let direction = "right";
let apple = { x: 0, y: 0 };
let score = 0;

// Helper functions
function drawBlock(block) {
  ctx.fillRect(block.x, block.y, blockSize, blockSize);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateApple() {
  apple.x = getRandomInt(0, canvas.width / blockSize - 1) * blockSize;
  apple.y = getRandomInt(0, canvas.height / blockSize - 1) * blockSize;
}

function moveSnake() {
  // Move the snake in the current direction
  const head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= blockSize;
      break;
    case "down":
      head.y += blockSize;
      break;
    case "left":
      head.x -= blockSize;
      break;
    case "right":
      head.x += blockSize;
      break;
  }

  // Add the new head to the front of the snake
  snake.unshift(head);

  // Remove the tail of the snake
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    generateApple();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach(drawBlock);
}

function drawApple() {
  ctx.fillStyle = "red";
  drawBlock(apple);
}

function handleKeyDown(event) {
  switch (event.code) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
}

function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake and the apple
  drawSnake();
  drawApple();

  // Move the snake and check for collisions
  moveSnake();
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some((block) => block.x === head.x && block.y === head.y)
  ) {
    clearInterval(intervalId);
    alert("Game over! Your score is " + score);
  }
}

// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyDown);

// Start the game loop
generateApple();
const intervalId = setInterval(gameLoop, 100);