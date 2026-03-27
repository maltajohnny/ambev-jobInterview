# PR Title
feat: add user login e2e validations

## O que esta branch contem
Inclui os cenarios E2E da pagina de login para usuario comum, cobrindo autenticacao positiva e fluxos negativos de credencial invalida e validacao nativa de e-mail.

## Tasklist de cobertura
- [x] Validar login com usuario existente e sessao ativa
- [x] Validar erro para usuario valido com senha invalida
- [x] Validar erro para usuario invalido com senha valida
- [x] Validar mensagem nativa de e-mail invalido sem `@`
- [x] Garantir permanencia na rota `/login` nos cenarios negativos
