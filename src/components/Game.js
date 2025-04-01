import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Score from './Score';
import GameOver from './GameOver';
import useInterval from '../hooks/useInterval';
import { generateRandomPosition, checkCollision, checkSelfCollision } from '../utils/gameUtils';

const INITIAL_SNAKE = [[4, 10], [3, 10], [2, 10]];
const INITIAL_DIRECTION = 'RIGHT';
const GRID_SIZE = 20;
const GAME_SPEED = 150;

const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = getNewHead(prevSnake[0], direction);
      
      // Check for collisions with walls
      if (checkCollision(newHead, GRID_SIZE)) {
        console.log("Game over: Wall collision detected");
        setGameOver(true);
        return prevSnake;
      }
      
      // Check for collisions with self
      if (checkSelfCollision(newHead, prevSnake)) {
        console.log("Game over: Self collision detected");
        setGameOver(true);
        return prevSnake;
      }

      // Check if snake eats food
      const newSnake = [newHead, ...prevSnake];
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        console.log("Food eaten at position:", food);
        setScore(prev => prev + 10);
        setFood(generateRandomPosition(GRID_SIZE, newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused]);

  const getNewHead = (head, dir) => {
    switch (dir) {
      case 'UP':
        return [head[0], head[1] - 1];
      case 'DOWN':
        return [head[0], head[1] + 1];
      case 'LEFT':
        return [head[0] - 1, head[1]];
      case 'RIGHT':
        return [head[0] + 1, head[1]];
      default:
        return head;
    }
  };

  const handleKeydown = useCallback((e) => {
    e.preventDefault();
    
    // Debounce key presses to prevent too rapid direction changes
    const now = Date.now();
    if (handleKeydown.lastKeyTime && now - handleKeydown.lastKeyTime < 50) {
      return;
    }
    handleKeydown.lastKeyTime = now;
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
      default:
        break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useInterval(moveSnake, gameOver ? null : GAME_SPEED);

  const resetGame = () => {
    // First set game over to false and pause the game
    setGameOver(false);
    setIsPaused(true);
    
    // Reset all other state
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE));
    setScore(0);
    
    // Start the game after a small delay to ensure all state is updated
    setTimeout(() => {
      setIsPaused(false);
    }, 100);
    
    console.log("Game reset");
  };

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <Score score={score} />
      <Board snakeBody={snake} foodPosition={food} gridSize={GRID_SIZE} />
      {isPaused && !gameOver && <div className="pause-overlay">PAUSED</div>}
      {gameOver && <GameOver score={score} onRestart={resetGame} />}
      <div className="instructions">
        <p>Use arrow keys to move. Space to pause.</p>
      </div>
    </div>
  );
};

export default Game;