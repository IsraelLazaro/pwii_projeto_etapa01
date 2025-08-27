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

    test('deve cadastrar corretamente um novo usuário com sucesso', async ({ page }) => {

        await page.selectOption('#uf', 'PB');
        await page.selectOption('#cidade', 'Bom Jesus');

        await page.fill('input[placeholder="Digite seu nome"]', 'Teste de Cadastro');
        await page.fill('input[placeholder="Digite seu e-mail"]', 'teste_cadastro@gmail.com');
        await page.fill('input[placeholder="Digite sua senha"]', '123456');
        await page.fill('input[placeholder="Digite a senha novamente"]', '123456');

        const btn = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btn).toBeVisible();
        btn.click();

        await expect(page).toHaveURL('http://localhost:5173/Profile');
    });
});

test.describe('CRUD de pet', () => {
    
    test('deve cadastrar corretamente um novo pet', async ({ page }) => {

        await page.goto('http://localhost:5173/Register');

        await page.selectOption('#uf', 'CE');
        await page.selectOption('#cidade', 'Juazeiro do Norte');

        await page.fill('input[placeholder="Digite seu nome"]', 'Teste Pet');
        await page.fill('input[placeholder="Digite seu e-mail"]', 'teste_pet@gmail.com');
        await page.fill('input[placeholder="Digite sua senha"]', '123456');
        await page.fill('input[placeholder="Digite a senha novamente"]', '123456');

        const btnCadastrar = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btnCadastrar).toBeVisible();
        btnCadastrar.click();

        await expect(page).toHaveURL('http://localhost:5173/Profile');

        const btnNovoPet = page.getByRole('button', { name: 'Novo Pet' });
        await expect(btnNovoPet).toBeVisible();
        btnNovoPet.click();

        await expect(page).toHaveURL('http://localhost:5173/PetForms');

        await page.fill('input[placeholder="Digite o nome do pet"]', 'Cachorro de teste');
        await page.fill('input[placeholder="Digite a raça"]', 'Vira-lata caramelo');
        await page.fill('input[placeholder="Digite a idade"]', '5');
        await page.fill('input[placeholder="Digite o peso (kg)"]', '10');
        await page.fill('input[placeholder="Ex: Cachorro, Gato"]', 'Cachorro');

        await page.selectOption('#sexo', 'Macho');

        const btnCadastrarPet = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btnCadastrarPet).toBeVisible();
        btnCadastrarPet.click();

        await expect(page).toHaveURL('http://localhost:5173/Profile');

        expect(page.getByText('Cachorro de teste')).toBeVisible();
    });

    test('Deve excluir o pet criado', async ({ page }) => {

        await page.goto('http://localhost:5173/Register');

        await page.selectOption('#uf', 'CE');
        await page.selectOption('#cidade', 'Juazeiro do Norte');

        await page.fill('input[placeholder="Digite seu nome"]', 'Teste Excluir Pet');
        await page.fill('input[placeholder="Digite seu e-mail"]', 'teste_excluir_pet@gmail.com');
        await page.fill('input[placeholder="Digite sua senha"]', '123456');
        await page.fill('input[placeholder="Digite a senha novamente"]', '123456');

        const btnCadastrar = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btnCadastrar).toBeVisible();
        btnCadastrar.click();

        await expect(page).toHaveURL('http://localhost:5173/Profile');

        const btnNovoPet = page.getByRole('button', { name: 'Novo Pet' });
        await expect(btnNovoPet).toBeVisible();
        btnNovoPet.click();

        await expect(page).toHaveURL('http://localhost:5173/PetForms');

        await page.fill('input[placeholder="Digite o nome do pet"]', 'Cachorro');
        await page.fill('input[placeholder="Digite a raça"]', 'Vira-lata caramelo');
        await page.fill('input[placeholder="Digite a idade"]', '5');
        await page.fill('input[placeholder="Digite o peso (kg)"]', '10');
        await page.fill('input[placeholder="Ex: Cachorro, Gato"]', 'Cachorro');

        await page.selectOption('#sexo', 'Macho');

        const btnCadastrarPet = page.getByRole('button', { name: 'Cadastrar' });
        await expect(btnCadastrarPet).toBeVisible();
        btnCadastrarPet.click();

        await expect(page).toHaveURL('http://localhost:5173/Profile');

        expect(page.getByText('Cachorro')).toBeVisible();

        page.on('dialog', async dialog => {

            expect(dialog.message()).toBe('Tem certeza que deseja excluir este pet?');
            await dialog.accept();
        });

        const btnExcluirPet = page.locator('.pet-delete-button');
        await expect(btnExcluirPet).toBeVisible();
        btnExcluirPet.click();

        await expect(page.getByText('Cachorro')).not.toBeVisible();        
    });
});