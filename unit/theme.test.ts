import { describe, it, expect } from 'vitest';
import { Colors } from '../src/constants/theme';

describe('Colors constants', () => {
  it('deve possuir cores primárias definidas para temas claro e escuro', () => {
    expect(Colors.light.primary).toBeDefined();
    expect(Colors.dark.primary).toBeDefined();
    expect(typeof Colors.light.primary).toBe('string');
    expect(typeof Colors.dark.primary).toBe('string');
  });
});
