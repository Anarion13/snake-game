import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';
import Score from './Score';
import GameOver from './GameOver';
import useInterval from '../hooks/useInterval';
import { generateRandomPosition, checkCollision, checkSelfCollision } from '../utils/gameUtils';

const INITIAL_SNAKE = [[4, 10], [3, 10], [2, 10]];
const INITIAL_DIRECTION = 'RIGHT';
const GRID_SIZE = 20;
const INITIAL_GAME_SPEED = 150;
const MIN_GAME_SPEED = 30;  // Increased maximum speed (highest difficulty)
const SPEED_INCREMENT = 5;  // How much to increase speed by
const SCORE_THRESHOLD = 50; // Score needed to trigger speed increase
const POINTS_PER_APPLE = 10; // Points earned for eating an apple

const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);
  
  // Add direction buffer ref
  const directionBuffer = useRef(null);
  // Add last score ref to track when to increase speed
  const lastScoreRef = useRef(0);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    // Process buffered direction if it exists
    if (directionBuffer.current) {
      setDirection(directionBuffer.current);
      directionBuffer.current = null;
    }

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
        const newScore = score + POINTS_PER_APPLE;
        setScore(newScore);
        
        // Check if we should increase speed
        if (newScore >= lastScoreRef.current + SCORE_THRESHOLD) {
          setGameSpeed(prevSpeed => {
            const newSpeed = Math.max(MIN_GAME_SPEED, prevSpeed - SPEED_INCREMENT);
            console.log(`Speed increased to ${newSpeed}ms`);
            return newSpeed;
          });
          lastScoreRef.current = newScore;
        }
        
        setFood(generateRandomPosition(GRID_SIZE, newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, score]);

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
    
    // Only process arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      if (e.key === ' ') {
        setIsPaused(prev => !prev);
      }
      return;
    }

    // Determine the new direction based on the key press
    let newDirection;
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') newDirection = 'UP';
        break;
      case 'ArrowDown':
        if (direction !== 'UP') newDirection = 'DOWN';
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') newDirection = 'LEFT';
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') newDirection = 'RIGHT';
        break;
      default:
        return;
    }

    // If we have a valid new direction, store it in the buffer
    if (newDirection) {
      directionBuffer.current = newDirection;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useInterval(moveSnake, gameOver ? null : gameSpeed);

  const resetGame = () => {
    // First set game over to false and pause the game
    setGameOver(false);
    setIsPaused(true);
    
    // Reset all other state
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE));
    setScore(0);
    setGameSpeed(INITIAL_GAME_SPEED);
    
    // Reset the refs
    directionBuffer.current = null;
    lastScoreRef.current = 0;
    
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
        <p>Game speeds up every {SCORE_THRESHOLD} points!</p>
      </div>
    </div>
  );
};

export default Game;