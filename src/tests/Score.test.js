import { render, screen } from '@testing-library/react';
import Score from '../components/Score';

describe('Score Component', () => {
  test('renders score correctly', () => {
    const testScore = 100;
    render(<Score score={testScore} />);
    
    expect(screen.getByTestId('score')).toHaveTextContent(`Score: ${testScore}`);
  });
  
  test('updates when score changes', () => {
    const { rerender } = render(<Score score={10} />);
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 10');
    
    rerender(<Score score={20} />);
    expect(screen.getByTestId('score')).toHaveTextContent('Score: 20');
  });
});