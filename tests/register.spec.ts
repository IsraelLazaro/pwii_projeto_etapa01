import { test, expect } from '@playwright/test';

test.describe('Página de cadastro', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('http://localhost:5173/Register');
    });

    test('deve exibir todos os respectivos campos do formulário', async ({ page }) => {

        await expect(page.getByPlaceholder('Digite seu nome')).toBeVisible();
        await expect(page.getByPlaceholder('Digite seu e-mail')).toBeVisible();
        await expect(page.getByPlaceholder('Digite sua senha')).toBeVisible();
        await expect(page.getByPlaceholder('Digite a senha novamente')).toBeVisible();
    });

    test('deve exibir todas as mensagens de erro dos campos vazios do formulário', async ({ page }) => {
        
        const btn = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btn).toBeVisible();
        btn.click();

        await expect(page.getByText('O nome é obrigatório')).toBeVisible();
        await expect(page.getByText('O e-mail é obrigatório')).toBeVisible();
        await expect(page.getByText('A senha é obrigatória', { exact: true })).toBeVisible();
        await expect(page.getByText('A confirmação da senha é obrigatória')).toBeVisible();
    });
});