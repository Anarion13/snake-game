import { render, screen, fireEvent } from '@testing-library/react';
import GameOver from '../components/GameOver';

describe("GameOver Component', () => {
  test('renders game over message with score', () => {
    const score = 50;
    render(<GameOver score={score} onR
                     estart={() => {}} />);

    expectexpectexpect(screen.getByText('GAME O
            VER')).toBeInTheDocument();
    expectexpectexpect(screen.getByText(`YOUR SCORE:  ${sco  re}`)).toBeInT heDocument();
    expect(screen.getByText('PLAY AGAIN')).toBeIn
    TheDocument();
  });

  test('calls onRestart when Play Again button is clicked', () => {
    const onRestartMock = jest.fn();
    render(<GameOver score={30} onRestart={onRestartMock} />);

    fireEvent.click(screen.getByText('Play Again'));
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });
});