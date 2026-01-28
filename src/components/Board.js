import React from 'react';
import Snake from './Snake';
import Food from './Food';

const Board = ({ snakeBody, snake2Body, foodPosition, gridSize }) => {
  const style = {
    width: `${gridSize * 20}px`,
    height: `${gridSize * 20}px`,
    position: 'relative',
    margin: '0 auto',
    backgroundColor: '#2f0f48',
    border: '4px solid #4b1b6b',
    boxShadow: 'inset 0 0 0 2px #8f4fd6'
  };

  return (
    <div data-testid="game-board" style={style}>
      <Snake segments={snakeBody} color="#d3a6ff" />
      <Snake segments={snake2Body} color="#6a1bb8" />
      <Food position={foodPosition} />
    </div>
  );
};

export default Board;
