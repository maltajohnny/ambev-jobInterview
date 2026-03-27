# PR Title
feat: add user login api tests with schema validation

## O que esta branch contem
Inclui cobertura da rota `/login` para usuario comum via API, com cenario positivo e negativo e validacao de schema de resposta.

## Tasklist de cobertura
- [x] Validar login API com credenciais validas (status 200)
- [x] Validar retorno de token de autorizacao
- [x] Validar login API com senha invalida (status 401)
- [x] Validar schema de resposta com fixture `login.json`
