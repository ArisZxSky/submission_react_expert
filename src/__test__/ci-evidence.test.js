import { describe, expect, it } from 'vitest';

describe('CI evidence scenario', () => {
  it('should intentionally fail to demonstrate CI protection', () => {
    expect(true).toBe(false);
  });
});