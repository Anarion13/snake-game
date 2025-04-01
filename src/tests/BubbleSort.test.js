import { bubbleSort } from '../utils/bubbleSort';

describe('BubbleSort Algorithm', () => {
  describe('sorting numbers', () => {
    it('should sort an array of numbers in ascending order', () => {
      const input = [64, 34, 25, 12, 22, 11, 90];
      const expected = [11, 12, 22, 25, 34, 64, 90];
      
      expect(bubbleSort(input)).toEqual(expected);
    });

    it('should handle array with duplicate numbers', () => {
      const input = [5, 2, 5, 3, 2, 1];
      const expected = [1, 2, 2, 3, 5, 5];
      
      expect(bubbleSort(input)).toEqual(expected);
    });

    it('should return the same array if already sorted', () => {
      const input = [1, 2, 3, 4, 5];
      const expected = [1, 2, 3, 4, 5];
      
      expect(bubbleSort(input)).toEqual(expected);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      const input = [];
      expect(bubbleSort(input)).toEqual([]);
    });

    it('should handle array with single element', () => {
      const input = [1];
      expect(bubbleSort(input)).toEqual([1]);
    });

    it('should handle array with negative numbers', () => {
      const input = [-5, 3, -2, 0, -8, 4];
      const expected = [-8, -5, -2, 0, 3, 4];
      
      expect(bubbleSort(input)).toEqual(expected);
    });
  });

  describe('input validation', () => {
    it('should throw error if input is not an array', () => {
      expect(() => bubbleSort(null)).toThrow('Input must be an array');
      expect(() => bubbleSort(undefined)).toThrow('Input must be an array');
      expect(() => bubbleSort('not an array')).toThrow('Input must be an array');
    });

    it('should throw error if array contains non-numeric values', () => {
      const input = [1, 'two', 3];
      expect(() => bubbleSort(input)).toThrow('Array must contain only numbers');
    });
  });
}); 