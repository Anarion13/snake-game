import { render, screen } from '@testing-library/react';
import Board from '../components/Board';

describe('Board Component', () => {
  test('renders board with snake and food', () => {
    const snakeBody = [[5, 5], [4, 5], [3, 5]];
    const foodPosition = [10, 10];
    const gridSize = 20;
    
    render(<Board snakeBody={snakeBody} foodPosition={foodPosition} gridSize={gridSize} />);
    
    const board = screen.getByTestId('game-board');
    const snake = screen.getByTestId('snake');
    const food = screen.getByTestId('food');
    
    expect(board).toBeInTheDocument();
    expect(snake).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });
  
  test('has correct size based on gridSize', () => {
    const snakeBody = [[5, 5], [4, 5], [3, 5]];
    const foodPosition = [10, 10];
    const gridSize = 15;
    
    render(<Board snakeBody={snakeBody} foodPosition={foodPosition} gridSize={gridSize} />);
    
    const board = screen.getByTestId('game-board');
    expect(board).toHaveStyle(`width: ${gridSize * 20}px`);
    expect(board).toHaveStyle(`height: ${gridSize * 20}px`);
  });
});