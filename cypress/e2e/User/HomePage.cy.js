const HomePage = require('../../support/pages/HomePage');
const {
  HOME_INPUTS,
  HOME_BUTTONS,
  HOME_NAV,
  HOME_CART,
  HOME_PRODUCT,
} = require('../../support/pages/elements');

describe('E2E — Home (/home)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('exibe catálogo, campo de busca e links da barra (Home, Lista de Compras, Carrinho)', () => {
    cy.url().should('include', '/home');
    cy.get(HOME_INPUTS.pesquisar)
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Pesquisar Produtos');
    cy.get(HOME_BUTTONS.pesquisar).should('be.visible').and('contain', 'Pesquisar');
    cy.get(HOME_NAV.home).should('be.visible');
    cy.get(HOME_NAV.lista_compras).should('be.visible');
    cy.get(HOME_NAV.carrinho).should('be.visible');
    cy.get(HOME_CART.icone_lista).should('be.visible');
    cy.get(HOME_PRODUCT.titulo_card).should('have.length.at.least', 1);
  });

  it('pesquisa produtos pelo nome exibido no primeiro card e mantém resultado coerente', () => {
    cy.get(HOME_PRODUCT.titulo_card)
      .first()
      .invoke('text')
      .then((nomeDoCard) => {
        const termo = nomeDoCard.trim();
        expect(termo.length).to.be.above(0);
        HomePage.searchProducts(termo);
        cy.get(HOME_PRODUCT.titulo_card).first().should('contain', termo);
      });
  });

  it('abre a página de detalhes do primeiro produto', () => {
    HomePage.openFirstProductDetail();
    cy.url().should('match', /\/detalhesProduto\//);
    cy.get(HOME_PRODUCT.nome_pagina_detalhe).should('be.visible');
  });
});
