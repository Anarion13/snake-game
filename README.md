# Snake Game

A classic Snake game built with React where the player controls a snake that grows when eating food.

## Project Structure

- `src/components/`: Contains all React components for the game:
  - `Game.js`: The main game component managing game state and logic
  - `Board.js`: The game board where the snake moves
  - `Snake.js`: Component for rendering the snake segments
  - `Food.js`: Component for rendering the food item
  - `Score.js`: Component for displaying the current score
  - `GameOver.js`: Component shown when the game ends
  
- `src/hooks/`: Custom React hooks:
  - `useInterval.js`: A custom hook for handling setInterval with React's lifecycle

- `src/utils/`: Helper functions:
  - `gameUtils.js`: Contains utility functions for game logic (collision detection, random food generation)

- `src/tests/`: Contains test files for each component

## Game Features

- A grid-based game board
- Snake movement controlled by arrow keys
- Food that appears randomly on the board
- Score tracking
- Game over when snake hits the wall or itself
- Ability to pause the game with the space bar
- Game restart option after game over

## How to Play

- Use arrow keys (↑, ↓, ←, →) to control the snake's direction
- Press the space bar to pause/resume the game
- Eat the red food to grow the snake and score points
- Avoid hitting the walls or the snake's own body