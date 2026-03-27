# Ambev Job Interview - Consolidado de Entregas

Documento unico com o resumo de todas as etapas entregues no projeto, substituindo os arquivos `.md` individuais por branch.

## 1) Base Cypress

**PR Title:** `feat: setup base Cypress framework and folder structure`

**Descricao**
- Bootstrap do Cypress com JavaScript
- Configuracao central em `cypress.config.js`
- Estrutura de pastas para E2E, API, Integracao, Support, Services, Utils e Fixtures
- Pipeline de CI preparada para execucao de testes

**Checklist**
- [x] Instalar Cypress e dependencias base
- [x] Configurar scripts locais e de pipeline
- [x] Configurar estrutura de projeto e suporte compartilhado
- [x] Preparar validacao de schema para API

## 2) User - Login Page (E2E)

**PR Title:** `feat: add user login e2e validations`

**Descricao**
- Cenarios de autenticacao para usuario comum
- Validacao de cenarios negativos e validacao nativa de e-mail

**Checklist**
- [x] Login com usuario existente
- [x] Usuario valido com senha invalida
- [x] Usuario invalido com senha valida
- [x] Validacao nativa de e-mail sem `@`

## 3) User - Home Page (E2E)

**PR Title:** `feat: add user home page e2e coverage`

**Descricao**
- Cobertura da Home para usuario comum (render, busca e navegacao)

**Checklist**
- [x] Renderizacao dos elementos principais
- [x] Busca por produto
- [x] Navegacao para detalhes de produto

## 4) User - Lista de Compras (E2E)

**PR Title:** `feat: add user shopping list e2e scenarios`

**Descricao**
- Fluxo de adicao de itens na lista e validacao de quantidade/preco

**Checklist**
- [x] Adicao de produto na lista
- [x] Persistencia da lista
- [x] Incremento/decremento de quantidade
- [x] Consistencia do preco total
- [x] Limpar lista e estado vazio

## 5) User - Carrinho (E2E)

**PR Title:** `feat: add user cart flow placeholder scenario`

**Descricao**
- Cenario mantido em `skip` por indisponibilidade funcional atual da pagina

**Checklist**
- [x] Cenário de carrinho estruturado
- [x] Bloqueio documentado (`Em construção aguarde`)

## 6) User API - Login

**PR Title:** `feat: add user login api tests with schema validation`

**Descricao**
- Validacao de `/login` com sucesso e falha, incluindo schema

**Checklist**
- [x] Login valido (200 + token)
- [x] Login invalido (401)
- [x] Schema de resposta (`login.json`)

## 7) User API - Produtos

**PR Title:** `feat: add user products api listing test`

**Descricao**
- Cobertura de listagem de produtos via API

**Checklist**
- [x] `GET /produtos` com status 200
- [x] Schema de listagem (`produtos.json`)

## 8) User API - Usuarios

**PR Title:** `feat: add user api users listing and creation tests`

**Descricao**
- Listagem de usuarios e criacao de usuario comum via API

**Checklist**
- [x] `GET /usuarios`
- [x] `POST /usuarios` (usuario comum)
- [x] Validacoes de schema e retorno

## 9) User API - Carrinhos

**PR Title:** `feat: add user carts api schema and consistency tests`

**Descricao**
- Validacao estrutural e matematica da rota de carrinhos

**Checklist**
- [x] `GET /carrinhos`
- [x] Schema (`carrinhos.json`)
- [x] Consistencia de `precoTotal`
- [x] Consistencia de `quantidadeTotal`

## 10) Admin - Usuarios (E2E)

**PR Title:** `feat: add admin user management e2e scenarios`

**Descricao**
- Gestao de usuarios no front admin

**Checklist**
- [x] Cadastro de usuario comum/admin
- [x] Validacao da flag administrador
- [x] Exclusao de usuario e validacao na lista

## 11) Admin - Produtos (E2E)

**PR Title:** `feat: add admin product management e2e scenarios`

**Descricao**
- Fluxos de cadastro/listagem/exclusao de produtos no admin

**Checklist**
- [x] Validacao de labels e campos
- [x] Cadastro de produto
- [x] Validacao em listagem
- [x] Exclusao de produto
- [x] Upload de imagem marcado como `skip`

## 12) Admin - Relatorios (E2E)

**PR Title:** `feat: add admin reports e2e placeholder (known issue)`

**Descricao**
- Cenario placeholder em `skip` para rota de relatorios

**Checklist**
- [x] Estrutura do cenario criada
- [x] Bloqueio funcional documentado

## 13) Admin API - Usuarios

**PR Title:** `feat: add admin users api management tests`

**Descricao**
- Validacoes administrativas de usuarios via API

**Checklist**
- [x] Sessao admin por API
- [x] Validacao de admin principal
- [x] Criacao e exclusao de usuario admin temporario

## 14) Admin API - Produtos

**PR Title:** `feat: add admin products api create/list/delete tests`

**Descricao**
- Ciclo de vida de produto via API com credencial admin

**Checklist**
- [x] Criar produto
- [x] Validar na listagem
- [x] Excluir produto

## 15) Integracao API x Front

**PR Title:** `feat: add integration scenarios crossing API and frontend`

**Descricao**
- Validacao cruzada entre canais (API e UI)

**Checklist**
- [x] Criar via API e validar no Front
- [x] Criar via Front e validar na API
- [x] Limpeza de massa de teste

## 16) Documentacao Final

**PR Title:** `docs: add final project README and execution guide`

**Descricao**
- README final do projeto com logo, cobertura, execucao e observacoes de CI

**Checklist**
- [x] Guia de execucao local e pipeline
- [x] Explicacao de secrets para CI
- [x] Contexto de versionamento de `cypress.env.example.json` para avaliacao
