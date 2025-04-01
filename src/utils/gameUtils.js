/**
 * Generates a random position on the grid that is not occupied by the snake
 * @param {number} gridSize - The size of the grid
 * @param {Array} snakeSegments - The current positions of snake segments
 * @returns {Array} - [x, y] coordinates for the new food
 */
export const generateRandomPosition = (gridSize, snakeSegments) => {
  // Create a set of all snake positions for efficient lookup
  const snakePositions = new Set(snakeSegments.map(segment => `${segment[0]},${segment[1]}`));
  
  let newPosition;
  do {
    // Generate random coordinates
    newPosition = [
      Math.floor(Math.random() * gridSize),
      Math.floor(Math.random() * gridSize)
    ];
  } while (snakePositions.has(`${newPosition[0]},${newPosition[1]}`));

  return newPosition;
};

/**
 * Checks if a position is outside the grid boundaries
 * @param {Array} position - [x, y] position to check
 * @param {number} gridSize - The size of the grid
 * @returns {boolean} - True if collision detected
 */
export const checkCollision = (position, gridSize) => {
  return (
    position[0] < 0 || 
    position[1] < 0 || 
    position[0] >= gridSize || 
    position[1] >= gridSize
  );
};

/**
 * Checks if a position collides with any part of the snake (except its tail if moving)
 * @param {Array} position - [x, y] position to check
 * @param {Array} snake - Array of snake segment positions
 * @returns {boolean} - True if self-collision detected
 */
export const checkSelfCollision = (position, snake) => {
  // Skip checking the tail since it will move out of the way
  for (let i = 0; i < snake.length - 1; i++) {
    if (position[0] === snake[i][0] && position[1] === snake[i][1]) {
      return true;
    }
  }
  return false;
};