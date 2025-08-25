import { describe, it, expect } from 'vitest';
import { cities } from '../src/services/cities';

describe('cities data', () => {
  it('deve conter Cajazeiras no estado da PB', () => {
    expect(cities.PB).toContain('Cajazeiras');
  });

  it('deve ter pelo menos 5 cidades listadas para PB', () => {
    expect(cities.PB.length).toBeGreaterThanOrEqual(5);
  });
});
