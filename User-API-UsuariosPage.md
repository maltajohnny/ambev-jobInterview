# PR Title
feat: add user api users listing and creation tests

## O que esta branch contem
Inclui cobertura de usuarios via API para perfil user, com validacao de listagem e cadastro de novo usuario sem privilegios de administrador.

## Tasklist de cobertura
- [x] Validar listagem de usuarios em `GET /usuarios`
- [x] Validar schema de listagem com fixture `usuarios.json`
- [x] Validar cadastro de usuario comum em `POST /usuarios`
- [x] Validar retorno de sucesso e `_id` no cadastro
