# PR Title
feat: add user carts api schema and consistency tests

## O que esta branch contem
Inclui validacoes da rota de carrinhos com checagem de schema e consistencia de calculo entre itens do carrinho e totais retornados pela API.

## Tasklist de cobertura
- [x] Validar listagem de carrinhos em `GET /carrinhos`
- [x] Validar schema com fixture `carrinhos.json`
- [x] Validar consistencia de `precoTotal` por somatorio de itens
- [x] Validar consistencia de `quantidadeTotal` por somatorio de quantidades
- [x] Validar campos obrigatorios de cada produto (`idProduto`, `quantidade`, `precoUnitario`)
