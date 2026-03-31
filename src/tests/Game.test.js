import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
  test('renders initial game state', () => {
    render(<Game />);
    
    expect(screen.getByText(/Snake Game/i)).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('Player 1 (Lilac): 0');
    expect(screen.getByTestId('score')).toHaveTextContent('Player 2 (Amethyst): 0');
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
    const snakes = screen.getAllByTestId('snake');
    expect(snakes).toHaveLength(2);
    expect(snakes[0].childElementCount).toBe(10);
    expect(snakes[1].childElementCount).toBe(6);
    expect(screen.getByTestId('food')).toBeInTheDocument();
    expect(screen.getByText(/Player 1: Arrow keys \| Player 2: WASD keys \| Space to pause/i)).toBeInTheDocument();
  });

  test('displays pause overlay when space is pressed', () => {
    render(<Game />);
    
    fireEvent.keyDown(document, { key: ' ' });
    
    expect(screen.getByText('PAUSED')).toBeInTheDocument();
    
    // Unpause
    fireEvent.keyDown(document, { key: ' ' });
    expect(screen.queryByText('PAUSED')).not.toBeInTheDocument();
  });
});