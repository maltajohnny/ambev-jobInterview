# PR Title
feat: setup base Cypress framework and folder structure

## O que esta branch contem
Implementa a base do projeto de automacao com Cypress em JavaScript, incluindo configuracao inicial, estrutura de pastas, utilitarios compartilhados, comandos customizados e organizacao de Page Objects/Services para suportar E2E, API e integracao.

## Tasklist de cobertura
- [x] Instalar Cypress e dependencias base no `package.json`
- [x] Configurar `cypress.config.js` com `baseUrl`, `apiBaseUrl` e `specPattern`
- [x] Criar scripts de execucao local e pipeline
- [x] Criar estrutura de pastas para `e2e`, `api`, `integration`, `support`, `utils`, `services` e `fixtures`
- [x] Configurar `support/e2e.js` e `support/commands.js`
- [x] Adicionar suporte a schema validation e plugin de API
- [x] Preparar workflow de CI para execucao Cypress
- [x] Configurar pipeline para receber usuarios via GitHub Secrets (`USER_*` e `ADMIN_USER_*`)
- [x] Remover versionamento de arquivo de exemplo de ambiente para evitar exposicao indevida
