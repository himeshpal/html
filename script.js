const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");

let score = 0;
let basketPosition = (gameContainer.offsetWidth - basket.offsetWidth) / 2; // Center the basket
const basketSpeed = 20;

// Set the initial position of the basket
basket.style.left = `${basketPosition}px`;

// Event listener for basket movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= basketSpeed;
  } else if (
    e.key === "ArrowRight" &&
    basketPosition < gameContainer.offsetWidth - basket.offsetWidth
  ) {
    basketPosition += basketSpeed;
  }
  basket.style.left = `${basketPosition}px`;
});

function createFallingObject() {
  const object = document.createElement("div");
  object.classList.add("falling-object");

  // Determine if the object is a fruit or a bomb
  const isFruit = Math.random() > 0.3;
  object.classList.add(isFruit ? "fruit" : "bomb");
  object.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`;

  gameContainer.appendChild(object);

  let objectTop = 0;
  const fallSpeed = Math.random() * 3 + 2; // Randomized falling speed for variety

  const fallInterval = setInterval(() => {
    objectTop += fallSpeed;
    object.style.top = `${objectTop}px`;

    // Check if object has reached the basket level
    if (objectTop > gameContainer.offsetHeight - basket.offsetHeight - 10) {
      const basketLeftEdge = basketPosition;
      const basketRightEdge = basketPosition + basket.offsetWidth;
      const objectLeftEdge = parseFloat(object.style.left);
      const objectRightEdge = objectLeftEdge + object.offsetWidth;

      // Collision detection with basket
      if (
        objectRightEdge > basketLeftEdge &&
        objectLeftEdge < basketRightEdge
      ) {
        clearInterval(fallInterval);
        gameContainer.removeChild(object);
        updateScore(isFruit ? 1 : -1);
        return;
      }
    }

    // Remove object if it goes off-screen
    if (objectTop > gameContainer.offsetHeight) {
      clearInterval(fallInterval);
      gameContainer.removeChild(object);
      if (isFruit) updateScore(-1);
    }
  }, 20);
}

function updateScore(points) {
  score += points;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Create new falling objects at regular intervals
setInterval(createFallingObject, 1000);
