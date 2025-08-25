import { describe, it, expect } from 'vitest';
import { mockLogin } from '../src/services/auth';

describe('mockLogin', () => {
  it('deve fazer login com sucesso quando credenciais corretas forem fornecidas', async () => {
    const res = await mockLogin('user@example.com', '123456');
    expect(res).toEqual({ success: true, message: 'Login bem-sucedido!' });
  });

  it('deve falhar ao fornecer credenciais incorretas', async () => {
    const res = await mockLogin('wrong@example.com', 'badpass');
    expect(res.success).toBe(false);
    expect(res.message).toBe('E-mail ou senha incorretos.');
  });
});
