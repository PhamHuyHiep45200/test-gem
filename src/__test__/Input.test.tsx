import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputGem from '../components/input';

describe('InputGem Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Format invalid input values on blur', () => {
    it('should format value input when out of focus', () => {
      render(<InputGem value={0} onChange={mockOnChange} />);
      
      const input = screen.getByTestId('input-gem');
      
      // test input "123a"
      fireEvent.change(input, { target: { value: '123a' } });
      expect((input as HTMLInputElement).value).toBe('123a');
      fireEvent.blur(input);
      expect((input as HTMLInputElement).value).toBe('123');
      expect(mockOnChange).toHaveBeenCalledWith(123);

      // test input "12"
      fireEvent.change(input, { target: { value: '12' } });
      expect((input as HTMLInputElement).value).toBe('12');
      fireEvent.blur(input);
      expect(mockOnChange).toHaveBeenCalledWith(12);

      // test input "12a3"
      fireEvent.change(input, { target: { value: '12a3' } });
      expect((input as HTMLInputElement).value).toBe('12a3');
      fireEvent.blur(input);
      expect((input as HTMLInputElement).value).toBe('12');
      expect(mockOnChange).toHaveBeenCalledWith(12);

      // test input "a123"
      fireEvent.change(input, { target: { value: 'a123' } });
      expect((input as HTMLInputElement).value).toBe('a123');
      fireEvent.blur(input);
      expect((input as HTMLInputElement).value).toBe('123');
      expect(mockOnChange).toHaveBeenCalledWith(123);

      // test input "12.4.5"
      fireEvent.change(input, { target: { value: '12.4.5' } });
      expect((input as HTMLInputElement).value).toBe('12.4.5');
      fireEvent.blur(input);
      expect((input as HTMLInputElement).value).toBe('12.4');
      expect(mockOnChange).toHaveBeenCalledWith(12.4);
    });
  });
});
