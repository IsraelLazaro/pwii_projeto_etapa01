import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PetCard } from '../src/components/PetCard';

describe('PetCard', () => {
  it('deve mostrar nome, raça e imagem', () => {
    render(<PetCard name="Rex" breed="Labrador" imageUrl="/dog.jpg" />);
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Labrador')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Rex' })).toHaveAttribute('src', '/dog.jpg');
  });

  it('deve chamar onEdit ao clicar no botão de edição', () => {
    const onEdit = vi.fn();
    render(<PetCard name="Rex" breed="Labrador" imageUrl="/dog.jpg" onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
