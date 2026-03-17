import { describe, expect, test } from 'vitest';
import { validateAiResponse } from '../src/core/ai/validator';

describe('ai response validation', () => {
  test('rejects invalid shape', () => {
    const result = validateAiResponse({ mode: 'edit_operations', safetyNotes: 'x' });
    expect(result.valid).toBe(false);
  });

  test('accepts edit operations', () => {
    const result = validateAiResponse({ mode: 'edit_operations', safetyNotes: [], editOperations: [] });
    expect(result.valid).toBe(true);
  });
});
