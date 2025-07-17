import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemedButton } from '../src/components/ThemedButton';

describe('ThemedButton', () => {
  it('deve renderizar o texto passado como children', () => {
    render(<ThemedButton>Salvar</ThemedButton>);
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<ThemedButton onClick={handleClick}>Clique</ThemedButton>);
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
