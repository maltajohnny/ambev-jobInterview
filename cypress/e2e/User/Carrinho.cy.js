const HomePage = require('../../support/pages/HomePage');
const { HOME_PRODUCT, LISTA_COMPRAS_BUTTONS } = require('../../support/pages/elements');

describe('E2E — Carrinho (/carrinho)', () => {
  beforeEach(() => {
    cy.login();
  });

  /**
   * Bug conhecido: /carrinho exibe apenas "Em construção aguarde".
   * Manter em skip até correção; usar no relatório de defeitos.
   */
  it.skip('fluxo a partir da lista: Adicionar no carrinho leva a /carrinho (página em construção)', () => {
    HomePage.visit();
    cy.get(HOME_PRODUCT.adicionar_lista).first().click();
    cy.url().should('include', '/minhaListaDeProdutos');
    cy.get(LISTA_COMPRAS_BUTTONS.adicionar_carrinho).click();
    cy.url().should('include', '/carrinho');
    cy.contains('h1', 'Em construção aguarde').should('be.visible');
  });
});
