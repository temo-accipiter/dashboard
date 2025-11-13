import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    expect(result.current).toBe('first');

    // Change value
    act(() => {
      rerender({ value: 'second', delay: 500 });
    });

    // Value should not change immediately
    expect(result.current).toBe('first');

    // Fast-forward time and flush microtasks
    act(() => {
      vi.runAllTimers();
    });

    // Now it should be updated
    expect(result.current).toBe('second');
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    // Rapid changes
    act(() => {
      rerender({ value: 'second' });
      vi.advanceTimersByTime(200);

      rerender({ value: 'third' });
      vi.advanceTimersByTime(200);

      rerender({ value: 'fourth' });
      vi.advanceTimersByTime(200);
    });

    // The debounced value should still be 'first'
    expect(result.current).toBe('first');

    // Now wait the full delay from last change and flush
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('fourth');
  });

  it('should work with custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'initial' } }
    );

    act(() => {
      rerender({ value: 'updated' });
    });

    // After 500ms, should not be updated yet
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial');

    // After 1000ms total, should be updated
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('updated');
  });

  it('should work with numbers', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 0 } }
    );

    act(() => {
      rerender({ value: 10 });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe(10);
  });

  it('should work with objects', () => {
    const obj1 = { name: 'John' };
    const obj2 = { name: 'Jane' };

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: obj1 } }
    );

    expect(result.current).toEqual(obj1);

    act(() => {
      rerender({ value: obj2 });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toEqual(obj2);
  });

  it('should work with arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: arr1 } }
    );

    expect(result.current).toEqual(arr1);

    act(() => {
      rerender({ value: arr2 });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toEqual(arr2);
  });

  it('should use default delay of 500ms when not specified', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'first' } }
    );

    act(() => {
      rerender({ value: 'second' });
    });

    // Should not update after 400ms
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current).toBe('first');

    // Should update after completing the timeout
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('second');
  });

  it('should handle changing delay dynamically', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    act(() => {
      rerender({ value: 'second', delay: 1000 });
    });

    // After 500ms with new delay of 1000ms, should not update
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('first');

    // After completing timers, should update
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('second');
  });

  it('should handle empty string', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'text' } }
    );

    act(() => {
      rerender({ value: '' });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe('');
  });

  it('should handle boolean values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: false } }
    );

    act(() => {
      rerender({ value: true });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe(true);
  });
});
