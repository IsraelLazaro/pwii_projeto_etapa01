export async function mockLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
  await new Promise((res) => setTimeout(res, 500)); // simula delay

  if (email === 'user@example.com' && password === '123456') {
    return { success: true, message: 'Login bem-sucedido!' };
  }

  return { success: false, message: 'E-mail ou senha incorretos.' };
}
