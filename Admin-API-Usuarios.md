# PR Title
feat: add admin users api management tests

## O que esta branch contem
Inclui cobertura de usuarios administrativos via API, com validacao da existencia do admin principal e ciclo de criacao/remocao de usuario admin.

## Tasklist de cobertura
- [x] Garantir sessao de admin via API antes dos testes
- [x] Validar existencia do admin principal na listagem de usuarios
- [x] Validar flag `administrador: true` para o admin principal
- [x] Criar usuario admin temporario via API
- [x] Excluir usuario admin temporario via API
