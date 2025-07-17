# 📦 Projeto PWII - **DoggyConnect!** <img src="./public/assets/images/logo-pet.png" alt="Descrição" width="40" height="40"/>

**Sistema de gerenciamento de cruzamento de pets** desenvolvido como parte do processo avaliativo da disciplina de Programação Web II (PWII) no IFPB. Este projeto utiliza React + TypeScript, com suporte a validação de formulários, roteamento de páginas, e testes automatizados com Vitest e Playwright.

## 💻 Tecnologias Utilizadas ⚛️

| Tecnologia          | Badge                                                                                                 |
|---------------------|------------------------------------------------------------------------------------------------------|
| **React 18**        | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  |
| **TypeScript**      | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Vite**           | ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)      |
| **Playwright**      | ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white) |
| **Vitest**          | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white) |
| **Testing Library** | ![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white) |

## 📁 Estrutura do Projeto

```plaintext
pwii_projeto_etapa01-main/
📦 pwii_projeto_etapa01
├── 📂 src/
│   ├── 📂 components/   # Componentes reutilizáveis
│   ├── 📂 pages/        # Páginas do sistema
│   ├── 📂 services/     
│   └── ...             
├── 📂 tests/           # Testes E2E (Playwright)
├── 📂 unit/            # Testes unitários (Vitest)
├── index.html
├── package.json
├── vite.config.ts
└── ...
```
## 📝 Instalação e Execução
1. Instalar dependências:
```bash
npm install
```
2. Rodar o servidor de desenvolvimento:
```bash
npm run dev
```
**🌐 Acesse em: http://localhost:5173**

## 🐛 Rodando os testes 🚀
### ✅ Unitários (Vitest + Testing Library):
```bash
npx vitest run 
```
### 🌐 E2E (Playwright): *(Lembre-se de manter a aplicação rodando em outro terminal)*
1. Instale os navegadores:
```bash
npx playwright install
```
2. Execute os testes: 
```bash
npx playwright test register --ui 
```

## 📚 Referências

- [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="14" alt="React"/> React Documentation](https://react.dev/)
- [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="14" alt="TypeScript"/> TypeScript Docs](https://www.typescriptlang.org/docs/)
- [<img src="https://vitejs.dev/logo.svg" width="14" alt="Vite"/> Vite Guide](https://vitejs.dev/guide/)
- [<img src="https://vitest.dev/logo.svg" width="14" alt="Vitest"/> Vitest API](https://vitest.dev/api/)
- [<img src="https://testing-library.com/img/octopus-64x64.png" width="14" alt="Testing Library"/> Testing Library React](https://testing-library.com/docs/react-testing-library/intro/)
- [<img src="https://playwright.dev/img/playwright-logo.svg" width="14" alt="Playwright"/> Playwright Getting Started](https://playwright.dev/docs/intro)

