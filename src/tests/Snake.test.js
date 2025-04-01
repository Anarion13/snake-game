import { render, screen } from '@testing-library/react';
import Snake from '../components/Snake';

describe('Snake Component', () => {
  test('renders snake segments correctly', () => {
    const segments = [[5, 5], [4, 5], [3, 5]];
    
    render(<Snake segments={segments} />);
    
    const snake = screen.getByTestId('snake');
    expect(snake).toBeInTheDocument();
    
    // Check if all segments are rendered (there should be 3 child divs)
    expect(snake.childElementCount).toBe(segments.length);
  });
  
  test('positions snake segments correctly', () => {
    const segments = [[5, 5], [4, 5], [3, 5]];
    
    render(<Snake segments={segments} />);
    
    const snake = screen.getByTestId('snake');
    const segmentElements = Array.from(snake.childNodes);
    
    // Check if each segment is positioned correctly
    segments.forEach((segment, index) => {
      const segmentElement = segmentElements[index];
      expect(segmentElement).toHaveStyle(`left: ${segment[0] * 20}px`);
      expect(segmentElement).toHaveStyle(`top: ${segment[1] * 20}px`);
    });
  });
});