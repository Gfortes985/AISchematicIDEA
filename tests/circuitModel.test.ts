import { describe, expect, test } from 'vitest';
import { createComponent } from '../src/core/model/circuitModel';

describe('circuit model', () => {
  test('contains default footprint and pins', () => {
    const r = createComponent('resistor', 'r1', 'R1');
    expect(r.footprint).toBe('R_0805');
    expect(r.pins.length).toBe(2);
  });
});
