import { describe, it, expect } from 'vitest';
import { sum } from '.';

describe('Sum', () => {
  it('Add', () => {
    const expected = 3;
    const result = sum({
      a: 1, 
      b: 2
    });
    expect(result).toEqual(expected);
  })
})