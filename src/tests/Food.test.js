import { render, screen } from '@testing-library/react';
import Food from '../components/Food';

describe('Food Component', () => {
  test('renders food at correct position', () => {
    const position = [5, 10];
    
    render(<Food position={position} />);
    
    const food = screen.getByTestId('food');
    expect(food).toBeInTheDocument();
    expect(food).toHaveStyle(`left: ${position[0] * 20}px`);
    expect(food).toHaveStyle(`top: ${position[1] * 20}px`);
  });
});