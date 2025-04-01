import React from 'react';
import Snake from './Snake';
import Food from './Food';

const Board = ({ snakeBody, foodPosition, gridSize }) => {
  const style = {
    width: `${gridSize * 20}px`,
    height: `${gridSize * 20}px`,
    position: 'relative',
    margin: '0 auto',
    backgroundColor: '#9EB764',
    border: '4px solid #000000',
    boxShadow: 'inset 0 0 0 2px #000000'
  };

  return (
    <div data-testid="game-board" style={style}>
      <Snake segments={snakeBody} />
      <Food position={foodPosition} />
    </div>
  );
};

export default Board;