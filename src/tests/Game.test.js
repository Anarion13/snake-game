import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
  test('renders initial game state', () => {
    render(<Game />);
    
    expect(screen.getByText(/Snake Game/i)).toBeInTheDocument();
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 0');
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
    expect(screen.getByTestId('snake')).toBeInTheDocument();
    expect(screen.getByTestId('food')).toBeInTheDocument();
    expect(screen.getByText(/Use arrow keys to move/i)).toBeInTheDocument();
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