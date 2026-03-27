# Ambev - Job Interview

![Logo da ambev](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ambev_logo.svg/1280px-Ambev_logo.svg.png)

Projeto de automacao de testes com Cypress para o desafio tecnico da Ambev, cobrindo cenarios E2E, API e Integracao, com separacao por perfil de acesso (`User` e `Admin`).

## Objetivo

Validar os principais fluxos funcionais da aplicacao ServeRest (front e API), com organizacao modular, reutilizacao de componentes e execucao local/CI.

## Stack

- Cypress 13
- JavaScript (CommonJS)
- cypress-plugin-api
- AJV (schema validation)
- GitHub Actions (pipeline)

## Estrutura do projeto

```text
cypress/
  e2e/
    User/
    Admin/
  api/
    User/
    Admin/
  integration/
  support/
    pages/
    commands.js
  services/
  fixtures/
  utils/
```

## Cobertura implementada

### E2E - User

- [x] Login (positivo e negativos)
- [x] Home (render, busca, detalhes)
- [x] Lista de compras (adicao, quantidade, preco, limpeza)
- [x] Carrinho (cenario marcado como skip por pagina em construcao)

### E2E - Admin

- [x] Usuarios (cadastro comum/admin, validacao de perfil, exclusao)
- [x] Produtos (labels/inputs, cadastro, listagem, exclusao)
- [x] Relatorios (cenario em skip por indisponibilidade)

### API - User

- [x] `/login` (valido/invalido + schema)
- [x] `/usuarios` (listagem + cadastro)
- [x] `/produtos` (listagem + schema)
- [x] `/carrinhos` (schema + consistencia de totais)

### API - Admin

- [x] Gestao de usuarios admin via API
- [x] Gestao de produtos admin via API

### Integracao (API x Front)

- [x] Criacao via API e validacao no Front
- [x] Criacao via Front e validacao na API
- [x] Fluxo com limpeza de massa de teste ao final
- [x] Validacoes cruzadas com contexto de perfil admin

**Cenarios de integracao implementados**
- API -> Front: cria usuario por API e valida presenca em `/admin/listarusuarios`.
- Front -> API: cria produto no front admin e valida existencia em `GET /produtos`.
- Cleanup: remove os dados criados durante os cenarios para evitar sujeira entre execucoes.

## Como rodar localmente

### 1) Instalar dependencias

```bash
npm install
```

### 2) Configurar ambiente

Copie o arquivo de exemplo:

```bash
cp cypress.env.example.json cypress.env.json
```

### 3) Executar

```bash
npm run cypress:open
```

ou

```bash
npm run cypress:run
```

## Pipeline (GitHub Actions)

Execucao principal:

```bash
npm run cypress:pipeRun
```

A pipeline recebe credenciais por secrets:

- `USER_NAME`
- `USER_EMAIL`
- `USER_PASSWORD`
- `ADMIN_USER_NAME`
- `ADMIN_USER_EMAIL`
- `ADMIN_USER_PASSWORD`

## Arquivo `cypress.env.example.json` versionado

- [x] Neste repositorio de entrevista, o arquivo de exemplo foi mantido no versionamento para facilitar reproducao por avaliadores.
- [x] Em um cenario de projeto real, o recomendado e **nao versionar** arquivos de credenciais e usar apenas variaveis seguras/secrets.

## Documento consolidado de entregas

O arquivo `PROJECT-CHANGELOG.md` centraliza o detalhamento de tudo que foi entregue no projeto:

- titulos de cada etapa/PR;
- descricao funcional por modulo (User, Admin, API e Integracao);
- checklist de cobertura por etapa;
- rastreabilidade do que foi implementado do inicio ao fim da entrega.

## Observacoes

- Alguns cenarios estao como `skip` por funcionalidades em construcao no proprio ambiente alvo.
- O foco foi garantir cobertura funcional, organizacao por dominio e boa legibilidade para manutencao.
