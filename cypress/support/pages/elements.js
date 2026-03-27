/**
 * Seletores centralizados por página (ServeRest — front.serverest.dev).
 * Agrupados como no padrão MAPPED_FIELDS / LABELS / INPUTS.
 */

/** Login — /login */
const LOGIN_INPUTS = {
  email: '[data-testid="email"]',
  senha: '[data-testid="senha"]',
};

const LOGIN_BUTTONS = {
  entrar: '[data-testid="entrar"]',
};

const LOGIN_LINKS = {
  cadastre_se: '[data-testid="cadastrar"]',
};

/** Cadastro de usuários — /cadastrarusuarios */
const REGISTER_INPUTS = {
  nome: '[data-testid="nome"]',
  email: '[data-testid="email"]',
  password: '[data-testid="password"]',
};

const REGISTER_CHECKBOXES = {
  administrador: '[data-testid="checkbox"]',
};

const REGISTER_BUTTONS = {
  cadastrar: '[data-testid="cadastrar"]',
};

/** Home — /home (catálogo, pesquisa, adicionar à lista, navegação) */
const HOME_INPUTS = {
  pesquisar: '[data-testid="pesquisar"]',
};

const HOME_BUTTONS = {
  pesquisar: '[data-testid="botaoPesquisar"]',
};

const HOME_NAV = {
  home: '[data-testid="home"]',
  lista_compras: '[data-testid="lista-de-compras"]',
  carrinho: '[data-testid="carrinho"]',
};

const HOME_CART = {
  icone_lista: '[data-testid="shopping-cart-button"]',
  contador: '[data-testid="listaProdutos"]',
};

const HOME_PRODUCT = {
  adicionar_lista: '[data-testid="adicionarNaLista"]',
  /** Na home os nomes vêm em `h5.card-title`, sem data-testid */
  titulo_card: 'section.row.espacamento h5.card-title',
  link_detalhe: '[data-testid="product-detail-link"]',
  /** Só na página /detalhesProduto/:id */
  nome_pagina_detalhe: '[data-testid="product-detail-name"]',
};

/** Lista de compras — /minhaListaDeProdutos */
const LISTA_COMPRAS_TEXT = {
  nome_produto: '[data-testid="shopping-cart-product-name"]',
  quantidade_resumo: '[data-testid="shopping-cart-product-quantity"]',
  mensagem_vazia: '[data-testid="shopping-cart-empty-message"]',
};

const LISTA_COMPRAS_BUTTONS = {
  limpar: '[data-testid="limparLista"]',
  pagina_inicial: '[data-testid="paginaInicial"]',
  /** Texto do botão: "Adicionar no carrinho" */
  adicionar_carrinho: '[data-testid="adicionar carrinho"]',
  diminuir: '[data-testid="product-decrease-quantity"]',
  aumentar: '[data-testid="product-increase-quantity"]',
};

/** Admin - Usuários */
const ADMIN_USUARIOS_INPUTS = {
  nome: '[data-testid="nome"]',
  email: '[data-testid="email"]',
  password: '[data-testid="password"]',
};

const ADMIN_USUARIOS_BUTTONS = {
  cadastrar: '[data-testid="cadastrarUsuario"]',
  checkbox_admin: '[data-testid="checkbox"]',
};

const ADMIN_USUARIOS_NAV = {
  listar_usuarios_card: '[data-testid="listarUsuarios"]',
  cadastrar_usuarios_card: '[data-testid="cadastrarUsuarios"]',
};

/** Admin - Produtos */
const ADMIN_PRODUTOS_INPUTS = {
  nome: '[data-testid="nome"]',
  preco: '[data-testid="preco"]',
  descricao: '[data-testid="descricao"]',
  quantidade: '[data-testid="quantity"]',
  imagem: '[data-testid="imagem"]',
};

const ADMIN_PRODUTOS_BUTTONS = {
  cadastrar: '[data-testid="cadastarProdutos"]',
};

const ADMIN_PRODUTOS_NAV = {
  cadastrar_produtos_card: '[data-testid="cadastrarProdutos"]',
  listar_produtos_card: '[data-testid="listarProdutos"]',
};

module.exports = {
  LOGIN_INPUTS,
  LOGIN_BUTTONS,
  LOGIN_LINKS,
  REGISTER_INPUTS,
  REGISTER_CHECKBOXES,
  REGISTER_BUTTONS,
  HOME_INPUTS,
  HOME_BUTTONS,
  HOME_NAV,
  HOME_CART,
  HOME_PRODUCT,
  LISTA_COMPRAS_TEXT,
  LISTA_COMPRAS_BUTTONS,
  ADMIN_USUARIOS_INPUTS,
  ADMIN_USUARIOS_BUTTONS,
  ADMIN_USUARIOS_NAV,
  ADMIN_PRODUTOS_INPUTS,
  ADMIN_PRODUTOS_BUTTONS,
  ADMIN_PRODUTOS_NAV,
};
