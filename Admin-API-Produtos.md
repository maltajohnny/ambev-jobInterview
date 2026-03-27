# PR Title
feat: add admin products api create/list/delete tests

## O que esta branch contem
Inclui cenarios de produtos para admin via API com autenticacao, validando criacao de produto, persistencia na listagem e exclusao.

## Tasklist de cobertura
- [x] Garantir token admin para operacoes protegidas
- [x] Criar produto via `POST /produtos`
- [x] Validar produto criado em `GET /produtos`
- [x] Excluir produto criado via `DELETE /produtos/{id}`
- [x] Validar status esperados nas operacoes CRUD exercitadas
