import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';
import Score from './Score';
import GameOver from './GameOver';
import useInterval from '../hooks/useInterval';
import { generateRandomPosition, checkCollision, checkSelfCollision, checkSnakeCollision } from '../utils/gameUtils';

const INITIAL_SNAKE = [[4, 10], [3, 10], [2, 10], [1, 10], [0, 10]];
const INITIAL_SNAKE_2 = [[15, 10], [16, 10], [17, 10]];
const INITIAL_DIRECTION = 'RIGHT';
const INITIAL_DIRECTION_2 = 'LEFT';
const GRID_SIZE = 20;
const INITIAL_GAME_SPEED = 150;
const MIN_GAME_SPEED = 30;  // Increased maximum speed (highest difficulty)
const SPEED_INCREMENT = 5;  // How much to increase speed by
const SCORE_THRESHOLD = 50; // Score needed to trigger speed increase
const POINTS_PER_APPLE = 10; // Points earned for eating an apple

const Game = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [snake2, setSnake2] = useState(INITIAL_SNAKE_2);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [direction2, setDirection2] = useState(INITIAL_DIRECTION_2);
  const [food, setFood] = useState(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE, INITIAL_SNAKE_2));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);

  // Add direction buffer refs
  const directionBuffer = useRef(null);
  const directionBuffer2 = useRef(null);
  // Add last score ref to track when to increase speed
  const lastScoreRef = useRef(0);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    // Process buffered directions if they exist
    if (directionBuffer.current) {
      setDirection(directionBuffer.current);
      directionBuffer.current = null;
    }
    if (directionBuffer2.current) {
      setDirection2(directionBuffer2.current);
      directionBuffer2.current = null;
    }

    // Move both snakes simultaneously
    setSnake(prevSnake => {
      setSnake2(prevSnake2 => {
        const newHead = getNewHead(prevSnake[0], direction);
        const newHead2 = getNewHead(prevSnake2[0], direction2);

        let snake1Dead = false;
        let snake2Dead = false;

        // Check Player 1 collisions
        if (checkCollision(newHead, GRID_SIZE) || checkSelfCollision(newHead, prevSnake)) {
          console.log("Player 1 collision detected");
          snake1Dead = true;
        }

        // Check Player 2 collisions
        if (checkCollision(newHead2, GRID_SIZE) || checkSelfCollision(newHead2, prevSnake2)) {
          console.log("Player 2 collision detected");
          snake2Dead = true;
        }

        // Check collision between snakes
        if (!snake1Dead && checkSnakeCollision(newHead, prevSnake2)) {
          console.log("Player 1 hit Player 2");
          snake1Dead = true;
        }
        if (!snake2Dead && checkSnakeCollision(newHead2, prevSnake)) {
          console.log("Player 2 hit Player 1");
          snake2Dead = true;
        }

        // Handle game over
        if (snake1Dead || snake2Dead) {
          setGameOver(true);
          if (snake1Dead && snake2Dead) {
            setWinner("TIE");
          } else if (snake1Dead) {
            setWinner("PLAYER 2");
          } else {
            setWinner("PLAYER 1");
          }
          return prevSnake2;
        }

        // Move snakes
        let newSnake = [newHead, ...prevSnake];
        let newSnake2 = [newHead2, ...prevSnake2];
        let foodEaten = false;

        // Check if Player 1 eats food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          console.log("Player 1 ate food at position:", food);
          const newScore = score + POINTS_PER_APPLE;
          setScore(newScore);
          foodEaten = true;

          // Check if we should increase speed
          if (newScore >= lastScoreRef.current + SCORE_THRESHOLD) {
            setGameSpeed(prevSpeed => {
              const newSpeed = Math.max(MIN_GAME_SPEED, prevSpeed - SPEED_INCREMENT);
              console.log(`Speed increased to ${newSpeed}ms`);
              return newSpeed;
            });
            lastScoreRef.current = newScore;
          }
        } else {
          newSnake.pop();
        }

        // Check if Player 2 eats food
        if (newHead2[0] === food[0] && newHead2[1] === food[1]) {
          console.log("Player 2 ate food at position:", food);
          const newScore2 = score2 + POINTS_PER_APPLE;
          setScore2(newScore2);
          foodEaten = true;

          // Check if we should increase speed
          if (newScore2 >= lastScoreRef.current + SCORE_THRESHOLD) {
            setGameSpeed(prevSpeed => {
              const newSpeed = Math.max(MIN_GAME_SPEED, prevSpeed - SPEED_INCREMENT);
              console.log(`Speed increased to ${newSpeed}ms`);
              return newSpeed;
            });
            lastScoreRef.current = newScore2;
          }
        } else if (!foodEaten) {
          newSnake2.pop();
        }

        // Generate new food if eaten
        if (foodEaten) {
          setFood(generateRandomPosition(GRID_SIZE, newSnake, newSnake2));
        }

        setSnake(newSnake);
        return newSnake2;
      });
      return prevSnake;
    });
  }, [direction, direction2, food, gameOver, isPaused, score, score2]);

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
    // Handle pause
    if (e.key === ' ') {
      e.preventDefault();
      setIsPaused(prev => !prev);
      return;
    }

    // Player 1 controls (Arrow keys)
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
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
      if (newDirection) {
        directionBuffer.current = newDirection;
      }
      return;
    }

    // Player 2 controls (WASD keys)
    if (['w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
      e.preventDefault();
      let newDirection2;
      switch (e.key.toLowerCase()) {
        case 'w':
          if (direction2 !== 'DOWN') newDirection2 = 'UP';
          break;
        case 's':
          if (direction2 !== 'UP') newDirection2 = 'DOWN';
          break;
        case 'a':
          if (direction2 !== 'RIGHT') newDirection2 = 'LEFT';
          break;
        case 'd':
          if (direction2 !== 'LEFT') newDirection2 = 'RIGHT';
          break;
        default:
          return;
      }
      if (newDirection2) {
        directionBuffer2.current = newDirection2;
      }
    }
  }, [direction, direction2]);

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
    setSnake2(INITIAL_SNAKE_2);
    setDirection(INITIAL_DIRECTION);
    setDirection2(INITIAL_DIRECTION_2);
    setFood(generateRandomPosition(GRID_SIZE, INITIAL_SNAKE, INITIAL_SNAKE_2));
    setScore(0);
    setScore2(0);
    setWinner(null);
    setGameSpeed(INITIAL_GAME_SPEED);

    // Reset the refs
    directionBuffer.current = null;
    directionBuffer2.current = null;
    lastScoreRef.current = 0;

    // Start the game after a small delay to ensure all state is updated
    setTimeout(() => {
      setIsPaused(false);
    }, 100);

    console.log("Game reset");
  };

  return (
    <div className="game-container">
      <h1>Snake Game - 2 Players</h1>
      <Score score={score} score2={score2} />
      <Board snakeBody={snake} snake2Body={snake2} foodPosition={food} gridSize={GRID_SIZE} />
      {isPaused && !gameOver && <div className="pause-overlay">PAUSED</div>}
      {gameOver && <GameOver score={score} score2={score2} winner={winner} onRestart={resetGame} />}
      <div className="instructions">
        <p>Player 1: Arrow keys | Player 2: WASD keys | Space to pause</p>
        <p>Game speeds up every {SCORE_THRESHOLD} points!</p>
      </div>
    </div>
  );
};

export default Game;